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
            isCommitted: false,
            committedLength: 0,
            notCommitedLength: 0,
            notCommitedList: [],
            fileName: "",
            FromDate: new Date(),
            ToDate: new Date(),
            ManagedBy: "",
            isPreviewClicked: false,
            ManagedBy: "",
            managedByList: [],
            IpAddress: "",
            totalRowCount: "",
            LoginType: "",
            logintype: [
                { value: "Login", label: "Login" },
                { value: "Break", label: "Break" },
            ],
            logintypevalue: [],
            LoginTypeValue: "",
            UserNameValue: "",
        };
    }

    componentDidMount() {

        // this.getUserTMSReport()
        this.getManagedBy();

    }

    getManagedBy() {
        try {
            api
                .get("contactus/getUsersForTMSList")
                .then((result) => {
                    console.log("result", result)
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


    getUserTMSReport() {

        debugger

        var managedByValue = 0
        if (CommonConfig.getUserAccess("Time Booking").DeleteAccess ===
            1) {
            managedByValue = this.state.ManagedBy.value
        } else {
            managedByValue = CommonConfig.loggedInUserData().PersonID
        }

        if(managedByValue == 0 || managedByValue == undefined){
            cogoToast.error("Please Select Managed By");

        }else if(this.state.LoginTypeValue == ""){
            cogoToast.error("Please Select Data Type");
        }
        else{

            var pData = {
                fromDate: moment(this.state.FromDate)
                    .format(CommonConfig.dateFormat.dbDateOnly)
                    .toString(),
    
                toDate: moment(this.state.ToDate)
                    .format(CommonConfig.dateFormat.dbDateOnly)
                    .toString(),
                puserdata: managedByValue,
                logintypes:this.state.LoginTypeValue.label
            }
    
            console.log(pData);
    
            api.post("contactus/getTmsUserReport", pData).then((res) => {
                if (res.success) {
                    this.state.ProposalData = []
                    // this.setState({ ProposalData: requestData });
                    console.log("res14 = ", res);
                    let requestData = res.Data[0];
                    if (requestData.length > 0) {

                        
    
                        for (let index = 0; index < requestData.length; index++) {
                            
                            if(this.state.LoginTypeValue.label == "Login"){
                                var startTime = moment(requestData[index].totalBreak, 'HH:mm:ss');
                                var endTime = moment(requestData[index].LoginLogOff, 'HH:mm:ss');
        
                                // calculate total duration
                                var duration = moment.duration(endTime.diff(startTime));
                                debugger
                                // duration in hours
                                var hours = parseInt(duration.asHours());
                                // duration in minutes
                                var minutes = parseInt(duration.asMinutes()) % 60;
                                var seconds  = parseInt((duration.asSeconds() * 0.001)) 
                                console.log("SECS = ",seconds);
                                console.log(requestData[index]);
                                console.log("Hours = ", hours, ":", minutes);
                                var totalTome =""
                                if(requestData[index].LoginLogOff == null){
                                    totalTome = "NA"
                                }else{

                                
                                    totalTome = hours + ":" + minutes  + ":" + seconds + " hours"
                                }
                                requestData[index].totalWorking = totalTome;
        
                            }else{
                                requestData[index].totalBreak = "N/A";
                            }


                           
                            // alert(hours + ' hour and ' + minutes + ' minutes.');
    
                        }
                        this.setState({ fileSetName: fileNameSet });
                        this.setState({ ProposalData: requestData });
                    }
                } else {
    
                    this.hideLoador();
                    // this.setState({loggedUser:0})
                    cogoToast.error("Something went wrong. Please try again...");
    
                }
    
            });
    

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
            if (type === "ManagedBy") {
                this.setState({ ManagedBy: value });
                console.log(this.state.ManagedBy);
                this.state.ManagedBy = value
                console.log(this.state.ManagedBy);
                // this.getUserTMSReport()
            }

            if (type === "logintypevalue") {
                this.setState({ LoginTypeValue: value });
                console.log(this.state.LoginTypeValue);
                this.state.LoginTypeValue = value
                console.log(this.state.LoginTypeValue);
                // this.getUserTMSReport()
            }
        }
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
                Header: "Ip Address",
                accessor: "IpAddress",
                width: 100,
            },

            {
                Header: "Location",
                accessor: "IPDetails",
                width: 160,
            },


            {
                Header: "Start Time",
                accessor: "LoginTime",
                width: 100,
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


        ];

        const managedBy = this.state.managedByList.map((type) => {
            return { value: type.PersonId, label: type.LoginID };
        });

        

        const {
            ProposalData, FromDate,
            ToDate, ManagedBy,LoginTypeValue,fileSetName
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
                                            {CommonConfig.getUserAccess("Time Booking").DeleteAccess ===
                                                1 && CommonConfig.getUserAccess("Time Booking").ReadAccess ===
                                                1 ? (
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
                                    columns={KeywordListData}
                                    defaultPageSize={10}
                                    showPaginationBottom={true}
                                    className="-striped -highlight chatMgtList1"
                                />


                            </div>

                            {/* <div className="t-count">Total Count : {totalRowCount}</div> */}
                        </CardBody>
                    </Card>
                </GridItem>


            </GridContainer>
        );
    }
}

export default TMSReport;
