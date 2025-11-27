class mapFunctionality {
    async mapEditing(coords) {
        try {
            const apiKey = "b83a810c122505a233d5fcfa1b10bce1";
            const { latitude, longitude } = coords
            console.log(latitude, longitude)
            const map = L.map('map').setView([latitude, longitude], 12); // Pakistan centered
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            const tempLayer = L.tileLayer(
                `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
                { opacity: 0.6 }
            );

            tempLayer.addTo(map);

            const clouds = L.tileLayer(
                `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`,
                { opacity: 0.6 }
            );

            const precipitation = L.tileLayer(
                `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
                { opacity: 0.6 }
            );

            const wind = L.tileLayer(
                `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`,
                { opacity: 0.6 }
            );

            const temp = L.tileLayer(
                `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
                { opacity: 0.6 }
            );

            // Add controls
            L.control.layers(
                { "Temperature": temp, "Clouds": clouds, "Precipitation": precipitation, "Wind": wind },
                {}
            ).addTo(map);


        } catch (err) {
            console.error(err.message)
        }
    }
}

export const map = new mapFunctionality();  