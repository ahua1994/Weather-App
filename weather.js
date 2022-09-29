const input = document.querySelector("#input");
const search = document.querySelector("#search");
const clear = document.querySelector("#clear");

let cities = [];

const cardGroup = document.querySelector(".card-group");

async function getWeather() {
    let name = input.value;
    if (cities.includes(name)) {
        window.alert("Already Displayed");
        return;
    }
    let apiKey = "c2b94417d0c1c477f0618f5c852411f5";
    let api = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`
    );
    if (!api.ok) {
        window.alert("City does not exist!");
        return;
    }
    let city = await api.json();

    cities.push(name);
    input.value = "";
    console.log(city);
    weatherCard(city);
}

function weatherCard(city) {
    let rainy = ["Rain", "Drizzle", "Thunderstorm"];
    let image =
        "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp";
    if (city.weather[0].main == "Clear") {
        image = `https://images.unsplash.com/12/sun-trees.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1640&q=80`;
    } else if (rainy.includes(city.weather[0].main)) {
        image = `https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1534274988757-a28bf1a57c17%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxM%5B%E2%80%A6%5DG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D735%26q%3D80https%3A%2F%2Fimages.unsplash.com%2Fphoto-1534274988757-a28bf1a57c17%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxM%5B%E2%80%A6%5DG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D735%26q%3D80`;
    } else if (city.weather[0].main == "Snow") {
        image = `https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1613343868927-889e61bac00d%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxzZWFyY2h8MjR8fHNub3clMjBjaXR5fGVufDB8fDB8fA%253D%253D%26auto%3Dformat%26fit%3Dcrop%26w%3D500%26q%3D60`;
    } else if (city.weather[0].main == "Clouds") {
        image = `https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1536532184021-da5392b55da1%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1470%26q%3D80`;
    }
    let cities = `<div class="card bg-dark text-white col-12 col-sm-6 col-lg-3" style="border-radius: 40px;">
    <div class="bg-image" style="border-radius: 35px;">
        <img src=${image}
            class="card-img" alt="weather" style="border-radius: 40px;" />
        <div class="mask" style="background-color: rgba(190, 216, 232, .5);"></div>
    </div>
    <div class="card-img-overlay text-dark p-5">
        <h4 class="mb-0">${city.name}, ${city.sys.country}</h4>
        <p class="display-2 my-3">${city.main.temp}°C</p>
        <p class="mb-2">Feels Like: <strong>${city.main["feels_like"]}°C</strong></p>
        <h5>${city.weather[0].main}</h5>
    </div>
</div>`;

    cardGroup.innerHTML += cities;
}

function clearWeather() {
    cities = [];
    cardGroup.innerHTML = "";
    input.value = "";
}

search.addEventListener("click", getWeather);

clear.addEventListener("click", clearWeather);

//cityname, country, state/province, temp, weather, feels like
