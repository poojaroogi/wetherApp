const apiKey = "11861e41a041ccded0ec9870ba316361"; 

async function showSuggestions() {
  const query = document.getElementById("locationInput").value;
  const suggestionsBox = document.getElementById("suggestions");
  suggestionsBox.innerHTML = "";

  if (query.length < 2) return;

  try {
    const res = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "3662ec2d09msh5d5e3b5a676e96dp1043a4jsn83198ffc2159",  
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
        }
      }
    );

    const data = await res.json();
    const cities = data.data;

    cities.forEach((city) => {
      const div = document.createElement("div");
      div.textContent = `${city.city}, ${city.countryCode}`;
      div.onclick = () => {
        document.getElementById("locationInput").value = city.city;
        suggestionsBox.innerHTML = "";
      };
      suggestionsBox.appendChild(div);
    });
  } catch (error) {
    console.log("Suggestions error:", error);
  }
}
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}


async function getWeather() {
  const location = document.getElementById("locationInput").value;
  const errorElement = document.getElementById("error");
  const weatherCard = document.getElementById("weatherCard");

  if (!location) {
    errorElement.textContent = "⚠️ Please enter a location.";
    weatherCard.classList.add("hidden");
    return;
  }

  try {
    console.log("Searching weather for:", location);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("Not found");

    const data = await response.json();
    errorElement.textContent = "";
    const iconCode = data.weather[0].icon;
const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

weatherCard.innerHTML = `
  <img src="${iconUrl}" alt="weather icon" style="width:100px;height:100px;" />
  <h2>📍 ${data.name}, ${data.sys.country}</h2>
  <p>🌡️ Temperature: ${data.main.temp} °C</p>
  <p>☁️ Condition: ${data.weather[0].description}</p>
  <p>💧 Humidity: ${data.main.humidity}%</p>
  <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
`;

    weatherCard.classList.remove("hidden");
  } catch (error) {
    errorElement.textContent = "❌ Location not found. Try again!";
    weatherCard.classList.add("hidden");
  }
}
