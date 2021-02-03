
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



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location  = searchElement.value

    // console.log('tesing');
    // console.log(location);

    message1.textContent = 'Loading...'
    message2.textContent = ''

    const url = 'http://localhost:3000/weather?address='+location
    fetch(url).then((response)=>{
        response.json().then((data)=>{

            if(data.error){
            // console.log(data.error);
            message1.textContent = data.error
            message2.textContent = ''

            }else{
                // console.log(data.location);
                // console.log(data.forecast);
                
                message1.textContent = data.location
                message2.textContent = data.forecast

            }
        })
    })

})