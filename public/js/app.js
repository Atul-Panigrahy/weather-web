
// console.log('client side js file is loaded');


// fetch('http://puzzle.mead.io/puzzle').then( (response) =>{

//     response.json().then((data) => {
//         console.log(data );
//     })
// })


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

var voiceList = document.querySelector('#voiceList');
var buttonSpeak  = document.querySelector('#buttonSpeak');

var outerMSG_1 = "";
var outerMSG_2 = "";

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location  = searchElement.value

    // console.log('tesing');
    // console.log(location);

    message1.textContent = outerMSG_1 = 'Loading...'
    message2.textContent = ''

    // const url = 'http://localhost:3000/weather?address='+location

    const url = '/weather?address='+location

    fetch(url).then((response)=>{ 
        response.json().then((data)=>{

            if(data.error){
            // console.log(data.error);
            message1.textContent = outerMSG_1 = data.error
            message2.textContent = ''

            }else{
                // console.log(data.location);
                // console.log(data.forecast);
                
                message1.textContent = outerMSG_1 = data.location
                message2.textContent = outerMSG_2 = data.forecast

            }
        })
    })

})

//for text- to - speech part
var tts = window.speechSynthesis;
var voices = []; // to hold the array of voices which we will fetch

GetVoices();

if(speechSynthesis !== undefined){

    speechSynthesis.onvoiceschanged = GetVoices ;
}

buttonSpeak.addEventListener('click', () => {

    var toSpeak = new SpeechSynthesisUtterance( outerMSG_1 + outerMSG_2 ); // object made using constructor 
    var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');

    voices.forEach((voice) => {
        if(voice.name === selectedVoiceName) {
            toSpeak.voice = voice ;
        }
    })

    tts.speak(toSpeak);
})

function GetVoices () {
    voices = tts.getVoices(); 
    voiceList.innerHTML = ''; //clearing out the voiceList before populating

    voices.forEach( (voice)=> {
        
        var listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);

        voiceList.appendChild(listItem);

    });

    voiceList.selectedIndex = 0;
}