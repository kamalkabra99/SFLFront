import React from "react";
import PropTypes from "prop-types";
// core components
//import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Datetime from "react-datetime";
import Tooltip from "@material-ui/core/Tooltip";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormHelperText from "@material-ui/core/FormHelperText";
import InfoIcon from "@material-ui/icons/PriorityHigh";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Icon from "@material-ui/core/Icon";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "components/Card/Card.js";
import momentTimezone from "moment-timezone";
import CardHeader from "components/Card/CardHeader.js";
import SimpleBackdrop from "../../utils/general";
import { format } from "date-fns";
import _ from "lodash";
//time picker
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
//import "react-clock/dist/Clock.css";
// import dayjs from "dayjs";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

//import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
// import $ from 'jquery';
import CardIcon from "components/Card/CardIcon.js";
import cogoToast from "cogo-toast";
import FlightTakeoff from "@material-ui/icons/FlightTakeoff";
import ReactTable from "react-table";
import CardBody from "components/Card/CardBody.js";
import moment from "moment";
import api from "../../utils/apiClient";
import FormControl from "@material-ui/core/FormControl";
import { fileBase } from "../../utils/config";
import { CommonConfig } from "utils/constant.js";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// import EsignEmployee from "../../components/Esign/esign_employee.js";
import EsignEmployee_Temp from "../../components/Esign/esign_employee_temp";
import Checkbox from "@material-ui/core/Checkbox";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import axios from "axios";
import Geocode from "react-geocode";
import { publicIp, publicIpv4, publicIpv6 } from "public-ip";
import UserAccess from "components/User Access/UserAccess";
import momentTimezoneWithData20122022 from "moment-timezone/builds/moment-timezone-with-data-2012-2022";
//import { cloudbilling } from "googleapis/build/src/apis/cloudbilling";
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
// import CurrentLocation from "react-current-location-address";
////////////HBL///////////////////////////
import stamp from "../../assets/img/HBL/stamp.png";
import pshah from "../../assets/img/HBL/pshah.png";
import html2pdf from "html2pdf.js";

var creditCardType = require("credit-card-type");
var valid = require("card-validator");
const DBName_prod = "myzuwvvaqk";
// const DBName_prod = "hubapisf_livedb"
var valid1 = "";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class ShipmentCustom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //---------------------- Navigation Data ----------------------------------//
      Steps: [
        {
          stepName: "Customer Details",
          stepId: "customerdetails",
          classname: "active",
        },
        {
          stepName: "Package",
          stepId: "package",
          classname: "inactive",
        },
        {
          stepName: "Commercial Inv.",
          stepId: "commercialinvoice",
          classname: "inactive",
        },
        {
          stepName: "Accounts",
          stepId: "accounts",
          classname: "inactive",
        },
        {
          stepName: "Tracking",
          stepId: "tracking",
          classname: "inactive",
        },
        {
          stepName: "Documentation",
          stepId: "documentations",
          classname: "inactive",
        },
      ],
      useraccess: JSON.parse(localStorage.getItem("loggedInUserData")),
      updatedipAddress: "",
      createDuplicate: "0",
      updatedipLocation: "",
      isNotesVisible: true,
      IsTransactionValid: false,
      TransactionMessage: "",
      //-----------------------------  Tab 1 and Common Tab Data -------------------------------------------//
      shipmentTypeList: [],
      ManagedBy: "",
      managedByList: [],
      TrackingNumber: "",
      ServiceType: "",
      SubServiceType: "",
      CreatedBy: "",
      CreatedByName: "",
      ipAddress: "",
      ipLocation: "",
      PickupDateChange: 0,
      userdetailsTooltip: "",
      PersonID: "",
      fromCountryCode: "",
      toCountryCode: "",
      ShipmentDate: "",
      ShipmentType: "",
      DocumentManagedBy: "",
      notes: [],
      ReadyTime: "",
      DocumentationCount: 0,
      TrackingdtatsCount: 0,
      AccountCountdata: 0,
      CommercialCount: 0,
      PackageCount: 0,

      ReadytimeView: "",
      availibletimeView: "",
      ReadyTimeList: CommonConfig.FedexExpressStarttime,
      ReadyTimeErr: "",
      ReadyTimeErrHelperText: "",
      AvailableTime: "",
      AvailableTimeList: CommonConfig.FedexExpressAvailabletime,
      AvailableTimeErr: "",
      AvailableTimeErrHelperText: "",
      ServiceList: [],
      SubServiceList: [],
      Subservicename: true,
      subServiceName: [],
      ServiceName: "",
      SubServiceName: "",
      ShipmentStatus: "",
      ShipmentStatusList: [],
      ContainerName: "",
      PickupVendorName: "",
      pickuptimeshow: false,
      ContainerNameList: [],
      PickupVendorList: [],
      NotesforPickup: "",
      NotesforPickupErr: false,
      NotesforPickupHelperText: "",
      deleteopen: false,
      createopen: false,
      setDupLicate: false,
      dupTracking: "",
      successOpened: false,
      CountryList: [],
      AllClearStatusList: [],
      AllClearYes: false,
      MailOpenPopup: false,
      MailDelivered: false,

      FromAddress: {},
      FromCompanyName: "",
      FromContactName: "",
      FromAddressLine1: "",
      FromAddressLine2: "",
      FromAddressLine3: "",
      FromZipCode: "",
      FromPhone1: "",
      FromPhone2: "",
      FromEmail: "",
      previousAllClear: "",
      disableFromZip: false,
      disableFromState: false,
      disableToZip: false,
      disableToState: false,
      isFedexCountryFrom: false,
      isFedexCountryTo: false,
      isZipAvailable: false,

      isFromCountryCanada: false,

      FromFedExCityList: [],
      FromFedExSelectedCity: {},
      ToFedExCityList: [],
      ToFedExSelectedCity: {},

      ToAddress: {},
      ToCompanyName: "",
      ToContactName: "",
      ToAddressLine1: "",
      ToAddressLine2: "",
      ToAddressLine3: "",
      ToZipCode: "",
      ToPhone1: "",
      ToPhone2: "",
      ToEmail: "",
      selectedFromCountry: {},
      selectedToCountry: {},
      YesNo: [{ value: true, label: "Yes" }, { value: false, label: "No" }],
      FromMovingBack: false,
      FromEligibleForTR: false,
      FromOriginalPassortAvailable: false,
      fromCityAutoComplete: false,
      Moveupdatetozip: true,
      Moveupdatefromzip: true,
      fromStateAutoComplete: false,
      fromGoogleAPICityList: [],
      fromStateList: [],

      toCityAutoComplete: false,
      toStateAutoComplete: false,
      toGoogleAPICityList: [],
      toStateList: [],

      fromState: "",
      fromCity: "",
      toState: "",
      toCity: "",
      tempToCity: "",
      tempFromCity: "",
      PickupDate: "",
      CustomClearanceDate: "",
      DutiesPaidBy: "",
      LocationType: "",
      IsPickup: false,
      ReadOnly: true,
      IsDisabled: true,
      ShowGeneratedPriperdlable: false,
      IsPackageAccess: "",
      IsfedexLabelOpen: false,
      setTrackingValue: "",
      IsfedexLabelOpenPickup: false,
      IsfedexLabelGeneratePickup: false,
      FedexTrackNumber: "",
      FedexTrackAddorUpdate: "",
      PickupID: "",
      cancelTrackNumber: "",
      cancelPickupID: "",
      IsDocDialogOpen: false,
      ComPrepaidDocData: [],
      checkPickup: "",
      selectedPickupVendorName: "",
      //------------------------------------- Tab 2 Package Data          ---------------------------------------------------------//

      PackageList: [],
      PackageContentList: [],
      PackageType: "",
      packedBy: [
        { value: "Owner", label: "Owner" },
        { value: "Mover", label: "Mover" },
      ],

      optionYes: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }],
      TotalPackages: 0,
      isPackageDetailsVisible: false,

      //------------------------------------- Tab 3 Commercial Data          ---------------------------------------------------------//
      commercialList: [],
      TotalCostCommercial: 0,
      TotalReceivedCost: 0,
      DatePaidOn: "",

      totalCFT: 0,
      totalChargableWeight: 0,
      totalInsuredValue: 0.0,
      DocumentTotalCFT: 0,
      isComInvoiceVisible: false,

      //------------------------------------- Tab 4 Account Data          ---------------------------------------------------------//
      PaymentList: [],
      TotalCostInvoice: 0,
      TotalCostReceived: 0,
      TotalCostIssued: 0,
      paymentReceived: [],
      paymentIssued: [],
      bankList: [],
      creditCardList: [],
      ServiceDescriptionList: [],
      PaymentTypeList: [],
      VendorList: [],
      PaymentMethodType: [
        { value: "Bank", label: "Bank" },
        { value: "Credit Card", label: "Credit Card" },
      ],
      yesNo: [
        { value: "Yes", label: "Yes" },
        { value: "No", label: "No" },
        { value: "N/A", label: "N/A" },
      ],

      Month: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" },
        { value: "11", label: "11" },
        { value: "12", label: "12" },
      ],

      Year: [
        { value: "2020", label: "2020" },
        { value: "2021", label: "2021" },
        { value: "2022", label: "2022" },
        { value: "2023", label: "2023" },
        { value: "2024", label: "2024" },
        { value: "2025", label: "2025" },
        { value: "2026", label: "2026" },
        { value: "2027", label: "2027" },
        { value: "2028", label: "2028" },
        { value: "2029", label: "2029" },
        { value: "2030", label: "2030" },
      ],
      documentTypeErr: false,
      documentTypeHelperText: "",
      InvoiceDueDate: "",
      invoiceDueDateErr: false,
      invoiceDueDateHelperText: "",
      pickupDateErr: false,
      pickupProviderErr: false,
      pickupDateHelperText: "",
      pickupProviderHelperText: "",
      DocumentInvoiceDueDate: "",
      isInvoiceVisible: false,
      isPaymentReceived: false,
      isPaymentIssued: false,
      isPaymentMethod: false,
      isPaymentMethodBank: false,
      shipmentstatusList: "",

      //------------------------------------- Tab 5 Tracking Data          ---------------------------------------------------------//

      trackingNumberList: [],
      PickupTrackingList: [],
      trackingManualList: [],
      TrackingServiceList: [],
      isTrackingManualVisible: true,
      isTrackingNumberVisible: true,

      //------------------------------------- Tab 6 Document Data          ---------------------------------------------------------//

      activeInactive: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      Attachments: [
        {
          Index: 1,
          FileName: "",
          DocumentType: "Commercial Invoice",
          Status: "Active",
          AttachmentName: "Commercial Invoice",
          TrackingNumber: "1",
          DocumentCreatedOn: moment().format(CommonConfig.dateFormat.dateOnly),
          DocumentCreatedBy: "Auto",
        },
        {
          Index: 2,
          FileName: "",
          DocumentType: "Invoice",
          AttachmentName: "Invoice",
          TrackingNumber: "2",
          Status: "Active",
          DocumentCreatedOn: moment().format(CommonConfig.dateFormat.dateOnly),
          DocumentCreatedBy: "Auto",
        },
        {
          Index: 3,
          FileName: "",
          DocumentType: "Contract",
          isGenerated: false,
          Status: "Active",
          AttachmentName: "",
          TrackingNumber: "3",
          DocumentCreatedOn: moment().format(CommonConfig.dateFormat.dateOnly),
          DocumentCreatedBy: "Auto",
        },
        {
          Index: 4,
          FileName: "",
          DocumentType: "HBL",
          isGenerated: false,
          Status: "Active",
          AttachmentName: "",
          TrackingNumber: "4",
          DocumentCreatedOn: moment().format(CommonConfig.dateFormat.dateOnly),
          DocumentCreatedBy: "Auto",
        },
      ],
      Loading: false,
      objAttachment: {
        Index: 1,
        DocumentType: "",
        FileName: "",
        Status: "Active",
        DocumentCreatedOn: moment().format(CommonConfig.dateFormat.dateOnly),
        DocumentCreatedBy: CommonConfig.loggedInUserData().Name,
      },
      DocumentTypeList: [],
      AttachmentList: [],
      openpayment: false,
      IsCardTransactionZero: false,
      //------------------------------------- Email Config Data          ---------------------------------------------------------//

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
      status: "unpaid",
      Access: {},
      VendorAccessForInvoice: 0,
      AllClear: "",
      viewAllClear: false,
      IsChanged: false,
      confirmAllClear: false,
      PaymentShowData: {},
      FromAddressObj: {},
      ToAddressObj: {},
      ManagedByEmail: "",
      CommercialInvoiceList: [],

      //------------------------------------- Contract Data & Moving Back to India          ---------------------------------------------------------//

      DocumentManagedBy: "",
      DocumentInvoiceDate: "",
      DocumentInvoiceData: [],
      DocumentTotalInvoiceAmount: 0,
      DocumentTrackingList: [],
      isLock: true,
      lockMsg: "",
      EmailFormat: "",
      PaymentStatusList: [],
      generateEsign: false,
      submitEsign: false,
      EsignPath: "",
      IsAlreadyAESFilled: false,
      IsAESOpen: false,
      redirect: false,
      saveClicked: {
        saveClick: false,
        redirect: false,
      },
      hasInvoiceAccess: false,
      IsTransactionZero: false,
      visaCategoryList: [
        { value: "Indian Passport", label: "Indian Passport" },
        { value: "OCI Card", label: "OCI Card" },
        { value: "PIO Card", label: "PIO Card" },
        { value: "Visitor Visa", label: "Visitor Visa" },
      ],
      NameAsPerPassport: "",
      PassportNumber: "",
      YearsOutsideIndia: "",
      StayInIndia: "",
      LatestArrivalDate: "",
      AppliedForTR: "",
      AbleToProvidePassport: "",
      VisaCategory: "",
      VisaValidDate: "",
      movingBackIndia: "",
      movingBackIndiaErr: false,
      movingBackIndiaHelperText: "",
      nameAsperPassportErr: false,
      nameAsperPassportHelperText: "",
      PassportNumberErr: false,
      PassportNumberHelperText: "",
      stayinIndiaErr: false,
      stayinIndiaHelperText: "",
      appliedForTRErr: false,
      appliedForTRHelperText: "",
      ableToProvidePassportErr: false,
      ableToProvidePassportHelperText: "",
      visaCategoryErr: false,
      visaCategoryHelperText: "",
      visaDateErr: false,
      visaDateHelperText: "",
      arrivalDateErr: false,
      arrivalDateHelperText: "",
      yearsOutsideIndiaErr: false,
      yearsOutsideIndiaHelperText: "",
      isBackIndia: false,
      yesOrNo: [{ value: true, label: "Yes" }, { value: false, label: "No" }],
      yearsLength: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: "5+", label: "5+" },
      ],
      UserAdditionalDetailsID: null,
      isMovingIndiaChanged: false,
      isVisible: false,
      InsuranceType: "Movers Liability",
      ContainerType: "",
      DocumentServiceType: "",

      // Contract Moving Back to India
      DocumentMovingBackToIndia: false,
      DocumentNameAsPerPassport: "",
      DocumentYearsOutsideIndia: "",
      DocumentStayInIndia: "",
      DocumentLatestArrivalDate: "",
      DocumentAppliedForTR: "",
      DocumentAbleToProvidePassport: "",
      DocumentVisaValidDate: "",
      DocumentArrivalCategory: "",
      // Correspondence Data
      pickupDisable: false,

      digit: 0,
      id: null,

      CommuncationList: [],
      EtdDocumentId: "",
      identical: "No",

      ///////////////////////////////HBL/////////////////////////////////
      HBLdocOpen: false,
      PackageNumber: "",
      description: "",
      WEIGHT: "",
      MEASUREMENT: "",
      BookingNumber: "",
      HTrackingNumber: "",
      HContainerNumber: "",
      BLNumber: "",
      Vessel: "MAERSK SELETAR 343E",
      Export: "Dallas, Texas",
      Unloading: "Nhava Sheva, India",
      develiverd: "Nhava Sheva, India",
      TypeOfMove: "Console",
      FMCnumber: "",
      pointState: "Dallas, Texas",
      BookingNumber: "",
      GST: "24AABCN9389H1Z2",
      EMAIL: "saumins@sflworldwide.com",
      PHONE: "+91 98250 13411",
      COUNTRY: "India",
      CITY: "Ahmedabad",
      STREET: "Off S. G. Highway, Makarba",
      Addressline1: "C 732 733 Siddhi Vinayak Towers",
      Addressline2: "Behind DCP Office, Near DAV Intl. School",
      company: "SFL Worldwide Logistics Private Limited",
      description: " USED HOUSE HOLD GOODS AND PERSONAL EFFECTS ",
      Sequencelist: [],
      HCreatedDate: moment().format(CommonConfig.dateFormat.dateOnly),
      ConsigneeDetails: "",
      ConsignedTo: "",
      ShipperExportor: "",
      APPLYTO: "",
    };
  }

  componentWillUnmount() {
    if (!this.state.isLock) {
      // CommonConfig.releaseLockShipment();
    }
    // window.clearInterval(this.state.id);
  }

  async componentDidMount() {
    this.showHide();
    this.showLoader();
    // await this.getPackageDetail();
    await this.checkLock();
    await this.invoiceAccess();
    await this.getCountry();

    console.log("Commom = ", CommonConfig.getUserAccess("Vendor Management"));
    var vendordelete = CommonConfig.getUserAccess("Vendor Management");
    this.setState({ VendorAccessForInvoice: vendordelete.WriteAccess });

    console.log("Vendor : ", this.state.VendorAccessForInvoice);

    this.setState({
      // VendorAccessForInvoice:CommonConfig.getUserAccess("Vendor Management"),
      Access: CommonConfig.getUserAccess("Shipment"),
      IsDisabled:
        CommonConfig.getUserAccess("Shipment").AllAccess === 1 ? false : true,
      ReadOnly:
        CommonConfig.getUserAccess("Shipment").DeleteAccess === 1 ||
        CommonConfig.getUserAccess("Shipment").WriteAccess === 1
          ? false
          : true,
    });
    this.checkTransaction();

    //----------------------------------------- Customer Details  -----------------------------------------------------------//

    await this.getShipmentType();
    await this.getAllClearStatus();
    await this.getStatusList();
    await this.getManagedBy();
    await this.getShipmentInfo();

    await this.getAdditionalDetails();
    await this.getContainerName();
    this.getPackageContent();
    this.getPackageDetail();
    // await this.getPickupVendorName();

    //----------------------------------------- Package Details  -----------------------------------------------------------//

    // await this.getPackageContent();
    // await this.getPackageDetail();

    //----------------------------------------- Commercial Invoice Details  -----------------------------------------------------------//
    // await this.getCommercialInvoiceDetail();

    //----------------------------------------- Accounting Details  -----------------------------------------------------------//

    // await this.getAccountDetail();
    // await this.checkInsurance();
    // await this.getServiceDescription();
    // await this.getpaymentType();
    // await this.getPaymentStatus();
    await this.getVendorName();

    //-----------------------------------------  Notes Details  ----------------------------------------------------------//

    await this.getnotesByID();

    //----------------------------------------- Tracking Details  ---------------------------------------------------------//

    // await this.trackingService();
    // await this.getDocumentType();
    // await this.getTrackingDetail();
    // await this.getPickupConfDetail();
    // await this.getShipmentManualTracking();

    //----------------------------------------- Documentation Details -----------------------------------------------------------//

    // await this.getDocumentation();
    // await this.getCommunicationList();
    // await this.addnewRowTrackingNumber();
  }

  async reCallApi() {
    this.setState({
      isPackageDetailsVisible: false,
      isComInvoiceVisible: false,
      isInvoiceVisible: false,
      isPaymentReceived: false,
      isPaymentIssued: false,
      isPaymentMethod: false,
      isPaymentMethodBank: false,
      isTrackingManualVisible: true,
      isTrackingNumberVisible: true,
    });

    this.showLoader();
    await this.checkLock();
    await this.invoiceAccess();
    this.getCountry();

    //----------------------------------------- Customer Details  -----------------------------------------------------------//

    this.getShipmentType();
    this.getAllClearStatus();
    this.getStatusList();
    this.getManagedBy();
    this.getShipmentInfo();
    this.getAddressDetails();
    this.getAdditionalDetails();
    this.getContainerName();
    // this.getPickupVendorName();

    //----------------------------------------- Package Details  -----------------------------------------------------------//

    this.getPackageContent();
    this.getPackageDetail();

    //----------------------------------------- Commercial Invoice Details  -----------------------------------------------------------//
    this.getCommercialInvoiceDetail();

    //----------------------------------------- Accounting Details  -----------------------------------------------------------//

    this.getAccountDetail();
    this.checkInsurance();
    this.getServiceDescription();
    this.getpaymentType();
    this.getPaymentStatus();
    this.getVendorName();

    //-----------------------------------------  Notes Details  ----------------------------------------------------------//

    this.getnotesByID();

    //----------------------------------------- Tracking Details  ---------------------------------------------------------//

    this.trackingService();
    this.getDocumentType();
    this.getTrackingDetail();
    this.getPickupConfDetail();
    this.getShipmentManualTracking();

    //----------------------------------------- Documentation Details -----------------------------------------------------------//

    this.getDocumentation();
    this.getCommunicationList();
    this.addnewRowTrackingNumber();

    // console.log("Welcome = ",this.state.PickupVendorName)
  }

  async checkLock() {
    let data = {
      ShippingID:
        this.props.location.state && this.props.location.state.ShipppingID
          ? this.props.location.state.ShipppingID
          : null,
      UserID: CommonConfig.loggedInUserData().PersonID,
    };
    await api
      .post("scheduleshipment/setShipmentLockByID", data)
      .then(async (res) => {
        if (res.success) {
          this.setState({ isLock: false });
        } else {
          const options = {
            hideAfter: 5,
          };
          this.setState({ isLock: true, lockMsg: res.message });
          cogoToast.error(res.message, options);
        }
      })
      .catch((err) => {
        console.log("setLock err", err);
      });
  }

  async getEtdCommercialInvoice(TrackingNumber) {
    var etdGetData = {
      trackingNumber: TrackingNumber,
    };
    api.post("fedexETDApi/getEtdDetails", etdGetData).then((res) => {
      if (res.data.length > 0) {
        var baseUrl = "https://hubapi.sflworldwide.com/";
        var Url = res.data[0].Path;
        var i = Url.indexOf(baseUrl);
        Url = Url.substring(0, i) + Url.substring(i + baseUrl.length);

        var Etd = {
          Index: 3,
          FileName: res.data[0].FileName,
          DocumentType: "ETD Commercial Invoice",
          Status: "Active",
          AttachmentPath: Url,
          AttachmentName: "ETD Commercial Invoice",
          TrackingNumber: "3",
          DocumentCreatedOn: moment().format(CommonConfig.dateFormat.dateOnly),
          DocumentCreatedBy: "Auto",
        };

        this.state.Attachments.splice(2, 0, Etd);
      }
    });
  }

  async invoiceAccess() {
    let data = {
      ShippingID:
        this.props.location.state && this.props.location.state.ShipppingID
          ? this.props.location.state.ShipppingID
          : null,
      UserID: CommonConfig.loggedInUserData().PersonID,
    };
    await api
      .post("scheduleshipment/checkInvoiceAccess", data)
      .then(async (res) => {
        if (res.success) {
          if (res.data.HasAccess.data[0] === 0) {
            this.setState({ hasInvoiceAccess: true });
          }
          if (res.data.IsTransactionZero.data[0] === 1) {
            this.setState({ IsTransactionZero: true });
          }
        }
      })
      .catch((err) => {
        console.log("setLock err", err);
      });
  }

  showHide() {
    this.state.Steps.map((step, index) => {
      index === 0
        ? (document.getElementById(step.stepId).style.display = "block")
        : (document.getElementById(step.stepId).style.display = "none");
    });
  }

  showDiv = (type, packageType) => {
    this.setState({
      [type]: true,
    });
    if (
      packageType === "Invoice" &&
      this.state.PaymentList.filter((x) => x.Status === "Active").length === 0
    ) {
      this.addnewRowInvoice();
    }

    if (
      packageType === "PaymentReceived" &&
      this.state.paymentReceived.filter((x) => x.Status === "Active").length ===
        0
    ) {
      this.addRowPaymentReceived();
    }

    if (
      packageType === "PaymentIssued" &&
      this.state.paymentIssued.filter((x) => x.Status === "Active").length === 0
    ) {
      this.addRowPaymentIssued();
    }

    if (
      packageType === "PaymentMethod" &&
      this.state.creditCardList.filter((x) => x.Status === "Active").length ===
        0
    ) {
      this.addRowCreditCard();
    }

    if (
      packageType === "PaymentMethodBank" &&
      this.state.bankList.filter((x) => x.Status === "Active").length === 0
    ) {
      this.addRowBank();
    }

    if (
      packageType === "PackageDetailsVisible" &&
      this.state.PackageList.filter((x) => x.Status === "Active").length === 0
    ) {
      this.addPackageRow();
      this.showDiv("isComInvoiceVisible", "ComInvoiceVisible");
    }

    if (
      packageType === "ComInvoiceVisible" &&
      this.state.commercialList.filter((x) => x.Status === "Active").length ===
        0
    ) {
      this.addnewRowCommercial();
    }

    if (
      packageType === "TrackingManualVisible" &&
      this.state.trackingManualList.filter((x) => x.Status === "Active")
        .length === 0
    ) {
      this.addnewRowTrackingManual();
    }

    if (
      packageType === "TrackingNumberVisible" &&
      this.state.trackingNumberList.filter((x) => x.Status === "Active")
        .length === 0
    ) {
      this.addnewRowTrackingNumber();
    }

    if (
      packageType === "NotesVisible" &&
      this.state.notes.filter((x) => x.Status === "Active").length === 0
    ) {
      this.handleAddNotesRow();
    }
  };

  getManagedBy() {
    try {
      api
        .get("scheduleshipment/getShipmentManagedBy")
        .then((result) => {
          this.setState({ managedByList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getServiceByShipmentType(serviceType) {
    try {
      let data = {
        ServiceType: serviceType,
      };
      api
        .post("userManagement/getServiceByShipmentType", data)
        .then((result) => {
          if (result.success) {
            this.setState({
              ServiceList: result.data,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getSubserviceName(ServiceName, ShipmentType) {
    try {
      let data = {
        ServiceName: ServiceName,
        ServiceType: ShipmentType,
      };
      api
        .post("userManagement/getSubserviceName", data)
        .then((result) => {
          if (result.success) {
            this.setState({
              SubServiceList: result.data,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getShipmentType() {
    try {
      let data = {
        stringMapType: "SHIPMENTTYPE",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          this.setState({ shipmentTypeList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getAllClearStatus() {
    try {
      let data = {
        stringMapType: "ALLCLEARSTATUS",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          this.setState({ AllClearStatusList: result.data });
          if (
            this.state.useraccess.userModuleAccess[15].ModuleID === 18 &&
            this.state.useraccess.userModuleAccess[15].WriteAccess === 1 &&
            this.state.useraccess.userModuleAccess[15].DeleteAccess === 0
          ) {
            this.state.AllClearStatusList.splice(3);
            console.log("allclear..", this.state.AllClearStatusList);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getPaymentStatus = () => {
    try {
      let data = {
        stringMapType: "WEBFORMSTATUS",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          this.setState({ PaymentStatusList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };

  uploadETD = async () => {
    let packobj = this.state.PackageList.filter(
      (x) =>
        (x.Status === "Inactive" && x.ShippingPackageDetailID !== null) ||
        ((x) => x.Status === "Active")
    );
    let scheduleobj = this.state.ShipmentType.value;
    let senderobj = this.state.FromAddress;
    let recipientobj = this.state.ToAddress;
    let commercialData = this.state.commercialList;
    let paymentInvoiceData = this.state.PaymentList.filter(
      (x) =>
        (x.Status === "Inactive" && x.ShippingInvoiceID !== null) ||
        (x.Status === "Active" && x.ServiceDescription !== "")
    );
    let TrackingData = this.state.trackingNumberList.filter(
      (x) =>
        (x.Status === "Inactive" && x.ShippingTrackingID !== null) ||
        (x.Status === "Active" && x.TrackingID !== "")
    );
    let ManualTrackingData = this.state.trackingManualList.filter(
      (x) =>
        (x.Status === "Inactive" && x.ShippingManualTrackingID !== null) ||
        (x.Status === "Active" && x.Updates !== "")
    );
    let paymentReceivedData = this.state.paymentReceived.filter(
      (x) =>
        (x.Status === "Inactive" && x.ShippingPaymentReceivedID !== null) ||
        (x.Status === "Active" && x.PaymentType !== "")
    );
    let paymentIssued = this.state.paymentIssued.filter(
      (x) =>
        (x.Status === "Inactive" && x.ShippingPaymentIssuedID !== null) ||
        (x.Status === "Active" && x.VendorName !== "")
    );
    let creditCardObj = this.state.creditCardList.filter(
      (x) =>
        (x.Status === "Inactive" && x.PaymentID !== null) ||
        (x.Status === "Active" && x.CardName !== "")
    );
    let bankObj = this.state.bankList.filter(
      (x) =>
        (x.Status === "Inactive" && x.PaymentID !== null) ||
        (x.Status === "Active" && x.NameonAccount !== "")
    );
    let packages_data = [];
    let com_data = [];
    var paymentdata = [];

    if (scheduleobj === "Air" || scheduleobj === "Ground") {
      if (this.state.PackageType === "Package") {
        for (var i = 0; i < packobj.length; i++) {
          let package_details = {};
          package_details = {
            shipments_tracking_number: "",
            PackageNumber: packobj[i].PackageNumber,
            package_number: packobj[i].Sequence,
            weight: packobj[i].EstimetedWeight,
            unit_of_weight: "LBS",
            length: packobj[i].Length,
            width: packobj[i].Width,
            height: packobj[i].Height,
            chargable_weight: packobj[i].ChargableWeight,
            insured_value: packobj[i].InsuredValue,
            Sequence: packobj[i].Sequence,
            PackageContent: packobj[i].PackageContent,
            PackedType: packobj[i].PackedType,
            Status: packobj[i].Status,
            TV: false,
            Stretch: false,
            Repack: false,
            Crating: false,
            PackageID: packobj[i].ShippingPackageDetailID,
          };
          packages_data.push(package_details);
        }
      } else if (this.state.PackageType === "Envelop") {
        if (packobj.length > 1) {
          for (var j = 1; j < packobj.length; j++) {
            if (packobj[j].Status === "Inactive") {
              let package_details = {};
              package_details = {
                shipments_tracking_number: "",
                PackageNumber: packobj[j].PackageNumber,
                package_number: packobj[j].Sequence,
                weight: packobj[j].EstimetedWeight,
                unit_of_weight: "LBS",
                length: packobj[j].Length,
                width: packobj[j].Width,
                height: packobj[j].Height,
                chargable_weight: packobj[j].ChargableWeight,
                insured_value: packobj[j].InsuredValue,
                Sequence: packobj[j].Sequence,
                PackedType: packobj[j].PackedType,
                Status: packobj[j].Status,
                PackageContent: packobj[j].PackageContent,
                TV: false,
                Stretch: false,
                Repack: false,
                Crating: false,
                PackageID: packobj[j].ShippingPackageDetailID,
              };

              packages_data.push(package_details);
            }
          }
        }
        let package_details = {};
        package_details = {
          shipments_tracking_number: "",
          PackageNumber: packobj[0].PackageNumber,
          package_number: packobj[0].Sequence,
          weight: packobj[0].EstimetedWeight,
          unit_of_weight: "LBS",
          length: packobj[0].Length,
          width: packobj[0].Width,
          height: packobj[0].Height,
          chargable_weight: packobj[0].ChargableWeight,
          insured_value: packobj[0].InsuredValue,
          Sequence: packobj[0].Sequence,
          PackedType: packobj[0].PackedType,
          Status: packobj[0].Status,
          PackageContent: packobj[0].PackageContent,
          TV: false,
          Stretch: false,
          Repack: false,
          Crating: false,
          PackageID: packobj[0].ShippingPackageDetailID,
        };

        packages_data.push(package_details);
      }
    } else if (scheduleobj === "Ocean") {
      if (this.state.PackageType === "Package") {
        for (var i = 0; i < packobj.length; i++) {
          let package_details = {};
          package_details = {
            shipments_tracking_number: "",
            PackageNumber: packobj[i].PackageNumber,
            package_number: packobj[i].Sequence,
            weight: packobj[i].EstimetedWeight,
            unit_of_weight: "LBS",
            length: packobj[i].Length,
            width: packobj[i].Width,
            height: packobj[i].Height,
            chargable_weight: packobj[i].ChargableWeight,
            insured_value: packobj[i].InsuredValue,
            Sequence: packobj[i].Sequence,
            Status: packobj[i].Status,
            TV: false,
            Stretch: false,
            Repack: false,
            Crating: false,
            PackageContent: packobj[i].PackageContent,
            PackedType: packobj[i].PackedType,
            CFT: packobj[i].CFT,
            PackageID: packobj[i].ShippingPackageDetailID,
          };
          packages_data.push(package_details);
        }
      } else if (this.state.PackageType === "Envelop") {
        let package_details = {};
        package_details = {
          shipments_tracking_number: "",
          PackageNumber: packobj[0].PackageNumber,
          package_number: packobj[0].Sequence,
          weight: packobj[0].EstimetedWeight,
          unit_of_weight: "LBS",
          length: packobj[0].Length,
          width: packobj[0].Width,
          height: packobj[0].Height,
          chargable_weight: packobj[0].ChargableWeight,
          insured_value: parseFloat(packobj[0].InsuredValue).toFixed(2),
          Sequence: packobj[0].Sequence,
          Status: packobj[0].Status,
          TV: false,
          Stretch: false,
          Repack: false,
          Crating: false,
          PackageContent: packobj[0].PackageContent,
          PackedType: packobj[0].PackedType,
          CFT: parseFloat(packobj[0].CFT).toFixed(2),
          PackageID: packobj[0].ShippingPackageDetailID,
        };

        packages_data.push(package_details);
      }
    }
    var totalCommercial = 0;
    var packages = packages_data;
    for (var i = 0; i < commercialData.length; i++) {
      let commercail_details = {};
      totalCommercial = totalCommercial + commercialData[i].TotalValue;
      var packIndex = packobj.findIndex(
        (x) => x.PackageNumber == commercialData[i].PackageNumber
      );
      console.log("packobj[packIndex] = ", commercialData[i]);
      commercail_details = {
        shipments_tracking_number: "",
        package_number: commercialData[i].PackageNumber,
        content_description: commercialData[i].ContentDescription,
        // newipLocation: commercialData[i].ipLocation,
        quantity: commercialData[i].Quantity,
        value_per_qty: commercialData[i].ValuePerQuantity,
        total_value: commercialData[i].TotalValue,
        Status: commercialData[i].Status,
        CommercialInvoiceID: commercialData[i].ShippingCommercialInvoiceID,
        net_weight: packobj[packIndex].ChargableWeight,
      };
      com_data.push(commercail_details);
    }
    var commercial = com_data;
    var shipments = {
      tracking_number: "",
      shipment_type: scheduleobj,
      location_type: this.state.LocationType,
      is_pickup: !CommonConfig.isEmpty(this.state.IsPickup.data)
        ? this.state.IsPickup.data[0] === 0
          ? false
          : true
        : this.state.IsPickup,
      ShipmentStatus: this.state.ShipmentStatus,
      pickup_date:
        CommonConfig.isEmpty(this.state.PickupDate) != true
          ? momentTimezone(this.state.PickupDate)
              .tz(CommonConfig.UStimezone)
              .format("YYYY-MM-DD HH:mm:ss")
              .toString()
          : null,
      package_type: !CommonConfig.isEmpty(packobj)
        ? this.state.PackageType
        : "",
      total_packages: packobj.filter((x) => x.Status === "Active").length,
      ContainerID: !CommonConfig.isEmpty(this.state.ContainerName.value)
        ? this.state.ContainerName.value
        : null,
      promo_code: "",
      is_agree: "",
      total_weight: !CommonConfig.isEmpty(senderobj)
        ? senderobj.TotalWeight
        : 0,
      total_chargable_weight: !CommonConfig.isEmpty(
        this.state.totalChargableWeight
      )
        ? this.state.totalChargableWeight
        : 0.0,
      total_insured_value: !CommonConfig.isEmpty(this.state.totalInsuredValue)
        ? this.state.totalInsuredValue
        : 0.0,
      duties_paid_by: this.state.DutiesPaidBy,
      total_declared_value: !CommonConfig.isEmpty(senderobj)
        ? senderobj.TotalDeclaredValue
        : 0,
      userName: CommonConfig.loggedInUserData().LoginID,
      InvoiceDueDate:
        CommonConfig.isEmpty(this.state.InvoiceDueDate) != true
          ? moment(this.state.InvoiceDueDate)
              .format("YYYY-MM-DD HH:mm:ss")
              .toString()
          : null,
      managed_by: this.state.ManagedBy.value,
      ServiceName: this.state.ServiceName ? this.state.ServiceName.value : "",
      SubServiceName: this.state.SubServiceName
        ? this.state.SubServiceName.value
        : "",
      PersonID: this.state.PersonID,
      IsPackageAccess: this.state.IsPackageAccess,
      ShippingID:
        this.props.location.state && this.props.location.state.ShipppingID
          ? this.props.location.state.ShipppingID
          : null,
    };

    var from_address = {
      AddressID: senderobj.FromAddressID,
      country_id: this.state.selectedFromCountry.value,
      country_name: this.state.selectedFromCountry.label,
      fromCountryCode: this.state.fromCountryCode,
      company_name: this.state.FromCompanyName,
      contact_name: this.state.FromContactName,
      address_1: this.state.FromAddressLine1,
      address_2: this.state.FromAddressLine2,
      address_3: this.state.FromAddressLine3,
      MovingBack: CommonConfig.isEmpty(this.state.FromMovingBack.value)
        ? this.state.FromMovingBack
        : this.state.FromMovingBack.value,
      OriginalPassportAvailable: CommonConfig.isEmpty(
        this.state.FromOriginalPassortAvailable.value
      )
        ? this.state.FromOriginalPassortAvailable
        : this.state.FromOriginalPassortAvailable.value,
      EligibleForTR: CommonConfig.isEmpty(this.state.FromEligibleForTR.value)
        ? this.state.FromEligibleForTR
        : this.state.FromEligibleForTR.value,
      city_id: 1,
      city_name: CommonConfig.isEmpty(this.state.fromCity.value)
        ? this.state.fromCity
        : this.state.fromCity.value,
      state_id: 1,
      fedex_city: senderobj.FedexCity,
      state_name: this.state.FromAddressObj.AddressDetail.State,
      zip_code: this.state.FromZipCode,
      phone1: this.state.FromPhone1,
      phone2: this.state.FromPhone2,
      email: this.state.FromEmail,
    };

    var to_address = {
      AddressID: recipientobj.ToAddressID,
      country_id: this.state.selectedToCountry.value,
      country_name: this.state.selectedToCountry.label,
      toCountryCode: this.state.toCountryCode,
      company_name: this.state.ToCompanyName,
      contact_name: this.state.ToContactName,
      address_1: this.state.ToAddressLine1,
      address_2: this.state.ToAddressLine2,
      address_3: this.state.ToAddressLine3,
      city_id: 2,
      city_name: CommonConfig.isEmpty(this.state.toCity.value)
        ? this.state.toCity
        : this.state.toCity.value,
      state_id: 1,
      fedex_city: recipientobj.FedexCity,
      state_name: this.state.ToAddressObj.AddressDetail.State,
      zip_code: this.state.ToZipCode,
      phone1: this.state.ToPhone1,
      phone2: this.state.ToPhone2,
      email: this.state.ToEmail,
    };

    for (var j = 0; j < bankObj.length; j++) {
      let paymentData = {};
      paymentData = {
        PaymentID: bankObj[j]["PaymentID"],
        PaymentType: bankObj[j]["PaymentType"],
        name_on_card: bankObj[j]["CardName"],
        card_number: bankObj[j]["CardNumber"],
        card_type: bankObj[j]["CardType"],
        expiration_month: bankObj[j]["CardExpiryMonth"],
        expiration_year: bankObj[j]["CardExpiryYear"],
        cvv_code: bankObj[j]["CardCVV"],
        zip_code: bankObj[j]["CardZipCode"],
        PaymentStatus: bankObj[j]["PaymentStatus"],
        name_on_bank_account: bankObj[j]["NameonAccount"],
        bank_name: bankObj[j]["BankName"],
        account_number: bankObj[j]["AccountNumber"],
        routing_number: bankObj[j]["RoutingNumber"],
        Status: bankObj[j]["Status"],
        InvoiceAmount: bankObj[j]["InvoiceAmount"],
        DatePaid: bankObj[j]["PaidDate"],
      };

      paymentdata.push(paymentData);
    }

    for (var j = 0; j < creditCardObj.length; j++) {
      let paymentData = {};
      paymentData = {
        PaymentID: creditCardObj[j]["PaymentID"],
        PaymentType: creditCardObj[j]["PaymentType"],
        name_on_card: creditCardObj[j]["CardName"],
        card_number: creditCardObj[j]["CardNumber"],
        card_type: creditCardObj[j]["CardType"],
        expiration_month: creditCardObj[j]["CardExpiryMonth"],
        expiration_year: creditCardObj[j]["CardExpiryYear"],
        cvv_code: creditCardObj[j]["CardCVV"],
        PaymentStatus: creditCardObj[j]["PaymentStatus"],
        zip_code: creditCardObj[j]["CardZipCode"],
        name_on_bank_account: creditCardObj[j]["NameonAccount"],
        bank_name: creditCardObj[j]["BankName"],
        account_number: creditCardObj[j]["AccountNumber"],
        routing_number: creditCardObj[j]["RoutingNumber"],
        Status: creditCardObj[j]["Status"],
        InvoiceAmount: creditCardObj[j]["InvoiceAmount"],
        DatePaid: creditCardObj[j]["PaidDate"],
      };

      paymentdata.push(paymentData);
    }

    var FinalNotes = this.state.notes.filter(
      (x) => x.NoteText !== "" && x.NoteText !== null
    );
    var finalAttachment = [];

    for (var i = 0; i < this.state.Attachments.length; i++) {
      if (!this.state.Attachments[i].hasOwnProperty("TrackingNumber")) {
        if (this.state.Attachments[i].hasOwnProperty("AttachmentName")) {
          finalAttachment.push(this.state.Attachments[i]);
        }
      }
    }
    var objdata = {};
    if (this.state.IsChanged) {
      objdata = {
        UserID: CommonConfig.loggedInUserData().PersonID,
        TrackingNumber: this.state.TrackingNumber,
        shipments: shipments,
        MovingBackToIndia: this.state.movingBackIndia,
        trackingData: TrackingData,
        from_address: from_address,
        to_address: to_address,
        PaymentData: paymentdata,
        manualTrackingData: ManualTrackingData,
        packages: packages,
        commercial: commercial,
        Notes: FinalNotes,
        invoiceData: paymentInvoiceData,
        paymentReceivedData: paymentReceivedData,
        paymentIssued: paymentIssued,
        DocumentList: finalAttachment,
        AllClear:
          this.state.AllClear.value === "Not Ready"
            ? null
            : this.state.AllClear.value === "Ready for Yes"
            ? "3"
            : this.state.AllClear.value === "Collections"
            ? "4"
            : this.state.AllClear.value,
        Amount: this.state.TotalCostReceived,
        TotalWeight: this.state.totalChargableWeight,
        TotalCommercialvalue: totalCommercial,
      };
    } else {
      objdata = {
        UserID: CommonConfig.loggedInUserData().PersonID,
        TrackingNumber: this.state.TrackingNumber,
        shipments: shipments,
        trackingData: TrackingData,
        MovingBackToIndia: this.state.movingBackIndia,
        from_address: from_address,
        to_address: to_address,
        PaymentData: paymentdata,
        manualTrackingData: ManualTrackingData,
        packages: packages,
        commercial: commercial,
        Notes: FinalNotes,
        invoiceData: paymentInvoiceData,
        paymentReceivedData: paymentReceivedData,
        paymentIssued: paymentIssued,
        DocumentList: finalAttachment,
        TotalWeight: this.state.totalChargableWeight,
        TotalCommercialvalue: totalCommercial,
      };

      var shipmentdata = {
        Second_data: objdata,
        trackingNumber: this.state.TrackingNumber,
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : "",
        Attachments: [],
        showGetrate: false,
        showGetrateError: false,
        data: {},
      };
    }
    this.showLoader();
    await api.post("fedexETDApi/fedexETD", shipmentdata).then(async (res) => {
      console.log("RES = ", res);
      if (res.data.result[0].Status == "SUCCESS") {
        var ETDDocUpdate = {
          LineNumber: res.data.result[0].LineNumber,
          DocumentProducer: res.data.result[0].DocumentProducer,
          DocumentType: res.data.result[0].DocumentType,
          FileName: res.data.result[0].FileName,
          Status: res.data.result[0].Status,
          DocumentId: res.data.result[0].DocumentId,
          Path: res.data.Path,
        };
        var ETDDocInsert = {
          LineNumber: res.data.result[0].LineNumber,
          SFLTrackingNumber: shipmentdata.trackingNumber,
          DocumentProducer: res.data.result[0].DocumentProducer,
          DocumentType: res.data.result[0].DocumentType,
          FileName: res.data.result[0].FileName,
          Status: res.data.result[0].Status,
          DocumentId: res.data.result[0].DocumentId,
          Path: res.data.Path,
        };
        var mainData = {
          etdUpdateData: ETDDocUpdate,
          SFLTrackingNumber: shipmentdata.trackingNumber,
          ETDDocInsert: ETDDocInsert,
        };
        await api.post("fedexETDApi/updateEtdDetails", mainData).then((res) => {
          this.hideLoader();
        });
      }
    });
  };

  getPackageContent = () => {
    try {
      let data = {
        stringMapType: "PACKAGECONTENT",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          this.setState({ PackageContentList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };

  getDocumentType = () => {
    try {
      let data = {
        stringMapType: "DOCUMENTATIONTYPE",
      };

      api
        .post("stringMap/getDocumentStringMap", data)
        .then((result) => {
          this.setState({ DocumentTypeList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };

  getStatusList = () => {
    try {
      let data = {
        stringMapType: "SHIPMENTSTATUS",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          this.setState({ ShipmentStatusList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };

  getShipmentInfo() {
    try {
      let data = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
      };
      api.post("scheduleshipment/getShipmentInfo", data).then((res) => {
        if (res.success) {
          console.log("Ansdhu = ", res);
          var shipmentType = {
            value: res.data[0].ShipmentType,
            label: res.data[0].ShipmentType,
          };
          var managedBy = {
            value: res.data[0].ManagedBy,
            label: res.data[0].ManagedByName,
          };
          this.setState({ previousAllClear: res.data[0].AllClear });
          if (res.data[0].AllClear === 1) {
            this.setState({ viewAllClear: true });
          }
          var allclearlist = {
            value:
              res.data[0].AllClear === 3 // ? "Ready for Yes"
                ? "Ready for Yes"
                : res.data[0].AllClear === 4 // ? "Ready for Yes"
                ? "Collections"
                : !CommonConfig.isEmpty(res.data[0].AllClear)
                ? res.data[0].AllClear === 0
                  ? "No"
                  : "Yes"
                : "Not Ready",
            label:
              res.data[0].AllClear === 3 // ? "Ready for Yes"
                ? "Ready for Yes"
                : res.data[0].AllClear === 4 // ? "Ready for Yes"
                ? "Collections"
                : !CommonConfig.isEmpty(res.data[0].AllClear)
                ? res.data[0].AllClear === 0
                  ? "No"
                  : "Yes"
                : "Not Ready",
          };
          // AllClear:
          // res.data[0].AllClear === 3 // ? "Ready for Yes"
          //   ? "Ready for Yes"
          //   : !CommonConfig.isEmpty(res.data[0].AllClear)
          //   ? res.data[0].AllClear === 0
          //     ? false
          //     : true
          //   : "Not Ready",

          var serviceName = {
            value: res.data[0].ServiceName,
            label: res.data[0].ServiceName,
          };

          var subServiceName = {
            value: res.data[0].SubServiceName,
            label: res.data[0].SubServiceName,
          };

          var containerName = {
            value: res.data[0].ContainerID,
            label: res.data[0].ContainerName,
          };
          // console.log('IsPackageAccess',res.data[0].IsPackageAccess);
          if (res.data[0].ServiceName === "FedEx") {
            this.getEtdCommercialInvoice(res.data[0].TrackingNumber);
          }

          this.setState({
            ManagedBy: managedBy,
            DocumentManagedBy: res.data[0].ManagedByName,
            TrackingNumber: res.data[0].TrackingNumber,
            CreatedBy: res.data[0].CreatedBy,
            PersonID: res.data[0].PersonID,
            CreatedByName: res.data[0].CreatedByName,
            // ipAddress: res.data[0].ipAddress,
            // ipLocation: res.data[0].ipLocation,
            userdetailsTooltip: "Name: " + res.data[0].CreatedByName,
            ServiceName: serviceName,
            SubServiceName: subServiceName,
            ContainerType: res.data[0].SubServiceName,
            Subservicename: false,
            DocumentServiceType: res.data[0].ServiceName,
            ShipmentDate: res.data[0].ShipmentDate,
            DocumentManagedBy: res.data[0].ManagedByName,
            ShipmentType: shipmentType,

            InvoiceDueDate: res.data[0].InvoiceDueDate,
            DocumentInvoiceDueDate: res.data[0].InvoiceDueDate,

            ShipmentStatus: res.data[0].ShipmentStatus,
            ContainerName: containerName,
            AllClear: allclearlist,
            // res.data[0].AllClear === 3 // ? "Ready for Yes"
            //   ? "Ready for Yes"
            //   : !CommonConfig.isEmpty(res.data[0].AllClear)
            //   ? res.data[0].AllClear === 0
            //     ? false
            //     : true
            //   : "Not Ready",

            viewAllClear:
              res.data[0].AllClear === 3 // ? "Ready for Yes"
                ? "Ready for Yes"
                : !CommonConfig.isEmpty(res.data[0].AllClear)
                ? res.data[0].AllClear === 0
                  ? false
                  : true
                : false,
            IsPackageAccess: !CommonConfig.isEmpty(res.data[0].IsPackageAccess)
              ? res.data[0].IsPackageAccess.data[0] === 0
                ? true
                : false
              : true,
          });

          this.getServiceByShipmentType(shipmentType.value);
          this.getSubserviceName(serviceName.value, shipmentType.value);
        }

        if (
          this.state.useraccess.userModuleAccess[15].ModuleID === 18 &&
          this.state.useraccess.userModuleAccess[15].WriteAccess === 1 &&
          this.state.useraccess.userModuleAccess[15].DeleteAccess === 0
        ) {
          if (this.state.AllClear.value == "No") {
            this.state.AllClearStatusList.splice(1, 1);
          }
        }
      });
    } catch (error) {
      console.log("error...", error);
    }
  }

  getAdditionalDetails() {
    try {
      let data = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
      };
      api.post("scheduleshipment/getAdditionalDetails", data).then((res) => {
        if (res.success) {
          if (res.data.length > 0) {
            this.setState({
              movingBackIndia: !CommonConfig.isEmpty(
                res.data[0].MovingBackToIndia
              )
                ? res.data[0].MovingBackToIndia.data[0] === 0
                  ? false
                  : true
                : "",
              isBackIndia: !CommonConfig.isEmpty(res.data[0].MovingBackToIndia)
                ? res.data[0].MovingBackToIndia.data[0] === 0
                  ? false
                  : true
                : "",
              NameAsPerPassport: res.data[0].NameAsPerPassport,
              PassportNumber: res.data[0].PassportNumber,
              YearsOutsideIndia: res.data[0].YearsOutsideIndia,
              StayInIndia: !CommonConfig.isEmpty(res.data[0].StayInIndia)
                ? res.data[0].StayInIndia.data[0] === 0
                  ? false
                  : true
                : "",
              LatestArrivalDate:
                res.data[0].LatestArrivalDate === "00/00/0000"
                  ? ""
                  : res.data[0].LatestArrivalDate,
              AppliedForTR: !CommonConfig.isEmpty(res.data[0].AppliedForTR)
                ? res.data[0].AppliedForTR.data[0] === 0
                  ? false
                  : true
                : "",
              AbleToProvidePassport: !CommonConfig.isEmpty(
                res.data[0].AbleToProvidePassport
              )
                ? res.data[0].AbleToProvidePassport.data[0] === 0
                  ? false
                  : true
                : "",
              VisaValidDate:
                res.data[0].VisaValidDate === "00/00/0000"
                  ? ""
                  : res.data[0].VisaValidDate,
              VisaCategory: res.data[0].ArrivalCategory,
              UserAdditionalDetailsID: res.data[0].UserAdditionalDetailsID,

              DocumentMovingBackToIndia: !CommonConfig.isEmpty(
                res.data[0].MovingBackToIndia
              )
                ? res.data[0].MovingBackToIndia.data[0] === 0
                  ? false
                  : true
                : "",
              DocumentNameAsPerPassport: res.data[0].NameAsPerPassport,
              DocumentYearsOutsideIndia: res.data[0].YearsOutsideIndia,
              DocumentStayInIndia: !CommonConfig.isEmpty(
                res.data[0].StayInIndia
              )
                ? res.data[0].StayInIndia.data[0] === 0
                  ? false
                  : true
                : "",
              DocumentLatestArrivalDate:
                res.data[0].LatestArrivalDate === "00/00/0000"
                  ? ""
                  : res.data[0].LatestArrivalDate,
              DocumentAppliedForTR: !CommonConfig.isEmpty(
                res.data[0].AppliedForTR
              )
                ? res.data[0].AppliedForTR.data[0] === 0
                  ? false
                  : true
                : "",
              DocumentAbleToProvidePassport: !CommonConfig.isEmpty(
                res.data[0].AbleToProvidePassport
              )
                ? res.data[0].AbleToProvidePassport.data[0] === 0
                  ? false
                  : true
                : "",
              DocumentVisaValidDate:
                res.data[0].VisaValidDate === "00/00/0000"
                  ? ""
                  : res.data[0].VisaValidDate,
              DocumentArrivalCategory: res.data[0].ArrivalCategory,
              CustomClearanceDate:
                res.data[0].CustomClearanceDate === "00/00/0000"
                  ? ""
                  : res.data[0].CustomClearanceDate,
            });
          }
        }
      });
    } catch (error) {
      console.log("error...", error);
    }
  }

  getTrackingDetail() {
    this.showLoader();
    try {
      let data = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
      };
      api
        .post("scheduleshipment/getShipmentTrackingDetail", data)
        .then((result) => {
          var i = 1;
          result.data.map((Obj) => {
            Obj.Index = i;
            i++;
            if (Obj.TrackingStatus === "Active") {
              let trackingID = {
                TrackingNumber: Obj.TrackingID,
                Carrier: Obj.Carrier,
              };
              this.state.DocumentTrackingList.push(trackingID);
            }
            return Obj;
          });
          // if (result.data.length > 0) {
          //   this.setState({ isTrackingNumberVisible: true });
          // }
          this.setState({ trackingNumberList: result.data });
          // this.setState({ PickupTrackingList: result.data });

          if (result.data.length === 0) {
            this.addnewRowTrackingNumber();
          }
          this.hideLoader();
        })
        .catch((err) => {
          this.hideLoader();
          console.log("error......", err);
        });
    } catch (err) {
      this.hideLoader();
      console.log("error", err);
    }
  }

  getPickupConfDetail() {
    try {
      let data = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
      };
      api
        .post("scheduleshipment/GetPickupconfDetails", data)
        .then((result) => {
          // if (result.data.length > 0) {
          //   this.setState({ isTrackingNumberVisible: true });
          // }
          // this.setState({ trackingNumberList: result.data });
          this.setState({ PickupTrackingList: result.data });

          // if (result.data.length === 0) {
          //   this.addnewRowTrackingNumber();
          // }
        })
        .catch((err) => {
          console.log("error......", err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getShipmentManualTracking() {
    try {
      let data = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
      };
      api
        .post("scheduleshipment/getShipmentManualTracking", data)
        .then((result) => {
          var i = 1;
          result.data.map((Obj) => {
            Obj.Index = i;
            Obj.ustime = false;
            i++;
            return Obj;
          });
          // if (result.data.length > 0) {
          //   this.setState({ isTrackingManualVisible: true });
          // }
          this.setState({ trackingManualList: result.data });
          if (result.data.length === 0) {
            this.addnewRowTrackingManual();
          }
        })
        .catch((err) => {
          console.log("error......", err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getnotesByID() {
    try {
      let data = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
      };
      api
        .post("scheduleshipment/getShipmentNotesByID", data)
        .then((result) => {
          var i = 0;
          result.data.map((Obj) => {
            Obj.Index = i;
            i++;
            return Obj;
          });
          result.data.map((Obj) => {
            Obj.disabled = i;
            i++;
            return Obj;
          });
          if (result.data.length > 0) {
            this.setState({ isNotesVisible: true });
          }
          this.setState({ notes: result.data });
          this.handleAddNotesRow();
        })
        .catch((err) => {
          console.log("error......", err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getDocumentation() {
    this.showLoader();
    try {
      let data = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
      };
      api
        .post("scheduleshipment/getDocumentation", data)
        .then((result) => {
          this.state.Attachments = [
            {
              Index: 1,
              FileName: "",
              DocumentType: "Commercial Invoice",
              Status: "Active",
              AttachmentName: "Commercial Invoice",
              TrackingNumber: "1",
              DocumentCreatedOn: moment().format(
                CommonConfig.dateFormat.dateOnly
              ),
              DocumentCreatedBy: "Auto",
            },
            {
              Index: 2,
              FileName: "",
              DocumentType: "Invoice",
              AttachmentName: "Invoice",
              TrackingNumber: "2",
              Status: "Active",
              DocumentCreatedOn: moment().format(
                CommonConfig.dateFormat.dateOnly
              ),
              DocumentCreatedBy: "Auto",
            },
            {
              Index: 3,
              FileName: "",
              DocumentType: "Contract",
              isGenerated: false,
              Status: "Active",
              AttachmentName: "",
              TrackingNumber: "3",
              DocumentCreatedOn: moment().format(
                CommonConfig.dateFormat.dateOnly
              ),
              DocumentCreatedBy: "Auto",
            },
            // (CommonConfig.loggedInUserData().PersonID == 1 ||
            //   CommonConfig.loggedInUserData().PersonID == 18) &&
            !CommonConfig.isEmpty(this.state.ContainerName.value) ||
            this.state.ContainerName == ""
              ? {
                  Index: 4,
                  FileName: "",
                  DocumentType: "HBL",
                  isGenerated: false,
                  Status: "Active",
                  AttachmentName: "",
                  TrackingNumber: "4",
                  DocumentCreatedOn: moment().format(
                    CommonConfig.dateFormat.dateOnly
                  ),
                  DocumentCreatedBy: "Auto",
                }
              : {},
          ];

          if (this.state.ShipmentType.value !== "Ocean") {
            this.state.Attachments.splice(2, 1);
            console.log("splice", this.state.Attachments.splice(2, 1));
          }
          var i = this.state.ShipmentType.value === "Ocean" ? 4 : 3;

          result.data.map((Obj) => {
            var n = Obj.AttachmentPath.includes("auth/esign_client");
            Obj.Index = i;
            if (n) {
              Obj.Index = 3;
              Obj.isGenerated = true;
              Obj.TrackingNumber = "3";
              Obj.DocumentCreatedOn = moment().format(
                CommonConfig.dateFormat.dateOnly
              );
              Obj.DocumentCreatedBy = "Auto";
              this.state.Attachments.splice(2, 1);
            }
            i++;
            return Obj;
          });

          var PrepaidLabels = [];

          // for (var j = 0; j < result.data.length; j++) {
          //   if (result.data[j].DocumentType == "Prepaid Labels") {
          //     PrepaidLabels.push(result.data[j]);
          //   } else {
          //     this.state.Attachments.push(result.data[j]);
          //   }
          // }
          // if (PrepaidLabels.length > 0) {
          //   for (var j = 0; j < PrepaidLabels.length; j++) {
          //     this.state.Attachments.push(PrepaidLabels[0]);
          //   }
          // }
          for (var j = 0; j < result.data.length; j++) {
            if (result.data[j].DocumentType == "Prepaid Labels") {
              PrepaidLabels.push(result.data[j]);
            } else {
              this.state.Attachments.push(result.data[j]);
            }
          }
          var remainingfile = [];
          if (PrepaidLabels.length > 0) {
            for (var i = 0; i < PrepaidLabels.length; i++) {
              let comparevalue = PrepaidLabels[i].FileName.slice(-6);
              console.log("PrepaidLabels[i].FileName = ", PrepaidLabels);
              console.log("ompate = ", comparevalue);
              if (comparevalue === "-1.pdf" || comparevalue === " -1.pdf") {
                this.state.Attachments.push(PrepaidLabels[i]);
              } else {
                remainingfile.push(PrepaidLabels[i]);
              }
            }
            console.log("Anshul data14 = ", remainingfile.length);
            console.log("remainingfile.length = ", remainingfile.length);
            if (remainingfile.length > 0) {
              console.log("IN Data");
              var comparevalue = "";
              for (var i = 0; i < remainingfile.length; i++) {
                comparevalue = remainingfile[i].AttachmentName.slice(0, 10);
                if (comparevalue !== "label") {
                  console.log(
                    "comparevalue.includes('label')",
                    comparevalue.includes("label")
                  );
                  if (comparevalue.includes("label") === false) {
                    this.state.Attachments.push(remainingfile[i]);
                  }
                }
              }
            }
          } else {
            console.log("Wlcome Test");
            if (PrepaidLabels.length > 0) {
              for (var j = 0; j < PrepaidLabels.length; j++) {
                this.state.Attachments.push(PrepaidLabels[0]);
              }
            }
          }

          if (
            this.state.ServiceName.value === "FedEx" ||
            (this.state.ServiceName.value === "SFL" &&
              this.state.ShipmentType.value === "Air" &&
              this.state.SubServiceName.value === "SFL Saver") ||
            ((this.state.ServiceName.value == "SFL Worldwide" &&
              this.state.ShipmentType.value === "Ocean" &&
              this.state.SubServiceName.value === "Texas Console") ||
              /////////////////for prepaid label genrated ocean tacking//////////////
              this.state.SubServiceName.value === "New Jersey Console" ||
              this.state.SubServiceName.value === "California Console")
          ) {
            console.log("Wlcome Anshu");
            var data = {
              Index: i,
              FileName: "",
              DocumentType: "Prepaid Labels",
              isGenerated: true,
              Status: "Active",
              DateTime: new Date().getTime(),
              DocumentCreatedOn: moment().format(
                CommonConfig.dateFormat.dateOnly
              ),
              DocumentCreatedBy: "Auto",
            };

            this.state.Attachments.push(data);
          }
          this.hideLoader();
        })
        .catch((err) => {
          this.hideLoader();
          console.log("error......", err);
        });
    } catch (err) {
      this.hideLoader();
      console.log("error", err);
    }
  }

  getCommunicationList() {
    try {
      let data = {
        EntityID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
        EntityType: "Shipment",
      };
      api
        .post("scheduleshipment/getCommuncationDetail", data)
        .then((result) => {
          if (result.success) {
            this.setState({ CommuncationList: result.data });
          } else {
            cogoToast.error("Something went wrong");
          }
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

  selectChange = (event, value, type) => {
    if (value != null) {
      if (type === "AllClear") {
        if (this.state.AllClear !== value.value) {
          // value.value === 0 ? ""
          if (
            this.state.AllClear === "Yes" &&
            value.value === "No" &&
            this.state.useraccess.userModuleAccess[15].ModuleID === 18 &&
            this.state.useraccess.userModuleAccess[15].WriteAccess === 1 &&
            this.state.useraccess.userModuleAccess[15].DeleteAccess === 0
          ) {
            this.setState({ IsChanged: false });
          } else if (
            this.state.AllClear === "Yes" &&
            value.value === "No" &&
            this.state.useraccess.userModuleAccess[15].ModuleID === 18 &&
            this.state.useraccess.userModuleAccess[15].WriteAccess === 1 &&
            this.state.useraccess.userModuleAccess[15].DeleteAccess === 1
          ) {
            this.openConfirmAllClear();
          } else {
            // let useraccess = JSON.parse(localStorage.getItem("loggedInUserData"));
            // console.log(
            //   "useraccess",
            //   this.state.useraccess.userModuleAccess[15]
            // );
            if (
              this.state.useraccess.userModuleAccess[15].ModuleID === 18 &&
              this.state.useraccess.userModuleAccess[15].WriteAccess === 1 &&
              this.state.useraccess.userModuleAccess[15].DeleteAccess === 0
            ) {
              if (value.value === "Yes" || value.value === "Not Ready") {
                this.setState({ IsChanged: false });
              } else {
                if (
                  this.state.useraccess.userModuleAccess[15].ModuleID === 18 &&
                  this.state.useraccess.userModuleAccess[15].WriteAccess ===
                    1 &&
                  this.state.useraccess.userModuleAccess[15].DeleteAccess ===
                    0 &&
                  this.state.AllClear != "Yes"
                ) {
                  this.setState({
                    AllClear: value,
                    IsChanged: true,
                    viewAllClear: value.value === "Yes" ? true : false,
                  });
                } else {
                  this.setState({ IsChanged: false });
                }
              }
            } else if (
              value.value === "Yes" &&
              this.state.TotalCostInvoice !=
                this.state.TotalCostReceived.toFixed(2)
            ) {
              this.setState({ IsChanged: false });

              cogoToast.error("Invoice and Payment Received does not match");
            } else if (
              (value.value === "Yes" && this.state.AllClearYes === false) ||
              (value.value === "No" &&
                this.state.AllClear.label === "Yes" &&
                this.state.AllClearYes === false)
            ) {
              debugger;
              this.setState({
                IsChanged: false,
              });
              cogoToast.error("Please open accounts tab to enable this field");
            } else {
              this.setState({
                AllClear: value,
                IsChanged: true,
                viewAllClear: value.value === "Yes" ? true : false,
              });
            }
          }
        }
      } else if (type === "ServiceType") {
        this.setState({
          Subservicename: false,
          ServiceName: value,
          SubServiceName: "",
        });
        this.getSubserviceName(value.value, this.state.ShipmentType.value);
      } else if (type === "SubServiceType") {
        this.setState({ SubServiceName: value });
      } else if (type === "ManagedBy") {
        this.setState({ ManagedBy: value });
      } else if (type === "ReadyTime") {
        //this.setState({ ReadytimeView: value.label });
        var ATimelist =
          this.state.PickupVendorName.value === 68 &&
          (this.state.ShipmentType.value === "Ocean" ||
            this.state.ShipmentType.value === "Ground")
            ? CommonConfig.FedexGroundAvailabletime
            : this.state.PickupVendorName.value === 68 &&
              this.state.ShipmentType.value === "Air"
            ? CommonConfig.FedexExpressAvailabletime
            : CommonConfig.OtherAvailabletime;
        var namelist = [];
        var avaliblelist = [];
        var sumoflabel = 0;
        var namelabel = 0;
        namelist = this.state.ReadyTimeList.filter((name) => {
          if (name.view === value.label) {
            return name;
          }
        });
        console.log("nnnn", namelist);
        this.setState({ ReadyTime: namelist[0].value });

        avaliblelist = ATimelist.filter((name) => {
          sumoflabel = parseInt(namelist[0].label + 2);
          namelabel = parseInt(name.label);
          if (namelabel >= sumoflabel) {
            return name;
          }
        });

        this.setState({ AvailableTimeList: avaliblelist });
        var avalibletimelists = {
          value: avaliblelist[0].label,
          label: avaliblelist[0].view,
        };
        this.setState({
          availibletimeView: avalibletimelists,
          AvailableTime: avaliblelist[0].value,
        });

        this.setState({
          ReadytimeView: value,
          //ReadyTime: event.target.value,
          ReadyTimeErrHelperText: "",
          ReadyTimeErr: false,
        });
      } else if (type === "AvailableTime") {
        this.setState({
          availibletimeView: value,
          //AvailableTime: event.target.value,
          AvailableTimeErrHelperText: "",
          AvailableTimeErr: false,
        });
        var avaliblenamelist = this.state.AvailableTimeList.filter((name) => {
          if (name.view === value.label) {
            return name;
          }
        });

        console.log("nnnn", avaliblenamelist);
        this.setState({ AvailableTime: avaliblenamelist[0].value });
      } else if (type === "ContainerName") {
        this.setState({ ContainerName: value });
      } else if (type === "PickupProvider") {
        if (
          value.value == 68 &&
          (this.state.ShipmentType.value === "Ocean" ||
            this.state.ShipmentType.value === "Ground")
        ) {
          this.setState({
            pickupDisable: false,
            pickuptimeshow: true,
            ReadytimeView: "",
            ReadyTime: "",
            availibletimeView: "",
            avaliblelist: "",
            ReadyTimeList: CommonConfig.FedexGroundStarttime,
            AvailableTimeList: CommonConfig.FedexGroundAvailabletime,
          });
          var yesterdaydate = Datetime.moment();
          var yesterday = momentTimezone(yesterdaydate)
            .tz(CommonConfig.UStimezone)
            .format();

          var before = moment().tz("America/New_York");
          before = new Date();

          var options = { timeZone: "America/New_York" };
          //var before = datebefore(options);
          // var before = momentTimezone(datebefore)
          //   .tz(CommonConfig.UStimezone)
          //   .format("ddd MMM DD yyyy HH:MM:ss GMT z (Z)");
          // var before = format(datebefore, "yyyy-MM-dd HH:mm:ss", {
          //   timeZone: "America/New_York",
          // });
          // console.log("bbb", datebefore);
          console.log("bbb", before);

          var addDayTotal = 0;
          if (
            this.state.ServiceName.value === "SFL" &&
            this.state.ShipmentType.value === "Air" &&
            this.state.SubServiceName.value === "SFL Saver"
          ) {
            if (before.getDay() == 0) {
              addDayTotal = 13;
            } else if (before.getDay() == 6) {
              addDayTotal = 14;
            } else {
              addDayTotal = 15;
            }
          } else if (
            this.state.ShipmentType.value != "Ground" &&
            this.state.ShipmentType.value != "Ocean"
          ) {
            if (before.getDay() == 0) {
              addDayTotal = 2;
            } else if (before.getDay() == 6) {
              addDayTotal = 3;
            } else if (before.getDay() == 5) {
              addDayTotal = 3;
            } else {
              addDayTotal = 1;
            }
          } else {
            if (before.getDay() == 0) {
              addDayTotal = 13;
            } else if (before.getDay() == 6) {
              addDayTotal = 14;
            } else {
              addDayTotal = 15;
            }
          }

          if (addDayTotal != 0) {
            before = before.setDate(before.getDate() + addDayTotal);
            before = Datetime.moment(before);
            const date = new Date(before);
            const usTimeZone = "America/New_York"; // Replace with the desired US time zone
            const usDate = date.toLocaleString("en-US", {
              timeZone: usTimeZone,
            });
            before = Datetime.moment(usDate);
          }
          valid1 = function(current) {
            const usTimeZone = "America/New_York"; // Replace with the desired US time zone
            const usDate = current.toLocaleString("en-US", {
              timeZone: usTimeZone,
            });
            var ustimee = Datetime.moment(usDate);
            var USyesterday = momentTimezone(yesterday).tz(
              CommonConfig.UStimezone
            );
            console.log(
              "yesss11",
              momentTimezone(yesterday).tz(CommonConfig.UStimezone)
            );
            return (
              ustimee.day() !== 0 &&
              ustimee.day() !== 6 &&
              ustimee.isAfter(USyesterday) &&
              ustimee.isBefore(before)
            );
          };
          document.getElementById("NonFedexDates").style.display = "none";
          document.getElementById("FedexDates").style.display = "block";
        } else if (value.value == "NULL") {
          this.setState({
            pickupDisable: true,
            ReadyTime: "",
            ReadytimeView: "",
            AvailableTime: "",
            availibletimeView: "",
            PickupDate: "",
            NotesforPickup: "",
          });
        } else if (
          value.value == 68 &&
          this.state.ShipmentType.value === "Air"
        ) {
          this.setState({
            pickupDisable: false,
            ReadytimeView: "",
            ReadyTime: "",
            availibletimeView: "",
            avaliblelist: "",
            ReadyTimeList: CommonConfig.FedexExpressStarttime,
            AvailableTimeList: CommonConfig.FedexExpressAvailabletime,
          });
          document.getElementById("FedexDates").style.display = "none";
          document.getElementById("NonFedexDates").style.display = "block";
        } else {
          this.setState({
            pickupDisable: false,
            ReadytimeView: "",
            ReadyTime: "",
            availibletimeView: "",
            avaliblelist: "",
            ReadyTimeList: CommonConfig.OtherStarttime,
            AvailableTimeList: CommonConfig.OtherAvailabletime,
          });
          document.getElementById("FedexDates").style.display = "none";
          document.getElementById("NonFedexDates").style.display = "block";
        }
        //111

        this.setState({ PickupVendorName: value });
      } else if (type === "ShipmentType") {
        this.setState({
          ShipmentType: value,
          SubServiceName: "",
          ServiceName: "",
          SubServiceList: [],
        });
        this.getServiceByShipmentType(value.value);
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

  navigateChange = (key, name) => {
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

      if (name == "Package" && this.state.PackageCount == 0) {
        this.state.PackageCount = 1;
        this.getPackageContent();
        this.getPackageDetail();
      }
      if (name == "Commercial Inv." && this.state.CommercialCount == 0) {
        this.state.CommercialCount = 1;
        if (this.state.PackageCount == 0) {
          this.getPackageDetail();
        }
        this.getCommercialInvoiceDetail();
      }

      if (name == "Accounts" && this.state.AccountCountdata == 0) {
        this.state.AccountCountdata = 1;
        this.getAccountDetail();
        this.checkInsurance();
        this.getServiceDescription();
        this.getpaymentType();
        this.getPaymentStatus();
        this.setState({ AllClearYes: true });
      }
      if (name == "Tracking" && this.state.TrackingdtatsCount == 0) {
        this.state.TrackingdtatsCount = 1;

        this.trackingService();

        this.getTrackingDetail();
        this.getPickupConfDetail();
        this.getShipmentManualTracking();
      }

      if (name == "Documentation" && this.state.DocumentationCount == 0) {
        this.state.DocumentationCount = 1;
        // Accounting
        this.getAccountDetail();
        this.checkInsurance();
        this.getServiceDescription();
        this.getpaymentType();
        this.getPaymentStatus();

        // Document

        this.getDocumentType();
        this.getDocumentation();
        this.getCommunicationList();
        // this.addnewRowTrackingNumber();
      }
    }
  };

  disableCommercial = (PackageType) => {
    let stepsList = this.state.Steps;
    let activeIndex = stepsList.findIndex((x) => x.classname === "active");
    if (activeIndex === 2 && PackageType === "Envelop") {
      stepsList[activeIndex + 1]["classname"] = "active";
      stepsList[activeIndex]["classname"] = "Inactive";
      this.setState({ Steps: stepsList });
      let divID = stepsList[activeIndex + 1]["stepId"];
      let activeDiv = stepsList[activeIndex]["stepId"];
      document.getElementById(divID).style.display = "block";
      document.getElementById(activeDiv).style.display = "none";
    }
  };

  toStates(countryData) {
    try {
      let data = {
        countryId: countryData.value,
      };

      api
        .post("location/getStateList", data)
        .then((res) => {
          if (res.success) {
            if (res.data.length) {
              // var ToState = {
              //   value: this.state.toState,
              //   label: this.state.toState,
              // };
              this.setState({
                toStateList: res.data,
                // toState: ToState,
                toStateAutoComplete: res.data.length ? true : false,
              });
            } else {
              this.setState({
                toStateList: res.data,
                toStateAutoComplete: res.data.length ? true : false,
              });
            }

            if (this.state.toState == "") {
              this.state.toStateAutoComplete = true;
            } else {
              this.state.toStateAutoComplete = false;
              // this.state.toState = this.state.toState;
            }
          }
        })
        .catch((err) => {
          console.log("err...", err);
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {}
  }

  getStates(countryData) {
    try {
      let data = {
        countryId: countryData.value,
      };

      api
        .post("location/getStateList", data)
        .then((res) => {
          if (res.success) {
            this.showLoader();
            if (res.data.length) {
              // var FromState = {
              //   value: this.state.fromState,
              //   label: this.state.fromState,
              // };

              this.setState({
                fromStateList: res.data,
                //fromState: FromState,
                fromStateAutoComplete: res.data.length ? true : false,
              });
            } else {
              this.setState({
                fromStateList: res.data,
                fromStateAutoComplete: res.data.length ? true : false,
              });
            }
            if (this.state.fromState.value == "") {
              this.state.fromStateAutoComplete = true;
            } else {
              this.state.fromStateAutoComplete = false;
              //  this.state.fromState = this.state.fromState.value;
            }
            // if (this.state.fromState == "") {
            //   this.state.fromStateAutoComplete = true;
            // } else {
            //   this.state.fromStateAutoComplete = false;
            //   this.state.fromState = this.state.fromState;
            // }
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

  showLoader() {
    this.setState({ Loading: true });
  }

  hideLoader() {
    this.setState({ Loading: false });
  }

  getToFedexCityList(CityData, type) {
    this.showLoader();
    api
      .post("location/getCityList", CityData)
      .then((res) => {
        if (res.success) {
          this.setState({ ToFedExCityList: res.data });
          var tempFedexCity = [];
          tempFedexCity.push(res.data);
          if (type != "") {
            var SelectedToCity = _.findIndex(tempFedexCity[0], function(
              fedexCity
            ) {
              return fedexCity.CityName === type;
            });

            var fedexcityselto = {
              label: tempFedexCity[0][SelectedToCity].CityName,
              value: tempFedexCity[0][SelectedToCity].CityName,
            };
            this.setState({
              ToFedExSelectedCity: fedexcityselto,
            });
          }
          this.hideLoader();
        } else {
          this.setState({ ToFedExCityList: [] });
          this.hideLoader();
        }
      })
      .catch((error) => {
        cogoToast.error("Something Went Wrong");
      });
  }

  getFromFedexCityList(CityData, type) {
    this.showLoader();
    api
      .post("location/getCityList", CityData)
      .then((res) => {
        if (res.success) {
          this.setState({ FromFedExCityList: res.data });
          var tempFedexCity = [];
          tempFedexCity.push(res.data);
          if (type != "") {
            var SelectedFromCity = _.findIndex(tempFedexCity[0], function(
              fedexCity
            ) {
              return fedexCity.CityName === type;
            });

            var fedexcityselto = {
              label: tempFedexCity[0][SelectedFromCity].CityName,
              value: tempFedexCity[0][SelectedFromCity].CityName,
            };
            this.setState({
              FromFedExSelectedCity: fedexcityselto,
            });
          }
          this.hideLoader();
        } else {
          this.setState({ FromFedExCityList: [] });
          this.hideLoader();
        }
      })
      .catch((error) => {
        cogoToast.error("Something Went Wrong");
      });
  }

  getAddressDetails() {
    this.showLoader();
    try {
      let data = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
      };
      api
        .post("scheduleshipment/getShipmentByID", data)
        .then((res) => {
          if (res.success) {
            if (res.data.length) {
              let fromRes = res.data.filter(
                (x) => x.EntityType === "FromAddress"
              );
              let toRes = res.data.filter((x) => x.EntityType === "ToAddress");

              var fromCountry = this.state.CountryList.filter(
                (x) => x.CountryID === fromRes[0].CountryID
              );
              var toCountry = this.state.CountryList.filter(
                (x) => x.CountryID === toRes[0].CountryID
              );

              this.setState({
                fromCountryCode: fromCountry[0].CountryCode,
                toCountryCode: toCountry[0].CountryCode,
              });
              var selectedFromCountry = {
                value: fromCountry[0].CountryID,
                label: fromCountry[0].CountryName,
              };

              if (selectedFromCountry.label == "Canada") {
                this.setState({ isFromCountryCanada: true });
              } else {
                this.setState({ isFromCountryCanada: false });
              }

              var selectedToCountry = {
                value: toCountry[0].CountryID,
                label: toCountry[0].CountryName,
              };
              var fromMovingBack = {
                value: fromRes[0].MovingBack.data[0] === 0 ? false : true,
                label: fromRes[0].MovingBack.data[0] === 0 ? "No" : "Yes",
              };
              var fromEligibleForTr = {
                value: fromRes[0].EligibleForTR.data[0] === 0 ? false : true,
                label: fromRes[0].EligibleForTR.data[0] === 0 ? "No" : "Yes",
              };
              var fromOriginalPassortAvailable = {
                value:
                  fromRes[0].OriginalPassportAvailable.data[0] === 0
                    ? false
                    : true,
                label:
                  fromRes[0].OriginalPassportAvailable.data[0] === 0
                    ? "No"
                    : "Yes",
              };

              let fromOBJ = {
                AddressDetail: fromRes[0],
                CountryName: selectedFromCountry.label,
              };
              let toOBJ = {
                AddressDetail: toRes[0],
                CountryName: selectedToCountry.label,
              };

              // ======== fedex country validations ==============================
              var SelectedCountry = _.findIndex(
                this.state.CountryList,
                function(country) {
                  return country.CountryName === selectedFromCountry.label;
                }
              );

              var fromSelectedCountryData = this.state.CountryList[
                SelectedCountry
              ];

              if (fromSelectedCountryData.IsFedexCity == 1) {
                if (fromSelectedCountryData.IsZipAvailable == 1) {
                  this.setState({
                    isZipAvailable: true,
                    disableFromZip: false,
                    disableFromState: false,
                  });
                } else {
                  this.setState({
                    isZipAvailable: false,
                    disableFromZip: true,
                    disableFromState: true,
                  });
                }
                this.setState({
                  isFedexCountryFrom: true,
                });

                var CityData = {
                  CityType: "FedEx",
                  CountryId: fromSelectedCountryData.CountryID,
                };
                this.getFromFedexCityList(CityData, fromRes[0].FedexCity);
              }
              //==================== To country fededx =============
              var SelectedToCountry = _.findIndex(
                this.state.CountryList,
                function(country) {
                  return country.CountryName === selectedToCountry.label;
                }
              );

              var toSelectedCountryData = this.state.CountryList[
                SelectedToCountry
              ];

              if (toSelectedCountryData.IsFedexCity == 1) {
                if (toSelectedCountryData.IsZipAvailable == 1) {
                  this.setState({
                    disableToZip: false,
                    disableToState: false,
                    isZipAvailable: true,
                  });
                } else {
                  this.setState({
                    disableToZip: true,
                    disableToState: true,
                    isZipAvailable: false,
                  });
                }
                this.setState({
                  isFedexCountryTo: true,
                });

                var CityData = {
                  CityType: "FedEx",
                  CountryId: toSelectedCountryData.CountryID,
                };
                this.getToFedexCityList(CityData, toRes[0].FedexCity);
              }
              // ====== fedex country validation end ==============================
              //112
              if (res.data[0].PickupProviderId === 68) {
                this.setState({ pickuptimeshow: true });
              }
              var pickupVendorName = {
                value:
                  res.data[0].PickupProviderId === null
                    ? ""
                    : res.data[0].PickupProviderId,
                label:
                  res.data[0].PickupProviderName === null
                    ? ""
                    : res.data[0].PickupProviderName,
              };
              console.log("ppppp", pickupVendorName);
              if (pickupVendorName.label === "") {
                this.setState({ pickupDisable: true });
              } else {
                this.setState({ pickupDisable: false });
              }

              if (res.data[0].PickupDate != null) {
                this.state.checkPickup = "1";
              } else {
                this.state.checkPickup = "0";
              }

              if (pickupVendorName.label == "FedEx") {
                var yesterday = Datetime.moment();
                var before = new Date();
                var addDayTotal = 0;

                if (
                  this.state.ServiceName.value === "SFL" &&
                  this.state.ShipmentType.value === "Air" &&
                  this.state.SubServiceName.value === "SFL Saver"
                ) {
                  if (before.getDay() == 0) {
                    addDayTotal = 13;
                  } else if (before.getDay() == 6) {
                    addDayTotal = 14;
                  } else {
                    addDayTotal = 15;
                  }
                } else if (
                  this.state.ShipmentType.value != "Ground" &&
                  this.state.ShipmentType.value != "Ocean"
                ) {
                  if (before.getDay() == 0) {
                    addDayTotal = 2;
                  } else if (before.getDay() == 6) {
                    addDayTotal = 3;
                  } else if (before.getDay() == 5) {
                    addDayTotal = 3;
                  } else {
                    addDayTotal = 1;
                  }
                } else {
                  if (before.getDay() == 0) {
                    addDayTotal = 13;
                  } else if (before.getDay() == 6) {
                    addDayTotal = 14;
                  } else {
                    addDayTotal = 15;
                  }
                }

                if (addDayTotal != 0) {
                  before = before.setDate(before.getDate() + addDayTotal);
                  before = Datetime.moment(before);
                }
                valid1 = function(current) {
                  const usTimeZone = "America/New_York"; // Replace with the desired US time zone
                  const usDate = momentTimezone(yesterday)
                    .tz(CommonConfig.UStimezone)
                    .format();

                  console.log("usDate", usDate);

                  console.log("before", before);
                  return (
                    current.day() !== 0 &&
                    current.day() !== 6 &&
                    current.isAfter(usDate) &&
                    current.isBefore(before)
                  );
                };
                document.getElementById("FedexDates").style.display = "block";
                document.getElementById("NonFedexDates").style.display = "none";
              } else {
                document.getElementById("NonFedexDates").style.display =
                  "block";
                document.getElementById("FedexDates").style.display = "none";
              }
              var FromState = {
                value: fromRes[0].State,
                label: fromRes[0].State,
              };
              var ToState = {
                value: toRes[0].State,
                label: toRes[0].State,
              };
              if (toRes[0].State == "") {
                ToState = "";
              }
              // var fromstatetext = fromRes[0].State.slice(44);
              // var tostatetext = toRes[0].State.slice(44);

              this.getStates(selectedFromCountry);
              this.toStates(selectedToCountry);
              //   setTimeout(() => {
              this.setState({
                FromAddress: fromRes[0],
                FromCompanyName: fromRes[0].CompanyName,
                FromContactName: fromRes[0].ContactName,
                FromAddressLine1: fromRes[0].AddressLine1,
                FromAddressLine2: fromRes[0].AddressLine2,
                FromAddressLine3: fromRes[0].AddressLine3,
                FromZipCode: fromRes[0].ZipCode,
                FromPhone1: fromRes[0].Phone1,
                FromPhone2: fromRes[0].Phone2,
                FromEmail: fromRes[0].Email,

                fromState: FromState,
                fromCity: fromRes[0].City,
                FromAddressObj: fromOBJ,

                ToAddress: toRes[0],
                ToCompanyName: toRes[0].CompanyName,
                ToContactName: toRes[0].ContactName,
                ToAddressLine1: toRes[0].AddressLine1,
                ToAddressLine2: toRes[0].AddressLine2,
                ToAddressLine3: toRes[0].AddressLine3,
                ToZipCode: toRes[0].ZipCode,
                ToPhone1: toRes[0].Phone1,
                ToPhone2: toRes[0].Phone2,
                ToEmail: toRes[0].Email,
                toState: ToState, //toRes[0].State,
                toCity: toRes[0].City,
                ToAddressObj: toOBJ,

                //fromState: fromstatetext ? fromstatetext : fromRes[0].State,

                tempFromCity: fromRes[0].City,
                PickupVendorName: pickupVendorName,
                //toState: tostatetext ? tostatetext : toRes[0].State,

                tempToCity: toRes[0].City,
                ManagedByEmail: fromRes[0].ManagedByEmail,
                LocationType: fromRes[0].LocationType,
                DutiesPaidBy: fromRes[0].DutiesPaidBy,
                PickupDate: fromRes[0].PickupDate,
                IsPickup: fromRes[0].IsPickup.data[0] === 0 ? false : true,
                PackageType: fromRes[0].PackageType,
                FromMovingBack: fromMovingBack,
                FromEligibleForTR: fromEligibleForTr,
                FromOriginalPassortAvailable: fromOriginalPassortAvailable,
                selectedFromCountry: selectedFromCountry,
                selectedToCountry: selectedToCountry,
              });
              if (res.data[0].ReadyTime !== null) {
                if (
                  this.state.PickupVendorName.value === 68 &&
                  (this.state.ShipmentType.value === "Ocean" ||
                    this.state.ShipmentType.value === "Ground")
                ) {
                  this.setState({
                    ReadyTimeList: CommonConfig.FedexGroundStarttime,
                  });
                } else if (
                  this.state.PickupVendorName.value === 68 &&
                  this.state.ShipmentType.value === "Air"
                ) {
                  this.setState({
                    ReadyTimeList: CommonConfig.FedexExpressStarttime,
                  });
                } else {
                  this.setState({ ReadyTimeList: CommonConfig.OtherStarttime });
                }
                var readylist = this.state.ReadyTimeList.filter((name) => {
                  if (name.value === res.data[0].ReadyTime) {
                    return name;
                  }
                });
                var readytimelists = {
                  value: readylist[0].label,

                  label: readylist[0].view,
                };
                var ATimelist =
                  this.state.PickupVendorName.value === 68 &&
                  (this.state.ShipmentType.value === "Ocean" ||
                    this.state.ShipmentType.value === "Ground")
                    ? CommonConfig.FedexGroundAvailabletime
                    : this.state.PickupVendorName.value === 68 &&
                      this.state.ShipmentType.value === "Air"
                    ? CommonConfig.FedexExpressAvailabletime
                    : CommonConfig.OtherAvailabletime;
                var namelist = [];
                var avaliblelist = [];
                var sumoflabel = 0;
                var namelabel = 0;
                namelist = this.state.ReadyTimeList.filter((name) => {
                  if (name.view === readylist[0].view) {
                    return name;
                  }
                });
                console.log("nnnn", namelist);
                this.setState({ ReadyTime: namelist[0].value });

                avaliblelist = ATimelist.filter((name) => {
                  sumoflabel = parseInt(namelist[0].label + 2);
                  namelabel = parseInt(name.label);
                  if (namelabel >= sumoflabel) {
                    return name;
                  }
                });
                console.log("aaaa", avaliblelist);
                this.setState({ AvailableTimeList: avaliblelist });

                this.setState({
                  ReadytimeView: readytimelists,
                });
              }
              if (res.data[0].AvailableTime !== null) {
                var avaliblenamelist = this.state.AvailableTimeList.filter(
                  (name) => {
                    if (name.value === res.data[0].AvailableTime) {
                      return name;
                    }
                  }
                );
                console.log("nnnn", avaliblenamelist);
                var avalibletimelists = {
                  value: avaliblenamelist[0].label,
                  label: avaliblenamelist[0].view,
                };
                this.setState({
                  availibletimeView: avalibletimelists,
                  AvailableTime: res.data[0].AvailableTime,
                });
              }
              this.setState({
                NotesforPickup: res.data[0].SpecialInstruction,
              });

              // }, 5000);
              // this.state.toState = toOBJ.AddressDetail.State;
              //this.state.fromState = fromOBJ.AddressDetail.State;
              // setTimeout(() => {
              //   this.senderZipChange(fromRes[0].ZipCode);
              //   this.recipientZipChange(toRes[0].ZipCode);
              // }, 2000);

              // this.hideLoader();
            }
            // console.log("t..", this.state.ToAddress.CountryID);
            // console.log("f...", this.state.FromAddress.CountryID);
            // console.log("c...", this.state.commercialList.length);

            if (
              this.state.PackageType === "Envelop" ||
              this.state.selectedFromCountry.value ===
                this.state.selectedToCountry.value
              // this.state.FromAddress.CountryID ===
              //   this.state.ToAddress.CountryID &&
              // (this.state.commercialList.length <= 0 ||
              //   this.state.PackageType === "Envelop")
            ) {
              this.setState({
                Attachments: this.state.Attachments.filter(
                  (x) => x.DocumentType !== "Commercial Invoice"
                ),
              });
            } else {
              this.setState({
                Attachments: this.state.Attachments,
              });
            }
            this.hideLoader();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error...", err);
    }
  }

  handleClickOpenTrack = (value) => {
    this.setState({ IsfedexLabelOpen: true });
    this.setState({ setTrackingValue: value });
  };

  handleClickOpenPickip = (value, value2) => {
    this.setState({ cancelTrackNumber: value });
    this.setState({
      cancelPickupID: value2,
    });
    this.setState({ IsfedexLabelOpenPickup: true });
  };

  handleClickCancel = () => {
    this.setState({ IsfedexLabelOpen: false });
  };

  handleClickCancelPickup = () => {
    this.setState({ IsfedexLabelOpenPickup: false });
  };

  getContainerName = () => {
    try {
      api
        .get("scheduleshipment/getContainerName")
        .then((res) => {
          if (res.success) {
            res.data[res.data.length] = {
              ContainerID: "NULL",
              ContainerName: "Set To Null",
            };
            api
              .get("scheduleshipment/getPickupVendorList")
              .then((res2) => {
                if (res2.success) {
                  res2.data[res2.data.length] = {
                    VendorId: "NULL",
                    Name: "Set To Null",
                  };
                  // res2.data[res2.data.length] = {
                  //   VendorId: 0,
                  //   Name: "Not Available",
                  // };
                  this.setState({
                    ContainerNameList: res.data,
                    PickupVendorList: res2.data,
                  });
                  console.log("pp44", res2.data);
                }
              })
              .catch((err) => {
                console.log("error", err);
              });
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    } catch (err) {
      console.log("error...", err);
    }
  };

  getCountry() {
    this.showLoader();
    try {
      api
        .get("location/getCountryList")
        .then((res) => {
          if (res.success) {
            var Country = res.data;
            this.setState({ CountryList: Country });
            this.getAddressDetails();
          }
        })
        .catch((err) => {
          console.log("err..", err);
        });
    } catch (error) {}
  }

  selectChangeTab1 = (event, value, type) => {
    if (value != null) {
      if (type === "FromCountry") {
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
      } else if (type === "ToCountry") {
        var SelectedCountry = _.findIndex(this.state.CountryList, function(
          country
        ) {
          return country.CountryName === value.label;
        });

        var toSelectedCountryData = this.state.CountryList[SelectedCountry];

        if (
          toSelectedCountryData.IsFedexCity == 1 &&
          toSelectedCountryData.IsZipAvailable == 0
        ) {
          var SelectedCity = { label: "Select City" };
          this.setState({
            disableToZip: true,
            disableToState: true,
            isFedexCountryTo: true,
            ToFedExSelectedCity: SelectedCity,
          });

          var CityData = {
            CityType: "FedEx",
            CountryId: toSelectedCountryData.CountryID,
          };

          this.getToFedexCityList(CityData, "");
        } else {
          this.setState({
            disableToZip: false,
            disableToState: false,
            isFedexCountryTo: false,
          });
        }
        this.setState({ selectedToCountry: value, toCity: "", toState: "" });
        this.toStates(value);
      } else if (type === "MovingBack") {
        this.setState({ FromMovingBack: value });
      } else if (type === "PassportAvailable") {
        this.setState({ FromOriginalPassortAvailable: value });
      } else if (type === "EligibleTR") {
        this.setState({ FromEligibleForTR: value });
      }
    }
  };

  handleChangeFrom = (event, type) => {
    if (type === "companyname") {
      let CompanyName = event.target.value;
      this.setState({ FromCompanyName: CompanyName });
    } else if (type === "contactname") {
      let ContactName = event.target.value;
      this.setState({ FromContactName: ContactName });
    } else if (type === "address1") {
      let AddressLine1 = event.target.value;
      this.setState({ FromAddressLine1: AddressLine1 });
    } else if (type === "address2") {
      let AddressLine2 = event.target.value;
      this.setState({ FromAddressLine2: AddressLine2 });
    } else if (type === "address3") {
      let AddressLine3 = event.target.value;
      this.setState({ FromAddressLine3: AddressLine3 });
    } else if (type === "zip") {
      let ZipCode = event.target.value;

      // this.state.Fromaddress.ZipCode = event.target.value;
      // this.setState({ FromAddress: Fromaddress });
      // this.senderZipChange(event.target.value);
      this.setState({ FromZipCode: ZipCode });
    } else if (type === "phone1") {
      let Phone1 = event.target.value.replace(/\D/g, "");
      if (event.target.value.length <= 15) {
        this.setState({ FromPhone1: Phone1 });
      }
    } else if (type === "phone2") {
      let Phone2 = event.target.value.replace(/\D/g, "");
      if (event.target.value.length <= 15) {
        this.setState({ FromPhone2: Phone2 });
      }
    } else if (type === "email") {
      let Email = event.target.value;
      this.setState({ FromEmail: Email });
    } else if (type === "CreatedBy") {
      this.setState({ CreatedBy: event.target.value });
    }
  };

  CreatedByBlur = (event, type) => {
    if (type === "CreatedBy") {
      try {
        let data = {
          LoginID: event.target.value,
        };
        api.post("userManagement/getUserNameList", data).then((res) => {
          if (res.success) {
            if (res.data.length > 0) {
              this.setState({
                CreatedByName: res.data[0].Name,
                PersonID: res.data[0].PersonId,
              });
            } else {
              cogoToast.error("Please enter valid username");
            }
          }
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  handleChangeTo = (event, type) => {
    if (type === "companyname") {
      let CompanyName = event.target.value;
      this.setState({ ToCompanyName: CompanyName });
    } else if (type === "contactname") {
      let ContactName = event.target.value;
      this.setState({ ToContactName: ContactName });
    } else if (type === "address1") {
      let AddressLine1 = event.target.value;
      this.setState({ ToAddressLine1: AddressLine1 });
    } else if (type === "address2") {
      let AddressLine2 = event.target.value;
      this.setState({ ToAddressLine2: AddressLine2 });
    } else if (type === "address3") {
      let AddressLine3 = event.target.value;
      this.setState({ ToAddressLine3: AddressLine3 });
    } else if (type === "zip") {
      let ZipCode = event.target.value;
      this.setState({ ToZipCode: ZipCode });
      // let toAddress = this.state.ToAddress;
      // toAddress.ZipCode = event.target.value;
      // this.setState({ ToAddress: toAddress });
      // this.recipientZipChange(event.target.value);
    } else if (type === "phone1") {
      let Phone1 = event.target.value.replace(/\D/g, "");
      if (event.target.value.length <= 15) {
        this.setState({ ToPhone1: Phone1 });
      }
    } else if (type === "phone2") {
      let Phone2 = event.target.value.replace(/\D/g, "");
      if (event.target.value.length <= 15) {
        this.setState({ ToPhone2: Phone2 });
      }
    } else if (type === "email") {
      let Email = event.target.value;
      this.setState({ ToEmail: Email });
    }
  };

  handleAdditionalChange = (event, type) => {
    if (type === "MovingBackIndia") {
      this.setState({
        movingBackIndia: event.target.value,
        isBackIndia: event.target.value,
        movingBackIndiaErr: false,
        movingBackIndiaHelperText: "",
      });
    } else if (type === "NotesforPickup") {
      if (event.target.value.length <= 29) {
        this.setState({
          NotesforPickup: event.target.value,
          NotesforPickupErr: false,
          NotesforPickupHelperText: "",
        });
      }
    } else if (type === "StayInIndia") {
      this.setState({
        StayInIndia: event.target.value,
        stayinIndiaErr: false,
        stayinIndiaHelperText: "",
      });
    } else if (type === "AppliedForTR") {
      this.setState({
        AppliedForTR: event.target.value,
        appliedForTRErr: false,
        appliedForTRHelperText: "",
      });
    } else if (type === "AbleToProvidePassport") {
      this.setState({
        AbleToProvidePassport: event.target.value,
        ableToProvidePassportErr: false,
        ableToProvidePassportHelperText: "",
      });
    } else if (type === "VisaCategory") {
      this.setState({
        VisaCategory: event.target.value,
        visaCategoryErr: false,
        visaCategoryHelperText: "",
      });
    } else if (type === "NameAsPerPassport") {
      this.setState({
        NameAsPerPassport: event.target.value,
        nameAsperPassportErr: false,
        nameAsperPassportHelperText: "",
      });
    } else if (type === "YearsOutsideIndia") {
      this.setState({
        YearsOutsideIndia: event.target.value,
        yearsOutsideIndiaErr: false,
        yearsOutsideIndiaHelperText: "",
      });
    } else if (type === "PassportNumber") {
      this.setState({
        PassportNumber: event.target.value,
        PassportNumberErr: false,
        PassportNumberHelperText: "",
      });
    }
  };

  visaCategoryMenu = () => {
    return this.state.visaCategoryList.map((yn) => {
      return (
        <MenuItem classes={{ root: classes.selectMenuItem }} value={yn.value}>
          {" "}
          {yn.label}{" "}
        </MenuItem>
      );
    });
  };

  allClearMenu = () => {
    // console.log("useraccess", this.state.useraccess.userModuleAccess[15]);
    if (
      this.state.useraccess.userModuleAccess[15].ModuleID === 18 &&
      this.state.useraccess.userModuleAccess[15].WriteAccess === 1 &&
      this.state.useraccess.userModuleAccess[15].DeleteAccess === 0
    ) {
      return this.state.AllClearStatusList.map((yn) => {
        // if (yn.StringMapName === "Ready for Yes" || yn.StringMapName === "No") {
        let val =
          yn.Description === "Yes"
            ? true
            : yn.Description === "No"
            ? false
            : yn.Description;
        return (
          <MenuItem classes={{ root: classes.selectMenuItem }} value={val}>
            {" "}
            {yn.ExtDescription}{" "}
          </MenuItem>
        );
        //}
      });
    } else {
      return this.state.AllClearStatusList.map((yn) => {
        let val =
          yn.Description === "Yes"
            ? true
            : yn.Description === "No"
            ? false
            : yn.Description;
        return (
          <MenuItem classes={{ root: classes.selectMenuItem }} value={val}>
            {" "}
            {yn.ExtDescription}{" "}
          </MenuItem>
        );
      });
    }
  };

  yearsRender = () => {
    return this.state.yearsLength.map((year) => {
      return (
        <MenuItem classes={{ root: classes.selectMenuItem }} value={year.value}>
          {year.label}
        </MenuItem>
      );
    });
  };

  yesOrNo = () => {
    return this.state.yesOrNo.map((yn) => {
      return (
        <MenuItem classes={{ root: classes.selectMenuItem }} value={yn.value}>
          {" "}
          {yn.label}{" "}
        </MenuItem>
      );
    });
  };

  senderZipChange = (zip) => {
    let countryName = this.state.selectedFromCountry
      ? this.state.selectedFromCountry.label
      : "";
    if (zip.length) {
      fetch(CommonConfig.zipCodeAPIKey(zip, countryName))
        .then((result) => result.json())
        .then((data) => {
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

              // var CityData = data["results"][0]["postcode_localities"];
              // _.forEach(CityData, function(value, key) {
              // FinalCity.push({
              //   City_code: value,
              //   Name: value,
              // });
              // });

              // var CityData = _.filter(
              //   data["results"][0]["address_components"],
              //   function(data) {
              //     return data.types[0] === "locality";
              //   }
              // )[0].long_name;

              // FinalCity.push({
              //   City_code: CityData,
              //   Name: CityData,
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
              }

              var state1 = _.filter(
                data["results"][0]["address_components"],
                function(data) {
                  return data.types[0] === "administrative_area_level_1";
                }
              );

              var state2 = _.filter(
                data["results"][0]["address_components"],
                function(data) {
                  return data.types[0] === "administrative_area_level_2";
                }
              );

              if (state1.length > 0) {
                var state = state1[0].long_name;
              } else if (state2.length > 0) {
                var state = state2[0].long_name;
              }

              // console.log("States = 1" , state)
              var SelectedCity = {
                value: FinalCity[0].City_code,
                label: FinalCity[0].Name,
              };

              var SelectedState = { value: state, label: state };

              if (countryShortName === this.state.selectedFromCountry.label) {
                this.setState({
                  fromCityAutoComplete: FinalCity.length ? true : false,
                  fromStateAutoComplete: this.state.fromStateList.length
                    ? true
                    : false,
                  fromGoogleAPICityList: FinalCity,
                  fromState: this.state.fromStateList.length
                    ? SelectedState
                    : state,
                  fromCity:
                    SelectedCity != undefined
                      ? SelectedCity
                      : this.state.tempFromCity,
                });
              } else {
                this.setState({
                  fromCityAutoComplete: false,
                  fromStateAutoComplete: this.state.fromStateList.length
                    ? true
                    : false,
                  fromGoogleAPICityList: [],
                  fromState: "",
                  fromCity: "",
                });
              }
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

              if (countryShortName === this.state.selectedFromCountry.label) {
                this.setState({
                  fromCityAutoComplete: FinalCity.length ? true : false,
                  fromStateAutoComplete: this.state.fromStateList.length
                    ? true
                    : false,
                  fromGoogleAPICityList: FinalCity,
                  fromState: this.state.fromStateList.length
                    ? SelectedState
                    : state,
                  fromCity: SelectedCity,
                });
              } else {
                this.setState({
                  fromCityAutoComplete: false,
                  fromStateAutoComplete: this.state.fromStateList.length
                    ? true
                    : false,
                  fromGoogleAPICityList: [],
                  fromState: "",
                  fromCity: "",
                });
              }
            }

            cogoToast.success("Zip code found");
            this.setState({ Moveupdatetozip: true });
          } else {
            cogoToast.error("Zip code not found");
            this.setState({
              fromCityAutoComplete: false,
              //Moveupdatefromzip: false,
              fromStateAutoComplete: this.state.fromStateList.length
                ? true
                : false,
              fromGoogleAPICityList: [],
              // toState: "",
              // toCity: "",
            });
            // this.setState({
            //   fromCityAutoComplete: false,
            // Moveupdatetozip: false,
            // fromState: "",
            // fromCity: "",
            //   fromStateAutoComplete: this.state.fromStateList.length
            //     ? true
            //     : false,
            //   fromGoogleAPICityList: [],
            //   fromState: "",
            //   fromCity: "",
            // });
          }
        });
    }
  };

  recipientZipChange = (zip) => {
    let countryName = this.state.selectedToCountry
      ? this.state.selectedToCountry.label
      : "";
    if (zip.length) {
      fetch(CommonConfig.zipCodeAPIKey(zip, countryName))
        .then((result) => result.json())
        .then((data) => {
          console.log("data123 = ", data);
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

              // var CityData = data["results"][0]["postcode_localities"];
              // _.forEach(CityData, function(value, key) {
              //   FinalCity.push({
              //     City_code: value,
              //     Name: value,
              //   });
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
              }

              var state1 = _.filter(
                data["results"][0]["address_components"],
                function(data) {
                  return data.types[0] === "administrative_area_level_1";
                }
              );

              // var state2 = _.filter(
              //   data["results"][0]["address_components"],
              //   function(data) {
              //     if (data.types[0] == "administrative_area_level_2") {
              //       return data.types[0] === "administrative_area_level_2";
              //     }
              //   }
              // );
              var state2 = _.filter(
                data["results"][0]["address_components"],
                function(data) {
                  return data.types[0] === "administrative_area_level_2";
                }
              );

              // console.log("State 1 = " , state1 , "State 2 = ", state2, "||" , data.types ,data["results"])

              if (state1.length > 0) {
                var state = state1[0].long_name;
              } else if (state2.length > 0) {
                var state = state2[0].long_name;
              }
              console.log(
                "States = ",
                state1.length,
                "State2 = ",
                state2.length
              );
              if (state1.length == 0 && state2.length == 0) {
                if (
                  this.state.toState.value != "" ||
                  this.state.toState.value != undefined
                ) {
                  var state = this.state.toState;
                } else {
                  this.state.toStateAutoComplete = true;
                }
                // var state = ""
              }

              // var SelectedCity = {
              //   value: FinalCity[0].City_code,
              //   label: FinalCity[0].Name,
              // };

              var SelectedState = { value: state, label: state };

              console.log("SelectedState = ", SelectedState);

              if (countryShortName === this.state.selectedToCountry.label) {
                this.setState({
                  toCityAutoComplete: FinalCity.length ? true : false,
                  toStateAutoComplete: this.state.toStateList.length
                    ? true
                    : false,
                  toGoogleAPICityList: FinalCity,
                  //toState: state,
                  toState: this.state.toStateList.length
                    ? SelectedState
                    : state,
                  toCity:
                    SelectedCity != undefined
                      ? SelectedCity
                      : this.state.tempToCity,
                });
              } else {
                this.setState({
                  toCityAutoComplete: false,
                  toStateAutoComplete: this.state.toStateList.length
                    ? true
                    : false,
                  toGoogleAPICityList: [],
                  toState: "",
                  toCity: "",
                });
              }
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
              if (countryShortName === this.state.selectedToCountry.label) {
                this.setState({
                  toCityAutoComplete: FinalCity.length ? true : false,
                  toStateAutoComplete: this.state.toStateList.length
                    ? true
                    : false,
                  toGoogleAPICityList: FinalCity,
                  toState: this.state.toStateList.length
                    ? SelectedState
                    : state,
                  toCity: SelectedCity.label
                    ? SelectedCity.label
                    : SelectedCity,
                  ToFedExSelectedCity: SelectedCity,
                });
              } else {
                this.setState({
                  toCityAutoComplete: false,
                  toStateAutoComplete: this.state.toStateList.length
                    ? true
                    : false,
                  toGoogleAPICityList: [],
                  toState: "",
                  toCity: "",
                });
              }
            }
            this.setState({ Moveupdatefromzip: true });
            cogoToast.success("Zip code found");
          } else {
            cogoToast.error("Zip code not found");

            this.setState({
              toCityAutoComplete: false,
              //Moveupdatefromzip: false,
              toStateAutoComplete: this.state.toStateList.length ? true : false,
              toGoogleAPICityList: [],
              // toState: "",
              // toCity: "",
            });
          }
        });
    }
  };

  handleBlur = (event, type) => {
    if (type === "FromZipCode") {
      let Fromaddress = this.state.FromAddress;
      Fromaddress.ZipCode = event.target.value;
      this.setState({ FromAddress: Fromaddress });
      this.senderZipChange(event.target.value);
    } else if (type === "ToZipCode") {
      let toAddress = this.state.ToAddress;
      toAddress.ZipCode = event.target.value;
      this.setState({ ToAddress: toAddress });
      this.recipientZipChange(event.target.value);
    } else if (type === "fromState") {
      this.setState({ fromState: event.target.value });
    } else if (type === "toState") {
      this.setState({ toState: event.target.value });
    } else if (type === "toCity") {
      this.setState({ toCity: event.target.value });
    } else if (type === "fromCity") {
      this.setState({ fromCity: event.target.value });
    }
  };

  appendMonths() {
    return this.state.Month.map((mm) => {
      return (
        <MenuItem classes={{ root: classes.selectMenuItem }} value={mm.value}>
          {" "}
          {mm.label}{" "}
        </MenuItem>
      );
    });
  }

  appendYears() {
    return this.state.Year.map((yy) => {
      return (
        <MenuItem classes={{ root: classes.selectMenuItem }} value={yy.value}>
          {" "}
          {yy.label}{" "}
        </MenuItem>
      );
    });
  }

  ChangeToCity = (event, value) => {
    if (value === "FedEx") {
      if (CommonConfig.isEmpty(event)) {
        return null;
      } else {
        this.setState({ ToFedExSelectedCity: event });
        let Toaddress = this.state.ToAddress;
        Toaddress.FedexCity = event.label;
        this.setState({ ToAddress: Toaddress });
        // var GetRate = this.state.GetRate;
        // GetRate.FromFedExCity = event;
        // this.setState({ GetRate: GetRate });
      }
    } else {
      if (value != null) {
        this.setState({ toCity: value });
      }
    }
  };

  handleCityStateChange = (event, type) => {
    if (type === "toState") {
      this.setState({ toState: event.target.value });
    } else if (type === "toCity") {
      this.setState({ toCity: event.target.value });
    } else if (type === "fromState") {
      this.setState({ fromState: event.target.value });
    } else if (type === "fromCity") {
      this.setState({ fromCity: event.target.value });
    }
  };

  ChangeToState = (event, value) => {
    if (value != null) {
      this.setState({ toState: value });
    }
  };

  ChangeFromCity = (event, value) => {
    if (value === "FedEx") {
      if (CommonConfig.isEmpty(event)) {
        return null;
      } else {
        this.setState({ FromFedExSelectedCity: event });
        let Fromaddress = this.state.FromAddress;
        Fromaddress.FedexCity = event.label;
        this.setState({ FromAddress: Fromaddress });
        // var GetRate = this.state.GetRate;
        // GetRate.FromFedExCity = event;
        // this.setState({ GetRate: GetRate });
      }
    } else {
      if (value != null) {
        this.setState({ fromCity: value });
      } else {
        this.setState({ fromCity: value });
      }
    }
  };

  ChangeFromState = (event, value) => {
    if (value != null) {
      this.setState({ fromState: value });
    }
  };

  getPackageDetail() {
    // this.hideLoader();
    this.showLoader();
    try {
      let data = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
      };
      api
        .post("scheduleshipment/getShipmentPackageByID", data)
        .then((res) => {
          if (res.success) {
            console.log("RES123 = ", res);
            var l = 1;
            let cftTotal = 0;
            let totalChargableWeight = 0;
            let totalInsValue = 0;
            let insval = 0;
            res.data.map((Obj) => {
              Obj.Index = l;
              Obj.InsuredValue = parseFloat(Obj.InsuredValue).toFixed(2);
              cftTotal += Obj.CFT;
              totalChargableWeight = totalChargableWeight + Obj.ChargableWeight;
              insval = parseFloat(Obj.InsuredValue);
              totalInsValue = totalInsValue + insval;
              console.log("typesd= ", typeof Obj.InsuredValue);
              l++;
              return Obj;
            });

            this.state.totalInsuredValue = totalInsValue;
            console.log("totalInsValue = ", totalInsValue);

            if (res.data.length > 0) {
              this.setState({ isPackageDetailsVisible: true });
            }
            // setTimeout(() => {
            this.setState(
              {
                PackageList: res.data,
                totalChargableWeight: totalChargableWeight,
                DocumentTotalCFT: cftTotal,
                PackageType: res.data[0] ? res.data[0].PackageType : "Package",
                TotalPackages: res.data[0] ? res.data[0].TotalPackages : 0,
              },
              function() {
                this.Calculate();
              }
            );
          }
          this.hideLoader();
        })
        .catch((err) => {
          console.log(err);
          this.hideLoader();
        });
    } catch (err) {
      console.log("error", err);
      this.hideLoader();
    }
  }

  dateChange = (date, type, index) => {
    if (type === "InvoiceDate") {
      let paymentInvoiceList = this.state.PaymentList;
      let idx = paymentInvoiceList.findIndex((x) => x.Index === index);
      paymentInvoiceList[idx][type] = moment(date).format(
        CommonConfig.dateFormat.dateOnly
      );
      this.setState({ PaymentList: paymentInvoiceList });
      this.getLatestInvoiceDate();
    } else if (type === "PaymentIssuedDate" || type === "DatePaid") {
      let paymentIssued = this.state.paymentIssued;
      let idx = paymentIssued.findIndex((x) => x.Index === index);
      paymentIssued[idx][type] = moment(date).format(
        CommonConfig.dateFormat.dateOnly
      );
      this.setState({ paymentIssued: paymentIssued });
      console.log("paymentissued", this.state.paymentIssued);
    } else if (type === "PaymentReceivedDate") {
      let paymentReceived = this.state.paymentReceived;
      let idx = paymentReceived.findIndex((x) => x.Index === index);
      paymentReceived[idx][type] = date;
      this.setState({ paymentReceived: paymentReceived });
    } else if (type === "PickupDate") {
      let TrackingList = this.state.trackingManualList;
      let idx = TrackingList.findIndex((x) => x.Index === index);
      TrackingList[idx][type] = date;
      this.setState({ trackingManualList: TrackingList });
    } else if (type === "InvoiceDueDate") {
      this.setState({
        InvoiceDueDate: date,
        invoiceDueDateHelperText: "",
        invoiceDueDateErr: false,
      });
    }
  };

  paymentDateChange = (date, type, index) => {
    if (type === "Credit Card") {
      let creditCardList = this.state.creditCardList;
      let idx = creditCardList.findIndex((x) => x.Index === index);
      creditCardList[idx]["PaidDate"] = date;
      this.setState({ creditCardList: creditCardList });
    } else if (type === "Bank") {
      let bankList = this.state.bankList;
      let idx = bankList.findIndex((x) => x.Index === index);
      bankList[idx]["PaidDate"] = date;
      this.setState({ bankList: bankList });
    }
  };

  handleChangeInvoiceAccount = (event, type, index) => {
    const { value } = event.target;
    const PaymentList = this.state.PaymentList;
    let idx = PaymentList.findIndex((x) => x.Index === index);
    if (type === "Description") {
      PaymentList[idx][type] = value;
    }
    if (type === "Amount") {
      if (value.match(/^[-+]?\d{0,}(\.\d{0,2})?$/) || value === "") {
        PaymentList[idx][type] = value;
        PaymentList[idx]["TotalAmount"] =
          PaymentList[idx]["Amount"] * PaymentList[idx]["Quantity"];
      }
    }
    if (type === "Quantity") {
      PaymentList[idx][type] = value.replace(/\D/g, "");
      PaymentList[idx]["TotalAmount"] =
        PaymentList[idx]["Amount"] * PaymentList[idx]["Quantity"];
    }
    this.setState({ PaymentList: PaymentList });
    this.CostCalculator("Invoice");
  };

  CostCalculator = (type, IsFalse) => {
    if (type === "Invoice") {
      let paymentList = this.state.PaymentList.filter(
        (x) => x.Status === "Active"
      );
      var totalCost = 0;
      for (var i = 0; i < paymentList.length; i++) {
        totalCost = Number(totalCost) + Number(paymentList[i].TotalAmount);
      }
      totalCost = totalCost.toFixed(2);

      this.setState({ TotalCostInvoice: totalCost });
      console.log("Anshul= 1245 = ", this.state.TotalCostInvoice);
    }
    if (type === "Received") {
      let paymentReceived = this.state.paymentReceived.filter(
        (x) => x.Status === "Active"
      );
      var totalCost = 0;
      for (var i = 0; i < paymentReceived.length; i++) {
        totalCost = Number(totalCost) + Number(paymentReceived[i].Amount);
      }
      this.setState({ TotalCostReceived: totalCost });
    }
    if (type === "Issued") {
      let paymentIssued = this.state.paymentIssued.filter(
        (x) => x.Status === "Active"
      );
      var totalCost = 0;
      for (var i = 0; i < paymentIssued.length; i++) {
        totalCost = Number(totalCost) + Number(paymentIssued[i].Amount);
      }
      this.setState({ TotalCostIssued: totalCost });
    }
    if (type === "Commercial") {
      let commercialList = this.state.commercialList.filter(
        (x) => x.Status === "Active"
      );
      var totalCost = 0;
      for (var i = 0; i < commercialList.length; i++) {
        totalCost = Number(totalCost) + Number(commercialList[i].TotalValue);
      }
      this.setState({ TotalCostCommercial: totalCost });
      if (IsFalse) {
        this.showAESMessage(totalCost);
      }
    }
  };

  addAESFillingInvoice = () => {
    // this.setState({IsAESOpen : false ,
    //   IsAlreadyAESFilled :true
    // })
    // this.state.IsAlreadyAESFilled = true;
    const row = {
      ServiceDescription: "AES Filling Charges",
      InvoiceDate: moment().toDate(),
      Descriptiom: "",
      Quantity: 1,
      Amount: parseFloat(75).toFixed(2),
      TotalAmount: parseFloat(75).toFixed(2),
      CreatedByName: CommonConfig.loggedInUserData().Name,
      Status: "Active",
      ShippingInvoiceID: null,
      Index: this.state.PaymentList.length + 1,
    };
    this.setState(
      {
        PaymentList: [...this.state.PaymentList, row],
        IsAESOpen: false,
        IsAlreadyAESFilled: true,
      },
      function() {
        if (this.state.saveClicked.saveClick) {
          this.handleSave(this.state.saveClicked.redirect);
        } else {
          this.CostCalculator("Invoice");
        }
      }
    );
  };

  showAESMessage = (totalCost) => {
    let cost = totalCost ? totalCost : this.state.TotalCostCommercial;
    if (cost > 2500 && !this.state.IsAlreadyAESFilled) {
      this.setState({ IsAESOpen: true });
      // this.addAESFillingInvoice();
    }
  };

  handleChangepaymentReceived = (event, type, index) => {
    const { value } = event.target;
    const paymentReceived = this.state.paymentReceived;
    let idx = paymentReceived.findIndex((x) => x.Index === index);
    if (type === "ConfirmationNumber" || type === "Number") {
      paymentReceived[idx][type] = value;
    }
    if (type === "Amount") {
      if (value.match(/^[-+]?\d{0,}(\.\d{0,2})?$/) || value === "") {
        paymentReceived[idx][type] = value;
      }
    }
    this.setState({ paymentReceived: paymentReceived });
    this.CostCalculator("Received");
  };

  handleChangeviewPaymentIssued = (event, type, index) => {
    const { value } = event.target;
    const paymentIssued = this.state.paymentIssued;
    let idx = paymentIssued.findIndex((x) => x.Index === index);
    if (
      type === "InvoiceNumber" ||
      type === "ConfirmationNumber" ||
      type === "PaidStatus"
    ) {
      paymentIssued[idx][type] = value;
    }
    if (type === "Amount") {
      if (value.match(/^[-+]?\d{0,}(\.\d{0,2})?$/) || value === "") {
        paymentIssued[idx][type] = value;
      }
    }
    this.setState({ paymentIssued: paymentIssued });
    this.CostCalculator("Issued");
  };

  handleChangeBank = (event, type, index) => {
    const { value } = event.target;
    const bankList = this.state.bankList;
    let idx = bankList.findIndex((x) => x.Index === index);
    if (type === "RoutingNumber" || type === "AccountNumber") {
      bankList[idx][type] = value.replace(/\D/g, "");
    } else if (type === "InvoiceAmount") {
      if (value.match(/^[-+]?\d{0,}(\.\d{0,2})?$/) || value === "") {
        bankList[idx][type] = value;
      }
    } else {
      bankList[idx][type] = value;
    }
    this.setState({ bankList: bankList });
  };

  handleChangeCreditCard = (event, type, index) => {
    const { value } = event.target;
    const creditCardList = this.state.creditCardList;
    let idx = creditCardList.findIndex((x) => x.Index === index);
    if (type === "CardNumber" || type === "CardCVV") {
      creditCardList[idx][type] = value.replace(/\D/g, "");
    } else if (type === "CardZipCode") {
      creditCardList[idx][type] = value;
    } else if (type === "InvoiceAmount") {
      if (value.match(/^[-+]?\d{0,}(\.\d{0,2})?$/) || value === "") {
        creditCardList[idx][type] = value;
      }
    } else {
      creditCardList[idx][type] = value;
    }
    this.setState({ creditCardList: creditCardList });
  };
  DimensionOnBlur = (event, type, index) => {
    const PackageList = this.state.PackageList;
    var flag = 0;
    var selectedSequence = parseInt(event.target.value);
    if (PackageList.length > 1) {
      for (var i = 1; i < PackageList.length; i++) {
        if (type === "EstimetedWeight") {
          if (PackageList[i].EstimetedWeight === 0) {
            PackageList[i].EstimetedWeight = selectedSequence;
          }
        } else if (type === "Length") {
          if (PackageList[i].Length === 0) {
            PackageList[i].Length = selectedSequence;
          }
        } else if (type === "Width") {
          if (PackageList[i].Width === 0) {
            PackageList[i].Width = selectedSequence;
          }
        } else if (type === "Height") {
          if (PackageList[i].Height === 0) {
            PackageList[i].Height = selectedSequence;
          }
        } else if (type === "ChargableWeight") {
          if (PackageList[i].ChargableWeight === 0) {
            PackageList[i].ChargableWeight = selectedSequence;
          }
        } else if (type === "CFT") {
          if (PackageList[i].CFT === 0) {
            PackageList[i].CFT = selectedSequence;
          }
        }
      }
      console.log("packkk", PackageList);
      this.setState({ PackageList: PackageList }, function() {
        this.Calculate();
      });
    }
  };
  sequenceOnBlur = (event, type, index) => {
    const PackageList = this.state.PackageList;
    // var selectedSequence = event.target.value;
    var flag = 0;
    var selectedSequence = parseInt(event.target.value);
    var idx = PackageList.findIndex((x) => x.Index === index);
    debugger;
    if (
      type === "Sequence" &&
      (this.state.ContainerName.value === "" ||
        this.state.ContainerName.value === null)
    ) {
      cogoToast.error("Container number missing");
      PackageList[idx][type] = "";
      this.setState({ PackageList: PackageList });
    } else {
      // PackageList[idx][type] = value.replace(/\D/g, "");

      if (
        PackageList.length > 1 &&
        selectedSequence !== "" &&
        selectedSequence !== 0
      ) {
        for (var i = 1; i < PackageList.length; i++) {
          selectedSequence += 1;
          if (PackageList[i].Sequence === 0) {
            PackageList[i].Sequence = selectedSequence;
          }
        }
        console.log("packkk", PackageList);
        this.setState({ PackageList: PackageList });
      }

      var flag = 0;
      var selectedSequence = event.target.value;

      for (var i = 0; i < PackageList.length; i++) {
        if (
          selectedSequence == PackageList[i].Sequence &&
          selectedSequence > 0 &&
          index !== PackageList[i].Index
        ) {
          flag = 1;

          break;
          // cogoToast.error("Sequence number already in used");
        }
      }
      if (flag == 1 && type === "Sequence") {
        PackageList[idx][type] = "";
        cogoToast.error("Sequence number already in used");
      }
      // else {
      //   PackageList[idx][type] = value === "" ? "" : value.replace(/\D/g, "");
      // }
    }
    // for (var i = 0; i < PackageList.length; i++) {
    //   console.log("Pack..", PackageList[i]);
    //   if (
    //     selectedSequence == PackageList[i].Sequence &&
    //     index !== PackageList[i].Index
    //   ) {
    //     flag = 1;

    //     break;
    //     // cogoToast.error("Sequence number already in used");
    //   }
    // }
    // if (flag == 1) {
    //   cogoToast.error("Sequence number already in used");
    // }
  };

  PackageTtypeOnBlur = (event, type, index) => {
    const PackageList = this.state.PackageList;
    var selectedSequence = event.target.value;

    if (PackageList.length > 1) {
      for (var i = 1; i < PackageList.length; i++) {
        //    selectedSequence += 1;
        if (PackageList[i].PackageContent === "") {
          PackageList[i].PackageContent = selectedSequence;
        }
      }
      console.log("packkk", PackageList);
      this.setState({ PackageList: PackageList });
    }
  };

  PackTtypeOnBlur = (event, type, index) => {
    const PackageList = this.state.PackageList;
    var selectedSequence = event.target.value;

    if (PackageList.length > 1) {
      for (var i = 1; i < PackageList.length; i++) {
        //    selectedSequence += 1;
        if (PackageList[i].PackedType === "") {
          PackageList[i].PackedType = selectedSequence;
        }
      }
      console.log("packkk", PackageList);
      this.setState({ PackageList: PackageList });
    }
  };

  handleChangePackage = (event, type, index) => {
    const { value } = event.target;
    const PackageList = this.state.PackageList;
    const packlist = this.state.PackageList;
    var idx = PackageList.findIndex((x) => x.Index === index);
    if (type === "PackageContent") {
      if (value !== null) {
        PackageList[idx][type] = value.value;
      }
    } else if (type === "PackageNumber") {
      PackageList[idx][type] = value;
    } else if (
      type === "Sequence" ||
      type === "EstimetedWeight" ||
      type === "Height" ||
      type === "Width" ||
      type === "Length"
    ) {
      // var flag = 0;
      // var selectedSequence = event.target.value;

      // for (var i = 0; i < PackageList.length; i++) {
      //   if (
      //     selectedSequence == PackageList[i].Sequence &&
      //     selectedSequence > 0 &&
      //     index !== PackageList[i].Index
      //   ) {
      //     flag = 1;

      //     break;
      //     // cogoToast.error("Sequence number already in used");
      //   }
      // }
      // if (flag == 1 && type === "Sequence") {
      //   cogoToast.error("Sequence number already in used");
      // } else {
      PackageList[idx][type] = value === "" ? "" : value.replace(/\D/g, "");
      // }
    } else if (type === "InsuredValue") {
      if (value.match(/^\d{1,}(\.\d{0,2})?$/) || value === "") {
        PackageList[idx][type] = value === "" ? 0.0 : value;
      }
    }
    this.setState({ PackageList: PackageList }, function() {
      this.Calculate();
    });
  };

  Calculate = () => {
    this.setState({ Loading: true });
    if (
      this.state.selectedFromCountry.value &&
      this.state.selectedToCountry.value
    ) {
      var TotalChargeWeight = 0;
      var TotalCFT = 0;
      var TotalWeight = 0;
      var TotalChargable = 0;
      var TotalInsuredvalue = 0;

      var PackageList = this.state.PackageList;
      for (var i = 0; i < PackageList.length; i++) {
        this.showLoader();
        if (PackageList[i].Status === "Active") {
          var WE = 0;
          var LE = 0;
          var HE = 0;
          var Total = 0;
          var Weight = 0;
          var CFT = 0;
          var Chargable = 0;

          if (PackageList[i].EstimetedWeight) {
            Weight = PackageList[i].EstimetedWeight * 1;
          }

          if (PackageList[i].Width) {
            WE = PackageList[i].Width;
          }

          if (PackageList[i].Length) {
            LE = PackageList[i].Length;
          }

          if (PackageList[i].Height) {
            HE = PackageList[i].Height;
          }

          if (
            this.state.selectedFromCountry.value === 202 &&
            this.state.selectedToCountry.value === 202
          ) {
            Total = Math.ceil(parseFloat((WE * LE * HE) / 166)) * 1;
          } else {
            Total = Math.ceil(parseFloat((WE * LE * HE) / 139)) * 1;
          }

          if (
            this.state.selectedFromCountry.value === 89 &&
            this.state.selectedToCountry.value === 202
          ) {
            Total =
              Math.ceil(parseFloat(parseFloat(Total) / parseFloat(2.2))) * 1;
          }

          if (Weight > Total) {
            PackageList[i].ChargableWeight = Weight;
            TotalChargeWeight = parseInt(TotalChargeWeight) + parseInt(Weight);
          } else {
            PackageList[i].ChargableWeight = Total;
            TotalChargeWeight = parseInt(TotalChargeWeight) + parseInt(Total);
          }

          if (PackageList[i].ChargableWeight) {
            Chargable = PackageList[i].ChargableWeight;
          }

          CFT = parseFloat((WE * LE * HE) / 1728).toFixed(2) * 1;
          PackageList[i].CFT = CFT;
          TotalWeight = TotalWeight + Weight;
          TotalInsuredvalue =
            Number(TotalInsuredvalue) + Number(PackageList[i].InsuredValue);
          TotalCFT = TotalCFT + CFT;
          TotalChargable = TotalChargable + Chargable;
        }
      }
      // setTimeout(() => {
      this.setState(
        {
          PackageList: PackageList,
          totalChargableWeight: TotalChargable,
          totalCFT: TotalCFT,
          totalInsuredValue: TotalInsuredvalue,
        },
        function() {
          this.hideLoader();
        }
      );
    }
  };

  selectChangeTab2 = (event, type, idx) => {
    let index = this.state.PackageList.findIndex((x) => x.Index === idx);
    if (type === "TV") {
      let packgeList = this.state.PackageList;
      packgeList[index][type] = event.target.value;
      this.setState({ PackageList: packgeList });
    } else if (type === "Stretch") {
      let packgeList = this.state.PackageList;
      packgeList[index][type] = event.target.value;
      this.setState({ PackageList: packgeList });
    } else if (type === "Crating") {
      let packgeList = this.state.PackageList;
      packgeList[index][type] = event.target.value;
      this.setState({ PackageList: packgeList });
    } else if (type === "Repack") {
      let packgeList = this.state.PackageList;
      packgeList[index][type] = event.target.value;
      this.setState({ PackageList: packgeList });
    } else if (type === "PackedType") {
      let packgeList = this.state.PackageList;
      packgeList[index][type] = event.target.value;
      this.setState({ PackageList: packgeList });
    }
  };

  optionYes = () => {
    return this.state.YesNo.map((content) => {
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

  AvailableTimeList = () => {
    return this.state.AvailableTimeList.map((content) => {
      return (
        <MenuItem
          classes={{ root: classes.selectMenuItem }}
          value={content.value}
        >
          {" "}
          {content.view}{" "}
        </MenuItem>
      );
    });
  };

  packedBy = () => {
    return this.state.packedBy.map((content) => {
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

  addPackageRow = () => {
    let PackageList = this.state.PackageList;
    var row = {
      EstimetedWeight: 0,
      Height: 0,
      Length: 0,
      Width: 0,
      ChargableWeight: 0,
      PackageNumber:
        PackageList.filter((x) => x.Status === "Active").length + 1,
      Sequence: 0,
      CreatedBy: CommonConfig.loggedInUserData().Name,
      TV: false,
      Crating: false,
      Stretch: false,
      Repack: false,
      PackageContent: "",
      CFT: parseFloat(0).toFixed(2),
      PackedType: "",
      ShippingPackageDetailID: null,
      InsuredValue: parseFloat(0).toFixed(2),
      Status: "Active",
      Index: this.state.PackageList.length + 1,
    };
    PackageList.push(row);
    this.setState({
      PackageList: PackageList,
      TotalPackages: PackageList.filter((x) => x.Status === "Active").length,
    });
    // this.addnewRowCommercial();
  };

  removePackageRow = (index) => {
    var PackageList = this.state.PackageList;
    let Index = this.state.PackageList.findIndex((x) => x.Index === index);
    if (Index !== -1) {
      this.removeCommercialByPackageNumber(PackageList[Index]["PackageNumber"]);
      PackageList[Index]["Status"] = "Inactive";
      for (var i = Index; i < PackageList.length; i++) {
        if (PackageList[i]["Status"] === "Active") {
          PackageList[i]["PackageNumber"] = PackageList[i].PackageNumber - 1;
          PackageList[i]["Sequence"] = PackageList[i].Sequence - 1;
        }
      }

      if (PackageList.filter((x) => x.Status === "Active").length === 0) {
        this.setState({
          isPackageDetailsVisible: false,
          isComInvoiceVisible: false,
        });
      }
      this.setState({
        PackageList: PackageList,
        TotalPackages: PackageList.filter((x) => x.Status === "Active").length,
      });

      this.Calculate();
    }
  };

  formatPackageValue = (event, type, index) => {
    let PackageList = this.state.PackageList;
    let idx = this.state.PackageList.findIndex((x) => x.Index === index);
    let regexp = /^[0-9]+(\.[0-9][0-9])?$/;
    let val = parseFloat(event.target.value).toFixed(2);
    debugger;
    if (PackageList.length > 1 && this.state.identical === "Yes") {
      var TotalInsuredvalue = 0;
      for (var i = 1; i < PackageList.length; i++) {
        if (PackageList[i].InsuredValue === "0.00") {
          PackageList[i].InsuredValue = val;
          //TotalInsuredvalue += parseInt(PackageList[i].InsuredValue);
        }
      }

      PackageList.forEach((element) => {
        TotalInsuredvalue += parseInt(element.InsuredValue);
      });
      this.setState({ totalInsuredValue: TotalInsuredvalue });
    }
    if (regexp.test(val)) {
      PackageList[idx][type] = val;
      this.setState({ PackageList: PackageList });
    }
  };

  renderPackageNumber = () => {
    return this.state.PackageList.filter((x) => x.Status === "Active").map(
      (content, key) => {
        return (
          <MenuItem classes={{ root: classes.selectMenuItem }} value={key + 1}>
            {" "}
            {key + 1}{" "}
          </MenuItem>
        );
      }
    );
  };

  packageContentChange = (value, type, idx) => {
    if (value != null) {
      let packageList = this.state.PackageList;
      let index = this.state.PackageList.findIndex((x) => x.Index === idx);
      packageList[index][type] = value.value;
      this.setState({ PackageList: packageList });
    }
  };

  viewPackage = () => {
    const PackageContentList = this.state.PackageContentList.map((type) => {
      return { value: type.Description, label: type.Description };
    });
    return this.state.PackageList.filter((x) => x.Status === "Active").map(
      (packages, idx) => {
        const PackageContent = {
          value: packages.PackageContent,
          label: packages.PackageContent,
        };
        return (
          <tr>
            <td>
              <div className="package-select table-select small">
                <FormControl className={classes.formControl} fullWidth>
                  <Select
                    id="package_number"
                    name="package_number"
                    disabled={true}
                    value={packages.PackageNumber}
                    className="form-control"
                    onChange={(event) =>
                      this.handleChangePackage(
                        event,
                        "PackageNumber",
                        packages.Index
                      )
                    }
                  >
                    {this.renderPackageNumber()}
                  </Select>
                </FormControl>
              </div>
            </td>
            {this.state.ShipmentType.value == "Ocean" ? (
              <>
                <td>
                  <TextField
                    name="sequence"
                    id="sequence"
                    value={packages.Sequence}
                    onChange={(event) =>
                      this.handleChangePackage(
                        event,
                        "Sequence",
                        packages.Index
                      )
                    }
                    // PackageList.filter((x) => x.Status === "Active")
                    onBlur={(event) =>
                      this.sequenceOnBlur(event, "Sequence", packages.Index)
                    }
                    inputProps={{
                      maxLength: 3,
                    }}
                    InputProps={{
                      disableUnderline: true,
                      //  readOnly: this.state.ContainerName.value ? false : true,
                    }}
                  />
                </td>
                <td>
                  <div className="package-select">
                    <Autocomplete
                      id="package_number"
                      options={PackageContentList}
                      value={PackageContent}
                      getOptionLabel={(option) => option.label}
                      onChange={(event, value) =>
                        this.packageContentChange(
                          value,
                          "PackageContent",
                          packages.Index
                        )
                      }
                      onBlur={(event, value) =>
                        this.state.identical === "Yes"
                          ? this.PackageTtypeOnBlur(
                              event,
                              "packagetype",
                              packages.Index
                            )
                          : this.packageContentChange(
                              value,
                              "PackageContent",
                              packages.Index
                            )
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                </td>
              </>
            ) : null}
            <td>
              <TextField
                id="proposaltype"
                name="weight"
                value={packages.EstimetedWeight}
                onChange={(event) =>
                  this.handleChangePackage(
                    event,
                    "EstimetedWeight",
                    packages.Index
                  )
                }
                onBlur={(event) => {
                  this.state.identical === "Yes"
                    ? this.DimensionOnBlur(
                        event,
                        "EstimetedWeight",
                        packages.Index
                      )
                    : this.handleChangePackage(
                        event,
                        "EstimetedWeight",
                        packages.Index
                      );
                }}
                inputProps={{
                  maxLength: 3,
                }}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </td>
            <td>
              <TextField
                name="length"
                id="proposaltype"
                onChange={(event) =>
                  this.handleChangePackage(event, "Length", packages.Index)
                }
                onBlur={(event) => {
                  this.state.identical === "Yes"
                    ? this.DimensionOnBlur(event, "Length", packages.Index)
                    : this.handleChangePackage(event, "Length", packages.Index);
                }}
                value={packages.Length}
                inputProps={{
                  maxLength: 3,
                }}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </td>
            <td>
              <TextField
                name="width"
                id="proposaltype"
                value={packages.Width}
                onChange={(event) =>
                  this.handleChangePackage(event, "Width", packages.Index)
                }
                onBlur={(event) => {
                  this.state.identical === "Yes"
                    ? this.DimensionOnBlur(event, "Width", packages.Index)
                    : this.handleChangePackage(event, "Width", packages.Index);
                }}
                inputProps={{
                  maxLength: 3,
                }}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </td>
            <td>
              <TextField
                name="height"
                id="proposaltype"
                value={packages.Height}
                onChange={(event) =>
                  this.handleChangePackage(event, "Height", packages.Index)
                }
                onBlur={(event) => {
                  this.state.identical === "Yes"
                    ? this.DimensionOnBlur(event, "Height", packages.Index)
                    : this.handleChangePackage(event, "Height", packages.Index);
                }}
                inputProps={{
                  maxLength: 3,
                }}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </td>
            <td>
              <TextField
                type="number"
                name="chargableweight"
                id="proposaltype"
                disabled={true}
                value={packages.ChargableWeight}
                inputProps={{}}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </td>
            {this.state.ShipmentType.value !== "Ocean" ? (
              <td>
                <TextField
                  name="insurance"
                  id="insurance"
                  value={packages.InsuredValue}
                  onChange={(event) =>
                    this.handleChangePackage(
                      event,
                      "InsuredValue",
                      packages.Index
                    )
                  }
                  onBlur={(event) =>
                    this.formatPackageValue(
                      event,
                      "InsuredValue",
                      packages.Index
                    )
                  }
                  inputProps={{
                    maxLength: 6,
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </td>
            ) : null}

            {this.state.ShipmentType.value === "Ocean" ? (
              <>
                <td>
                  <CustomInput
                    type="number"
                    name="cft"
                    id="proposaltype"
                    inputProps={{
                      value:
                        packages.CFT !== null
                          ? parseFloat(packages.CFT).toFixed(2)
                          : 0.0,
                      disabled: true,
                    }}
                  />
                </td>
                <td style={{ width: "104px" }}>
                  <div className="package-select">
                    <FormControl className={classes.formControl} fullWidth>
                      <Select
                        id="package_number"
                        name="package_number"
                        value={packages.PackedType}
                        className="form-control"
                        onChange={(event) =>
                          this.selectChangeTab2(
                            event,
                            "PackedType",
                            packages.Index
                          )
                        }
                        onBlur={(event, value) =>
                          this.state.identical === "Yes"
                            ? this.PackTtypeOnBlur(
                                event,
                                "PackedType",
                                packages.Index
                              )
                            : this.selectChangeTab2(
                                event,
                                "PackedType",
                                packages.Index
                              )
                        }
                      >
                        {this.packedBy()}
                      </Select>
                    </FormControl>
                  </div>
                </td>
              </>
            ) : null}
            <td>
              <div className="pck-subbtn">
                {/* {idx !== 0 ? ( */}
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn "
                  onClick={() => this.removePackageRow(packages.Index)}
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
                    onClick={() => this.addPackageRow()}
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

  changePackage = (event, type) => {
    if (type === "AllClear") {
      if (this.state.AllClear !== event.target.value) {
        if (
          this.state.AllClear === true &&
          event.target.value === false &&
          this.state.useraccess.userModuleAccess[15].ModuleID === 18 &&
          this.state.useraccess.userModuleAccess[15].WriteAccess === 1 &&
          this.state.useraccess.userModuleAccess[15].DeleteAccess === 0
        ) {
          this.setState({ IsChanged: false });
        } else if (
          this.state.AllClear === true &&
          event.target.value === false &&
          this.state.useraccess.userModuleAccess[15].ModuleID === 18 &&
          this.state.useraccess.userModuleAccess[15].WriteAccess === 1 &&
          this.state.useraccess.userModuleAccess[15].DeleteAccess === 1
        ) {
          this.openConfirmAllClear();
        } else {
          // let useraccess = JSON.parse(localStorage.getItem("loggedInUserData"));
          if (
            this.state.useraccess.userModuleAccess[15].ModuleID === 18 &&
            this.state.useraccess.userModuleAccess[15].WriteAccess === 1 &&
            this.state.useraccess.userModuleAccess[15].DeleteAccess === 0
          ) {
            if (
              event.target.value === true ||
              event.target.value === "Not Ready"
            ) {
              this.setState({ IsChanged: false });
            } else {
              if (
                this.state.useraccess.userModuleAccess[15].ModuleID === 18 &&
                this.state.useraccess.userModuleAccess[15].WriteAccess === 1 &&
                this.state.useraccess.userModuleAccess[15].DeleteAccess === 0 &&
                this.state.AllClear != true
              ) {
                this.setState({
                  AllClear: event.target.value,
                  IsChanged: true,
                  viewAllClear:
                    event.target.value !== "Not Ready" || "Ready for Yes"
                      ? event.target.value
                      : this.state.viewAllClear,
                });
              } else {
                this.setState({ IsChanged: false });
              }
            }
          } else {
            this.setState({
              AllClear: event.target.value,
              IsChanged: true,
              viewAllClear:
                event.target.value !== "Not Ready" || "Ready for Yes"
                  ? event.target.value
                  : this.state.viewAllClear,
            });
          }
        }
      }
    }
    if (type === "PackageType") {
      if (event.target.value === "Package") {
        let PackageList = this.state.PackageList;
        for (var i = 1; i < PackageList.length; i++) {
          PackageList[i]["Status"] = "Active";
        }

        this.setState({
          PackageType: event.target.value,
          PackageList: PackageList,
        });
      }
      if (event.target.value === "Envelop") {
        var PackageList = this.state.PackageList;
        PackageList[0]["EstimetedWeight"] = 0.5;
        PackageList[0]["Quantity"] = 1;
        PackageList[0]["Length"] = 10;
        PackageList[0]["Width"] = 13;
        PackageList[0]["Height"] = 1;
        PackageList[0]["ChargableWeight"] = 0.5;
        PackageList[0]["CFT"] = 0.0;
        PackageList[0]["Status"] = "Active";
        for (var i = 1; i < PackageList.length; i++) {
          PackageList[i]["Status"] = "Inactive";
        }
        this.setState({
          PackageList: PackageList,
          PackageType: event.target.value,
        });
        this.disableCommercial(event.target.value);
      }
    }
    if (type === "Identical") {
      debugger;
      this.setState({ identical: event.target.value });
    }
  };

  openConfirmAllClear = () => {
    this.setState({ confirmAllClear: true });
  };

  AllClearConfirm = () => {
    try {
      let data = {
        AllClear: false,
        TrackingNumber: this.state.TrackingNumber,
        Amount: this.state.TotalCostReceived,
        ManagedBy: this.state.ManagedBy.value,
        userid: CommonConfig.loggedInUserData().PersonID,
      };

      api
        .post("scheduleshipment/addCommissionByAllClear", data)
        .then((res) => {
          if (res.success) {
            this.setState({
              AllClear: false,
              confirmAllClear: false,
              IsChanged: true,
            });
          } else {
            this.setState({ confirmAllClear: false });
          }
        })
        .catch((err) => {
          console.log("error..", err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  getCommercialInvoiceDetail() {
    this.showLoader();
    try {
      let data = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
      };
      api
        .post("scheduleshipment/getShipmentCommercialInvoiceByID", data)
        .then((res) => {
          if (res.success) {
            var l = 1;
            res.data.map((Obj) => {
              Obj.Index = l;
              l++;
              return Obj;
            });
            if (res.data.length > 0) {
              this.setState({ isComInvoiceVisible: true });
            }
            this.setState({
              commercialList: res.data,
              CommercialInvoiceList: res.data,
            });
            this.CostCalculator("Commercial", false);
            this.hideLoader();
            // this.addnewRowCommercial();
          }
        })
        .catch((err) => {
          this.hideLoader();
          console.log("error..", err);
        });
    } catch (err) {
      this.hideLoader();
      console.log(err);
    }
  }

  removeCommercialInvoice = (index) => {
    var commercialList = this.state.commercialList;
    let Index = this.state.commercialList.findIndex((x) => x.Index === index);
    if (Index !== -1) {
      commercialList[Index]["Status"] = "Inactive";
      this.setState({ commercialList: commercialList });
      this.CostCalculator("Commercial", true);

      if (commercialList.filter((x) => x.Status === "Active").length === 0) {
        this.setState({
          isComInvoiceVisible: false,
        });
      }

      var comList = [];
      for (let index = 0; index < commercialList.length; index++) {
        const element = commercialList[index];
        if (commercialList[index].Status == "Active") {
          comList.push(commercialList[index]);
        }
      }
      console.log("commercialList = ", comList);

      this.state.commercialList = comList;

      console.log("commercialList = ", commercialList);
    }
  };

  removeCommercialByPackageNumber = (packageNumber) => {
    var commercialList = this.state.commercialList;
    for (var i = 0; i < commercialList.length; i++) {
      if (commercialList[i]["PackageNumber"] === packageNumber) {
        commercialList[i]["Status"] = "Inactive";
      } else {
        commercialList[i]["PackageNumber"] =
          commercialList[i]["PackageNumber"] > packageNumber
            ? commercialList[i]["PackageNumber"] - 1
            : commercialList[i]["PackageNumber"];
      }
    }
    this.setState({ commercialList: commercialList });
    this.CostCalculator("Commercial", true);
  };

  addnewRowCommercial = () => {
    let commercialList = this.state.commercialList;
    let packageNumbeList = commercialList.filter((x) => x.Status === "Active");
    const row = {
      PackageNumber:
        packageNumbeList.length > 0
          ? packageNumbeList[packageNumbeList.length - 1]["PackageNumber"] + 1
          : 1,
      Status: "Active",
      ContentDescription: "",
      // ipLocation: this.state.updatedipLocation,
      ShippingCommercialInvoiceID: null,
      Quantity: 0,
      ValuePerQuantity: parseFloat(0).toFixed(2),
      TotalValue: parseFloat(0).toFixed(2),
      Index: this.state.commercialList.length + 1,
    };
    commercialList.push(row);
    this.setState({ commercialList: commercialList });
    this.CostCalculator("Commercial", true);
  };

  formatValue = (event, type, index) => {
    let CommercialList = this.state.commercialList;
    let idx = this.state.commercialList.findIndex((x) => x.Index === index);
    let regexp = /^[0-9]+(\.[0-9][0-9])?$/;
    let val = parseFloat(event.target.value).toFixed(2);
    if (regexp.test(val)) {
      CommercialList[idx][type] = val;
      this.setState({ commercialList: CommercialList });
    }
  };

  viewCommercialInvoice = () => {
    return this.state.commercialList
      .filter((x) => x.Status === "Active")
      .map((commercial, idx) => {
        return (
          <tr>
            <td className="wd-130">
              <div className="package-select">
                <FormControl className={classes.formControl} fullWidth>
                  <Select
                    id="package_number"
                    name="package_number"
                    value={commercial.PackageNumber}
                    className="form-control"
                    onChange={(event) =>
                      this.handleCommercialInvoiceChange(
                        event,
                        "PackageNumber",
                        commercial.Index
                      )
                    }
                  >
                    {this.renderPackageNumber()}
                  </Select>
                </FormControl>
              </div>
            </td>
            <td className="">
              <div className="width-full">
                <TextField
                  value={commercial.ContentDescription}
                  onChange={(event) =>
                    this.handleCommercialInvoiceChange(
                      event,
                      "ContentDescription",
                      commercial.Index
                    )
                  }
                  inputProps={{}}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </div>
            </td>
            {this.state.ShipmentType.value !== "Ocean" ? (
              <>
                <td className="wd-num right">
                  <TextField
                    value={commercial.Quantity}
                    onChange={(event) =>
                      this.handleCommercialInvoiceChange(
                        event,
                        "Quantity",
                        commercial.Index
                      )
                    }
                    inputProps={{
                      maxLength: 3,
                    }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </td>
                <td className="wd-num right">
                  <TextField
                    value={commercial.ValuePerQuantity}
                    onChange={(event) =>
                      this.handleCommercialInvoiceChange(
                        event,
                        "ValuePerQuantity",
                        commercial.Index
                      )
                    }
                    onBlur={(event) =>
                      this.formatValue(
                        event,
                        "ValuePerQuantity",
                        commercial.Index
                      )
                    }
                    inputProps={{}}
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </td>
              </>
            ) : null}
            <td className="wd-num right">
              <TextField
                value={
                  this.state.ShipmentType.value === "Ocean"
                    ? commercial.TotalValue
                    : parseFloat(commercial.TotalValue).toFixed(2)
                }
                onChange={(event) =>
                  this.handleCommercialInvoiceChange(
                    event,
                    "TotalValue",
                    commercial.Index
                  )
                }
                disabled={
                  this.state.ShipmentType.value === "Ocean" ? false : true
                }
                onBlur={(event) =>
                  this.formatValue(event, "TotalValue", commercial.Index)
                }
                inputProps={{}}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </td>
            <td className="pck-action-column">
              {/* {idx !== 0 ? ( */}
              <Button
                justIcon
                color="danger"
                className="Plus-btn "
                onClick={() => this.removeCommercialInvoice(commercial.Index)}
              >
                <i className={"fas fa-minus"} />
              </Button>

              <Tooltip title={commercial.ipLocation} arrow>
                <Button className="Plus-btn info-icon" justIcon color="twitter">
                  <InfoIcon />
                </Button>
              </Tooltip>
              {/* ) : null} */}

              {this.state.commercialList.filter((x) => x.Status === "Active")
                .length ===
              idx + 1 ? (
                <Button
                  justIcon
                  color="facebook"
                  onClick={() => this.addnewRowCommercial()}
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

  handleCommercialInvoiceChange = (event, type, index) => {
    let idx = this.state.commercialList.findIndex((x) => x.Index === index);
    if (type === "PackageNumber") {
      let commercialList = this.state.commercialList;
      commercialList[idx][type] = event.target.value;
      this.setState({ commercialList: commercialList });
    } else if (type === "ContentDescription") {
      if (
        (this.state.ShipmentType.value === "Ocean" &&
          event.target.value.length <= 200) ||
        event.target.value.length <= 60
      ) {
        var datatarget = event.target.value.replace(/[^\w\s]/gi, "");
        let commercialList = this.state.commercialList;
        commercialList[idx][type] = datatarget;
        this.setState({ commercialList: commercialList });
      }
    } else if (type === "Quantity") {
      let commercialList = this.state.commercialList;
      commercialList[idx][type] = event.target.value.replace(/\D/g, "");
      commercialList[idx]["TotalValue"] =
        commercialList[idx][type] * commercialList[idx]["ValuePerQuantity"];
      this.setState({ commercialList: commercialList });
      this.CostCalculator("Commercial", true);
    } else if (type === "TotalValue") {
      let commercialList = this.state.commercialList;
      if (
        event.target.value.match(/^\d{1,}(\.\d{0,2})?$/) ||
        event.target.value === ""
      ) {
        commercialList[idx][type] = event.target.value;
        this.setState({ commercialList: commercialList });
        this.CostCalculator("Commercial", true);
      }
    } else if (type === "ValuePerQuantity") {
      let commercialList = this.state.commercialList;
      if (
        event.target.value.match(/^\d{1,}(\.\d{0,2})?$/) ||
        event.target.value === ""
      ) {
        commercialList[idx][type] = event.target.value;
        commercialList[idx]["TotalValue"] =
          commercialList[idx][type] * commercialList[idx]["Quantity"];
        this.setState({ commercialList: commercialList });
        this.CostCalculator("Commercial", true);
      }
    }
  };

  getAccountDetail() {
    try {
      let data = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
      };
      api
        .post("scheduleshipment/getAccountDetail", data)
        .then((res) => {
          if (res.success) {
            var i = 1;
            let amountTotal = 0;
            res.data.InvoiceData.map((Obj) => {
              Obj.Index = i;
              Obj.Amount = parseFloat(Obj.Amount).toFixed(2);
              amountTotal += Obj.Amount;
              if (Obj.ServiceDescription === "AES Filling Charges") {
                this.setState({ IsAlreadyAESFilled: true });
              }
              i++;
              return Obj;
            });

            var j = 1;
            res.data.PaymentReceivedData.map((Obj) => {
              Obj.Index = j;
              Obj.Amount = parseFloat(Obj.Amount).toFixed(2);
              j++;
              return Obj;
            });

            var k = 1;
            res.data.PaymentIssuedData.map((Obj) => {
              Obj.Index = k;
              Obj.Amount = parseFloat(Obj.Amount).toFixed(2);
              k++;
              return Obj;
            });
            let creditCardObj = res.data.PaymentDetailData.filter(
              (x) => x.PaymentType === "Credit Card"
            );
            var l = 1;
            creditCardObj.map((Obj) => {
              Obj.Index = l;
              Obj.InvoiceAmount = parseFloat(Obj.InvoiceAmount).toFixed(2);
              let index = Obj.CardExpiry.indexOf("-");
              Obj.CardExpiryMonth = Obj.CardExpiry.substring(0, index);
              Obj.CardExpiryYear = Obj.CardExpiry.substring(
                index + 1,
                Obj.CardExpiry.length
              );
              l++;
              return Obj;
            });

            let bankObj = res.data.PaymentDetailData.filter(
              (x) => x.PaymentType === "Bank"
            );
            var t = 1;
            bankObj.map((Obj) => {
              Obj.Index = t;
              Obj.InvoiceAmount = parseFloat(Obj.InvoiceAmount).toFixed(2);
              t++;
              return Obj;
            });

            if (res.data.InvoiceData.length > 0) {
              this.setState({
                isInvoiceVisible: true,
              });
            }
            if (bankObj.length > 0) {
              this.setState({
                isPaymentMethodBank: true,
              });
            }
            if (creditCardObj.length > 0) {
              this.setState({ isPaymentMethod: true });
            }
            if (res.data.PaymentIssuedData.length > 0) {
              this.setState({
                isPaymentIssued: true,
              });
            }
            if (res.data.PaymentReceivedData.length > 0) {
              this.setState({
                isPaymentReceived: true,
              });
            }

            this.setState({
              PaymentList: res.data.InvoiceData,
              DocumentInvoiceData: res.data.InvoiceData,
              DocumentTotalInvoiceAmount: amountTotal,
              paymentReceived: res.data.PaymentReceivedData,
              paymentIssued: res.data.PaymentIssuedData,
              bankList: bankObj,
              creditCardList: creditCardObj,
            });
            let printInvoiceData = {
              ShippingID:
                this.props.location.state &&
                this.props.location.state.ShipppingID
                  ? this.props.location.state.ShipppingID
                  : null,
              InvoiceData: this.state.DocumentInvoiceData,
              TotalReceivedCost: this.state.TotalReceivedCost,
              DatePaidOn: this.state.DatePaidOn,
              FromAddress: this.state.FromAddressObj,
              DocumentManagedBy: this.state.DocumentManagedBy,
              TrackingNumber: this.state.TrackingNumber,
              DocumentInvoiceDueDate: this.state.DocumentInvoiceDueDate,
              ToAddress: this.state.ToAddressObj,
            };
            localStorage.setItem(
              "printInvoice",
              JSON.stringify(printInvoiceData)
            );
            // if (res.data.InvoiceData.length === 0) {
            //   this.addnewRowInvoice();
            // }

            // if (res.data.PaymentReceivedData.length === 0) {
            //   this.addRowPaymentReceived();
            // }

            // if (res.data.PaymentIssuedData.length === 0) {
            //   this.addRowPaymentIssued();
            // }

            // if (
            //   res.data.PaymentDetailData.filter((x) => x.PaymentType === "Bank")
            //     .length === 0
            // ) {
            //   this.addRowBank();
            // }

            // if (
            //   res.data.PaymentDetailData.filter(
            //     (x) => x.PaymentType === "Credit Card"
            //   ).length === 0
            // ) {
            //   this.addRowCreditCard();
            // }
            var totalCost = 0;
            let datePaid = "";
            for (var i = 0; i < res.data.PaymentReceivedData.length; i++) {
              datePaid = res.data.PaymentReceivedData[0].PaymentReceivedDate;
              totalCost =
                Number(totalCost) +
                Number(res.data.PaymentReceivedData[i].Amount);
            }
            this.setState({
              TotalReceivedCost: totalCost,
              DatePaidOn: datePaid,
            });
            this.CostCalculator("Invoice");
            this.CostCalculator("Received");
            this.CostCalculator("Issued");

            // this.showAESMessage();
          }
        })
        .catch((err) => {
          console.log("error...", err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getServiceDescription() {
    try {
      let data = {
        stringMapType: "INVENTORY",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          this.setState({ ServiceDescriptionList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getpaymentType() {
    try {
      let data = {
        stringMapType: "PAYMENTTYPE",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          this.setState({ PaymentTypeList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getVendorName() {
    try {
      api
        .get("vendor/getVendorNameList")
        .then((result) => {
          this.setState({ VendorList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  checkInsurance() {
    try {
      let data = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
      };
      api.post("scheduleshipment/checkInsurancetaken", data).then((res) => {
        this.hideLoader();
        if (res.success) {
          this.setState({ isVisible: res.data.length > 0 ? false : true });
          if (res.data.length > 0) {
            this.setState({
              InsuranceType: res.data[0].ServiceDescription,
            });
          }
        } else {
          cogoToast.error("Something went wrong");
        }
      });
    } catch (err) {
      console.log("error......", err);
    }
  }

  renderServiceDescription = () => {
    return this.state.ServiceDescriptionList.map((content) => {
      return (
        <MenuItem
          classes={{ root: classes.selectMenuItem }}
          value={content.Description}
        >
          {" "}
          {content.Description}{" "}
        </MenuItem>
      );
    });
  };

  addnewRowInvoice = () => {
    // this.getData();
    // navigator.geolocation.getCurrentPosition((position) => {
    //   console.log("Latitude is :", position.coords.latitude);
    //   console.log("Longitude is :", position.coords.longitude);

    //   Geocode.fromLatLng(
    //     position.coords.latitude,
    //     position.coords.longitude
    //   ).then(
    //     (response) => {
    //       const address = response.results[0].formatted_address;
    //       console.log("addres=", address);
    //       this.setState({ updatedipLocation: address });
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // });

    const row = {
      ServiceDescription: "",
      InvoiceDate: moment().toDate(),

      Descriptiom: "",
      Quantity: 0,
      Amount: parseFloat(0).toFixed(2),
      TotalAmount: parseFloat(0).toFixed(2),
      CreatedByName: CommonConfig.loggedInUserData().Name,
      Status: "Active",
      ShippingInvoiceID: null,
      Index: this.state.PaymentList.length + 1,
    };
    this.setState({ PaymentList: [...this.state.PaymentList, row] });
  };

  addRowPaymentReceived = () => {
    const row = {
      PaymentReceivedDate: momentTimezone()
        .tz(CommonConfig.UStimezone)
        .toDate(),
      PaymentType: "",
      Amount: parseFloat(0).toFixed(2),
      ConfirmationNumber: "",
      CreatedByName: CommonConfig.loggedInUserData().Name,
      Status: "Active",
      Number: "",
      ShippingPaymentReceivedID: null,
      Index: this.state.paymentReceived.length + 1,
    };
    this.setState({ paymentReceived: [...this.state.paymentReceived, row] });
  };

  addRowPaymentIssued = () => {
    const row = {
      PaymentIssuedDate: momentTimezone()
        .tz(CommonConfig.UStimezone)
        .toDate(),
      VendorName: "",
      InvoiceNumber: "",
      ConfirmationNumber: "",
      DatePaid: "",
      Amount: parseFloat(0).toFixed(2),
      CreatedByName: CommonConfig.loggedInUserData().Name,
      Status: "Active",
      ShippingPaymentIssuedID: null,
      Index: this.state.paymentIssued.length + 1,
    };
    this.setState({ paymentIssued: [...this.state.paymentIssued, row] });
  };

  addRowCreditCard = () => {
    const row = {
      CreatedByName: CommonConfig.loggedInUserData().Name,
      Status: "Active",
      PaymentID: null,
      AccountNumber: "",
      BankName: "",
      CardCVV: "",
      CardName: "",
      CardExpiryYear: "",
      CardExpiryMonth: "",
      CardNumber: "",
      CardType: "",
      CardZipCode: "",
      ContactName: "",
      InvoiceAmount: parseFloat(0).toFixed(2),
      NameonAccount: "",
      PaidDate: "",
      PaymentStatus: "New",
      PaymentType: "Credit Card",
      RoutingNumber: "",
      Index: this.state.creditCardList.length + 1,
    };
    this.setState({ creditCardList: [...this.state.creditCardList, row] });
  };

  addRowBank = () => {
    const row = {
      CreatedByName: CommonConfig.loggedInUserData().Name,
      Status: "Active",
      PaymentID: null,
      AccountNumber: "",
      BankName: "",
      CardCVV: "",
      CardName: "",
      CardExpiryYear: "",
      CardExpiryMonth: "",
      CardNumber: "",
      CardType: "",
      CardZipCode: "",
      ContactName: "",
      InvoiceAmount: parseFloat(0).toFixed(2),
      NameonAccount: "",
      PaidDate: "",
      PaymentStatus: "New",
      PaymentType: "Bank",
      RoutingNumber: "",
      Index: this.state.bankList.length + 1,
    };
    this.setState({ bankList: [...this.state.bankList, row] });
  };

  removePaymentRecieved = (index) => {
    var paymentList = this.state.paymentReceived;
    let Index = this.state.paymentReceived.findIndex((x) => x.Index === index);
    if (Index !== -1) {
      paymentList[Index]["Status"] = "Inactive";
      this.setState({ paymentReceived: paymentList });
      this.CostCalculator("Received");
      if (paymentList.filter((x) => x.Status === "Active").length === 0) {
        this.setState({
          isPaymentReceived: false,
        });
      }
    }
  };

  removePaymentIssued = (index) => {
    var paymentList = this.state.paymentIssued;
    let Index = this.state.paymentIssued.findIndex((x) => x.Index === index);
    if (Index !== -1) {
      paymentList[Index]["Status"] = "Inactive";
      this.setState({ paymentIssued: paymentList });
      this.CostCalculator("Issued");
      if (paymentList.filter((x) => x.Status === "Active").length === 0) {
        this.setState({
          isPaymentIssued: false,
        });
      }
    }
  };

  removeInvoice = (index) => {
    var paymentList = this.state.PaymentList;
    let Index = this.state.PaymentList.findIndex((x) => x.Index === index);
    if (Index !== -1) {
      paymentList[Index]["Status"] = "Inactive";
      this.setState({ PaymentList: paymentList });
      this.CostCalculator("Invoice");
      if (paymentList.filter((x) => x.Status === "Active").length === 0) {
        this.setState({
          isInvoiceVisible: false,
        });
      }
    }
  };

  removeCreditCard = (index) => {
    var paymentList = this.state.creditCardList;
    let Index = this.state.creditCardList.findIndex((x) => x.Index === index);
    if (Index !== -1) {
      paymentList[Index]["Status"] = "Inactive";
      this.setState({ creditCardList: paymentList });

      if (paymentList.filter((x) => x.Status === "Active").length === 0) {
        this.setState({
          isPaymentMethod: false,
        });
      }
    }
    // if (paymentList.filter((x) => x.Status === "Active").length === 0) {
    //   this.addRowCreditCard();
    // }
  };

  removeBank = (index) => {
    var paymentList = this.state.bankList;
    let Index = this.state.bankList.findIndex((x) => x.Index === index);
    if (Index !== -1) {
      paymentList[Index]["Status"] = "Inactive";
      this.setState({ bankList: paymentList });

      if (paymentList.filter((x) => x.Status === "Active").length === 0) {
        this.setState({
          isPaymentMethodBank: false,
        });
      }
    }
  };

  selectChangeTab3 = (value, type, index) => {
    if (value != null) {
      if (type === "ServiceDescription") {
        let paymentList = this.state.PaymentList;
        let idx = this.state.PaymentList.findIndex((x) => x.Index === index);
        paymentList[idx][type] = value.value;
        this.setState({ PaymentList: paymentList });
      } else if (type === "VendorName") {
        let paymentIssued = this.state.paymentIssued;
        let idx = this.state.paymentIssued.findIndex((x) => x.Index === index);
        paymentIssued[idx][type] = value.value;
        this.setState({ paymentIssued: paymentIssued });
      } else if (type === "PaymentType") {
        let paymentReceived = this.state.paymentReceived;
        let idx = this.state.paymentReceived.findIndex(
          (x) => x.Index === index
        );
        paymentReceived[idx][type] = value.value;
        this.setState({ paymentReceived: paymentReceived });
      } else if (type === "PaymentStatusCreditCard") {
        let creditCardList = this.state.creditCardList;
        let idx = this.state.creditCardList.findIndex((x) => x.Index === index);
        creditCardList[idx]["PaymentStatus"] = value.value;
        this.setState({ creditCardList: creditCardList });
      } else if (type === "PaymentStatusBank") {
        let bankList = this.state.bankList;
        let idx = this.state.bankList.findIndex((x) => x.Index === index);
        bankList[idx]["PaymentStatus"] = value.value;
        this.setState({ bankList: bankList });
      }
    }
  };

  handleAmountChange = (event, type, index) => {
    if (type === "IssuedAmount") {
      let paymentIssued = this.state.paymentIssued;
      let idx = this.state.paymentIssued.findIndex((x) => x.Index === index);
      let regexp = /^[0-9]+(\.[0-9][0-9])?$/;
      let val = parseFloat(event.target.value).toFixed(2);
      if (regexp.test(val)) {
        paymentIssued[idx]["Amount"] = val;
        this.setState({ paymentIssued: paymentIssued });
      }
    } else if (type === "InvoiceAmount") {
      let PaymentList = this.state.PaymentList;
      let idx = this.state.PaymentList.findIndex((x) => x.Index === index);
      let regexp = /^[0-9]+(\.[0-9][0-9])?$/;
      let val = parseFloat(event.target.value).toFixed(2);
      if (regexp.test(val)) {
        PaymentList[idx]["Amount"] = val;
        this.setState({ PaymentList: PaymentList });
      }
    } else if (type === "ReceivedAmount") {
      let paymentReceived = this.state.paymentReceived;
      let idx = this.state.paymentReceived.findIndex((x) => x.Index === index);
      let regexp = /^[0-9]+(\.[0-9][0-9])?$/;
      let val = parseFloat(event.target.value).toFixed(2);
      if (regexp.test(val)) {
        paymentReceived[idx]["Amount"] = val;
        this.setState({ paymentReceived: paymentReceived });
      }
    }
  };

  yesNo = () => {
    return this.state.yesNo.map((content) => {
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

  getLatestInvoiceDate = () => {
    let invoiceList = this.state.PaymentList.filter(
      (x) => x.Status === "Active"
    ).map((x) =>
      moment(x.InvoiceDate).format(CommonConfig.dateFormat.dbDateOnly)
    );
    let invoiceDate = invoiceList.slice(-1)[0];
    let dateNew = new Date(invoiceDate);
    dateNew.setDate(dateNew.getDate() + 7);
    this.setState({
      InvoiceDueDate: moment(dateNew).format(CommonConfig.dateFormat.dateOnly),
    });
  };

  viewInvoice = () => {
    const ServiceList = this.state.ServiceDescriptionList.map((type) => {
      return { value: type.Description, label: type.Description };
    });
    return this.state.PaymentList.filter((x) => x.Status === "Active").map(
      (payment, idx) => {
        const ServiceDescription = {
          value: payment.ServiceDescription,
          label: payment.ServiceDescription,
        };

        var invDate = new Date(payment.InvoiceDate);
        // var invDate = momentTimezone(payment.InvoiceDate)
        //   .tz(CommonConfig.UStimezone)
        //   .format(CommonConfig.dateFormat.dateTime);
        invDate.setDate(invDate.getDate() + 7);

        this.state.InvoiceDueDate = invDate;
        return (
          <tr>
            <td className="wd-date">
              <div className="package-dateinput">
                {this.state.viewAllClear === false ||
                this.state.hasInvoiceAccess === false ? (
                  <Datetime
                    dateFormat={"MM/DD/YYYY"}
                    timeFormat={false}
                    value={payment.InvoiceDate}
                    onChange={(date) =>
                      this.dateChange(date, "InvoiceDate", payment.Index)
                    }
                    closeOnSelect={true}
                    renderInput={(params) => (
                      <TextField {...params} margin="normal" fullWidth />
                    )}
                  />
                ) : (
                  <CustomInput
                    inputProps={{
                      value: payment.InvoiceDate,
                      disabled: true,
                    }}
                  />
                )}
              </div>
            </td>
            <td>
              <div className="package-select">
                <Autocomplete
                  id="package_number"
                  options={ServiceList}
                  value={ServiceDescription}
                  disabled={
                    this.state.viewAllClear || this.state.hasInvoiceAccess
                  }
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) =>
                    this.selectChangeTab3(
                      value,
                      "ServiceDescription",
                      payment.Index
                    )
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </td>
            <td className="">
              <div className="width-full">
                <CustomInput
                  inputProps={{
                    onChange: (event) =>
                      this.handleChangeInvoiceAccount(
                        event,
                        "Description",
                        payment.Index
                      ),
                    value: payment.Description,
                    disabled:
                      this.state.viewAllClear || this.state.hasInvoiceAccess,
                  }}
                />
              </div>
            </td>
            <td className="wd-num right">
              <CustomInput
                name="Quantity"
                id="proposaltype"
                type="number"
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeInvoiceAccount(
                      event,
                      "Quantity",
                      payment.Index
                    ),
                  value: payment.Quantity,
                  disabled:
                    this.state.viewAllClear || this.state.hasInvoiceAccess,
                }}
              />
            </td>
            <td className="wd-num right">
              <CustomInput
                name="Amount"
                id="proposaltype"
                type="number"
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeInvoiceAccount(
                      event,
                      "Amount",
                      payment.Index
                    ),
                  onBlur: (event) =>
                    this.handleAmountChange(
                      event,
                      "InvoiceAmount",
                      payment.Index
                    ),
                  value: payment.Amount,
                  disabled:
                    this.state.viewAllClear || this.state.hasInvoiceAccess,
                }}
              />
            </td>
            <td className="wd-num right">
              <CustomInput
                name="TotalAmount"
                id="proposaltype"
                type="number"
                inputProps={{
                  disabled: true,
                  value: parseFloat(payment.TotalAmount).toFixed(2),
                }}
              />
            </td>
            <td className="pck-action-column">
              {!this.state.viewAllClear && !this.state.hasInvoiceAccess ? (
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn"
                  onClick={() => this.removeInvoice(payment.Index)}
                >
                  <i className={"fas fa-minus"} />
                </Button>
              ) : null}
              {this.state.PaymentList.filter((x) => x.Status === "Active")
                .length ===
                idx + 1 &&
              !this.state.viewAllClear &&
              // CommonConfig.getUserAccess("Shipment").DeleteAccess === 1 &&
              // CommonConfig.getUserAccess("Shipment").WriteAccess === 1
              !this.state.hasInvoiceAccess ? (
                <Button
                  justIcon
                  color="facebook"
                  onClick={() => this.addnewRowInvoice()}
                  className="Plus-btn "
                >
                  <i className={"fas fa-plus"} />
                </Button>
              ) : null}
              <Tooltip title={payment.CreatedByName} arrow>
                <Button className="Plus-btn info-icon" justIcon color="twitter">
                  <InfoIcon />
                </Button>
              </Tooltip>
            </td>
          </tr>
        );
      }
    );
  };

  viewPaymentIssued = () => {
    const VendorList = this.state.VendorList.map((type) => {
      return { value: type.VendorName, label: type.VendorName };
    });
    return this.state.paymentIssued
      .filter((x) => x.Status === "Active")
      .map((payment, idx) => {
        const vendorName = {
          value: payment.VendorName,
          label: payment.VendorName,
        };
        return (
          <tr>
            <td className="wd-date">
              <div className="package-dateinput">
                <Datetime
                  dateFormat={"MM/DD/YYYY"}
                  timeFormat={false}
                  value={payment.PaymentIssuedDate}
                  onChange={(date) =>
                    this.dateChange(date, "PaymentIssuedDate", payment.Index)
                  }
                  closeOnSelect={true}
                  renderInput={(params) => (
                    <TextField {...params} margin="normal" fullWidth />
                  )}
                />
              </div>
            </td>
            <td style={{ width: "315px" }}>
              <div className="package-select">
                <Autocomplete
                  id="package_number"
                  options={VendorList}
                  value={vendorName}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) =>
                    this.selectChangeTab3(value, "VendorName", payment.Index)
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </td>
            <td className="wd-150">
              <CustomInput
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeviewPaymentIssued(
                      event,
                      "InvoiceNumber",
                      payment.Index
                    ),
                  value: payment.InvoiceNumber,
                }}
              />
            </td>
            <td>
              <CustomInput
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeviewPaymentIssued(
                      event,
                      "ConfirmationNumber",
                      payment.Index
                    ),
                  value: payment.ConfirmationNumber,
                }}
              />
            </td>
            <td className="wd-date">
              <div className="package-dateinput">
                <Datetime
                  dateFormat={"MM/DD/YYYY"}
                  timeFormat={false}
                  //  value={payment.DatePaid}
                  value={payment.DatePaid}
                  onChange={(date) =>
                    this.dateChange(date, "DatePaid", payment.Index)
                  }
                  closeOnSelect={true}
                  renderInput={(params) => (
                    <TextField {...params} margin="normal" fullWidth />
                  )}
                />
              </div>
            </td>
            <td className="wd-100">
              <div className="package-select">
                <FormControl className={classes.formControl} fullWidth>
                  <Select
                    id="package_number"
                    value={payment.PaidStatus}
                    name="package_number"
                    className="form-control"
                    onChange={(event) =>
                      this.handleChangeviewPaymentIssued(
                        event,
                        "PaidStatus",
                        payment.Index
                      )
                    }
                  >
                    {this.yesNo()}
                  </Select>
                </FormControl>
              </div>
            </td>
            <td className="wd-num right">
              <CustomInput
                name="Amount"
                id="proposaltype"
                type="number"
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeviewPaymentIssued(
                      event,
                      "Amount",
                      payment.Index
                    ),
                  onBlur: (event) =>
                    this.handleAmountChange(
                      event,
                      "IssuedAmount",
                      payment.Index
                    ),
                  value: payment.Amount,
                }}
              />
            </td>
            <td className="pck-action-column">
              {/* {idx !== 0 ? ( */}
              <Button
                justIcon
                color="danger"
                className="Plus-btn "
                onClick={() => this.removePaymentIssued(payment.Index)}
              >
                <i className={"fas fa-minus"} />
              </Button>
              {/* ) : null} */}
              {this.state.paymentIssued.filter((x) => x.Status === "Active")
                .length ===
                idx + 1 ||
              this.state.paymentIssued.filter((x) => x.Status === "Active")
                .length === 0 ? (
                <Button
                  justIcon
                  color="facebook"
                  onClick={() => this.addRowPaymentIssued()}
                  className="Plus-btn "
                >
                  <i className={"fas fa-plus"} />
                </Button>
              ) : null}
              <Tooltip title={payment.CreatedByName} arrow>
                <Button justIcon color="twitter" className="Plus-btn info-icon">
                  <InfoIcon />
                </Button>
              </Tooltip>
            </td>
          </tr>
        );
      });
  };

  viewCreditCardList = () => {
    const { ReadOnly } = this.state;
    const PaymentStatusList = this.state.PaymentStatusList.map((type) => {
      return { value: type.Description, label: type.Description };
    });
    return this.state.creditCardList
      .filter((x) => x.Status === "Active")
      .map((method, idx) => {
        var condata = false;
        if (
          CommonConfig.getUserAccess("Shipment").DeleteAccess === 1 &&
          CommonConfig.getUserAccess("Shipment").WriteAccess === 1
        ) {
          condata = false;
        } else {
          condata = true;
        }
        const CardNumber = condata
          ? "XXXX XXXX XXXX " +
            method.CardNumber.toString().slice(method.CardNumber.length - 4)
          : method.CardNumber;
        const PaymentStatus = {
          value: method.PaymentStatus,
          label: method.PaymentStatus,
        };
        return (
          <tr>
            <td className="wd-date wd-100">
              <div className="package-select">
                <Autocomplete
                  id="package_number"
                  options={PaymentStatusList}
                  value={PaymentStatus}
                  disabled={this.state.Access.WriteAccess === 1 ? false : true}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) =>
                    this.selectChangeTab3(
                      value,
                      "PaymentStatusCreditCard",
                      method.Index
                    )
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </td>
            <td style={{ width: "176px" }} className="wd-date input-full">
              <CustomInput
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeCreditCard(
                      event,
                      "CardName",
                      method.Index
                    ),
                  value: method.CardName,
                  disabled: ReadOnly,
                }}
              />
            </td>
            <td style={{ width: "168px" }} className="input-full">
              <CustomInput
                className="mr-5"
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeCreditCard(
                      event,
                      "CardNumber",
                      method.Index
                    ),
                  value: CardNumber,
                  disabled: ReadOnly,
                }}
              />
            </td>
            <td className="wd-num">
              <div className="package-select">
                <div className="inline-input">
                  <div className="mm">
                    <FormControl className={useStyles.formControl}>
                      <Select
                        id="package_number"
                        value={method.CardExpiryMonth}
                        disabled={ReadOnly}
                        name="package_number"
                        className="form-control"
                        onChange={(event) =>
                          this.handleChangeCreditCard(
                            event,
                            "CardExpiryMonth",
                            method.Index
                          )
                        }
                      >
                        {this.appendMonths()}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="yyyy">
                    <FormControl className={useStyles.formControl}>
                      <Select
                        id="package_number"
                        value={method.CardExpiryYear}
                        name="package_number"
                        disabled={ReadOnly}
                        className="form-control"
                        onChange={(event) =>
                          this.handleChangeCreditCard(
                            event,
                            "CardExpiryYear",
                            method.Index
                          )
                        }
                      >
                        {this.appendYears()}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </td>
            <td className="wd-num">
              <div className="inline-input">
                <div className="cvv">
                  <CustomInput
                    name="CardCVV"
                    id="proposaltype"
                    type="number"
                    inputProps={{
                      onChange: (event) =>
                        this.handleChangeCreditCard(
                          event,
                          "CardCVV",
                          method.Index
                        ),
                      value: method.CardCVV,
                      disabled: ReadOnly,
                    }}
                  />
                </div>
                <div className="zip-code">
                  <CustomInput
                    name="CardZipCode"
                    id="proposaltype"
                    type="number"
                    inputProps={{
                      onChange: (event) =>
                        this.handleChangeCreditCard(
                          event,
                          "CardZipCode",
                          method.Index
                        ),
                      value: method.CardZipCode,
                      disabled: ReadOnly,
                    }}
                  />
                </div>
              </div>
            </td>
            <td className="wd-num right">
              <CustomInput
                name="InvoiceAmount"
                id="proposaltype"
                type="number"
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeCreditCard(
                      event,
                      "InvoiceAmount",
                      method.Index
                    ),
                  value: method.InvoiceAmount,
                  disabled: this.state.Access.WriteAccess === 1 ? false : true,
                }}
              />
            </td>
            <td className="pck-action-column">
              <Button
                justIcon
                color="danger"
                className="Plus-btn"
                onClick={() => this.removeCreditCard(method.Index)}
              >
                <i className={"fas fa-minus"} />
              </Button>
              {this.state.creditCardList.filter((x) => x.Status === "Active")
                .length ===
                idx + 1 && !ReadOnly ? (
                <Button
                  justIcon
                  color="facebook"
                  onClick={() => this.addRowCreditCard()}
                  className="Plus-btn "
                >
                  <i className={"fas fa-plus"} />
                </Button>
              ) : null}

              {this.state.Access.WriteAccess === 1 &&
              this.state.IsCardTransactionZero === false ? (
                <Button
                  justIcon
                  color="facebook"
                  onClick={() => this.handlePayment(method, "CC")}
                  className="Plus-btn "
                >
                  <i class="fas fa-dollar-sign"></i>
                </Button>
              ) : null}
              <Tooltip title={method.CreatedByName} arrow>
                <Button justIcon color="twitter" className="Plus-btn info-icon">
                  <InfoIcon />
                </Button>
              </Tooltip>
            </td>
          </tr>
        );
      });
  };

  viewBankList = () => {
    const { ReadOnly } = this.state;
    const PaymentStatusList = this.state.PaymentStatusList.map((type) => {
      return { value: type.Description, label: type.Description };
    });
    return this.state.bankList
      .filter((x) => x.Status === "Active")
      .map((method, idx) => {
        const PaymentStatus = {
          value: method.PaymentStatus,
          label: method.PaymentStatus,
        };
        return (
          <tr>
            <td className="wd-date wd-100">
              <div className="package-select">
                <Autocomplete
                  id="package_number"
                  options={PaymentStatusList}
                  value={PaymentStatus}
                  disabled={this.state.Access.WriteAccess === 1 ? false : true}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) =>
                    this.selectChangeTab3(
                      value,
                      "PaymentStatusBank",
                      method.Index
                    )
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </td>
            <td style={{ width: "197px" }} className="wd-full input-full">
              <CustomInput
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeBank(event, "NameonAccount", method.Index),
                  value: method.NameonAccount,
                  disabled: ReadOnly,
                }}
              />
            </td>

            <td className="input-full">
              <CustomInput
                className="mr-5"
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeBank(event, "BankName", method.Index),
                  value: method.BankName,
                  disabled: ReadOnly,
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
                    disabled: ReadOnly,
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
                  disabled: ReadOnly,
                }}
              />
            </td>
            <td className="wd-num right">
              <CustomInput
                name="InvoiceAmount"
                id="proposaltype"
                type="number"
                inputProps={{
                  onChange: (event) =>
                    this.handleChangeBank(event, "InvoiceAmount", method.Index),
                  value: method.InvoiceAmount,
                  disabled: this.state.Access.WriteAccess === 1 ? false : true,
                }}
              />
            </td>
            <td className="pck-action-column">
              {!ReadOnly ? (
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn"
                  onClick={() => this.removeBank(method.Index)}
                >
                  <i className={"fas fa-minus"} />
                </Button>
              ) : null}
              {this.state.bankList.filter((x) => x.Status === "Active")
                .length ===
                idx + 1 && !ReadOnly ? (
                <Button
                  justIcon
                  color="facebook"
                  onClick={() => this.addRowBank()}
                  className="Plus-btn "
                >
                  <i className={"fas fa-plus"} />
                </Button>
              ) : null}

              <Tooltip title={method.CreatedByName} arrow>
                <Button justIcon color="twitter" className="Plus-btn info-icon">
                  <InfoIcon />
                </Button>
              </Tooltip>
            </td>
          </tr>
        );
      });
  };

  paymentReceived = () => {
    const PaymentTypeList = this.state.PaymentTypeList.map((type) => {
      return { value: type.Description, label: type.Description };
    });
    const { ReadOnly, viewAllClear } = this.state;
    return this.state.paymentReceived
      .filter((x) => x.Status === "Active")
      .map((payment, idx) => {
        const paymentType = {
          value: payment.PaymentType,
          label: payment.PaymentType,
        };

        var condata = false;
        if (
          CommonConfig.getUserAccess("Shipment").DeleteAccess === 1 &&
          CommonConfig.getUserAccess("Shipment").WriteAccess === 1
        ) {
          condata = false;
        } else {
          condata = true;
        }
        const CardNumber = condata
          ? "XXXX XXXX XXXX" +
            payment.Number.toString().slice(payment.Number.length - 4)
          : payment.Number;
        return (
          <tr>
            <td className="wd-date">
              <div className="package-dateinput">
                {/* {!ReadOnly && !viewAllClear ? */}
                <Datetime
                  dateFormat={"MM/DD/YYYY"}
                  timeFormat={false}
                  value={payment.PaymentReceivedDate}
                  onChange={(date) =>
                    this.dateChange(date, "PaymentReceivedDate", payment.Index)
                  }
                  closeOnSelect={true}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin="normal"
                      disabled={ReadOnly || viewAllClear}
                      fullWidth
                    />
                  )}
                />
                {/* :
                  <CustomInput
                    inputProps={{
                      value: payment.PaymentReceivedDate,
                      disabled: true,
                    }} />
                } */}
              </div>
            </td>
            <td style={{ width: "265px" }}>
              <div className="package-select">
                <Autocomplete
                  id="package_number"
                  options={PaymentTypeList}
                  value={paymentType}
                  disabled={ReadOnly || viewAllClear}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) =>
                    this.selectChangeTab3(value, "PaymentType", payment.Index)
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </td>
            <td className="wd-150">
              <CustomInput
                inputProps={{
                  onChange: (event) =>
                    this.handleChangepaymentReceived(
                      event,
                      "Number",
                      payment.Index
                    ),
                  value: CardNumber,
                  disabled: ReadOnly || viewAllClear,
                }}
              />
            </td>
            <td className="wd-150">
              <CustomInput
                inputProps={{
                  onChange: (event) =>
                    this.handleChangepaymentReceived(
                      event,
                      "ConfirmationNumber",
                      payment.Index
                    ),
                  value: payment.ConfirmationNumber,
                  disabled: ReadOnly || viewAllClear,
                }}
              />
            </td>
            <td className="right">
              <CustomInput
                name="Amount"
                id="proposaltype"
                type="number"
                inputProps={{
                  value: payment.Amount,
                  disabled: ReadOnly || viewAllClear,
                  onChange: (event) =>
                    this.handleChangepaymentReceived(
                      event,
                      "Amount",
                      payment.Index
                    ),
                  onBlur: (event) =>
                    this.handleAmountChange(
                      event,
                      "ReceivedAmount",
                      payment.Index
                    ),
                }}
              />
            </td>
            <td className="pck-action-column">
              {this.state.useraccess.userModuleAccess[15].WriteAccess === 1 &&
              this.state.useraccess.userModuleAccess[15].DeleteAccess === 1 ? (
                // {/* {!ReadOnly && !viewAllClear ? ( */}
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn"
                  onClick={() => this.removePaymentRecieved(payment.Index)}
                >
                  <i className={"fas fa-minus"} />
                </Button>
              ) : null}
              {this.state.paymentReceived.filter((x) => x.Status === "Active")
                .length ===
                idx + 1 &&
              this.state.useraccess.userModuleAccess[15].WriteAccess === 1 &&
              this.state.useraccess.userModuleAccess[15].DeleteAccess === 1 ? (
                // !ReadOnly &&
                // !viewAllClear ? (
                <Button
                  justIcon
                  color="facebook"
                  onClick={() => this.addRowPaymentReceived()}
                  className="Plus-btn "
                >
                  <i className={"fas fa-plus"} />
                </Button>
              ) : null}
              <Button justIcon color="twitter" className="Plus-btn info-icon">
                <Tooltip title={payment.CreatedByName} arrow>
                  <InfoIcon />
                </Tooltip>
              </Button>
            </td>
          </tr>
        );
      });
  };

  onErrorHandler = (response) => {
    this.setState({
      status: ["failure", response.messages.message.map((err) => err.text)],
    });
  };

  onSuccessHandler = (response) => {
    this.setState({ status: ["failure", []] });
  };

  handlePayment = (event, type) => {
    event.TrackingNumber = this.state.TrackingNumber;
    event.ChargeType = "Charge";
    if (type == "CC") {
      var numberValidation = valid.number(event.CardNumber);

      if (!numberValidation.isValid) {
        cogoToast.error("Invalid Credit Card Number");
        return;
      }

      var visaCards = creditCardType(event.CardNumber);

      if (visaCards[0]) {
        event.CardType = visaCards[0].type;
      } else {
        event.CardType = "visa";
      }
    }

    this.setState({
      openpayment: true,
      PaymentShowData: event,
    });
  };

  trackingService() {
    try {
      api
        .get("userManagement/getServiceName")
        .then((result) => {
          if (result.success) {
            this.setState({ TrackingServiceList: result.data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  removeTrackingNumber = (index) => {
    var trackingNumberList = this.state.trackingNumberList;
    let Index = this.state.trackingNumberList.findIndex(
      (x) => x.Index === index
    );
    if (Index !== -1) {
      trackingNumberList[Index]["Status"] = "Inactive";
      this.setState({ trackingNumberList: trackingNumberList });

      if (
        trackingNumberList.filter((x) => x.Status === "Active").length === 0
      ) {
        this.setState({
          isTrackingNumberVisible: false,
        });
      }
    }
  };

  addnewRowTrackingNumber = () => {
    const row = {
      TrackingID: "",
      TrackingDate: moment()
        .tz("America/Chicago")
        .format("MM/DD/YYYY"),
      TrackingStatus: "",
      Carrier: "",
      Type: "",
      Comments: "",
      Status: "Active",
      ShipppingTrackingID: null,
      CreatedByName: CommonConfig.loggedInUserData().Name,
      Index: this.state.trackingNumberList.length + 1,
    };
    this.setState({
      trackingNumberList: [...this.state.trackingNumberList, row],
    });
  };

  addnewRowPickupTrackingNumber = () => {
    const row = {
      TrackingID: "",
      TrackingDate: moment().toDate(),
      TrackingStatus: "",
      Carrier: "",
      Type: "",
      Comments: "",
      Status: "Active",
      ShipppingTrackingID: null,
      CreatedByName: CommonConfig.loggedInUserData().Name,
      Index: this.state.PickupTrackingList.length + 1,
    };
    this.setState({
      PickupTrackingList: [...this.state.PickupTrackingList, row],
    });
  };

  activeInactive = () => {
    return this.state.activeInactive.map((content) => {
      return (
        <MenuItem
          classes={{ root: useStyles.selectMenuItem }}
          value={content.value}
        >
          {" "}
          {content.label}{" "}
        </MenuItem>
      );
    });
  };

  handleChangetrackingNumber = (event, type, index) => {
    const { value } = event.target;
    const trackingNumberList = this.state.trackingNumberList;
    let idx = this.state.trackingNumberList.findIndex((x) => x.Index === index);
    if (
      type === "TrackingID" ||
      type === "Comments" ||
      type === "TrackingStatus"
    ) {
      trackingNumberList[idx][type] = value;
    }
    this.setState({ trackingNumberList: trackingNumberList });
  };

  handlePickupChangetrackingNumber = (event, type, index) => {
    const { value } = event.target;
    const PickupTrackingList = this.state.PickupTrackingList;
    let idx = this.state.PickupTrackingList.findIndex((x) => x.Index === index);
    if (
      type === "TrackingID" ||
      type === "Comments" ||
      type === "TrackingStatus"
    ) {
      PickupTrackingList[idx][type] = value;
    }
    this.setState({ PickupTrackingList: PickupTrackingList });
  };

  handleSelectChange = (value, type, index) => {
    if (value != null) {
      let TrackingList = this.state.trackingNumberList;
      let idx = this.state.trackingNumberList.findIndex(
        (x) => x.Index === index
      );
      TrackingList[idx][type] = value.value;
      this.setState({ trackingNumberList: TrackingList });
    }
  };

  addnewRowTrackingManual = () => {
    const row = {
      ShippingManualTrackingID: null,
      PickupDate: moment()
        .tz("America/Chicago")
        .format("MM/DD/YYYY"),
      //PickupDate: moment().toDate(),
      PickupTime: moment()
        .tz("America/Chicago")
        .format("HH:mm"),

      TrackingStatus: "",
      Type: "",
      Updates: "",
      Status: "Active",
      CreatedOn: moment()
        .tz("America/Chicago")
        .format("YYYY-MM-DD HH:mm:ss"),

      CreatedByName: CommonConfig.loggedInUserData().Name,
      Index: this.state.trackingManualList.length + 1,
      ustime: true,
    };
    this.setState({
      trackingManualList: [...this.state.trackingManualList, row],
    });
  };

  removeTrackingManualRow = (index) => {
    var trackingManualList = this.state.trackingManualList;
    let Index = this.state.trackingManualList.findIndex(
      (x) => x.Index === index
    );
    if (Index !== -1) {
      trackingManualList[Index]["Status"] = "Inactive";
      this.setState({ trackingManualList: trackingManualList });

      if (
        trackingManualList.filter((x) => x.Status === "Active").length === 0
      ) {
        this.setState({
          isTrackingManualVisible: false,
        });
      }
    }
  };

  handleManualTrackingChange = (event, type, index) => {
    let trackingManualList = this.state.trackingManualList;
    let idx = trackingManualList.findIndex((x) => x.Index === index);
    trackingManualList[idx][type] = event.target.value;
    this.setState({ trackingManualList: trackingManualList });
  };

  viewTrackingManual = () => {
    return this.state.trackingManualList
      .filter((x) => x.Status === "Active")
      .map((trackingManual, idx) => {
        return (
          <tr>
            <td className="wd-date">
              <div className="package-dateinput">
                <CustomInput
                  id="proposaltype"
                  inputProps={{
                    disabled: true,
                    value: trackingManual.CreatedOnManual,
                  }}
                />
              </div>
            </td>
            <td className="wd-time">
              <CustomInput
                id="proposaltype"
                type="number"
                inputProps={{
                  value:
                    trackingManual.ustime === true
                      ? ""
                      : moment(trackingManual.CreatedOn).format(
                          CommonConfig.dateFormat.timeOnlySec
                        ),
                  // value: momentTimezone(trackingManual.CreatedOn, "HH:mm:ss")
                  //   .tz(CommonConfig.UStimezone)
                  //   .format(CommonConfig.dateFormat.time12Only),
                  disabled: true,
                }}
              />
            </td>
            <td className="wd-date">
              <div className="package-dateinput">
                <Datetime
                  dateFormat={"MM/DD/YYYY"}
                  timeFormat={false}
                  // value={moment(trackingManual.PickupDate)}
                  value={moment(trackingManual.PickupDate).format(
                    CommonConfig.dateFormat.dateOnly
                  )}
                  onChange={(date) =>
                    this.dateChange(date, "PickupDate", trackingManual.Index)
                  }
                  closeOnSelect={true}
                  renderInput={(params) => (
                    <TextField {...params} margin="normal" fullWidth />
                  )}
                />
              </div>
            </td>
            <td className="wd-time">
              <CustomInput
                id="proposaltype"
                type="number"
                inputProps={{
                  value: trackingManual.PickupTime,
                  onChange: (event) =>
                    this.handleManualTrackingChange(
                      event,
                      "PickupTime",
                      trackingManual.Index
                    ),
                }}
              />
            </td>
            {/* <td className="wd-time">
              <form noValidate>
                <TextField
                  id="time"
                  type="time"
                  onChange={(event) => this.handleManualTrackingChange(event, "PickupTime", trackingManual.Index)}
                  value={moment(trackingManual.PickupTime,"HH:mm:ss").format(
                    CommonConfig.dateFormat.time12Only
                  )}
                  inputProps={{
                    step: 300, 
                  }}
                />
              </form>
            </td> */}
            <td colSpan={2} className="wdcomment">
              <CustomInput
                id="proposaltype"
                type="text"
                inputProps={{
                  value: trackingManual.Updates,
                  onChange: (event) =>
                    this.handleManualTrackingChange(
                      event,
                      "Updates",
                      trackingManual.Index
                    ),
                }}
              />
            </td>
            <td className="pck-action-column">
              {this.state.Access.DeleteAccess ? (
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn"
                  onClick={() =>
                    this.removeTrackingManualRow(trackingManual.Index)
                  }
                >
                  <i className={"fas fa-minus"} />
                </Button>
              ) : null}

              {this.state.trackingManualList.filter(
                (x) => x.Status === "Active"
              ).length ===
              idx + 1 ? (
                <Button
                  justIcon
                  color="facebook"
                  onClick={() => this.addnewRowTrackingManual()}
                  className="Plus-btn "
                >
                  <i className={"fas fa-plus"} />
                </Button>
              ) : null}

              <Tooltip title={trackingManual.CreatedByName} arrow>
                <Button justIcon color="twitter" className="Plus-btn info-icon">
                  <InfoIcon />
                </Button>
              </Tooltip>
            </td>
          </tr>
        );
      });
  };

  viewTrackingNumber = () => {
    const serviceName = this.state.TrackingServiceList.map((type) => {
      return { value: type.MainServiceName, label: type.MainServiceName };
    });

    return this.state.trackingNumberList
      .filter((x) => x.Status === "Active")
      .map((trackingnumber, idx) => {
        console.log("Track = ", trackingnumber);
        const Carrier = {
          value: trackingnumber.Carrier,
          label: trackingnumber.Carrier,
        };
        return (
          <tr>
            <td className="wd-num">
              <CustomInput
                id="proposaltype"
                inputProps={{
                  value: idx + 1,
                }}
              />
            </td>
            <td className="wd-date">
              <div className="package-dateinput">
                <CustomInput
                  id="proposaltype"
                  inputProps={{
                    disabled: true,

                    value: trackingnumber.TrackingDate
                      ? trackingnumber.TrackingDate
                      : "",
                  }}
                />
              </div>
            </td>
            <td style={{ width: 167 }} className="input-full">
              <CustomInput
                id="proposaltype"
                type="number"
                inputProps={{
                  value: trackingnumber.TrackingID,
                  onChange: (event) =>
                    this.handleChangetrackingNumber(
                      event,
                      "TrackingID",
                      trackingnumber.Index
                    ),
                }}
              />
            </td>
            <td>
              <div className="package-select">
                <Autocomplete
                  id="combo-box-demo"
                  options={serviceName}
                  value={Carrier}
                  onChange={(event, value) =>
                    this.handleSelectChange(
                      value,
                      "Carrier",
                      trackingnumber.Index
                    )
                  }
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => <TextField {...params} />}
                ></Autocomplete>
              </div>
            </td>
            <td className="">
              <div className="width-full">
                <CustomInput
                  id="proposaltype"
                  type="number"
                  inputProps={{
                    value: trackingnumber.Comments,
                    onChange: (event) =>
                      this.handleChangetrackingNumber(
                        event,
                        "Comments",
                        trackingnumber.Index
                      ),
                  }}
                />
              </div>
            </td>
            <td>
              <div className="table-select package-select">
                <FormControl className={useStyles.formControl} fullWidth>
                  <Select
                    id="package_number"
                    value={trackingnumber.TrackingStatus}
                    name="package_number"
                    className="form-control"
                    onChange={(event) =>
                      this.handleChangetrackingNumber(
                        event,
                        "TrackingStatus",
                        trackingnumber.Index
                      )
                    }
                  >
                    {this.activeInactive()}
                  </Select>
                </FormControl>
              </div>
            </td>
            <td className="pck-action-column">
              {this.state.Access.DeleteAccess &&
              trackingnumber.TrackingStatus === "Active" &&
              moment(new Date()).format(CommonConfig.dateFormat.dateOnly) <=
                moment(trackingnumber.CreatedOn)
                  .add(2, "days")
                  .format(CommonConfig.dateFormat.dateOnly) ? (
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn delete-icon"
                  onClick={() =>
                    this.handleClickOpenTrack(trackingnumber.TrackingID)
                  }
                >
                  <i className={"fas fa-trash"} />
                </Button>
              ) : null}
              <Button
                justIcon
                color="danger"
                className="Plus-btn"
                onClick={() => this.removeTrackingNumber(trackingnumber.Index)}
              >
                <i className={"fas fa-minus"} />
              </Button>

              {this.state.trackingNumberList.filter(
                (x) => x.Status === "Active"
              ).length ===
              idx + 1 ? (
                <Button
                  justIcon
                  color="facebook"
                  onClick={() => this.addnewRowTrackingNumber()}
                  className="Plus-btn "
                >
                  <i className={"fas fa-plus"} />
                </Button>
              ) : null}

              <Tooltip title={trackingnumber.CreatedByName} arrow>
                <Button justIcon color="twitter" className="Plus-btn info-icon">
                  <InfoIcon />
                </Button>
              </Tooltip>
            </td>
          </tr>
        );
      });
  };

  viewPickupCofirmation = () => {
    if (this.state.PickupTrackingList.length == 0) {
      return (
        <tr>
          <td className="wd-num textMessage" colSpan={7}>
            Please generate lable to schedule pickup
          </td>
        </tr>
      );
    } else {
      const serviceName = this.state.TrackingServiceList.map((type) => {
        return { value: type.MainServiceName, label: type.MainServiceName };
      });

      const PickupTrackingListData = this.state.PickupTrackingList;

      return PickupTrackingListData.map((trackingnumber, idx) => {
        return (
          <tr>
            <td className="wd-num">
              <CustomInput
                id="proposaltype"
                inputProps={{
                  value: idx + 1,
                }}
              />
            </td>
            {/* <td className="wd-date">
              <div className="package-dateinput">
                <CustomInput
                  id="proposaltype"
                  inputProps={{
                    disabled: true,
                    // value: moment(trackingnumber.TrackingDate).format(
                    //   CommonConfig.dateFormat.dateOnly
                    // ),
                    value: trackingnumber.FedexPickup
                      ? moment(trackingnumber.FedexPickup).format(
                          CommonConfig.dateFormat.dateOnly
                        )
                      : "",
                  }}
                />
              </div>
            </td> */}
            <td style={{ width: 167 }} className="input-full">
              <CustomInput
                id="proposaltype"
                type="number"
                inputProps={{
                  value: trackingnumber.TrackingID,
                  onChange: (event) =>
                    this.handlePickupChangetrackingNumber(
                      event,
                      "TrackingID",
                      trackingnumber.Index
                    ),
                }}
              />
            </td>
            <td>
              <div className="package-select">
                {trackingnumber.PickupConfirmation ? (
                  <CustomInput
                    id="proposaltype"
                    type="number"
                    inputProps={{
                      value: trackingnumber.PickupConfirmation,
                      ReadOnly: true,
                      disabled: true,
                      // onChange: (event) =>
                      //   this.handleChangetrackingNumber(
                      //     event,
                      //     "Comments",
                      //     trackingnumber.Index
                      //   ),
                    }}
                  />
                ) : null}
              </div>
            </td>
            <td>
              <div className="package-select">
                {trackingnumber.PickupConfirmation ? (
                  <CustomInput
                    id="proposaltype"
                    inputProps={{
                      disabled: true,
                      // value: moment(trackingnumber.TrackingDate).format(
                      //   CommonConfig.dateFormat.dateOnly
                      // ),
                      value: trackingnumber.FedexPickup
                        ? trackingnumber.FedexPickup
                        : "",
                    }}
                  />
                ) : null}
              </div>
            </td>
            <td className="">
              <div className="width-full">
                <CustomInput
                  id="proposaltype"
                  type="number"
                  inputProps={{
                    value: trackingnumber.Comments,
                    onChange: (event) =>
                      this.handleChangetrackingNumber(
                        event,
                        "Comments",
                        trackingnumber.Index
                      ),
                  }}
                />
              </div>
            </td>
            <td>
              <div className="width-full">
                <CustomInput
                  id="proposaltype"
                  type="number"
                  inputProps={{
                    value: trackingnumber.PickupStatus,
                  }}
                />
              </div>
            </td>
            <td className="pck-action-column">
              {/* {idx !== 0 ? ( */}

              {this.state.Access.DeleteAccess &&
              (trackingnumber.PickupConfirmation != null &&
                trackingnumber.PickupConfirmation != "") ? (
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn delete-icon"
                  onClick={() =>
                    this.handleClickOpenPickip(
                      trackingnumber.TrackingID,
                      trackingnumber.ShippingPickupID
                    )
                  }
                >
                  <i className={"fas fa-trash"} />
                </Button>
              ) : null}

              {trackingnumber.PickupConfirmation == "" ||
              trackingnumber.PickupConfirmation == null ? (
                <Tooltip title="Generate Pickup" arrow>
                  <Button
                    justIcon
                    color="primary"
                    className="Plus-btn"
                    onClick={() =>
                      this.handlePickupSchedule(
                        trackingnumber.TrackingID,
                        trackingnumber.PickupStatus,
                        trackingnumber.ShippingPickupID
                      )
                    }
                  >
                    <i className={"fas fa-check"} />
                  </Button>
                </Tooltip>
              ) : null}
              {/* <Button
                  justIcon
                  color="danger"
                  className="Plus-btn"
                  onClick={() => this.removeTrackingNumber(trackingnumber.Index)}
                >
                  <i className={"fas fa-minus"} />
                </Button> */}
              {/* ) : null} */}
              {PickupTrackingListData.filter((x) => x.Status === "Active")
                .length ===
              idx + 1 ? (
                <Button
                  justIcon
                  color="facebook"
                  onClick={() => this.addnewRowPickupTrackingNumber()}
                  className="Plus-btn "
                >
                  <i className={"fas fa-plus"} />
                </Button>
              ) : null}

              <Tooltip title={trackingnumber.CreatedByName} arrow>
                <Button justIcon color="twitter" className="Plus-btn info-icon">
                  <InfoIcon />
                </Button>
              </Tooltip>
            </td>
          </tr>
        );
      });
    }
  };
  AddNewRowData = () => {
    let attachments = this.state.Attachments.filter(
      (x) => x.Status === "Active"
    );
    let IsValid = true;
    for (
      let i = 0;
      i < this.state.Attachments.filter((x) => x.Status === "Active").length;
      i++
    ) {
      if (
        !attachments[i].hasOwnProperty("AttachmentName") &&
        !attachments[i].hasOwnProperty("isGenerated")
      ) {
        IsValid = false;
      }
    }
    var AttachmentList = this.state.Attachments.filter(
      (x) => x.Status === "Active"
    );
    if (IsValid) {
      const objAttachment = {
        Index: AttachmentList.filter((x) => x.Status === "Active").length + 1,
        FileName: "",
        DocumentType: "",
        Status: "Active",
        DocumentCreatedOn: moment().format(CommonConfig.dateFormat.dateOnly),
        DocumentCreatedBy: CommonConfig.loggedInUserData().Name,
      };
      this.setState({
        Attachments: [...this.state.Attachments, objAttachment],
      });
    } else {
      cogoToast.error("Please fill above row first");
    }
  };

  deleteFedexlabelPickup = (trckingID, cancelPickupID) => {
    var data = {
      TrackingNumber: trckingID,
      cancelPickupID: cancelPickupID,
      // Userid: CommonConfig.loggedInUserData().PersonID,
    };
    this.showLoader();
    api
      .post("scheduleshipment/DeleteFedexLablePickup", data)
      .then((res) => {
        if (res.data.success === true) {
          this.hideLoader();
          if (res.data.data === "Something went wrong") {
            cogoToast.error(res.data.message);
            this.setState({ IsfedexLabelOpenPickup: false });
          } else {
            cogoToast.success(res.data.message);
            this.setState({ IsfedexLabelOpenPickup: false });
          }
          this.getTrackingDetail();
          this.getPickupConfDetail();
          this.getDocumentation();
          this.getnotesByID();
        } else {
          this.hideLoader();
          cogoToast.error("Fedex Label is not Deleted");
        }
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  deleteFedexlabel = (trackingId) => {
    this.setState({
      IsfedexLabelOpen: false,
    });
    var data = {
      TrackingNumber: trackingId,
      Userid: CommonConfig.loggedInUserData().PersonID,
    };
    this.showLoader();
    api
      .post("scheduleshipment/DeleteFedexLable", data)
      .then((res) => {
        if (res.data.success === true) {
          this.hideLoader();
          if (res.data.data === "Something went wrong") {
            cogoToast.error(res.data.message);
          } else {
            cogoToast.success(res.data.message);
          }
          this.getTrackingDetail();
          this.getPickupConfDetail();
          this.getDocumentation();
          this.getnotesByID();
        } else {
          this.hideLoader();
          cogoToast.error("Fedex Label is not Deleted");
        }
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  handleDocumentChange = (e, record) => {
    var Index = this.state.Attachments.indexOf(record.original);
    this.state.Attachments[Index]["FileName"] = e.target.value;
    this.setState({ Attachments: [...this.state.Attachments] });
  };

  fileUpload = (event, record) => {
    const files = event.target.files[0];
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
        let dateNow = new Date().getTime();
        let Index = this.state.Attachments.indexOf(record.original);
        AttachmentList[Index]["AttachmentName"] = files.name;
        AttachmentList[Index]["AttachmentType"] = files.type;
        AttachmentList[Index]["AttachmentID"] = null;
        AttachmentList[Index]["DateTime"] = dateNow;
        AttachmentList[Index]["Status"] = "Active";
        this.setState({
          Attachments: AttachmentList,
          AttachmentList: [...this.state.AttachmentList, files],
        });
      }
    }
  };

  handleDocumentSendMail = (e, record, type) => {
    if (type === "PrepaidLables") {
      if (!record.hasOwnProperty("isGenerated")) {
        let Formatdata = {
          EmailType: "PrepaidLables",
          ShippingID:
            this.props.location.state && this.props.location.state.ShipppingID
              ? this.props.location.state.ShipppingID
              : null,
          UserID: CommonConfig.loggedInUserData().PersonID,
          InvoiceType: "",
        };
        api
          .post("scheduleshipment/getEmailFormat", Formatdata)
          .then((res) => {
            if (res.data[0][0]) {
              let escaped = new Option(res.data[0][0].currMessage).innerHTML;
              let fromMail = this.state.ManagedByEmail;
              var data = {
                Frommail: fromMail.includes("@sflworldwide.com")
                  ? fromMail
                  : "contact@sflworldwide.com",
                TOmail:
                  res.data[0][0].DBName === DBName_prod
                    ? this.state.FromEmail
                    : "hem.cognisun@gmail.com",
                CCmail:
                  res.data[0][0].DBName === DBName_prod
                    ? this.state.ManagedByEmail
                    : "hem.cognisun@gmail.com",
                TrackingNumber: this.state.TrackingNumber,
                Subjectmail: res.data[0][0].emailSubject,
                Bodymail: escaped,
                Type: "PrepaidLables",
              };
              var att = [
                {
                  filename: record.AttachmentName,
                  path: fileBase + record.AttachmentPath,
                  contentType: record.AttachmentType,
                },
              ];
              this.setState({
                sendmailopen: !this.state.sendmailopen,
                sendMailInfo: data,
                EmailFormat: res.data[0][0].currMessage,
                attas: att,
              });
            }
          })
          .catch((err) => {
            console.log("errr", err);
          });
      } else {
        cogoToast.error("Please Generate Required Document to be emailed");
      }
    } else if (type === "Invoice") {
      let Formatdata = {
        EmailType: "Invoice",
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
        UserID: CommonConfig.loggedInUserData().PersonID,
        InvoiceType: "Normal",
      };
      api
        .post("scheduleshipment/getEmailFormat", Formatdata)
        .then((res) => {
          if (res.data[0][0]) {
            let escaped = new Option(res.data[0][0].currMessage).innerHTML;
            let fromMail = this.state.ManagedByEmail;
            var data = {
              Frommail: fromMail.includes("@sflworldwide.com")
                ? fromMail
                : "contact@sflworldwide.com",
              TOmail:
                res.data[0][0].DBName === DBName_prod
                  ? this.state.FromEmail
                  : "utsav.cognisun@gmail.com",
              CCmail:
                res.data[0][0].DBName === DBName_prod
                  ? this.state.ManagedByEmail
                  : "uvesh.cognisun@gmail.com",
              TrackingNumber: this.state.TrackingNumber,
              Subjectmail: res.data[0][0].emailSubject,
              Bodymail: escaped,
              Type: "Invoice",
            };
            this.setState({
              sendmailopen: !this.state.sendmailopen,
              sendMailInfo: data,
              EmailFormat: res.data[0][0].currMessage,
            });
          }
        })
        .catch((err) => {
          console.log("errr", err);
        });
    } else if (type === "Message") {
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
    } else if (type === "Contract") {
      if (record.isGenerated) {
        let Formatdata = {
          EmailType: "Contract",
          ShippingID:
            this.props.location.state && this.props.location.state.ShipppingID
              ? this.props.location.state.ShipppingID
              : null,
          UserID: CommonConfig.loggedInUserData().PersonID,
          InvoiceType: "",
        };
        api
          .post("scheduleshipment/getEmailFormat", Formatdata)
          .then((res) => {
            if (res.data[0][0]) {
              let escaped = new Option(res.data[0][0].currMessage).innerHTML;
              let fromMail = this.state.ManagedByEmail;
              var data = {
                Frommail: fromMail.includes("@sflworldwide.com")
                  ? fromMail
                  : "contact@sflworldwide.com",
                TOmail:
                  res.data[0][0].DBName === DBName_prod
                    ? this.state.FromEmail
                    : "utsav.cognisun@gmail.com",
                CCmail:
                  res.data[0][0].DBName === DBName_prod
                    ? this.state.ManagedByEmail
                    : "uvesh.cognisun@gmail.com",
                TrackingNumber: this.state.TrackingNumber,
                Subjectmail: res.data[0][0].emailSubject,
                Bodymail: escaped,
                Type: "Contract",
              };
              this.setState({
                sendmailopen: !this.state.sendmailopen,
                sendMailInfo: data,
                EmailFormat: res.data[0][0].currMessage,
              });
            }
          })
          .catch((err) => {
            console.log("errr", err);
          });
      } else {
        cogoToast.error("Please Generate Required Document to be emailed");
      }
    }
  };

  printDocumentEsign = (record, type) => {};

  handleapiSendMail = async (type) => {
    this.setState({ sendmailopen: false });
    this.showLoader();
    if (type === "PrepaidLables") {
      try {
        if (
          this.state.selectedToCountry.value !=
            this.state.selectedFromCountry.value &&
          this.state.PackageType === "Package" &&
          this.state.ShipmentType.value != "Ocean"
        ) {
          let data = {
            dateTime: new Date().getTime() + "CommercialInvoice",
            Type: "Commercial_Invoice",
            ShippingID:
              this.props.location.state && this.props.location.state.ShipppingID
                ? this.props.location.state.ShipppingID
                : null,
            UserID: CommonConfig.loggedInUserData().PersonID,
          };
          await api
            .post("scheduleshipment/generateCommercialInvoice", data)
            .then(async (res) => {
              if (res.success) {
                cogoToast.success("Commercial Invoice Generated");
                let mailData = this.state.sendMailInfo;
                mailData.Bodymail = this.state.EmailFormat;
                mailData.ShippingID =
                  this.props.location.state &&
                  this.props.location.state.ShipppingID
                    ? this.props.location.state.ShipppingID
                    : null;
                mailData.DocumentType = "Prepaid Label";
                //  mailData.dateTime = data.dateTime;

                var attachments = {
                  filename: "Invoice-" + res.data.tempFedexTraking + ".pdf",
                  path: res.data.data,
                  fileName: res.data.fileName,
                  contentType: "application/pdf",
                };

                this.state.attas.push(attachments);
                mailData.attachments = this.state.attas;
                mailData.dateTime = mailData.attachments[0].filename;
                await api
                  .post("scheduleshipment/sendInvoiceEmail", mailData)
                  .then((res) => {
                    this.hideLoader();
                    if (res.success) {
                      cogoToast.success(res.data);
                      // window.location.reload();
                      this.getDocumentation();
                      this.getCommunicationList();
                    } else {
                      cogoToast.error("Something went wrong");
                    }
                  });
              } else {
                cogoToast.error("Commercial Invoice Generation Error");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          let mailData = this.state.sendMailInfo;
          mailData.Bodymail = this.state.EmailFormat;
          mailData.DocumentType = "Prepaid Label";
          mailData.ShippingID =
            this.props.location.state && this.props.location.state.ShipppingID
              ? this.props.location.state.ShipppingID
              : null;
          mailData.attachments = this.state.attas;
          await api
            .post("scheduleshipment/sendInvoiceEmail", mailData)
            .then((res) => {
              this.hideLoader();
              if (res.success) {
                cogoToast.success(res.data);
                this.getDocumentation();
                this.getCommunicationList();
              } else {
                cogoToast.error("Something went wrong");
              }
            });
        }
      } catch (err) {
        this.hideLoader();
        console.log("error", err);
      }
    } else if (type === "Invoice") {
      try {
        let data = {
          dateTime: new Date().getTime() + "Invoice",
          Type: "Document",
          ShippingID:
            this.props.location.state && this.props.location.state.ShipppingID
              ? this.props.location.state.ShipppingID
              : null,
          UserID: CommonConfig.loggedInUserData().PersonID,
        };
        await api
          .post("scheduleshipment/generateInvoice", data)
          .then((res) => {
            if (res.success) {
              cogoToast.success("Invoice Generated");
            } else {
              cogoToast.error("Invoice Generation Error");
            }
          })
          .catch((err) => {
            console.log(err);
          });
        let mailData = this.state.sendMailInfo;
        mailData.Bodymail = this.state.EmailFormat;
        mailData.DocumentType = "Invoice";
        mailData.ShippingID =
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null;
        mailData.dateTime = data.dateTime;
        mailData.attachments = [
          {
            filename: data.dateTime + ".pdf",
            // content : fileBase + 'ShipmentAttachment/' + data.dateTime + '.pdf' ,
            path: fileBase + "ShipmentAttachment/" + data.dateTime + ".pdf",
            contentType: "application/pdf",
          },
        ];
        await api
          .post("scheduleshipment/sendInvoiceEmail", mailData)
          .then((res) => {
            this.hideLoader();
            if (res.success) {
              cogoToast.success(res.data);
              this.getDocumentation();
              this.getCommunicationList();
            } else {
              cogoToast.error("Something went wrong");
            }
          });
      } catch (err) {
        this.hideLoader();
        console.log("err...", err);
      }
    } else if (type === "Contract") {
      try {
        let mailData = this.state.sendMailInfo;
        mailData.Bodymail = this.state.EmailFormat;
        mailData.DocumentType = "Contract";
        mailData.AttachmentPath = this.state.EsignPath;
        mailData.ShippingID =
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null;
        mailData.attachments = [];
        await api
          .post("scheduleshipment/sendInvoiceEmail", mailData)
          .then((res) => {
            this.hideLoader();
            if (res.success) {
              cogoToast.success(res.data);
              this.getDocumentation();
              this.getCommunicationList();
            } else {
              cogoToast.error("Something went wrong");
            }
          });
      } catch (err) {
        this.hideLoader();
        console.log("err...", err);
      }
    }
  };

  handleDocumentDelete = (e, record) => {
    delete record.TrackingNumber;
    var AttachmentList = this.state.Attachments;
    var Index = AttachmentList.indexOf(record);
    AttachmentList[Index]["Status"] = "Delete";
    if (AttachmentList.filter((x) => x.Status === "Active").length === 0) {
      AttachmentList.push(this.state.objAttachment);
    }
    this.setState({ Attachments: AttachmentList });

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
  };

  selectDocumentType = (value, record) => {
    if (value != null) {
      var AttachmentList = this.state.Attachments;
      var Index = AttachmentList.indexOf(record.original);
      AttachmentList[Index]["DocumentType"] = value.value;
      this.setState({ Attachments: AttachmentList });
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

  renderDocumentName = (cellInfo) => {
    return (
      <div className="table-input-slam">
        <CustomInput
          inputProps={{
            value: cellInfo.original.FileName,
            disabled: cellInfo.original.TrackingNumber ? true : false,
            onChange: (event) => this.handleDocumentChange(event, cellInfo),
          }}
        />
      </div>
    );
  };

  documentTypeList = () => {
    return this.state.DocumentTypeList.map((document) => {
      return (
        <MenuItem
          classes={{ root: classes.selectMenuItem }}
          value={document.Description}
        >
          {" "}
          {document.Description}{" "}
        </MenuItem>
      );
    });
  };

  shipmentStatusList = () => {
    return this.state.ShipmentStatusList.map((document) => {
      if (document.Description != "All") {
        return (
          <MenuItem
            classes={{ root: classes.selectMenuItem }}
            value={document.Description}
          >
            {" "}
            {document.Description}{" "}
          </MenuItem>
        );
      }
    });
  };

  renderDocumentType = (cellInfo) => {
    const documentType = this.state.DocumentTypeList.map((type) => {
      return { value: type.Description, label: type.Description };
    });
    const DocumentType = {
      value: cellInfo.original.DocumentType,
      label: cellInfo.original.DocumentType,
    };

    return (
      <div>
        {cellInfo.original.AttachmentPath ? (
          !cellInfo.original.AttachmentPath.includes("auth/esign_client") ? (
            <div>
              <div className="package-select">
                <Autocomplete
                  id="package_number"
                  options={documentType}
                  value={DocumentType}
                  disabled={
                    cellInfo.original.TrackingNumber ||
                    cellInfo.original.hasOwnProperty("isGenerated")
                      ? true
                      : false
                  }
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) =>
                    this.selectDocumentType(value, cellInfo)
                  }
                  renderInput={(params) => (
                    <TextField {...params} margin="normal" fullWidth />
                  )}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="package-select">
                <Autocomplete
                  id="package_number"
                  options={documentType}
                  value={DocumentType}
                  disabled={
                    cellInfo.original.TrackingNumber ||
                    cellInfo.original.hasOwnProperty("isGenerated")
                      ? true
                      : false
                  }
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) =>
                    this.selectDocumentType(value, cellInfo)
                  }
                  renderInput={(params) => (
                    <TextField {...params} margin="normal" fullWidth />
                  )}
                />
              </div>
            </div>
          )
        ) : cellInfo.original.TrackingNumber &&
          cellInfo.original.Index !== 3 ? (
          <div className="package-select">
            <Autocomplete
              id="package_number"
              options={documentType}
              value={DocumentType}
              disabled={
                cellInfo.original.TrackingNumber ||
                cellInfo.original.hasOwnProperty("isGenerated")
                  ? true
                  : false
              }
              getOptionLabel={(option) => option.label}
              onChange={(event, value) =>
                this.selectDocumentType(value, cellInfo)
              }
              //renderInput={(params) => <TextField {...params} />}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  // error={this.state.documentTypeErr}
                  // helperText={this.state.documentTypeHelperText}
                />
              )}
            />
          </div>
        ) : cellInfo.original.Index === 3 &&
          !cellInfo.original.isGenerated &&
          cellInfo.original.DocumentType === "Contract" ? (
          <div className="package-select">
            <Autocomplete
              id="package_number"
              options={documentType}
              value={DocumentType}
              disabled={
                cellInfo.original.TrackingNumber ||
                cellInfo.original.hasOwnProperty("isGenerated")
                  ? true
                  : false
              }
              getOptionLabel={(option) => option.label}
              onChange={(event, value) =>
                this.selectDocumentType(value, cellInfo)
              }
              //renderInput={(params) => <TextField {...params} />}
              renderInput={(params) => (
                <TextField {...params} margin="normal" fullWidth />
              )}
            />
          </div>
        ) : cellInfo.original.hasOwnProperty("isGenerated") &&
          (this.state.ServiceName.value === "FedEx" ||
            ((this.state.ServiceName.value === "SFL Worldwide" &&
              this.state.ShipmentType.value === "Ocean" &&
              this.state.SubServiceName.value === "Texas Console") ||
              this.state.SubServiceName.value === "New Jersey Console" ||
              this.state.SubServiceName.value === "California Console")) ? (
          <div className="package-select">
            <Autocomplete
              id="package_number"
              options={documentType}
              value={DocumentType}
              disabled={
                cellInfo.original.TrackingNumber ||
                cellInfo.original.hasOwnProperty("isGenerated")
                  ? true
                  : false
              }
              getOptionLabel={(option) => option.label}
              onChange={(event, value) =>
                this.selectDocumentType(value, cellInfo)
              }
              //renderInput={(params) => <TextField {...params} />}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  fullWidth
                  // error={this.state.documentTypeErr}
                  // helperText={this.state.documentTypeHelperText}
                />
              )}
            />
          </div>
        ) : (
          <div>
            <div className="package-select">
              <Autocomplete
                id="package_number"
                options={documentType}
                value={DocumentType}
                disabled={
                  cellInfo.original.TrackingNumber ||
                  cellInfo.original.hasOwnProperty("isGenerated")
                    ? true
                    : false
                }
                getOptionLabel={(option) => option.label}
                onChange={(event, value) =>
                  this.selectDocumentType(value, cellInfo)
                }
                //  renderInput={(params) => <TextField {...params} />}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    fullWidth
                    error={this.state.documentTypeErr}
                    helperText={this.state.documentTypeHelperText}
                  />
                )}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  formValid() {
    let IsValid = true;
    if (
      CommonConfig.isEmpty(this.state.InvoiceDueDate) &&
      this.state.PaymentList.filter(
        (x) => x.Status === "Active" && x.ServiceDescription !== ""
      ).length > 0
    ) {
      IsValid = false;
      this.setState({
        invoiceDueDateErr: true,
        invoiceDueDateHelperText: "Please select Invoice Due Date",
      });
      // cogoToast.error("Please select invoice due date");
    }
    if (this.state.Attachments.length > 0) {
      if (
        this.state.Attachments.filter(
          (x) =>
            x.Status === "Active" &&
            (x.DocumentType === "" || x.DocumentType === null)
        ).length > 0
      ) {
        IsValid = false;
        cogoToast.error("Please select Document Type");
        this.setState({
          documentTypeErr: true,
          documentTypeHelperText: "Please select Document Type",
        });
      } else {
        IsValid = true;
        this.setState({
          documentTypeErr: false,
          documentTypeHelperText: "",
        });
      }
    } else {
      IsValid = true;
    }
    if (
      CommonConfig.isEmpty(this.state.PickupDate) &&
      this.state.shipmentType == "Ocean"
    ) {
      IsValid = false;
      this.setState({
        pickupDateErr: true,
        pickupDateHelperText: "Please select pickup date",
      });
    }

    if (
      (!CommonConfig.isEmpty(this.state.PickupDate) &&
        (this.state.PickupVendorName.value === null ||
          this.state.PickupVendorName.value === "")) ||
      (!CommonConfig.isEmpty(this.state.PickupDate) &&
        (this.state.PickupVendorName.value === "NULL" ||
          this.state.PickupVendorName.value === ""))
    ) {
      IsValid = false;
      this.setState({
        pickupProviderErr: true,
        pickupProviderHelperText: "Please select Pickup Provider",
      });
    }

    if (
      (this.state.PickupVendorName.value == "NULL" ||
        this.state.PickupVendorName.value == null ||
        this.state.PickupVendorName.value == "") &&
      CommonConfig.isEmpty(this.state.PickupDate)
    ) {
      IsValid = true;
      this.setState({
        pickupDateErr: false,
        pickupDateHelperText: "",
      });
    } else {
      if (
        ((this.state.PickupVendorName.value != null ||
          this.state.PickupVendorName.value != "") &&
          CommonConfig.isEmpty(this.state.PickupDate)) ||
        ((this.state.PickupVendorName.value != "NULL" ||
          this.state.PickupVendorName.value != "") &&
          CommonConfig.isEmpty(this.state.PickupDate))
      ) {
        IsValid = false;
        this.setState({
          pickupDateErr: true,
          pickupDateHelperText: "Please select Pickup Date",
        });
      }

      // if (
      //   this.state.PickupVendorName.value === 68 &&
      //   CommonConfig.isEmpty(this.state.ReadyTime)
      // ) {
      //   IsValid = false;
      //   this.setState({
      //     ReadyTimeErr: true,
      //     ReadyTimeErrHelperText: "Please select Ready Time",
      //   });
      // }
      // if (
      //   this.state.PickupVendorName.value === 68 &&
      //   CommonConfig.isEmpty(this.state.AvailableTime)
      // ) {
      //   IsValid = false;
      //   this.setState({
      //     AvailableTimeErr: true,
      //     AvailableTimeErrHelperText: "Please select Available Time",
      //   });
      // }
    }

    return IsValid;
  }

  validate = () => {
    let IsValid = true;
    if (
      this.state.TotalCostCommercial > 2500 &&
      !this.state.IsAlreadyAESFilled
    ) {
      IsValid = false;
    }

    // if ((this.state.PickupVendorName.value == "NULL" || this.state.PickupVendorName.value == null) && (CommonConfig.isEmpty(this.state.PickupDate))) {
    //   IsValid = true;

    // } else {
    //   if (
    //     (
    //       this.state.PickupVendorName.value != null && CommonConfig.isEmpty(this.state.PickupDate)) ||
    //     (this.state.PickupVendorName.value != "NULL" && CommonConfig.isEmpty(this.state.PickupDate))
    //   ) {
    //     IsValid = false;
    //   }

    // }

    // if(CommonConfig.isEmpty(this.state.PickupDate)){
    //   IsValid = false;
    // }
    // if(this.state.PickupVendorName.value == null || this.state.PickupVendorName.value == "NULL"){
    //   IsValid = false;
    // }

    return IsValid;
  };

  handleDelete = () => {
    console.log("Welcome = ", this.props.history.location.state.createDup);

    // if (this.props.history.location.state.createDup == "1") {
    //   cogoToast.error(
    //     "Please re-open the shipment to delete. It was duplicated created"
    //   );
    // } else {
    this.setState({ deleteopen: true });
    // }
  };

  handleDuplicate = () => {
    // if(this.state.CommercialInvoiceList.lenght == 0){
    this.getCommercialInvoiceDetail();
    // }

    this.setState({ createopen: true });
  };

  handlePickupSchedule = (value, value2, value3) => {
    if (value2 === undefined) {
      this.setState({ FedexTrackAddorUpdate: "Add" });
      this.setState({ PickupID: value3 });
    } else {
      this.setState({ FedexTrackAddorUpdate: "Update" });
      this.setState({ PickupID: value3 });
    }

    this.setState({ FedexTrackNumber: value });
    this.setState({ IsfedexLabelGeneratePickup: true });
  };

  handleClickCancelClosePickup = () => {
    this.setState({ IsfedexLabelGeneratePickup: false });
  };

  GenratePickupConfirmation = (inputdata, addUpdate, PickupID) => {
    this.showLoader();
    var data = {
      FedexTrackingNumber: inputdata,
      FedexSerType: this.state.SubServiceName.value,
      queryType: addUpdate,
      PickupID: PickupID,
    };
    api.post("scheduleshipment/generatePickup", data).then((res) => {
      this.setState({ IsfedexLabelGeneratePickup: false });
      this.hideLoader();
      this.getTrackingDetail();
      this.getPickupConfDetail();
      this.getDocumentation();
      this.getnotesByID();
    });
  };

  handleMail = () => {
    this.setState({ MailOpenPopup: true });
  };

  deleteShipment = () => {
    this.showLoader();
    this.releaseLock();
    try {
      var data = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
        Attachment: this.state.Attachments,
      };
      this.setState({ deleteopen: false });
      api
        .post("scheduleshipment/deleteShipmentByID", data)
        .then((result) => {
          this.hideLoader();
          if (result.success) {
            cogoToast.success("Deleted Successfully");
            this.props.history.push({
              pathname: "/admin/ShipmentList",
              state: {
                filterlist:
                  this.props.history.location.state &&
                  this.props.history.location.state.filterlist !== undefined
                    ? this.props.history.location.state.filterlist
                    : null,
                shipmentstatusList:
                  this.props.history.location.state &&
                  this.props.history.location.state.shipmentstatusList !==
                    undefined
                    ? this.props.history.location.state.shipmentstatusList
                    : [],
                sortlist:
                  this.props.history.location.state &&
                  this.props.history.location.state.sortlist !== undefined
                    ? this.props.history.location.state.sortlist
                    : null,
                type:
                  this.props.history.location.state &&
                  this.props.history.location.state.type !== undefined
                    ? this.props.history.location.state.type
                    : "Shipment",
              },
            });
          } else {
            cogoToast.error("Something went wrong d1");
          }
        })
        .catch((err) => {
          this.hideLoader();
          console.log(err);
          cogoToast.error("Something went wrong d2");
        });
    } catch (err) {
      this.hideLoader();
      console.log("error", err);
      cogoToast.error("Something went wrong d3");
    }
  };
  SendEmailCancel = () => {
    this.setState({ MailOpenPopup: false });
    if (this.state.redirect) {
      if (this.state.isLock === false) {
        console.log("3.......");
        this.releaseLock();
      }
      this.props.history.push({
        pathname: "/admin/ShipmentList",
        state: {
          filterlist:
            this.props.history.location.state &&
            this.props.history.location.state.filterlist !== undefined
              ? this.props.history.location.state.filterlist
              : null,
          shipmentstatusList:
            this.props.history.location.state &&
            this.props.history.location.state.shipmentstatusList !== undefined
              ? this.props.history.location.state.shipmentstatusList
              : [],
          sortlist:
            this.props.history.location.state &&
            this.props.history.location.state.sortlist !== undefined
              ? this.props.history.location.state.sortlist
              : null,
          type:
            this.props.history.location.state &&
            this.props.history.location.state.type !== undefined
              ? this.props.history.location.state.type
              : "Shipment",
        },
      });
    }
  };
  SendDeliveredEmail = () => {
    this.showLoader();
    try {
      var data = {
        TrackingNumber: this.state.TrackingNumber,
        UserID: CommonConfig.loggedInUserData().PersonID,
      };

      api
        .post("reviewMangement/MailSend", data)
        .then((res) => {
          if (res.success) {
            this.hideLoader();
            if (res.Data.message == "already sent") {
              cogoToast.success(" Mail Already Sent ");
              this.setState({ MailOpenPopup: false });
            } else {
              cogoToast.success("Mail Sent successfully");
              this.setState({ MailOpenPopup: false });
            }
            //  this.setState({redirect: true})
            if (this.state.redirect) {
              if (this.state.isLock === false) {
                console.log("4.......");
                this.releaseLock();
              }
              this.props.history.push({
                pathname: "/admin/ShipmentList",
                state: {
                  filterlist:
                    this.props.history.location.state &&
                    this.props.history.location.state.filterlist !== undefined
                      ? this.props.history.location.state.filterlist
                      : null,
                  shipmentstatusList:
                    this.props.history.location.state &&
                    this.props.history.location.state.shipmentstatusList !==
                      undefined
                      ? this.props.history.location.state.shipmentstatusList
                      : [],
                  sortlist:
                    this.props.history.location.state &&
                    this.props.history.location.state.sortlist !== undefined
                      ? this.props.history.location.state.sortlist
                      : null,
                  type:
                    this.props.history.location.state &&
                    this.props.history.location.state.type !== undefined
                      ? this.props.history.location.state.type
                      : "Shipment",
                },
              });
            }
            // }
          } else {
            cogoToast.error(res.message);
            // this.setState({redirect: true})
          }
        })
        .catch((err) => {
          console.log("setLock err", err);
        });
    } catch (err) {
      this.hideLoader();
      console.log("error", err);
      cogoToast.error("Something went wrong3");
    }
  };

  createDuplicate = (responses) => {
    this.getAccountDetail();

    this.state.setDupLicate = responses;
    this.state.createDuplicate = "1";
    this.handleSave(false);
  };

  handleSave = (redirect) => {
    // console.log("this.package = ",packobj)

    var countsec = 0;

    console.log(
      "this.state.commercialList.length = ",
      this.state.commercialList
    );

    if (
      this.state.PackageType === "Package" &&
      this.state.ShipmentType.value == "Ocean"
    ) {
      debugger;
      for (let index = 0; index < this.state.commercialList.length; index++) {
        if (this.state.commercialList[index].Status == "Active") {
          const elementsecond = this.state.commercialList[index].PackageNumber;
          for (
            let indexsecond = index + 1;
            indexsecond < this.state.commercialList.length;
            indexsecond++
          ) {
            if (
              this.state.commercialList[indexsecond].PackageNumber ==
                elementsecond &&
              this.state.commercialList[indexsecond].Status == "Active"
            ) {
              countsec = 1;
              break;
            }
          }
        }
      }
    }

    // if (this.props.history.location.state.createDup == "1") {
    //   cogoToast.error(
    //     "Please re-open the shipment to Save. It was duplicated created"
    //   );
    // } else {
    console.log("commercialList = ", this.state.commercialList);
    let count = 0;
    // if (this.state.PackageType === "Package") {
    for (let index = 0; index < this.state.commercialList.length; index++) {
      const element = this.state.commercialList[index].PackageNumber;
      if (
        element > this.state.TotalPackages &&
        this.state.commercialList[index].Status == "Active"
      ) {
        count = 1;
        break;
      }
    }
    // }
    if (count == 1) {
      console.log("In IF");
      cogoToast.error(
        "Please enter valid package number for commercial invoice"
      );
    } else if (countsec == 1) {
      console.log("In IF");
      cogoToast.error(
        "Please enter unique package number for commercial invoice"
      );
    } else {
      if (
        this.state.Moveupdatetozip === true &&
        this.state.Moveupdatefromzip === true
      ) {
        if (this.validate()) {
          if (this.formValid()) {
            let packobj = this.state.PackageList.filter(
              (x) =>
                (x.Status === "Inactive" &&
                  x.ShippingPackageDetailID !== null) ||
                ((x) => x.Status === "Active")
            );
            let scheduleobj = this.state.ShipmentType.value;
            let senderobj = this.state.FromAddress;
            let recipientobj = this.state.ToAddress;
            let commercialData = this.state.commercialList;
            let comList1 = [];

            for (let index = 0; index < commercialData.length; index++) {
              const element = commercialData[index];
              if (
                commercialData[index].Status == "Inactive" &&
                commercialData[index].ShippingCommercialInvoiceID == null
              ) {
              } else {
                comList1.push(commercialData[index]);
              }
            }
            commercialData = comList1;
            console.log("commercialListin Loop = ", commercialData);

            console.log(
              "This.state.this.state.commercialList = ",
              this.state.commercialList
            );
            let paymentInvoiceData = this.state.PaymentList.filter(
              (x) =>
                (x.Status === "Inactive" && x.ShippingInvoiceID !== null) ||
                (x.Status === "Active" && x.ServiceDescription !== "")
            );
            let TrackingData = this.state.trackingNumberList.filter(
              (x) =>
                (x.Status === "Inactive" && x.ShippingTrackingID !== null) ||
                (x.Status === "Active" && x.TrackingID !== "")
            );
            let ManualTrackingData = this.state.trackingManualList.filter(
              (x) =>
                (x.Status === "Inactive" &&
                  x.ShippingManualTrackingID !== null) ||
                (x.Status === "Active" && x.Updates !== "")
            );
            let paymentReceivedData = this.state.paymentReceived.filter(
              (x) =>
                (x.Status === "Inactive" &&
                  x.ShippingPaymentReceivedID !== null) ||
                (x.Status === "Active" && x.PaymentType !== "")
            );
            let paymentIssued = this.state.paymentIssued.filter(
              (x) =>
                (x.Status === "Inactive" &&
                  x.ShippingPaymentIssuedID !== null) ||
                (x.Status === "Active" && x.VendorName !== "")
            );
            let creditCardObj = this.state.creditCardList.filter(
              (x) =>
                (x.Status === "Inactive" && x.PaymentID !== null) ||
                (x.Status === "Active" && x.CardName !== "")
            );
            let bankObj = this.state.bankList.filter(
              (x) =>
                (x.Status === "Inactive" && x.PaymentID !== null) ||
                (x.Status === "Active" && x.NameonAccount !== "")
            );
            let packages_data = [];
            let com_data = [];
            var paymentdata = [];
            if (scheduleobj === "Air" || scheduleobj === "Ground") {
              if (this.state.PackageType === "Package") {
                for (var i = 0; i < packobj.length; i++) {
                  let package_details = {};
                  package_details = {
                    shipments_tracking_number: "",
                    PackageNumber: packobj[i].PackageNumber,
                    package_number: packobj[i].Sequence,
                    weight: packobj[i].EstimetedWeight,
                    unit_of_weight: "LBS",
                    length: packobj[i].Length,
                    width: packobj[i].Width,
                    height: packobj[i].Height,
                    chargable_weight: packobj[i].ChargableWeight,
                    insured_value: packobj[i].InsuredValue,
                    Sequence: packobj[i].Sequence,
                    PackageContent: packobj[i].PackageContent,
                    PackedType: packobj[i].PackedType,
                    Status: packobj[i].Status,
                    TV: false,
                    Stretch: false,
                    Repack: false,
                    Crating: false,
                    PackageID: packobj[i].ShippingPackageDetailID,
                  };
                  packages_data.push(package_details);
                }
              } else if (this.state.PackageType === "Envelop") {
                if (packobj.length > 1) {
                  for (var j = 1; j < packobj.length; j++) {
                    if (packobj[j].Status === "Inactive") {
                      let package_details = {};
                      package_details = {
                        shipments_tracking_number: "",
                        PackageNumber: packobj[j].PackageNumber,
                        package_number: packobj[j].Sequence,
                        weight: packobj[j].EstimetedWeight,
                        unit_of_weight: "LBS",
                        length: packobj[j].Length,
                        width: packobj[j].Width,
                        height: packobj[j].Height,
                        chargable_weight: packobj[j].ChargableWeight,
                        insured_value: packobj[j].InsuredValue,
                        Sequence: packobj[j].Sequence,
                        PackedType: packobj[j].PackedType,
                        Status: packobj[j].Status,
                        PackageContent: packobj[j].PackageContent,
                        TV: false,
                        Stretch: false,
                        Repack: false,
                        Crating: false,
                        PackageID: packobj[j].ShippingPackageDetailID,
                      };

                      packages_data.push(package_details);
                    }
                  }
                }
                let package_details = {};
                package_details = {
                  shipments_tracking_number: "",
                  PackageNumber: packobj[0].PackageNumber,
                  package_number: packobj[0].Sequence,
                  weight: packobj[0].EstimetedWeight,
                  unit_of_weight: "LBS",
                  length: packobj[0].Length,
                  width: packobj[0].Width,
                  height: packobj[0].Height,
                  chargable_weight: packobj[0].ChargableWeight,
                  insured_value: packobj[0].InsuredValue,
                  Sequence: packobj[0].Sequence,
                  PackedType: packobj[0].PackedType,
                  Status: packobj[0].Status,
                  PackageContent: packobj[0].PackageContent,
                  TV: false,
                  Stretch: false,
                  Repack: false,
                  Crating: false,
                  PackageID: packobj[0].ShippingPackageDetailID,
                };

                packages_data.push(package_details);
              }
            } else if (scheduleobj === "Ocean") {
              if (this.state.PackageType === "Package") {
                for (var i = 0; i < packobj.length; i++) {
                  let package_details = {};
                  package_details = {
                    shipments_tracking_number: "",
                    PackageNumber: packobj[i].PackageNumber,
                    package_number: packobj[i].Sequence,
                    weight: packobj[i].EstimetedWeight,
                    unit_of_weight: "LBS",
                    length: packobj[i].Length,
                    width: packobj[i].Width,
                    height: packobj[i].Height,
                    chargable_weight: packobj[i].ChargableWeight,
                    insured_value: packobj[i].InsuredValue,
                    Sequence: packobj[i].Sequence,
                    Status: packobj[i].Status,
                    TV: false,
                    Stretch: false,
                    Repack: false,
                    Crating: false,
                    PackageContent: packobj[i].PackageContent,
                    PackedType: packobj[i].PackedType,
                    CFT: packobj[i].CFT,
                    PackageID: packobj[i].ShippingPackageDetailID,
                  };
                  packages_data.push(package_details);
                }
              } else if (this.state.PackageType === "Envelop") {
                let package_details = {};
                package_details = {
                  shipments_tracking_number: "",
                  PackageNumber: packobj[0].PackageNumber,
                  package_number: packobj[0].Sequence,
                  weight: packobj[0].EstimetedWeight,
                  unit_of_weight: "LBS",
                  length: packobj[0].Length,
                  width: packobj[0].Width,
                  height: packobj[0].Height,
                  chargable_weight: packobj[0].ChargableWeight,
                  insured_value: parseFloat(packobj[0].InsuredValue).toFixed(2),
                  Sequence: packobj[0].Sequence,
                  Status: packobj[0].Status,
                  TV: false,
                  Stretch: false,
                  Repack: false,
                  Crating: false,
                  PackageContent: packobj[0].PackageContent,
                  PackedType: packobj[0].PackedType,
                  CFT: parseFloat(packobj[0].CFT).toFixed(2),
                  PackageID: packobj[0].ShippingPackageDetailID,
                };

                packages_data.push(package_details);
              }
            }

            var packages = packages_data;
            for (var i = 0; i < commercialData.length; i++) {
              let commercail_details = {};
              commercail_details = {
                shipments_tracking_number: "",
                package_number: commercialData[i].PackageNumber,
                content_description: commercialData[i].ContentDescription,
                // newipLocation: commercialData[i].ipLocation,
                quantity: commercialData[i].Quantity,
                value_per_qty: commercialData[i].ValuePerQuantity,
                total_value: commercialData[i].TotalValue,
                Status: commercialData[i].Status,
                CommercialInvoiceID:
                  commercialData[i].ShippingCommercialInvoiceID,
              };
              com_data.push(commercail_details);
            }
            var commercial = com_data;
            var shipments = {
              tracking_number: "",
              shipment_type: scheduleobj,
              location_type: this.state.LocationType,
              is_pickup: !CommonConfig.isEmpty(this.state.IsPickup.data)
                ? this.state.IsPickup.data[0] === 0
                  ? false
                  : true
                : this.state.IsPickup,
              ShipmentStatus: this.state.ShipmentStatus,
              pickup_date:
                CommonConfig.isEmpty(this.state.PickupDate) != true
                  ? // ? momentTimezone(this.state.PickupDate)
                    //     .tz(CommonConfig.UStimezone)
                    //     .format("YYYY-MM-DD HH:mm:ss")
                    //     .toString()
                    moment(this.state.PickupDate)
                      .format("YYYY-MM-DD HH:mm:ss")
                      .toString()
                  : null,
              ReadyTime: this.state.ReadyTime,
              AvailableTime: this.state.AvailableTime,
              SpecialInstucation: this.state.NotesforPickup,
              pickupProvider: !CommonConfig.isEmpty(
                this.state.PickupVendorName.value
              )
                ? this.state.PickupVendorName.value
                : null,
              package_type: !CommonConfig.isEmpty(packobj)
                ? this.state.PackageType
                : "",
              total_packages: packobj.filter((x) => x.Status === "Active")
                .length,
              ContainerID: !CommonConfig.isEmpty(this.state.ContainerName.value)
                ? this.state.ContainerName.value
                : null,
              promo_code: "",
              is_agree: "",
              total_weight: !CommonConfig.isEmpty(senderobj)
                ? senderobj.TotalWeight
                : 0,
              total_chargable_weight: !CommonConfig.isEmpty(
                this.state.totalChargableWeight
              )
                ? this.state.totalChargableWeight
                : 0.0,
              total_insured_value: !CommonConfig.isEmpty(
                this.state.totalInsuredValue
              )
                ? this.state.totalInsuredValue
                : 0.0,
              duties_paid_by: this.state.DutiesPaidBy,
              total_declared_value: !CommonConfig.isEmpty(senderobj)
                ? senderobj.TotalDeclaredValue
                : 0,
              userName: CommonConfig.loggedInUserData().LoginID,
              InvoiceDueDate:
                CommonConfig.isEmpty(this.state.InvoiceDueDate) != true
                  ? moment(this.state.InvoiceDueDate)
                      .format("YYYY-MM-DD HH:mm:ss")
                      .toString()
                  : null,
              managed_by: this.state.ManagedBy.value,
              ServiceName: this.state.ServiceName
                ? this.state.ServiceName.value
                : "",
              SubServiceName: this.state.SubServiceName
                ? this.state.SubServiceName.value
                : "",
              PersonID: this.state.PersonID,
              IsPackageAccess: this.state.IsPackageAccess,
              ShippingID:
                this.props.location.state &&
                this.props.location.state.ShipppingID
                  ? this.props.location.state.ShipppingID
                  : null,
            };

            var from_address = {
              AddressID: senderobj.FromAddressID,
              country_id: this.state.selectedFromCountry.value,
              country_name: this.state.selectedFromCountry.label,
              company_name: this.state.FromCompanyName,
              contact_name: this.state.FromContactName,
              address_1: this.state.FromAddressLine1,
              address_2: this.state.FromAddressLine2,
              address_3: this.state.FromAddressLine3,
              MovingBack: CommonConfig.isEmpty(this.state.FromMovingBack.value)
                ? this.state.FromMovingBack
                : this.state.FromMovingBack.value,
              OriginalPassportAvailable: CommonConfig.isEmpty(
                this.state.FromOriginalPassortAvailable.value
              )
                ? this.state.FromOriginalPassortAvailable
                : this.state.FromOriginalPassortAvailable.value,
              EligibleForTR: CommonConfig.isEmpty(
                this.state.FromEligibleForTR.value
              )
                ? this.state.FromEligibleForTR
                : this.state.FromEligibleForTR.value,
              city_id: 1,
              city_name: CommonConfig.isEmpty(this.state.fromCity.value)
                ? this.state.fromCity
                : this.state.fromCity.value,
              state_id: 1,
              fedex_city: senderobj.FedexCity,
              //state_name: this.state.FromAddressObj.AddressDetail.State,
              state_name: this.state.fromState.value
                ? this.state.fromState.value
                : this.state.fromState.label == ""
                ? ""
                : this.state.fromState,
              zip_code: this.state.FromZipCode,
              phone1: this.state.FromPhone1,
              phone2: this.state.FromPhone2,
              email: this.state.FromEmail,
            };
            var to_address = {
              AddressID: recipientobj.ToAddressID,
              country_id: this.state.selectedToCountry.value,
              country_name: this.state.selectedToCountry.label,
              company_name: this.state.ToCompanyName,
              contact_name: this.state.ToContactName,
              address_1: this.state.ToAddressLine1,
              address_2: this.state.ToAddressLine2,
              address_3: this.state.ToAddressLine3,
              city_id: 2,
              city_name: CommonConfig.isEmpty(this.state.toCity.value)
                ? this.state.toCity
                : this.state.toCity.value,
              state_id: 1,
              fedex_city: recipientobj.FedexCity,
              // state_name: this.state.ToAddressObj.AddressDetail.State,
              state_name: this.state.toState.value
                ? this.state.toState.value
                : this.state.toState.value == ""
                ? ""
                : this.state.toState,
              zip_code: this.state.ToZipCode,
              phone1: this.state.ToPhone1,
              phone2: this.state.ToPhone2,
              email: this.state.ToEmail,
            };
            for (var j = 0; j < bankObj.length; j++) {
              let paymentData = {};
              paymentData = {
                PaymentID: bankObj[j]["PaymentID"],
                PaymentType: bankObj[j]["PaymentType"],
                name_on_card: bankObj[j]["CardName"],
                card_number: bankObj[j]["CardNumber"],
                card_type: bankObj[j]["CardType"],
                expiration_month: bankObj[j]["CardExpiryMonth"],
                expiration_year: bankObj[j]["CardExpiryYear"],
                cvv_code: bankObj[j]["CardCVV"],
                zip_code: bankObj[j]["CardZipCode"],
                PaymentStatus: bankObj[j]["PaymentStatus"],
                name_on_bank_account: bankObj[j]["NameonAccount"],
                bank_name: bankObj[j]["BankName"],
                account_number: bankObj[j]["AccountNumber"],
                routing_number: bankObj[j]["RoutingNumber"],
                Status: bankObj[j]["Status"],
                InvoiceAmount: bankObj[j]["InvoiceAmount"],
                DatePaid: bankObj[j]["PaidDate"],
              };

              paymentdata.push(paymentData);
            }
            console.log("pppppp", this.state.paymentIssued);
            for (var j = 0; j < creditCardObj.length; j++) {
              let paymentData = {};
              paymentData = {
                PaymentID: creditCardObj[j]["PaymentID"],
                PaymentType: creditCardObj[j]["PaymentType"],
                name_on_card: creditCardObj[j]["CardName"],
                card_number: creditCardObj[j]["CardNumber"],
                card_type: creditCardObj[j]["CardType"],
                expiration_month: creditCardObj[j]["CardExpiryMonth"],
                expiration_year: creditCardObj[j]["CardExpiryYear"],
                cvv_code: creditCardObj[j]["CardCVV"],
                PaymentStatus: creditCardObj[j]["PaymentStatus"],
                zip_code: creditCardObj[j]["CardZipCode"],
                name_on_bank_account: creditCardObj[j]["NameonAccount"],
                bank_name: creditCardObj[j]["BankName"],
                account_number: creditCardObj[j]["AccountNumber"],
                routing_number: creditCardObj[j]["RoutingNumber"],
                Status: creditCardObj[j]["Status"],
                InvoiceAmount: creditCardObj[j]["InvoiceAmount"],
                DatePaid: creditCardObj[j]["PaidDate"],
              };

              paymentdata.push(paymentData);
            }

            var FinalNotes = this.state.notes.filter(
              (x) => x.NoteText !== "" && x.NoteText !== null
            );
            var finalAttachment = [];

            for (var i = 0; i < this.state.Attachments.length; i++) {
              if (!this.state.Attachments[i].hasOwnProperty("TrackingNumber")) {
                if (
                  this.state.Attachments[i].hasOwnProperty("AttachmentName")
                ) {
                  finalAttachment.push(this.state.Attachments[i]);
                }
              }
            }

            var objdata = {};
            if (this.state.IsChanged) {
              objdata = {
                UserID: CommonConfig.loggedInUserData().PersonID,
                TrackingNumber: this.state.TrackingNumber,
                shipments: shipments,
                MovingBackToIndia: this.state.movingBackIndia,
                trackingData: TrackingData,
                from_address: from_address,
                to_address: to_address,
                PaymentData: paymentdata,
                manualTrackingData: ManualTrackingData,
                packages: packages,
                commercial: commercial,
                Notes: FinalNotes,
                invoiceData: paymentInvoiceData,
                paymentReceivedData: paymentReceivedData,
                paymentIssued: paymentIssued,
                TotalCommercialvalue: "",
                DocumentList: finalAttachment,
                previousAllClear: this.state.previousAllClear,
                AllClear:
                  this.state.AllClear.value === "Not Ready"
                    ? null
                    : this.state.AllClear.value === "Ready for Yes"
                    ? 3
                    : this.state.AllClear.value === "Collections" // ? "Ready for Yes"
                    ? 4
                    : this.state.AllClear.value === "No"
                    ? 0
                    : 1,
                Amount: this.state.TotalCostReceived,
              };
              if (
                objdata.AllClear === "Yes" &&
                this.state.useraccess.userModuleAccess[15].ModuleID === 18 &&
                this.state.useraccess.userModuleAccess[15].WriteAccess === 1 &&
                this.state.useraccess.userModuleAccess[15].DeleteAccess === 1
              ) {
                this.setState({ IsChanged: false });
              }
            } else {
              objdata = {
                UserID: CommonConfig.loggedInUserData().PersonID,
                TrackingNumber: this.state.TrackingNumber,
                shipments: shipments,
                trackingData: TrackingData,
                MovingBackToIndia: this.state.movingBackIndia,
                from_address: from_address,
                to_address: to_address,
                PaymentData: paymentdata,
                manualTrackingData: ManualTrackingData,
                packages: packages,
                commercial: commercial,
                Notes: FinalNotes,
                invoiceData: paymentInvoiceData,
                paymentReceivedData: paymentReceivedData,
                paymentIssued: paymentIssued,
                TotalCommercialvalue: "",
                DocumentList: finalAttachment,
              };
            }

            debugger;
            if (
              this.state.isBackIndia ||
              this.state.CustomClearanceDate !== "" ||
              this.state.UserAdditionalDetailsID > 0
            ) {
              objdata.UserAdditionalData = {
                NameAsPerPassport: this.state.NameAsPerPassport,
                PassportNumber: this.state.PassportNumber,
                YearsOutsideIndia: this.state.YearsOutsideIndia,
                UserAdditionalDetailsID: this.state.UserAdditionalDetailsID,
                StayInIndia: this.state.StayInIndia,
                LatestArrivalDate: this.state.LatestArrivalDate
                  ? moment(this.state.LatestArrivalDate)
                      .format(CommonConfig.dateFormat.dbDateTime)
                      .toString()
                  : null,
                AppliedForTR: this.state.AppliedForTR,
                AbleToProvidePassport: this.state.AbleToProvidePassport,
                VisaValidDate: this.state.VisaValidDate
                  ? moment(this.state.VisaValidDate)
                      .format(CommonConfig.dateFormat.dbDateTime)
                      .toString()
                  : null,
                VisaCategory: this.state.VisaCategory,
                CustomClearanceDate:
                  CommonConfig.isEmpty(this.state.CustomClearanceDate) != true
                    ? moment(this.state.CustomClearanceDate)
                        .format("YYYY-MM-DD HH:mm:ss")
                        .toString()
                    : null,
              };
            }

            console.log("pppppp111", objdata.manualTrackingData);
            if (this.state.createDuplicate == "1") {
              var todayDate = new Date();
              const note1 = {
                NoteText:
                  "Shipment is duplicate created by Tracking No: " +
                  objdata.TrackingNumber,
                NoteType: null,
                NoteTitle: null,
                Status: "Active",
                AttachmentID: null,
                AttachmentType: null,
                AttachmentName: null,
                CreatedOn: moment(todayDate).format(
                  CommonConfig.dateFormat.dateTime
                ),
                disabled: false,
                closebutton: true,
                CreatedBy: CommonConfig.loggedInUserData().PersonID,
                NoteID: null,
                CreatedByNote: CommonConfig.loggedInUserData().Name,
                AddedBy: CommonConfig.loggedInUserData().Name,
                Index: 1,
              };
              let NoteDate = [];
              NoteDate.push(note1);
              objdata.Notes = NoteDate;
              objdata.TrackingNumber = null;
              objdata.shipments.ShippingID = null;
              objdata.from_address.AddressID = null;
              objdata.to_address.AddressID = null;
              objdata.shipments.ServiceName = "";
              objdata.shipments.SubServiceName = "";
              objdata.manualTrackingData = [];
              objdata.trackingData = [];
              delete objdata.shipments.ShipmentStatus;
              delete objdata.shipments.ContainerID;
              delete objdata.shipments.pickupProvider;
              // objdata.UserAdditionalData = [];

              debugger;

              if (this.state.PackageType === "Package") {
                objdata.commercial = [];
              } else {
                for (var i = 0; i < commercial.length; i++) {
                  delete commercial[i].CommercialInvoiceID;
                }
                objdata.commercial = commercial;
              }
              // objdata.Notes = []
              objdata.invoiceData = [];
              objdata.paymentReceivedData = [];
              objdata.paymentIssued = [];
              objdata.TotalCommercialvalue = "";
              objdata.DocumentList = [];

              console.log(objdata.PaymentData);
              if (objdata.PaymentData.length == 0) {
                var payment_online1 = {
                  PaymentID: null,
                  name_on_card: "",
                  card_number: "",
                  card_type: "",
                  expiration_month: "",
                  expiration_year: "",
                  cvv_code: "",
                  zip_code: "",
                  name_on_bank_account: "",
                  bank_name: "",
                  account_number: "",
                  routing_number: "",
                  InvoiceAmount: 0.0,
                };

                let Paymentdata = [];
                Paymentdata.push(payment_online1);
                objdata.PaymentData = Paymentdata;
              } else {
                for (
                  let index = 0;
                  index < objdata.PaymentData.length;
                  index++
                ) {
                  objdata.PaymentData[index].PaymentID = null;
                }
              }
              console.log(objdata.PaymentData);
              if (objdata.shipments.shipment_type == "Ocean") {
                objdata.packages = [];
              } else {
                if (objdata.packages.length > 0) {
                  for (
                    let index = 0;
                    index < objdata.packages.length;
                    index++
                  ) {
                    objdata.packages[index].PackageID = null;
                  }
                }
              }
            }
            console.log("objdata = ", objdata);
            var formData = new FormData();
            formData.append("data", JSON.stringify(objdata));
            if (this.state.AttachmentList.length > 0) {
              this.state.AttachmentList.forEach((file) => {
                formData.append("Attachments", file);
              });
            }
            this.showLoader();
            try {
              api
                .post("scheduleshipment/addshipments", formData)
                .then((res) => {
                  this.hideLoader();
                  if (res.success) {
                    if (res.data.success === true) {
                      if (this.state.createDuplicate == "1") {
                        if (objdata.shipments.shipment_type == "Ocean") {
                          var data = {
                            ShippingID: res.data.ShippingID,
                            Mode: "I",
                            shipStatus: "",
                            pickupDate: "",
                          };

                          api
                            .post("scheduleshipment/autoOceanTracking", data)
                            .then((res) => {
                              console.log(res);
                            });
                        }

                        this.state.createDuplicate = "0";
                        this.state.createopen = false;
                        this.state.dupTracking = res.data.data;
                        if (this.state.setDupLicate == true) {
                          const { history } = this.props;

                          debugger;
                          var sortPropsdata = [
                            {
                              desc: true,
                              id: "ShipmentDate",
                            },
                          ];
                          var filterlistdata = [];

                          var shipmentstatusListData = [
                            {
                              label: "New Request",
                              value: "New Request",
                            },
                          ];

                          console.log("this.state.sortProps = ", sortPropsdata);
                          console.log(
                            "this.state.shipmentstatusList = ",
                            shipmentstatusListData
                          );

                          history.push({
                            pathname: "ShipmentNew",
                            state: {
                              ShipppingID: res.data.ShippingID,
                              filterlist: filterlistdata,
                              type: "Shipment",
                              createDup: "1",
                              shipmentstatusList: shipmentstatusListData,
                              sortlist: sortPropsdata,
                            },
                          });
                          // window.location.reload();
                        } else {
                          this.state.successOpened = true;
                        }

                        // cogoToast.success("Duplicated created Successfully. Tracking Number : " + res.data.data);
                      } else {
                        cogoToast.success("Updated Successfully");
                      }
                      if (this.state.MailDelivered === true) {
                        this.setState({ MailOpenPopup: true });
                      } else {
                        this.setState({ MailOpenPopup: false });
                      }
                      if (objdata.shipments.ShippingID < 13071) {
                        if (objdata.shipments.shipment_type == "Ocean") {
                          var data = {
                            ShippingID: objdata.shipments.ShippingID,
                            Mode: "U",
                            shipStatus: objdata.shipments.ShipmentStatus,
                            pickupDate:
                              CommonConfig.isEmpty(this.state.PickupDate) !=
                              true
                                ? moment(this.state.PickupDate)
                                    .format("YYYY-MM-DD")
                                    .toString()
                                : null,
                            containerID: objdata.shipments.ContainerID,
                          };

                          api
                            .post(
                              "scheduleshipment/tempautoOceanTracking",
                              data
                            )
                            .then((res) => {});
                        }
                      } else {
                        if (objdata.shipments.shipment_type == "Ocean") {
                          var data = {
                            ShippingID: objdata.shipments.ShippingID,
                            Mode: "U",
                            shipStatus: objdata.shipments.ShipmentStatus,
                            pickupDate:
                              CommonConfig.isEmpty(this.state.PickupDate) !=
                              true
                                ? moment(this.state.PickupDate)
                                    .format("YYYY-MM-DD")
                                    .toString()
                                : null,
                          };

                          api
                            .post("scheduleshipment/autoOceanTracking", data)
                            .then((res) => {});
                        }
                      }

                      if (redirect) {
                        this.setState({ redirect: true });
                        if (this.state.MailDelivered == false) {
                          if (this.state.isLock === false) {
                            console.log("1.......");
                            this.releaseLock();
                          }
                          this.props.history.push({
                            pathname: "/admin/ShipmentList",
                            state: {
                              filterlist:
                                this.props.history.location.state &&
                                this.props.history.location.state.filterlist !==
                                  undefined
                                  ? this.props.history.location.state.filterlist
                                  : null,
                              shipmentstatusList:
                                this.props.history.location.state &&
                                this.props.history.location.state
                                  .shipmentstatusList !== undefined
                                  ? this.props.history.location.state
                                      .shipmentstatusList
                                  : [],
                              sortlist:
                                this.props.history.location.state &&
                                this.props.history.location.state.sortlist !==
                                  undefined
                                  ? this.props.history.location.state.sortlist
                                  : null,
                              type:
                                this.props.history.location.state &&
                                this.props.history.location.state.type !==
                                  undefined
                                  ? this.props.history.location.state.type
                                  : "Shipment",
                            },
                          });
                        }
                      } else {
                        this.setState(
                          {
                            Attachments: this.state.Attachments.filter(
                              (x) => x.TrackingNumber
                            ),
                            AttachmentList: [],
                          },
                          function() {
                            this.reCallApi();
                          }
                        );
                      }
                    } else {
                      const options = {
                        hideAfter: 5,
                      };

                      this.setState({
                        isLock: true,
                        lockMsg: res.data.message,
                      });

                      if (
                        res.data.message === "sequence number already in use"
                      ) {
                        cogoToast.error("Sequence number is already assigned");
                        this.setState({
                          isLock: false,
                          lockMsg: res.data.message,
                        });
                        //this.reCallApi();
                      } else {
                        cogoToast.error(res.data.message, options);
                      }
                    }
                  } else {
                    console.log("Schedule Shipment is Not Created in else");

                    cogoToast.error(res.data.message);
                  }
                })
                .catch((err) => {
                  console.log("error...", err);
                });
            } catch (err) {
              console.log("error..", err);
            }
          } else {
            this.setState({ redirect: false });
            cogoToast.error(`Please enter valid details`);
            cogoToast.error("Please correct error and resubmit the form.");
          }
        } else {
          let saveClicked = this.state.saveClicked;
          saveClicked.saveClick = true;
          //  saveClicked.redirect = redirect;
          this.setState({ IsAESOpen: true, saveClicked: saveClicked });
        }
      } else {
        this.setState({ redirect: false });
        cogoToast.error(`Please enter valid details`);
      }
    }
    // }
  };

  async releaseLock() {
    let data = {
      ShippingID:
        this.props.location.state && this.props.location.state.ShipppingID
          ? this.props.location.state.ShipppingID
          : null,
      UserID: CommonConfig.loggedInUserData().PersonID,
      ReleaseAll: 0,
    };
    await api
      .post("scheduleshipment/releaseShipmentLockByID", data)
      .then((res) => {
        if (res.success) {
        } else {
        }
      })
      .catch((err) => {
        console.log("setLock err", err);
      });
  }

  handlePackageNoChange = (event) => {
    this.setState({ TotalPackages: event.target.value.replace(/\D/g, "") });
  };

  additionalDateChange = (date, type) => {
    console.log(
      "pick...",
      moment(date).format(CommonConfig.dateFormat.dateOnly)
    );
    console.log(
      "pick...",
      momentTimezone(date)
        .tz(CommonConfig.UStimezone)
        .format(CommonConfig.dateFormat.dateOnly)
    );

    if (type === "PickupDate") {
      this.setState({
        PickupDate: date
          ? moment(date).format(CommonConfig.dateFormat.dateOnly)
          : date,
        // PickupDate: date,
        IsPickup: !CommonConfig.isEmpty(date) ? true : false,
      });
    }
    if (type == "CustomClearanceDate") {
      this.setState({
        CustomClearanceDate: date,
      });
    }
  };

  typeChange = (event, type) => {
    if (type === "LocationType") {
      this.setState({ LocationType: event.target.value });
    } else if (type === "DutiesPaidBy") {
      this.setState({ DutiesPaidBy: event.target.value });
    } else if (type === "ShipmentStatus") {
      if (event.target.value === "Delivered") {
        this.setState({ MailDelivered: true });
      } else {
        this.setState({ MailDelivered: false });
      }
      this.setState({ ShipmentStatus: event.target.value });
    }
  };

  handlePackageNoBlur = (event) => {
    let packageLength = this.state.PackageList.filter(
      (x) => x.Status === "Active"
    ).length;
    let CILength = this.state.commercialList.filter(
      (x) => x.Status === "Active"
    ).length;
    let packageList = this.state.PackageList.filter(
      (x) => x.Status === "Active"
    );
    let CIList = this.state.commercialList.filter((x) => x.Status === "Active");

    let val = Number(this.state.TotalPackages);

    if (val !== packageLength && val > packageLength) {
      let finalLength = val - packageLength;
      for (var i = 0; i < finalLength; i++) {
        this.addPackageRow();
      }
    } else if (val !== packageLength && val < packageLength) {
      let length = packageLength - val;
      let index = packageLength - 1;
      for (var k = 0; k < length; k++, index--) {
        if (
          packageList[index]["EstimetedWeight"] !== "" &&
          packageList[index]["EstimetedWeight"] !== 0
        ) {
          cogoToast.error(
            `Data found at row ${index}.Please remove row from Action`
          );
        } else {
          this.removePackageRow(packageList[index]["Index"]);
          if (CILength >= index) {
            this.removeCommercialInvoice(CIList[index]["Index"]);
          }
        }
      }
    }
  };

  checkTransaction = () => {
    this.showLoader();
    try {
      var data = {
        Personid: CommonConfig.loggedInUserData().PersonID,
      };
      api
        .post("authorizeNet/checkTransaction", data)
        .then((result) => {
          if (result.success) {
            if (result.data.length === 0) {
              this.setState({
                IsCardTransactionZero: true,
              });
            } else {
              if (result.data[0].value === 0) {
                this.setState({
                  IsCardTransactionZero: true,
                });
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };

  validateTransactionLimit = () => {
    this.showLoader();
    try {
      var data = {
        Personid: CommonConfig.loggedInUserData().PersonID,
        amount: this.state.PaymentShowData.InvoiceAmount,
      };
      api
        .post("authorizeNet/validateTransactionLimit", data)
        .then((result) => {
          if (result.success) {
            if (result.data[0].Value === 1) {
              this.setState({
                IsTransactionValid: false,
                TransactionMessage: result.data[0].Message,
              });
            } else {
              this.setState({
                IsTransactionValid: true,
                TransactionMessage: "",
              });
            }
          }
          this.paymentPayAPI();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };

  paymentPayAPI = () => {
    this.showLoader();
    this.setState({ openpayment: false });
    var from_address = {
      contact_name: this.state.FromContactName,
      zip_code: this.state.FromZipCode,
    };

    var to_address = {
      contact_name: this.state.ToContactName,
      zip_code: this.state.ToZipCode,
    };
    this.state.PaymentShowData.from_address = from_address;
    this.state.PaymentShowData.to_address = to_address;
    this.state.PaymentShowData.UserID = CommonConfig.loggedInUserData().PersonID;
    this.state.PaymentShowData.ShippingID =
      this.props.location.state && this.props.location.state.ShipppingID
        ? this.props.location.state.ShipppingID
        : null;
    this.state.PaymentShowData.ContactName = this.state.FromContactName;
    try {
      if (this.state.IsTransactionValid) {
        api
          .post("authorizeNet/authorizeCreditCard", this.state.PaymentShowData)
          .then((result) => {
            if (result.success) {
              this.hideLoader();
              cogoToast.success("Payment Done");
              // this.handleSave(false);
              this.getAccountDetail();
            } else {
              this.hideLoader();
              cogoToast.error(
                result.transactionResponse.errors.error[0].errorText
              );
              this.getAccountDetail();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.hideLoader();
        cogoToast.error(this.state.TransactionMessage);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  changeFrommail = (event, type) => {
    var data = this.state.sendMailInfo;
    data.Frommail = event.target.value;
    this.setState({ sendMailInfo: data });
  };

  changetomail = (event, type) => {
    var data = this.state.sendMailInfo;
    data.TOmail = event.target.value;
    this.setState({ sendMailInfo: data });
  };

  ChangeCCmail = (event, type) => {
    var data = this.state.sendMailInfo;
    data.CCmail = event.target.value;
    this.setState({ sendMailInfo: data });
  };

  ChangeBCCmail = (event, type) => {
    var data = this.state.sendMailInfo;
    data.BCCmail = event.target.value;
    this.setState({ sendMailInfo: data });
  };

  ChangeSubjectmail = (event, type) => {
    var data = this.state.sendMailInfo;
    data.Subjectmail = event.target.value;
    this.setState({ sendMailInfo: data });
  };

  ChangeMailBody = (event, type) => {
    var data = this.state.sendMailInfo;
    data.Bodymail = event.target.value;
    this.setState({ sendMailInfo: data });
  };

  PaymentPayChange = (event, type) => {
    if (type == "Amount") {
      var setdata = this.state.PaymentShowData;
      setdata.InvoiceAmount = event.target.value;
      this.setState({ PaymentShowData: setdata });
    }
    if (type == "CardZipCode") {
      this.state.PaymentShowData.CardZipCode = event.target.value;
    }
    if (type == "CardType") {
      this.state.PaymentShowData.CardType = event.target.value;
    }
    if (type == "CardCVV") {
      if (Number(this.state.PaymentShowData.CardCVV) == 0) {
        this.state.PaymentShowData.CVV = event.target.value;
      }
    }
    if (type == "CardNumber") {
      this.state.PaymentShowData.CardNumber = event.target.value;
    }
    if (type == "CardName") {
      this.state.PaymentShowData.CardName = event.target.value;
    }
    if (type == "TrackingNumber") {
      this.state.PaymentShowData.TrackingNumber = event.target.value;
    }
  };

  handleCancel = () => {
    if (this.state.isLock === false) {
      console.log("2.......");
      this.releaseLock();
    }

    // console.log("Welcome = ", this.props.history.location.state.createDup);

    // if (this.props.history.location.state.createDup == "1") {
    //   cogoToast.error(
    //     "Please re-open the shipment to cancel. It was duplicated created"
    //   );
    // } else {
    // this.setState({ deleteopen: true });
    this.props.history.push({
      pathname: "/admin/ShipmentList",
      state: {
        filterlist:
          this.props.history.location.state &&
          this.props.history.location.state.filterlist !== undefined
            ? this.props.history.location.state.filterlist
            : null,
        shipmentstatusList:
          this.props.history.location.state &&
          this.props.history.location.state.shipmentstatusList !== undefined
            ? this.props.history.location.state.shipmentstatusList
            : [],
        sortlist:
          this.props.history.location.state &&
          this.props.history.location.state.sortlist !== undefined
            ? this.props.history.location.state.sortlist
            : null,
        type:
          this.props.history.location.state &&
          this.props.history.location.state.type !== undefined
            ? this.props.history.location.state.type
            : "Shipment",
      },
    });
    // }
  };

  viewShipmentCommercial = (type) => {
    if (type === "Commercial Invoice") {
      let printCommercialData = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
        FromAddress: this.state.FromAddressObj,
        TrackingNumber: this.state.TrackingNumber,
        DocumentTrackingList: this.state.DocumentTrackingList,
        ToAddress: this.state.ToAddressObj,
        CommercialList: this.state.CommercialInvoiceList,
      };
      localStorage.setItem(
        "printCommercial",
        JSON.stringify(printCommercialData)
      );
      window.open(
        window.location.origin + "/auth/PrintCommercialInvoice",
        "_blank"
      );
    } else {
      let printInvoiceData = {
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
        InvoiceData: this.state.DocumentInvoiceData,
        TotalReceivedCost: this.state.TotalReceivedCost,
        DatePaidOn: this.state.DatePaidOn,
        FromAddress: this.state.FromAddressObj,
        DocumentManagedBy: this.state.DocumentManagedBy,
        TrackingNumber: this.state.TrackingNumber,
        ToAddress: this.state.ToAddressObj,
        DocumentInvoiceDueDate: this.state.DocumentInvoiceDueDate,
      };
      localStorage.setItem("printInvoice", JSON.stringify(printInvoiceData));
      window.open(window.location.origin + "/auth/PrintInvoice", "_blank");
    }
  };
  isGeneratedPriperdlableBox = async (type) => {
    if (type === "Prepaid Labels") {
      if (this.state.TotalPackages == 0) {
        cogoToast.error("Please enter the No. of packages");
        this.hideLoader();
      } else if (this.state.PackageList.length == 0) {
        cogoToast.error("Please enter packages details");
        this.hideLoader();
      } else if (
        this.state.PackageList[0].Length == 0 ||
        this.state.PackageList[0].Height == 0 ||
        this.state.PackageList[0].Width == 0 ||
        this.state.PackageList[0].EstimetedWeight == 0
      ) {
        cogoToast.error("Please enter packages details");
        this.hideLoader();
      } else {
        if (
          (this.state.ServiceName.value === "SFL" &&
            this.state.ShipmentType.value === "Air" &&
            this.state.SubServiceName.value === "SFL Saver") ||
          (this.state.ServiceName.value === "SFL Worldwide" &&
            this.state.ShipmentType.value === "Ocean" &&
            (this.state.SubServiceName.value === "Texas Console" ||
              this.state.SubServiceName.value === "New Jersey Console" ||
              this.state.SubServiceName.value === "California Console"))
        ) {
          this.setState({
            ShowGeneratedPriperdlable: !this.state.ShowGeneratedPriperdlable,
          });
        } else {
          if (
            this.state.PickupVendorName.label == null ||
            this.state.PickupVendorName.label == ""
          ) {
            console.log("IN IF");
            if (
              this.state.selectedFromCountry.value !=
              this.state.selectedToCountry.value
            ) {
              await this.uploadETD();
              var etdGetData = {
                trackingNumber: this.state.TrackingNumber,
              };
              this.showLoader();
              api.post("fedexETDApi/getEtdDetails", etdGetData).then((res) => {
                this.hideLoader();
                this.setState({ EtdDocumentId: res.data[0].DocumentId });
              });
            }

            var checkData = 0;
            if (
              this.state.ShipmentType.value != "Ground" &&
              this.state.ShipmentType.value != "Ocean"
            ) {
              if (
                this.state.selectedFromCountry.value !=
                this.state.selectedToCountry.value
              ) {
                if (
                  this.state.totalInsuredValue <= this.state.TotalCostCommercial
                ) {
                  checkData = 0;
                } else {
                  checkData = 1;
                }
              }
            }

            if (checkData == 0) {
              this.setState({
                ShowGeneratedPriperdlable: !this.state
                  .ShowGeneratedPriperdlable,
              });
            } else {
              cogoToast.error(
                "Total Insured value should be less than total commercial value"
              );
            }
          } else {
            console.log("In Else");

            if (this.state.PickupDate != null) {
              var PickupDate = new Date(this.state.PickupDate);
              PickupDate.setHours(0, 0, 0, 0);

              var CurrDate = new Date();
              var addDay = 0;
              var newDate = "";

              if (
                this.state.ShipmentType.value != "Ground" &&
                this.state.ShipmentType.value != "Ocean"
              ) {
                if (CurrDate.getDay() == 0) {
                  addDay = 2;
                } else if (CurrDate.getDay() == 6) {
                  addDay = 3;
                } else if (CurrDate.getDay() == 5) {
                  addDay = 3;
                } else {
                  addDay = 1;
                }
              } else {
                if (CurrDate.getDay() == 0) {
                  addDay = 13;
                } else if (CurrDate.getDay() == 6) {
                  addDay = 14;
                } else {
                  addDay = 15;
                }
              }

              if (addDay != 0) {
                CurrDate = CurrDate.setDate(CurrDate.getDate() + addDay);

                newDate = new Date(CurrDate);
                newDate.setHours(0, 0, 0, 0);

                newDate = moment(newDate);
                PickupDate = moment(PickupDate);
              }

              // var pickupNewDateCurr = new Date();
              var checkData = 0;
              if (
                this.state.ShipmentType.value != "Ground" &&
                this.state.ShipmentType.value != "Ocean"
              ) {
                if (
                  this.state.selectedFromCountry.value !=
                  this.state.selectedToCountry.value
                ) {
                  if (
                    this.state.totalInsuredValue <=
                    this.state.TotalCostCommercial
                  ) {
                    checkData = 0;
                  } else {
                    checkData = 1;
                  }
                }
              }
              if (PickupDate <= newDate) {
                if (
                  this.state.selectedFromCountry.value !=
                  this.state.selectedToCountry.value
                ) {
                  console.log("Get Gata = Hello22");
                  console.log("TOTAL COM = ", this.state.TotalCostCommercial);
                  console.log("TOTAL COM = ", this.state.totalInsuredValue);

                  await this.uploadETD();
                  var etdGetData = {
                    trackingNumber: this.state.TrackingNumber,
                  };
                  this.showLoader();
                  api
                    .post("fedexETDApi/getEtdDetails", etdGetData)
                    .then((res) => {
                      this.hideLoader();
                      this.setState({ EtdDocumentId: res.data[0].DocumentId });
                    });
                }
                console.log("checkData = ", checkData);
                if (checkData == 0) {
                  this.setState({
                    ShowGeneratedPriperdlable: !this.state
                      .ShowGeneratedPriperdlable,
                  });
                } else {
                  cogoToast.error(
                    "Total Insured value should be less than total commercial value"
                  );
                }
              } else {
                if (
                  this.state.ShipmentType.value != "Ground" &&
                  this.state.ShipmentType.value != "Ocean"
                ) {
                  cogoToast.error(
                    "Pickup Date is too far for Pickup Schedule Please select next working day."
                  );
                } else {
                  cogoToast.error(
                    "Pickup Date is too far for Pickup Schedule Please select Within 10 days."
                  );
                }
              }
            } else {
              cogoToast.error("Please select Pickup date");
            }
          }
        }
      }
    }
  };

  isGeneratedPriperdlable = () => {
    this.setState({ ShowGeneratedPriperdlable: false });
    this.showLoader();
    try {
      var labelSize = localStorage.getItem("selectedPaperSize");
      var data = {
        TrackingNumber: this.state.TrackingNumber,
        isSendEmail: false,
        UserID: CommonConfig.loggedInUserData().PersonID,
        LabelSpecification: labelSize,
        EtdDocumentId: this.state.EtdDocumentId,
      };
      console.log(";;;;;;;;;", this.state.PackageList);

      if (
        (this.state.ServiceName.value === "SFL" &&
          this.state.ShipmentType.value === "Air" &&
          this.state.SubServiceName.value === "SFL Saver") ||
        (this.state.ServiceName.value === "SFL Worldwide" &&
          this.state.ShipmentType.value === "Ocean" &&
          (this.state.SubServiceName.value === "Texas Console" ||
            this.state.SubServiceName.value === "New Jersey Console" ||
            this.state.SubServiceName.value === "California Console"))
      ) {
        if (this.state.TotalPackages == 0) {
          cogoToast.error("Please enter the No. of packages");
          this.hideLoader();
        } else if (this.state.PackageList.length == 0) {
          cogoToast.error("Please enter packages details");
          this.hideLoader();
        } else if (
          (this.state.ServiceName.value !== "SFL" &&
            this.state.ShipmentType.value !== "Air" &&
            this.state.SubServiceName.value !== "SFL Saver" &&
            this.state.PackageList[0].PackageContent == "") ||
          this.state.PackageList[0].Length == 0 ||
          this.state.PackageList[0].Height == 0 ||
          this.state.PackageList[0].Width == 0 ||
          this.state.PackageList[0].EstimetedWeight == 0
        ) {
          cogoToast.error("Please enter packages details");
          this.hideLoader();
        } else if (
          this.state.PackageList[0].Length == 0 ||
          this.state.PackageList[0].Height == 0 ||
          this.state.PackageList[0].Width == 0 ||
          (this.state.PackageList[0].EstimetedWeight == 0 &&
            this.state.ServiceName.value === "SFL" &&
            this.state.ShipmentType.value === "Air" &&
            this.state.SubServiceName.value === "SFL Saver")
        ) {
          cogoToast.error("Please enter packages details");
          this.hideLoader();
        } else {
          api
            .post("scheduleshipment/SFLship", data)
            .then((result) => {
              //console.log("fedex ship", data);

              if (result.data.success) {
                this.hideLoader();
                cogoToast.success(result.data.data);
                if (result.data.data != "Comming Soon") {
                  this.getDocumentation();
                  this.getCommunicationList();
                  this.getTrackingDetail();
                  this.getPickupConfDetail();
                  this.getShipmentManualTracking();
                }
              } else {
                this.hideLoader();
                confirmAlert({
                  title: "Prepaid Labels",
                  message: result.data.data,
                  buttons: [
                    {
                      label: "Ok",
                    },
                    {
                      label: "cancel",
                    },
                  ],
                });
              }
            })
            .catch((err) => {
              this.hideLoader();
              console.log(err);
            });
        }
        // PackageList
      } else {
        api
          .post("scheduleshipment/Fedexship", data)
          .then((result) => {
            debugger;
            console.log("result.data.data", result);
            if (result.data.success) {
              this.hideLoader();
              cogoToast.success(result.data.data);
              if (result.data.data != "Comming Soon") {
                this.getDocumentation();
                this.getTrackingDetail();
                this.getPickupConfDetail();
                this.getShipmentManualTracking();
                this.getCommunicationList();
              }
            } else {
              if (result.data.attch) {
                var Attachments = {
                  AttachmentPath:
                    "ShipmentAttachment/label-" + result.data.attch + "-1.pdf",
                };
                var data = { Attachments: Attachments };
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
              }
              this.hideLoader();
              confirmAlert({
                title: "Prepaid Labels",
                message: result.data.data,
                buttons: [
                  {
                    label: "Ok",
                  },
                  {
                    label: "cancel",
                  },
                ],
              });
            }
          })
          .catch((err) => {
            this.hideLoader();
            console.log(err);
          });
      }
    } catch (err) {
      this.hideLoader();
    }
  };

  activeInactiveUser = (record) => {
    var data = this.state.Attachments;
    for (let index = 0; index < data.length; index++) {
      if (data[index].Index == record.original.Index) {
        data[index].Status =
          record.original.Status === "Active" ? "Inactive" : "Active";
      }
    }
    this.setState({ Attachments: data });
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

  EsignOpen = () => {
    this.props.history.push({
      pathname: "/admin/esign_employee",
      // pathname: '/auth/esign_client/'+this.props.location.state && this.props.location.state.ShipppingID ? this.props.location.state.ShipppingID : null,
      state: {
        filterlist:
          this.props.history.location.state &&
          this.props.history.location.state.filterlist !== undefined
            ? this.props.history.location.state.filterlist
            : null,
        shipmentstatusList: this.state,
        ShippingID:
          this.props.location.state && this.props.location.state.ShipppingID
            ? this.props.location.state.ShipppingID
            : null,
        InvoiceData: this.state.DocumentInvoiceData,
        TotalReceivedCost: this.state.TotalReceivedCost,
        DatePaidOn: this.state.DatePaidOn,
        FromAddress: this.state.FromAddressObj,
        DocumentManagedBy: this.state.DocumentManagedBy,
        TrackingNumber: this.state.TrackingNumber,
        ToAddress: this.state.ToAddressObj,
        Invoicedata: this.state.paymentList,
        sortlist:
          this.props.history.location.state &&
          this.props.history.location.state.sortlist !== undefined
            ? this.props.history.location.state.sortlist
            : null,
      },
    });
  };

  htmlDecode(input) {
    var e = document.createElement("div");
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  generateEsign = (type) => {
    debugger;
    let errorMessage1 = "";
    let errorMessage2 = "";
    let errorMessage3 = "";
    let errorMessage4 = "";
    let isValid = true;
    if (this.state.DocumentTotalInvoiceAmount <= 0) {
      errorMessage1 += ` Invoice Amount should be not be 0.00.`;
      isValid = false;
    }
    if (CommonConfig.isEmpty(this.state.DocumentServiceType)) {
      errorMessage2 += ` Service Type should not be blank.`;
      isValid = false;
    }
    if (CommonConfig.isEmpty(this.state.ContainerType)) {
      errorMessage3 += ` Sub Service Type should not be blank.`;
      isValid = false;
    }
    if (this.state.DocumentTotalCFT <= 0) {
      errorMessage4 += ` Estimated CFT should not be 0.00.`;
      isValid = false;
    }
    const options = {
      hideAfter: 5,
      heading: "Invalid Data",
    };
    if (isValid) {
      this.setState({ generateEsign: true });
    } else {
      cogoToast.error(
        <div>
          {errorMessage1 ? (
            <>
              <span>{errorMessage1}</span>
              <br />
            </>
          ) : null}
          {errorMessage2 ? (
            <>
              <span>{errorMessage2}</span>
              <br />
            </>
          ) : null}
          {errorMessage3 ? (
            <>
              <span>{errorMessage3}</span>
              <br />
            </>
          ) : null}
          {errorMessage4 ? (
            <>
              <span>{errorMessage4}</span>
              <br />
            </>
          ) : null}
        </div>,
        options
      );
    }
  };

  submitEsign = () => {
    this.setState({ submitEsign: true });
  };

  generatePath = (path) => {
    if (!CommonConfig.isEmpty(path)) {
      let attachmentList = this.state.Attachments;
      let index = attachmentList.findIndex((x) => x.Index === 3);
      attachmentList[index]["AttachmentPath"] = path;
      this.setState({
        Attachments: attachmentList,
        generateEsign: false,
        submitEsign: false,
        EsignPath: path,
      });
      // window.location.reload();
      this.getDocumentation();
      this.getCommunicationList();
    }
  };

  changePackageVisible = (e) => {
    this.setState({
      IsPackageAccess: e.target.checked,
    });
  };

  sendState() {
    return this.state;
  }

  handleAdditionalDateChange = (date, type) => {
    if (type === "ArrivalDate") {
      this.setState({
        LatestArrivalDate: date,
        arrivalDateErr: false,
        arrivalDateHelperText: "",
      });
    } else if (type === "VisaValidDate") {
      this.setState({
        VisaValidDate: date,
        visaDateErr: false,
        visaDateHelperText: "",
      });
    }
  };

  GenrateHBL = () => {
    // window.open(
    //   "https://hub.sflworldwide.com/auth/HBL/" + this.state.TrackingNumber,
    //   "_blank"
    // );
    debugger;
    this.setState({ HBLdocOpen: true });
    this.showLoader();
    this.GetHBLdetails(this.state.TrackingNumber);
    this.setState({
      ConsigneeDetails:
        this.state.company +
        "\n" +
        this.state.Addressline1 +
        "\n" +
        this.state.Addressline2 +
        "\n" +
        this.state.STREET +
        "," +
        this.state.CITY +
        "," +
        this.state.COUNTRY +
        "\n" +
        this.state.PHONE +
        "-" +
        this.state.EMAIL +
        " GST:" +
        this.state.GST,
    });
  };
  HselectChange = (event, value) => {
    if (value === "BookingNumber") {
      this.setState({ BookingNumber: event.target.value });
    } else if (value === "ConsigneeDetails") {
      // const updatedText = event.target.value.replace(/\n/g, "<br>");
      this.setState({ ConsigneeDetails: event.target.value });
    } else if (value === "ShipperExportor") {
      this.setState({ ShipperExportor: event.target.value });
    } else if (value === "APPLYTO") {
      this.setState({ APPLYTO: event.target.value });
    } else if (value === "ConsignedTo") {
      this.setState({ ConsignedTo: event.target.value });
    } else if (value === "HContainerNumber") {
      this.setState({ HContainerNumber: event.target.value });
    } else if (value === "TrackingNumber") {
      this.setState({ TrackingNumber: event.target.value });
    } else if (value === "fromCustomerName") {
      this.setState({ fromCustomerName: event.target.value });
    } else if (value === "BLNumber") {
      this.setState({ BLNumber: event.target.value });
    } else if (value === "fromCity") {
      this.setState({ fromCity: event.target.value });
    } else if (value === "fromState") {
      this.setState({ fromState: event.target.value });
    } else if (value === "fromZipCode") {
      this.setState({ fromZipCode: event.target.value });
    } else if (value === "fromCountry") {
      this.setState({ fromCountry: event.target.value });
    } else if (value === "toCountry") {
      this.setState({ toCountry: event.target.value });
    } else if (value === "toCustomerName") {
      this.setState({ toCustomerName: event.target.value });
    } else if (value === "toCity") {
      this.setState({ toCity: event.target.value });
    } else if (value === "toState") {
      this.setState({ toState: event.target.value });
    } else if (value === "toZipCode") {
      this.setState({ toZipCode: event.target.value });
    } else if (value === "toAddress") {
      this.setState({ toAddress: event.target.value });
    } else if (value === "fromAddress") {
      this.setState({ fromAddress: event.target.value });
    } else if (value === "Vessel") {
      this.setState({ Vessel: event.target.value });
    } else if (value === "Export") {
      this.setState({ Export: event.target.value });
    } else if (value === "Unloading") {
      this.setState({ Unloading: event.target.value });
    } else if (value === "develiverd") {
      this.setState({ develiverd: event.target.value });
    } else if (value === "TypeOfMove") {
      this.setState({ TypeOfMove: event.target.value });
    } else if (value === "FMCnumber") {
      this.setState({ FMCnumber: event.target.value });
    } else if (value === "pointState") {
      this.setState({ pointState: event.target.value });
    } else if (value === "deliveryApply") {
      this.setState({ deliveryApply: event.target.value });
    } else if (value === "GST") {
      this.setState({ GST: event.target.value });
    } else if (value === "EMAIL") {
      this.setState({ EMAIL: event.target.value });
    } else if (value === "PHONE") {
      this.setState({ PHONE: event.target.value });
    } else if (value === "COUNTRY") {
      this.setState({ COUNTRY: event.target.value });
    } else if (value === "CITY") {
      this.setState({ CITY: event.target.value });
    } else if (value === "STREET") {
      this.setState({ STREET: event.target.value });
    } else if (value === "Addressline1") {
      this.setState({ Addressline1: event.target.value });
    } else if (value === "Addressline2") {
      this.setState({ Addressline2: event.target.value });
    } else if (value === "company") {
      this.setState({ company: event.target.value });
    } else if (value === "description") {
      this.setState({ description: event.target.value });
    } else if (value === "PackageNumber") {
      this.setState({ PackageNumber: event.target.value });
    } else if (value === "WEIGHT") {
      this.setState({ WEIGHT: event.target.value });
    } else if (value === "MEASUREMENT") {
      this.setState({ MEASUREMENT: event.target.value });
    } else if (value === "Sequencelist") {
      this.setState({ Sequencelist: event.target.value });
    }
  };
  rendertable = () => {
    return this.state.SequenceData.map((service, idx) => {
      const { Range_Data } = service;
      return Range_Data;
    });
  };
  GetHBLdetails = (input) => {
    try {
      var data = {
        TrackingNumber: input,
      };
      debugger;
      api
        .post("scheduleshipment/GetHBLdetails", data)
        .then(async (res) => {
          if (res.success) {
            if (res.data) {
              this.setState({
                DocumentData: res.data[0],
                PackageData: res.data[1],
                SequenceData: res.data[2],
              });
              this.setState({
                PackageNumber: this.state.PackageData[0].totalPackage,
                WEIGHT: this.state.PackageData[0].totalWeight + " Kgs",
                MEASUREMENT: this.state.PackageData[0].totalCFT + " CBM",
              });
            }
            var toAddress = "";
            toAddress = this.state.DocumentData[0].toAddress1;
            toAddress +=
              this.state.DocumentData[0].toAddress2 != ""
                ? this.state.DocumentData[0].toAddress2 + ","
                : null;
            toAddress +=
              this.state.DocumentData[0].toAddress3 != ""
                ? this.state.DocumentData[0].toAddress3 + ","
                : null;
            var fromAddress = "";
            fromAddress = this.state.DocumentData[0].fromAddress1;
            fromAddress +=
              this.state.DocumentData[0].fromAddress2 != ""
                ? this.state.DocumentData[0].fromAddress2 + ","
                : "";
            fromAddress +=
              this.state.DocumentData[0].fromAddress3 != ""
                ? this.state.DocumentData[0].fromAddress3 + ","
                : "";

            this.setState({
              BookingNumber: this.state.DocumentData[0].BookingNumber,
              fromCustomerName: this.state.DocumentData[0].fromCustomerName,
              BLNumber:
                this.state.DocumentData[0].TrackingNumber + 50000000 + "DC104",
              HTrackingNumber: this.state.DocumentData[0].TrackingNumber,
              ShippingID: this.state.DocumentData[0].ShippingID,
              HContainerNumber: this.state.DocumentData[0].ContainerNumber,
              fromCity: this.state.DocumentData[0].fromCity,
              fromState: this.state.DocumentData[0].fromState,
              fromZipCode: this.state.DocumentData[0].fromZipCode,
              fromCountry: this.state.DocumentData[0].fromCountry,
              toCountry: this.state.DocumentData[0].toCountry,
              toCustomerName: this.state.DocumentData[0].toCustomerName,
              toCity: this.state.DocumentData[0].toCity,
              toState: this.state.DocumentData[0].toState,
              toZipCode: this.state.DocumentData[0].toZipCode,
              toAddress: toAddress,
              fromAddress: fromAddress,
            });
            this.setState({
              ConsignedTo:
                this.state.toCustomerName +
                "\n" +
                this.state.toAddress +
                "\n" +
                this.state.toCity +
                "\n" +
                this.state.toState +
                " " +
                this.state.toZipCode +
                "\n" +
                this.state.toCountry,
              ShipperExportor:
                this.state.fromCustomerName +
                "\n" +
                this.state.fromAddress +
                "\n" +
                this.state.fromCity +
                "\n" +
                this.state.fromState +
                "\n" +
                " " +
                this.state.fromZipCode +
                "\n" +
                this.state.fromCountry,
            });
            var Sequencelist = this.rendertable();
            console.log("seqqqqq", Sequencelist);
            this.setState({ Sequencelist: Sequencelist });
            this.hideLoader();
          } else {
            this.hideLoader();
            cogoToast.error("Something went wrong");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  generatePDF = () => {
    debugger;
    this.showLoader();
    console.log("in pdf......");

    //var input = document.getElementById("HBL");
    document.getElementById("border-hide").style.display = "none";
    document.getElementById("border-hidediv").style.display = "block";

    document.getElementById("ShipperExportor").style.display = "none";
    document.getElementById("ShipperExportordiv").style.display = "block";

    document.getElementById("ConsignedTo").style.display = "none";
    document.getElementById("ConsignedTodiv").style.display = "block";

    document.getElementById("BookingNumber").style.display = "none";
    document.getElementById("BookingNumberdiv").style.display = "block";

    document.getElementById("pointState").style.display = "none";
    document.getElementById("pointStatediv").style.display = "block";

    document.getElementById("FMCnumber").style.display = "none";
    document.getElementById("FMCnumberdiv").style.display = "block";
    document.getElementById("APPLYTO").style.display = "none";
    document.getElementById("APPLYTOdiv").style.display = "block";
    document.getElementById("TypeOfMove").style.display = "none";
    document.getElementById("TypeOfMovediv").style.display = "block";
    document.getElementById("Vessel").style.display = "none";
    document.getElementById("Vesseldiv").style.display = "block";
    document.getElementById("develiverd").style.display = "none";
    document.getElementById("develiverddiv").style.display = "block";
    document.getElementById("Unloading").style.display = "none";
    document.getElementById("Unloadingdiv").style.display = "block";
    document.getElementById("Export").style.display = "none";
    document.getElementById("Exportdiv").style.display = "block";

    document.getElementById("TrackingNumber").style.display = "none";
    document.getElementById("TrackingNumberdiv").style.display = "block";
    document.getElementById("BLNumber").style.display = "none";
    document.getElementById("BLNumberdiv").style.display = "block";
    document.getElementById("HContainerNumber").style.display = "none";
    document.getElementById("HContainerNumberdiv").style.display = "block";

    document.getElementById("description").style.display = "none";
    document.getElementById("descriptiondiv").style.display = "block";
    document.getElementById("PackageNumber").style.display = "none";
    document.getElementById("PackageNumberdiv").style.display = "block";
    document.getElementById("WEIGHT").style.display = "none";
    document.getElementById("WEIGHTdiv").style.display = "block";
    document.getElementById("MEASUREMENT").style.display = "none";
    document.getElementById("MEASUREMENTdiv").style.display = "block";
    document.getElementById("Sequencelist").style.display = "none";
    document.getElementById("Sequencelistdiv").style.display = "block";

    const element = document.getElementById("HBL");
    const elementdata = document.getElementById("HBL").innerHTML;
    //   const htmlContent = element.innerHTML;
    console.log("in pdf......", elementdata);
    // Configuration for html2pdf
    const options = {
      margin: 10,
      filename: this.state.BLNumber + ".pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    debugger;
    html2pdf(element, options).then((pdf) => {
      // Trigger the download of the PDF
      pdf.save();
    });
    this.setState({ HBLdocOpen: false });
    // this.hideLoader();
    // cogoToast.success("HBL Download successfully");
    //  html2pdf(element, options).then((pdf) => {
    // Convert the PDF to a blob

    // var pdfFile = new File();
    // pdf.output("blob").then((blob) => {
    //   pdfFile = new File([blob], this.state.BLNumber + ".pdf", {
    //     type: "application/pdf",
    //   });
    // });
    var HtmlData = "<html>" + elementdata + "</html>";
    let data = {
      dateTime: new Date().getTime(),
      ShippingID: this.state.ShippingID,
      BLNumber: this.state.BLNumber,
      HtmlData: HtmlData,
    };

    api
      .post("scheduleshipment/downloadHBLpdf", data)
      .then((res) => {
        if (res.success) {
          this.hideLoader();
          cogoToast.success("HBL Generated");
          //window.close();
          this.setState({
            HBLdocOpen: false,
          });
          this.getDocumentation();
        } else {
          this.hideLoader();
          cogoToast.error("HBL Generation Error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // });
    // Use html2pdf to convert HTML to PDF
    // html2pdf(element, options).then((pdf) => {
    // pdf.save();
    // });
    //  this.hideLoader();

    // html2canvas(input).then((canvas) => {
    //   var options = {
    //     compressPdf: true,
    //   };
    //   var pdf = new jsPDF("a4");
    //   var imgData = canvas.toDataURL("image/jpeg", 1.0);
    //   pdf.addImage(imgData, "JPEG", 5, 5, 200, 150);
    //   var doc = btoa(pdf.output());

    //   const pdfFile = new File(
    //     [pdf.output("blob")],
    //     this.state.BLNumber + ".pdf",
    //     { type: "application/pdf" }
    //   );

    //   let data = {
    //     dateTime: new Date().getTime(),
    //     ShippingID: this.state.ShippingID,
    //     BLNumber: this.state.BLNumber,
    //   };
    //   var formData = new FormData();
    //   formData.append("data", JSON.stringify(data));
    //   formData.append("Attachments", pdfFile);

    //   api
    //     .post("scheduleshipment/downloadHBLpdf", formData)
    //     .then((res) => {
    //       if (res.success) {
    //         this.hideLoader();
    //         cogoToast.success("HBL Generated");
    //         window.close();
    //       } else {
    //         this.hideLoader();
    //         cogoToast.error("HBL Generation Error");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });

    //   //pdf.save(this.state.BLNumber + ".pdf");
    // });
  };
  render() {
    const {
      AllClear,
      TrackingNumber,
      ManagedBy,
      IsPickup,
      CreatedBy,
      CreatedByName,
      ipAddress,
      ipLocation,
      ServiceName,
      PackageType,
      TotalPackages,
      TotalCostInvoice,
      Access,
      ReadOnly,
      TotalCostReceived,
      TotalCostIssued,
      TotalCostCommercial,
      PickupDate,
      CustomClearanceDate,
      DutiesPaidBy,
      LocationType,
      SubServiceName,
      Subservicename,
      ShipmentDate,
      ShipmentType,
      Steps,
      selectedFromCountry,
      ShipmentStatus,
      selectedToCountry,
      totalCFT,
      totalChargableWeight,
      YesNo,
      fromState,
      fromCity,
      toCity,
      toState,
      ContainerName,
      PickupVendorName,
      FromMovingBack,
      FromEligibleForTR,
      FromOriginalPassortAvailable,
      totalInsuredValue,
      InvoiceDueDate,
      CommuncationList,
      isBackIndia,
      VisaCategory,
      viewAllClear,
      isInvoiceVisible,
      IsPackageAccess,
      isPaymentReceived,
      isPaymentIssued,
      isPaymentMethod,
      isPaymentMethodBank,
      isPackageDetailsVisible,
      isComInvoiceVisible,
      isTrackingManualVisible,
      isTrackingNumberVisible,
      isNotesVisible,
      ComPrepaidDocData,
      //HBL/////
      PackageNumber,
      description,
      WEIGHT,
      MEASUREMENT,
      BookingNumber,
      HTrackingNumber,
      HContainerNumber,
      BLNumber,
      Vessel,
      Export,
      Unloading,
      develiverd,
      TypeOfMove,
      pointState,
      FMCnumber,
    } = this.state;

    const shipmentType = this.state.shipmentTypeList.map((type) => {
      return { value: type.Description, label: type.Description };
    });
    const containerName = this.state.ContainerNameList.map((container) => {
      return { value: container.ContainerID, label: container.ContainerName };
    });
    const readytimelists = this.state.ReadyTimeList.map((container) => {
      return { value: container.label, label: container.view };
    });
    const avalibletimelists = this.state.AvailableTimeList.map((container) => {
      return { value: container.label, label: container.view };
    });

    const pickupVendorName = this.state.PickupVendorList.map((pickup) => {
      return { value: pickup.VendorId, label: pickup.Name };
    });
    const managedBy = this.state.managedByList.map((type) => {
      return { value: type.UserID, label: type.Name };
    });
    const allclearlist = this.state.AllClearStatusList.map((type) => {
      return { value: type.Description, label: type.Description };
    });
    // const allclearlist = this.state.AllClearStatusList.map((type) => {
    //   return {
    //     value:
    //       type.Description === "Yes"
    //         ? true
    //         : type.Description === "No"
    //         ? false
    //         : type.Description,
    //     label:
    //       type.Description === "Yes"
    //         ? true
    //         : type.Description === "No"
    //         ? false
    //         : type.Description,
    //   };
    // });
    //console.log("......", allclearlist);
    const serviceName = this.state.ServiceList.map((type) => {
      return { value: type.MainServiceName, label: type.MainServiceName };
    });
    const subServiceName = this.state.SubServiceList.map((type) => {
      return { value: type.ServiceName, label: type.ServiceName };
    });
    const CountryOption = this.state.CountryList.map((Country) => {
      return { value: Country.CountryID, label: Country.CountryName };
    });
    const fromCityOptions = this.state.fromGoogleAPICityList.map((city) => {
      return { value: city.City_code, label: city.Name };
    });
    const fromStateOptions = this.state.fromStateList.map((state) => {
      return { value: state.StateName, label: state.StateName };
    });
    const toCityOptions = this.state.toGoogleAPICityList.map((city) => {
      return { value: city.City_code, label: city.Name };
    });
    const toStateOptions = this.state.toStateList.map((state) => {
      return { value: state.StateName, label: state.StateName };
    });

    var FromFedExCityListDisplay = this.state.FromFedExCityList.map((city) => {
      return { value: city.CityCode, label: city.CityName };
    });

    var ToFedExCityListDisplay = this.state.ToFedExCityList.map((city) => {
      return { value: city.CityCode, label: city.CityName };
    });

    const columns = [
      {
        Header: "Document Type",
        width: 225,
        filterable: false,
        sortable: false,
        maxWidth: 225,
        Cell: this.renderDocumentType,
      },
      {
        Header: "Document Name",
        accessor: "Name",
        width: 225,
        filterable: false,
        sortable: false,
        maxWidth: 225,
        Cell: this.renderDocumentName,
      },
      {
        Header: "CreatedOn",
        id: "DocumentCreatedOn",
        accessor: (data) => {
          return moment(data.DocumentCreatedOn).format(
            CommonConfig.dateFormat.dateOnly
          );
        },
        width: 110,
        filterable: false,
        sortable: false,
        maxWidth: 110,
      },
      {
        Header: "Attachment",
        accessor: "actions",
        width: 80,
        filterable: false,
        sortable: false,
        Cell: (record) => {
          let isSystemGenerated = record.original.IsSystemGenerated
            ? record.original.IsSystemGenerated.data[0] === 0
              ? false
              : true
            : false;
          return (
            <div>
              {record.original.AttachmentPath ? (
                !record.original.AttachmentPath.includes(
                  "auth/esign_client"
                ) ? (
                  <div>
                    <a
                      href={fileBase + record.original.AttachmentPath}
                      className="normal-btn sm-orange"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {isSystemGenerated ? "VIEW PDF" : "VIEW FILE"}
                    </a>
                  </div>
                ) : (
                  <div>
                    <a
                      href={record.original.AttachmentPath + "/false"}
                      className="normal-btn sm-orange"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      VIEW FILE
                    </a>
                  </div>
                )
              ) : record.original.DocumentType === "HBL" &&
                // (CommonConfig.loggedInUserData().PersonID == 1 ||
                //   CommonConfig.loggedInUserData().PersonID == 18) &&
                (this.state.ContainerName.value !== "" ||
                  this.state.ContainerName.value !== null) ? (
                <Button
                  disabled={
                    record.original.DocumentType === "HBL" &&
                    this.state.ShipmentType.value === "Ocean"
                      ? false
                      : true
                  }
                  className="normal-btn sm-orange"
                  onClick={() => this.GenrateHBL()}
                >
                  Generate
                </Button>
              ) : record.original.TrackingNumber &&
                record.original.Index !== 3 ? (
                <Button
                  className="normal-btn sm-orange"
                  onClick={() =>
                    this.viewShipmentCommercial(record.original.DocumentType)
                  }
                >
                  View File
                </Button>
              ) : record.original.Index === 3 &&
                !record.original.isGenerated &&
                record.original.DocumentType === "Contract" ? (
                <Button
                  disabled={
                    record.original.DocumentType === "Contract" &&
                    this.state.ShipmentType.value === "Ocean"
                      ? false
                      : true
                  }
                  className="normal-btn sm-orange"
                  onClick={() =>
                    this.generateEsign(record.original.DocumentType)
                  }
                >
                  Generate
                </Button>
              ) : (record.original.hasOwnProperty("isGenerated") &&
                  (this.state.ServiceName.value === "FedEx" ||
                    ((this.state.ServiceName.value === "SFL Worldwide" &&
                      this.state.ShipmentType.value === "Ocean" &&
                      this.state.SubServiceName.value === "Texas Console") ||
                      this.state.SubServiceName.value ===
                        "New Jersey Console" ||
                      this.state.SubServiceName.value ===
                        "California Console"))) ||
                (this.state.ServiceName.value === "SFL" &&
                  this.state.ShipmentType.value === "Air" &&
                  this.state.SubServiceName.value === "SFL Saver" &&
                  record.original.DocumentType === "Prepaid Labels") ? (
                <Button
                  className="normal-btn sm-orange"
                  // disabled={this.state.isFromCountryCanada ? true : false}
                  onClick={() =>
                    this.isGeneratedPriperdlableBox(
                      record.original.DocumentType
                    )
                  }
                >
                  Generate
                </Button>
              ) : (
                <div>
                  <div className="custom-file-browse">
                    <span>Upload</span>
                    <input
                      type="file"
                      name="selectedfile"
                      id="file"
                      className="normal-btn sm-orange"
                      onChange={(event) => this.fileUpload(event, record)}
                    />
                  </div>
                  <p>{this.stringTruncate(record.original.AttachmentName)}</p>
                </div>
              )}
            </div>
          );
        },
      },
      {
        width: 100,
        filterable: false,
        sortable: false,
        Header: "Status",
        Cell: (record) => {
          if (record.original.Status === "Active") {
            return (
              <Button
                color="success"
                className="normal-btn sm-orange"
                onClick={() => this.activeInactiveUser(record)}
              >
                Active
              </Button>
            );
          } else {
            return (
              <Button
                color="danger"
                className="normal-btn sm-orange"
                onClick={() => this.activeInactiveUser(record)}
              >
                Inactive
              </Button>
            );
          }
        },
      },
      {
        width: 120,
        filterable: false,
        sortable: false,
        Header: "Actions",
        Cell: (record) => {
          return (
            <div className="align-right">
              {(record.original.DocumentType === "Prepaid Labels" &&
                (this.state.ServiceName.value === "SFL" &&
                  this.state.ShipmentType.value === "Air" &&
                  this.state.SubServiceName.value === "SFL Saver")) ||
              ((this.state.ServiceName.value === "FedEx" ||
                (this.state.ServiceName.value === "SFL Worldwide" &&
                  this.state.ShipmentType.value === "Ocean" &&
                  (this.state.SubServiceName.value === "Texas Console" ||
                    this.state.SubServiceName.value === "New Jersey Console" ||
                    this.state.SubServiceName.value ===
                      "California Console"))) &&
                record.original.Status === "Active" &&
                record.original.DocumentType === "Prepaid Labels") ? (
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn"
                  onClick={(e) =>
                    this.handleDocumentSendMail(
                      e,
                      record.original,
                      "PrepaidLables"
                    )
                  }
                >
                  <i className={"fas fa-envelope"} />
                </Button>
              ) : null}
              {record.original.DocumentType === "Invoice" ||
              (record.original.DocumentType === "Contract" &&
                record.original.TrackingNumber) ? (
                <>
                  <Button
                    justIcon
                    color="danger"
                    className="Plus-btn"
                    onClick={(e) =>
                      this.handleDocumentSendMail(
                        e,
                        record.original,
                        record.original.DocumentType
                      )
                    }
                  >
                    <i className={"fas fa-envelope"} />
                  </Button>
                  {/* {record.original.isGenerated === true ?
                    <Button
                      justIcon
                      color="rose"
                      className="Plus-btn"
                      onClick={() => this.printDocumentEsign(record.original,record.original.DocumentType)}
                    >
                      <i className={"fas fa-print"} />
                    </Button>
                    :
                    null
                  } */}
                </>
              ) : null}
              {(record.index !== 0 || record.original.AttachmentPath) &&
              (!record.original.TrackingNumber ||
                record.original.TrackingNumber === "3") ? (
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn"
                  onClick={(e) => this.handleDocumentDelete(e, record.original)}
                >
                  <i className={"fas fa-minus"} />
                </Button>
              ) : null}
              {this.state.Attachments.filter((x) => x.Status != "Delete")
                .length ===
              record.index + 1 ? (
                <div className="align-right">
                  <Button
                    justIcon
                    color="facebook"
                    onClick={() => this.AddNewRowData()}
                    className="Plus-btn "
                  >
                    <i className={"fas fa-plus"} />
                  </Button>
                </div>
              ) : null}
              <Tooltip title={record.original.DocumentCreatedBy} arrow>
                <Button className="Plus-btn info-icon" justIcon color="twitter">
                  <InfoIcon />
                </Button>
              </Tooltip>
            </div>
          );
        },
      },
    ];

    const correspondenceColumns = [
      {
        Header: "Email Date",
        width: 100,
        sortMethod: (a, b) => {
          return CommonConfig.dateSortMethod(a, b);
        },
        id: "EmailDate",
        accessor: (data) => {
          return momentTimezone(data.CreatedOn)
            .tz(CommonConfig.UStimezone)
            .format(CommonConfig.dateFormat.dateOnly);
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
        Header: "View File",
        accessor: (data) => {
          return data.DocumentType === "Prepaid Label,Commercial Invoice" ? (
            <>
              <Dialog
                open={this.state.IsDocDialogOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">View File</DialogTitle>
                <DialogContent>
                  <a
                    href={fileBase + data.AttachmentPath.split(",")[0]}
                    className="normal-btn sm-orange"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>
                      <b>Prepaid Label</b>
                    </span>
                  </a>
                  &nbsp; &nbsp; &nbsp;
                  <a
                    href={fileBase + data.AttachmentPath.split(",")[1]}
                    className="normal-btn sm-orange"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>
                      <b>Commercial Invoice</b>
                    </span>
                  </a>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => this.setState({ IsDocDialogOpen: false })}
                    color="secondary"
                    className="aesfilling-btn"
                  >
                    <span>Cancel</span>
                  </Button>
                </DialogActions>
              </Dialog>
              <Button
                className="normal-btn sm-orange"
                onClick={(e) => this.setState({ IsDocDialogOpen: true })}
              >
                View Files
              </Button>
            </>
          ) : data.AttachmentPath ? (
            <a
              href={fileBase + data.AttachmentPath}
              className="normal-btn sm-orange"
              rel="noopener noreferrer"
              target="_blank"
            >
              VIEW FILE
            </a>
          ) : null;
        },
        width: 80,
        id: "AttachmentPath",
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

    const correspondenceColumns1 = [
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
        Header: "View File",
        accessor: (data) => {
          return data.AttachmentPath ? (
            <a
              href={fileBase + data.AttachmentPath}
              className="normal-btn sm-orange"
              rel="noopener noreferrer"
              target="_blank"
            >
              VIEW FILE
            </a>
          ) : null;
        },
        width: 80,
        id: "AttachmentPath",
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
    return (
      <div>
        {/* <CurrentLocation
          onFetchAddress={(results) => {}}
          onError={(type, status) => {}}
        >
          {({ getCurrentLocation, loading }) => (
            <button onClick={getCurrentLocation}>Get Current Location</button>
          )}
        </CurrentLocation> */}
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
                  <FlightTakeoff />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">
                  Shipment Information : {TrackingNumber}
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={3}>
                    <div className="select-spl">
                      <FormControl fullWidth>
                        <InputLabel
                          htmlFor="packagetype"
                          className={classes.selectLabel}
                        >
                          Shipment Status
                        </InputLabel>
                        <Select
                          MenuProps={{
                            className: classes.selectMenu,
                          }}
                          classes={{
                            select: classes.select,
                          }}
                          id="package_number"
                          name="package_number"
                          value={ShipmentStatus}
                          onChange={(event) =>
                            this.typeChange(event, "ShipmentStatus")
                          }
                        >
                          {this.shipmentStatusList()}
                        </Select>
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={4} md={3}>
                    {/* // <GridItem xs={12} sm={3} md={3}> */}
                    {(this.state.AllClear.value === "Yes" ||
                      this.state.AllClear.value === "Collections") &&
                    (this.state.useraccess.userModuleAccess[15].ModuleID ===
                      18 &&
                      this.state.useraccess.userModuleAccess[15].WriteAccess ===
                        1 &&
                      this.state.useraccess.userModuleAccess[15]
                        .DeleteAccess === 0) ? (
                      <CustomInput
                        labelText="All Clear"
                        id="proposaltype"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        ReadOnly
                        inputProps={{
                          value: this.state.AllClear.value,
                        }}
                      />
                    ) : (
                      <Autocomplete
                        id="combo-box-demo"
                        options={allclearlist}
                        value={AllClear}
                        // disabled={viewAllClear === false ? false : true}
                        // disabled={
                        //   AllClear === "Yes" &&
                        //   this.state.useraccess.userModuleAccess[15].ModuleID ===
                        //     18 &&
                        //   this.state.useraccess.userModuleAccess[15]
                        //     .WriteAccess === 1 &&
                        //   this.state.useraccess.userModuleAccess[15]
                        //     .DeleteAccess === 0
                        //     ? false
                        //     : true
                        // }
                        onChange={(event, value) =>
                          this.selectChange(event, value, "AllClear")
                        }
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                          <TextField {...params} label="All Clear" />
                        )}
                      />
                    )}
                  </GridItem>

                  {/* <div className="select-spl">
                    <FormControl fullWidth>
                      <InputLabel
                        htmlFor="packagetype"
                        className={classes.selectLabel}
                      >
                        All Clear ?
                      </InputLabel>
                      <Select
                        // readOnly={
                        //   AllClear === "Yes" &&
                        //   (this.state.useraccess.userModuleAccess[15]
                        //     .ModuleID === 18 &&
                        //     this.state.useraccess.userModuleAccess[15]
                        //       .WriteAccess === 1 &&
                        //     this.state.useraccess.userModuleAccess[15]
                        //       .DeleteAccess === 0)
                        //     ? true
                        //     : false
                        // }
                        disabled={
                          AllClear === "Yes" &&
                          this.state.useraccess.userModuleAccess[15]
                            .ModuleID === 18 &&
                          this.state.useraccess.userModuleAccess[15]
                            .WriteAccess === 1 &&
                          this.state.useraccess.userModuleAccess[15]
                            .DeleteAccess === 0
                            ? false
                            : true
                        }
                        MenuProps={{
                          className: classes.selectMenu,
                        }}
                        classes={{
                          select: classes.select,
                        }}
                        value={AllClear}
                        onChange={(event) =>
                          this.changePackage(event, "AllClear")
                        }
                        inputProps={{ disabled: ReadOnly }}
                      >
                        {this.allClearMenu()}
                      </Select>
                    </FormControl>
                  </div>
                  </GridItem> */}

                  <GridItem xs={12} sm={4} md={3}>
                    <div className="select-spl">
                      <FormControl fullWidth>
                        <InputLabel
                          htmlFor="packagetype"
                          className={classes.selectLabel}
                        >
                          Package Type
                        </InputLabel>
                        <Select
                          MenuProps={{
                            className: classes.selectMenu,
                          }}
                          classes={{
                            select: classes.select,
                          }}
                          value={PackageType}
                          onChange={(event) =>
                            this.changePackage(event, "PackageType")
                          }
                          inputProps={{
                            name: "packagetype",
                            id: "packagetype",
                          }}
                        >
                          <MenuItem
                            value="Envelop"
                            classes={{
                              root: classes.selectMenuItem,
                            }}
                          >
                            Envelop
                          </MenuItem>
                          <MenuItem
                            value="Package"
                            classes={{
                              root: classes.selectMenuItem,
                            }}
                          >
                            Package
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </GridItem>
                  {/* <GridItem xs={12} sm={12} md={2}>
                    <CustomInput
                      type="number"
                      labelText="No. of Packages"
                      name="TotalPackages"
                      id="TotalPackages"
                      inputProps={{
                        value: TotalPackages,
                        onChange: (event) => this.handlePackageNoChange(event),
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={1}>
                    <div className="update-btn">
                      <Button
                        color="primary"
                        size="sm"
                        onClick={(event) => this.handlePackageNoBlur(event)}
                      >
                        Update
                      </Button>
                    </div>
                  </GridItem> */}
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Username"
                      id="proposaltype"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: ReadOnly,
                        value: CreatedBy,
                        onChange: (event) =>
                          this.handleChangeFrom(event, "CreatedBy"),
                        onBlur: (event) =>
                          this.CreatedByBlur(event, "CreatedBy"),
                        endAdornment: (
                          <Tooltip
                            html={true}
                            multiline={true}
                            width={100}
                            title={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: this.state.userdetailsTooltip,
                                }}
                              />
                            }
                            arrow
                          >
                            <InputAdornment
                              position="end"
                              className={classes.inputAdornment}
                            >
                              <Icon className={classes.User}>person</Icon>
                            </InputAdornment>
                          </Tooltip>
                        ),
                      }}
                    />
                    {/* {ipLocation !== null && ipLocation !== "" ? (
                            <Tooltip title={ipLocation} arrow>
                              <Button
                                className="Plus-btn info-icon"
                                justIcon
                                color="twitter"
                              >
                                <InfoIcon />Commercial Invoice
                              </Button>
                            </Tooltip>
                          ) : null} */}
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={3} md={3}>
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
                  <GridItem xs={12} sm={3} md={3}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={shipmentType}
                      value={ShipmentType}
                      onChange={(event, value) =>
                        this.selectChange(event, value, "ShipmentType")
                      }
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} label="Shipment Type" />
                      )}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3} md={3}>
                    <Autocomplete
                      id="combo-box-demo"
                      options={serviceName}
                      value={ServiceName}
                      onChange={(event, value) =>
                        this.selectChange(event, value, "ServiceType")
                      }
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} label="Service Type" />
                      )}
                    ></Autocomplete>
                  </GridItem>
                  <GridItem xs={12} sm={3} md={3}>
                    <Autocomplete
                      id="combo-box-demo"
                      disabled={Subservicename}
                      value={SubServiceName}
                      options={subServiceName}
                      onChange={(event, value) =>
                        this.selectChange(event, value, "SubServiceType")
                      }
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                        <TextField {...params} label="Sub Service Type" />
                      )}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center" className="schedule-pickup-main-outer">
          <GridItem xs={12} sm={12}>
            <div className="shipment-nav">
              <ul>
                {Steps.map((step, key) => {
                  return key === 2 &&
                    this.state.selectedFromCountry.value ===
                      this.state.selectedToCountry.value ? null : (
                    <li>
                      <a
                        className={step.classname}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          this.navigateChange(key, step.stepName);
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
              <div className="shipment-pane" id="customerdetails">
                <div className="shipment-box">
                  <Card>
                    <CardHeader
                      className="btn-right-outer"
                      color="primary"
                      icon
                    >
                      <h4 className="margin-right-auto text-color-black">
                        Sender Details
                      </h4>
                    </CardHeader>
                    <CardBody className="shipment-cardbody">
                      <GridContainer className="MuiGrid-justify-xs-center">
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText="Contact Name"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.FromContactName,
                              onChange: (event) =>
                                this.handleChangeFrom(event, "contactname"),
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.User}>
                                    perm_identity
                                  </Icon>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText="Address Line 1"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.FromAddressLine1,
                              onChange: (event) =>
                                this.handleChangeFrom(event, "address1"),
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.User}>
                                    location_on
                                  </Icon>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText="Address Line 2"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.FromAddressLine2,
                              onChange: (event) =>
                                this.handleChangeFrom(event, "address2"),
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.User}>
                                    location_on
                                  </Icon>
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
                              value: this.state.FromAddressLine3,
                              onChange: (event) =>
                                this.handleChangeFrom(event, "address3"),
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.User}>language</Icon>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer className="MuiGrid-justify-xs-center">
                        <GridItem xs={12} sm={12} md={3}>
                          <FormControl fullWidth>
                            <Autocomplete
                              options={CountryOption}
                              id="FromCountry"
                              getOptionLabel={(option) =>
                                option.label ? option.label : option
                              }
                              value={selectedFromCountry}
                              autoSelect
                              onChange={(event, value) =>
                                this.selectChangeTab1(
                                  event,
                                  value,
                                  "FromCountry"
                                )
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={this.state.pickupcountryErr}
                                  helperText={
                                    this.state.pickupcountryHelperText
                                  }
                                  label="From Country"
                                  margin="normal"
                                  fullWidth
                                />
                              )}
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText="Zip"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value:
                                this.state.disableFromZip &&
                                !this.state.isZipAvailable
                                  ? ""
                                  : this.state.FromZipCode,
                              disabled: this.state.disableFromZip,
                              onChange: (event) =>
                                this.handleChangeFrom(event, "zip"),
                              onBlur: (event) =>
                                this.handleBlur(event, "FromZipCode"),
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

                        {this.state.isFedexCountryFrom ? (
                          <GridItem xs={12} sm={12} md={3}>
                            <FormControl fullWidth>
                              <Autocomplete
                                options={FromFedExCityListDisplay}
                                id="FromFedExCity"
                                getOptionLabel={(option) => option.label}
                                value={this.state.FromFedExSelectedCity}
                                autoSelect
                                onChange={(event, value) =>
                                  this.ChangeFromCity(value, "FedEx")
                                }
                                renderInput={(params) => (
                                  <TextField {...params} label="City" />
                                )}
                              />
                            </FormControl>
                          </GridItem>
                        ) : (
                          <GridItem xs={12} sm={12} md={3}>
                            {this.state.fromCityAutoComplete === false ? (
                              <CustomInput
                                labelText="City"
                                id="city"
                                formControlProps={{ fullWidth: true }}
                                inputProps={{
                                  value: fromCity.label
                                    ? fromCity.label
                                    : fromCity,
                                  onChange: (event) =>
                                    this.handleCityStateChange(
                                      event,
                                      "fromCity"
                                    ),
                                  onBlur: (event) =>
                                    this.handleBlur(event, "fromCity"),
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
                              // <Autocomplete
                              //   options={fromCityOptions}
                              //   id="fromcity"
                              //   autoSelect
                              //   getOptionLabel={(option) => option.label}
                              //   value={fromCity}
                              //   onChange={(event, value) =>
                              //     this.ChangeFromCity(event, value)
                              //   }
                              //   renderInput={(params) => (
                              //     // <div className="spl-city">
                              //     //   <CustomInput
                              //     //     {...params}
                              //     //     inputProps={{
                              //     //       value: fromCity.value,
                              //     //       onChange: (event) =>
                              //     //         this.handleCityStateChange(
                              //     //           event,
                              //     //           "fromCity"
                              //     //         ),
                              //     //     }}
                              //     //     label="From City"
                              //     //   />
                              //     // </div>
                              //     <TextField
                              //       {...params}
                              //       margin="normal"
                              //       label="City"
                              //       fullWidth
                              //     />
                              //   )}
                              // />

                              <CustomInput
                                labelText="City"
                                id="city"
                                formControlProps={{ fullWidth: true }}
                                inputProps={{
                                  value: fromCity.label
                                    ? fromCity.label
                                    : fromCity,
                                  onChange: (event) =>
                                    this.handleCityStateChange(
                                      event,
                                      "fromCity"
                                    ),
                                  onBlur: (event) =>
                                    this.handleBlur(event, "fromCity"),
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
                            )}
                          </GridItem>
                        )}

                        <GridItem xs={12} sm={12} md={3}>
                          {this.state.fromStateAutoComplete === false ? (
                            <CustomInput
                              labelText="State"
                              id="state"
                              formControlProps={{ fullWidth: true }}
                              inputProps={{
                                // value: fromState.label,
                                value: fromState ? fromState.label : fromState,
                                // ? fromState.label
                                // : fromState,
                                disabled: this.state.disableFromState,
                                onChange: (event) =>
                                  this.handleCityStateChange(
                                    event,
                                    "fromState"
                                  ),
                                onBlur: (event) =>
                                  this.handleBlur(event, "fromState"),
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
                              options={fromStateOptions}
                              id="fromState"
                              autoSelect
                              getOptionLabel={(option) => option.label}
                              value={fromState}
                              onChange={(event, value) =>
                                this.ChangeFromState(event, value)
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
                            labelText="Company Name"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.FromCompanyName,
                              onChange: (event) =>
                                this.handleChangeFrom(event, "companyname"),
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.User}>
                                    assignment_ind
                                  </Icon>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText="Phone 1"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.FromPhone1,
                              disabled:
                                CommonConfig.getUserAccess("Shipment")
                                  .DeleteAccess === 1
                                  ? false
                                  : true,
                              onChange: (event) =>
                                this.handleChangeFrom(event, "phone1"),

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
                            labelText="Phone 2"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.FromPhone2,
                              disabled:
                                CommonConfig.getUserAccess("Shipment")
                                  .DeleteAccess === 1
                                  ? false
                                  : true,

                              onChange: (event) =>
                                this.handleChangeFrom(event, "phone2"),
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
                              value: this.state.FromEmail,
                              disabled:
                                CommonConfig.getUserAccess("Shipment")
                                  .DeleteAccess === 1
                                  ? false
                                  : true,
                              onChange: (event) =>
                                this.handleChangeFrom(event, "email"),
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
                    </CardBody>
                  </Card>
                </div>

                <div className="shipment-box">
                  <Card>
                    <CardHeader
                      className="btn-right-outer"
                      color="primary"
                      icon
                    >
                      <h4 className="margin-right-auto text-color-black">
                        Recipient Details
                      </h4>
                    </CardHeader>
                    <CardBody className="shipment-cardbody">
                      <GridContainer className="MuiGrid-justify-xs-center">
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText="Contact Name"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.ToContactName,
                              onChange: (event) =>
                                this.handleChangeTo(event, "contactname"),
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.User}>
                                    perm_identity
                                  </Icon>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText="Address Line 1"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.ToAddressLine1,
                              onChange: (event) =>
                                this.handleChangeTo(event, "address1"),
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.User}>
                                    location_on
                                  </Icon>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText="Address Line 2"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.ToAddressLine2,
                              onChange: (event) =>
                                this.handleChangeTo(event, "address2"),
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.User}>
                                    location_on
                                  </Icon>
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
                              value: this.state.ToAddressLine3,
                              onChange: (event) =>
                                this.handleChangeTo(event, "address3"),
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.User}>language</Icon>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                      <GridContainer className="MuiGrid-justify-xs-center">
                        <GridItem xs={12} sm={12} md={3}>
                          <FormControl fullWidth>
                            <Autocomplete
                              options={CountryOption}
                              id="ToCountry"
                              getOptionLabel={(option) =>
                                option.label ? option.label : option
                              }
                              value={selectedToCountry}
                              autoSelect
                              onChange={(event, value) =>
                                this.selectChangeTab1(event, value, "ToCountry")
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  error={this.state.pickupcountryErr}
                                  helperText={
                                    this.state.pickupcountryHelperText
                                  }
                                  label="To Country"
                                  margin="normal"
                                  fullWidth
                                />
                              )}
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText="Zip"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.disableToZip
                                ? ""
                                : this.state.ToZipCode,
                              disabled: this.state.disableToZip,
                              onChange: (event) =>
                                this.handleChangeTo(event, "zip"),
                              onBlur: (event) =>
                                this.handleBlur(event, "ToZipCode"),
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
                        {this.state.isFedexCountryTo ? (
                          <GridItem xs={12} sm={12} md={3}>
                            <FormControl fullWidth>
                              <Autocomplete
                                options={ToFedExCityListDisplay}
                                id="ToFedExCity"
                                getOptionLabel={(option) => option.label}
                                value={this.state.ToFedExSelectedCity}
                                autoSelect
                                onChange={(event, value) =>
                                  this.ChangeToCity(value, "FedEx")
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="To City"
                                    fullWidth
                                    error={this.state.toFedExCityError}
                                    helperText={
                                      this.state.toFedExCityHelperText
                                    }
                                  />
                                )}
                              />
                            </FormControl>
                          </GridItem>
                        ) : (
                          <GridItem xs={12} sm={12} md={3}>
                            {this.state.toCityAutoComplete === false ? (
                              <CustomInput
                                labelText="City"
                                id="city"
                                formControlProps={{ fullWidth: true }}
                                inputProps={{
                                  value: toCity.label ? toCity.label : toCity,
                                  onChange: (event) =>
                                    this.handleCityStateChange(event, "toCity"),
                                  onBlur: (event) =>
                                    this.handleBlur(event, "toCity"),
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
                              // <Autocomplete
                              //   options={toCityOptions}
                              //   id="tocity"
                              //   autoSelect
                              //   getOptionLabel={(option) => option.label}
                              //   value={toCity}
                              //   onChange={(event, value) =>
                              //     this.ChangeToCity(event, value)
                              //   }
                              //   renderInput={(params) => (
                              //     <TextField
                              //       {...params}
                              //       margin="normal"
                              //       label="City"
                              //       fullWidth
                              //     />
                              //   )}
                              // />
                              <CustomInput
                                labelText="City"
                                id="city"
                                formControlProps={{ fullWidth: true }}
                                inputProps={{
                                  value: toCity.label ? toCity.label : toCity,
                                  onChange: (event) =>
                                    this.handleCityStateChange(event, "toCity"),
                                  onBlur: (event) =>
                                    this.handleBlur(event, "toCity"),
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
                            )}
                          </GridItem>
                        )}

                        <GridItem xs={12} sm={12} md={3}>
                          {this.state.toStateAutoComplete === false ? (
                            <CustomInput
                              labelText="State"
                              id="state"
                              formControlProps={{ fullWidth: true }}
                              inputProps={{
                                value: toState.value ? toState.value : toState,
                                disabled: this.state.disableToState,
                                onChange: (event) =>
                                  this.handleCityStateChange(event, "toState"),
                                onBlur: (event) =>
                                  this.handleBlur(event, "toState"),
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
                              options={toStateOptions}
                              id="toState"
                              autoSelect
                              getOptionLabel={(option) => option.label}
                              value={toState}
                              onChange={(event, value) =>
                                this.ChangeToState(event, value)
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
                            labelText="Company Name"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.ToCompanyName,
                              onChange: (event) =>
                                this.handleChangeTo(event, "companyname"),
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.User}>
                                    assignment_ind
                                  </Icon>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            labelText="Phone 1"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.ToPhone1,
                              disabled:
                                CommonConfig.getUserAccess("Shipment")
                                  .DeleteAccess === 1
                                  ? false
                                  : true,

                              onChange: (event) =>
                                this.handleChangeTo(event, "phone1"),
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
                            labelText="Phone 2"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              value: this.state.ToPhone2,
                              disabled:
                                CommonConfig.getUserAccess("Shipment")
                                  .DeleteAccess === 1
                                  ? false
                                  : true,

                              onChange: (event) =>
                                this.handleChangeTo(event, "phone2"),
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
                              value: this.state.ToEmail,
                              disabled:
                                CommonConfig.getUserAccess("Shipment")
                                  .DeleteAccess === 1
                                  ? false
                                  : true,

                              onChange: (event) =>
                                this.handleChangeTo(event, "email"),
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
                    </CardBody>
                  </Card>
                </div>

                <div className="shipment-box">
                  <Card>
                    <CardHeader
                      className="btn-right-outer"
                      color="primary"
                      icon
                    >
                      <h4 className="margin-right-auto text-color-black">
                        Pickup Details
                      </h4>
                    </CardHeader>
                    <CardBody className="shipment-cardbody">
                      <GridContainer className="MuiGrid-justify-xs-center">
                        <GridItem xs={12} sm={12} md={3}>
                          <FormControl fullWidth>
                            <Autocomplete
                              id="combo-box-demo"
                              options={pickupVendorName}
                              value={PickupVendorName}
                              onChange={(event, value) =>
                                this.selectChange(
                                  event,
                                  value,
                                  "PickupProvider"
                                )
                              }
                              getOptionLabel={(option) => option.label}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Pickup Provider"
                                  margin="normal"
                                  fullWidth
                                  error={this.state.pickupProviderErr}
                                  helperText={
                                    this.state.pickupProviderHelperText
                                  }
                                />
                              )}
                            />
                          </FormControl>
                        </GridItem>

                        <GridItem id="NonFedexDates" xs={12} sm={12} md={3}>
                          <div className="date-input mt-17 slam">
                            <InputLabel className={classes.label}>
                              Pickup Date
                            </InputLabel>
                            <FormControl fullWidth className="palceholdercolor">
                              <Datetime
                                dateFormat={"MM/DD/YYYY"}
                                timeFormat={true}
                                value={PickupDate}
                                onChange={(date) =>
                                  this.additionalDateChange(date, "PickupDate")
                                }
                                dataTimezone="utc"
                                utc={true}
                                disabled={this.state.pickupDisable}
                                displayTimezone="utc"
                                closeOnSelect={true}
                                // isValidDate={valid}
                                renderInput={(params) => (
                                  <TextField
                                    disabled={this.state.pickupDisable}
                                    {...params}
                                    fullWidth
                                    // placeholder="pickupdate"
                                    error={this.state.pickupDateErr}
                                    helperText={this.state.pickupDateHelperText}
                                  />
                                )}
                              />
                            </FormControl>
                          </div>
                        </GridItem>
                        <GridItem id="FedexDates" xs={12} sm={12} md={3}>
                          <div className="date-input mt-17 slam">
                            <InputLabel className={classes.label}>
                              Pickup Date
                            </InputLabel>
                            <FormControl fullWidth>
                              <Datetime
                                dateFormat={"MM/DD/YYYY"}
                                timeFormat={false}
                                value={PickupDate}
                                onChange={(date) =>
                                  this.additionalDateChange(date, "PickupDate")
                                }
                                dataTimezone="utc"
                                utc={true}
                                displayTimezone="utc"
                                closeOnSelect={true}
                                // isValidDate={valid1}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    error={this.state.pickupDateErr}
                                    helperText={this.state.pickupDateHelperText}
                                  />
                                )}
                              />
                            </FormControl>
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <div>
                            <FormControl
                              fullWidth
                              error={this.state.ReadyTimeErr}
                            >
                              {/* <InputLabel className={classes.selectLabel}>
                                Start Time
                              </InputLabel> */}

                              <Autocomplete
                                id="combo-box-demo"
                                options={readytimelists}
                                disabled={this.state.pickupDisable}
                                value={this.state.ReadytimeView}
                                onChange={(event, value) =>
                                  this.selectChange(event, value, "ReadyTime")
                                }
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Start Time"
                                    margin="normal"
                                    fullWidth
                                  />
                                )}
                              />
                            </FormControl>
                            <span
                              id="readytime"
                              style={{ color: "red", fontSize: "12px" }}
                            >
                              {this.state.ReadyTimeErrHelperText}
                            </span>
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3} className="z-index-9">
                          <div>
                            <FormControl
                              fullWidth
                              error={this.state.AvailableTimeErr}
                            >
                              {/* <InputLabel className={classes.selectLabel}>
                                End Time
                              </InputLabel> */}
                              <Autocomplete
                                id="combo-box-demo"
                                disabled={this.state.pickupDisable}
                                options={avalibletimelists}
                                value={this.state.availibletimeView}
                                onChange={(event, value) =>
                                  this.selectChange(
                                    event,
                                    value,
                                    "AvailableTime"
                                  )
                                }
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="End Time"
                                    margin="normal"
                                    fullWidth
                                  />
                                )}
                              />

                              {/* <Select
                                className="filter-wrap"
                                id="AvailableTime"
                                name="AvailableTime"
                                value={this.state.AvailableTime}
                                // className="form-control"
                                onChange={(event) =>
                                  this.selectChange(event, "", "AvailableTime")
                                }
                              >
                                {this.AvailableTimeList()} */}
                              {/* </Select> */}
                            </FormControl>
                            <span
                              id="availabletime"
                              style={{ color: "red", fontSize: "12px" }}
                            >
                              {this.state.AvailableTimeErrHelperText}
                            </span>
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <CustomInput
                            formControlProps={{ fullWidth: true }}
                            labelText="Special Instruction (Max 29 Char)"
                            error={this.state.NotesforPickupErr}
                            helperText={this.state.NotesforPickupHelperText}
                            inputProps={{
                              disabled: this.state.pickupDisable,
                              value: this.state.NotesforPickup,
                              onChange: (e) =>
                                this.handleAdditionalChange(
                                  e,
                                  "NotesforPickup"
                                ),
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </div>

                <div className="shipment-box mb-0">
                  <Card>
                    <CardHeader
                      className="btn-right-outer"
                      color="primary"
                      icon
                    >
                      <h4 className="margin-right-auto text-color-black">
                        Additional Details
                      </h4>
                    </CardHeader>
                    <CardBody className="shipment-cardbody">
                      <GridContainer>
                        <GridItem sm={4} md={4}>
                          <CustomInput
                            labelText="Ship Date"
                            id="proposaltype"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              disabled: true,
                              value: ShipmentDate,
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  className={classes.inputAdornment}
                                >
                                  <Icon className={classes.User}>person</Icon>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </GridItem>
                        <GridItem sm={4} md={4}>
                          <div className="select-spl">
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="packagetype"
                                className={classes.selectLabel}
                              >
                                Location Type
                              </InputLabel>
                              <Select
                                MenuProps={{
                                  className: classes.selectMenu,
                                }}
                                classes={{
                                  select: classes.select,
                                }}
                                value={LocationType}
                                onChange={(event) =>
                                  this.typeChange(event, "LocationType")
                                }
                              >
                                <MenuItem
                                  value="Residential"
                                  classes={{
                                    root: classes.selectMenuItem,
                                  }}
                                >
                                  Residential
                                </MenuItem>
                                <MenuItem
                                  value="Commercial"
                                  classes={{
                                    root: classes.selectMenuItem,
                                  }}
                                >
                                  Commercial
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </GridItem>
                        <GridItem sm={4} md={4}>
                          <div className="select-spl">
                            <FormControl fullWidth>
                              <InputLabel
                                htmlFor="packagetype"
                                className={classes.selectLabel}
                              >
                                Duties & Taxes Paid By
                              </InputLabel>
                              <Select
                                MenuProps={{
                                  className: classes.selectMenu,
                                }}
                                classes={{
                                  select: classes.select,
                                }}
                                value={DutiesPaidBy}
                                onChange={(event) =>
                                  this.typeChange(event, "DutiesPaidBy")
                                }
                              >
                                <MenuItem
                                  value="Recipient"
                                  classes={{
                                    root: classes.selectMenuItem,
                                  }}
                                >
                                  Recipient
                                </MenuItem>
                                <MenuItem
                                  value="Sender"
                                  classes={{
                                    root: classes.selectMenuItem,
                                  }}
                                >
                                  Sender
                                </MenuItem>
                                <MenuItem
                                  value="Not Applicable"
                                  classes={{
                                    root: classes.selectMenuItem,
                                  }}
                                >
                                  Not Applicable
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        </GridItem>
                      </GridContainer>
                      {this.state.ShipmentType.value === "Ocean" ? (
                        <>
                          <GridContainer>
                            {this.state.Access.WriteAccess ? (
                              <GridItem sm={4} md={4}>
                                <div className="date-input mt-17 slam">
                                  <InputLabel className={classes.label}>
                                    Custom Clearance Date
                                  </InputLabel>
                                  <FormControl fullWidth>
                                    <Datetime
                                      dateFormat={"MM/DD/YYYY"}
                                      timeFormat={false}
                                      value={CustomClearanceDate}
                                      onChange={(date) =>
                                        this.additionalDateChange(
                                          date,
                                          "CustomClearanceDate"
                                        )
                                      }
                                      closeOnSelect={true}
                                      // renderInput={(params) => (
                                      //   <TextField
                                      //     {...params}
                                      //     fullWidth
                                      //     error={this.state.pickupDateErr}
                                      //     helperText={this.state.pickupDateHelperText}
                                      //   />
                                      // )}
                                    />
                                  </FormControl>
                                </div>
                              </GridItem>
                            ) : null}
                            <GridItem sm={4} md={4}>
                              <div className="select-spl">
                                <FormControl
                                  fullWidth
                                  error={this.state.movingBackIndiaErr}
                                >
                                  <InputLabel className={classes.selectLabel}>
                                    Are you moving back to India?
                                  </InputLabel>
                                  <Select
                                    value={this.state.movingBackIndia}
                                    onChange={(event) =>
                                      this.handleAdditionalChange(
                                        event,
                                        "MovingBackIndia"
                                      )
                                    }
                                    inputProps={{
                                      name: "movingBackIndia",
                                      id: "movingBackIndia",
                                    }}
                                  >
                                    onFocus=
                                    {() =>
                                      this.setState({
                                        movingBackIndiaErr: false,
                                        movingBackIndiaHelperText: "",
                                      })
                                    }
                                    {this.yesOrNo()}
                                  </Select>
                                  <FormHelperText>
                                    {this.state.movingBackIndiaHelperText}
                                  </FormHelperText>
                                </FormControl>
                              </div>
                            </GridItem>
                            {/* {isBackIndia ? 
                            <> */}

                            {this.state.ShipmentType.value === "Ocean" ? (
                              <GridItem sm={4} md={4}>
                                <FormControl fullWidth>
                                  <Autocomplete
                                    id="combo-box-demo"
                                    options={containerName}
                                    value={ContainerName}
                                    onChange={(event, value) =>
                                      this.selectChange(
                                        event,
                                        value,
                                        "ContainerName"
                                      )
                                    }
                                    getOptionLabel={(option) => option.label}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Container Name"
                                        margin="normal"
                                        fullWidth
                                      />
                                    )}
                                  />
                                </FormControl>
                              </GridItem>
                            ) : null}

                            <GridItem sm={4} md={4}>
                              <div className="select-spl">
                                <FormControl
                                  fullWidth
                                  error={this.state.yearsOutsideIndiaErr}
                                >
                                  <InputLabel className={classes.selectLabel}>
                                    For how many years you have outside India?
                                  </InputLabel>
                                  <Select
                                    value={this.state.YearsOutsideIndia}
                                    onChange={(event) =>
                                      this.handleAdditionalChange(
                                        event,
                                        "YearsOutsideIndia"
                                      )
                                    }
                                    inputProps={{
                                      name: "yearsoutsideIndia",
                                      id: "yearsoutsideIndia",
                                    }}
                                  >
                                    onFocus=
                                    {() =>
                                      this.setState({
                                        yearsOutsideIndiaErr: false,
                                        yearsOutsideIndiaHelperText: "",
                                      })
                                    }
                                    {this.yearsRender()}
                                  </Select>
                                  <FormHelperText>
                                    {this.state.yearsOutsideIndiaHelperText}
                                  </FormHelperText>
                                </FormControl>
                              </div>
                            </GridItem>
                            <GridItem sm={4} md={4}>
                              <div className="select-spl">
                                <FormControl
                                  fullWidth
                                  error={this.state.stayinIndiaErr}
                                >
                                  <InputLabel className={classes.selectLabel}>
                                    Stayed in India for more than 6 months in
                                    last 2 years?
                                  </InputLabel>
                                  <Select
                                    value={this.state.StayInIndia}
                                    onChange={(event) =>
                                      this.handleAdditionalChange(
                                        event,
                                        "StayInIndia"
                                      )
                                    }
                                    inputProps={{
                                      name: "stayinIndia",
                                      id: "stayinIndia",
                                    }}
                                  >
                                    onFocus=
                                    {() =>
                                      this.setState({
                                        stayinIndiaErr: false,
                                        stayinIndiaHelperText: "",
                                      })
                                    }
                                    {this.yesOrNo()}
                                  </Select>
                                  <FormHelperText>
                                    {this.state.stayinIndiaHelperText}
                                  </FormHelperText>
                                </FormControl>
                              </div>
                            </GridItem>
                            <GridItem sm={4} md={4}>
                              <div className="select-spl">
                                <FormControl
                                  fullWidth
                                  error={this.state.appliedForTRErr}
                                >
                                  <InputLabel className={classes.selectLabel}>
                                    Have you applied for TR in last 3 years?
                                  </InputLabel>
                                  <Select
                                    value={this.state.AppliedForTR}
                                    onChange={(event) =>
                                      this.handleAdditionalChange(
                                        event,
                                        "AppliedForTR"
                                      )
                                    }
                                    inputProps={{
                                      name: "appliedForTR",
                                      id: "appliedForTR",
                                    }}
                                  >
                                    onFocus=
                                    {() =>
                                      this.setState({
                                        appliedForTRErr: false,
                                        appliedForTRHelperText: "",
                                      })
                                    }
                                    {this.yesOrNo()}
                                  </Select>
                                  <FormHelperText>
                                    {this.state.appliedForTRHelperText}
                                  </FormHelperText>
                                </FormControl>
                              </div>
                            </GridItem>
                            {/* </>
                            : null
                            } */}
                          </GridContainer>
                          {/* {isBackIndia ?  */}
                          <GridContainer>
                            <GridItem sm={4} md={4}>
                              <div className="select-spl">
                                <FormControl
                                  fullWidth
                                  error={this.state.ableToProvidePassportErr}
                                >
                                  <InputLabel className={classes.selectLabel}>
                                    Wlll provide original passport for Customs
                                    Clearance ?
                                  </InputLabel>
                                  <Select
                                    value={this.state.AbleToProvidePassport}
                                    onChange={(event) =>
                                      this.handleAdditionalChange(
                                        event,
                                        "AbleToProvidePassport"
                                      )
                                    }
                                    inputProps={{
                                      name: "ableToProvidePassport",
                                      id: "ableToProvidePassport",
                                    }}
                                  >
                                    onFocus=
                                    {() =>
                                      this.setState({
                                        ableToProvidePassportErr: false,
                                        ableToProvidePassportHelperText: "",
                                      })
                                    }
                                    {this.yesOrNo()}
                                  </Select>
                                  <FormHelperText>
                                    {this.state.ableToProvidePassportHelperText}
                                  </FormHelperText>
                                </FormControl>
                              </div>
                            </GridItem>
                            <GridItem sm={4} md={4} className="z-index-9">
                              <div
                                style={{ marginTop: "18px" }}
                                className="date-input"
                              >
                                <InputLabel className={classes.label}>
                                  Your latest arrival date in India?
                                </InputLabel>
                                <FormControl fullWidth>
                                  <Datetime
                                    timeFormat={false}
                                    value={this.state.LatestArrivalDate}
                                    onChange={(date) =>
                                      this.handleAdditionalDateChange(
                                        date,
                                        "ArrivalDate"
                                      )
                                    }
                                    closeOnSelect={true}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        margin="normal"
                                        fullWidth
                                        error={this.state.arrivalDateErr}
                                        helperText={
                                          this.state.arrivalDateHelperText
                                        }
                                      />
                                    )}
                                  />
                                </FormControl>
                              </div>
                            </GridItem>
                            <GridItem sm={4} md={4} className="z-index-9">
                              <div className="select-spl">
                                <FormControl
                                  fullWidth
                                  error={this.state.visaCategoryErr}
                                >
                                  <InputLabel className={classes.selectLabel}>
                                    Arriving in India with?
                                  </InputLabel>
                                  <Select
                                    value={this.state.VisaCategory}
                                    onChange={(event) =>
                                      this.handleAdditionalChange(
                                        event,
                                        "VisaCategory"
                                      )
                                    }
                                    inputProps={{
                                      name: "visaCategory",
                                      id: "visaCategory",
                                    }}
                                  >
                                    onFocus=
                                    {() =>
                                      this.setState({
                                        visaCategoryErr: false,
                                        visaCategoryHelperText: "",
                                      })
                                    }
                                    {this.visaCategoryMenu()}
                                  </Select>
                                  <FormHelperText>
                                    {this.state.visaCategoryHelperText}
                                  </FormHelperText>
                                </FormControl>
                              </div>
                            </GridItem>
                            <GridItem sm={4} md={4} className="z-index-9">
                              <div
                                style={{ marginTop: "18px" }}
                                className="date-input"
                              >
                                <InputLabel className={classes.label}>
                                  Validity Date
                                </InputLabel>
                                <FormControl fullWidth>
                                  <Datetime
                                    timeFormat={false}
                                    value={this.state.VisaValidDate}
                                    onChange={(date) =>
                                      this.handleAdditionalDateChange(
                                        date,
                                        "VisaValidDate"
                                      )
                                    }
                                    closeOnSelect={true}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        margin="normal"
                                        fullWidth
                                        error={this.state.visaDateErr}
                                        helperText={
                                          this.state.visaDateHelperText
                                        }
                                      />
                                    )}
                                  />
                                </FormControl>
                              </div>
                            </GridItem>
                            <GridItem sm={4} md={4}>
                              <CustomInput
                                formControlProps={{ fullWidth: true }}
                                labelText="Your Name as per passport?"
                                error={this.state.nameAsperPassportErr}
                                helperText={
                                  this.state.nameAsperPassportHelperText
                                }
                                inputProps={{
                                  value: this.state.NameAsPerPassport,
                                  onChange: (e) =>
                                    this.handleAdditionalChange(
                                      e,
                                      "NameAsPerPassport"
                                    ),
                                }}
                              />
                            </GridItem>

                            <GridItem sm={4} md={4}>
                              <CustomInput
                                formControlProps={{ fullWidth: true }}
                                labelText="Passport Number?"
                                error={this.state.PassportNumberErr}
                                helperText={this.state.PassportNumberHelperText}
                                inputProps={{
                                  value: this.state.PassportNumber,
                                  onChange: (e) =>
                                    this.handleAdditionalChange(
                                      e,
                                      "PassportNumber"
                                    ),
                                }}
                              />
                            </GridItem>
                          </GridContainer>

                          {/* :
                            null
                        } */}
                          {/* {isBackIndia ? */}
                          {/* <GridContainer>
                           
                          </GridContainer> */}
                          {/* :
                            null 
                        } */}
                        </>
                      ) : null}
                    </CardBody>
                  </Card>
                </div>
              </div>
              <div className="shipment-pane" id="package">
                <Card>
                  <CardHeader className="btn-right-outer" color="primary" icon>
                    <h4 className="margin-right-auto text-color-black">
                      Package
                    </h4>
                    {/* {this.state.PackageList.filter(
                        (x) => x.Status === "Active"
                      ).length > 1 ? ( */}
                    {/* <div> */}

                    {this.state.PackageType === "Package" &&
                    this.state.PackageList.filter((x) => x.Status === "Active")
                      .length > 0 ? (
                      <GridItem xs={12} sm={4} md={3}>
                        <div className="select-spl">
                          <FormControl fullWidth>
                            <InputLabel
                              htmlFor="packagetype"
                              className={classes.selectLabel}
                            >
                              Is Identical?
                            </InputLabel>
                            <Select
                              MenuProps={{
                                className: classes.selectMenu,
                              }}
                              classes={{
                                select: classes.select,
                              }}
                              value={this.state.identical}
                              onChange={(event) =>
                                this.changePackage(event, "Identical")
                              }
                              inputProps={{
                                name: "Identical",
                                id: "Identical",
                              }}
                            >
                              <MenuItem
                                value="Yes"
                                classes={{
                                  root: classes.selectMenuItem,
                                }}
                              >
                                Yes
                              </MenuItem>
                              <MenuItem
                                value="No"
                                classes={{
                                  root: classes.selectMenuItem,
                                }}
                              >
                                No
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </GridItem>
                    ) : null}

                    <GridItem xs={12} sm={12} md={3}>
                      {this.state.PackageList.filter(
                        (x) => x.Status === "Active"
                      ).length > 0 ? (
                        <CustomInput
                          type="number"
                          labelText="No. of Packages"
                          name="TotalPackages"
                          id="TotalPackages"
                          inputProps={{
                            value: TotalPackages,
                            onChange: (event) =>
                              this.handlePackageNoChange(event),
                          }}
                        />
                      ) : null}
                    </GridItem>
                    <GridItem xs={12} sm={12} md={1}>
                      {this.state.PackageList.filter(
                        (x) => x.Status === "Active"
                      ).length > 0 ? (
                        <div className="update-btn">
                          <Button
                            color="primary"
                            size="sm"
                            onClick={(event) => this.handlePackageNoBlur(event)}
                          >
                            Add
                          </Button>
                        </div>
                      ) : null}
                    </GridItem>
                    {/* </div> */}

                    <div style={{ textAlign: "right", marginTop: "12px" }}>
                      {this.state.PackageList.filter(
                        (x) => x.Status === "Active"
                      ).length === 0 ? (
                        // <i onClick={() => this.showDiv("isInvoiceVisible","Invoice")} class="fas fa-car"></i>
                        // <img
                        //   style={{ width: "32px", marginLeft: "20px" }}
                        //   src={packageSVG}
                        //   onClick={() =>
                        //     this.showDiv(
                        //       "isPackageDetailsVisible",
                        //       "PackageDetailsVisible"
                        //     )
                        //   }
                        // />
                        <Button
                          onClick={() =>
                            this.showDiv(
                              "isPackageDetailsVisible",
                              "PackageDetailsVisible"
                            )
                          }
                          style={{ width: "70px", height: "20px" }}
                          color="primary"
                        >
                          Open
                        </Button>
                      ) : null}
                    </div>
                    {/* <Checkbox
                      disabled={false}
                      onChange={(e) => this.changePackageVisible(e)}
                      checked={IsPackageAccess}
                    />
                    <label className="margin-right-auto text-color-black do-not-show-MyShipment">
                      Do not show on My Shipment
                    </label> */}
                  </CardHeader>
                  <CardBody className="shipment-cardbody">
                    {isPackageDetailsVisible ? (
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="package-table input-full">
                            <table id="PackageTable">
                              <thead>
                                <tr>
                                  <th>Number</th>
                                  {this.state.ShipmentType.value === "Ocean" ? (
                                    <>
                                      <th>Sequence</th>
                                      <th>Pkg Type</th>
                                    </>
                                  ) : null}
                                  <th>Weight</th>
                                  <th>Dim(L)</th>
                                  <th>Dim(W)</th>
                                  <th>Dim(H)</th>
                                  <th className="nowrap">Charge (Lbs)</th>
                                  {this.state.ShipmentType.value !== "Ocean" ? (
                                    <th>Insurance</th>
                                  ) : null}
                                  {this.state.ShipmentType.value === "Ocean" ? (
                                    <>
                                      <th>CFT</th>
                                      <th>Packed Type</th>
                                    </>
                                  ) : null}
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.viewPackage()}

                                <tr>
                                  {this.state.ShipmentType.value !== "Ocean" ? (
                                    <td className="shipmentBox" colSpan="5">
                                      <Checkbox
                                        disabled={false}
                                        onChange={(e) =>
                                          this.changePackageVisible(e)
                                        }
                                        checked={IsPackageAccess}
                                      />
                                      <label
                                        style={{
                                          "margin-top": "5px",
                                          display: "inline-block",
                                        }}
                                        className="margin-right-auto text-color-black do-not-show-MyShipment"
                                      >
                                        <span className="spanShipment">
                                          Do not show on My Shipment
                                        </span>
                                      </label>
                                      <b
                                        style={{
                                          float: "right",
                                          "margin-top": "5px",
                                        }}
                                      >
                                        Total :
                                      </b>
                                    </td>
                                  ) : (
                                    <td className="shipmentBox" colSpan="7">
                                      <Checkbox
                                        disabled={false}
                                        onChange={(e) =>
                                          this.changePackageVisible(e)
                                        }
                                        checked={IsPackageAccess}
                                      />
                                      <label
                                        style={{
                                          "margin-top": "5px",
                                          display: "inline-block",
                                        }}
                                        className="margin-right-auto text-color-black do-not-show-MyShipment"
                                      >
                                        <span className="spanShipment">
                                          Do not show on My Shipment
                                        </span>
                                      </label>
                                      <b
                                        style={{
                                          float: "right",
                                          "margin-top": "5px",
                                        }}
                                      >
                                        Total :
                                      </b>
                                    </td>
                                  )}

                                  {this.state.ShipmentType.value !== "Ocean" ? (
                                    <>
                                      <td>
                                        <CustomInput
                                          inputProps={{
                                            value: totalChargableWeight,
                                            disabled: true,
                                          }}
                                        />
                                      </td>
                                      <td colSpan="1">
                                        <CustomInput
                                          inputProps={{
                                            value: parseFloat(
                                              totalInsuredValue
                                            ).toFixed(2),
                                            disabled: true,
                                          }}
                                        />
                                      </td>
                                    </>
                                  ) : (
                                    <td>
                                      <CustomInput
                                        inputProps={{
                                          value: totalChargableWeight,
                                          disabled: true,
                                        }}
                                      />
                                    </td>
                                  )}
                                  {this.state.ShipmentType.value !==
                                  "Ocean" ? null : (
                                    <td>
                                      <CustomInput
                                        inputProps={{
                                          value: parseFloat(totalCFT).toFixed(
                                            2
                                          ),
                                          disabled: true,
                                        }}
                                      />
                                    </td>
                                  )}
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </GridItem>
                      </GridContainer>
                    ) : null}
                  </CardBody>
                </Card>
              </div>
              <div className="shipment-pane" id="commercialinvoice">
                <Card>
                  <CardHeader className="btn-right-outer" color="primary" icon>
                    <h4 className="margin-right-auto text-color-black">
                      Commercial Invoice
                    </h4>

                    <div style={{ textAlign: "right", marginTop: "12px" }}>
                      {this.state.commercialList.filter(
                        (x) => x.Status === "Active"
                      ).length === 0 ? (
                        // <i onClick={() => this.showDiv("isInvoiceVisible","Invoice")} class="fas fa-car"></i>
                        // <img
                        //   style={{ width: "32px", marginLeft: "20px" }}
                        //   src={carSVG}
                        //   onClick={() =>
                        //     this.showDiv(
                        //       "isComInvoiceVisible",
                        //       "ComInvoiceVisible"
                        //     )
                        //   }
                        // />

                        <Button
                          onClick={() =>
                            this.showDiv(
                              "isComInvoiceVisible",
                              "ComInvoiceVisible"
                            )
                          }
                          style={{ width: "70px", height: "20px" }}
                          color="primary"
                        >
                          Open
                        </Button>
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardBody className="shipment-cardbody">
                    {isComInvoiceVisible &&
                    this.state.PackageList.filter((x) => x.Status === "Active")
                      .length > 0 ? (
                      <GridContainer className="MuiGrid-justify-xs-center">
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="package-table">
                            <table>
                              <thead>
                                <tr>
                                  <th>Package Number</th>
                                  <th>Package Content</th>
                                  {this.state.ShipmentType.value !== "Ocean" ? (
                                    <>
                                      <th className="right">Quantity</th>
                                      <th className="right nowrap">
                                        Value Per Qty
                                      </th>
                                    </>
                                  ) : null}
                                  <th className="right">Total Value</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.viewCommercialInvoice()}
                                <tr>
                                  {this.state.ShipmentType.value !== "Ocean" ? (
                                    <td
                                      className="text-align-right"
                                      colSpan="4"
                                    >
                                      <b>Total Cost:</b>
                                    </td>
                                  ) : (
                                    <td
                                      className="text-align-right"
                                      colSpan="2"
                                    >
                                      <b>Total Cost:</b>
                                    </td>
                                  )}
                                  <td className="right">
                                    <CustomInput
                                      inputProps={{
                                        value: parseFloat(
                                          TotalCostCommercial
                                        ).toFixed(2),
                                        disabled: true,
                                      }}
                                    />
                                  </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </GridItem>
                      </GridContainer>
                    ) : (
                      <GridContainer className="MuiGrid-justify-xs-center">
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="package-table">
                            <table>
                              <thead>
                                <tr>
                                  <th>Package Number</th>
                                  <th>Package Content</th>

                                  <th className="right">Total Value</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="table-error" colSpan={4}>
                                    There is no package added. Please add
                                    atleast 1 package.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </GridItem>
                      </GridContainer>
                    )}
                  </CardBody>
                </Card>
              </div>
              <div className="shipment-pane" id="accounts">
                <Card>
                  <CardHeader className="btn-right-outer" color="primary" icon>
                    <h4 className="margin-right-auto text-color-black">
                      Invoice
                    </h4>
                    <div style={{ textAlign: "right", marginTop: "12px" }}>
                      {this.state.PaymentList.filter(
                        (x) => x.Status === "Active"
                      ).length === 0 ? (
                        // <i onClick={() => this.showDiv("isInvoiceVisible","Invoice")} class="fas fa-car"></i>
                        // <img
                        //   style={{ width: "32px", marginLeft: "20px" }}
                        //   src={carSVG}
                        //   onClick={() =>
                        //     this.showDiv("isInvoiceVisible", "Invoice")
                        //   }
                        // />
                        <Button
                          onClick={() =>
                            this.showDiv("isInvoiceVisible", "Invoice")
                          }
                          style={{ width: "70px", height: "20px" }}
                          color="primary"
                        >
                          Open
                        </Button>
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardBody className="shipment-cardbody">
                    {isInvoiceVisible ? (
                      <GridContainer className="MuiGrid-justify-xs-center">
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="package-table accounts-table input-full no-scroll">
                            <table>
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th className="acc-wd200">Service</th>
                                  <th className="acc-wd200">Description</th>
                                  <th className="right">Qty</th>
                                  <th className="right">Cost</th>
                                  <th className="right">Total</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.viewInvoice()}
                                <tr>
                                  <td className="text-align-right">
                                    <b>Due Date</b>
                                  </td>
                                  <td>
                                    <Datetime
                                      dateFormat={"MM/DD/YYYY"}
                                      timeFormat={false}
                                      value={InvoiceDueDate}
                                      onChange={(date) =>
                                        this.dateChange(date, "InvoiceDueDate")
                                      }
                                      closeOnSelect={true}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          margin="normal"
                                          fullWidth
                                          error={this.state.invoiceDueDateErr}
                                          helperText={
                                            this.state.invoiceDueDateHelperText
                                          }
                                        />
                                      )}
                                    />
                                  </td>
                                  <td className="text-align-right" colSpan="3">
                                    <b>Total Cost:</b>
                                  </td>
                                  <td className="text-align-right right">
                                    <CustomInput
                                      inputProps={{
                                        value: parseFloat(
                                          TotalCostInvoice
                                        ).toFixed(2),
                                        disabled: true,
                                      }}
                                    />
                                  </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </GridItem>
                      </GridContainer>
                    ) : null}
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader className="btn-right-outer" color="primary" icon>
                    <h4 className="margin-right-auto text-color-black">
                      Payment Received
                    </h4>
                    <div style={{ textAlign: "right", marginTop: "12px" }}>
                      {this.state.paymentReceived.filter(
                        (x) => x.Status === "Active"
                      ).length === 0 ? (
                        // <i onClick={() => this.showDiv("isInvoiceVisible","Invoice")} class="fas fa-car"></i>
                        // <img
                        //   style={{ width: "32px", marginLeft: "20px" }}
                        //   src={carSVG}
                        //   onClick={() =>
                        //     this.showDiv("isPaymentReceived", "PaymentReceived")
                        //   }
                        // />
                        <Button
                          onClick={() =>
                            this.showDiv("isPaymentReceived", "PaymentReceived")
                          }
                          style={{ width: "70px", height: "20px" }}
                          color="primary"
                        >
                          Open
                        </Button>
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardBody className="shipment-cardbody">
                    {isPaymentReceived ? (
                      <GridContainer className="MuiGrid-justify-xs-center">
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="package-table accounts-table no-scroll">
                            <table>
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th className="acc-wd400">Payment Type</th>
                                  <th>Number</th>
                                  <th>Confirmation</th>
                                  <th className="right">Amount</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.paymentReceived()}
                                <tr>
                                  <td className="text-align-right" colSpan="4">
                                    <b>Total Cost:</b>
                                  </td>
                                  <td className="text-align-right right">
                                    <CustomInput
                                      inputProps={{
                                        value: parseFloat(
                                          TotalCostReceived
                                        ).toFixed(2),
                                        disabled: true,
                                      }}
                                    />
                                  </td>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </GridItem>
                      </GridContainer>
                    ) : null}
                  </CardBody>
                </Card>
                {this.state.Access.DeleteAccess ||
                this.state.VendorAccessForInvoice === 1 ? (
                  <Card>
                    <CardHeader
                      className="btn-right-outer"
                      color="primary"
                      icon
                    >
                      <h4 className="margin-right-auto text-color-black">
                        Payment Issued
                      </h4>
                      <div style={{ textAlign: "right", marginTop: "12px" }}>
                        {this.state.paymentIssued.filter(
                          (x) => x.Status === "Active"
                        ).length === 0 ? (
                          // <i onClick={() => this.showDiv("isInvoiceVisible","Invoice")} class="fas fa-car"></i>
                          // <img
                          //   style={{ width: "32px", marginLeft: "20px" }}
                          //   src={carSVG}
                          //   onClick={() =>
                          //     this.showDiv("isPaymentIssued", "PaymentIssued")
                          //   }
                          // />
                          <Button
                            onClick={() =>
                              this.showDiv("isPaymentIssued", "PaymentIssued")
                            }
                            style={{ width: "70px", height: "20px" }}
                            color="primary"
                          >
                            Open
                          </Button>
                        ) : null}
                      </div>
                    </CardHeader>
                    <CardBody className="shipment-cardbody">
                      {isPaymentIssued ? (
                        <GridContainer className="MuiGrid-justify-xs-center">
                          <GridItem xs={12} sm={12} md={12}>
                            <div className="package-table accounts-table no-scroll">
                              <table>
                                <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th className="acc-wd200">Vendor Name</th>
                                    <th className="wd-90">Invoice No</th>
                                    <th className="wd-110">Confirmation</th>
                                    <th>Date Paid</th>
                                    <th>Paid Status</th>
                                    <th className="right">Amount</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.viewPaymentIssued()}
                                  <tr>
                                    <td
                                      className="text-align-right"
                                      colSpan="6"
                                    >
                                      <b>Total Cost:</b>
                                    </td>
                                    <td className="text-align-right right">
                                      <CustomInput
                                        inputProps={{
                                          value: parseFloat(
                                            TotalCostIssued
                                          ).toFixed(2),
                                          disabled: true,
                                        }}
                                      />
                                    </td>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </GridItem>
                        </GridContainer>
                      ) : null}
                    </CardBody>
                  </Card>
                ) : null}
                <Card>
                  <CardHeader className="btn-right-outer" color="primary" icon>
                    <h4 className="margin-right-auto text-color-black">
                      Payment Method
                    </h4>
                    <div style={{ textAlign: "right", marginTop: "12px" }}>
                      {this.state.creditCardList.filter(
                        (x) => x.Status === "Active"
                      ).length === 0 ? (
                        // <i onClick={() => this.showDiv("isInvoiceVisible","Invoice")} class="fas fa-car"></i>
                        // <img
                        //   style={{ width: "32px", marginLeft: "20px" }}
                        //   src={carSVG}
                        //   onClick={() =>
                        //     this.showDiv("isPaymentMethod", "PaymentMethod")
                        //   }
                        // />
                        <Button
                          onClick={() =>
                            this.showDiv("isPaymentMethod", "PaymentMethod")
                          }
                          style={{ width: "70px", height: "20px" }}
                          color="primary"
                        >
                          Open CC
                        </Button>
                      ) : null}
                    </div>

                    <div style={{ textAlign: "right", marginTop: "12px" }}>
                      {this.state.bankList.filter((x) => x.Status === "Active")
                        .length === 0 ? (
                        // <i onClick={() => this.showDiv("isInvoiceVisible","Invoice")} class="fas fa-car"></i>
                        // <img
                        //   style={{ width: "32px", marginLeft: "20px" }}
                        //   src={tvSVG}
                        //   onClick={() =>
                        //     this.showDiv(
                        //       "isPaymentMethodBank",
                        //       "PaymentMethodBank"
                        //     )
                        //   }
                        // />
                        <Button
                          onClick={() =>
                            this.showDiv(
                              "isPaymentMethodBank",
                              "PaymentMethodBank"
                            )
                          }
                          style={{ width: "70px", height: "20px" }}
                          color="primary"
                        >
                          Open ACH
                        </Button>
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardBody className="shipment-cardbody">
                    {isPaymentMethod ? (
                      <GridContainer className="MuiGrid-justify-xs-center">
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="package-table accounts-table no-scroll">
                            <table>
                              <thead>
                                <tr>
                                  <th>Status</th>
                                  <th className="acc-wd200">Name on Card</th>
                                  <th className="acc-wd200">Card Number</th>
                                  <th>MM&nbsp;&nbsp;&nbsp;&nbsp;YYYY</th>
                                  <th>CVV&nbsp;&nbsp;&nbsp;&nbsp;Zipcode</th>
                                  <th className="right">Amount</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>{this.viewCreditCardList()}</tbody>
                            </table>
                          </div>
                        </GridItem>
                      </GridContainer>
                    ) : null}
                    {isPaymentMethodBank ? (
                      <GridContainer className="MuiGrid-justify-xs-center">
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="package-table accounts-table no-scroll">
                            <table>
                              <thead>
                                <tr>
                                  <th>Status</th>
                                  <th className="acc-wd200">Name on Bank</th>
                                  <th className="acc-wd200">Bank Name</th>
                                  <th>Account No</th>
                                  <th>Routing No</th>
                                  <th className="right">Amount</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>{this.viewBankList()}</tbody>
                            </table>
                          </div>
                        </GridItem>
                      </GridContainer>
                    ) : null}
                  </CardBody>
                </Card>
              </div>
              <div className="shipment-pane" id="tracking">
                <Card>
                  <CardHeader className="btn-right-outer" color="primary" icon>
                    <h4 className="margin-right-auto text-color-black">
                      Tracking
                    </h4>

                    <div style={{ textAlign: "right", marginTop: "12px" }}>
                      {this.state.trackingNumberList.filter(
                        (x) => x.Status === "Active"
                      ).length === 0 ? (
                        // <i onClick={() => this.showDiv("isInvoiceVisible","Invoice")} class="fas fa-car"></i>
                        // <img
                        //   style={{ width: "32px", marginLeft: "20px" }}
                        //   src={carSVG}
                        //   onClick={() =>
                        //     this.showDiv(
                        //       "isTrackingNumberVisible",
                        //       "TrackingNumberVisible"
                        //     )
                        //   }
                        // />
                        <Button
                          onClick={() =>
                            this.showDiv(
                              "isTrackingNumberVisible",
                              "TrackingNumberVisible"
                            )
                          }
                          style={{ width: "70px", height: "20px" }}
                          color="primary"
                        >
                          Open
                        </Button>
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardBody className="shipment-cardbody">
                    {isTrackingNumberVisible ? (
                      <GridContainer className="MuiGrid-justify-xs-center">
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="package-table">
                            <table className="Tracking-table">
                              <thead>
                                <tr>
                                  <th>Number</th>
                                  <th>Date</th>
                                  <th>Tracking Id</th>
                                  <th>Carrier</th>
                                  <th>Comments</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>{this.viewTrackingNumber()}</tbody>
                            </table>
                          </div>
                        </GridItem>
                      </GridContainer>
                    ) : null}
                  </CardBody>
                </Card>
                {this.state.PickupVendorName.value == 68 &&
                this.state.checkPickup == "1" ? (
                  <Card>
                    <CardHeader
                      className="btn-right-outer"
                      color="primary"
                      icon
                    >
                      <h4 className="margin-right-auto text-color-black">
                        Schedule Pickup
                      </h4>
                    </CardHeader>
                    <CardBody>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="package-table">
                            <table className="Tracking-table">
                              <thead>
                                <tr>
                                  <th>Number</th>
                                  {/* <th>Date</th> */}
                                  <th>Tracking Id</th>
                                  <th>Pickup Conf No.</th>
                                  <th>Pickup Date</th>
                                  <th>Comments</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>{this.viewPickupCofirmation()}</tbody>
                            </table>
                          </div>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                ) : null}

                <Card>
                  <CardHeader className="btn-right-outer" color="primary" icon>
                    <h4 className="margin-right-auto text-color-black">
                      Tracking
                    </h4>

                    <div style={{ textAlign: "right", marginTop: "12px" }}>
                      {this.state.trackingManualList.filter(
                        (x) => x.Status === "Active"
                      ).length === 0 ? (
                        // <i onClick={() => this.showDiv("isInvoiceVisible","Invoice")} class="fas fa-car"></i>
                        // <img
                        //   style={{ width: "32px", marginLeft: "20px" }}
                        //   src={tvSVG}
                        //   onClick={() =>
                        //     this.showDiv(
                        //       "isTrackingManualVisible",
                        //       "TrackingManualVisible"
                        //     )
                        //   }
                        // />
                        <Button
                          onClick={() =>
                            this.showDiv(
                              "isTrackingManualVisible",
                              "TrackingManualVisible"
                            )
                          }
                          style={{ width: "70px", height: "20px" }}
                          color="primary"
                        >
                          Open
                        </Button>
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardBody className="shipment-cardbody">
                    {isTrackingManualVisible ? (
                      <GridContainer className="MuiGrid-justify-xs-center">
                        <GridItem xs={12} sm={12} md={12}>
                          <div className="package-table no-scroll">
                            <table className="Tracking-table">
                              <thead>
                                <tr>
                                  <th>Actual Date</th>
                                  <th>Actual Time</th>
                                  <th>Show Date</th>
                                  <th>Show Time</th>
                                  <th colSpan={2}>Updates</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>{this.viewTrackingManual()}</tbody>
                            </table>
                          </div>
                        </GridItem>
                      </GridContainer>
                    ) : null}
                  </CardBody>
                </Card>
              </div>
              <div className="shipment-pane" id="documentations">
                <Card>
                  <CardHeader className="btn-right-outer" color="primary" icon>
                    <h4 className="margin-right-auto text-color-black">
                      Documentation
                    </h4>
                  </CardHeader>
                  <CardBody className="shipment-cardbody">
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={12} md={12}>
                        <div className="custom-react-table">
                          <ReactTable
                            data={this.state.Attachments.filter(
                              (x) => x.Status != "Delete"
                            ).sort(
                              (a, b) =>
                                parseFloat(a.Index) - parseFloat(b.Index)
                            )}
                            sortable={true}
                            filterable={true}
                            resizable={false}
                            minRows={2}
                            columns={columns}
                            defaultPageSize={10}
                            align="left"
                            className="-striped -highlight"
                          />
                        </div>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader className="btn-right-outer" color="primary" icon>
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
              </div>
            </div>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12}>
            <Card>
              <CardHeader className="btn-right-outer" color="primary" icon>
                <CardIcon color="primary">
                  <FlightTakeoff />
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
          </GridItem>
        </GridContainer>

        <div>
          <Dialog
            open={this.state.confirmAllClear}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Confirm AllClear ?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to change?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ confirmAllClear: false })}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.AllClearConfirm()}
                color="primary"
                autoFocus
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={this.state.deleteopen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to delete?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ deleteopen: false })}
                color="secondary"
              >
                Cancel
              </Button>
              {/* {this.state.Access.DeleteAccess === 1 ? */}
              <Button
                onClick={() => this.deleteShipment()}
                color="primary"
                autoFocus
              >
                Delete
              </Button>
              {/* :null} */}
            </DialogActions>
          </Dialog>
        </div>

        {/* Diplicate Popup */}

        <div>
          <Dialog
            open={this.state.createopen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Create Duplicate</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to create duplicate?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ createopen: false })}
                color="secondary"
              >
                Cancel
              </Button>
              {/* {this.state.Access.DeleteAccess === 1 ? */}

              <Button
                onClick={() => this.createDuplicate(true)}
                color="primary"
                autoFocus
              >
                Create & Open
              </Button>

              <Button
                onClick={() => this.createDuplicate(false)}
                color="primary"
                autoFocus
              >
                Create
              </Button>

              {/* :null} */}
            </DialogActions>
          </Dialog>
        </div>

        {/* Confirm Popup */}

        <div>
          <Dialog
            open={this.state.successOpened}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Successfully</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Duplicate shipment created successfull.
                <p>Tracking Number {this.state.dupTracking}</p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ successOpened: false })}
                color="secondary"
              >
                Cancel
              </Button>
              {/* {this.state.Access.DeleteAccess === 1 ? */}
              {/* <Button
                onClick={() => this.createDuplicate()}
                color="primary"
                autoFocus
              >
                Create
              </Button> */}
              {/* :null} */}
            </DialogActions>
          </Dialog>
        </div>

        {/* Mail popup start */}
        <div>
          <Dialog
            open={this.state.MailOpenPopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Email Confirmation
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to Send Review Email?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.SendEmailCancel()} color="secondary">
                Cancel
              </Button>
              {/* {this.state.Access.DeleteAccess === 1 ? */}
              <Button
                onClick={() => this.SendDeliveredEmail()}
                color="primary"
                autoFocus
              >
                Send
              </Button>
              {/* :null} */}
            </DialogActions>
          </Dialog>
        </div>
        {/* End mail  */}
        <div>
          <Dialog
            open={this.state.openpayment}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Card Details</DialogTitle>
            <DialogContent>
              <CustomInput
                type="number"
                labelText="CardType"
                name="CardType"
                id="TotalPackages"
                inputProps={{
                  onChange: (event) => {
                    this.PaymentPayChange(event, "CardType");
                  },
                  value: this.state.PaymentShowData.CardType,
                  disabled: true,
                }}
              />
              <CustomInput
                type="number"
                labelText="CardExpiry Date"
                name="CardExpiry Date"
                id="TotalPackages"
                inputProps={{
                  value:
                    this.state.PaymentShowData.CardExpiryMonth +
                    "/" +
                    this.state.PaymentShowData.CardExpiryYear,
                  disabled: true,
                }}
              />
              <CustomInput
                type="number"
                labelText="CardName"
                name="CardName"
                id="TotalPackages"
                inputProps={{
                  onChange: (event) => {
                    this.PaymentPayChange(event, "CardName");
                  },
                  value: this.state.PaymentShowData.CardName,
                  disabled: true,
                }}
              />
              <CustomInput
                type="number"
                labelText="CardCVV"
                name="CardCVV"
                id="CardCVV"
                inputProps={{
                  onChange: (eee) => {
                    this.PaymentPayChange(eee, "CardCVV");
                  },
                  value:
                    Number(this.state.PaymentShowData.CardCVV) == 0
                      ? this.state.PaymentShowData.CVV
                      : this.state.PaymentShowData.CardCVV,
                  disabled:
                    Number(this.state.PaymentShowData.CardCVV) == 0
                      ? false
                      : true,
                }}
              />
              <CustomInput
                type="number"
                labelText="CardNumber"
                name="CardNumber"
                id="TotalPackages"
                inputProps={{
                  onChange: (event) => {
                    this.PaymentPayChange(event, "CardNumber");
                  },
                  value:
                    this.state.Access.DeleteAccess !== 1
                      ? "XXXX XXXX XXXX " +
                        this.state.PaymentShowData.CardNumber?.toString().slice(
                          this.state.PaymentShowData.CardNumber.length - 4
                        )
                      : this.state.PaymentShowData.CardNumber,
                  disabled: true,
                }}
              />
              <CustomInput
                type="number"
                labelText="CardZipCode"
                name="CardZipCode"
                id="TotalPackages"
                inputProps={{
                  onChange: (event) => {
                    this.PaymentPayChange(event, "CardZipCode");
                  },
                  value: this.state.PaymentShowData.CardZipCode,
                  disabled: true,
                }}
              />
            </DialogContent>

            <DialogTitle id="alert-dialog-title">Charge Details</DialogTitle>
            <DialogContent>
              <div className="select-spl">
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="packagetype"
                    className={classes.selectLabel}
                  >
                    Charge Type:
                  </InputLabel>
                  <Select
                    MenuProps={{
                      className: classes.selectMenu,
                    }}
                    classes={{
                      select: classes.select,
                    }}
                    value={this.state.PaymentShowData.ChargeType}
                    onChange={(event) => {
                      this.state.PaymentShowData.ChargeType =
                        event.target.value;
                    }}
                  >
                    <MenuItem
                      value={"Charge"}
                      classes={{
                        root: classes.selectMenuItem,
                      }}
                    >
                      Charge
                    </MenuItem>
                    {/* <MenuItem
                      value={"Refund"}
                      classes={{
                        root: classes.selectMenuItem,
                      }}
                    >
                      Refund
                    </MenuItem> */}
                  </Select>
                </FormControl>
              </div>
              <CustomInput
                type="number"
                labelText="TrackingNumber"
                name="TrackingNumber"
                id="TotalPackages"
                inputProps={{
                  onChange: (event) => {
                    this.PaymentPayChange(event, "TrackingNumber");
                  },
                  value: this.state.TrackingNumber,
                  disabled: true,
                }}
              />
              <CustomInput
                type="number"
                labelText="Amount"
                name="Amount"
                id="TotalPackages"
                inputProps={{
                  onChange: (event) => {
                    this.PaymentPayChange(event, "Amount");
                  },
                  value: this.state.PaymentShowData.InvoiceAmount,
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ openpayment: false })}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.validateTransactionLimit()}
                color="primary"
                autoFocus
              >
                Charge Now
              </Button>
            </DialogActions>
          </Dialog>
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
                        this.state.sendMailInfo.Type === "InvoiceMessage" ||
                        this.state.useraccess.userModuleAccess[15]
                          .DeleteAccess === 0
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
                        this.state.sendMailInfo.Type === "InvoiceMessage" ||
                        this.state.useraccess.userModuleAccess[15]
                          .DeleteAccess === 0
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
                        this.state.sendMailInfo.Type === "InvoiceMessage" ||
                        this.state.useraccess.userModuleAccess[15]
                          .DeleteAccess === 0
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
                  {this.state.sendMailInfo.Type === "Invoice" ||
                  this.state.sendMailInfo.Type === "Contract" ||
                  this.state.sendMailInfo.Type === "InvoiceMessage" ||
                  this.state.sendMailInfo.Type === "PrepaidLables" ? (
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
              {this.state.sendMailInfo.Type !== "InvoiceMessage" ? (
                <Button
                  onClick={() =>
                    this.handleapiSendMail(this.state.sendMailInfo.Type)
                  }
                  color="primary"
                  autoFocus
                >
                  Send
                </Button>
              ) : null}
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            className="esign-modal"
            open={this.state.generateEsign}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">E Sign</DialogTitle>
            <DialogContent>
              <EsignEmployee_Temp
                InsuranceType={this.state.InsuranceType}
                ContainerType={this.state.ContainerType}
                MovingBackToIndia={{
                  DocumentMovingBackToIndia: this.state
                    .DocumentMovingBackToIndia,
                  DocumentNameAsPerPassport: this.state
                    .DocumentNameAsPerPassport,
                  DocumentYearsOutsideIndia: this.state
                    .DocumentYearsOutsideIndia,
                  DocumentStayInIndia: this.state.DocumentStayInIndia,
                  DocumentLatestArrivalDate: this.state
                    .DocumentLatestArrivalDate,
                  DocumentAppliedForTR: this.state.DocumentAppliedForTR,
                  DocumentAbleToProvidePassport: this.state
                    .DocumentAbleToProvidePassport,
                  DocumentVisaValidDate: this.state.DocumentVisaValidDate,
                  DocumentArrivalCategory: this.state.DocumentArrivalCategory,
                }}
                filterlist={
                  this.props.history.location.state &&
                  this.props.history.location.state.filterlist !== undefined
                    ? this.props.history.location.state.filterlist
                    : null
                }
                shipmentstatusList={this.state}
                TotalCFT={this.state.DocumentTotalCFT}
                ShippingID={
                  this.props.location.state &&
                  this.props.location.state.ShipppingID
                    ? this.props.location.state.ShipppingID
                    : null
                }
                InvoiceData={this.state.DocumentInvoiceData}
                TotalReceivedCost={this.state.TotalReceivedCost}
                DatePaidOn={this.state.DatePaidOn}
                FromAddress={this.state.FromAddressObj}
                DocumentManagedBy={this.state.DocumentManagedBy}
                TrackingNumber={this.state.TrackingNumber}
                ToAddress={this.state.ToAddressObj}
                Invoicedata={this.state.paymentList}
                isSubmitClick={this.state.submitEsign}
                generatePath={this.generatePath}
                sendState={this.sendState()}
                sortlist={
                  this.props.history.location.state &&
                  this.props.history.location.state.sortlist !== undefined
                    ? this.props.history.location.state.sortlist
                    : null
                }
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  this.setState({ generateEsign: false, submitEsign: false })
                }
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.submitEsign()}
                color="primary"
                autoFocus
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={this.state.IsfedexLabelGeneratePickup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Pickup Schedule"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to generate a Pickup?
                <br />
                Pickup Date: {this.state.PickupDate}
                <br />
                Pickup Time: {this.state.ReadyTime} - {this.state.AvailableTime}
                <br />
                Special Instruction : {this.state.NotesforPickup}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleClickCancelClosePickup}
                color="primary"
              >
                Close
              </Button>
              <Button
                onClick={() =>
                  this.GenratePickupConfirmation(
                    this.state.FedexTrackNumber,
                    this.state.FedexTrackAddorUpdate,
                    this.state.PickupID
                  )
                }
                color="primary"
                autoFocus
              >
                Generate Pickup
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={this.state.IsfedexLabelOpenPickup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            overlayStyle={{ backgroundColor: "transparent" }}
            className="PickupCancel"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Cancellation"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to cancel a Pickup?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClickCancelPickup} color="primary">
                Close
              </Button>
              <Button
                onClick={() =>
                  this.deleteFedexlabelPickup(
                    this.state.cancelTrackNumber,
                    this.state.cancelPickupID
                  )
                }
                color="primary"
                autoFocus
              >
                Cancel Pickup
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={this.state.IsfedexLabelOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Cancellation"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to cancel a label?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClickCancel} color="primary">
                Close
              </Button>
              <Button
                onClick={() =>
                  this.deleteFedexlabel(this.state.setTrackingValue)
                }
                color="primary"
                autoFocus
              >
                Cancel Label
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={this.state.ShowGeneratedPriperdlable}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Confirm you want to generate lable?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to generate lable for this Service? <br />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  this.setState({ ShowGeneratedPriperdlable: false })
                }
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.isGeneratedPriperdlable()}
                color="primary"
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        {/* {Doc Dialog} */}
        <div>
          <Dialog
            open={this.state.IsAESOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Automated Export System (AES) Filing Requirement
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                As export/commercial value of your shipment is more than $2500
                value Automated Export System (AES) filing is required.
                Additional AES filing fees of $75.00 will be applied on your
                shipment.{" "}
                <a href="https://www.cbp.gov/sites/default/files/assets/documents/2016-Mar/AES%20Key%20Words%20Document.pdf">
                  Click here
                </a>{" "}
                to review AES Quick Reference Guide{" "}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ IsAESOpen: false })}
                color="secondary"
                className="aesfilling-btn"
              >
                <b>REJECT</b>
                <span>Change Commercial Value</span>
              </Button>
              <Button
                onClick={() => this.addAESFillingInvoice()}
                color="primary"
                className="aesfilling-btn"
              >
                <b>ACCEPT</b>
                <span>Charge AES Filing Fees</span>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        {/* --------------------HBL POPUP-------------- */}

        <div>
          <Dialog
            open={this.state.HBLdocOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Genrate HBL</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div className="hbl-outer">
                  <div id="HBL" class="page">
                    <table className="hbl-table">
                      <tr>
                        <th className="text-left t-50">
                          SFL WORLDWIDE LLC <br></br>
                          <small>FMC-OTI NO. 025184N</small>
                        </th>
                        <th className="text-right t-50">
                          BILL OF LADING<br></br>
                          <small>FOR PORT-TO-PORT OR COMBINED TRANSPORT</small>
                        </th>
                      </tr>
                    </table>
                    <table className="hbl-table">
                      <tr>
                        <td rowSpan={3} className="t-50">
                          SHIPPER/EXPORTER COMPLETE NAME AND ADDRESS<br></br>
                          <textarea
                            id="ShipperExportor"
                            name="Body"
                            style={{
                              width: "100%",
                              height: "120px",
                              display: "block",
                            }}
                            labelText="Body"
                            //KRUTIU
                            value={this.state.ShipperExportor}
                            onChange={(e) =>
                              this.HselectChange(e, "ShipperExportor")
                            }
                          ></textarea>
                          <div
                            id="ShipperExportordiv"
                            dangerouslySetInnerHTML={{
                              __html: this.state.ShipperExportor,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                        <td className="t-25">
                          BOOKING NUMBER<br></br>
                          <input
                            id="BookingNumber"
                            name="Body"
                            style={{
                              display: "block",
                            }}
                            value={BookingNumber}
                            onChange={(e) =>
                              this.HselectChange(e, "BookingNumber")
                            }
                          />
                          <div
                            id="BookingNumberdiv"
                            dangerouslySetInnerHTML={{
                              __html: BookingNumber,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                        <td className="t-25">
                          CONTAINER NUMBER<br></br>
                          <input
                            id="HContainerNumber"
                            style={{
                              display: "block",
                            }}
                            value={HContainerNumber}
                            onChange={(e) =>
                              this.HselectChange(e, "HContainerNumber")
                            }
                          />
                          <div
                            id="HContainerNumberdiv"
                            dangerouslySetInnerHTML={{
                              __html: HContainerNumber,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="t-50">
                          BILL OF LANDING NUMBER<br></br>
                          <input
                            id="BLNumber"
                            style={{
                              display: "block",
                            }}
                            value={BLNumber}
                            onChange={(e) => this.HselectChange(e, "BLNumber")}
                          />
                          <div
                            id="BLNumberdiv"
                            dangerouslySetInnerHTML={{
                              __html: BLNumber,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="t-50">
                          EXPORT REFERENCES<br></br>
                          <input
                            id="TrackingNumber"
                            style={{
                              display: "block",
                            }}
                            value={TrackingNumber}
                            onChange={(e) =>
                              this.HselectChange(e, "TrackingNumber")
                            }
                          />
                          <div
                            id="TrackingNumberdiv"
                            dangerouslySetInnerHTML={{
                              __html: TrackingNumber,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                      </tr>
                    </table>
                    <table className="hbl-table">
                      <tr>
                        <td rowSpan={2} className="t-50">
                          CONSIGNED TO<br></br>
                          <textarea
                            id="ConsignedTo"
                            name="Body"
                            style={{
                              width: "100%",
                              height: "100px",
                              display: "block",
                            }}
                            labelText="Body"
                            //KRUTIU
                            value={this.state.ConsignedTo}
                            onChange={(e) =>
                              this.HselectChange(e, "ConsignedTo")
                            }
                          ></textarea>
                          <div
                            id="ConsignedTodiv"
                            dangerouslySetInnerHTML={{
                              __html: this.state.ConsignedTo,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                        <td className="t-50">
                          FORWARDING AGENT FMC NO.
                          <input
                            id="FMCnumber"
                            style={{
                              display: "block",
                            }}
                            value={FMCnumber}
                            onChange={(e) => this.HselectChange(e, "FMCnumber")}
                          />
                          <div
                            id="FMCnumberdiv"
                            dangerouslySetInnerHTML={{
                              __html: FMCnumber,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={2} className="t-50">
                          POINT (STATE) OF ORIGIN OR FTZ NUMBER<br></br>
                          <textarea
                            name="Body"
                            style={{
                              width: "100%",
                              height: "60px",
                              display: "block",
                            }}
                            labelText="Body"
                            id="pointState"
                            value={pointState}
                            onChange={(e) =>
                              this.HselectChange(e, "pointState")
                            }
                          ></textarea>
                          <div
                            id="pointStatediv"
                            dangerouslySetInnerHTML={{
                              __html: pointState,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="t-50">
                          NOTIFY PARTY/INTERMEDIATE CONSIGNEE<br></br>
                          <div className="hbl-textarea">
                            <textarea
                              id="border-hide"
                              name="Body"
                              style={{
                                width: "100%",
                                height: "100px",
                                display: "block",
                              }}
                              labelText="Body"
                              value={this.state.ConsigneeDetails}
                              onChange={(e) =>
                                this.HselectChange(e, "ConsigneeDetails")
                              }
                            ></textarea>
                            <div
                              id="border-hidediv"
                              dangerouslySetInnerHTML={{
                                __html: this.state.ConsigneeDetails,
                              }}
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
                            />
                          </div>
                        </td>
                        <td className="t-50">
                          FOR DELIVERY PLEASE APPLY TO <br />
                          <textarea
                            id="APPLYTO"
                            name="Body"
                            style={{ width: "100%", height: "100px" }}
                            labelText="Body"
                            value={this.state.APPLYTO}
                            onChange={(e) => this.HselectChange(e, "APPLYTO")}
                          ></textarea>
                          <div
                            id="APPLYTOdiv"
                            dangerouslySetInnerHTML={{
                              __html: this.state.APPLYTO,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                      </tr>
                    </table>
                    <table className="hbl-table">
                      <tr>
                        <td className="t-25">
                          VESSEL<br></br>
                          <textarea
                            id="Vessel"
                            name="Body"
                            style={{
                              width: "100%",
                              height: "50px",
                              display: "block",
                            }}
                            labelText="Body"
                            value={Vessel}
                            onChange={(e) => this.HselectChange(e, "Vessel")}
                          ></textarea>
                          <div
                            id="Vesseldiv"
                            dangerouslySetInnerHTML={{
                              __html: Vessel,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                        <td className="t-25">
                          PORT OF LOADING/EXPORT<br></br>
                          <textarea
                            id="Export"
                            name="Body"
                            style={{
                              width: "100%",
                              height: "50px",
                              display: "block",
                            }}
                            labelText="Body"
                            value={Export}
                            onChange={(e) => this.HselectChange(e, "Export")}
                          ></textarea>
                          <div
                            id="Exportdiv"
                            dangerouslySetInnerHTML={{
                              __html: Export,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                        <td className="t-50">
                          TYPE OF MOVE<br></br>
                          <textarea
                            id="TypeOfMove"
                            name="Body"
                            style={{
                              width: "100%",
                              height: "50px",
                              display: "block",
                            }}
                            labelText="Body"
                            value={TypeOfMove}
                            onChange={(e) =>
                              this.HselectChange(e, "TypeOfMove")
                            }
                          ></textarea>
                          <div
                            id="TypeOfMovediv"
                            dangerouslySetInnerHTML={{
                              __html: TypeOfMove,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="t-25">
                          FOREIGN PORT OF UNLOADING<br></br>
                          <textarea
                            id="Unloading"
                            name="Body"
                            style={{
                              width: "100%",
                              height: "50px",
                              display: "block",
                            }}
                            labelText="Body"
                            value={Unloading}
                            onChange={(e) => this.HselectChange(e, "Unloading")}
                          ></textarea>
                          <div
                            id="Unloadingdiv"
                            dangerouslySetInnerHTML={{
                              __html: Unloading,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                        <td className="t-25">
                          PLACE OF DELIVERY BY ON-CARRIER<br></br>
                          <textarea
                            id="develiverd"
                            name="Body"
                            style={{
                              width: "100%",
                              height: "50px",
                              display: "block",
                            }}
                            labelText="Body"
                            value={develiverd}
                            onChange={(e) =>
                              this.HselectChange(e, "develiverd")
                            }
                          ></textarea>
                          <div
                            id="develiverddiv"
                            dangerouslySetInnerHTML={{
                              __html: develiverd,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                        <td className="t-50"></td>
                      </tr>
                      <tr>
                        <td className="t-50" colSpan={2}>
                          CARRIER'S RECEIPT
                        </td>
                        <td className="t-50">
                          PARTICULARS FURNISHED BY SHIPPER
                        </td>
                      </tr>
                    </table>
                    <table className="hbl-table">
                      <tr>
                        <th>MARKS AND NUMBER</th>
                        <th>Total No. of PKGS.</th>
                        <th>DESCRIPTION OF PACKAGES AND GOODS</th>
                        <th>GROSS WEIGHT</th>
                        <th>MEASUREMENT</th>
                      </tr>
                      <tr>
                        <td>
                          <textarea
                            id="Sequencelist"
                            name="Body"
                            style={{
                              width: "100%",
                              height: "150px",
                              display: "block",
                            }}
                            labelText="Body"
                            value={this.state.Sequencelist}
                            onChange={(e) =>
                              this.HselectChange(e, "Sequencelist")
                            }
                          ></textarea>
                          <div
                            id="Sequencelistdiv"
                            dangerouslySetInnerHTML={{
                              __html: this.state.Sequencelist,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                        <td>
                          <textarea
                            id="PackageNumber"
                            name="Body"
                            style={{
                              width: "100%",
                              height: "150px",
                              display: "block",
                            }}
                            labelText="Body"
                            value={PackageNumber}
                            onChange={(e) =>
                              this.HselectChange(e, "PackageNumber")
                            }
                          ></textarea>
                          <div
                            id="PackageNumberdiv"
                            dangerouslySetInnerHTML={{
                              __html: PackageNumber,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                        <td>
                          <textarea
                            id="description"
                            name="Body"
                            style={{
                              width: "100%",
                              height: "150px",
                              display: "block",
                            }}
                            labelText="Body"
                            value={description}
                            onChange={(e) =>
                              this.HselectChange(e, "description")
                            }
                          ></textarea>
                          <div
                            id="descriptiondiv"
                            dangerouslySetInnerHTML={{
                              __html: description,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                        <td>
                          <textarea
                            id="WEIGHT"
                            name="Body"
                            style={{
                              width: "100%",
                              height: "150px",
                              display: "block",
                            }}
                            labelText="Body"
                            value={WEIGHT}
                            onChange={(e) => this.HselectChange(e, "WEIGHT")}
                          ></textarea>
                          <div
                            id="WEIGHTdiv"
                            dangerouslySetInnerHTML={{
                              __html: WEIGHT,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                        <td>
                          <textarea
                            id="MEASUREMENT"
                            name="Body"
                            style={{
                              width: "100%",
                              height: "150px",
                              display: "block",
                            }}
                            labelText="Body"
                            value={MEASUREMENT}
                            onChange={(e) =>
                              this.HselectChange(e, "MEASUREMENT")
                            }
                          ></textarea>
                          <div
                            id="MEASUREMENTdiv"
                            dangerouslySetInnerHTML={{
                              __html: MEASUREMENT,
                            }}
                            style={{ display: "none", whiteSpace: "pre-line" }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Kgs</td>
                        <td>CBM</td>
                      </tr>
                    </table>
                    <table className="hbl-table">
                      <tr>
                        <td colSpan={2}>
                          DECLARED VALUE (FOR AD VALOREM PURPOSE ONLY). (REFER
                          TO CLAUSE 26 ON REVERSE HEREOFF) IN US$
                        </td>
                      </tr>
                      <tr>
                        <td className="t-50">
                          In accepting this bill of lading, any local customs or
                          privileges to the contrary notwithstanding, the
                          shipper, consignee and owner of the goods and the
                          holder of this bill of lading, agree to be bound by
                          all the stipulations, exceptions and conditions stated
                          herein whether written, printed, stamped or
                          incorporated on the front or reverse side hereof as
                          fully as if they were all signed by such shipper,
                          consignee, owner or holder<br></br>
                          In witness whereof three (3) bills of lading, all of
                          the tenor and date have been signed, one of which
                          being accomplished, the others to stand void.
                        </td>
                        <td className="t-50">
                          FREIGHT AND CHARGES<br></br>
                          DESCRIPTION OF CHARGES <br></br>FREIGHT PREPAID
                          <img src={stamp} width="100" border="0" />
                        </td>
                      </tr>
                      <tr>
                        <td className="t-50">
                          BY : SFL WORLDWIDE LLC, AS A CARRIER
                          <img src={pshah} width="100" border="0" />
                        </td>
                        <td className="t-50">TOTAL PREPAID</td>
                      </tr>
                      <tr>
                        <td className="t-50">
                          DATE (MM/DD/YYYY)<br></br>
                          {this.state.HCreatedDate}
                        </td>
                        <td className="t-50">TOTAL COLLECT</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setState({ HBLdocOpen: false })}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.generatePDF()}
                color="primary"
                autoFocus
              >
                Genrate
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="shipment-submit">
          <div className="left">
            {this.state.Access.DeleteAccess === 1 ? (
              <Button
                justify="center"
                color="danger"
                onClick={() => this.handleDelete()}
              >
                Delete
              </Button>
            ) : null}

            <Button
              justify="center"
              color="primary"
              onClick={() => this.handleDuplicate()}
            >
              Duplicate
            </Button>
          </div>
          <div className="center">
            {this.props.history.location.state &&
            this.props.history.location.state.searchData ? (
              <Button onClick={() => this.handleSearchBack()} color="secondary">
                Back To Search
              </Button>
            ) : null}
          </div>
          <div className="right">
            {this.state.Access.WriteAccess === 1 && !this.state.isLock ? (
              <>
                <Button
                  justify="center"
                  color="rose"
                  onClick={() => this.handleSave(false)}
                >
                  Save
                </Button>

                <Button
                  justify="center"
                  color="primary"
                  onClick={() => this.handleSave(true)}
                >
                  Save & Exit
                </Button>
              </>
            ) : null}

            <Button
              justify="center"
              color="secondary"
              onClick={() => this.handleCancel()}
            >
              Cancel
            </Button>
          </div>
        </div>
        <iframe
          id="invoice"
          style={{ visibility: "hidden", height: "0px" }}
          height="100%"
          width="100%"
          // src="http://phpstack-773983-2884162.cloudwaysapps.com/auth/PrintInvoice"
          src="https://hub.sflworldwide.com/auth/PrintInvoice"
        ></iframe>
      </div>
    );
  }
}
ShipmentCustom.propTypes = {
  classes: PropTypes.object,
};

export default withStyles()(ShipmentCustom);
