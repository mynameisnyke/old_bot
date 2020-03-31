const Discord = require('discord.js');
const axios = require('axios');
const bot = new Discord.Client();
const fetch = require('node-fetch');
const weather = require('openweather-apis');
const weather_token = process.env.weatherToken;
const discordToken = process.env.discordToken;
let cityName = 'tokyo';
let api_url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + weather_token;


// const response = await fetch(api_url);


// const date; 

const prefix = '!';

bot.on("ready", () => { 
    console.log('This bot is online');
})

bot.on("message", async msg => {
    if(!msg.content.startsWith(prefix)){
    return;
}
const args = msg.content.slice(prefix.length).trim().split(/ + /g);
const command = args.shift().toLowerCase();

if(command === 'weather is good' || 'Muske' || 'Midioka'){
    let getWeather = async () => {
        let response = await axios.get(api_url);
        let weather = response.data;
        return weather;
    }
    let weatherValue = await getWeather();
    console.log(getWeather);
    let icon =  weatherValue.weather.icon;
    let currentWeather = weatherValue
    // var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
    var ktof = (parseFloat(weatherValue.main.feels_like)-273.15)*1.8 + 32.0;
    var ktoc = (parseFloat(weatherValue.main.feels_like))-273.15;
    
    // let attachment = new Attachment(iconurl);
    console.log(ktof);
    console.log(ktoc);
    let greeting = '';
    switch(weatherValue.weather[0].main){
    case 'Clear':
        greeting = 'Konichiwa ^^ ! Weather is good isn\'t it? I like the weather too!' 
        break;
    case 'Clouds':
        greeting = 'Konichiwa ^^ ! Weather is noto so goodo desu.' 
        break;
    case 'Rain':
        greeting = 'Konichiwa ^^ ! Weather is noto goodo desu.' 
        break;
    default:  
        greeting = 'Konichiwa ^^ !'
        break;
    }

    msg.reply( '\n' + greeting + '\nRight now the weather in Tokyo is ' + weatherValue.weather[0].main + ' desu.\n\nThe tempreture is ' +
    Math.round(ktof*10.0)/10.0 + " F " + '(' + Math.round(ktoc*10.0)/10 + ' C) desu^^.');
    // msg.channel.send(msg.auther, attachment);
}

});


bot.login(discordToken);


// if(command === 'weather is good'){
//     let getWeather = async () => {
//         let response = await axios.get(api_url);
//         let weather = response.data;
//         return weather;
//     }
//     let weatherValue = await getWeather();
//     console.log(getWeather);
//     msg.reply( weatherValue.temp + ' desu.');
// }
// // bot.on('message', msg =>{
//     if(msg.content === "weather is good"){
//         weather.getTemperature(function(err, temp){
//             console.log(temp);
//         });
//         let setting ={ method: "Get"};

//     fetch(api_url, setting)
//     .then(res => res.json())
//     .then((json)=>{
//     var temp = res.main.temp;
//     })
//         msg.reply( temp + 'desu.');     
//     }
// })


// bot.on('message', msg =>{
//     if(msg.content === "muske" || "yusuke" || "mutec" || "Mutec" || "Muske" || "Yusuke"){
//         msg.reply('Did you just call me?');     
//     }
// })


