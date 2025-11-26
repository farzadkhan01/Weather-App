class appBluePrint {
    async todayData(parentEl, weatherData) {
        try {
            const html = `
            <div class="d-block d-xl-flex align-items-center justify-content-between">
                <div class="today-weather ">
                    <div class="img-review">
                        <div class="location d-flex align-items-center justify-content-start rounded-pill">
                            <i class="fa-solid fa-location-dot"></i>
                            <h6 class="current__location m-0">${weatherData.placeName}</h6>
                        </div>
                        <div class="feels-like">
                            <img src="src/Imges/cloud.png" alt="Cloud">
                        </div>
                    </div>
                    <div class="today-info">
                        <div class="info-content">
                            <h3 class="today-day">${weatherData.day}</h3>
                            <h5 class="today-date">${weatherData.date}</h3>
                        </div>
                        <div class="info-content">
                            <h3 class="today-temp">${Math.trunc((weatherData.weekdays[0].temp - 32) * 5 / 9)}°C</h3>
                            <h5 class="today-date">High: ${weatherData.tempMax} Low: ${weatherData.tempMin}</h3>
                        </div>
                        <div class="info-content">
                            <h3 class="today-temp">${weatherData.humidity}%</h3>
                            <h5 class="today-date">Humidity</h3>
                        </div>
                    </div>
                </div>
                <!--<div class="feels-like displaying">
                    <img src="src/Imges/cloud.png" alt="Cloud">
                </div>-->
            </div>
        `;

            parentEl = document.querySelector('#current__city')
            return { parentEl, html };
        } catch (err) {
            console.error(err.message)
        }
    }

    daysManagement(weatherData, num, variable) {
        const { date, temp } = {
            date: weatherData.weekdays[num].datetime,
            temp: Math.trunc((weatherData.weekdays[num].temp - 32) * 5 / 9)
        }

        if (!variable)
            return date, temp
        if (variable === 'date')
            return date.slice(-5)
        if (variable === 'temp')
            return temp
    }

    async weekDays(parentEl, weatherData) {
        try {
            const html = `
            <div class="hour-card">
                <h3>${this.daysManagement(weatherData, 1, 'date')}</h3>
                <img src="src/Imges/cloud.png" alt="">
                <h3>${this.daysManagement(weatherData, 1, 'temp')}°C</h3>
            </div>
            <div class="hour-card">
                <h3>${this.daysManagement(weatherData, 2, 'date')}</h3>
                <img src="src/Imges/cloud.png" alt="">
                <h3>${this.daysManagement(weatherData, 2, 'temp')}°C</h3>
            </div>
            <div class="hour-card">
                <h3>${this.daysManagement(weatherData, 3, 'date')}</h3>
                <img src="src/Imges/cloud.png" alt="">
                <h3>${this.daysManagement(weatherData, 3, 'temp')}°C</h3>
            </div>
            <div class="hour-card">
                <h3>${this.daysManagement(weatherData, 4, 'date')}</h3>
                <img src="src/Imges/cloud.png" alt="">
                <h3>${this.daysManagement(weatherData, 4, 'temp')}°C</h3>
            </div>
            <div class="hour-card">
                <h3>${this.daysManagement(weatherData, 5, 'date')}</h3>
                <img src="src/Imges/cloud.png" alt="">
                <h3>${this.daysManagement(weatherData, 5, 'temp')}°C</h3>
            </div>
            <div class="hour-card">
                <h3>${this.daysManagement(weatherData, 6, 'date')}</h3>
                <img src="src/Imges/cloud.png" alt="">
                <h3>${this.daysManagement(weatherData, 6, 'temp')}°C</h3>
            </div>
        `;

            parentEl = document.querySelector('.hourly')
            return { parentEl, html }
        } catch (err) {
            console.error(err.message)
        }
    }

    // Sunrise, sunset, UV index, windindex
    async dayEvents(parentEl, weatherData) {
        try {
            const sunrise = `${weatherData.weekdays[0].sunrise.slice(1, 5)} AM`;
            const sunset = `${Math.trunc(weatherData.weekdays[0].sunset.slice(0, 2) - 12) + weatherData.weekdays[0].sunset.slice(2, 5)} PM`;
            const uvIndex = weatherData.weekdays[0].uvindex;
            const windSpeed = weatherData.weekdays[0].windspeed + ' km/h';

            const html = `
            <div id="RISE" class="col city-info">
                    <div class="city-content">
                        <h3>${sunrise}</h3>
                        <h5>Sunrise</h5>
                    </div>
                    <div class="city-img">
                        <img src="src/Imges/sunrise-removebg-preview.png" alt="Cloud">
                    </div>
                </div>
            <div id="SET" class="col city-info">
                <div class="city-content">
                    <h3>${sunset}</h3>
                    <h5>Sunset</h5>
                </div>
                <div class="city-img">
                    <img src="src/Imges/sunset.png" alt="Cloud">
                </div>
            </div>
            <div id="UV" class="col city-info">
                <div class="city-content">
                    <h3>${windSpeed}</h3>
                    <h5>Windspeed</h5>
                </div>
                <div class="city-img">
                     <i style="color: #eca914; font-size: 3rem;" class="fa-solid fa-wind"></i>
                </div>
            </div>
            <div id="WIND" class="col city-info">
                <div class="city-content">
                    <h3>${uvIndex}</h3>
                    <h5>UV Index</h5>
                </div>
                <div class="city-img">
                   <img src="src/Imges/uv.png" alt="Cloud">
                </div>
            </div>
        `;

            parentEl = document.querySelector('#dayEvents')
            return { parentEl, html }
        } catch (err) {
            console.error(err.message)
        }
    }
}

export const heroSection = new appBluePrint();