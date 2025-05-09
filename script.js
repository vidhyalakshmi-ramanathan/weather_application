
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const body = document.querySelector('body');

search.addEventListener('click', handleSearch);
document.querySelector('.search-box input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        handleSearch(); 
    }
});

function handleSearch() {
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json =>{
        if (json.cod == '404'){
            cityHide.textContent = city;
            body.style.backgroundImage =  "url('assests/back.jpg')";
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
    
        if (cityHide.textContent ==city){
            return;
        }
        else{
            cityHide.textContent =city;    
            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
               container.classList.remove('active') ;
            }, 2500);
            
        
        
            const currentTime = new Date().getTime() / 1000; // current time in seconds
            const sunrise = json.sys.sunrise; // sunrise time in seconds
            const sunset = json.sys.sunset; // sunset time in seconds

            // Determine if it's day or night based on sunrise and sunset
            const isDay = currentTime >= sunrise && currentTime <= sunset;


            switch(json.weather[0].main){
                case 'Clear':
                    image.src = isDay ? 'assests/sun/sunny-d.jpg' : 'assests/sun/cloudy-n.jpg'; 
                    body.style.backgroundImage = isDay 
                    ? "url('assests/sun/cloud-bg.jpg')"
                    : "url('assests/sun/nightbg.jpg' )"; 
                    body.style.backgroundSize = 'cover';
                    container.classList.remove('cloudy');
                    break;
                case 'Rain':
                    image.src = 'assests/rain/rainy.png';
                    body.style.backgroundImage = "url('assests/rain/rain-bg.jpg')";
                    body.style.backgroundSize = 'cover';
                    container.classList.remove('cloudy');
                    break; 
                case 'Clouds':
                    image.src = isDay ? 'assests/sun/cloudy-d.jpg' : 'assests/sun/cloudy-n.jpg'; 
                    body.style.backgroundImage = isDay 
                    ? "url('assests/sun/cloud-bg.jpg')"
                    : "url('assests/sun/nightbg.jpg' )"; 
                    body.style.backgroundSize = 'cover';
                    if (isDay) {
                        container.classList.add('cloudy');  
                    } else {
                        container.classList.remove('cloudy');}
                    break;
                case 'Snow':
                    image.src = 'assests/snow/snow.jpg';
                    body.style.backgroundImage = "url('assests/snow/snow-bg.jpg')";
                    body.style.backgroundSize = 'cover';
                    container.classList.remove('cloudy');
                    break;
                case 'Mist':
                    image.src = 'assests/others/mist.png';
                    body.classList.remove('cloudy');
                    body.style.backgroundImage = isDay 
                    ? "url('assests/sun/cloud-bg.jpg')"
                    : "url('assests/sun/nightbg.jpg' )"; 
                    body.style.backgroundSize = 'cover';
                    if (isDay) {
                        container.classList.add('cloudy');  
                    } else {
                        container.classList.remove('cloudy');}
                    break;
                case 'Thunderstrom':
                    image.src = 'assests/rain/rainy.png';
                    body.style.backgroundImage = "url('assests/rain/rainy.png')";
                    body.style.backgroundSize = 'cover';
                    container.classList.remove('cloudy');
                    break;
                case 'Fog':
                    image.src = 'assests/others/fog.png';
                    body.style.backgroundImage = isDay 
                    ? "url('assests/sun/cloud-bg.jpg')" 
                    : "url('assests/sun/nightbg.jpg' )"; 
                    body.style.backgroundSize = 'cover';
                    if (isDay) {
                        container.classList.add('cloudy');  
                    } else {
                        container.classList.remove('cloudy');}
                    break;
                case 'Haze':
                    image.src = 'assests/others/haze.jpg';
                    body.style.backgroundImage = isDay 
                    ? "url('assests/sun/cloud-bg.jpg')" 
                    : "url('assests/sun/nightbg.jpg' )"; 
                    body.style.backgroundSize = 'cover';
                    if (isDay) {
                        container.classList.add('cloudy');  
                    } else {
                        container.classList.remove('cloudy');}
                    break;
                default:
                    image.src = isDay ? 'assests/sun/sunny-d.jpg' : 'assests/sun/cloudy-n.jpg'; 
                    body.style.backgroundImage = isDay 
                    ? "url('assests/sun/cloud-bg.jpg')" 
                    : "url('assests/sun/nightbg.jpg' )"; 
                    body.style.backgroundSize = 'cover';
                    if (isDay) {
                        container.classList.add('cloudy');  
                    } else {
                        container.classList.remove('cloudy');}
            }
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML  = `${json.weather[0].description}`;
            humidity.innerHTML =  `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');
            
            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');

            
            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend",elCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend",elCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend",elCloneInfoWind);
            },2200);
            const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather = cloneInfoWeather.length;
            const cloneInfoWeatherFirst = cloneInfoWeather[0];

            const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];

            const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
            const cloneInfoWindFirst = cloneInfoWind[0];
            
            if (totalCloneInfoWeather > 0){
                cloneInfoWeatherFirst.classList.remove('active-clone');
                cloneInfoHumidityFirst.classList.remove('active-clone');
                cloneInfoWindFirst.classList.remove('active-clone');
                
                setTimeout(() => {
                    cloneInfoWeatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                    cloneInfoWindFirst.remove();
                },2200);
            }

        }  
    });
}