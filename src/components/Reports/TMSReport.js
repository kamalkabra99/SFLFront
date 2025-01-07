// org
import React, { Component } from "react";
import * as XLSX from "xlsx";
import GridItem from "../Grid/GridItem.js";
import CustomInput from "../CustomInput/CustomInput.js";
import GridContainer from "../Grid/GridContainer.js";
import ReactTable from "react-table";
import CardBody from "../Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import HeadsetMic from "@material-ui/icons/HeadsetMic";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import { CommonConfig } from "../../utils/constant.js";
import moment from "moment";
import api from "../../utils/apiClient";
import Button from "../CustomButtons/Button.js";
import cogoToast from "cogo-toast";
import SimpleBackdrop from "../../utils/general";
import CardIcon from "../Card/CardIcon.js";
import ArchiveIcon from "@material-ui/icons/Archive";
import GateRatesIcon from "@material-ui/icons/AttachMoney";
import { makeStyles } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { DownloadTableExcel } from "react-export-table-to-excel";
import zipcelx from "zipcelx";
import {
  Checkbox,
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import { size } from "lodash";
const useStyles = () => makeStyles(styles);
const classes = useStyles();

var fileNameSet = "";

setInterval(() => {
  var currdate = new Date();
  fileNameSet =
    "LR-" +
    currdate.getFullYear() +
    (currdate.getMonth() + 1) +
    currdate.getDate() +
    "-" +
    currdate.getHours() +
    currdate.getMinutes() +
    currdate.getSeconds();
  // console.log("FileName = ",fileNameSet)
}, 1000);

class TMSReport extends Component {
  constructor(props) {
    super(props);

    this.tableRef = React.createRef(null);
    this.state = {
      file: "",
      fileSetName: "",
      ExcelJSONData: [],
      KeywordListAllData: [],
      Loading: false,
      ProposalData: [],
      TimeoffProposalData:[],
      setweekendsCount: 0,
      setTimeOff: 0,
      setLeaveCount:0,
      isCommitted: false,
      committedLength: 0,
      notCommitedLength: 0,
      notCommitedList: [],
      fileName: "",
      deleteType: "",
      deleteID: "",
      updateID: "",
      updateType: "",
      statusopen:false,
      updatestatusID:"",
      UserLeaveName:"",
      UserLeaveEmail:"",
      AppliedLeaveDate:"",
      FromDate: new Date(),
      ToDate: new Date(),
      ManagedBy: "",
      setWeekandTimeoff: 0,
      isPreviewClicked: false,
      SetShiprecord:false,
      ManagedBy: "",
      managedByList: [],
      IpAddress: "",
      totalRowCount: "",
      TimeTypeValue:"",
      LoginType: "",
      open: false,
      updateopen: false,
      LeaveRejectReasons:"",
      logintype: [
        { value: "Login", label: "Login" },
        { value: "Break", label: "Break" },
        { value: "Leave", label: "Leave" },
      ],
      Timetype: [
        { value: "Approved", label: "Approved" },
        { value: "Reject", label: "Reject" },
      ],
      logintypevalue: [],
      LoginTypeValue: "",
      UserNameValue: "",
      TmsDeleteAccess: "",
      TmsWriteAccess: "",
      TmsAllAccess:"",
      updateLogin: "",
      updateLogout: "",
      updateFullLogout: "",
      updateFullLogin: "",
      TmsTimeOffcount:0,
      timeoffStyle: "hide",
      totalLeave:0
      // timeoffStyle:"table-pane.active"

    };
  }

  componentDidMount() {
    // this.getUserTMSReport()
    this.state.TmsDeleteAccess = CommonConfig.getUserAccess(
      "Time Booking Report"
    ).DeleteAccess;
    this.state.TmsWriteAccess = CommonConfig.getUserAccess(
      "Time Booking Report"
    ).WriteAccess;
    this.state.TmsAllAccess = CommonConfig.getUserAccess(
      "Time Booking Report"
    ).AllAccess;
    this.getManagedBy();
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

  dateChange = (date, type) => {
    this.setState({
      [type]: date,
    });
  };


  getTimeOffDatawithoutSetArray(){

    var managedByValue = 0;
    if (CommonConfig.getUserAccess("Time Booking Report").AllAccess === 1) {
      managedByValue = this.state.ManagedBy?this.state.ManagedBy.value:0;
    } else {
      managedByValue = CommonConfig.loggedInUserData().PersonID;
    }

    let condition = ""
    let fromDate = moment(this.state.FromDate)
    .format(CommonConfig.dateFormat.dbDateOnly)
    .toString()

    let toDate = moment(this.state.ToDate)
    .format(CommonConfig.dateFormat.dbDateOnly)
    .toString()

    if(managedByValue == 0){

      condition = '(tml.`LeaveFromDate` BETWEEN "'+fromDate+'" AND "'+toDate+'")'

    }else{

      condition = 'tml.UserID = '+managedByValue+' AND (tml.`LeaveFromDate` BETWEEN "'+fromDate+'" AND "'+toDate+'")'

    }

    var pData = {
      fromDate: moment(this.state.FromDate)
        .format(CommonConfig.dateFormat.dbDateOnly)
        .toString(),

      toDate: moment(this.state.ToDate)
        .format(CommonConfig.dateFormat.dbDateOnly)
        .toString(),
      puserdata: condition,
      
    };
    api.post("contactus/getTmsUserTimeOff", pData).then((res) => {
      if (res.success) {

        console.log("Data = ",res);
        let requestData = res.Data[0];
        
        
        if(requestData.length > 0){
          // this.state.timeoffStyle = "table-pane.active"
          this.setState({TimeoffProposalData : res.Data[0]})
          // this.setState({totalLeave : requestData.length})
        }
       

        

        } else {
          this.hideLoador();
          // this.setState({loggedUser:0})
          cogoToast.error("Something went wrong. Please try again...");
        }
      });

  }

  getTimeOffData(setArrprev){

    var managedByValue = 0;
    if (CommonConfig.getUserAccess("Time Booking Report").AllAccess === 1) {
      managedByValue = this.state.ManagedBy?this.state.ManagedBy.value:0;
    } else {
      managedByValue = CommonConfig.loggedInUserData().PersonID;
    }

    let condition = ""
    let fromDate = moment(this.state.FromDate)
    .format(CommonConfig.dateFormat.dbDateOnly)
    .toString()

    let toDate = moment(this.state.ToDate)
    .format(CommonConfig.dateFormat.dbDateOnly)
    .toString()

    if(managedByValue == 0){

      condition = '(tml.`LeaveFromDate` BETWEEN "'+fromDate+'" AND "'+toDate+'")'

    }else{

      condition = 'tml.UserID = '+managedByValue+' AND (tml.`LeaveFromDate` BETWEEN "'+fromDate+'" AND "'+toDate+'")'

    }

    var pData = {
      fromDate: moment(this.state.FromDate)
        .format(CommonConfig.dateFormat.dbDateOnly)
        .toString(),

      toDate: moment(this.state.ToDate)
        .format(CommonConfig.dateFormat.dbDateOnly)
        .toString(),
      puserdata: condition,
      
    };
    api.post("contactus/getTmsUserTimeOff", pData).then((res) => {
      if (res.success) {

        console.log("Data = ",res);
        let requestData = res.Data[0];
        
        
        if(requestData.length > 0){
          // this.state.timeoffStyle = "table-pane.active"
          for (let index = 0; index < requestData.length; index++) {
            for (let dayindex = 0; dayindex < setArrprev.length; dayindex++) {
              if (requestData[index].LeaveFromDate == setArrprev[dayindex].Date) {
                requestData[index].Day = setArrprev[dayindex].Day;
              }
            }

          }
          console.log("requestData = ",setArrprev)
          console.log("requestData = ",requestData)
          

          // console.log("requestData = ", setArr);
              this.setState({ fileSetName: fileNameSet });
              this.setState({ ProposalData: requestData });

          // this.setState({ timeoffStyle: "table-pane.active" });
          // this.setState({TimeoffProposalData : res.Data[0]})
          // this.setState({totalLeave : requestData.length})
        }
       

        

        } else {
          this.hideLoador();
          // this.setState({loggedUser:0})
          cogoToast.error("Something went wrong. Please try again...");
        }
      });

  }

  getUserTMSReport() {
    this.state.ProposalData = [];
    this.setState({ ProposalData: [] });
    var setArr = [];

    debugger;

    var managedByValue = 0;
    if (CommonConfig.getUserAccess("Time Booking Report").AllAccess === 1) {
      managedByValue = this.state.ManagedBy.value;
    } else {
      managedByValue = CommonConfig.loggedInUserData().PersonID;
    }

    if ((managedByValue == 0 || managedByValue == undefined) && this.state.LoginTypeValue.label != "Leave") {
      cogoToast.error("Please Select Managed By");
    } else if (this.state.LoginTypeValue == "") {
      cogoToast.error("Please Select Data Type");
    } else {
      var pData = {
        fromDate: moment(this.state.FromDate)
          .format(CommonConfig.dateFormat.dbDateOnly)
          .toString(),

        toDate: moment(this.state.ToDate)
          .format(CommonConfig.dateFormat.dbDateOnly)
          .toString(),
        puserdata: managedByValue,
        logintypes: this.state.LoginTypeValue.label,
      };
      this.getTimeOffDatawithoutSetArray()

      var daysArr = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      var d1 = new Date(this.state.FromDate);
      var d2 = new Date(this.state.ToDate);

      var diff = d2.getTime() - d1.getTime();

      var daydiff = diff / (1000 * 60 * 60 * 24);

      console.log(daydiff);

      for (let index = 0; index <= daydiff; index++) {
        // const element = array[index];

        // console.log("I = ",index);

        const ds = new Date(this.state.FromDate);
        ds.setDate(ds.getDate() + index);

        // console.log("ds = ",ds);

        const d = new Date(ds);
        let day = d.getDay();

        var weekends = "";
        if (daysArr[day] == "Sunday" || daysArr[day] == "Saturday") {
          weekends = "Weekends";
        }

        // console.log("day = ", day);

        // console.log("DayName = " , daysArr[day] )

        if(this.state.LoginTypeValue.label == "Leave"){

          setArr.push({
            Date: moment(d).format(CommonConfig.dateFormat.dateOnly),
            Day: daysArr[day],
            Reason:"",
            LeaveType:""
            
          });

        }else{

          setArr.push({
            Date: moment(d).format(CommonConfig.dateFormat.dateOnly),
            Day: daysArr[day],
            IPDetails: weekends,
            IpAddress: "",
            LoginDate: moment(d).format(CommonConfig.dateFormat.dateOnly),
            LoginID: "",
            LoginLogOff: "",
            LoginTime: "",
            LogoutTime: "",
            UserID: "",
            totalBreak: "",
            totalWorking: "",
          });

        }
        
      }


      if(this.state.LoginTypeValue.label == "Leave"){

        this.getTimeOffData(setArr)

      }else{

        api.post("contactus/getTmsUserReport", pData).then((res) => {
          if (res.success) {
            // this.setState({ ProposalData: requestData });
            // console.log("res14 = ", res);
            let requestData = res.Data[0];
            if (requestData.length > 0) {
              // console.log("setArr = " , setArr);
  
              for (let index = 0; index < requestData.length; index++) {
                if (this.state.LoginTypeValue.label == "Login") {
                  var startTime = moment(
                    requestData[index].totalBreak,
                    "HH:mm:ss"
                  );
                  var endTime = moment(
                    requestData[index].LoginLogOff,
                    "HH:mm:ss"
                  );
  
                  // calculate total duration
                  var duration = moment.duration(endTime.diff(startTime));
                  debugger;
                  // duration in hours
                  var hours = parseInt(duration.asHours());
                  // duration in minutes
                  var minutes = parseInt(duration.asMinutes()) % 60;
                  var seconds = parseInt(duration.asSeconds() * 0.001);
                  // console.log("SECS = ",seconds);
                  // console.log(requestData[index]);
                  // console.log("Hours = ", hours, ":", minutes);
                  var totalTome = "";
                  if (requestData[index].LoginLogOff == null) {
                    totalTome = "NA";
                  } else {
                    totalTome = hours + ":" + minutes + ":" + seconds + " hours";
                  }
                  requestData[index].totalWorking = totalTome;
  
                  for (let dayindex = 0; dayindex < setArr.length; dayindex++) {
                    if (requestData[index].LoginDate == setArr[dayindex].Date) {
                      // requestData[index].DayName = setArr[dayindex].Day;
                      setArr[dayindex].tmsID = requestData[index].tmsID;
                      setArr[dayindex].IPDetails = requestData[index].IPDetails;
                      setArr[dayindex].IpAddress = requestData[index].IpAddress;
  
                      setArr[dayindex].LoginID = requestData[index].LoginID;
                      setArr[dayindex].LoginLogOff =
                        requestData[index].LoginLogOff;
                      setArr[dayindex].LoginTime = requestData[index].LoginTime;
                      setArr[dayindex].LogoutTime = requestData[index].LogoutTime;
                      setArr[dayindex].UserID = requestData[index].UserID;
                      setArr[dayindex].totalBreak = requestData[index].totalBreak;
                      setArr[dayindex].totalWorking =
                        requestData[index].totalWorking;
                      setArr[dayindex].userTimeZone =
                        requestData[index].userTimeZone;
  
                      break;
                    }
                  }
  
                  var weekendsCount = 0;
                  var TimeOffCount = 0;
                  var LeaveCount = 0
                  for (let indesSet = 0; indesSet < setArr.length; indesSet++) {
                    // const element = array[indesSet];
                    if (setArr[indesSet].IPDetails == "Weekends") {
                      weekendsCount = weekendsCount + 1;
                    }
  
                    if (setArr[indesSet].IPDetails == "") {
                      // TimeOffCount = TimeOffCount + 1
                      setArr[indesSet].IPDetails = "TimeOff";
                    }
                  }
  
                  for (
                    let indesSetTime = 0;
                    indesSetTime < setArr.length;
                    indesSetTime++
                  ) {
                    // const element = array[indesSetTime];
  
                    if (setArr[indesSetTime].IPDetails == "TimeOff") {
                      TimeOffCount = TimeOffCount + 1;
                      // setArr[indesSetTime].IPDetails = "TimeOff"
                      console.log("TimeOffCount = ", TimeOffCount);
                    }
                    if(setArr[indesSetTime].IPDetails == "Leave"){

                      LeaveCount = LeaveCount + 1;
                      // setArr[indesSetTime].IPDetails = "TimeOff"
                      console.log("TimeOffCount = ", LeaveCount);

                    }
                  }
                  if(this.state.TimeoffProposalData.length > 0){
                    for (let indextimeoff = 0; indextimeoff < this.state.TimeoffProposalData.length; indextimeoff++) {
                      for (let indexSetArr2 = 0; indexSetArr2 < setArr.length; indexSetArr2++) {
                        // const element = array[indexSetArr2];
  
                        if ((this.state.TimeoffProposalData[indextimeoff].LeaveFromDate == setArr[indexSetArr2].Date) && setArr[indexSetArr2].IPDetails == "TimeOff") {
  
                          setArr[indexSetArr2].IPDetails = "Leave"
  
  
  
  
                        }
                        
                      }
                      // const element = array[indextimeoff];
  
                     
                      
                    }
  
                  }
                  
  
                  this.setState({ setTimeOff: TimeOffCount });
                  this.setState({ setLeaveCount: LeaveCount });
                  
                  console.log("TimeOff = ", TimeOffCount);
                  this.setState({ setweekendsCount: weekendsCount });
                } else {
                  for (let dayindex = 0; dayindex < setArr.length; dayindex++) {
                    if (requestData[index].LoginDate == setArr[dayindex].Date) {
                      requestData[index].Day = setArr[dayindex].Day;
                    }
                  }
                  requestData[index].totalBreak = "N/A";
                }
  
                // alert(hours + ' hour and ' + minutes + ' minutes.');
              }
              if (this.state.LoginTypeValue.label == "Break") {
                setArr = requestData;
                this.setState({ setWeekandTimeoff: 0 });
              } else {
                this.setState({ setWeekandTimeoff: 1 });
              }
              console.log("requestData = ", setArr);
              this.setState({ fileSetName: fileNameSet });
              this.setState({ ProposalData: setArr });
            }
            
          } else {
            this.hideLoador();
            // this.setState({loggedUser:0})
            cogoToast.error("Something went wrong. Please try again...");
          }
        });

      }


      
    }
  }

  LoginTypeOption = () => {
    return this.state.logintypevalue.map((content) => {
      return (
        <MenuItem classes={{ root: classes.selectMenuItem }} value={content.id}>
          {" "}
          {content.label}{" "}
        </MenuItem>
      );
    });
  };

  selectChange = (event, value, type) => {
    if (value != null) {
      if (type === "TimeTypeValue") {
        this.setState({ TimeTypeValue: value });
        console.log(this.state.TimeTypeValue);
        this.state.TimeTypeValue = value
        console.log(this.state.TimeTypeValue);
        // this.getUserTMSReport()
    }
      if (type === "ManagedBy") {
        this.setState({ ManagedBy: value });
        console.log(this.state.ManagedBy);
        this.state.ManagedBy = value;
        console.log(this.state.ManagedBy);
        // this.getUserTMSReport()
      }

      if (type === "logintypevalue") {
        this.setState({ LoginTypeValue: value });
        console.log(this.state.LoginTypeValue);
        this.state.LoginTypeValue = value;
        console.log(this.state.LoginTypeValue);
        // this.getUserTMSReport()
      }
    }
  };

  handleEdit = (record, type) => {
    console.log("record = ", record);

    console.log(record.original.tmsID);
    // if(type == "Login"){

    this.setState({
      updateopen: true,
      updateID: record.original.tmsID,
      updateType: type,
      updateLogin: record.original.LoginTime,
      updateLogout: record.original.LogoutTime,
    });

    // }
  };

  UpdateLeaveStatusReport = (record, type) =>{

    this.setState({
      statusopen: true,
      updatestatusID: record.original.LeaveId,
      UserLeaveEmail: record.original.Email,
      UserLeaveName:record.original.Name,
      AppliedLeaveDate:record.original.LeaveFromDate,
      deleteType: type,
    });

  }


  deleteLoginReport = (record, type) => {
    console.log(record.original.tmsID);

    

    if(type == "Leave"){
      var newfromDate = new Date()

      var compdate =   moment(newfromDate)
      .format(CommonConfig.dateFormat.dateOnly)
      .toString()
      if(record.original.LeaveFromDate > compdate){
        this.setState({
          open: true,
          deleteID: record.original.LeaveId,
          deleteType: type,
        });

      }else{
        if(this.state.TmsAllAccess == "1"){
            this.setState({
              open: true,
              deleteID: record.original.LeaveId,
              deleteType: type,
            });

        }else{
          cogoToast.error("You don't have permission to delete the current date leave")
        }
        
      }

      

    }else{

      var newfromDate = new Date()

      var compdate =   moment(newfromDate)
      .format(CommonConfig.dateFormat.dateOnly)
      .toString()

      if(record.original.LoginDate > compdate){
        this.setState({
          open: true,
          deleteID: record.original.tmsID,
          deleteType: type,
        });

      }else{
        if(this.state.TmsAllAccess == "1"){
          this.setState({
            open: true,
            deleteID: record.original.tmsID,
            deleteType: type,
          });

        }else{
          cogoToast.error("You don't have permission to delete the current date record")
        }
      }
    }

    
  };

  handleClickCancel = () => {
    this.setState({
      open: false,
    });
  };
  handleClickCancelUpdate = () => {
    this.setState({
      statusopen: false,
    });
  };

  handleUpdateLeaveStatus = () =>{

    var statusType = this.state.TimeTypeValue.value
    var LeaveReason = this.state.LeaveRejectReasons
    var flagData = 0

    if(statusType == "Reject"){
      if(LeaveReason == ""){
        cogoToast.error("Please enter Reject reason")
        flagData = 1
      }
    }

    if(flagData == 0){
      var logginuser = CommonConfig.loggedInUserData()
      console.log("logginuser = ",logginuser.Name)
      console.log("logginuser = ",logginuser.Email)
      
      var dataSet = {

        statusType:statusType,
        LeaveReason:LeaveReason,
        updatestatusID:this.state.updatestatusID,
        UserLeaveEmail:this.state.UserLeaveEmail,
        UserLeaveName:this.state.UserLeaveName,
        ApplyByName: logginuser.Name,
        ApplyByEmail:logginuser.Email,
        AppliedLeaveDate:this.state.AppliedLeaveDate

      }
      console.log("dataSet = ",dataSet)

      api.post("contactus/updateLeaveStatusReport", dataSet).then((res) => {
        if (res.success) {
          this.hideLoador();
          this.setState({
            statusopen: false,
          });
          this.getUserTMSReport();
          cogoToast.success("Update Successfully");
        }
      });
    }

  }

  handleClickUpdate = () => {
    this.setState({
      updateopen: false,
    });
  };

  set24hoursformat = (Times, types) => {
    var time = Times;
    var data = time.split(":");
    var hours = parseInt(data[0]);
    var minutes = parseInt(data[1]);
    var seconds = parseInt(data[2]);
    var AMPM = time.match(/\s(.*)$/)[1];

    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    var sSeconds = seconds.toString();

    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    if (seconds < 10) sSeconds = "0" + sSeconds;
    var datatosend = sHours + ":" + sMinutes + ":" + sSeconds;
    console.log(sHours + ":" + sMinutes + ":" + sSeconds);
    if (types == "logout") {
      this.setState({ updateFullLogout: datatosend });
    }
    if (types == "login") {
      this.setState({ updateFullLogin: datatosend });
    }
  };

  showLoador = () => {
    this.setState({ Loading: true });
  };


  handelTimeOffData = () => {
    this.setState({ SetShiprecord: true });
  };

  closeDiv = () => {
    this.setState({ SetShiprecord: false });
  };

  

  hideLoador = () => {
    this.setState({ Loading: false });
  };

  handleClickUpdateUpload = () => {
    this.showLoador();
    console.log("this.state.updateLogout = ",this.state.updateLogout)
    this.set24hoursformat(this.state.updateLogin, "login");
    if(this.state.updateLogout != ""){
      this.set24hoursformat(this.state.updateLogout, "logout");
    }else{
      this.state.updateLogout = null
      this.state.updateFullLogout = null
    }


    
    setTimeout(() => {
      var data = {
        dataupdateType: this.state.updateType,
        LoginTime: this.state.updateLogin,
        LogoutTime: this.state.updateLogout,
        FullLogin: this.state.updateFullLogin,
        FullLogout: this.state.updateFullLogout,
        dataId: this.state.updateID,
      };

      api.post("contactus/updatetmsReport", data).then((res) => {
        if (res.success) {
          this.hideLoador();
          //   console.log(res.Data[0][0])
          // this.setState({ EmailSubject: res.data[0].TemplateSubject });
          // this.setState({ MessageTemplate: res.data[0].TemplateMessage });

          this.setState({
            updateopen: false,

            // dataMode: "Update",
          });
          this.getUserTMSReport();
          // this.hideLoador();
          cogoToast.success("Update Successfully");
        }
      });
    }, 3000);
  };

  handleChangeFrom = (event, value) => {
    if (value == "logout") {
      this.setState({ updateLogout: event.target.value });
      if(event.target.value !=""){
        this.set24hoursformat(event.target.value, "logout");
      }
      
    }
    if (value == "login") {
      this.setState({ updateLogin: event.target.value });
      this.set24hoursformat(event.target.value, "login");
    }

    if (value == "LeaveReasons") {
      this.setState({ LeaveRejectReasons: event.target.value });
      // this.set24hoursformat(event.target.value, "login");
    }
  };

  handleDelete = () => {
    console.log(this.state.deleteID, this.state.deleteType);
    var datatoDelete = {
      deleteID: this.state.deleteID,
      typesdata: this.state.deleteType,
    };

    api.post("contactus/deletetmsReport", datatoDelete).then((res) => {
      if (res.success) {
        //   console.log(res.Data[0][0])
        // this.setState({ EmailSubject: res.data[0].TemplateSubject });
        // this.setState({ MessageTemplate: res.data[0].TemplateMessage });

        this.setState({
          open: false,

          // dataMode: "Update",
        });
        this.getUserTMSReport();
        //   this.hideLoador();
        cogoToast.success("Delete Successfully");
      }
    });
  };

  render() {
    const logintype = this.state.logintype.map((x) => {
      return { value: x.value, label: x.label };
    });

    const KeywordListData = [
      {
        Header: "Login Date",
        accessor: "LoginDate",
        width: 100,
      },

      {
        Header: "Login Day",
        accessor: "Day",
        width: 100,
      },

      {
        Header: "Ip Address",
        accessor: "IpAddress",
        width: 100,
      },

      {
        Header: "Location",
        accessor: "IPDetails",
        width: 160,
        Footer: (
          <span>
            <b>
              {this.state.setWeekandTimeoff == 0
                ? ""
                : "Weekend:- " + this.state.setweekendsCount}
            </b>
          </span>
        ),
      },

      {
        Header: "Start Time",
        accessor: "LoginTime",
        width: 100,
        Footer: (
          <span>
            <b>
              {this.state.setWeekandTimeoff == 0
                ? ""
                : "TimeOff:- " + this.state.setTimeOff}
            </b>
          </span>
        ),
      },
      {
        Header: "End Time",
        accessor: "LogoutTime",
        width: 100,
        Footer: (
          <span>
            <b>
              {this.state.setWeekandTimeoff == 0
                ? ""
                : "Leave:- " + this.state.setLeaveCount}
            </b>
          </span>
        ),
      },
      {
        Header: "Total Break",
        accessor: "totalBreak",
        width: 100,
      },
      {
        Header: "Total",
        accessor: "totalWorking",
        width: 100,
      },

      {
        Header: "Action",
        accessor: "Actions",
        width: 100,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              {this.state.TmsDeleteAccess == "1" ? (
                <Button
                  justIcon
                  color="danger"
                  onClick={() =>
                    this.deleteLoginReport(
                      record,
                      this.state.LoginTypeValue.label
                    )
                  }
                >
                  <i class="fas fa-trash"></i>
                </Button>
              ) : (
                ""
              )}

              {this.state.TmsWriteAccess == "1" ? (
                <Button
                  justIcon
                  color="info"
                  onClick={() =>
                    this.handleEdit(record, this.state.LoginTypeValue.label)
                  }
                >
                  <i className="fas fa-edit"></i>
                </Button>
              ) : (
                ""
              )}
            </div>
          );
        },
      },
    ];

    const shipColumsDataHBL = [

      {
        Header: "From Date",
        accessor: "LeaveFromDate",
        width: 100,
      },

      {
        Header: "Leave Day",
        accessor: "Day",
        width: 100,
      },

      {
        Header: "User",
        accessor: "LoginID",
        width: 100,
      },

      {
        Header: "To Date",
        accessor: "LeaveToDate",
        width: 100,
      },

      {
        Header: "Reason",
        accessor: "Reason",
        width: 100,
      },

      {
        Header: "Leave Type",
        accessor: "LeaveType",
        width: 100,
      },

      {
        Header: "Leave Status",
        accessor: "LeaveStatus",
        width: 100,
      },

      {
        Header: "Action",
        accessor: "Actions",
        width: 100,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              {this.state.TmsDeleteAccess == "1" ? (
                <Button
                  justIcon
                  color="danger"
                  onClick={() =>
                    this.deleteLoginReport(
                      record,
                      this.state.LoginTypeValue.label
                    )
                  }
                >
                  <i class="fas fa-trash"></i>
                </Button>
              ) : (
                ""
              )}

              {this.state.TmsDeleteAccess == "1" && record.original.LeaveStatus == "Pending"  ? (
                <Button
                  justIcon
                  color="primary"
                  className="Plus-btn"
                  onClick={() =>
                    this.UpdateLeaveStatusReport(
                      record,
                      this.state.LoginTypeValue.label
                    )
                  }
                >
                  <i className={"fas fa-check"} />
                </Button>
              ) : (
                ""
              )}

              
            </div>
            
          );
        },
      },


    ]

    

    const managedBy = this.state.managedByList.map((type) => {
      return { value: type.PersonId, label: type.LoginID };
    });

    const TimeType = this.state.Timetype.map((x) => {
      return { value: x.value, label: x.label };
    });

    const {
      ProposalData,
      FromDate,
      ToDate,
      ManagedBy,
      LoginTypeValue,
      fileSetName,
      TimeTypeValue,
    } = this.state;

    const handelExportToExcel = (evt) => {
      const headData = Object.keys(ProposalData[0]).map((col) => ({
        value: col,
        type: "string",
      }));
      const bodyData = ProposalData.map((item) =>
        Object.values(item).map((value) => ({
          value,
          type: typeof value,
        }))
      );
      const config = {
        filename: fileSetName,
        sheet: {
          data: [headData, ...bodyData],
          columns: headData.map((col) => ({ wch: 2000 })),
        },
      };
      console.log("hello = ", config);
      zipcelx(config);
    };

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
              <h4 className="margin-right-auto text-color-black">
                Time Management Report
              </h4>

              <div className="filter-wrap"></div>
            </CardHeader>
            <GridItem xs={12} sm={12} md={12}>
              <div className="user-report-filter" id="myDIVcloseOpen">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={2}>
                    <div className="date-spl">
                      <InputLabel className={classes.label}>
                        From Date
                      </InputLabel>
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
                  <GridItem xs={12} sm={12} md={2}>
                    <div className="date-spl">
                      <InputLabel className={classes.label}>To Date</InputLabel>
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
                    <div className="spl">
                      <FormControl fullWidth>
                        <Autocomplete
                          id="combo-box-demo"
                          options={logintype}
                          value={LoginTypeValue}
                          //   disabled={viewAllClear === false ? false : true}
                          onChange={(event, value) =>
                            this.selectChange(event, value, "logintypevalue")
                          }
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField {...params} label="Data Type" />
                          )}
                        />
                      </FormControl>
                    </div>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={3}>
                    <div className="date-spl">
                      {CommonConfig.getUserAccess("Time Booking Report")
                        .AllAccess === 1 &&
                      CommonConfig.getUserAccess("Time Booking Report")
                        .ReadAccess === 1 ? (
                        <Autocomplete
                          id="combo-box-demo"
                          options={managedBy}
                          value={ManagedBy}
                          //   disabled={viewAllClear === false ? false : true}
                          onChange={(event, value) =>
                            this.selectChange(event, value, "ManagedBy")
                          }
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField {...params} label="Managed By" />
                          )}
                        />
                      ) : null}

                      {/* </div> */}
                    </div>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={2}>
                    <GridContainer>
                      <div className="shipment-submit user-report-btn mt-20">
                        <Button
                          className="fa-icon-userReport"
                          color="rose"
                          onClick={() => this.getUserTMSReport()}
                        >
                          <i class="fa fa-search"></i>
                        </Button>
                        <Button
                          justIcon
                          color="danger"
                          onClick={handelExportToExcel}
                        >
                          <i class="fas fa-download"></i>
                        </Button>
                        {/* {this.state.TmsTimeOffcount > 0 ? ( */}
                          <div className={this.state.timeoffStyle}>
                            <Button
                            justIcon
                            color="primary"
                            className="btn-badge-outer"
                            onClick={() => this.handelTimeOffData()}
                          >
                            <i class="fas fa-user-times"></i>
                            <span className="btn-badge">{this.state.totalLeave}</span>
                          </Button>
                          </div>
                          {/* ) :null} */}
                        
                        


                        {/* <Button
                          justIcon
                          color="danger"
                          onClick={handelExportToExcel}
                        >
                          <i class="fas fa-download"></i>
                        </Button> */}
                      </div>
                    </GridContainer>
                  </GridItem>
                </GridContainer>
              </div>
            </GridItem>

            <CardBody>
              <div className="tbl-spacing">
                <ReactTable
                  data={ProposalData}
                  minRows={0}
                  filterable
                  textAlign={"left"}
                  defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                  resizable={false}
                  columns={
                    this.state.LoginTypeValue.label == "Leave"
                      ? shipColumsDataHBL
                      : KeywordListData
                  }
                  defaultPageSize={10}
                  showPaginationBottom={true}
                  className="-striped -highlight chatMgtList1"
                />
              </div>

              {/* <div className="t-count">Total Count : {totalRowCount}</div> */}
            </CardBody>
          </Card>
        </GridItem>

        <div>
          <Dialog
            open={this.state.open}
            //   onClose={this.state.close}
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
              <Button onClick={this.handleClickCancel} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleDelete} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={this.state.statusopen}
            //   onClose={this.state.close}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Update Leave Status"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to update leave status?
              </DialogContentText>

              <GridContainer>

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
                    <CustomInput
                      labelText="Reasons"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.LeaveRejectReasons
                          ? this.state.LeaveRejectReasons
                          : this.state.LeaveRejectReasons,
                        onChange: (event) =>
                          this.handleChangeFrom(event, "LeaveReasons"),
                      }}
                    />
                  </GridItem>
                </GridContainer>

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClickCancelUpdate} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleUpdateLeaveStatus} color="primary" autoFocus>
                Update
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            className="test-zIndex"
            open={this.state.updateopen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to update login and logout time?
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Start Time"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.updateLogin
                          ? this.state.updateLogin
                          : this.state.updateLogin,
                        onChange: (event) =>
                          this.handleChangeFrom(event, "login"),
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="End Time"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.updateLogout
                          ? this.state.updateLogout
                          : this.state.updateLogout,
                        onChange: (event) =>
                          this.handleChangeFrom(event, "logout"),
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClickUpdate} color="secondary">
                Cancel
              </Button>
              <Button onClick={this.handleClickUpdateUpload} color="primary">
                Update
              </Button>
            </DialogActions>
          </Dialog>


          <Dialog
            open={this.state.SetShiprecord}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            // width="lg"
            className="large-Modal"
          >
            <DialogTitle id="alert-dialog-titleHBL">
              User TimeOFF Details
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-descriptionHBL">
                <div className="package-select">
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="select-reacttable">
                      <ReactTable
                        data={this.state.TimeoffProposalData}
                        defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                        sortable={true}
                        filterable={true}
                        resizable={false}
                        minRows={2}
                        columns={shipColumsDataHBL}
                        defaultPageSize={10}
                        align="center"
                        className="-striped -highlight"
                      />
                    </div>
                  </GridItem>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.closeDiv()} color="secondary">
                Cancel
              </Button>
              {/* <Button
                onClick={() => this.UpdateHBLShipID()}
                color="primary"
                autoFocus
              >
                Confirm
              </Button> */}
            </DialogActions>
          </Dialog>

          {/*             
            <Dialog
            open={this.state.showURLDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <GridContainer>
                  
                <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Site URL"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.SiteURL
                          ? this.state.SiteURL
                          : this.state.SiteURL,
                        onChange: (event) =>
                          this.handleChangeFrom(event, "SiteURL"),
                      }}
                    />
                  </GridItem>

                  
                  
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
              <Button onClick={() => this.CloseURLDialog()} color="secondary">
                Cancel
              </Button>
              <Button onClick={() => this.generateUrlData()} color="primary">
                Generate
              </Button>
            </DialogActions>
          </Dialog> */}
        </div>

        
      </GridContainer>
    );
  }
}

export default TMSReport;
