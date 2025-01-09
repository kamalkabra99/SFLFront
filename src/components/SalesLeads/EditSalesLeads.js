import React, { Component } from "react";
import _, { assign, concat, result } from "lodash";
import TextField from "@material-ui/core/TextField";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/PriorityHigh";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import Note from "@material-ui/icons/Assessment";
import Package from "@material-ui/icons/Markunread";
import Badge from "@material-ui/core/Badge";
import moment from "moment";
import momentTimezone from "moment-timezone";
import DescriptionIcon from "@material-ui/icons/Description";
import { CommonConfig } from "../../utils/constant";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import Icon from "@material-ui/core/Icon";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import ReactTable from "react-table";
import InputAdornment from "@material-ui/core/InputAdornment";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SimpleBackdrop from "../../utils/general";
import api from "../../utils/apiClient";
import { fileBase } from "../../utils/config";
import Datetime from "react-datetime";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import cogoToast from "cogo-toast";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import tvSVG from "../../assets/img/tv-icon.svg";
import carSVG from "../../assets/img/car.svg";
import packageSVG from "../../assets/img/package.svg";
import HeaderLinks from "components/Navbars/AdminNavbarLinks";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { getOriginalNode } from "typescript";
const axios = require("axios").default;
const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};
const classes = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "right",
    right: theme.spacing.unit / 2,
    top: theme.spacing.unit / 2,
    color: theme.palette.grey[500],
  },
}));
var yesterday = moment().toDate();

var valid = function(current) {
  return (
    current.day() !== 0 && current.day() !== 6 && current.isAfter(yesterday)
  );
};
const useStyles = makeStyles(styles);

