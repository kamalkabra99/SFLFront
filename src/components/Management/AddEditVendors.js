import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormHelperText from "@material-ui/core/FormHelperText";
import ReactTable from "react-table";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Icon from "@material-ui/core/Icon";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import SimpleBackdrop from "../../utils/general";
import _ from "lodash";
import "react-time-picker/dist/TimePicker.css";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import api from "../../utils/apiClient";
import FormControl from "@material-ui/core/FormControl";
import { CommonConfig } from "utils/constant.js";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Adduser from "@material-ui/icons/AccountCircle";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { fileBase } from "../../utils/config";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Button from "components/CustomButtons/Button.js";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class AddEditVendors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //---------------------- Navigation Data ----------------------------------//
      Steps: [
        {
          stepName: "Contact Details",
          stepId: "ContactDetails",
          classname: "active",
        },
        {
          stepName: "Service Offered",
          stepId: "ServiceOffered",
          classname: "inactive",
        },
        {
          stepName: "Comments",
          stepId: "Comments",
          classname: "inactive",
        },
        {
          stepName: "Documents",
          stepId: "Documents",
          classname: "inactive",
        },
      ],

      Loading: false,
      ServiceList: [],
      vendorId: !CommonConfig.isEmpty(this.props.history.location.state)
        ? this.props.history.location.state.vendorId
        : "",
      Attachments: [],
      Access: [],
      contactList: [],
    };
  }

  async componentDidMount() {
    this.setState({ Access: CommonConfig.getUserAccess("Vendor Management") });
    document.getElementById("ServiceOffered").style.display = "none";
    document.getElementById("Documents").style.display = "none";
    document.getElementById("Comments").style.display = "none";

    if (CommonConfig.isEmpty(this.state.vendorId)) {
      await this.getServiceList();
    }
  }
  ServiceMapping = (event, key) => {
    let ServiceList = this.state.ServiceList;
    if (event.target.checked) {
      var MappedServices = [
        {
          Id: Number(event.target.value),
          serviceName: event.target.name,
        },
      ];
      ServiceList[key].isChecked = event.target.checked;
      this.setState({
        offeredService: this.state.offeredService.concat(MappedServices),
        ServiceList: ServiceList,
      });
    } else {
      let Services = this.state.offeredService;
      var index = Services.findIndex(
        (x) => x.Id === Number(event.target.value)
      );
      Services.splice(index, 1);
      ServiceList[key].isChecked = event.target.checked;
      this.setState({ offeredService: Services, ServiceList: ServiceList });
    }
  };

  async getServiceList() {
    try {
      api
        .get("vendor/getServiceList")
        .then((res) => {
          if (res.success) {
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].isChecked = false;
            }
            this.setState({ ServiceList: res.data });
          }
        })
        .catch((err) => {
          console.log("err..", err);
        });
    } catch (error) {
      console.log("err..", error);
    }
  }
  navigateChange = (key) => {
    let stepsList = this.state.Steps;
    let activeIndex = stepsList.findIndex((x) => x.classname === "active");

    if (key !== activeIndex) {
      stepsList[key]["classname"] = "active";
      stepsList[activeIndex]["classname"] = "inactive";
      this.setState({ Steps: stepsList });
      let divID = stepsList[key]["stepId"];
      let activeDiv = stepsList[activeIndex]["stepId"];
      document.getElementById(divID).style.display = "block";
      document.getElementById(activeDiv).style.display = "none";
    }
  };
  showLoader() {
    this.setState({ Loading: true });
  }

  hideLoader() {
    this.setState({ Loading: false });
  }
  appendServices() {
    const Services = this.state.ServiceList;
    debugger;
    return Services.map((service, key) => {
      return (
        <GridItem xs={12} sm={12} md={3} key={key}>
          <FormControlLabel
            control={
              <Checkbox
                checked={service.isChecked}
                value={service.ServiceId}
                name={service.ServiceName}
                onChange={(event) => this.ServiceMapping(event, key)}
              />
            }
            label={service.ServiceName}
          />
        </GridItem>
      );
    });
  }
  render(Steps) {
    const Contactcolumns = [
      {
        Header: "Name",
        accessor: "Name",
        width: 180,
      },
      {
        Header: "Title",
        accessor: "Title",
        width: 180,
      },
      {
        Header: "City",
        accessor: "City",
        width: 100,
      },
      {
        Header: "State",
        accessor: "State",
        width: 100,
      },
      {
        Header: "Email",
        accessor: "Email",
        width: 220,
      },
      {
        Header: "Phone",
        accessor: "Phone",
        id: "phone",
        width: 125,
        Cell: (record) => {
          if (Object.values(record.value).length) {
            return (
              <div>
                <span>{record.value[0].phone}</span>
              </div>
            );
          } else {
            return null;
          }
        },
      },
      {
        Header: "Action",
        filterable: false,
        sortable: false,
        Cell: (record) => {
          return (
            <div className="align-right">
              {this.state.Access.WriteAccess === 1 ? (
                <CreateIcon
                  onClick={() =>
                    this.editContact(record.original, record.index)
                  }
                />
              ) : null}
              {this.state.Access.DeleteAccess === 1 ? (
                <DeleteIcon
                  onClick={() =>
                    this.setState({ open: true, contactListKey: record.index })
                  }
                />
              ) : null}
            </div>
          );
        },
      },
    ];
    const columns = [
      {
        Header: "Document Name",
        accessor: "Name",
        width: 220,
        maxWidth: 220,
        Cell: this.renderDocumentName,
      },
      {
        Header: "CreatedOn",
        accessor: "DocumentCreatedOn",
        width: 220,
        sortMethod: (a, b) => {
          return CommonConfig.dateSortMethod(a, b);
        },
        maxWidth: 220,
      },
      {
        Header: "Added By",
        accessor: "DocumentCreatedBy",
        width: 280,
        maxWidth: 280,
      },
      {
        Header: "Attachment",
        accessor: "actions",
        width: 80,
        filterable: false,
        sortable: false,
        Cell: (record) => {
          return (
            <div>
              {record.original.AttachmentPath ? (
                <div>
                  <a
                    href={fileBase + record.original.AttachmentPath}
                    className="normal-btn sm-orange"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View File
                  </a>
                </div>
              ) : this.state.Access.WriteAccess === 1 ? (
                <div>
                  <div className="custom-file-browse">
                    <span>Upload</span>
                    <input
                      type="file"
                      name="selectedfile"
                      id="file"
                      style={{ width: 140, border: 0 }}
                      onChange={(event) => this.fileUpload(event, record)}
                    />
                  </div>
                  <p>{this.stringTruncate(record.original.AttachmentName)}</p>
                </div>
              ) : null}
            </div>
          );
        },
      },
      {
        width: 100,
        filterable: false,
        sortable: false,
        Header: "Actions",
        Cell: (record) => {
          return record.original.AttachmentPath ? (
            <div className="align-right">
              {this.state.Access.DeleteAccess === 1 ? (
                <DeleteIcon
                  onClick={(e) => this.handleDocumentDelete(e, record.original)}
                />
              ) : null}
            </div>
          ) : this.state.Attachments.filter((x) => x.Status === "Active")
              .length ===
            record.index + 1 ? (
            <div className="align-right">
              <Icon color="secondary" onClick={() => this.AddNewRowData()}>
                add_circle
              </Icon>
            </div>
          ) : null;
        },
      },
    ];
    return (
      <div>
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}
        <GridContainer justify="center" className="schedule-pickup-main-outer">
          <GridItem xs={12} sm={12}>
            <Card>
              <CardHeader className="btn-right-outer" color="primary" icon>
                <CardIcon color="primary">
                  <Adduser />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">
                  Vendor Information
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={3}>
                    <div className="select-spl">
                      <FormControl fullWidth>
                        <CustomInput
                          // error={this.state.vendorNameErr}
                          // helperText={this.state.vendorNameHelperText}
                          labelText="Vendor Name"
                          id="vendorName"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className="requiredicon">
                                  perm_identity
                                </Icon>
                              </InputAdornment>
                            ),
                            //   value: this.state.vendorName,
                            //   onChange: (e) => this.handleChange(e, "vendorName"),
                            //   onBlur: (e) => this.handleBlur(e, "vendorName"),
                            //   onFocus: (event) =>
                            //     this.setState({
                            //       vendorNameErr: false,
                            //       vendorNameHelperText: "",
                            //     }),
                          }}
                        />
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <div className="select-spl">
                      <FormControl fullWidth>
                        <CustomInput
                          labelText={<span> Vendor Website </span>}
                          id="companywebsite"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            //   value: this.state.vendorWebsite,
                            //   onChange: (e) => this.handleChange(e, "website"),
                            //   onBlur: (e) => this.handleBlur(e, "website"),
                            //   onFocus: (e) =>
                            //     this.setState({
                            //       vendorWebsiteErr: false,
                            //       vendorWebsiteHelperText: "",
                            //     }),
                            endAdornment: (
                              <InputAdornment position="end">
                                {" "}
                                <Icon>public</Icon>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <div className="select-spl">
                      <FormControl fullWidth>
                        <CustomInput
                          labelText="Added By"
                          id="addedby"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className="requiredicon">
                                  location_city{" "}
                                </Icon>
                              </InputAdornment>
                            ),
                            //   value: this.state.createdBy,
                            disabled: true,
                          }}
                        />
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <div className="select-spl">
                      <FormControl error={this.state.vendorTypeErr} fullWidth>
                        <InputLabel>Vendor Type</InputLabel>
                        <Select
                          // value={this.state.vendorType}
                          // onChange={(event) =>
                          //   this.changeDropDown(event, "vendorType")
                          // }
                          // onFocus={() =>
                          //   this.setState({
                          //     vendorTypeErr: false,
                          //     vendorTypeHelperText: "",
                          //   })
                          // }
                          inputProps={{
                            name: "vendorType",
                            id: "vendorType",
                          }}
                        >
                          <MenuItem value="payable"> Payable </MenuItem>
                          <MenuItem value="receivable"> Receivable </MenuItem>
                          <MenuItem value="Both"> Both </MenuItem>
                        </Select>
                        <FormHelperText>
                          {/* {this.state.vendorTypeHelperText} */}
                        </FormHelperText>
                      </FormControl>
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={3}>
                    <div className="select-spl">
                      <FormControl fullWidth>
                        <InputLabel>Bulk Upload</InputLabel>
                        <Select
                          // value={this.state.isBulkUpload}
                          // onChange={(event) =>
                          //   this.changeDropDown(event, "bulkUpload")
                          // }
                          inputProps={{
                            name: "bulkupload",
                            id: "bulkupload",
                          }}
                        >
                          <MenuItem value={true}> Yes </MenuItem>
                          <MenuItem value={false}> No </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                      labelText={<span>Carrier Link</span>}
                      id="carrierlink"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon>location_city</Icon>
                          </InputAdornment>
                        ),
                        //   value: this.state.carrierLink,
                        //   onChange: (e) => this.handleChange(e, "carrierLink"),
                        //   onBlur: (e) => this.handleBlur(e, "carrierLink"),
                        //   onFocus: () =>
                        //     this.setState({
                        //       carrierLinkErr: false,
                        //       carrierLinkHelperText: "",
                        //     }),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                      labelText="Phone"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        //   value: this.state.ToPhone2,
                        //   disabled:
                        //     CommonConfig.getUserAccess("Shipment")
                        //       .DeleteAccess === 1
                        //       ? false
                        //       : true,

                        //   onChange: (event) =>
                        //     this.handleChangeTo(event, "phone2"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.User}>call</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Email"
                      id="registeremail"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        //   value: this.state.ToEmail,
                        //   disabled:
                        //     CommonConfig.getUserAccess("Shipment")
                        //       .DeleteAccess === 1
                        //       ? false
                        //       : true,

                        //   onChange: (event) =>
                        //     this.handleChangeTo(event, "email"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>
                              email
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={3}>
                    <div className="select-spl">
                      <FormControl fullWidth>
                        <InputLabel>Form W-9</InputLabel>
                        <Select
                          // value={this.state.isBulkUpload}
                          // onChange={(event) =>
                          //   this.changeDropDown(event, "bulkUpload")
                          // }
                          inputProps={{
                            name: "FormW9",
                            id: "FormW9",
                          }}
                        >
                          <MenuItem value={true}> Yes </MenuItem>
                          <MenuItem value={false}> No </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                      labelText="Address Line 1"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        //   value: this.state.ToAddressLine1,
                        //   onChange: (event) =>
                        //     this.handleChangeTo(event, "address1"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.User}>location_on</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                      labelText="Address Line 2"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        //   value: this.state.ToAddressLine1,
                        //   onChange: (event) =>
                        //     this.handleChangeTo(event, "address1"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.User}>location_on</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Address Line 3"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        //   value: this.state.ToAddressLine1,
                        //   onChange: (event) =>
                        //     this.handleChangeTo(event, "address1"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.User}>location_on</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={3}>
                    {" "}
                    <FormControl fullWidth>
                      <Autocomplete
                        // options={CountryOption}
                        id="Country"
                        getOptionLabel={(option) =>
                          option.label ? option.label : option
                        }
                        // value={selectedToCountry}
                        autoSelect
                        // onChange={(event, value) =>
                        //   this.selectChangeTab1(event, value, "ToCountry")
                        // }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.pickupcountryErr}
                            helperText={this.state.pickupcountryHelperText}
                            label="Country"
                            margin="normal"
                            fullWidth
                          />
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    {" "}
                    <CustomInput
                      labelText="Zip"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        // value: this.state.disableToZip
                        //   ? ""
                        //   : this.state.ToZipCode,
                        // disabled: this.state.disableToZip,
                        // onChange: (event) => this.handleChangeTo(event, "zip"),
                        // onBlur: (event) => this.handleBlur(event, "ToZipCode"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.User}>
                              local_post_office
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        //   value: toCity.label ? toCity.label : toCity,
                        //   onChange: (event) =>
                        //     this.handleCityStateChange(event, "toCity"),
                        //   onBlur: (event) =>
                        //     this.handleBlur(event, "toCity"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon>location_city</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="State"
                      id="state"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        // value: toState.value ? toState.value : toState,
                        // disabled: this.state.disableToState,
                        // onChange: (event) =>
                        //   this.handleCityStateChange(event, "toState"),
                        // onBlur: (event) =>
                        //   this.handleBlur(event, "toState"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon>location_city</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
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

            <div className="shipment-content">
              <div className="shipment-pane" id="ContactDetails">
                <div className="shipment-box mb-0">
                  <Card>
                    <CardHeader
                      className="btn-right-outer"
                      color="primary"
                      icon
                    >
                      {/* <CardIcon color="primary">
                        <Adduser />
                      </CardIcon> */}
                      <h4 className="margin-right-auto text-color-black">
                        Contact List
                      </h4>

                      <div className="right">
                        <Button color="rose" onClick={() => this.addContact()}>
                          Add
                        </Button>
                      </div>
                    </CardHeader>
                    <CardBody className="shipment-cardbody">
                      <GridContainer>
                        {this.state.contactList.length ? (
                          <GridItem xs={12} sm={12} md={12}>
                            <ReactTable
                              data={this.state.contactList}
                              sortable={true}
                              filterable={true}
                              resizable={false}
                              showPagination={true}
                              minRows={2}
                              defaultPageSize={10}
                              columns={Contactcolumns}
                              align="center"
                              className="-striped -highlight contact-list-vendor"
                            />
                          </GridItem>
                        ) : null}
                      </GridContainer>
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div className="shipment-pane" id="ServiceOffered">
                <div className="shipment-box mb-0">
                  <Card>
                    <CardHeader
                      className="btn-right-outer"
                      color="primary"
                      icon
                    >
                      {/* <CardIcon color="primary">
                        <Adduser />
                      </CardIcon> */}
                      <h4 className="margin-right-auto text-color-black">
                        Service Offered
                      </h4>
                    </CardHeader>
                    <CardBody className="shipment-cardbody">
                      <GridContainer>{this.appendServices()}</GridContainer>
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div className="shipment-pane" id="Comments">
                <div className="shipment-box mb-0">
                  <Card>
                    <CardHeader
                      className="btn-right-outer"
                      color="primary"
                      icon
                    >
                      <CardIcon color="primary">
                        <AssignmentIcon />
                      </CardIcon>
                      <h4 className="margin-right-auto text-color-black">
                        Comments
                      </h4>
                    </CardHeader>
                    <CardBody className="shipment-cardbody">
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="normal-textarea">
                            <textarea
                              aria-label="minimum height"
                              rowsMin={3}
                              value={this.state.comments}
                              id="comments"
                              onChange={(event) =>
                                this.handleChange(event, "comments")
                              }
                              required
                            />
                          </div>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div className="shipment-pane" id="Documents">
                <div className="shipment-box mb-0">
                  <Card>
                    <CardHeader
                      className="btn-right-outer"
                      color="primary"
                      icon
                    >
                      <CardIcon color="primary">
                        <AssignmentIcon />
                      </CardIcon>
                      <h4 className="margin-right-auto text-color-black">
                        Documentation
                      </h4>
                    </CardHeader>
                    <CardBody className="shipment-cardbody">
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={12}>
                          <ReactTable
                            data={this.state.Attachments.filter(
                              (x) => x.Status === "Active"
                            )}
                            sortable={true}
                            filterable={true}
                            resizable={false}
                            minRows={2}
                            columns={columns}
                            defaultPageSize={10}
                            align="center"
                            className="-striped -highlight"
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default AddEditVendors;
