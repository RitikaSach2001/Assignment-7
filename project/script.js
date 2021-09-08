 let appId = '71f6779186cc32448b4c412eea65b982';
let units = 'metric';
let searchMethod; // q means searching as a string.
 
function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}
 
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`)
        .then((result) => {
            return result.json();
        }).then((res) => {
            init(res);
    });
}
 
function init(resultFromServer) {
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/175910.jpg')";
            break;
   
        case 'Clouds':
            document.body.style.backgroundImage = "url('https://media.istockphoto.com/photos/overcast-clouds-before-the-rain-landscape-background-hd-picture-id1146832301?k=6&m=1146832301&s=170667a&w=0&h=LlicE4gKhg2AZyKoKT2sdDPMHDW0hJqhIz_GArBiAaM=')";
            break;
 
        case 'Rain':
        case 'Drizzle':
            document.body.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2020/04/28/02/12/nature-5102320_960_720.jpg')";
            break;
 
        case 'Mist':
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1504335089263-e69fcfef931e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Zm9nZ3klMjBza3l8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80')";
            break;    
        
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('https://ichef.bbci.co.uk/news/976/cpsprodpb/62EB/production/_107832352_66753558_10219668449930342_4040915041229209600_o.jpg')";
            break;
        
        case 'Snow':
            document.body.style.backgroundImage = "url('https://previews.123rf.com/images/candy18/candy181611/candy18161100080/66130904-pine-trees-covered-with-snow-on-frosty-evening-beautiful-winter-panorama-at-snowfall.jpg')";
            break;
 
        default:
            break;
    }
 
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
 
    let weatherIcon = document.getElementById('documentIconImg');
    weatherIcon.src = 'http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';
 
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176;';
    windSpeedElement.innerHTML = 'Wind Speed: ' + Math.floor(resultFromServer.wind.speed) + ' meter/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels: ' + resultFromServer.main.humidity +  '%';
 
    setPositionForWeatherInfo();
}
 
function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;
 
    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}
 
document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm)
        searchWeather(searchTerm);
});