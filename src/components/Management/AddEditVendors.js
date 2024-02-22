import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormHelperText from "@material-ui/core/FormHelperText";
import ReactTable from "react-table";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Icon from "@material-ui/core/Icon";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import SimpleBackdrop from "../../utils/general";
import _ from "lodash";
import "react-time-picker/dist/TimePicker.css";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import api from "../../utils/apiClient";
import FormControl from "@material-ui/core/FormControl";
import { CommonConfig } from "utils/constant.js";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Adduser from "@material-ui/icons/AccountCircle";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { fileBase } from "../../utils/config";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Button from "components/CustomButtons/Button.js";
import cogoToast from "cogo-toast";
import moment from "moment";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class AddEditVendors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //---------------------- Navigation Data ----------------------------------//
      Steps: [
        {
          stepName: "Contact Details",
          stepId: "ContactDetails",
          classname: "active",
        },
        {
          stepName: "Service Offered",
          stepId: "ServiceOffered",
          classname: "inactive",
        },
        {
          stepName: "Comments",
          stepId: "Comments",
          classname: "inactive",
        },
        {
          stepName: "Documents",
          stepId: "Documents",
          classname: "inactive",
        },
      ],

      Loading: false,
      Attachments: [],
      Access: [],
      contactList: [],
      ServiceList: [],
      simpleSelect: "",

      vendorName: "",
      vendorNameErr: false,
      vendorNameHelperText: "",

      vendorWebsite: "",

      vendorType: "",
      vendorTypeErr: false,
      vendorTypeHelperText: "",

      carrierLink: "",
      carrierLinkErr: false,
      carrierLinkHelperText: "",

      isBulkUpload: false,
      isFormW9: false,
      VendorAddressLine1: "",
      VendorAddressLine2: "",
      VendorAddressLine3: "",
      VendorPhone: "",
      VendorEmail: "",
      VendorZip: "",

      offeredService: [],
      DocumentList: [],
      AttachmentList: [],
      Loading: false,
      createdBy: CommonConfig.loggedInUserData().Name,
      comments: "",
      open: false,
      vendorId: !CommonConfig.isEmpty(this.props.history.location.state)
        ? this.props.history.location.state.vendorId
        : "",
      objAttachment: {
        Index: 0,
        FileName: "",
        Status: "Active",
        DocumentCreatedOn: moment().format(CommonConfig.dateFormat.dateOnly),
        DocumentCreatedBy: CommonConfig.loggedInUserData().Name,
      },
      isEdit: false,

      CountryList: [],
      selectedCountry: {},
      countryErr: false,
      countryHelperText: "",

      contactName: "",
      contactNameErr: false,
      contactNameHelperText: "",

      country: "",
      title: "",

      addressLine1: "",
      addressLine1Err: false,
      addressLine1HelperText: "",

      addressLine2: "",
      addressLine2Err: false,
      addressLine2HelperText: "",

      addressLine3: "",
      addressLine3Err: false,
      addressLine3HelperText: "",

      email: "",
      emailErr: false,
      emailHelperText: "",

      phone1: "",
      phone1Err: false,
      phone1HelperText: "",

      phone1Ext: "",
      phone1ExtErr: false,
      phone1ExtHelperText: "",
      phone2Ext: "",

      phone2: "",
      phone2Err: false,
      phone2HelperText: "",

      zipCode: "",
      zipCodeErr: false,
      zipCodeHelperText: "",

      cityAutoComplete: false,
      stateAutoComplete: false,
      googleApiCityList: [],
      stateList: [],

      city: "",
      cityErr: false,
      cityHelperText: "",

      state: "",
      stateErr: false,
      stateHelperText: "",

      Loading: false,
      isEdit: false,
      vendorId: !CommonConfig.isEmpty(this.props.history.location.state)
        ? this.props.history.location.state.vendorId
        : "",
      contactListKey: "",
      open: false,
      deleteopen: false,
      close: false,
      AttachmentListArray: [],
    };
  }

  async componentDidMount() {
    this.setState({ Access: CommonConfig.getUserAccess("Vendor Management") });
    if (CommonConfig.isEmpty(this.state.vendorId)) {
      this.setState({ Attachments: [this.state.objAttachment] });
      document.getElementById("PanelShow").style.display = "none";
    }
    await this.getServiceList();
    await this.getCountry();
    if (!CommonConfig.isEmpty(this.state.vendorId)) {
      await this.getVendorDetails(this.state.vendorId);
      await this.getContacts(this.state.vendorId);
    }
    document.getElementById("ServiceOffered").style.display = "none";
    document.getElementById("Documents").style.display = "none";
    document.getElementById("Comments").style.display = "none";
    document.getElementById("ContactAdd").style.display = "none";
  }
  getContacts(vendorId) {
    try {
      debugger;
      this.showLoader();
      api
        .get("vendor/getVendorContacts/" + vendorId)
        .then((res) => {
          if (res.success) {
            this.hideLoader();
            var finalContact = res.data;
            this.setState({ contactList: finalContact });
          }
        })
        .catch((err) => {
          this.hideLoader();
          console.log("err..", err);
        });
    } catch (error) {
      this.hideLoader();
      console.log("err..", error);
    }
  }
  validateAddContact(event) {
    let IsFormValid = true;

    if (CommonConfig.isEmpty(this.state.contactName)) {
      IsFormValid = false;
      this.setState({
        contactNameErr: true,
        contactNameHelperText: "Please Enter Name.",
      });
    }
    if (CommonConfig.isEmpty(this.state.addressLine1)) {
      IsFormValid = false;
      this.setState({
        addressLine1Err: true,
        addressLine1HelperText: "Please Enter Address",
      });
    }
    if (CommonConfig.isEmpty(this.state.zipCode)) {
      IsFormValid = false;
      this.setState({
        zipCodeErr: true,
        zipCodeHelperText: "Please Enter ZipCode.",
      });
    }
    if (this.state.cityAutoComplete === false) {
      if (CommonConfig.isEmpty(this.state.city)) {
        IsFormValid = false;
        this.setState({ cityErr: true, cityHelperText: "Please Enter City" });
      }
    } else {
      if (CommonConfig.isEmpty(this.state.city)) {
        IsFormValid = false;
        this.setState({ cityErr: true, cityHelperText: "Please Enter City" });
      }
    }

    if (this.state.stateAutoComplete === false) {
      if (CommonConfig.isEmpty(this.state.state)) {
        IsFormValid = false;
        this.setState({
          stateErr: true,
          stateHelperText: "Please Enter State",
        });
      }
    } else {
      if (CommonConfig.isEmpty(this.state.state)) {
        IsFormValid = false;
        this.setState({
          stateErr: true,
          stateHelperText: "Please Select State",
        });
      }
    }
    if (!Object.values(this.state.selectedCountry).length) {
      IsFormValid = false;
      this.setState({
        countryErr: true,
        countryHelperText: "Please Select Country",
      });
    } else {
      this.setState({ countryErr: false, countryHelperText: "" });
    }

    return IsFormValid;
  }
  ResetContact() {
    this.setState({
      contactName: "",
      title: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      email: "",
      phone1: "",
      phone1Ext: "",
      phone2Ext: "",
      phone2: "",
      city: "",
      state: "",
      zipCode: "",
      selectedCountry: {},
    });
  }

  addContact = () => {
    let valid = this.validateAddContact();
    if (valid) {
      var phoneArray = [
        { phone: this.state.phone1, phoneExt: this.state.phone1Ext },
      ];
      var phone2 = { phone: this.state.phone2, phoneExt: this.state.phone2Ext };
      phoneArray.push(phone2);

      if (this.state.isEdit) {
        let contacts = this.state.contactList;
        const key = this.state.contactListKey;
        (contacts[key].Name = this.state.contactName),
          (contacts[key].Title = this.state.title),
          (contacts[key].Country = this.state.selectedCountry.label),
          (contacts[key].AddressLine1 = this.state.addressLine1),
          (contacts[key].AddressLine2 = this.state.addressLine2),
          (contacts[key].AddressLine3 = this.state.addressLine3),
          (contacts[key].ZipCode = this.state.zipCode),
          (contacts[key].City = CommonConfig.isEmpty(this.state.city.label)
            ? this.state.city
            : this.state.city.label),
          (contacts[key].State = CommonConfig.isEmpty(this.state.state.label)
            ? this.state.state
            : this.state.state.label),
          (contacts[key].Email = this.state.email),
          (contacts[key].Phone = phoneArray);

        this.setState({ contactList: contacts, isEdit: false });
        this.ResetContact();
      } else {
        var contactArray = [
          {
            Id: this.state.contactList.length,
            Name: this.state.contactName,
            Title: this.state.title,
            Country: this.state.selectedCountry.label,
            AddressLine1: this.state.addressLine1,
            AddressLine2: this.state.addressLine2,
            AddressLine3: this.state.addressLine3,
            ZipCode: this.state.zipCode,
            City: CommonConfig.isEmpty(this.state.city.label)
              ? this.state.city
              : this.state.city.label,
            State: CommonConfig.isEmpty(this.state.state.label)
              ? this.state.state
              : this.state.state.label,
            Email: this.state.email,
            Phone: phoneArray,
          },
        ];
        this.setState({
          contactList: this.state.contactList.concat(contactArray),
        });
        this.ResetContact();
      }
    }
  };
  changeDropDown = (event, type) => {
    if (type === "vendorType") {
      this.setState({
        vendorType: event.target.value,
        vendorTypeErr: false,
        vendorNameHelperText: "",
      });
    } else if (type === "bulkUpload") {
      this.setState({ isBulkUpload: event.target.value });
    } else if (type === "FormW9") {
      this.setState({ isFormW9: event.target.value });
    }
  };
  handleBlur = (event, type) => {
    let val = event.target.value;

    if (type === "vendorName") {
      if (!CommonConfig.isEmpty(val)) {
        if (val.length > 54) {
          this.setState({
            vendorName: val,
            vendorNameErr: true,
            vendorNameHelperText: "Please Enter valid Vender Name.",
          });
        } else if (CommonConfig.RegExp.companyName.test(val)) {
          this.setState({
            vendorName: val,
            vendorNameErr: true,
            vendorNameHelperText: "Please Enter valid Vender Name.",
          });
        } else {
          this.setState({
            vendorName: val,
            vendorNameErr: false,
            vendorNameHelperText: "",
          });
        }
      } else if (CommonConfig.isEmpty(val)) {
        this.setState({
          vendorName: val,
          vendorNameErr: true,
          vendorNameHelperText: "Please Enter Vender Name.",
        });
      }
    } else if (type === "website") {
      this.setState({ vendorWebsite: val });
    } else if (type === "carrierLink") {
      this.setState({ carrierLink: val });
    } else if (type === "comments") {
      this.setState({ comments: val });
    } else if (type === "VendorAddressLine1") {
      this.setState({ VendorAddressLine1: val });
    } else if (type === "VendorAddressLine2") {
      this.setState({ VendorAddressLine2: val });
    } else if (type === "VendorAddressLine3") {
      this.setState({ VendorAddressLine3: val });
    } else if (type === "VendorPhone") {
      this.setState({ VendorPhone: val });
    } else if (type === "VendorEmail") {
      this.setState({ VendorEmail: val });
    } else if (type === "VendorZip") {
      this.setState({ VendorZip: val });
    } else if (type === "contactName") {
      if (CommonConfig.isEmpty(val)) {
        this.setState({
          contactName: val,
          contactNameErr: true,
          contactNameHelperText: "Please enter Contact Name",
        });
      } else {
        this.setState({
          contactName: val,
          contactNameErr: false,
          contactNameHelperText: "",
        });
      }
    } else if (type === "addressLine1") {
      if (CommonConfig.isEmpty(val)) {
        this.setState({
          addressLine1: val,
          addressLine1Err: true,
          addressLine1HelperText: "Please enter Address",
        });
      } else if (val.length > 54) {
        this.setState({
          addressLine1: val,
          addressLine1Err: true,
          addressLine1HelperText: "Addressline 1 should be max 54 characters",
        });
      } else {
        this.setState({
          addressLine1: val,
          addressLine1Err: false,
          addressLine1HelperText: "",
        });
      }
    } else if (type === "addressline2") {
      if (!CommonConfig.isEmpty(val)) {
        if (val.length > 54) {
          this.setState({
            addressLine2: val,
            addressLine2Err: true,
            addressLine2HelperText: "Addressline 2 should be max 54 characters",
          });
        } else {
          this.setState({
            addressLine2: val,
            addressLine2Err: false,
            addressLine2HelperText: "",
          });
        }
      }
    } else if (type === "addressline3") {
      if (!CommonConfig.isEmpty(val)) {
        if (val.length > 54) {
          this.setState({
            addressLine3: val,
            addressLine3Err: true,
            addressLine3HelperText: "Addressline 3 should be max 54 characters",
          });
        } else {
          this.setState({
            addressLine3: val,
            addressLine3Err: false,
            addressLine3HelperText: "",
          });
        }
      }
    } else if (type === "zipCode") {
      if (CommonConfig.isEmpty(val)) {
        this.setState({
          zipCode: val,
          zipCodeErr: true,
          zipCodeHelperText: "Please enter Zip Code",
        });
      } else if (
        val.trim() !== val ||
        !val.match(CommonConfig.RegExp.zipCode)
      ) {
        this.setState({
          zipCode: val,
          zipCodeErr: true,
          zipCodeHelperText: "Zipcode is not valid",
        });
      } else if (val.length > 12) {
        this.setState({
          zipCode: val,
          zipCodeErr: true,
          zipCodeHelperText: "Zipcode length should be max 12 character",
        });
      } else {
        this.setState({
          zipCode: val,
          zipCodeErr: false,
          zipCodeHelperText: "",
        });
        this.zipChange(val);
      }
    } else if (type === "city") {
      if (CommonConfig.isEmpty(val)) {
        this.setState({
          city: val,
          cityErr: true,
          cityHelperText: "Please enter City",
        });
      } else if (CommonConfig.RegExp.companyName.test(val)) {
        this.setState({
          city: val,
          cityErr: true,
          cityHelperText: "City is not valid",
        });
      } else if (val.length > 54) {
        this.setState({
          city: val,
          cityErr: true,
          cityHelperText: "City shoule be max 54 characters",
        });
      } else {
        this.setState({ city: val, cityErr: false, cityHelperText: "" });
      }
    } else if (type === "state") {
      if (CommonConfig.isEmpty(val)) {
        this.setState({
          state: val,
          stateErr: true,
          stateHelperText: "Please enter State",
        });
      } else if (CommonConfig.RegExp.companyName.test(val)) {
        this.setState({
          state: val,
          stateErr: true,
          stateHelperText: "State is not valid",
        });
      } else if (val.length > 54) {
        this.setState({
          state: val,
          stateErr: true,
          stateHelperText: "State shoule be max 54 characters",
        });
      } else {
        this.setState({ state: val, stateErr: false, stateHelperText: "" });
      }
    } else if (type === "phone1") {
      if (!val.match(CommonConfig.RegExp.phoneNumber)) {
        this.setState({
          phone1: val,
          phone1Err: true,
          phone1HelperText: "Please enter valid Phone No.",
        });
      } else if (val.length < 5 || val.length > 15) {
        this.setState({
          phone1: val,
          phone1Err: true,
          phone1HelperText: "Please enter valid Phone No.",
        });
      } else {
        this.setState({ phone1: val, phone1Err: false, phone1HelperText: "" });
      }
    } else if (type === "phone1Ext") {
      if (val.length > 6) {
        this.setState({
          phone1Ext: val,
          phone1ExtErr: true,
          phone1ExtHelperText: "Please enter valid extension",
        });
      } else {
        this.setState({
          phone1Ext: val,
          phone1ExtErr: false,
          phone1ExtHelperText: "",
        });
      }
    } else if (type === "phone2") {
      if (!CommonConfig.isEmpty(val)) {
        if (!val.match(CommonConfig.RegExp.phoneNumber)) {
          this.setState({
            phone2: val,
            phone2Err: true,
            phone2HelperText: "Please enter valid Phone No.",
          });
        } else if (val.length < 5 || val.length > 15) {
          this.setState({
            phone1: val,
            phone1Err: true,
            phone1HelperText: "Please enter valid Phone No.",
          });
        } else {
          this.setState({
            phone2: val,
            phone2Err: false,
            phone2HelperText: "",
          });
        }
      }
    } else if (type === "email") {
      if (!val.match(CommonConfig.RegExp.email)) {
        this.setState({
          email: val,
          emailErr: true,
          emailHelperText: "Please enter valid Email",
        });
      } else {
        this.setState({ email: val, emailErr: false, emailHelperText: "" });
      }
    }
  };
  handleChange = (event, type) => {
    let val = event.target.value;
    if (type === "vendorName") {
      this.setState({ vendorName: val });
    } else if (type === "website") {
      this.setState({ vendorWebsite: val });
    } else if (type === "carrierLink") {
      this.setState({ carrierLink: val });
    } else if (type === "comments") {
      this.setState({ Vendorcomments: val });
    } else if (type === "VendorAddressLine1") {
      this.setState({ VendorAddressLine1: val });
    } else if (type === "VendorAddressLine2") {
      this.setState({ VendorAddressLine2: val });
    } else if (type === "VendorAddressLine3") {
      this.setState({ VendorAddressLine3: val });
    } else if (type === "VendorPhone") {
      this.setState({ VendorPhone: val });
    } else if (type === "VendorEmail") {
      this.setState({ VendorEmail: val });
    } else if (type === "VendorZip") {
      this.setState({ VendorZip: val });
    } else if (type === "contactName") {
      this.setState({ contactName: val });
    } else if (type === "title") {
      this.setState({ title: val });
    } else if (type === "addressLine1") {
      this.setState({ addressLine1: val });
    } else if (type === "addressLine2") {
      this.setState({ addressLine2: val });
    } else if (type === "addressLine3") {
      this.setState({ addressLine3: val });
    } else if (type === "zipCode") {
      this.setState({ zipCode: val });
    } else if (type === "email") {
      this.setState({ email: val });
    } else if (type === "phone1") {
      if (event.target.value.length <= 15) {
        this.setState({ phone1: val });
      }
    } else if (type === "phone2") {
      if (event.target.value.length <= 15) {
        this.setState({ phone2: val });
      }
    } else if (type === "state") {
      this.setState({ state: val });
    } else if (type === "city") {
      this.setState({ city: val });
    } else if (type === "phone1Ext") {
      this.setState({ phone1Ext: val });
    } else if (type === "phone2Ext") {
      this.setState({ phone2Ext: val });
    }
  };

  getVendorDetails(vendorId) {
    try {
      this.showLoader();
      api
        .get("vendor/getVendorById/" + vendorId)
        .then((res) => {
          debugger;
          if (res.success) {
            this.hideLoader();
            let allServiceList = this.state.ServiceList;

            for (var i = 0; i < allServiceList.length; i++) {
              for (var j = 0; j < res.data.services.length; j++) {
                if (
                  allServiceList[i].ServiceId === res.data.services[j].Id &&
                  allServiceList[i].ServiceName ===
                    res.data.services[j].serviceName
                ) {
                  allServiceList[i].isChecked = true;
                }
              }
            }
            for (var i = 0; i < res.data.DocumentList.length; i++) {
              var filesList = res.data.DocumentList[i];
              filesList.CreatedOn = moment(filesList.CreatedOn).format(
                CommonConfig.dateFormat.dateOnly
              );
              this.state.Attachments.push(filesList);
            }
            this.setState({
              vendorName: res.data.Name,
              vendorWebsite: res.data.Website,
              vendorType: res.data.VendorType,
              ServiceList: allServiceList,
              comments: res.data.Comments,
              carrierLink: res.data.CarrierLink,
              offeredService: res.data.services,
              createdBy: res.data.CreatedBy,
              isBulkUpload: res.data.IsBulkUpload === 1 ? true : false,
            });
            this.setState({
              Attachments: [
                ...this.state.Attachments,
                this.state.objAttachment,
              ],
            });
          }
        })
        .catch((err) => {
          this.hideLoader();
          console.log("err..", err);
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {
      this.hideLoader();
      console.log("err..", error);
      cogoToast.error("Something Went Wrong");
    }
  }

  ServiceMapping = (event, key) => {
    let ServiceList = this.state.ServiceList;
    if (event.target.checked) {
      var MappedServices = [
        {
          Id: Number(event.target.value),
          serviceName: event.target.name,
        },
      ];
      ServiceList[key].isChecked = event.target.checked;
      this.setState({
        offeredService: this.state.offeredService.concat(MappedServices),
        ServiceList: ServiceList,
      });
    } else {
      let Services = this.state.offeredService;
      var index = Services.findIndex(
        (x) => x.Id === Number(event.target.value)
      );
      Services.splice(index, 1);
      ServiceList[key].isChecked = event.target.checked;
      this.setState({ offeredService: Services, ServiceList: ServiceList });
    }
  };

  async getServiceList() {
    try {
      api
        .get("vendor/getServiceList")
        .then((res) => {
          if (res.success) {
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].isChecked = false;
            }
            this.setState({ ServiceList: res.data });
          }
        })
        .catch((err) => {
          console.log("err..", err);
        });
    } catch (error) {
      console.log("err..", error);
    }
  }

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

  showLoader() {
    this.setState({ Loading: true });
  }

  hideLoader() {
    this.setState({ Loading: false });
  }

  appendServices() {
    const Services = this.state.ServiceList;
    return Services.map((service, key) => {
      return (
        <GridItem xs={12} sm={12} md={3} key={key}>
          <FormControlLabel
            control={
              <Checkbox
                checked={service.isChecked}
                value={service.ServiceId}
                name={service.ServiceName}
                onChange={(event) => this.ServiceMapping(event, key)}
              />
            }
            label={service.ServiceName}
          />
        </GridItem>
      );
    });
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

  contactDivShow() {
    document.getElementById("ContactAdd").style.display = "block";
  }

  addVendor() {
    let vendorDetails = this.state;
    var finalAttachment = [];
    for (var i = 0; i < vendorDetails.Attachments.length; i++) {
      if (vendorDetails.Attachments[i].hasOwnProperty("AttachmentName")) {
        finalAttachment.push(vendorDetails.Attachments[i]);
      }
    }
    let data = {
      vendorName: vendorDetails.vendorName,
      vendorWebsite: vendorDetails.vendorWebsite,
      vendorType: vendorDetails.vendorType,
      isBulkUpload: vendorDetails.isBulkUpload,
      comments: vendorDetails.comments,
      carrierLink: vendorDetails.carrierLink,
      service: vendorDetails.offeredService,
      contacts: this.state.contactList,
      userId: CommonConfig.loggedInUserData().PersonID,
      DocumentList: finalAttachment,
    };
    var formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (vendorDetails.AttachmentList.length > 0) {
      vendorDetails.AttachmentList.forEach((file) => {
        formData.append("Attachments", file);
      });
    }

    try {
      this.showLoader();
      api
        .post("vendor/addVendor", formData)
        .then((res) => {
          if (res.success) {
            this.hideLoader();
            this.props.history.push({
              pathname: "/admin/Vendor",
              state: { filterlist: [], sortlist: [], serviceValue: "" },
            });
          }
        })
        .catch((err) => {
          this.hideLoader();
          console.log("err..", err);
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {
      this.hideLoader();
      cogoToast.error("Something Went Wrong");
      console.log("error..", error);
    }
  }
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
  editContact = (data, key) => {
    document.getElementById("ContactAdd").style.display = "Block";
    console.log("data = ", data);
    const selectedCountry = this.state.CountryList.find(
      (x) => x.CountryName === data.Country
    );
    const country = {
      value: selectedCountry.CountryID,
      label: selectedCountry.CountryName,
    };
    console.log("Length = ", data.Phone.length);
    var phoneLength = data.Phone.length;

    if (phoneLength == 0) {
      this.setState({
        contactName: data.Name,
        title: data.Title,
        addressLine1: data.AddressLine1,
        addressLine2: data.AddressLine2,
        addressLine3: data.AddressLine3,
        email: data.Email,
        zipCode: data.ZipCode,
        city: data.City,
        state: data.State,
        selectedCountry: country,
        phone1: "",
        phone2: "",
        phone1Ext: "",
        phone2Ext: "",
        isEdit: true,
        contactListKey: key,
      });
    } else if (phoneLength == 1) {
      this.setState({
        contactName: data.Name,
        title: data.Title,
        addressLine1: data.AddressLine1,
        addressLine2: data.AddressLine2,
        addressLine3: data.AddressLine3,
        email: data.Email,
        zipCode: data.ZipCode,
        city: data.City,
        state: data.State,
        selectedCountry: country,
        phone1: data.Phone[0].phone ? data.Phone[0].phone : "",
        phone2: "",
        phone1Ext: data.Phone[0].phoneExt ? data.Phone[0].phoneExt : "",
        phone2Ext: "",
        isEdit: true,
        contactListKey: key,
      });
    } else {
      this.setState({
        contactName: data.Name,
        title: data.Title,
        addressLine1: data.AddressLine1,
        addressLine2: data.AddressLine2,
        addressLine3: data.AddressLine3,
        email: data.Email,
        zipCode: data.ZipCode,
        city: data.City,
        state: data.State,
        selectedCountry: country,
        phone1: data.Phone[0].phone ? data.Phone[0].phone : "",
        phone2: data.Phone[1].phone ? data.Phone[1].phone : "",
        phone1Ext: data.Phone[0].phoneExt ? data.Phone[0].phoneExt : "",
        phone2Ext: data.Phone[1].phoneExt ? data.Phone[1].phoneExt : "",
        isEdit: true,
        contactListKey: key,
      });
    }
  };

  render(Steps) {
    const CountryOptions = this.state.CountryList.map((Country) => {
      return { value: Country.CountryID, label: Country.CountryName };
    });
    const CityOptions = this.state.googleApiCityList.map((city) => {
      return { value: city.City_code, label: city.Name };
    });
    const StateOptions = this.state.stateList.map((state) => {
      return { value: state.StateName, label: state.StateName };
    });
    const Contactcolumns = [
      {
        Header: "Name",
        accessor: "Name",
        width: 180,
      },
      {
        Header: "Title",
        accessor: "Title",
        width: 180,
      },
      {
        Header: "City",
        accessor: "City",
        width: 100,
      },
      {
        Header: "State",
        accessor: "State",
        width: 100,
      },
      {
        Header: "Email",
        accessor: "Email",
        width: 220,
      },
      {
        Header: "Phone",
        accessor: "Phone",
        id: "phone",
        width: 125,
        Cell: (record) => {
          if (Object.values(record.value).length) {
            return (
              <div>
                <span>{record.value[0].phone}</span>
              </div>
            );
          } else {
            return null;
          }
        },
      },
      {
        Header: "Action",
        filterable: false,
        sortable: false,
        Cell: (record) => {
          return (
            <div className="align-right">
              {this.state.Access.WriteAccess === 1 ? (
                <CreateIcon
                  onClick={() =>
                    this.editContact(record.original, record.index)
                  }
                />
              ) : null}
              {this.state.Access.DeleteAccess === 1 ? (
                <DeleteIcon
                  onClick={() =>
                    this.setState({ open: true, contactListKey: record.index })
                  }
                />
              ) : null}
            </div>
          );
        },
      },
    ];
    const columns = [
      {
        Header: "Document Name",
        accessor: "Name",
        width: 220,
        maxWidth: 220,
        Cell: this.renderDocumentName,
      },
      {
        Header: "CreatedOn",
        accessor: "DocumentCreatedOn",
        width: 220,
        sortMethod: (a, b) => {
          return CommonConfig.dateSortMethod(a, b);
        },
        maxWidth: 220,
      },
      {
        Header: "Added By",
        accessor: "DocumentCreatedBy",
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
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}
        <GridContainer justify="center" className="schedule-pickup-main-outer">
          <GridItem xs={12} sm={12}>
            <Card>
              <CardHeader className="btn-right-outer" color="primary" icon>
                <CardIcon color="primary">
                  <Adduser />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">
                  Vendor Information
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={3}>
                    <div className="select-spl">
                      <FormControl fullWidth>
                        <CustomInput
                          error={this.state.vendorNameErr}
                          helperText={this.state.vendorNameHelperText}
                          labelText="Vendor Name"
                          id="vendorName"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className="requiredicon">
                                  perm_identity
                                </Icon>
                              </InputAdornment>
                            ),
                            value: this.state.vendorName,
                            onChange: (e) => this.handleChange(e, "vendorName"),
                            onBlur: (e) => this.handleBlur(e, "vendorName"),
                            onFocus: (event) =>
                              this.setState({
                                vendorNameErr: false,
                                vendorNameHelperText: "",
                              }),
                          }}
                        />
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <div className="select-spl">
                      <FormControl fullWidth>
                        <CustomInput
                          labelText={<span> Vendor Website </span>}
                          id="companywebsite"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            value: this.state.vendorWebsite,
                            onChange: (e) => this.handleChange(e, "website"),
                            onBlur: (e) => this.handleBlur(e, "website"),
                            onFocus: (e) =>
                              this.setState({
                                vendorWebsiteErr: false,
                                vendorWebsiteHelperText: "",
                              }),
                            endAdornment: (
                              <InputAdornment position="end">
                                {" "}
                                <Icon>public</Icon>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <div className="select-spl">
                      <FormControl fullWidth>
                        <CustomInput
                          labelText="Added By"
                          id="addedby"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className="requiredicon">
                                  location_city{" "}
                                </Icon>
                              </InputAdornment>
                            ),
                            value: this.state.createdBy,
                            disabled: true,
                          }}
                        />
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <div className="select-spl">
                      <FormControl error={this.state.vendorTypeErr} fullWidth>
                        <InputLabel>Vendor Type</InputLabel>
                        <Select
                          value={this.state.vendorType}
                          onChange={(event) =>
                            this.changeDropDown(event, "vendorType")
                          }
                          onFocus={() =>
                            this.setState({
                              vendorTypeErr: false,
                              vendorTypeHelperText: "",
                            })
                          }
                          inputProps={{
                            name: "vendorType",
                            id: "vendorType",
                          }}
                        >
                          <MenuItem value="payable"> Payable </MenuItem>
                          <MenuItem value="receivable"> Receivable </MenuItem>
                          <MenuItem value="Both"> Both </MenuItem>
                        </Select>
                        <FormHelperText>
                          {/* {this.state.vendorTypeHelperText} */}
                        </FormHelperText>
                      </FormControl>
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={3}>
                    <div className="select-spl">
                      <FormControl fullWidth>
                        <InputLabel>Bulk Upload</InputLabel>
                        <Select
                          // value={this.state.isBulkUpload}
                          // onChange={(event) =>
                          //   this.changeDropDown(event, "bulkUpload")
                          // }
                          inputProps={{
                            name: "bulkupload",
                            id: "bulkupload",
                          }}
                        >
                          <MenuItem value={true}> Yes </MenuItem>
                          <MenuItem value={false}> No </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                      labelText={<span>Carrier Link</span>}
                      id="carrierlink"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon>location_city</Icon>
                          </InputAdornment>
                        ),
                        value: this.state.carrierLink,
                        onChange: (e) => this.handleChange(e, "carrierLink"),
                        onBlur: (e) => this.handleBlur(e, "carrierLink"),
                        onFocus: () =>
                          this.setState({
                            carrierLinkErr: false,
                            carrierLinkHelperText: "",
                          }),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                      labelText="Phone"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.VendorPhone,
                        onChange: (e) => this.handleChange(e, "VendorPhone"),
                        onBlur: (e) => this.handleBlur(e, "VendorPhone"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.User}>call</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Email"
                      id="registeremail"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.VendorEmail,
                        onChange: (e) => this.handleChange(e, "VendorEmail"),
                        onBlur: (e) => this.handleBlur(e, "VendorEmail"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>
                              email
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={3}>
                    <div className="select-spl">
                      <FormControl fullWidth>
                        <InputLabel>Form W-9</InputLabel>
                        <Select
                          value={this.state.isFormW9}
                          onChange={(event) =>
                            this.changeDropDown(event, "FormW9")
                          }
                          inputProps={{
                            name: "FormW9",
                            id: "FormW9",
                          }}
                        >
                          <MenuItem value={true}> Yes </MenuItem>
                          <MenuItem value={false}> No </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                      labelText="Address Line 1"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.VendorAddressLine1,
                        onChange: (e) =>
                          this.handleChange(e, "VendorAddressLine1"),
                        onBlur: (e) => this.handleBlur(e, "VendorAddressLine1"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.User}>location_on</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                      labelText="Address Line 2"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.VendorAddressLine2,
                        onChange: (e) =>
                          this.handleChange(e, "VendorAddressLine2"),
                        onBlur: (e) => this.handleBlur(e, "VendorAddressLine2"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.User}>location_on</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Address Line 3"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.VendorAddressLine3,
                        onChange: (e) =>
                          this.handleChange(e, "VendorAddressLine3"),
                        onBlur: (e) => this.handleBlur(e, "VendorAddressLine3"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.User}>location_on</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={3}>
                    {" "}
                    <FormControl fullWidth>
                      <Autocomplete
                        // options={CountryOption}
                        id="Country"
                        getOptionLabel={(option) =>
                          option.label ? option.label : option
                        }
                        // value={selectedToCountry}
                        autoSelect
                        // onChange={(event, value) =>
                        //   this.selectChangeTab1(event, value, "ToCountry")
                        // }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.pickupcountryErr}
                            helperText={this.state.pickupcountryHelperText}
                            label="Country"
                            margin="normal"
                            fullWidth
                          />
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    {" "}
                    <CustomInput
                      labelText="Zip"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.VendorZip,
                        onChange: (e) => this.handleChange(e, "VendorZip"),
                        onBlur: (e) => this.handleBlur(e, "VendorZip"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.User}>
                              local_post_office
                            </Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    <CustomInput
                      labelText="City"
                      id="city"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        //   value: toCity.label ? toCity.label : toCity,
                        //   onChange: (event) =>
                        //     this.handleCityStateChange(event, "toCity"),
                        //   onBlur: (event) =>
                        //     this.handleBlur(event, "toCity"),
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
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="State"
                      id="state"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        // value: toState.value ? toState.value : toState,
                        // disabled: this.state.disableToState,
                        // onChange: (event) =>
                        //   this.handleCityStateChange(event, "toState"),
                        // onBlur: (event) =>
                        //   this.handleBlur(event, "toState"),
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
                  </GridItem>
                </GridContainer>
                <div className="shipment-submit">
                  <div className="right">
                    <Button color="rose" onClick={() => this.addVendor()}>
                      Submit
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
            <div id="PanelShow">
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
                          <span>{step.stepName}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="shipment-content">
                <div className="shipment-pane" id="ContactDetails">
                  <div className="shipment-box mb-0">
                    <Card>
                      <CardHeader
                        className="btn-right-outer"
                        color="primary"
                        icon
                      >
                        {/* <CardIcon color="primary">
                        <Adduser />
                      </CardIcon> */}
                        <h4 className="margin-right-auto text-color-black">
                          Contact List
                        </h4>

                        <div className="right">
                          <Button
                            color="rose"
                            onClick={() => this.contactDivShow()}
                          >
                            Add
                          </Button>
                        </div>
                      </CardHeader>
                      <CardBody className="shipment-cardbody">
                        <GridContainer>
                          {this.state.contactList.length ? (
                            <GridItem xs={12} sm={12} md={12}>
                              <ReactTable
                                data={this.state.contactList}
                                sortable={true}
                                filterable={true}
                                resizable={false}
                                showPagination={true}
                                minRows={2}
                                defaultPageSize={10}
                                columns={Contactcolumns}
                                align="center"
                                className="-striped -highlight contact-list-vendor"
                              />
                            </GridItem>
                          ) : null}
                        </GridContainer>
                      </CardBody>
                    </Card>
                  </div>
                </div>
                <div className="shipment-pane" id="ContactAdd">
                  <div className="shipment-box mb-0">
                    <Card>
                      <CardHeader
                        className="btn-right-outer"
                        color="primary"
                        icon
                      >
                        {/* <CardIcon color="primary">
                        <Adduser />
                      </CardIcon> */}
                        <h4 className="margin-right-auto text-color-black">
                          Add Contact Details
                        </h4>
                      </CardHeader>
                      <CardBody className="shipment-cardbody">
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              error={this.state.contactNameErr}
                              helperText={this.state.contactNameHelperText}
                              labelText="Name"
                              id="name"
                              formControlProps={{ fullWidth: true }}
                              inputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Icon className="requiredicon">
                                      perm_identity
                                    </Icon>
                                  </InputAdornment>
                                ),
                                value: this.state.contactName,
                                onChange: (e) =>
                                  this.handleChange(e, "contactName"),
                                onBlur: (e) =>
                                  this.handleBlur(e, "contactName"),
                                onFocus: (event) =>
                                  this.setState({
                                    contactNameErr: false,
                                    contactNameHelperText: "",
                                  }),
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText="Title"
                              id="title"
                              formControlProps={{ fullWidth: true }}
                              inputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Icon>account_circle</Icon>
                                  </InputAdornment>
                                ),
                                value: this.state.title,
                                onChange: (e) => this.handleChange(e, "title"),
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <FormControl fullWidth>
                              <Autocomplete
                                options={CountryOptions}
                                id="Country"
                                getOptionLabel={(option) => option.label}
                                value={this.state.selectedCountry}
                                autoSelect
                                onChange={(event, value) =>
                                  this.ChangeCountry(value)
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Country"
                                    error={this.state.countryErr}
                                    helperText={this.state.countryHelperText}
                                    fullWidth
                                  />
                                )}
                              />
                            </FormControl>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText={<span>Address Line 1</span>}
                              error={this.state.addressLine1Err}
                              helperText={this.state.addressLine1HelperText}
                              id="addressline1"
                              formControlProps={{ fullWidth: true }}
                              inputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Icon className="requiredicon">
                                      location_city
                                    </Icon>
                                  </InputAdornment>
                                ),
                                value: this.state.addressLine1,
                                onChange: (e) =>
                                  this.handleChange(e, "addressLine1"),
                                onBlur: (e) =>
                                  this.handleBlur(e, "addressLine1"),
                                onFocus: (event) =>
                                  this.setState({
                                    addressLine1Err: false,
                                    addressLine1HelperText: "",
                                  }),
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText={<span>Address Line 2</span>}
                              error={this.state.addressLine2Err}
                              helperText={this.state.addressLine2HelperText}
                              id="addressline2"
                              formControlProps={{ fullWidth: true }}
                              inputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Icon>location_city</Icon>
                                  </InputAdornment>
                                ),
                                value: this.state.addressLine2,
                                onChange: (e) =>
                                  this.handleChange(e, "addressLine2"),
                                onBlur: (e) =>
                                  this.handleBlur(e, "addressLine2"),
                                onFocus: (event) =>
                                  this.setState({
                                    addressLine2Err: false,
                                    addressLine2HelperText: "",
                                  }),
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText={<span>Address Line 3</span>}
                              error={this.state.addressLine3Err}
                              helperText={this.state.addressLine3HelperText}
                              id="addressline3"
                              formControlProps={{ fullWidth: true }}
                              inputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Icon>location_city</Icon>
                                  </InputAdornment>
                                ),
                                value: this.state.addressLine3,
                                onChange: (e) =>
                                  this.handleChange(e, "addressLine3"),
                                onBlur: (e) =>
                                  this.handleBlur(e, "addressLine3"),
                                onFocus: (event) =>
                                  this.setState({
                                    addressLine3Err: false,
                                    addressLine3HelperText: "",
                                  }),
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText={<span>Zip</span>}
                              id="zipCode"
                              error={this.state.zipCodeErr}
                              helperText={this.state.zipCodeHelperText}
                              formControlProps={{ fullWidth: true }}
                              inputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Icon className="requiredicon">
                                      location_city
                                    </Icon>
                                  </InputAdornment>
                                ),
                                value: this.state.zipCode,
                                onBlur: (event) =>
                                  this.handleBlur(event, "zipCode"),
                                onChange: (e) =>
                                  this.handleChange(e, "zipCode"),
                                onFocus: (event) =>
                                  this.setState({
                                    zipCodeErr: false,
                                    zipCodeHelperText: "",
                                  }),
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            {this.state.cityAutoComplete === false ? (
                              <CustomInput
                                labelText={<span>City</span>}
                                id="city"
                                error={this.state.cityErr}
                                helperText={this.state.cityHelperText}
                                formControlProps={{ fullWidth: true }}
                                inputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Icon className="requiredicon">
                                        location_city
                                      </Icon>
                                    </InputAdornment>
                                  ),
                                  value: this.state.city,
                                  onChange: (e) => this.handleChange(e, "city"),
                                  onBlur: (e) => this.handleBlur(e, "city"),
                                  onFocus: () =>
                                    this.setState({
                                      cityErr: false,
                                      cityHelperText: "",
                                    }),
                                }}
                              />
                            ) : (
                              <Autocomplete
                                options={CityOptions}
                                id="cityAutoComplete"
                                autoSelect
                                getOptionLabel={(option) => option.label}
                                value={this.state.city}
                                onChange={(event, value) =>
                                  this.ChangeFromCity(event, value)
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
                          <GridItem xs={12} sm={12} md={4}>
                            {this.state.stateAutoComplete === false ? (
                              <CustomInput
                                labelText={<span>State</span>}
                                id="state"
                                error={this.state.stateErr}
                                helperText={this.state.stateHelperText}
                                formControlProps={{ fullWidth: true }}
                                inputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <Icon className="requiredicon">
                                        public
                                      </Icon>
                                    </InputAdornment>
                                  ),
                                  value: this.state.state,
                                  onChange: (e) =>
                                    this.handleChange(e, "state"),
                                  onBlur: (e) => this.handleBlur(e, "state"),
                                  onFocus: () =>
                                    this.setState({
                                      stateErr: false,
                                      stateHelperText: "",
                                    }),
                                }}
                              />
                            ) : (
                              <Autocomplete
                                options={StateOptions}
                                id="stateAutoComplete"
                                autoSelect
                                getOptionLabel={(option) => option.label}
                                value={this.state.state}
                                onChange={(event, value) =>
                                  this.ChangeFromState(event, value)
                                }
                                onFocus={() =>
                                  this.setState({
                                    stateErr: false,
                                    stateHelperText: "",
                                  })
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    margin="normal"
                                    error={this.state.stateErr}
                                    helperText={this.state.stateHelperText}
                                    label="State"
                                    fullWidth
                                  />
                                )}
                              />
                            )}
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText={<span>Email</span>}
                              error={this.state.emailErr}
                              helperText={this.state.emailHelperText}
                              id="email"
                              formControlProps={{ fullWidth: true }}
                              inputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Icon>email</Icon>
                                  </InputAdornment>
                                ),
                                value: this.state.email,
                                onChange: (e) => this.handleChange(e, "email"),
                                onBlur: (e) => this.handleBlur(e, "email"),
                                onFocus: (event) =>
                                  this.setState({
                                    emailErr: false,
                                    emailHelperText: "",
                                  }),
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                              labelText={<span>Work Phone</span>}
                              error={this.state.phone1Err}
                              helperText={this.state.phone1HelperText}
                              id="phone1"
                              formControlProps={{ fullWidth: true }}
                              inputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Icon>local_phone</Icon>
                                  </InputAdornment>
                                ),
                                value: this.state.phone1,
                                onChange: (e) => this.handleChange(e, "phone1"),
                                onBlur: (e) => this.handleBlur(e, "phone1"),
                                onFocus: (event) =>
                                  this.setState({
                                    phone1Err: false,
                                    phone1HelperText: "",
                                  }),
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={1}>
                            <CustomInput
                              id="phone1Ext"
                              labelText="Extension"
                              error={this.state.phone1ExtErr}
                              helperText={this.state.phone1ExtHelperText}
                              inputProps={{
                                value: this.state.phone1Ext,
                                onChange: (e) =>
                                  this.handleChange(e, "phone1Ext"),
                                onBlur: (e) => this.handleBlur(e, "phone1Ext"),
                                onFocus: () =>
                                  this.setState({
                                    phone1ExtErr: false,
                                    phone1ExtHelperText: "",
                                  }),
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <CustomInput
                              labelText={<span>Cell Phone</span>}
                              error={this.state.phone2Err}
                              helperText={this.state.phone2HelperText}
                              id="phone2"
                              formControlProps={{ fullWidth: true }}
                              inputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <Icon>local_phone</Icon>
                                  </InputAdornment>
                                ),
                                value: this.state.phone2,
                                onChange: (e) => this.handleChange(e, "phone2"),
                                onBlur: (e) => this.handleBlur(e, "phone2"),
                                onFocus: (event) =>
                                  this.setState({
                                    phone2Err: false,
                                    phone2HelperText: "",
                                  }),
                              }}
                            />
                          </GridItem>
                        </GridContainer>

                        <div className="shipment-submit">
                          <div className="right">
                            <Button onClick={() => this.cancelContact()}>
                              Cancel
                            </Button>
                            <Button
                              color="rose"
                              onClick={() => this.addContact()}
                            >
                              {this.state.isEdit ? "Save" : "Add Contact"}
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
                <div className="shipment-pane" id="ServiceOffered">
                  <div className="shipment-box mb-0">
                    <Card>
                      <CardHeader
                        className="btn-right-outer"
                        color="primary"
                        icon
                      >
                        {/* <CardIcon color="primary">
                        <Adduser />
                      </CardIcon> */}
                        <h4 className="margin-right-auto text-color-black">
                          Service Offered
                        </h4>
                      </CardHeader>
                      <CardBody className="shipment-cardbody">
                        <GridContainer>{this.appendServices()}</GridContainer>
                      </CardBody>
                    </Card>
                  </div>
                </div>
                <div className="shipment-pane" id="Comments">
                  <div className="shipment-box mb-0">
                    <Card>
                      <CardHeader
                        className="btn-right-outer"
                        color="primary"
                        icon
                      >
                        <CardIcon color="primary">
                          <AssignmentIcon />
                        </CardIcon>
                        <h4 className="margin-right-auto text-color-black">
                          Comments
                        </h4>
                      </CardHeader>
                      <CardBody className="shipment-cardbody">
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={12}>
                            <div className="normal-textarea">
                              <textarea
                                aria-label="minimum height"
                                rowsMin={3}
                                value={this.state.comments}
                                id="comments"
                                onChange={(event) =>
                                  this.handleChange(event, "comments")
                                }
                                required
                              />
                            </div>
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                  </div>
                </div>
                <div className="shipment-pane" id="Documents">
                  <div className="shipment-box mb-0">
                    <Card>
                      <CardHeader
                        className="btn-right-outer"
                        color="primary"
                        icon
                      >
                        <CardIcon color="primary">
                          <AssignmentIcon />
                        </CardIcon>
                        <h4 className="margin-right-auto text-color-black">
                          Documentation
                        </h4>
                      </CardHeader>
                      <CardBody className="shipment-cardbody">
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
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default AddEditVendors;
