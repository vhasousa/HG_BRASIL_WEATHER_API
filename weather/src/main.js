import api from './api';

class Weather {
  constructor() {
    this.weather = [];
    this.formEl = document.getElementById('form-clima')
    this.cityEl = document.getElementById('city-form')
    this.ufEl = document.getElementById('uf-form')

    this.listElMain = document.getElementById('weather-city')
    this.listElNextDay = document.getElementById('nextDayList')

    this.handleSubmit();
  }

  handleSubmit() {
    this.formEl.onsubmit = event => this.linkApi(event);
  }

  async linkApi(event) {
    event.preventDefault();

    const cityInput = this.cityEl.value;
    const ufInput = this.ufEl.value;

    const response = await api.get(`&city_name=${cityInput},${ufInput}`);
    console.log(response.data.results)

    const { city, time, description, temp, humidity, wind_speedy, forecast: { date } } = response.data.results;

    this.nextDays = response.data.results.forecast;

    this.weather.push({
      city,
      time,
      description,
      temp,
      humidity,
      wind_speedy,
      forecast: {
        date,

      }
    });

    this.render();
  }

  render() {
    this.listElMain.innerHTML = '';

    this.weather.forEach(weather => {
      let cityWeather = document.createElement('h2');
      cityWeather.appendChild(document.createTextNode(weather.city));

      let time = document.createElement('p');
      time.appendChild(document.createTextNode(weather.time));

      let weatherDescription = document.createElement('p');
      weatherDescription.appendChild(document.createTextNode(weather.description));

      let weatherTemp = document.createElement('h1');
      weatherTemp.appendChild(document.createTextNode(`${weather.temp} °C`));

      let listItemEl = document.createElement('li');
      listItemEl.appendChild(cityWeather);
      listItemEl.appendChild(time);
      listItemEl.appendChild(weatherDescription);
      listItemEl.appendChild(weatherTemp);

      this.listElMain.appendChild(listItemEl);

    });

    this.nextDays.forEach(next => {
      let previsaoDate = document.createElement('p');
      previsaoDate.appendChild(document.createTextNode(next.date));
      let previsaoMin = document.createElement('p');
      previsaoDate.appendChild(document.createTextNode(`Mínima de: ${next.min}`));
      let previsaoMax = document.createElement('p');
      previsaoDate.appendChild(document.createTextNode(`Máxima de: ${next.max}`));
      let previsaoDescription = document.createElement('p');
      previsaoDate.appendChild(document.createTextNode(next.description));

      let listItemElNextDay = document.createElement('li');
      listItemElNextDay.appendChild(previsaoDate);
      listItemElNextDay.appendChild(previsaoMin);
      listItemElNextDay.appendChild(previsaoMax);
      listItemElNextDay.appendChild(previsaoDescription);

      this.listElNextDay.appendChild(listItemElNextDay)
    })

  }
}

new Weather();
