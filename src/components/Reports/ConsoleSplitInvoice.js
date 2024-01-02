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

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class ConsoleSplitInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ContainerNameList: [],
      ContainerName: "",
      VendorList: [],
      vendorName: "",
      InvoiceNumber: "",
      InvoiceAmount: "",
      FromDate: new Date(),
      ToDate: new Date(),
      Confirmation: "",
      finalTotal: 0,
      ConsoleSplitRecord: [],
      PaidStatus: "",
      PaidStatusList: [
        {
          Name: "Yes",
          Value: "Yes",
        },
        {
          Name: "No",
          Value: "No",
        },
      ],
    };
  }

  componentDidMount() {
    this.getContainerName();
    this.getVendorName();
  }

  getContainerName = () => {
    try {
      api
        .post("reports/getContainerList")
        .then((res) => {
          debugger;
          if (res.success) {
            debugger;

            this.setState({
              ContainerNameList: res.data,
            });
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    } catch (err) {
      console.log("error...", err);
    }
  };
  getVendorName() {
    try {
      api
        .get("vendor/getVendorNameList")
        .then((result) => {
          this.setState({ VendorList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }
  showLoader() {
    this.setState({ Loading: true });
  }
  hideLoader() {
    this.setState({ Loading: false });
  }
  cancelUser() {
    this.setState({
      ConsoleSplitRecord: [],
      vendorName: "",
      InvoiceNumber: "",
      InvoiceAmount: "",
      FromDate: new Date(),
      ToDate: new Date(),
      Confirmation: "",
      finalTotal: 0,
      ContainerName: "",
      PaidStatus: "",
    });
  }
  updatePaymentIsused() {
    var input = {
      ConfirmationNumber: this.state.Confirmation,
      containerId: this.state.ContainerName.value,
      VendorName: this.state.vendorName.value,
      InvoiceAmount: this.state.InvoiceAmount,
      InvoiceNumber: this.state.InvoiceNumber,
      PaidStatus: this.state.PaidStatus.value,
      DatePaid: moment(this.state.FromDate)
        .format(CommonConfig.dateFormat.dbDateOnly)
        .toString(),
      PaymentIssuedDate: moment(this.state.ToDate)
        .format(CommonConfig.dateFormat.dbDateOnly)
        .toString(),
      paymentIssued: this.state.ConsoleSplitRecord,
      userid: CommonConfig.loggedInUserData().PersonID,
    };
    this.showLoader();
    debugger;
    try {
      api
        .post("reports/InsertPaymentIssued", input)
        .then((result) => {
          debugger;
          console.log("ress", result);
          if (result.success) {
            this.hideLoader();
            cogoToast.success("Shipments update sucessfully");
            this.cancelUser();
          }
          //   this.setState({ ConsoleSplitRecord: result.data[0] });
          //   this.state.ConsoleSplitRecord.map((OBJ) => {
          //     OBJ.USDErrorText = "";
          //     return OBJ;
          //   });
          //  this.Calculate();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }
  spiltCharges() {
    debugger;
    if (this.state.PaidStatus === "") {
      return cogoToast.error("please select Paid status");
    } else if (this.state.ContainerName === "") {
      return cogoToast.error("please select Container");
    } else if (this.state.InvoiceAmount === "") {
      return cogoToast.error("please enter Invoice Amount");
    }
    var input = {
      Confirmation: this.state.Confirmation,
      containerId: this.state.ContainerName.value,
      VendorName: this.state.vendorName.value,
      InvoiceAmount: this.state.InvoiceAmount,
      InvoiceNumber: this.state.InvoiceNumber,
      PaidStatus: this.state.PaidStatus.value,
      Datepaid: moment(this.state.FromDate)
        .format(CommonConfig.dateFormat.dbDateOnly)
        .toString(),
      paymentdate: moment(this.state.ToDate)
        .format(CommonConfig.dateFormat.dbDateOnly)
        .toString(),
    };
    console.log("sppppp", input);
    try {
      api
        .post("reports/getSplitCharges", input)
        .then((result) => {
          console.log("ress", result);
          this.setState({ ConsoleSplitRecord: result.data[0] });
          this.state.ConsoleSplitRecord.map((OBJ) => {
            OBJ.USDErrorText = "";
            return OBJ;
          });
          this.Calculate();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  selectChange = (event, value, type) => {
    if (value != null) {
      if (type === "ContainerName") {
        this.setState({ ContainerName: value });
      } else if (type === "VendorName") {
        this.setState({ vendorName: value });
      } else if (type === "PaidStatus") {
        this.setState({ PaidStatus: value });
      }
    }
    if (value === "InvoiceNumber") {
      this.setState({ InvoiceNumber: event.target.value });
    } else if (value === "InvoiceAmount") {
      this.setState({ InvoiceAmount: event.target.value });
    } else if (value === "Confirmation") {
      this.setState({ Confirmation: event.target.value });
    }
  };

  dateChange = (date, type) => {
    this.setState({
      [type]: date,
    });
  };
  Calculate = () => {
    debugger;
    let MarkupData = this.state.ConsoleSplitRecord;
    let total = 0;
    for (var i = 0; i < MarkupData.length; i++) {
      total = total + Number(MarkupData[i].splitAddCFT);
    }
    this.setState({ finalTotal: total });
    console.log("total ..", total);
  };
  handledInput = (e, id, MarkupType, Type) => {
    debugger;
    let MarkupData = this.state.ConsoleSplitRecord;
    let i = MarkupData.findIndex((x) => x.ShippingID === id);

    let x = document.getElementsByTagName("input");
    let val = 0;
    val = e.target.value === "" ? 0 : e.target.value;
    if (Type === "splitAddCFT") {
      MarkupData[i].splitAddCFT = val;
    }
    this.setState({ ConsoleSplitRecord: MarkupData });
  };

  handleBlur = (e, id, MarkupType, Type) => {
    let MarkupData = this.state.ConsoleSplitRecord;
    let i = MarkupData.findIndex((x) => x.ShippingID === id);

    let x = document.getElementsByTagName("input");
    let val = 0;
    val = e.target.value;
    debugger;
    if (Type === "splitAddCFT") {
      if (val === "0" || val === "") {
        MarkupData[i].USDErrorText = "please fill the details";
      } else {
        MarkupData[i].splitAddCFT = parseFloat(val).toFixed(2);
        x[i].className = "form-control";
        MarkupData[i].USDErrorText = "";
      }
    }
    this.setState({ ConsoleSplitRecord: MarkupData });
    this.Calculate();
  };
  rendertable = () => {
    return this.state.ConsoleSplitRecord.map((service, idx) => {
      const {
        TrackingNumber,
        CFT,
        ContactName,
        ShippingID,
        splitAddCFT,
        USDErrorText,
      } = service;
      return (
        <tr key={ShippingID}>
          <td>{TrackingNumber}</td>
          <td>{ContactName}</td>
          <td>
            {this.state.vendorName.value
              ? this.state.vendorName.value
              : this.state.vendorName}
          </td>
          <td>{this.state.InvoiceNumber}</td>
          <td>
            {this.state.ContainerName.label
              ? this.state.ContainerName.label
              : this.state.ContainerName}
          </td>
          <td>
            <input
              type="number"
              name="splitAddCFT"
              id="splitAddCFT"
              className="form-control"
              value={splitAddCFT}
              onChange={(event) =>
                this.handledInput(event, ShippingID, splitAddCFT, "splitAddCFT")
              }
              onBlur={(e) =>
                this.handleBlur(e, ShippingID, splitAddCFT, "splitAddCFT")
              }
            />
            <span id="USDErr" style={{ color: "red", fontSize: "12px" }}>
              {USDErrorText}
            </span>
          </td>
        </tr>
      );
    });
  };

  render() {
    const {
      ContainerName,
      vendorName,
      InvoiceNumber,
      InvoiceAmount,
      PaidStatus,
      FromDate,
      ToDate,
      Confirmation,
      finalTotal,
    } = this.state;
    const containerName = this.state.ContainerNameList.map((container) => {
      return { value: container.ContainerID, label: container.ContainerName };
    });
    const VendorList = this.state.VendorList.map((type) => {
      return { value: type.VendorName, label: type.VendorName };
    });
    const PaidList = this.state.PaidStatusList.map((type) => {
      return { value: type.Name, label: type.Value };
    });
    return (
      <div>
        <Card>
          <CardHeader className="btn-right-outer" color="primary" icon>
            <CardIcon color="primary">
              <AssignmentIcon />
            </CardIcon>
            <h4 className="margin-right-auto text-color-black">
              Console Split Invoice
            </h4>
          </CardHeader>
          <CardBody className="shipment-cardbody mt-20">
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <FormControl fullWidth>
                  <Autocomplete
                    id="combo-box-demo"
                    options={containerName}
                    value={ContainerName}
                    onChange={(event, value) =>
                      this.selectChange(event, value, "ContainerName")
                    }
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Container Name"
                        margin="normal"
                        fullWidth
                      />
                    )}
                  />
                </FormControl>
              </GridItem>

              <GridItem xs={12} sm={12} md={3}>
                <FormControl fullWidth>
                  <Autocomplete
                    id="package_number"
                    options={VendorList}
                    value={vendorName}
                    getOptionLabel={(option) => option.label}
                    onChange={(event, value) =>
                      this.selectChange(event, value, "VendorName")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Vendor Name"
                        margin="normal"
                        fullWidth
                      />
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <div className="mt-15">
                  <FormControl fullWidth>
                    <TextField
                      label="Invoice Number"
                      value={InvoiceNumber}
                      onChange={(event) =>
                        this.selectChange(event, "InvoiceNumber")
                      }
                    />
                  </FormControl>
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <div className="mt-15">
                  <FormControl fullWidth>
                    <TextField
                      label="Invoice Amount"
                      value={InvoiceAmount}
                      onChange={(event) =>
                        this.selectChange(event, "InvoiceAmount")
                      }
                    />
                  </FormControl>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
                <FormControl fullWidth>
                  <Autocomplete
                    id="combo-box-demo"
                    options={PaidList}
                    value={PaidStatus}
                    onChange={(event, value) =>
                      this.selectChange(event, value, "PaidStatus")
                    }
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Paid Status"
                        margin="normal"
                        fullWidth
                      />
                    )}
                  />
                </FormControl>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <div className="date-spl">
                  <InputLabel className={classes.label}>Date Paid</InputLabel>
                  <FormControl fullWidth>
                    <Datetime
                      dateFormat={"MM/DD/YYYY"}
                      timeFormat={false}
                      value={FromDate}
                      onChange={(date) => this.dateChange(date, "FromDate")}
                      closeOnSelect={true}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </FormControl>
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <div className="date-spl">
                  <InputLabel className={classes.label}>
                    Payment Date
                  </InputLabel>
                  <FormControl fullWidth>
                    <Datetime
                      dateFormat={"MM/DD/YYYY"}
                      timeFormat={false}
                      value={ToDate}
                      onChange={(date) => this.dateChange(date, "ToDate")}
                      closeOnSelect={true}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </FormControl>
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <div className="mt-15">
                  <FormControl fullWidth>
                    <TextField
                      label="Confirmation"
                      value={Confirmation}
                      onChange={(event) =>
                        this.selectChange(event, "Confirmation")
                      }
                    />
                  </FormControl>
                </div>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <div className="">
                  <FormControl fullWidth>
                    <div className="shipment-submit">
                      <div className="right">
                        <Button
                          color="rose"
                          onClick={() => this.spiltCharges()}
                        >
                          Split Charges
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                </div>
              </GridItem>
            </GridContainer>
            {this.state.ConsoleSplitRecord.length > 0 ? (
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div className="shipment-pane mt-20" id="markupdetails">
                    <div className="package-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Tracking Number</th>
                            <th>Sender Name</th>
                            <th>Vendor Name</th>
                            <th>Invoice Number</th>
                            <th>Container Name</th>
                            <th>Amout</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.rendertable()}
                          <tr>
                            <td className="shipmentBox" colSpan="5">
                              <b
                                style={{
                                  float: "right",
                                  "margin-top": "5px",
                                }}
                              >
                                Total :
                              </b>
                            </td>
                            <td>
                              <input
                                value={parseFloat(finalTotal).toFixed(2)}
                                disabled={true}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="shipment-submit">
                      <div className="right">
                        <Button
                          color="rose"
                          onClick={() => this.updatePaymentIsused()}
                        >
                          UPDATE
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => this.cancelUser()}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
            ) : null}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ConsoleSplitInvoice;
