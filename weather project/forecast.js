document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weatherForm');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const city = document.getElementById('city').value.trim();
        const apiKey = 'YOUR_API_KEY';  
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        clearWeatherInfo();
        cityName.textContent = 'Loading...';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`City not found (${response.status})`);
            }

            const data = await response.json();
            updateWeatherInfo(data);
        } catch (error) {
            console.error('Error fetching the weather data:', error);
            cityName.textContent = 'Error fetching weather data';
            temperature.textContent = '';
            description.textContent = '';
        }
    });

    function clearWeatherInfo() {
        cityName.textContent = '';
        temperature.textContent = '';
        description.textContent = '';
    }

    function updateWeatherInfo(data) {
        if (data.cod === 200) {
            cityName.textContent = data.name;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            description.textContent = `Description: ${capitalizeFirstLetter(data.weather[0].description)}`;
        } else {
            cityName.textContent = 'City not found';
            temperature.textContent = '';
            description.textContent = '';
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
