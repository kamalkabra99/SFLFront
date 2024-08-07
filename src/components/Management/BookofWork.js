/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import api from "../../utils/apiClient";
import { CommonConfig } from "../../utils/constant";
import cogoToast from "cogo-toast";
import SimpleBackdrop from "../../utils/general";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import InputLabel from "@material-ui/core/InputLabel";
import _ from "lodash";
import Button from "components/CustomButtons/Button.js";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import Cardbody from "components/Card/CardBody.js";
import Adduser from "@material-ui/icons/AccountCircle";
import User from "@material-ui/icons/AccountCircle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import ReactTable from "react-table";
import DeleteIcon from "@material-ui/icons/Delete";
import Note from "@material-ui/icons/Assessment";
import { fileBase } from "../../utils/config";
import { Attachment, Description, Notes } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Datetime from "react-datetime";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import momentTimezone from "moment-timezone";
import InfoIcon from "@material-ui/icons/PriorityHigh";
const useStyles = makeStyles(styles);

const classes = () => {
  return useStyles();
};

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Steps: [
        {
          stepName: "Book of Work",
          stepId: "bookofworklist",
          classname: "active",
        },
      
      ],
      Status: "",
      UserStatusList: [
        {
          label: "Active",
          value: "Active",
        },
        {
          label: "Inactive",
          value: "Inactive",
        },
      ],
      userTimeZone: "",
      userTimeZoneErr: "",
      userTimeZoneHelperText: "",
      usertypeTimeZone: "",
      usertypeTimeZoneErr: "",
      usertypeTimeZoneHelperText: "",

      UserTypeTimeZoneList: [
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
      usertypeCurrencyList: [
        {
          label: "USD",
          value: "USD",
        },
        {
          label: "INR",
          value: "INR",
        },
        {
          label: "EUR",
          value: "EUR",
        },

      ],
      UsertypeCurrency: "",
      userTypeDepartment: "",
      usertypeDepartmentList: [],
      userType: "",
      userTypeHelperText: "",
      userTypeErr: "",
      UserTypeList: [
        {
          label: "Customer",
          value: "Customer",
        },
        {
          label: "Employee",
          value: "Employee",
        },
        {
          label: "Contractor",
          value: "Contractor",
        },
      ],
      userTypeTimeZone: "",

      UserTypeTimeZoneList: [
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
      uploadedfilename: "",
      fullName: "",
      userName: "",
      Email: "",
      UsertypeEmail1: "",
      UsertypeEmail2: "",
      Email: "",
      EmailID: "",
      EmployeementID: "",
      department: "",
      employeeId: "",
      Password: "",
      Mobile: "",
      UsertypeMobile: "",
      MobileID: "",
      userModules: [],
      serviceList: [],
      Salary: "",
      fullnameErr: false,
      usernameErr: false,
      emailErr: false,
      UsertypeemailErr1: false,
      UsertypeemailErr2: false,
      passwordErr: false,
      mobileErr: false,
      UsertypemobileErr: false,
      delDoc:false,
      recordDocument:"",
      Loading: false,
      ShipmentCount: 0,
      fullnameHelperText: "",
      usernameHelperText: "",
      emailHelperText: "",
      UsertypeemailHelperText1: "",
      UsertypeemailHelperText2: "",
      passwordHelperText: "",
      mobileHelperText: "",
      UsertypemobileHelperText: "",
      checkFullname: false,
      checkUserName: false,
      checkEmail: false,
      UsertypecheckEmail1: false,
      UsertypecheckEmail2: false,
      checkPassword: false,
      checkMobile: false,
      UsertypecheckMobile: false,
      checkLetter: false,
      checkUpperCase: false,
      checkLowerCase: false,
      checkNumber: false,
      checkSpecialCharacter: false,
      LeadAssignment: false,
      LeadWriteClick: false,
      IsDropDownShow: false,
      AccountNumber: "",
      checkAccountNumber: false,
      accountNumberErr: false,
      accountNumberHelperText: "",
      isAccountAlready: false,
      ManagedBy: "",
      managedByErr: false,
      managedByHelperText: "",
      managedByList: [],
      AssignedBy: "",
      assignedByErr: false,
      assignedByHelperText: "",
      AssignedTo: "",
      assignedToErr: false,
      assignedToHelperText: "",
      assignedByList: [],
      BookofWorkID:"",
      PaperSizePreviewData:"",
      AssignedBySelected: CommonConfig.loggedInUserData().Name,
      CompanyName: "",
      companyNameErr: false,
      companyNameHelperText: "",
      checkCompanyName: false,

      WorkName: "",
      workNameErr: false,
      workNameHelperText: "",
      checkWorkName: false,

      checkDefectId: false,
      defectIdErr: false,
      defectIdHelperText: "",
      DefectId:"",

      Description: "",
      descriptionErr: false,
      descriptionHelperText: "",
      checkDescription: false,

      



      
      WorkStatusList:[],
      Status: "",
      statusErr: false,
      statusHelperText: "",
      checkStatus: false,

      Country: {},
      CountryList: [],
      countryErr: false,
      countryHelperText: "",

      Priority: "",
      PriorityList: [],
      priorityErr: false,
      priorityHelperText: "",
      priorityStatus:false,
      notes: [],
      notesDisabled: true,
      noteErr: false,
      isNotesVisible: true,
      EntityID: "",
      bankList: [],
      UserDetailID: null,
      pagePreviewLink: "",
      PaperSizeList: [],
      PaperSize: "",
      PaperReviewLink: "",
      LoginpersonId: "",
      StartTime: "",
      starttimeErr: false,
      starttimeHelperText: "",
      EndTime: "",
      endtimeErr: false,
      endtimeHelperText: "",
      StartDate: "",
      startdateErr: false,
      startdateHelperText: "",
      JoinDate: "",
      joindateErr: false,
      joindateHelperText: "",
      RelivingDate: "",
      relivingdateErr: false,
      relivingdateHelperText: "",
      BirthDate: "",
      birthdateErr: false,
      birthdateHelperText: "",
      DateCreated: "",
      dateCreatedErr: false,
      dateCreatedHelperText: "",
      ETA: "",
      etaErr: false,
      etaHelperText: "",
      Attachment:"",
      Attachments: [],
      AttachmentsData:[],
      AttachmentList: [],
      Accounts: [],
      AccountList: [],
      AccountTypeList: [],
      AccountType: "",
      objAttachment: {
        Index: 0,
        FileName: "",
        Status: "Active",
        CreatedOn: moment().format(CommonConfig.dateFormat.dateOnly),
        Description: CommonConfig.loggedInUserData().Name,
      },
      objAccount: {
        Index: 0,
        AccountNumber: "",
        Status: "Active",
        CreatedOn: moment().format(CommonConfig.dateFormat.dateOnly),
        Description: CommonConfig.loggedInUserData().Name,
      },
      Access: [],
      countryWise: [
        { value: "All", label: "All", Index: 0, IsSelected: false },
        { value: "37", label: "Canada", Index: 1, IsSelected: false },
        { value: "89", label: "India", Index: 2, IsSelected: true },
        { value: "202", label: "United State", Index: 3, IsSelected: false },
        { value: "0", label: "Others", Index: 4, IsSelected: false },
      ],
    };
  }

  async componentDidMount() {
    debugger
   // this.getDepartment();
  //  this.getAccountType();
    this.setState({ Access: CommonConfig.getUserAccess("User Management") });

   // this.getCountry();
  //  this.showHide();
  this.getAssignedBy();
  this.getStatus();
  this.getPriority();
  await this.getnotesByID();

  //  this.getManagedBy();
 //   this.getUserDetail();
 //   this.getServiceListFiltered(89);
 //   this.getPaperSizeList();
    this.setState({ LoginpersonId: CommonConfig.loggedInUserData().PersonID });
    if(this.props.history.location.state!=undefined && this.props.history.location.state.id !="")
    setTimeout(() => {
      this.geteditBookofWork();
    }, 1500);
  }

  getStatus() {debugger
    try {
      let data = {
        stringMapType: "WORKSTATUS",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {

          this.setState({ WorkStatusList: result.data });

        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }
  
  getPriority() {debugger
    try {
      let data = {
        stringMapType: "PRIORITY",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {

          this.setState({ PriorityList: result.data });
        
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getAssignedBy() {debugger
    try {
      api
        .get("contactus/getUsersForTMSList")
        .then((result) => {
          const fieldObj = result.Data;
         // fieldObj.push({ UserID: 0, Name: "Set to Null" });
         const AccountTypeDrop = fieldObj.map((type) => {
          return { UserID: type.PersonId, Name: type.ContactName };
        });
          this.setState({
            assignedByList: AccountTypeDrop,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getnotesByID() {debugger
    try {
      let data = {
        ShippingID:
          this.props.location.state && this.props.history.location.state.id
            ? this.props.history.location.state.id
            : null,
      };
      api
        .post("contactUs/getBookofWorkNotesByID", data)
        .then((result) => {
          var i = 0;
          result.data.data.map((Obj) => {
            Obj.Index = i;
            i++;
            return Obj;
          });
          result.data.data.map((Obj) => {
            Obj.disabled = i;
            i++;
            return Obj;
          });
          if (result.data.data.length > 0) {
            this.setState({ isNotesVisible: true });
          }
          this.setState({ notes: result.data.data });
          this.handleAddNotesRow();
        })
        .catch((err) => {
          console.log("error......", err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }
  handleAddNotesRow = () => {
    var addnotes = this.state.notes.filter(
      (x) => x.Status === "Active" && (x.NoteText === null || x.NoteText === "")
    );
    if (addnotes.length === 0) {
      var todayDate = new Date();
      const note = {
        NoteText: "",
        NoteType: null,
        NoteTitle: null,
        Status: "Active",
        AttachmentID: null,
        AttachmentType: null,
        AttachmentName: null,
        CreatedOn: moment(todayDate).format(CommonConfig.dateFormat.dateTime),
        disabled: false,
        closebutton: true,
        CreatedBy: CommonConfig.loggedInUserData().PersonID,
        NoteID: null,
        CreatedByNote: CommonConfig.loggedInUserData().Name,
        AddedBy: CommonConfig.loggedInUserData().Name,
        Index: this.state.notes.length + 1,
      };
      this.setState({
        notesDisabled: false,
        notes: [...this.state.notes, note],
      });
    } else {
      cogoToast.error("Please fill above note first");
    }
  };

  handleChangeNotes = (event, idx) => {
    const { value } = event.target;
    const notes = [...this.state.notes];
    var noteIndex = notes.findIndex((x) => x.Index === idx);
    if (noteIndex !== -1) {
      notes[noteIndex]["NoteText"] = value;
      if (
        notes[noteIndex]["NoteText"] === null ||
        notes[noteIndex]["NoteText"] === ""
      ) {
        this.setState({ noteErr: true });
      } else {
        this.setState({ noteErr: false });
      }
    }
    this.setState({ notes: notes });
  };

  handleNotesRemoveRow = (Index) => {
    const removeNotes = [...this.state.notes];
    var noteIndex = this.state.notes.findIndex((x) => x.Index === Index);
    if (noteIndex !== -1) {
      removeNotes[noteIndex]["Status"] = "Inactive";
      removeNotes[noteIndex]["AttachmentStatus"] = "Inactive";
      this.setState({ notes: removeNotes });
      // if (removeNotes.filter((x) => x.Status === "Active").length === 0) {
      //   this.handleAddNotesRow();
      // }
      if (removeNotes.filter((x) => x.Status === "Active").length === 0) {
        this.setState({
          isNotesVisible: false,
        });
      }
    }
  };


  getStates(countryData, type) {
    try {
      if (type === "All") {
        let data = {
          countryId: countryData.value,
        };

        api
          .post("location/getStateList", data)
          .then((res) => {
            if (res.success) {
              this.showLoader();

              this.setState({
                StateList: res.data,
                StateAutoComplete: res.data.length ? true : false,
              });

              this.hideLoader();
            }
          })
          .catch((err) => {
            this.hideLoader();
            console.log("err...", err);
            cogoToast.error("Something Went Wrong 1");
          });
      }
      else if (type === "Usertype") {
        let data = {
          countryId: countryData.value,
        };

        api
          .post("location/getStateList", data)
          .then((res) => {
            if (res.success) {
              this.showLoader();

              this.setState({
                UsertypeStateList: res.data,
                UsertypeStateAutoComplete: res.data.length ? true : false,
              });

              this.hideLoader();
            }
          })
          .catch((err) => {
            this.hideLoader();
            console.log("err...", err);
            cogoToast.error("Something Went Wrong 2");
          });
      }

    } catch (error) {
      this.hideLoader();
    }
  }

  geteditBookofWork = () => {debugger
    let data = {
      BookofWorkID: this.props.history.location.state.id,
    };
    this.setState({ BookofWorkID: data.BookofWorkID });
    try {
      this.setState({ Loading: true });
      api.post("contactUs/GetBookofWorkById/", data).then((result) => {
        if (result.Data.success) {
          var WorkData = result.Data;
          // this.setState({ Loading: false });
          // if (
          //   result.data.data.NoteList != null &&
          //   result.data.data.NoteList.length > 0
          // ) {
          //   var i = 0;
          //   result.data.data.NoteList.map((Obj) => {
          //     Obj.Index = i;
          //     i++;
          //     return Obj;
          //   });
          //   result.data.data.NoteList.map((Obj) => {
          //     Obj.disabled = i;
          //     i++;
          //     return Obj;
          //   });
          //   this.setState({
          //     notes: result.data.data.NoteList,
          //     notesDisabled: true,
          //   });
          // }
          // var managedBY = this.state.WorkingonRequest.find(
          //   (x) => x.PersonID === result.data.data.WorkingOnRequest
          // );
          // var selectedManagedby = {};
          // if (managedBY !== undefined && managedBY !== null) {
          //   selectedManagedby = {
          //     value: managedBY.PersonID,
          //     label: managedBY.Name,
          //   };
          // }
          var selectedAssignedBy = {};
          selectedAssignedBy = {
                value: WorkData.data.AssignedBy,
                label: WorkData.data.AssignedByName,
              };
              var selectedAssignedTo = {};
          selectedAssignedTo = {
                value: WorkData.data.AssignedTo,
                label: WorkData.data.AssignedToName,
              };
              var selectedPriority = {};
              selectedPriority = {
                    value: WorkData.data.Priority,
                    label: WorkData.data.Priority,
                  }; 
                  var selectedWorkStatus = {};
                  selectedWorkStatus = {
                        value: WorkData.data.WorkStatus,
                        label: WorkData.data.WorkStatus,
                      }; 
                      var FinalNotes = this.state.notes.filter(
                        (x) => x.NoteText !== "" && x.NoteText !== null
                      );
          this.setState({
            AssignedBy: selectedAssignedBy,
            AssignedTo: selectedAssignedTo,
            DateCreated: WorkData.data.DateCreated,
            WorkName:   WorkData.data.WorkName,
            Description: WorkData.data.Description,
            Attachment: WorkData.data.AttachmentPath,
            Priority: selectedPriority,
            ETA: WorkData.data.ETA,
            Status: selectedWorkStatus,
            notes:FinalNotes,
          });
      
          this.setState({ Loading: false });
         // this.handleAddNotesRow();
        } else {
          this.setState({ Loading: false });
          cogoToast.error("Something Went Wrong");
        }
      });
    } catch (err) {
      this.setState({ Loading: false });
      cogoToast.error("Something Went Wrong");
    }
  };




  fileUpload = (event) => {debugger
    const files = event.target.files[0];
    debugger;
    console.log("FileSizes = ", files);
    console.log("FileSizes = ", files.size);
    this.setState({ uploadedfilename: files.name });
    // const updatedFileSizes = files.map((fileSize) => ({
    //   ...fileSize,
    //   name: "newFileName.jpg", // Change to the new name you desire
    // }));
    // console.log("......", updatedFileSizes);
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf|\.xls|\.xlsx|\.doc|\.docx|\.ppt|\.pptx)$/i;
    if (!allowedExtensions.exec(files.name)) {
      cogoToast.error(
        "Please upload file having extensions .jpeg/.jpg/.png/.pdf /.xls/.xlsx/.doc/.docx/.ppt/.pptx only."
      );
    } else {
      if (files.size > 5000000) {
        cogoToast.error("please upload the file maximum 5MB");
      } else {
        let AttachmentList = this.state.AttachmentList;
       // let Index = this.state.Attachments.indexOf(record.original);
        let dateNow = new Date().getTime();

        AttachmentList = {
          DateTime:dateNow,
          AttachmentName: files.name,
          AttachmentType:files.type,
          AttachmentID:null,
          Status: "Active"

        }

        //  var editfilename = files.name;

       
        this.state.AttachmentsData.push(AttachmentList)

        this.setState({
           Attachments: AttachmentList,
          AttachmentList:  AttachmentList,
        });
      }
    }
  };
  stringTruncate = (filename) => {
    var maxLength = 15;
    if (filename !== undefined && filename !== null) {
      if (filename.length > 15) {
        filename = filename.substring(0, maxLength) + "...";
      } else {
        filename = filename;
      }
    }
    return filename;
  };
  handleDocumentChange = (e, record) => {
    debugger
    var Index = this.state.Attachments.indexOf(record.original);
    this.state.Attachments[Index]["FileName"] = e.target.value;
    this.setState({ Attachments: [...this.state.Attachments] });
  };

  renderDocumentName = (cellInfo) => {
    return (
      <div className="table-input-slam">
        <CustomInput
          id="FileName"
          inputProps={{
            value: cellInfo.original.FileName,
            onChange: (event) => this.handleDocumentChange(event, cellInfo),
          }}
        />
      </div>
    );
  };


  AddNewRowData = () => {
    let attachments = this.state.Attachments;
    let IsValid = true;
    for (let i = 0; i < this.state.Attachments.length; i++) {
      if (!attachments[i].hasOwnProperty("AttachmentName")) {
        IsValid = false;
      }
    }
    var AttachmentList = this.state.Attachments.filter(
      (x) => x.Status === "Active" && (x.FileName === "" || x.FileName === null)
    );
    if (AttachmentList.length === 0 && IsValid) {
      const objAttachment = {
        Index: AttachmentList.filter((x) => x.Status === "Active").length + 1,
        FileName: "",
        Status: "Active",
        CreatedOn: moment().format(CommonConfig.dateFormat.dateOnly),
        Description: CommonConfig.loggedInUserData().Name,
      };
      this.setState({
        Attachments: [...this.state.Attachments, objAttachment],
      });
    } else {
      cogoToast.error("Please fill above row first");
    }
  };

  // getUserDetail() {
    
  //   try {
  //     this.showLoader();
  //     this.setState({ Attachments: [], AttachmentList: [] });
  //     this.state.EntityID = this.props.location.state;
  //     let data = {
  //       userId: this.props.location.state,
  //     };
  //     let calledApi = CommonConfig.isEmpty(this.props.location.state)
  //       ? "userManagement/getUserModule"
  //       : "userManagement/getUserDataByID";

  //     api
  //       .post(calledApi, data)
  //       .then((res) => {
  //         if (res.success) {
  //           let userData = res.data;

  //           this.setState({
  //             userModules: userData.userModule,
  //             serviceList: userData.userMarkup,
  //           });

  //           this.setState({
  //             ShipmentCount: userData.UserShipmentData[0].AlreadyShippment
  //           });
  //           console.log(this.state.ShipmentCount);
  //           if (userData.UserData) {

  //             if (userData.UserData[0].UserType == "Employee") {
  //               if (userData.EmployeeData.length > 0) {
  //                 this.setState({
  //                   EmployeementID: !CommonConfig.isEmpty(this.props.location.state)
  //                     ? userData.EmployeeData[0].EmployeeDetailID
  //                     : null,
  //                 })
  //               }



  //             }

  //             this.setState({
  //               Status: !CommonConfig.isEmpty(this.props.location.state)
  //                 ? {
  //                   value: userData.UserData[0].Status,
  //                   label: userData.UserData[0].Status,
  //                 }
  //                 : "",
  //               userTimeZone: !CommonConfig.isEmpty(this.props.location.state)
  //                 ?
  //                 {
  //                   value: userData.UserData[0].userTimeZone,
  //                   label: userData.UserData[0].userTimeZone,
  //                 }

  //                 : "",
  //               fullName: !CommonConfig.isEmpty(this.props.location.state)
  //                 ? userData.UserData[0].Name
  //                 : "",
  //               Email: !CommonConfig.isEmpty(this.props.location.state)
  //                 ? userData.UserData[0].Email
  //                 : "",
  //               userName: !CommonConfig.isEmpty(this.props.location.state)
  //                 ? userData.UserData[0].LoginID
  //                 : "",
  //               Mobile: !CommonConfig.isEmpty(this.props.location.state)
  //                 ? userData.UserData[0].PhoneNum
  //                 : "",
  //               Mobile1: !CommonConfig.isEmpty(this.props.location.state)
  //                 ? userData.UserData[1]
  //                   ? userData.UserData[1].PhoneNum
  //                   : ""
  //                 : "",
  //               EmailID: !CommonConfig.isEmpty(this.props.location.state)
  //                 ? userData.UserData[0].EmailID
  //                 : null,

  //               MobileID: !CommonConfig.isEmpty(this.props.location.state)
  //                 ? userData.UserData[0].PhoneID
  //                 : null,
  //               Mobile1ID: !CommonConfig.isEmpty(this.props.location.state)
  //                 ? userData.UserData[1]
  //                   ? userData.UserData[1].PhoneID
  //                   : null
  //                 : null,
  //             });
  //             if (res.data.DocumentList.length > 0) {
  //               for (var i = 0; i < res.data.DocumentList.length; i++) {
  //                 var filesList = res.data.DocumentList[i];
  //                 filesList.CreatedOn = moment(filesList.CreatedOn).format(
  //                   CommonConfig.dateFormat.dateOnly
  //                 );
  //                 this.state.Attachments.push(filesList);
  //               }
  //               this.setState({
  //                 Attachments: [
  //                   ...this.state.Attachments,
  //                   this.state.objAttachment,
  //                 ],
  //               });
  //             } else {
  //               this.setState({ Attachments: [this.state.objAttachment] });
  //             }
  //           }
  //           if (!CommonConfig.isEmpty(userData.userDetails)) {
  //             if (userData.userDetails[0]) {
  //               var Country = this.state.CountryList.filter(
  //                 (x) => x.CountryID === userData.userDetails[0].CountryID
  //               );
  //               var selectedCountry = Country[0]
  //                 ? {
  //                   value: Country[0].CountryID,
  //                   label: Country[0].CountryName,
  //                 }
  //                 : "";

  //               var managedBy = userData.userDetails[0]
  //                 ? {
  //                   value: userData.userDetails[0].ManagedBy,
  //                   label:
  //                     userData.userDetails[0].ManagedByName === null
  //                       ? ""
  //                       : userData.userDetails[0].ManagedByName,
  //                 }
  //                 : "";
  //               if (userData.userDetails[0].AccountNumber == "")
  //                 this.setState({ isAccountAlready: false });
  //               else
  //                 this.setState({ isAccountAlready: true });

  //               this.setState({
  //                 AccountNumber: userData.userDetails[0].AccountNumber,
  //                 ManagedBy: managedBy,
  //                 CompanyName: userData.userDetails[0].CompanyName,
  //                 AddressLine1: userData.userDetails[0].AddressLine1,
  //                 AddressLine2: userData.userDetails[0].AddressLine2,
  //                 AddressLine3: userData.userDetails[0].AddressLine3,
  //                 ZipCode: userData.userDetails[0].ZipCode,
  //                 City: userData.userDetails[0].City,
  //                 State: userData.userDetails[0].State,
  //                 UserDetailID: userData.userDetails[0].UserDetailID,
  //                 Country: selectedCountry,
  //               });
  //               this.getStates(selectedCountry.value, "All");
  //             }
  //           }
  //           debugger
  //           if (userData.UserData[0].UserType == "Employee") {
  //             let emp = { "label": userData.UserData[0].UserType, "value": userData.UserData[0].UserType }

  //             this.setState({ userType: emp });
  //             if (userData.EmployeeData.length > 0) {
  //               // if(userData.EmployeeData.length > 0){
  //               let timezon = { "label": userData.EmployeeData[0].TimeZone, "value": userData.EmployeeData[0].TimeZone };
  //               let Country = this.state.CountryList.filter(
  //                 (x) => x.CountryID === userData.EmployeeData[0].CountryID
  //               );
  //               let selectedCountry = Country[0]
  //                 ? {
  //                   value: Country[0].CountryID,
  //                   label: Country[0].CountryName,
  //                 }
  //                 : "";
  //               let Currency = this.state.usertypeCurrencyList.filter(
  //                 (x) => x.value === userData.EmployeeData[0].Currency
  //               );
  //               let selectedCurrency = Currency[0]
  //                 ? Currency[0]

  //                 : "";
  //               debugger
  //               console.log("this.state.usertypeDepartmentList", this.state.usertypeDepartmentList);
  //               let Department = this.state.usertypeDepartmentList.filter(
  //                 (x) => x.Description === userData.EmployeeData[0].Department
  //               );

  //               let selectedDepartment = Department[0]
  //                 ? { "label": Department[0].Description, "value": Department[0].Description }

  //                 : "";
  //               let selectedCity = "";
  //               if (userData.EmployeeData[0].City != "")
  //                 selectedCity = { "label": userData.EmployeeData[0].City, "value": userData.EmployeeData[0].City };
  //               let selectedState = "";
  //               if (userData.EmployeeData[0].State != "")
  //                 selectedState = { "label": userData.EmployeeData[0].State, "value": userData.EmployeeData[0].State };

  //               this.setState({
  //                 usertypeTimeZone: timezon,
  //                 StartTime:  userData.EmployeeData[0].StartTime == null ? "" : userData.EmployeeData[0].StartTime,
  //                 EndTime: userData.EmployeeData[0].EndTime == null ? "" : userData.EmployeeData[0].EndTime,
  //                 BirthDate: userData.EmployeeData[0].Birthdate == null ? "" : moment(userData.EmployeeData[0].Birthdate),
  //                 JoinDate: userData.EmployeeData[0].Joiningdate == null ? "" : moment(userData.EmployeeData[0].Joiningdate),
  //                 RelivingDate: userData.EmployeeData[0].Relivingdate == null ? "" : oment(userData.EmployeeData[0].Relivingdate),
  //                 UsertypeAddressLine1: userData.EmployeeData[0].Addr1,
  //                 UsertypeAddressLine2: userData.EmployeeData[0].Addr2,
  //                 UsertypeCountry: selectedCountry,
  //                 UsertypeZipCode: userData.EmployeeData[0].Zipcode,
  //                 UsertypeCity: selectedCity.label,
  //                 UsertypeState: selectedState.label,
  //                 UsertypeMobile: userData.EmployeeData[0].Phone1,
  //                 UsertypeMobile1: userData.EmployeeData[0].Phone2,
  //                 UsertypeEmail1: userData.EmployeeData[0].Email1,
  //                 UsertypeEmail2: userData.EmployeeData[0].Email2,
  //                 UsertypeSalary: userData.EmployeeData[0].Salary,
  //                 UsertypeCurrency: selectedCurrency,
  //                 userTypeDepartment: selectedDepartment,
  //                 Usertypeemployeeid: userData.EmployeeData[0].EmployeeID,
  //               });
  //               if (userData.AccountDetailsList.length > 0) {
  //                 let row = [];
  //                 this.state.bankList = "";
  //                 let AccountDetailsList = userData.AccountDetailsList;
  //                 for (i = 0; i < userData.AccountDetailsList.length; i++) {
  //                   row = {
  //                     CreatedByName: CommonConfig.loggedInUserData().Name,
  //                     Status: "Active",
  //                     AccountType: AccountDetailsList[i].AccountType,
  //                     AccountNumber: AccountDetailsList[i].AccountNumber,
  //                     BankName: AccountDetailsList[i].AccountName,
  //                     NameonAccount: AccountDetailsList[i].NameOnAccount,
  //                     RoutingNumber: AccountDetailsList[i].RoutingCode,
  //                     Index: i + 1,
  //                     EntityID: AccountDetailsList[i].EntityID,
  //                     AccountDetailID: AccountDetailsList[i].AccountDetailID,
  //                   };
  //                   this.setState({ bankList: [...this.state.bankList, row] });
  //                 }
  //               }
  //             }
  //           }else{
  //             let emp = { "label": userData.UserData[0].UserType, "value": userData.UserData[0].UserType }

  //             this.setState({ userType: emp });
  //           }
  //           this.hideLoader();
  //         }
  //       })
  //       .catch((err) => {
  //         debugger
  //         console.log("this.props.location.state = ", this.props.location.state)
  //         if (this.props.location.state != undefined) {
  //           this.hideLoader();
  //           console.log("err....", err);
  //           cogoToast.error("Something Went Wrong 3");
  //         } else {
  //           this.hideLoader();
  //           console.log("err....", err);
  //         }
  //       });
  //   } catch (error) {
  //     debugger
  //     if (this.props.location.state != undefined) {
  //       this.hideLoader();
  //       console.log("err....", error);
  //       cogoToast.error("Something Went Wrong 4");
  //     } else {
  //       this.hideLoader();
  //       console.log("err....", error);
  //     }

  //   }
  // }
  getServiceListFiltered(CountryParam) {
    debugger
    try {
      this.setState({ Loading: true });
      const data = {
        CountryIds: CountryParam,
        userID: this.props.location.state
      }
      api
        .post("https://hubapi.sflworldwide.com/userManagement/getServiceListUserMarkupFilter", data)
        .then((res) => {
          if (res.success) {
            this.setState({ serviceList: [] });
            var i = 0;
            res.data.map((OBJ) => {
              OBJ.IsSelected = false;
              OBJ.Index = i;
              i++;
              return OBJ;
            });
            this.setState({ serviceList: res.data, Loading: false });
          } else {
            cogoToast.error("Something Went Wrong 5");
          }
        })
        .catch((err) => {
          cogoToast.error("Something Went Wrong 6");
        });
    } catch (error) { }
  }
  showLoader = () => {
    this.setState({ Loading: true });
  };

  hideLoader = () => {
    this.setState({ Loading: false });
  };

  handleChangeValidation = (event, type) => {
    
    if (type === "WorkName") {
      this.setState({ checkWorkName: true });
      let worknameval = event.target.value;
      if (CommonConfig.isEmpty(worknameval)) {
        this.setState({
          WorkName: worknameval,
          workNameErr: true,
          workNameHelperText: "Please enter Work Name",
        });
      } else if (worknameval.trim() !== worknameval) {
        this.setState({
          WorkName: worknameval,
          workNameErr: true,
          workNameHelperText: "Please enter valid Work Name",
        });
      } else {
        this.setState({
          WorkName: worknameval,
          workNameErr: false,
          workNameHelperText: "",
        });
      }
    } 
   
    
  };
  handleChange = (event, type) => {
    
    if (type === "WorkName") {
      this.setState({ checkWorkName: true });
      let worknameval = event.target.value;
      
        this.setState({
          WorkName: worknameval,
          workNameErr: false,
          workNameHelperText: "",
        });
      
    } 
    else
    if (type === "Description") {
        this.setState({
          Description: worknameval,
          descriptionErr: false,
          descriptionHelperText: "",
        });
      }
    
  };

  handleChangeDes = (event) => {
    const { value } = event.target;
    
    this.setState({ Description: value });
  };
  handledInput = (e, id, MarkupType, Type) => {
    let MarkupData = this.state.serviceList;
    let i = MarkupData.findIndex((x) => x.ServiceID === id);

    let x = document.getElementsByTagName("input");
    let val = e.target.value;
    if (Type === "EnvelopMarkup") {
      if (CommonConfig.isEmpty(val)) {
        MarkupData[i].EnvelopMarkup = "";
        x[i].className = "form-control is-invalid";
      } else if (CommonConfig.RegExp.onlyNumber.test(val)) {
      } else {
        if (MarkupType === "USD") {
          MarkupData[i].EnvelopMarkup = val;
        } else if (MarkupType === "Percentage" && val < 100) {
          MarkupData[i].EnvelopMarkup = val;
        }
      }
    } else if (Type === "Markup") {
      if (CommonConfig.isEmpty(val)) {
        MarkupData[i].Markup = "";
        x[i].className = "form-control is-invalid";
      } else if (CommonConfig.RegExp.onlyNumber.test(val)) {
      } else {
        if (MarkupType === "USD") {
          MarkupData[i].Markup = val;
        } else if (MarkupType === "Percentage" && val < 100) {
          MarkupData[i].Markup = val;
        }
      }
    } else {
      if (CommonConfig.isEmpty(val)) {
        MarkupData[i].Markup = "";
        x[i].className = "form-control is-invalid";
      } else if (CommonConfig.RegExp.onlyNumber.test(val)) {
      } else {
        if (MarkupType === "USD") {
          MarkupData[i].Markup = val;
        } else if (MarkupType === "Percentage" && val < 100) {
          MarkupData[i].Markup = val;
        }
      }
    }
    this.setState({ serviceList: MarkupData });
  };

  handleBlur = (e, id, MarkupType, Type) => {
    let MarkupData = this.state.serviceList;
    let i = MarkupData.findIndex((x) => x.ServiceID === id);

    let x = document.getElementsByTagName("input");
    let val = Math.round(e.target.value).toFixed(2);
    if (Type === "EnvelopMarkup") {
      if (CommonConfig.RegExp.onlyDecimal.test(val)) {
        if (MarkupType === "USD") {
          MarkupData[i].EnvelopMarkup = parseFloat(val).toFixed(2);
          x[i].className = "form-control";
        } else if (MarkupType === "Percentage" && val < 100) {
          MarkupData[i].EnvelopMarkup = parseFloat(val).toFixed(2);
          x[i].className = "form-control";
        }
      } else {
        x[i].className = "form-control is-invalid";
      }
    } else if (Type === "Markup") {
      if (CommonConfig.RegExp.onlyDecimal.test(val)) {
        if (MarkupType === "USD") {
          MarkupData[i].Markup = parseFloat(val).toFixed(2);
          x[i].className = "form-control";
        } else if (MarkupType === "Percentage" && val < 100) {
          MarkupData[i].Markup = parseFloat(val).toFixed(2);
          x[i].className = "form-control";
        }
      } else {
        x[i].className = "form-control is-invalid";
      }
    } else {
      if (CommonConfig.RegExp.onlyDecimal.test(val)) {
        if (MarkupType === "USD") {
          MarkupData[i].Markup = parseFloat(val).toFixed(2);
          x[i].className = "form-control";
        } else if (MarkupType === "Percentage" && val < 100) {
          MarkupData[i].Markup = parseFloat(val).toFixed(2);
          x[i].className = "form-control";
        }
      } else {
        x[i].className = "form-control is-invalid";
      }
    }

    this.setState({ serviceList: MarkupData });
  };

  handledropdown = (e, id) => {
    let serviceNameList = this.state.serviceList;
    let x = serviceNameList.findIndex((x) => x.ServiceID === id);
    serviceNameList[x].MarkupType = e.target.value;
    this.setState({ serviceList: serviceNameList });
  };

  handleInputChange = (e, access) => {
    let userModules = this.state.userModules;
    let cbVal = e.target.checked;
    let cbName = e.target.name;

    if (access === "Read") {
      let x = userModules.findIndex((x) => x.MenuKey === cbName);
      userModules[x].ReadAccess = cbVal ? 1 : 0;
      this.setState({ userModules: userModules });
    }

    if (access === "Write") {
      let x = userModules.findIndex((x) => x.MenuKey === cbName);
      userModules[x].WriteAccess = cbVal ? 1 : 0;
      this.setState({ userModules: userModules });
      if (cbName === "Sales Lead") {
        this.setState({ LeadAssignment: cbVal, LeadWriteClick: true });
      }
    }

    if (access === "Delete") {
      let x = userModules.findIndex((x) => x.MenuKey === cbName);
      userModules[x].DeleteAccess = cbVal ? 1 : 0;
      this.setState({ userModules: userModules });
    }

    if (access === "All") {
      let x = userModules.findIndex((x) => x.MenuKey === cbName);
      userModules[x].AllAccess = cbVal ? 1 : 0;
      userModules[x].ReadAccess = cbVal ? 1 : 0;
      userModules[x].WriteAccess = cbVal ? 1 : 0;
      userModules[x].DeleteAccess = cbVal ? 1 : 0;
      this.setState({ userModules: userModules });
    }

    if (access === "ReadAll") {
      userModules.forEach((item) => {
        item.ReadAccess = cbVal;
      });
      this.setState({ userModules: userModules });
    }

    if (access === "WriteAll") {
      userModules.forEach((item) => {
        item.WriteAccess = cbVal;
      });
      this.setState({ userModules: userModules });
    }

    if (access === "DeleteAll") {
      userModules.forEach((item) => {
        item.DeleteAccess = cbVal;
      });
      this.setState({ userModules: userModules });
    }

    if (access === "AllAccess") {
      userModules.forEach((item) => {
        item.ReadAccess = cbVal;
        item.WriteAccess = cbVal;
        item.DeleteAccess = cbVal;
        item.AllAccess = cbVal;
      });
      this.setState({ userModules: userModules });
    }
  };
  handleStepValue = (e, record, type) => {
    this.setState({ eValue: e, recordValue: record, typeValue: type });
    let checkedArr = this.state.countryWise;
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
      this.setState({ serviceValue: previousList });
      let arrType = "previousSelected" + this.state.chatlist;
      let SelectedCountryCode = "1";

      checkedArr.filter((x) => x.IsSelected === true)
        .map((OBJ) => {

          SelectedCountryCode = SelectedCountryCode + "," + OBJ.value;
          return OBJ;
        });

    } else {
      // else {
      this.setState({ shipmentquery: "" });
      checkedArr.map((OBJ) => {
        OBJ.IsSelected = e.target.checked;
        return OBJ;
      });
      this.state.shipmentquery = this.state.StatusQuery;
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
        StatusList: checkedArr,
        [arrType]: previousList,
        StatusQuery: this.state.shipmentquery,
      });

      // this.filterMethod("Hello", previousList);
      // }
    }

  };
  handleServiceCheckboxChange = (e, record, type) => {

    let checkedArr = this.state.countryWise;
    if (type !== "All") {


      let SelectedCountryCode = "1";
      //this.filterMethod("Hello", previousList);
      checkedArr.filter((x) => x.IsSelected === true)
        .map((OBJ) => {

          SelectedCountryCode = SelectedCountryCode + "," + OBJ.value;
          return OBJ;
        });
      if (SelectedCountryCode === undefined || SelectedCountryCode === "1")
        SelectedCountryCode = "1,37,89,202,0";
      this.getServiceListFiltered(SelectedCountryCode)
    } else {
      // else {



      let SelectedCountryCode = "1";
      checkedArr.filter((x) => x.IsSelected === true)
        .map((OBJ) => {
          if (OBJ.value !== "All")
            SelectedCountryCode = SelectedCountryCode + "," + OBJ.value;
          return OBJ;
        });
      if (SelectedCountryCode === undefined || SelectedCountryCode === "1")
        SelectedCountryCode = "1,37,89,202,0";
      this.getServiceListFiltered(SelectedCountryCode);

      //  this.filterMethod("Hello", previousList);
      // }
    }
    // console.log("checkedArr = ",checkdata);
  };




  validate() {
    debugger
    let IsFormValid = true;
    if (this.state.WorkName === null || this.state.WorkName === "") {
      this.setState({ workNameErr: true, workNameHelperText: "Please Enter Work Name" });
      IsFormValid = false;}

    
    // if (
    //   this.state.objAttachment.FileName === "" &&
    //   this.state.uploadedfilename !== ""
    // ) {
    //   IsFormValid = false;
    // }
    if (this.state.AssignedBy === null || this.state.AssignedBy === "") {
      IsFormValid = false;
      this.setState({ assignedByErr: true, assignedByHelperText: "Please Select Value" });
    }
    if (this.state.AssignedTo === null || this.state.AssignedTo === "") {
      IsFormValid = false;
      this.setState({ assignedToErr: true, assignedToHelperText: "Please Select Value" });
    }
    if (this.state.DateCreated === null || this.state.DateCreated === "") {
      IsFormValid = false;
      this.setState({ dateCreatedErr: true, dateCreatedHelperText: "Please Select Date Created" });
    }  
    if (this.state.Priority === null || this.state.Priority === "") {
      IsFormValid = false;
      this.setState({ priorityErr: true, priorityHelperText: "Please Select Priority" });
    }
    if (this.state.Status === null || this.state.Status === "") {
      IsFormValid = false;
      this.setState({ statusErr: true, statusHelperText: "Please Select Status" });
    }




    return IsFormValid;
  }
  setUserDepartment = (e) => {
    debugger

    this.setState({ userTypeDepartment: e });
    this.state.userTypeDepartment = e;
    console.log("userTypeDepartment", this.state.userTypeDepartment);
  }
  DeleteDocument = (e, record) => {
    this.setState({ recordDocument: record, delDoc: true });
  };
  setUserTimeZone = (e) => {
    this.setState({ usertypeTimeZone: e });
    this.setState({ usertypeTimeZoneErr: false, usertypeTimeZoneHelperText: "" });
  }
  setUserCurrency = (e) => {
    this.setState({ UsertypeCurrency: e });
  }

  setUserType = (e) => {
    this.setState({ userType: e });
    if (this.state.userTimeZone != "" && this.state.usertypeTimeZone == "")
      this.setState({ usertypeTimeZone: this.state.userTimeZone })


  }
  handleDateChange = (date, type) => {
    debugger
    // if (type === "start") {
    //   this.setState({
    //     StartDate: date,
    //     startdateErr: false,
    //     startdateHelperText: "",
    //   });
    // } else if (type === "end") {
    //   this.setState({
    //     EndDate: date,
    //     enddateErr: false,
    //     enddateHelperText: "",
    //   });
    // }else 
    if (type === "ETA") {
      this.setState({
        ETA: date,
        etaErr: false,
        etaHelperText: "",
      });
     
    } else if (type === "DOC") {
      this.setState({
        DateCreated: date,
        dateCreatedErr: false,
        dateCreatedHelperText: "",
      });
    
  }
}

handleDateValidation = (date, type) => {
  debugger

  if (type === "DOC") {
    this.setState({
      DateCreated: date,
      dateCreatedErr: false,
      dateCreatedHelperText: "",
    });
    if (this.state.ETA !== "")
      if (date < this.state.ETA) {
        this.setState({
          DateCreated: date,
          dateCreatedErr: false,
          dateCreatedHelperText: "",
        });
      }
      else {
        this.setState({
          JoinDate: "",
          joindateErr: true,
          joindateHelperText: "Date Created must be Before ETA",
        });
      }
   
      
  } else if (type === "ETA") {

    this.setState({
      ETA: date,
      etaErr: false,
      etaHelperText: "",
    });
    if (this.state.DOC !== "")
      if (date > this.state.BirthDate) {
        this.setState({
          RelivingDate: date,
          relivingdateErr: false,
          relivingdateHelperText: "",
        });
      }
      else
        if (date != "") {
          this.setState({
            RelivingDate: "",
            relivingdateErr: true,
            relivingdateHelperText: "Reliving Date must be after Date of Birth",
          });
        }
    if (this.state.JoinDate !== "")
      if (date > this.state.JoinDate) {
        this.setState({
          RelivingDate: date,
          relivingdateErr: false,
          relivingdateHelperText: "",
        });
      }
      else
        if (date != "") {
          this.setState({
            RelivingDate: "",
            relivingdateErr: true,
            relivingdateHelperText: "Reliving Date must be after Date of Join",
          });
        }
  } else if (type === "DOB") {
    this.setState({
      BirthDate: date,
      birthdateErr: false,
      birthdateHelperText: "",
    });
    if (this.state.JoinDate !== "")
      if (date < this.state.JoinDate) {
        this.setState({
          BirthDate: date,
          birthdateErr: false,
          birthdateHelperText: "",
        });
      }
      else {
        this.setState({
          BirthDate: "",
          birthdateErr: true,
          birthdateHelperText: "Date of Birth must be before Date of Join",
        });
      }
    if (this.state.RelivingDate !== "")
      if (date < this.state.RelivingDate) {
        this.setState({
          BirthDate: date,
          birthdateErr: false,
          birthdateHelperText: "",
        });
      }
      else {
        this.setState({
          BirthDate: "",
          birthdateErr: true,
          birthdateHelperText: "Date of Birth must be before Date of Reliving",
        });
      }
  }
};
  handleTimeChange = (time, type) => {
    debugger
    if (type === "start_time") {
      this.setState({
        StartTime: time.currentTarget.value,
        starttimeErr: false,
        starttimeHelperText: "",
      });
    } else if (type === "end_time") {
      this.setState({
        EndTime: time.currentTarget.value,
        endtimeErr: false,
        endtimeHelperText: "",
      });
    }
  };
  activeInactiveUser = (e) => {
    this.setState({ Status: e });
    // let data = {
    //   personID: Number(this.props.location.state),
    //   status: this.state.Status.value,
    // };

    // try {
    //   this.setState({ Loading: true });
    //   api
    //     .post("userManagement/activeInactiveUser", data)
    //     .then((res) => {
    //       if (res.success) {
    //         this.getUserDetail();
    //       } else {
    //         cogoToast.error("Something Went Wrong 7");
    //       }
    //     })
    //     .catch((err) => {
    //       cogoToast.error("Something Went Wrong 8");
    //     });
    // } catch (error) {}
  };

  deleteUser = () => {
    this.showLoader();
    var userid = Number(this.props.location.state);
    console.log("innnnn", userid);
    var data = {
      userid: userid,
    };
    api.post("userManagement/deleteUser", data).then((res) => {
      this.hideLoader();
      console.log("res....", res);
      if (res.message === "User is Deleted Successfully") {
        cogoToast.success(res.message);
        this.props.history.push({
          pathname: "/admin/UserList",
          state: {
            filterlist: this.props.history.location.filterlist,
            sortlist: this.props.history.location.sortlist,
          },
        });
      } else {
        cogoToast.error(res.message);
      }
    });
  };
  deleteBookOfWork=()=>{
    this.showLoader();
  }
  saveWork = (redirect) => {
    debugger
    if (this.validate()) {
      try {
        this.showLoader();

       
        debugger
        var data = {};
        var FinalNotes = this.state.notes.filter(
          (x) => x.NoteText !== "" && x.NoteText !== null
        );
        var finalAttachment = [];
        console.log("this.state.Attachments = ", this.state.AttachmentsData)
        console.log("this.state.Attachments = ", this.state.AttachmentsData.length)
        for (var i = 0; i < this.state.AttachmentsData.length; i++) {
          // if (this.state.AttachmentList[i].hasOwnProperty("AttachmentName")) {
            finalAttachment.push(this.state.AttachmentsData[i]);
          // }
        }

        console.log("finalAttachment = ",finalAttachment)
   
        if (CommonConfig.isEmpty(this.state.BookofWorkID) !== true) {
          data = {
            BookofWorkID:this.state.BookofWorkID,
            AssignedBy: this.state.AssignedBy.value,
            Attachments: finalAttachment,
            AssignedTo: this.state.AssignedTo.value,
            DateCreated: moment(this.state.DateCreated).format(CommonConfig.dateFormat.dbDateOnly).toString(),
            WorkName: this.state.WorkName,
            Description: this.state.Description,
            Priority: this.state.Priority.value,
            ETA: this.state.ETA !=""?moment(this.state.ETA).format(CommonConfig.dateFormat.dbDateOnly).toString():"",
            WorkStatus: this.state.Status.value,
            UpdatedBy:CommonConfig.loggedInUserData().PersonID,
            notes:FinalNotes,
          };
      
        }
        else
        data = {
          AssignedBy: this.state.AssignedBy.value,
          AssignedTo: this.state.AssignedTo.value,
          Attachments: finalAttachment,
          DateCreated: moment(this.state.DateCreated).format(CommonConfig.dateFormat.dbDateOnly).toString(),
          WorkName: this.state.WorkName,
          Description: this.state.Description,
          Priority: this.state.Priority.value,
          ETA: this.state.ETA !=""?moment(this.state.ETA).format(CommonConfig.dateFormat.dbDateOnly).toString():"",
          WorkStatus: this.state.Status.value,
          CreatedBy:CommonConfig.loggedInUserData().PersonID,
          notes:FinalNotes,
        };
        console.log("Book Of Work Data",data)
        var formData = new FormData();
        formData.append("data", JSON.stringify(data));

        if (this.state.AttachmentList.length > 0) {
          this.state.AttachmentList.forEach((file) => {
            formData.append("Attachments", file);
          });
        }

        let calledApi =  "contactUs/addBookofWork";

        api
          .post(calledApi, formData)
          .then((res) => {
            if (res.success) {
                      // console.log("res.success",res.success);
                      this.hideLoader();
                      cogoToast.success(res.message);
                      if (redirect) {
                        this.props.history.push({
                          pathname: "/admin/BookofWorkList",
                          state: {
                            filterlist: this.props.history.location.filterlist,
                            sortlist: this.props.history.location.sortlist,
                          },
                        });
                      } else {
                        this.geteditBookofWork();
                      }
            } else {
              cogoToast.error(res.message);
            }
          })
          .catch((err) => {
            this.hideLoader();
            cogoToast.error(err);
          });
      } catch (error) {
        this.hideLoader();
        console.log("SaveUser Error", error);
        cogoToast.error("Something Went Wrong 9");
      }
    } else {
      cogoToast.error("Please correct error and resubmit the form");
    }
  };

  cancelWork = () => {
    this.props.history.push({
      pathname: "/admin/BookofWorkList",
      state: {
        filterlist: this.props.history.location.filterlist,
        sortlist: this.props.history.location.sortlist,
      },
    });
  };

  renderMarkup = () => {
    console.log("this.state.serviceList = ", this.state.serviceList)
    return this.state.serviceList.map((service) => {
      const {
        CountryName,
        ServiceID,
        ServiceType,
        MainServiceName,
        ServiceName,
        DisplayName,
        Markup,
        EnvelopMarkup,
        MarkupType,
        Status
      } = service;

      return (
        <tr key={ServiceID}>
          <td>{CountryName}</td>
          <td>{ServiceType}</td>
          <td>{MainServiceName}</td>
          <td>{ServiceName}</td>
          <td>{DisplayName}</td>
          <td>
            <input
              type="text"
              name="Markup"
              id="Markup"
              className="form-control"
              value={Markup}
              onChange={(event) =>
                this.handledInput(event, ServiceID, MarkupType, "Markup")
              }
              onBlur={(e) =>
                this.handleBlur(e, ServiceID, MarkupType, "Markup")
              }
            />
          </td>
          <td>
            <input
              type="text"
              name="EnvelopMarkup"
              id="EnvelopMarkup"
              className="form-control"
              value={EnvelopMarkup}
              onChange={(event) =>
                this.handledInput(event, ServiceID, MarkupType, "EnvelopMarkup")
              }
              onBlur={(e) =>
                this.handleBlur(e, ServiceID, MarkupType, "EnvelopMarkup")
              }
            />
          </td>
          <td>
            <FormControl fullWidth className={classes.selectFormControl}>
              <Select
                MenuProps={{ className: classes.selectMenu }}
                classes={{ select: classes.select }}
                value={MarkupType}
                inputProps={{
                  name: "simpleSelect",
                  id: "simple-select",
                }}
                onChange={(event) => this.handledropdown(event, ServiceID)}
              >
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected,
                  }}
                  value="Percentage"
                >
                  Percentage
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected,
                  }}
                  value="USD"
                >
                  USD
                </MenuItem>
              </Select>
            </FormControl>
          </td>
          <td>{Status}</td>
        </tr>
      );
    });
  };

  renderModule = () => {
    return this.state.userModules.map((modules) => {
      const {
        ModuleID,
        MenuKey,
        ReadAccess,
        WriteAccess,
        DeleteAccess,
        AllAccess,
        DisplayName,
        WriteUse,
        AllAccessUse,
        DeleteUse,
        ReadUse,
      } = modules;

      return (
        <tr>
          <td>{DisplayName}</td>
          <td>
            {ReadUse ? (
              <div className="inline-element">
                <div className="th-check">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ReadAccess}
                        name={MenuKey}
                        onChange={(event) =>
                          this.handleInputChange(event, "Read")
                        }
                      />
                    }
                    classes={{ label: classes.label, root: classes.labelRoot }}
                  />
                </div>
                <div className="info-text">
                  {" "}
                  <Tooltip title={ReadUse} arrow>
                    <HelpIcon />
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div className="th-check">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ReadAccess}
                      name={MenuKey}
                      onChange={(event) =>
                        this.handleInputChange(event, "Read")
                      }
                    />
                  }
                  classes={{ label: classes.label, root: classes.labelRoot }}
                />
              </div>
            )}
          </td>
          <td>
            {WriteUse ? (
              <div className="inline-element">
                <div className="th-check">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={WriteAccess}
                        name={MenuKey}
                        onChange={(event) =>
                          this.handleInputChange(event, "Write")
                        }
                      />
                    }
                    classes={{ label: classes.label, root: classes.labelRoot }}
                  />
                </div>
                <div className="info-text">
                  {" "}
                  <Tooltip title={WriteUse} arrow>
                    <HelpIcon />
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div className="th-check">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={WriteAccess}
                      name={MenuKey}
                      onChange={(event) =>
                        this.handleInputChange(event, "Write")
                      }
                    />
                  }
                  classes={{ label: classes.label, root: classes.labelRoot }}
                />
              </div>
            )}
          </td>
          <td>
            {DeleteUse ? (
              <div className="inline-element">
                <div className="th-check">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={DeleteAccess}
                        name={MenuKey}
                        onChange={(event) =>
                          this.handleInputChange(event, "Delete")
                        }
                      />
                    }
                    classes={{ label: classes.label, root: classes.labelRoot }}
                  />
                </div>
                <div className="info-text">
                  {" "}
                  <Tooltip title={DeleteUse} arrow>
                    <HelpIcon />
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div className="th-check">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={DeleteAccess}
                      name={MenuKey}
                      onChange={(event) =>
                        this.handleInputChange(event, "Delete")
                      }
                    />
                  }
                  classes={{ label: classes.label, root: classes.labelRoot }}
                />
              </div>
            )}
          </td>
          <td>
            {AllAccessUse ? (
              <div className="inline-element">
                <div className="th-check">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={AllAccess}
                        name={MenuKey}
                        onChange={(event) =>
                          this.handleInputChange(event, "All")
                        }
                      />
                    }
                    classes={{ label: classes.label, root: classes.labelRoot }}
                  />
                </div>
                <div className="info-text">
                  {" "}
                  <Tooltip title={AllAccessUse} arrow>
                    <HelpIcon />
                  </Tooltip>
                </div>
              </div>
            ) : (
              <div className="th-check">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={AllAccess}
                      name={MenuKey}
                      onChange={(event) => this.handleInputChange(event, "All")}
                    />
                  }
                  classes={{ label: classes.label, root: classes.labelRoot }}
                />
              </div>
            )}
          </td>
        </tr>
      );
    });
  };

  handleSearchBack = () => {
    if (this.props.history.location.searchData) {
      window.location.href =
        "/admin/Search/" + this.props.history.location.searchData;
    } else {
      cogoToast.error("Search data not found.");
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
  //  document.getElementById("bookofwork").style.display = "block";
    
  }

  handleDocumentDelete = () => {
    this.showLoader();
    console.log("Records = ", this.state.recordDocument);
    var data = {
      Attachments: this.state.recordDocument,
    };
    api
      .post("userManagement/deleteUserSingleDocument", data)
      .then((res) => {
        if (res.success) {
          debugger;

          if (res.data.data[0].length > 0) {
            var response = res.data.data[0];
            this.state.Attachments.length = 0;

            for (var i = 0; i < response.length; i++) {
              var filesList = response[i];
              filesList.CreatedOn = moment(filesList.CreatedOn).format(
                CommonConfig.dateFormat.dateOnly
              );
              this.state.Attachments.push(filesList);
            }
            this.setState({
              Attachments: [
                ...this.state.Attachments,
                this.state.objAttachment,
              ],
            });
          }
          this.hideLoader();
          //cogoToast.success("Document delete from the Server");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });

    var AttachmentList = this.state.Attachments;
    var Index = AttachmentList.indexOf(this.state.recordDocument);
    AttachmentList[Index]["Status"] = "Inactive";
    this.setState({ Attachments: AttachmentList, delDoc: false });
  };

  zipChange = (zip, type) => {
    debugger
    if (type === "All") {
      if (zip.length) {
        let citydata = {
          "PostalCode": zip,
          "CountryID": this.state.Country.value
        }
        api
          .post(
            "https://hubapi.sflworldwide.com/contactus/SflPostalCode",
            citydata
          )
          .then((res) => {
            if (res.success) {
              console.log("CheckRessData", res);
              if (res.success === true) {
                var IsValidCountry = false;
                let data = res.Data.data;
                // this.hideLoador();
                //  this.CloseDialog();
                //  this.getReferredSite();
                let RecCount = data.length;
                if (RecCount != 0) {
                  var FinalCity = [];
                  var city = "";

                  var countryShortName = data[0].Country
                  for (let i = 0; i < RecCount; i++)
                    FinalCity.push({
                      City_code: data[i].City,
                      CityName: data[i].City,
                    });
                  var SelectedCity = {
                    value: FinalCity[0].City_code,
                    label: FinalCity[0].CityName,
                  };
                  var state = data[0].State;
                  console.log("this.state.toStateList", this.state.toStateList);
                  var SelectedState = { value: state, label: state };
                  if (countryShortName === this.state.Country.label) {
                    this.setState({
                      CityAutoComplete: FinalCity.length ? true : false,
                      StateAutoComplete: this.state.StateList.length ? true : false,
                      GoogleAPICityList: FinalCity,
                      State: this.state.StateList.length ? SelectedState : state,
                      City: SelectedCity,
                    });
                  } else {
                    this.setState({
                      CityAutoComplete: false,
                      StateAutoComplete: this.state.StateList.length ? true : false,
                      GoogleAPICityList: [],
                      State: "",
                      City: "",
                    });
                  }
                  this.hideLoader();
                }
                else {
                  fetch(CommonConfig.zipCodeAPIKey(zip, this.state.Country.label))
                  .then((result) => result.json())
                  .then((data) => {
                    this.showLoader();
                    if (data["status"] === "OK") {
                      if (
                        data["results"][0] &&
                        data["results"][0].hasOwnProperty("postcode_localities")
                      ) {
                        var FinalCity = [];
                        var countryShortName = "";

                        countryShortName = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            return data.types[0] === "country";
                          }
                        )[0].long_name;
                        var CityData = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            if (data.types[0] == "locality") {
                              return data.types[0] === "locality";
                            }
                          }
                        );

                        var CityData2 = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            if (data.types[0] == "neighborhood") {
                              return data.types[0] === "neighborhood";
                            }
                          }
                        );

                        var CityData3 = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            if (data.types[0] == "administrative_area_level_2") {
                              return data.types[0] === "administrative_area_level_2";
                            }
                          }
                        );

                        var CityData4 = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            if (data.types[0] == "administrative_area_level_1") {
                              return data.types[0] === "administrative_area_level_1";
                            }
                          }
                        );

                        if (CityData.length > 0) {
                          CityData = CityData[0].long_name;
                          FinalCity.push({
                            City_code: CityData,
                            Name: CityData,
                          });
                          var SelectedCity = {
                            value: FinalCity[0].City_code,
                            label: FinalCity[0].Name,
                          };
                        } else if (CityData2.length > 0) {
                          CityData2 = CityData2[0].long_name;
                          FinalCity.push({
                            City_code: CityData2,
                            Name: CityData2,
                          });
                          var SelectedCity = {
                            value: FinalCity[0].City_code,
                            label: FinalCity[0].Name,
                          };
                        } else if (CityData3.length > 0) {
                          CityData3 = CityData3[0].long_name;
                          FinalCity.push({
                            City_code: CityData3,
                            Name: CityData3,
                          });
                          var SelectedCity = {
                            value: FinalCity[0].City_code,
                            label: FinalCity[0].Name,
                          };
                        } else if (CityData4.length > 0) {
                          CityData4 = CityData4[0].long_name;
                          FinalCity.push({
                            City_code: CityData4,
                            Name: CityData4,
                          });
                          var SelectedCity = {
                            value: FinalCity[0].City_code,
                            label: FinalCity[0].Name,
                          };
                        }

                        var state = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            return data.types[0] === "administrative_area_level_1";
                          }
                        )[0].long_name;
                        var SelectedState = { value: state, label: state };

                        if (countryShortName === this.state.Country.label) {
                          this.setState({
                            CityAutoComplete: FinalCity.length ? true : false,
                            StateAutoComplete: this.state.StateList.length ? true : false,
                            GoogleAPICityList: FinalCity,
                            State: this.state.StateList.length ? SelectedState : state,
                            City: SelectedCity,
                          });
                        } else {
                          this.setState({
                            CityAutoComplete: false,
                            StateAutoComplete: this.state.StateList.length ? true : false,
                            GoogleAPICityList: [],
                            State: "",
                            City: "",
                          });
                        }
                        this.hideLoader();
                      } else if (data["results"][0]) {
                        var FinalCity = [];
                        var city = "";
                        var countryShortName = "";

                        countryShortName = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            return data.types[0] === "country";
                          }
                        )[0].long_name;

                        if (
                          city == "" &&
                          _.filter(data["results"][0]["address_components"], function (
                            data
                          ) {
                            return data.types[0] === "locality";
                          }).length > 0
                        ) {
                          city = _.filter(
                            data["results"][0]["address_components"],
                            function (data) {
                              return data.types[0] === "locality";
                            }
                          )[0].short_name;
                        } else if (
                          city == "" &&
                          _.filter(data["results"][0]["address_components"], function (
                            data
                          ) {
                            return data.types[0] === "administrative_area_level_3";
                          }).length > 0
                        ) {
                          city = _.filter(
                            data["results"][0]["address_components"],
                            function (data) {
                              return data.types[0] === "administrative_area_level_3";
                            }
                          )[0].short_name;
                        } else if (
                          city == "" &&
                          _.filter(data["results"][0]["address_components"], function (
                            data
                          ) {
                            return data.types[0] === "political";
                          }).length > 0
                        ) {
                          city = _.filter(
                            data["results"][0]["address_components"],
                            function (data) {
                              return data.types[0] === "political";
                            }
                          )[0].short_name;
                        } else if (
                          city == "" &&
                          _.filter(data["results"][0]["address_components"], function (
                            data
                          ) {
                            return data.types[0] === "neighborhood";
                          }).length > 0
                        ) {
                          city = _.filter(
                            data["results"][0]["address_components"],
                            function (data) {
                              return data.types[0] === "neighborhood";
                            }
                          )[0].short_name;
                        } else if (
                          city == "" &&
                          _.filter(data["results"][0]["address_components"], function (
                            data
                          ) {
                            return data.types[0] === "administrative_area_level_2";
                          }).length > 0
                        ) {
                          city = _.filter(
                            data["results"][0]["address_components"],
                            function (data) {
                              return data.types[0] === "administrative_area_level_2";
                            }
                          )[0].long_name;
                        } else if (
                          city == "" &&
                          _.filter(data["results"][0]["address_components"], function (
                            data
                          ) {
                            return data.types[0] === "administrative_area_level_1";
                          }).length > 0
                        ) {
                          city = _.filter(
                            data["results"][0]["address_components"],
                            function (data) {
                              return data.types[0] === "administrative_area_level_1";
                            }
                          )[0].long_name;
                        } else if (city == "") {
                          city = "";
                        }

                        var state = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            return data.types[0] === "administrative_area_level_1";
                          }
                        )[0].long_name;

                        FinalCity.push({
                          City_code: city,
                          Name: city,
                        });

                        var SelectedCity = {
                          value: FinalCity[0].City_code,
                          label: FinalCity[0].Name,
                        };

                        var SelectedState = { value: state, label: state };

                        if (countryShortName === this.state.Country.label) {
                          this.setState({
                            CityAutoComplete: FinalCity.length ? true : false,
                            StateAutoComplete: this.state.StateList.length ? true : false,
                            GoogleAPICityList: FinalCity,
                            State: this.state.StateList.length ? SelectedState : state,
                            City: SelectedCity,
                          });
                        } else {
                          this.setState({
                            CityAutoComplete: false,
                            StateAutoComplete: this.state.StateList.length ? true : false,
                            GoogleAPICityList: [],
                            State: "",
                            City: "",
                          });
                        }
                        this.hideLoader();


                      }
                      if (this.state.Country.label == "United States" || this.state.Country.label == "India" || this.state.Country.label == "Canada") {

                        var newZipcodedata = {
                          "Pincode": zip,
                          "PickupCityList": SelectedCity.label,
                          "CountryID": this.state.Country.value,
                          "CountryName": this.state.Country.label,
                          "StateName": state,

                        };
                        console.log("newZipcodedata", newZipcodedata);
                        api
                          .post(
                            "https://hubapi.sflworldwide.com/contactus/SflInsertPostalCode",
                            newZipcodedata
                          )
                          .then((res) => {
                            if (res.success) {
                              console.log("CheckRessData", res);
                              if (res.success === true) {

                                console.log("New Zipcode Enter Successfully");
                              } else {
                                console.log("Something Went Wrong 10");
                              }
                            }
                          })
                          .catch((err) => {
                            console.log("err...", err);

                          });
                      }
                    } else {
                      this.setState({
                        CityAutoComplete: false,
                        StateAutoComplete: this.state.StateList.length ? true : false,
                        GoogleAPICityList: [],
                        State: "",
                        City: "",
                      });
                      this.hideLoader();
                    }
                  });
                }
              }
            }
          });
      }
    }
    else if (type === "Usertype") {
      if (zip.length) {
        let citydata = {
          "PostalCode": zip,
          "CountryID": this.state.UsertypeCountry.value
        }
        api
          .post(
            "https://hubapi.sflworldwide.com/contactus/SflPostalCode",
            citydata
          )
          .then((res) => {
            if (res.success) {
              console.log("CheckRessData", res);
              if (res.success === true) {
                var IsValidCountry = false;
                let data = res.Data.data;
                // this.hideLoador();
                //  this.CloseDialog();
                //  this.getReferredSite();
                let RecCount = data.length;
                if (RecCount != 0) {
                  var FinalCity = [];
                  var city = "";

                  var countryShortName = data[0].Country
                  for (let i = 0; i < RecCount; i++)
                    FinalCity.push({
                      City_code: data[i].City,
                      CityName: data[i].City,
                    });
                  var SelectedCity = {
                    value: FinalCity[0].City_code,
                    label: FinalCity[0].CityName,
                  };
                  var state = data[0].State;
                  console.log("this.state.toStateList", this.state.toStateList);
                  var SelectedState = { value: state, label: state };
                  if (countryShortName === this.state.UsertypeCountry.label) {
                    this.setState({
                      UsertypeCityAutoComplete: FinalCity.length ? true : false,
                      UsertypeStateAutoComplete: this.state.UsertypeStateList.length ? true : false,
                      UsertypeGoogleAPICityList: FinalCity,
                      UsertypeState: this.state.UsertypeStateList.length ? SelectedState : state,
                      UsertypeCity: SelectedCity,
                    });
                  } else {
                    this.setState({
                      UsertypeCityAutoComplete: false,
                      UsertypeStateAutoComplete: this.state.UsertypeStateList.length ? true : false,
                      UsertypeGoogleAPICityList: [],
                      UsertypeState: "",
                      UsertypeCity: "",
                    });
                  }
                  this.hideLoader();
                }
                else {
                  fetch(CommonConfig.zipCodeAPIKey(zip, this.state.UsertypeCountry.label))
                  .then((result) => result.json())
                  .then((data) => {
                    this.showLoader();
                    if (data["status"] === "OK") {
                      if (
                        data["results"][0] &&
                        data["results"][0].hasOwnProperty("postcode_localities")
                      ) {
                        var FinalCity = [];
                        var countryShortName = "";

                        countryShortName = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            return data.types[0] === "country";
                          }
                        )[0].long_name;
                        var CityData = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            if (data.types[0] == "locality") {
                              return data.types[0] === "locality";
                            }
                          }
                        );

                        var CityData2 = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            if (data.types[0] == "neighborhood") {
                              return data.types[0] === "neighborhood";
                            }
                          }
                        );

                        var CityData3 = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            if (data.types[0] == "administrative_area_level_2") {
                              return data.types[0] === "administrative_area_level_2";
                            }
                          }
                        );

                        var CityData4 = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            if (data.types[0] == "administrative_area_level_1") {
                              return data.types[0] === "administrative_area_level_1";
                            }
                          }
                        );

                        if (CityData.length > 0) {
                          CityData = CityData[0].long_name;
                          FinalCity.push({
                            City_code: CityData,
                            Name: CityData,
                          });
                          var SelectedCity = {
                            value: FinalCity[0].City_code,
                            label: FinalCity[0].Name,
                          };
                        } else if (CityData2.length > 0) {
                          CityData2 = CityData2[0].long_name;
                          FinalCity.push({
                            City_code: CityData2,
                            Name: CityData2,
                          });
                          var SelectedCity = {
                            value: FinalCity[0].City_code,
                            label: FinalCity[0].Name,
                          };
                        } else if (CityData3.length > 0) {
                          CityData3 = CityData3[0].long_name;
                          FinalCity.push({
                            City_code: CityData3,
                            Name: CityData3,
                          });
                          var SelectedCity = {
                            value: FinalCity[0].City_code,
                            label: FinalCity[0].Name,
                          };
                        } else if (CityData4.length > 0) {
                          CityData4 = CityData4[0].long_name;
                          FinalCity.push({
                            City_code: CityData4,
                            Name: CityData4,
                          });
                          var SelectedCity = {
                            value: FinalCity[0].City_code,
                            label: FinalCity[0].Name,
                          };
                        }

                        var state = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            return data.types[0] === "administrative_area_level_1";
                          }
                        )[0].long_name;
                        var SelectedState = { value: state, label: state };

                        if (countryShortName === this.state.Country.label) {
                          this.setState({
                            UsertypeCityAutoComplete: FinalCity.length ? true : false,
                            StateAutoComplete: this.state.StateList.length ? true : false,
                            GoogleAPICityList: FinalCity,
                            State: this.state.StateList.length ? SelectedState : state,
                            City: SelectedCity,
                          });
                        } else {
                          this.setState({
                            UsertypeCityAutoComplete: false,
                            StateAutoComplete: this.state.StateList.length ? true : false,
                            GoogleAPICityList: [],
                            State: "",
                            City: "",
                          });
                        }
                        this.hideLoader();
                      } else if (data["results"][0]) {
                        var FinalCity = [];
                        var city = "";
                        var countryShortName = "";

                        countryShortName = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            return data.types[0] === "country";
                          }
                        )[0].long_name;

                        if (
                          city == "" &&
                          _.filter(data["results"][0]["address_components"], function (
                            data
                          ) {
                            return data.types[0] === "locality";
                          }).length > 0
                        ) {
                          city = _.filter(
                            data["results"][0]["address_components"],
                            function (data) {
                              return data.types[0] === "locality";
                            }
                          )[0].short_name;
                        } else if (
                          city == "" &&
                          _.filter(data["results"][0]["address_components"], function (
                            data
                          ) {
                            return data.types[0] === "administrative_area_level_3";
                          }).length > 0
                        ) {
                          city = _.filter(
                            data["results"][0]["address_components"],
                            function (data) {
                              return data.types[0] === "administrative_area_level_3";
                            }
                          )[0].short_name;
                        } else if (
                          city == "" &&
                          _.filter(data["results"][0]["address_components"], function (
                            data
                          ) {
                            return data.types[0] === "political";
                          }).length > 0
                        ) {
                          city = _.filter(
                            data["results"][0]["address_components"],
                            function (data) {
                              return data.types[0] === "political";
                            }
                          )[0].short_name;
                        } else if (
                          city == "" &&
                          _.filter(data["results"][0]["address_components"], function (
                            data
                          ) {
                            return data.types[0] === "neighborhood";
                          }).length > 0
                        ) {
                          city = _.filter(
                            data["results"][0]["address_components"],
                            function (data) {
                              return data.types[0] === "neighborhood";
                            }
                          )[0].short_name;
                        } else if (
                          city == "" &&
                          _.filter(data["results"][0]["address_components"], function (
                            data
                          ) {
                            return data.types[0] === "administrative_area_level_2";
                          }).length > 0
                        ) {
                          city = _.filter(
                            data["results"][0]["address_components"],
                            function (data) {
                              return data.types[0] === "administrative_area_level_2";
                            }
                          )[0].long_name;
                        } else if (
                          city == "" &&
                          _.filter(data["results"][0]["address_components"], function (
                            data
                          ) {
                            return data.types[0] === "administrative_area_level_1";
                          }).length > 0
                        ) {
                          city = _.filter(
                            data["results"][0]["address_components"],
                            function (data) {
                              return data.types[0] === "administrative_area_level_1";
                            }
                          )[0].long_name;
                        } else if (city == "") {
                          city = "";
                        }

                        var state = _.filter(
                          data["results"][0]["address_components"],
                          function (data) {
                            return data.types[0] === "administrative_area_level_1";
                          }
                        )[0].long_name;

                        FinalCity.push({
                          City_code: city,
                          Name: city,
                        });

                        var SelectedCity = {
                          value: FinalCity[0].City_code,
                          label: FinalCity[0].Name,
                        };

                        var SelectedState = { value: state, label: state };

                        if (countryShortName === this.state.Country.label) {
                          this.setState({
                            CityAutoComplete: FinalCity.length ? true : false,
                            StateAutoComplete: this.state.StateList.length ? true : false,
                            GoogleAPICityList: FinalCity,
                            State: this.state.StateList.length ? SelectedState : state,
                            City: SelectedCity,
                          });
                        } else {
                          this.setState({
                            CityAutoComplete: false,
                            StateAutoComplete: this.state.StateList.length ? true : false,
                            GoogleAPICityList: [],
                            State: "",
                            City: "",
                          });
                        }
                        this.hideLoader();


                      }
                      if (this.state.Country.label == "United States" || this.state.Country.label == "India" || this.state.Country.label == "Canada") {

                        var newZipcodedata = {
                          "Pincode": zip,
                          "PickupCityList": SelectedCity.label,
                          "CountryID": this.state.Country.value,
                          "CountryName": this.state.Country.label,
                          "StateName": state,

                        };
                        console.log("newZipcodedata", newZipcodedata);
                        api
                          .post(
                            "https://hubapi.sflworldwide.com/contactus/SflInsertPostalCode",
                            newZipcodedata
                          )
                          .then((res) => {
                            if (res.success) {
                              console.log("CheckRessData", res);
                              if (res.success === true) {

                                console.log("New Zipcode Enter Successfully");
                              } else {
                                console.log("Something Went Wrong 11");
                              }
                            }
                          })
                          .catch((err) => {
                            console.log("err...", err);

                          });
                      }
                    } else {
                      this.setState({
                        CityAutoComplete: false,
                        StateAutoComplete: this.state.StateList.length ? true : false,
                        GoogleAPICityList: [],
                        State: "",
                        City: "",
                      });
                      this.hideLoader();
                    }
                  });
                }
              }
            }
          });
      }
    }

  };

  viewNotes = () => {
    return this.state.notes
      .filter((x) => x.Status === "Active")
      .map((notes, idx) => {
        return (
          <tr>
            <td style={{ width: "154px" }}>
              {momentTimezone(notes.CreatedOn)
                .tz(CommonConfig.UStimezone)
                .format(CommonConfig.dateFormat.dateTime)}
            </td>
            <td>
              {notes.disabled ? (
                <p
                  id="noteText"
                  dangerouslySetInnerHTML={{
                    __html: notes.NoteText.replace(/\r?\n/g, "<br />"),
                  }}
                ></p>
              ) : (
                <div className="table-textarea">
                  <textarea
                    name="NoteText"
                    disabled={notes.disabled}
                    value={notes.NoteText}
                    onChange={(event) =>
                      this.handleChangeNotes(event, notes.Index)
                    }
                  ></textarea>
                </div>
              )}
            </td>
            <td className="pck-action-column">
              <div className="pck-subbtn">
                {/* {this.state.DeleteAccess === 1? */}
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn "
                  onClick={() => this.handleNotesRemoveRow(notes.Index)}
                  disabled={this.state.notesDisabled}
                >
                  <i className={"fas fa-minus"} />
                </Button>
                {this.state.notes.filter((x) => x.Status === "Active")
                  .length ===
                idx + 1 ? (
                  <Button
                    justIcon
                    color="facebook"
                    onClick={() => this.handleAddNotesRow()}
                    className="Plus-btn "
                  >
                    <i className={"fas fa-plus"} />
                  </Button>
                ) : null}
                <Tooltip title={notes.CreatedByNote} arrow>
                  <Button
                    className="Plus-btn info-icon"
                    justIcon
                    color="twitter"
                  >
                    <InfoIcon />
                  </Button>
                </Tooltip>
              </div>
            </td>
          </tr>
        );
      });
  };

  showDiv = (type, packageType) => {
    this.setState({
      [type]: true,
    });
   
    if (
      packageType === "NotesVisible" &&
      this.state.notes.filter((x) => x.Status === "Active").length === 0
    ) {
      this.handleAddNotesRow();
    }
  };
  handleZipBlur = (e, type) => {
    if (type === "zip") {
      this.zipChange(e.target.value, "All");
    }
    else if (type === "Usertypezip") {
      this.zipChange(e.target.value, "Usertype");
    }
  };

  ChangeInput = (value, type) => {debugger
    if (value !== null) {
      if (type === "AssignedBy") {
        this.setState({ AssignedBy: value });
        this.getStates(value, "All");
      } else if (type === "AssignedTo") {
        this.setState({ AssignedTo: value });
      } else if (type === "Priority") {
        this.setState({ Priority: value });
      } else if (type === "Status") {
        this.setState({ Status: value });
        
      }
    }

  };
  addRowBank = (e, index) => {
    debugger
    console.log("this.state.bankList", this.state.bankList);
  
    if (e == 0)
      this.setState({ bankList: [...this.state.bankList, row] });
    else
      if (this.state.bankList[index - 1].AccountType != "")
        this.setState({ bankList: [...this.state.bankList, row] });
      else
        cogoToast.error("Please Fill Account Details before add new row.");


  };
  removeBank = (index) => {
    if (this.state.bankList.length == 1 && index == 0)
      cogoToast.error("This row cannot be deleted.");
    else {
      var BankList = this.state.bankList;
      let Index = this.state.bankList.findIndex((x) => x.Index === index);
      if (Index !== -1) {
        if (BankList[Index].AccountType == "" && BankList[Index].AccountType == "" && BankList[Index].AccountNumber == "" &&
          BankList[Index].BankName == "" && BankList[Index].NameonAccount == "" && BankList[Index].RoutingNumber == "")
          BankList.pop();
        else {
          BankList[Index]["Status"] = "Inactive";

        }
        this.setState({ bankList: BankList });
        if (BankList.filter((x) => x.Status === "Active").length === 0) {
          this.setState({
            isPaymentMethodBank: false,
          });
        }
      }
    }
  };
  handleChangeBank = (event, type, index) => {
    debugger
    const { value } = event.target;
    const bankList = this.state.bankList;
    let idx = bankList.findIndex((x) => x.Index === index);
    if (type === "AccountType") {
      bankList[idx][type] = event.target.outerText;
    }
    else
    if (type === "RoutingNumber" || type === "AccountNumber") {
      bankList[idx][type] = value;/*value.replace(/\D/g, "");*/
    } else if (type === "InvoiceAmount") {
      if (value.match(/^[-+]?\d{0,}(\.\d{0,2})?$/) || value === "") {
        bankList[idx][type] = value;
      }
    } else {
      bankList[idx][type] = value;
    }
    this.setState({ bankList: bankList });
  };
  viewBankList = () => {
    const AccountTypeDrop = this.state.AccountTypeList.map((type) => {
      return { value: type.Description, label: type.Description };
    });
    return this.state.bankList
      .filter((x) => x.Status === "Active")
      .map((method, idx) => {
        const AccountType = {
          value: method.AccountType,
          label: method.AccountType,
        }

        return (
          <tr>
            <td className="wd-date wd-100">
              {/* <div className="package-select">
              <CustomInput
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeBank(event, "AccountType", method.Index),
                  value: method.AccountType,
                }}
              />
              </div> */}
              <div className="package-select">
                <Autocomplete
                  id="AccountType"
                  options={AccountTypeDrop}
                  value={AccountType}
                  disabled={this.state.Access.WriteAccess === 1 ? false : true}
                  getOptionLabel={(option) => option.label}

                  onChange={(event) =>
                    this.handleChangeBank(event, "AccountType", method.Index)
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </td>
            <td className="input-full">
              <CustomInput
                className="mr-5"
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeBank(event, "BankName", method.Index),
                  value: method.BankName,
                }}
              />
            </td>
            <td style={{ width: "197px" }} className="wd-full input-full">
              <CustomInput
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeBank(event, "NameonAccount", method.Index),
                  value: method.NameonAccount,

                }}
              />
            </td>
            <td style={{ width: "186px" }}>
              <div className="pck-nowrap-input">
                <CustomInput
                  className="mr-5"
                  inputProps={{
                    onChange: (event) =>
                      this.handleChangeBank(
                        event,
                        "AccountNumber",
                        method.Index
                      ),
                    value: method.AccountNumber,
                  }}
                />
              </div>
            </td>
            

            <td style={{ width: "156px" }} className="input-full">
              <CustomInput
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeBank(event, "RoutingNumber", method.Index),
                  value: method.RoutingNumber,

                }}
              />
            </td>

            <td className="pck-action-column">

              <Button
                justIcon
                color="danger"
                className="Plus-btn"
                onClick={() => this.removeBank(method.Index)}
              >
                <i className={"fas fa-minus"} />
              </Button>

              {this.state.bankList.filter((x) => x.Status === "Active")
                .length ===
                idx + 1 ? (
                <Button
                  justIcon
                  color="facebook"
                  onClick={() => this.addRowBank(1, method.Index)}
                  className="Plus-btn "
                >
                  <i className={"fas fa-plus"} />
                </Button>
              ) : null}



            </td>
          </tr>
        );
      });
  };


  render() {
    const {
      isNotesVisible,
      AssignedBy,
      AssignedTo,
      WorkName,
     Description,
      Priority,
      Status,
      ETA,
      DefectId,
      AssignedBySelected,
     
    } = this.state;

    const assignedByDrop = this.state.assignedByList.map((type) => {
      return { value: type.UserID, label: type.Name };
    });

     const statusDrop =  this.state.WorkStatusList.map((type) => {
     return { value: type.Description, label: type.Description };
    });
    const priotiryDrop =  this.state.PriorityList.map((type) => {
      return { value: type.Description, label: type.Description };
     });
    
    const paperSize = this.state.PaperSizeList.map((type) => {
      return { value: type.ID, label: type.PaperDisplayName };
    });
 

    const userstatus = this.state.UserStatusList.map((type) => {
      return { value: type.value, label: type.label };
    });



   
    return (
      <div>
        <GridContainer className="MuiGrid-justify-xs-center">
       
            <div className="shipment-content mt-30">
                  <div className="shipment-pane mt-20" id="bookofwork">
                  <Card>
                    <CardHeader className="btn-right-outer" color="primary" icon>
                      <CardIcon color="primary">
                        <Adduser />
                      </CardIcon>
                      <h4 className="margin-right-auto text-color-black">
                        Book of Work
                      </h4>
                    </CardHeader>
                    <Cardbody>
                      <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                            labelText={<span>Defect ID</span>}
                            id="DefectId"
                            name="DefectId"
                            variant="outlined"
                            disabled="true"
                            error={this.state.defectIdErr}
                            helperText={this.state.defectIdHelperText}
                            formControlProps={{ fullWidth: true }}
                            inputProps={{
                              onFocus: () =>
                                this.setState({
                                  checkDefectId: false,
                                  defectIdErr: false,
                                  defectIdHelperText: "",
                                }),
                              onBlur: (event) =>
                                this.handleChangeValidation(event, "DefectId"),
                              onChange: (event) =>
                                this.handleChange(event, "DefectId"),
                              value: DefectId,
                              endAdornment:
                                this.state.checkcompanyName !== true ? (
                                  <Icon>work</Icon>
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
                      <GridItem xs={12} sm={12} md={3}>
          
                          <Autocomplete
                            id="AssignedBy"
                            options={assignedByDrop}
                            value={AssignedBy}
                            onChange={(event, value) =>
                              this.ChangeInput(value, "AssignedBy")
                            }
                            onFocus={(event, value) =>
                              this.setState({assignedByErr:"",assignedByHelperText:""})
                            }
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                              <TextField {...params} label="Assigned By*"
                                error={this.state.assignedByErr}
                                helperText={this.state.assignedByHelperText}
                                fullWidth />
                            )}
                          />
                      </GridItem>

                        <GridItem xs={12} sm={12} md={3}>
                          <Autocomplete
                            id="AssignedTo"
                            options={assignedByDrop}
                            value={AssignedTo}
                            onChange={(event, value) =>
                              this.ChangeInput(value, "AssignedTo")
                            }
                            onFocus={(event, value) =>
                              this.setState({assignedToErr:"",assignedToHelperText:""})
                            }
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                              <TextField {...params} label="Assigned To*"
                                error={this.state.assignedToErr}
                                helperText={this.state.assignedToHelperText}
                                fullWidth />
                            )}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <div className="dt-vs date-spl">
                            <FormControl fullWidth>
                              <Datetime
                                dateFormat={"MM/DD/YYYY"}
                                timeFormat={false}
                                startDate={"08/01/2024"}
                                selected={this.state.DateCreated}
                                value={this.state.DateCreated}
                                inputProps={{ placeholder: "Date Created" }}
                                onChange={(date) =>
                                  this.handleDateChange(date, "DOC")
                                }
                                onBlur={(date) =>
                                  this.handleDateValidation(date, "DOC")
                                }
                                closeOnSelect={true}
                                renderInput={(params) => (
                                  <TextField
                                    style={{ marginTop: "-15px" }}
                                    error={this.state.dateCreatedErr}
                                    helperText={this.state.dateCreatedHelperText}
                                    inputProps={{ min: moment().format("YYYY-MM-DD")}}
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
                        
                      </GridContainer>
                      <GridContainer className="mt-20">
                      <GridItem xs={12} sm={12} md={3}>
                         
                         <Autocomplete
                           options={statusDrop}
                           id="Status"
                           autoSelect
                           getOptionLabel={(option) => option.label}
                           value={Status}
                           onChange={(event, value) =>
                             this.ChangeInput( value, "Status")
                           }
                           onFocus={(event, value) =>
                             this.setState({statusErr:"",statusHelperText:""})
                           }
                           renderInput={(params) => (
                             <TextField {...params} label="Status*"
                             margin="normal"
                             error={this.state.statusErr}
                             helperText={this.state.statusHelperText}
                             fullWidth />
                            
                           )}
                         />
                     
                     </GridItem>

                     <GridItem xs={12} sm={12} md={3}>
                          <Autocomplete
                            options={priotiryDrop}
                            id="Priority"
                            getOptionLabel={(option) => option.label}
                            value={Priority}
                            autoSelect
                            onChange={(event, value) =>
                              this.ChangeInput(value, "Priority")
                            }
                            onFocus={(event, value) =>
                              this.setState({priorityErr:"",priorityHelperText:""})
                            }
                            renderInput={(params) => (
                              <TextField {...params} label="Priority*"
                                error={this.state.priorityErr}
                                helperText={this.state.priorityHelperText}
                                fullWidth />
                            )}
                          />
                        </GridItem>     
                        <GridItem xs={12} sm={12} md={3}>
                          <div className="dt-vs date-spl">
                              <FormControl fullWidth>
                                <Datetime
                                  dateFormat={"MM/DD/YYYY"}
                                  timeFormat={false}
                                  selected={ETA}
                                  value={ETA}
                                  inputProps={{ placeholder: "ETA" }}
                                  onChange={(date) =>
                                    this.handleDateChange(date, "ETA")
                                  }
                                  onBlur={(date) =>
                                    this.handleDateValidation(date, "ETA")
                                  }
                                  closeOnSelect={true}
                                  renderInput={(params) => (
                                    <TextField
                                      style={{ marginTop: "-15px" }}
                                      error={this.state.etaErr}
                                      helperText={this.state.etaHelperText}
                                      {...params}
                                      label="ETA"
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
                        <CustomInput
                            labelText={<span>Work Name</span>}
                            id="WorkName"
                            name="WorkName"
                            variant="outlined"
                            error={this.state.workNameErr}
                            helperText={this.state.workNameHelperText}
                            formControlProps={{ fullWidth: true }}
                            inputProps={{
                              onFocus: () =>
                                this.setState({
                                  checkWorkName: false,
                                  workNameErr: false,
                                  workNameHelperText: "",
                                }),
                              onBlur: (event) =>
                                this.handleChangeValidation(event, "WorkName"),
                              onChange: (event) =>
                                this.handleChange(event, "WorkName"),
                              value: WorkName,
                              endAdornment:
                                this.state.checkcompanyName !== true ? (
                                  <Icon>work</Icon>
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
                      <GridContainer>
                      <GridItem xs={8} sm={8} md={8}>
                          <div className="material-textarea">
                           <label className="mui-custom-label">Description</label>
                            <textarea
                           
                              name="Description"
                            //  disabled={notes.disabled}
                              value={Description}
                              onChange={(event) =>
                                this.handleChangeDes(event/*, notes.Index*/)
                              }
                            ></textarea>
                            
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <div>

                          {this.state.Attachment !="" && this.state.Attachment !=null ? (
                            <div>
                              <a
                                href={fileBase + this.state.Attachment}
                                className="normal-btn sm-orange"
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                View File
                              </a>
                           </div>

                          ):
                          <div>
                          
                            <div className="file-upload-input">
                              <label className="mui-custom-label">Upload a File    :</label>
                              <div className="fui-inner"> 
                                <span>Browse</span>
                                <input
                                  type="file"
                                  name="selectedfile"
                                  id="file"
                                  onChange={(event) => this.fileUpload(event)}
                                />
                                <p>{this.stringTruncate(this.state.Attachments.AttachmentName)}</p>  
                              </div>
                            </div>
                            
                        </div>
                          }

               </div>
                        </GridItem>
                        
                      </GridContainer>
                     
                   
                    </Cardbody>
                  </Card>
                  <Card>
                      <CardHeader className="btn-right-outer" color="primary" icon>
                        <CardIcon color="primary">
                          <Note />
                        </CardIcon>
                        <h4 className="margin-right-auto text-color-black">Notes</h4>
                        <div style={{ textAlign: "right", marginTop: "12px" }}>
                          {this.state.notes.filter((x) => x.Status === "Active")
                            .length === 0 ? (
                            // <i onClick={() => this.showDiv("isInvoiceVisible","Invoice")} class="fas fa-car"></i>
                            // <img
                            //   style={{ width: "32px", marginLeft: "20px" }}
                            //   src={carSVG}
                            //   onClick={() =>
                            //     this.showDiv("isNotesVisible", "NotesVisible")
                            //   }
                            // />
                            <Button
                              onClick={() =>
                                this.showDiv("isNotesVisible", "NotesVisible")
                              }
                              style={{ width: "70px", height: "20px" }}
                              color="primary"
                            >
                              Open
                            </Button>
                          ) : null}
                        </div>
                      </CardHeader>

                      <div className="notes-table">
                        {isNotesVisible ? (
                          <div className="package-table">
                            <table>
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Comments</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>{this.viewNotes()}</tbody>
                            </table>
                          </div>
                        ) : null}
                      </div>
                  </Card>
                 
                  </div>
                </div>
              

            <div className="shipment-submit">

              {CommonConfig.getUserAccess("User Management").DeleteAccess === 1 ? (
                <div className="left">
                  <Button
                    justify="center"
                    color="danger"
                    onClick={() => this.deleteBookOfWork()}
                  >
                    Delete
                  </Button>
                </div>
              ) : null}


              {CommonConfig.getUserAccess("User Management").WriteAccess === 1 && (CommonConfig.loggedInUserData().PersonID == this.props.location.state) ? (
                <div className="right">

                  {/* <div> */}
                  {CommonConfig.isEmpty(this.props.location.state) ? null : (
                    <Button color="rose" onClick={() => this.saveWork(false)}>
                      Save
                    </Button>
                  )}
                  <Button color="primary" onClick={() => this.saveWork(true)}>
                    Save & Exit
                  </Button>
                  {/* </div> */}


                  <Button color="secondary" onClick={() => this.cancelUser()}>
                    Cancel
                  </Button>
                </div>
              ) :
                CommonConfig.getUserAccess("User Management").WriteAccess === 1 && CommonConfig.getUserAccess("User Management").AllAccess === 1 ? (
                  <div className="right">

                    {/* <div> */}
                    {CommonConfig.isEmpty(this.props.location.state) ? null : (
                      <Button color="rose" onClick={() => this.saveWork(false)}>
                        Save
                      </Button>
                    )}
                    <Button color="primary" onClick={() => this.saveWork(true)}>
                      Save & Exit
                    </Button>
                    {/* </div> */}


                    <Button color="secondary" onClick={() => this.cancelWork()}>
                      Cancel
                    </Button>
                  </div>
                ) :
                  <div className="right">
                    <Button color="secondary" onClick={() => this.cancelWork()}>
                      Cancel
                    </Button>
                  </div>
              }


            </div>


            <div>
              <Dialog
                open={this.state.delDoc}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Confirm Delete
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure want to delete?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => this.setState({ delDoc: false })}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  {this.state.Access.DeleteAccess === 1 ? (
                    <Button
                      onClick={() => this.handleDocumentDelete()}
                      color="primary"
                      autoFocus
                    >
                      Delete
                    </Button>
                  ) : null}
                </DialogActions>
              </Dialog>
            </div>

          
        </GridContainer>
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}
      </div>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object,
};

export default withStyles()(Step1);
