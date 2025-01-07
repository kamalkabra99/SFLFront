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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
const useStyles = makeStyles(styles);

const classes = () => {
  return useStyles();
};

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ClientID:
      this.props.history.location.state &&
      this.props.history.location.state.id
        ? this.props.history.location.state.id
        : null,
      ClientName:"",
      ClientNameErr:false,
      ClientNameHelperText:"",
      checkClientName:false,
      CompanyName: "",                   
      checkCompanyName: false,
      AddressLine1: "",
      addressLine1Err: false,
      addressLine1HelperText: "",
      checkAddressLine1: false,
      AddressLine2: "",
      checkAddressLine2: false,
      addressLine2Err: false,
      addressLine2HelperText: "",
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
      Mobile: "",
      mobileErr: false,
      checkMobile: false,
      mobileHelperText: "",
      MobileID: "",
      Mobile1: "",
      Mobile1ID: null,
      mobile1Err: false,
      mobile1HelperText: "",
      checkMobile1: false,
      Email: "",
      emailErr: false,
      emailHelperText: "",
      checkEmail: false,
      Email2:"",
      email2Err: false,
      email2HelperText: "",
      checkEmail2: false,
      
      CityAutoComplete: false,
      StateAutoComplete: false,
      GoogleAPICityList: [],
      StateList: [],
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
    await this.getCountry();
    this.setState({ LoginpersonId: CommonConfig.loggedInUserData().PersonID });
   
    setTimeout(() => {
      this.getClientDetail();
    }, 2500);
  }
  
  getCountry = async ()=>{
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
    } catch (error) { }
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

