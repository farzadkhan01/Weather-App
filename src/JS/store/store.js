
const LOCATION__API__KEY = 'QXSS9XCRCFTRTLPNRT53LKY6T';

export class storeData {
    parentEl;

    constructor() {
        this.coords = null;
        this.weatherData = {};
        // this.init();
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

    async dataOfAPI(url) {
        const apiUrl = await fetch(`${url}`);
        const data = await apiUrl.json()
        return data
    }

    async coordinatesToLocationName() {
        try {
            const { latitude, longitude } = this.coords;
            const data = await this.dataOfAPI(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)

            this.cityAndCountry = data;
            this.weatherData.apiPlaceName = (data.city + data.countryName).toLowerCase();
            this.weatherData.placeName = (data.city + ', ' + data.countryName);

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
            'Noveer',
            'December',
        ]
        const date = new Date();
        const day = weekDays[date.getDay()]
        this.weatherData.day = day;
        this.weatherData.date = `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} `;
    }

    render(parentEl, html) {

        parentEl.innerHTML = ''

        parentEl.insertAdjacentHTML('afterbegin', html);
    }

    async addingHourData(hour, data, number) {
        try {

            if (hour === 'h') {
                data.weekdays[number].hours.map(data => {
                    this.weatherData.dayHours.push(data.datetime)
                })

                const h = this.weatherData.dayHours;
                return h;
            }

            if (hour === 't') {
                data.weekdays[number].hours.map(data => {
                    this.weatherData.temp.push(Math.trunc((data.temp - 32) * 5 / 9))
                })

                const t = this.weatherData.temp;
                return t;
            }

        } catch (error) {
            console.error(error)
        }

    }

    // Hourly section
    async hourlyData() {
        try {
            const data = await this.dataOfAPI(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.weatherData.apiPlaceName}?unitGroup=us&include=hours&key=${LOCATION__API__KEY}&contentType=json`);
            this.weatherData.weekdays = data.days;
            this.weatherData.dayHours = [];
            this.weatherData.temp = [];

            await this.addingHourData('h', this.weatherData, 0)
            await this.addingHourData('t', this.weatherData, 0)

            const actualHours = this.weatherData.dayHours.map(hour => hour.slice(0, 2))

            this.chartManagement(actualHours, this.weatherData.temp)

        } catch (error) {
            console.error(error.message)
        }
    }

    chartManagement(labels, data, number = '') {

        // chart information
        const ctx = document.querySelectorAll(`#myChart${number}`);
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

    /**
     * @author Farzad Khan
     * @Functionality This Func gets data and then saves all the data with proper formate in an object called weatherData
     * @DataFetchedFrom weather.visualcrossing.com
     */
    async locationData() {
        const data = await this.dataOfAPI(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.weatherData.apiPlaceName}?unitGroup=us&include=days&key=${LOCATION__API__KEY}&contentType=json`)

        // this.weatherData.weekdays = data.days
        this.weatherData.temp = Math.trunc(data.days[0].temp)
        this.weatherData.tempMax = Math.trunc((data.days[0].tempmax - 32) * 5 / 9); // (32°F − 32) × 5/9 = 0°C
        this.weatherData.tempMin = Math.trunc((data.days[0].tempmin - 32) * 5 / 9); // (32°F − 32) × 5/9 = 0°C
        this.weatherData.humidity = Math.trunc(data.days[0].humidity); // (32°F − 32) × 5/9 = 0°C
    }

    async init() {
        try {
            await this.getCurrentLocation();
            await this.coordinatesToLocationName();
            await this.locationData();
            this.currentDate();
            await this.hourlyData()
        } catch (err) {
            console.log(err.message)
        }
    }
}

export const store = new storeData();