const APIKEY = `1d4f6a5bce1c4a2ec3422ef219df4c83`
const form = document.querySelector("#form");
const searchBox = document.querySelector("#input-box");
const submitBtn = document.querySelector("#submit");
const appBody = document.querySelector(".app-content");

// on browser load
window.addEventListener("load", () => {
    navigator.geolocation.getCurrentPosition((position) => {
        getCurrentWeather(position.coords.latitude, position.coords.longitude);
    });
      

    async function getCurrentWeather(latt, lont) {
        let lat = latt;
        let lon = lont;
        const serverResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=`+APIKEY);
        const resp = await serverResponse.json();
        const response = resp;
        showWeather(response);
    }

    function showWeather(weatherdata){
        const data = weatherdata;

        appBody.innerHTML = ``
        appBody.innerHTML = `
            <div class="first-section">
                <div class="img-cont">
                    <img src="/icons/${data.weather[0].icon}.png" alt="">
                </div>
                <div class="weather-description">
                    <div class="nain">${data.weather[0].main}</div>
                    <div class="description">${data.weather[0].description}</div>
                </div>
            </div>

            <div class="second-section">
                <div class="location">
                    ${data.name} <span class="country">${data.sys.country}</span>
                </div>

                <div class="temp">${Math.floor(data.main.temp_max - 273.15)}<span class="small">°C</span></div>
            </div>

            <div class="third-section">
                <div class="longitude">Longitude: ${data.coord.lon}</div>
                <div class="latitude">Latitude: ${data.coord.lat}</div>
                <div class="wind-speed">Wind Speed: ${data.wind.speed}km</div>
                <div class="wind-angle">Wind Angle: ${data.wind.deg}deg</div>
            </div>

        `
        
    }

})

form.addEventListener("submit", (e) => {
    e.preventDefault();
})




// for input section

submitBtn.addEventListener("click", () => {
    const userInput = searchBox.value;
    searchBox.value = "";
    getGeolocation(userInput)
})

async function getGeolocation(userInput){
    const serverResponse = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=`+APIKEY);
    const resp = await serverResponse.json();
    const response = resp[0];
    const data = response;
    getCurrentWeather(data);
}

async function getCurrentWeather(data) {
    let lat = data.lat;
    let lon = data.lon;
    const serverResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=`+APIKEY);
    const resp = await serverResponse.json();
    const response = resp;
    showWeather(response);
}

function showWeather(weatherdata){
    const data = weatherdata;

    appBody.innerHTML = ``
    appBody.innerHTML = `
        <div class="first-section">
            <div class="img-cont">
                <img src="/icons/${data.weather[0].icon}.png" alt="">
            </div>
            <div class="weather-description">
                <div class="nain">${data.weather[0].main}</div>
                <div class="description">${data.weather[0].description}</div>
            </div>
        </div>

        <div class="second-section">
            <div class="location">
                ${data.name} <span class="country">${data.sys.country}</span>
            </div>

            <div class="temp">${Math.floor(data.main.temp_max - 273.15)}<span class="small">°C</span></div>
        </div>

        <div class="third-section">
            <div class="longitude">Longitude: ${data.coord.lon}</div>
            <div class="latitude">Latitude: ${data.coord.lat}</div>
            <div class="wind-speed">Wind Speed: ${data.wind.speed}km</div>
            <div class="wind-angle">Wind Angle: ${data.wind.deg}deg</div>
        </div>

    `
        
}