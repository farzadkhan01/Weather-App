import { store } from './store/store.js'

class weekDaysInfo extends store {
    constructor() {
        super();
        console.log(this.weatherData)
        console.log('hello')
    }
}

export const weekDaysSection = new weekDaysInfo();