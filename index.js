const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "68a0f1d0a679cb6b2a5c068b0ea07bc8";
  const city = document.querySelector(".search-box input").value;
  console.log(city)

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (data.weather[0].main) {
        case "Clouds":
          image.src = "images/cloudy.png";
          break;
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rainy.png";
          break;
        case "Snow":
          image.src = "images/snowy.png";
          break;
        case "haze":
          image.src = "images/haze.png";
          break;
        default:
          image.src = ""; 
      }

      temperature.innerHTML = `${parseInt(data.main.temp - 273)}°C`; 
      description.innerHTML = `${data.weather[0].description}`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${parseInt(data.wind.speed)} Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";

    });
});
