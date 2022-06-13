let songs = [{
    title: "Summertime Sadness",
    filename: "summertime_sadness",
    artist: "Lana Del Rey"
},

{
    title: "Никаких больше вечеринок",
    filename: "никаких_больше_вечеринок",
    artist: "Cream Soda"
},

{
    title: "Levitating",
    filename: "levitating",
    artist: "Dua Lipa ft. DaBaby"
}
];

const songTitle = document.querySelector('#title');
const songArtist = document.querySelector('#artist');
const songAudio = document.querySelector('#audio');
const songCover = document.querySelector("#trackcover");
const musicContainer = document.querySelector(".container");
const playbtn = document.querySelector("#playbutton");
const backbtn = document.querySelector("#backbutton");
const nextbtn = document.querySelector("#nextbutton");
const songProgress = document.querySelector(".progress");
const songProgressbar = document.querySelector(".progressbar");
const backVideo = document.querySelector("#backvid");
songAudio.volume = 1;
let songIndex = 0;

loadSong(songs[songIndex]);

function loadSong(song){
    songTitle.innerText = song.title;
    songArtist.innerText = song.artist;
    songAudio.src = `res/${song.filename}.mp3`;
    songCover.src = `res/${song.filename}.jpg`;
    //songAudio.currentTime = 0;

    if(songIndex == 0){
        backbtn.disabled = true;
    }
    else if(songIndex == songs.length - 1){
        nextbtn.disabled = true;
    }
    else{
        backbtn.disabled = false;
        nextbtn.disabled = false;
    }
}

function backFunction(){
    songAudio.currentTime = 0;
    songProgress.style.width = 0;
    songIndex -= 1;
    loadSong(songs[songIndex]);
}

function nextFunction(){
    songAudio.currentTime = 0;
    songProgress.style.width = 0;
    songIndex += 1;
    loadSong(songs[songIndex]);
}

function playFunction(){
    const isPlaying = musicContainer.classList.contains("play");
    
    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
}

function playSong(){
    playbtn.querySelector("i.fas").classList.remove("fa-play");
    playbtn.querySelector("i.fas").classList.add("fa-pause");

    musicContainer.classList.add("play");

    backVideo.play();
    songAudio.play();
}

function pauseSong(){
    playbtn.querySelector("i.fas").classList.remove("fa-pause");
    playbtn.querySelector("i.fas").classList.add("fa-play");

    musicContainer.classList.remove("play");

    backVideo.pause();
    songAudio.pause();
}

function updateProgress(e){
    const [duration, currentTime] = [songAudio.duration, songAudio.currentTime];
    const progressPercent = (currentTime / duration) * 100;
    songProgress.style.width = `${progressPercent}%`;
}

function ended(){
    if(songIndex < songs.length - 1){
        nextFunction();
        playSong();
    }
    else if(songIndex == songs.length - 1){
        alert("Это была последняя песня в плейлисте. Спасибо за прослушивание!");
    }
}

songProgressbar.onclick = function(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = songAudio.duration;

    songAudio.currentTime = duration * clickX / width;
}