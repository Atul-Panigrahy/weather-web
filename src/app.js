
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname);//directory where file exist in system
// console.log(__filename);//directory of filename in system

// console.log(path.join(__dirname));

// console.log(path.join(__dirname, '../public'));

const app = express()

//define paths for express config.
// const publicDirectoryPath = path.join(__dirname, '../public'); //used for hosting static page
const publicDirectoryPath = path.join(__dirname, '../public'); // but we need dynamic one
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//setup handlebars engine and views location
app.set('view engine', 'hbs');//get handlebar set up to use it for dynamic template
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//setup static directory to serve
app.use(express.static(publicDirectoryPath));//static webpage


//app.com
//app.com/help
//app.com/about

// app.get('', (req,res) =>{

//     // res.send('Hello Express!');  //passing string
//     res.send('<h1>Weather Website</h1>');  //passing html tag

// })



app.get('', (req,res ) => {
    res.render('index',{
        title:'weather',
        name:'Elon musk'
    });// render allowes us to render one of our views 
})


app.get('/about', (req,res) => {
    // res.send('about page');
    
    res.render('about',{
        title:'about me',
        name:'Atp' 
    })
})

app.get('/help', (req,res) => {
   
    // res.send({
    //     name:'elon',
    //     title:'musk',
    //     cars:['ford','tesla','hyundai']
    // })
    res.render('help',{
        helpContent:'this website is created using nodeJS,expressJS,handlebar(hbs) ',
        title:'help',
        name:'atp'
    })

})


app.get('/weather', (req,res) => {

    if(!req.query.address){//only if no search key provided in query string
        return  res.send({
             error: 'You must provide a address'
         })
     }

    
    
    geocode( req.query.address,(error,data={}) => {

        if(error){
            return  res.send({
                error: error
            })
        }
        
        forecast(data.lattitude, data.longitude, (error, forecastData) => {

            if(error){
                return  res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location:data.location,
                address: req.query.address
            });
        })

    })

    // res.send({
    //     forecast: returnValue,
    //     location: req.query.address
    // });

})

// app.get('/products',(req,res)=>{
//     console.log(req.query);//use of query string

//     if(!req.query.search){//only if no search key provided in query string
//        return  res.send({
//             error: 'You must provide a search item'
//         })
//     }

//     res.send({
//         products:[]
//     })
// })

// to more precsice app.com/help/anyting
app.get('/help/*',(req,res)=>{
    // res.send('help article not found');
    res.render('error',{
        errorMessage:'help article not found'
    })
})


// if none of the links matched then use this wildcard character
app.get('*',(req,res) => {
    // res.send('error 404: no such link found');
    res.render('error',{
        errorMessage:'error 404: no such link found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

