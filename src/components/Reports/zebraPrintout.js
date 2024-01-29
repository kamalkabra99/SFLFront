import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class zebraPrintOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      list: [],
      Startnumber: "",
      Endnumber: "",
    };
  }

  async componentDidMount() {
    // var Startnumber = this.props.match.params.start;
    var Endnumber = this.props.match.params.end;
    var customerName = this.props.match.params.name;

    var arr = [];
    for (var i = 1; i <= Endnumber; i++) {
      arr.push({
        id: i,
        name: customerName,
      });
    }
    this.setState({ list: arr });
  }

  doc = () => {
    //kruti
    return this.state.list.map((item, idx) => {
      return (
        <div className="label-print-box">
          <p>{item.name}</p>
          <h3>{item.id}</h3>
        </div>
      );
    });
  };

  render() {
    const { customerName } = this.state;

    return <div className="label-print-outer">{this.doc()}</div>;
  }
}

export default zebraPrintOut;
