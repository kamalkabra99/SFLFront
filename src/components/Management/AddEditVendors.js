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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

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

      CountryList: [],
      selectedCountry: {},
      countryErr: false,
      countryHelperText: "",

      selectedVendorCountry: {},
      VendorcountryErr: false,
      VendorcountryHelperText: "",

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

      VendorzipCode: "",
      VendorzipCodeErr: false,
      VendorzipCodeHelperText: "",

      VendorcityAutoComplete: false,
      VendorstateAutoComplete: false,
      VendorgoogleApiCityList: [],
      Vendorcity: "",

      cityAutoComplete: false,
      stateAutoComplete: false,
      googleApiCityList: [],
      stateList: [],

      Vendorcity: "",
      VendorcityErr: false,
      VendorcityHelperText: "",

      city: "",
      cityErr: false,
      cityHelperText: "",

      Vendorstate: "",
      VendorstateErr: false,
      VendorstateHelperText: "",

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
  ChangeCountry = (value) => {
    this.setState({ selectedCountry: value });
    this.getStates(value);
  };
  ChangeVendorCountry = (value) => {
    this.setState({ selectedVendorCountry: value });
    this.getStates(value);
  };
  ChangeFromCity = (event, value) => {
    if (value != null) {
      this.setState({ city: value });
    }
  };
  vendorChangeCity = (event, value) => {
    if (value != null) {
      this.setState({ Vendorcity: value });
    }
  };
  ChangeFromState = (event, value) => {
    if (value != null) {
      this.setState({ state: value });
    }
  };
  vendorChangeState = (event, value) => {
    if (value != null) {
      this.setState({ Vendorstate: value });
    }
  };
  selectChangeTab1 = (event, value, type) => {
    if (value != null) {
      if (type === "VendorCountry") {
        var SelectedCountry = _.findIndex(this.state.CountryList, function(
          country
        ) {
          return country.CountryName === value.label;
        });

        var fromSelectedCountryData = this.state.CountryList[SelectedCountry];

        if (
          fromSelectedCountryData.IsFedexCity == 1 &&
          fromSelectedCountryData.IsZipAvailable == 0
        ) {
          var SelectedCity = { label: "Select City" };
          this.setState({
            disableFromZip: true,
            disableFromState: true,
            isFedexCountryFrom: true,
            FromFedExSelectedCity: SelectedCity,
          });

          var CityData = {
            CityType: "FedEx",
            CountryId: fromSelectedCountryData.CountryID,
          };

          this.getFromFedexCityList(CityData, "");
        } else {
          this.setState({
            disableFromZip: false,
            disableFromState: false,
            isFedexCountryFrom: false,
          });
        }

        this.setState({
          selectedFromCountry: value,
          fromCity: "",
          fromState: "",
        });
        this.getStates(value);
      }
    }
  };

  getStates(countryData) {
    try {
      this.showLoader();

      let data = {
        countryId: countryData.value,
      };

      api
        .post("location/getStateList", data)
        .then((res) => {
          if (res.success) {
            this.setState({
              stateList: res.data,
              stateAutoComplete: res.data.length ? true : false,
            });

            this.hideLoader();
          }
        })
        .catch((err) => {
          this.hideLoader();
          console.log("err...", err);
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {
      this.hideLoader();
    }
  }
  VendorzipChange = (zip) => {
    this.setState({
      VendorstateErr: false,
      VendorcityErr: false,
      VendorstateHelperText: "",
      VendorcityHelperText: "",
    });
    if (zip.length) {
      fetch(
        CommonConfig.zipCodeAPIKey(zip, this.state.selectedVendorCountry.label)
      )
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

              if (countryShortName === this.state.selectedVendorCountry.label) {
                this.setState({
                  VendorcityAutoComplete: FinalCity.length ? true : false,
                  VendorstateAutoComplete: this.state.stateList.length
                    ? true
                    : false,
                  VendorgoogleApiCityList: FinalCity,
                  Vendorstate: this.state.stateList.length
                    ? SelectedState
                    : state,
                  Vendorcity: SelectedCity,
                });
              } else {
                this.setState({
                  VendorcityAutoComplete: false,
                  VendorstateAutoComplete: this.state.stateList.length
                    ? true
                    : false,
                  VendorgoogleApiCityList: [],
                  Vendorstate: "",
                  Vendorcity: "",
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

              if (countryShortName === this.state.selectedVendorCountry.label) {
                this.setState({
                  VendorcityAutoComplete: FinalCity.length ? true : false,
                  VendorstateAutoComplete: this.state.stateList.length
                    ? true
                    : false,
                  VendorgoogleApiCityList: FinalCity,
                  Vendorstate: this.state.stateList.length
                    ? SelectedState
                    : state,
                  Vendorcity: SelectedCity,
                });
              } else {
                this.setState({
                  VendorcityAutoComplete: false,
                  VendorstateAutoComplete: this.state.stateList.length
                    ? true
                    : false,
                  VendorgoogleApiCityList: [],
                  Vendorstate: "",
                  Vendorcity: "",
                });
              }
              this.hideLoader();
            }
          } else {
            cogoToast.error("Zip code not found");
            this.setState({
              VendorcityAutoComplete: false,
              VendorstateAutoComplete: this.state.stateList.length
                ? true
                : false,
              VendorgoogleApiCityList: [],
              Vendorstate: "",
              Vendorcity: "",
            });
            this.hideLoader();
          }
        });
    }
  };
  zipChange = (zip) => {
    this.setState({
      stateErr: false,
      cityErr: false,
      stateHelperText: "",
      cityHelperText: "",
    });
    if (zip.length) {
      fetch(CommonConfig.zipCodeAPIKey(zip, this.state.selectedCountry.label))
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

              if (countryShortName === this.state.selectedCountry.label) {
                this.setState({
                  cityAutoComplete: FinalCity.length ? true : false,
                  stateAutoComplete: this.state.stateList.length ? true : false,
                  googleApiCityList: FinalCity,
                  state: this.state.stateList.length ? SelectedState : state,
                  city: SelectedCity,
                });
              } else {
                this.setState({
                  cityAutoComplete: false,
                  stateAutoComplete: this.state.stateList.length ? true : false,
                  googleApiCityList: [],
                  state: "",
                  city: "",
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

              if (countryShortName === this.state.selectedCountry.label) {
                this.setState({
                  cityAutoComplete: FinalCity.length ? true : false,
                  stateAutoComplete: this.state.stateList.length ? true : false,
                  googleApiCityList: FinalCity,
                  state: this.state.stateList.length ? SelectedState : state,
                  city: SelectedCity,
                });
              } else {
                this.setState({
                  cityAutoComplete: false,
                  stateAutoComplete: this.state.stateList.length ? true : false,
                  googleApiCityList: [],
                  state: "",
                  city: "",
                });
              }
              this.hideLoader();
            }
          } else {
            cogoToast.error("Zip code not found");
            this.setState({
              cityAutoComplete: false,
              stateAutoComplete: this.state.stateList.length ? true : false,
              googleApiCityList: [],
              state: "",
              city: "",
            });
            this.hideLoader();
          }
        });
    }
  };
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
  cancelContact() {
    document.getElementById("ContactAdd").style.display = "none";
    this.ResetContact();
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
    debugger;
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
        contacts[key].Name = this.state.contactName;
        contacts[key].Title = this.state.title;
        contacts[key].Country = this.state.selectedCountry.label;
        contacts[key].AddressLine1 = this.state.addressLine1;
        contacts[key].AddressLine2 = this.state.addressLine2;
        contacts[key].AddressLine3 = this.state.addressLine3;
        contacts[key].ZipCode = this.state.zipCode;
        contacts[key].City = CommonConfig.isEmpty(this.state.city.label)
          ? this.state.city
          : this.state.city.label;
        contacts[key].State = CommonConfig.isEmpty(this.state.state.label)
          ? this.state.state
          : this.state.state.label;
        contacts[key].Email = this.state.email;
        contacts[key].Phone = phoneArray;

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
      document.getElementById("ContactAdd").style.display = "none";
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
    } else if (type === "VendorzipCode") {
      if (CommonConfig.isEmpty(val)) {
        this.setState({
          VendorzipCode: val,
          VendorzipCodeErr: true,
          VendorzipCodeHelperText: "Please enter Zip Code",
        });
      } else if (
        val.trim() !== val ||
        !val.match(CommonConfig.RegExp.zipCode)
      ) {
        this.setState({
          VendorzipCode: val,
          VendorzipCodeErr: true,
          VendorzipCodeHelperText: "Zipcode is not valid",
        });
      } else if (val.length > 12) {
        this.setState({
          VendorzipCode: val,
          VendorzipCodeErr: true,
          VendorzipCodeHelperText: "Zipcode length should be max 12 character",
        });
      } else {
        this.setState({
          VendorzipCode: val,
          VendorzipCodeErr: false,
          VendorzipCodeHelperText: "",
        });
        this.VendorzipChange(val);
      }
    } else if (type === "Vendorcity") {
      if (CommonConfig.isEmpty(val)) {
        this.setState({
          Vendorcity: val,
          VendorcityErr: true,
          VendorcityHelperText: "Please enter City",
        });
      } else if (CommonConfig.RegExp.companyName.test(val)) {
        this.setState({
          Vendorcity: val,
          VendorcityErr: true,
          VendorcityHelperText: "City is not valid",
        });
      } else if (val.length > 54) {
        this.setState({
          Vendorcity: val,
          VendorcityErr: true,
          VendorcityHelperText: "City shoule be max 54 characters",
        });
      } else {
        this.setState({
          Vendorcity: val,
          VendorcityErr: false,
          VendorcityHelperText: "",
        });
      }
    } else if (type === "Vendorstate") {
      if (CommonConfig.isEmpty(val)) {
        this.setState({
          Vendorstate: val,
          VendorstateErr: true,
          VendorstateHelperText: "Please enter State",
        });
      } else if (CommonConfig.RegExp.companyName.test(val)) {
        this.setState({
          Vendorstate: val,
          VendorstateErr: true,
          VendorstateHelperText: "State is not valid",
        });
      } else if (val.length > 54) {
        this.setState({
          Vendorstate: val,
          VendorstateErr: true,
          VendorstateHelperText: "State shoule be max 54 characters",
        });
      } else {
        this.setState({
          Vendorstate: val,
          VendorstateErr: false,
          VendorstateHelperText: "",
        });
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
    } else if (type === "VendorzipCode") {
      this.setState({ VendorzipCode: val });
    } else if (type === "Vendorcity") {
      this.setState({ Vendorcity: val });
    } else if (type === "Vendorstate") {
      this.setState({ Vendorstate: val });
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
            if (
              res.data.services != undefined ||
              res.data.services.length > 0
            ) {
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
            }
            if (res.data.DocumentList.length > 0) {
              for (var i = 0; i < res.data.DocumentList.length; i++) {
                var filesList = res.data.DocumentList[i];
                filesList.CreatedOn = moment(filesList.CreatedOn).format(
                  CommonConfig.dateFormat.dateOnly
                );
                this.state.Attachments.push(filesList);
              }
            }
            const country = {};
            if (res.data.Country != "" || res.data.country != null) {
              const selectedCountry = this.state.CountryList.find(
                (x) => x.CountryName === res.data.Country
              );
              country = {
                value: selectedCountry.CountryID,
                label: selectedCountry.CountryName,
              };
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
              isFormW9: res.data.FormW9 === 1 ? true : false,
              VendorAddressLine1: res.data.AddressLine1,
              VendorAddressLine2: res.data.AddressLine2,
              VendorAddressLine3: res.data.AddressLine3,
              VendorzipCode: res.data.ZipCode,
              Vendorcity: res.data.City,
              Vendorstate: res.data.State,
              selectedVendorCountry: country,
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
    debugger;
    let stepsList = this.state.Steps;
    let activeIndex = stepsList.findIndex((x) => x.classname === "active");

    if (key !== activeIndex) {
      stepsList[key]["classname"] = "active";
      stepsList[activeIndex]["classname"] = "inactive";
      this.setState({ Steps: stepsList });
      let divID = stepsList[key]["stepId"];
      if (
        key === 0 &&
        document.getElementById("ContactAdd").style.display === "block"
      ) {
        document.getElementById("ContactAdd").style.display = "block";
      } else {
        document.getElementById("ContactAdd").style.display = "none";
      }
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
      userId: CommonConfig.loggedInUserData().PersonID,
      isFormW9: vendorDetails.isFormW9,
      AddressLine1: vendorDetails.VendorAddressLine1,
      AddressLine2: vendorDetails.VendorAddressLine2,
      AddressLine3: vendorDetails.VendorAddressLine3,
      ZipCode: vendorDetails.VendorzipCode,
      City: CommonConfig.isEmpty(vendorDetails.Vendorcity.label)
        ? vendorDetails.Vendorcity
        : vendorDetails.Vendorcity.label,
      State: CommonConfig.isEmpty(vendorDetails.Vendorstate.label)
        ? vendorDetails.Vendorstate
        : vendorDetails.Vendorstate.label,
      Country: vendorDetails.selectedVendorCountry.label,
    };

    try {
      this.showLoader();
      api
        .post("vendor/addNewVendor", JSON.stringify(data))
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
  editVendor() {
    if (this.state.offeredService.length === 0) {
      return cogoToast.error("Please select one service");
    }
    if (this.state.contactList.length === 0) {
      return cogoToast.error("Please add one contact");
    }
    debugger;
    let vendorDetails = this.state;
    var finalAttachment = [];
    for (var i = 0; i < vendorDetails.Attachments.length; i++) {
      if (vendorDetails.Attachments[i].hasOwnProperty("AttachmentName")) {
        finalAttachment.push(vendorDetails.Attachments[i]);
      }
    }
    debugger;
    let data = {
      vendorId: this.state.vendorId,
      vendorName: vendorDetails.vendorName,
      vendorWebsite: vendorDetails.vendorWebsite,
      vendorType: vendorDetails.vendorType,
      isBulkUpload: vendorDetails.isBulkUpload,
      isFormW9: vendorDetails.isFormW9, // === true ? 1 : 0,
      carrierLink: vendorDetails.carrierLink,
      comments: vendorDetails.comments,
      service: vendorDetails.offeredService,
      contacts: this.state.contactList,
      userId: CommonConfig.loggedInUserData().PersonID,
      DocumentList: finalAttachment,
      AddressLine1: vendorDetails.VendorAddressLine1,
      AddressLine2: vendorDetails.VendorAddressLine2,
      AddressLine3: vendorDetails.VendorAddressLine3,
      ZipCode: vendorDetails.VendorzipCode,
      City: CommonConfig.isEmpty(vendorDetails.Vendorcity.label)
        ? vendorDetails.Vendorcity
        : vendorDetails.Vendorcity.label,
      State: CommonConfig.isEmpty(vendorDetails.Vendorstate.label)
        ? vendorDetails.Vendorstate
        : vendorDetails.Vendorstate.label,
      Country: vendorDetails.selectedVendorCountry.label,
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
        .post("vendor/EditVendor", formData)
        .then((res) => {
          if (res.success) {
            this.props.history.push({
              pathname: "/admin/Vendor",
              state: {
                filterlist:
                  this.props.history.location.state.filterlist !== undefined
                    ? this.props.history.location.state.filterlist
                    : null,
                sortlist:
                  this.props.history.location.state.sortlist !== undefined
                    ? this.props.history.location.state.sortlist
                    : null,
                serviceValue:
                  this.props.history.location.state.serviceValue !== undefined
                    ? this.props.history.location.state.serviceValue
                    : null,
              },
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
      console.log("error..", error);
      cogoToast.error("Something Went Wrong");
    }
  }
  fileUpload = (event, record) => {
    const files = event.target.files[0];
    console.log("FileSizes = ", files);
    console.log("FileSizes = ", files.size);
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
  renderDocumentName = (cellInfo) => {
    return (
      <div className="table-input-slam">
        <CustomInput
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
      .post("/vendor/deleteVendorSingleDocument", data)
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
  handleDocumentChange = (e, record) => {
    var Index = this.state.Attachments.indexOf(record.original);
    this.state.Attachments[Index]["FileName"] = e.target.value;
    this.setState({ Attachments: [...this.state.Attachments] });
  };

  deleteContact = () => {
    let contacts = this.state.contactList;

    contacts.splice(this.state.contactListKey, 1);
    this.setState({ contactList: contacts, open: false });
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
                          value={this.state.isBulkUpload}
                          onChange={(event) =>
                            this.changeDropDown(event, "bulkUpload")
                          }
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
                        options={CountryOptions}
                        id="VendorCountry"
                        getOptionLabel={(option) => option.label}
                        value={this.state.selectedVendorCountry}
                        autoSelect
                        onChange={(event, value) =>
                          this.ChangeVendorCountry(value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Country"
                            error={this.state.VendorcountryErr}
                            helperText={this.state.VendorcountryHelperText}
                            fullWidth
                          />
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    {" "}
                    <CustomInput
                      labelText={<span>Zip</span>}
                      id="VendorzipCode"
                      error={this.state.VendorzipCodeErr}
                      helperText={this.state.VendorzipCodeHelperText}
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className="requiredicon">location_city</Icon>
                          </InputAdornment>
                        ),
                        value: this.state.VendorzipCode,
                        onBlur: (event) =>
                          this.handleBlur(event, "VendorzipCode"),
                        onChange: (e) => this.handleChange(e, "VendorzipCode"),
                        onFocus: (event) =>
                          this.setState({
                            VendorzipCodeErr: false,
                            VendorzipCodeHelperText: "",
                          }),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    {this.state.VendorcityAutoComplete === false ? (
                      <CustomInput
                        labelText={<span>City</span>}
                        id="Vendorcity"
                        error={this.state.VendorcityErr}
                        helperText={this.state.VendorcityHelperText}
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className="requiredicon">
                                location_city
                              </Icon>
                            </InputAdornment>
                          ),
                          value: this.state.Vendorcity,
                          onChange: (e) => this.handleChange(e, "Vrndorcity"),
                          onBlur: (e) => this.handleBlur(e, "Vendorcity"),
                          onFocus: () =>
                            this.setState({
                              VendorcityErr: false,
                              VendorcityHelperText: "",
                            }),
                        }}
                      />
                    ) : (
                      <Autocomplete
                        options={CityOptions}
                        id="vendorcityAutoComplete"
                        autoSelect
                        getOptionLabel={(option) => option.label}
                        value={this.state.Vendorcity}
                        onChange={(event, value) =>
                          this.vendorChangeCity(event, value)
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
                    {this.state.VendorstateAutoComplete === false ? (
                      <CustomInput
                        labelText={<span>State</span>}
                        id="state"
                        error={this.state.VendorstateErr}
                        helperText={this.state.VendorstateHelperText}
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className="requiredicon">public</Icon>
                            </InputAdornment>
                          ),
                          value: this.state.Vendorstate,
                          onChange: (e) => this.handleChange(e, "Vendorstate"),
                          onBlur: (e) => this.handleBlur(e, "Vendorstate"),
                          onFocus: () =>
                            this.setState({
                              VendorstateErr: false,
                              VendorstateHelperText: "",
                            }),
                        }}
                      />
                    ) : (
                      <Autocomplete
                        options={StateOptions}
                        id="VendorstateAutoComplete"
                        autoSelect
                        getOptionLabel={(option) => option.label}
                        value={this.state.Vendorstate}
                        onChange={(event, value) =>
                          this.vendorChangeState(event, value)
                        }
                        onFocus={() =>
                          this.setState({
                            VendorstateErr: false,
                            VendorstateHelperText: "",
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            error={this.state.VendorstateErr}
                            helperText={this.state.VendorstateHelperText}
                            label="State"
                            fullWidth
                          />
                        )}
                      />
                    )}
                  </GridItem>
                </GridContainer>
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
            <div className="shipment-submit">
              <div className="right">
                <Button
                  color="rose"
                  onClick={() => {
                    CommonConfig.isEmpty(this.state.vendorId)
                      ? this.addVendor()
                      : this.editVendor();
                  }}
                >
                  SAVE & EXIT
                </Button>
              </div>
            </div>
            <div>
              <Dialog
                open={this.state.open}
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
                    onClick={() => this.setState({ open: false })}
                    color="primary"
                  >
                    Cancel
                  </Button>
                  {this.state.Access.DeleteAccess === 1 ? (
                    <Button
                      onClick={() => this.deleteContact()}
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
      </div>
    );
  }
}

export default AddEditVendors;
