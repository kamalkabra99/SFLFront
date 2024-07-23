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
import { fileBase } from "../../utils/config";
import { Attachment } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Datetime from "react-datetime";
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
          stepName: "User Details",
          stepId: "userdetails",
          classname: "active",
        },
        {
          stepName: "Access Details",
          stepId: "accessdetails",
          classname: "inactive",
        },
        {
          stepName: "Markup Details",
          stepId: "markupdetails",
          classname: "inactive",
        },
        {
          stepName: "Documentation",
          stepId: "documentation",
          classname: "inactive",
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
      usertypeTimeZone:"",
      usertypeTimeZoneErr:"",
      usertypeTimeZoneHelperText:"",

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
      UsertypeCurrency:"",
      userTypeDepartment:"",
      usertypeDepartmentList: [
        {
          label: "IT",
          value: "IT",
        },
        {
          label: "SALES",
          value: "SALES",
        },
        {
          label: "DESIGNING",
          value: "DESIGNING",
        }, 
        {
          label: "ACCOUNTS",
          value: "ACCOUNTS",
        },
        {
          label: "MANAGEMENT",
          value: "MANAGEMENT",
        },
        {
          label: "HR",
          value: "HR",
        },
        
       
      ],
      userType:"",
      userTypeHelperText:"",
      userTypeErr:"",
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
      userTypeTimeZone:"",

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
      EmployeementID:"",
      department:"",
      employeeId:"",
      Password: "",
      Mobile: "",
      UsertypeMobile: "",
      MobileID: "",
      userModules: [],
      serviceList: [],
      Salary:"",
      fullnameErr: false,
      usernameErr: false,
      emailErr: false,
      UsertypeemailErr1: false,
      UsertypeemailErr2: false,
      passwordErr: false,
      mobileErr: false,
      UsertypemobileErr: false,
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
      isAccountAlready:false,
      ManagedBy: "",
      managedByErr: false,
      managedByHelperText: "",
      managedByList: [],

      CompanyName: "",
      companyNameErr: false,
      companyNameHelperText: "",
      checkCompanyName: false,

      AddressLine1: "",
      addressLine1Err: false,
      addressLine1HelperText: "",
      checkAddressLine1: false,

      AddressLine2: "",
      checkAddressLine2: false,
      addressLine2Err: false,
      addressLine2HelperText: "",

      AddressLine3: "",
      checkAddressLine3: false,
      addressLine3Err: false,
      addressLine3HelperText: "",

      ZipCode: "",
      zipCodeErr: false,
      zipCodeHelperText: "",
      checkZipCode: false,

      City: "",
      cityErr: false,
      cityHelperText: "",
      checkCity: false,

      State: "",
      stateErr: false,
      stateHelperText: "",
      checkState: false,

      Country: {},
      CountryList: [],
      countryErr: false,
      countryHelperText: "",
      
      checkcurrency: false,
      currencyErr: false,
      currencyHelperText: "",
      Currency:"",
      checkCurrency:false,
      
      UsertypeAddressLine1: "",
      UsertypeaddressLine1Err: false,
      UsertypeaddressLine1HelperText: "",
      UsertypecheckAddressLine1: false,

      UsertypeAddressLine2: "",
      UsertypecheckAddressLine2: false,
      UsertypeaddressLine2Err: false,
      UsertypeaddressLine2HelperText: "",

      UsertypeZipCode: "",
      UsertypezipCodeErr: false,
      UsertypezipCodeHelperText: "",
      UsertypecheckZipCode: false,

      UsertypeCity: "",
      UsertypecityErr: false,
      UsertypecityHelperText: "",
      UsertypecheckCity: false,

      UsertypeState: "",
      UsertypestateErr: false,
      UsertypestateHelperText: "",
      UsertypecheckState: false,

      UsertypeCountry: "",
      UserTypeCountryList: [],
      UsertypecountryErr: false,
      UserTypecountryHelperText: "",

      Usertypeemployeeid: "",
      userTypeEmployeeIdErr: false,
      userTypeEmployeeIdHelperText: "",
      checkuserTypeEmployeeId: false,

      CityAutoComplete: false,
      StateAutoComplete: false,
      GoogleAPICityList: [],
      StateList: [],

      UsertypeCityAutoComplete: false,
      UsertypeStateAutoComplete: false,
      UsertypeGoogleAPICityList: [],
      UsertypeStateList: [],

      UsertypeSalary: "",
      UsertypesalaryErr: false,
      UsertypesalaryHelperText: "",
      Usertypechecksalary: false,


      Mobile1: "",
      Mobile1ID: null,
      mobile1Err: false,
      mobile1HelperText: "",
      checkMobile1: false,
      UsertypeMobile1: "",
      UsertypeMobile1ID: null,
      Usertypemobile1Err: false,
      Usertypemobile1HelperText: "",
      UsertypecheckMobile1: false,
      EntityID:"",
      
      UserDetailID: null,
      pagePreviewLink:"",
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
      EndDate: "",
      enddateErr: false,
      enddateHelperText: "",
      Attachments: [],
      AttachmentList: [],
      objAttachment: {
        Index: 0,
        FileName: "",
        Status: "Active",
        CreatedOn: moment().format(CommonConfig.dateFormat.dateOnly),
        Description: CommonConfig.loggedInUserData().Name,
      },
      Access: [],
      countryWise:[
        {value: "All", label: "All" , Index:0,IsSelected:false},
        { value: "37", label: "Canada" , Index:1,IsSelected:false},
        { value: "89", label: "India", Index:2,IsSelected:true },
        { value: "202", label: "United State", Index:3,IsSelected:false },
        { value: "0", label: "Others", Index:4,IsSelected:false },
      ],
    };
  }

  componentDidMount() {debugger
    this.setState({ Access: CommonConfig.getUserAccess("User Management") });
    this.showHide();
    this.getCountry();
    this.getManagedBy();
    this.getUserDetail();
    this.getServiceListFiltered(89);
    this.getPaperSizeList();
    this.setState({ LoginpersonId: CommonConfig.loggedInUserData().PersonID });
  }
  
  generatePreviewLink = () => {
    return this.state.PaperSizeList.map((value) => {
      return (
        <GridItem>
          <u>
            <a href={value.PaperPreviewLink} target="_blank">
              {value.PaperDisplayName}
            </a>
          </u>
        </GridItem>
      );
    });
  };
  getPreviewLink(PapreSize) {debugger
    var previewLink = this.state.PaperSizeList.filter(
      (x) => x.PaperDisplayName === PapreSize.label
    );
     this.setState({pagePreviewLink:previewLink[0].PaperPreviewLink});
    
  };
  getPaperSizeList = () => {
    try {
      api.post("userManagement/getPaperSizeList", {}).then((res) => {
        if (res.success) {
          this.setState({ PaperSizeList: res.data });
          let data = {
            pId: CommonConfig.isEmpty(this.props.location.state)
              ? 1
              : Number(this.props.location.state),
          };
          api.post("userManagement/getPaperSizeById", data).then((res) => {
            let paperData = {
              label: res.data[0].PaperDisplayName,
              value: res.data[0].ID,
            };

            this.setState({ PaperSize: paperData });
            this.getPreviewLink(this.state.PaperSize)
          });
        }
      });
    } catch (err) {}
  };

  getCountry() {
    try {
      api
        .get("location/getCountryList")
        .then((res) => {
          if (res.success) {
            var Country = res.data;
            this.setState({ CountryList: Country });
          }
        })
        .catch((err) => {
          console.log("err..", err);
        });
    } catch (error) {}
  }

  getManagedBy() {
    try {
      api
        .get("scheduleshipment/getShipmentManagedBy")
        .then((result) => {
          const fieldObj = [...result.data];
          fieldObj.push({ UserID: 0, Name: "Set to Null" });

          this.setState({
            managedByList: fieldObj,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getStates(countryData,type) {
    try {
      if(type ==="All"){
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
      else if(type === "Usertype"){
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
 
  fileUpload = (event, record) => {
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
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf)$/i;
    if (!allowedExtensions.exec(files.name)) {
      cogoToast.error(
        "Please upload file having extensions .jpeg/.jpg/.png/.pdf only."
      );
    } else {
      if (files.size > 5000000) {
        cogoToast.error("please upload the file maximum 5MB");
      } else {
        let AttachmentList = this.state.Attachments;
        let Index = this.state.Attachments.indexOf(record.original);
        let dateNow = new Date().getTime();

        //  var editfilename = files.name;

        AttachmentList[Index]["DateTime"] = dateNow;
        AttachmentList[Index]["AttachmentName"] = files.name;

        AttachmentList[Index]["AttachmentType"] = files.type;
        AttachmentList[Index]["AttachmentID"] = null;
        AttachmentList[Index]["Status"] = "Active";
        this.setState({
          Attachments: AttachmentList,
          AttachmentList: [...this.state.AttachmentList, files],
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
    var Index = this.state.Attachments.indexOf(record.original);
    this.state.Attachments[Index]["FileName"] = e.target.value;
    this.setState({ Attachments: [...this.state.Attachments] });
  };

  renderDocumentName = (cellInfo) => {
    return (
      <div className="table-input-slam">
        <CustomInput
          id="filename"
          inputProps={{
            value: cellInfo.original.FileName,
            onChange: (event) => this.handleDocumentChange(event, cellInfo),
          }}
        />
      </div>
    );
  };

  handleDocumentDelete = (e, record) => {
    console.log("Records = ", record);
    var data = {
      Attachments: record,
    };
    api
      .post("/userManagement/deleteUserDocument", data)
      .then((res) => {
        if (res.success) {
          this.hideLoader();
        }
      })
      .catch((err) => {
        console.log("error", err);
      });

    var AttachmentList = this.state.Attachments;
    var Index = AttachmentList.indexOf(record);
    AttachmentList[Index]["Status"] = "Inactive";
    this.setState({ Attachments: AttachmentList });
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

  getUserDetail() {debugger
    try {
      this.showLoader();
      this.setState({ Attachments: [], AttachmentList: [] });
      this.state.EntityID = this.props.location.state;
      let data = {
        userId: this.props.location.state,
      };
      let calledApi = CommonConfig.isEmpty(this.props.location.state)
        ? "userManagement/getUserModule"
        : "userManagement/getUserDataByID";

      api
        .post(calledApi, data)
        .then((res) => {
          if (res.success) {
            let userData = res.data;
            
            this.setState({
              userModules: userData.userModule,
              serviceList: userData.userMarkup,
            });
            
            this.setState({
              ShipmentCount: userData.UserShipmentData[0].AlreadyShippment
            });
            console.log(this.state.ShipmentCount);
            if (userData.UserData) {

              if(userData.UserData[0].UserType=="Employee"){
                if(userData.EmployeeData.length > 0){
                  this.setState({
                    EmployeementID: !CommonConfig.isEmpty(this.props.location.state)
                    ? userData.EmployeeData[0].EmployeeDetailID
                    : null,
                  })
                }

                
              
              }

              this.setState({
                Status: !CommonConfig.isEmpty(this.props.location.state)
                  ? {
                      value: userData.UserData[0].Status,
                      label: userData.UserData[0].Status,
                    }
                  : "",
                  userTimeZone: !CommonConfig.isEmpty(this.props.location.state)
                  ? 
                    {
                      value: userData.UserData[0].userTimeZone,
                      label: userData.UserData[0].userTimeZone,
                    }
                  
                  : "",
                fullName: !CommonConfig.isEmpty(this.props.location.state)
                  ? userData.UserData[0].Name
                  : "",
                Email: !CommonConfig.isEmpty(this.props.location.state)
                  ? userData.UserData[0].Email
                  : "",
                userName: !CommonConfig.isEmpty(this.props.location.state)
                  ? userData.UserData[0].LoginID
                  : "",
                Mobile: !CommonConfig.isEmpty(this.props.location.state)
                  ? userData.UserData[0].PhoneNum
                  : "",
                Mobile1: !CommonConfig.isEmpty(this.props.location.state)
                  ? userData.UserData[1]
                    ? userData.UserData[1].PhoneNum
                    : ""
                  : "",
                EmailID: !CommonConfig.isEmpty(this.props.location.state)
                  ? userData.UserData[0].EmailID
                  : null,
                
                MobileID: !CommonConfig.isEmpty(this.props.location.state)
                  ? userData.UserData[0].PhoneID
                  : null,
                Mobile1ID: !CommonConfig.isEmpty(this.props.location.state)
                  ? userData.UserData[1]
                    ? userData.UserData[1].PhoneID
                    : null
                  : null,
              });
              if (res.data.DocumentList.length > 0) {
                for (var i = 0; i < res.data.DocumentList.length; i++) {
                  var filesList = res.data.DocumentList[i];
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
              } else {
                this.setState({ Attachments: [this.state.objAttachment] });
              }
            }
            if (!CommonConfig.isEmpty(userData.userDetails)) {
              if (userData.userDetails[0]) {
                var Country = this.state.CountryList.filter(
                  (x) => x.CountryID === userData.userDetails[0].CountryID
                );
                var selectedCountry = Country[0]
                  ? {
                      value: Country[0].CountryID,
                      label: Country[0].CountryName,
                    }
                  : "";
                
                var managedBy = userData.userDetails[0]
                  ? {
                      value: userData.userDetails[0].ManagedBy,
                      label:
                        userData.userDetails[0].ManagedByName === null
                          ? ""
                          : userData.userDetails[0].ManagedByName,
                    }
                  : "";
                  if(userData.userDetails[0].AccountNumber=="")
                    this.setState({isAccountAlready:false});
                  else
                    this.setState({isAccountAlready:true});
                  
                this.setState({
                  AccountNumber: userData.userDetails[0].AccountNumber,
                  ManagedBy: managedBy,
                  CompanyName: userData.userDetails[0].CompanyName,
                  AddressLine1: userData.userDetails[0].AddressLine1,
                  AddressLine2: userData.userDetails[0].AddressLine2,
                  AddressLine3: userData.userDetails[0].AddressLine3,
                  ZipCode: userData.userDetails[0].ZipCode,
                  City: userData.userDetails[0].City,
                  State: userData.userDetails[0].State,
                  UserDetailID: userData.userDetails[0].UserDetailID,
                  Country: selectedCountry,
                });
                this.getStates(selectedCountry.value,"All");
              }
            }
            debugger
            if(userData.UserData[0].UserType=="Employee"){
              let emp= {"label":"Employee","value":"Employee"}
              
              this.setState({userType: emp});
            if (userData.EmployeeData.length > 0) {
              // if(userData.EmployeeData.length > 0){
                let timezon={"label":userData.EmployeeData[0].TimeZone,"value":userData.EmployeeData[0].TimeZone};
              let Country = this.state.CountryList.filter(
                (x) => x.CountryID === userData.EmployeeData[0].CountryID
              );
              let selectedCountry = Country[0]
                ? {
                    value: Country[0].CountryID,
                    label: Country[0].CountryName,
                  }
                : "";
                let Currency = this.state.usertypeCurrencyList.filter(
                  (x) => x.value === userData.EmployeeData[0].Currency
                );
                let selectedCurrency = Currency[0]
                  ?  Currency[0]
                      
                  : "";
                  let Department = this.state.usertypeDepartmentList.filter(
                    (x) => x.value === userData.EmployeeData[0].Department
                  );
                  let selectedDepartment = Department[0]
                    ? Department[0]
                      
                    : "";
              this.setState({
                usertypeTimeZone: timezon,
                StartTime:userData.EmployeeData[0].StartTime,
                EndTime:userData.EmployeeData[0].EndTime,
                BirthDate:userData.EmployeeData[0].Birthdate == null?"":userData.EmployeeData[0].Birthdate,
                JoinDate:userData.EmployeeData[0].Joiningdate== null?"":userData.EmployeeData[0].Joiningdate,
                RelivingDate:userData.EmployeeData[0].Relivingdate== null?"":userData.EmployeeData[0].Relivingdate,
                UsertypeAddressLine1:userData.EmployeeData[0].Addr1,
                UsertypeAddressLine2:userData.EmployeeData[0].Addr2,
                UsertypeCountry:selectedCountry,
                UsertypeZipCode:userData.EmployeeData[0].Zipcode,
                UsertypeCity:userData.EmployeeData[0].City,
                UsertypeState:userData.EmployeeData[0].State,
                UsertypeMobile:userData.EmployeeData[0].Phone1,
                UsertypeMobile1:userData.EmployeeData[0].Phone2,
                UsertypeEmail1:userData.EmployeeData[0].Email1,
                UsertypeEmail2:userData.EmployeeData[0].Email2,
                UsertypeSalary:userData.EmployeeData[0].Salary,
                UsertypeCurrency:selectedCurrency,
                userTypeDepartment:selectedDepartment,
                Usertypeemployeeid:userData.EmployeeData[0].EmployeeID,
              });
              console.log(this.state.usertypeTimeZone.value);
              /*EmployeeDetailID:1,
            usertypeTimeZone:this.state.usertypeTimeZone.value,
            UserType:this.state.userType.value,
            usertypeStartTime:this.state.StartTime==""?"NULL":this.state.StartTime,
            usertypeEndTime:this.state.EndTime==""?"NULL":this.state.EndTime,
            usertypeBirthDate:this.state.BirthDate ==""?"NULL":moment(this.state.BirthDate).format(CommonConfig.dateFormat.dbDateOnly).toString(),
            usertypeJoiningDate:this.state.JoinDate ==""?"NULL":moment(this.state.JoinDate).format(CommonConfig.dateFormat.dbDateOnly).toString(),
            usertypeRelivingDate:this.state.RelivingDate ==""?"NULL":moment(this.state.RelivingDate).format(CommonConfig.dateFormat.dbDateOnly).toString(),
            usertypeAddr1:this.state.UsertypeAddressLine1,
            usertypeAddr2:this.state.UsertypeAddressLine2,
            usertypeCountry:this.state.UsertypeCountry=="" ?"":this.state.UsertypeCountry.value,
            usertypeZip:this.state.UsertypeZipCode,
            usertypeCity:this.state.UsertypeCity,
            usertypeState:this.state.UsertypeState==""?"":this.state.UsertypeState.value,
            usertypeMobile1:this.state.UsertypeMobile,
            usertypeMobile2:this.state.UsertypeMobile1,
            usertypeEmail1:this.state.UsertypeEmail1,
            usertypeEmail2:this.state.UsertypeEmail2,
            usertypeSalary:this.state.UsertypeSalary,
            usertypeCurrency:this.state.UsertypeCurrency=="" ?"":this.state.UsertypeCurrency.value,
            usertypeDepartment:this.state.userTypeDepartment=="" ?"":this.state.userTypeDepartment.value, 
            usertypeEmployeeId:this.state.Usertypeemployeeid,   
            EntityID:this.state.EntityID,*/
            }
          }
            this.hideLoader();
          }
        })
        .catch((err) => {
          debugger
          console.log("this.props.location.state = ",this.props.location.state)
          if(this.props.location.state != undefined){
            this.hideLoader();
            console.log("err....", err);
            cogoToast.error("Something Went Wrong 3");
          }else{
            this.hideLoader();
            console.log("err....", err);
          }
        });
    } catch (error) {
      debugger
      if(this.props.location.state != undefined){
        this.hideLoader();
        console.log("err....", error);
        cogoToast.error("Something Went Wrong 4");
      }else{
        this.hideLoader();
        console.log("err....", error);
      }
      
    }
  }
  getServiceListFiltered(CountryParam) {debugger
    try {
      this.setState({ Loading: true });
     const data={
        CountryIds :CountryParam,
        userID: this.props.location.state
      }
      api
        .post("https://hubapi.sflworldwide.com/userManagement/getServiceListUserMarkupFilter",data)
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
    } catch (error) {}
  }
  showLoader = () => {
    this.setState({ Loading: true });
  };

  hideLoader = () => {
    this.setState({ Loading: false });
  };

  handleChange = (event, type) => {debugger
    if (type === "fullname") {
      let val = event.target.value;
      this.setState({ checkFullname: true });
      if (val === "" || val === null) {
        this.setState({
          fullName: val,
          fullnameErr: true,
          fullnameHelperText: "Please enter Full Name",
        });
      } else if (val.trim() !== val) {
        this.setState({
          fullName: val,
          fullnameErr: true,
          fullnameHelperText: "Please enter valid Full Name",
        });
      } else {
        this.setState({
          fullName: val,
          fullnameErr: false,
          fullnameHelperText: "",
        });
      }
    } else if (type === "username") {
      this.setState({ checkUserName: true });
      let usernameVal = event.target.value;
      if (CommonConfig.isEmpty(usernameVal)) {
        this.setState({
          userName: usernameVal,
          usernameErr: true,
          usernameHelperText: "Please enter User Name",
        });
      } else if (usernameVal.trim() !== usernameVal) {
        this.setState({
          userName: usernameVal,
          usernameErr: true,
          usernameHelperText: "Please enter valid User Name",
        });
      } else {
        this.setState({
          userName: usernameVal,
          usernameErr: false,
          usernameHelperText: "",
        });
      }
    } else if (type === "email") {
      this.setState({ checkEmail: true });
      let emailVal = event.target.value;
      let regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+\.[A-Z]{2,6}$/gi;
      if (emailVal === "" || emailVal === null) {
        this.setState({
          Email: emailVal,
          emailErr: true,
          emailHelperText: "Please enter Email",
        });
      } else if (emailVal.trim() !== emailVal || !emailVal.match(regExp)) {
        this.setState({
          Email: emailVal,
          emailErr: true,
          emailHelperText: "Please enter valid Email",
        });
      } else {
        this.setState({
          Email: emailVal,
          emailErr: false,
          emailHelperText: "",
        });
      }
    } else if (type === "Usertypeemail1") {
      this.setState({ UsertypecheckEmail1: true });
      let emailVal = event.target.value;
      let regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+\.[A-Z]{2,6}$/gi;
      if (emailVal === "" || emailVal === null) {
        this.setState({
          UsertypeEmail1: emailVal,
          UsertypeemailErr1: true,
          UsertypeemailHelperText1: "Please enter Email",
        });
      } else if (emailVal.trim() !== emailVal || !emailVal.match(regExp)) {
        this.setState({
          UsertypeEmail1: emailVal,
          UsertypeemailErr1: true,
          UsertypeemailHelperText1: "Please enter valid Email",
        });
      } else {
        this.setState({
          UsertypeEmail1: emailVal,
          UsertypeemailErr1: false,
          UsertypeemailHelperText1: "",
        });
      }
    } else if (type === "Usertypeemail2") {
      this.setState({ UsertypecheckEmail2: true });
      let emailVal = event.target.value;
      let regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+\.[A-Z]{2,6}$/gi;
      // if (emailVal === "" || emailVal === null) {
      //   this.setState({
      //     UsertypeEmail2: emailVal,
      //     UsertypeemailErr2: true,
      //     UsertypeemailHelperText2: "Please enter Email",
      //   });
      // } else
       if (emailVal.trim() !="" &&(emailVal.trim() !== emailVal || !emailVal.match(regExp))) {
        this.setState({
          UsertypeEmail2: emailVal,
          UsertypeemailErr2: true,
          UsertypeemailHelperText2: "Please enter valid Email",
        });
      } else {
        this.setState({
          UsertypeEmail2: emailVal,
          UsertypeemailErr2: false,
          UsertypeemailHelperText2: "",
        });
      }
    } else if (type === "mobile") {
      this.setState({ checkMobile: true });
      let mobileVal = event.target.value;
      let regExp = /^[0-9]{10,15}$/;

      if (mobileVal === "" || mobileVal === null) {
        this.setState({
          Mobile: mobileVal,
          mobileErr: true,
          mobileHelperText: "Please enter Mobile Number",
        });
      } else if (mobileVal.trim() !== mobileVal || !mobileVal.match(regExp)) {
        this.setState({
          Mobile: mobileVal,
          mobileErr: true,
          mobileHelperText: "Please enter valid Mobile Number",
        });
      } else {
        this.setState({
          Mobile: mobileVal,
          mobileErr: false,
          mobileHelperText: "",
        });
      }
    } else if (type === "Usertypemobile") {
      this.setState({ UsertypecheckMobile: true });
      let mobileVal = event.target.value;
      let regExp = /^[0-9]{10,15}$/;

      if (mobileVal === "" || mobileVal === null) {
        this.setState({
          UsertypeMobile: mobileVal,
          UsertypemobileErr: true,
          UsertypemobileHelperText: "Please enter Mobile Number",
        });
      } else if (mobileVal.trim() !== mobileVal || !mobileVal.match(regExp)) {
        this.setState({
          UsertypeMobile: mobileVal,
          UsertypemobileErr: true,
          UsertypemobileHelperText: "Please enter valid Mobile Number",
        });
      } else {
        this.setState({
          UsertypeMobile: mobileVal,
          UsertypemobileErr: false,
          UsertypemobileHelperText: "",
        });
      }
    } else if (type === "Usertypemobile1") {
      this.setState({ UsertypecheckMobile1: true });
      let mobileVal = event.target.value;
      let regExp = /^[0-9]{10,15}$/;

      // if (mobileVal === "" || mobileVal === null) {
      //   this.setState({
      //     UsertypeMobile1: mobileVal,
      //     UsertypemobileErr1: true,
      //     UsertypemobileHelperText1: "Please enter Mobile Number",
      //   });
      // } else 
      if (mobileVal.trim() !="" && (mobileVal.trim() !== mobileVal || !mobileVal.match(regExp))) {
        this.setState({
          UsertypeMobile1: mobileVal,
          UsertypemobileErr1: true,
          UsertypemobileHelperText1: "Please enter valid Mobile Number",
        });
      } else {
        this.setState({
          UsertypeMobile1: mobileVal,
          UsertypemobileErr1: false,
          UsertypemobileHelperText1: "",
        });
      }
    } else if (type === "password") {
      event.target.setAttribute("type", "password");
      this.setState({ checkPassword: true });
      let passwordVal = event.target.value;
      let passwordLen = event.target.value.length;
      this.setState({ passwordLength: passwordLen });

      if (
        passwordVal === "" ||
        passwordVal === null ||
        passwordVal === undefined
      ) {
        this.setState({
          Password: passwordVal,
          passwordErr: true,
          passwordHelperText: "Please enter password",
        });
      } else {
        this.setState({
          Password: passwordVal,
          passwordErr: false,
          passwordHelperText: "",
        });
      }
    } else if (type === "accountnumber") {
      this.setState({ checkaccountNumber: true });
      let accountVal = event.target.value.replace(/\D/g, "");
      // if (accountVal === "" || accountVal === null) {
      //   this.setState({
      //     AccountNumber: accountVal,
      //     accountNumberErr: true,
      //     accountNumberHelperText: "Please enter Account Number",
      //   });
      // } else 
      if (accountVal.trim() !== accountVal) {
        this.setState({
          AccountNumber: accountVal,
          accountNumberErr: true,
          accountNumberHelperText: "Please enter valid Account Number",
        });
      } else {
        this.setState({
          AccountNumber: accountVal,
          accountNumberErr: false,
          accountNumberHelperText: "",
        });
      }
    } else if (type === "companyname") {
      this.setState({ checkcompanyName: true });
      let companyVal = event.target.value;
      if (companyVal === "" || companyVal === null) {
        this.setState({
          CompanyName: companyVal,
          companyNameErr: true,
          companyNameHelperText: "Please enter Company Name",
        });
      } else {
        this.setState({
          CompanyName: companyVal,
          companyNameErr: false,
          companyNameHelperText: "",
        });
      }
    } else if (type === "addressline1") {
      this.setState({ checkAddressLine1: true });
      let addressVal = event.target.value;
      if (addressVal === "" || addressVal === null) {
        this.setState({
          AddressLine1: addressVal,
          addressLine1Err: true,
          addressLine1HelperText: "Please enter Address Line 1",
        });
      } else {
        this.setState({
          AddressLine1: addressVal,
          addressLine1Err: false,
          addressLine1HelperText: "",
        });
      }
    } else if (type === "addressline2") {
      this.setState({ checkAddressLine2: true });
      let addressVal = event.target.value;
      if (addressVal === "" || addressVal === null) {
        this.setState({
          AddressLine2: addressVal,
          addressLine2Err: true,
          addressLine2HelperText: "Please enter Address Line 2",
        });
      } else {
        this.setState({
          AddressLine2: addressVal,
          addressLine2Err: false,
          addressLine2HelperText: "",
        });
      }
    } else if (type === "Usertypeaddressline1") {
      this.setState({ UsertypecheckAddressLine1: true });
      let addressVal = event.target.value;
      if (addressVal === "" || addressVal === null) {
        this.setState({
          UsertypeAddressLine1: addressVal,
          UsertypeaddressLine1Err: true,
          UsertypeaddressLine1HelperText: "Please enter Address Line 1",
        });
      } else {
        this.setState({
          UsertypeAddressLine1: addressVal,
          UsertypeaddressLine1Err: false,
          UsertypeaddressLine1HelperText: "",
        });
      }
    } else if (type === "Usertypeaddressline2") {
      this.setState({ UsertypecheckAddressLine2: true });
      let addressVal = event.target.value;
      if (addressVal === "" || addressVal === null) {
        this.setState({
          UsertypeAddressLine2: addressVal,
          UsertypeaddressLine2Err: true,
          UsertypeaddressLine2HelperText: "Please enter Address Line 2",
        });
      } else {
        this.setState({
          UsertypeAddressLine2: addressVal,
          UsertypeaddressLine2Err: false,
          UsertypeaddressLine2HelperText: "",
        });
      }
    } else if (type === "addressline3") {
      this.setState({ checkAddressLine3: true });
      let addressVal = event.target.value;
      if (addressVal === "" || addressVal === null) {
        this.setState({
          AddressLine3: addressVal,
          addressLine3Err: true,
          addressLine3HelperText: "Please enter Address Line 3",
        });
      } else {
        this.setState({
          AddressLine3: addressVal,
          addressLine3Err: false,
          addressLine3HelperText: "",
        });
      }
    } else if (type === "zip") {
      this.setState({ checkZipCode: true });
      let addressVal = event.target.value.replace(/\D/g, "");
      if (addressVal === "" || addressVal === null) {
        this.setState({
          ZipCode: addressVal,
          zipCodeErr: true,
          zipCodeHelperText: "Please enter Zip Code",
        });
      } else {
        this.setState({
          ZipCode: addressVal,
          zipCodeErr: false,
          zipCodeHelperText: "",
        });
      }
    } else if (type === "Usertypezip") {
      this.setState({ UsertypecheckZipCode: true });
      let addressVal = event.target.value.replace(/\D/g, "");
      if (addressVal === "" || addressVal === null) {
        this.setState({
          UsertypeZipCode: addressVal,
          UsertypezipCodeErr: true,
          UsertypezipCodeHelperText: "Please enter Zip Code",
        });
      } else {
        this.setState({
          UsertypeZipCode: addressVal,
          UsertypezipCodeErr: false,
          UsertypezipCodeHelperText: "",
        });
      }
    } else if (type === "City") {
      this.setState({ City: event.target.value });
    } else if (type === "State") {
      this.setState({ State: event.target.value });
    } else if (type === "UsertypeState") {
      this.setState({ UsertypeState: event.target.value });
    } else if (type === "mobile1") {
      this.setState({ checkMobile1: true });
      let mobileVal = event.target.value;
      let regExp = /^[0-9]{10,15}$/;

      if (mobileVal === "" || mobileVal === null) {
        this.setState({
          Mobile1: mobileVal,
          mobile1Err: true,
          mobile1HelperText: "Please enter Phone Number",
        });
      } else if (mobileVal.trim() !== mobileVal || !mobileVal.match(regExp)) {
        this.setState({
          Mobile1: mobileVal,
          mobile1Err: true,
          mobile1HelperText: "Please enter valid Mobile Number",
        });
      } else {
        this.setState({
          Mobile1: mobileVal,
          mobile1Err: false,
          mobile1HelperText: "",
        });
      }
    } else if (type === "Usertypesalary") {
      this.setState({ Usertypechecksalary: true });
      let salaryVal = event.target.value;
      let regExp = /^[0-9]{1,10}$/;

      // if (salaryVal === "" || salaryVal === null) {
      //   this.setState({
      //     UsertypeSalary: salaryVal,
      //     UsertypesalaryErr: true,
      //     UsertypesalaryHelperText: "Please enter Salary",
      //   });
      // } else 
      if (salaryVal.trim() !="" && (salaryVal.trim() !== salaryVal || !salaryVal.match(regExp))) {
        this.setState({
          UsertypeSalary: "",
          UsertypesalaryErr: true,
          UsertypesalaryHelperText: "Please enter valid Salary",
        });
      } else {
        this.setState({
          UsertypeSalary: salaryVal,
          UsertypesalaryErr: false,
          UsertypesalaryHelperText: "",
        });
      }
    } else if (type === "Usertypeemployeeid") {
      this.setState({ checkuserTypeEmployeeId: true });
      let employeeIdVal = event.target.value;
      let regExp = /^[\w.]{1,10}$/;

    
      if (employeeIdVal.trim() !="" && (employeeIdVal.trim() !== employeeIdVal || !employeeIdVal.match(regExp))) {
        this.setState({
          Usertypeemployeeid: employeeIdVal,
          userTypeEmployeeIdErr: true,
          userTypeEmployeeIdHelperText: "Please enter valid Employee Id",
        });
      } else {
        this.setState({
          Usertypeemployeeid: employeeIdVal,
          userTypeEmployeeIdErr: false,
          userTypeEmployeeIdHelperText: "",
        });
      }
    }
  };

  handleBlurUser = (event, type) => {
    if (type === "username") {
      let usernameVal = event.target.value;
      if (CommonConfig.isEmpty(usernameVal)) {
        this.setState({
          userName: usernameVal,
          usernameErr: true,
          usernameHelperText: "Please enter User Name",
        });
      } else if (usernameVal.trim() !== usernameVal) {
        this.setState({
          userName: usernameVal,
          usernameErr: true,
          usernameHelperText: "Please enter valid User Name",
        });
      } else if (usernameVal.length < 8) {
        this.setState({
          userName: usernameVal,
          usernameErr: true,
          usernameHelperText: "Please enter alteast 8 characters",
        });
      } else {
        this.setState({
          userName: usernameVal,
          usernameErr: false,
          usernameHelperText: "",
        });
      }
    }
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
    this.setState({eValue :e,recordValue:record,typeValue :type});
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
      let SelectedCountryCode="1";
   
      checkedArr.filter((x) => x.IsSelected === true)
        .map((OBJ) => {

          SelectedCountryCode = SelectedCountryCode+","+OBJ.value;
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
     
   
      let SelectedCountryCode="1";
      //this.filterMethod("Hello", previousList);
      checkedArr.filter((x) => x.IsSelected === true)
        .map((OBJ) => {

          SelectedCountryCode = SelectedCountryCode+","+OBJ.value;
          return OBJ;
        });
        if(SelectedCountryCode === undefined || SelectedCountryCode === "1")
          SelectedCountryCode = "1,37,89,202,0";
      this.getServiceListFiltered(SelectedCountryCode)
    } else {
      // else {
    
      
     
      let SelectedCountryCode="1";
      checkedArr.filter((x) => x.IsSelected === true)
      .map((OBJ) => {
        if(OBJ.value !== "All")
        SelectedCountryCode = SelectedCountryCode+","+OBJ.value;
        return OBJ;
      });
      if(SelectedCountryCode === undefined || SelectedCountryCode === "1")
        SelectedCountryCode = "1,37,89,202,0";
      this.getServiceListFiltered(SelectedCountryCode);

    //  this.filterMethod("Hello", previousList);
      // }
    }
    // console.log("checkedArr = ",checkdata);
  };




  validate() {debugger
    let IsFormValid = true;
    if (this.state.usernameErr) {
      IsFormValid = false;
    }
    debugger;
    if (
      this.state.objAttachment.FileName === "" &&
      this.state.uploadedfilename !== ""
    ) {
      IsFormValid = false;
    }
    if(this.state.userType===null || this.state.userType==="")
      {IsFormValid = false;
        this.setState({userTypeErr : true, userTypeHelperText:"Mandatory Field" });
      }
      else
      if(this.state.userType!=null && this.state.userType.value==="Employee")
        { this.setState({userTypeErr : false, userTypeHelperText:"" });
          if(this.state.usertypeTimeZone===null || this.state.usertypeTimeZone==="")
            {IsFormValid = false; 
              this.setState({usertypeTimeZoneErr: true, usertypeTimeZoneHelperText:"Mandatory Field" });
            }
            else
            this.setState({usertypeTimeZoneErr: false, usertypeTimeZoneHelperText:"" });
          console.log("moment(this.state.BirthDate)", moment(this.state.BirthDate)._d);
        if(moment(this.state.BirthDate)._d =="Invalid Date")
          {
            IsFormValid = false;
            this.setState({birthdateErr: true, birthdateHelperText:"Mandatory Field" });
          }
        else
        this.setState({birthdateErr: false, birthdateHelperText:"" });
          if(moment(this.state.JoinDate)._d == "Invalid Date")
            {
              IsFormValid = false;
              this.setState({joindateErr: true, joindateHelperText:"Mandatory Field" });
            }
          else
          this.setState({joindateErr: false, joindateHelperText:"" });
      }
      else
      {this.setState({userTypeErr : false, userTypeHelperText:"" });}
    return IsFormValid;
  }
  setUserDepartment = (e) =>{debugger
   
    this.setState({ userTypeDepartment: e });
    this.state.userTypeDepartment=e;
    console.log("userTypeDepartment",this.state.userTypeDepartment);
 }
  setUserTimeZone = (e) =>{
     this.setState({ usertypeTimeZone : e });
     this.setState({usertypeTimeZoneErr: false, usertypeTimeZoneHelperText:"" });
  }
  setUserCurrency = (e) =>{
    this.setState({ UsertypeCurrency: e });
 }
  
  setUserType = (e) =>{
    this.setState({ userType: e });
 } 
 handleDateChange = (date, type) => {debugger
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
  if (type === "join") {
    this.setState({
      JoinDate: date,
      joindateErr: false,
      joindateHelperText: "",
    });
    if(this.state.BirthDate !== "")
      if(date > this.state.BirthDate){
        this.setState({
          JoinDate: date,
          joindateErr: false,
          joindateHelperText: "",
        });
      } 
      else
      {
        this.setState({
          JoinDate: "",
          joindateErr: true,
          joindateHelperText: "Joining Date must be after Date of Birth",
        });
      }
        if(this.state.RelivingDate !== "")
          if(date > this.state.RelivingDate){
            this.setState({
              JoinDate: date,
              joindateErr: false,
              joindateHelperText: "",
            });
          } 
          else
            {
              this.setState({
                JoinDate: "",
                joindateErr: true,
                joindateHelperText: "Joining Date must be before Date of Reliving",
              });
            }
  }else if (type === "Reliving") {
    this.setState({
      RelivingDate: date,
      relivingdateErr: false,
      relivingdateHelperText: "",
    });
    if(this.state.BirthDate !== "")
      if(date > this.state.BirthDate){
        this.setState({
          RelivingDate: date,
          relivingdateErr: false,
          relivingdateHelperText: "",
        });
      } 
      else
      {
        this.setState({
          RelivingDate: "",
          relivingdateErr: true,
          relivingdateHelperText: "Reliving Date must be after Date of Birth",
        });
      }
      if(this.state.JoinDate !== "")
        if(date > this.state.JoinDate){
          this.setState({
            RelivingDate: date,
            relivingdateErr: false,
            relivingdateHelperText: "",
          });
        } 
        else
        {
          this.setState({
            RelivingDate: "",
            relivingdateErr: true,
            relivingdateHelperText: "Reliving Date must be after Date of Join",
          });
        }
  }else if (type === "DOB") {
    this.setState({
      BirthDate: date,
      birthdateErr: false,
      birthdateHelperText: "",
    });
    if(this.state.JoinDate !== "")
      if(date < this.state.JoinDate){
        this.setState({
          BirthDate: date,
          birthdateErr: false,
          birthdateHelperText: "",
        });
      } 
      else
      {
        this.setState({
          BirthDate: "",
          birthdateErr: true,
          birthdateHelperText: "Date of Birth must be before Date of Join",
        });
      }
      if(this.state.RelivingDate !== "")
      if(date < this.state.RelivingDate){
        this.setState({
          BirthDate: date,
          birthdateErr: false,
          birthdateHelperText: "",
        });
      } 
      else
      {
        this.setState({
          BirthDate: "",
          birthdateErr: true,
          birthdateHelperText: "Date of Birth must be before Date of Reliving",
        });
      }
  }
};
handleTimeChange = (time, type) => {debugger 
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
  saveUser = (redirect) => {debugger
    if (this. validate()) {
      try {
        this.showLoader();
        
        let UserDetails = {
          AccountNumber: this.state.AccountNumber,
          isAccountAlready:this.state.isAccountAlready,
          ManagedBy: this.state.ManagedBy.value,
          CompanyName: this.state.CompanyName,
          AddressLine1: this.state.AddressLine1,
          AddressLine2: this.state.AddressLine2,
          AddressLine3: this.state.AddressLine3,
          ZipCode: this.state.ZipCode,
          City: this.state.City.value ? this.state.City.value : this.state.City,
          State: this.state.State.value
            ? this.state.State.value
            : this.state.State,
          ContactName: this.state.fullName,
          CountryID: this.state.Country.value,
          UserDetailID: this.state.UserDetailID,
          Status: this.state.Status.value,
          userTimeZone:this.state.userTimeZone.value,
        };

        var data = {};
        var finalAttachment = [];
        for (var i = 0; i < this.state.Attachments.length; i++) {
          if (this.state.Attachments[i].hasOwnProperty("AttachmentName")) {
            finalAttachment.push(this.state.Attachments[i]);
          }
        }
        debugger;
        if (CommonConfig.isEmpty(this.state.Password) !== true) {
          data = {
            Name: this.state.fullName,
            UserName: this.state.userName,
            Password: this.state.Password,
            Email: this.state.Email,
            Phone: this.state.Mobile,
            Phone2: this.state.Mobile1,
            LeadAssignment: this.state.LeadAssignment,
            LeadWriteClick: this.state.LeadWriteClick,
            UserDetails: UserDetails,
            moduleData: this.state.userModules,
            markupdata: this.state.serviceList,
            UserId: CommonConfig.isEmpty(this.props.location.state)
              ? 1
              : Number(this.props.location.state),
            EmailID: this.state.EmailID,
            PhoneID: this.state.MobileID,
            Phone2ID: this.state.Mobile1ID,
            SelectedPaperSize: this.state.PaperSize.value,
            Status: this.state.Status.value,
            DocumentList: finalAttachment,
            EmployeeDetailID:this.state.EmployeementID,
            usertypeTimeZone:this.state.usertypeTimeZone.value,
            UserType:this.state.userType.value,
            usertypeStartTime:this.state.StartTime==""?"NULL":this.state.StartTime,
            usertypeEndTime:this.state.EndTime==""?"NULL":this.state.EndTime,
            usertypeBirthDate:this.state.BirthDate ==""?"NULL":moment(this.state.BirthDate).format(CommonConfig.dateFormat.dbDateOnly).toString(),
            usertypeJoiningDate:this.state.JoinDate ==""?"NULL":moment(this.state.JoinDate).format(CommonConfig.dateFormat.dbDateOnly).toString(),
            usertypeRelivingDate:this.state.RelivingDate ==""?"NULL":moment(this.state.RelivingDate).format(CommonConfig.dateFormat.dbDateOnly).toString(),
            usertypeAddr1:this.state.UsertypeAddressLine1,
            usertypeAddr2:this.state.UsertypeAddressLine2,
            usertypeCountry:this.state.UsertypeCountry=="" ?"":this.state.UsertypeCountry.value,
            usertypeZip:this.state.UsertypeZipCode,
            usertypeCity:this.state.UsertypeCity,
            usertypeState:this.state.UsertypeState==""?"":this.state.UsertypeState.value,
            usertypeMobile1:this.state.UsertypeMobile,
            usertypeMobile2:this.state.UsertypeMobile1,
            usertypeEmail1:this.state.UsertypeEmail1,
            usertypeEmail2:this.state.UsertypeEmail2,
            usertypeSalary:this.state.UsertypeSalary,
            usertypeCurrency:this.state.UsertypeCurrency=="" ?"":this.state.UsertypeCurrency.value,
            usertypeDepartment:this.state.userTypeDepartment=="" ?"":this.state.userTypeDepartment.value, 
            usertypeEmployeeId:this.state.Usertypeemployeeid,   
            EntityID:this.state.EntityID,
          };
        } else {
          console.log("Loklesh1",this.state.userTypeDepartment);
          data = {
            Name: this.state.fullName,
            UserName: this.state.userName,
            Email: this.state.Email,
            Phone: this.state.Mobile,
            Phone2: this.state.Mobile1,
            Phone2ID: this.state.Mobile1ID,
            UserDetails: UserDetails,
            LeadAssignment: this.state.LeadAssignment,
            LeadWriteClick: this.state.LeadWriteClick,
            moduleData: this.state.userModules,
            markupdata: this.state.serviceList,
            UserId: CommonConfig.isEmpty(this.props.location.state)
              ? 1
              : Number(this.props.location.state),
            EmailID: this.state.EmailID,
            PhoneID: this.state.MobileID,
            Status: this.state.Status.value,
            SelectedPaperSize: this.state.PaperSize.value,
            DocumentList: finalAttachment,
            EmployeeDetailID:this.state.EmployeementID,
            usertypeTimeZone:this.state.usertypeTimeZone.value,
            UserType:this.state.userType.value,
            usertypeStartTime:this.state.StartTime==""?"NULL":this.state.StartTime,
            usertypeEndTime:this.state.EndTime==""?"NULL":this.state.EndTime,
            usertypeBirthDate:this.state.BirthDate ==""?"NULL":moment(this.state.BirthDate).format(CommonConfig.dateFormat.dbDateOnly).toString(),
            usertypeJoiningDate:this.state.JoinDate ==""?"NULL":moment(this.state.JoinDate).format(CommonConfig.dateFormat.dbDateOnly).toString(),
            usertypeRelivingDate:this.state.RelivingDate ==""?"NULL":moment(this.state.RelivingDate).format(CommonConfig.dateFormat.dbDateOnly).toString(),
           usertypeAddr1:this.state.UsertypeAddressLine1,
            usertypeAddr2:this.state.UsertypeAddressLine2,
            usertypeCountry:this.state.UsertypeCountry=="" ?"":this.state.UsertypeCountry.value,
            usertypeZip:this.state.UsertypeZipCode,
            usertypeCity:this.state.UsertypeCity,
            usertypeState:this.state.UsertypeState==""?"":this.state.UsertypeState.value,
            usertypeMobile1:this.state.UsertypeMobile,
            usertypeMobile2:this.state.UsertypeMobile1,
            usertypeEmail1:this.state.UsertypeEmail1,
            usertypeEmail2:this.state.UsertypeEmail2,
            usertypeSalary:this.state.UsertypeSalary,
            usertypeCurrency:this.state.UsertypeCurrency=="" ?"":this.state.UsertypeCurrency.value,
            usertypeDepartment:this.state.userTypeDepartment=="" ?"":this.state.userTypeDepartment.value, 
            usertypeEmployeeId:this.state.Usertypeemployeeid,  
            EntityID:this.state.EntityID,
          };
          console.log("Loklesh2");
        }

        var formData = new FormData();
        formData.append("data", JSON.stringify(data));

        if (this.state.AttachmentList.length > 0) {
          this.state.AttachmentList.forEach((file) => {
            formData.append("Attachments", file);
          });
        }

        let calledApi = CommonConfig.isEmpty(this.props.location.state)
          ? "authentication/userRegister"
          : "userManagement/updateUserByID";

        api
          .post(calledApi, formData)
          .then((res) => {
            if (res.success) {
              if (!CommonConfig.isEmpty(this.props.location.state)) {
                var data = {
                  markupdata: this.state.serviceList,
                  UserId: CommonConfig.isEmpty(this.props.location.state)
                    ? 1
                    : Number(this.props.location.state),
                };
                api
                  .post("userManagement/updateMarkupByUser", data)
                  .then((res) => {
                    if (redirect) {
                      this.props.history.push({
                        pathname: "/admin/UserList",
                        state: {
                          filterlist: this.props.history.location.filterlist,
                          sortlist: this.props.history.location.sortlist,
                        },
                      });
                    } else {
                      (this.state.objAttachment = {
                        Index: 0,
                        FileName: "",
                        Status: "Active",
                        CreatedOn: moment().format(
                          CommonConfig.dateFormat.dateOnly
                        ),
                        Description: CommonConfig.loggedInUserData().Name,
                      }),
                        this.setState({ uploadedfilename: "" });

                      // this.renderDocumentName;
                      // record.original.AttachmentName = "";
                      // this.stringTruncate("");
                      // cellInfo.original.FileName
                      this.getUserDetail();
                      //  location.reload();
                    }
                  });
              } else {
                if (redirect) {
                  this.props.history.push({
                    pathname: "/admin/UserList",
                    state: {
                      filterlist: this.props.history.location.filterlist,
                      sortlist: this.props.history.location.sortlist,
                    },
                  });
                } else {
                  this.getUserDetail();
                }
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
        cogoToast.error("Something Went Wrong 9");
      }
    } else {
      cogoToast.error("Please correct error and resubmit the form");
    }
  };
 
  cancelUser = () => {
    this.props.history.push({
      pathname: "/admin/UserList",
      state: {
        filterlist: this.props.history.location.filterlist,
        sortlist: this.props.history.location.sortlist,
      },
    });
  };

  renderMarkup = () => {
    console.log("this.state.serviceList = " , this.state.serviceList)
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
    document.getElementById("userdetails").style.display = "block";
    document.getElementById("accessdetails").style.display = "none";
    document.getElementById("markupdetails").style.display = "none";
    document.getElementById("documentation").style.display = "none";
  }

  zipChange = (zip,type) => {debugger
    if(type === "All")
    {  if (zip.length) {
      let citydata={
        "PostalCode" : zip,
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
          if(RecCount !=0)
            {
              var FinalCity = [];
              var city = "";
            
                    var countryShortName = data[0].Country
                    for(let i=0;i<RecCount;i++)
                      FinalCity.push({
                      City_code: data[i].City,
                      CityName: data[i].City,
                    });
                    var SelectedCity = {
                      value: FinalCity[0].City_code,
                      label: FinalCity[0].CityName,
                    };
                    var state = data[0].State;
                    console.log("this.state.toStateList",this.state.toStateList);
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
      else
     { fetch(CommonConfig.zipCodeAPIKey(zip, this.state.Country.label))
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
                function(data) {
                  return data.types[0] === "country";
                }
              )[0].long_name;
              var CityData = _.filter(
                data["results"][0]["address_components"],
                function(data) {
                  if (data.types[0] == "locality") {
                    return data.types[0] === "locality";
                  }
                }
              );

              var CityData2 = _.filter(
                data["results"][0]["address_components"],
                function(data) {
                  if (data.types[0] == "neighborhood") {
                    return data.types[0] === "neighborhood";
                  }
                }
              );

              var CityData3 = _.filter(
                data["results"][0]["address_components"],
                function(data) {
                  if (data.types[0] == "administrative_area_level_2") {
                    return data.types[0] === "administrative_area_level_2";
                  }
                }
              );

              var CityData4 = _.filter(
                data["results"][0]["address_components"],
                function(data) {
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
                function(data) {
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
                function(data) {
                  return data.types[0] === "country";
                }
              )[0].long_name;

              if (
                city == "" &&
                _.filter(data["results"][0]["address_components"], function(
                  data
                ) {
                  return data.types[0] === "locality";
                }).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function(data) {
                    return data.types[0] === "locality";
                  }
                )[0].short_name;
              } else if (
                city == "" &&
                _.filter(data["results"][0]["address_components"], function(
                  data
                ) {
                  return data.types[0] === "administrative_area_level_3";
                }).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function(data) {
                    return data.types[0] === "administrative_area_level_3";
                  }
                )[0].short_name;
              } else if (
                city == "" &&
                _.filter(data["results"][0]["address_components"], function(
                  data
                ) {
                  return data.types[0] === "political";
                }).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function(data) {
                    return data.types[0] === "political";
                  }
                )[0].short_name;
              } else if (
                city == "" &&
                _.filter(data["results"][0]["address_components"], function(
                  data
                ) {
                  return data.types[0] === "neighborhood";
                }).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function(data) {
                    return data.types[0] === "neighborhood";
                  }
                )[0].short_name;
              } else if (
                city == "" &&
                _.filter(data["results"][0]["address_components"], function(
                  data
                ) {
                  return data.types[0] === "administrative_area_level_2";
                }).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function(data) {
                    return data.types[0] === "administrative_area_level_2";
                  }
                )[0].long_name;
              } else if (
                city == "" &&
                _.filter(data["results"][0]["address_components"], function(
                  data
                ) {
                  return data.types[0] === "administrative_area_level_1";
                }).length > 0
              ) {
                city = _.filter(
                  data["results"][0]["address_components"],
                  function(data) {
                    return data.types[0] === "administrative_area_level_1";
                  }
                )[0].long_name;
              } else if (city == "") {
                city = "";
              }

              var state = _.filter(
                data["results"][0]["address_components"],
                function(data) {
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
            if(this.state.Country.label == "United States" ||this.state.Country.label == "India" ||this.state.Country.label == "Canada"  )
              {
                
                var newZipcodedata = {
                "Pincode" : zip,
                "PickupCityList": SelectedCity.label,
                "CountryID": this.state.Country.value,
                "CountryName": this.state.Country.label,
                "StateName" : state,
                
              };
              console.log("newZipcodedata",newZipcodedata);
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
    else if(type === "Usertype")
    {
      if (zip.length) {
        let citydata={
          "PostalCode" : zip,
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
            if(RecCount !=0)
              {
                var FinalCity = [];
                var city = "";
              
                      var countryShortName = data[0].Country
                      for(let i=0;i<RecCount;i++)
                        FinalCity.push({
                        City_code: data[i].City,
                        CityName: data[i].City,
                      });
                      var SelectedCity = {
                        value: FinalCity[0].City_code,
                        label: FinalCity[0].CityName,
                      };
                      var state = data[0].State;
                      console.log("this.state.toStateList",this.state.toStateList);
                      var SelectedState = { value: state, label: state };
                      if (countryShortName === this.state.UsertypeCountry.label) {
                        this.setState({
                          UsertypeCityAutoComplete: FinalCity.length ? true : false,
                          UsertypeStateAutoComplete: this.state.UsertypeStateList.length ? true : false,
                          UsertypeGoogleAPICityList: FinalCity,
                          UsertypeState: this.state.UsertypeStateList.length ? SelectedState : state,
                          UsertypeCity: SelectedCity.label,
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
        else
       { fetch(CommonConfig.zipCodeAPIKey(zip, this.state.UsertypeCountry.label))
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
                  function(data) {
                    return data.types[0] === "country";
                  }
                )[0].long_name;
                var CityData = _.filter(
                  data["results"][0]["address_components"],
                  function(data) {
                    if (data.types[0] == "locality") {
                      return data.types[0] === "locality";
                    }
                  }
                );
  
                var CityData2 = _.filter(
                  data["results"][0]["address_components"],
                  function(data) {
                    if (data.types[0] == "neighborhood") {
                      return data.types[0] === "neighborhood";
                    }
                  }
                );
  
                var CityData3 = _.filter(
                  data["results"][0]["address_components"],
                  function(data) {
                    if (data.types[0] == "administrative_area_level_2") {
                      return data.types[0] === "administrative_area_level_2";
                    }
                  }
                );
  
                var CityData4 = _.filter(
                  data["results"][0]["address_components"],
                  function(data) {
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
                  function(data) {
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
                  function(data) {
                    return data.types[0] === "country";
                  }
                )[0].long_name;
  
                if (
                  city == "" &&
                  _.filter(data["results"][0]["address_components"], function(
                    data
                  ) {
                    return data.types[0] === "locality";
                  }).length > 0
                ) {
                  city = _.filter(
                    data["results"][0]["address_components"],
                    function(data) {
                      return data.types[0] === "locality";
                    }
                  )[0].short_name;
                } else if (
                  city == "" &&
                  _.filter(data["results"][0]["address_components"], function(
                    data
                  ) {
                    return data.types[0] === "administrative_area_level_3";
                  }).length > 0
                ) {
                  city = _.filter(
                    data["results"][0]["address_components"],
                    function(data) {
                      return data.types[0] === "administrative_area_level_3";
                    }
                  )[0].short_name;
                } else if (
                  city == "" &&
                  _.filter(data["results"][0]["address_components"], function(
                    data
                  ) {
                    return data.types[0] === "political";
                  }).length > 0
                ) {
                  city = _.filter(
                    data["results"][0]["address_components"],
                    function(data) {
                      return data.types[0] === "political";
                    }
                  )[0].short_name;
                } else if (
                  city == "" &&
                  _.filter(data["results"][0]["address_components"], function(
                    data
                  ) {
                    return data.types[0] === "neighborhood";
                  }).length > 0
                ) {
                  city = _.filter(
                    data["results"][0]["address_components"],
                    function(data) {
                      return data.types[0] === "neighborhood";
                    }
                  )[0].short_name;
                } else if (
                  city == "" &&
                  _.filter(data["results"][0]["address_components"], function(
                    data
                  ) {
                    return data.types[0] === "administrative_area_level_2";
                  }).length > 0
                ) {
                  city = _.filter(
                    data["results"][0]["address_components"],
                    function(data) {
                      return data.types[0] === "administrative_area_level_2";
                    }
                  )[0].long_name;
                } else if (
                  city == "" &&
                  _.filter(data["results"][0]["address_components"], function(
                    data
                  ) {
                    return data.types[0] === "administrative_area_level_1";
                  }).length > 0
                ) {
                  city = _.filter(
                    data["results"][0]["address_components"],
                    function(data) {
                      return data.types[0] === "administrative_area_level_1";
                    }
                  )[0].long_name;
                } else if (city == "") {
                  city = "";
                }
  
                var state = _.filter(
                  data["results"][0]["address_components"],
                  function(data) {
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
              if(this.state.Country.label == "United States" ||this.state.Country.label == "India" ||this.state.Country.label == "Canada"  )
                {
                  
                  var newZipcodedata = {
                  "Pincode" : zip,
                  "PickupCityList": SelectedCity.label,
                  "CountryID": this.state.Country.value,
                  "CountryName": this.state.Country.label,
                  "StateName" : state,
                  
                };
                console.log("newZipcodedata",newZipcodedata);
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

  handleZipBlur = (e, type) => {
    if (type === "zip") {
      this.zipChange(e.target.value,"All");
    }
    else if (type === "Usertypezip") {
      this.zipChange(e.target.value,"Usertype");
    }
  };

  ChangeCountry = (value, type) => {
    if (value !== null) {
      if (type === "Country") {
        this.setState({ Country: value });
        this.getStates(value,"All");
      } else if (type === "City") {
        this.setState({ City: value });
      } else if (type === "State") {
        this.setState({ State: value });
      } else if (type === "UsertypeCountry") {
        this.setState({ UsertypeCountry: value });
        this.getStates(value,"Usertype");
      } else if (type === "UsertypeCity") {
        this.setState({ UsertypeCity: value });
      } else if (type === "UsertypeState") {
        this.setState({ UsertypeState: value });
      } else if (type === "ManagedBy") {
        this.setState({ ManagedBy: value });
      } else if (type === "PaperSize") {
        this.setState({ PaperSize: value });
        this.getPreviewLink(this.state.PaperSize)
      }
    }
   
  };

  render() {
    const {
      fullName,
      userName,
      Email,
      UsertypeEmail1,
      UsertypeEmail2,
      Currency,
      Mobile,
      Salary,
      department,
      employeeId,
      AccountNumber,
      ManagedBy,
      CompanyName,
      AddressLine1,
      AddressLine2,
      UsertypeAddressLine1,
      UsertypeAddressLine2,
      AddressLine3,
      ZipCode,
      City,
      State,
      Country,
      UsertypeCountry,
      UsertypeZipCode,
      UsertypeCity,
      UsertypeState,
      Mobile1,
      UsertypeMobile,
      UsertypeMobile1,
      UsertypeSalary,
      UsertypeCurrency,
      Usertypeemployeeid,
      usertypeTimeZone,
      pagePreviewLink,
    } = this.state;

    const managedBy = this.state.managedByList.map((type) => {
      return { value: type.UserID, label: type.Name };
    });

    const paperSize = this.state.PaperSizeList.map((type) => {
      return { value: type.ID, label: type.PaperDisplayName };
    });

    const userstatus = this.state.UserStatusList.map((type) => {
      return { value: type.value, label: type.label };
    });

    const userTypeDepartmentDrop = this.state.usertypeDepartmentList.map((type) => {
      return { value: type.value, label: type.label };
    });
    const userTypeTimeZone = this.state.UserTypeTimeZoneList.map((type) => {
      return { value: type.value, label: type.label };
    });
    const userTypeCurrencyDrop = this.state.usertypeCurrencyList.map((type) => {
      return { value: type.value, label: type.label };
    }); 

    const userType = this.state.UserTypeList.map((type) => {
      return { value: type.value, label: type.label };
    }); 

    const CityOptions = this.state.GoogleAPICityList.map((city) => {
      return { value: city.City_code, label: city.Name };
    });
    const StateOptions = this.state.StateList.map((state) => {
      return { value: state.StateName, label: state.StateName };
    });
    const UsertypeStateOptions = this.state.UsertypeStateList.map((state) => {
      return { value: state.StateName, label: state.StateName };
    });
    const CountryOptions = this.state.CountryList.map((fromCountry) => {
      return { value: fromCountry.CountryID, label: fromCountry.CountryName };
    });
    const columns1 = [
      {
        Header: "Country",
        accessor: "CountryName",
        width: 110,
        maxWidth: 110,
      },
      {
        Header: "Shipment Type",
        accessor: "ServiceType",
        width: 110,
        maxWidth: 110,
      },
      {
        Header: "Service Name",
        accessor: "MainServiceName",
        width: 100,
        maxWidth: 100,
      },
      {
        Header: "Sub Service Name",
        accessor: "ServiceName",
        width: 320,
        maxWidth: 320,
      },
      {
        Header: "Display Name",
        accessor: "DisplayName",
        width: 180,
        maxWidth: 180,
      },
      {
        Header: "Package Markup",
        accessor: "Markup",
        width: 120,
        maxWidth: 120,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              <input
              size={10}
              type="text"
              name={"Markup"+ record.original.ServiceID}
              id={"Markup"+ record.original.ServiceID}
              className="form-control"
              value={record.original.Markup}
              onChange={(event) =>
                this.handledInput(event, record.original.ServiceID, record.original.MarkupType, "Markup")
              }
              onBlur={(e) =>
                this.handleBlur(e, record.original.ServiceID, record.original.MarkupType, "Markup")
              }
            />
            </div>
          );
        },
      },
      {
        Header: "Envelop Markup",
        accessor: "test",
        width: 120,
        sortMethod: (a, b) => {
          return CommonConfig.dateSortMethod(a, b);
        },
        maxWidth: 120,
        Cell: (record) => {
          console.log("record = " , record)
          console.log("record = " , record.index)
          var ids = "EnvelopMarkup"+ record.original.ServiceID;
          return (
            <div className="table-common-btn">
             
              <input
              size={10}
              type="text"
              name={"EnvelopMarkup"+ record.original.ServiceID}
              id={"EnvelopMarkup"+ record.original.ServiceID}
              className="form-control"
              value={record.original.EnvelopMarkup}
              
              onChange={(event) =>
                this.handledInput(event, record.original.ServiceID, record.original.MarkupType, "EnvelopMarkup")
              }
              onBlur={(e) =>
                this.handleBlur(e, record.original.ServiceID, record.original.MarkupType, "EnvelopMarkup")
              }
            />
            
            </div>
          );
        },
      },
      {
        Header: "Markup Type",
        accessor: "MarkupType",
        width: 100,
        maxWidth: 100,
        Cell: (record) => {
          return (<FormControl  className={classes.selectFormControl}>
        <Select
        size={50}
          MenuProps={{ className: classes.selectMenu }}
          classes={{ select: classes.select }}
          value={record.original.MarkupType}
          inputProps={{
            name: "simpleSelect",
            id: "simple-select",
          }}
          onChange={(event) => this.handledropdown(event, record.original.ServiceID)}
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
      
    );
  },
      
        
        
     
      },
      {
        Header: "Status",
        accessor: "Status",
        width: 80,
      }
    ];

    const columns = [
      {
        Header: "Document Name",
        accessor: "FileName",
        width: 220,
        maxWidth: 220,
        Cell: this.renderDocumentName,
      },
      {
        Header: "CreatedOn",
        accessor: "CreatedOn",
        width: 220,
        sortMethod: (a, b) => {
          return CommonConfig.dateSortMethod(a, b);
        },
        maxWidth: 220,
      },
      {
        Header: "Added By",
        accessor: "Description",
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
        <GridContainer className="MuiGrid-justify-xs-center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader className="btn-right-outer" color="primary" icon>
                <CardIcon color="primary">
                  <Adduser />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">
                  User Management
                </h4>
              </CardHeader>
              <Cardbody>
                <div className="shipment-nav">
                  <ul>
                    {this.state.Steps.map((step, key) => {
                      return ( 
                        this.state.isAccountAlready==false && step.stepName != "Markup Details"?(
                        <li>
                          <a
                            className={step.classname}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              this.navigateChange(key);
                            }}
                          >
                            <span>{/*console.log("lok",this.state.AccountNumber,"esh ",step.stepName)*/}{step.stepName}</span>
                          </a>
                        </li>): this.state.isAccountAlready==true?(
                        <li>
                          <a
                            className={step.classname}
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              this.navigateChange(key);
                            }}
                          >
                            <span>{console.log("lok",this.state.AccountNumber,"esh ",step.stepName)}{step.stepName}</span>
                          </a>
                        </li>):("")
                      );
                    })}
                  </ul>
                </div>
                <div className="shipment-content">
                  <div className="shipment-pane mt-20" id="userdetails">
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText={<span>User Name*</span>}
                          id="username"
                          error={this.state.usernameErr}
                          helperText={this.state.usernameHelperText}
                          formControlProps={{ fullWidth: true }}
                          inputType="text"
                          inputProps={{
                            autoComplete: "off",
                            onFocus: () =>
                              this.setState({
                                checkUserName: false,
                                usernameErr: false,
                                usernameHelperText: "",
                              }),
                            onBlur: (event) =>
                              this.handleBlurUser(event, "username"),
                            onChange: (event) =>
                              this.handleChange(event, "username"),
                            value: userName,
                            endAdornment:
                              this.state.checkUserName !== true ? (
                                <Icon>account_circle</Icon>
                              ) : this.state.usernameErr ? (
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
                      
                      <GridItem xs={12} sm={12} md={3}>
                        {this.props.match.params.id ? null : (
                          <FormControl
                            fullWidth
                            className="pass-input"
                            error={this.state.passwordErr}
                          >
                            <InputLabel htmlFor="standard-adornment-password">
                              Password
                            </InputLabel>
                            <Input
                              label="Password"
                              id="password"
                              // type="new-password"
                              //autoComplete="off"
                              value={this.state.Password}
                              formControlProps={{ fullWidth: true }}
                              aria-describedby="simple-popover"
                              helperText={this.state.passwordHelperText}
                              inputProps={{
                                onChange: (event) =>
                                  this.handleChange(event, "password"),
                                onBlur: (event) =>
                                  this.handleChange(event, "password"),
                                onFocus: () =>
                                  this.setState({
                                    passwordErr: false,
                                    passwordHelperText: "",
                                    checkPassword: true,
                                  }),
                              }}
                              endAdornment={
                                <InputAdornment position="end">
                                  <Icon>lock</Icon>
                                </InputAdornment>
                              }
                            />
                            <FormHelperText>
                              {this.state.passwordHelperText}
                            </FormHelperText>
                          </FormControl>
                        )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText={<span>Account Number</span>}
                          id="accountNumber"
                          name="accountNumber"
                          variant="outlined"
                          error={this.state.accountNumberErr}
                          helperText={this.state.accountNumberHelperText}
                          formControlProps={{ fullWidth: true }}
                          
                          inputProps={{
                            onFocus: () =>
                              this.setState({
                                checkAccountNumber: false,
                                accountNumberErr: false,
                                accountNumberHelperText: "",
                              }),
                            onBlur: (event) =>
                              this.handleChange(event, "accountnumber"),
                            onChange: (event) =>
                              this.handleChange(event, "accountnumber"),
                            value: AccountNumber,
                            disabled:this.state.ShipmentCount && this.state.isAccountAlready? true:false,
                            endAdornment:
                              this.state.checkAccountNumber !== true ? (
                                <Icon>person</Icon>
                              ) : this.state.accountNumberErr ? (
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
                      <GridItem xs={12} sm={12} md={3}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={managedBy}
                          value={ManagedBy}
                          onChange={(event, value) =>
                            this.ChangeCountry(value, "ManagedBy")
                          }
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField {...params} label="Managed By" />
                          )}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText={<span>Company Name</span>}
                          id="CompanyName"
                          name="CompanyName"
                          variant="outlined"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            onFocus: () =>
                              this.setState({
                                checkcompanyName: false,
                                companyNameErr: false,
                                companyNameHelperText: "",
                              }),
                            onBlur: (event) =>
                              this.handleChange(event, "companyname"),
                            onChange: (event) =>
                              this.handleChange(event, "companyname"),
                            value: CompanyName,
                            endAdornment:
                              this.state.checkcompanyName !== true ? (
                                <Icon>person</Icon>
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
                        <CustomInput
                          labelText={<span>Address Line 1</span>}
                          id="addressline1"
                          name="addressline1"
                          variant="outlined"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            onFocus: () =>
                              this.setState({
                                checkAddressLine1: false,
                                addressLine1Err: false,
                                addressLine1HelperText: "",
                              }),
                            onBlur: (event) =>
                              this.handleChange(event, "addressline1"),
                            onChange: (event) =>
                              this.handleChange(event, "addressline1"),
                            value: AddressLine1,
                            endAdornment:
                              this.state.checkAddressLine1 !== true ? (
                                <Icon>person</Icon>
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
                        <CustomInput
                          labelText={<span>Address Line 2</span>}
                          id="addressline2"
                          name="addressline2"
                          variant="outlined"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            onFocus: () =>
                              this.setState({
                                checkAddressLine2: false,
                                addressLine2Err: false,
                                addressLine2HelperText: "",
                              }),
                            onBlur: (event) =>
                              this.handleChange(event, "addressline2"),
                            onChange: (event) =>
                              this.handleChange(event, "addressline2"),
                            value: AddressLine2,
                            endAdornment:
                              this.state.checkAddressLine2 !== true ? (
                                <Icon>person</Icon>
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
                        <CustomInput
                          labelText={<span>Address Line 3</span>}
                          id="addressline3"
                          name="addressline3"
                          variant="outlined"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            onFocus: () =>
                              this.setState({
                                checkAddressLine3: false,
                                addressLine3Err: false,
                                addressLine3HelperText: "",
                              }),
                            onBlur: (event) =>
                              this.handleChange(event, "addressline3"),
                            onChange: (event) =>
                              this.handleChange(event, "addressline3"),
                            value: AddressLine3,
                            endAdornment:
                              this.state.checkAddressLine3 !== true ? (
                                <Icon>person</Icon>
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
                      <GridItem xs={12} sm={12} md={3}>
                        <Autocomplete
                          options={CountryOptions}
                          id="Country"
                          getOptionLabel={(option) => option.label}
                          value={Country}
                          autoSelect
                          onChange={(event, value) =>
                            this.ChangeCountry(value, "Country")
                          }
                          renderInput={(params) => (
                            <TextField {...params} label="Country" />
                          )}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText={<span>Zip</span>}
                          id="zip"
                          name="zip"
                          variant="outlined"
                          error={this.state.zipCodeErr}
                          helperText={this.state.zipCodeHelperText}
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            onFocus: () =>
                              this.setState({
                                checkZipCode: false,
                                zipCodeErr: false,
                                zipCodeHelperText: "",
                              }),
                            onBlur: (event) => this.handleZipBlur(event, "zip"),
                            onChange: (event) =>
                              this.handleChange(event, "zip"),
                            value: ZipCode,
                            endAdornment:
                              this.state.checkZipCode !== true ? (
                                <Icon>person</Icon>
                              ) : this.state.zipCodeErr ? (
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
                      <GridItem xs={12} sm={12} md={3}>
                        {this.state.CityAutoComplete === false ? (
                          <CustomInput
                            labelText="City"
                            id="city"
                            formControlProps={{ fullWidth: true }}
                            inputProps={{
                              value: City,
                              onChange: (event) =>
                                this.handleChange(event, "City"),
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
                        ) : (
                          <Autocomplete
                            options={CityOptions}
                            id="fromcity"
                            autoSelect
                            getOptionLabel={(option) => option.label}
                            value={City}
                            onChange={(event, value) =>
                              this.ChangeCountry(event, value, "City")
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                margin="normal"
                                label="City"
                                fullWidth
                              />
                            )}
                          />
                        )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        {this.state.StateAutoComplete === false ? (
                          <CustomInput
                            labelText="State"
                            id="state"
                            formControlProps={{ fullWidth: true }}
                            inputProps={{
                              value: State,
                              onChange: (event) =>
                                this.handleChange(event, "State"),
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
                        ) : (
                          <Autocomplete
                            options={StateOptions}
                            id="State"
                            autoSelect
                            getOptionLabel={(option) => option.label}
                            value={State}
                            onChange={(event, value) =>
                              this.ChangeCountry(value, "State")
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                margin="normal"
                                label="State"
                                fullWidth
                              />
                            )}
                          />
                        )}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText={<span>Contact Name</span>}
                          id="fullname"
                          name="fullname"
                          variant="outlined"
                          error={this.state.fullnameErr}
                          helperText={this.state.fullnameHelperText}
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            onFocus: () =>
                              this.setState({
                                checkFullname: false,
                                fullnameErr: false,
                                fullnameHelperText: "",
                              }),
                            onBlur: (event) =>
                              this.handleChange(event, "fullname"),
                            onChange: (event) =>
                              this.handleChange(event, "fullname"),
                            value: fullName,
                            endAdornment:
                              this.state.checkFullname !== true ? (
                                <Icon>person</Icon>
                              ) : this.state.fullnameErr ? (
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
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText={<span>Phone 1</span>}
                          id="mobile"
                          error={this.state.mobileErr}
                          helperText={this.state.mobileHelperText}
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            onBlur: (event) =>
                              this.handleChange(event, "mobile"),
                            onChange: (event) =>
                              this.handleChange(event, "mobile"),
                            onFocus: () =>
                              this.setState({
                                checkMobile: false,
                                mobileErr: false,
                                mobileHelperText: "",
                              }),
                            value: Mobile,
                            endAdornment:
                              this.state.checkMobile !== true ? (
                                <Icon>phone</Icon>
                              ) : this.state.mobileErr ? (
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
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText={<span>Phone 2</span>}
                          id="mobile"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            onBlur: (event) =>
                              this.handleChange(event, "mobile1"),
                            onChange: (event) =>
                              this.handleChange(event, "mobile1"),
                            onFocus: () =>
                              this.setState({
                                checkMobile1: false,
                                mobile1Err: false,
                                mobile1HelperText: "",
                              }),
                            value: Mobile1,
                            endAdornment:
                              this.state.checkMobile1 !== true ? (
                                <Icon>phone</Icon>
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
                        <CustomInput
                          labelText="Email"
                          id="Email"
                          error={this.state.emailErr}
                          formControlProps={{ fullWidth: true }}
                          helperText={this.state.emailHelperText}
                          inputProps={{
                            onBlur: (event) =>
                              this.handleChange(event, "email"),
                            onFocus: () =>
                              this.setState({
                                emailErr: false,
                                emailHelperText: "",
                                checkEmail: false,
                              }),
                            onChange: (event) =>
                              this.handleChange(event, "email"),
                            value: Email,
                            endAdornment:
                              this.state.checkEmail !== true ? (
                                <Icon>email</Icon>
                              ) : this.state.emailErr ? (
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
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <div className="ipt-addon">
                          <Autocomplete
                            id="combo-box-demo"
                            options={paperSize}
                            value={this.state.PaperSize}
                            onChange={(event, value) =>
                              this.ChangeCountry(value, "PaperSize")
                            }
                            getOptionLabel={(option) => option.label}
                            renderInput={(params) => (
                              <TextField {...params} label="Paper Size" />
                            )}
                            
                          />
                          <Tooltip title="Paper Size Preview" arrow><a id="paperpreview" className="addon-icn" href={this.state.pagePreviewLink} target="_blank"><Icon>book</Icon></a></Tooltip>
                        </div>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={userstatus}
                          value={this.state.Status}
                          onChange={(event, value) =>
                            this.activeInactiveUser(value)
                          }
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField {...params} label="User Status" />
                          )}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={userType}
                          value={this.state.userType}
                          onChange={(event, value) =>
                            this.setUserType(value)
                          }
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField {...params} label="User Type*"
                            error={this.state.userTypeErr}
                            helperText={this.state.userTypeHelperText}
                            fullWidth />
                          )}
                        />
                    </GridItem>
                      {/* <GridItem xs={12} sm={12} md={3}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={userTimeZone}
                          value={this.state.userTimeZone}
                          onChange={(event, value) =>
                            this.setUserTimeZone(value)
                          }
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField {...params} label="Time Zone" />
                          )}
                        />
                      </GridItem> */}
                    </GridContainer>
                   
                   {/* <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <h3 className="margin-right-auto text-color-black">
                          Page Size Preview
                        </h3>
                      </GridItem>
                      {this.generatePreviewLink()}
                    </GridContainer>
                  */}
                    {(this.state.userType !== null && this.state.userType.value === "Employee" ) ? (
                     <Card >
                      <CardHeader className="btn-right-outer" color="primary" icon>
                        <CardIcon color="primary">
                          <User />
                        </CardIcon>
                        <h4 className="margin-right-auto text-color-black">
                          Employee Details                        </h4>
                      </CardHeader>
                     <Cardbody>
                     <div className="shipment-pane mt-20" id="userdetails">
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={userTypeTimeZone}
                          value={this.state.usertypeTimeZone}
                          onChange={(event, value) =>
                            this.setUserTimeZone(value)
                          }
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField {...params} label="Time Zone*" 
                            error={this.state.usertypeTimeZoneErr}
                            helperText={this.state.usertypeTimeZoneHelperText}
                            fullWidth
                            />
                          )}
                        />
                      </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <div className="dt-vs date-spl">
                          <FormControl fullWidth>
                          <TextField
                            id="Starttime"
                            label="Start Time"
                            type="time"
                            defaultValue=""
                            value={this.state.StartTime}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(time) =>
                              this.handleTimeChange(time,"start_time")
                            }
                            inputProps={{
                              step: 300, // 5 min
                            }}
                          />
                            
                          </FormControl>
                    </div>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <div className="dt-vs date-spl">
                          <FormControl fullWidth>
                          <TextField
                            id="Endtime"
                            label="End Time"
                            type="time"
                            defaultValue=""
                            value={this.state.EndTime}
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={(time) =>
                              this.handleTimeChange(time,"end_time")
                            }
                            inputProps={{
                              step: 300, // 5 min
                            }}
                          />
                            
                          </FormControl>
                        </div>
                      </GridItem>
                      
                      <GridItem xs={12} sm={12} md={3}>
                  <div className="dt-vs date-spl">
                    <FormControl fullWidth>
                      <Datetime
                        dateFormat={"MM/DD/YYYY"}
                        timeFormat={false}
                        selected={moment(this.state.BirthDate)}
                        value={moment(this.state.BirthDate)} 
                        inputProps={{ placeholder: "Date of Birth" }}
                        onChange={(date) =>
                          this.handleDateChange(date, "DOB")
                        }
                        closeOnSelect={true}
                        renderInput={(params) => (
                          <TextField
                            style={{ marginTop: "-15px" }}
                            error={this.state.birthdateErr}
                            helperText={this.state.birthdateHelperText}
                            {...params}
                            label="Date of Birth*"
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
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                  <div className="dt-vs date-spl">
                    <FormControl fullWidth>
                      <Datetime
                        dateFormat={"MM/DD/YYYY"}
                        timeFormat={false}
                        selected={moment(this.state.JoinDate)}
                        value={moment(this.state.JoinDate)} 
                        inputProps={{ placeholder: "Joining Date" }}
                        onChange={(date) =>
                          this.handleDateChange(date, "join")
                        }
                        closeOnSelect={true}
                        renderInput={(params) => (
                          <TextField
                            style={{ marginTop: "-15px" }}
                            error={this.state.joindateErr}
                            helperText={this.state.joindateHelperText}
                            {...params}
                            label="Joining Date*"
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
                            selected={moment(this.state.RelivingDate)}
                            value={moment(this.state.RelivingDate)} 
                            inputProps={{ placeholder: "Reliving Date" }}
                            onChange={(date) => this.handleDateChange(date, "Reliving")}
                            closeOnSelect={true}
                            renderInput={(params) => (
                              <TextField
                                style={{ marginTop: "-15px" }}
                                error={this.state.relivingdateErr}
                                helperText={this.state.relivingdateHelperText}
                                {...params}
                                label="Reliving Date"
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
                        labelText={<span>Address Line 1</span>}
                        id="Usertypeaddressline1"
                        name="Usertypeaddressline1"
                        variant="outlined"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          onFocus: () =>
                            this.setState({
                              UsertypecheckAddressLine1: false,
                              UsertypeaddressLine1Err: false,
                              UsertypeaddressLine1HelperText: "",
                            }),
                          onBlur: (event) =>
                            this.handleChange(event, "Usertypeaddressline1"),
                          onChange: (event) =>
                            this.handleChange(event, "Usertypeaddressline1"),
                          value: UsertypeAddressLine1, 
                          endAdornment:
                            this.state.UsertypecheckAddressLine1 !== true ? (
                              <Icon>place</Icon>
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
                      <CustomInput
                        labelText={<span>Address Line 2</span>}
                        id="Usertypeaddressline2"
                        name="Usertypeaddressline2"
                        variant="outlined"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          onFocus: () =>
                            this.setState({
                              UsertypecheckAddressLine2: false,
                              UsertypeaddressLine2Err: false,
                              UsertypeaddressLine2HelperText: "",
                            }),
                          onBlur: (event) =>
                            this.handleChange(event, "Usertypeaddressline2"),
                          onChange: (event) =>
                            this.handleChange(event, "Usertypeaddressline2"),
                          value: UsertypeAddressLine2, 
                          endAdornment:
                            this.state.UsertypecheckAddressLine2 !== true ? (
                              <Icon>place</Icon>
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
                      <GridItem xs={12} sm={12} md={3}>
                        <Autocomplete
                          options={CountryOptions}
                          id="UsertypeCountry"
                          getOptionLabel={(option) => option.label}
                          value={UsertypeCountry} 
                          autoSelect
                          onChange={(event, value) =>
                            this.ChangeCountry(value, "UsertypeCountry")
                          }
                          renderInput={(params) => (
                            <TextField {...params} label="Country" />
                          )}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText={<span>Zip</span>}
                          id="Usertypezip"
                          name="Usertypezip"
                          variant="outlined"
                          error={this.state.UsertypezipCodeErr}
                          helperText={this.state.UsertypezipCodeHelperText}
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            onFocus: () =>
                              this.setState({
                                UsertypecheckZipCode: false,
                                UsertypezipCodeErr: false,
                                UsertypezipCodeHelperText: "",
                              }),
                            onBlur: (event) => this.handleZipBlur(event, "Usertypezip"),
                            onChange: (event) =>
                              this.handleChange(event, "Usertypezip"),
                            value: UsertypeZipCode, 
                            endAdornment:
                              this.state.UsertypecheckZipCode !== true ? (
                                <Icon>person</Icon>
                              ) : this.state.UsertypezipCodeErr ? (
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
                      <GridItem xs={12} sm={12} md={3}>
                        {this.state.CityAutoComplete === false ? (
                          <CustomInput
                            labelText="City"
                            id="Usertypecity"
                            formControlProps={{ fullWidth: true }}
                            inputProps={{
                              value: UsertypeCity, 
                              onChange: (event) =>
                                this.handleChange(event, "UsertypeCity"),
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
                        ) : (
                          <Autocomplete
                            options={CityOptions}
                            id="Usertypefromcity"
                            autoSelect
                            getOptionLabel={(option) => option.label}
                            value={UsertypeCity} 
                            onChange={(event, value) =>
                              this.ChangeCountry(event, value, "UsertypeCity")
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                margin="normal"
                                label="City"
                                fullWidth
                              />
                            )}
                          />
                        )}
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        {this.state.UsertypeStateAutoComplete === false ? (
                          <CustomInput
                            labelText="State"
                            id="Usertypestate"
                            formControlProps={{ fullWidth: true }}
                            inputProps={{
                              value: UsertypeState, 
                              onChange: (event) =>
                                this.handleChange(event, "UsertypeState"),
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
                        ) : (
                          <Autocomplete
                            options={UsertypeStateOptions}
                            id="UsertypeState"
                            autoSelect
                            getOptionLabel={(option) => option.label}
                            value={UsertypeState} 
                            onChange={(event, value) =>
                              this.ChangeCountry(value, "UsertypeState")
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                margin="normal"
                                label="State"
                                fullWidth
                              />
                            )}
                          />
                        )}
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText={<span>Phone 1</span>}
                          id="Usertypemobile"
                          error={this.state.UsertypemobileErr}
                          helperText={this.state.UsertypemobileHelperText}
                          formControlProps={{ fullWidth: true }}
                          type="number"
                          inputProps={{
                            onBlur: (event) =>
                              this.handleChange(event, "Usertypemobile"),
                            onChange: (event) =>
                              this.handleChange(event, "Usertypemobile"),
                            onFocus: () =>
                              this.setState({
                                UsertypecheckMobile: false,
                                UsertypemobileErr: false,
                                UsertypemobileHelperText: "",
                              }),
                            value: UsertypeMobile, 
                            endAdornment:
                              this.state.UsertypecheckMobile !== true ? (
                                <Icon>phone</Icon>
                              ) : this.state.UsertypemobileErr ? (
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
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText={<span>Phone 2</span>}
                          id="Usertypemobile1"
                          error={this.state.UsertypemobileErr1}
                          helperText={this.state.UsertypemobileHelperText1}
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            onBlur: (event) =>
                              this.handleChange(event, "Usertypemobile1"),
                            onChange: (event) =>
                              this.handleChange(event, "Usertypemobile1"),
                            onFocus: () =>
                              this.setState({
                                UsertypecheckMobile1: false,
                                UsertypemobileErr1: false,
                                UsertypemobileHelperText1: "",
                              }),
                            value: UsertypeMobile1, 
                            endAdornment:
                              this.state.UsertypecheckMobile1 !== true ? (
                                <Icon>phone</Icon>
                              ) :  this.state.UsertypemobileErr1 ? (
                                <InputAdornment position="end">
                                  <CloseIcon
                                    style={{ color: red[500] }}
                                    className={useStyles.danger}
                                  />
                                </InputAdornment>
                              ) : this.state.UsertypeMobile1 === "" ? (
                                <Icon>phone</Icon>
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
                        <CustomInput
                          labelText="Email"
                          id="UsertypeEmail1"
                          error={this.state.UsertypeemailErr1}
                          formControlProps={{ fullWidth: true }}
                          helperText={this.state.UsertypeemailHelperText1}
                          inputProps={{
                            onBlur: (event) =>
                              this.handleChange(event, "Usertypeemail1"),
                            onFocus: () =>
                              this.setState({
                                UsertypeemailErr1: false,
                                UsertypeemailHelperText1: "",
                                UsertypecheckEmail1: false,
                              }),
                            onChange: (event) =>
                              this.handleChange(event, "Usertypeemail1"),
                            value: UsertypeEmail1, 
                            endAdornment:
                              this.state.UsertypecheckEmail1 !== true ? (
                                <Icon>email</Icon>
                              ) : this.state.UsertypeemailErr1 ? (
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
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText="Email2"
                          id="UsertypeEmail2"
                          error={this.state.UsertypeemailErr2}
                          formControlProps={{ fullWidth: true }}
                          helperText={this.state.UsertypeemailHelperText2}
                          inputProps={{
                            onBlur: (event) =>
                              this.handleChange(event, "Usertypeemail2"),
                            onFocus: () =>
                              this.setState({
                                UsertypeemailErr2: false,
                                UsertypeemailHelperText2: "",
                                UsertypecheckEmail2: false,
                              }),
                            onChange: (event) =>
                              this.handleChange(event, "Usertypeemail2"),
                            value: UsertypeEmail2,
                            endAdornment:
                              this.state.UsertypecheckEmail2 !== true ? (
                                <Icon>email</Icon>
                              ) : this.state.UsertypeemailErr2 ? (
                                <InputAdornment position="end">
                                  <CloseIcon
                                    style={{ color: red[500] }}
                                    className={useStyles.danger}
                                  />
                                </InputAdornment>
                              ) : this.state.UsertypeEmail2 === ""? (
                                <Icon>email</Icon>
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
                    <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText={<span>Salary</span>}
                          id="Usertypesalary"
                          error={this.state.UsertypesalaryErr}
                          helperText={this.state.UsertypesalaryHelperText}
                          formControlProps={{ fullWidth: true }}
                          type="number"
                          inputProps={{
                            onBlur: (event) =>
                              this.handleChange(event, "Usertypesalary"),
                            onChange: (event) =>
                              this.handleChange(event, "Usertypesalary"),
                            onFocus: () =>
                              this.setState({
                                Usertypechecksalary: false,
                                salaryErr: false,
                                salaryHelperText: "",
                              }),
                            value: UsertypeSalary, 
                            endAdornment:
                              this.state.Usertypechecksalary !== true ? (
                                <Icon>money</Icon>
                              ) : this.state.UsertypesalaryErr ? (
                                <InputAdornment position="end">
                                  <CloseIcon
                                    style={{ color: red[500] }}
                                    className={useStyles.danger}
                                  />
                                </InputAdornment>
                              ) :  this.state.UsertypeSalary ==="" ? (
                                <Icon>money</Icon>
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
                          id="combo-box-demo"
                          options={userTypeCurrencyDrop}
                          value={this.state.UsertypeCurrency}
                          onChange={(event, value) =>
                            this.setUserCurrency(value)
                          }
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField {...params} label="Currency" />
                          )}
                        />
                      </GridItem>
                      {/*<GridItem xs={12} sm={12} md={3}>
                         <CustomInput
                          labelText={<span>Curency</span>}
                          id="Usertypecurrency"
                          error={this.state.currencyErr}
                          helperText={this.state.currencyHelperText}
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            onBlur: (event) =>
                              this.handleChange(event, "Usertypecurrency"),
                            onChange: (event) =>
                              this.handleChange(event, "Usertypecurrency"),
                            onFocus: () =>
                              this.setState({
                                checkcurrency: false,
                                currencyErr: false,
                                currencyHelperText: "",
                              }),
                            value: Currency,
                            endAdornment:
                              this.state.checkCurrency !== true ? (
                                <Icon>currency</Icon>
                              ) : this.state.currencyErr ? (
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
                      </GridItem>*/}
                      {/* <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText={<span>Department</span>}
                          id="Usertypedepartment"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            onBlur: (event) =>
                              this.handleChange(event, "Usertypedepartment"),
                            onChange: (event) =>
                              this.handleChange(event, "Usertypedepartment"),
                            onFocus: () =>
                              this.setState({
                                checkMobile1: false,
                                mobile1Err: false,
                                mobile1HelperText: "",
                              }),
                            value: department,
                            endAdornment:
                              this.state.checkMobile1 !== true ? (
                                <Icon>phone</Icon>
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
                      </GridItem> */}
                       <GridItem xs={12} sm={12} md={3}>
                        <Autocomplete
                          id="combo-box-demo"
                          options={userTypeDepartmentDrop}
                          value={this.state.userTypeDepartment} 
                          onChange={(event, value) =>
                            this.setUserDepartment(value)
                          }
                          getOptionLabel={(option) => option.label}
                          renderInput={(params) => (
                            <TextField {...params} label="Department" />
                          )}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText="Employee ID"
                          id="employeeid"
                          
                          error={this.state.userTypeEmployeeIdErr}
                          formControlProps={{ fullWidth: true }}
                          helperText={this.state.userTypeEmployeeIdHelperText}
                          inputProps={{
                            onBlur: (event) =>
                              this.handleChange(event, "Usertypeemployeeid"),
                            onFocus: () =>
                              this.setState({
                                userTypeEmployeeIdErr: false,
                                userTypeEmployeeIdHelperText: "",
                                checkuserTypeEmployeeId: false,
                              }),
                            onChange: (event) =>
                              this.handleChange(event, "Usertypeemployeeid"),
                            value: Usertypeemployeeid,
                            endAdornment:
                              this.state.checkuserTypeEmployeeId !== true ? (
                                <Icon>info</Icon>
                              ) : this.state.userTypeEmployeeIdErr ? (
                                <InputAdornment position="end">
                                  <CloseIcon
                                    style={{ color: red[500] }}
                                    className={useStyles.danger}
                                  />
                                </InputAdornment>
                              ) : this.state.Usertypeemployeeid === "" ? (
                                <Icon>info</Icon>
                              ) :(
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
                   
                      </div>
                    </Cardbody>
                     </Card>
                      ):""}
                    
                  </div>
                  <div className="shipment-pane mt-20" id="accessdetails">
                    <div className="package-table lead-access-table">
                      <table>
                        <thead>
                          <tr>
                            <th className="wd-330">Module Name</th>
                            <th className="align-left">
                              <div className="th-check">
                                Read Access<br></br>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onChange={(event) =>
                                        this.handleInputChange(event, "ReadAll")
                                      }
                                    />
                                  }
                                  classes={{
                                    label: classes.label,
                                    root: classes.labelRoot,
                                  }}
                                />
                              </div>
                            </th>
                            <th className="align-left">
                              <div className="th-check">
                                Write Access<br></br>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onChange={(event) =>
                                        this.handleInputChange(
                                          event,
                                          "WriteAll"
                                        )
                                      }
                                    />
                                  }
                                  classes={{
                                    label: classes.label,
                                    root: classes.labelRoot,
                                  }}
                                />
                              </div>
                            </th>
                            <th className="align-left">
                              <div className="th-check">
                                Delete Access<br></br>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onChange={(event) =>
                                        this.handleInputChange(
                                          event,
                                          "DeleteAll"
                                        )
                                      }
                                    />
                                  }
                                  classes={{
                                    label: classes.label,
                                    root: classes.labelRoot,
                                  }}
                                />
                              </div>
                            </th>
                            <th className="align-left">
                              <div className="th-check">
                                All Access<br></br>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      onChange={(event) =>
                                        this.handleInputChange(
                                          event,
                                          "AllAccess"
                                        )
                                      }
                                    />
                                  }
                                  classes={{
                                    label: classes.label,
                                    root: classes.labelRoot,
                                  }}
                                />
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>{this.renderModule()}</tbody>
                      </table>
                    </div>
                  </div>
                  <div className="shipment-pane mt-20" id="markupdetails">
                    <div className="ft-outer">
                      {/* <div
                        className="filter-top-right"
                        onMouseLeave={() =>
                          this.setState({ IsDropDownShow: false })
                        }
                        onMouseOver={() => this.setState({ IsDropDownShow: true })}
                      >
                        <Button
                          className="cm-toggle"
                          color="rose"
                          // onClick={() =>
                          //   this.setState({
                          //     IsDropDownShow:
                          //       this.state.IsDropDownShow === true ? false : true,
                          //   })
                          // }
                        >
                          Country <ExpandMoreIcon />
                        </Button>
                        {this.state.IsDropDownShow === true ? (
                          <div className="cm-dropdown" ref={this.state.ref}>
                            <div className="overflow-handle">
                              {this.state.countryWise.map((step, key) => {
                                return (
                                  <li>
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={step.IsSelected}
                                        onChange={(e, value) =>
                                          this.handleServiceCheckboxChange(
                                            e,
                                            step,
                                            step.value
                                          )
                                        }
                                        value={this.state.countryWise}
                                      />{" "}
                                      {step.label}
                                    </label>
                                  </li>
                                );
                              })}
                            </div>
                            <div className="cms-wrap">
                              { <Button
                                className="cm-search-btn"
                                color="rose"
                              // onClick={() => this.showSearchFilter("Shipment")}
                              >
                                Search
                              </Button> }
                            </div>
                          </div>
                        ) : null}
                      </div> */}
                    </div>
                    <div className="package-table">
                     <table>
                        <thead>
                          <tr>
                            <th>
                              <div className="relative">
                              <div
                        className="filter-top-right filter-top-right-user-markup left"
                        onMouseLeave={() =>
                          this.setState({ IsDropDownShow: false })
                        }
                        onMouseOver={() => this.setState({ IsDropDownShow: true })}
                      >
                        <Button
                          className="cm-toggle"
                          color="rose"
                          // onClick={() =>
                          //   this.setState({
                          //     IsDropDownShow:
                          //       this.state.IsDropDownShow === true ? false : true,
                          //   })
                          // }
                        >
                          Country <ExpandMoreIcon />
                        </Button>
                        {this.state.IsDropDownShow === true ? (
                          <div className="cm-dropdown " ref={this.state.ref}>
                            <div className="overflow-handle">
                              {this.state.countryWise.map((step, key) => {
                                return (
                                  <li>
                                    <label>
                                      <input
                                        type="checkbox"
                                        checked={step.IsSelected}
                                        onChange={(e, value) =>
                                          this.handleStepValue(
                                            e,
                                            step,
                                            step.value
                                          )
                                        }
                                        value={this.state.countryWise}
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
                                onClick={() => this.handleServiceCheckboxChange(
                                  this.state.eValue,
                                  this.state.recordValue,
                                  this.state.typeValue
                                )}
                              >
                                Search
                              </Button>
                            </div>
                          </div>
                        ) : null}
                      </div></div></th>
                            <th>Type</th>
                            <th>Service Name</th>
                            <th>Sub Service Name</th>
                            <th>Display Name</th>
                            <th>Pkg Markup</th>
                            <th>Env Markup</th>
                            <th>Markup Type</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderMarkup()}</tbody>
                      </table>
                       
                        {/* <ReactTable
                          
                          data={this.state.serviceList}
                          
                          minRows={0}
                          filterable
                          defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                          resizable={false}
                          columns={columns1}
                          defaultPageSize={10}
                          showPaginationBottom={true}
                          className="-striped -highlight"
                        /> */}
                    </div>
                  </div>

                  <div className="shipment-pane mt-20" id="documentation">
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
                  </div>
                </div>
              </Cardbody>
            </Card>
           
              <div className="shipment-submit">

                {CommonConfig.getUserAccess("User Management").DeleteAccess === 1 ?(
                  <div className="left">
                    <Button
                      justify="center"
                      color="danger"
                      onClick={() => this.deleteUser()}
                    >
                      Delete
                    </Button>
                  </div>
                ):null}

                
                {CommonConfig.getUserAccess("User Management").WriteAccess === 1 && (CommonConfig.loggedInUserData().PersonID == this.props.location.state) ?(
                  <div className="right">
                  
                    {/* <div> */}
                      {CommonConfig.isEmpty(this.props.location.state) ? null : (
                        <Button color="rose" onClick={() => this.saveUser(false)}>
                          Save
                        </Button>
                      )}
                      <Button color="primary" onClick={() => this.saveUser(true)}>
                        Save & Exit
                      </Button>
                    {/* </div> */}
                  
                    
                    <Button color="secondary" onClick={() => this.cancelUser()}>
                      Cancel
                    </Button>
                  </div>
                ):
                CommonConfig.getUserAccess("User Management").WriteAccess === 1 && CommonConfig.getUserAccess("User Management").AllAccess === 1 ?(
                  <div className="right">
                  
                  {/* <div> */}
                    {CommonConfig.isEmpty(this.props.location.state) ? null : (
                      <Button color="rose" onClick={() => this.saveUser(false)}>
                        Save
                      </Button>
                    )}
                    <Button color="primary" onClick={() => this.saveUser(true)}>
                      Save & Exit
                    </Button>
                  {/* </div> */}
                
                  
                  <Button color="secondary" onClick={() => this.cancelUser()}>
                    Cancel
                  </Button>
                </div>
                ):
                  <div className="right">
                    <Button color="secondary" onClick={() => this.cancelUser()}>
                      Cancel
                    </Button>
                  </div>
                }

               
              </div>
         
          </GridItem>
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
