
document.getElementById('search-lyrics').addEventListener('click', searchMusic);

const inputMusic = document.getElementById('input-lyrics');

inputMusic.addEventListener('keypress', function(){
    if(event.keyCode === 13){
        searchMusic();
    }
})


function searchMusic(){
    document.getElementById('all-results').innerHTML = '';
    document.getElementById('all-details').innerHTML = '';
    const keyword = inputMusic.value;
    fetch(`https://api.lyrics.ovh/suggest/${keyword}`)
    .then(res => res.json())
    .then(data => {   
        storedData = data;
        console.log(data);
        for (let i = 0; i < data.data.length; i++) {
            const title = data.data[i].title;
            const artistName = data.data[i].artist.name;
            const id = data.data[i].id;
            document.getElementById('all-results').innerHTML += `<div class="single-result row align-items-center my-3 p-3">
                                                                    <div class="col-md-6">
                                                                        <h3 class="song-name">${title}</h3>
                                                                        <p class="author lead">Album by <span>${artistName}</span></p>
                                                                    </div>
                                                                    <div class="col-md-6 text-md-right text-center">
                                                                        <a href="#all-details"><button onClick="getDetails(${id})" class="btn btn-success">Details</button></a>
                                                                        <a href="#all-details"><button onClick="getLyrics(${id})" class="btn btn-success">Get Lyrics</button></a>
                                                                    </div>
                                                                </div>`
            if(i == 9){
                break;
            }   
        }
        
    })
}

function getDetails(id){
    for (let i = 0; i < 10; i++) {
        if(storedData.data[i].id == id){
            const songTitle = storedData.data[i].title;
            const artistName = storedData.data[i].artist.name;
            const img = storedData.data[i].album.cover_big;
            const download = storedData.data[i].link;
            const preview = storedData.data[i].preview;
            console.log(preview);
            document.getElementById('all-details').innerHTML = `<div class="details">
                                                                        <h2 class="text-success mb-4">Song Details</h2>
                                                                        <img src="${img}" alt="">
                                                                        <h3>Title: ${songTitle}</h3>
                                                                        <h3>Artist Name: ${artistName}</h3>
                                                                        <h3><a target="_blank" href="${download}">Click for download Song</a></h3>
                                                                        <h3><a target="_blank" href="${preview}">Click for Song Preview</a></h3>
                                                                    </div>`
            
        }
    }
}


function getLyrics(id){
    for (let i = 0; i < 10; i++) {
        if(storedData.data[i].id == id){
            const artistName = storedData.data[i].artist.name;
            const songTitle = storedData.data[i].title;
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
            .then(res => res.json())
            .then(data => {
                let lyrics = data.lyrics;
                if(lyrics == undefined){
                    lyrics = `Sorry! Song Lyrics Not Found. Please try for another song`;
                }
                document.getElementById('all-details').innerHTML = `<div class="single-lyrics text-center">
                                                                            <button class="btn go-back">&lsaquo;</button>
                                                                            <h2 class="text-success mb-4">Song Lyrics</h2>
                                                                            <h5>${lyrics}</h5>
                                                                        </div>`
            })
            
            
        }
    }
    
}
