const LOCATION__API__KEY = 'QXSS9XCRCFTRTLPNRT53LKY6T';

class appBluePrint {
    #parentEl;

    constructor() {
        this.coords = null;
        this.weatherData = {};
        this.#currentDate()
        this.init()
    }

    async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    const { latitude, longitude } = pos.coords;
                    this.coords = { latitude, longitude };
                    resolve(this.coords)
                },
                err => reject(`Failed to get location: ${err.message}`)
            )
        })
    }

    async #dataOfAPI(url) {
        const apiUrl = await fetch(`${url}`);
        const data = await apiUrl.json()
        return data
    }

    async coordinatesToLocationName() {
        try {
            const { latitude, longitude } = this.coords;
            const data = await this.#dataOfAPI(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)

            this.cityAndCountry = data;
            this.weatherData.apiPlaceName = (data.city + data.countryName).toLowerCase();
            this.weatherData.placeName = (data.city + ', ' + data.countryName);

        } catch (err) {
            console.error('Error From Coords Convertor: ', err.message);
        }
    }

    #currentDate() {
        const weekDays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thirsday',
            'Friday',
            'Saturday'
        ]
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]
        const date = new Date();
        const day = weekDays[date.getDay()]
        this.weatherData.day = day;
        this.weatherData.date = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} `;
    }

    render(html) {
        this.#parentEl.innerHTML = ''

        this.#parentEl.insertAdjacentHTML('afterbegin', html);
    }

    /**
     * @author Farzad Khan
     * @summary This Func gets data and then saves all the data with proper formate in an object called weatherData
     * @DataFetchedFrom weather.visualcrossing.com
     */
    async locationData() {
        const data = await this.#dataOfAPI(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.weatherData.apiPlaceName}?unitGroup=us&include=days&key=${LOCATION__API__KEY}&contentType=json`)

        this.weatherData.weekdays = data.days
        this.weatherData.temp = Math.trunc(data.days[0].temp)
        this.weatherData.tempMax = Math.trunc((data.days[0].tempmax - 32) * 5 / 9); // (32°F − 32) × 5/9 = 0°C
        this.weatherData.tempMin = Math.trunc((data.days[0].tempmin - 32) * 5 / 9); // (32°F − 32) × 5/9 = 0°C
        this.weatherData.humidity = Math.trunc((data.days[0].humidity - 32) * 5 / 9); // (32°F − 32) × 5/9 = 0°C
    }

    async todayData() {
        const html = `
            <div class="d-block d-xl-flex align-items-center justify-content-between">
                <div class="today-weather ">
                    <div class="img-review">
                        <div class="location d-flex align-items-center justify-content-start rounded-pill">
                            <i class="fa-solid fa-location-dot"></i>
                            <h6 class="current__location m-0">${this.weatherData.placeName}</h6>
                        </div>
                        <div class="feels-like">
                            <img src="src/Imges/cloud.png" alt="Cloud">
                        </div>
                    </div>
                    <div class="today-info">
                        <div class="info-content">
                            <h3 class="today-day">${this.weatherData.day}</h3>
                            <h5 class="today-date">${this.weatherData.date}</h3>
                        </div>
                        <div class="info-content">
                            <h3 class="today-temp">${Math.trunc((this.weatherData.weekdays[0].temp - 32) * 5 / 9)}°C</h3>
                            <h5 class="today-date">High: ${this.weatherData.tempMax} Low: ${this.weatherData.tempMin}</h3>
                        </div>
                        <div class="info-content">
                            <h3 class="today-temp">${this.weatherData.humidity}°C</h3>
                            <h5 class="today-date">Humidity</h3>
                        </div>
                    </div>
                </div>
                <!--<div class="feels-like displaying">
                    <img src="src/Imges/cloud.png" alt="Cloud">
                </div>-->
            </div>
        `;
        this.#parentEl = document.querySelector('#current__city')
        this.render(html)
    }

    daysManagement(num, variable) {
        const { date, temp } = {
            date: this.weatherData.weekdays[num].datetime,
            temp: Math.trunc((this.weatherData.weekdays[num].temp - 32) * 5 / 9)
        }

        if (!variable)
            return date, temp
        if (variable === 'date')
            return date.slice(-5)
        if (variable === 'temp')
            return temp
    }

    async weekDays() {
        const html = `
            <div class="hour-card">
                <h3>${this.daysManagement(1, 'date')}</h3>
                <img src="src/Imges/cloud.png" alt="">
                <h3>${this.daysManagement(1, 'temp')}°C</h3>
            </div>
            <div class="hour-card">
                <h3>${this.daysManagement(2, 'date')}</h3>
                <img src="src/Imges/cloud.png" alt="">
                <h3>${this.daysManagement(2, 'temp')}°C</h3>
            </div>
            <div class="hour-card">
                <h3>${this.daysManagement(3, 'date')}</h3>
                <img src="src/Imges/cloud.png" alt="">
                <h3>${this.daysManagement(3, 'temp')}°C</h3>
            </div>
            <div class="hour-card">
                <h3>${this.daysManagement(4, 'date')}</h3>
                <img src="src/Imges/cloud.png" alt="">
                <h3>${this.daysManagement(4, 'temp')}°C</h3>
            </div>
            <div class="hour-card">
                <h3>${this.daysManagement(5, 'date')}</h3>
                <img src="src/Imges/cloud.png" alt="">
                <h3>${this.daysManagement(5, 'temp')}°C</h3>
            </div>
            <div class="hour-card">
                <h3>${this.daysManagement(6, 'date')}</h3>
                <img src="src/Imges/cloud.png" alt="">
                <h3>${this.daysManagement(6, 'temp')}°C</h3>
            </div>
        `;
        this.#parentEl = document.querySelector('.hourly')
        this.render(html)
    }

    // Hourly section
    async hourlyData() {
        const data = await this.#dataOfAPI(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.weatherData.apiPlaceName}?unitGroup=us&include=hours&key=${LOCATION__API__KEY}&contentType=json`)
        this.weatherData.hours = []
        this.weatherData.temp = []

        data.days[0].hours.map(data => {
            this.weatherData.hours.push(data.datetime)
        })

        data.days[0].hours.map(data => {
            this.weatherData.temp.push(Math.trunc((data.temp - 32) * 5 / 9))
        })

        const actualHours = this.weatherData.hours.map(hour => hour.slice(0, 3))
        this.#chartManagement(actualHours, this.weatherData.temp)
    }

    #chartManagement(labels, data) {
        // chart information
        const ctx = document.getElementById('myChart');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Hourly Temp Status',
                    data,
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    // Sunrise, sunset, UV index, windindex
    dayEvents() {
        this.#parentEl = document.querySelector('#dayEvents')


        const sunrise = `${this.weatherData.weekdays[0].sunrise.slice(1, 5)} AM`;
        const sunset = `${Math.trunc(this.weatherData.weekdays[0].sunset.slice(0, 2) - 12) + this.weatherData.weekdays[0].sunset.slice(2, 5)} PM`;
        const uvIndex = this.weatherData.weekdays[0].uvindex;
        const windSpeed = this.weatherData.weekdays[0].windspeed + ' km/h';

        const html = `
            <div id="RISE" class="city-info">
                    <div class="city-content">
                        <h3>${sunrise}</h3>
                        <h5>Sunrise</h5>
                    </div>
                    <div class="city-img">
                        <img src="src/Imges/sunrise-removebg-preview.png" alt="Cloud">
                    </div>
                </div>
            <div id="SET" class="city-info">
                <div class="city-content">
                    <h3>${sunset}</h3>
                    <h5>Sunset</h5>
                </div>
                <div class="city-img">
                    <img src="src/Imges/sunset.png" alt="Cloud">
                </div>
            </div>
            <div id="UV" class="city-info">
                <div class="city-content">
                    <h3>${windSpeed}</h3>
                    <h5>Windspeed</h5>
                </div>
                <div class="city-img">
                     <i style="color: #eca914; font-size: 3rem;" class="fa-solid fa-wind"></i>
                </div>
            </div>
            <div id="WIND" class="city-info">
                <div class="city-content">
                    <h3>${uvIndex}</h3>
                    <h5>UV Index</h5>
                </div>
                <div class="city-img">
                    <img src="src/Imges/cloud.png" alt="Cloud">
                </div>
            </div>
        `;

        this.render(html)
    }

    async init() {
        try {
            await this.getCurrentLocation();
            await this.coordinatesToLocationName();
            await this.locationData();
            this.todayData();
            this.weekDays();
            await this.hourlyData()
            this.dayEvents()
        } catch (err) {
            console.error(err)
        }
    }
}

const WeatherApp = new appBluePrint();