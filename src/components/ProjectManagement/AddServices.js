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

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

const useStyles = makeStyles(styles);

class AddServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      

      ServiceType: "",
      ServiceTypeErr: false,
      ServiceTypeCheck: false,
      ServiceTypeHelperText: "",

   
    };
 
  }
  componentDidMount() {

    this.setState({
      AllAccess: CommonConfig.getUserAccess("Call Back").AllAccess,
    });
    this.setState({ loggedUser: CommonConfig.loggedInUserData().PersonID });
    let APIcheck = true;
    // if (
    //   this.props.history.location.state !== undefined &&
    //   this.props.history.location.state !== null
    // ) {
    //   this.setState({
    //     previousFilterList: this.props.history.location.state.filterlist,
    //     previousSortList: this.props.history.location.state.sortlist,
    //     WorkStatus:
    //       this.props.history.location.state.WorkStatus !== undefined
    //         ? this.props.history.location.state.WorkStatus
    //         : this.state.WorkStatus,
    //   });
    // debugger
     
    //   if (this.props.history.location.state.WorkStatus !== undefined) {
    //     APIcheck = false;
       
    //       this.filterMethod("", this.props.history.location.state.WorkStatus);
         
          
          
    //       this.state.WorkStatus =this.props.history.location.state.WorkStatus;
  

    //       this.setState({WorkStatus:this.props.history.location.state.WorkStatus});
       
    //     // this.props.history.location.state.WorkStatus.map((step, key) => { console.log("Status+Key","Status"+key);
    //     //   console.log("document.getElementById(Status+key):-",document.getElementById("Status"+key));//.checked=step.IsSelected;
    //     // });
    //   }
    // } else {
    //   var finalStatus = {
    //     id: "WorkStatus",
    //     value: "",
    //   };
    //   var finalSort = {
    //     id: "DateCreated",
    //     desc: true,
    //   };
    //   this.setState({
    //     previousFilterList: [finalStatus],
    //     previousSortList: [finalSort],
    //   });
    // }

    // if (APIcheck) {
    //   let newFilter = [{ label: "New", value: "New" , IsSelected: true}, { label: "Open", value: "Open" , IsSelected: true }];
    //   this.state.checkdata = newFilter;
    //   this.filterMethod("", newFilter);
    //   this.getStatus();
    this.getServiceData();
    }
    
  
  
  save = (redirect) => {debugger
    if (
      (CommonConfig.isEmpty(this.state.ServiceName) &&
        CommonConfig.isEmpty(this.state.ServiceType) ||
      (this.state.ServiceNameErr === true ||
        this.state.ServiceTypeErr === true )
    ) ){
      this.setState({ saveErr: true });
      cogoToast.error(
        "There were errors found on the form. Please correct and resubmit."
      );
    } else {
      this.setState({ saveErr: false });
      let data = {
        ServiceID: this.state.ServiceID,
        ServiceName: this.state.ServiceName,
        ServiceType: this.state.ServiceType,
        userId: CommonConfig.loggedInUserData().PersonID,
        flag:this.state.ServiceID!=null?"U":"I",
      };
      try {
        api.post("projectManagement/addUpdateServices", data).then((result) => {
          if (result.success) {
            this.setState({ loading: true });
            cogoToast.success("Update Sucessfully");
            if (redirect) {
              this.props.history.push({

                pathname: "/admin/ManageProjects",
                state: {
                  filterlist:
                    this.props.history.location.state &&
                      this.props.history.location.state.filterlist
                      ? this.props.history.location.state.filterlist
                      : null,
                  sortlist:
                    this.props.history.location.state &&
                      this.props.history.location.state.sortlist
                      ? this.props.history.location.state.sortlist
                      : null,
                  tabKey:
                    this.props.history.location.state &&
                      this.props.history.location.state.tabKey
                      ? this.props.history.location.state.tabKey
                      : null
                },




              });
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
    this.props.history.push({
      pathname: "/admin/ManageProjects",
      state: {
        filterlist:
          this.props.history.location.state &&
            this.props.history.location.state.filterlist
            ? this.props.history.location.state.filterlist
            : null,
        sortlist:
          this.props.history.location.state &&
            this.props.history.location.state.sortlist
            ? this.props.history.location.state.sortlist
            : null,
        tabKey:
          this.props.history.location.state &&
            this.props.history.location.state.tabKey
            ? this.props.history.location.state.tabKey
            : null
      },



    }

    );
  };


  handleChange = (event, type) => {
    if (type === "ServiceName") {
      this.setState({ ServiceNameCheck: true });
      let ServiceNameVal = event.target.value;
      if (ServiceNameVal === "" || ServiceNameVal === null) {
        this.setState({
            ServiceName: ServiceNameVal,
            ServiceNameErr: true,
            ServiceNameHelperText: "Please enter Service Name",
        });
      } else {
        this.setState({
          ServiceName: ServiceNameVal,
          ServiceNameErr: false,
          ServiceNameHelperText: "",
        });
      }
    
    } else if (type === "ServiceType") {
      this.setState({ ServiceTypeCheck: true });
      let Val = event.target.value;
      if (Val === "" || Val === null) {
        this.setState({
          ServiceType: Val,
          ServiceTypeErr: true,
          ServiceTypeHelperText: "Please Select Service Type",
        });
      } else {
        this.setState({
          ServiceType: Val,
          ServiceTypeErr: false,
          ServiceTypeHelperText: "",
        });
      }
    }
  };
  
  showLoader = () => {
    this.setState({ loading: true });
  };

  hideLoader = () => {
    this.setState({ loading: false });
  };
  async getServiceData() {debugger
    try {
      var data = {
        ServiceID:
          this.props.history.location.state &&
          this.props.history.location.state.id
            ? this.props.history.location.state.id
            : null,
      };
      this.showLoader();
      if(this.state.ServiceID!= null){ 
      let result = await api.post("projectManagement/getServiceDetailsById", data);
      if (result.success) {

        this.setState({ServiceID:result.Data[0].ServiceID,ServiceName:result.Data[0].ServiceName,ServiceType:result.Data[0].ServiceType}); 
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

  
  render() {
    const { ServiceType } = this.state;
    
    return (
      <GridContainer className="UserList-outer">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <User />
              </CardIcon>
              { this.state.ServiceID!=null?(
              <h4 className="margin-right-auto text-color-black">
             Edit Service
              
            
              </h4>
              ): <h4 className="margin-right-auto text-color-black">
              Add Service
               
             
               </h4>}
            </CardHeader>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Service Name"
                    id="ServiceName"
                    error={this.state.ServiceNameErr}
                    helperText={this.state.ServiceNameHelperText}
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      value: this.state.ServiceName,
                      onChange: (event) =>
                        this.handleChange(event, "ServiceName"),
                      onBlur: (event) =>
                        this.handleChange(event, "ServiceName"),
                      onFocus: (event) =>
                        this.setState({
                            ServiceNameCheck: false,
                            ServiceNameErr: false,
                            ServiceNameHelperText: "",
                        }),
                      endAdornment:
                        this.state.ServiceNameCheck !== true ? (
                          <Icon>email </Icon>
                        ) : this.state.ServiceNameeErr ? (
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
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Service Type"
                    id="ServiceType"
                    error={this.state.ServiceTypeErr}
                    helperText={this.state.ServiceTypeHelperText}
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      value: this.state.ServiceType,
                      onChange: (event) =>
                        this.handleChange(event, "ServiceType"),
                      onBlur: (event) =>
                        this.handleChange(event, "ServiceType"),
                      onFocus: () =>
                        this.setState({
                            ServiceTypeCheck: false,
                            ServiceTypeeErr: false,
                            ServiceTypeHelperText: "",
                        }),
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
export default AddServices;
