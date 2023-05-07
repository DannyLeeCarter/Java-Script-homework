function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '8c0b8c675c461f13b651701d887e0c1a';
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        const weatherDiv = document.getElementById('weather');
        const temperature = data.main.temp;
        const temperatureInFahrenheit = Math.round(temperature * 9/5 + 32) + '\xB0';
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        
        weatherDiv.innerHTML = `
          <p>Temperature: ${temperatureInFahrenheit}</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
        `;
      })
      .catch(err => 
        console.log(err));
    };