class weekDaysInfo {
    chartManagement(labels, data, id) {

        // chart information
        const ctx = document.querySelector(`#${id}`);
        new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
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

    async sectionData(weatherData, number) {
        try {

            const weekday = weatherData.weekdays[number];
            const temp = Math.trunc((weekday.temp - 32) * 5 / 9);
            const tempMax = Math.trunc((weekday.tempmax - 32) * 5 / 9);
            const tempMin = Math.trunc((weekday.tempmin - 32) * 5 / 9);

            const feelsLike = Math.trunc((weekday.feelslike - 32) * 5 / 9);
            const feelsLikeMax = Math.trunc((weekday.feelslikemax - 32) * 5 / 9);
            const feelsLikeMin = Math.trunc((weekday.feelslikemin - 32) * 5 / 9);

            const windSpeed = weekday.windspeed;
            const windDirection = weekday.winddir;
            const windGust = weekday.windgust;

            const sunrise = weekday.sunrise.slice(1, 2) + " : " + weekday.sunrise.slice(3, 5) + ' AM';
            const sunset = weekday.sunset.slice(0, 2) - 12 + " : " + weekday.sunset.slice(3, 5) + ' PM';

            const html = `
                <div class="row">
                    <div class=" col day-info">
                    <h2>${number === 1 ? 'Tomorrow ' : weekday.datetime}</h2>
                    <p>DESCRIPTION: <span class="day__discription">${weekday.description}</span></p>
                    </div>
                    <div class=" col text-end day-image">
                    <img src="../Imges/sunrise-removebg-preview.png" alt="">
                    </div>
                </div>
                
                <div class="divider"></div>
                
                <div class="row weather-info">

                    <div class=" col text-center temp1 temp weather-styling ">
                        <h4>
                            <span>Temp: </span>
                            ${temp}°C
                        </h4>
                        <h6>
                            <span> High: </span>
                            ${tempMax}°C
                        </h6>
                        <h6>
                            <span>low: </span>
                            ${tempMin}°C
                        </h6>
                    </div>
                    
                    <div class=" col text-center feels__like1 feels__like weather-styling">
                        <h4>
                            <span>Feels Like: </span>
                            ${feelsLike}°C
                        </h4>

                        <h6>
                            <span>High: </span>
                            ${feelsLikeMax}°C
                        </h6>
                        <h6>
                            <span>low: </span>
                            ${feelsLikeMin}°C
                        </h6>
                    </div>

                    <div class=" col text-center feels__like1 feels__like weather-styling">
                        <h4>
                            <span>Windspeed: </span>
                            ${windSpeed} mph
                        </h4>
                        <h6>
                            <span>Direction: </span>
                            ${windDirection}°
                        </h6>
                        <h6>
                            <span>Wind Gust: </span>
                            ${windGust} m/s
                        </h6>
                    </div>

                </div>

                <div class="divider"></div>
                
                <div class="row mb-md-0">
                
                    <div class="col-12 col-md temp-chart weekdays-card">
                        <canvas id="myChart${number}"></canvas>
                    </div>
                        
                    <div class="divider d-md-none"></div>
                    
                    <div class="row col-12 col-md justify-content-center">
                        <div class="col sunset1 sunset weather-styling text-center ">
                            <h4>${sunrise}</h4> 
                            <h6><span>Sunrise</span></h6>
                        </div>
                        
                        <div class="col sunset1 sunset weather-styling text-center border-0 p-0 ">
                            <h4>${sunset}</h4>
                            <h6><span>Sunset</span></h6>
                        </div>

                        <div class="divider"></div>

                        <div class="col wind__speed1 wind__speed weather-styling border-0 p-0 text-center">
                            <h4>${weekday.humidity} %</h4>
                            <h6><span>Humadity</span></h6>
                        </div>

                        <div class="col wind__speed1 wind__speed weather-styling border-0 p-0 text-center">
                            <h4>${weekday.visibility} SM</h4>
                            <h6><span>Visibility</span></h6>
                        </div>
                    </div>
                </div>
            `;
            return html
        } catch (err) {
            console.log(err.message)
        }
    }
}

export const weekDaysSection = new weekDaysInfo();