"use strict";

const e = React.createElement;
import React from "react";
import { createRoot } from "react-dom/client";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import { Link, BrowserRouter as Router } from "react-router-dom";

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
          <Router>
            <MorningStarStyleAppBar />
            {data.components.tableComponent && (<MyTable dataParentToChild={data} />)}
          </Router>
        </div>
      );
    } else {
      return <div>Caricamento...</div>;
    }
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
      return <div>Caricamento...</div>;
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#F5F5F5",
    color: "#333",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  menuItem: {
    marginRight: theme.spacing(2),
    fontWeight: "bold",
    color: "#333",
    "&:hover": {
      color: "#656565",
    },
  },
}));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: "#F5F5F5",
      color: "#656565",
    },
    "&:focus": {
      backgroundColor: "#F5F5F5",
      color: "#656565",
    },
  },
}))(Link);

export default function MorningStarStyleAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <img src="path/to/logo.png" alt="logo" />
          </Typography>
          <StyledMenuItem href="/menu-item-1" className={classes.menuItem}>
            Home
          </StyledMenuItem>
          <StyledMenuItem
            href="/menu-item-2"
            className={classes.menuItem}
          ></StyledMenuItem>
          <StyledMenuItem href="/menu-item-3" className={classes.menuItem}>
            Menu item 3
          </StyledMenuItem>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const domContainer = document.querySelector("#App");
const root = createRoot(domContainer);
root.render(
  <div>
    <JSONDataFetcher />
  </div>
);
// Il codice sta selezionando un elemento HTML, creando una radice React su di esso e renderizzando il componente LikeButton in esso.