class EditSalesLeads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proposalclick: false,
      // getrateClick: false,
      cancelationReasonList: [],
      closedReasonList:[],
      CancelationReason: "",
      CancelationReasonErr: false,
      CancelationReasonHelperText: "",
      tempCountryCodeList: [],
      countryCodeListValue:[],
      ProposalLog: [],
      previousManaged:"",
      OpenproposalLog: false,
      showProposallist: [],
      fromEmailAddress: CommonConfig.loggedInUserData().Email,
      deleteProposalPopUp: false,
      deleteproposalID: "",
      ProposalsendDoc: "",
      ProposalemailOPen: false,
      TermsList: [],
      propsalTabOpen: false,
      isChecked: false,
      DallasTotal: 0,
      SecaucusTotal: 0,
      HaywardTotal: 0,
      DallasCostToal: 0,
      SecaucusCostTotal: 0,
      HaywardCostTotal: 0,
      Ratesendmailopen: false,
      errorMessage1: "",
      PickupOpenPopup: false,
      pickUpValue: "",
      setCurrencyIcon:"",
      setCurrencyIconLabel:"",
      PickUpType: [
        { value: "FEDEX", label: "FedEx" },
        { value: "Non FEDEX", label: "Non FedEx" },
      ],
      finalGetResults: [],
      finalOceanResult: [],
      FinalGetRate: {},
      SelectedWeightType: "LB",
      packedBy: [{ value: "KG", label: "KG" }, { value: "LB", label: "LB" }],
      SelectedDimensitionType: "Inches",
      DimensitionpackedBy: [
        { value: "Inches", label: "Inches" },
        { value: "CM", label: "CM" },
      ],
      NoOfTv: 0,
      checkTotalChWeight: 0,
      checkTotalCFT: 0,
      CarmakeErrText: "",
      CarmodelErrText: "",
      CaryearErrText: "",

      TvmakeErrText: "",
      TvmodelErrText: "",
      TvAweightErrText: "",

      newpackagetype: [],

      packagetypeErr: false,
      packagetypeErrText: "",

      AWeightErr: false,
      AWeightErrText: "",
      AquantityErr: false,
      AquantityErrText: "",

      pickupcityzipHelperText: "",
      ProposalTypeErr: false,
      ProposalTypeError: "",
      Referrederror: "",
      Referrederr: false,
      Followuprror: "",
      Followuprr: false,
      PackageListError: "",

      EditProposalData: [],
      SalesLeadManagementID: "",
      newurl: "",
      Managedby: "",
      managedbyErr: false,
      managedbyDisabled: false,
      managedbyHelperText: "",

      ProposalType: 0,
      ProposalStatus: "",
      proposalstatusErr: false,
      proposalstatusHelperText: "",

      ContactName: "",
      contactnameErr: false,
      contactnameHelperText: "",
      contactnameCheck: false,

      EmailAddress: "",
      NewEmailAddress: "",
      EmailAdd: "",

      trackingNumberHelperText : "",
      trackingNumberCheck :false,
      trackingNumberErr :false,
      trackingNumber : "",

      emailaddressErr: false,
      emailaddressHelperText: "",
      emailaddressCheck: false,

      Phone: "",
      ContactNum: "",

      phoneErr: false,
      phoneHelperText: "",
      phoneCheck: false,

      PickupCountry: "",
      pickupcountryErr: false,
      pickupcountryHelperText: "",
      pickupcountryCheck: false,

      PickupCity: "",
      PickupCityList: [],
      pickupcityErr: false,
      pickupcityHelperText: "",
      pickupcityCheck: false,

      PickupState: "",
      pickupstateErr: false,
      pickupstateHelperText: "",
      pickupstateCheck: false,

      DropoffCountry: "",
      dropoffcountryErr: false,
      dropoffcountryHelperText: "",
      dropoffcountryCheck: false,

      DropoffCity: "",
      DropoffCityList: [],
      dropoffcityErr: false,
      dropoffcityHelperText: "",
      DropoffCityCheck: false,

      DropoffState: "",
      dropoffstateErr: false,
      dropoffstateHelperText: "",
      dropoffstateCheck: false,

      // LeadDate: moment().toDate(),
      LeadDate: momentTimezone()
        .tz(CommonConfig.UStimezone)
        .toDate(),
      FollowupDate: "",
      followupdateErr: false,
      followupdateHelperText: "",
      followupdateCheck: false,

      DropoffCityZip: "",
      DropoffCityZipErr: false,
      DropoffCityZipHelperText: "",

      PickupCityZip: "",
      PickupCityErr: false,
      PickupCityZipHelperText: "",
      PickupCityZipErr: false,

      tentativedateErr: false,
      tentativedateHelperText: "",

      ReferredBy: {},
      ReferredbyErr: true,
      ReferredbyHelperText: "",

      LeadIPAddress: "",
      leadipaddressErr: false,
      leadipaddressHelperText: "",

      DeliveryType: "",
      deliverytypeErr: false,
      deliverytypeHelperText: "",

      Comments: "",
      commentsErr: false,
      commentsHelperText: "",
      Loading: false,

      PackageType: 0,
      Quantity: 0,
      ChargeableWeight: 0,
      BoxW: 0,
      BoxL: 0,
      BoxH: 0,
      CFT: 0,

      CountryList: [],
      PackageList: [],
      TVList: [],
      CarList: [],
      NoteList: [],
      Attachments: [],
      ViewProposalList: [],
      selectedPickUPCountry: {},
      selectedDropoffCountry: {},
      notes: [],
      Path: [],
      notesShow: false,
      FromCity: "",
      FromState: "",

      AbsolutePath: "",
      managedby: [],
      selectedWorkingOnRequest: "",
      SelectedCountryCode:{
        label: "United States(+1)",
        value: "United States(+1)",
      },
      dropoffCountry: [],
      packageType: [
        { value: 1, label: "Boxes" },
        { value: 2, label: "Documents" },
        { value: 3, label: "Furniture" },
      ],
      TermsAction: [
        { value: "Include", label: "Include" },
        { value: "Exclude", label: "Exclude" },
        { value: "Not Applicable", label: "Not Applicable" },
      ],
      // otherPackageType : [
      //   { value: 4, label: 'TV' },
      //   { value: 5, label: 'Auto' },
      // ],
      ReadAccess: 0,
      WriteAccess: 0,
      GetRateAllAccess: 0,
      DeleteAccess: 0,
      pickupCountry: [],
      proposalstatus: [
        { value: "Auto Quote", label: "Auto Quote" },
        { value: "Booked", label: "Booked" }, // New status
        { value: "Cancelled", label: "Cancelled" },
        { value: "Closed", label: "Closed" }, // reason move to closed
        { value: "New", label: "New" },
        { value: "Open", label: "Open" },
        // { value: "To be Deleted", label: "To be Deleted" },
      ],
      deliverytype: [
        { value: "Residential", label: "Residential" },
        { value: "Commercial", label: "Commercial" },
      ],
      proposaltype: [
        { value: "", label: "None" },
        { value: 1, label: "Air" },
        { value: 2, label: "Ocean" },
        { value: 3, label: "Ground" },
      ],
      // referredby: [
      //   { value: "Google", label: "Google" },
      //   { value: "FunAsia", label: "FunAsia" },
      //   { value: "Social Media", label: "Social Media" },
      //   { value: "Referral", label: "Referral" },
      //   { value: "Outdoor Signage", label: "Outdoor Signage" },
      //   { value: "Others", label: "Others" },
      // ],

      referredby: [],
      TentativeDate: "",
      StartDate: "",
      // TentativeDate: moment().toDate(),
      // StartDate: moment().toDate(),
      open: false,
      close: false,
      fromStateAutoComplete: false,
      fromStateList: [],
      toStateAutoComplete: false,
      toStateList: [],
      PickupCityInput: true,
      DropoffCityInput: true,
      IsPackageVisible: false,
      IsTvVisible: false,
      IsCarVisible: false,
      PhoneCount: 0,
      EmailCount: 0,
      // Correspondence Data

      CommuncationList: [],

      // Email Cofig Data
      sendmailopen: false,
      sendMailInfo: {
        Frommail: "",
        TOmail: "",
        CCmail: "",
        BCCmail: "",
        Subjectmail: "",
        Bodymail: "",
        Type: "",
        attachments: "",
      },
      GetRate: {
        PackageType: "Package",
        WeightType: "LB",
        SelectedWeightType: "",
        PickUp: "No",
        Residential: "No",
        FromCountry: "",
        ToCountry: "",
        FromState: "",
        ToState: "",
        FromCity: "",
        FromFedExCity: "",
        FromUPSCity: "",
        ToCity: "",
        ToFedExCity: "",
        ToUPSCity: "",
        FromZipCode: "",
        ToZipCode: "",
        TotalWeight: 0,
        TotalChargableWeight: 0,
        TotalInsuredValue: 0,
      },
      CreateProposal: {
        TotalCFT: "",
        AdditionalCFT: "",
        PackingCharges: "",
        PickupCharges: "",
        ShippingCostperCFT: "",
        AdditionalCFTCharges: "",
        MinimumPackingCharges: "",
        MinimumPickupCharges: "",
        EstimatedShippingCost: parseFloat(0.0).toFixed(2),
        THCChargesperCFT: parseFloat(0.0).toFixed(2),
        ServiceType: "--Select--",
        PackingChargestype: "Per CFT",
        PickupChargestype: "Per CFT",
        PickupMinimumtype: "CFT",
        PackingMinimumtype: "CFT",
        ProposalComment: "",
      },
      TermsListInclude: [],
      TermsListExclude: [],
      servicelist: [
        { value: "--Select--", label: "--Select--" },
        { value: "D2D", label: "D2D" },
        { value: "W2D", label: "W2D" },
        { value: "D2W", label: "D2W" },
        { value: "W2W", label: "W2W" },
      ],
      charges: [
        { value: "Per CFT", label: "Per CFT" },
        { value: "Per Hour", label: "Per Hour" },
        { value: "In Total", label: "In Total" },
      ],
      MinimumCharges: [
        { value: "CFT", label: "CFT" },
        { value: "Hours", label: "Hours" },
        { value: "USD", label: "USD" },
      ],
    };
  }

  ProposalonChange = (e, type) => {
    var createProposal = this.state.CreateProposal;
    if (type === "MinimumPickupCharges") {
      //let MinimumPickupCharges = e.target.value.replace(/\D/g, "");
      let MinimumPickupCharges = e.target.value.replace(/(?!-)[^0-9.]/g, "");
      if (e.target.value.length <= 15) {
        createProposal.MinimumPickupCharges = MinimumPickupCharges;
      }
    } else if (type === "PickupCharges") {
      let PickupCharges = e.target.value.replace(/(?!-)[^0-9.]/g, "");
      if (e.target.value.length <= 15) {
        createProposal.PickupCharges = PickupCharges;
      }
    } else if (type === "MinimumPackingCharges") {
      let MinimumPackingCharges = e.target.value.replace(/(?!-)[^0-9.]/g, "");
      if (e.target.value.length <= 15) {
        createProposal.MinimumPackingCharges = MinimumPackingCharges;
      }
    } else if (type === "PackingCharges") {
      let PackingCharges = e.target.value.replace(/(?!-)[^0-9.]/g, "");
      if (e.target.value.length <= 15) {
        createProposal.PackingCharges = PackingCharges;
      }
    } else if (type === "AdditionalCFTCharges") {
      let AdditionalCFTCharges = e.target.value.replace(/(?!-)[^0-9.]/g, "");
      if (e.target.value.length <= 15) {
        createProposal.AdditionalCFTCharges = AdditionalCFTCharges;
      }
    } else if (type === "AdditionalCFT") {
      let AdditionalCFT = e.target.value.replace(/(?!-)[^0-9.]/g, "");
      if (e.target.value.length <= 15) {
        createProposal.AdditionalCFT = AdditionalCFT;
      }
    } else if (type === "THCChargesperCFT") {
      let THCChargesperCFT = e.target.value.replace(/(?!-)[^0-9.]/g, "");
      if (e.target.value.length <= 15) {
        createProposal.THCChargesperCFT = THCChargesperCFT;
      }
    } else if (type === "TotalCFT") {
      let totalCFT = e.target.value.replace(/(?!-)[^0-9.]/g, "");
      if (e.target.value.length <= 15) {
        createProposal.TotalCFT = totalCFT;
      }

      if (
        createProposal.ShippingCostperCFT === "" ||
        createProposal.TotalCFT === ""
      ) {
        createProposal.EstimatedShippingCost = parseFloat(0.0).toFixed(2);
      } else {
        createProposal.EstimatedShippingCost = parseFloat(
          parseFloat(createProposal.ShippingCostperCFT).toFixed(2) *
            parseFloat(createProposal.TotalCFT).toFixed(2)
        ).toFixed(2);
      }
    } else if (type === "ShippingCostperCFT") {
      createProposal.ShippingCostperCFT = e.target.value;
      if (
        createProposal.ShippingCostperCFT === "" ||
        createProposal.TotalCFT === ""
      ) {
        createProposal.EstimatedShippingCost = parseFloat(0.0).toFixed(2);
      } else {
        createProposal.EstimatedShippingCost = parseFloat(
          parseFloat(createProposal.ShippingCostperCFT).toFixed(2) *
            parseFloat(createProposal.TotalCFT).toFixed(2)
        ).toFixed(2);
      }
    } else if (type === "ServiceType") {
      createProposal.ServiceType = e.target.value;
    } else if (type === "PickupMinimumtype") {
      createProposal.PickupMinimumtype = e.target.value;
    } else if (type === "PickupChargestype") {
      createProposal.PickupChargestype = e.target.value;
    } else if (type === "PackingChargestype") {
      createProposal.PackingChargestype = e.target.value;
    } else if (type === "PackingMinimumtype") {
      createProposal.PackingMinimumtype = e.target.value;
    } else if (type === "PropsalComment") {
      createProposal.ProposalComment = e.target.value;
    }

    this.setState({ createProposal: createProposal });
  };

  handleInputChange = (e, access) => {
    let userModules = this.state.finalGetResults;
    let cbVal = e.target.checked;
    let cbName = e.target.name;

    if (access === "Read") {
      let x = userModules.findIndex((x) => x.ServiceDisplayName === cbName);
      userModules[x].Checked = cbVal;
      this.setState({ finalGetResults: userModules });
    }

    if (access === "ReadAll") {
      const updatedModule = userModules.map((item) => ({
        ...item,
        Checked: cbVal, // Set Checked to the desired value (cbVal)
      }));
      // userModules.forEach((item) => {
      //   item.Checked = cbVal;
      // });
      this.setState({ finalGetResults: updatedModule });
    }
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickCancel = () => {
    this.setState({ close: true, open: false });
  };

  showLoader = () => {
    this.setState({ Loading: true });
  };

  hideLoader = () => {
    this.setState({ Loading: false });
  };

  async GetRateData() {
    //kruti

    for (var i = 0; i < this.state.PackageList.length; i++) {
      if (this.state.PackageList[i].Quantity === 0) {
        return cogoToast.error("Please enter valid package count");
      }
    }
    this.setState({ proposalclick: true });
    var propsalType = "";
    if (
      this.state.ProposalType === null ||
      this.state.ProposalType === 0 ||
      this.state.ProposalType === "" ||
      this.state.ProposalType === "null"
    ) {
      return cogoToast.error("Please select proposal type");
    } else if (this.state.ProposalType === 1 || this.state.ProposalType === 3) {
      propsalType = "Air";
    } else if (this.state.ProposalType === 2) {
      propsalType = "Ocean";
    }

    if (
      this.state.CarList.length > 0 &&
      this.state.CarList[0].Status === "Active"
    ) {
      return cogoToast.error("Online Rates not avalible for Car");
    }
    this.setState({ finalGetResults: [], finalOceanResult: [] });
    this.showLoader();
    var FinalGetRate = {};
    var UpsData = {};
    var fromStateCcode, toStateCcode;

    if (
      this.state.fromStateList.length > 0 &&
      (this.state.PickupState.value !== undefined ||
        this.state.PickupState.value !== "" ||
        this.state.PickupState.value !== null)
    ) {
      fromStateCcode = this.state.fromStateList.filter(
        (x) => x.StateName === this.state.PickupState.value
      );
    }
    if (this.state.toStateList.length > 0) {
      toStateCcode = this.state.toStateList.filter(
        (x) => x.StateName === this.state.DropoffState.value
      );
    }
    let fromCountryObj = this.state.CountryList.filter(
      (x) => x.CountryID === this.state.selectedPickUPCountry.value
    );
    let toCountryObj = this.state.CountryList.filter(
      (x) => x.CountryID === this.state.selectedDropoffCountry.value
    );

    // this.state.GetRate.FromCountry.FromZipCodeOptional = false;
    // this.state.GetRate.ToCountry.ToZipCodeOptional = false;
    // if (
    //   fromCountryObj[0].IsFedexCity === 1 &&
    //   fromCountryObj[0].IsUpsCity === 1
    // ) {
    //   this.state.GetRate.FromCountry.FromZipCodeOptional = true;
    // }
    // if (toCountryObj[0].IsFedexCity === 1 && toCountryObj[0].IsUpsCity === 1) {
    //   this.state.GetRate.ToCountry.ToZipCodeOptional = true;
    // }
    FinalGetRate.PackageType = this.state.newpackagetype[0];

    FinalGetRate.WeightType = this.state.SelectedWeightType;
    UpsData.FromCountry = JSON.stringify(fromCountryObj[0]);

    UpsData.FromCity =
      this.state.PickupCity != null &&
      this.state.PickupCity.value &&
      this.state.PickupCity.value !== undefined
        ? this.state.PickupCity.value
        : this.state.PickupCity;
    UpsData.FromUPSCity =
      fromCountryObj.IsUpsCity === 0
        ? null
        : this.state.PickupCity.value
        ? this.state.PickupCity.value
        : this.state.PickupCity;
    UpsData.FromFedExCity =
      fromCountryObj.IsFedexCity === 0
        ? null
        : this.state.PickupCity.value
        ? this.state.PickupCity.value
        : this.state.PickupCity;
    UpsData.FromZipCode = this.state.PickupCityZip;
    UpsData.FromStateProvinceCode =
      fromStateCcode.length > 0 ? fromStateCcode[0].StateCode : "";

    UpsData.ToCountry = JSON.stringify(toCountryObj[0]);

    UpsData.ToCity =
      this.state.DropoffCity !== null &&
      this.state.DropoffCity.value &&
      this.state.DropoffCity.value !== undefined
        ? this.state.DropoffCity.value
        : this.state.DropoffCity;
    UpsData.ToUPSCity =
      toCountryObj.IsUpsCity === 0
        ? null
        : this.state.DropoffCity.value
        ? this.state.DropoffCity.value
        : this.state.DropoffCity;
    UpsData.ToFedExCity =
      toCountryObj.IsFedexCity === 0
        ? null
        : this.state.DropoffCity.value
        ? this.state.DropoffCity.value
        : this.state.DropoffCity;
    UpsData.ToZipCode = this.state.DropoffCityZip;
    UpsData.ToStateProvinceCode = toStateCcode ? toStateCcode[0].StateCode : "";

    FinalGetRate.UpsData = UpsData;

    console.log("FinalGetRate.UpsData = ",fromCountryObj[0].CountryID)

    if(fromCountryObj[0].CountryID == "89"){
      this.state.setCurrencyIcon = "₹ "
      this.state.setCurrencyIconLabel = "INR "
    }else if(fromCountryObj[0].CountryID == "37"){
      this.state.setCurrencyIcon = "$c "
      this.state.setCurrencyIconLabel = "CAD "
    }else{
      this.state.setCurrencyIcon = "$ "
      this.state.setCurrencyIconLabel = "USD "
    }

    var PackageNumber = [];
    var Weight = [];
    var DimeL = [];
    var DimeW = [];
    var DimeH = [];
    var ChargableWeight = [];
    var InsuredValues = [];

    var PackagedetailsFinalValues = [];

    var TotalPackageNumber = 0;
    var TotalLength = 0;
    var TotalCFT = 0;
    var TotalWeight = 0;
    var TotalWidth = 0;
    var TotalHeight = 0;
    var TotalInsuredValues = 0;
    var TotalChargableWeight = 0;

    var PackageDetails = [];
    // for (var i = 0; i < this.state.PackageList.length; i++) {

    PackageDetails = this.state.PackageList.filter(
      (feature) => feature.Status === "Active"
    ).map((feature) => {
      return {
        ActualWeight: feature.ActualWeight,
        CFT: feature.CFT,
        ChargeableWeight: parseInt(feature.ChargeableWeight),
        DimensionH: feature.DimensionH,
        DimensionL: feature.DimensionL,
        DimensionW: feature.DimensionW,
        PackageChargableWeight: parseInt(feature.ChargeableWeight),
        //PackageCFT: feature.CFT,
        PackageHeight: feature.DimensionH.toString(),
        PackageInsuredValue: "0",
        PackageLength: feature.DimensionL.toString(),
        PackageNumber: feature.Quantity.toString(),
        PackageType: feature.PackageType.toString(),
        PackageWeight: feature.ActualWeight.toString(),
        PackageWidth: feature.DimensionW.toString(),
        Quantity: feature.Quantity,
        SalesLeadPackageDetailID: feature.SalesLeadPackageDetailID,
        SortOrder: feature.SortOrder,
        Status: feature.Status,
      };
    });

    var TVDetails = [];
    TVDetails = this.state.TVList.filter(
      (feature) => feature.Status === "Active"
    ).map((feature) => {
      return {
        ActualWeight: feature.ActualWeight,
        CFT: feature.CFT,
        ChargeableWeight: parseInt(feature.ChargeableWeight),
        DimensionH: feature.DimensionH,
        DimensionL: feature.DimensionL,
        DimensionW: feature.DimensionW,
        PackageChargableWeight: parseInt(feature.ChargeableWeight),
        //PackageCFT: feature.CFT,
        PackageHeight: feature.DimensionH.toString(),
        PackageInsuredValue: "0",
        PackageLength: feature.DimensionL.toString(),
        PackageNumber: feature.Quantity.toString(),
        PackageType: feature.PackageType.toString(),
        PackageWeight: feature.ActualWeight.toString(),
        PackageWidth: feature.DimensionW.toString(),
        Quantity: feature.Quantity,
        SalesLeadPackageDetailID: feature.SalesLeadPackageDetailID,
        SortOrder: feature.SortOrder,
        Status: feature.Status,
      };
    });
    if (propsalType === "Ocean") {
      var PackageList = [];
      PackageList = this.state.PackageList.concat(TVDetails);
      for (var i = 0; i < PackageList.length; i++) {
        if (PackageList[i].Status === "Active") {
          if (PackageList[i].Quantity) {
            TotalPackageNumber =
              TotalPackageNumber + parseInt(PackageList[i].Quantity);
            PackageNumber.push(PackageList[i].Quantity.toString());
          } else {
            PackageList[i].Quantity = "1";
            TotalPackageNumber =
              TotalPackageNumber + parseInt(PackageList[i].Quantity);
            PackageNumber.push(PackageList[i].Quantity.toString());
          }

          Weight.push(PackageList[i].ActualWeight.toString());

          if (
            //   PackageList[i].DimensionL.toString() ||
            PackageList[i].DimensionL
          ) {
            DimeL.push(PackageList[i].DimensionL.toString());
          } else {
            PackageList[i].DimensionL = "1";
            DimeL.push(PackageList[i].DimensionL.toString());
          }

          if (PackageList[i].DimensionW) {
            DimeW.push(PackageList[i].DimensionW.toString());
          } else {
            PackageList[i].DimensionW = "1";
            DimeW.push(PackageList[i].DimensionW.toString());
          }

          if (PackageList[i].DimensionH) {
            DimeH.push(PackageList[i].DimensionH.toString());
          } else {
            PackageList[i].DimensionH = "1";
            DimeH.push(PackageList[i].DimensionH.toString());
          }

          if (PackageList[i].ChargeableWeight) {
            ChargableWeight.push(PackageList[i].ChargeableWeight.toString());
          }

          if (PackageList[i].CFT) {
            InsuredValues.push(
              PackageList[i].insuredvalue
                ? PackageList[i].insuredvalue.toString()
                : "0"
            );
          } else {
            PackageList[i].CFT = "0";
            InsuredValues.push(
              PackageList[i].insuredvalue
                ? PackageList[i].insuredvalue.toString()
                : "0"
            );
          }
          TotalLength += parseInt(PackageList[i].DimensionL);
          TotalWidth += parseInt(PackageList[i].DimensionW);
          TotalHeight += parseInt(PackageList[i].DimensionH);
          TotalCFT += parseInt(PackageList[i].CFT);
          TotalWeight += parseInt(PackageList[i].ActualWeight);
          TotalInsuredValues += parseInt(
            PackageList[i].insuredvalue ? PackageList[i].insuredvalue : 0
          );
          TotalChargableWeight += parseInt(PackageList[i].ChargeableWeight);
        }
      }
    } else {
      for (var i = 0; i < this.state.PackageList.length; i++) {
        if (this.state.PackageList[i].Status === "Active") {
          if (this.state.PackageList[i].Quantity) {
            TotalPackageNumber =
              TotalPackageNumber + parseInt(this.state.PackageList[i].Quantity);
            PackageNumber.push(this.state.PackageList[i].Quantity.toString());
          } else {
            this.state.PackageList[i].Quantity = "1";
            TotalPackageNumber =
              TotalPackageNumber + parseInt(this.state.PackageList[i].Quantity);
            PackageNumber.push(this.state.PackageList[i].Quantity.toString());
          }

          Weight.push(this.state.PackageList[i].ActualWeight.toString());

          if (
            //   this.state.PackageList[i].DimensionL.toString() ||
            this.state.PackageList[i].DimensionL
          ) {
            DimeL.push(this.state.PackageList[i].DimensionL.toString());
          } else {
            this.state.PackageList[i].DimensionL = "1";
            DimeL.push(this.state.PackageList[i].DimensionL.toString());
          }

          if (this.state.PackageList[i].DimensionW) {
            DimeW.push(this.state.PackageList[i].DimensionW.toString());
          } else {
            this.state.PackageList[i].DimensionW = "1";
            DimeW.push(this.state.PackageList[i].DimensionW.toString());
          }

          if (this.state.PackageList[i].DimensionH) {
            DimeH.push(this.state.PackageList[i].DimensionH.toString());
          } else {
            this.state.PackageList[i].DimensionH = "1";
            DimeH.push(this.state.PackageList[i].DimensionH.toString());
          }

          if (this.state.PackageList[i].ChargeableWeight) {
            ChargableWeight.push(
              this.state.PackageList[i].ChargeableWeight.toString()
            );
          }

          if (this.state.PackageList[i].CFT) {
            InsuredValues.push(
              this.state.PackageList[i].insuredvalue
                ? this.state.PackageList[i].insuredvalue.toString()
                : "0"
            );
          } else {
            this.state.PackageList[i].CFT = "0";
            InsuredValues.push(
              this.state.PackageList[i].insuredvalue
                ? this.state.PackageList[i].insuredvalue.toString()
                : "0"
            );
          }
          TotalLength += parseInt(this.state.PackageList[i].DimensionL);
          TotalWidth += parseInt(this.state.PackageList[i].DimensionW);
          TotalHeight += parseInt(this.state.PackageList[i].DimensionH);
          TotalCFT += parseInt(this.state.PackageList[i].CFT);
          TotalWeight += parseInt(this.state.PackageList[i].ActualWeight);
          TotalInsuredValues += parseInt(
            this.state.PackageList[i].insuredvalue
              ? this.state.PackageList[i].insuredvalue
              : 0
          );
          TotalChargableWeight += parseInt(
            this.state.PackageList[i].ChargeableWeight
          );
        }
      }
    }

    this.Calculate();
    if (propsalType === "Air") {
      if (this.state.checkTotalChWeight === 0) {
        this.hideLoader();
        return cogoToast.error("ChargableWeight zero does not exits");
      }

      for (var i = 0; i < this.state.PackageList.length; i++) {
        if (
          this.state.PackageList[i].PackageType === 3 &&
          this.state.PackageList[i].Status === "Active"
        ) {
          this.hideLoader();
          return cogoToast.error("Online rates are not avalible for furniture");
        } else {
          continue;
        }
      }

      FinalGetRate.PackageNumber = PackageNumber;
      FinalGetRate.Weight = Weight;
      FinalGetRate.DimeL = DimeL;
      FinalGetRate.DimeW = DimeW;
      FinalGetRate.DimeH = DimeH;
      FinalGetRate.TotalLength = TotalLength;
      FinalGetRate.TotalWidth = TotalWidth;
      FinalGetRate.TotalInsuredValues = TotalInsuredValues;
      FinalGetRate.TotalHeight = TotalHeight;
      FinalGetRate.ChargableWeight = ChargableWeight;
      FinalGetRate.InsuredValues = InsuredValues;
      FinalGetRate.SelectedWeightType = this.state.SelectedWeightType;
      // if (this.state.GetRate.TotalInsuredValue) {
      FinalGetRate.Total = TotalInsuredValues.toString();
      // }

      // if (this.state.GetRate.TotalWeight) {
      FinalGetRate.TotalWeight = TotalChargableWeight;
      // }
      FinalGetRate.IsResidencial =
        this.state.DeliveryType === "Residential" ? true : false;
      FinalGetRate.IsPickUp =
        this.state.GetRate.PickUp === "Yes" ? true : false;

      FinalGetRate.WeightCount = Weight.length;
      FinalGetRate.LengthCount = DimeL.length;
      FinalGetRate.WidthCount = DimeW.length;
      FinalGetRate.HeightCount = DimeH.length;

      FinalGetRate.PackCount = TotalPackageNumber.toString();
      FinalGetRate.PackageDetailsCount = TotalPackageNumber;
      FinalGetRate.PackageDetailsText = TotalPackageNumber.toString();

      // if (this.state.GetRate.TotalWeight) {
      FinalGetRate.EnvelopeWeightLBSText = TotalChargableWeight;
      // }

      FinalGetRate.ShipDate = new Date().toISOString();
      FinalGetRate.PackageDetails = PackageDetails;
      FinalGetRate.AgentCode = CommonConfig.loggedInUserData().PersonID;
      if (PackageDetails.length === 1) {
        FinalGetRate.PackageType =
          PackageDetails[0].PackageType == "2"
            ? "Envelope"
            : FinalGetRate.PackageType;
      }
      this.setState({ FinalGetRate: FinalGetRate });

      var data = JSON.stringify({ quoteData: FinalGetRate });
      let res = await api.post("getQuote/getRates", data);
      if (res.success) {
        this.setState({ finalGetResults: res.data, Loading: false });

        this.state.finalGetResults.map((OBJ) => {
          var totalValue = ((OBJ.BaseP - OBJ.Rates) / OBJ.BaseP) * 100;
          totalValue = totalValue.toFixed(2);
          totalValue = Math.ceil(totalValue);

          OBJ.discountPercentage = totalValue;
          OBJ.IsSelected = false;

          OBJ.Index = i;
          i++;
          return OBJ;
        });
        // this.setState({ finalGetResults: userModules });
      } else {
        this.hideLoader();
        cogoToast.error("Something Went Wrong");
      }

      return this.state.finalGetResults;
    } else if (
      propsalType === "Ocean" &&
      this.state.selectedPickUPCountry.value === 202 &&
      this.state.selectedDropoffCountry.value === 89
    ) {
      if (this.state.checkTotalCFT === 0) {
        this.hideLoader();
        return cogoToast.error("CFT zero does not exits");
      }

      var PackageDetails = [];
      var newarray = [];
      newarray = this.state.PackageList.concat(TVDetails);

      PackageDetails = newarray
        .filter((feature) => feature.Status === "Active")
        .map((feature) => {
          return {
            PackageCFT: TotalCFT,
            PackageChargableWeight: parseInt(feature.ChargeableWeight),
            PackageHeight: feature.DimensionH.toString(),
            PackageInsuredValue: "0",
            PackageLength: feature.DimensionL.toString(),
            PackageNumber: feature.Quantity,
            PackageWeight: feature.ActualWeight.toString(),
            PackageWidth: feature.DimensionW.toString(),
          };
        });
      FinalGetRate.PackageNumber = PackageNumber;

      FinalGetRate.Weight = Weight;
      FinalGetRate.DimeL = DimeL;
      FinalGetRate.DimeW = DimeW;
      FinalGetRate.DimeH = DimeH;
      FinalGetRate.FromCity = UpsData.FromCity;
      FinalGetRate.FromZipCode = UpsData.FromZipCode;
      FinalGetRate.FromStateProvinceCode = UpsData.FromStateProvinceCode;
      FinalGetRate.FromCountry = UpsData.FromCountry;
      FinalGetRate.ToCountry = UpsData.ToCountry;
      FinalGetRate.ToCity = UpsData.ToCity;
      FinalGetRate.ToZipCode = UpsData.ToZipCode;
      FinalGetRate.ToStateProvinceCode = UpsData.ToStateProvinceCode;
      FinalGetRate.TotalLength = TotalLength;
      FinalGetRate.TotalWidth = TotalWidth;
      FinalGetRate.TotalInsuredValues = TotalInsuredValues;
      FinalGetRate.TotalHeight = TotalHeight;
      FinalGetRate.TotalWeight = TotalChargableWeight;
      FinalGetRate.TotalCFT =
        // this.state.pickUpValue === "FEDEX" ?
        TotalCFT;
      // : this.state.volumeAmount;
      FinalGetRate.ChargableWeight = ChargableWeight;
      FinalGetRate.InsuredValues = InsuredValues;
      FinalGetRate.ShipDate = moment().toDate();
      FinalGetRate.PackageDetails = PackageDetails;
      FinalGetRate.AgentCode = CommonConfig.loggedInUserData().PersonID;

      FinalGetRate.WeightCount = Weight.length;
      FinalGetRate.LengthCount = DimeL.length;
      FinalGetRate.WidthCount = DimeW.length;
      FinalGetRate.HeightCount = DimeH.length;

      FinalGetRate.PackCount = TotalPackageNumber.toString();
      FinalGetRate.PackageDetailsCount = TotalPackageNumber;
      FinalGetRate.PackageDetailsText = TotalPackageNumber.toString();
      FinalGetRate.PickUpType = this.state.pickUpValue;
      FinalGetRate.NoOfTV = this.state.NoOfTv;

      if (this.state.TotalInsuredValue) {
        FinalGetRate.Total = this.state.TotalInsuredValue.toString();
      }

      // if (this.state.TotalWeight) {
      //  FinalGetRate.TotalWeight = this.state.TotalChargableWeight;
      // }

      // var data = JSON.stringify(FinalGetRate);
      this.setState({ FinalGetRate: FinalGetRate });
      this.setState({
        PickupOpenPopup: true,
      });
    } else {
      this.hideLoader();
      return cogoToast.error("Rates are not Avalible");
    }
  }
  sendGetRateEmail = (rateArr) => {
    try {
      api.post("getQuote/GetRateImages").then((res) => {
        if (res.data) {
          let imgArr = res.data[0];
          rateArr.map((rate) => {
            let imgURL = imgArr.filter(
              (x) => x.MainServiceName === rate.MainServiceName
            );
            rate.urlIMG = imgURL[0] ? imgURL[0]["IMGURL"] : "";
          });
          this.setState({
            rateArr: rateArr,
            finalGetResults: rateArr,
            Ratesendmailopen: true,
          });
        }
      });
    } catch (err) {}
  };
  // sendRateEmail = () => {
  //   debugger;
  //   // this[this.props.steps[this.state.currentStep].stepId].
  //   this.sendGetRateEmail(this.state.finalGetResults);
  // };

  managedBy = () => {
    try {
      api
        .get("salesLead/getManageSalesLeadUser")
        .then((result) => {
          if (result.success) {
            this.setState({ managedby: result.Data });
          } else {
            cogoToast.error("Something went wrong1");
          }
        })
        .catch((error) => {
          console.log("error....", error);

          cogoToast.error("Something went wrong2");
        });
    } catch (err) {
      cogoToast.error("Something Went Wrong3");
    }
  };

  handleOnChange = (event, type) => {
    if (type === "emailaddress") {
      this.setState({ emailaddressCheck: true });
      this.setState({
        EmailAddress: event.target.value,
        emailaddressErr: false,
        emailaddressHelperText: "",
      });
      
    } 
    
   else if (type === "trackingNumber") {
      this.setState({ emailaddressCheck: true });
      this.setState({
        trackingNumber: event.target.value,
        trackingNumberErr: false,
        trackingNumberCheck: false,
        trackingNumberHelperText: "",
      });
    } 
    
    else if (type === "newemailaddress") {
      this.setState({ emailaddressCheck: true });
      // if (event.target.value === "") {
      //   this.setState({
      //     NewEmailAddress: this.state.EmailAddress,
      //     emailaddressErr: false,
      //     emailaddressHelperText: "",
      //   });
      // } else {
      this.setState({
        NewEmailAddress: event.target.value,
        emailaddressErr: false,
        emailaddressHelperText: "",
      });
      // }
    } else if (type === "phone") {
      this.setState({ phoneCheck: true });
      if (event.target.value.length <= 15) {
        this.setState({
          Phone: event.target.value,
          phoneErr: false,
          phoneHelperText: "",
        });
      }
    }
  };

  FromCountry = async (value) => {
    this.setState({
      selectedPickUPCountry: value,
      PickupCity: "",
      PickupCityZip: "",
      PickupState: "",
    });
    let res = await this.getState(value);
console.log("ressssssssssssssssss",res);
if(res!=undefined)   
if (res.success) {
      this.setState({
        fromStateList: res.data,
        fromStateAutoComplete: res.data.length ? true : false,
        pickupcountryHelperText: "",
      });
      res.data.length
        ? this.setState({
            pickupcityzipHelperText: "please enter zipcode",
            pickupcityHelperText: "",
          })
        : this.setState({
            pickupcityHelperText: "please enter city",
            pickupcityzipHelperText: "",
          });
    }
  };

  ToCountry = async (value) => {
    this.setState({
      selectedDropoffCountry: value,
      DropoffCityZip: "",
      DropoffCity: "",
      DropoffState: "",
    });

    let res = await this.getState(value);
   if(res!=undefined)
    if (res.success) {
      this.setState({
        toStateList: res.data,
        toStateAutoComplete: res.data.length ? true : false,
        dropoffcountryHelperText: "",
      });
      res.data.length
        ? this.setState({
            DropoffCityZipHelperText: "please enter zipcode",
            dropoffcityHelperText: "",
          })
        : this.setState({
            dropoffcityHelperText: "please enter city",
            DropoffCityZipHelperText: "",
          });
    }
  };

  getReferredSite = () => {
    api.get("contactus/spGetSalesLeadReff", {}).then((res) => {
      var getSiteData = res.data.map((item) => ({
        id: item.SalesLeadReffID,
        label: item.Refference,
        Status: item.Status,
      }));
      this.setState({
        referredby: getSiteData,
      });
    });
  };

  requestChange(event, value, type) {
    if (type === "requeststatus") {
      this.setState({ selectedRequestStatus: value });
    } else if (type === "managedby") {
      this.setState({ selectedWorkingOnRequest: value });
      this.setState({
        managedbyErr: false,
        managedbyHelperText: "",
      });
      
    }else if(type === "CountryCode"){
      debugger
      this.setState({ SelectedCountryCode: value });

    }
     else if (type === "proposaltype") {
      this.setState({ ProposalType: value.props.value });
    } else if (type === "proposalstatus") {
      this.setState({
        CancelationReason:"",
        trackingNumber:"",
      })
      this.setState({
        ProposalStatus: value,
        proposalstatusHelperText: "",
        proposalstatusErr: false,
        CancelationReasonErr: false,
        CancelationReasonHelperText: "",
      });
      debugger
      
    } else if (type === "deliverytype") {
      this.setState({ DeliveryType: value });
    } else if (type === "pickupcity") {
      this.setState({ PickupCity: value });
    } else if (type === "dropoffcity") {
      this.setState({ DropoffCity: value });
    } else if (type === "dropoffstate") {
      this.setState({ DropoffState: value });
    } else if (type === "pickupstate") {
      this.setState({ PickupState: value });
    } else if (type === "referredby") {
      debugger
      this.setState({ ReferredBy: value });
    } else if (type === "CancelationReason") {
      this.setState({
        CancelationReason: value,
        CancelationReasonErr: false,
        CancelationReasonHelperText: "",
      });
    }
  }

  handlechange = (event, type) => {
    if (type === "managedby") {
      let managedbyVal = event.target.value;
      if (CommonConfig.isEmpty(managedbyVal)) {
        this.setState({
          Managedby: managedbyVal,
          managedbyErr: true,
          managedbyHelperText: "Please enter Managed By",
        });
      } else {
        this.setState({
          Managedby: managedbyVal,
          managedbyErr: false,
          managedbyHelperText: "",
        });
      }
    } else if (type === "contactname") {
      this.setState({ contactnameCheck: true });
      let contactnameValold = event.target.value;
      let contactnameVal = contactnameValold;
      if (CommonConfig.isEmpty(contactnameVal)) {
        this.setState({
          ContactName: contactnameVal,
          contactnameErr: true,
          contactnameHelperText: "Please enter contact name",
        });
      } else {
        this.setState({
          ContactName: contactnameVal,
          contactnameErr: false,
          contactnameHelperText: "",
        });
      }
    } else if(type == "trackingNumber"){
      this.setState({ trackingNumberCheck: true });
      let contactnameValold = event.target.value;
      let contactnameVal = contactnameValold;
      if (CommonConfig.isEmpty(contactnameVal)) {
        this.setState({
          trackingNumber: contactnameVal,
          trackingNumberErr: true,
          trackingNumberHelperText: "Please enter tracking number",
        });
      } else {
        this.setState({
          trackingNumber: contactnameVal,
          trackingNumberErr: false,
          trackingNumberHelperText: "",
        });
      }
    }
    
    
    else if (type === "emailaddress") {
      this.setState({ emailaddressCheck: true });
      let emailaddressVal = event.target.value;
      if (CommonConfig.isEmpty(emailaddressVal)) {
        this.setState({
          EmailAddress: emailaddressVal,
          emailaddressErr: true,
          emailaddressHelperText: "Please enter email address",
        });
      } else if (!emailaddressVal.match(CommonConfig.RegExp.email)) {
        this.setState({
          EmailAddress: emailaddressVal,
          emailaddressErr: true,
          emailaddressHelperText: "Please enter valid emailaddress",
        });
      } else {
        this.setState({
          EmailAddress: emailaddressVal,
          emailaddressErr: false,
          emailaddressHelperText: "",
        });
      }
    } else if (type === "phone") {
      this.setState({ phoneCheck: true });
      let regExp = /^[0-9]{10,15}$/;
      let phoneVal = event.target.value;
      if (CommonConfig.isEmpty(phoneVal)) {
        this.setState({
          Phone: phoneVal,
          phoneErr: true,
          phoneHelperText: "Please enter phone",
        });
      } else if (phoneVal.trim() !== phoneVal || !phoneVal.match(regExp)) {
        this.setState({
          Phone: phoneVal,
          phoneErr: true,
          phoneHelperText: "Please enter valid phone",
        });
      } else {
        this.setState({
          Phone: phoneVal,
          phoneErr: false,
          phoneHelperText: "",
        });
      }
    } else if (type === "pickupcountry") {
      let pickupcountryVal = event.target.value;
      if (CommonConfig.isEmpty(pickupcountryVal)) {
        this.setState({
          PickupCountry: pickupcountryVal,
          PickupCityZipErr: true,
          PickupCityZipHelperText: "Please enter pickupcountry",
        });
      } else {
        this.setState({
          PickupCountry: pickupcountryVal,
          PickupCityZipErr: false,
          PickupCityZipHelperText: "",
        });
      }
    } else if (type === "pickupcity") {
      let pickupcityVal = event.target.value;
      if (CommonConfig.isEmpty(pickupcityVal)) {
        this.setState({
          PickupCity: pickupcityVal,
          pickupcityErr: true,
          pickupcityHelperText: "Please enter pickupcity",
        });
      } else {
        this.setState({
          PickupCity: pickupcityVal,
          pickupcityErr: false,
          pickupcityHelperText: "",
        });
      }
    } else if (type === "pickupcityzip") {
      let pickupcityzipVal = event.target.value;
      if (CommonConfig.isEmpty(pickupcityzipVal)) {
        this.setState({
          PickupCityZip: pickupcityzipVal,
          pickupcityzipErr: true,
          pickupcityzipHelperText: "Please enter pickup zip code",
        });
      } else {
        this.setState({
          PickupCityZip: pickupcityzipVal,
          pickupcityzipErr: false,
          pickupcityzipHelperText: "",
        });
      }
    } else if (type === "dropoffcityzip") {
      let dropoffcityval = event.target.value;
      if (CommonConfig.isEmpty(dropoffcityval)) {
        this.setState({
          DropoffCityZip: dropoffcityval,
          DropoffCityZipErr: true,
          DropoffCityZipHelperText: "Please enter dropoff zipcode",
        });
      } else {
        this.setState({
          DropoffCityZip: dropoffcityval,
          DropoffCityZipErr: false,
          DropoffCityZipHelperText: "",
        });
      }
    } else if (type === "pickupstate") {
      let pickupstateVal = event.target.value;
      if (CommonConfig.isEmpty(pickupstateVal)) {
        this.setState({
          PickupState: pickupstateVal,
          pickupstateErr: true,
          pickupstateHelperText: "Please enter pickup state",
        });
      } else {
        this.setState({
          PickupState: pickupstateVal,
          pickupstateErr: false,
          pickupstateHelperText: "",
        });
      }
    } else if (type === "dropoffcountry") {
      let dropoffcountryVal = event.target.value;
      if (CommonConfig.isEmpty(dropoffcountryVal)) {
        this.setState({
          DropoffCountry: dropoffcountryVal,
          dropoffcountryErr: true,
          dropoffcountryHelperText: "Please enter dropoff country",
        });
      } else {
        this.setState({
          DropoffCountry: dropoffcountryVal,
          dropoffcountryErr: false,
          dropoffcountryHelperText: "",
        });
      }
    } else if (type === "dropoffstate") {
      let dropoffstateVal = event.target.value;
      if (CommonConfig.isEmpty(dropoffstateVal)) {
        this.setState({
          DropoffState: dropoffstateVal,
          dropoffstateErr: true,
          dropoffstateHelperText: "Please enter dropoff state",
        });
      } else {
        this.setState({
          DropoffState: dropoffstateVal,
          dropoffstateErr: false,
          dropoffstateHelperText: "",
        });
      }
    } else if (type === "dropoffcity") {
      let dropoffcityVal = event.target.value;
      if (CommonConfig.isEmpty(dropoffcityVal)) {
        this.setState({
          DropoffCity: dropoffcityVal,
          dropoffcityErr: true,
          dropoffcityHelperText: "Please enter dropoff city",
        });
      } else {
        this.setState({
          DropoffCity: dropoffcityVal,
          dropoffcityErr: false,
          dropoffcityHelperText: "",
        });
      }
    } else if (type === "followupdate") {
      let followupdateVal = event.target.value;
      if (CommonConfig.isEmpty(followupdateVal)) {
        this.setState({
          FollowupDate: followupdateVal,
          followupdateErr: true,
          followupdateHelperText: "Please enter followupdate",
        });
      } else {
        this.setState({
          FollowupDate: followupdateVal,
          followupdateErr: false,
          followupdateHelperText: "",
        });
      }
    } else if (type === "tentativedate") {
      let tentativedateVal = event.target.value;
      if (CommonConfig.isEmpty(tentativedateVal)) {
        this.setState({
          TentativeDate: tentativedateVal,
          tentativedateErr: true,
          tentativedateHelperText: "Please enter tentative date",
        });
      } else {
        this.setState({
          TentativeDate: tentativedateVal,
          tentativedateErr: false,
          tentativedateHelperText: "",
        });
      }
    } else if (type === "referredby") {
      let referredbyVal = event.target.value;
      if (CommonConfig.isEmpty(referredbyVal)) {
        this.setState({
          ReferredBy: referredbyVal,
          referredbyErr: true,
          referredbyHelperText: "Please enter referredby",
        });
      } else {
        this.setState({
          ReferredBy: referredbyVal,
          referredbyErr: false,
          referredbyHelperText: "",
        });
      }
    } else if (type === "leadipaddress") {
      let leadipaddressVal = event.target.value;
      if (CommonConfig.isEmpty(leadipaddressVal)) {
        this.setState({
          LeadIPAddress: leadipaddressVal,
          leadipaddressErr: true,
          leadipaddressHelperText: "Please enter lead ip address",
        });
      } else {
        this.setState({
          LeadIPAddress: leadipaddressVal,
          leadipaddressErr: false,
          leadipaddressHelperText: "",
        });
      }
    } else if (type === "deliverytype") {
      let deliverytypeVal = event.target.value;
      if (CommonConfig.isEmpty(deliverytypeVal)) {
        this.setState({
          DeliveryType: deliverytypeVal,
          deliverytypeErr: true,
          deliverytypeHelperText: "Please enter delivery type",
        });
      } else {
        this.setState({
          DeliveryType: deliverytypeVal,
          deliverytypeErr: false,
          deliverytypeHelperText: "",
        });
      }
    } else if (type === "comments") {
      let commentsVal = event.target.value;
      if (CommonConfig.isEmpty(commentsVal)) {
        this.setState({
          Comments: commentsVal,
          commentsErr: true,
          commentsHelperText: "Please enter comments",
        });
      } else {
        this.setState({
          Comments: commentsVal,
          commentsErr: false,
          commentsHelperText: "",
        });
      }
    }
  };
   GetCountryCode() {
    try {
       api
        .get("contactus/getCountryCode")
        .then((res) => {
          if (res.success) {
            var CountryCode = res.data;
            this.state.tempCountryCodeList.push(res.data);
            this.setState({ countryCodeList: CountryCode });

            // --------------checkdata-----------this.state.CountryList
            let mainCountryList = [];
            this.setState({ countryCodeListValue: res.data });
            // for (var i = 0; i < CountryCode?.length; i++) {
            //   let mainCountryObject = {};
            //   mainCountryObject.label = CountryCode[i]?.phonecode;
            //   mainCountryObject.value = CountryCode[i]?.phonecode;
            //   mainCountryList.push(mainCountryObject);

            //   this.setState({ countryCodeListValue: mainCountryList });
              console.log("ccccccc", this.state.countryCodeListValue);
            // }
            // --------------checkdata-----------------
            
          }
        })
        .catch((err) => {
          console.log("err...", err);
        });
    } catch (error) {}
  }

  GetCountry = () => {
    try {
      this.showLoader();
      api
        .get("location/getCountryList")
        .then((res) => {
          if (res.success) {
            var Country = res.data;
            this.setState(
              {
                CountryList: Country,
              },
              function() {
                if (this.props.history.location.state.id !== "") {
                  this.getSalesLeadData();
                }
              }
            );
            this.hideLoader();
          }
        })
        .catch((err) => {
          console.log("error....", err);
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {
      cogoToast.error("Something Went Wrong");
    }
  };

  async componentDidMount() {
   // console.log("this.props.history.location.state.statusList = ",this.props.history.location.state.statusList)
    this.setState({
      fromEmailAddress: CommonConfig.loggedInUserData().Email,
      ReadAccess: CommonConfig.getUserAccess("Sales Lead").ReadAccess,
      WriteAccess: CommonConfig.getUserAccess("Sales Lead").WriteAccess,
      DeleteAccess: CommonConfig.getUserAccess("Sales Lead").DeleteAccess,
      GetRateAllAccess: CommonConfig.getUserAccess("Get Rates").AllAccess,
    });
    await this.GetCountry();
    await this.managedBy();
    await this.GetCountryCode();
    if (this.props.history.location.state.id !== "") {
      console.log("Welcome data = ",CommonConfig.getUserAccess("Sales Lead").AllAccess)
      if(CommonConfig.getUserAccess("Sales Lead").AllAccess == 1){

        console.log("Welcome data = ")

        this.state.managedbyDisabled = false

      }else{
        this.state.managedbyDisabled = true
      }
      await this.getCommunicationList();
    }
    this.getReferredSite();
    this.getCancellationReason();
    this.getClosedReason();
    //  await this.getSalesLeadData();
  }

  getClosedReason(){

    try {
      let data = {
        stringMapType: "Closed",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          this.setState({ closedReasonList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }

  }

  getCancellationReason() {
    try {
      let data = {
        stringMapType: "CancellationReason",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          this.setState({ cancelationReasonList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }
  reCallApi = async () => {
    if (this.props.history.location.state.id !== "") {
      await this.getCommunicationList();
      await this.getSalesLeadData();
    }
  };

  async getSalesLeadData() {debugger
    try {
      var data = {
        SalesLeadManagementID:
          this.props.history.location.state &&
          this.props.history.location.state.id
            ? this.props.history.location.state.id
            : null,
      };
      this.showLoader();

      let result = await api.post("salesLead/getSalesLeadDetailsById", data);
      if (result.data.success) {debugger

        var countryCode = {
          label: "1",
          value: "1",
        }

        if(result.data.data.CountryCallCode !=""){
          countryCode = {
            label: result.data.data.CountryCallCode,
            value: result.data.data.CountryCallCode,
          }
        }

        console.log("countryCode = ",countryCode)


        var pickupcountry = _.filter(this.state.CountryList, {
          CountryID: result.data.data.FromCountryID,
        });
        var dropoffcountry = _.filter(this.state.CountryList, {
          CountryID: result.data.data.ToCountryID,
        });
        let selectedPickUPCountry = {
          value: pickupcountry[0].CountryID,
          label: pickupcountry[0].CountryName,
        };

        let selectedDropoffCountry = {
          value: dropoffcountry[0].CountryID,
          label: dropoffcountry[0].CountryName,
        };
        let fromstateData = await this.getState(selectedPickUPCountry);

        let toStateData = await this.getState(selectedDropoffCountry);

        if (fromstateData.success) {
          this.setState({
            fromStateList: fromstateData.data,
            fromStateAutoComplete: fromstateData.data.length ? true : false,
          });
        }

        if (toStateData.success) {
          this.setState({
            toStateList: toStateData.data,
            toStateAutoComplete: toStateData.data.length ? true : false,
          });
        }
        var managedBY = this.state.managedby.find(
          (x) => x.PersonID === result.data.data.ManagedBy
        );
        var toState = this.state.toStateList.find(
          (x) => x.StateName === result.data.data.ToState
        );
        var selectedManagedby = {};
        var selectedtoState = {};

        if (toState !== undefined && toState !== null) {
          selectedtoState = {
            value: toState.StateName,
            label: toState.StateName,
          };
        }

        var fromState = this.state.fromStateList.find(
          (x) => x.StateName === result.data.data.FromState
        );
        var selectedfromstate = {};

        if (fromState !== undefined && fromState !== null) {
          selectedfromstate = {
            value: fromState.StateName,
            label: fromState.StateName,
          };
        }

        if (managedBY !== undefined && managedBY !== null) {
          selectedManagedby = {
            value: managedBY.PersonID,
            label: managedBY.Name,
          };
        }

        debugger
        if(CommonConfig.getUserAccess("Sales Lead").AllAccess == 0){

          if(result.data.data.ManagedBy == 0){
            this.state.managedbyDisabled = false
          }else{
            this.state.managedbyDisabled = true
            if(result.data.data.ManagedBy == CommonConfig.loggedInUserData().PersonID){

            }else{
              cogoToast.error("You don't have access for this lead")
              // if (redirect) {
                localStorage.removeItem("SearchCount");

                this.props.history.push({
                  pathname: "/admin/SalesLeads",
                  state: {
                    filterlist:
                      this.props.history.location.state &&
                      this.props.history.location.state
                        .filterlist
                        ? this.props.history.location.state
                            .filterlist
                        : null,
                    sortlist:
                      this.props.history.location.state &&
                      this.props.history.location.state
                        .sortlist
                        ? this.props.history.location.state
                            .sortlist
                        : null,
                    packageValue:
                      this.props.history.location.state &&
                      this.props.history.location.state
                        .packageValue
                        ? this.props.history.location.state
                            .packageValue
                        : null,
                    statusfilter:
                      this.props.history.location.state &&
                      this.props.history.location.state
                        .statusfilter
                        ? this.props.history.location.state
                            .statusfilter
                        : null,
                  },
                });
              // }
            }
          }

          

        }else{
            this.state.managedbyDisabled = false
        }

        debugger;
        //jk
        if (
          result.data.data.CancelReason !== undefined &&
          result.data.data.CancelReason !== null && result.data.data.ProposalStatus == "Cancelled"
        ) {
          var closeddata = result.data.data.CancelReason;
          var cancelReason = this.state.cancelationReasonList.find(
            (x) => x.StringMapID == closeddata
          );
          var sortedReason = {
            value: cancelReason.Description,
            label: cancelReason.StringMapID,
          };
          this.setState({ CancelationReason: sortedReason });
        }

      
        

        else if (
          result.data.data.CancelReason !== undefined &&
          result.data.data.CancelReason !== null && result.data.data.CancelReason != "" && result.data.data.ProposalStatus == "Closed"
        ) {
          console.log("this.state.closedReasonList = " , this.state.closedReasonList);
          console.log("result.data.data.CancelReason " , result.data.data.CancelReason);
          debugger;
          var closeddata = result.data.data.CancelReason;
          var cancelReason = this.state.closedReasonList.find(
            (x) => x.StringMapID == closeddata
          );
          var sortedReason = {
            value: cancelReason.Description,
            label: cancelReason.StringMapID,
          };
          this.setState({ CancelationReason: sortedReason });
        }
        // if(CommonConfig.getUserAccess("Sales Lead").AllAccess == 0){
          
        //   if((selectedManagedby.value == CommonConfig.loggedInUserData().PersonID)){
            
        //   }
        // }
        console.log(result.data.data);
        var RefBy = this.state.referredby.filter(
          (x) => x.id == result.data.data.ReferredBy 
        );
        if(RefBy.length!=0){
        var selectedData = {
          value:RefBy[0].id,
          label:RefBy[0].label,

        }
      }
      else
      RefBy="";
        this.setState({
          newurl: result.data.data.newurl,
          ProposalType: result.data.data.SalesLeadsType,
          SalesLeadManagementID: result.data.data.SalesLeadManagementID,
          ProposalStatus: result.data.data.ProposalStatus,
          selectedWorkingOnRequest: selectedManagedby,
          previousManaged: selectedManagedby,
          SelectedCountryCode:countryCode,
          DeliveryType: result.data.data.DeliveryType,
          ContactName: result.data.data.ContactName,
          CompanyName: result.data.data.CompanyName,
          EmailAddress: result.data.data.Email,
          trackingNumber: result.data.data.trackingNumber,
          NewEmailAddress: result.data.data.Email,
          ContactNum: result.data.data.PhoneNumber,
          EmailAdd: result.data.data.Email,
          PhoneCount: result.data.data.PhoneCount,
          EmailCount: result.data.data.EmailCount,
          Phone: result.data.data.PhoneNumber,
          selectedPickUPCountry: selectedPickUPCountry,
          PickupCity: result.data.data.FromCity,
          PickupState: this.state.fromStateAutoComplete
            ? selectedfromstate
            : result.data.data.FromState,
          PickupCityZip: result.data.data.FromZipCode,
          DropoffCityZip: result.data.data.ToZipCode,
          selectedDropoffCountry: selectedDropoffCountry,
          DropoffState: this.state.toStateAutoComplete
            ? selectedtoState
            : result.data.data.ToState,
          DropoffCity: result.data.data.ToCity,
          LeadDate: CommonConfig.isEmpty(result.data.data.CreatedOn)
            ? moment().format("MM/DD/YYYY")
            : moment(result.data.data.CreatedOn).format("MM/DD/YYYY"),
          TentativeDate: moment(result.data.data.TentativeMoveDate).isValid()
            ? result.data.data.TentativeMoveDate
            : "",
          ReferredBy:RefBy==""?"":RefBy[0].label,
          LeadIPAddress: result.data.data.IPAddress,
          MACAddress: result.data.data.MACAddress,
          Comment: result.data.data.Comments,
          SelectedWeightType:
            result.data.data.PackageList.length > 0
              ? result.data.data.PackageList[0].WeightType
              : "",

          SelectedDimensitionType:
            result.data.data.PackageList.length > 0
              ? result.data.data.PackageList[0].WeightType === "KG"
                ? "CM"
                : "Inches"
              : "",
          CreatedOn: result.data.data.CreatedOn,
          UpdatedOn: result.data.data.UpdatedOn,
          Status: result.data.data.Status,
          StartDate: moment(result.data.data.SalesLeadFollowupDate).isValid()
            ? result.data.data.SalesLeadFollowupDate
            : "",
          EndDate: result.data.data.EndDate,
          NoteList: result.data.data.NoteList,
          ViewProposalList: result.data.data.ProposalList,
          ProposalLog: result.data.data.ProposalLog,
        });
        debugger;
        let packList = result.data.data.PackageList.filter(
          (x) =>
            x.PackageType === 1 || x.PackageType === 2 || x.PackageType === 3
        );
        let tvList = result.data.data.PackageList.filter(
          (x) => x.PackageType === 4
        );
        let carList = result.data.data.PackageList.filter(
          (x) => x.PackageType === 5
        );
        if (packList.length > 0) {
          var j = 1;
          packList.map((Obj) => {
            Obj.Index = j;
            j++;
            return Obj;
          });
          this.setState({
            IsPackageVisible: true,
          });
          this.state.newpackagetype.push("Package");
        }
        if (tvList.length > 0) {
          var j = 1;
          tvList.map((Obj) => {
            Obj.Index = j;
            j++;
            return Obj;
          });
          this.setState({
            IsTvVisible: true,
          });
          this.state.newpackagetype.push("TV");
        }
        if (carList.length > 0) {
          var j = 1;
          carList.map((Obj) => {
            Obj.Index = j;
            j++;
            return Obj;
          });
          this.setState({
            IsCarVisible: true,
          });
          this.state.newpackagetype.push("Car");
        }

        var PckgList = packList;
        for (var i = 0; i < PckgList.length; i++) {
          if (PckgList[i].PackageType === 2) {
            if (this.state.selectedPickUPCountry.value == 89) {
              PckgList[i].ActualWeight = 1;
              PckgList[i].Quantity = 1;
              PckgList[i].DimensionL = 26;
              PckgList[i].DimensionW = 34;
              PckgList[i].DimensionH = 3;
              PckgList[i].ChargeableWeight = 1;
              PckgList[i].CFT = 0.0;
            } else {
              PckgList[i].ActualWeight = 0.5;
              PckgList[i].Quantity = 1;
              PckgList[i].DimensionL = 10;
              PckgList[i].DimensionW = 13;
              PckgList[i].DimensionH = 1;
              PckgList[i].ChargeableWeight = 0.5;
              PckgList[i].CFT = 0.0;
            }
          }
        }
        this.setState({
          PackageList: PckgList,
          CarList: carList,
          TVList: tvList,
        });
        console.log("check..", this.state.PackageList);
        debugger;
        // if(PckgList.length === 0){
        //   this.handleAddRow();
        // }
        // if(carList.length === 0){
        //   this.addCarRow();
        // }
        // if(tvList.length === 0){
        //   this.addTVRow();
        // }
        this.Calculate();
        this.CalculateTv();
        if (result.data.data.NoteList.length > 0) {
          var k = 1;
          result.data.data.NoteList.map((Obj) => {
            Obj.Index = k;
            k++;
            return Obj;
          });
          var l = 1;
          result.data.data.NoteList.map((Obj) => {
            Obj.disabled = l;
            l++;
            return Obj;
          });
          this.setState({ notes: this.state.NoteList, notesDisabled: true });
          if (this.state.notes.length > 0) {
            this.setState({ notesShow: true });
          } else {
            this.setState({ notesShow: false });
          }

          this.handleAddNotesRow();
        } else {
          this.setState({ NoteList: [] });
          this.handleAddNotesRow();
        }
        this.hideLoader();
      } else {
        this.hideLoader();
        cogoToast.error("Something Went Wrong");
      }
    } catch (err) {
      console.log("error...", err);
      cogoToast.error("Something went wrong4");
    }
  }

  getCommunicationList() {
    try {
      let data = {
        EntityID:
          this.props.history.location.state &&
          this.props.history.location.state.id
            ? this.props.history.location.state.id
            : null,
        EntityType: "SalesLead",
      };
      api
        .post("scheduleshipment/getCommuncationDetail", data)
        .then((result) => {
          if (result.success) {
            this.setState({ CommuncationList: result.data });
          } else {
            this.hideLoader();
            cogoToast.error("Something went wrong5");
          }
        })
        .catch((err) => {
          console.log("error......", err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  async getState(countryData) {
    try {
      let data = {
        countryId: countryData.value,
      };

      let res = api.post("location/getStateList", data);

      return res;
    } catch (error) {}
  }

  handleZipChange = (event, type) => {
    if (type === "pickupcityzip") {
      
      var FinalCity = [];
      var Zipcode = event.target.value;
      var PickCountry = this.state.selectedPickUPCountry.value;
      var PickCountryName = this.state.selectedPickUPCountry.label;
      let citydata={
        "PostalCode" : Zipcode,
        "CountryID": PickCountry
      }
      api
      .post(
        "https://hubapi.sflworldwide.com/contactus/SflPostalCode",
        citydata
      )
      .then((res) => {
        if (res.success) {
          if (res.success === true) {
            var IsValidCountry = false;
           let data = res.Data.data;
           // this.hideLoador();
          //  this.CloseDialog();
          //  this.getReferredSite();
          let RecCount = data.length;
          if(RecCount !=0)
            {
           var countryShortName = data[0].Country
           if (this.state.selectedPickUPCountry.label === countryShortName) {
                     IsValidCountry = true;
                   }
                   if (IsValidCountry) {

                    
                   
                    for(let i=0;i<RecCount;i++)
                      FinalCity.push({
                      City_code: data[i].City,
                      CityName: data[i].City,
                    });
                    var state = data[0].State;
                    var SelectedState = { value: data[0].State, label: data[0].State };   
                    
                    if (FinalCity[0].CityName === "" ||FinalCity[0].CityName === null || FinalCity[0].CityName === undefined )
                       {
                                  this.setState({ PickupCityInput: true });
                                } else {
                                  this.setState({ PickupCityInput: false });
                                }
                                
                                this.setState({
                                              PickupCityList: FinalCity,
                                              PickupCity: FinalCity[0].CityName,
                                              PickupState: this.state.fromStateList.length
                                                ? SelectedState
                                                : state,
                                              fromStateAutoComplete: this.state.fromStateList.length
                                                ? true
                                                : false,
                                            });

                                          }
                                                              


                                      }
                                      else {

                               fetch(
                                      CommonConfig.zipCodeAPIKey(
                                        Zipcode,
                                        this.state.selectedPickUPCountry.label
                                      )
                                    )
                                      .then((result) => result.json())
                                      .then((data) => {debugger
                                        if (data["status"] === "OK") {
                                          var IsValidCountry = false;
                                          var countryShortName = _.filter(
                                            data["results"][0]["address_components"],
                                            function(data) {
                                              return data.types[0] === "country";
                                            }
                                          )[0].long_name;

                                          if (this.state.selectedPickUPCountry.label === countryShortName) {
                                            IsValidCountry = true;
                                          }
                                          if (IsValidCountry) {
                                            if (
                                              data["results"][0] &&
                                              data["results"][0].hasOwnProperty("postcode_localities")
                                            ) {
                                              // var CityData = data["results"][0]["postcode_localities"];
                                              // _.forEach(CityData, function(value, key) {
                                              //   FinalCity.push({
                                              //     City_code: value,
                                              //     CityName: value,
                                              //   });
                                              // });

                                              // var CityData = _.filter(
                                              //   data["results"][0]["address_components"],
                                              //   function(data) {
                                              //     return data.types[0] === "locality";
                                              //   }
                                              // )[0].long_name;

                                              // FinalCity.push({
                                              //   City_code: CityData,
                                              //   CityName: CityData,
                                              // });

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
                                                  CityName: CityData,
                                                });
                                              } else if (CityData2.length > 0) {
                                                CityData2 = CityData2[0].long_name;
                                                FinalCity.push({
                                                  City_code: CityData2,
                                                  CityName: CityData2,
                                                });
                                              } else if (CityData3.length > 0) {
                                                CityData3 = CityData3[0].long_name;
                                                FinalCity.push({
                                                  City_code: CityData3,
                                                  CityName: CityData3,
                                                });
                                              } else if (CityData4.length > 0) {
                                                CityData4 = CityData4[0].long_name;
                                                FinalCity.push({
                                                  City_code: CityData4,
                                                  CityName: CityData4,
                                                });
                                              }
                                              if(data["results"][0]["address_components"][0].long_name!=undefined)
                                              var state = _.filter(
                                                data["results"][0]["address_components"],
                                                function(data) {
                                                  return data.types[0] === "administrative_area_level_1";
                                                }
                                              )[0].long_name;

                                              var SelectedState = { value: state, label: state };

                                              if (
                                                FinalCity[0].CityName === "" ||
                                                FinalCity[0].CityName === null ||
                                                FinalCity[0].CityName === undefined
                                              ) {
                                                this.setState({ PickupCityInput: true });
                                              } else {
                                                this.setState({ PickupCityInput: false });
                                              }

                                              this.setState({
                                                PickupCityList: FinalCity,
                                                PickupCity: FinalCity[0].CityName,
                                                PickupState: this.state.fromStateList.length
                                                  ? SelectedState
                                                  : state,
                                                fromStateAutoComplete: this.state.fromStateList.length
                                                  ? true
                                                  : false,
                                              });
                                            } else if (data["results"][0]) {
                                              var city = "";

                                              if (
                                                city === "" &&
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
                                                city === "" &&
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
                                                city === "" &&
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
                                                city === "" &&
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
                                                  return data.types[0] === "administrative_area_level_1";
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
                                              } else if (city === "") {
                                                city = "";
                                              }
                                              if(data["results"][0]["address_components"][0].long_name!=undefined) 
                                              state = _.filter(
                                                data["results"][0]["address_components"],
                                                function(data) {
                                                  return data.types[0] === "administrative_area_level_1";
                                                }
                                              )[0].long_name;

                                              FinalCity.push({
                                                Citycode: city,
                                                CityName: city,
                                              });

                                              if (
                                                FinalCity[0].CityName === "" ||
                                                FinalCity[0].CityName === null ||
                                                FinalCity[0].CityName === undefined
                                              ) {
                                                this.setState({ PickupCityInput: true });
                                              } else {
                                                this.setState({ PickupCityInput: false });
                                              }

                                              var SelectedState = { value: state, label: state };

                                              this.setState({
                                                PickupState: this.state.fromStateList.length
                                                  ? SelectedState
                                                  : state,
                                                fromStateAutoComplete: this.state.fromStateList.length
                                                  ? true
                                                  : false,
                                                PickupCity: FinalCity[0].CityName,
                                                PickupCityList: FinalCity,
                                              });
                                            } else {
                                              this.setState({
                                                PickupCity: "",
                                                fromStateAutoComplete: this.state.fromStateList.length
                                                  ? true
                                                  : false,
                                                PickupCityInput: true,
                                                PickupState: "",
                                                PickupCityList: [],
                                              });
                                            }
                                          } else {
                                            this.setState({
                                              PickupCity: "",
                                              fromStateAutoComplete: this.state.fromStateList.length
                                                ? true
                                                : false,
                                              PickupState: "",
                                              PickupCityList: [],
                                              PickupCityInput: true,
                                            });
                                          }
                                          if(PickCountryName == "United States" ||PickCountryName == "India" ||PickCountryName == "Canada"  )
                                            {
                                              
                                              var newZipcodedata = {
                                              "Pincode" : Zipcode,
                                              "PickupCityList": this.state.PickupCity,
                                              "CountryID": PickCountry,
                                              "CountryName": PickCountryName,
                                              "StateName" : state,
                                              
                                            };
                                            console.log("newZipcodedata",newZipcodedata);
                                            api
                                            .post(
                                              "https://hubapi.sflworldwide.com/contactus/SflInsertPostalCode",
                                              newZipcodedata
                                            )
                                            .then((res) => {debugger
                                              if (res.success) {
                                                console.log("CheckRessData", res);
                                                if (res.success === true) {
                                                 
                                                  console.log("New Zipcode Enter Successfully");
                                                } else {
                                                  console.log("Something Went Wrong");
                                                }
                                              }
                                            })
                                            .catch((err) => {
                                                console.log("err...", err);
                                               
                                              });
                                          }

                                        } else {
                                          cogoToast.error("Zip code not found");
                                          this.setState({
                                            fromStateAutoComplete: this.state.fromStateList.length
                                              ? true
                                              : false,
                                            PickupCity: "",
                                            PickupState: "",
                                            PickupCityList: [],
                                            PickupCityInput: true,
                                          });
                                        }
                                      });
                                        
                               }
            
            
          } else {
            cogoToast.error("Something went wrong");
          }
        }
      })
      .catch((err) => {
          console.log("err...", err);
          cogoToast.error("Something Went Wrong");
        });
    
      
     
    } else if (type === "dropoffcityzip") {
     
        var zip = event.target.value;
        var finalCity = [];
    var DropCountry = this.state.selectedDropoffCountry.value;
    var DropCountryName = this.state.selectedDropoffCountry.label;
    let citydata={
      "PostalCode" : zip,
      "CountryID": DropCountry
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
         var countryShortName = data[0].Country
         if (this.state.selectedDropoffCountry.label === countryShortName) {
                   IsValidCountry = true;
                 }
                 if (IsValidCountry) {
                  for(let i=0;i<RecCount;i++)
                    finalCity.push({
                    City_code: data[i].City,
                    CityName: data[i].City,
                  });
                  var state = data[0].State;
                  var SelectedState = { value: data[0].State, label: data[0].State };   
                  
                  if (finalCity[0].CityName === "" ||finalCity[0].CityName === null || finalCity[0].CityName === undefined )
                    {
                      this.setState({ DropoffCityInput: true });
                    } else {
                      this.setState({ DropoffCityInput: false });
                    }
                              
                              this.setState({
                                            DropoffCityList: finalCity,
                                            DropoffCity: finalCity[0].CityName,
                                            DropoffState: this.state.fromStateList.length
                                              ? SelectedState
                                              : state,
                                            fromStateAutoComplete: this.state.fromStateList.length
                                              ? true
                                              : false,
                                          });
                                  this.setState({
                                    DropoffState: this.state.toStateList.length
                                      ? SelectedState
                                      : state,
                                    toStateAutoComplete: this.state.toStateList.length
                                      ? true
                                      : false,
                                    DropoffCityList: finalCity,
                                    DropoffCity: finalCity[0].CityName,
                                  });              
                                        }
                                                            


                                    }
                                    else {
                                       
                                        
                                        fetch(
                                          CommonConfig.zipCodeAPIKey(zip, this.state.selectedDropoffCountry.label)
                                        )
                                          .then((result) => result.json())
                                          .then((data) => {
                                            if (data["status"] === "OK") {
                                              var IsValidCountry = false;
                                              var countryShortName = _.filter(
                                                data["results"][0]["address_components"],
                                                function(data) {
                                                  return data.types[0] === "country";
                                                }
                                              )[0].long_name;

                                              if (this.state.selectedDropoffCountry.label === countryShortName) {
                                                IsValidCountry = true;
                                              }

                                              if (IsValidCountry) {
                                                if (
                                                  data["results"][0] &&
                                                  data["results"][0].hasOwnProperty("postcode_localities")
                                                ) {
                                                  // var CityData = data["results"][0]["postcode_localities"];
                                                  // _.forEach(CityData, function(value, key) {
                                                  //   finalCity.push({
                                                  // Citycode: value,
                                                  // CityName: value,
                                                  //   });
                                                  // });
                                                  var CityData = _.filter(
                                                    data["results"][0]["address_components"],
                                                    function(data) {
                                                      return data.types[0] === "locality";
                                                    }
                                                  )[0].long_name;

                                                  finalCity.push({
                                                    Citycode: CityData,
                                                    CityName: CityData,
                                                  });

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
                                                    finalCity.push({
                                                      Citycode: CityData,
                                                      CityName: CityData,
                                                    });
                                                  } else if (CityData2.length > 0) {
                                                    CityData2 = CityData2[0].long_name;
                                                    finalCity.push({
                                                      Citycode: CityData2,
                                                      CityName: CityData2,
                                                    });
                                                  } else if (CityData3.length > 0) {
                                                    CityData3 = CityData3[0].long_name;
                                                    finalCity.push({
                                                      Citycode: CityData3,
                                                      CityName: CityData3,
                                                    });
                                                  } else if (CityData4.length > 0) {
                                                    CityData4 = CityData4[0].long_name;
                                                    finalCity.push({
                                                      Citycode: CityData4,
                                                      CityName: CityData4,
                                                    });
                                                  }

                                                  var state = _.filter(
                                                    data["results"][0]["address_components"],
                                                    function(data) {
                                                      return data.types[0] === "administrative_area_level_1";
                                                    }
                                                  )[0].long_name;

                                                  var SelectedState = { value: state, label: state };

                                                  if (
                                                    finalCity[0].CityName === "" ||
                                                    finalCity[0].CityName === null ||
                                                    finalCity[0].CityName === undefined
                                                  ) {
                                                    this.setState({ DropoffCityInput: true });
                                                  } else {
                                                    this.setState({ DropoffCityInput: false });
                                                  }

                                                  this.setState({
                                                    DropoffState: this.state.toStateList.length
                                                      ? SelectedState
                                                      : state,
                                                    toStateAutoComplete: this.state.toStateList.length
                                                      ? true
                                                      : false,
                                                    DropoffCityList: finalCity,
                                                    DropoffCity: finalCity[0].CityName,
                                                  });
                                                } else if (data["results"][0]) {
                                                  var city = "";

                                                  if (
                                                    city === "" &&
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
                                                    city === "" &&
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
                                                    city === "" &&
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
                                                    city === "" &&
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
                                                  } else if (city === "") {
                                                    city = "";
                                                  }

                                                  state = _.filter(
                                                    data["results"][0]["address_components"],
                                                    function(data) {
                                                      return data.types[0] === "administrative_area_level_1";
                                                    }
                                                  )[0].long_name;

                                                  finalCity.push({
                                                    Citycode: city,
                                                    CityName: city,
                                                  });

                                                  if (
                                                    finalCity[0].CityName === "" ||
                                                    finalCity[0].CityName === null ||
                                                    finalCity[0].CityName === undefined
                                                  ) {
                                                    this.setState({ DropoffCityInput: true });
                                                  } else {
                                                    this.setState({ DropoffCityInput: false });
                                                  }

                                                  var SelectedState = { value: state, label: state };

                                                  this.setState({
                                                    DropoffState: this.state.toStateList.length
                                                      ? SelectedState
                                                      : state,
                                                    toStateAutoComplete: this.state.toStateList.length
                                                      ? true
                                                      : false,
                                                    DropoffCity: finalCity[0].CityName,
                                                    DropoffCityList: finalCity,
                                                  });
                                                } else {
                                                  this.setState({
                                                    DropoffCity: "",
                                                    DropoffState: "",
                                                    DropoffCityList: [],
                                                    DropoffCityInput: true,
                                                    toStateAutoComplete: this.state.toStateList.length
                                                      ? true
                                                      : false,
                                                  });
                                                }
                                              } else {
                                                this.setState({
                                                  DropoffCity: "",
                                                  toStateAutoComplete: this.state.toStateList.length
                                                    ? true
                                                    : false,
                                                  DropoffState: "",
                                                  DropoffCityList: [],
                                                  DropoffCityInput: true,
                                                });
                                              }
                                              if(DropCountryName == "United States" ||DropCountryName == "India" ||DropCountryName == "Canada"  )
                                                {
                                                  
                                                  var newZipcodedata = {
                                                  "Pincode" : zip,
                                                  "PickupCityList": this.state.DropoffCity,
                                                  "CountryID": DropCountry,
                                                  "CountryName": DropCountryName,
                                                  "StateName" : state,
                                                  
                                                };
                                                console.log("newZipcodedata",newZipcodedata);
                                                api
                                                .post(
                                                  "https://hubapi.sflworldwide.com/contactus/SflInsertPostalCode",
                                                  newZipcodedata
                                                )
                                                .then((res) => {debugger
                                                  if (res.success) {
                                                    console.log("CheckRessData", res);
                                                    if (res.success === true) {
                                                     
                                                      console.log("New Zipcode Enter Successfully");
                                                    } else {
                                                      console.log("Something Went Wrong");
                                                    }
                                                  }
                                                })
                                                .catch((err) => {
                                                    console.log("err...", err);
                                                   
                                                  });
                                              }
                                            } else {
                                              cogoToast.error("Zip code not found");
                                              this.setState({
                                                DropoffCityInput: true,
                                                DropoffCityList: [],
                                                toStateAutoComplete: this.state.toStateList.length ? true : false,
                                                DropoffCity: "",
                                                DropoffState: "",
                                              });
                                            }
                                          });
                                      }
                                     
          
          
        } else {
          cogoToast.error("Something went wrong");
        }
      }
    })
    .catch((err) => {
        console.log("err...", err);
        cogoToast.error("Something Went Wrong");
      });
  
    
    
}
   
  };

  handleAddRow = () => {
    const row = {
      Quantity: 0,
      ActualWeight: 0,
      DimensionL: 0,
      DimensionW: 0,
      DimensionH: 0,
      PackageType: 0,
      Status: "Active",
      SalesLeadPackageDetailID: null,
      SalesLeadManagementID: this.state.SalesLeadManagementID,
      ChargeableWeight: 0,
      CFT: 0,
      CreatedBy: null,
      UpdatedBy: null,
      CreatedOn: null,
      UpdatedOn: null,
      Index: this.state.PackageList.length + 1,
    };
    this.setState({ PackageList: [...this.state.PackageList, row] });
  };

  addCarRow = () => {
    const row = {
      Quantity: 1,
      ActualWeight: 0,
      DimensionL: 0,
      DimensionW: 0,
      DimensionH: 0,
      PackageType: 5,
      Status: "Active",
      SalesLeadPackageDetailID: null,
      SalesLeadManagementID: this.state.SalesLeadManagementID,
      ChargeableWeight: 0,
      CFT: 0,
      CarMake: "",
      CarModel: "",
      CarYear: "",
      CreatedBy: null,
      UpdatedBy: null,
      CreatedOn: null,
      UpdatedOn: null,
      Index: this.state.CarList.length + 1,
    };
    this.setState({ CarList: [...this.state.CarList, row] });
  };

  addTVRow = () => {
    this.setState({ NoOfTv: this.state.NoOfTv + 1 });
    const row = {
      Quantity: 0,
      ActualWeight: 0,
      DimensionL: 0,
      DimensionW: 0,
      DimensionH: 0,
      PackageType: 4,
      Status: "Active",
      SalesLeadPackageDetailID: null,
      SalesLeadManagementID: this.state.SalesLeadManagementID,
      ChargeableWeight: 0,
      CFT: 0,
      CarMake: "",
      TVMake: "",
      TVModel: "",
      CarModel: "",
      CarYear: "",
      CreatedBy: null,
      UpdatedBy: null,
      CreatedOn: null,
      UpdatedOn: null,
      Index: this.state.TVList.length + 1,
    };
    this.setState({ TVList: [...this.state.TVList, row] });
  };
  CalculateTv = () => {
    var TotalChargeWeight = 0;
    var TotalCFT = 0;
    var TotalWeight = 0;
    var TotalChargable = 0;

    var TVList = [...this.state.TVList];
    for (var i = 0; i < TVList.length; i++) {
      var WE = 0;
      var LE = 0;
      var HE = 0;
      var Total = 0;
      var Weight = 0;
      var CFT = 0;
      var Chargable = 0;

      if (TVList[i].ActualWeight) {
        Weight = TVList[i].ActualWeight * 1;
      }

      if (TVList[i].DimensionW) {
        // WE = TVList[i].DimensionW;

        if (this.state.SelectedWeightType == "KG") {
          WE = Math.ceil(parseFloat(TVList[i].DimensionW * 0.393701));
        } else {
          // HE = TVList[i].DimensionH;
          WE = TVList[i].DimensionW;
        }
      }

      if (TVList[i].DimensionL) {
        if (this.state.SelectedWeightType == "KG") {
          LE = Math.ceil(parseFloat(TVList[i].DimensionL * 0.393701));
        } else {
          // HE = TVList[i].DimensionH;
          LE = TVList[i].DimensionL;
        }
      }

      if (TVList[i].DimensionH) {
        if (this.state.SelectedWeightType == "KG") {
          HE = Math.ceil(parseFloat(TVList[i].DimensionH * 0.393701));
        } else {
          HE = TVList[i].DimensionH;
        }
      }

      if (this.state.SelectedWeightType == "KG") {
        Total = Math.ceil(parseFloat((WE * LE * HE) / 5000)) * 1;
      } else {
        Total = Math.ceil(parseFloat((WE * LE * HE) / 139)) * 1;
      }

      if (Weight > Total) {
        TVList[i].ChargeableWeight = Weight;
        TotalChargeWeight = parseInt(TotalChargeWeight) + parseInt(Weight);
      } else {
        TVList[i].ChargeableWeight = Total;
        TotalChargeWeight = parseInt(TotalChargeWeight) + parseInt(Total);
      }

      if (TVList[i].ChargeableWeight) {
        Chargable = TVList[i].ChargeableWeight;
      }
      CFT = Math.ceil(parseFloat((WE * LE * HE) / 1728) * 1);
      TVList[i].CFT = CFT;
      TotalWeight = TotalWeight + Weight;
      TotalCFT = TotalCFT + CFT;
      TotalChargable = TotalChargable + Chargable;
    }
    this.setState({ TVList: TVList });
    //}
  };
  Calculate = () => {
    // if (
    //   this.state.selectedPickUPCountry.value &&
    //   this.state.selectedDropoffCountry.value
    // ) {
    var TotalChargeWeight = 0;
    var TotalCFT = 0;
    var TotalWeight = 0;
    var TotalChargable = 0;
    this.state.checkTotalChWeight = 0;
    this.state.checkTotalCFT = 0;
    var PackageList = [...this.state.PackageList];
    for (var i = 0; i < PackageList.length; i++) {
      var WE = 0;
      var LE = 0;
      var HE = 0;
      var Total = 0;
      var Weight = 0;
      var CFT = 0;
      var Chargable = 0;

      if (PackageList[i].ActualWeight) {
        Weight = PackageList[i].ActualWeight * PackageList[i].Quantity;
      }

      // if (PackageList[i].DimensionW) {
      //   // WE = PackageList[i].DimensionW;

      //   if (this.state.SelectedWeightType == "KG") {
      //     WE = Math.ceil(parseFloat(PackageList[i].DimensionW * 0.393701));
      //   } else {
      //     // HE = PackageList[i].DimensionH;
      //     WE = PackageList[i].DimensionW;
      //   }
      // }

      // if (PackageList[i].DimensionL) {
      //   if (this.state.SelectedWeightType == "KG") {
      //     LE = Math.ceil(parseFloat(PackageList[i].DimensionL * 0.393701));
      //   } else {
      //     // HE = PackageList[i].DimensionH;
      //     LE = PackageList[i].DimensionL;
      //   }
      // }

      // if (PackageList[i].DimensionH) {
      //   if (this.state.SelectedWeightType == "KG") {
      //     HE = Math.ceil(parseFloat(PackageList[i].DimensionH * 0.393701));
      //   } else {
      //     HE = PackageList[i].DimensionH;
      //   }
      // }
      WE = PackageList[i].DimensionW;
      LE = PackageList[i].DimensionL;
      HE = PackageList[i].DimensionH;

      if (this.state.SelectedWeightType == "KG") {
        Total =
          Math.ceil(parseFloat((WE * LE * HE) / 5000)) *
          PackageList[i].Quantity;
      } else {
        Total =
          Math.ceil(parseFloat((WE * LE * HE) / 139)) * PackageList[i].Quantity;
      }
      debugger;
      if (Weight > Total) {
        PackageList[i].ChargeableWeight = Weight;
        TotalChargeWeight = parseInt(TotalChargeWeight) + parseInt(Weight);
      } else {
        PackageList[i].ChargeableWeight = Total;
        TotalChargeWeight = parseInt(TotalChargeWeight) + parseInt(Total);
      }

      if (PackageList[i].ChargeableWeight) {
        Chargable = PackageList[i].ChargeableWeight;
      }
      CFT = Math.ceil(
        parseFloat((WE * LE * HE) / 1728) * PackageList[i].Quantity
      );
      PackageList[i].CFT = CFT;
      TotalWeight = TotalWeight + Weight;
      TotalCFT = TotalCFT + CFT;
      TotalChargable = TotalChargable + Chargable;
    }
    this.state.checkTotalChWeight = TotalChargeWeight;
    this.state.checkTotalCFT = TotalCFT;
    this.setState({
      PackageList: PackageList,
    });
    //}
  };

  handleChangePackage = (idx) => (event) => {
    const { name, value } = event.target;
    const PackageList = [...this.state.PackageList];
    let index = PackageList.findIndex((x) => x.Index === idx);
    PackageList[index][name] = value.replace(/\D/, "");
    this.setState({ PackageList: PackageList });

    if (
      this.state.PackageList[0].Quantity !== "" ||
      this.state.PackageList[0].Quantity !== "0" ||
      this.state.PackageList[0].Quantity !== 0
    ) {
      this.setState({
        AquantityErr: false,
        AquantityErrText: "",
      });
    }
    if (
      this.state.PackageList[0].ActualWeight !== "" ||
      this.state.PackageList[0].ActualWeight !== "0" ||
      this.state.PackageList[0].ActualWeight !== 0
    ) {
      this.setState({
        AWeightErr: false,
        AWeightErrText: "",
      });
    }

    this.Calculate();
  };

  handleCarChange = (idx) => (event) => {
    const { name, value } = event.target;
    const CarList = [...this.state.CarList];
    let index = CarList.findIndex((x) => x.Index === idx);
    CarList[index][name] = value;
    this.setState({ CarList: CarList });
    if (this.state.CarList[0].CarMake !== "") {
      this.setState({ CarmakeErrText: "" });
    }
    if (this.state.CarList[0].CarModel !== "") {
      this.setState({ CarmodelErrText: "" });
    }
    if (this.state.CarList[0].CarYear !== "") {
      this.setState({ CaryearErrText: "" });
    }
    if (name === "CarYear") {
      let Phone1 = event.target.value.replace(/\D/g, "");
      if (Phone1.length <= 4) {
        this.state.CarList[0].CarYear = Phone1;
      }
    }
  };

  handleTVChange = (idx) => (event) => {
    const { name, value } = event.target;
    const TVList = [...this.state.TVList];
    let index = TVList.findIndex((x) => x.Index === idx);
    TVList[index][name] = value;
    this.setState({ TVList: TVList });
    if (this.state.TVList[0].TVMake !== "") {
      this.setState({ TvmakeErrText: "" });
    }
    if (this.state.TVList[0].TVModel !== "") {
      this.setState({ TvmodelErrText: "" });
    }
    if (this.state.TVList[0].ActualWeight !== 0) {
      this.setState({ TvAweightErrText: "" });
    }
    this.CalculateTv();
  };

  handleChangePackagecontent = (idx) => (event) => {
    const { value } = event.target;
    const PackageList = [...this.state.PackageList];
    let index = PackageList.findIndex((x) => x.Index === idx);
    PackageList[index]["PackageType"] = value;
    // if (value === 3) {
    //   this.setState({ furniture: this.state.furniture + 1 });
    // }
    if (value === 2) {
      if (this.state.selectedPickUPCountry.value == 89) {
        PackageList[index]["ActualWeight"] = 1;
        PackageList[index]["Quantity"] = 1;
        PackageList[index]["DimensionL"] = 26;
        PackageList[index]["DimensionW"] = 34;
        PackageList[index]["DimensionH"] = 3;
        PackageList[index]["ChargeableWeight"] = 1;
        PackageList[index]["CFT"] = 0.0;
        this.setState({ PackageList: PackageList });
      } else {
        PackageList[index]["ActualWeight"] = 0.5;
        PackageList[index]["Quantity"] = 1;
        PackageList[index]["DimensionL"] = 10;
        PackageList[index]["DimensionW"] = 13;
        PackageList[index]["DimensionH"] = 1;
        PackageList[index]["ChargeableWeight"] = 0.5;
        PackageList[index]["CFT"] = 0.0;
        this.setState({ PackageList: PackageList });
      }
    } else {
      PackageList[index]["ActualWeight"] = 0;
      PackageList[index]["DimensionL"] = 0;
      PackageList[index]["DimensionW"] = 0;
      PackageList[index]["DimensionH"] = 0;
      PackageList[index]["ChargeableWeight"] = 0;
      PackageList[index]["CFT"] = 0;
      this.setState({ PackageList: PackageList });
    }
  };
  //jsk
  handlePackageRemoveRow = (Index) => () => {
    const packageRemove = [...this.state.PackageList];
    var packageIndex = this.state.PackageList.findIndex(
      (x) => x.Index === Index
    );
    if (packageIndex !== -1) {
      packageRemove[packageIndex]["Status"] = "Inactive";
      // if (packageRemove[packageIndex]["PackageType"] === 3) {
      //   this.setState({ furniture: this.state.furniture - 1 });
      // }
      if (packageRemove.filter((x) => x.Status === "Active").length === 0) {
        this.setState({
          IsPackageVisible: false,
        });
        this.state.newpackagetype.pop("Package");
      }
      this.setState({ PackageList: packageRemove });
    }
  };

  removeCarRow = (Index) => () => {
    const packageRemove = [...this.state.CarList];
    var packageIndex = this.state.CarList.findIndex((x) => x.Index === Index);
    if (packageIndex !== -1) {
      packageRemove[packageIndex]["Status"] = "Inactive";
      if (packageRemove.filter((x) => x.Status === "Active").length === 0) {
        this.state.newpackagetype.pop("Car");
        this.setState({
          IsCarVisible: false,
        });
      }
      this.setState({ CarList: packageRemove });
    }
  };

  removeTVRow = (Index) => () => {
    this.setState({ NoOfTv: this.state.NoOfTv - 1 });
    const packageRemove = [...this.state.TVList];
    var packageIndex = this.state.TVList.findIndex((x) => x.Index === Index);
    if (packageIndex !== -1) {
      packageRemove[packageIndex]["Status"] = "Inactive";
      if (packageRemove.filter((x) => x.Status === "Active").length === 0) {
        this.setState({
          IsTvVisible: false,
        });
        this.state.newpackagetype.push("TV");
      }
      this.setState({ TVList: packageRemove });
    }
  };

  handleFiles = (event, Index) => {
    const { files } = event.target;
    var notes = [...this.state.notes];
    var noteIndex = notes.findIndex((x) => x.Index === Index);
    if (noteIndex !== -1 && files !== undefined && files.length > 0) {
      let dateNow = new Date().getTime();
      notes[noteIndex]["DateTime"] = dateNow;
      notes[noteIndex]["AttachmentName"] = files[0].name;
      notes[noteIndex]["AttachmentStatus"] = "Active";
      files[0]["Index"] = Index;
      var AttachmentIndex = this.state.Attachments.findIndex(
        (x) => x.Index === Index
      );
      if (AttachmentIndex !== -1) {
        this.state.Attachments.splice(AttachmentIndex, 1);
      }
      this.state.Attachments.push(files[0]);
    }
    this.setState({ notes: notes });
  };

  Packagecontent = () => {
    return this.state.packageType.map((content) => {
      return (
        <MenuItem
          classes={{ root: classes.selectMenuItem }}
          value={content.value}
        >
          {" "}
          {content.label}{" "}
        </MenuItem>
      );
    });
  };

  otherPackagecontent = () => {
    return this.state.otherPackageType.map((content) => {
      return (
        <MenuItem
          classes={{ root: classes.selectMenuItem }}
          value={content.value}
        >
          {" "}
          {content.label}{" "}
        </MenuItem>
      );
    });
  };

  Proposaltype = () => {
    return this.state.proposaltype.map((content) => {
      return (
        <MenuItem
          classes={{ root: classes.selectMenuItem }}
          value={content.value}
        >
          {" "}
          {content.label}{" "}
        </MenuItem>
      );
    });
  };

  ReferredbyOption = () => {
    return this.state.referredby.map((content) => {
      return (
        <MenuItem classes={{ root: classes.selectMenuItem }} value={content.id}>
          {" "}
          {content.label}{" "}
        </MenuItem>
      );
    });
  };
  // otherPackagecontent
  viewPackages = () => {
    return this.state.PackageList.filter((x) => x.Status === "Active").map(
      (packages, idx) => {
        return (
          <tr>
            <td>
              <input
                type="text"
                name="Quantity"
                value={packages.Quantity}
                onChange={this.handleChangePackage(packages.Index)}
                disabled={packages.PackageType === 2 ? true : false}
              />
              <span
                id="AquanitityErr"
                style={{ color: "red", fontSize: "12px" }}
              >
                {this.state.AquantityErrText}
              </span>
            </td>
            <td>
              <div className="table-select  wd-full">
                <FormControl className={classes.formControl} fullWidth>
                  <Select
                    id="package_number"
                    name="package_number"
                    className="form-control"
                    value={packages.PackageType}
                    onChange={this.handleChangePackagecontent(packages.Index)}
                    onFocus={() =>
                      this.setState({
                        packagetypeErr: false,
                        packagetypeErrText: "",
                      })
                    }
                  >
                    {this.Packagecontent()}
                  </Select>
                </FormControl>
                <span
                  id="packagetypeerr"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {this.state.packagetypeErrText}
                </span>
              </div>
            </td>

            <td>
              <input
                type={Text}
                name="ActualWeight"
                value={packages.ActualWeight}
                onChange={this.handleChangePackage(packages.Index)}
                disabled={packages.PackageType === 2 ? true : false}
              />
              <span id="AweightErr" style={{ color: "red", fontSize: "12px" }}>
                {this.state.AWeightErrText}
              </span>
            </td>
            <td>
              <input
                type={Text}
                name="DimensionL"
                value={packages.DimensionL}
                onChange={this.handleChangePackage(packages.Index)}
                disabled={packages.PackageType === 2 ? true : false}
              />
            </td>
            <td>
              <input
                type={Text}
                name="DimensionW"
                value={packages.DimensionW}
                onChange={this.handleChangePackage(packages.Index)}
                disabled={packages.PackageType === 2 ? true : false}
              />
            </td>
            <td>
              <input
                type={Text}
                name="DimensionH"
                value={packages.DimensionH}
                onChange={this.handleChangePackage(packages.Index)}
                disabled={packages.PackageType === 2 ? true : false}
              />
            </td>
            <td>
              <input
                type={Text}
                name="ChargeableWeight"
                value={packages.ChargeableWeight}
                onChange={this.handleChangePackage(packages.Index)}
                disabled={true}
              />
            </td>
            <td>
              <input
                type={Text}
                name="CFT"
                value={packages.CFT}
                onChange={this.handleChangePackage(packages.Index)}
                disabled={true}
              />
            </td>
            <td>
              <div className="pck-subbtn">
                {/* {idx !== 0 ? ( */}
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn "
                  onClick={this.handlePackageRemoveRow(packages.Index)}
                >
                  <i className={"fas fa-minus"} />
                </Button>
                {/* ) : null} */}
                {this.state.PackageList.filter((x) => x.Status === "Active")
                  .length ===
                idx + 1 ? (
                  <Button
                    justIcon
                    color="facebook"
                    onClick={() => this.handleAddRow()}
                    className="Plus-btn "
                  >
                    <i className={"fas fa-plus"} />
                  </Button>
                ) : null}
              </div>
            </td>
          </tr>
        );
      }
    );
  };
  createProposal = (type, Value) => {
    var tvTotalCFT = 0;
    if (type === "SecaucusTotal" || type === "HaywardTotal") {
      if (this.state.TVList.length > 0) {
        for (var i = 0; i < this.state.TVList.length; i++) {
          var tvTotalCFT = tvTotalCFT + this.state.TVList[i].CFT;
        }
      }
      var editproposal = {};
      editproposal = this.state.CreateProposal;
      //krutiiii

      this.state.CreateProposal.TotalCFT = this.state.FinalGetRate.TotalCFT;
      this.state.CreateProposal.ShippingCostperCFT = parseFloat(
        parseFloat(Value).toFixed(2) /
          parseFloat(this.state.CreateProposal.TotalCFT).toFixed(2)
      ).toFixed(2);
      this.state.CreateProposal.EstimatedShippingCost = parseFloat(
        parseFloat(this.state.CreateProposal.ShippingCostperCFT).toFixed(2) *
          parseFloat(this.state.CreateProposal.TotalCFT).toFixed(2)
      ).toFixed(2);
      this.state.CreateProposal.ServiceType = "D2D";
    }

    this.setState({
      propsalTabOpen: true,
      proposalclick: true,
    });
    api
      .get("salesLead/GetTermsList")
      .then((res) => {
        if (res.data) {
          var termslist = res.data;
          this.setState({
            TermsList: termslist,
            // TermsListInclude: termslist,
          });
          this.state.TermsListInclude = [];
          this.state.TermsListExclude = [];
          termslist
            .filter((x) => x.Action === "Include")
            .map((packages, idx) => {
              this.state.TermsListInclude.push(packages);
            });
          termslist
            .filter((x) => x.Action === "Exclude")
            .map((packages, idx) => {
              this.state.TermsListExclude.push(packages);
            });

          this.hideLoader();
        }
      })
      .catch((err) => {
        console.log("error....", err);
        cogoToast.error("Something Went Wrong");
      });
  };
  TermsAction = () => {
    return this.state.TermsAction.map((content) => {
      return (
        <MenuItem
          classes={{ root: classes.selectMenuItem }}
          value={content.value}
        >
          {" "}
          {content.label}{" "}
        </MenuItem>
      );
    });
  };
  ChargesDropdown = () => {
    return this.state.charges.map((content) => {
      return (
        <MenuItem
          classes={{ root: classes.selectMenuItem }}
          value={content.value}
        >
          {" "}
          {content.label}{" "}
        </MenuItem>
      );
    });
  };

  MinimumChargesDropdown = () => {
    return this.state.MinimumCharges.map((content) => {
      return (
        <MenuItem
          classes={{ root: classes.selectMenuItem }}
          value={content.value}
        >
          {" "}
          {content.label}{" "}
        </MenuItem>
      );
    });
  };

  serviceDropdown = () => {
    return this.state.servicelist.map((content) => {
      return (
        <MenuItem
          classes={{ root: classes.selectMenuItem }}
          value={content.value}
        >
          {" "}
          {content.label}{" "}
        </MenuItem>
      );
    });
  };

  handleChangeTermsAction = (event, Value, ID) => {
    var Termslist = this.state.TermsList;
    // var TermslistInclude = this.state.TermsListInclude;
    for (var i = 0; i < Termslist.length; i++) {
      if (Termslist[i].TermsID === ID) {
        Termslist[i].Action = event.target.value;
      }
    }
    this.setState({ TermsList: Termslist });
  };

  viewTerms = () => {
    // return this.state.TermsList.filter((x) => x.Action === "Include").map(
    return this.state.TermsListInclude.map((packages, idx) => {
      return (
        <tr>
          <td className="align-left">
            <Select
              id="Action"
              name="Action"
              className="form-control"
              value={packages.Action}
              onChange={(event) =>
                this.handleChangeTermsAction(event, packages, packages.TermsID)
              }
            >
              {this.TermsAction()}
            </Select>
          </td>
          <td className="textalign-left">
            <Tooltip title={packages.Terms}>
              <label>{packages.Terms}</label>
            </Tooltip>
          </td>
        </tr>
      );
    });
  };

  viewexcludeTerms = () => {
    //return this.state.TermsList.filter((x) => x.Action === "Exclude").map(
    return this.state.TermsListExclude.map((packages, idx) => {
      return (
        <tr>
          <td className="align-left">
            <Select
              id="Action"
              name="Action"
              className="form-control"
              value={packages.Action}
              onChange={(event) =>
                this.handleChangeTermsAction(event, packages, packages.TermsID)
              }
              // onFocus={() =>
              //   this.setState({
              //     packagetypeErr: false,
              //     packagetypeErrText: "",
              //   })
              // }
            >
              {this.TermsAction()}
            </Select>
          </td>
          <td className="textalign-left">
            <Tooltip title={packages.Terms}>
              <label>{packages.Terms}</label>
            </Tooltip>
          </td>
        </tr>
      );
    });
  };

  viewCarList = () => {
    return this.state.CarList.filter((x) => x.Status === "Active").map(
      (packages, idx) => {
        return (
          <tr>
            <td>
              <input
                type={Text}
                name="Quantity"
                value={packages.Quantity}
                onChange={this.handleCarChange(packages.Index)}
              />
            </td>
            <td colSpan={2}>
              <input
                type={Text}
                name="CarMake"
                value={packages.CarMake}
                onChange={this.handleCarChange(packages.Index)}
              />
              <span id="carmakeErr" style={{ color: "red", fontSize: "12px" }}>
                {this.state.CarmakeErrText}
              </span>
            </td>
            <td colSpan={3}>
              <input
                type={Text}
                name="CarModel"
                value={packages.CarModel}
                onChange={this.handleCarChange(packages.Index)}
              />

              <span id="carmodelErr" style={{ color: "red", fontSize: "12px" }}>
                {this.state.CarmodelErrText}
              </span>
            </td>

            <td colSpan={2}>
              <input
                type={Number}
                name="CarYear"
                max={4}
                value={packages.CarYear}
                onChange={this.handleCarChange(packages.Index)}
              />
              <span id="caryearErr" style={{ color: "red", fontSize: "12px" }}>
                {this.state.CaryearErrText}
              </span>
            </td>

            <td>
              <div className="pck-subbtn">
                {/* {idx !== 0 ? ( */}
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn "
                  onClick={this.removeCarRow(packages.Index)}
                >
                  <i className={"fas fa-minus"} />
                </Button>
                {/* ) : null} */}
                {this.state.CarList.filter((x) => x.Status === "Active")
                  .length ===
                idx + 1 ? (
                  <Button
                    justIcon
                    color="facebook"
                    onClick={() => this.addCarRow()}
                    className="Plus-btn "
                  >
                    <i className={"fas fa-plus"} />
                  </Button>
                ) : null}
              </div>
            </td>
          </tr>
        );
      }
    );
  };

  viewTVList = () => {
    return this.state.TVList.filter((x) => x.Status === "Active").map(
      (packages, idx) => {
        return (
          <tr>
            <td>
              <input
                type={Text}
                name="TVMake"
                value={packages.TVMake}
                onChange={this.handleTVChange(packages.Index)}
              />
              <span id="tvmakeErr" style={{ color: "red", fontSize: "12px" }}>
                {this.state.TvmakeErrText}
              </span>
            </td>
            <td>
              <input
                type={Text}
                name="TVModel"
                value={packages.TVModel}
                onChange={this.handleTVChange(packages.Index)}
              />
              <span id="tvmodelErr" style={{ color: "red", fontSize: "12px" }}>
                {this.state.TvmodelErrText}
              </span>
            </td>

            <td>
              <input
                type={Text}
                name="ActualWeight"
                value={packages.ActualWeight}
                onChange={this.handleTVChange(packages.Index)}
              />
              <span
                id="tvAweightErr"
                style={{ color: "red", fontSize: "12px" }}
              >
                {this.state.TvAweightErrText}
              </span>
            </td>
            <td>
              <input
                type={Text}
                name="DimensionL"
                value={packages.DimensionL}
                onChange={this.handleTVChange(packages.Index)}
              />
            </td>
            <td>
              <input
                type={Text}
                name="DimensionW"
                value={packages.DimensionW}
                onChange={this.handleTVChange(packages.Index)}
              />
            </td>
            <td>
              <input
                type={Text}
                name="DimensionH"
                value={packages.DimensionH}
                onChange={this.handleTVChange(packages.Index)}
              />
            </td>
            <td>
              <input
                type={Text}
                name="ChargeableWeight"
                value={packages.ChargeableWeight}
                onChange={this.handleTVChange(packages.Index)}
                disabled={true}
              />
            </td>
            <td>
              <input
                type={Text}
                name="CFT"
                value={packages.CFT}
                onChange={this.handleTVChange(packages.Index)}
                disabled={true}
              />
            </td>
            <td>
              <div className="pck-subbtn">
                {/* {idx !== 0 ? ( */}
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn "
                  onClick={this.removeTVRow(packages.Index)}
                >
                  <i className={"fas fa-minus"} />
                </Button>
                {/* ) : null} */}
                {this.state.TVList.filter((x) => x.Status === "Active")
                  .length ===
                idx + 1 ? (
                  <Button
                    justIcon
                    color="facebook"
                    onClick={() => this.addTVRow()}
                    className="Plus-btn "
                  >
                    <i className={"fas fa-plus"} />
                  </Button>
                ) : null}
              </div>
            </td>
          </tr>
        );
      }
    );
  };
  CancelProposal = () => {
    this.setState({ propsalTabOpen: false, proposalclick: false });
    this.state.CreateProposal = {
      TotalCFT: "",
      AdditionalCFT: "",
      PackingCharges: "",
      PickupCharges: "",
      ShippingCostperCFT: "",
      AdditionalCFTCharges: "",
      MinimumPackingCharges: "",
      MinimumPickupCharges: "",
      EstimatedShippingCost: parseFloat(0.0).toFixed(2),
      THCChargesperCFT: parseFloat(0.0).toFixed(2),
      ServiceType: "",
      PackingChargestype: "Per CFT",
      PickupChargestype: "Per CFT",
      PickupMinimumtype: "CFT",
      PackingMinimumtype: "CFT",
      ProposalComment: "",
    };
  };
  CreateAddProposal = () => {
    this.showLoader();
    var editproposal = {};
    editproposal = this.state.CreateProposal;

    this.state.CreateProposal.EstimatedShippingCost =
      editproposal.EstimatedShippingCost === ""
        ? parseFloat(0.0).toFixed(2)
        : parseFloat(editproposal.EstimatedShippingCost).toFixed(2);

    this.state.CreateProposal.ShippingCostperCFT =
      editproposal.ShippingCostperCFT === ""
        ? parseFloat(0.0).toFixed(2)
        : parseFloat(editproposal.ShippingCostperCFT).toFixed(2);

    this.state.CreateProposal.AdditionalCFTCharges =
      editproposal.AdditionalCFTCharges === ""
        ? parseFloat(0.0).toFixed(2)
        : parseFloat(editproposal.AdditionalCFTCharges).toFixed(2);
    if (
      editproposal.EstimatedShippingCost !== "0.00" &&
      editproposal.ServiceType !== "--Select--"
    ) {
      this.state.CreateProposal.THCChargesperCFT =
        editproposal.THCChargesperCFT === ""
          ? parseFloat(0.0).toFixed(2) + " " + "Per CFT"
          : editproposal.THCChargesperCFT + " " + "Per CFT";
      this.state.CreateProposal.PackingCharges =
        editproposal.PackingCharges === ""
          ? parseFloat(0.0).toFixed(2) + " " + editproposal.PackingChargestype
          : editproposal.PackingCharges + " " + editproposal.PackingChargestype;

      this.state.CreateProposal.MinimumPackingCharges =
        editproposal.MinimumPackingCharges === ""
          ? parseFloat(0.0).toFixed(2) + " " + editproposal.PackingMinimumtype
          : editproposal.MinimumPackingCharges +
            " " +
            editproposal.PackingMinimumtype;

      this.state.CreateProposal.PickupCharges =
        editproposal.PickupCharges === ""
          ? parseFloat(0.0).toFixed(2) + " " + editproposal.PickupChargestype
          : editproposal.PickupCharges + " " + editproposal.PickupChargestype;

      this.state.CreateProposal.MinimumPickupCharges =
        editproposal.MinimumPickupCharges === ""
          ? parseFloat(0.0).toFixed(2) + " " + editproposal.PickupMinimumtype
          : editproposal.MinimumPickupCharges +
            " " +
            editproposal.PickupMinimumtype;

      var inputData = {
        TermsList: this.state.TermsList,
        ...this.state.CreateProposal,
        SalesLeadID: this.state.SalesLeadManagementID,
        ContactName: this.state.ContactName,
        Email: this.state.EmailAddress,
        PhoneNumber: this.state.Phone,
        CreatedBy: CommonConfig.loggedInUserData().PersonID,
      };
      api
        .post("salesLead/CreateAddProposal", inputData)
        .then((res) => {
          if (res.success) {
            this.hideLoader();
            var list = {};
            var obj = [];
            list = res.message.data;
            list.AttachmentPath = res.message.AttachmentPath;
            //this.state.viewProposalList.push(list);
            var newdata = this.state.ViewProposalList;
            newdata.push(list);
            this.setState({
              ViewProposalList: newdata,
              propsalTabOpen: false,
            });
            this.state.CreateProposal = {
              TotalCFT: "",
              AdditionalCFT: "",
              PackingCharges: "",
              PickupCharges: "",
              ShippingCostperCFT: "",
              AdditionalCFTCharges: "",
              MinimumPackingCharges: "",
              MinimumPickupCharges: "",
              EstimatedShippingCost: parseFloat(0.0).toFixed(2),
              THCChargesperCFT: parseFloat(0.0).toFixed(2),
              ServiceType: "--Select--",
              PackingChargestype: "Per CFT",
              PickupChargestype: "Per CFT",
              PickupMinimumtype: "CFT",
              PackingMinimumtype: "CFT",
              ProposalComment: "",
            };
            cogoToast.success("Proposal create successfully");
          }
        })
        .catch((err) => {
          console.log("error....", err);
          this.hideLoader();
          cogoToast.error("Something Went Wrong");
        });
    } else if (
      editproposal.TotalCFT === "" ||
      editproposal.TotalCFT === "0.00" ||
      editproposal.TotalCFT === "0"
    ) {
      this.hideLoader();
      cogoToast.error("Please Enter Total CFT to create Proposal.");
    } else if (editproposal.ShippingCostperCFT === "0.00") {
      this.hideLoader();
      cogoToast.error("Please Enter Shipping Cost per CFT to create Proposal.");
    } else if (
      editproposal.ServiceType === "--Select--" ||
      editproposal.ServiceType === ""
    ) {
      this.hideLoader();
      cogoToast.error("Please select Service Type to create Proposal.");
    }
  };
  opendoc = (item) => {
    window.open(item, "_blank");
  };
  deleteProposalPopUp = (ProposalId) => {
    this.setState({
      deleteProposalPopUp: true,
      deleteproposalID: ProposalId,
    });
  };
  canceldeleteproposal = () => {
    this.setState({
      deleteProposalPopUp: false,
      deleteproposalID: "",
    });
  };
  deleteProposal = () => {
    var data = {
      ProposalId: this.state.deleteproposalID,
      SalesLeadID: this.state.SalesLeadManagementID,
    };
    this.hideLoader();
    api
      .post("salesLead/DeleteProposal", data)
      .then((res) => {
        //lkj
        if (res.success) {
          this.showLoader();
          this.setState({
            ViewProposalList: res.data,
            deleteProposalPopUp: false,
          });
          this.hideLoader();
          cogoToast.success("Proposal Delete successfully");
          //}
        }
      })
      .catch((err) => {
        console.log("error....", err);
        this.hideLoader();
        cogoToast.error("Something Went Wrong");
      });
  };
  viewProposalList = () => {
    return this.state.ViewProposalList.filter((x) => x.Status === "Active").map(
      (item, idx) => {
        return (
          <tr>
            <td>
              {momentTimezone(item.CreatedOn)
                .tz(CommonConfig.UStimezone)
                .format(CommonConfig.dateFormat.dateOnly)}
            </td>
            <td>{item.TotalCFT} CFT</td>
            <td>${item.ShippingCostPerCFT}</td>
            <td>${item.EstimatedShippingCost}</td>
            <td>${item.PackingCharges}</td>
            <td>${item.PickupCharges}</td>
            <td>
              {item.Log === 1 ? (
                <a
                  href="javascript:;"
                  onClick={() => this.viewProposalLog(item.ProposalID)}
                >
                  Viewed
                </a>
              ) : (
                <div>Not Viewed</div>
              )}
            </td>
            <td>
              {item.NewCreateBy
                ? item.NewCreateBy
                : CommonConfig.loggedInUserData().Name}
            </td>
            <td>
              <Tooltip title={"View"} arrow>
                <Button
                  className="Plus-btn info-icon"
                  justIcon
                  color="twitter"
                  onClick={() => this.opendoc(item.AttachmentPath + "/false")}
                >
                  <InfoIcon />
                </Button>
              </Tooltip>
              <Tooltip title={"Email"} arrow>
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn "
                  onClick={() => this.openpropsalEmailTab(item)}
                >
                  <i className={"fas fa-envelope"} />
                </Button>
              </Tooltip>
              <Tooltip title={"Delete"} arrow>
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn delete-icon"
                  onClick={() => this.deleteProposalPopUp(item.ProposalID)}
                >
                  <i className={"fas fa-trash"} />
                </Button>
              </Tooltip>
            </td>
          </tr>
        );
      }
    );
  };

  viewProposalLog = (item) => {
    var list = this.state.ProposalLog.filter((x) => x.ProposalID === item);
    this.setState({
      showProposallist: list,
    });
    this.setState({
      OpenproposalLog: true,
    });
  };
  proposalLoglist = () => {
    return this.state.showProposallist.map((item, idx) => {
      return (
        <tr>
          <td className="textalign-left">
            {moment(item.CreatedOn).format(CommonConfig.dateFormat.dateOnly)}
          </td>
          <td className="textalign-left">{item.Time}</td>
          <td className="textalign-left">{item.publicIpv4}</td>
          <td className="textalign-left">{item.Locations}</td>
        </tr>
      );
    });
  };
  openpropsalEmailTab = (item) => {
    this.setState({
      ProposalemailOPen: true,
      ProposalsendDoc: item.AttachmentPath,
      fromEmailAddress: item.Email,
    });
  };
  sendProposalEmail = () => {
    this.setState({ ProposalemailOPen: false });
    this.showLoader();
    var inputdata = {
      SalesLeadId: this.state.SalesLeadManagementID,
      toEmail: this.state.NewEmailAddress,
      fromEmail: this.state.fromEmailAddress
        ? this.state.fromEmailAddress
        : CommonConfig.loggedInUserData().Email,
      customername: this.state.ContactName,
      proposalLink: this.state.ProposalsendDoc,
    };
    api.post("salesLead/SendPropsalEmail", inputdata).then((res) => {
      if (res.success) {
        this.hideLoader();
        cogoToast.success("Mail Sent Successfully");
        this.getCommunicationList();
      } else {
        this.hideLoader();
        cogoToast.error("Something went wrong");
      }
    });
    this.setState({
      ProposalsendDoc: "",
    });
  };
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
      // cogoToast.error("Please fill above note first");
    }
  };

  handleChangeNotes = (event, idx) => {
    const { value } = event.target;
    const value1 = event.target.value;
    const notes = [...this.state.notes];
    var noteIndex = notes.findIndex((x) => x.Index === idx);
    if (noteIndex !== -1) {
      if(CommonConfig.RegExp.exceptCirilic.test(value1))
        {
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
    }
  };

  handleCancel = () => {
    localStorage.removeItem("SearchCount");
    this.props.history.push({
      pathname: "/admin/SalesLeads",
      state: {
        filterlist:
          this.props.history.location.state &&
          this.props.history.location.state.filterlist
            ? this.props.history.location.state.filterlist
            : null,
        sortlist:
          this.props.history.location.state &&
          this.props.history.location.state.sortlist
            ? this.props.history.location.state.sortlist
            : null,
        statusList:
          this.props.history.location.state &&
          this.props.history.location.state.statusList
            ? this.props.history.location.state.statusList
            : [
                { label: "New", value: "New" },
                { value: "Auto Quote", label: "Auto Quote" },
              ],
        packageValue:
          this.props.history.location.state &&
          this.props.history.location.state.packageValue
            ? this.props.history.location.state.packageValue
            : null,
        statusfilter:
          this.props.history.location.state &&
          this.props.history.location.state.statusfilter
            ? this.props.history.location.state.statusfilter
            : null,
      },
    });
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

            {notes.disabled &&
            (notes.AttachmentPath === null ||
              notes.AttachmentPath === "" ||
              notes.AttachmentPath === undefined) ? (
              <td></td>
            ) : notes.disabled && notes.AttachmentPath ? (
              <td style={{ width: "160px" }}>
                <a
                  target="_blank"
                  className="normal-btn"
                  href={fileBase + notes.AttachmentPath}
                >
                  View Image
                </a>
              </td>
            ) : (
              <td style={{ width: "160px" }}>
                <div className="custom-file-browse">
                  <span>Choose File</span>
                  <input
                    type="file"
                    name="selectedfile"
                    id="file"
                    style={{ width: 140, border: 0 }}
                    onChange={(event) => this.handleFiles(event, notes.Index)}
                  />
                </div>
                <br />
                <p>{notes.AttachmentName}</p>
              </td>
            )}
            <td className="pck-action-column">
              {this.state.DeleteAccess === 1 ? (
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn "
                  onClick={() => this.handleNotesRemoveRow(notes.Index)}
                >
                  <i className={"fas fa-minus"} />
                </Button>
              ) : null}
              {this.state.notes.filter((x) => x.Status === "Active").length ===
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
                <Button className="Plus-btn info-icon" justIcon color="twitter">
                  <InfoIcon />
                </Button>
              </Tooltip>
            </td>
          </tr>
        );
      });
  };
  async validate() {
    let IsFormValid = true;

    // if (CommonConfig.isEmpty(this.state.selectedDropoffCountry) || CommonConfig.isEmpty(this.state.DropoffCountry)) {
    //   IsFormValid = false;
    //   this.setState({
    //     dropoffcountryErr: true,
    //     dropoffcountryHelperText: "Please Enter Dropoff Country",
    //   });
    // }
    // if (CommonConfig.isEmpty(this.state.PickupCountry) || CommonConfig.isEmpty(this.state.selectedPickUPCountry) ) {
    //   IsFormValid = false;
    //   this.setState({
    //     pickupcountryErr: true,
    //     pickupcountryHelperText: "Please Enter Pickup Country",
    //   });
    // }

    if (CommonConfig.isEmpty(this.state.ProposalStatus)) {
      IsFormValid = false;
      this.setState({
        proposalstatusErr: true,
        proposalstatusHelperText: "Please Enter Proposal Status",
      });
    }
    if (CommonConfig.isEmpty(this.state.ContactName)) {
      IsFormValid = false;
      this.setState({
        contactnameErr: true,
        contactnameHelperText: "Please Enter Contact Name",
      });
    }
    if (CommonConfig.isEmpty(this.state.Phone)) {
      IsFormValid = false;
      this.setState({
        phoneErr: true,
        phoneHelperText: "Please Enter Phone Number",
      });
    }
    if (CommonConfig.isEmpty(this.state.EmailAddress)) {
      IsFormValid = false;
      this.setState({
        emailaddressErr: true,
        emailaddressHelperText: "Please Enter EmailAddress",
      });
    }

    return IsFormValid;
  }

  handleBlur = (event, type) => {
    if (type === "fullname") {
      this.setState({ checkFullName: true });
      let val = event.target.value;
      if (CommonConfig.isEmpty(val)) {
        this.setState({
          fullnameErr: true,
          fullnameHelperText: "Please Enter Full Name",
        });
      }
    }
  };

  handleError = () => {
    this.setState({
      ProposalTypeError: "Please select any one",
      Referrederror: "Please select any one",
      Followuprror: "Please select date",
      PackageListError: "Please select Package Type",
    });
  };

  handleSave = (redirect) => {
    if (!this.state.ContactName) {
      document.getElementById("cname").style.display = "block";
      this.setState({
        contactnameHelperText: "Please Enter Contact Name",
        // pickupcityErr: true,
      });
    }
    if(this.state.StartDate){
      var followUpprev = new Date(this.state.StartDate)
      var currentdate = new Date()
      debugger
      if(currentdate > followUpprev){
        console.log("date = " , new Date(this.state.StartDate));
        this.setState({
          // ProposalTypeError: "Please select any one",
          // Referrederror: "Please select any one",
          Followuprror: "Follow up date should be today date or greater",
          // PackageListError: "Please select Package Type",
        });
        cogoToast.error("Missing or Incorrect Data");
        return;
      }
      
    }
    if (!this.state.EmailAddress) {
      document.getElementById("cemail").style.display = "block";
      this.setState({
        emailaddressHelperText: "Please Enter Email Address",
        // pickupcityErr: true,
      });
    }
    if (!this.state.Phone) {
      document.getElementById("cphone").style.display = "block";
      this.setState({
        phoneHelperText: "Please Enter Phone Number",
        // pickupcityErr: true,
      });
    }
    if (!this.state.selectedPickUPCountry.value) {
      document.getElementById("pickupcountry").style.display = "block";
      this.setState({
        pickupcountryHelperText: "Please Select Pickup Country",
        // pickupcityErr: true,
      });
    }

    if (!this.state.selectedDropoffCountry.value) {
      document.getElementById("dropoffcountry").style.display = "block";
      this.setState({
        dropoffcountryHelperText: "Please Select Dropoff Country",
        // pickupcityErr: true,
      });
    }

    if (!this.state.ProposalStatus) {
      this.setState({
        proposalstatusErr: true,
        proposalstatusHelperText: "Please Enter Proposal Status",
      });
    } else if (
      this.state.ProposalStatus === "Cancelled" &&
      !this.state.CancelationReason
    ) {
      this.setState({
        CancelationReasonErr: true,
        CancelationReasonHelperText: "Please Enter Cancellation Reason",
      });
      return;
    }else if (
      this.state.ProposalStatus === "Booked" &&
      !this.state.trackingNumber
    ) {
      this.setState({
        trackingNumberErr: true,
        trackingNumberHelperText: "Please Enter Tracking Number",
      });
      return;
    }
    
    else if (
      this.state.ProposalStatus === "Closed" &&
      !this.state.CancelationReason
    ) {
      this.setState({
        CancelationReasonErr: true,
        CancelationReasonHelperText: "Please Enter Closed Reason",
      });
      return;
    }
    
    console.log("previousManaged = ",this.state.previousManaged.value)
    debugger
    // if(this.state.ProposalStatus === "Cancelled" && this.state.selectedWorkingOnRequest && this.state.previousManaged.value == undefined){
      
    //   debugger
    //   // this.state.proposalstatusErr
    //   this.setState({
    //     proposalstatusErr: true,
    //     proposalstatusHelperText: "Please change Proposal Status to new or open",
    //   });
    //   return;
      
    // }

    if(this.state.ProposalStatus != "Cancelled" && this.state.selectedWorkingOnRequest.value == undefined){
      // this.state.trackingNumber = ""

      this.setState({
        managedbyErr: true,
        managedbyHelperText: "Please select managed by",
      });
      cogoToast.error("Missing or Incorrect Data");
      return;
    }

    

    if (
      // (this.state.PackageList.length > 0 ||
      //   this.state.TVList.length > 0 ||
      //   this.state.CarList.length > 0) &&
      this.state.newpackagetype.length > 0 ||
      this.state.newpackagetype.length != 0
    ) {
      document.getElementById("PackageType").style.display = "none";
    } else {
      document.getElementById("PackageType").style.display = "block";
      // this.handleError();
      this.setState({ PackageListError: "Please select Package Type" });
    }

    if(!this.state.StartDate && this.state.ProposalStatus === "Open"){
      document.getElementById("followuprror").style.display = "block";
      document.getElementById("referrederror").style.display = "block";
      document.getElementById("proposalTypeerror").style.display = "block";

      this.setState({
        Referrederror: "Please select any one",
        Referrederr: true,
        ProposalTypeError: "Please select any one",
        ProposalTypeErr: true,
        Followuprror: "Please select date",
        Followuprr: true,
      });

      cogoToast.error("Missing or Incorrect Data");
      return;

    }
    if (
      !this.state.ProposalType &&
      !this.state.ReferredBy &&

      (
        this.state.ProposalStatus === "Booked" ||
        this.state.ProposalStatus === "Closed" )
      // this.state.ProposalStatus !== ""
    ) {
      document.getElementById("referrederror").style.display = "block";
      document.getElementById("proposalTypeerror").style.display = "block";
      // document.getElementById("followuprror").style.display = "block";
      this.setState({
        Referrederror: "Please select any one",
        Referrederr: true,
        ProposalTypeError: "Please select any one",
        ProposalTypeErr: true,
        
      });
      cogoToast.error("Missing or Incorrect Data");
      return;
    }
    if (
      this.state.fromStateAutoComplete === true &&
      (!this.state.PickupCityZip || this.state.PickupCityZip === "")
    ) {
      document.getElementById("pickupzip").style.display = "block";
      this.setState({
        pickupcityzipHelperText: "Please Enter Pickup Zipcode",
        pickupcityErr: true,
      });
      cogoToast.error("Missing or Incorrect Data");
      return;
    }
    if (
      this.state.fromStateAutoComplete === false &&
      (!this.state.PickupCity || this.state.PickupCity === "")
    ) {
      document.getElementById("pickupcity").style.display = "block";
      this.setState({
        pickupcityHelperText: "Please Enter Pickup City",
        pickupcityErr: true,
      });
      cogoToast.error("Missing or Incorrect Data");
      return;
    }
    if (
      this.state.toStateAutoComplete === true &&
      (!this.state.DropoffCityZip || this.state.DropoffCityZip === "")
    ) {
      document.getElementById("dropoffzipcode").style.display = "block";
      this.setState({
        DropoffCityZipHelperText: "Please Enter Dropoff Zipcode",
        dropoffcityErr: true,
      });
      cogoToast.error("Missing or Incorrect Data");
      return;
    }
    if (
      this.state.toStateAutoComplete === false &&
      (!this.state.DropoffCity || this.state.DropoffCity === "")
    ) {
      document.getElementById("dropoffcity").style.display = "block";
      this.setState({
        dropoffcityHelperText: "Please Enter Dropoff City",
        dropoffcityErr: true,
      });

      cogoToast.error("Missing or Incorrect Data");
      return;
    }
    var FinalPackage = [...this.state.PackageList, ...this.state.CarList];
    let updatedpackage = [...FinalPackage, ...this.state.TVList];

    let PackageList = updatedpackage.filter(
      (item) =>
        (item.Status === "Active" && item.SalesLeadPackageDetailID !== null) ||
        (item.Status === "Inactive" &&
          item.SalesLeadPackageDetailID !== null) ||
        (item.Status === "Active" && item.SalesLeadPackageDetailID === null)
    );
    if (PackageList.length > 0 && this.state.newpackagetype.length > 0) {
      for (let i = 0; i < PackageList.length; i++) {
        if (
          PackageList[i].PackageType === 5 &&
          PackageList[i].Status === "Active"
        ) {
          if (
            PackageList[i].CarMake === "" &&
            PackageList[i].CarModel === "" &&
            PackageList[i].CarYear === ""
          ) {
            document.getElementById("carmakeErr").style.display = "block";
            document.getElementById("carmodelErr").style.display = "block";
            document.getElementById("caryearErr").style.display = "block";
            this.setState({
              CarmakeErrText: "please enter brand name",
              CarmodelErrText: "please enter car model",
              CaryearErrText: "please enter car year",
            });
            return;
          } else if (
            PackageList[i].CarMake === "" &&
            PackageList[i].CarModel === ""
          ) {
            document.getElementById("carmakeErr").style.display = "block";
            document.getElementById("carmodelErr").style.display = "block";

            this.setState({
              CarmakeErrText: "please enter brand name",
              CarmodelErrText: "please enter car model",
            });
            return;
          } else if (
            PackageList[i].CarMake === "" &&
            PackageList[i].CarYear === ""
          ) {
            document.getElementById("carmakeErr").style.display = "block";
            document.getElementById("caryearErr").style.display = "block";
            this.setState({
              CarmakeErrText: "please enter brand name",
              CaryearErrText: "please enter car year",
            });
            return;
          } else if (
            PackageList[i].CarModel === "" &&
            PackageList[i].CarYear === ""
          ) {
            document.getElementById("carmodelErr").style.display = "block";
            document.getElementById("caryearErr").style.display = "block";
            this.setState({
              CarmodelErrText: "please enter car model",
              CaryearErrText: "please enter car year",
            });
            return;
          } else if (PackageList[i].CarMake === "") {
            document.getElementById("carmakeErr").style.display = "block";
            this.setState({
              CarmakeErrText: "please enter brand name",
            });
            return;
          } else if (PackageList[i].CarModel === "") {
            document.getElementById("carmodelErr").style.display = "block";
            this.setState({
              CarmodelErrText: "please enter car model",
            });
            return;
          } else if (PackageList[i].CarYear === "") {
            document.getElementById("caryearErr").style.display = "block";
            this.setState({
              CaryearErrText: "please enter car year",
            });
            return;
          } else {
            document.getElementById("carmakeErr").style.display = "none";
            document.getElementById("carmodelErr").style.display = "none";
            document.getElementById("caryearErr").style.display = "none";
          }
        }
        if (
          PackageList[i].PackageType === 4 &&
          PackageList[i].Status === "Active"
        ) {
          if (
            PackageList[i].TVMake === "" &&
            PackageList[i].TVModel === "" &&
            PackageList[i].ActualWeight === 0
          ) {
            document.getElementById("tvmakeErr").style.display = "block";
            document.getElementById("tvmodelErr").style.display = "block";
            document.getElementById("tvAweightErr").style.display = "block";
            this.setState({
              TvmakeErrText: "please enter tv name",
              TvmodelErrText: "please enter tv model",
              TvAweightErrText: "please enter tv Lbs",
            });
            return;
          } else if (
            PackageList[i].TVMake === "" &&
            PackageList[i].TVModel === ""
          ) {
            document.getElementById("tvmakeErr").style.display = "block";
            document.getElementById("tvmodelErr").style.display = "block";

            this.setState({
              TvmakeErrText: "please enter tv name",
              TvmodelErrText: "please enter tv model",
            });
            return;
          } else if (
            PackageList[i].TVMake === "" &&
            PackageList[i].ActualWeight === 0
          ) {
            document.getElementById("tvmakeErr").style.display = "block";
            document.getElementById("tvAweightErr").style.display = "block";
            this.setState({
              TvmakeErrText: "please enter tv name",
              TvAweightErrText: "please enter tv Lbs",
            });
            return;
          } else if (
            PackageList[i].TVModel === "" &&
            PackageList[i].ActualWeight === 0
          ) {
            document.getElementById("tvmodelErr").style.display = "block";
            document.getElementById("tvAweightErr").style.display = "block";
            this.setState({
              TvmodelErrText: "please enter tv model",
              TvAweightErrText: "please enter tv Lbs",
            });
            return;
          } else if (PackageList[i].TVMake === "") {
            document.getElementById("tvmakeErr").style.display = "block";
            this.setState({
              TvmakeErrText: "please enter tv name",
            });
            return;
          } else if (PackageList[i].TVModel === "") {
            document.getElementById("tvmodelErr").style.display = "block";
            this.setState({
              TvmodelErrText: "please enter tv model",
            });
            return;
          } else if (PackageList[i].ActualWeight === "") {
            document.getElementById("tvAweightErr").style.display = "block";
            this.setState({
              TvAweightErrText: "please enter tv Lbs",
            });
            return;
          } else {
            document.getElementById("tvmakeErr").style.display = "none";
            document.getElementById("tvmodelErr").style.display = "none";
            document.getElementById("tvAweightErr").style.display = "none";
          }
        }
        if (
          PackageList[i].PackageType === 0 &&
          PackageList[i].Status === "Active"
        ) {
          this.setState({
            packagetypeErr: true,
            packagetypeErrText: "please select any one",
          });
          return;
        }
        if (
          (PackageList[i].PackageType === 1 ||
            PackageList[i].PackageType === 3) &&
          PackageList[i].Status === "Active"
        ) {
          if (
            (PackageList[i].Quantity === "0" ||
              PackageList[i].Quantity === "" ||
              PackageList[i].Quantity === 0) &&
            (PackageList[i].ActualWeight === "" ||
              PackageList[i].ActualWeight === "0" ||
              PackageList[i].ActualWeight === 0)
          ) {
            this.setState({
              AquantityErr: true,
              AquantityErrText: "please enter quantity",
              AWeightErr: true,
              AWeightErrText: "please enter Lbs",
            });
            return;
          } else if (
            PackageList[i].ActualWeight === "" ||
            PackageList[i].ActualWeight === "0" ||
            PackageList[i].ActualWeight === 0
          ) {
            this.setState({
              AWeightErr: true,
              AWeightErrText: "please enter Lbs",
            });
            return;
          } else if (
            PackageList[i].Quantity === "0" ||
            PackageList[i].Quantity === "" ||
            PackageList[i].Quantity === 0
          ) {
            this.setState({
              AquantityErr: true,
              AquantityErrText: "please enter quantity",
            });
            return;
          }
        }
      }
      document.getElementById("PackageType").style.display = "none";
    } else {
      document.getElementById("PackageType").style.display = "block";
      // this.handleError();
      this.setState({ PackageListError: "Please select Package Type" });
      return;
    }

    this.validate().then((res) => {
      if (res) {
        var FinalNotes = this.state.notes.filter(
          (x) => x.NoteText !== "" && x.NoteText !== null
        );

        // console.log("FinalNotes = ",FinalNotes)

        if (
          !this.state.dropoffcountryErr ||
          !this.state.pickupcountryErr ||
          !this.state.dropoffcityErr ||
          !this.state.leadipaddressErr ||
          !this.state.contactnameErr ||
          !this.state.phoneErr ||
          !this.state.emailaddressErr ||
          !this.state.proposalstatusErr ||
          !this.state.pickupstateErr ||
          !this.state.dropoffstateErr ||
          !this.state.pickupcityErr ||
          !this.state.dropoffcityErr
        ) {
          var pickupState = "";

          if (this.state.fromStateAutoComplete === false) {
            pickupState = this.state.PickupState;
          } else {
            pickupState = this.state.PickupState.value;
          }

          var dropoffState = "";

          if (this.state.toStateAutoComplete === false) {
            dropoffState = this.state.DropoffState;
          } else {
            dropoffState = this.state.DropoffState.value;
          }
       
          var RefBy = this.state.referredby.filter(
            (x) => x.label == this.state.ReferredBy
          );
          if(RefBy!=""){
          var selectedData = {
            value:RefBy[0].id,
            label:RefBy[0].label,
  
          }
        }else
        {RefBy="";}
          //this.state.ReferredBy
          let data = {
            userid: CommonConfig.loggedInUserData().PersonID,
            SalesLeadManagementID: this.state.SalesLeadManagementID,
            ManagedBy: this.state.selectedWorkingOnRequest
              ? this.state.selectedWorkingOnRequest.value
              : null,
            SalesLeadDate: moment(this.state.LeadDate)
              .format("YYYY-MM-DD HH:mm:ss")
              .toString(),
            FromCountryID: this.state.selectedPickUPCountry.value,
            CountryCallCode: this.state.SelectedCountryCode.label,
            ToCountryID: this.state.selectedDropoffCountry.value,
            SalesLeadsType: this.state.ProposalType,
            ContactName: this.state.ContactName,
            CompanyName: this.state.CompanyName,
            Email: this.state.EmailAddress,
            PhoneNumber: this.state.Phone,
            FromCity: this.state.PickupCity,
            FromState: pickupState,
            FromZipCode: this.state.PickupCityZip,
            ToCity: this.state.DropoffCity,
            ToState: dropoffState,
            ToZipCode: this.state.DropoffCityZip,
            SalesLeadFollowupDate: !CommonConfig.isEmpty(this.state.StartDate)
              ? moment(this.state.StartDate)
                  .format("YYYY-MM-DD HH:mm:ss")
                  .toString()
              : null,
            TentativeMoveDate: !CommonConfig.isEmpty(this.state.TentativeDate)
              ? moment(this.state.TentativeDate)
                  .format("YYYY-MM-DD HH:mm:ss")
                  .toString()
              : null,
            ReferredBy: RefBy==""?"":RefBy[0].id,
            IPAddress: this.state.LeadIPAddress,
            MACAddress: null,
            DeliveryType: this.state.DeliveryType,
            ProposalStatus: this.state.ProposalStatus,
            PackageList: PackageList,
            weightType: this.state.SelectedWeightType,
            NoteList: FinalNotes,
            trackingNumber: this.state.trackingNumber,
            CancelationReason: this.state.CancelationReason.label
              ? this.state.CancelationReason.label
              : this.state.CancelationReason,
          };

          if(this.state.ProposalStatus === "Cancelled"){
            // data.ManagedBy = 18;
            data.SalesLeadFollowupDate = null;
          }
          if(this.state.ProposalStatus === "Closed"){
            // data.ManagedBy = 0;
            data.SalesLeadFollowupDate = null;
          }
          let packagetype;
          // for(var i = 0; i< PackageList.length;i++){
          if (PackageList[0].PackageType === 1) {
            packagetype = "Boxes";
          } else if (PackageList[0].PackageType === 2) {
            packagetype = "Document";
          } else if (PackageList[0].PackageType === 3) {
            packagetype = "Furniture";
          } else if (PackageList[0].PackageType === 4) {
            packagetype = "Television";
          } else if (PackageList[0].PackageType === 5) {
            packagetype = "Auto";
          }
          // }
          let manageData = {
            Email: this.state.EmailAddress,
            Phone: this.state.Phone,
            PersonID: CommonConfig.loggedInUserData().PersonID,
            newpackagetype: packagetype,
          };

          this.showLoader();

          let data14 = {
            Email: this.state.EmailAddress,
          };

          api
            .post("salesLead/getEmailID", data14)
            .then((restest) => {
              if (restest.success) {
                console.log(restest.data[0][0]);

                data.EmailID = restest.data[0][0].EmailID;

                try {
                  console.log("this.props.history.location.state.id = ",this.props.history.location.state.id);
                  if (this.props.history.location.state.id === "" ) {
                    api
                      .post("salesLead/getManagedByPhoneOREmail", manageData)
                      .then((result) => {
                        if (result.success) {
                          if (result.data.length > 0) {
                            data.ManagedBy = result.data[0].ManagedBy;
                            if(this.state.ProposalStatus === "Cancelled"){
                              // data.ManagedBy = 18;
                            }
                          }
                          var formData = new FormData();
                          formData.append("data", JSON.stringify(data));
                          if (this.state.Attachments.length > 0) {
                            this.state.Attachments.forEach((file) => {
                              formData.append("Attachments", file);
                            });
                          }
                          api
                            .post("salesLead/addSalesLead", formData)
                            .then((res) => {
                              if (res.success) {
                                this.hideLoader();
                                if (redirect) {
                                  localStorage.removeItem("SearchCount");

                                  this.props.history.push({
                                    pathname: "/admin/SalesLeads",
                                    state: {
                                      filterlist:
                                        this.props.history.location.state &&
                                        this.props.history.location.state
                                          .filterlist
                                          ? this.props.history.location.state
                                              .filterlist
                                          : null,
                                      sortlist:
                                        this.props.history.location.state &&
                                        this.props.history.location.state
                                          .sortlist
                                          ? this.props.history.location.state
                                              .sortlist
                                          : null,
                                      packageValue:
                                        this.props.history.location.state &&
                                        this.props.history.location.state
                                          .packageValue
                                          ? this.props.history.location.state
                                              .packageValue
                                          : null,
                                      statusfilter:
                                        this.props.history.location.state &&
                                        this.props.history.location.state
                                          .statusfilter
                                          ? this.props.history.location.state
                                              .statusfilter
                                          : null,
                                    },
                                  });
                                } else {
                                  this.reCallApi();
                                }
                                cogoToast.success(
                                  "Saleslead updated Sucessfully"
                                );
                              } else {
                                this.hideLoader();
                                cogoToast.error("Something went wrong6");
                              }
                            })
                            .catch((err) => {
                              this.hideLoader();
                              cogoToast.error("Something went wrong7");
                            });
                        }
                      })
                      .catch((err) => {
                        console.log("error", err);
                      });
                  } else {
                    var formData = new FormData();
                    formData.append("data", JSON.stringify(data));
                    if (this.state.Attachments.length > 0) {
                      this.state.Attachments.forEach((file) => {
                        formData.append("Attachments", file);
                      });
                    }
                    api
                      .post("salesLead/addSalesLead", formData)
                      .then((res) => {
                        if (res.success) {
                          this.hideLoader();
                          if (redirect) {
                            localStorage.removeItem("SearchCount");

                            this.props.history.push({
                              pathname: "/admin/SalesLeads",
                              state: {
                                filterlist:
                                  this.props.history.location.state &&
                                  this.props.history.location.state.filterlist
                                    ? this.props.history.location.state
                                        .filterlist
                                    : null,
                                sortlist:
                                  this.props.history.location.state &&
                                  this.props.history.location.state.sortlist
                                    ? this.props.history.location.state.sortlist
                                    : null,
                                packageValue:
                                  this.props.history.location.state &&
                                  this.props.history.location.state.packageValue
                                    ? this.props.history.location.state
                                        .packageValue
                                    : null,
                                statusfilter:
                                  this.props.history.location.state &&
                                  this.props.history.location.state.statusfilter
                                    ? this.props.history.location.state
                                        .statusfilter
                                    : null,
                              },
                            });
                          } else {
                            this.reCallApi();
                          }
                          cogoToast.success("Saleslead updated Sucessfully");
                        } else {
                          this.hideLoader();
                          cogoToast.error("Something went wrong8");
                        }
                      })
                      .catch((err) => {
                        this.hideLoader();
                        cogoToast.error("Something went wrong9");
                      });
                  }
                } catch (error) {
                  this.hideLoader();
                  cogoToast.error("Something went wrong10");
                }
              }
            })
            .catch((err) => {
              console.log("error.....", err);
            });
        } else {
          cogoToast.error(
            "There were found error in the form.Please correct and resubmit"
          );
        }
      } else {
        cogoToast.error("Please correct error and resubmit the form.");
      }
    });
  };

  handleDateChange = (date) => {
    this.setState({ StartDate: date, Followuprror: "", Followuprr: false });
  };

  handleLeadDateChange = (date) => {
    this.setState({ LeadDate: date });
  };

  handleTentativeDate = (date) => {
    this.setState({ TentativeDate: date });
  };

  handleSearchBack = () => {
    if (
      this.props.history.location.state &&
      this.props.history.location.state.searchData
    ) {
      window.location.href =
        "/admin/Search/" + this.props.history.location.state.searchData;
    } else {
      cogoToast.error("Search data not found.");
    }
  };

  handleDelete = () => {
    this.setState({
      open: false,
    });
    this.showLoader();
    try {
      let data = {
        SalesLeadManageMentID: this.state.SalesLeadManagementID,
      };
      api.post("salesLead/deleteSalesLeadByID", data).then((result) => {
        if (result.success) {
          this.hideLoader();
          cogoToast.success("Deleted successfully");
          this.props.history.push({
            pathname: "/admin/SalesLeads",
            state: {
              filterlist:
                this.props.history.location.state &&
                this.props.history.location.state.filterlist
                  ? this.props.history.location.state.filterlist
                  : null,
              sortlist:
                this.props.history.location.state &&
                this.props.history.location.state.sortlist
                  ? this.props.history.location.state.sortlist
                  : null,
              packageValue:
                this.props.history.location.state &&
                this.props.history.location.state.packageValue
                  ? this.props.history.location.state.packageValue
                  : null,
              statusfilter:
                this.props.history.location.state &&
                this.props.history.location.state.statusfilter
                  ? this.props.history.location.state.statusfilter
                  : null,
            },
          });
        } else {
          this.hideLoader();
          cogoToast.error("Something went wrong11");
        }
      });
    } catch (err) {
      this.hideLoader();
      cogoToast.error("Something Went 12");
    }
  };

  showDiv = (type, packageType) => {
    this.setState({
      [type]: true,
    });
    if (
      packageType === "Car" &&
      this.state.CarList.filter((x) => x.Status === "Active").length === 0
    ) {
      this.state.newpackagetype.push("Car");
      this.addCarRow();
    }
    if (
      packageType === "TV" &&
      this.state.TVList.filter((x) => x.Status === "Active").length === 0
    ) {
      this.state.newpackagetype.push("TV");
      this.addTVRow();
    }
    if (
      packageType === "Package" &&
      this.state.PackageList.filter((x) => x.Status === "Active").length === 0
    ) {
      this.state.newpackagetype.push("Package");
      this.handleAddRow();
    }
    document.getElementById("PackageType").style.display = "none";
  };

  async confirmPickup() {
    if (this.state.pickUpValue === "") {
      this.setState({ errorMessage1: "Please select pickup type" });
    } else {
      for (var i = 0; i < this.state.PackageList.length; i++) {
        if (
          this.state.pickUpValue === "FEDEX" &&
          this.state.PackageList[i].PackageType === 3 &&
          this.state.PackageList[i].Status === "Active"
        ) {
          this.hideLoader();
          this.setState({ PickupOpenPopup: false });
          return cogoToast.error("Online rates are not avalible for furniture");
        }
      }

      this.setState({ errorMessage1: "", PickupOpenPopup: false });
      if (
        this.state.pickUpValue === "FEDEX" &&
        this.state.FinalGetRate.FromCity === "" &&
        this.state.FinalGetRate.FromStateProvinceCode === ""
      ) {
        this.hideLoader();
        return cogoToast.error("From City or State is required");
      }
      var FinalGetRate = this.state.FinalGetRate;
      FinalGetRate.PickUpType = this.state.pickUpValue;
      FinalGetRate.NoOfTV = this.state.NoOfTv;
      FinalGetRate.TotalCFT =
        this.state.pickUpValue === "FEDEX"
          ? FinalGetRate.TotalCFT
          : // : this.state.volumeAmount;
            FinalGetRate.TotalCFT;
      var data = JSON.stringify(FinalGetRate);

      let res = await api.post("getQuote/getOceanRate", data);
      if (res.success) {
        this.setState({ finalOceanResult: res.data, Loading: false });
      } else {
        this.hideLoader();
        cogoToast.error("Something Went Wrong");
      }
      var data = res.data;
      var DallasTotal = 0;
      var SecaucusTotal = 0;
      var HaywardTotal = 0;
      var DallasCostToal = 0;
      var SecaucusCostTotal = 0;
      var HaywardCostTotal = 0;

      for (var i = 0; i < data.length; i++) {
        if (data[i].IsError) {
          DallasTotal = 0.0;
          SecaucusTotal = 0.0;
          DallasCostToal = 0.0;
          SecaucusCostTotal = 0.0;
          HaywardTotal = 0.0;
          HaywardCostTotal = 0.0;
          break;
        }

        if (data[i].col0 != undefined) {
          DallasTotal += Number(data[i].col0.Rate);
          DallasCostToal += Number(data[i].col0.costPrice);
        }

        if (data[i].col1 != undefined) {
          SecaucusTotal += Number(data[i].col1.Rate);
          SecaucusCostTotal += Number(data[i].col1.costPrice);
        }

        if (data[i].col2 != undefined) {
          HaywardTotal += Number(data[i].col2.Rate);
          HaywardCostTotal += Number(data[i].col2.costPrice);
        }
      }
      this.setState({
        finalOceanResult: data,
        DallasTotal: DallasTotal.toFixed(2),
        SecaucusTotal: SecaucusTotal.toFixed(2),
        DallasCostToal: DallasCostToal.toFixed(2),
        SecaucusCostTotal: SecaucusCostTotal.toFixed(2),
        HaywardTotal: HaywardTotal.toFixed(2),
        HaywardCostTotal: HaywardCostTotal.toFixed(2),
      });

      return this.state.finalOceanResult;
    }
  }
  pickUpChange(e) {
    this.setState({ pickUpValue: e.target.value });
  }
  appendPickUPType() {
    const pickUpType = this.state.PickUpType;
    return pickUpType.map((type) => {
      return <MenuItem value={type.value}> {type.label} </MenuItem>;
    });
  }
  validateSendMailData() {
    let IsFormValid = true;
    if (CommonConfig.isEmpty(this.state.ContactName)) {
      IsFormValid = false;
      this.setState({
        dialogNameErr: true,
        dialogNameHelperText: "Please enter name",
      });
    } else if (CommonConfig.isEmpty(this.state.EmailAddress)) {
      IsFormValid = false;
      this.setState({
        dialogEmailErr: true,
        dialogEmailHelperText: "Please enter email",
      });
    } else if (!this.state.EmailAddress.match(CommonConfig.RegExp.email)) {
      IsFormValid = false;
      this.setState({
        dialogEmailErr: true,
        dialogEmailHelperText: "Please enter valid email",
      });
    } else if (CommonConfig.isEmpty(this.state.Phone)) {
      IsFormValid = false;
      this.setState({
        dialogPhoneErr: true,
        dialogPhoneHelperText: "Please enter phone",
      });
    } else if (!this.state.Phone.match(CommonConfig.RegExp.phoneNumber)) {
      IsFormValid = false;
      this.setState({
        dialogPhoneErr: true,
        dialogPhoneHelperText: "Please enter valid phone",
      });
    } else if (this.state.Phone.length < 5 || this.state.Phone.length > 15) {
      IsFormValid = false;
      this.setState({
        dialogPhoneErr: true,
        dialogPhoneHelperText: "Please enter valid phone",
      });
    } else {
      IsFormValid = true;
      this.setState({
        dialogPhoneErr: false,
        dialogEmailHelperText: "",
        dialogNameHelperText: "",
        dialogPhoneHelperText: "",
      });
    }
    return IsFormValid;
  }

  handleapiSendMail = () => {
    if (this.validateSendMailData()) {
      this.setState({
        Ratesendmailopen: false,
      });

      this.showLoader();

      let packgList = this.state.PackageList;
      packgList.map((obj) => {
        obj.PackageType = this.state.IsPackage ? 1 : 2;
        obj.Quantity = obj.PackageNumber;
        obj.ActualWeight = obj.PackageWeight;
        obj.DimensionL = obj.PackageLength;
        obj.DimensionW = obj.PackageWidth;
        obj.DimensionH = obj.PackageHeight;
        obj.ChargeableWeight = obj.PackageChargableWeight;
        obj.SortOrder = "";
        obj.Status = "Active";
        obj.SalesLeadPackageDetailID = null;
      });

      setTimeout(() => {
        try {
          var arr1 = [];
          var arr2 = [];
          var arr = [];

          // this.state.rateArr.forEach((obj) => {
          //   if (obj.IsError) {
          //     arr2.push(obj);
          //   } else {
          //     arr1.push(obj);
          //   }
          // });
          this.state.finalGetResults.forEach((obj) => {
            if (obj.Checked === true) {
              arr2.push(obj);
            } else {
              arr1.push(obj);
            }
          });
          //jsk
          //  arr = arr1.concat(arr2);
          if (arr2.length > 0) {
            let emailData = {
              SalesLeadID: this.state.SalesLeadManagementID,
              ChargableWeight: this.state.FinalGetRate.ChargableWeight,
              RateData: arr2,
              IsResidential:
                this.state.DeliveryType === "Commercial" ? false : true,
              RateType: "Hub",
              ToEmail: this.state.NewEmailAddress,
              currencyType:this.state.setCurrencyIcon
            };

            api
              .post("salesLead/sendGetRateEmail", emailData)
              .then((response) => {
                this.hideLoader();
                if (response.success) {
                  this.reCallApi();
                  cogoToast.success(response.data.message);
                }
              })
              .catch((err) => {
                console.log("error", err);
              });
          } else {
            this.hideLoader();
            return cogoToast.error("Please select the Rates");
          }
        } catch (err) {}
      }, 2000);
    }
  };
  searchSales = (type) => {
    let obj = {
      value: type === "PhoneNumber" ? this.state.Phone : this.state.EmailAdd,
      field: type,
    };
    localStorage.setItem("SearchCount", JSON.stringify(obj));
    this.props.history.push("/admin/SalesLeads");
  };

  handleDocumentSendMail = (e, record, type) => {
    if (type === "Message") {
      let escaped = new Option(record.original.BodyEmail).innerHTML;
      var data = {
        Frommail: record.original.FromEmail,
        TOmail: record.original.ToEmail,
        CCmail: record.original.CCEmail,
        Subjectmail: record.original.SubjectEmail,
        Bodymail: escaped,
        Type: "InvoiceMessage",
      };
      this.setState({
        sendmailopen: !this.state.sendmailopen,
        sendMailInfo: data,
      });
    }
  };

  htmlDecode(input) {
    var e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }
  changeWeightType(e) {
    if (e.target.value === "KG") {
      this.setState({
        SelectedDimensitionType: "CM",
      });
    } else {
      this.setState({
        SelectedDimensitionType: "Inches",
      });
    }
    this.setState({
      SelectedWeightType: e.target.value,
    });
  }
  render() {
    const {
      CancelationReason,
      ReferredBy,
      WriteAccess,
      DeleteAccess,
      selectedDropoffCountry,
      selectedPickUPCountry,
      selectedWorkingOnRequest,
      SelectedCountryCode,
      ProposalType,
      ProposalStatus,
      EmailAddress,
      trackingNumber,
      ContactName,
      DropoffCity,
      DropoffState,
      PickupState,
      PickupCity,
      Phone,
      DropoffCityZip,
      PickupCityZip,
      IsTvVisible,
      IsCarVisible,
      IsPackageVisible,
      EmailCount,
      PhoneCount,
      CommuncationList,
      finalGetResults,
      managedbyDisabled,
    } = this.state;
    const cancelationReasonList = this.state.cancelationReasonList.map(
      (type) => {
        return { value: type.Description, label: type.StringMapID };
      }
    );

    const closedReasonList = this.state.closedReasonList.map(
      (type) => {
        return { value: type.Description, label: type.StringMapID };
      }
    );
    const createProposal = this.state.CreateProposal;

    const correspondenceColumns = [
      {
        Header: "Email Date",
        width: 100,
        sortMethod: (a, b) => {
          return CommonConfig.dateSortMethod(a, b);
        },
        id: "EmailDate",
        accessor: (data) => {
          return moment(data.CreatedOn).format(
            CommonConfig.dateFormat.dateOnly
          );
        },
        filterable: false,
        sortable: false,
      },
      {
        Header: "Document Name",
        id: "DocumentName",
        accessor: "DocumentType",
        width: 100,
        filterable: false,
        sortable: false,
      },
      {
        Header: "To",
        id: "ToEmail",
        accessor: "ToEmail",
        width: 100,
        filterable: false,
        sortable: false,
      },
      {
        Header: "CC",
        accessor: "CCEmail",
        width: 80,
        filterable: false,
        sortable: false,
      },
      {
        Header: "Subject Line",
        accessor: "SubjectEmail",
        width: 80,
        filterable: false,
        sortable: false,
      },

      {
        Header: "Email Status",
        accessor: "EmailStatus",
        width: 80,
        filterable: false,
        sortable: false,
      },

      {
        Header: "View Message",
        Cell: (record) => {
          return (
            <Button
              className="normal-btn sm-orange"
              onClick={(e) => this.handleDocumentSendMail(e, record, "Message")}
            >
              View Message
            </Button>
          );
        },
        id: "BodyEmail",
        width: 110,
        filterable: false,
        sortable: false,
      },
    ];

    const managedby = this.state.managedby.map((managedby) => {
      return { value: managedby.PersonID, label: managedby.Name };
    });
    const proposalstatus = {
      options: this.state.proposalstatus.map((option) => option.label),
    };
    const pickupCity = {
      options: this.state.PickupCityList.map((option) => option.CityName),
    };
    const dropoffCity = {
      options: this.state.DropoffCityList.map((option) => option.CityName),
    };
    const deliverytype = {
      options: this.state.deliverytype.map((x) => x.label),
    };

    const referredby = {
      options: this.state.referredby.map((x) => x.label),
    };

    const dropoffCountry = this.state.CountryList.map((dropoffCountry) => {
      return {
        value: dropoffCountry.CountryID,
        label: dropoffCountry.CountryName,
      };
    });
    const pickupCountry = this.state.CountryList.map((pickupCountry) => {
      return {
        value: pickupCountry.CountryID,
        label: pickupCountry.CountryName,
      };
    });

    const countryCodeList = this.state.countryCodeListValue.map((countryCode) => {
      return {
        value: countryCode.phonecode,
        label: countryCode.phonecode,
      };
    });
    const toStateOptions = this.state.toStateList.map((state) => {
      return { value: state.StateName, label: state.StateName };
    });
    const fromStateOptions = this.state.fromStateList.map((state) => {
      return { value: state.StateName, label: state.StateName };
    });

    return (
      <GridContainer className="UserList-outer">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <Edit />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">
                Customer Information
              </h4>
              {/* {this.state.newurl && this.state.newurl !== "NULL" ? (
                <Tooltip title={this.state.newurl} arrow>
                  <Button
                    className="Plus-btn info-icon"
                    justIcon
                    color="twitter"
                  >
                    <InfoIcon />
                  </Button>
                </Tooltip>
              ) : null} */}
              {this.props.history.location.state.id !== "" ? (
                <div className="mg-info">
                  <br />
                  <p className="text-color-black">
                    Sales Lead ID:
                    <TextField
                      disabled={true}
                      value={this.state.SalesLeadManagementID}
                    />
                  </p>
                </div>
              ) : null}
            </CardHeader>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Contact Name"
                    id="contactname"
                    //error={this.state.contactnameErr}
                    // helperText={this.state.contactnameHelperText}
                    autoComplete= "off"
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      value: ContactName,
                      autoComplete: "none",
                      onChange: (event) =>
                        this.handlechange(event, "contactname"),
                      onFocus: () =>
                        this.setState({
                          contactnameCheck: false,
                          contactnameErr: false,
                          contactnameHelperText: "",
                        }),
                      onBlur: (event) =>
                        this.handlechange(event, "contactname"),
                      endAdornment:
                        this.state.contactnameCheck !== true ? (
                          <Icon className={useStyles.User}>account_box</Icon>
                        ) : this.state.contactnameErr ? (
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
                  <span id="cname" style={{ color: "red", fontSize: "12px" }}>
                    {this.state.contactnameHelperText}
                  </span>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText={`Email Address`}
                    id="email "
                    // error={this.state.emailaddressErr}
                    // helperText={this.state.emailaddressHelperText}
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      value: EmailAddress,
                      autoComplete: "none",
                      disabled:
                        this.props.history.location.state.id !== ""
                          ? DeleteAccess === 1
                            ? false
                            : true
                          : false,
                      onChange: (event) =>
                        this.handleOnChange(event, "emailaddress"),
                      onFocus: () =>
                        this.setState({
                          emailaddressCheck: false,
                          emailaddressErr: false,
                          emailaddressHelperText: "",
                        }),
                      onBlur: (event) =>
                        this.handlechange(event, "emailaddress"),
                      endAdornment:
                        EmailCount > 1 ? (
                          <a
                            href="javascript:;"
                            onClick={() => this.searchSales("Email")}
                          >
                            <Badge badgeContent={EmailCount} color="primary">
                              <Icon className={useStyles.User}>email</Icon>
                            </Badge>
                          </a>
                        ) : (
                          <Icon className={useStyles.User}>email</Icon>
                        ),
                    }}
                  />
                  <span id="cemail" style={{ color: "red", fontSize: "12px" }}>
                    {this.state.emailaddressHelperText}
                  </span>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                    <Autocomplete
                      options={countryCodeList}
                      id="CountryCode"
                      getOptionLabel={(option) => option.label.toString()}
                      value={SelectedCountryCode}
                      onChange={(event, value) =>
                        this.requestChange(event, value, "CountryCode")
                      }
                      autoComplete= "off" 
                      // inputProps={{ autoComplete: "none" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={this.state.CountryCodeErr}
                          helperText={this.state.CountryCodeHelperText}
                          label="Code"
                          fullWidth
                        />
                      )}
                    />
                      
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6}>

                    <CustomInput
                    labelText="Phone"
                    id="phone "
                    // error={this.state.phoneErr}
                    // helperText={this.state.phoneHelperText}
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      value: Phone,
                      autoComplete: "none",
                      disabled:
                        this.props.history.location.state.id !== ""
                          ? DeleteAccess === 1
                            ? false
                            : true
                          : false,
                      onChange: (event) => this.handleOnChange(event, "phone"),
                      onBlur: (event) => this.handlechange(event, "phone"),
                      onFocus: () =>
                        this.setState({
                          phoneCheck: false,
                          phoneErr: false,
                          phoneHelperText: "",
                        }),
                      endAdornment:
                        PhoneCount > 1 ? (
                          <a
                            href="javascript:;"
                            onClick={() => this.searchSales("PhoneNumber")}
                          >
                            <Badge badgeContent={PhoneCount} color="primary">
                              <Icon className={useStyles.User}>phone</Icon>
                            </Badge>
                          </a>
                        ) : (
                          <Icon className={useStyles.User}>phone</Icon>
                        ),
                    }}
                  />
                  <span id="cphone" style={{ color: "red", fontSize: "12px" }}>
                    {this.state.phoneHelperText}
                  </span>
                      
                      </GridItem>
                  </GridContainer>
                  
                  
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <Autocomplete
                    options={managedby}
                    id="managedby"
                    getOptionLabel={(option) => option.label}
                    value={selectedWorkingOnRequest}
                    onChange={(event, value) =>
                      this.requestChange(event, value, "managedby")
                    }
                    disabled={this.state.managedbyDisabled}
                    autoComplete= "off" 
                    inputProps={{ autoComplete: "none" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        disabled={this.state.managedbyDisabled}
                        error={this.state.managedbyErr}
                        helperText={this.state.managedbyHelperText}
                        label="Managed By"
                        fullWidth
                      />
                    )}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={3}>
                  <FormControl fullWidth>
                    <Autocomplete
                      options={pickupCountry}
                      id="PickupCountry"
                      getOptionLabel={(option) =>
                        option.label ? option.label : option
                      }
                      value={selectedPickUPCountry}
                      autoSelect
                      autoComplete= "off" 
                      
                      onChange={(event, value) => this.FromCountry(value)}
                      renderInput={(params) => (
                        params.inputProps.autoComplete = 'new-password',
                        <TextField
                          {...params}
                          // error={this.state.pickupcountryErr}
                          // helperText={this.state.pickupcountryHelperText}
                          label="Pickup Country"
                          fullWidth
                        />
                      )}
                    />
                    <span
                      id="pickupcountry"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {this.state.pickupcountryHelperText}
                    </span>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <FormControl fullWidth>
                    <CustomInput
                      labelText="Pickupcity Zip"
                      // error={this.state.pickupcityzipErr}
                      // helperText={this.state.pickupcityzipHelperText}
                      id="pcityzip"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        value: PickupCityZip,
                        autoComplete: "none" ,
                        onBlur: (event) =>
                          this.handleZipChange(event, "pickupcityzip"),
                        onChange: (event) =>
                          this.handlechange(event, "pickupcityzip"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={useStyles.inputAdornment}
                          >
                            <Icon className={useStyles.User}>drafts</Icon>
                          </InputAdornment>
                        ),
                      }}
                      onFocus={() =>
                        this.setState({
                          pickupcityzipErr: false,
                          pickupcityzipHelperText: "",
                        })
                      }
                    />
                  </FormControl>
                  <span
                    id="pickupzip"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {this.state.pickupcityzipHelperText}
                  </span>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <FormControl fullWidth>
                    {this.state.PickupCityInput === true ? (
                      <CustomInput
                        // error={this.state.pickupcityErr}
                        // helperText={this.state.pickupcityHelperText}
                        labelText="Pickup City"
                        id="pcity"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{
                          value: PickupCity,
                          autoComplete : "none",
                          onBlur: (event) =>
                            this.handlechange(event, "pickupcity"),
                          onChange: (event) =>
                            this.handlechange(event, "pickupcity"),
                          onFocus: () =>
                            this.setState({
                              pickupcityErr: false,
                              pickupcityHelperText: "",
                            }),
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              className={useStyles.inputAdornment}
                            >
                              <Icon className={useStyles.User}>drafts</Icon>
                            </InputAdornment>
                          ),
                        }}
                      />
                    ) : (
                      <Autocomplete
                        {...pickupCity}
                        id="pcity"
                        value={PickupCity}
                        PickupCity
                        onChange={(event, value) =>
                          this.requestChange(event, value, "pickupcity")
                        }
                        renderInput={(params) => (
                          params.inputProps.autoComplete = "none",
                          <TextField
                            {...params}
                            label="Pickup City"
                            fullWidth
                          />
                        )}
                      />
                    )}
                  </FormControl>
                  <span
                    id="pickupcity"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {this.state.pickupcityHelperText}
                  </span>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  {this.state.fromStateAutoComplete === false ? (
                    <CustomInput
                      labelText="Pickup State"
                      id="pstate"
                      error={this.state.pickupstateErr}
                      helperText={this.state.pickupstateHelperText}
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        value: PickupState,
                        autoComplete:"none",
                        onChange: (event) =>
                          this.handlechange(event, "pickupstate"),
                        onBlur: (event) =>
                          this.handlechange(event, "pickupstate"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={useStyles.inputAdornment}
                          >
                            <Icon className={useStyles.User}>public</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    <Autocomplete
                      options={fromStateOptions}
                      id="toState"
                      autoSelect
                 
                      getOptionLabel={(option) => option.label}
                      value={PickupState}
                      onChange={(event, value) =>
                        this.requestChange(event, value, "pickupstate")
                      }
                      renderInput={(params) => (
                        params.inputProps.autoComplete = "none",
                        <TextField {...params} label="Pickup State" fullWidth />
                      )}
                    />
                  )}
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={3}>
                  <Autocomplete
                    options={dropoffCountry}
                    getOptionLabel={(option) =>
                      option.label ? option.label : option
                    }
                    id="DropoffCountry"
                    autoSelect
                    onChange={(event, value) => this.ToCountry(value)}
                    value={selectedDropoffCountry}
                    renderInput={(params) => (
                      params.inputProps.autoComplete = "none",
                      <TextField
                        {...params}
                        // error={this.state.dropoffcountryErr}
                        // helperText={this.state.dropoffcountryHelperText}
                        label="Dropoff Country"
                        fullWidth
                      />
                    )}
                  />
                  <span
                    id="dropoffcountry"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {this.state.dropoffcountryHelperText}
                  </span>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Dropoff Zip"
                    id="dcityzip"
                    // error={this.state.DropoffCityZipErr}
                    // helperText={this.state.DropoffCityZipHelperText}
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      value: DropoffCityZip,
                      autoComplete : "none",
                      onBlur: (event) =>
                        this.handleZipChange(event, "dropoffcityzip"),
                      onChange: (event) =>
                        this.handlechange(event, "dropoffcityzip"),
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          className={useStyles.inputAdornment}
                        >
                          {" "}
                          <Icon className={useStyles.User}>drafts</Icon>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <span
                    id="dropoffzipcode"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {this.state.DropoffCityZipHelperText}
                  </span>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  {this.state.DropoffCityInput === true ? (
                    <CustomInput
                      // error={this.state.dropoffcityErr}
                      // helperText={this.state.dropoffcityHelperText}
                      labelText="Dropoff City"
                      id="dcity"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        value: DropoffCity,
                        autoComplete:"none",
                        onBlur: (event) =>
                          this.handlechange(event, "dropoffcity"),
                        onChange: (event) =>
                          this.handlechange(event, "dropoffcity"),
                        onFocus: () =>
                          this.setState({
                            dropoffcityErr: false,
                            dropoffcityHelperText: "",
                          }),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={useStyles.inputAdornment}
                          >
                            <Icon className={useStyles.User}>drafts</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    <Autocomplete
                      {...dropoffCity}
                      id="dcity"
                      value={DropoffCity}
                      DropoffCity
                      onChange={(event, value) =>
                        this.requestChange(event, value, "dropoffcity")
                      }
                      renderInput={(params) => (
                        params.inputProps.autoComplete="none",
                        <TextField {...params} label="Dropoff City" fullWidth />
                      )}
                    />
                  )}
                  <span
                    id="dropoffcity"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {this.state.dropoffcityHelperText}
                  </span>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  {this.state.toStateAutoComplete === false ? (
                    <CustomInput
                      labelText="Dropoff State"
                      error={this.state.dropoffstateErr}
                      helperText={this.state.dropoffstateHelperText}
                      id="dstate"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        value: DropoffState,
                        autoComplete:"none",
                        onChange: (event) =>
                          this.handlechange(event, "dropoffstate"),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={useStyles.inputAdornment}
                          >
                            <Icon className={useStyles.User}>public</Icon>
                          </InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    <Autocomplete
                      options={toStateOptions}
                      id="toState"
                      autoSelect
                      getOptionLabel={(option) => option.label}
                      value={DropoffState}
                      onChange={(event, value) =>
                        this.requestChange(event, value, "dropoffstate")
                      }
                      renderInput={(params) => (
                        params.inputProps.autoComplete="none",
                        <TextField
                          {...params}
                          label="Dropoff State"
                          fullWidth
                        />
                      )}
                    />
                  )}
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          <Card className="z-index-9">
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <Edit />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">
                Sales Lead Information
              </h4>

              {this.state.newurl !== "" ? (
                <div className="lead-info-side">
                  <label>Lead From:</label>
                  <TextField disabled={true} value={this.state.newurl} />
                </div>
              ) : null}
            </CardHeader>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={3}>
                  <div className="select-spl">
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel
                        htmlFor="package_number"
                        className={classes.selectLabel}
                      >
                        Proposal Type
                      </InputLabel>
                      <Select
                        fullWidth={true}  
                        // id="package_number"
                        name="package_number"
                        value={ProposalType}
                        onFocus={() =>
                          this.setState({
                            ProposalTypeErr: false,
                            ProposalTypeError: "",
                          })
                        }
                        onChange={(event, value) =>
                          this.requestChange(event, value, "proposaltype")
                        }
                      >
                        {this.Proposaltype()}
                      </Select>
                    </FormControl>
                    <span
                      id="proposalTypeerror"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {this.state.ProposalTypeError}
                    </span>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <div className="date-input">
                    <InputLabel className={classes.label}>
                      Tentative Date
                    </InputLabel>
                    <FormControl fullWidth>
                      <Datetime
                        //dateFormat={"DD/MM/YYYY"}
                        inputProps={{ placeholder: "" }}
                        calendarIcon="true"
                        selected={moment(this.state.TentativeDate)}
                        value={moment(this.state.TentativeDate)}
                        timeFormat={false}
                        onChange={(date) => this.handleTentativeDate(date)}
                        closeOnSelect={true}
                      />
                      <Icon className="date-icon">date_range</Icon>
                    </FormControl>
                  </div>
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <FormControl fullWidth>
                    <Autocomplete
                      {...deliverytype}
                      id="deliverytype"
                      value={this.state.DeliveryType}
                      onChange={(event, value) =>
                        this.requestChange(event, value, "deliverytype")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Delivery Type"
                          fullWidth
                        />
                      )}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  
                    <FormControl fullWidth>
                      <Autocomplete
                      {...referredby}
                      id="referredby"
                      value={this.state.ReferredBy}
                      onChange={(event, value) =>
                        this.requestChange(event, value, "referredby")
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Referred by" fullWidth />
                      )}
                    />
                      {/* <InputLabel
                        htmlFor="package_number"
                        className={classes.selectLabel}
                      >
                        Referred by
                      </InputLabel> */}

                      {/* <Autocomplete
                      {...deliverytype}
                      id="referredby"
                      value={ReferredBy}
                      onChange={(event, value) =>
                        this.requestChange(event, value, "referredby")
                      }
                      onFocus={() =>
                        this.setState({
                          Referrederr: false,
                          Referrederror: "",
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Referred by"
                          fullWidth
                        />
                      )}
                    /> */}
                      {/* <Select
                        fullWidth={true}
                        // id="package_number"
                        name="referredby"
                        value={ReferredBy}
                        onChange={(event, value) =>
                          this.requestChange(event, value, "referredby")
                        }
                        onFocus={() =>
                          this.setState({
                            Referrederr: false,
                            Referrederror: "",
                          })
                        }
                      >
                        {this.ReferredbyOption()}
                      </Select> */}

                      <span
                        id="referrederror"
                        style={{ color: "red", fontSize: "12px" }}
                      >
                        {this.state.Referrederror}
                      </span>
                    </FormControl>
                  {/* </div> */}
                </GridItem>
              </GridContainer>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={3}>
                  <div className="date-input with-icon">
                    <InputLabel className={classes.label}>Lead Date</InputLabel>
                    <FormControl fullWidth>
                      <Datetime
                        //dateFormat={"DD/MM/YYYY"}
                        value={moment(this.state.LeadDate)}
                        timeFormat={false}
                        selected={moment(this.state.LeadDate)}
                        inputProps={{ placeholder: "Lead Date" }}
                        onChange={this.handleLeadDateChange}
                        isValidDate={valid}
                        closeOnSelect={true}
                      />
                      <Icon className="date-icon">date_range</Icon>
                    </FormControl>
                  </div>
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <div className="date-input with-icon">
                    <InputLabel className={classes.label}>
                      Followup Date
                    </InputLabel>
                    <FormControl fullWidth>
                      <Datetime
                        //dateFormat={"DD/MM/YYYY"}
                        value={moment(this.state.StartDate)}
                        timeFormat={false}
                        // onFocus={() =>
                        //   this.setState({
                        //     Followuprr: false,
                        //     Followuprror: "",
                        //   })
                        // }
                        selected={moment(this.state.StartDate)}
                        //inputProps={{ placeholder: "Followup Date" }}
                        onChange={this.handleDateChange}
                        isValidDate={valid}
                        closeOnSelect={true}
                      />
                      <Icon className="date-icon">date_range</Icon>
                    </FormControl>
                    <span
                      id="followuprror"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {this.state.Followuprror}
                    </span>
                  </div>
                </GridItem>

                <GridItem xs={12} sm={12} md={3}>
                  <FormControl className={classes.formControl} fullWidth>
                    <Autocomplete
                      {...proposalstatus}
                      id="Proposal Status"
                      value={ProposalStatus}
                      onChange={(event, value) =>
                        this.requestChange(event, value, "proposalstatus")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={this.state.proposalstatusErr}
                          helperText={this.state.proposalstatusHelperText}
                          label="Proposal Status"
                          fullWidth
                        />
                      )}
                    />
                  </FormControl>
                </GridItem>
                {this.state.ProposalStatus === "Cancelled" ? (
                  <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl} fullWidth>
                      <Autocomplete
                        options={cancelationReasonList}
                        id="Cancelation Reason"
                        value={CancelationReason}
                        getOptionLabel={(option) => option.value}
                        onChange={(event, value) =>
                          this.requestChange(event, value, "CancelationReason")
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.CancelationReasonErr}
                            helperText={this.state.CancelationReasonHelperText}
                            label="Cancellation Reason"
                            fullWidth
                          />
                        )}
                      />
                    </FormControl>
                  </GridItem>
                ) : 
                
                this.state.ProposalStatus === "Booked" ? (
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput className={classes.formControl} fullWidth
                    labelText={`Tracking Number`}
                    id="trackingNumber "
                    // error={this.state.emailaddressErr}
                    // helperText={this.state.emailaddressHelperText}
                    formControlProps={{ fullWidth: true }}
                    inputProps={{
                      value: trackingNumber,
                      
                      onChange: (event) =>
                        this.handleOnChange(event, "trackingNumber"),
                      onFocus: () =>
                        this.setState({
                          trackingNumberCheck: false,
                          trackingNumberErr: false,
                          trackingNumberHelperText: "",
                        }),
                      onBlur: (event) =>
                        this.handlechange(event, "trackingNumber"),
                      
                    }}
                  />
                  <span id="cemail" style={{ color: "red", fontSize: "12px" }}>
                    {this.state.trackingNumberHelperText}
                  </span>
                  </GridItem>
                ) : 

                this.state.ProposalStatus == "Closed"?(

                 <GridItem xs={12} sm={12} md={3}>
                    <FormControl className={classes.formControl} fullWidth>
                      <Autocomplete
                        options={closedReasonList}
                        id="Cancelation Reason"
                        value={CancelationReason}
                        getOptionLabel={(option) => option.value}
                        onChange={(event, value) =>
                          this.requestChange(event, value, "CancelationReason")
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={this.state.CancelationReasonErr}
                            helperText={this.state.CancelationReasonHelperText}
                            label="Closed Reason"
                            fullWidth
                          />
                        )}
                      />
                    </FormControl>
                  </GridItem>

                ) :

                (
                  <GridItem xs={12} sm={12} md={3}></GridItem>
                )}

                
                {/* <GridItem xs={12} sm={12} md={3}>
                  <FormControl fullWidth>
                    <CustomInput
                      labelText="Lead From"
                      id="leadfrom"
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        value: this.state.newurl,
                        disabled: true,
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={useStyles.inputAdornment}
                          ></InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>
                </GridItem> */}
              </GridContainer>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <Package />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">
                Package Details
              </h4>

              <div style={{ textAlign: "right", marginTop: "12px" }}>
                <Button
                  color="rose"
                  onClick={() => this.GetRateData()}
                  size="sm"
                >
                  Get Rate
                </Button>

                {this.state.CarList.filter((x) => x.Status === "Active")
                  .length === 0 ? (
                  // <i onClick={() => this.showDiv("IsCarVisible","Car")} class="fas fa-car"></i>
                  <img
                    style={{ width: "32px", marginLeft: "20px" }}
                    src={carSVG}
                    onClick={() => this.showDiv("IsCarVisible", "Car")}
                  />
                ) : null}
                {this.state.TVList.filter((x) => x.Status === "Active")
                  .length === 0 ? (
                  // <i onClick={() => this.showDiv("IsTvVisible","TV")} class="fas fa-tv"></i>
                  <img
                    style={{ width: "32px", marginLeft: "20px" }}
                    src={tvSVG}
                    onClick={() => this.showDiv("IsTvVisible", "TV")}
                  />
                ) : null}
                {this.state.PackageList.filter((x) => x.Status === "Active")
                  .length === 0 ? (
                  // <i onClick={() => this.showDiv("IsPackageVisible","Package")} class="fas fa-box"></i>
                  <img
                    style={{ width: "32px", marginLeft: "20px" }}
                    src={packageSVG}
                    onClick={() => this.showDiv("IsPackageVisible", "Package")}
                  />
                ) : null}

                <span
                  id="PackageType"
                  class="PackageErr"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {this.state.PackageListError}
                </span>
              </div>
            </CardHeader>
            <CardBody>
              {IsPackageVisible ? (
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="package-table no-scroll">
                      <table className="tablelayoutfix">
                        <thead>
                          <tr>
                            <th>Quantity</th>
                            <th>Package Type</th>
                            {/* <th>Actual Weight [Lbs.]</th> */}
                            <th>
                              <div className="with-drp">
                                Actual Weight
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <Select
                                    fullWidth={true}
                                    MenuProps={{
                                      className: classes.selectMenu,
                                    }}
                                    classes={{ select: classes.select }}
                                    onChange={(event) =>
                                      this.changeWeightType(event)
                                    }
                                    value={this.state.SelectedWeightType}
                                    inputProps={{
                                      name: "residential?",
                                      id: "packagetype",
                                    }}
                                    defaultValue="LB"
                                  >
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem,
                                        selected:
                                          classes.selectMenuItemSelected,
                                      }}
                                      value="LB"
                                    >
                                      {" "}
                                      LB{" "}
                                    </MenuItem>
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem,
                                        selected:
                                          classes.selectMenuItemSelected,
                                      }}
                                      value="KG"
                                    >
                                      {" "}
                                      KG{" "}
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                            </th>
                            <th colspan="3">
                              <div className="with-drp">
                                Package Dimension {this.state.dimenstionType}{" "}
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <Select
                                    //   fullWidth={true}
                                    disabled={true}
                                    MenuProps={{
                                      className: classes.selectMenu,
                                    }}
                                    classes={{ select: classes.select }}
                                    onChange={(event) =>
                                      this.changeWeightType(event)
                                    }
                                    value={this.state.SelectedDimensitionType}
                                    inputProps={{
                                      name: "residential?",
                                      id: "packagetype",
                                    }}
                                    defaultValue={
                                      this.state.SelectedDimensitionType
                                    }
                                  >
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem,
                                        selected:
                                          classes.selectMenuItemSelected,
                                      }}
                                      value="Inches"
                                    >
                                      {" "}
                                      Inches{" "}
                                    </MenuItem>
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem,
                                        selected:
                                          classes.selectMenuItemSelected,
                                      }}
                                      value="CM"
                                    >
                                      {" "}
                                      CM{" "}
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                            </th>
                            <th>
                              {" "}
                              <div className="with-drp">
                                <span className="nowrap">Ch. Weight </span>
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                ></FormControl>
                              </div>
                            </th>
                            <th>CFT</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>{this.viewPackages()}</tbody>
                      </table>
                    </div>
                  </GridItem>
                </GridContainer>
              ) : null}
              {IsCarVisible ? (
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="package-table no-scroll">
                      <table className="tablelayoutfix">
                        <thead>
                          <tr>
                            <th>Car Quantity</th>
                            <th colSpan={2}>Car Make</th>
                            <th colspan={3}>Car Model</th>
                            <th colspan={2}>Car Year</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>{this.viewCarList()}</tbody>
                      </table>
                    </div>
                  </GridItem>
                </GridContainer>
              ) : null}
              {IsTvVisible ? (
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="package-table no-scroll">
                      <table className="tablelayoutfix">
                        <thead>
                          <tr>
                            <th>TV Make</th>
                            <th>TV Model</th>
                            {/* <th>Actual Weight [Lbs.]</th> */}
                            <th>
                              <div className="with-drp">
                                Actual Weight
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <Select
                                    fullWidth={true}
                                    MenuProps={{
                                      className: classes.selectMenu,
                                    }}
                                    classes={{ select: classes.select }}
                                    onChange={(event) =>
                                      this.changeWeightType(event)
                                    }
                                    value={this.state.SelectedWeightType}
                                    inputProps={{
                                      name: "residential?",
                                      id: "packagetype",
                                    }}
                                    defaultValue="LB"
                                  >
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem,
                                        selected:
                                          classes.selectMenuItemSelected,
                                      }}
                                      value="LB"
                                    >
                                      {" "}
                                      LB{" "}
                                    </MenuItem>
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem,
                                        selected:
                                          classes.selectMenuItemSelected,
                                      }}
                                      value="KG"
                                    >
                                      {" "}
                                      KG{" "}
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                            </th>
                            <th colspan="3">
                              <div className="with-drp">
                                Package Dimension {this.state.dimenstionType}{" "}
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <Select
                                    //   fullWidth={true}
                                    disabled={true}
                                    MenuProps={{
                                      className: classes.selectMenu,
                                    }}
                                    classes={{ select: classes.select }}
                                    onChange={(event) =>
                                      this.changeWeightType(event)
                                    }
                                    value={this.state.SelectedDimensitionType}
                                    inputProps={{
                                      name: "residential?",
                                      id: "packagetype",
                                    }}
                                    defaultValue={
                                      this.state.SelectedDimensitionType
                                    }
                                  >
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem,
                                        selected:
                                          classes.selectMenuItemSelected,
                                      }}
                                      value="Inches"
                                    >
                                      {" "}
                                      Inches{" "}
                                    </MenuItem>
                                    <MenuItem
                                      classes={{
                                        root: classes.selectMenuItem,
                                        selected:
                                          classes.selectMenuItemSelected,
                                      }}
                                      value="CM"
                                    >
                                      {" "}
                                      CM{" "}
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                            </th>
                            <th>
                              {" "}
                              <div className="with-drp">
                                <span className="nowrap">Ch. Weight </span>
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                ></FormControl>
                              </div>
                            </th>
                            <th>CFT</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>{this.viewTVList()}</tbody>
                      </table>
                    </div>
                  </GridItem>
                </GridContainer>
              ) : null}
            </CardBody>
          </Card>

          {this.state.finalGetResults.length ? (
            <Card>
              <CardHeader className="btn-right-outer" color="primary" icon>
                <CardIcon color="primary">
                  <AttachMoneyIcon />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">
                  Rate Details
                </h4>
                <div style={{ textAlign: "right", marginTop: "12px" }}>
                  <Button
                    size="sm"
                    color="success"
                    onClick={() =>
                      this.sendGetRateEmail(this.state.finalGetResults)
                    }
                  >
                    Send Email
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="package-table">
                      <table>
                        <thead>
                          <tr>
                            <th style={{ width: "50%" }}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    // checked={
                                    //   this.state.finalGetResults.filter(
                                    //     (x) => x.Checked === true
                                    //   ).length
                                    //     ? true
                                    //     : false
                                    // }
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
                              Service Type
                            </th>
                            <th style={{ width: "25%" }}>Delivery Date</th>
                            <th
                              style={{ width: "15%" }}
                              className="tbl-align-right"
                            >
                              Rates
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {finalGetResults.map((data, key) => {
                            const { Checked, ServiceDisplayName } = data;
                            return (
                              <tr key={key}>
                                <td>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        // checked={
                                        //   this.state.finalGetResults.filter(
                                        //     (x) => x.Checked === true
                                        //   ).length
                                        //     ? true
                                        //     : false
                                        // }
                                        checked={
                                          Checked === true ? true : false
                                        }
                                        name={ServiceDisplayName}
                                        onChange={(event) =>
                                          this.handleInputChange(event, "Read")
                                        }
                                      />
                                    }
                                    classes={{
                                      label: classes.label,
                                      root: classes.labelRoot,
                                    }}
                                  />
                                  {data.ServiceDisplayName}
                                </td>
                                <td>{data.Delivery_Date}</td>
                                <td className="tbl-align-right">
                                  {data.Rates != 0
                                    ? this.state.setCurrencyIconLabel + new Intl.NumberFormat().format(Math.ceil(data.Rates))
                                    : "Call for Rates"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          ) : this.state.finalOceanResult.length ? (
            <Card>
              <CardHeader className="btn-right-outer" color="primary" icon>
                <CardIcon color="primary">
                  <AttachMoneyIcon />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">
                  Rate Details
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="package-table">
                      {this.state.GetRateAllAccess === 1 ? (
                        <table>
                          <thead>
                            <tr>
                              <th></th>
                              <th className="align-center" colSpan="2">
                                {this.state.finalOceanResult[0].col0.label}
                              </th>
                              {this.state.finalOceanResult?.[0]?.col1?.label ? (
                                <th className="align-center" colSpan="2">
                                  {this.state.finalOceanResult[0].col1.label}
                                </th>
                              ) : (
                                ""
                              )}

                              {this.state.finalOceanResult[0].col2 !=
                              undefined ? (
                                <th className="align-center" colSpan="2">
                                  {this.state.finalOceanResult[0].col2.label}
                                </th>
                              ) : null}
                            </tr>
                            <tr>
                              <th width="40%">Services</th>
                              {this.state.finalOceanResult?.[0]?.col0?.label ? (
                                <th className="wd-150">Cost</th>
                              ) : (
                                ""
                              )}
                              {this.state.finalOceanResult?.[0]?.col0?.label ? (
                                <th className="wd-150">Rate</th>
                              ) : (
                                ""
                              )}
                              {this.state.finalOceanResult?.[0]?.col1?.label ? (
                                <th className="wd-150">Cost</th>
                              ) : (
                                ""
                              )}
                              {this.state.finalOceanResult?.[0]?.col1?.label ? (
                                <th className="wd-150">Rate</th>
                              ) : (
                                ""
                              )}
                              {this.state.finalOceanResult?.[0]?.col2?.label ? (
                                <th className="wd-150">Cost</th>
                              ) : (
                                ""
                              )}
                              {this.state.finalOceanResult?.[0]?.col2?.label ? (
                                <th className="wd-150">Rate</th>
                              ) : (
                                ""
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.finalOceanResult.map((data, key) => {
                              if (data.IsError) {
                                return (
                                  <tr key={key}>
                                    <td> {data.Service}</td>
                                    <td style={{ color: "red" }}>
                                      {" "}
                                      Error ({data.col0.costPrice})
                                    </td>
                                    <td style={{ color: "red" }}>
                                      {" "}
                                      Error ({data.col0.Rate})
                                    </td>
                                    <td style={{ color: "red" }}>
                                      {" "}
                                      Error ({data.col1.costPrice})
                                    </td>
                                    <td style={{ color: "red" }}>
                                      {" "}
                                      Error ({data.col1.Rate})
                                    </td>
                                  </tr>
                                );
                              } else {
                                return (
                                  console.log(
                                    "checkCostData",
                                    data?.col0?.costPrice
                                  ),
                                  console.log(
                                    "checkCostData1",
                                    data?.col1?.costPrice
                                  ),
                                  console.log("checkCostData2", data.col2),
                                  (
                                    <tr key={key}>
                                      {data?.Service ? (
                                        <td> {data.Service}</td>
                                      ) : (
                                        ""
                                      )}
                                      {data?.col0?.costPrice ? (
                                        <td>$ {data.col0.costPrice}</td>
                                      ) : (
                                        ""
                                      )}
                                      {data?.col0?.Rate ? (
                                        <td>$ {data.col0.Rate}</td>
                                      ) : (
                                        ""
                                      )}
                                      {data?.col1?.costPrice ? (
                                        <td>$ {data.col1.costPrice}</td>
                                      ) : (
                                        ""
                                      )}
                                      {data?.col1?.Rate ? (
                                        <td>$ {data.col1.Rate}</td>
                                      ) : (
                                        ""
                                      )}
                                      {data?.col2?.costPrice ? (
                                        <td>$ {data.col2.costPrice}</td>
                                      ) : (
                                        ""
                                      )}
                                      {data?.col2?.Rate ? (
                                        <td>$ {data.col2.Rate}</td>
                                      ) : (
                                        ""
                                      )}
                                    </tr>
                                  )
                                );
                              }
                            })}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td>
                                <b>Total</b>
                              </td>

                              {this.state.DallasCostToal === "0.00" ? (
                                ""
                              ) : (
                                <td>
                                  <b>{this.state.DallasCostToal}</b>
                                </td>
                              )}

                              {this.state.DallasTotal === "0.00" ? (
                                ""
                              ) : (
                                <td>
                                  <b>{this.state.DallasTotal}</b>
                                </td>
                              )}

                              {this.state.SecaucusCostTotal === "0.00" ? (
                                ""
                              ) : (
                                <td>
                                  <b>{this.state.SecaucusCostTotal}</b>
                                </td>
                              )}

                              {this.state.SecaucusTotal === "0.00" ? (
                                ""
                              ) : (
                                <td>
                                  <b>{this.state.SecaucusTotal}</b>
                                </td>
                              )}

                              {this.state.HaywardCostTotal === "0.00" ? (
                                ""
                              ) : (
                                <td>
                                  <b>{this.state.HaywardCostTotal}</b>
                                </td>
                              )}

                              {this.state.HaywardTotal === "0.00" ? (
                                ""
                              ) : (
                                <td>
                                  <b>{this.state.HaywardTotal}</b>
                                </td>
                              )}
                            </tr>

                            <tr>
                              <td className="p0"></td>
                              <td className="p0"></td>
                              <td className="p0">
                                <Button
                                  color="rose"
                                  onClick={() =>
                                    this.createProposal(
                                      "HaywardTotal",
                                      this.state.DallasTotal
                                    )
                                  }
                                  size="sm"
                                >
                                  Create Proposal
                                </Button>
                              </td>
                              <td className="p0"></td>
                              <td className="p0">
                                <Button
                                  color="rose"
                                  onClick={() =>
                                    this.createProposal(
                                      "SecaucusTotal",
                                      this.state.SecaucusTotal
                                    )
                                  }
                                  size="sm"
                                >
                                  Create Proposal
                                </Button>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      ) : (
                        ///
                        <table>
                          <thead>
                            <tr>
                              <th width="40%">Services</th>
                              {this.state.finalOceanResult?.[0]?.col0?.label ? (
                                <th>
                                  {this.state.finalOceanResult[0].col0.label}
                                </th>
                              ) : (
                                ""
                              )}
                              {this.state.finalOceanResult?.[0]?.col1?.label ? (
                                <th>
                                  {this.state.finalOceanResult[0].col1.label}
                                </th>
                              ) : (
                                ""
                              )}
                              {this.state.finalOceanResult?.[0]?.col2?.label ? (
                                <th>
                                  {this.state.finalOceanResult[0].col2.label}
                                </th>
                              ) : (
                                ""
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.finalOceanResult.map((data, key) => {
                              if (data.IsError) {
                                return (
                                  <tr key={key}>
                                    <td>{data.Service}</td>
                                    <td style={{ color: "red" }}>
                                      {" "}
                                      Error ({data.col0.Rate})
                                    </td>
                                    <td style={{ color: "red" }}>
                                      {" "}
                                      Error ({data.col1.Rate})
                                    </td>
                                  </tr>
                                );
                              } else {
                                return (
                                  <tr key={key}>
                                    <td>{data.Service}</td>
                                    {data?.col0?.Rate ? (
                                      <td>$ {data.col0.Rate}</td>
                                    ) : (
                                      ""
                                    )}
                                    {data?.col1?.Rate ? (
                                      <td>$ {data.col1.Rate}</td>
                                    ) : (
                                      ""
                                    )}
                                    {data?.col2?.Rate ? (
                                      <td>$ {data.col2.Rate}</td>
                                    ) : (
                                      ""
                                    )}
                                  </tr>
                                );
                              }
                            })}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td>
                                <b>Total</b>
                              </td>
                              {this.state?.DallasTotal === "0.00" ? (
                                ""
                              ) : (
                                <td>
                                  <b>{this.state.DallasTotal}</b>
                                </td>
                              )}

                              {this.state?.SecaucusTotal === "0.00" ? (
                                ""
                              ) : (
                                <td>
                                  {/* //kruti */}

                                  <b>{this.state.SecaucusTotal}</b>
                                </td>
                              )}

                              {this.state?.HaywardTotal === "0.00" ? (
                                ""
                              ) : (
                                <td>
                                  <b>{this.state.HaywardTotal}</b>
                                </td>
                              )}
                            </tr>
                            <tr>
                              <td className="p0"></td>
                              <td className="p0">
                                <Button
                                  color="rose"
                                  onClick={() =>
                                    this.createProposal(
                                      "HaywardTotal",
                                      this.state.DallasTotal
                                    )
                                  }
                                  size="sm"
                                >
                                  Create Proposal
                                </Button>
                              </td>
                              <td className="p0">
                                <Button
                                  color="rose"
                                  onClick={() =>
                                    this.createProposal(
                                      "SecaucusTotal",
                                      this.state.SecaucusTotal
                                    )
                                  }
                                  size="sm"
                                >
                                  Create Proposal
                                </Button>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      )}
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          ) : null}

          {/* propsal  start*/}
          {this.state.ProposalType === 2 &&
          this.state.selectedDropoffCountry.value === 89 ? (
            <Card>
              <CardHeader className="btn-right-outer" color="primary" icon>
                <CardIcon color="primary">
                  <DescriptionIcon />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">
                  Shipping Proposals - LCL
                </h4>
                {this.state.proposalclick === false ? (
                  //  ||
                  // this.state.getrateClick === false
                  <div style={{ textAlign: "center", marginTop: "12px" }}>
                    <Button
                      color="rose"
                      onClick={() => this.createProposal("click", "")}
                      size="sm"
                    >
                      Create New Proposal
                    </Button>
                  </div>
                ) : null}
              </CardHeader>
              <CardBody>
                {this.state.ViewProposalList.length > 0 ? (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <div className="package-table no-scroll">
                        <table className="tablelayoutfix proposalrow">
                          <thead>
                            <tr>
                              <th>Date</th>

                              <th>CFT </th>
                              <th>Per CFT</th>
                              <th>Total</th>
                              <th>Packing Charges</th>
                              <th>Pickup Charges</th>
                              <th>Log</th>
                              <th>Created By</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>{this.viewProposalList()}</tbody>
                        </table>
                      </div>
                    </GridItem>
                  </GridContainer>
                ) : null}
                {this.state.propsalTabOpen ? (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <h4>Create New Proposal</h4>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <CustomInput
                              type="number"
                              labelText="Total CFT"
                              name="TotalCFT"
                              id="TotalCFT"
                              // value={this.state.CreateProposal.TotalCFT}
                              inputProps={{
                                onChange: (event) => {
                                  this.ProposalonChange(event, "TotalCFT");
                                },
                                value: this.state.CreateProposal.TotalCFT,
                              }}
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <CustomInput
                              type="number"
                              labelText="Shipping Cost per CFT"
                              name="ShippingCostperCFT"
                              id="ShippingCostperCFT"
                              // value={
                              //   this.state.CreateProposal.ShippingCostperCFT
                              // }
                              inputProps={{
                                onChange: (event) => {
                                  this.ProposalonChange(
                                    event,
                                    "ShippingCostperCFT"
                                  );
                                },
                                onblur: (event) => {
                                  this.ProposalonChange(
                                    event,
                                    "ShippingCostperCFT"
                                  );
                                },
                                value: this.state.CreateProposal
                                  .ShippingCostperCFT,
                              }}
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <CustomInput
                              type="number"
                              labelText="Est. Shipping Cost"
                              name="EstimatedShippingCost "
                              id="EstimatedShippingCost"
                              inputProps={{
                                onChange: (event) => {
                                  this.ProposalonChange(
                                    event,
                                    "EstimatedShippingCost"
                                  );
                                },
                                value: this.state.CreateProposal
                                  .EstimatedShippingCost,
                                disabled: true,
                              }}
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <div className="proposal-select spl">
                            <InputLabel
                              htmlFor="selectshipmenttype"
                              className={classes.selectLabel}
                            >
                              Service Type
                            </InputLabel>
                            <Select
                              id="ServiceType"
                              name="ServiceType"
                              text="ServiceType"
                              className="form-control"
                              value={this.state.CreateProposal.ServiceType}
                              onChange={(event) =>
                                this.ProposalonChange(event, "ServiceType")
                              }
                            >
                              {this.serviceDropdown()}
                            </Select>
                          </div>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={3} md={3}>
                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <CustomInput
                              type="number"
                              labelText="Add. CFT Upto "
                              name="AdditionalCFT"
                              id="AdditionalCFT"
                              // value={this.state.CreateProposal.AdditionalCFT}
                              inputProps={{
                                onChange: (event) => {
                                  this.ProposalonChange(event, "AdditionalCFT");
                                },
                                value: this.state.CreateProposal.AdditionalCFT,
                              }}
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={3} md={3}>
                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <CustomInput
                              type="number"
                              labelText="Add. CFT Charges"
                              name="AdditionalCFTCharges"
                              id="AdditionalCFTCharges"
                              // value={
                              //   this.state.CreateProposal.AdditionalCFTCharges
                              // }
                              inputProps={{
                                onChange: (event) => {
                                  this.ProposalonChange(
                                    event,
                                    "AdditionalCFTCharges"
                                  );
                                },
                                value: this.state.CreateProposal
                                  .AdditionalCFTCharges,
                              }}
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={3} md={3}>
                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <CustomInput
                              type="number"
                              labelText="THC per CFT"
                              name="THCChargesperCFT"
                              id="THCChargesperCFT"
                              // value={this.state.CreateProposal.THCChargesperCFT}
                              inputProps={{
                                onChange: (event) => {
                                  this.ProposalonChange(
                                    event,
                                    "THCChargesperCFT"
                                  );
                                },
                                value: this.state.CreateProposal
                                  .THCChargesperCFT,
                              }}
                            />
                          </FormControl>
                        </GridItem>
                      </GridContainer>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                          <GridContainer className="plr-slam">
                            <GridItem xs={8} sm={8} md={8}>
                              <FormControl
                                className={classes.formControl}
                                fullWidth
                              >
                                <CustomInput
                                  type="number"
                                  labelText="Packing Charges"
                                  name="PackingCharges"
                                  id="PackingCharges"
                                  // value={
                                  //   this.state.CreateProposal.PackingCharges
                                  // }
                                  inputProps={{
                                    onChange: (event) => {
                                      this.ProposalonChange(
                                        event,
                                        "PackingCharges"
                                      );
                                    },
                                    value: this.state.CreateProposal
                                      .PackingCharge,
                                  }}
                                />
                              </FormControl>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                              <div className="proposal-select">
                                <Select
                                  id="PackingChargestype"
                                  name="PackingChargestype"
                                  className="form-control"
                                  value={
                                    this.state.CreateProposal.PackingChargestype
                                  }
                                  onChange={(event) =>
                                    this.ProposalonChange(
                                      event,
                                      "PackingChargestype"
                                    )
                                  }
                                >
                                  {this.ChargesDropdown()}
                                </Select>
                              </div>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <GridContainer className="plr-slam">
                            <GridItem xs={8} sm={8} md={8}>
                              <FormControl
                                className={classes.formControl}
                                fullWidth
                              >
                                <CustomInput
                                  type="number"
                                  labelText="Minimum Packing"
                                  name="MinimumPackingCharges"
                                  id="MinimumPackingCharges"
                                  inputProps={{
                                    onChange: (event) => {
                                      this.ProposalonChange(
                                        event,
                                        "MinimumPackingCharges"
                                      );
                                    },
                                    value: this.state.CreateProposal
                                      .MinimumPackingCharges,
                                  }}
                                />
                              </FormControl>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                              <div className="proposal-select">
                                <Select
                                  id="PackingMinimumtype"
                                  name="PackingMinimumtype"
                                  className="form-control"
                                  value={
                                    this.state.CreateProposal.PackingMinimumtype
                                  }
                                  onChange={(event) =>
                                    this.ProposalonChange(
                                      event,
                                      "PackingMinimumtype"
                                    )
                                  }
                                >
                                  {this.MinimumChargesDropdown()}
                                </Select>
                              </div>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <GridContainer className="plr-slam">
                            <GridItem xs={8} sm={8} md={8}>
                              <FormControl
                                className={classes.formControl}
                                fullWidth
                              >
                                <CustomInput
                                  type="number"
                                  labelText="Pickup Charges"
                                  name="PickupCharges"
                                  id="PickupCharges"
                                  inputProps={{
                                    onChange: (event) => {
                                      this.ProposalonChange(
                                        event,
                                        "PickupCharges"
                                      );
                                    },
                                    value: this.state.CreateProposal
                                      .pickUpChange,
                                  }}
                                />
                              </FormControl>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                              <div className="proposal-select">
                                <Select
                                  id="PickupChargestype"
                                  name="PickupChargestype"
                                  className="form-control"
                                  value={
                                    this.state.CreateProposal.PickupChargestype
                                  }
                                  onChange={(event) =>
                                    this.ProposalonChange(
                                      event,
                                      "PickupChargestype"
                                    )
                                  }
                                >
                                  {this.ChargesDropdown()}
                                </Select>
                              </div>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <GridContainer className="plr-slam">
                            <GridItem xs={8} sm={8} md={8}>
                              <FormControl
                                className={classes.formControl}
                                fullWidth
                              >
                                <CustomInput
                                  type="number"
                                  labelText="Minimum Pickup"
                                  name="MinimumPickupCharges"
                                  id="MinimumPickupCharges"
                                  inputProps={{
                                    onChange: (event) => {
                                      this.ProposalonChange(
                                        event,
                                        "MinimumPickupCharges"
                                      );
                                    },
                                    value: this.state.CreateProposal
                                      .MinimumPickupCharges,
                                  }}
                                />
                              </FormControl>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                              <div className="proposal-select">
                                <Select
                                  id="PickupMinimumtype"
                                  name="PickupMinimumtype"
                                  className="form-control"
                                  value={
                                    this.state.CreateProposal.PickupMinimumtype
                                  }
                                  onChange={(event) =>
                                    this.ProposalonChange(
                                      event,
                                      "PickupMinimumtype"
                                    )
                                  }
                                >
                                  {this.MinimumChargesDropdown()}
                                </Select>
                              </div>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>

                      <GridContainer className="mt-20">
                        <GridItem xs={12} sm={12} md={12}>
                          <h4>Include / Exclude Terms</h4>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <div className="termlist-table-wrap">
                                <div className="terms-list-table">
                                  <table className="tlt-main-table tablelayoutfix">
                                    <tr>
                                      <td>
                                        <table className="tablelayoutfix proposal-main-table">
                                          <thead>
                                            <tr>
                                              <th className="align-left">
                                                {" "}
                                                Action
                                              </th>
                                              <th className="textalign-left">
                                                Include
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {this.viewTerms()}
                                            <tr>
                                              <td className="align-left"></td>
                                              <td className="align-left"></td>
                                            </tr>
                                            <tr>
                                              <td className="align-left"></td>
                                              <td className="align-left"></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                      <td>
                                        <table className="tablelayoutfix proposal-main-table">
                                          <thead>
                                            <tr>
                                              <th className="align-left">
                                                {" "}
                                                Action
                                              </th>
                                              <th className="textalign-left">
                                                Exclude
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {this.viewexcludeTerms()}
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <h5>Comments</h5>
                              <div className="table-textarea">
                                <textarea
                                  name="Comment"
                                  label="Comment"
                                  value={
                                    this.state.CreateProposal.ProposalComment
                                  }
                                  onChange={(event) =>
                                    this.ProposalonChange(
                                      event,
                                      "PropsalComment"
                                    )
                                  }
                                ></textarea>
                              </div>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>

                      <Button
                        color="secondary"
                        onClick={() => this.CancelProposal()}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => this.CreateAddProposal()}
                      >
                        Create Proposal
                      </Button>
                    </GridItem>
                  </GridContainer>
                ) : null}
              </CardBody>
            </Card>
          ) : null}

          {this.props.history.location.state.id !== "" &&
          this.state.CommuncationList.length > 0 ? (
            <Card>
              <CardHeader className="btn-right-outer" color="primary" icon>
                <CardIcon color="primary">
                  <AssignmentIcon />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">
                  Communication
                </h4>
              </CardHeader>
              <CardBody className="shipment-cardbody">
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="custom-react-table">
                      <ReactTable
                        data={CommuncationList}
                        sortable={true}
                        filterable={true}
                        resizable={false}
                        minRows={2}
                        columns={correspondenceColumns}
                        defaultPageSize={10}
                        align="left"
                        className="-striped -highlight"
                      />
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          ) : null}
          {this.props.history.location.state.id !== "" ? (
            <Card>
              <CardHeader className="btn-right-outer" color="primary" icon>
                <CardIcon color="primary">
                  <Note />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">Notes</h4>
                {!this.state.notesShow ? (
                  <Button
                    color="primary"
                    size="sm"
                    onClick={(event) => this.setState({ notesShow: true })}
                  >
                    Open
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    size="sm"
                    onClick={(event) => this.setState({ notesShow: false })}
                  >
                    Close
                  </Button>
                )}
              </CardHeader>
              <CardBody>
                {this.state.notesShow ? (
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <div className="package-table">
                        <table>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Comments</th>
                              <th>Attachment</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>{this.viewNotes()}</tbody>
                        </table>
                      </div>
                    </GridItem>
                  </GridContainer>
                ) : null}
              </CardBody>
            </Card>
          ) : null}
          <div className="shipment-submit">
            <div className="left">
              {this.props.history.location.state.id !== "" &&
              DeleteAccess === 1 ? (
                <Button color="danger" onClick={this.handleClickOpen}>
                  Delete
                </Button>
              ) : null}
            </div>
            <div className="center">
              {this.props.history.location.state &&
              this.props.history.location.state.searchData ? (
                <Button
                  onClick={() => this.handleSearchBack()}
                  color="secondary"
                >
                  Back To Search
                </Button>
              ) : null}
            </div>
            <div className="right">
              {WriteAccess === 1 ? (
                <>
                  {this.props.history.location.state.id !== "" ? (
                    <Button onClick={() => this.handleSave(false)} color="rose">
                      Save
                    </Button>
                  ) : null}
                  <Button onClick={() => this.handleSave(true)} color="primary">
                    Save & Exit
                  </Button>
                </>
              ) : null}
              <Button onClick={() => this.handleCancel()} color="secondary">
                Cancel
              </Button>
            </div>
          </div>

          <div>
            <Dialog
              maxWidth={671}
              open={this.state.sendmailopen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Send Email</DialogTitle>
              <DialogContent>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="From"
                      id="From"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.sendMailInfo.Frommail,
                        disabled:
                          this.state.sendMailInfo.Type === "InvoiceMessage"
                            ? true
                            : false,
                        onChange: (event) => {
                          this.changeFrommail(event, "From");
                        },
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
                  {/* </GridContainer>
              <GridContainer> */}
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="TO"
                      id="TO"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.sendMailInfo.TOmail,
                        disabled:
                          this.state.sendMailInfo.Type === "InvoiceMessage"
                            ? true
                            : false,
                        onChange: (event) => {
                          this.changetomail(event, "TO");
                        },
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
                  {/* </GridContainer>
              <GridContainer> */}
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="CC"
                      id="CC"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (event) => {
                          this.ChangeCCmail(event, "CC");
                        },
                        disabled:
                          this.state.sendMailInfo.Type === "InvoiceMessage"
                            ? true
                            : false,
                        value: this.state.sendMailInfo.CCmail,
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
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Subject"
                      id="Subject"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (event) => {
                          this.ChangeSubjectmail(event, "Subject");
                        },
                        value: this.state.sendMailInfo.Subjectmail,
                        disabled:
                          this.state.sendMailInfo.Type === "InvoiceMessage"
                            ? true
                            : false,
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
                  <GridItem xs={12} sm={12} md={12}>
                    {this.state.sendMailInfo.Type === "InvoiceMessage" ? (
                      <p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: this.htmlDecode(
                              this.state.sendMailInfo.Bodymail
                            ),
                          }}
                        ></div>
                      </p>
                    ) : (
                      <textarea
                        name="Body"
                        style={{ width: "550px" }}
                        labelText="Body"
                        disabled={
                          this.state.sendMailInfo.Type === "InvoiceMessage"
                            ? true
                            : false
                        }
                        value={this.state.sendMailInfo.Bodymail}
                        onChange={(event) => this.ChangeMailBody(event, "Body")}
                      ></textarea>
                    )}
                  </GridItem>
                </GridContainer>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => this.setState({ sendmailopen: false })}
                  color="secondary"
                >
                  Cancel
                </Button>
                {/* { this.state.sendMailInfo.Type !== "InvoiceMessage" ? 
              <Button onClick={() => this.handleapiSendMail(this.state.sendMailInfo.Type)} color="primary" autoFocus>
                Send
              </Button>
              : null } */}
              </DialogActions>
            </Dialog>
          </div>
          <div>
            <Dialog
              open={this.state.open}
              onClose={this.state.close}
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
          </div>
        </GridItem>
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}
        <div>
          <Dialog
            open={this.state.deleteProposalPopUp}
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
              <Button onClick={this.canceldeleteproposal} color="primary">
                Cancel
              </Button>
              <Button onClick={this.deleteProposal} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={this.state.PickupOpenPopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Please Select pickup Type
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div className="select-spl">
                  <FormControl className={classes.formControl} fullWidth>
                    <InputLabel
                      htmlFor="selectshipmenttype"
                      className={classes.selectLabel}
                    >
                      Pickup Type?
                    </InputLabel>
                    <Select
                      value={this.state.pickUpValue}
                      onChange={(event) => this.pickUpChange(event)}
                    >
                      {this.appendPickUPType()}
                    </Select>
                  </FormControl>
                </div>
                <span style={{ color: "red", fontSize: "12px" }}>
                  {this.state.errorMessage1}
                </span>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {/* <Button onClick={() => this.SendEmailCancel()} color="secondary">
                Cancel
              </Button> */}
              {/* {this.state.Access.DeleteAccess === 1 ? */}
              <Button
                onClick={() => this.confirmPickup()}
                color="primary"
                autoFocus
              >
                confirm
              </Button>
              {/* :null} */}
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            maxWidth={671}
            open={this.state.Ratesendmailopen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Send Email</DialogTitle>
            <DialogContent>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Contact Name"
                    id="contactname"
                    error={this.state.dialogNameErr}
                    helperText={this.state.dialogNameHelperText}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: this.state.ContactName,
                      onChange: (event) => {
                        this.changeInput(event, "ContactName");
                      },
                      onBlur: (e) => this.sendMailBlur(e, "ContactName"),
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
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email"
                    id="Email"
                    error={this.state.dialogEmailErr}
                    helperText={this.state.dialogEmailHelperText}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: this.state.NewEmailAddress,
                      onChange: (event) => {
                        this.handleOnChange(event, "newemailaddress");
                      },
                      //onBlur: (e) => this.sendMailBlur(e, "Email"),
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
                {/* <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Phone"
                    id="Phone"
                    error={this.state.dialogPhoneErr}
                    helperText={this.state.dialogPhoneHelperText}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (event) => {
                        this.changeInput(event, "Phone");
                      },
                      onBlur: (e) => this.sendMailBlur(e, "Phone"),
                      value: this.state.Phone,
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
                </GridItem> */}
              </GridContainer>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ Ratesendmailopen: false })}
                color="secondary"
              >
                Cancel
              </Button>

              <Button
                onClick={() => this.handleapiSendMail()}
                color="primary"
                autoFocus
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Dialog
            maxWidth={671}
            open={this.state.ProposalemailOPen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Send Email</DialogTitle>
            <DialogContent>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Contact Name"
                    id="contactname"
                    error={this.state.dialogNameErr}
                    helperText={this.state.dialogNameHelperText}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: this.state.ContactName,
                      onChange: (event) => {
                        this.changeInput(event, "ContactName");
                      },
                      onBlur: (e) => this.sendMailBlur(e, "ContactName"),
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
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email"
                    id="Email"
                    error={this.state.dialogEmailErr}
                    helperText={this.state.dialogEmailHelperText}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      value: this.state.NewEmailAddress,
                      onChange: (event) => {
                        this.handleOnChange(event, "newemailaddress");
                      },
                      //onBlur: (e) => this.sendMailBlur(e, "Email"),
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
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ ProposalemailOPen: false })}
                color="secondary"
              >
                Cancel
              </Button>

              <Button
                onClick={() => this.sendProposalEmail()}
                color="primary"
                autoFocus
              >
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Dialog
            className="proposal-log"
            open={this.state.OpenproposalLog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Proposal Log Details :
            </DialogTitle>
            <DialogContent>
              {" "}
              <div className="package-table no-scroll">
                <table className="tablelayoutfix">
                  <thead>
                    <tr>
                      <th style={{ width: "90px" }}>Date</th>
                      <th style={{ width: "100px" }}>Time</th>
                      <th style={{ width: "120px" }}>ipAddress</th>
                      <th>Location</th>
                    </tr>
                  </thead>
                  <tbody>{this.proposalLoglist()}</tbody>
                </table>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ OpenproposalLog: false })}
                color="secondary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </GridContainer>
    );
  }
}
export default EditSalesLeads;
