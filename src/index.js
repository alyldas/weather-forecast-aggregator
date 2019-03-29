import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import "bulma/css/bulma.css";
import ReactAnimatedWeather from "react-animated-weather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

function getWeatherData(url, location) {
  return axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

let getDarkSkyData = location => {
  return getWeatherData(
    `https://cors.io/?https://api.jsonbin.io/b/5c9df5c51c56bb1ec3915a23`,
    LOCATION
  ).then(result => {
    return result;
  });
};

let getWeatherbitData = location => {
  return getWeatherData(
    `https://cors.io/?https://api.jsonbin.io/b/5c9df7481c56bb1ec3915b36`,
    LOCATION
  ).then(result => {
    return result;
  });
};

let getDarkSkyDaily = location => {
  return getDarkSkyData(location).then(response => {
    let data = response;
    let result = [];
    let daily = data.daily.data;
    for (var i = 0; i < 7; i++)
      result.push({
        date: new Date(daily[i].time * 1000).toLocaleDateString("ru", {
          day: "numeric",
          month: "long"
        }),
        weather: daily[i].summary,
        temp: { min: daily[i].temperatureMin, max: daily[i].temperatureMax },
        wind: { dir: daily[i].windBearing, speed: daily[i].windSpeed }
      });
    return result;
  });
};

let getWeatherbitDaily = location => {
  getWeatherbitData(location).then(response => {
    let data = response;
    let result = [];
    let daily = data.data;
    for (var i = 0; i < 7; i++)
      result.push({
        date: new Date(Date.parse(daily[i].valid_date)).toLocaleDateString(
          "ru",
          {
            day: "numeric",
            month: "long"
          }
        ),
        weather: daily[i].weather.description,
        temp: { min: daily[i].min_temp, max: daily[i].max_temp },
        wind: { dir: daily[i].wind_dir, speed: daily[i].wind_spd }
      });
    return result;
  });
};

const LOCATION = { lat: 0, lon: 0 };

const request = async () => {
  const response = await fetch(
    "https://cors.io/?https://api.jsonbin.io/b/5c9df5c51c56bb1ec3915a23"
  );
  const json = await response.json();
  console.log(json);
};

// let Day = props => {
//   getDarkSkyDaily({ lat: 0, lon: 0 }).then(weather => {
//     return <div class="column">{weather[props.day].date}</div>;
//   });
// };

function getSrc() {
  return axios.get(
    "https://cors.io/?https://api.jsonbin.io/b/5c9df5c51c56bb1ec3915a23"
  );
}

getSrc()
  .then(function(response) {
    console.log(response.data);
    return response.data; // now the data is accessable from here.
  })
  .catch(response => console.log(response));

// DarkSky
// https://cors.io/?https://api.darksky.net/forecast/1b654f65f41bbad079bb6d974a169724/${lat},${lon}?units=si&lang=ru

// Weatherbit
//

class Fetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      error: null
    };
  }
  // componentDidMount() {
  //   this.setState({ isLoading: true });
  //   axios
  //     .get(this.props.url)
  //     .then(result =>
  //       this.setState({
  //         data: result.data,
  //         isLoading: false
  //       })
  //     )
  //     .catch(error =>
  //       this.setState({
  //         error,
  //         isLoading: false
  //       })
  //     );
  // }
  render() {
    return this.props.children(this.state);
  }
}

const RenderPropApproach = () => (
  <Fetcher
    url={"https://cors.io/?https://api.jsonbin.io/b/5c9df5c51c56bb1ec3915a23"}
  >
    {({ data, isLoading, error }) => {
      if (isLoading) return <p>Loading ...</p>;
      if (!data) return <p>No data yet ...</p>;
      if (error) return <p>{error.message}</p>;
      return <div>{data}</div>;
    }}
  </Fetcher>
);

class DarkSky extends Fetcher {
  componentDidMount() {
    this.setState({ isLoading: true });
    getDarkSkyDaily().then(result =>
      this.setState({
        data: result,
        isLoading: false
      })
    );
  }
}

const DarkSkyDay = props => (
  <DarkSky>
    {({ data, isLoading, error }) => {
      if (isLoading) return <p class="column">Загрузка...</p>;
      if (!data) return <p class="column">Нет данных</p>;
      if (error) return <p>{error.message}</p>;
      return (
        <div class="column container">
          <h1 class="title">{data[props.day].date}</h1>
          <h2 class="subtitle">{data[props.day].weather}</h2>
          <p>
            Днём: <strong>{data[props.day].temp.max}°</strong>
          </p>
          <p>Ночью: {data[props.day].temp.min}°</p>
          <p>Ветер: {data[props.day].wind.speed} м/с</p>
        </div>
      );
    }}
  </DarkSky>
);

function SearchButton() {
  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.");
  }

  return (
    <a class="button is-primary" onClick={handleClick}>
      <span class="icon is-small">
        <FontAwesomeIcon icon={faSearch} />
      </span>
      <span>Поиск</span>
    </a>
  );
}

function App() {
  return (
    <section class="section">
      <div class="container">
        <div class="field has-addons is-marginless">
          <div class="control is-expanded">
            <input class="input" type="text" placeholder="Введите город" />
          </div>
          <div class="control">
            <SearchButton />
          </div>
        </div>
        <p class="help">
          *или оставьте поле пустым чтобы определить местоположение
          автоматически
        </p>
        <div class="tabs is-fullwidth">
          <ul>
            <li class="is-active">
              <a>Dark Sky</a>
            </li>
            <li>
              <a>Weatherbit</a>
            </li>
          </ul>
        </div>
        <div class="columns is-desktop">
          <DarkSkyDay day={0} />
          <DarkSkyDay day={1} />
          <DarkSkyDay day={2} />
          <DarkSkyDay day={3} />
          <DarkSkyDay day={4} />
          <DarkSkyDay day={5} />
          <DarkSkyDay day={6} />
        </div>
      </div>
      {/* <div class="container">
        <table class="table is-fullwidth is-narrow">
          <tr>
            <td>
              <strong>Сегодня</strong>
              <br />
              29 Марта
            </td>
            <td class="is-paddingless" style={{ verticalAlign: "middle" }}>
              <ReactAnimatedWeather icon="CLEAR_DAY" size="32" />
            </td>
            <td style={{ verticalAlign: "middle", textAlign: "right" }}>
              <strong>2°</strong>
            </td>
            <td style={{ verticalAlign: "middle" }}>-1°</td>
            <td
              class="is-paddingless"
              style={{
                verticalAlign: "middle",
                textAlign: "right"
              }}
            >
              <span class="icon">
                <FontAwesomeIcon
                  icon={faLocationArrow}
                  size="xs"
                  transform={{ rotate: -45 + 90 }}
                />
              </span>
            </td>
            <td class="is-paddingless" style={{ verticalAlign: "middle" }}>
              3 м/с
            </td>
          </tr>
        </table>
      </div> */}

      {/* <RenderPropApproach /> */}
    </section>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
