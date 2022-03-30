window.addEventListener('load', ()=> {

    let lan
    let lon
       
let valorTemperatura = document.getElementById('valor-temperatura');
let descripcionTemperatura = document.getElementById('descripcion-temperatura');
let ubicacion = document.getElementById('ubi');
let iconoAnimado = document.getElementById('icono-animado');
let velocidadViento = document.getElementById('velocidad-viento');


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( position =>{

            lon = position.coords.longitude;
            lat = position.coords.latitude;

             const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=86ed3c3ab3b875e698cec6322e90aa90&units=metric&lang=es`
           

            fetch(url1)
            .then( response => { return response.json()})
            .then( datos => {
               
                let temperatura = Math.round(datos.main.temp);
                valorTemperatura.textContent = `${temperatura} °C`;

                let descrip = datos.weather[0].description;
                descripcionTemperatura.textContent = descrip.toUpperCase();
              
                ubicacion.textContent = datos.name;

                velocidadViento.textContent = `${datos.wind.speed} m/s`;

                switch (datos.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='animated/day.svg'
                        
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      
                  }

                

            })
            
           

        })
    }
})