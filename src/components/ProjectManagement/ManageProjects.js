import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
// @material-ui/icons
import PhoneCallback from "@material-ui/icons/PhoneCallback";
// core components
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import Icon from "@material-ui/core/Icon";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import { CommonConfig } from "../../utils/constant";
import api from "../../utils/apiClient";
import SimpleBackdrop from "../../utils/general";
import moment from "moment";
import cogoToast from "cogo-toast";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";
import InfoIcon from "@material-ui/icons/PriorityHigh";
import Tooltip from "@material-ui/core/Tooltip";
import { decode as base64_decode, encode as base64_encode } from 'base-64';
// import utf8 from "utf8";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import FormControl from "@material-ui/core/FormControl";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Datetime from "react-datetime";


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class ManageProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Steps: [
        {
          stepName: "Project Master",
          stepId: "ProjectMaster",
          classname: "active",
        },
        {
          stepName: "Service Master",
          stepId: "ServiceMaster",
          classname: "inactive",
        },
        {
          stepName: "Service Allocation",
          stepId: "ServiceAllocation",
          classname: "inactive",
        },
        {
          stepName: "Resource Allocation",
          stepId: "ResourceAllocation",
          classname: "inactive",
        },
      ],
      notes: "",
      FinalServiceList: [],
      FinalServiceListSelect: [],
      isNotesVisible: true,
      BookofWorkData: [],
      ProjectListArray: [],
      ProjectName: "",
      saveResourceErr:"",
      saveErr:"",
      ResourceServiceName:"",
      ResourceServiceNameErr:"",
      ResourceServiceNameHelperText:"",
      ResourceServiceNameCheck:"",
      ResourceProjectName:"",
      ResourceServiceID:"",
      ResourceProjectID:"",
      ProjectNameErr:"",
      ResourceProjectNameErr:"",
      ResourceProjectNameHelperText:"",
      ResourceProjectNameCheck:"",
      ClientName: "",
      ProjectId: "",
      WorkStatus: [],
      checkdata: "",
      AllAccess: 0,
      Access: [],
      Loading: false,
      loggedUser: 0,
      finalLength: 0,
      statusList: [],
      filterProps: [],
      previousFilterList: [],
      sortProps: [],
      previousSortList: [],
      requestStatus: [],
      ServicesList: [],
      ServiceList: [],
      ServiceName: "",
      ServiceNameErr: "",
      ServiceNameHelperText:"",
      ServiceType: "",
      ServiceId: "",
      ServiceID: "",
      ProjectServiceList: [],
      ProjectServiceResourceList: [],
      ProjectID: "",
      ResourceProjectList: [],
      ResourceList: [],
      FinalResourceList: [],
      StartDate:"",
      StartDateErr: false,
      StartDateHelperText: "",
      EndDate:"",
      EndDateErr: false,
      EndDateHelperText: "",
      NewServiceName: "",
      NewServiceID: "",
      NewServiceNameErr: false,
      NewServiceNameHelperText: "",
      NewServiceType: "",
      ResourceID:"",
      DeleteOption:"",
    };
  }
  async componentDidMount() {

    await this.getProjectList();
    await this.getServiceList();
    await this.getResourceList();
    this.showHide();
    this.setState({ Access: CommonConfig.getUserAccess("User Management") });
    this.setState({
      AllAccess: CommonConfig.getUserAccess("Call Back").AllAccess,
    });
    this.setState({ loggedUser: CommonConfig.loggedInUserData().PersonID });
    let APIcheck = true;
    if (
      this.props.history.location.state !== undefined &&
      this.props.history.location.state !== null
    ) {
      this.setState({
        previousFilterList: this.props.history.location.state.filterlist,
        previousSortList: this.props.history.location.state.sortlist,
        WorkStatus:
          this.props.history.location.state.WorkStatus !== undefined
            ? this.props.history.location.state.WorkStatus
            : this.state.WorkStatus,
      });
      debugger

      if (this.props.history.location.state.WorkStatus !== undefined) {
        APIcheck = false;

        this.filterMethod("", this.props.history.location.state.WorkStatus);
        this.state.WorkStatus = this.props.history.location.state.WorkStatus;
        this.setState({ WorkStatus: this.props.history.location.state.WorkStatus });
      }
    } else {
      var finalStatus = {
        id: "WorkStatus",
        value: "",
      };
      var finalSort = {
        id: "DateCreated",
        desc: true,
      };
      this.setState({
        previousFilterList: [finalStatus],
        previousSortList: [finalSort],
      });
    }

    if (APIcheck) {
      let newFilter = [{ label: "New", value: "New", IsSelected: true }, { label: "Open", value: "Open", IsSelected: true }];
      this.state.checkdata = newFilter;
    }
  }

  getProjectListForResource = () => {
    debugger
    try {
      this.showLoador();
      api
        .post("projectManagement/getProjectList")
        .then((result) => {
          if (result.success) {
            this.hideLoador();
            console.log("lokeshlokeshlokeshlokeshlokesh", result.message);
            let projectList = result.message;
            this.setState({ ResourceProjectList: projectList });
            //  this.state.ProjectList = result.message ;
            console.log("this.state.ResourceProjectList", this.state.ResourceProjectList);

          } else {
            this.hideLoador();
            cogoToast.error("Something went wrong1");
          }
        })
        .catch((err) => {
          this.hideLoador();
          console.log("lokesh Project Error", err);
          cogoToast.error("Something went wrong--Project2");
        });
    } catch (err) {
      this.hideLoador();
      cogoToast.error("Something Went Wrong3");
    }

  }

  AddResourceToService = () => {
    this.props.history.push({
      pathname: "AddResourceToService/",
      state: {
        filterlist: this.state.filterProps,
        sortlist: this.state.sortProps,
        // WorkStatus: this.state.WorkStatus,
      },
    });
  };
  async getServiceList() {
    debugger
    try {
      this.showLoador();
      api
        .post("projectManagement/getServicesList")
        .then((result) => {
          if (result.success) {
            debugger
            this.hideLoador();
            console.log(result.message);
            var data = []
            this.state.ServicesList = [];
            let servicesList = result.message;
            this.setState({ ServicesList: servicesList, ServiceList: servicesList });
          } else {
            this.hideLoador();
            cogoToast.error("Something went wrong1");
          }
        })
        .catch((err) => {
          this.hideLoador();
          console.log("errerrerr", err);
          cogoToast.error("Something Went Wrong Service 2");
        });
    } catch (err) {
      this.hideLoador();
      cogoToast.error("Something Went Wrong3");
    }
  }

  handleEditService(record) {
    debugger
    let ServiceId = record.original.ServiceID;
    this.props.history.push({
      pathname: "AddServices/" + ServiceId,
      state: {
        id: ServiceId,
        filterlist: this.state.filterProps,
        sortlist: this.state.sortProps,
      },
    });
  }
  handleAddService(record) {
    // debugger
    // let ServiceId = record.original.ServiceID;
    // this.props.history.push({
    //   pathname: "AddServices/" + ServiceId,
    //   state: {
    //     id: ServiceId,
    //     filterlist: this.state.filterProps,
    //     sortlist: this.state.sortProps,
    //     //WorkStatus: this.state.WorkStatus,
    //   },
    // });
  }

  showLoador = () => {
    this.setState({ Loading: true });
  };
  AddService = () => {
    this.props.history.push({
      pathname: "AddServices/",
      state: {
        filterlist: this.state.filterProps,
        sortlist: this.state.sortProps,
        // WorkStatus: this.state.WorkStatus,
      },
    });
  };
  hideLoador = () => {
    this.setState({ Loading: false });
  };
  handleCheckboxChange = (e, record, type) => {
    let checkedArr = this.state.WorkStatus;
    if (type !== "All") {
      checkedArr
        .filter((x) => x.value === "All")
        .map((OBJ) => {
          OBJ.IsSelected = false;
          return OBJ;
        });
      checkedArr[record.Index]["IsSelected"] = e.target.checked;
      this.setState({
        checkAll: e.target.checked,
        //StatusList[0].IsSelected:true
      });
      let previousList = checkedArr.filter((x) => x.IsSelected === true);
      this.setState({ checkdata: previousList });
    } else {
      checkedArr.map((OBJ) => {
        OBJ.IsSelected = e.target.checked;
        return OBJ;
      });

      this.setState({
        checkAll: e.target.checked,
      });
      let previousList = checkedArr.filter((x) => x.IsSelected === true);
      let arrType = "previousSelectedStatusList";
      if (previousList.length === 0) {
        this.state.checkdata = "";
      } else {
        this.state.checkdata = `All`;
      }
      this.setState({
        WorkStatus: checkedArr,
      });
    }
  };
  searchfilter = () => {
    debugger
    this.setState({ IsDropDownShow: false });
    try {
      let Query = "";
      let inputdata = this.state.checkdata;
      if (inputdata === "All") {
        Query = " And 1 ";
      } else if (inputdata === "") {
        this.setState({ BookofWorkData: [] });
      } else if (inputdata.length === 1) {
        Query = ` AND ( bw.WorkStatus  = "` + inputdata[0].value + `")`;
      } else {
        for (var j = 0; j < inputdata.length; j++) {
          if (j === 0) {
            Query = ` AND ( bw.WorkStatus  = "` + inputdata[j].value + `"`;
          } else {
            Query =
              Query + ` OR bw.WorkStatus  = "` + inputdata[j].value + `"`;
          }
        }
        if (!CommonConfig.isEmpty(Query)) {
          Query = Query + `)`;
        }
      }
      if (CommonConfig.getUserAccess("Book of Work").AllAccess != 1) {

        Query = Query + ` AND (bw.AssignedBy = "` + CommonConfig.loggedInUserData().PersonID + `" OR bw.AssignedTo = "` + CommonConfig.loggedInUserData().PersonID + `")`

      }
      //  this.getProposalData(Query);
      //  this.getProjectData(Query);
    } catch (err) {
      cogoToast.error("Something went wrong 3");
    }
  };


  getProjectList = async () => {
    debugger
    try {
      this.showLoador();
      api
        .post("projectManagement/getProjectList")
        .then((result) => {
          if (result.success) {
            this.hideLoador();
            console.log("lokeshlokeshlokeshlokeshlokesh", result.message);
            let projectList = result.message;
            // this.state.ProjectListArray = projectList

            this.setState({ ProjectListArray: projectList });

            //    this.setState({ProjectListArray:projectList});

            console.log("Data Sets = ", this.state.ProjectListArray)
          } else {
            this.hideLoador();
            cogoToast.error("Something went wrong1");
          }
        })
        .catch((err) => {
          this.hideLoador();
          console.log("lokesh Project Error", err);
          cogoToast.error("Something went wrong--Project2");
        });
    } catch (err) {
      this.hideLoador();
      cogoToast.error("Something Went Wrong3");
    }
  }

  handleEdit(record) {
    debugger
    let ProjectId = record.original.ProjectID;
    this.props.history.push({
      pathname: "AddProject/" + ProjectId,
      state: {
        id: ProjectId,
        filterlist: this.state.filterProps,
        sortlist: this.state.sortProps,
        //WorkStatus: this.state.WorkStatus,
      },
    });
  }



  filterMethod = (event, value) => {
    //let value = this.state.checkdata;
    debugger;
    if (value !== null) {
      if (value.length !== 0) {
        value = value.filter(
          (v, i, a) => a.findIndex((t) => t.value === v.value) === i
        );
        let query = "";
        let StatusQuery = "";
        let q = 0;
        let allFilter = value.findIndex((x) => x.value === "All");
        if (allFilter === 0) {
          value.splice(allFilter, 1);
          allFilter = -1;
        }
        if (allFilter === -1) {
          for (var j = 0; j < value.length; j++) {
            if (value[j].IsSelected === true) {
              if (q === 0) {
                if (value.length === 1) {

                  StatusQuery =
                    ` AND ( bw.WorkStatus = "` + value[j].value + `")`;
                } else {
                  q++;
                  StatusQuery =
                    ` AND ( bw.WorkStatus = "` + value[j].value + `"`;
                }
              } else if (j + 1 === value.length) {
                q--;
                StatusQuery = ` OR bw.WorkStatus = "` + value[j].value + `")`;
              } else {

                StatusQuery = ` OR bw.WorkStatus = "` + value[j].value + `"`;
              }
            }


            query = query + StatusQuery;
            StatusQuery = "";
          }
        } else {
          value = [{ label: "All", value: "All" }];
        }
        debugger
        if (q != 0)
          query = query + ")";
        if (CommonConfig.getUserAccess("Book of Work").AllAccess != 1) {

          query = query + ` AND (bw.AssignedBy = "` + CommonConfig.loggedInUserData().PersonID + `" OR bw.AssignedTo = "` + CommonConfig.loggedInUserData().PersonID + `")`

        }
        console.log("query", query);
        //   this.getBookofWorkData(query);
      } else {
        // this.setState({ ProjectListArray: [] });
      }
      //   this.setState({ statusList: value });
    }
  };



  setFilterProps = (filterValue) => {
    this.setState({
      filterProps: filterValue.filtered,
      sortProps: filterValue.sorted,
    });
  };

  filterProps = (e) => {
    console.log("e = ", e)
    console.log("this.state.filterProps = ", this.state.filterProps, this.state.sortProps)
    if (this.state.filterProps !== e.filtered) {
      this.setFilterProps(e);
    }
    if (this.state.sortProps !== e.sorted) {
      this.setFilterProps(e);
    }
    return "";
  };

  AddProject = () => {
    this.props.history.push({
      pathname: "AddProject/",
      state: {
        filterlist: this.state.filterProps,
        sortlist: this.state.sortProps,
        // WorkStatus: this.state.WorkStatus,
      },
    });
  };
  setLength = (len) => {
    this.setState({ finalLength: len });
  };

  checkProps = (e) => {
    if (this.state.finalLength !== e.sortedData.length) {
      this.setLength(e.sortedData.length);
    }
    return "";
  };

  renderInputMethod = (params) => {
    // if(params.InputProps.startAdornment)
    // {
    //   params.InputProps.startAdornment.splice(0,params.InputProps.startAdornment.length)
    // }
    return <TextField {...params} variant="outlined" label="Status" />;
  };

  optionProps = (option, value) => {
    if (option.value === value.value) {
      return true;
    } else {
      return false;
    }
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
      document.getElementById(divID).style.display = "block";
      document.getElementById(activeDiv).style.display = "none";
    }
  };
  showHide() {
    document.getElementById("ProjectMaster").style.display = "block";
    document.getElementById("ServiceMaster").style.display = "none";
    document.getElementById("ServiceAllocation").style.display = "none";
    document.getElementById("ResourceAllocation").style.display = "none";
  }

  selectChange = (event, value, type) => {
    debugger

    if (value !== null) {
      if (type === "ProjectName") {
        var selectData = {
          label: value.label,
          value: value.value
        }
        this.setState({ ProjectName: selectData, ProjectID: value.value });
        this.getNonSelectedServicesByProject(value.value, selectData);
      }
    }
  };


  handleChangeService = (event, value, type) => {
    debugger

    if (value !== null) {
      if (type === "ProjectName") {
        var selectData = {
          label: value.label,
          value: value.value
        }
        this.setState({ ProjectName: selectData, ProjectID: value.value });
        this.getNonSelectedServicesByProject(value.value, selectData);
      }
    }
  };



  AddServicecToProject = () => {
    this.props.history.push({
      pathname: "AddServicesToProject/",
      state: {
        filterlist: this.state.filterProps,
        sortlist: this.state.sortProps,
        // WorkStatus: this.state.WorkStatus,
      },
    });
  };
  handleDelete = (record) => {
    if(record!=""){
    console.log(record);
    var data = {
      ProjectID: this.state.ProjectID,
      ServiceID: record,
      //Attachment: Attachment,
    };

    if (CommonConfig.getUserAccess("Project Management").AllAccess === 1) {
      api.post("projectManagement/deleteServiceAllocation", data).then((res) => {
        console.log(res);
        if (res.message[0][0].DeleteRes == 0)
          cogoToast.error("This Service of Project is used somewhere");
        else
          this.getNonSelectedServicesByProject(this.state.ProjectID,0);
        this.setState({ServiceName:"",ServiceID:""})
        this.closedeletemodalKeyword();


      });
    }

    if (
      CommonConfig.getUserAccess("Project Management").AllAccess === 0 &&
      CommonConfig.getUserAccess("Project Management").ReadAccess === 1
    ) {
      cogoToast.error("Sorry you don't have access to delete this");
    }
  }
  else
  {
   // var newArray = this.state.FinalServiceList.filter((index) => index.ServiceID !== "");
   // this.setState({FinalServiceList:newArray});
    this.closedeletemodalKeyword();
  }
  };

  handleDeleteResource = (record) => {
    if(record!=""){
    var data = {
      ServiceResourceID:record
      //Attachment: Attachment,
    };

    if (CommonConfig.getUserAccess("Project Management").AllAccess === 1) {
      api.post("projectManagement/deleteResourceAllocation", data).then((res) => {
        console.log(res);
        if (res.message.data[0][0].DeleteRes == 0)
          cogoToast.error("This Resource of Project is used somewhere");
        else
        this.getResourceByProject(this.state.ResourceProjectID, "");
        this.setState({ResourceName:"",ResourceID:""})
        this.closedeletemodalKeyword();


      });
    }

    if (
      CommonConfig.getUserAccess("Project Management").AllAccess === 0 &&
      CommonConfig.getUserAccess("Project Management").ReadAccess === 1
    ) {
      cogoToast.error("Sorry you don't have access to delete this");
    }
  }
  else
  {
    var newArray = this.state.FinalServiceList.filter((index) => index.ServiceID !== "");
    this.setState({FinalServiceList:newArray});

    this.closedeletemodalKeyword();
  }
  };

  closedeletemodalKeyword = () => {
    this.setState({ DeleteRequestKeyword: false });
  };
  openDeleteRequestModalKeyword(e,recordDeleteId,deleteOption) {debugger
    this.setState({
      DeleteRequestKeyword: true,
      DeleteRequestIdKeyword: recordDeleteId,
      DeleteOption:deleteOption,
    });
  }
  handleChangeResource = (event, value, type) => {
    debugger
    if (type === "NewServiceName") {
      this.setState({ ServiceNameCheck: true });
      let ServiceNameVal = value != null && value != "" ? value.label : "";
      if (ServiceNameVal === "" || ServiceNameVal === null) {
        this.setState({
          NewServiceName: ServiceNameVal,
          NewServiceID: "",
          NewServiceNameErr: true,
          NewServiceNameHelperText: "Please Select Service Name",
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
            NewServiceName: selectData,
            NewServiceID: value.value,
            NewServiceNameErr: false,
            NewServiceNameHelperText: "",
            ServiceType: serviceType[0].ServiceType,
          });
          
        }

      }

    } else if (type === "ServiceName") {
      this.setState({ ServiceNameCheck: true });
      let ServiceNameVal = value != null && value != "" ? value.label : "";
      if (ServiceNameVal === "" || ServiceNameVal === null) {
        this.setState({
          ResourceServiceName: ServiceNameVal,
          ResourceServiceID: "",
          ResourceServiceNameErr: true,
          ResourceServiceNameHelperText: "Please Select Service Name",
          ResourceServiceType: "",
        });
        this.getResourceByProject(this.state.ResourceProjectID, "");
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
            ResourceServiceName: selectData,
            ResourceServiceID: value.value,
            ResourceServiceNameErr: false,
            ResourceServiceNameHelperText: "",
            ResourceServiceType: serviceType[0].ServiceType,
          });
          this.getResourceByProject(this.state.ResourceProjectID, value.value);
        }

      }

    } else if (type === "ProjectName") {
      this.setState({ ResourceProjectNameCheck: true });

      //   let Val = value.label;
      if (value == null || value == "") {
        console.log("value = ", value)
       // if (value.label === "" && value.label === null) {
          this.setState({
            ResourceProjectName: [],
            ResourceProjectID: "",
            ResourceProjectNameErr: true,
            ResourceProjectNameHelperText: "Please Select Project Name",
          });
          this.setState({ ProjectServiceList: [] });
          this.setState({ ProjectServiceResourceList: []});
      // } 
      }else {
          var selectData = {
            label: value.label,
            value: value.value
          }
          this.setState({
            ResourceProjectName: selectData,
            ResourceProjectID: value.value,
            ResourceProjectNameErr: false,
            ResourceProjectNameHelperText: "",
          });

          console.log("ProjectName = ", this.state.ResourceProjectName);
          this.getServicesByProject(value.value);
        this.getResourceByProject(value.value, "");
        }
      
    }
    else if (type === "ResourceName") {
      this.setState({ ResourceNameCheck: true });

      //   let Val = value.label;
      if (value == null || value == "") {
        console.log("value = ", value)
      
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
  };
  handleChange = (event,value, type) => {debugger
    if (type === "ServiceName") {
      this.setState({ ServiceNameCheck: true });
      let ServiceNameVal = value!=null && value!=""?value.label:"";
      if (ServiceNameVal === "" || ServiceNameVal === null) {
        this.setState({
            ServiceName: ServiceNameVal,
            ServiceID:"",
            ServiceNameErr: true,
            ServiceNameHelperText: "Please Select Service Name",
            ServiceType:"",
        });
      } else {
        if(value!=null && value!=""){
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
          ServiceID:value.value,
          ServiceNameErr: false,
          ServiceNameHelperText: "",
          ServiceType:serviceType[0].ServiceType,
          });
        }
       
      }
    
    } else if (type === "ProjectName") {
      this.setState({ ProjectNameCheck: true });

   //   let Val = value.label;
   if(value!=null || value!=""){
      console.log("value = ",value)
      if (value.label === "" && value.label === null) {
        this.setState({
          ProjectName: [],
          ProjectID:"",
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
          ProjectID:value.value,
          ProjectNameErr: false,
          ProjectNameHelperText: "",
        });

        console.log("ProjectName = ",this.state.ProjectName);
        this.getServicesByProject(value.value);
      }
    }
    }
  };
  getServicesByProject(ProjectID) {
    debugger
    try {
      console.log(this.state.ProjectName);
      let data = {
        "ProjectID": ProjectID
      }
      this.showLoador();
      api
        .post("projectManagement/getServicesByProject", data)
        .then((result) => {
          if (result.success) {
            this.hideLoador();

            if (result.Data.ProjectService.length != 0)
              this.setState({ ProjectServiceList: result.Data.ProjectService });
            else {
              this.setState({ ProjectServiceList: [] });
              this.setState({ NewServiceName: "",NewServiceID: "",NewServiceNameErr: false });
              cogoToast.error("No Service Available for this Project");
            }
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

  async getNonSelectedServicesByProject(ProjectID,Add) {
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
            var newArray = []
            if (result.Data.ProjectService.length != 0) {

              this.setState({ ProjectServiceList: result.Data.ProjectService });
              var finalServicelist = {}
              var finalServicelistselect = {}
           
              var newArraySelect = []
              let check = 0;
              console.log("this.state.ServiceList.length", this.state.ServiceList.length);
              console.log("this.state.ServiceList", this.state.ServiceList);
              for (let index = 0; index < this.state.ServiceList.length; index++) {
                check = 1;
                for (let jindex = 0; jindex < result.Data.ProjectService.length; jindex++) {
                  if (result.Data.ProjectService[jindex].ServiceID == this.state.ServiceList[index].ServiceID) {
                    check = 0;
                    finalServicelist = {
                      "ServiceID": this.state.ServiceList[index].ServiceID,
                      "ServiceName": this.state.ServiceList[index].ServiceName,
                      "ServiceType": this.state.ServiceList[index].ServiceType,
                      "AlreadySelected": true,
                    }
                    newArray.push(finalServicelist)
                    break;
                  }
                  else {
                    finalServicelistselect = {
                      "ServiceID": this.state.ServiceList[index].ServiceID,
                      "ServiceName": this.state.ServiceList[index].ServiceName,
                      "ServiceType": this.state.ServiceList[index].ServiceType,
                    }

                    check = 1;

                  }

                }

                if (check == 1) {
                  newArraySelect.push(finalServicelistselect)

                }

              }
              this.setState({ FinalServiceList: newArray })
          //    if (check == 1 || result.Data.ProjectService.length === this.state.ServiceList.length) {
                
                this.setState({ FinalServiceListSelect: newArraySelect })
          //    }
            }
            else
            {     finalServicelist = {
                  "ServiceID": "",
                  "ServiceName": "",
                  "ServiceType": "",
                  "AlreadySelected": true,
                  }
                  newArray.push(finalServicelist)
                  this.setState({ FinalServiceList: newArray});
                  this.setState({ FinalServiceListSelect: this.state.ServiceList })
            }

            if(Add == 1 && result.Data.ProjectService.length != this.state.ServiceList.length)
              this.AddNewRowData();


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




  selectChangeResource = (event, value, type) => {
    debugger

    if (value !== null) {
      if (type === "ProjectName") {
        var selectData = {
          label: value.label,
          value: value.value
        }
        this.setState({ ResourceProjectName: selectData, ResourceProjectID: value.value });
        this.getServicesByProject(value.value);
        this.getResourceByProject(value.value, "");
      }
      else
        if (type === "ServiceName") {
          var selectData = {
            label: value.label,
            value: value.value
          }
          this.setState({ ResourceServiceName: selectData, ResourceServiceID: value.value });
          this.getResourceByProject(this.state.ResourceProjectID, value.value);

        }
    }
    else {
      if (this.state.ResourceProjectID != "" && this.state.ResourceProjectID != undefined)
        this.getResourceByProject(this.state.ResourceProjectID, value);
    }
  };
  
  renderServiceName = (cellInfo) => {
    debugger
    return (
      <div className="table-input-slam">

      </div>
    );
  };

  viewNotes = () => {
    return this.state.notes
    // .filter((x) => x.Status === "Active")
    // .map((notes, idx) => {
    //   return (
    //     <tr>
    //       <td style={{ width: "154px" }}>
    //         {momentTimezone(notes.CreatedOn)
    //           .tz(CommonConfig.UStimezone)
    //           .format(CommonConfig.dateFormat.dateTime)}
    //       </td>
    //       <td>
    //         {notes.disabled ? (
    //           <p
    //             id="noteText"
    //             dangerouslySetInnerHTML={{
    //               __html: notes.NoteText.replace(/\r?\n/g, "<br />"),
    //             }}
    //           ></p>
    //         ) : (
    //           <div className="table-textarea">
    //             <textarea
    //               name="NoteText"
    //               disabled={notes.disabled}
    //               value={notes.NoteText}
    //               onChange={(event) =>
    //                 this.handleChangeNotes(event, notes.Index)
    //               }
    //             ></textarea>
    //           </div>
    //         )}
    //       </td>
    //       {/* <td>{notes.AddedBy}</td> */}
    //       <td className="pck-action-column">
    //         <div className="pck-subbtn">
    //           {/* {this.state.DeleteAccess === 1? */}
    //           <Button
    //             justIcon
    //             color="danger"
    //             className="Plus-btn "
    //             onClick={() => this.handleNotesRemoveRow(notes.Index)}
    //             disabled={this.state.notesDisabled}
    //           >
    //             <i className={"fas fa-minus"} />
    //           </Button>
    //           {this.state.notes.filter((x) => x.Status === "Active")
    //             .length ===
    //             idx + 1 ? (
    //             <Button
    //               justIcon
    //               color="facebook"
    //               onClick={() => this.handleAddNotesRow()}
    //               className="Plus-btn "
    //             >
    //               <i className={"fas fa-plus"} />
    //             </Button>
    //           ) : null}
    //           <Tooltip title={notes.CreatedByNote} arrow>
    //             <Button
    //               className="Plus-btn info-icon"
    //               justIcon
    //               color="twitter"
    //             >
    //               <InfoIcon />
    //             </Button>
    //           </Tooltip>
    //         </div>
    //       </td>
    //     </tr>
    //   );
    //   });
  };
  saveData =  (redirect) => {debugger
    if (
      (CommonConfig.isEmpty(this.state.ServiceName) &&
        CommonConfig.isEmpty(this.state.ProjectName) ||
      (this.state.ServiceNameErr === true ||
        this.state.ProjectNameErr === true )
    ) ){
      this.setState({ saveErr: true });
      cogoToast.error(
        "Please correct the form and resubmit."
      );
    } else {
      this.setState({ saveErr: false });
      let data = {
        ProjectID:this.state.ProjectID,
        ServiceID: this.state.ServiceID,
        userId: CommonConfig.loggedInUserData().PersonID,
        flag:"I",
      };
      try {
               
      api.post("projectManagement/addUpdateServicesAllocation", data).then( (result) => {
          if (result.success) {
            this.setState({ loading: true });
            cogoToast.success("Save Sucessfully");
            // if (redirect) {
            //   this.props.history.push("/admin/ManageProjects");
            // } else {
            //   window.location.reload();
            // }
            this.getNonSelectedServicesByProject(this.state.ProjectID,1);
            
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
  saveResourceData =  (redirect) => {debugger
    if (
      (CommonConfig.isEmpty(this.state.NewServiceID) &&
      CommonConfig.isEmpty(this.state.ResourceName) && CommonConfig.isEmpty(this.state.StartDate) &&
      CommonConfig.isEmpty(this.state.EndDate) ||
      (this.state.NewServiceNameErr === true ||
        this.state.ResourceNameErr === true ||
        this.state.StartDateErr === true ||
        this.state.EndDateErr === true )
    ) ){
      this.setState({ saveResourceErr: true });
      cogoToast.error(
        "Please correct the form and resubmit."
      );
    } else {
      this.setState({ saveResourceErr: false });
      let data = {
        ProjectID:this.state.ResourceProjectID,
        ServiceID: this.state.NewServiceID,
        ResourceID: this.state.ResourceID,
        StartDate:this.state.StartDate == null || this.state.StartDate == ""
        ? "NULL"
        :moment(this.state.StartDate)
        .format(CommonConfig.dateFormat.dbDateOnly)
        .toString(),
        EndDate:this.state.EndDate == null || this.state.EndDate == ""
        ? "NULL"
        :moment(this.state.EndDate)
        .format(CommonConfig.dateFormat.dbDateOnly)
        .toString(),
        userId: CommonConfig.loggedInUserData().PersonID,
        flag:"I",
      };
      try {
               
      api.post("projectManagement/addUpdateResourceAllocation", data).then( (result) => {
          if (result.success) {
            this.setState({ loading: true });
            cogoToast.success("Save Sucessfully");
            // if (redirect) {
            //   this.props.history.push("/admin/ManageProjects");
            // } else {
            //   window.location.reload();
            // }
            this.getResourceByProject(this.state.ResourceProjectID, "");

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
  AddNewRowData = () => {
    debugger
    let attachments = this.state.FinalServiceList;
    let IsValid = true;
    for (let i = 0; i < this.state.FinalServiceList.length; i++) {
      if (!attachments[i].hasOwnProperty("ServiceName")) {
        IsValid = false;
      }
    }
    var AttachmentList = this.state.FinalServiceList.filter(
      (x) => x.AlreadySelected === true && (x.ServiceName === "" || x.ServiceName === null)
    );
    if (AttachmentList.length === 0 && IsValid) {
      const objAttachment = {
        Index: AttachmentList.filter((x) => x.AlreadySelected === true).length + 1,
        ServiceID:"",
        ServiceName: "",
        ServiceType: "",
        AlreadySelected: true,
      };
      this.setState({
        FinalServiceList: [...this.state.FinalServiceList, objAttachment],ServiceName:"",ServiceID:""
      });
    } else {
      cogoToast.error("Please fill above row first");
    }
  };
  AddNewRowDataResource = () => {
    debugger
    let attachments = this.state.ProjectServiceResourceList;
    let IsValid = true;
    for (let i = 0; i < this.state.ProjectServiceResourceList.length; i++) {
      if (!attachments[i].hasOwnProperty("ResourceName")) {
        IsValid = false;
      }
    }
    var AttachmentList = this.state.ProjectServiceResourceList.filter(
      (x) =>  (x.ResourceName === "" || x.ResourceName === null)
    );
    if (AttachmentList.length === 0 && IsValid) {
      const objAttachment = {
        Index: AttachmentList.filter((x) => x.AlreadySelected === true).length + 1,
        ResourceID:"",
        ResourceName: "",
        ServiceType: "",
        EndDate:"",
        ProjectServiceID: "",
        ServiceName:"",
        ServiceResourceID:"",
        StartDate:""
      };
      this.setState({
        ProjectServiceResourceList: [...this.state.ProjectServiceResourceList, objAttachment],ResourceName:"",ResourceID:"",StartDate:"",EndDate:""
      });
    } else {
      cogoToast.error("Please fill above row first");
    }
  };
  getResourceByProject(ProjectID,ServiceID) {
    debugger
      try {
        console.log(this.state.ResourceProjectName);
        let data={
          "ProjectID":ProjectID,
          "ServiceID":ServiceID ==undefined?0:ServiceID,
        }
        this.showLoador();
        api
          .post("projectManagement/getResourceByProject", data)
          .then((result) => {
            if (result.success) {
              this.hideLoador();
           
              if(result.Data.ProjectService.length !=0)
                this.setState({ ProjectServiceResourceList: result.Data.ProjectService });
             else
             {
              this.setState({ ProjectServiceResourceList: []});
              if(this.state.ServiceList.length==0 || result.Data.ProjectService.length ==0)
              this.AddNewRowDataResource();
              // var objAttachment = {
              //   ResourceID:"",
              //   ResourceName: "",
              //   ServiceType: "",
              //   EndDate:"",
              //   ProjectServiceID: "",
              //   ServiceName:"",
              //   ServiceResourceID:"",
              //   StartDate:""
              // };
              // var newArray = [];
              // newArray.push(objAttachment);
              // this.setState({ ProjectServiceResourceList: newArray});
             // this.setState({ ProjectServiceResourceList: []});
             //cogoToast.error("No Service Record Available for this Project");
             }
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



  render() {
    const { ResourceProjectList, ProjectListArray, ServiceList, ProjectServiceList, ProjectServiceResourceList, isNotesVisible } = this.state;
    const projectList = ProjectListArray.map((type) => {
      return { value: type.ProjectID, label: type.ProjectName };
    });
    const projectServiceList = ProjectServiceList.map((type) => {
      return { value: type.ServiceID, label: type.ServiceName };
    });
    const serviceList = this.state.FinalServiceListSelect.map((type) => {
      return { value: type.ServiceID, label: type.ServiceName };
    });
    const serviceListselect = this.state.FinalServiceListSelect.map((type) => {
      return { value: type.ServiceID, label: type.ServiceName };
    });
    const resourceList = this.state.FinalResourceList.map((type) => {
      return { value: type.ResourceID, label: type.ResourceName };
    });
    const column3 = [
      {
        Header: "Service Name",
        accessor: "ServiceName",
        width: 150,
        filterable: true,
        sortable: true,
        maxWidth: 150,
        Cell: (record) => {
          return (
            <div>
              {record.original.ResourceName != "" && record.original.ResourceName != null && record.original.ResourceName != undefined ? (
                <div>
                  {record.original.ServiceName}
                </div>
              ) : (
                <div>
                  <Autocomplete
                    id="ServiceName"
                    options={projectServiceList}
                    getOptionLabel={(option) => option.label}
                    value={this.state.NewServiceName}
                    onChange={(event, value) =>
                      this.handleChangeResource(event, value, "NewServiceName")
                    }
                    // onFocus={() =>
                    //   this.setState({
                    //     ServiceNameErr: false,
                    //     ServiceNameCheck: "",
                    //   })
                    // }
                    renderInput={(params1) => (
                      <TextField
                        {...params1}
                        label="Service Name"
                        error={""}
                        helperText={
                          ""
                        }
                        margin="normal"
                        fullWidth
                      />
                    )}
                  />

                </div>
              )}
            </div>
          );
        },
      },

      {
        Header: "Resource Name",
        accessor: "ResourceName",
        width: 150,
        filterable: true,
        sortable: true,
        maxWidth: 150,
        Cell: (record) => {
          return (
            <div>
              {record.original.ResourceName != "" && record.original.ResourceName != null && record.original.ResourceName != undefined ? (
                <div>
                  {record.original.ResourceName}
                </div>
              ) : (
                <div>
                  <Autocomplete
                    id="ResourceName"
                    options={resourceList}
                    getOptionLabel={(option) => option.label}
                    value={this.state.ResourceName}
                    onChange={(event, value) =>
                      this.handleChangeResource(event, value, "ResourceName")
                    }
                    // onFocus={() =>
                    //   this.setState({
                    //     ServiceNameErr: false,
                    //     ServiceNameCheck: "",
                    //   })
                    // }
                    renderInput={(params1) => (
                      <TextField
                        {...params1}
                        label="Resource Name"
                        error={""}
                        helperText={
                          ""
                        }
                        margin="normal"
                        fullWidth
                      />
                    )}
                  />

                </div>
              )}
            </div>
          );
        },

      },
      {
        Header: "Start Date",
        accessor: "StartDate",
        className:"date-ps",
        filterable: true,
        sortable: true,
        width: 100,
        maxWidth: 150,
        Cell: (record) => {
          return (
            <div>
              {record.original.StartDate != "" && record.original.StartDate != null && record.original.StartDate != undefined ? (
                <div>
                  {record.original.StartDate}
                </div>
              ) : (
                <div className="tbl-datepicker">
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
                        label="Start Date*"
                        margin="normal"
                    
                      />
                    )}
                  />
                 
              </div>
              )}
            </div>
          );
        },
      },
      {
        Header: "End Date",
        accessor: "EndDate",
        className:"date-ps",
        filterable: true,
        sortable: true,
        width: 100,
        maxWidth: 150,
        Cell: (record) => {
          return (
            <div>
              {record.original.EndDate != "" && record.original.EndDate != null && record.original.EndDate != undefined ? (
                <div>
                {record.original.EndDate}
                </div>
              ) : (
                
              <div className="tbl-datepicker">
    
                <Datetime
                  dateFormat={"MM/DD/YYYY"}
                  timeFormat={false}
                  value={this.state.EndDate}
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
                    
                    />
                  )}
                />

            </div>
              )}
            </div>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "Actions",
        align: "left",
        width: 80,
        maxWidth: 80,
        filterable: false,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
             
                {CommonConfig.getUserAccess("Project Management").DeleteAccess ===
                1 ? (
                  <Button   justIcon   color="danger" >
                     <DeleteIcon
                        onClick={(e) => this.openDeleteRequestModalKeyword(e,record.original.ServiceResourceID,"ResourceAllocation")}
                      />
                  </Button>
                 
                ) : null}
             
                {this.state.ProjectServiceResourceList.length == record.index+1?(
             
                  record.original.ResourceID !="" ?(
                  
                    <Button
                    justIcon
                    color="info"
                  >
                  <AddIcon onClick={() => this.AddNewRowDataResource()}/>
                    
                  
                    
                  </Button>
                  ):
                  (
                    <Button
                    justIcon
                    color="info"
                  >
                  
                  <SaveIcon onClick={() => this.saveResourceData()}/>
                    
                 
                  </Button>
                 )
                ):null
        }
            </div>
          )
        },
        sortable: false,
      },
    ];
    const column2 = [
      {
        Header: "Service Name",
        accessor: "ServiceName",
        width: 150,
        filterable: true,
        sortable: true,
        maxWidth: 150,
        // Cell:this.renderServiceName(serviceList),
      },
      {
        Header: "Service Type",
        accessor: "ServiceType",
        filterable: true,
        sortable: true,
        width: 100,
        maxWidth: 150,
      },
      {
        Header: "Actions",
        accessor: "Actions",
        align: "left",
        width: 80,
        maxWidth: 80,
        filterable: false,
        Cell: (record) => {
          return (
            // ): null}
            <div className="table-common-btn">
              <Button
                justIcon
                color="info"
                onClick={() => this.handleAddService(record)}
              >
                <i className="fas fa-add"></i>
              </Button>
              {CommonConfig.getUserAccess("Project Management").DeleteAccess ===
                1 ? (
                <Button
                  justIcon
                  color="danger"
                  onClick={(e) =>
                    this.openDeleteRequestModalKeyword(e,record.original.ServiceID,"ServiceAllocation")
                  }
                >
                  <i class="fas fa-trash"></i>
                </Button>
              ) : null}
            </div>
          );
        },
        sortable: false,
      },
    ];
    const column1 = [


      {
        Header: "Service Name",
        accessor: "ServiceName",
        width: 150,
        filterable: true,
        sortable: true,
        maxWidth: 150,
      },
      {
        Header: "Service Type",
        accessor: "ServiceType",
        filterable: true,
        sortable: true,
        width: 100,
        maxWidth: 150,
      },
      {
        Header: "Status",
        accessor: "Status",
        filterable: true,
        sortable: true,
        width: 150,
        maxWidth: 250,
      },
      {
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        width: 100,
        maxWidth: 150,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              <Button
                justIcon
                color="info"
                onClick={() => this.handleEditService(record)}
              >
                <i className="fas fa-edit"></i>
              </Button>

            </div>
          );
        },
        filterable: false,
      },
    ];
    const column = [
      {
        Header: "Project Id",
        accessor: "ProjectID",
        width: 150,
        filterable: true,
        sortable: true,
        maxWidth: 150,
      },
      {
        Header: "Date Created",
        accessor: "CreatedOn",
        width: 150,
        filterable: true,
        sortable: true,
        maxWidth: 150,
      },
      {
        Header: "Project Name",
        accessor: "ProjectName",
        width: 150,
        filterable: true,
        sortable: true,
        maxWidth: 150,
      },
      {
        Header: "Client Name",
        accessor: "ClientName",
        filterable: true,
        sortable: true,
        width: 100,
        maxWidth: 150,
      },
      {
        Header: "Status",
        accessor: "Status",
        filterable: true,
        sortable: true,
        width: 150,
        maxWidth: 250,
      },
      {
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        width: 100,
        maxWidth: 150,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              <Button
                justIcon
                color="info"
                onClick={() => this.handleEdit(record)}
              >
                <i className="fas fa-edit"></i>
              </Button>

            </div>
          );
        },
        filterable: false,
      },
    ];

    const column4 = [
      {
        Header: "Service Name",
        accessor: "ServiceName",
        width: 220,
        maxWidth: 220,
        Cell: (record) => {
          return (
            <div>
              {record.original.AlreadySelected && record.original.ServiceName != "" && record.original.ServiceName != null && record.original.ServiceName != undefined ? (
                <div>
                  {record.original.ServiceName}
                </div>
              ) : (
                <div>
                  <Autocomplete
                    id="ServiceName"
                    options={serviceList}
                    getOptionLabel={(option) => option.label}
                    value={this.state.ServiceName}
                    onChange={(event, value) =>
                      this.handleChange(event, value, "ServiceName")
                    }
                    // onFocus={() =>
                    //   this.setState({
                    //     ServiceNameErr: false,
                    //     ServiceNameCheck: "",
                    //   })
                    // }
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

                </div>
              )}
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
          return (
            <div className="table-common-btn">
             
                {this.state.Access.DeleteAccess === 1 ? (
                  <Button   justIcon   color="danger" >
                    <DeleteIcon
                      onClick={(e) => this.openDeleteRequestModalKeyword(e,record.original.ServiceID,"Service")}
                    />
                  </Button>
                ) : null}
             
              {this.state.FinalServiceList.filter((x) => x.AlreadySelected === true).length === record.index + 1 ? (
                
                  record.original.ServiceID !="" && this.state.FinalServiceList.length != this.state.ServiceList.length?(
                    <Button
                    justIcon
                    color="info"
                  >
                  <AddIcon onClick={() => this.AddNewRowData()}/>
                    
                  
                    
                  </Button>
                    
                  ):this.state.ProjectServiceList.length != this.state.ServiceList.length?(
                  (
                    <Button
                    justIcon
                    color="info"
                  >
                  
                  <SaveIcon onClick={() => this.saveData()}/>
                    
                 
                  </Button>
                
                )):null
                ) : null
              }
            </div>
          )
        },
      },
    ];


    return (
      <div>
        <GridContainer className="MuiGrid-justify-xs-center">
          <GridItem xs={12} sm={12} md={12}>
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
                        <span>{console.log("lok", this.state.AccountNumber, "esh ", step.stepName)}{step.stepName}</span>
                      </a>
                    </li>)

                })}
              </ul>
            </div>
            <div className="shipment-content mt-30">



              <div className="shipment-pane mt-20" id="ProjectMaster">
                <GridContainer className="UserList-outer">
                  {this.state.Loading === true ? (
                    <div className="loading">
                      <SimpleBackdrop />
                    </div>
                  ) : null}
                  <GridItem xs={12}>
                    <Card>
                      <CardHeader className="btn-right-outer" color="primary" icon>
                        <CardIcon color="primary">
                          <PhoneCallback />
                        </CardIcon>
                        <h4 className="margin-right-auto text-color-black">Project List</h4>


                        <div className="filter-wrap">
                          <div
                            className="filter-top-right"

                          >

                            <Button
                              color="primary"
                              className="wd-auto"
                              onClick={() => this.AddProject()}
                            >
                              Add Project
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody>


                        <ReactTable
                          data={this.state.ProjectListArray}
                          minRows={0}
                          filterable
                          textAlign={"left"}
                          defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                          resizable={false}
                          columns={column}
                          defaultPageSize={10}
                          showPaginationBottom={true}
                          className="-striped -highlight chatMgtList1"
                        />
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
              </div>
              <div className="shipment-pane mt-20" id="ServiceMaster">
                <GridContainer className="UserList-outer">
                  {this.state.Loading === true ? (
                    <div className="loading">
                      <SimpleBackdrop />
                    </div>
                  ) : null}
                  <GridItem xs={12}>
                    <Card>
                      <CardHeader className="btn-right-outer" color="primary" icon>
                        <CardIcon color="primary">
                          <PhoneCallback />
                        </CardIcon>
                        <h4 className="margin-right-auto text-color-black">Service List</h4>


                        <div className="filter-wrap">
                          <div
                            className="filter-top-right"

                          >

                            <Button
                              color="primary"
                              className="wd-auto"
                              onClick={() => this.AddService()}
                            >
                              Add Service
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody>

                        <ReactTable
                          data={this.state.ServicesList}
                          //   defaultPageSize={10}
                          minRows={2}
                          defaultSorted={this.state.previousSortList}
                          defaultFiltered={this.state.previousFilterList}
                          resizable={false}
                          columns={column1}
                          getTheadFilterProps={(e) => this.filterProps(e)}
                          pageText={"Total rows : " + this.state.finalLength}
                          defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                          showPaginationBottom={true}
                          className="-striped -highlight"
                        />
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
              </div>
              <div className="shipment-pane mt-20" id="ServiceAllocation">
                <GridContainer className="UserList-outer">
                  {this.state.Loading === true ? (
                    <div className="loading">
                      <SimpleBackdrop />
                    </div>
                  ) : null}
                  <GridItem xs={12}>
                    <Card>
                      <CardHeader className="btn-right-outer" color="primary" icon>
                        <CardIcon color="primary">
                          <PhoneCallback />
                        </CardIcon>
                        <h4 className="margin-right-auto text-color-black">Service Allocation List</h4>

                        
                          


                            

                          

                          <div className="filter-wrap">
                            <div className="autocomplete-right">
                              <div className="autocomplete-fs-small">
                                
                                  <FormControl fullWidth className="mt-2">
                                    <Autocomplete
                                      id="combo-box-demo"
                                      options={projectList}
                                      value={this.state.ProjectName}
                                      onChange={(event, value) =>
                                        this.selectChange(event, value, "ProjectName")
                                      }
                                      getOptionLabel={(option) => option.label}
                                      renderInput={(params) => (
                                        <TextField {...params} label="ProjectName" />
                                      )}
                                    />
                                  </FormControl>
                                
                              </div>
                              {/* <Button
                          color="primary"
                          className="wd-auto"
                          onClick={() => this.AddServicecToProject()}
                        >
                          Add Service To Project
                        </Button> */}

                            </div>
                          </div>
                        
                      </CardHeader>
                      <CardBody>
                        <ReactTable
                          data={this.state.FinalServiceList.filter(
                            (x) => x.AlreadySelected === true
                          )}
                         // data={this.state.FinalServiceList}
                          defaultPageSize={10}
                          minRows={2}
                          defaultSorted={this.state.previousSortList}
                          defaultFiltered={this.state.previousFilterList}
                          resizable={false}
                          columns={column4}
                          getTheadFilterProps={(e) => this.filterProps(e)}
                          pageText={"Total rows : " + this.state.finalLength}
                          defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                          showPaginationBottom={true}
                          className="-striped -highlight"
                        />
                      </CardBody>
                    </Card>
                  </GridItem>
                  <div>
                  </div>
                </GridContainer>
              </div>
              <div className="shipment-pane mt-20" id="ResourceAllocation">
                <GridContainer className="UserList-outer">
                  {this.state.Loading === true ? (
                    <div className="loading">
                      <SimpleBackdrop />
                    </div>
                  ) : null}
                  <GridItem xs={12}>
                    <Card>
                      <CardHeader className="btn-right-outer" color="primary" icon>
                        <CardIcon color="primary">
                          <PhoneCallback />
                        </CardIcon>
                        <h4 className="margin-right-auto text-color-black">Resource Allocation List</h4>

                        <div className="right-dropdown">
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                              <FormControl fullWidth className="">
                                <Autocomplete
                                  id="combo-box-demo"
                                  options={projectList}
                                  value={this.state.ResourceProjectName}
                                  onChange={(event, value) =>
                                    this.handleChangeResource(event, value, "ProjectName")
                                  }
                                  getOptionLabel={(option) => option.label}
                                  renderInput={(params) => (
                                    <TextField {...params} label="ProjectName" />
                                  )}
                                />
                              </FormControl>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                              <FormControl fullWidth>
                              <Autocomplete
                                  options={projectServiceList}
                                  id="ServiceName"
                                  getOptionLabel={(option1) => option1.label}
                                  value={this.state.ResourceServiceName}
                                  onChange={(event, value) =>
                                    this.handleChangeResource(event, value, "ServiceName")
                                  }
                                  renderInput={(params) => (
                                    <TextField {...params} label="Service Name" />
                                  )}
                                />
                               
                               
                               
                               
                                {/* <Autocomplete
                                  options={projectServiceList}
                                  id="ServiceName"
                                  getOptionLabel={(option1) => option1.label}
                                  value={this.state.ResourceServiceName}
                                  // onChange={(event, value) =>
                                  //   this.selectChangeResource(event, value, "ServiceName")
                                  // }
                                  // onFocus={() =>
                                  //   this.setState({
                                  //     ServiceNameErr: false,
                                  //     ServiceNameCheck: "",
                                  //   })
                                  // }
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
                                /> */}
                              </FormControl>
                            </GridItem>
                          </GridContainer>
                        </div>

                          
                        
                      </CardHeader>
                      <CardBody>
                        <ReactTable
                data={this.state.ProjectServiceResourceList}
                defaultPageSize={10}
                minRows={2}
                defaultSorted={this.state.previousSortList}
                defaultFiltered={this.state.previousFilterList}
                resizable={false}
                columns={column3}
                getTheadFilterProps={(e) => this.filterProps(e)}
                pageText={"Total rows : " + this.state.finalLength}
                //getPaginationProps={(e) => this.checkProps(e)}
                defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                showPaginationBottom={true}
                className="-striped -highlight table-height"

              />
                      </CardBody>
                    </Card>
                  </GridItem>
                  <div>
                  
                  </div>
                </GridContainer>
              </div>
            </div>
            <Dialog
                      open={this.state.DeleteRequestKeyword}
                      onClose={this.closedeletemodalKeyword}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Confirm Delete"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Are you sure, you want to delete this record?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.closedeletemodalKeyword} color="primary">
                          Cancel
                        </Button>
                        <Button
                          onClick={() =>
                            this.state.DeleteOption==="Service" || this.state.DeleteOption==="ServiceAllocation" ?this.handleDelete(this.state.DeleteRequestIdKeyword):
                            this.handleDeleteResource(this.state.DeleteRequestIdKeyword)
                          }
                          color="primary"
                         // autoFocus
                        >
                          Delete
                        </Button>
                      </DialogActions>
                    </Dialog>
          </GridItem>
        </GridContainer>











      </div>

    );
  }
}
export default ManageProjects;
