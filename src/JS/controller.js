import { store, LOCATION__API__KEY } from "./store/store.js";
import { heroSection } from "./heroSection.js";
import { weekDaysSection } from "./weekDaysSection.js";
import { map } from "./map.js";

class controllerInfo {

    constructor() {
        this.mapPage()
    }

    async storeData() {
        try {
            await store.getCurrentLocation();
            await store.coordinatesToLocationName();
            await store.locationData();
            store.currentDate();
            await store.hourlyData(0);
        } catch (error) {
            console.error(error.message)
        }
    }

    async heroSection() {
        try {

            const storesParentEl = store.parentEl;

            // Hero First's Section 
            const { html: html1, parentEl: parentEl1 } = await heroSection.todayData(storesParentEl, store.weatherData)
            store.render(parentEl1, html1)

            // Hero Second's Section
            const { parentEl: parentEl2, html: html2 } = await heroSection.weekDays(storesParentEl, store.weatherData)
            store.render(parentEl2, html2)

            // Hero Third Section
            const { parentEl: parentEl3, html: html3 } = await heroSection.dayEvents(storesParentEl, store.weatherData)
            store.render(parentEl3, html3);

        } catch (err) {
            err.message
        }
    }

    async weekDaysSectionInfo(number) {
        try {
            const html = await weekDaysSection.sectionData(store.weatherData, number)

            store.parentEl = document.querySelector(`#Section${number}`)
            console.log(store.parentEl)
            store.render(store.parentEl, html)

            store.weatherData.temp = [];
            const dayTemperatureData = await store.addingHourData('t', store.weatherData, number)

            const actualHours = store.weatherData.dayHours.map(hour => hour.slice(0, 3))

            weekDaysSection.chartManagement(actualHours, dayTemperatureData, `myChart${number}`)

        } catch (err) {
            console.error(err.message)
        }
    }

    async weekDaysSection() {
        try {
            await this.weekDaysSectionInfo(1)
            await this.weekDaysSectionInfo(2)
            await this.weekDaysSectionInfo(3)
            await this.weekDaysSectionInfo(4)
            await this.weekDaysSectionInfo(5)
            await this.weekDaysSectionInfo(6)
        } catch (err) {
            console.error(err.message)
        }
    }

    async mapPage() {

    }

    async init() {
        try {
            await this.storeData();

            // this.heroSection();

            // this.weekDaysSection();

            await map.mapEditing(store.coords)

        } catch (err) {

            console.log(err.message);

        };
    }
}

const weatherDataController = new controllerInfo();
weatherDataController.init();