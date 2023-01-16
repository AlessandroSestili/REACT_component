"use strict";

const e = React.createElement;
import React from "react";
import { createRoot } from "react-dom/client";

class JSONDataFetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    // Prende l'URL dall HTML dalla proprietà url-data
    const script = document.querySelector("script[src='../dist/bundle.js']");
    const url = script.getAttribute("data-url");
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ data: data }));
  }

  render() {
    const { data } = this.state;
    if (data) {
      return (
        <div>
          <LikeButton dataParentToChild={data} />
          <MyTable dataParentToChild={data} />
        </div>
      );
    } else {
      return <div>Caricamento...</div>;
    }
  }
}

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      degree: 0,
      data: this.props.dataParentToChild,
    };
  }

  // componentDidMount è chiamato una volta che il componente è stato montato e pronto per essere utilizzato.
  componentDidMount() {
    setInterval(() => {
      this.setState((prevState) => ({
        degree: (prevState.degree + 1) % 360,
      }));
    }, 50); //Fa ruotare un'immagine di 360 gradi ogni 50 millesimi di secondo.
  }

  render() {
    //Crea e visualizza l'interfaccia utente del componente.
    const { data } = this.state;

    const img = e("img", {
      //Crea un nuovo elemento HTML utilizzando React e gli assegna proprietà specificate.
      src: { data }.data.svg,
      alt: "Spinning square",
      style: { transform: `rotate(${this.state.degree}deg)`, width: "100px" },
    });
    return e("div", null, img);
  }
}

class MyTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.dataParentToChild,
    };
  }

  render() {
    const tableStyle = {
      width: "100%",
      margin: "20px auto",
      borderCollapse: "collapse",
    };
    const thStyle = {
      padding: "8px",
      backgroundColor: "#f2f2f2",
      border: "1px solid #ddd",
    };
    const tdStyle = {
      padding: "8px",
      border: "1px solid #ddd",
    };
    if (!this.state.data || this.state.data.table_data.length === 0) {
      return <div>Loading...</div>;
    }
    const keys = Object.keys(this.state.data.table_data[0]);
    return (
      <table style={tableStyle}>
        <thead>
          <tr>
            {keys.map((key, index) => (
              <th key={index} style={thStyle}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.state.data.table_data.map((item, index) => (
            <tr key={index}>
              {keys.map((key, index) => (
                <td key={index} style={tdStyle}>
                  {item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const domContainer = document.querySelector("#App");
const root = createRoot(domContainer);
root.render(
  <div>
    <JSONDataFetcher />
  </div>
);
// Il codice sta selezionando un elemento HTML, creando una radice React su di esso e renderizzando il componente LikeButton in esso.
