const LOCATION__API__KEY = 'QXSS9XCRCFTRTLPNRT53LKY6T'

class appBluePrint {

    constructor() {
        this.coords = null;
        this.placeName = null;


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
            this.placeName = (data.city + data.countryName).toLowerCase()
        } catch (err) {
            console.error('Error From Coords Convertor: ', err.message);
        }
    }

    async locationData() {
        const countryInfo = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.placeName}?unitGroup=us&include=days&key=${LOCATION__API__KEY}&contentType=json`)
        const data = await countryInfo.json()
        console.log(data)
    }

    async init() {
        try {
            await this.getCurrentLocation();
            await this.coordinatesToLocationName();
            await this.locationData()
        } catch (err) {
            console.error(err)
        }
    }
}

const WeatherApp = new appBluePrint();
WeatherApp.init()