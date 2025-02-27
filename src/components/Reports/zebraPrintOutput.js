import React, { Component } from "react";
import * as XLSX from "xlsx";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { CommonConfig } from "utils/constant.js";
import moment from "moment";
import api from "../../utils/apiClient";
import Button from "components/CustomButtons/Button.js";
import cogoToast from "cogo-toast";
import CardIcon from "components/Card/CardIcon.js";
import AssignmentIcon from "@material-ui/icons/Assignment";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import SimpleBackdrop from "../../utils/general";
import ReactTable from "react-table";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class zebraPrintOutput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerName: "",
      list: [],
      Startnumber: "",
      Endnumber: "",
      classDiv: "label-print-box",
    };
  }

  async componentDidMount() {
    if(CommonConfig.getUserAccess("Label printing").ReadAccess === 0){
      CommonConfig.logoutUserdata()
    }
    debugger;
    var Startnumber = parseInt(this.props.match.params.start);
    var Endnumber = parseInt(this.props.match.params.end);
    var customerName = this.props.match.params.name;
    var PageSize = localStorage.getItem("PageSize")
      ? localStorage.getItem("PageSize")
      : "";
    localStorage.removeItem("PageSize");
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
      this.setState({ classDiv: "label-print-box" });
    }

    // classDiv = "label-print-boxportrait";

    var arr = [];
    for (var i = Startnumber; i <= Endnumber; i++) {
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

export default zebraPrintOutput;
