import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import "bulma/css/bulma.css";
import ReactAnimatedWeather from "react-animated-weather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <section class="section">
      <div class="container">
        <table class="table is-fullwidth is-narrow">
          <tr>
            <td>
              <strong>Сегодня</strong>
              <br />
              29 Марта
            </td>
            <td style={{ verticalAlign: "middle" }}>
              <ReactAnimatedWeather icon="CLEAR_DAY" size="32" />
            </td>
            <td style={{ verticalAlign: "middle", textAlign: "right" }}>
              <strong>2°</strong>
            </td>
            <td style={{ verticalAlign: "middle" }}>-1°</td>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: "right",
                paddingRight: 0
              }}
            >
              <span class="icon">
                <FontAwesomeIcon icon={faLocationArrow} size="xs" />
              </span>
            </td>
            <td style={{ verticalAlign: "middle", paddingLeft: 0 }}>3 м/с</td>
          </tr>
        </table>
      </div>
    </section>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
