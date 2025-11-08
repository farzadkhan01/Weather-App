const LOCATION__API__KEY = 'QXSS9XCRCFTRTLPNRT53LKY6T'

class appBluePrint {

    constructor() {
        this.coords = null;
        this.weatherData = {
        };
        this.currentDate()

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
            console.log(data)
            this.weatherData.apiPlaceName = (data.city + data.countryName).toLowerCase()
            this.weatherData.placeName = (data.city + ', ' + data.countryName)
        } catch (err) {
            console.error('Error From Coords Convertor: ', err.message);
        }
    }

    currentDate() {
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

    async locationData() {
        const countryInfo = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.weatherData.apiPlaceName}?unitGroup=us&include=days&key=${LOCATION__API__KEY}&contentType=json`)
        const data = await countryInfo.json()
        this.weatherData.TotalData = data;

        this.weatherData.temp = Math.trunc(this.weatherData.TotalData.days[0].temp)
        this.weatherData.tempMax = Math.trunc(this.weatherData.TotalData.days[0].tempmax)
        this.weatherData.tempMin = Math.trunc(this.weatherData.TotalData.days[0].tempmin)
        this.weatherData.feelsLike = Math.trunc(this.weatherData.TotalData.days[0].temp)




        console.log(this.weatherData)
    }

    async currentDay() {
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
                            <h3 class="today-temp">${Math.trunc(this.weatherData.TotalData.days[0].temp)}</h3>
                            <h5 class="today-date">High:  Low: 10</h3>
                        </div>
                        <div class="info-content">
                            <h3 class="today-temp">26°C</h3>
                            <h5 class="today-date">Feels Like</h3>
                        </div>
                    </div>
                </div>
                <div class="feels-like displaying">
                    <img src="src/Imges/cloud.png" alt="Cloud">
                </div>
            </div>
        `;
        // console.log(html)
    }

    async init() {
        try {
            await this.getCurrentLocation();
            await this.coordinatesToLocationName();
            await this.locationData()
            await this.currentDay() // there is an HTML elements which loaded first then before i want this to run after the upperfunction runs
        } catch (err) {
            console.error(err)
        }
    }
}

const WeatherApp = new appBluePrint();
WeatherApp.init()