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

class Notification extends Component {
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
      TimeoffProposalData: [],
      HolidayListProposalData:[],
      setweekendsCount: 0,
      setTimeOff: 0,
      isCommitted: false,
      committedLength: 0,
      notCommitedLength: 0,
      notCommitedList: [],
      fileName: "",
      deleteType: "",
      deleteID: "",
      updateID: "",
      updateType: "",
      FromDate: new Date(),
      ToDate: new Date(),
      ManagedBy: "",
      setWeekandTimeoff: 0,
      isPreviewClicked: false,
      SetShiprecord: false,
      ManagedBy: "",
      managedByList: [],
      IpAddress: "",
      totalRowCount: "",
      LoginType: "",
      open: false,
      updateopen: false,

      logintypevalue: [],
      DobProposalData:[],
      getWorkAnniversaryListData:[],
      LoginTypeValue: "",
      UserNameValue: "",
      TmsDeleteAccess: "",
      TmsWriteAccess: "",
      updateLogin: "",
      updateLogout: "",
      updateFullLogout: "",
      updateFullLogin: "",
      TmsTimeOffcount: 0,
      timeoffStyle: "hide",
      totalLeave: 0,
      // timeoffStyle:"table-pane.active"
    };
  }

  componentDidMount() {
    // this.getManagedBy();
    this.getLeaveList();
    this.getHolidayList();
    this.getDOBList();
    this.getWorkAnniversaryList();
  }

  getHolidayList(){
    var fromDate = moment(this.state.FromDate)
    .format(CommonConfig.dateFormat.dbDateOnly)
    .toString()
    
    var new_date = moment(this.state.FromDate).add(7, 'days').format(CommonConfig.dateFormat.dbDateOnly).toString();

    console.log("fromDate = ",fromDate)

    console.log("new_date = ",new_date)
    var condition = '(ol.`HolidayDate` BETWEEN "'+fromDate+'" AND "'+new_date+'")';
    var pData = {

        fromDate: moment(this.state.FromDate)
          .format(CommonConfig.dateFormat.dbDateOnly)
          .toString(),

        toDate: new_date,
        condition:condition
    }

    api.post("contactus/getHolidayList", pData).then((res) => {
        if (res.success) {
  
          console.log("Data = ",res);
          let requestData = res.Data[0];
          
          
          if(requestData.length > 0){
            // this.state.timeoffStyle = "table-pane.active"
            this.setState({HolidayListProposalData : res.Data[0]})
            // this.setState({totalLeave : requestData.length})
          }
         
  
          
  
          } else {
            this.hideLoador();
            // this.setState({loggedUser:0})
            cogoToast.error("Something went wrong. Please try again...");
          }
        });

  }

  getDOBList(){
    var fromDate = moment(this.state.FromDate)
    .format(CommonConfig.dateFormat.dbDateOnly)
    .toString()
    
    var new_date = moment(this.state.FromDate).add(7, 'days').format(CommonConfig.dateFormat.dbDateOnly).toString();

    console.log("fromDate = ",fromDate)

    console.log("new_date = ",new_date)
    var condition = '(DAY(ed.`Birthdate`) BETWEEN DAY("'+fromDate+'") AND DAY("'+new_date+'")   AND MONTH(ed.`Birthdate`) BETWEEN MONTH("'+fromDate+'") AND MONTH("'+new_date+'"))';
    // var condition = '(ol.`HolidayDate` BETWEEN "'+fromDate+'" AND "'+new_date+'")';
    var pData = {

        fromDate: moment(this.state.FromDate)
          .format(CommonConfig.dateFormat.dbDateOnly)
          .toString(),

        toDate: new_date,
        condition:condition
    }

    api.post("contactus/getDobList", pData).then((res) => {
        if (res.success) {
  
          console.log("Data = ",res);
          let requestData = res.Data[0];
          
          
          if(requestData.length > 0){
            // this.state.timeoffStyle = "table-pane.active"

            for (let index = 0; index < res.Data[0].length; index++) {
                var dob = new Date(res.Data[0][index].calculateDOB)
                var ageDifMs = Date.now() - dob.getTime();
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                var agre =  Math.abs(ageDate.getUTCFullYear() - 1970);

                res.Data[0][index].Age = agre;
                
            }

            console.log("res.Data[0] = ",res.Data[0])
            this.setState({DobProposalData : res.Data[0]})
            // this.setState({totalLeave : requestData.length})
          }
         
  
          
  
          } else {
            this.hideLoador();
            // this.setState({loggedUser:0})
            cogoToast.error("Something went wrong. Please try again...");
          }
        });

  }

  
  getWorkAnniversaryList(){
    var fromDate = moment(this.state.FromDate)
    .format(CommonConfig.dateFormat.dbDateOnly)
    .toString()
    
    var new_date = moment(this.state.FromDate).add(7, 'days').format(CommonConfig.dateFormat.dbDateOnly).toString();

    console.log("fromDate = ",fromDate)

    console.log("new_date = ",new_date)
    var condition = '(DAY(ed.`Joiningdate`) BETWEEN DAY("'+fromDate+'") AND DAY("'+new_date+'")   AND MONTH(ed.`Joiningdate`) BETWEEN MONTH("'+fromDate+'") AND MONTH("'+new_date+'"))';
    // var condition = '(ol.`HolidayDate` BETWEEN "'+fromDate+'" AND "'+new_date+'")';
    var pData = {

        fromDate: moment(this.state.FromDate)
          .format(CommonConfig.dateFormat.dbDateOnly)
          .toString(),

        toDate: new_date,
        condition:condition
    }

    api.post("contactus/getWorkAnniversaryList", pData).then((res) => {
        if (res.success) {
  
          console.log("Data = ",res);
          let requestData = res.Data[0];
          
          
          if(requestData.length > 0){
            // this.state.timeoffStyle = "table-pane.active"

            for (let index = 0; index < res.Data[0].length; index++) {
                var dob = new Date(res.Data[0][index].calculateDOB)
                var ageDifMs = Date.now() - dob.getTime();
                var ageDate = new Date(ageDifMs); // miliseconds from epoch
                var agre =  Math.abs(ageDate.getUTCFullYear() - 1970);
                // if(agre == 0){
                    agre = agre + 1
                // }
                res.Data[0][index].Age = agre;

                
            }

            console.log("res.Data[0] = ",res.Data[0])
            this.setState({getWorkAnniversaryListData : res.Data[0]})
            // this.setState({totalLeave : requestData.length})
          }
         
  
          
  
          } else {
            // this.hideLoador();
            // this.setState({loggedUser:0})
            cogoToast.error("Something went wrong. Please try again...");
          }
        });

  }

  getLeaveList(){
    var fromDate = moment(this.state.FromDate)
    .format(CommonConfig.dateFormat.dbDateOnly)
    .toString()
    
    var new_date = moment(this.state.FromDate).add(7, 'days').format(CommonConfig.dateFormat.dbDateOnly).toString();

    console.log("fromDate = ",fromDate)

    console.log("new_date = ",new_date)
    var condition = '(tml.`LeaveFromDate` BETWEEN "'+fromDate+'" AND "'+new_date+'")';
    var pData = {

        fromDate: moment(this.state.FromDate)
          .format(CommonConfig.dateFormat.dbDateOnly)
          .toString(),

        toDate: new_date,
        condition:condition
    }

    api.post("contactus/getLeaveData", pData).then((res) => {
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

//   getManagedBy() {
//     try {
//       api
//         .get("contactus/getUsersForTMSList")
//         .then((result) => {
//           console.log("result", result);
//           this.setState({ managedByList: result.Data });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } catch (err) {
//       console.log("error", err);
//     }
//   }

  showLoador = () => {
    this.setState({ Loading: true });
  };

  render() {
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
        Header: "To Date",
        accessor: "LeaveToDate",
        width: 100,
      },

      {
        Header: "User",
        accessor: "LoginID",
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
    ];


    const shipColumsHolidayListProposalData = [
      {
        Header: "Date",
        accessor: "HolidayDate",
        width: 100,
      },
      {
        Header: "Name",
        accessor: "HolidayName",
        width: 100,
      },

      {
        Header: "Day",
        accessor: "Day",
        width: 100,
      },

      

      {
        Header: "Expiry Date",
        accessor: "HolidayExpiryDate",
        width: 100,
      },

      {
        Header: "Time Zone",
        accessor: "TimeZone",
        width: 100,
      },
    ];

    
    const shipColumsDobProposalData = [
      {
        Header: "Birth Date",
        accessor: "Birthdate",
        width: 100,
      },
      {
        Header: "User",
        accessor: "LoginID",
        width: 100,
      },
      {
        Header: "Age",
        accessor: "Age",
        width: 100,
      },

     
    ];

    const getWorkAnniversaryListDataColumn = [

        {
            Header: "Joining Date",
            accessor: "Joiningdate",
            width: 100,
          },
          {
            Header: "User",
            accessor: "LoginID",
            width: 100,
          },
          {
            Header: "Work Experiance",
            accessor: "Age",
            width: 100,
          },

    ]

    

    

    const managedBy = this.state.managedByList.map((type) => {
      return { value: type.PersonId, label: type.LoginID };
    });

    const {
        TimeoffProposalData,
        ProposalData,
        HolidayListProposalData,
        DobProposalData,
        getWorkAnniversaryListData,
      FromDate,
      ToDate,
      ManagedBy,
      LoginTypeValue,
      fileSetName,
    } = this.state;

    return (
      <GridContainer className="UserList-outer">
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}

        <GridItem xs={6}>
          <Card>
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <HeadsetMic />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">
                Leave List
              </h4>

              <div className="filter-wrap"></div>
            </CardHeader>

            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div className="tbl-spacing">
                    <ReactTable
                      data={TimeoffProposalData}
                      minRows={0}
                      filterable
                      textAlign={"left"}
                      defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                      resizable={false}
                      columns={
                        shipColumsDataHBL
                      }
                      defaultPageSize={5}
                      showPaginationBottom={true}
                      className="-striped -highlight chatMgtList1"
                    />
                  </div>
                </GridItem>

              </GridContainer>

             

             
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={6}>
          <Card>
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <HeadsetMic />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">
                Holiday List
              </h4>

              <div className="filter-wrap"></div>
            </CardHeader>

            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div className="tbl-spacing">
                    <ReactTable
                      data={HolidayListProposalData}
                      minRows={0}
                      filterable
                      textAlign={"left"}
                      defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                      resizable={false}
                      columns={
                        shipColumsHolidayListProposalData
                      }
                      defaultPageSize={5}
                      showPaginationBottom={true}
                      className="-striped -highlight chatMgtList1"
                    />
                  </div>
                </GridItem>

              </GridContainer>

             

             
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={6}>
          <Card>
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <HeadsetMic />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">
                Birthday List
              </h4>

              <div className="filter-wrap"></div>
            </CardHeader>

            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div className="tbl-spacing">
                    <ReactTable
                      data={DobProposalData}
                      minRows={0}
                      filterable
                      textAlign={"left"}
                      defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                      resizable={false}
                      columns={
                        // this.state.LoginTypeValue.label == "Leave"
                          shipColumsDobProposalData
                        //   : KeywordListData
                      }
                      defaultPageSize={5}
                      showPaginationBottom={true}
                      className="-striped -highlight chatMgtList1"
                    />
                  </div>
                </GridItem>

              </GridContainer>

             

             
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={6}>
          <Card>
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <HeadsetMic />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">
                Work Anniversary List
              </h4>

              <div className="filter-wrap"></div>
            </CardHeader>

            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div className="tbl-spacing">
                    <ReactTable
                      data={getWorkAnniversaryListData}
                      minRows={0}
                      filterable
                      textAlign={"left"}
                      defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                      resizable={false}
                      columns={
                        getWorkAnniversaryListDataColumn
                      }
                      defaultPageSize={5}
                      showPaginationBottom={true}
                      className="-striped -highlight chatMgtList1"
                    />
                  </div>
                </GridItem>

              </GridContainer>

             

             
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default Notification;
