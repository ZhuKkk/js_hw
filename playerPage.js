(function() {  //Всю эту констркуцию оборачиваем в самовызывающуюся функцию,
    // пробовал через сообытие DOMContentLoaded но не работало. Потом еще попробую варианты

// Создаем экземпляр плеера согласно документации
    let AudioPlayer = ya.music.Audio;
    AudioPlayer.config.flash.path = "../../dist";

// Выборки элементов из дом. Володя, назвал не target, потому что далее по коду
// легко ломается голова в таком случае. А dom из документации и всегда понятно что это)
    let dom = {
        player: document.querySelector(".player"),

        play: document.querySelector(".controls_play"),

        info: {
            artist: document.querySelector(".player__artist"),
            song: document.querySelector(".player__song"),
        },

        progress: {
            bar: document.querySelector(".progress"),
            loaded: document.querySelector(".progress_loaded"),
            current: document.querySelector(".progress_current")
        },

        volume: {
            bar: document.querySelector(".volume"),
            value: document.querySelector(".volume_bar")
        },
        icon: {
            list: document.querySelector(".list"),
            vol: document.querySelector(".volume_icon"),
            next: document.querySelector(".next"),
            back: document.querySelector(".back"),
            closePlaylist: document.querySelector(".close_playlist"),
        },
//Overlay нужен согласно API на случай если браузер не поддерживает html5, должен быть построен Flash player,
        // не проверял, но пока решил оставить тут и далее по коду
        overlay: document.querySelector(".overlay"),
        wrapper: document.querySelector(".playlist")
    };
// Первый аргумент отвечает за то что использовать html5 или flash
// при значении null определяется автоматически в пользу html5
    let audioPlayer = new AudioPlayer(null, dom.overlay);

    audioPlayer.initPromise().then(function() {
        // Скрываем оверлей, кнопки управления становятся доступными.
        dom.overlay.classList.add("overlay_hidden");
    }, function(err) {
        // Показываем ошибку инициализации в оверлее.
        dom.overlay.innerHTML = err.message;
        dom.overlay.classList.add("overlay_error");
    });

    audioPlayer.on(ya.music.Audio.EVENT_STATE, function(state) {
        if (state === ya.music.Audio.STATE_PLAYING) {
            dom.player.classList.add("player_playing");
        } else {
            dom.player.classList.remove("player_playing");
        }
    });

// Теперь настроим обновление прогресс-бара. В нем предусмотрены
// 2 шкалы - шкала загрузки и шкала текущей позиции воспроизведения.
    audioPlayer.on(ya.music.Audio.EVENT_PROGRESS, function(timings) {
        dom.progress.loaded.style.width = (timings.loaded / timings.duration * 100).toFixed(2) + "%";
        dom.progress.current.style.width = (timings.position / timings.duration * 100).toFixed(2) + "%";
    });
// Аналогично будет работать шкала громкости
    let updateVolume = function(volume) {
        dom.volume.value.style.height = (volume * 100).toFixed(2) + "%";
    };
    audioPlayer.on(ya.music.Audio.EVENT_VOLUME, updateVolume);

// Отображаем начальную громкость
    audioPlayer.initPromise().then(function() {
        updateVolume(audioPlayer.getVolume());
    });

    //Загружаем и обрабатываем базу данных
    let musicDataBase = JSON.parse(getFromServer('musicDataBase'));
    //получил базу треков, как добраться до ссылок - смотри descriptions.js

    let playlist = JSON.parse(getFromServer('playlist'));
    //получил массив плейлиста










// сделать массив ссылок из пришедшего массива объектов
    let trackUrls = [];
    // let playlist = [
    //     {performer: "GroupA",
    //         soundName: "Name1",
    //         link: "song1.mp3",},
    //
    //     {performer: "GroupB",
    //         soundName: "Name2",
    //         link: "song2.mp3"},
    //
    //     {performer: "GroupB",
    //         soundName: "Name3",
    //         link: "song3.mp3"}];

// modal popup
    let popup = document.getElementById("mypopup"),
        popupClose = document.querySelector(".close"),
        popupInfo = document.querySelector('.artist__info_popup')
    popupClose.addEventListener("click", (e)=> {
        popup.style.display="none";
    });
    window.addEventListener("click", (e) => {
        if(e.target == popup){
            popup.style.display="none";
        }
    });

//Построим плейлист
    console.log(playlist)
    for (i = 0; i < playlist.length; i++) {
        let note = document.createElement('li');
        note.addEventListener("click", (e)=> {
            if (e.target.nodeName === 'BUTTON'){
                console.dir(e.target);
                popupInfo.innerText = e.target.previousSibling.innerText;
                popup.style.display="block";
            }
        });
        let button = document.createElement('button');
        button.classList.add('artist__info');
        button.innerText = 'info';
        note.setAttribute('data-index', i);
        note.classList.add('song__item');
        note.innerHTML = `<p>${playlist[i].performer} - ${playlist[i].soundName}</p>`;
        note.appendChild(button);
        dom.wrapper.appendChild(note);
    }

//построение trackUrls из плейлиста
    for (i = 0; i < playlist.length; i++) {
        trackUrls.push(musicDataBase[playlist[i].performer].audio[playlist[i].soundName].link);
    }
console.log(trackUrls);
// Теперь нужно настроить взаимодействие с пользователем. Начнем с запуска воспроизведения.
    let trackIndex = 0;
    let startPlay = function() {
        let track = trackUrls[trackIndex];
        if (audioPlayer.isPreloaded(track)) {
            audioPlayer.playPreloaded(track);
        } else {
            audioPlayer.play(track);
        }
    };

//Переменные для замены иконки плэй/пауза
    let playIcon = `<i class="fa fa-2x fa-play" aria-hidden="true"></i>`,
        pauseIcon = `<i class="fa fa-2x fa-pause" aria-hidden="true"></i>`;

    dom.play.addEventListener("click", function() {
        let state = audioPlayer.getState();
        dom.info.artist.innerText = playlist[trackIndex].performer;
        dom.info.song.innerText = playlist[trackIndex].soundName;

        switch (state) {
            case ya.music.Audio.STATE_PLAYING:
                audioPlayer.pause();
                dom.play.innerHTML = playIcon;
                break;

            case ya.music.Audio.STATE_PAUSED:
                audioPlayer.resume();
                dom.play.innerHTML = pauseIcon;
                break;

            default:
                startPlay();
                dom.play.innerHTML = pauseIcon;
                break;
        }
    });

// Добавим немножко удобства для пользователей: сделаем автозагрузку
// следующего трека после того, как текущий загрузился.
// Для этого потребуется немного изменить функцию `startPlay` и отслеживать момент загрузки трека.

    audioPlayer.on(ya.music.Audio.EVENT_ENDED, function() {
        trackIndex++;

        if (trackIndex < trackUrls.length) {
            startPlay();
        }
    });

    audioPlayer.on(ya.music.Audio.EVENT_LOADED, function() {
        if (trackIndex + 1 < trackUrls.length) {
            audioPlayer.preload(trackUrls[trackIndex + 1]);
        }
    });

// Осталось только настроить навигацию по треку и регулирование громкости:
    let offsetLeft = function(node) {
        let offset = node.offsetLeft;
        if (node.offsetParent) {
            offset += offsetLeft(node.offsetParent);
        }
        return offset;
    };

    let offsetTop = function(node) {
        let offset = node.offsetTop;
        if (node.offsetParent) {
            offset += offsetTop(node.offsetParent);
        }
        return offset;
    };

    dom.progress.bar.addEventListener("click", function(evt) {
        let fullWidth = dom.progress.bar.offsetWidth;
        let offset = offsetLeft(dom.progress.bar);

        let relativePosition = Math.max(0, Math.min(1, ((evt.pageX || evt.screenX) - offset) / fullWidth));
        let duration = audioPlayer.getDuration();

        audioPlayer.setPosition(duration * relativePosition);
    });

    dom.volume.bar.addEventListener("click", function(evt) {
        let fullHeight = dom.volume.bar.offsetHeight;
        let offset = offsetTop(dom.volume.bar);

        // тут мы делаем "1 -" т.к. громость принято отмерять снизу, а не сверху
        let volume = 1 - Math.max(0, Math.min(1, ((evt.pageY || evt.screenY) - offset) / fullHeight));
        audioPlayer.setVolume(volume);
    });

    let songs = document.querySelectorAll(".song__item");
//Назвачаем обработчик события для включения песни из плейлиста
    for (i = 0; i < songs.length; i++) {
        songs[i].addEventListener("click", (e)=> {
            trackIndex = e.target.dataset.index;
            dom.info.artist.innerText = playlist[trackIndex].performer;
            dom.info.song.innerText = playlist[trackIndex].soundName;
            startPlay();
            dom.play.innerHTML = pauseIcon;
        })
    };
    // обработчик события показа плейлиста
    dom.icon.list.addEventListener("click", ()=> {
        dom.wrapper.classList.add("visible");
    });
    dom.icon.closePlaylist.addEventListener("click", ()=> {
        dom.wrapper.classList.remove("visible");
    });

    //Показать и спрятать volume_bar
    dom.icon.vol.addEventListener("click", ()=> {
        if(!volumeBarStatus) {
            dom.volume.bar.classList.add("visible");
            let closeIcon = `<i class="fa fa-times" aria-hidden="true"></i>`;
            dom.icon.vol.innerHTML = closeIcon;
            volumeBarStatus = 1;
        } else {
            dom.volume.bar.classList.remove("visible");
            let volumeIcon = `<i class="fa fa-volume-up" aria-hidden="true"></i>`;
            dom.icon.vol.innerHTML = volumeIcon;
            volumeBarStatus = "";
        }


    });
    let volumeBarStatus;

//Настройка кнокпи next и back
    dom.icon.next.addEventListener("click", ()=> {
        trackIndex++;
        dom.info.artist.innerText = playlist[trackIndex].performer;
        dom.info.song.innerText = playlist[trackIndex].soundName;
        startPlay();
    });
    dom.icon.back.addEventListener("click", ()=> {
        trackIndex--;
        dom.info.artist.innerText = playlist[trackIndex].performer;
        dom.info.song.innerText = playlist[trackIndex].soundName;
        startPlay();
    });



})();