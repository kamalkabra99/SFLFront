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

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProjectName: "",
      ProjectNameErr: false,
      ProjectNameCheck: false,
      ProjectNameHelperText: "",
      loading: false,
      DisplayName: "",
      DisplayNameErr: false,
      DisplayNameCheck: false,
      DisplayNameHelperText: "",
      ProjectID:
      this.props.history.location.state &&
      this.props.history.location.state.id
        ? this.props.history.location.state.id
        : null,
      EnvelopMarkup: "",
      EnvelopMarkupErr: false,
      EnvelopMarkupCheck: false,
      EnvelopMarkupHelperText: "",

      DefaultMarkup: "",
      DefaultMarkupErr: false,
      DefaultMarkupCheck: false,
      DefaultMarkupHelperText: "",

      ProjectType: "",
      ProjectTypeErr: false,
      ProjectTypeCheck: false,
      ProjectTypeHelperText: "",

      DefaultMarkupType: "",
      defaultMarkupTypeErr: false,
      defaultMarkupTypeHelperText: "",
      defaultMarkupTypeCheck: false,
      defaultMarkupType: [
        { value: "Usd", label: "USD" },
        { value: "Percentage", label: "Percentage" },
      ],
      clientname: "",
      clientnameCheck: false,
      clientnameErr: false,
      clientnameHelperText: "",
      TrackingLink: "",
      TrackingLinkCheck: false,
      trackinglinkErr: false,
      trackinglinkHelperText: "",
    };
    this.requestChange = this.requestChange.bind(this);
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
    this.getProjectData();
    }
    
  
  
  save = (redirect) => {debugger
    if (
      (CommonConfig.isEmpty(this.state.ProjectName) &&
        CommonConfig.isEmpty(this.state.clientname) ||
      (this.state.ProjectNameErr === true ||
        this.state.clientnameErr === true )
    ) ){
      this.setState({ saveErr: true });
      cogoToast.error(
        "There were errors found on the form. Please correct and resubmit."
      );
    } else {
      this.setState({ saveErr: false });
      let data = {
        ProjectID: this.state.ProjectID,
        ProjectName: this.state.ProjectName,
        ClientName: this.state.clientname,
        userId: CommonConfig.loggedInUserData().PersonID,
        flag:this.state.ProjectID!=null?"U":"I",
      };
      try {
        api.post("projectManagement/addUpdateProject", data).then((result) => {
          if (result.success) {
            this.setState({ loading: true });
            cogoToast.success("Update Sucessfully");
            if (redirect) {
              this.props.history.push("/admin/ProjectList");
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
    this.props.history.push("/admin/ProjectList");
  };

  requestChange(event, value, type) {
    if (type === "defaultmarkuptype") {
      this.setState({ defaultMarkupTypeCheck: true });
      if (
        event.target.value === undefined ||
        event.target.value === "" ||
        event.target.value === null
      ) {
        this.setState({
          DefaultMarkupType: event.target.value,
          defaultMarkupTypeErr: true,
          defaultMarkupTypeHelperText: "Please Select any one option",
        });
      } else {
        this.setState({
          DefaultMarkupType: event.target.value,
          defaultMarkupTypeErr: false,
          defaultMarkupTypeHelperText: "",
        });
      }
    }
  }

  handleChange = (event, type) => {
    if (type === "ProjectName") {
      this.setState({ ProjectNameCheck: true });
      let ProjectNameVal = event.target.value;
      if (ProjectNameVal === "" || ProjectNameVal === null) {
        this.setState({
            ProjectName: ProjectNameVal,
            ProjectNameErr: true,
            ProjectNameHelperText: "Please enter Service Name",
        });
      } else {
        this.setState({
            ProjectName: ProjectNameVal,
            ProjectNameErr: false,
            ProjectNameHelperText: "",
        });
      }
    
    } else if (type === "clientname") {
      this.setState({ clientnameCheck: true });
      let Val = event.target.value;
      if (Val === "" || Val === null) {
        this.setState({
          clientname: Val,
          clientnameErr: true,
          clientnameHelperText: "Please enter Client Name",
        });
      } else {
        this.setState({
          clientname: Val,
          clientnameErr: false,
          clientnameHelperText: "",
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
  async getProjectData() {debugger
    try {
      var data = {
        ProjectID:
          this.props.history.location.state &&
          this.props.history.location.state.id
            ? this.props.history.location.state.id
            : null,
      };
      this.showLoader();
      if(this.state.ProjectID!= null){ 
      let result = await api.post("projectManagement/getProjectDetailsById", data);
      if (result.success) {

        this.setState({ProjectID:result.Data[0].ProjectID,ProjectName:result.Data[0].ProjectName,clientname:result.Data[0].ClientName}); 
        console.log(this.state.ProjectName);
        console.log(this.state.ProjectID);
        console.log(this.state.clientname); 
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
    const { defaultMarkupType } = this.state;
    const defaultmarkuptype = {
      options: defaultMarkupType.map((option) => option.label),
    };
    return (
      <GridContainer className="UserList-outer">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <User />
              </CardIcon>
              { this.state.ProjectID!=null?(
              <h4 className="margin-right-auto text-color-black">
             Edit Project
              
            
              </h4>
              ): <h4 className="margin-right-auto text-color-black">
              Add Project
               
             
               </h4>}
            </CardHeader>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Project Name"
                    id="ProjectName"
                    error={this.state.ProjectNameErr}
                    helperText={this.state.ProjectNameHelperText}
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      value: this.state.ProjectName,
                      onChange: (event) =>
                        this.handleChange(event, "ProjectName"),
                      onBlur: (event) =>
                        this.handleChange(event, "ProjectName"),
                      onFocus: (event) =>
                        this.setState({
                            ProjectNameCheck: false,
                            ProjectNameErr: false,
                            ProjectNameHelperText: "",
                        }),
                      endAdornment:
                        this.state.ProjectNameCheck !== true ? (
                          <Icon>email </Icon>
                        ) : this.state.ProjectNameErr ? (
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
                    labelText="Client Name"
                    id="clientname"
                    error={this.state.clientnameErr}
                    helperText={this.state.clientnameHelperText}
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      value: this.state.clientname,
                      onChange: (event) =>
                        this.handleChange(event, "clientname"),
                      onBlur: (event) =>
                        this.handleChange(event, "clientname"),
                      onFocus: () =>
                        this.setState({
                            clientnameCheck: false,
                            clientnameeErr: false,
                            clientnameHelperText: "",
                        }),
                      endAdornment:
                        this.state.clientnameCheck !== true ? (
                          <Icon>account_box</Icon>
                        ) : this.state.clientnameErr ? (
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
export default AddProject;
