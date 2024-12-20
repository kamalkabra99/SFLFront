import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
// @material-ui/core components
// @material-ui/icons
import HeadsetMic from "@material-ui/icons/HeadsetMic";
// core components
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "../CustomInput/CustomInput.js";
import InputLabel from "@material-ui/core/InputLabel";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import CardHeader from "components/Card/CardHeader.js";
import moment from "moment";
import SimpleBackdrop from "../../utils/general";
import api from "../../utils/apiClient";
import { CommonConfig } from "../../utils/constant";
import cogoToast from "cogo-toast";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";
import AdjustIcon from "@material-ui/icons/Adjust";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import BlockIcon from "@material-ui/icons/Block";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
const useStyles = () => makeStyles(styles);
const classes = useStyles();

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class TimeManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ContactList: [],
      ContactUsID: "",
      AllAccess: 0,
      curDate: "",
      Loading: false,
      statusList: [],
      loggedUser: 0,
      filterProps: [],
      previousFilterList: [],
      sortProps: [],
      breakDur: "0",
      IsDropDownShow: false,
      loggedUserBreak: 0,
      previousSortList: [],
      ProposalData: [],
      finalLength: 0,
      open: false,
      Leaveopen: false,
      pickupDisable: true,
      userTimeZone: "",

      // ManagedBy: "",
      TimeTypeValue:"",
      ReasonsValue:"",
      FromDate: new Date(),
      ToDate: new Date(),

      ManagedBy: "",
      viewAllClear: false,
      managedByList: [],
      TimeTypeValue: { value: "1st Half", label: "1st Half" },

      Timetype: [
        { value: "1st Half", label: "1st Half" },
        { value: "2nd Half", label: "2nd Half" },
        { value: "Full Day", label: "Full Day" },
        { value: "Work From Home", label: "Work From Home" },
      ],

      Reason: [
        { value: "Rotational", label: "Rotational" },
        { value: "Medical", label: "Medical" },
        { value: "Travel", label: "Travel" },
      ],

      UserTimeZoneList: [
        {
          label: "IST",
          value: "IST",
        },
        {
          label: "CST",
          value: "CST",
        },
        {
          label: "EST",
          value: "EST",
        },
        {
          label: "GMT",
          value: "GMT",
        },
        {
          label: "PST",
          value: "PST",
        },
      ],
      requestStatus: [
        { label: "15 minutes", value: "15", IsSelected: false, Index: 0 },
        { label: "30 minutes", value: "30", IsSelected: false, Index: 1 },
        { label: "45 minutes", value: "45", IsSelected: false, Index: 2 },
        { label: "1 hour", value: "60", IsSelected: false, Index: 3 },
      ],
    };
  }

  componentDidMount() {
    this.getManagedBy();
    console.log(
      "UserID: CommonConfig.loggedInUserData() = ",
      CommonConfig.loggedInUserData().userTimeZone
    );
    // var dates = moment().tz("America/Chicago").format("DD-MM-YYYY")

    // console.log("Datest = ", dates);
    // this.setState({ curDate: dates });

    // console.log(CommonConfig.getUserAccess("Time Booking").WriteAccess);
    // this.checkUserLoginToday();

    this.setState({
      userTimeZone: {
        value: CommonConfig.loggedInUserData().userTimeZone,
        label: CommonConfig.loggedInUserData().userTimeZone,
      },
    });

    if (CommonConfig.loggedInUserData().userTimeZone == "IST") {
      var dates = moment()
        .tz("Asia/Kolkata")
        .format("DD-MM-YYYY");
      this.setState({ curDate: dates });
    }

    if (CommonConfig.loggedInUserData().userTimeZone == "CST") {
      var dates = moment()
        .tz("America/Chicago")
        .format("DD-MM-YYYY");
      this.setState({ curDate: dates });
    }

    if (CommonConfig.loggedInUserData().userTimeZone == "EST") {
      var dates = moment()
        .tz("America/New_York")
        .format("DD-MM-YYYY");
      this.setState({ curDate: dates });
    }

    if (CommonConfig.loggedInUserData().userTimeZone == "PST") {
      var dates = moment()
        .tz("America/Los_Angeles")
        .format("DD-MM-YYYY");
      this.setState({ curDate: dates });
    }

    if (CommonConfig.loggedInUserData().userTimeZone == "GMT") {
      var dates = moment()
        .tz("Europe/London")
        .format("DD-MM-YYYY");
      this.setState({ curDate: dates });
    }

    this.checkUserBreakToday();
    console.log("UserLogin = ", this.state.userTimeZone);
    this.getTmsUserName(CommonConfig.loggedInUserData().userTimeZone);

    if (CommonConfig.getUserAccess("Time Booking").AllAccess == 1) {
    } else {
      this.state.viewAllClear = true;
      this.setState({
        ManagedBy: {
          value: CommonConfig.loggedInUserData().PersonID,
          label: CommonConfig.loggedInUserData().LoginID,
        },
      });
    }
  }
  getManagedBy() {
    try {
      api
        .get("contactus/getUsersForTMSList")
        .then((result) => {
          console.log("result", result);
          this.setState({ managedByList: result.Data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  showLoador = () => {
    this.setState({ Loading: true });
  };

  selectChange = (event, value, type) => {
    console.log("Typr = ",type)
    debugger
    if (value != null) {
        if (type === "ManagedBy") {
            this.setState({ ManagedBy: value });
            console.log(this.state.ManagedBy);
            this.state.ManagedBy = value
            console.log(this.state.ManagedBy);
            // this.getUserTMSReport()
        }

        if (type === "TimeTypeValue") {
            this.setState({ TimeTypeValue: value });
            console.log(this.state.TimeTypeValue);
            this.state.TimeTypeValue = value
            console.log(this.state.TimeTypeValue);
            // this.getUserTMSReport()
        }

        if (type === "ReasonsValue") {
          this.setState({ ReasonsValue: value });
          console.log(this.state.ReasonsValue);
          this.state.ReasonsValue = value
          console.log(this.state.ReasonsValue);
          // this.getUserTMSReport()
      }
    }
};

  hideLoador = () => {
    this.setState({ Loading: false });
  };

  getTmsUserName = (values) => {
    this.showLoador();
    console.log(CommonConfig.getUserAccess("Time Booking").AllAccess);
    var userdata = 0;
    if (CommonConfig.getUserAccess("Time Booking").AllAccess == 1) {
      userdata = 0;
    } else {
      userdata = 0;
    }

    var pData = {
      puserdata: userdata,
      userTimeZonedata: values,
    };
    this.setState({ ProposalData: [] });

    api.post("contactus/getTmsUserList", pData).then((res) => {
      if (res.success) {
        console.log("res14 = ", res);
        let requestData = res.Data[0];
        if (requestData.length > 0) {
          for (let i = 0; i < requestData.length; i++) {
            console.log("Date = ", requestData[i].LoginDate);
            debugger;

            if (requestData[i].LoginDate == null && requestData[i].LeaveDate == null) {
              console.log("IN");
              requestData[i].status = "Offline";
            }else if (requestData[i].LoginDate == null && requestData[i].LeaveDate != null) {
              console.log("IN");
              requestData[i].status = "Leave";
            }
            
            else if (requestData[i].LogoutTime != null) {
              requestData[i].status = "Logout";
            } else if (
              requestData[i].BreakTime != null &&
              requestData[i].EstEndTime != null &&
              requestData[i].ActEndTime == null
            ) {
              requestData[i].status = "Break";
              // this.setState({ loggedUserBreak: 1 })
            } else {
              requestData[i].status = "Online";
            }
          }
          this.setState({ ProposalData: res.Data[0] });
          this.hideLoador();
        }
      } else {
        this.hideLoador();
        // this.setState({loggedUser:0})
        cogoToast.error("Something went wrong. Please try again...");
      }
    });
  };

  checkUserBreakToday = () => {
    debugger;

    this.showLoador();
    var pData = {
      UserID: CommonConfig.loggedInUserData().PersonID,
      userTimeZonedata:
        this.state.userTimeZone.value == undefined
          ? CommonConfig.loggedInUserData().userTimeZone
          : this.state.userTimeZone.value,
    };
    api.post("contactus/CheckUserLoginBreak", pData).then((res) => {
      console.log("Res = ", res);
      if (res.success) {
        debugger;

        if (res.Data[0][0].BreakCount > 0) {
          this.setState({ loggedUserBreak: 1 });
          this.setState({ loggedUser: 1 });
        } else {
          this.setState({ loggedUserBreak: 0 });
          this.setState({ loggedUser: 0 });
          this.checkUserLoginToday();
        }

        this.hideLoador();
      } else {
        this.hideLoador();
        this.setState({ loggedUserBreak: 0 });
        cogoToast.error("Something went wrong. Please try again...");
      }
    });
  };

  checkUserLoginToday = () => {
    this.showLoador();
    var pData = {
      UserID: CommonConfig.loggedInUserData().PersonID,
      userTimeZonedata: this.state.userTimeZone.value,
    };
    api.post("contactus/CheckUserLogin", pData).then((res) => {
      console.log("Res = ", res);
      if (res.success) {
        if (
          res.Data[0][0].LoginCount > 0 &&
          res.Data[0][0].LogoutTime == null
        ) {
          this.setState({ loggedUser: 1 });
        } else {
          this.setState({ loggedUser: 0 });
        }

        this.hideLoador();
      } else {
        this.hideLoador();
        this.setState({ loggedUser: 0 });
        cogoToast.error("Something went wrong. Please try again...");
      }
    });
  };

  handleLogin = () => {
    console.log(
      "UserID: CommonConfig.loggedInUserData().PersonID = ",
      CommonConfig.loggedInUserData().PersonID
    );

    this.showLoador();
    var pData = {
      UserID: CommonConfig.loggedInUserData().PersonID,
      userTimeZonedata: this.state.userTimeZone.value,
    };
    api.post("contactus/UserLogin", pData).then((res) => {
      console.log("Res = ", res);
      if (res.success) {
        this.setState({ loggedUser: 1 });
        cogoToast.success("Login Successfully");
        this.getTmsUserName(this.state.userTimeZone.value);

        this.hideLoador();
      } else {
        this.hideLoador();
        this.setState({ loggedUser: 0 });
        cogoToast.error("Something went wrong. Please try again...");
      }
    });
  };

  handleBreakResume = () => {
    this.showLoador();
    var pData = {
      UserID: CommonConfig.loggedInUserData().PersonID,
      userTimeZonedata: this.state.userTimeZone.value,
    };
    api.post("contactus/UserBreakResume", pData).then((res) => {
      console.log("Res = ", res);
      if (res.success) {
        this.hideLoador();
        this.setState({ loggedUserBreak: 0 });
        this.setState({ loggedUser: 1 });
        cogoToast.success("Break Updated Successfully");
        this.getTmsUserName(this.state.userTimeZone.value);
      } else {
        this.hideLoador();
        this.setState({ loggedUserBreak: 1 });
        this.setState({ loggedUser: 0 });
        cogoToast.error("Something went wrong. Please try again...");
      }
    });
  };

  handleCheckboxChange = (e, record, type) => {
    debugger;
    var breakType = type;
    // this.setState({breakDur: "10"})
    this.setState({
      breakDur: type,
    });
    localStorage.setItem("breakType", breakType);
    console.log("breakType", breakType);
    let checkedArr = this.state.requestStatus;
    // this.setState({breakDur: localStorage.getItem("breakType")})

    // localStorage.removeItem("breakType");

    checkedArr.map((OBJ) => {
      OBJ.IsSelected = false;
      return OBJ;
    });
    checkedArr[record.Index]["IsSelected"] = e.target.checked;

    this.setState({
      requestStatus: checkedArr,
    });
    this.setState({
      breakDur: type,
    });
    console.log("breakDur = ", this.state.breakDur);
  };

  handleBreak = () => {
    this.showLoador();
    var pData = {
      UserID: CommonConfig.loggedInUserData().PersonID,
      BreakDur: localStorage.getItem("breakType"),
      userTimeZonedata: CommonConfig.loggedInUserData().userTimeZone,
    };
    api.post("contactus/UserBreak", pData).then((res) => {
      console.log("Res = ", res);
      if (res.success) {
        this.hideLoador();
        this.setState({ loggedUserBreak: 1 });
        cogoToast.success("Break Added Successfully");
        localStorage.clear();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        this.getTmsUserName(this.state.userTimeZone.value);
      } else {
        this.hideLoador();
        this.setState({ loggedUserBreak: 0 });
        cogoToast.error("Something went wrong. Please try again...");
      }
    });
  };

  RequestTimeOFF = () =>{

    this.showLoador();
    var pData = {
      ManagedBy:this.state.ManagedBy.value,
      FromDate: moment(this.state.FromDate)
      .format(CommonConfig.dateFormat.dbDateOnly)
      .toString(),
      ToDate : moment(this.state.ToDate)
      .format(CommonConfig.dateFormat.dbDateOnly)
      .toString(),
      TimeTypeValue: this.state.TimeTypeValue.value,
      Reason: this.state.ReasonsValue.value,
      ApplyName: CommonConfig.loggedInUserData().Name,
      ApplyEmail: CommonConfig.loggedInUserData().Email,
      ApplyDate: moment()
      .format(CommonConfig.dateFormat.dbDateOnly)
      .toString(),
    };

    // var differencetimeset = "";
    const todates = new Date(this.state.ToDate);
    const fromdates = new Date(this.state.FromDate);
    var Difference_In_Time = todates.getTime() - fromdates.getTime();

    
    var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
    Difference_In_Days = Difference_In_Days + 1
    console.log("Difference_In_Days = ",Difference_In_Days);

    console.log(pData)
    debugger

    if(Difference_In_Days == 1){

      api.post("contactus/UserRequestTimeOFF", pData).then((res) => {
        console.log("Res = ", res);
        if (res.success) {
          this.hideLoador();
          console.log("res.Data[0] = ",res)
          console.log("res.Data[0] = ",res.Data.alreadyLeave);
          this.setState({ Leaveopen: false });
          if(res.Data.alreadyLeave == 1){
            cogoToast.error(res.Data.message);
          }else{
            cogoToast.success("Request TimeOff added successfully");
          }
          
          this.getTmsUserName(this.state.userTimeZone.value);
        } else {
          this.hideLoador();
          cogoToast.error("Something went wrong. Please try again...");
        }
      });

    }else{

      var arrayPushdata = []
      var j = 0;
      for(var i = 0; i<Difference_In_Days;i++){
        var testapi = ""

        // console.log("pData = ",i,pData)
          var date = new Date(this.state.FromDate);
          date.setDate(date.getDate() + i);

          date =  moment(date).format(CommonConfig.dateFormat.dbDateOnly).toString()
         
          var pDataTest = {
            ManagedBy:this.state.ManagedBy.value,
            FromDate: date,
            ToDate : date,
            TimeTypeValue: this.state.TimeTypeValue.value,
            Reason: this.state.ReasonsValue.value,
            ApplyName: CommonConfig.loggedInUserData().Name,
            ApplyEmail: CommonConfig.loggedInUserData().Email,
            ApplyDate: moment()
            .format(CommonConfig.dateFormat.dbDateOnly)
            .toString(),
          };

          arrayPushdata[j] = pDataTest;
          j++;

          
      }
      
      console.log("arrayPushdata = ",arrayPushdata)
      this.UserRequestTimeOFFdata(arrayPushdata)
      
    }

    

  }

  UserRequestTimeOFFdata = (pData) =>{
    console.log("pData = ",pData)

    for(var i = 0; i< pData.length;i++){

      console.log("Welcome data = ",pData[i]);

      api.post("contactus/UserRequestTimeOFF", pData[i]).then((res) => {
        console.log("Res = ", res);
        if (res.success) {
          // if(i == Difference_In_Days){
            this.hideLoador();
            this.setState({ Leaveopen: false });
            cogoToast.success("Request TimeOff added successfully");
            this.getTmsUserName(this.state.userTimeZone.value);
          // }
        
        } else {
          // if(i == Difference_In_Days){
            this.hideLoador();
            cogoToast.error("Something went wrong. Please try again...");
          // }
        
        }
      });

    }

    

  }

  dateChange = (date, type) => {
   
    this.setState({
      [type]: date,
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleLeave = () => {
    this.setState({ Leaveopen: true });
  };

  CloseTimeOff = () =>{
    this.setState({ Leaveopen: false });
  }

  handleClickCancel = () => {
    this.setState({ close: true, open: false });
  };

  setUserTimeZone = (e) => {
    this.setState({ userTimeZone: e });

    var dates = moment()
      .tz("America/Chicago")
      .format("DD-MM-YYYY");

    console.log("Datest = ", e);
    if (e.value == "IST") {
      var dates = moment()
        .tz("Asia/Kolkata")
        .format("DD-MM-YYYY");
      this.setState({ curDate: dates });
    }

    if (e.value == "CST") {
      var dates = moment()
        .tz("America/Chicago")
        .format("DD-MM-YYYY");
      this.setState({ curDate: dates });
    }

    if (e.value == "EST") {
      var dates = moment()
        .tz("America/Cancun")
        .format("DD-MM-YYYY");
      this.setState({ curDate: dates });
    }

    if (e.value == "PST") {
      var dates = moment()
        .tz("America/Ensenada")
        .format("DD-MM-YYYY");
      this.setState({ curDate: dates });
    }

    if (e.value == "GMT") {
      var dates = moment()
        .tz("Africa/Abidjan")
        .format("DD-MM-YYYY");
      this.setState({ curDate: dates });
    }

    this.getTmsUserName(e.value);
  };

  handleLogout = () => {
    console.log(
      "UserID: CommonConfig.loggedInUserData().PersonID = ",
      CommonConfig.loggedInUserData().PersonID
    );

    this.showLoador();
    var pData = {
      UserID: CommonConfig.loggedInUserData().PersonID,
      userTimeZonedata: this.state.userTimeZone.value,
    };
    api.post("contactus/UserLogout", pData).then((res) => {
      console.log("Res = ", res);
      if (res.success) {
        this.hideLoador();
        this.setState({ loggedUser: 0 });
        cogoToast.success("Logout Successfully");
        this.getTmsUserName(this.state.userTimeZone.value);
        this.setState({ open: false });
      } else {
        this.hideLoador();
        this.setState({ loggedUser: 1 });
        cogoToast.error("Something went wrong. Please try again...");
      }
    });
  };

  handleLogincheck = () => {
    this.showLoador();
    var pData = {
      UserID: CommonConfig.loggedInUserData().PersonID,
      userTimeZonedata: this.state.userTimeZone.value,
    };
    api.post("contactus/CheckUserLogin", pData).then((res) => {
      console.log("Res = ", res);
      if (res.success) {
        if (
          res.Data[0][0].LoginCount > 0 &&
          res.Data[0][0].LogoutTime != null
        ) {
          this.setState({ loggedUser: 0 });
          cogoToast.error("Sorry you have exceed your daily limit");
        } else {
          // this.setState({loggedUser:0})
          this.handleLogin();
        }

        this.hideLoador();
      } else {
        this.hideLoador();
        this.setState({ loggedUser: 0 });
        cogoToast.error("Something went wrong. Please try again...");
      }
    });
  };

  render() {
    const TimeType = this.state.Timetype.map((x) => {
      return { value: x.value, label: x.label };
    });
    const managedBy = this.state.managedByList.map((type) => {
      return { value: type.PersonId, label: type.LoginID };
    });

    const Reasons = this.state.Reason.map((x) => {
      return { value: x.value, label: x.label };
    });

    const KeywordListData = [
      {
        Header: "UserID",
        accessor: "LoginID",
        width: 100,
      },

      {
        Header: "Ip Address",
        accessor: "IpAddress",
        width: 100,
      },

      {
        Header: "Address",
        accessor: "IPDetails",
        width: 160,
      },

      {
        Header: "Login Time",
        accessor: "LoginTime",
        width: 100,
      },

      {
        Header: "Break Time",
        accessor: "BreakTime",
        width: 100,
      },

      {
        Header: "Est End Time",
        accessor: "EstEndTime",
        width: 100,
      },

      {
        Header: "Logout Time",
        accessor: "LogoutTime",
        width: 100,
      },
      {
        Header: "Status",
        // accessor: "status",
        sortable: false,
        width: 150,
        maxWidth: 150,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              {record.original.status == "Online" ? (
                <label className="Text-icon-align">
                  <span className="chip Online">{record.original.status} </span>
                </label>
              ) : record.original.status == "Logout" ? (
                <label className="Text-icon-align">
                  <span className="chip Logout">{record.original.status} </span>
                </label>
              ) : record.original.status == "Break" ? (
                <label className="Text-icon-align">
                  <span className="chip Break">{record.original.status} </span>
                </label>
              ) : (
                <label className="Text-icon-align">
                  <span className="chip Offline">
                    {record.original.status}{" "}
                  </span>
                </label>
              )}
            </div>
          );
        },
        filterable: false,
      },
    ];

    const { ProposalData, ManagedBy, viewAllClear,ToDate,FromDate,TimeTypeValue,ReasonsValue } = this.state;

    const userTimeZone = this.state.UserTimeZoneList.map((type) => {
      return { value: type.value, label: type.label };
    });

    return (
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
                  <HeadsetMic />
                </CardIcon>
                  
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                        
                        <h4 className="margin-right-auto text-color-black">
                          Time Booking ({this.state.curDate})
                        </h4>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>

                      <Autocomplete
                        id="combo-box-demo"
                        options={userTimeZone}
                        value={this.state.userTimeZone}
                        onChange={(event, value) => this.setUserTimeZone(value)}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                          <TextField {...params} label="Time Zone" />
                        )}
                      />
                    </GridItem>
                  </GridContainer>

                  <div className="buttonW">
                    <Button color="primary" onClick={() => this.handleLeave()}>
                      Request Time Off
                    </Button>
                  </div>
                  {this.state.loggedUser === 0 &&
                  CommonConfig.getUserAccess("Time Booking").WriteAccess == 1 ? (
                    <div className="buttonW">
                      <Button
                        color="primary"
                        onClick={() => this.handleLogincheck()}
                      >
                        Login
                      </Button>
                    </div>
                  ) : this.state.loggedUserBreak === 1 &&
                    CommonConfig.getUserAccess("Time Booking").WriteAccess == 1 ? (
                    <div className="buttonW">
                      <Button
                        color="danger"
                        onClick={() => this.handleBreakResume()}
                      >
                        Resume
                      </Button>
                    </div>
                  ) : CommonConfig.getUserAccess("Time Booking").WriteAccess ==
                    1 ? (
                    <div className="d-flex">
                      <div className="filter-wrap">
                        <div
                          className="filter-top-right"
                          onMouseLeave={() =>
                            this.setState({ IsDropDownShow: false })
                          }
                          onMouseOver={() =>
                            this.setState({ IsDropDownShow: true })
                          }
                        >
                          <Button className="cm-toggle" color="rose">
                            Break Slab <ExpandMoreIcon />
                          </Button>
                          {this.state.IsDropDownShow === true ? (
                            <div className="cm-dropdown">
                              <div className="overflow-handle">
                                {this.state.requestStatus.map((step, key) => {
                                  return (
                                    <li>
                                      <label>
                                        <input
                                          type="radio"
                                          checked={step.IsSelected}
                                          onChange={(e) =>
                                            this.handleCheckboxChange(
                                              e,
                                              step,
                                              step.value
                                            )
                                          }
                                        />{" "}
                                        {step.label}
                                      </label>
                                    </li>
                                  );
                                })}
                              </div>
                              <div className="cms-wrap">
                                <Button
                                  className="cm-search-btn"
                                  color="rose"
                                  onClick={() => this.handleBreak()}
                                >
                                  Add Break
                                </Button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="buttonW">
                        <Button
                          color="danger"
                          onClick={() => this.handleClickOpen()}
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  ) : null}
            </CardHeader>
            <CardBody>
              <div className="shipment-pane" id="keywordnotfound">
                <ReactTable
                  data={ProposalData}
                  minRows={0}
                  filterable
                  textAlign={"left"}
                  defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                  resizable={false}
                  columns={KeywordListData}
                  defaultPageSize={10}
                  showPaginationBottom={true}
                  className="-striped -highlight chatMgtList1"
                />
              </div>

              <div>
                <Dialog
                  open={this.state.open}
                  onClose={this.state.close}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Confirm Logout"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure want to logout?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClickCancel} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={this.handleLogout}
                      color="primary"
                      autoFocus
                    >
                      Logout
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>

              <div>
                <Dialog
                  open={this.state.showReviewDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth={true}
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Site Name"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.SiteName
                                ? this.state.SiteName
                                : this.state.SiteNameEdit,
                              onChange: (event) =>
                                this.handleChangeFrom(event, "SiteName"),
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => this.CloseDialog()}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => this.addReferredSite()}
                      color="primary"
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={this.state.Leaveopen}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth={true}
                  className="Leave-Modal"
                >
                  <DialogContent>
                    {/* <DialogContentText id="alert-dialog-description"> */}
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <Autocomplete
                            id="combo-box-demo"
                            options={managedBy}
                            value={ManagedBy}
                            disabled={viewAllClear === false ? false : true}
                            onChange={(event, value) =>
                              this.selectChange(event, value, "ManagedBy")
                            }
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                              <TextField {...params} label="Managed By" />
                            )}
                          />
                        </GridItem>

                        <GridItem xs={12} sm={12} md={12}>
                          <div className="date-spl">
                            <InputLabel className={classes.label}>
                              Start Date
                            </InputLabel>
                            <FormControl fullWidth>
                              <Datetime
                                dateFormat={"MM/DD/YYYY"}
                                timeFormat={false}
                                value={FromDate}
                                disabled={true}
                                onChange={(date) => this.dateChange(date, "FromDate")}
                                closeOnSelect={true}
                                renderInput={(params) => (
                                  <TextField {...params} fullWidth />
                                )}
                              />
                            </FormControl>
                          </div>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={12}>
                          <div className="date-spl">
                            <InputLabel className={classes.label}>
                              End Date
                            </InputLabel>
                            <FormControl fullWidth>
                              <Datetime
                                dateFormat={"MM/DD/YYYY"}
                                timeFormat={false}
                                value={ToDate}
                                // disabled={this.state.pickupDisable}
                                // displayTimezone="utc"
                                closeOnSelect={true}
                                onChange={(date) => this.dateChange(date, "ToDate")}
                                // closeOnSelect={true}
                                renderInput={(params) => (
                                  <TextField 
                                  // disabled={this.state.pickupDisable}
                                  {...params} fullWidth />
                                )}
                              />
                            </FormControl>
                          </div>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={12}>
                          <div className="spl">
                            <FormControl fullWidth>
                              <Autocomplete
                                id="combo-box-demo"
                                options={TimeType}
                                value={TimeTypeValue}
                                 
                                onChange={(event, value) =>
                                    this.selectChange(event, value, "TimeTypeValue")
                                }
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                  <TextField {...params} label="Time" />
                                )}
                              />
                            </FormControl>
                          </div>
                        </GridItem>

                        <GridItem xs={12} sm={12} md={12}>
                          <div className="spl">
                            <FormControl fullWidth>
                              <Autocomplete
                                id="combo-box-demo"
                                options={Reasons}
                                value={ReasonsValue}
                                onChange={(event, value) =>
                                    this.selectChange(event, value, "ReasonsValue")
                                }
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                  <TextField {...params} label="Reason" />
                                )}
                              />
                            </FormControl>
                          </div>
                        </GridItem>
                      </GridContainer>
                    {/* </DialogContentText> */}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => this.CloseTimeOff()}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => this.RequestTimeOFF()}
                      color="primary"
                    >
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default TimeManagement;
