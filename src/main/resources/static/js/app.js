
function scrollList(listID, direction) {
    var el = document.getElementById(listID);
    distance = 300 * (direction === 'left' ? -1 : 1);
    el.scrollLeft += distance;
}

function fetchAndRenderSongs() {

    fetch('./songs/discover')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderSongs(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function renderSongs(data) {
    const popSongContainer = document.getElementById('popSongs');
    popSongContainer.innerHTML = '';

    // load the album of 1st popular song
    loadAlbumBySong(data[0]);

    // define the playing song as the first pop song
    playingSong = data[0];
    poster_master_play.src = data[0].albumPoster;
    title.innerHTML = data[0].name;

    data.forEach(song => {
        const li = document.createElement('li');
        li.classList.add('songItem');
        li.innerHTML = `
            <div class="img_play">
                <img src="${song.albumPoster}">
                <i class="bi playListPlay bi-play-circle-fill song-${song.id}"></i>
            </div>
            <h5>${song.name}
                <br>
                <div class="subtitle">${song.artists[0].name}</div>
            </h5>
        `;

        li.addEventListener('click', () => playPauseMusic(song));

        popSongContainer.appendChild(li);
    });
}

function fetchAndRenderArtists() {
    fetch('./artists/discover')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderArtists(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function renderArtists(data) {
    const popArtistsContainer = document.getElementById('popArtists');
    popArtistsContainer.innerHTML = '';

    // change artist content according to the first returned top artis
    changeArtistContent(data[0].id, data[0].name, data[0].followers);

    data.forEach(artist => {
        const li = document.createElement('li');
        li.classList.add('songItem');
        li.innerHTML = `

            <div class="img_artist" id="${artist.id}" onclick="changeArtistContent('${artist.id}', '${artist.name}', '${artist.followers}')">
                <img src="img/${artist.images[1].url}">
            </div>
            <h5>${artist.name}</h5>
        `;

        popArtistsContainer.appendChild(li);
    });

}

function changeArtistContent(artistId, artistName, followers) {
    const artistContent = document.getElementById('artistContent');
    artistContent.innerHTML = `
      <h1>${artistName}</h1>
      <p>
          ${followers} Followers
      </p>
      <div class="buttons">
          <button>PLAY</button>
          <button>FOLLOW</button>
      </div>
    `;
}


function loadAlbumBySong(song) {
    fetch(`./songs/album/${song.albumId}`)
        .then(response => response.json())
        .then(album => {
            album.artistName = song.artists[0].name;
            displaySongsList(album);
        })
        .catch(error => {
            console.error('Error fetching albums:', error);
        });
}

function displaySongsList(album) {

    const songsList = document.getElementById('songsList');
    songsList.innerHTML = '';

    album.tracks.forEach((song, index) => {
        const li = document.createElement('li');
        li.classList.add('songItem');
        li.innerHTML = `

            <span>${String(index + 1).padStart(2, '0')}</span>
            <img src="img/${album.images[1].url}">

            <h5>
              ${song.name}
              <br>
              <div class="subtitle">${album.artistName}</div>
            </h5>
            <i class="bi playListPlay bi-play-circle-fill song-${song.id}"></i>
        `;

        li.addEventListener('click', () => playPauseMusic(song));
        songsList.appendChild(li);
    });
}


function playPauseMusic(song) {

  console.log('playPause event with song:');
  console.log(song);

  if (song.id !== playingSong.id) {
    music.pause();
  }

  if (song.albumId !== playingSong.albumId) {
    loadAlbumBySong(song);
  }

  const songElement = document.getElementsByClassName(`song-${playingSong.id}`);

  if (music.paused || music.currentTime <=0) {

        if (song.id !== playingSong.id) {
            music.src = `audio/demo.mp3`;
            poster_master_play.src = playingSong.albumPoster;
            title.innerHTML = playingSong.name;
        }

        music.play();
        playingSong = song;

        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');

        wave.classList.add('active2');

        Array.from(songElement).forEach(el => {
            el.classList.remove('bi-play-circle-fill');
            el.classList.add('bi-pause-circle-fill');
        });

  } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');

        wave.classList.remove('active2');

        Array.from(songElement).forEach(el => {
            el.classList.remove('bi-pause-circle-fill');
            el.classList.add('bi-play-circle-fill');
        });
    }
}

function initPlayer() {

    // play/pause control
    masterPlay.addEventListener('click',()=>{
      playPauseMusic(playingSong);
    })

    let currentStart = document.getElementById('currentStart');
    let currentEnd = document.getElementById('currentEnd');
    let seek = document.getElementById('seek');
    let bar2 = document.getElementById('bar2');
    let dot = document.getElementsByClassName('dot')[0];

    // seek control
    music.addEventListener('timeupdate',()=>{
        let music_curr = music.currentTime;
        let music_dur = music.duration;

        let min = Math.floor(music_dur/60);
        let sec = Math.floor(music_dur%60);
        if (sec<10) {
            sec = `0${sec}`
        }
        currentEnd.innerText = `${min}:${sec}`;

        let min1 = Math.floor(music_curr/60);
        let sec1 = Math.floor(music_curr%60);
        if (sec1<10) {
            sec1 = `0${sec1}`
        }
        currentStart.innerText = `${min1}:${sec1}`;

        let progressbar = parseInt((music.currentTime/music.duration)*100);
        seek.value = progressbar;
        let seekbar = seek.value;
        bar2.style.width = `${seekbar}%`;
        dot.style.left = `${seekbar}%`;
    })

    seek.addEventListener('change', ()=>{
        music.currentTime = seek.value * music.duration/100;
    })

    // volume controls
    let vol_icon = document.getElementById('vol_icon');
    let vol = document.getElementById('vol');
    let vol_dot = document.getElementById('vol_dot');
    let vol_bar = document.getElementsByClassName('vol_bar')[0];

    vol.addEventListener('change', ()=>{
        if (vol.value == 0) {
            vol_icon.classList.remove('bi-volume-down-fill');
            vol_icon.classList.add('bi-volume-mute-fill');
            vol_icon.classList.remove('bi-volume-up-fill');
        }
        if (vol.value > 0) {
            vol_icon.classList.add('bi-volume-down-fill');
            vol_icon.classList.remove('bi-volume-mute-fill');
            vol_icon.classList.remove('bi-volume-up-fill');
        }
        if (vol.value > 50) {
            vol_icon.classList.remove('bi-volume-down-fill');
            vol_icon.classList.remove('bi-volume-mute-fill');
            vol_icon.classList.add('bi-volume-up-fill');
        }

        let vol_a = vol.value;
        vol_bar.style.width = `${vol_a}%`;
        vol_dot.style.left = `${vol_a}%`;
        music.volume = vol_a/100;
    });

    // back / next controls
    document.getElementById('back').addEventListener('click', ()=>{
        // TBD
    });

    document.getElementById('next').addEventListener('click', ()=>{
        // TBD
    });

    music.addEventListener('ended', ()=>{
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    });
}

// player global variables
let playingSong;
const music = new Audio('audio/demo.mp3');
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

fetchAndRenderSongs();
fetchAndRenderArtists();
initPlayer();
