const LOCATION__API__KEY = 'QXSS9XCRCFTRTLPNRT53LKY6T';

class appBluePrint {
    #parentEl;

    constructor() {
        this.coords = null;
        this.weatherData = {};
        this.#currentDate()

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

    async coordinatesToLocationName() {
        try {
            const { latitude, longitude } = this.coords;

            const locationInfo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            const data = await locationInfo.json()
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

    /**
     * @author Farzad Khan
     * @summary This Func gets data and then saves all the data with proper formate in an object called weatherData
     * @DataFetchedFrom weather.visualcrossing.com
     */
    async locationData() {
        const countryInfo = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.weatherData.apiPlaceName}?unitGroup=us&include=days&key=${LOCATION__API__KEY}&contentType=json`)
        const data = await countryInfo.json()


        this.weatherData.weekdays = data.days
        this.weatherData.temp = Math.trunc(data.days[0].temp)
        this.weatherData.tempMax = Math.trunc((data.days[0].tempmax - 32) * 5 / 9) // (32°F − 32) × 5/9 = 0°C
        this.weatherData.tempMin = Math.trunc((data.days[0].tempmin - 32) * 5 / 9) // (32°F − 32) × 5/9 = 0°C
        this.weatherData.humidity = Math.trunc((data.days[0].humidity - 32) * 5 / 9)
        console.log(this.weatherData.tempMax, this.weatherData.tempMin, this.weatherData.humidity)
        // Data of section (Weekdays)
        this.weatherData.day1 = this.daysManagement(1)
        this.weatherData.day2 = this.daysManagement(2)
        this.weatherData.day3 = this.daysManagement(3)
        this.weatherData.day4 = this.daysManagement(4)
        this.weatherData.day5 = this.daysManagement(5)
        this.weatherData.day6 = this.daysManagement(6)
        console.log(this.weatherData)

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
        this.#parentEl.innerHTML = ''

        this.#parentEl.insertAdjacentHTML('afterbegin', html);
    }

    daysManagement(num, variable) {
        const { date, temp } = { date: this.weatherData.weekdays[num].datetime, temp: this.weatherData.weekdays[num].temp }
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
        console.log(html)
        this.#parentEl = document.querySelector('.hourly')
        this.#parentEl.innerHTML = ''

        this.#parentEl.insertAdjacentHTML('beforeend', html);

    }

    async init() {
        try {
            await this.getCurrentLocation();
            await this.coordinatesToLocationName();
            await this.locationData();
            this.todayData();
            this.weekDays();
            console.log(this.daysManagement(1, 'date'))
        } catch (err) {
            console.error(err)
        }
    }
}

const WeatherApp = new appBluePrint();
WeatherApp.init()