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

class InvoiceUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchInvoiceNumber: "",
      SearchVendorName: "",
      VendorList: [],
      vendorName: "",
      InvoiceNumber: "",
      InvoiceNumberErr: false,
      InvoiceNumberErrText: "",
      InvoiceAmountErr: false,
      InvoiceAmountErrText: "",
      vendorNameErr: false,
      vendorNameErrText: "",
      FileErr: false,
      FileErrText: "",
      InvoiceAmount: "",
      ToDate: new Date(),
      fileName: "",
      file: "",
      InvoiceData: [],
      deletePopUp: false,
      deleteInvoiceID: "",
      deleteAttechment: "",
      DeleteAccess: 0,
      AllAccess: 0,
      ReadAccess: 0,
      WriteAccess: 0,
      Steps: [],
    };
  }

  componentDidMount() {
    debugger;
    console.log("first", CommonConfig.getUserAccess("Vendor Invoice Upload"));
    this.setState({
      DeleteAccess: CommonConfig.getUserAccess("Vendor Invoice Upload")
        .DeleteAccess,
      AllAccess: CommonConfig.getUserAccess("Vendor Invoice Upload").AllAccess,
      ReadAccess: CommonConfig.getUserAccess("Vendor Invoice Upload")
        .ReadAccess,
      WriteAccess: CommonConfig.getUserAccess("Vendor Invoice Upload")
        .WriteAccess,
    });
    var WriteAccess = CommonConfig.getUserAccess("Vendor Invoice Upload")
      .WriteAccess;

    var AllAccess = CommonConfig.getUserAccess("Vendor Invoice Upload")
      .AllAccess;

    debugger;
    if (WriteAccess == 1 || AllAccess == 1) {
      this.setState({
        Steps: [
          {
            stepName: "Invoice List",
            stepId: "InvoiceList",
            classname: "active",
          },
          {
            stepName: "Add Invoice",
            stepId: "AddInvoice",
            classname: "inactive",
          },
        ],
      });
    } else {
      this.setState({
        Steps: [
          {
            stepName: "Invoice List",
            stepId: "InvoiceList",
            classname: "active",
          },
        ],
      });
    }

    document.getElementById("AddInvoice").style.display = "none";

    this.getVendorName();
  }
  fileUpload = (e) => {
    var fileName = document.getElementById("file").value.toLowerCase();
    if (!fileName.endsWith(".pdf")) {
      alert("Please upload *.pdf file only.");
      return false;
    } else {
      this.setState({
        file: e.target.files[0],
        fileName: e.target.files[0] ? e.target.files[0].name : "",
        FileErr: false,
        FileErrText: "",
      });
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

  selectChange = (event, value, type) => {
    if (value != null) {
      if (type === "VendorName") {
        this.setState({
          vendorName: value,
          vendorNameErr: false,
          vendorNameErrText: "",
        });
      } else if (type === "SearchVendorName") {
        this.setState({ SearchVendorName: value });
      }
    }
    if (value === "InvoiceNumber") {
      this.setState({
        InvoiceNumber: event.target.value,
        InvoiceNumberErr: false,
        InvoiceNumberErrText: "",
      });
    } else if (value === "SearchInvoiceNumber") {
      this.setState({ SearchInvoiceNumber: event.target.value });
    } else if (value === "InvoiceAmount") {
      this.setState({
        InvoiceAmount: event.target.value,
        InvoiceAmountErr: false,
        InvoiceAmountErrText: "",
      });
    }
  };

  dateChange = (date, type) => {
    this.setState({
      [type]: date,
    });
  };

  navigateChange = (key) => {
    let stepsList = this.state.Steps;
    let activeIndex = stepsList.findIndex((x) => x.classname === "active");

    if (key !== activeIndex) {
      stepsList[key]["classname"] = "active";
      stepsList[activeIndex]["classname"] = "inactive";
      this.setState({ Steps: stepsList });
      let divID = stepsList[key]["stepId"];
      let activeDiv = stepsList[activeIndex]["stepId"];
      // setTimeout(() => {
      document.getElementById(divID).style.display = "block";
      // }, 5000);
      //  setTimeout(() => {
      document.getElementById(activeDiv).style.display = "none";
      //  }, 5000);
    }
  };
  checkProps = (e) => {
    if (this.state.finalLength !== e.sortedData.length) {
      this.setLength(e.sortedData.length);
    }
    return "";
  };

  validate() {
    let IsFormValid = true;
    if (CommonConfig.isEmpty(this.state.InvoiceNumber)) {
      IsFormValid = false;
      this.setState({
        InvoiceNumberErr: true,
        InvoiceNumberErrText: "Please enter invoice number",
      });
    }
    if (CommonConfig.isEmpty(this.state.InvoiceAmount)) {
      IsFormValid = false;
      this.setState({
        InvoiceAmountErr: true,
        InvoiceAmountErrText: "Please enter invoice amount",
      });
    }
    if (CommonConfig.isEmpty(this.state.vendorName)) {
      IsFormValid = false;
      this.setState({
        vendorNameErr: true,
        vendorNameErrText: "Please enter vendor name",
      });
    }
    if (CommonConfig.isEmpty(this.state.file)) {
      IsFormValid = false;
      this.setState({
        FileErr: true,
        FileErrText: "Please select file",
      });
    }
    return IsFormValid;
  }

  uploadInvoice() {
    debugger;
    // if (this.state.InvoiceAmount === "") {
    //   return cogoToast.error("please enter Invoice Amount");
    // }
    if (this.validate()) {
      var input = {
        InvoiceAmount: this.state.InvoiceAmount,
        InvoiceNumber: this.state.InvoiceNumber,
        VendorName: this.state.vendorName.value,
        InvoiceAttch: this.state.fileName,
        paymentdate: moment(this.state.ToDate)
          .format(CommonConfig.dateFormat.dbDateOnly)
          .toString(),
        CreatedBy: CommonConfig.loggedInUserData().PersonID,
      };
      var formData = new FormData();
      formData.append("data", JSON.stringify(input));
      formData.append("Attachments", this.state.file);
      this.showLoader();
      try {
        api
          .post("reports/uploadInvoice", formData)
          .then((result) => {
            console.log("ress", result);
            this.hideLoader();
            this.setState({
              vendorName: "",
              InvoiceNumber: "",
              InvoiceAmount: "",
              ToDate: new Date(),
              fileName: "",
              file: "",
            });
            cogoToast.success("Invoice Add Successfully");
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log("error", err);
      }
    }
  }

  Handledelete(record) {
    debugger;
    console.log("innnnnn", record.original.InvoiceUpload);
    this.setState({
      deletePopUp: true,
      deleteInvoiceID: record.original.InvoiceID,
      deleteAttechment: record.original.InvoiceUpload,
    });
  }
  viewInvoice(record) {
    debugger;
    console.log("innnnn", record.original.InvoiceUpload);
    window.open(
      "https://docs.sflworldwide.com/document/" + record.original.InvoiceUpload,
      "_blank"
    );
  }
  deleteInvoice = () => {
    var data = {
      InvoiceID: this.state.deleteInvoiceID,
      Attachment: this.state.deleteAttechment,
      SearchVendorName: this.state.SearchVendorName.value,
      SearchInvoiceNumber: this.state.SearchInvoiceNumber,
    };
    this.hideLoader();
    api
      .post("reports/DeleteInvoice", data)
      .then((res) => {
        debugger; //lkj
        if (res.success) {
          this.showLoader();
          this.setState({
            deletePopUp: false,
            InvoiceData: res.data[0],
          });
          this.hideLoader();
          cogoToast.success("Invoice Delete successfully");
          //}
        }
      })
      .catch((err) => {
        console.log("error....", err);
        this.hideLoader();
        cogoToast.error("Something Went Wrong");
      });
  };

  canceldelete = () => {
    this.setState({
      deletePopUp: false,
      deleteInvoiceID: "",
      deleteAttechment: "",
    });
  };
  SearchReset() {
    this.showLoader();
    this.setState({
      SearchInvoiceNumber: "",
      SearchVendorName: "",
      InvoiceData: [],
    });
    this.hideLoader();
  }
  SearchInvoice() {
    debugger;
    if (
      this.state.SearchVendorName === "" &&
      this.state.SearchInvoiceNumber == ""
    ) {
      return cogoToast.error("please fill any one field");
    }

    var input = {
      InvoiceNumber: this.state.SearchInvoiceNumber,
      VendorName: this.state.SearchVendorName.value,
    };
    this.showLoader();
    try {
      api
        .post("reports/GetSearchInvoiceData", input)
        .then((result) => {
          console.log("ress", result);
          this.setState({ InvoiceData: result.data[0] });
          this.hideLoader();
        })
        .catch((err) => {
          console.log(err);
          this.hideLoader();
        });
    } catch (err) {
      console.log("error", err);
      this.hideLoader();
    }
  }
  render() {
    const column =
      this.state.DeleteAccess == 1 || this.state.AllAccess == 1
        ? [
            {
              Header: "Vendor Name",
              id: "VendorName",
              width: 180,
              maxWidth: 180,
              filterable: true,
              sortable: true,
              accessor: "VendorName",
            },
            {
              Header: "Invoice Number",
              id: "InvoiceNumber",
              width: 95,
              maxWidth: 95,
              filterable: true,
              sortable: true,
              accessor: "InvoiceNumber",
            },
            {
              Header: "Invoice Date",
              id: "InvoiceDate",
              maxWidth: 92,
              filterable: true,
              sortable: true,
              width: 92,
              accessor: (data) => {
                if (CommonConfig.isEmpty(data.InvoiceDate)) {
                  return moment().format("MM/DD/YYYY");
                } else {
                  return moment(data.InvoiceDate).format(
                    CommonConfig.dateFormat.dateOnly
                  );
                }
              },
              // accessor: "InvoiceDate",
            },
            {
              Header: "Amount",
              id: "Amount",
              maxWidth: 96,
              filterable: true,
              sortable: true,
              width: 96,
              accessor: "InvoiceAmount",
            },
            {
              Header: "Invoice",
              accessor: "Invoice",
              width: 50,
              maxWidth: 50,
              sortable: false,
              filterable: false,
              Cell: (record) => {
                return (
                  <div className="table-common-btn">
                    <Button
                      justIcon
                      color="info"
                      onClick={() => this.viewInvoice(record)}
                    >
                      <i className="fa fa-file"></i>
                    </Button>
                  </div>
                );
              },
            },

            {
              Header: "Actions",
              accessor: "Actions",
              width: 42,
              maxWidth: 42,
              filterable: false,
              Cell: (record) => {
                return (
                  <div className="table-common-btn">
                    <Button
                      justIcon
                      color="danger"
                      onClick={() => this.Handledelete(record)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                );
              },
              sortable: false,
            },
          ]
        : [
            {
              Header: "Vendor Name",
              id: "VendorName",
              width: 180,
              maxWidth: 180,
              filterable: true,
              sortable: true,
              accessor: "VendorName",
            },
            {
              Header: "Invoice Number",
              id: "InvoiceNumber",
              width: 95,
              maxWidth: 95,
              filterable: true,
              sortable: true,
              accessor: "InvoiceNumber",
            },
            {
              Header: "Invoice Date",
              id: "InvoiceDate",
              maxWidth: 92,
              filterable: true,
              sortable: true,
              width: 92,
              accessor: (data) => {
                if (CommonConfig.isEmpty(data.InvoiceDate)) {
                  return moment().format("MM/DD/YYYY");
                } else {
                  return moment(data.InvoiceDate).format(
                    CommonConfig.dateFormat.dateOnly
                  );
                }
              },
              // accessor: "InvoiceDate",
            },
            {
              Header: "Amount",
              id: "Amount",
              maxWidth: 96,
              filterable: true,
              sortable: true,
              width: 96,
              accessor: "InvoiceAmount",
            },
            {
              Header: "Invoice",
              accessor: "Invoice",
              width: 50,
              maxWidth: 50,
              sortable: false,
              filterable: false,
              Cell: (record) => {
                return (
                  <div className="table-common-btn">
                    <Button
                      justIcon
                      color="info"
                      onClick={() => this.viewInvoice(record)}
                    >
                      <i className="fa fa-file"></i>
                    </Button>
                  </div>
                );
              },
            },
          ];
    const {
      SearchInvoiceNumber,
      SearchVendorName,
      vendorName,
      InvoiceNumber,
      InvoiceAmount,
      fileName,
      ToDate,
      InvoiceData,
    } = this.state;

    const VendorList = this.state.VendorList.map((type) => {
      return { value: type.VendorName, label: type.VendorName };
    });

    return (
      <div>
        <GridContainer justify="center" className="schedule-pickup-main-outer">
          {this.state.Loading === true ? (
            <div className="loading">
              <SimpleBackdrop />
            </div>
          ) : null}
          <GridItem xs={12} sm={12}>
            <Card className="z-index-9">
              <CardHeader className="btn-right-outer" color="primary" icon>
                <CardIcon color="primary">
                  <AssignmentIcon />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">
                  Vendor Invoice
                </h4>
              </CardHeader>
              <CardBody>
                <div className="shipment-nav">
                  <ul>
                    {this.state.Steps.map((step, key) => {
                      return (
                        <li>
                          <a
                            className={step.classname}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              this.navigateChange(key);
                            }}
                          >
                            <span>{step.stepName}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="shipment-content mt-20">
                  <div className="shipment-pane" id="InvoiceList">
                    <GridContainer>
                      {this.state.Loading === true ? (
                        <div className="loading">
                          <SimpleBackdrop />
                        </div>
                      ) : null}
                      <GridItem xs={12} sm={12} md={3}>
                        <FormControl fullWidth>
                          <Autocomplete
                            id="package_number"
                            options={VendorList}
                            value={SearchVendorName}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, value) =>
                              this.selectChange(
                                event,
                                value,
                                "SearchVendorName"
                              )
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
                              value={SearchInvoiceNumber}
                              onChange={(event) =>
                                this.selectChange(event, "SearchInvoiceNumber")
                              }
                            />
                          </FormControl>
                        </div>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <div className="">
                          <FormControl fullWidth>
                            <div className="shipment-submit invoiceUpload">
                              <div className="right">
                                <Button
                                  color="secondary"
                                  onClick={() => this.SearchReset()}
                                >
                                  Reset
                                </Button>
                                <Button
                                  color="rose"
                                  onClick={() => this.SearchInvoice()}
                                >
                                  Search
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                        </div>
                      </GridItem>
                    </GridContainer>
                    {InvoiceData.length ? (
                      <GridContainer justify="center">
                        <ReactTable
                          data={InvoiceData}
                          minRows={2}
                          // pageText={`Total rows : ` + searchFinalLength}
                          //   defaultFilterMethod={
                          //     CommonConfig.filterCaseInsensitive
                          //   }
                          // getPaginationProps={(e) => this.checkProps(e)}
                          filterable
                          resizable={false}
                          columns={column}
                          defaultPageSize={10}
                          showPaginationBottom={true}
                          className=" -striped -highlight all-account-react mt-30"
                        />
                      </GridContainer>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* {this.state.AllAccess == 1 || this.state.WriteAccess == 1 ? ( */}
                  <div className="shipment-pane" id="AddInvoice">
                    <GridContainer>
                      {this.state.Loading === true ? (
                        <div className="loading">
                          <SimpleBackdrop />
                        </div>
                      ) : null}
                      <GridItem xs={12} sm={12} md={4}>
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
                                error={this.state.vendorNameErr}
                                helperText={this.state.vendorNameErrText}
                              />
                            )}
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <div className="mt-15">
                          <FormControl fullWidth>
                            <TextField
                              label="Invoice Number"
                              value={InvoiceNumber}
                              onChange={(event) =>
                                this.selectChange(event, "InvoiceNumber")
                              }
                              error={this.state.InvoiceNumberErr}
                              helperText={this.state.InvoiceNumberErrText}
                            />
                          </FormControl>
                        </div>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <div className="date-spl">
                          <InputLabel className={classes.label}>
                            Invoice Date
                          </InputLabel>
                          <FormControl fullWidth>
                            <Datetime
                              dateFormat={"MM/DD/YYYY"}
                              timeFormat={false}
                              value={ToDate}
                              onChange={(date) =>
                                this.dateChange(date, "ToDate")
                              }
                              closeOnSelect={true}
                              renderInput={(params) => (
                                <TextField {...params} fullWidth />
                              )}
                            />
                          </FormControl>
                        </div>
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <div className="mt-15">
                          <FormControl fullWidth>
                            <TextField
                              label="Invoice Amount"
                              value={InvoiceAmount}
                              error={this.state.InvoiceAmountErr}
                              helperText={this.state.InvoiceAmountErrText}
                              onChange={(event) =>
                                this.selectChange(event, "InvoiceAmount")
                              }
                            />
                          </FormControl>
                        </div>
                      </GridItem>

                      <GridItem xs={12} sm={12} md={4}>
                        <div className="file-ipt-with-btn">
                          {/* <input value={fileName} disabled={true} /> */}
                          <label className="filename">{fileName}</label>
                          <div className="custom-file-browse fedex-upload">
                            <span>Select File</span>
                            <input
                              type="file"
                              name="selectedfile"
                              id="file"
                              error={this.state.FileErr}
                              helperText={this.state.FileErrText}
                              accept=".pdf"
                              className="normal-btn sm-orange"
                              onChange={(event) => this.fileUpload(event)}
                              inputProps={{}}
                            />
                          </div>
                          <span
                            id="FileErr"
                            style={{ color: "red", fontSize: "12px" }}
                          >
                            {this.state.FileErrText}
                          </span>
                        </div>
                      </GridItem>
                      {/* <GridItem xs={12} sm={6} md={6}>
                        <div className="custom-file-browse fedex-upload">
                          <span>Select File</span>
                          <input
                            type="file"
                            name="selectedfile"
                            id="file"
                            // accept=".xls,.xlsx"
                            className="normal-btn sm-orange"
                            onChange={(event) => this.fileUpload(event)}
                          />
                        </div>
                      </GridItem> */}
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <div className="">
                          <FormControl fullWidth>
                            <div className="shipment-submit">
                              <div className="right">
                                <Button
                                  color="rose"
                                  onClick={() => this.uploadInvoice()}
                                >
                                  Add Invoice
                                </Button>
                              </div>
                            </div>
                          </FormControl>
                        </div>
                      </GridItem>
                    </GridContainer>
                  </div>
                  {/* //   ) : (
                //     <></>
                //   )} */}
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <div>
          <Dialog
            open={this.state.deletePopUp}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Delete"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to delete?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.canceldelete} color="primary">
                Cancel
              </Button>
              <Button onClick={this.deleteInvoice} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default InvoiceUpload;