async getClientDetail() {debugger
    try {
      var data = {
        ClientID:
          this.props.history.location.state &&
          this.props.history.location.state.id
            ? this.props.history.location.state.id
            : null,
      };
      this.showLoader();
      if(this.state.ClientID!= null){ 
      let result = await api.post("projectManagement/getClientDetailsById", data);
      if (result.success) {
        let SelectedCountry = this.state.CountryList.filter((x) => x.CountryID === result.Data[0].CountryID);
        var selectData = {value:SelectedCountry[0].CountryID,label:SelectedCountry[0].CountryName}

        this.setState({
          ClientID:result.Data[0].ClientID,
          ClientName:result.Data[0].ClientName,
          CompanyName:result.Data[0].CompanyName,
          AddressLine1:result.Data[0].AddressLine1, 
          AddressLine2:result.Data[0].AddressLine2, 
          Country:selectData, 
          State:result.Data[0].State, 
          City:result.Data[0].City, 
          ZipCode:result.Data[0].ZipCode, 
          Mobile:result.Data[0].Mobile, 
          Mobile1:result.Data[0].Mobile1, 
          Email:result.Data[0].Email1, 
          Email2:result.Data[0].Email2
        }); 
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
 
  showLoader = () => {
    this.setState({ Loading: true });
  };

  hideLoader = () => {
    this.setState({ Loading: false });
  };

  handleChange = (event, type) => {
    debugger
    if (type === "ClientName") {
      this.setState({ checkClientName: true });
      let ClientNameVal = event.target.value;
      if (CommonConfig.isEmpty(ClientNameVal)) {
        this.setState({
          ClientName: ClientNameVal,
          ClientNameErr: true,
          ClientNameHelperText: "Please enter Client Name",
        });
      } else if (ClientNameVal.trim() !== ClientNameVal) {
        this.setState({
          ClientName: ClientNameVal,
          ClientNameErr: true,
          ClientNameHelperText: "Please enter valid Client Name",
        });
      } else {
        this.setState({
          ClientName: ClientNameVal,
          ClientNameErr: false,
          ClientNameHelperText: "",
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
    } else if (type === "email2") {
      this.setState({ checkEmail2: true });
      let email2Val = event.target.value;
      let regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+\.[A-Z]{2,6}$/gi;
      if (email2Val != "" && email2Val != null) {
        if (email2Val.trim() !== email2Val || !email2Val.match(regExp)) {
        this.setState({
          Email2: email2Val,
          email2Err: true,
          email2HelperText: "Please enter valid Email",
        });
      } else {
        this.setState({
          Email2: email2Val,
          email2Err: false,
          email2HelperText: "",
        });
      }
    }
    else{
      this.setState({
        Email2: email2Val,
        email2Err: false,
        email2HelperText: "",
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
    
      
        this.setState({
          AddressLine2: addressVal,
          addressLine2Err: false,
          addressLine2HelperText: "",
        });
      
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
    } else if (type === "City") {
      this.setState({ City: event.target.value });
    } else if (type === "State") {
      this.setState({ State: event.target.value });
    } else if (type === "mobile1") {
      this.setState({ checkMobile1: true });
      let mobileVal1 = event.target.value;
      let regExp1 = /^[0-9]{10,15}$/;
      console.log("mobileValmobileVal",mobileVal1);
      console.log("regExpregExpregExp",regExp1);
      if (mobileVal1 != "" && mobileVal1 != null) {
        if (mobileVal1.trim() !== mobileVal1 || !mobileVal1.match(regExp1)) {
        this.setState({
          Mobile1: mobileVal1,
          mobile1Err: true,
          mobile1HelperText: "Please enter valid Mobile Number",
        });
      } else {
        this.setState({
          Mobile1: mobileVal1,
          mobile1Err: false,
          mobile1HelperText: "",
        });
      }
    } 
    else{
      this.setState({
        Mobile1: mobileVal1,
        mobile1Err: false,
        mobile1HelperText: "",
      });
  }
  }
  };
  handleBlurEmployee = (event, type) => {
    debugger

    if (type === "Usertypeemail1") {
      this.setState({ UsertypecheckEmail1: true });
      let emailVal = event.target.value;
      let regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+\.[A-Z]{2,6}$/gi;
      // if (emailVal === "" || emailVal === null) {
      //   this.setState({
      //     UsertypeEmail1: emailVal,
      //     UsertypeemailErr1: true,
      //     UsertypeemailHelperText1: "Please enter Email",
      //   });
      // } else
      if (emailVal != "" && (emailVal.trim() !== emailVal || !emailVal.match(regExp))) {
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
      if (emailVal.trim() != "" && (emailVal.trim() !== emailVal || !emailVal.match(regExp))) {
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
    } else if (type === "Usertypemobile") {
      this.setState({ UsertypecheckMobile: true });
      let mobileVal = event.target.value;
      let regExp = /^[0-9]{10,15}$/;

      // if (mobileVal === "" || mobileVal === null) {
      //   this.setState({
      //     UsertypeMobile: mobileVal,
      //     UsertypemobileErr: true,
      //     UsertypemobileHelperText: "Please enter Mobile Number",
      //   });
      // } else 
      if (mobileVal.trim() !== mobileVal || !mobileVal.match(regExp)) {
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
      if (mobileVal.trim() != "" && (mobileVal.trim() !== mobileVal || !mobileVal.match(regExp))) {
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
    } else if (type === "Usertypeaddressline1") {
      this.setState({ UsertypecheckAddressLine1: true });
      let addressVal = event.target.value;
      // if (addressVal === "" || addressVal === null) {
      //   this.setState({
      //     UsertypeAddressLine1: addressVal,
      //     UsertypeaddressLine1Err: true,
      //     UsertypeaddressLine1HelperText: "Please enter Address Line 1",
      //   });
      // } else {

      this.setState({
        UsertypeAddressLine1: addressVal,
        UsertypeaddressLine1Err: false,
        UsertypeaddressLine1HelperText: "",
      });
      // }
    } else if (type === "Usertypeaddressline2") {
      this.setState({ UsertypecheckAddressLine2: true });
      let addressVal = event.target.value;
      // if (addressVal === "" || addressVal === null) {
      //   this.setState({
      //     UsertypeAddressLine2: addressVal,
      //     UsertypeaddressLine2Err: true,
      //     UsertypeaddressLine2HelperText: "Please enter Address Line 2",
      //   });
      // } else {
      this.setState({
        UsertypeAddressLine2: addressVal,
        UsertypeaddressLine2Err: false,
        UsertypeaddressLine2HelperText: "",
      });
      // }
    } else if (type === "Usertypezip") {
      this.setState({ UsertypecheckZipCode: true });
      let addressVal = event.target.value.replace(/\D/g, "");
      // if (addressVal === "" || addressVal === null) {
      //   this.setState({
      //     UsertypeZipCode: addressVal,
      //     UsertypezipCodeErr: true,
      //     UsertypezipCodeHelperText: "Please enter Zip Code",
      //   });
      // } else {

      this.setState({
        UsertypeZipCode: addressVal,
        UsertypezipCodeErr: false,
        UsertypezipCodeHelperText: "",
      });
      // }

    } else if (type === "UsertypeCity") {
      this.setState({ UsertypeCity: event.target.value });
    } else if (type === "UsertypeState") {
      this.setState({ UsertypeState: event.target.value });

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
      if (salaryVal.trim() != "" && (salaryVal.trim() !== salaryVal || !salaryVal.match(regExp))) {
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


      if (employeeIdVal.trim() != "" && (employeeIdVal.trim() !== employeeIdVal || !employeeIdVal.match(regExp))) {
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

    if (this.state.ClientName === null || this.state.ClientName === "") {
      IsFormValid = false;
      this.setState({ ClientNameErr: true, ClientNameHelperText: "Mandatory Field" });
    }
    else
      if (this.state.companyName!="" && this.state.companyNameErr == true) {
        IsFormValid = false;
        this.setState({ companyNameHelperText: "Enter Valid Company Name" });
      }
      else
        if (this.state.mobileErr === true ) {
          IsFormValid = false;
          this.setState({ mobile1HelperText: "Enter Valid Phone Number" });
        }
        else
        if (this.state.mobile1Err === true ) {
          IsFormValid = false;
          this.setState({ mobile1HelperText: "Enter Valid Phone Number" });
        }         
        else
        if (this.state.emailErr === true ) {
          IsFormValid = false;
          this.setState({ emailHelperText: "Enter Valid Email Address" });
        }         
        else
        if (this.state.email2Err === true ) {
          IsFormValid = false;
          this.setState({ email2HelperText: "Enter Valid Email Address" });
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
    if (type === "join") {
      this.setState({
        JoinDate: date,
        joindateErr: false,
        joindateHelperText: "",
      });
      // if(this.state.BirthDate !== "")
      //   if(date > this.state.BirthDate){
      //     this.setState({
      //       JoinDate: date,
      //       joindateErr: false,
      //       joindateHelperText: "",
      //     });
      //   } 
      //   else
      //   {
      //     this.setState({
      //       JoinDate: "",
      //       joindateErr: true,
      //       joindateHelperText: "Joining Date must be after Date of Birth",
      //     });
      //   }
      // if(this.state.RelivingDate !== "")
      //   if(date > this.state.RelivingDate){
      //     this.setState({
      //       JoinDate: date,
      //       joindateErr: false,
      //       joindateHelperText: "",
      //     });
      //   } 
      //   else
      //     {
      //       this.setState({
      //         JoinDate: "",
      //         joindateErr: true,
      //         joindateHelperText: "Joining Date must be before Date of Reliving",
      //       });
      //     }
    } else if (type === "Reliving") {
      this.setState({
        RelivingDate: date,
        relivingdateErr: false,
        relivingdateHelperText: "",
      });
      // if(this.state.BirthDate !== "")
      //   if(date > this.state.BirthDate){
      //     this.setState({
      //       RelivingDate: date,
      //       relivingdateErr: false,
      //       relivingdateHelperText: "",
      //     });
      //   } 
      //   else
      //   {
      //     this.setState({
      //       RelivingDate: "",
      //       relivingdateErr: true,
      //       relivingdateHelperText: "Reliving Date must be after Date of Birth",
      //     });
      //   }
      //   if(this.state.JoinDate !== "")
      //     if(date > this.state.JoinDate){
      //       this.setState({
      //         RelivingDate: date,
      //         relivingdateErr: false,
      //         relivingdateHelperText: "",
      //       });
      //     } 
      //     else
      //     {
      //       this.setState({
      //         RelivingDate: "",
      //         relivingdateErr: true,
      //         relivingdateHelperText: "Reliving Date must be after Date of Join",
      //       });
      //     }
    } else if (type === "DOB") {
      this.setState({
        BirthDate: date,
        birthdateErr: false,
        birthdateHelperText: "",
      });
      // if(this.state.JoinDate !== "")
      //   if(date < this.state.JoinDate){
      //     this.setState({
      //       BirthDate: date,
      //       birthdateErr: false,
      //       birthdateHelperText: "",
      //     });
      //   } 
      //   else
      //   {
      //     this.setState({
      //       BirthDate: "",
      //       birthdateErr: true,
      //       birthdateHelperText: "Date of Birth must be before Date of Join",
      //     });
      //   }
      //   if(this.state.RelivingDate !== "")
      //   if(date < this.state.RelivingDate){
      //     this.setState({
      //       BirthDate: date,
      //       birthdateErr: false,
      //       birthdateHelperText: "",
      //     });
      //   } 
      //   else
      //   {
      //     this.setState({
      //       BirthDate: "",
      //       birthdateErr: true,
      //       birthdateHelperText: "Date of Birth must be before Date of Reliving",
      //     });
      //   }
    }
    else if (type === "ENDTIME") {
    
      this.setState({
        EndTime: date==""?date: moment(date).format(CommonConfig.dateFormat.time12Only).toString(),
        endtimeErr: false,
        endtimeHelperText: "",
      });
      

    }
      else if (type === "STARTTIME") {
       
        this.setState({
          StartTime:  date==""?date: moment(date).format(CommonConfig.dateFormat.time12Only).toString(),
          starttimeErr: false,
          starttimeHelperText: "",
        });
      }
      // if(this.state.JoinDate !== "")
      //   if(date < this.state.JoinDate){
      //     this.setState({
      //       BirthDate: date,
      //       birthdateErr: false,
      //       birthdateHelperText: "",
      //     });
      //   } 
      //   else
      //   {
      //     this.setState({
      //       BirthDate: "",
      //       birthdateErr: true,
      //       birthdateHelperText: "Date of Birth must be before Date of Join",
      //     });
      //   }
      //   if(this.state.RelivingDate !== "")
      //   if(date < this.state.RelivingDate){
      //     this.setState({
      //       BirthDate: date,
      //       birthdateErr: false,
      //       birthdateHelperText: "",
      //     });
      //   } 
      //   else
      //   {
      //     this.setState({
      //       BirthDate: "",
      //       birthdateErr: true,
      //       birthdateHelperText: "Date of Birth must be before Date of Reliving",
      //     });
      //   }
    
  };
  handleDateValidation = (date, type) => {
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
    if (type === "join") {
      this.setState({
        JoinDate: date,
        joindateErr: false,
        joindateHelperText: "",
      });
      if (this.state.BirthDate !== "")
        if (date > this.state.BirthDate) {
          this.setState({
            JoinDate: date,
            joindateErr: false,
            joindateHelperText: "",
          });
        }
        else {
          this.setState({
            JoinDate: "",
            joindateErr: true,
            joindateHelperText: "Joining Date must be after Date of Birth",
          });
        }
      if (this.state.RelivingDate !== "")
        if (date > this.state.RelivingDate) {
          this.setState({
            JoinDate: date,
            joindateErr: false,
            joindateHelperText: "",
          });
        }
        else {
          this.setState({
            JoinDate: "",
            joindateErr: true,
            joindateHelperText: "Joining Date must be before Date of Reliving",
          });
        }
    } else if (type === "Reliving") {

      this.setState({
        RelivingDate: date,
        relivingdateErr: false,
        relivingdateHelperText: "",
      });
      if (this.state.BirthDate !== "")
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
    else
    if (type === "ENDTIME") {
      if(date=="")
        this.setState({
          EndTime: "",
          endtimeErr: true,
          endtimeHelperText: "End Time is Mandatory",
        });
      else
        if(moment(date).format(CommonConfig.dateFormat.time12Only).toString()=="Invalid date")
            this.setState({
              EndTime:  "",
              endtimeErr: true,
              endtimeHelperText: "Please enter valid date",
            });
    }
      else if (type === "STARTTIME") {
        if(date=="")
          this.setState({
            StartTime:  "",
            starttimeErr: true,
            starttimeHelperText: "Start Time is Mandatory",
          });
        else{
          console.log("moment(date).format(CommonConfig.dateFormat.time12Only).toString()",moment(date).format(CommonConfig.dateFormat.time12Only).toString());
        if(moment(date).format(CommonConfig.dateFormat.time12Only).toString()=="Invalid date")
          this.setState({
            StartTime:  "",
            starttimeErr: true,
            starttimeHelperText: "Please enter valid date",
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
  saveClient = (redirect) => {
    debugger
    if (this.validate()) {
      try {
        this.showLoader();
        var userid = CommonConfig.loggedInUserData().PersonID;
        let ClientDetails = {
          ClientID:this.state.ClientID,
          ClientName: this.state.ClientName,
          CompanyName: this.state.CompanyName,
          AddressLine1: this.state.AddressLine1,
          AddressLine2: this.state.AddressLine2,
          ZipCode: this.state.ZipCode,
          City: this.state.City.value ? this.state.City.value : this.state.City,
          State: this.state.State.value
            ? this.state.State.value
            : this.state.State,
          CountryID: this.state.Country.value,
          Phone1:this.state.Mobile,
          Phone2:this.state.Mobile1,
          Email1:this.state.Email,
          Email2:this.state.Email2,
          userId:userid,
        };

        let calledApi ="ProjectManagement/addUpdateClient";

        api
          .post(calledApi, ClientDetails)
          .then((res) => {
            if (res.success) {
              this.hideLoader();
              cogoToast.success("Client Details Saved Successfully");
                if (redirect) {
                  this.props.history.push({
                    pathname: "/admin/ManageProjects",
                    state: {
                      filterlist: this.props.history.location.filterlist,
                      sortlist: this.props.history.location.sortlist,
                      searchCriteria:this.props.history.location.searchCriteria,
                      tabKey:this.props.history.tabKey,
                      ClientList:this.props.history.location.ClientList,
                    },
                  });
                } else {
                  this.getClientDetail();
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
        cogoToast.error("Something Went Wrong");
      }
    } else {
      cogoToast.error("Please correct error and resubmit the form");
    }
  };

  cancelClient = () => {debugger
    this.props.history.push({
      pathname: "/admin/ManageProjects",
      state: {
        filterlist: this.props.history.location.state.filterlist,
        sortlist: this.props.history.location.state.sortlist,
        // searchCriteria:this.props.history.location.searchCriteria,
        // clientList:this.props.history.location.ClientList,
        tabKey:this.props.history.location.state.tabKey,
      },
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

  handleZipBlur = (e, type) => {
    if (type === "zip") {
      this.zipChange(e.target.value, "All");
    }
    else if (type === "Usertypezip") {
      this.zipChange(e.target.value, "Usertype");
    }
  };

  ChangeCountry = (value, type) => {debugger
    if (value !== null) {
      if (type === "Country") {
        this.setState({ Country: value });
        this.getStates(value, "All");
      } else if (type === "City") {
        this.setState({ City: value });
      } else if (type === "State") {
        this.setState({ State: value });
      } else if (type === "UsertypeCountry") {
        this.setState({ UsertypeCountry: value });
        this.getStates(value, "Usertype");
      } else if (type === "UsertypeCity") {
        this.setState({ UsertypeCity: value });
      } else if (type === "UsertypeState") {
        this.setState({ UsertypeState: value });
      } else if (type === "ManagedBy") {
        this.setState({ ManagedBy: value });
      } else if (type === "PaperSize") {
        this.setState({ PaperSize: value });
        //this.getPreviewLink(this.state.PaperSize)
      }
    }

  };
  addRowBank = (e, index) => {
    debugger
    console.log("this.state.bankList", this.state.bankList);
    const row = {
      CreatedByName: CommonConfig.loggedInUserData().Name,
      Status: "Active",
      AccountType: "",
      AccountNumber: "",
      BankName: "",
      NameonAccount: "",
      RoutingNumber: "",
      Index: this.state.bankList.length + 1,
      EntityID: this.state.EntityID,
      AccountDetailID: "",
    };
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
      fullName,
      userName,
      ClientName,
      Email2,
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
      JoinDate,
      BirthDate,
      RelivingDate,
    } = this.state;

   

  


    const CityOptions = this.state.GoogleAPICityList.map((city) => {
      return { value: city.City_code, label: city.Name };
    });
  
    const StateOptions = this.state.StateList.map((state) => {
      return { value: state.StateName, label: state.StateName };
    });
   
    const CountryOptions = this.state.CountryList.map((fromCountry) => {
      return { value: fromCountry.CountryID, label: fromCountry.CountryName };
    });
    // const columns1 = [
    //   {
    //     Header: "Country",
    //     accessor: "CountryName",
    //     width: 110,
    //     maxWidth: 110,
    //   },
    //   {
    //     Header: "Shipment Type",
    //     accessor: "ServiceType",
    //     width: 110,
    //     maxWidth: 110,
    //   },
    //   {
    //     Header: "Service Name",
    //     accessor: "MainServiceName",
    //     width: 100,
    //     maxWidth: 100,
    //   },
    //   {
    //     Header: "Sub Service Name",
    //     accessor: "ServiceName",
    //     width: 320,
    //     maxWidth: 320,
    //   },
    //   {
    //     Header: "Display Name",
    //     accessor: "DisplayName",
    //     width: 180,
    //     maxWidth: 180,
    //   },
    //   {
    //     Header: "Package Markup",
    //     accessor: "Markup",
    //     width: 120,
    //     maxWidth: 120,
    //     Cell: (record) => {
    //       return (
    //         <div className="table-common-btn">
    //           <input
    //             size={10}
    //             type="text"
    //             name={"Markup" + record.original.ServiceID}
    //             id={"Markup" + record.original.ServiceID}
    //             className="form-control"
    //             value={record.original.Markup}
    //             onChange={(event) =>
    //               this.handledInput(event, record.original.ServiceID, record.original.MarkupType, "Markup")
    //             }
    //             onBlur={(e) =>
    //               this.handleBlur(e, record.original.ServiceID, record.original.MarkupType, "Markup")
    //             }
    //           />
    //         </div>
    //       );
    //     },
    //   },
    //   {
    //     Header: "Envelop Markup",
    //     accessor: "test",
    //     width: 120,
    //     sortMethod: (a, b) => {
    //       return CommonConfig.dateSortMethod(a, b);
    //     },
    //     maxWidth: 120,
    //     Cell: (record) => {
    //       console.log("record = ", record)
    //       console.log("record = ", record.index)
    //       var ids = "EnvelopMarkup" + record.original.ServiceID;
    //       return (
    //         <div className="table-common-btn">

    //           <input
    //             size={10}
    //             type="text"
    //             name={"EnvelopMarkup" + record.original.ServiceID}
    //             id={"EnvelopMarkup" + record.original.ServiceID}
    //             className="form-control"
    //             value={record.original.EnvelopMarkup}

    //             onChange={(event) =>
    //               this.handledInput(event, record.original.ServiceID, record.original.MarkupType, "EnvelopMarkup")
    //             }
    //             onBlur={(e) =>
    //               this.handleBlur(e, record.original.ServiceID, record.original.MarkupType, "EnvelopMarkup")
    //             }
    //           />

    //         </div>
    //       );
    //     },
    //   },
    //   {
    //     Header: "Markup Type",
    //     accessor: "MarkupType",
    //     width: 100,
    //     maxWidth: 100,
    //     Cell: (record) => {
    //       return (<FormControl className={classes.selectFormControl}>
    //         <Select
    //           size={50}
    //           MenuProps={{ className: classes.selectMenu }}
    //           classes={{ select: classes.select }}
    //           value={record.original.MarkupType}
    //           inputProps={{
    //             name: "simpleSelect",
    //             id: "simple-select",
    //           }}
    //           onChange={(event) => this.handledropdown(event, record.original.ServiceID)}
    //         >
    //           <MenuItem
    //             classes={{
    //               root: classes.selectMenuItem,
    //               selected: classes.selectMenuItemSelected,
    //             }}
    //             value="Percentage"
    //           >
    //             Percentage
    //           </MenuItem>
    //           <MenuItem
    //             classes={{
    //               root: classes.selectMenuItem,
    //               selected: classes.selectMenuItemSelected,
    //             }}
    //             value="USD"
    //           >
    //             USD
    //           </MenuItem>
    //         </Select>
    //       </FormControl>

    //       );
    //     },




    //   },
    //   {
    //     Header: "Status",
    //     accessor: "Status",
    //     width: 80,
    //   }
    // ];

    // const columns = [
    //   {
    //     Header: "Document Name",
    //     accessor: "FileName",
    //     width: 220,
    //     maxWidth: 220,
    //     Cell: this.renderDocumentName,
    //   },
    //   {
    //     Header: "CreatedOn",
    //     accessor: "CreatedOn",
    //     width: 220,
    //     sortMethod: (a, b) => {
    //       return CommonConfig.dateSortMethod(a, b);
    //     },
    //     maxWidth: 220,
    //   },
    //   {
    //     Header: "Added By",
    //     accessor: "Description",
    //     width: 280,
    //     maxWidth: 280,
    //   },
    //   {
    //     Header: "Attachment",
    //     accessor: "actions",
    //     width: 80,
    //     filterable: false,
    //     sortable: false,
    //     Cell: (record) => {
    //       return (
    //         <div>
    //           {record.original.AttachmentPath ? (
    //             <div>
    //               <a
    //                 href={fileBase + record.original.AttachmentPath}
    //                 className="normal-btn sm-orange"
    //                 rel="noopener noreferrer"
    //                 target="_blank"
    //               >
    //                 View File
    //               </a>
    //             </div>
    //           ) : this.state.Access.WriteAccess === 1 ? (
    //             <div>
    //               <div className="custom-file-browse">
    //                 <span>Upload</span>
    //                 <input
    //                   type="file"
    //                   name="selectedfile"
    //                   id="file"
    //                   style={{ width: 140, border: 0 }}
    //                   onChange={(event) => this.fileUpload(event, record)}
    //                 />
    //               </div>
    //               <p>{this.stringTruncate(record.original.AttachmentName)}</p>
    //             </div>
    //           ) : null}
    //         </div>
    //       );
    //     },
    //   },
    //   {
    //     width: 100,
    //     filterable: false,
    //     sortable: false,
    //     Header: "Actions",
    //     Cell: (record) => {
    //       return record.original.AttachmentPath ? (
    //         <div className="align-right">
    //           {this.state.Access.DeleteAccess === 1 ? (
    //             <DeleteIcon
    //               onClick={(e) => this.DeleteDocument(e, record.original)}
    //             />
    //           ) : null}
    //         </div>
    //       ) : this.state.Attachments.filter((x) => x.Status === "Active")
    //         .length ===
    //         record.index + 1 ? (
    //         <div className="align-right">
    //           <Icon color="secondary" onClick={() => this.AddNewRowData()}>
    //             add_circle
    //           </Icon>
    //         </div>
    //       ) : null;
    //     },
    //   },
    // ];

    return (
      <div>
        <GridContainer className="MuiGrid-justify-xs-center">
          <GridItem xs={12} sm={12} md={12}>
           
            <div className="shipment-content mt-30">
            

                
                  <div className="shipment-pane mt-20">
                  <Card>
                    <CardHeader className="btn-right-outer" color="primary" icon>
                      <CardIcon color="primary">
                        <Adduser />
                      </CardIcon>
                      <h4 className="margin-right-auto text-color-black">
                        Client Management
                      </h4>
                    </CardHeader>
                    <Cardbody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText={<span>Client Name*</span>}
                            id="ClientName"
                            error={this.state.ClientNameErr}
                            helperText={this.state.ClientNameHelperText}
                            formControlProps={{ fullWidth: true }}
                            inputType="text"
                            inputProps={{
                              autoComplete: "off",
                              onFocus: () =>
                                this.setState({
                                  checkUserName: false,
                                  ClientNameErr: false,
                                  ClientNameeHelperText: "",
                                }),
                              onBlur: (event) =>
                                this.handleBlurUser(event, "ClientName"),
                              onChange: (event) =>
                                this.handleChange(event, "ClientName"),
                              value: ClientName,
                              endAdornment:
                                this.state.checkClientName !== true ? (
                                  <Icon>account_circle</Icon>
                                ) : this.state.ClientNameErr ? (
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
                            labelText={<span>Company Name</span>}
                            id="CompanyName"
                            name="CompanyName"
                            variant="outlined"
                            formControlProps={{ fullWidth: true }}
                            error={this.state.companyNameErr}
                            helperText={this.state.companyNameHelperText}
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
                              this.state.checkCompanyName !== true ? (
                                <Icon>person</Icon>
                              ) : this.state.companyNameErr ? (
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
                            labelText={<span>Address Line 1</span>}
                            id="addressline1"
                            name="addressline1"
                            variant="outlined"
                            error={this.state.addressLine1Err}
                            helperText={this.state.addressLine1HelperText}
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
                                <Icon>home</Icon>
                              ) : this.state.addressLine1Err ? (
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
                                <Icon>home</Icon>
                              ) : this.state.addressLine2Err ? (
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
                                  <Icon>location_city</Icon>
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
                            error={this.state.mobile1Err}
                            helperText={this.state.mobile1HelperText}
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
                              ) : this.state.mobile1Err ? (
                                <InputAdornment position="end">
                                  <CloseIcon
                                    style={{ color: red[500] }}
                                    className={useStyles.danger}
                                  />
                                </InputAdornment>
                              ): (
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
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText="Email2"
                            id="Email2"
                            error={this.state.email2Err}
                            formControlProps={{ fullWidth: true }}
                            helperText={this.state.email2HelperText}
                            inputProps={{
                              onBlur: (event) =>
                                this.handleChange(event, "email2"),
                              onFocus: () =>
                                this.setState({
                                  email2Err: false,
                                  email2HelperText: "",
                                  checkEmail2: false,
                                }),
                              onChange: (event) =>
                                this.handleChange(event, "email2"),
                              value: Email2,
                              endAdornment:
                                this.state.checkEmail2 !== true ? (
                                  <Icon>email</Icon>
                                ) : this.state.email2Err ? (
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
                   
                    </Cardbody>
                  </Card>
                   
                
                  </div>
                
                </div>
              

            <div className="shipment-submit">

              {CommonConfig.getUserAccess("Project Management").DeleteAccess === 1 ? (
                <div className="left">
                  <Button
                    justify="center"
                    color="danger"
                    onClick={() => this.deleteUser()}
                  >
                    Delete
                  </Button>
                </div>
              ) : null}


              {CommonConfig.getUserAccess("Project Management").WriteAccess === 1 && (CommonConfig.loggedInUserData().PersonID == this.props.location.state) ? (
                <div className="right">

                  {/* <div> */}
                  {CommonConfig.isEmpty(this.props.location.state) ? null : (
                    <Button color="rose" onClick={() => this.saveClient(false)}>
                      Save
                    </Button>
                  )}
                  <Button color="primary" onClick={() => this.saveClient(true)}>
                    Save & Exit
                  </Button>
                  {/* </div> */}


                  <Button color="secondary" onClick={() => this.cancelUser()}>
                    Cancel
                  </Button>
                </div>
              ) :
                CommonConfig.getUserAccess("Project Management").WriteAccess === 1 && CommonConfig.getUserAccess("Project Management").AllAccess === 1 ? (
                  <div className="right">

                    {/* <div> */}
                    {/* {CommonConfig.isEmpty(this.props.location.state) ? null : (
                      <Button color="rose" onClick={() => this.saveUser(false)}>
                        Save
                      </Button>
                    )} */}
                    <Button color="primary" onClick={() => this.saveClient(true)}>
                      Save & Exit
                    </Button>
                    {/* </div> */}


                    <Button color="secondary" onClick={() => this.cancelClient()}>
                      Cancel
                    </Button>
                  </div>
                ) :
                  <div className="right">
                    <Button color="secondary" onClick={() => this.cancelClient()}>
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
