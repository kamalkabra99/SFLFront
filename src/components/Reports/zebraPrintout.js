import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { CommonConfig } from "utils/constant.js";
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
      classDiv: "label-Customprint-box",
    };
  }

  async componentDidMount() {
    if(CommonConfig.getUserAccess("Label printing").ReadAccess === 0){
      CommonConfig.logoutUserdata()
    }
    // var Startnumber = this.props.match.params.start;
    var Endnumber = parseInt(this.props.match.params.end);
    var customerName = this.props.match.params.name;
    var PageSize = localStorage.getItem("CustomPageSize")
      ? localStorage.getItem("CustomPageSize")
      : "";
    localStorage.removeItem("CustomPageSize");
    if (PageSize == "4 X 6") {
      this.setState({ classDiv: "label-print-box4-6" });
    } else if (PageSize == "8.5 X 11") {
      this.setState({ classDiv: "label-print-box85-11" });
    } else if (PageSize == "4 X 6.75") {
      this.setState({ classDiv: "label-print-box4-675" });
    } else if (PageSize == "4 X 8") {
      this.setState({ classDiv: "label-print-box4-8" });
    } else if (PageSize == "4 X 9") {
      this.setState({ classDiv: "label-print-box4-9" });
    } else {
      this.setState({ classDiv: "label-Customprint-box" });
    }

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
        <div className={this.state.classDiv}>
          <h3>{item.name}</h3>
          {/* <h3>{item.id}</h3> */}
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
