
var city = document.querySelector("#city-input");
var getButton = document.querySelector("#get-weather");
var result = document.querySelector("#result-div");

async function getWeather(details) {

        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=e3f416aa7b1e4986bdd34752252606&q=${details}&aqi=yes`);
        const jsonRes = await response.json();

        if(!jsonRes)
        {
                result.textContent = "Failed to fetch Weather Data.";
        }

        const temperature = jsonRes.current.temp_c;
        const weatherCondition = jsonRes.current.condition.text;
        const weatherCity = jsonRes.location.name;
        const weatherRegion = jsonRes.location.region;
        const weatherCountry = jsonRes.location.country;

        console.log(temperature);
        console.log(weatherCondition);
        console.log(weatherCity);
        console.log(weatherRegion);
        console.log(weatherCountry);

        result.innerHTML = `<h3>Temperature : </h3><p>${temperature} &degC</p> <br />
                            <h3>Location : </h3><p>${weatherCity}, ${weatherRegion}, ${weatherCountry}</p> <br />
                            <h3>Condition : </h3><p>${weatherCondition}</p>`;

}

getButton.addEventListener("click", function() {

        const buttonValue = city.value;

        getWeather(buttonValue);

});



