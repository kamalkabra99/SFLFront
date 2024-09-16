/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import api from "../../utils/apiClient";
import { CommonConfig } from "../../utils/constant";
import cogoToast from "cogo-toast";
import SimpleBackdrop from "../../utils/general";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import _ from "lodash";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import Cardbody from "components/Card/CardBody.js";
import Adduser from "@material-ui/icons/MonetizationOn";
import CardBody from "components/Card/CardBody";

const useStyles = makeStyles(styles);

const classes = () => {
  return useStyles();
};

class AddUpdateSFLfetcherRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      GetRatesList: [],
      validate: [],
      CreatedBy: CommonConfig.loggedInUserData().PersonID,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    try {
      this.showLoader();
      api
        .post("userManagement/getSFLfetcherRates")
        .then((res) => {
          if (res.success) {
            debugger;
            this.setState({
              GetRatesList: res.message,
            });
            this.state.GetRatesList.map((OBJ) => {
              OBJ.KgstartErrorText = "";
              OBJ.KgendErrorText = "";
              OBJ.PurchaseErrorText = "";
              OBJ.USDErrorText = "";
              OBJ.flag = "U";
              return OBJ;
            });
            this.hideLoader();
          } else {
            cogoToast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {}
  }

  showLoader = () => {
    this.setState({ Loading: true });
  };

  hideLoader = () => {
    this.setState({ Loading: false });
  };

  handledInput = (e, id, MarkupType, Type) => {
    debugger;
    let MarkupData = this.state.GetRatesList;
    let i = MarkupData.findIndex((x) => x.ID === id);

    let x = document.getElementsByTagName("input");
    let val = 0;
    val = e.target.value === "" ? 0 : e.target.value;
    if (Type === "Kgstart") {
      MarkupData[i].Kgstart = parseInt(val);
    } else if (Type === "Kgend") {
      MarkupData[i].Kgend = parseInt(val);
    } else if (Type === "Purchase") {
      MarkupData[i].Purchase = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } else if (Type === "USD") {
      MarkupData[i].USD = val;
      // MarkupData[i].USD = parseFloat(val).toFixed(2);
    }
    this.setState({ GetRatesList: MarkupData });
  };

  handleBlur = (e, id, MarkupType, Type) => {
    let MarkupData = this.state.GetRatesList;
    let i = MarkupData.findIndex((x) => x.ID === id);

    let x = document.getElementsByTagName("input");
    let val = 0;
    val = e.target.value;
    debugger;
    if (Type === "Kgstart") {
      if (val === "0" || val === "") {
        MarkupData[i].KgstartErrorText = "please fill the details";
      }
      // else if (
      //   MarkupData.filter((x) => x.Status === "Active").findIndex(
      //     (x) =>
      //       x.Kgstart === parseInt(val) ||
      //       x.Kgend === parseInt(val) ||
      //       (x.Kgstart >= val && x.Kgend <= val)
      //   )
      // ) {
      //   console.log("iiii", x);
      //   MarkupData[i].KgstartErrorText = "rates already exist";
      // }
      else {
        MarkupData[i].Kgstart = parseInt(val);
        x[i].className = "form-control";
        MarkupData[i].KgstartErrorText = "";
      }
    } else if (Type === "Kgend") {
      if (val === "0" || val === "") {
        MarkupData[i].KgendErrorText = "please fill the details";
      } else {
        MarkupData[i].Kgend = parseInt(val);
        x[i].className = "form-control";
        MarkupData[i].KgendErrorText = "";
      }
    } else if (Type === "Purchase") {
      if (val === "0" || val === "") {
        MarkupData[i].PurchaseErrorText = "please fill the details";
      } else {
        let checkMarkupData = this.state.GetRatesList;
        console.log("check....", checkMarkupData);

        // var Country = checkMarkupData.filter((x) => {
        //   console.log("xxxxxx", x);
        // });

        MarkupData[i].Purchase = parseFloat(val).toFixed(2);
        x[i].className = "form-control";
        MarkupData[i].PurchaseErrorText = "";
      }
    } else if (Type === "USD") {
      if (val === "0" || val === "") {
        MarkupData[i].USDErrorText = "please fill the details";
      } else {
        MarkupData[i].USD = parseFloat(val).toFixed(2);
        x[i].className = "form-control";
        MarkupData[i].USDErrorText = "";
      }
    }
    this.setState({ GetRatesList: MarkupData });
  };

  saveRates = () => {
    debugger;
    var MarkupData = this.state.GetRatesList;
    for (var i = 0; i < MarkupData.length; i++) {
      if (
        MarkupData[i].KgstartErrorText !== "" ||
        MarkupData[i].KgendErrorText !== "" ||
        MarkupData[i].PurchaseErrorText !== "" ||
        MarkupData[i].USDErrorText !== ""
      ) {
        console.log("missing...");
        return;
      }
    }
    debugger;
    try {
      this.showLoader();
      var Details = {
        rowData: this.state.GetRatesList,
        userId: this.state.CreatedBy,
      };
      api
        .post("userManagement/addUpdateSFLfetcher", Details)
        .then((res) => {
          if (res.success) {
            cogoToast.success("Rates Updated");
            window.location.reload();
            this.hideLoader();
          } else {
            cogoToast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          this.hideLoader();
          cogoToast.error(err);
        });
    } catch (error) {
      this.hideLoader();
      cogoToast.error("Something Went Wrong");
    }
  };

  cancelUser = () => {
    this.props.history.push({
      pathname: "/admin/ManagementNavigation",
    });
  };
  removePackageRow = (index) => {
    const removeNotes = [...this.state.GetRatesList];
    var noteIndex = this.state.GetRatesList.findIndex((x) => x.ID === index);
    if (noteIndex !== -1) {
      removeNotes[noteIndex]["Status"] = "Inactive";
      this.setState({ GetRatesList: removeNotes });
      if (removeNotes.filter((x) => x.Status === "Active").length === 0) {
        this.setState({
          isVisible: false,
        });
      }
    }
  };
  renderMarkup = () => {
    return this.state.GetRatesList.filter(
      (service) => service.Status === "Active"
    ).map((service, idx) => {
      const {
        ID,
        Kgstart,
        Kgend,
        Purchase,
        USD,
        KgstartErrorText,
        KgendErrorText,
        PurchaseErrorText,
        USDErrorText,
        isVisible,
      } = service;
      return (
        <tr key={ID}>
          <td>
            <input
              type="text"
              name="Kgstart"
              id="Kgstart"
              className="form-control"
              value={Kgstart}
              onChange={(event) =>
                this.handledInput(event, ID, Kgstart, "Kgstart")
              }
              onBlur={(e) => this.handleBlur(e, ID, Kgstart, "Kgstart")}
            />
            <span id="KgstartErr" style={{ color: "red", fontSize: "12px" }}>
              {KgstartErrorText}
            </span>
          </td>
          <td>
            <input
              type="text"
              name="Kgend"
              id="Kgend"
              className="form-control"
              value={Kgend}
              onChange={(event) => this.handledInput(event, ID, Kgend, "Kgend")}
              onBlur={(e) => this.handleBlur(e, ID, Kgend, "Kgend")}
            />
            <span id="KgendErr" style={{ color: "red", fontSize: "12px" }}>
              {KgendErrorText}
            </span>
          </td>
          <td>
            <input
              type="number"
              name="Purchase"
              id="Purchase"
              className="form-control"
              value={Purchase}
              onChange={(event) =>
                this.handledInput(event, ID, Purchase, "Purchase")
              }
              onBlur={(e) => this.handleBlur(e, ID, Purchase, "Purchase")}
            />
            <span id="PurchaseErr" style={{ color: "red", fontSize: "12px" }}>
              {PurchaseErrorText}
            </span>
          </td>
          <td>
            <input
              type="number"
              name="USD"
              id="USD"
              className="form-control"
              value={USD}
              onChange={(event) => this.handledInput(event, ID, USD, "USD")}
              onBlur={(e) => this.handleBlur(e, ID, USD, "USD")}
            />
            <span id="USDErr" style={{ color: "red", fontSize: "12px" }}>
              {USDErrorText}
            </span>
          </td>
          <td className="wd-100">
            <Button
              justIcon
              color="danger"
              className="Plus-btn "
              onClick={() => this.removePackageRow(ID)}
            >
              <i className={"fas fa-minus"} />
            </Button>
            {this.state.GetRatesList.filter((x) => x.Status === "Active")
              .length ===
            idx + 1 ? (
              <Button
                justIcon
                color="facebook"
                onClick={() => this.handleAddNotesRow()}
                className="Plus-btn "
              >
                <i className={"fas fa-plus"} />
              </Button>
            ) : null}
          </td>
        </tr>
      );
    });
  };
  handleAddNotesRow = () => {
    var addnotes = this.state.GetRatesList.filter(
      (x) => x.Status === "Active" && (x.Kgstart === null || x.Kgstart === "")
    );
    if (addnotes.length === 0) {
      const note = {
        ID: this.state.GetRatesList.length + 1,
        Kgstart: "",
        Kgend: null,
        Purchase: null,
        USD: null,
        KgstartErrorText: "",
        KgendErrorText: "",
        PurchaseErrorText: "",
        USDErrorText: "",
        flag: "I",
        Status: "Active",
        Index: this.state.GetRatesList.length + 1,
      };
      this.setState({
        // notesDisabled: false,
        GetRatesList: [...this.state.GetRatesList, note],
      });
    } else {
      cogoToast.error("Please fill above note first");
    }
  };

  render() {
    const {} = this.state;
    return (
      <Card>
        <CardHeader className="btn-right-outer" color="primary" icon>
          <CardIcon color="primary">
            <Adduser />
          </CardIcon>
          <h4 className="margin-right-auto text-color-black">Fetcher Rates</h4>
        </CardHeader>
        <Cardbody>
          <div className="shipment-pane mt-20" id="markupdetails">
            <div className="package-table">
              <table>
                <thead>
                  <tr>
                    <th>KG Start</th>
                    <th>KG End</th>
                    <th>Purchase INR</th>
                    <th>Sell INR</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderMarkup()}
                  {/* <tr>
                    <td>
                      <input
                        type="text"
                        name="Kgstart"
                        id="Kgstart"
                        className="form-control"
                        value={Kgstart}
                        onChange={(event) =>
                          this.handledInput(event, ID, Kgstart, "Kgstart")
                        }
                        onBlur={(e) =>
                          this.handleBlur(e, ID, Kgstart, "Kgstart")
                        }
                      />
                      <span
                        id="KgstartErr"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {KgstartErrorText}
                      </span>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Kgend"
                        id="Kgend"
                        className="form-control"
                        value={Kgend}
                        onChange={(event) =>
                          this.handledInput(event, ID, Kgend, "Kgend")
                        }
                        onBlur={(e) => this.handleBlur(e, ID, Kgend, "Kgend")}
                      />
                      <span
                        id="KgendErr"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {KgendErrorText}
                      </span>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="Purchase"
                        id="Purchase"
                        className="form-control"
                        value={Purchase}
                        onChange={(event) =>
                          this.handledInput(event, ID, Purchase, "Purchase")
                        }
                        onBlur={(e) =>
                          this.handleBlur(e, ID, Purchase, "Purchase")
                        }
                      />
                      <span
                        id="PurchaseErr"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {PurchaseErrorText}
                      </span>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="USD"
                        id="USD"
                        className="form-control"
                        value={USD}
                        onChange={(event) =>
                          this.handledInput(event, ID, USD, "USD")
                        }
                        onBlur={(e) => this.handleBlur(e, ID, USD, "USD")}
                      />
                      <span
                        id="USDErr"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {USDErrorText}
                      </span>
                    </td>
                    <td>
                      <Button
                        justIcon
                        color="danger"
                        className="Plus-btn "
                        onClick={() => this.removePackageRow(ID)}
                      >
                        <i className={"fas fa-minus"} />
                      </Button>
                      {// .filter((x) => x.Status === "Active")
                      this.state.GetRatesList.length === ID ? (
                        <Button
                          justIcon
                          color="facebook"
                          onClick={() => this.addPackageRow()}
                          className="Plus-btn "
                        >
                          <i className={"fas fa-plus"} />
                        </Button>
                      ) : null}
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
            <div className="right">
              <Button color="rose" onClick={() => this.saveRates()}>
                Save
              </Button>
              <Button color="secondary" onClick={() => this.cancelUser()}>
                Cancel
              </Button>
            </div>
          </div>
        </Cardbody>
      </Card>
    );
  }
}

AddUpdateSFLfetcherRates.propTypes = {
  classes: PropTypes.object,
};

export default withStyles()(AddUpdateSFLfetcherRates);
