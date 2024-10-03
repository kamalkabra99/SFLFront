import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import api from "../../utils/apiClient";
import Autocomplete from "@material-ui/lab/Autocomplete";
import User from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import { CommonConfig } from "utils/constant";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import cogoToast from "cogo-toast";
import ServiceList from "./ServiceList";
import moment from "moment-timezone";
import Datetime from "react-datetime";
const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

const useStyles = makeStyles(styles);

class AddResourceToService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProjectName: "",
      ProjectNameErr: false,
      ProjectNameCheck: false,
      ProjectNameHelperText: "",
      FinalServiceList: [],
      ResourceName: "",
      ResourceNameErr: false,
      ResourceNameCheck: false,
      ResourceNameHelperText: "",
      ServiceName: "",
      ServiceNameErr: false,
      ServiceNameCheck: false,
      ServiceNameHelperText: "",
      loading: false,
      ServiceID:
        this.props.history.location.state &&
          this.props.history.location.state.id
          ? this.props.history.location.state.id
          : null,
      Loading: false,
      ProjectList: [],
      ServiceList: [],
      ServiceID: "",
      ResourceID: "",
      ServiceType: "",
      ServiceTypeErr: false,
      ServiceTypeCheck: false,
      ServiceTypeHelperText: "",
      ResourceAllocationID: null,
      ProjectServiceList: [],
      ResourceList: [],
      FinalResourceList: [],
      ProjectID: "",
      StartDate:"",
      StartDateErr: false,
      StartDateHelperText: "",
    };

  }
  componentDidMount() {

    this.setState({
      AllAccess: CommonConfig.getUserAccess("Call Back").AllAccess,
    });
    this.setState({ loggedUser: CommonConfig.loggedInUserData().PersonID });
    let APIcheck = true;

    this.getProjectList();
    this.getServiceList();
    this.getResourceList();
  }
  handleDateChange = (date, type) => {
    debugger;
 
    if (type === "EndDate") {
      this.setState({
        EndDate: date,
        EndDateErr: false,
        EndDateHelperText: "",
      });
    } else if (type === "StartDate") {
      this.setState({
        StartDate: date,
        StartDateErr: false,
        StartDateHelperText: "",
      });
    }
  };
  handleDateValidation = (date, type) => {
    debugger;

    if (type === "StartDate") {
      this.setState({
        StartDate: date,
        StartDateErr: false,
        StartDateHelperText: "",
      });
      if (this.state.EndDate !== "")
        if (date < this.state.EndDate) {
          this.setState({
            StartDate: date,
            StartDateErr: false,
            StartDateHelperText: "",
          });
        } else {
          this.setState({
            StartDate: "",
            StartDateErr: true,
            StartDateHelperText: "Start Date must be Before End Date",
          });
        }
    } 
    if (type === "EndDate") {
      this.setState({
        EndDate: date,
        EndDateErr: false,
        EndDateHelperText: "",
      });
      if (this.state.StartDate !== "")
        if (date > this.state.StartDate) {
          this.setState({
            EndDate: date,
            EndDateErr: false,
            EndDateHelperText: "",
          });
        } else if (date != "") {
          this.setState({
            EndDate: "",
            EndDateErr: true,
            EndDateHelperText: "End Date must be after Start Date",
          });
        }
    
    }
  };
  getServicesByProject(ProjectID) {
    debugger
    try {
      let data = {
        "ProjectID": ProjectID
      }
      this.showLoador();
      api
        .post("projectManagement/getServicesByProject", data)
        .then((result) => {
          if (result.success) {
            this.hideLoador();
            if (result.Data.ProjectService.length != 0) {

              this.setState({ ProjectServiceList: result.Data.ProjectService });
              var finalServicelist = {}
              var newArray = []
              let check = 0;
              // for (let index = 0; index < this.state.ServiceList.length; index++) {
              //   check = 1;
              //   for (let jindex = 0; jindex < result.Data.ProjectService.length; jindex++) {
              //     if (result.Data.ProjectService[jindex].ServiceID == this.state.ServiceList[index].ServiceID) {
              //       check = 0;
              //       break;
              //     }
              //     else {
              //       finalServicelist = {
              //         "ServiceID": this.state.ServiceList[index].ServiceID,
              //         "ServiceName": this.state.ServiceList[index].ServiceName,
              //         "ServiceType": this.state.ServiceList[index].ServiceType
              //       }

              //     }

              //   }
              //   if (check == 1)
              //     newArray.push(finalServicelist)
              // }
              // this.setState({ FinalServiceList: newArray })

            }
            else
              this.setState({ FinalServiceList: this.state.ServiceList });





          } else {
            this.hideLoador();
            cogoToast.error("Something went wrong1");
          }
        })
        .catch((err) => {
          this.hideLoador();
          cogoToast.error("Something went wrong2");
        });
    } catch (err) {
      this.hideLoador();
      cogoToast.error("Something Went Wrong3");
    }
  }

  save = (redirect) => {
    debugger
    if (
      (CommonConfig.isEmpty(this.state.ServiceName) &&
        CommonConfig.isEmpty(this.state.ProjectName) && CommonConfig.isEmpty(this.state.ResourceName) &&
          (this.state.ServiceNameErr === true ||
            this.state.ProjectNameErr === true ||
            this.state.ResourceNameErr === true)
      )) {
      this.setState({ saveErr: true });
      cogoToast.error(
        "There were errors found on the form. Please correct and resubmit."
      );
    } else {
      this.setState({ saveErr: false });
      let data = {
        ProjectID: this.state.ProjectID,
        ServiceID: this.state.ServiceID,
        ResourceID: this.state.ResourceID,
        StartDate:  this.state.StartDate == null || this.state.StartDate == ""
        ? "NULL"
        :moment(this.state.StartDate)
        .format(CommonConfig.dateFormat.dbDateOnly)
        .toString(),
        EndDate: this.state.EndDate == null || this.state.EndDate == ""
        ? "NULL"
        :moment(this.state.EndDate)
        .format(CommonConfig.dateFormat.dbDateOnly)
        .toString(),
        userId: CommonConfig.loggedInUserData().PersonID,
        flag: this.state.ResourceAllocationID != null ? "U" : "I",
      };
      try {

        api.post("projectManagement/addUpdateResourceAllocation", data).then((result) => {
          if (result.success) {
            this.setState({ loading: true });
            cogoToast.success("Save Sucessfully");
            if (redirect) {
              this.props.history.push("/admin/ResourceAllocationList");
            } else {
              window.location.reload();
            }
          } else {
            this.setState({ loading: false });
            cogoToast.error("Something went wrong");
          }
        });
      } catch (err) {
        console.log("error", err);
      }
    }
  };

  cancel = () => {
    this.props.history.push("/admin/ResourceAllocationList");
  };
  selectChange = (event, value, type) => {
    debugger

    if (value !== null) {
      if (type === "ProjectName") {
        this.setState({ ProjectName: value.lable, ProjectID: value.value });;
      }
      else
        if (type === "ServiceName") {

          let serviceType = this.state.ServiceList.filter(
            (x) =>
              x.ServiceID === value.value
          );

          this.setState({ ServiceName: value.lable, ServiceID: value.value, ServiceType: serviceType[0].ServiceType });
        }
        else
        if (type === "ResourceName") {

       
          this.setState({ ResourceName: value.lable, ResourceID: value.value });
        }
    }
  };
  getProjectList() {
    debugger
    try {
      //   this.showLoador();
      api
        .post("projectManagement/getProjectList")
        .then((result) => {
          if (result.success) {
            //   this.hideLoador();
            debugger
            this.setState({ ProjectList: result.message });

            debugger

          } else {
            this.hideLoador();
            cogoToast.error("Something went wrong1");
          }
        })
        .catch((err) => {
          this.hideLoador();
          cogoToast.error("Something went wrong2");
        });
    } catch (err) {
      this.hideLoador();
      cogoToast.error("Something Went Wrong3");
    }
  }
  getServiceList() {
    debugger
    try {
      this.showLoador();
      api
        .post("projectManagement/getServicesList")
        .then((result) => {
          if (result.success) {
            this.hideLoador();
            let index = this.state.ProjectServiceList.filter(
              (x) =>
                x.ServiceID === this.state.ServiceID
            );
            this.setState({ ServiceList: result.message, FinalServiceList: result.message });



          } else {
            this.hideLoador();
            cogoToast.error("Something went wrong1");
          }
        })
        .catch((err) => {
          this.hideLoador();
          cogoToast.error("Something went wrong2");
        });
    } catch (err) {
      this.hideLoador();
      cogoToast.error("Something Went Wrong3");
    }
  }
  getResourceList() {
    debugger
    try {
      this.showLoador();
      api
        .post("projectManagement/getResourceList")
        .then((result) => {
          if (result.success) {
            this.hideLoador();

            this.setState({ ResourceList: result.message, FinalResourceList: result.message });



          } else {
            this.hideLoador();
            cogoToast.error("Something went wrong1");
          }
        })
        .catch((err) => {
          this.hideLoador();
          cogoToast.error("Something went wrong2");
        });
    } catch (err) {
      this.hideLoador();
      cogoToast.error("Something Went Wrong3");
    }
  }
  handleChange = (event, value, type) => {
    debugger
    if (type === "ServiceName") {
      this.setState({ ServiceNameCheck: true });
      let ServiceNameVal = value != null && value != "" ? value.label : "";
      if (ServiceNameVal === "" || ServiceNameVal === null) {
        this.setState({
          ServiceName: ServiceNameVal,
          ServiceID: "",
          ServiceNameErr: true,
          ServiceNameHelperText: "Please Select Service Name",
          ServiceType: "",
        });
      } else {
        if (value != null && value != "") {
          let serviceType = this.state.ServiceList.filter(
            (x) =>
              x.ServiceID === value.value
          );

          var selectData = {
            label: ServiceNameVal,
            value: value.value
          }

          this.setState({
            ServiceName: selectData,
            ServiceID: value.value,
            ServiceNameErr: false,
            ServiceNameHelperText: "",
            ServiceType: serviceType[0].ServiceType,
          });
        }

      }

    } else if (type === "ProjectName") {
      this.setState({ ProjectNameCheck: true });

      //   let Val = value.label;
      if (value != null || value != "") {
        console.log("value = ", value)
        if (value.label === "" && value.label === null) {
          this.setState({
            ProjectName: [],
            ProjectID: "",
            ProjectNameErr: true,
            ProjectNameHelperText: "Please Select Project Name",
          });
        } else {
          var selectData = {
            label: value.label,
            value: value.value
          }
          this.setState({
            ProjectName: selectData,
            ProjectID: value.value,
            ProjectNameErr: false,
            ProjectNameHelperText: "",
          });

          console.log("ProjectName = ", this.state.ProjectName);
          this.getServicesByProject(value.value);
        }
      }
    }
    else if (type === "ResourceName") {
      this.setState({ ResourceNameCheck: true });

      //   let Val = value.label;
      if (value != null || value != "") {
        console.log("value = ", value)
        if (value.label === "" && value.label === null) {
          this.setState({
            ResourceName: [],
            ResourceID: "",
            ResourceNameErr: true,
            ResourceNameHelperText: "Please Select Resource Name",
          });
        } else {
          var selectData = {
            label: value.label,
            value: value.value
          }
          this.setState({
            ResourceName: selectData,
            ResourceID: value.value,
            ResourceNameErr: false,
            ResourceNameHelperText: "",
          });

          console.log("ResourceName = ", this.state.ResourceName);
          //this.getServicesByProject(value.value);
        }
      }
    }
  };

  showLoader = () => {
    this.setState({ loading: true });
  };

  hideLoader = () => {
    this.setState({ loading: false });
  };
  async getServiceAllocationData() {
    debugger
    try {
      var data = {
        ProjectID:
          this.props.history.location.state &&
            this.props.history.location.state.id
            ? this.props.history.location.state.id
            : null,
      };
      this.showLoader();
      if (this.state.ServiceID != null) {
        let result = await api.post("projectManagement/getServiceAllocationByProjectId", data);
        if (result.success) {

          this.setState({ ServiceID: result.Data[0].ServiceID, ServiceName: result.Data[0].ServiceName, ServiceType: result.Data[0].ServiceType });
          console.log(this.state.ServiceName);
          console.log(this.state.ServiceID);
          console.log(this.state.ServiceType);
          this.hideLoader();
        } else {
          this.hideLoader();
          cogoToast.error("Something Went Wrong");
        }
      }
    } catch (err) {
      console.log("error...", err);
      cogoToast.error("Something went wrong4");
    }
  }
  showLoador = () => {
    this.setState({ Loading: true });
  };

  hideLoador = () => {
    this.setState({ Loading: false });
  };

  render() {
    const { ServiceType } = this.state;
    const projectList = this.state.ProjectList.map((type) => {
      return { value: type.ProjectID, label: type.ProjectName };
    });
    const serviceList = this.state.FinalServiceList.map((type) => {
      return { value: type.ServiceID, label: type.ServiceName };
    });
    const resourceList = this.state.FinalResourceList.map((type) => {
      return { value: type.ResourceID, label: type.ResourceName };
    });
    return (

      <GridContainer className="UserList-outer">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <User />
              </CardIcon>
              {this.state.ResourceAllocationID != null ? (
                <h4 className="margin-right-auto text-color-black">
                  Edit Service


                </h4>
              ) : <h4 className="margin-right-auto text-color-black">
                Add Resource To Service


              </h4>}



              <GridItem xs={12} sm={12} md={3}>
                <FormControl fullWidth className="mt-2">
                  <Autocomplete
                    id="combo-box-demo"
                    options={projectList}
                    value={this.state.ProjectName}
                    onChange={(event, value) =>
                      this.handleChange(event, value, "ProjectName")
                    }
                    onFocus={() =>
                      this.setState({
                        ProjectNameErr: false,
                        ProjectNameCheck: "",
                      })
                    }
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => (
                      <TextField {...params} label="ProjectName" />
                    )}
                  />
                </FormControl>
              </GridItem>


            </CardHeader>
            <CardBody>

              <GridContainer justify="center">

                <GridItem xs={12} sm={12} md={4}>

                  <div className="autocomplete-fs-small">

                    <FormControl fullWidth>
                      <Autocomplete
                        options={serviceList}
                        id="ServiceName"
                        getOptionLabel={(option1) => option1.label}
                        value={this.state.ServiceName}
                        autoSelect

                        onChange={(event, value) =>
                          this.handleChange(event, value, "ServiceName")
                        }
                        onFocus={() =>
                          this.setState({
                            ServiceNameErr: false,
                            ServiceNameCheck: "",
                          })
                        }
                        renderInput={(params1) => (
                          <TextField
                            {...params1}
                            label="Service Name"
                            error={this.state.ServiceNameErr}
                            helperText={
                              this.state.ServiceNameHelperText
                            }
                            margin="normal"
                            fullWidth
                          />
                        )}
                      />
                    </FormControl>

                  </div>

                </GridItem>
                <GridItem xs={12} sm={12} md={4}>

                  <CustomInput
                    labelText="Service Type"
                    id="ServiceType"
                    error={this.state.ServiceTypeErr}
                    helperText={this.state.ServiceTypeHelperText}
                    formControlProps={{ fullWidth: true }}
                    disabled={true}
                    inputProps={{

                      value: this.state.ServiceType,
                      // onChange: (event) =>
                      //   this.handleChange(event, "ServiceType"),
                      // onBlur: (event) =>
                      //   this.handleChange(event, "ServiceType"),
                      // onFocus: () =>
                      //   this.setState({
                      //       ServiceTypeCheck: false,
                      //       ServiceTypeeErr: false,
                      //       ServiceTypeHelperText: "",
                      //   }),
                      endAdornment:
                        this.state.ServiceTypeCheck !== true ? (
                          <Icon>account_box</Icon>
                        ) : this.state.ServiceTypeErr ? (
                          <InputAdornment position="end">
                            <CloseIcon
                              style={{ color: red[500] }}
                              className={useStyles.danger}
                            />
                          </InputAdornment>
                        ) : (
                          <InputAdornment position="end">
                            {" "}
                            <DoneIcon
                              style={{ color: green[500] }}
                              className={useStyles.success}
                            />
                          </InputAdornment>
                        ),
                    }}
                  />
                </GridItem>


                <GridItem xs={12} sm={12} md={4}>
                  <div className="autocomplete-fs-small">
                    <FormControl fullWidth>
                      <Autocomplete
                        options={resourceList}
                        id="ResourceName"
                        getOptionLabel={(option1) => option1.label}
                        value={this.state.ResourceName}
                        autoSelect

                        onChange={(event, value) =>
                          this.handleChange(event, value, "ResourceName")
                        }
                        onFocus={() =>
                          this.setState({
                            ResourceNameErr: false,
                            ResourceNameCheck: "",
                          })
                        }
                        renderInput={(params1) => (
                          <TextField
                            {...params1}
                            label="Resource Name"
                            error={this.state.ResourceNameErr}
                            helperText={
                              this.state.ResourceNameHelperText
                            }
                            margin="normal"
                            fullWidth
                          />
                        )}
                      />
                    </FormControl>

                  </div>

                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                        <div className="dt-vs date-spl">
                          <FormControl fullWidth>
                            <Datetime
                              dateFormat={"MM/DD/YYYY"}
                              timeFormat={false}
                              startDate={"08/01/2024"}
                              selected={this.state.StartDate}
                              value={this.state.StartDate}
                              inputProps={{ placeholder: "Start Date" }}
                              onChange={(date) =>
                                this.handleDateChange(date, "StartDate")
                              }
                              onBlur={(date) =>
                                this.handleDateValidation(date, "StartDate")
                              }
                              closeOnSelect={true}
                              renderInput={(params) => (
                                <TextField
                                  style={{ marginTop: "-15px" }}
                                  error={this.state.StartDateErr}
                                  helperText={this.state.StartDateHelperText}
                                  inputProps={{
                                    min: moment().format("YYYY-MM-DD"),
                                  }}
                                  {...params}
                                  label="Date Created*"
                                  margin="normal"
                                  fullWidth
                                />
                              )}
                            />
                            <Icon className="date-icon tp-slam">date_range</Icon>
                          </FormControl>
                        </div>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <div className="dt-vs date-spl">
                          <FormControl fullWidth>
                            <Datetime
                              dateFormat={"MM/DD/YYYY"}
                              timeFormat={false}
                              startDate={"08/01/2024"}
                              selected={this.state.EndDate}
                              value={this.state.EndDate}
                              inputProps={{ placeholder: "End Date" }}
                              onChange={(date) =>
                                this.handleDateChange(date, "EndDate")
                              }
                              onBlur={(date) =>
                                this.handleDateValidation(date, "EndDate")
                              }
                              closeOnSelect={true}
                              renderInput={(params) => (
                                <TextField
                                  style={{ marginTop: "-15px" }}
                                  error={this.state.EndDateErr}
                                  helperText={this.state.EndDateHelperText}
                                  inputProps={{
                                    min: moment().format("YYYY-MM-DD"),
                                  }}
                                  {...params}
                                  label="End Date*"
                                  margin="normal"
                                  fullWidth
                                />
                              )}
                            />
                            <Icon className="date-icon tp-slam">date_range</Icon>
                          </FormControl>
                        </div>
                      </GridItem>
                    </GridContainer>
            </CardBody>
          </Card>
          <div className="shipment-submit">
            <div className="right">
              <Button color="primary" onClick={(event) => this.save(true)}>
                Save & Exit
              </Button>
              <Button color="secondary" onClick={() => this.cancel()}>
                Cancel
              </Button>
            </div>
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}
export default AddResourceToService;
