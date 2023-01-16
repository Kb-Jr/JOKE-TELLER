const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


function toggleButton(){
    button.disabled = !button.disabled;
}


function tellMe(joke){
    VoiceRSS.speech({
        key: '6b779644b0464f8886a64eb54e079760',
        src: joke,
        hl: 'en-us',
        v: 'Amy',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


async function getJokes(){
    let joke = '';
    apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }

        tellMe(joke);
        toggleButton();
    }
    catch(error){
        console.log('whoops', error);
    }

    
}


button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
