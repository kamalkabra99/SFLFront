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
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import SimpleBackdrop from "../../utils/general";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class zebraPrint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Base: "",
      customerName: "",
      customerNameErr: "",
      customerNameErrText: "",
      StartNumber: "",
      StartNumberErr: "",
      StartNumberErrText: "",
      EndNumber: "",
      EndNumberErr: "",
      EndNumberErrText: "",
      TextcustomerName: "",
      TextcustomerNameErr: "",
      TextcustomerNameErrText: "",
      TextNumberPrints: "",
      TextNumberPrintsErr: "",
      TextNumberPrintsErrText: "",
      SelectOne: "",
      SelectOneErr: "",
      SelectOneErrText: "",
      NumberPrints: "",
      NumberPrintsErr: "",
      NumberPrintsErrText: "",
      SelectOneList: [
        { value: "FRAGILE", label: "FRAGILE" },
        { value: "DAMAGED", label: "DAMAGED" },
        { value: "REPACKING", label: "REPACKING" },
        { value: "CRATING", label: "CRATING" },
        { value: "SHRINK WRAPPING", label: "SHRINK WRAPPING" },
      ],
    };
  }

  componentDidMount() {
    this.setState({ Base: CommonConfig.BaseUrl });
    // this.setState({ Base: "http://localhost:3000/" });

    document.getElementById("showTextBox").style.display = "none";
    document.getElementById("showAutocomplete").style.display = "block";
  }
  selectChange = (event, value, type) => {
    if (value === "customerName") {
      this.setState({
        customerName: event.target.value,
        customerNameErr: false,
        customerNameErrText: "",
      });
    } else if (value === "StartNumber") {
      let number1 = event.target.value.replace(/\D/g, "");
      this.setState({
        StartNumber: number1,
        StartNumberErr: false,
        StartNumberErrText: "",
      });
    } else if (value === "EndNumber") {
      let number2 = event.target.value.replace(/\D/g, "");
      this.setState({
        EndNumber: number2,
        EndNumberErr: false,
        EndNumberErrText: "",
      });
    } else if (value === "TextNumberPrints") {
      let number3 = event.target.value.replace(/\D/g, "");
      this.setState({
        TextNumberPrints: number3,
      });
    } else if (value === "NumberPrints") {
      let number4 = event.target.value.replace(/\D/g, "");
      this.setState({
        NumberPrints: number4,
        NumberPrintsErr: false,
        NumberPrintsErrText: "",
      });
    } else if (value === "TextcustomerName") {
      this.setState({
        TextcustomerName: event.target.value,
        SelectOneErr: false,
        SelectOneErrText: "",
      });
    } else if (type === "SelectOne") {
      if (value != null) {
        this.setState({
          SelectOne: value,
          SelectOneErr: false,
          SelectOneErrText: "",
        });
      }
    }
  };
  validate(type) {
    let IsFormValid = true;
    if (type == "sequence") {
      if (CommonConfig.isEmpty(this.state.customerName)) {
        IsFormValid = false;
        this.setState({
          customerNameErr: true,
          customerNameErrText: "Please enter customer name",
        });
      }
      if (CommonConfig.isEmpty(this.state.StartNumber)) {
        IsFormValid = false;
        this.setState({
          StartNumberErr: true,
          StartNumberErrText: "Please enter start number",
        });
      }
      if (CommonConfig.isEmpty(this.state.EndNumber)) {
        IsFormValid = false;
        this.setState({
          EndNumberErr: true,
          EndNumberErrText: "Please enter end number",
        });
      }
    } else if (type == "custom") {
      if (CommonConfig.isEmpty(this.state.NumberPrints)) {
        IsFormValid = false;
        this.setState({
          NumberPrintsErr: true,
          NumberPrintsErrText: "Please enter number of prints",
        });
      }
      if (
        CommonConfig.isEmpty(this.state.SelectOne) &&
        CommonConfig.isEmpty(this.state.TextcustomerName)
      ) {
        IsFormValid = false;
        this.setState({
          SelectOneErr: true,
          SelectOneErrText: "Please enter the details",
        });
      }
    }

    return IsFormValid;
  }
  SequenceGenrate(type) {
    if (type === "Text") {
      window.open(
        this.state.Base +
          "auth/zebraPrintout/" +
          // "http://localhost:3000/auth/zebraPrintout/" +
          this.state.TextNumberPrints +
          "/" +
          this.state.TextcustomerName,
        "_blank"
      );
    } else if (type === "Label") {
      debugger;
      if (this.validate("custom")) {
        var text = this.state.SelectOne.value
          ? this.state.SelectOne.value
          : this.state.TextcustomerName;
        window.open(
          this.state.Base +
            "auth/zebraPrintout/" +
            //  "http://localhost:3000/auth/zebraPrintout/" +
            this.state.NumberPrints +
            "/" +
            text,
          "_blank"
        );
      }
    } else if (type === "Sequence") {
      if (this.validate("sequence")) {
        window.open(
          this.state.Base +
            "auth/zebraPrintOutput/" +
            //  "http://localhost:3000/auth/zebraPrintOutput/" +
            this.state.StartNumber +
            "/" +
            this.state.EndNumber +
            "/" +
            this.state.customerName,
          "_blank"
        );
      }
    }
  }
  ChangeFromUser = (event, value) => {
    if (value != null) {
      if (value.value == "Enter yourself") {
        document.getElementById("showTextBox").style.display = "block";

        document.getElementById("showAutocomplete").style.display = "none";
        this.state.SelectOne = "";
      } else {
        this.setState({
          fromEmailErr: false,
          fromEmailHelperText: "",
        });
        document.getElementById("showTextBox").style.display = "none";
        console.log("first1");
        document.getElementById("showAutocomplete").style.display = "block";

        this.setState({
          SelectOne: value,
          // SelectOneErr: false,
          // SelectOneErrText: "",
        });
        // for (let index = 0; index < this.state.SelectOneList.length; index++) {
        //   if (this.state.SelectOneList[index].value == value.value) {
        //     console.log(this.state.fromContactList[index]);
        //     this.state.SelectOneList = this.state.SelectOneList[index].value;
        //     break;
        //   }
        // }
      }
    }
  };
  handleRefresh = () => {
    document.getElementById("showTextBox").style.display = "none";

    document.getElementById("showAutocomplete").style.display = "block";
    this.setState({ TextcustomerName: "" });
  };
  handleManual = () => {
    debugger;
    document.getElementById("showTextBox").style.display = "block";
    document.getElementById("showAutocomplete").style.display = "none";
    this.setState({ SelectOne: "" });
  };
  render() {
    const {
      customerName,
      EndNumber,
      StartNumber,
      NumberPrints,
      SelectOne,
      TextNumberPrints,
      TextcustomerName,
      SelectOneList,
    } = this.state;

    return (
      <div>
        <GridContainer justify="center" className="schedule-pickup-main-outer">
          {this.state.Loading === true ? (
            <div className="loading">
              <SimpleBackdrop />
            </div>
          ) : null}
          <GridItem xs={12} sm={12}>
            <GridContainer>
              <GridItem xs={6} sm={6}>
                <Card className="z-index-9">
                  <CardHeader className="btn-right-outer" color="primary" icon>
                    <CardIcon color="primary">
                      <AssignmentIcon />
                    </CardIcon>
                    <h4 className="margin-right-auto text-color-black">
                      Sequence Printing
                    </h4>
                  </CardHeader>

                  <CardBody>
                    <div className="shipment-pane">
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="mt-15">
                            <FormControl fullWidth>
                              <TextField
                                label="Customer Name"
                                value={customerName}
                                error={this.state.customerNameErr}
                                helperText={this.state.customerNameErrText}
                                onChange={(event) =>
                                  this.selectChange(event, "customerName")
                                }
                              />
                            </FormControl>
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="mt-15">
                            <FormControl fullWidth>
                              <TextField
                                label="Start Number"
                                value={StartNumber}
                                error={this.state.StartNumberErr}
                                helperText={this.state.StartNumberErrText}
                                onChange={(event) =>
                                  this.selectChange(event, "StartNumber")
                                }
                              />
                            </FormControl>
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                          <div className="mt-15">
                            <FormControl fullWidth>
                              <TextField
                                label="End Number"
                                value={EndNumber}
                                error={this.state.EndNumberErr}
                                helperText={this.state.EndNumberErrText}
                                onChange={(event) =>
                                  this.selectChange(event, "EndNumber")
                                }
                              />
                            </FormControl>
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="">
                            <FormControl fullWidth>
                              <div className="shipment-submit invoiceUpload">
                                <div className="right">
                                  <Button
                                    color="rose"
                                    onClick={() =>
                                      this.SequenceGenrate("Sequence")
                                    }
                                  >
                                    Submit
                                  </Button>
                                </div>
                              </div>
                            </FormControl>
                          </div>
                        </GridItem>
                      </GridContainer>
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={6} sm={6}>
                <Card className="z-index-9">
                  <CardHeader className="btn-right-outer" color="primary" icon>
                    <CardIcon color="primary">
                      <AssignmentIcon />
                    </CardIcon>
                    <h4 className="margin-right-auto text-color-black">
                      Custom Printing
                    </h4>
                  </CardHeader>
                  <CardBody>
                    <div className="shipment-pane">
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          {/* <div className="mt-15"> */}
                          <div className="label-print-wrp">
                            <FormControl fullWidth>
                              <div id="showTextBox" className="pt-14">
                                <TextField
                                  fullWidth
                                  label="Customer Name"
                                  value={TextcustomerName}
                                  error={this.state.SelectOneErr}
                                  helperText={this.state.SelectOneErrText}
                                  onChange={(event) =>
                                    this.selectChange(event, "TextcustomerName")
                                  }
                                />
                                <Tooltip
                                  html={true}
                                  multiline={true}
                                  width={100}
                                  title={
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: "Refresh Contact Name",
                                      }}
                                    />
                                  }
                                  arrow
                                >
                                  <a
                                    onClick={() => this.handleRefresh()}
                                    className="label-print-icn"
                                  >
                                    <Icon className="edit-icon">refresh</Icon>
                                  </a>
                                </Tooltip>
                              </div>

                              <div
                                id="showAutocomplete"
                                style={{ display: "none" }}
                              >
                                <Autocomplete
                                  options={SelectOneList}
                                  id="contactname"
                                  autoSelect
                                  className="contact-name-autocomplete"
                                  inputProps={{
                                    autoComplete: "new-password",
                                  }}
                                  // autoComplete="new-password"
                                  // disabled={this.state.disablefromState}
                                  getOptionLabel={(option) => option.label}
                                  // value={fromStateAutoCompleteVal}
                                  onChange={(event, value) =>
                                    this.ChangeFromUser(event, value)
                                  }
                                  value={SelectOne}
                                  onFocus={() =>
                                    this.setState({
                                      SelectOneErr: false,
                                      SelectOneErrText: "",
                                    })
                                  }
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      margin="normal"
                                      label="Select One"
                                      error={this.state.SelectOneErr}
                                      helperText={this.state.SelectOneErrText}
                                      fullWidth
                                    />
                                  )}
                                  noOptionsText={
                                    // <Box display="flex" justifyContent="space-between" alignItems="center">
                                    //   Color not available
                                    <div className="manual-div">
                                      <span className="manual-span">
                                        Can't find the name?
                                      </span>

                                      <a
                                        href="javascript:void(0)"
                                        variant="outlined"
                                        color="primary"
                                        className="manualEntry"
                                        onMouseDown={() => this.handleManual()}
                                        // onClick={() => { console.log('Add new color'); }}
                                      >
                                        Enter the name yourself
                                      </a>
                                    </div>

                                    // </Box>
                                  }
                                />
                                <Tooltip
                                  html={true}
                                  multiline={true}
                                  width={100}
                                  title={
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: "Enter name yourself",
                                      }}
                                    />
                                  }
                                  arrow
                                >
                                  <a
                                    onClick={() => this.handleManual()}
                                    className="label-print-icn"
                                  >
                                    <Icon className="edit-icon">edit</Icon>
                                  </a>
                                </Tooltip>
                              </div>
                            </FormControl>
                            {/* </div> */}
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="mt-15">
                            <FormControl fullWidth>
                              <TextField
                                label="Number Of Prints "
                                value={NumberPrints}
                                error={this.state.NumberPrintsErr}
                                helperText={this.state.NumberPrintsErrText}
                                onChange={(event) =>
                                  this.selectChange(event, "NumberPrints")
                                }
                              />
                            </FormControl>
                          </div>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={12}>
                          <div className="">
                            <FormControl fullWidth>
                              <div className="shipment-submit invoiceUpload">
                                <div className="right">
                                  <Button
                                    color="rose"
                                    onClick={() =>
                                      this.SequenceGenrate("Label")
                                    }
                                  >
                                    Submit
                                  </Button>
                                </div>
                              </div>
                            </FormControl>
                          </div>
                        </GridItem>
                      </GridContainer>
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
            {/* <Card className="z-index-9">
                <CardHeader className="btn-right-outer" color="primary" icon>
                  <CardIcon color="primary">
                    <AssignmentIcon />
                  </CardIcon>
                  <h4 className="margin-right-auto text-color-black">
                    Text Printing
                  </h4>
                </CardHeader>
                <CardBody>
                  <div className="shipment-pane">
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <div className="mt-15">
                          <FormControl fullWidth>
                            <TextField
                              label="customer Name"
                              value={TextcustomerName}
                              error={this.state.TextcustomerNameErr}
                              helperText={this.state.TextcustomerNameErrText}
                              onChange={(event) =>
                                this.selectChange(event, "TextcustomerName")
                              }
                            />
                          </FormControl>
                        </div>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <div className="mt-15">
                          <FormControl fullWidth>
                            <TextField
                              label="Number Of Prints"
                              value={TextNumberPrints}
                              error={this.state.TextNumberPrintsErr}
                              helperText={this.state.TextNumberPrintsErrText}
                              onChange={(event) =>
                                this.selectChange(event, "TextNumberPrints")
                              }
                            />
                          </FormControl>
                        </div>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <div className="">
                          <FormControl fullWidth>
                            <div className="shipment-submit invoiceUpload">
                              <div className="right">
                                <Button
                                  color="rose"
                                  onClick={() => this.SequenceGenrate("Text")}
                                >
                                  Submit
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                        </div>
                      </GridItem>
                    </GridContainer>
                  </div>
                </CardBody>
              </Card> */}

            <Card className="z-index-9">
              <CardHeader className="btn-right-outer" color="primary" icon>
                <CardIcon color="primary">
                  <AssignmentIcon />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">
                  Sequence Printing Process
                </h4>
              </CardHeader>

              <CardBody>
                <p>1. Right Click on Screen you want to Print.</p>
                <p>2. Click on 'Print Preview' on pop-up. </p>
                <p>3. Click on Page Setup - 4th button on toolbar.</p>
                <p>4. Change page size to 4.00" x 6.00".</p>
                <p>5. Change to Landscape.</p>
                <p>6. Hit OK and close Page setup pop-up window.</p>
                <p>
                  7. Click on Print Document button (1st button) on toolbar.
                </p>
                <p>8. Select "Zebra ZP 500(ZPL)" Printer and hit print.</p>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default zebraPrint;
