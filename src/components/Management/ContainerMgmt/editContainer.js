import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Note from "@material-ui/icons/Assessment";
import GridContainer from "components/Grid/GridContainer.js";
import { FormHelperText, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Icon from "@material-ui/core/Icon";
import InfoIcon from "@material-ui/icons/Info";
import Tooltip from "@material-ui/core/Tooltip";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// import stamp from "../../assets/img/HBL/stamp.png";
// import pshah from "../../assets/img/HBL/pshah.png";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import Datetime from "react-datetime";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import moment from "moment";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import SimpleBackdrop from "../../../utils/general";
import { CommonConfig } from "../../../utils/constant";
import api from "../../../utils/apiClient";
import { fileBase } from "../../../utils/config";
import cogoToast from "cogo-toast";
import FormControl from "@material-ui/core/FormControl";
import ReactTable from "react-table";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import stamp from "../../../assets/img/HBL/stamp.png";
import pshah from "../../../assets/img/HBL/pshah.png";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};
const useStyles = () => makeStyles(styles);
const classes = useStyles();

class editContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ContainerName: "",
      containernameErr: false,
      containernameHelperText: "",

      ContainerShortName: "",
      containershortnameErr: false,
      containershortnameHelperText: "",

      IGMNumber: "",
      IGMNumberErr: false,
      IGMNumberHelperText: "",

      ContainerSize: "",
      ContainerSizeList: [],
      SetShiprecordHBL: false,
      ShipmentListHBL: [],
      containersizeErr: false,
      containersizeHelperText: "",

      CurrentStatus: "",
      CurrentStatusList: [],
      currentstatusErr: false,
      currentstatusHelperText: "",

      ContainerStatus: "",
      containerstatusErr: false,
      containerstatusHelperText: "",

      ContainerNumber: "",
      containernumberErr: false,
      containernumberHelperText: "",
      generatedata:"one",

      SealNumber: "",
      TotalPackagesCount: 0,
      TotalCFTCount: 0,
      TotalTVCount: 0,
      TotalPackagesCountHBL: 0,
      TotalCFTCountHBL: 0,
      PrimaryID: 0,
      TotalTVCountHBL: 0,
      sealnumberErr: false,
      sealnumberHelperText: "",

      BookingNumber: "",
      bookingnumberErr: false,
      bookingnumberHelperText: "",

      BOLNumber: "",
      BOLnumberErr: false,
      BOLnumberHelperText: "",
      ShippingIDDel: "",
      DeleteRequest: false,

      PointOfOrigin: "",
      pointoforiginErr: false,
      pointoforiginHelperText: "",

      PortOfLoading: "",
      portofloadingErr: false,
      portofloadingHelperText: "",

      PortOfUnloading: "",
      portofunloadingErr: false,
      portofunloadingHelperText: "",

      PlaceOfDeliveryByOnCarrier: "",
      placeofdeliveryErr: false,
      placeofdeliveryHelperText: "",

      VesselNumber: "",
      vesselnumberErr: false,
      vesselnumberHelperText: "",

      HBLDate: "",
      hbldateErr: false,
      hbldateHelperText: "",

      IGMDate: "",
      IGMDateErr: false,
      IGMDateHelperText: "",

      IGMInwardDate: "",
      IGMInwardDateErr: false,
      IGMInwardDateHelperText: "",

      LoadDate: "",
      loaddateErr: false,
      loaddateHelperText: "",

      SailingDate: "",
      sailingdateErr: false,
      sailingdateHelperText: "",

      ArrivalDate: "",
      arrivaldateErr: false,
      arrivaldateHelperText: "",

      FreightForwarder: "",
      FreightForwarderList: [],
      freightforwarderErr: false,
      freightforwarderHelperText: "",

      Carrier: "",
      CarrierList: [],
      carrierErr: false,
      carrierHelperText: "",
      RemoveShipID: "",
      HBLYesNOREC: [],
      UpdateShipID: "",
      UpdateShipIDHBLSET: "",
      SetShiprecord: false,
      Base: "",

      NotifyPartyName: "",
      NotifyPartyPhone: "",
      GSTNo: "",
      NotifyPartyEmail: "",
      NotifyPartyAddr1: "",
      NotifyPartyAddr2: "",
      NotifyPartyAddr3: "",

      NotifyPartyCity: "",
      NotifyPartyState: "",
      NotifyPartyZipCode: "",

      NotifyParty: "",
      NotifyPartyList: [],
      notifypartyErr: false,
      notifypartyHelperText: "",

      CustomsBroker: "",
      CustomsBrokerList: [],
      customsbrokerErr: false,
      customsbrokerHelperText: "",
      notes: [],
      Attachments: [],
      DocumentList: [],
      AttachmentList: [],
      Access: [],
      CreatedBy: "",
      CreatedOn: "",

      packedBy: [
        { value: "one", label: "Select one" },
        { value: "HBL", label: "HBL" },
        { value: "PL", label: "PL" },
        { value: "DO", label: "DO" },
        
      ],

      // HBL Start

      HBLdocOpen: false,
      PLdocOpen: false,
      DOdocOpen: false,
      PackageNumber: "",
      description: "",
      WEIGHT: "",
      MEASUREMENT: "",
      BookingNumber: "",
      HTrackingNumber: "",
      HContainerNumber: "",
      PNotifyGst: "",
      PNotifyEmail: "",
      pPassportNumber:"",
      NotifyNameParty:"",
      FcontactName:"",
      TcontactName:"",
      PLToAddress:"",
      PLFromAddress:"",
      PnotifyPhone:"",
      BLNumber: "",
      pTrackingNumber: "",
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

      // HBL END

      // DO Start
      DOConsignee:"",
      DONotifyParty:"",
      DoDeliverTo:"",
      DoMBLNo:"",
      DoVessel:"",
      DoHBLNo:"",
      DoLoadingPort:"",
      DoIGMNo:"",
      DoITMSub:"",
      DoContainerNum:"",
      DoSealNumber:"",
      DoDescription:"PIECES OF HOUSEHOLD GOODS AND PERSONAL EFFECTS",

      DOSequencelist: "",
      DoPackageNumber: "",
      DOWEIGHT: "",
      DOMEASUREMENT: "",

      objAttachment: {
        Index: 0,
        FileName: "",
        Status: "Active",
        DocumentCreatedOn: moment().format(CommonConfig.dateFormat.dateOnly),
        DocumentCreatedBy: CommonConfig.loggedInUserData().Name,
      },
      Steps: [
        {
          stepName: "Container Details",
          stepId: "containerdetails",
          classname: "active",
        },
        {
          stepName: "Shipments",
          stepId: "shipments",
          classname: "inactive",
        },
        {
          stepName: "Sequence Number",
          stepId: "sequencenumber",
          classname: "inactive",
        },
        {
          stepName: "HBL",
          stepId: "hblShipping",
          classname: "inactive",
        },
        {
          stepName: "Documentation",
          stepId: "documentations",
          classname: "inactive",
        },
        {
          stepName: "Tracking",
          stepId: "tracking",
          classname: "inactive",
        },
      ],
      trackingManualList: [],
      ShipmentList: [],
      HBLShipmentList: [],
      serviceNameData: [],
      Sequence: [],
      filterProps: [],
      sortProps: [],
      ShipmentStatus: "",
      ShipmentStatusList: [],
      popupOpen: false,
      confirmStatus: false,
      redirect: false,
    };
  }

  async componentDidMount() {
    if(CommonConfig.getUserAccess("Container Management").ReadAccess === 0){
          CommonConfig.logoutUserdata()
        }
    this.setState({ Base: CommonConfig.BaseUrl });
    //  this.setState({ Base: "http://localhost:3000/" });
    await this.showHide();
    await this.stringMapSize();
    await this.stringmapStatus();
    await this.vendorList();
    await this.getStatusList();
    this.setState({
      Access: CommonConfig.getUserAccess("Container Management"),
      Attachments: [this.state.objAttachment],
    });
    await this.getContainerByID();
    await this.getShipmentByContainer();
    await this.getManualTracking();
    // await this.getemaildata();
  }

  async reCallApi() {
    await this.getContainerByID();
    await this.getShipmentByContainer();
    await this.getManualTracking();
    await this.getStatusList();
  }

  getStatusList = () => {
    try {
      let data = {
        stringMapType: "SHIPMENTSTATUS",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          this.setState({ ShipmentStatusList: result.data });
          console.log("shippp", this.state.ShipmentStatusList);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };
  typeChange = (event, type) => {
    if (type === "ShipmentStatus" && event.target.value !== "") {
      this.setState({ ShipmentStatus: event.target.value });
    } else {
      this.setState({ confirmStatus: false });
    }
  };
  shipmentStatusList = () => {
    return this.state.ShipmentStatusList.map((container) => {
      if (container.Description != "All") {
        return (
          <MenuItem value={container.Description}>
            {container.Description}
          </MenuItem>
        );
      }
    });
  };
  confirmShipStatus = () => {
    this.setState({ confirmStatus: true });
    if (this.state.confirmStatus === true) {
      this.handleSubmit(this.state.redirect);
    }
    //this.setState({ popupOpen: false, ShipmentStatus: "" });
  };
  showHide() {
    document.getElementById("containerdetails").style.display = "block";
    document.getElementById("shipments").style.display = "none";
    document.getElementById("hblShipping").style.display = "none";
    document.getElementById("sequencenumber").style.display = "none";
    document.getElementById("documentations").style.display = "none";
    document.getElementById("tracking").style.display = "none";
  }

  getShipmentByContainer = () => {
    try {
      let data = {
        ContainerID: this.props.history.location.state.containerId,
      };
      var dataMer = [];
      api
        .post("container/getMergedShipments", data)
        .then((resultHBL) => {
          console.log("Result = ", resultHBL);
          // this.setState({ managedByList: result.data });
          dataMer = resultHBL.data;

          api
            .post("container/getShipmentsByContainer", data)
            .then((res) => {
              if (res.success) {
                console.log("Packages = ", res.data);
                res.data.Packages.map((OBJ) => {
                  var i = 1;
                  OBJ.map((obj) => {
                    obj.Index = i;
                    i++;
                    return obj;
                  });
                  return OBJ;
                });

                var setHblShipment = [];
                // var YesNO=[]

                var setCountShip = [];

                for (
                  let hblindex = 0;
                  hblindex < res.data.Shipments.length;
                  hblindex++
                ) {
                  // const element = array[hblindex];
                  if (res.data.Shipments[hblindex].hblshipment == 0) {
                    res.data.Shipments[hblindex].setsc = 1;
                    res.data.Shipments[hblindex].setPack =
                      res.data.Shipments[hblindex].TotalPackages;
                    setHblShipment.push(res.data.Shipments[hblindex]);
                  } else {
                    setCountShip.push(res.data.Shipments[hblindex]);
                  }
                }

                console.log("setCountShip = ", setCountShip);

                for (let setind = 0; setind < setHblShipment.length; setind++) {
                  debugger;
                  for (
                    let HBLSETING = 0;
                    HBLSETING < dataMer.length;
                    HBLSETING++
                  ) {
                    if (
                      dataMer[HBLSETING].hblshipment ==
                      setHblShipment[setind].ShippingID
                    ) {
                      setHblShipment[setind].setsc =
                        setHblShipment[setind].setsc +
                        dataMer[HBLSETING].totalShipment;
                      setHblShipment[setind].setPack =
                        setHblShipment[setind].setPack +
                        dataMer[HBLSETING].totalPack;
                    }
                  }
                }

                console.log("yesno = ", setHblShipment);

                this.setState({
                  ShipmentList: res.data.Shipments,
                  HBLShipmentList: setHblShipment,
                  Sequence: res.data.Packages,

                  // serviceNameData:YesNO,
                });

                var counts = 0;
                var tvcount = 0;
                var cftCount = 0;

                for (
                  let index = 0;
                  index < res.data.Shipments.length;
                  index++
                ) {
                  counts = counts + res.data.Shipments[index].TotalPackages;
                  tvcount = tvcount + res.data.Shipments[index].TV;
                  cftCount = cftCount + res.data.Shipments[index].CFT;
                  //const element = array[index];
                }
                this.state.TotalTVCount = tvcount;
                this.state.TotalCFTCount = cftCount;

                this.state.TotalPackagesCount = counts;
                console.log("counts = ", counts);
              } else {
                cogoToast.error("Something went wrong");
              }
            })
            .catch((err) => {
              console.log("error.....", err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {}
  };

  getContainerByID = () => {
    let data = {
      ContainerID: this.props.history.location.state.containerId,
    };
    this.showLoader();
    try {
      api
        .post("container/getContainerByID", data)
        .then((res) => {
          if (res.success) {
            var i = 0;
            res.data.NoteList.map((Obj) => {
              Obj.Index = i;
              i++;
              return Obj;
            });
            this.setState({
              ContainerName: res.data.ContainerName,
              ContainerShortName: res.data.ContainerShortName,
              IGMNumber:res.data.IGMNumber,
              ContainerSize: res.data.ContainerSize,
              CurrentStatus: res.data.CurrentStatus,
              ContainerStatus:
                res.data.ContainerStatus.data[0] === 1 ? true : false,
              ContainerNumber: res.data.ContainerNumber,
              SealNumber: res.data.SealNumber,
              BookingNumber: res.data.BookingNumber,
              BOLNumber: res.data.BOLNumber,
              PointOfOrigin: res.data.PointOfOrigin,
              PortOfLoading: res.data.PortOfLoading,
              PortOfUnloading: res.data.PortOfUnloading,
              PlaceOfDeliveryByOnCarrier: res.data.PlaceOfDeliveryByOnCarrier,
              VesselNumber: res.data.VesselNumber,
              HBLDate: res.data.HBLDate,
              IGMInwardDate : res.data.IGMInwardDate,
              IGMDate : res.data.IGMDate,
              LoadDate: res.data.LoadDate,
              SailingDate: res.data.SailingDate,
              ArrivalDate: res.data.ArrivalDate,
              FreightForwarder: res.data.FreightForwarder,
              Carrier: res.data.Carrier,
              NotifyParty: res.data.NotifyParty,
              NotifyPartyName: res.data.NotifyPartnerName,
              NotifyPartyPhone: res.data.PhoneNum,
              GSTNo: res.data.GSTNo,
              NotifyPartyEmail: res.data.Email,
              NotifyPartyAddr1: res.data.AddressLine1,
              NotifyPartyAddr2: res.data.AddressLine2,
              NotifyPartyAddr3: res.data.AddressLine3,

              NotifyPartyCity: res.data.City,
              NotifyPartyState: res.data.State,
              NotifyPartyZipCode: res.data.ZipCode,

              CustomsBroker: res.data.CustomsBroker,
              CreatedBy: res.data.CreatedBy,
              CreatedOn: moment(res.data.CreatedOn).format(
                CommonConfig.dateFormat.dateOnly
              ),
              notes: res.data.NoteList,
              Attachments: res.data.DocumentList,
            });
            var j = 0;
            res.data.DocumentList.map((Obj) => {
              Obj.Index = j;
              j++;
              return Obj;
            });
            this.state.Attachments.push(
              {
                Index: j,
                AttachmentName: "Package Details Report",
                FileName: "Package Details Report",
                DocumentType: "Reports",
                Status: "Inprocess",
                DocumentCreatedOn: moment().format(
                  CommonConfig.dateFormat.dateOnly
                ),
                DocumentCreatedBy: CommonConfig.loggedInUserData().Name,
              },
              {
                Index: j + 1,
                AttachmentName: "Shipment Details Report",
                FileName: "Shipment Details Report",
                Status: "Inprocess",
                DocumentType: "Reports",
                DocumentCreatedOn: moment().format(
                  CommonConfig.dateFormat.dateOnly
                ),
                DocumentCreatedBy: CommonConfig.loggedInUserData().Name,
              }
            );
            this.hideLoader();
            this.handleAddNotesRow();
            this.AddNewRowData();
          } else {
            this.hideLoader();
            cogoToast.error("Something went wrong");
          }
        })
        .catch((err) => {
          this.hideLoader();
          console.log("error", err);
        });
    } catch (err) {}
  };

  getManualTracking = () => {
    try {
      let data = {
        ContainerID: this.props.location.state.containerId,
      };
      api
        .post("container/getContainerManaualTracking", data)
        .then((result) => {
          var i = 1;
          result.data.map((Obj) => {
            Obj.Index = i;
            i++;
            return Obj;
          });
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
  };

  stringmapStatus = () => {
    try {
      let data = {
        stringMapType: "CONTAINERSTATUS",
      };
      api.post("stringMap/getStringMap", data).then((result) => {
        if (result.success) {
          this.setState({ CurrentStatusList: result.data });
        } else {
          cogoToast.error("Something went wrong");
        }
      });
    } catch (err) {
      cogoToast.error("Something Went Wrong");
    }
  };

  vendorList = () => {
    try {
      let data = {
        serviceName: "Shipping Lines",
      };
      api.post("vendor/getVendorListByServiceName", data).then((res) => {
        if (res.success) {
          this.setState({ CarrierList: res.data });
        } else {
          cogoToast.error("Something went wrong");
        }
      });
    } catch (err) {}
    try {
      let data = {
        serviceName: "Customs Broker",
      };
      api.post("vendor/getVendorListByServiceName", data).then((res) => {
        if (res.success) {
          this.setState({ CustomsBrokerList: res.data });
        } else {
          cogoToast.error("Something went wrong");
        }
      });
    } catch (err) {}

    try {
      let data = {
        serviceName: "Freight Forwarder",
      };
      api.post("vendor/getVendorListByServiceName", data).then((res) => {
        if (res.success) {
          this.setState({
            FreightForwarderList: res.data,
            NotifyPartyList: res.data,
          });
        } else {
          cogoToast.error("Something went wrong");
        }
      });
    } catch (err) {}
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

  stringmapStatus = () => {
    try {
      let data = {
        stringMapType: "CONTAINERSTATUS",
      };
      api.post("stringMap/getStringMap", data).then((result) => {
        if (result.success) {
          this.setState({ CurrentStatusList: result.data });
        } else {
          cogoToast.error("Something went wrong");
        }
      });
    } catch (err) {
      cogoToast.error("Something Went Wrong");
    }
  };

  stringMapSize = () => {
    try {
      let data = {
        stringMapType: "CONTAINERSIZE",
      };
      api.post("stringMap/getStringMap", data).then((result) => {
        if (result.success) {
          this.setState({ ContainerSizeList: result.data });
        } else {
          cogoToast.error("Something went wrong");
        }
      });
    } catch (err) {
      cogoToast.error("Something Went Wrong");
    }
  };

  handleChange = (event, type) => {
    let Val = event.target.value;
    if (type === "containername") {
      this.setState({ ContainerName: Val });
    } else if (type === "containershortname") {
      this.setState({ ContainerShortName: Val });
    }
    else if (type === "IGMNumber") {
      this.setState({ IGMNumber: Val });
    }
     else if (type === "containernumber") {
      this.setState({ ContainerNumber: Val });
    } else if (type === "sealnumber") {
      this.setState({ SealNumber: Val });
    } else if (type === "bookingnumber") {
      this.setState({ BookingNumber: Val });
    } else if (type === "bolnumber") {
      this.setState({ BOLNumber: Val });
    } else if (type === "pointoforigin") {
      this.setState({ PointOfOrigin: Val });
    } else if (type === "portofloading") {
      this.setState({ PortOfLoading: Val });
    } else if (type === "portofunloading") {
      this.setState({ PortOfUnloading: Val });
    } else if (type === "placeofdelivery") {
      this.setState({ PlaceOfDeliveryByOnCarrier: Val });
    } else if (type === "vesselnumber") {
      this.setState({ VesselNumber: Val });
    }
  };

  dateChange = (date, type, index) => {
    if (type === "PickupDate") {
      let TrackingList = this.state.trackingManualList;
      let idx = TrackingList.findIndex((x) => x.Index === index);
      TrackingList[idx][type] = date;
      this.setState({ trackingManualList: TrackingList });
    }
  };

  validate = () => {
    let IsFormValid = true;
    if (CommonConfig.isEmpty(this.state.ContainerName)) {
      this.setState({
        containernameErr: true,
        containernameHelperText: "Please enter container name",
      });
      IsFormValid = false;
    }

    if (CommonConfig.isEmpty(this.state.ContainerSize)) {
      this.setState({
        containersizeErr: true,
        containersizeHelperText: "Please enter container size",
      });
      IsFormValid = false;
    }
    if (CommonConfig.isEmpty(this.state.ContainerStatus)) {
      this.setState({
        containerstatusErr: true,
        containerstatusHelperText: "Please enter container status",
      });
      IsFormValid = false;
    }
    if (CommonConfig.isEmpty(this.state.CurrentStatus)) {
      this.setState({
        currentstatusErr: true,
        currentstatusHelperText: "Please enter current status",
      });
      IsFormValid = false;
    }
    return IsFormValid;
  };

  handleBlur = (event, type) => {
    let Val = event.target.value;
    if (type === "containername") {
      if (CommonConfig.isEmpty(this.state.ContainerName)) {
        this.setState({
          ContainerName: Val,
          containernameErr: true,
          containernameHelperText: "Please enter container name",
        });
      } else {
        this.setState({
          ContainerName: Val,
          containernameErr: false,
          containernameHelperText: "",
        });
      }
    } else if (type === "containershortname") {
      if (CommonConfig.isEmpty(this.state.ContainerShortName)) {
        this.setState({
          ContainerShortName: Val,
          containershortnameErr: true,
          containershortnameHelperText: "Please enter container short name",
        });
      } else {
        this.setState({
          ContainerShortName: Val,
          containershortnameErr: false,
          containershortnameHelperText: "",
        });
      }
    } 
    else if(type == "IGMNumber"){

      this.setState({
        IGMNumber: Val,
        IGMNumberErr: false,
        IGMNumberHelperText: "",
      });

    }
    else if (type === "containersize") {
      if (CommonConfig.isEmpty(this.state.ContainerSize)) {
        this.setState({
          ContainerSize: Val,
          containersizeErr: true,
          containersizeHelperText: "Please enter container size",
        });
      } else {
        this.setState({
          ContainerName: Val,
          containersizeErr: false,
          containersizeHelperText: "",
        });
      }
    } else if (type === "currentstatus") {
      if (CommonConfig.isEmpty(this.state.CurrentStatus)) {
        this.setState({
          CurrentStatus: Val,
          currentstatusErr: true,
          currentstatusHelperText: "Please enter current status",
        });
      } else {
        this.setState({
          CurrentStatus: Val,
          currentstatusErr: false,
          currentstatusHelperText: "",
        });
      }
    } else if (type === "containerstatus") {
      if (CommonConfig.isEmpty(this.state.ContainerStatus)) {
        this.setState({
          ContainerStatus: Val,
          containerstatusErr: true,
          containerstatusHelperText: "Please enter status",
        });
      } else {
        this.setState({
          ContainerStatus: Val,
          containerstatusErr: false,
          containerstatusHelperText: "",
        });
      }
    }
  };

  hideLoader = () => {
    this.setState({ Loading: false });
  };

  showLoader = () => {
    this.setState({ Loading: true });
  };

  handleSubmit = (redirect) => {
    if (this.validate()) {
      var finalAttachment = [];
      for (var i = 0; i < this.state.Attachments.length; i++) {
        if (
          this.state.Attachments[i].hasOwnProperty("AttachmentName") &&
          this.state.Attachments[i].Status !== "Inprocess"
        ) {
          finalAttachment.push(this.state.Attachments[i]);
        }
      }
      var FinalNotes = this.state.notes.filter(
        (x) => x.NoteText !== "" && x.NoteText !== null
      );
      let manualFinalData = this.state.trackingManualList.filter(
        (x) =>
          (x.Status === "Inactive" && x.ShippingManualTrackingID !== null) ||
          (x.Status === "Active" && x.Updates !== "")
      );
      let data = {
        NoteList: FinalNotes,
        DocumentList: finalAttachment,
        userId: CommonConfig.loggedInUserData().PersonID,
        ContainerID: this.props.history.location.state.containerId,
        ContainerName: this.state.ContainerName,
        containershortname: this.state.ContainerShortName,
        IGMNumber:this.state.IGMNumber,
        ContainerSize: this.state.ContainerSize,
        CurrentStatus: this.state.CurrentStatus,
        ContainerStatus: this.state.ContainerStatus,
        ContainerNumber: this.state.ContainerNumber,
        SealNumber: this.state.SealNumber,
        BookingNumber: this.state.BookingNumber,
        BOLNumber: this.state.BOLNumber,
        PointOfOrigin: this.state.PointOfOrigin,
        PortOfLoading: this.state.PortOfLoading,
        PortOfUnloading: this.state.PortOfUnloading,
        PlaceOfDeliveryByOnCarrier: this.state.PlaceOfDeliveryByOnCarrier,
        VesselNumber: this.state.VesselNumber,
        HBLDate:
          CommonConfig.isEmpty(this.state.HBLDate) != true
            ? moment(this.state.HBLDate)
                .format("YYYY-MM-DD HH:mm:ss")
                .toString()
            : null,

        IGMInwardDate:
          CommonConfig.isEmpty(this.state.IGMInwardDate) != true
            ? moment(this.state.IGMInwardDate)
                .format("YYYY-MM-DD HH:mm:ss")
                .toString()
            : null,

            IGMDate:
          CommonConfig.isEmpty(this.state.IGMDate) != true
            ? moment(this.state.IGMDate)
                .format("YYYY-MM-DD HH:mm:ss")
                .toString()
            : null,
        LoadDate:
          CommonConfig.isEmpty(this.state.LoadDate) != true
            ? moment(this.state.LoadDate)
                .format("YYYY-MM-DD HH:mm:ss")
                .toString()
            : null,
        SailingDate:
          CommonConfig.isEmpty(this.state.SailingDate) != true
            ? moment(this.state.SailingDate)
                .format("YYYY-MM-DD HH:mm:ss")
                .toString()
            : null,
        ArrivalDate:
          CommonConfig.isEmpty(this.state.ArrivalDate) != true
            ? moment(this.state.ArrivalDate)
                .format("YYYY-MM-DD HH:mm:ss")
                .toString()
            : null,
        FreightForwarder: this.state.FreightForwarder,
        Carrier: this.state.Carrier,
        NotifyParty: this.state.NotifyParty,
        CustomsBroker: this.state.CustomsBroker,
        manualTrackingData: manualFinalData,
      };
      if (
        this.state.confirmStatus === true &&
        this.state.ShipmentStatus !== ""
      ) {
        Object.assign(data, { shipStatus: this.state.ShipmentStatus });
        this.setState({
          popupOpen: false,
          ShipmentStatus: "",
          // confirmStatus: false,
        });
      }
      var formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (this.state.AttachmentList.length > 0) {
        this.state.AttachmentList.forEach((file) => {
          formData.append("Attachments", file);
        });
      }
      debugger;
      this.showLoader();
      api.post("container/editContainer/", formData).then((result) => {
        console.log("resss", result);
        if (result.success) {
          this.hideLoader();
          cogoToast.success("Container Updated Successfully");
          if (redirect) {
            this.props.history.push({
              pathname: "/admin/Container",
              state: {
                filterlist:
                  this.props.history.location.state.filterlist !== undefined
                    ? this.props.history.location.state.filterlist
                    : null,
                sortlist:
                  this.props.history.location.state.sortlist !== undefined
                    ? this.props.history.location.state.sortlist
                    : null,
              },
            });
          } else {
            this.state.AttachmentList = []
            this.reCallApi();
          }
        } else {
          this.hideLoader();
          cogoToast.error("Something Went Wrong");
          this.props.history.push({
            pathname: "/admin/Container",
          });
        }
      });
    }
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
        CreatedOn: moment(todayDate).format(CommonConfig.dateFormat.dateTime),
        CreatedBy: CommonConfig.loggedInUserData().PersonID,
        NoteCreatedBy: CommonConfig.loggedInUserData().Name,
        NoteID: null,
        Index: this.state.notes.length + 1,
      };
      this.setState({
        notesDisabled: false,
        notes: [...this.state.notes, note],
      });
    } else {
      cogoToast.error("Please fill above notes first");
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
    const removeNotes = this.state.notes;
    var noteIndex = this.state.notes.findIndex((x) => x.Index === Index);
    if (noteIndex !== -1) {
      removeNotes[noteIndex]["Status"] = "Inactive";
      removeNotes[noteIndex]["AttachmentStatus"] = "Inactive";
      this.setState({ notes: removeNotes });
      if (removeNotes.filter((x) => x.Status === "Active").length === 0) {
        this.handleAddNotesRow();
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
              {moment(notes.CreatedOn).format(CommonConfig.dateFormat.dateTime)}
            </td>
            <td style={{ width: "597px" }}>
              {notes.NoteID > 0 ? (
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
                    value={notes.NoteText}
                    onChange={(e) => this.handleChangeNotes(e, notes.Index)}
                  ></textarea>
                </div>
              )}
            </td>
            <td className="pck-action-column">
              <div className="pck-subbtn">
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn "
                  onClick={() => this.handleNotesRemoveRow(notes.Index)}
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
                <Tooltip title={notes.NoteCreatedBy} arrow>
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

  cancelContainer = () => {
    this.props.history.push({
      pathname: "/admin/Container",
      state: {
        filterlist:
          this.props.history.location.state.filterlist !== undefined
            ? this.props.history.location.state.filterlist
            : null,
        sortlist:
          this.props.history.location.state.sortlist !== undefined
            ? this.props.history.location.state.sortlist
            : null,
      },
    });
  };

  handleDate = (date, type) => {
    if (type === "hbl") {
      this.setState({
        HBLDate: date,
        hbldateErr: false,
        hbldateHelperText: "",
      });
    } else if (type === "load") {
      this.setState({
        LoadDate: date,
        loaddateErr: false,
        loaddateHelperText: "",
      });
    }
    else if (type === "IGMDate") {
      this.setState({
        IGMDate: date,
        IGMDateErr: false,
        IGMDateHelperText: "",
      });
    }
    else if (type === "IGMInwardDate") {
      this.setState({
        IGMInwardDate: date,
        IGMInwardDateErr: false,
        IGMInwardDateHelperText: "",
      });
    }
    
    else if (type === "sailing") {
      this.setState({
        SailingDate: date,
        sailingdateErr: false,
        sailingdateHelperText: "",
      });
    } else if (type === "arrival") {
      this.setState({
        ArrivalDate: date,
        arrivaldateErr: false,
        arrivaldateHelperText: "",
      });
    }
  };

  HselectChange = (event, value) => {
    if (value === "BookingNumber") {
      this.setState({ BookingNumber: event.target.value });
    }
    else if (value === "pPassportNumber") {
      this.setState({ pPassportNumber: event.target.value });
    }
    else if (value === "PLToAddress") {
      this.setState({ PLToAddress: event.target.value });
    }
    else if (value === "PLFromAddress") {
      this.setState({ PLFromAddress: event.target.value });
    }
    else if (value === "NotifyNameParty") {
      this.setState({ NotifyNameParty: event.target.value });
    }
    else if (value === "FcontactName") {
      this.setState({ FcontactName: event.target.value });
    }
    else if (value === "DOConsignee") {
      this.setState({ DOConsignee: event.target.value });
    }
    else if (value === "DONotifyParty") {
      this.setState({ DONotifyParty: event.target.value });
    }
    else if (value === "DoMBLNo") {
      this.setState({ DoMBLNo: event.target.value });
    }
    else if (value === "DoIGMNo") {
      this.setState({ DoIGMNo: event.target.value });
    }

    else if (value === "DoContainerNum") {
      this.setState({ DoContainerNum: event.target.value });
    }

    else if (value === "DoDescription") {
      this.setState({ DoDescription: event.target.value });
    }

    else if (value === "DoPackageNumber") {
      this.setState({ DoPackageNumber: event.target.value });
    }

    else if (value === "DOWEIGHT") {
      this.setState({ DOWEIGHT: event.target.value });
    }
  
    else if (value === "DOMEASUREMENT") {
      this.setState({ DOMEASUREMENT: event.target.value });
    }

    else if (value === "DOSequencelist") {
      this.setState({ DOSequencelist: event.target.value });
    }

    else if (value === "DoSealNumber") {
      this.setState({ DoSealNumber: event.target.value });
    }
    else if (value === "DoITMSub") {
      this.setState({ DoITMSub: event.target.value });
    }
    else if (value === "DoLoadingPort") {
      this.setState({ DoLoadingPort: event.target.value });
    }
    else if (value === "DoHBLNo") {
      this.setState({ DoHBLNo: event.target.value });
    }
    else if (value === "DoVessel") {
      this.setState({ DoVessel: event.target.value });
    }
    else if (value === "DoDeliverTo") {
      this.setState({ DoDeliverTo: event.target.value });
    }
    else if (value === "TcontactName") {
      this.setState({ TcontactName: event.target.value });
    }
    else if (value === "PNotifyEmail") {
      this.setState({ PNotifyEmail: event.target.value });
    }
    else if (value === "PNotifyGst") {
      this.setState({ PNotifyGst: event.target.value });
    }
    else if (value === "PnotifyPhone") {
      this.setState({ PnotifyPhone: event.target.value });
    }
    else if (value === "ConsigneeDetails") {
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

  selectChange = (e, type) => {
    let Val = e.target.value;
    if (type === "containersize") {
      this.setState({
        ContainerSize: Val,
        containersizeErr: false,
        containersizeHelperText: "",
      });
    } else if (type === "containerstatus") {
      this.setState({
        ContainerStatus: Val,
        containerstatusErr: false,
        containerstatusHelperText: "",
      });
    } else if (type === "currentstatus") {
      this.setState({
        CurrentStatus: Val,
        currentstatusErr: false,
        currentstatusHelperText: "",
      });
    } else if (type === "carrier") {
      this.setState({ Carrier: Val, carrierErr: false, carrierHelperText: "" });
    } else if (type === "customsbroker") {
      this.setState({
        CustomsBroker: Val,
        customsbrokerErr: false,
        carrierHelperText: "",
      });
    } else if (type === "notify") {
      this.setState({
        NotifyParty: Val,
        notifypartyErr: false,
        notifypartyHelperText: "",
      });
    } else if (type === "freight") {
      this.setState({
        FreightForwarder: Val,
        freightforwarderErr: false,
        freightforwarderHelperText: "",
      });
    }
  };

  containerSize = () => {
    return this.state.ContainerSizeList.map((container) => {
      return (
        <MenuItem value={container.StringMapKey}>
          {container.StringMapName}
        </MenuItem>
      );
    });
  };

  containerStatus = () => {
    return this.state.CurrentStatusList.map((container) => {
      return (
        <MenuItem value={container.StringMapKey}>
          {container.StringMapName}
        </MenuItem>
      );
    });
  };

  carrierList = () => {
    return this.state.CarrierList.map((container) => {
      return <MenuItem value={container.Name}>{container.Name}</MenuItem>;
    });
  };

  customsBroker = () => {
    return this.state.CustomsBrokerList.map((container) => {
      return <MenuItem value={container.Name}>{container.Name}</MenuItem>;
    });
  };

  freightForwarderMap = () => {
    return this.state.FreightForwarderList.map((container) => {
      return <MenuItem value={container.Name}>{container.Name}</MenuItem>;
    });
  };

  AddNewRowData = () => {
    let attachments = this.state.Attachments;
    let IsValid = true;
    for (let i = 0; i < this.state.Attachments.length; i++) {
      if (!attachments[i].hasOwnProperty("AttachmentName")) {
        IsValid = false;
      }
    }
    debugger
    var AttachmentList = this.state.Attachments.filter(
      (x) => x.Status === "Active" && (x.FileName === "" || x.FileName === null)
    );
    if (AttachmentList.length === 0 && IsValid) {
      const objAttachment = {
        Index: AttachmentList.filter((x) => x.Status === "Active").length + 1,
        FileName: "",
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

  handleDocumentChange = (e, record) => {
    var Index = this.state.Attachments.indexOf(record.original);
    this.state.Attachments[Index]["FileName"] = e.target.value;
    this.setState({ Attachments: [...this.state.Attachments] });
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

  fileUpload = (event, record) => {
    const files = event.target.files[0];
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf|\.xlsx)$/i;
    if (!allowedExtensions.exec(files.name)) {
      cogoToast.error(
        "Please upload file having extensions .jpeg/.jpg/.png/.pdf/.xlsx only."
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

  handleDocumentDelete = (e, record) => {
    var AttachmentList = this.state.Attachments;
    var Index = AttachmentList.indexOf(record);
    AttachmentList[Index]["Status"] = "Inactive";
    this.setState({ Attachments: AttachmentList });
  };
  ReportCreate = (Name) => {
    if (Name === "Package Details Report") {
      this.ContainerPackageDetailsReport();
    }
    if (Name === "Shipment Details Report") {
      this.ContainerShipmentDetailsReport();
    }
  };
  ContainerPackageDetailsReport = () => {
    try {
      let data = {
        ContainerID: this.props.history.location.state.containerId,
      };
      api
        .post("container/ContainerPackageDetailsReport", data)
        .then((result) => {
          if (result.success) {
            window.open(fileBase + result.data.message, "_blank");
          } else {
            cogoToast.error("Something went wrong");
          }
        });
    } catch (err) {
      cogoToast.error("Something Went Wrong");
    }
  };

  ContainerShipmentDetailsReport = (e, record) => {
    try {
      let data = {
        ContainerID: this.props.history.location.state.containerId,
      };
      api
        .post("container/ContainerShipmentDetailsReport", data)
        .then((result) => {
          if (result.success) {
            window.open(fileBase + result.data.message, "_blank");
          } else {
            cogoToast.error("Something went wrong");
          }
        });
    } catch (err) {
      cogoToast.error("Something Went Wrong");
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

  selectDocumentType = (value, record) => {
    if (value != null) {
      var AttachmentList = this.state.Attachments;
      var Index = AttachmentList.indexOf(record.original);
      AttachmentList[Index]["DocumentType"] = value.value;
      this.setState({ Attachments: AttachmentList });
    }
  };

  handleDelete = () => {
    try {
      let data = {
        ContainerID: this.props.history.location.state.containerId,
      };

      this.showLoader();
      api.post("container/deleteContainer", data).then((res) => {
        if (res.success) {
          this.hideLoader();
          cogoToast.success("Container Deleted Successfully");
          this.props.history.push({
            pathname: "/admin/Container",
            state: {
              filterlist:
                this.props.history.location.state.filterlist !== undefined
                  ? this.props.history.location.state.filterlist
                  : null,
              sortlist:
                this.props.history.location.state.sortlist !== undefined
                  ? this.props.history.location.state.sortlist
                  : null,
            },
          });
        } else {
          this.hideLoader();
          cogoToast.error("Something went wrong");
        }
      });
    } catch (err) {}
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

  renderDocumentType = (cellInfo) => {
    const DocumentType = {
      value: cellInfo.original.DocumentType,
      label: cellInfo.original.DocumentType,
    };
    return (
      <div className="package-select">
        <Autocomplete
          id="package_number"
          options={[]}
          value={DocumentType}
          disabled={true}
          getOptionLabel={(option) => option.label}
          onChange={(event, value) => this.selectDocumentType(value, cellInfo)}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    );
  };

  addnewRowTrackingManual = () => {
    const row = {
      ShippingManualTrackingID: null,
      PickupDate: moment().toDate(),
      PickupTime: moment().format(CommonConfig.dateFormat.timeOnly),
      TrackingStatus: "",
      Type: "",
      Updates: "",
      Status: "Active",
      CreatedOn: moment().toDate(),
      CreatedByName: CommonConfig.loggedInUserData().Name,
      Index: this.state.trackingManualList.length + 1,
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
    }
  };

  handleManualTrackingChange = (event, type, index) => {
    let trackingManualList = this.state.trackingManualList;
    let idx = trackingManualList.findIndex((x) => x.Index === index);
    if(CommonConfig.RegExp.exceptCirilic.test(event.target.value))
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
                    value: moment(trackingManual.CreatedOn).format(
                      CommonConfig.dateFormat.dateOnly
                    ),
                  }}
                />
              </div>
            </td>
            <td className="wd-time">
              <CustomInput
                id="proposaltype"
                type="number"
                inputProps={{
                  value: moment(trackingManual.CreatedOn).format(
                    CommonConfig.dateFormat.time12Only
                  ),
                  disabled: true,
                }}
              />
            </td>
            <td className="wd-date">
              <div className="package-dateinput">
                <Datetime
                  dateFormat={"MM/DD/YYYY"}
                  timeFormat={false}
                  value={moment(trackingManual.PickupDate)}
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
                  value: moment(trackingManual.PickupTime, "HH:mm:ss").format(
                    CommonConfig.dateFormat.time12Only
                  ),
                  onChange: (event) =>
                    this.handleManualTrackingChange(
                      event,
                      "PickupTime",
                      trackingManual.Index
                    ),
                }}
              />
            </td>
            <td>
              <div className="width-full">
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
              </div>
            </td>
            <td className="pck-action-column">
              {idx !== 0 ? (
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

  viewSequence = () => {
    return this.state.ShipmentList.map((shipment) => {
      return (
        <table>
          <thead>
            <tr>
              <th>{shipment.TrackingNumber}</th>
              <th colspan="3">
                {shipment.ContactName + " to " + shipment.ToContactName}
              </th>
              <th colspan="4">
                {shipment.FromCity +
                  "," +
                  shipment.FromState +
                  " to " +
                  shipment.ToCity +
                  "," +
                  shipment.ToState}
              </th>
              <th>{"TV: " + shipment.TV}</th>
              <th>{"Pkg: " + shipment.TotalPackages}</th>
            </tr>
          </thead>
          <tbody>{this.SequenceView(shipment.ShippingID)}</tbody>
        </table>
      );
    });
  };

  finalSequence = (sequence, ShippingId, index) => {
    let finalLength = sequence.filter(
      (x) => x.ShippingID === ShippingId && x.Index < index + 10
    ).length;
    if (finalLength < 10) {
      let diffLength = 10 - finalLength;
      let idx = index;
      for (var i = 0; i < diffLength; i++, idx++) {
        var OBJ = {
          ShippingID: ShippingId,
          Index: idx,
        };
        sequence.push(OBJ);
      }
    }
    return sequence
      .filter((x) => x.ShippingID === ShippingId && x.Index < index + 10)
      .map((Sequence) => {
        return (
          <td>
            {Sequence.Sequence}
            {Sequence.PackageContent === "TV"
              ? "(TV)"
              : Sequence.PackageContent === "TV Crated"
              ? "(TV-C)"
              : ""}
          </td>
        );
      });
  };
  SequenceView = (ShippingId) => {
    return this.state.Sequence.map((sequence) => {
      return sequence
        .filter((x) => x.ShippingID === ShippingId)
        .map((Sequence) => {
          let idx = Sequence.Index % 10 === 0;
          let Index =
            Sequence.Index % 10 === 0 ? Sequence.Index + 1 : Sequence.Index;
          if (Sequence.Index === 1 || (idx && Index)) {
            sequence = idx
              ? sequence.filter((x) => x.Index >= Sequence.Index + 1)
              : sequence.filter((x) => x.Index >= Sequence.Index);
            return (
              <tr>
                {this.finalSequence(
                  sequence,
                  ShippingId,
                  idx ? Index : Sequence.Index
                )}
              </tr>
            );
          }
        });
    });
  };

  closeDiv = () => {
    this.setState({
      SetShiprecord: false,
      RemoveShipID: "",
    });
  };

  closeDivHBL = () => {
    this.setState({
      SetShiprecordHBL: false,
      // RemoveShipID: "",
    });
  };

  UpdateHBLShipID = (record) => {
    // if(this.state.UpdateShipID == ""){
    //   cogoToast.error("Please select Tracking Number");
    // }else{
    var datatosend = {
      shippingID: this.state.RemoveShipID,
      UpdateShipping: record.original.ShippingID,
    };

    api.post("contactus/UpdateHBL", datatosend).then((res) => {
      this.hideLoader();
      if (res.success) {
        this.setState({
          SetShiprecord: false,
          RemoveShipID: "",
        });
        cogoToast.success("Shipment merged for HBL");
        this.reCallApi();
      } else {
        cogoToast.error("Something went wrong");
      }
    });
    // }
  };

  handleSelectChange = (datasets) => {
    console.log(datasets);
    var shipID = datasets.value;
    this.state.UpdateShipIDHBLSET = datasets;

    // this.setState({
    //   // SetShiprecord: true,
    //   UpdateShipID: shipID,
    // });

    this.state.UpdateShipID = shipID;
    console.log(this.state.UpdateShipID);
  };

  generateHBL = (record) => {
    console.log("Records = ", record);

    // localStorage.setItem("ContainerNumber",this.state.ContainerNumber)
    // localStorage.setItem("BookingNumber",this.state.BookingNumber)
    // localStorage.setItem("BOLNumber",record.original.TrackingNumber + this.state.ContainerShortName)

    // localStorage.setItem("PointOfOrigin",this.state.PointOfOrigin)
    // localStorage.setItem("PortOfLoading",this.state.PortOfLoading)
    // localStorage.setItem("PortOfUnloading",this.state.PortOfUnloading)
    // localStorage.setItem("PlaceOfDeliveryByOnCarrier",this.state.PlaceOfDeliveryByOnCarrier)
    // localStorage.setItem("VesselNumber",this.state.VesselNumber)
    // localStorage.setItem("NotifyParty",this.state.NotifyParty)
    // localStorage.setItem("TrackNO", record.original.TrackingNumber)
    // localStorage.setItem("NotifyPartyName",this.state.NotifyPartyName)

    // localStorage.setItem("hblDate",this.state.HBLDate);

    localStorage.setItem("shippid", record.original.ShippingID);

    // localStorage.setItem("NotifyPartyPhone",this.state.NotifyPartyPhone + "  Email: "+ this.state.NotifyPartyEmail + " GST: " + this.state.GSTNo)
    // localStorage.setItem("NotifyPartyEmail",)

    var fromadd1Notify = this.state.NotifyPartyAddr1;
    var fromadd2Notify = this.state.NotifyPartyAddr2;
    var fromadd3Notify = this.state.NotifyPartyAddr3;

    var FromAddressNotify = "";

    if (fromadd1Notify != "") {
      FromAddressNotify = FromAddressNotify + fromadd1Notify;
    }
    if (fromadd2Notify != "") {
      FromAddressNotify = FromAddressNotify + ", " + fromadd2Notify;
    }
    if (fromadd3Notify != "") {
      FromAddressNotify = FromAddressNotify + ", " + fromadd3Notify;
    }

    // localStorage.setItem("NotifyPartyAddr3",FromAddressNotify)
    var fromCitysNotify =
      this.state.NotifyPartyCity +
      ", " +
      this.state.NotifyPartyState +
      " - " +
      this.state.NotifyPartyZipCode;

    // localStorage.setItem("NotifyPartyCity",fromCitysNotify)

    var fromadd1 = record.original.FromAdd1;
    var fromadd2 = record.original.FromAdd2;
    var fromadd3 = record.original.FromAdd3;

    var FromAddress = "";
    if (fromadd1 != "") {
      FromAddress = FromAddress + fromadd1;
    }
    if (fromadd2 != "") {
      FromAddress = FromAddress + ", " + fromadd2;
    }
    if (fromadd3 != "") {
      FromAddress = FromAddress + ", " + fromadd3;
    }

    var fromCity = record.original.FromCity;
    var fromState = record.original.FromState;
    var fromZipCo = record.original.fromZip;

    var fromCitys = fromCity + ", " + fromState + " - " + fromZipCo;

    // localStorage.setItem("FromAddress", FromAddress)
    // localStorage.setItem("fromCitys", fromCitys)
    // localStorage.setItem("fromContact", record.original.ContactName)

    //   To Contact Name

    var TOadd1 = record.original.ToAdd1;
    var TOadd2 = record.original.ToAdd2;
    var TOadd3 = record.original.ToAdd3;

    var TOAddress = "";
    if (TOadd1 != "") {
      TOAddress = TOAddress + TOadd1;
    }
    if (TOadd2 != "") {
      TOAddress = TOAddress + ", " + TOadd2;
    }
    if (TOadd3 != "") {
      TOAddress = TOAddress + ", " + TOadd3;
    }

    var TOCity = record.original.ToCity;
    var TOState = record.original.ToState;
    var TOZipCo = record.original.toZip;

    var TOCitys =
      TOCity +
      ", " +
      TOState +
      " - " +
      TOZipCo ;

    // localStorage.setItem("TOAddress", TOAddress)
    // localStorage.setItem("TOCitys", TOCitys)
    // localStorage.setItem("TOContact", record.original.ToContactName)
    let data = {
      ContainerID: this.props.history.location.state.containerId,
      shipmentID: record.original.ShippingID,
    };

    var TotalcftH = 0;
    var totalPackH = 0;
    var TotalChargableWeightHBL = 0;
    api
      .post("container/getShipmentsByContainerForHBL", data)
      .then((res) => {
        if (res.success) {
          console.log("Res = ", res);

          var packdata = res.data.Packages;
          var packset = [];

          for (let index = 0; index < packdata.length; index++) {
            // const element = array[index];
            if (packdata[index].length > 1) {
              console.log("packdata[index] = ", packdata[index][0]["Sequence"]);
              console.log(
                "packdata[index] = ",
                packdata[index][0]["Sequence"] +
                  " - " +
                  packdata[index][packdata[index].length - 1]["Sequence"]
              );

              var packseq =
                packdata[index][0]["Sequence"] +
                " - " +
                packdata[index][packdata[index].length - 1]["Sequence"];
              var packLen = packdata[index].length;
              var Shippingid = packdata[index][0]["ShippingID"];
              var pushdata = {
                packseq: packseq,
                packLen: packLen,
                Shippingid: Shippingid,
              };

              packset.push(pushdata);
            } else {
              var packseq = packdata[index][0]["Sequence"];
              var packLen = packdata[index].length;
              var Shippingid = packdata[index][0]["ShippingID"];
              var pushdata = {
                packseq: packseq,
                packLen: packLen,
                Shippingid: Shippingid,
              };

              packset.push(pushdata);
            }
          }

          for (
            let indexship = 0;
            indexship < res.data.Shipments.length;
            indexship++
          ) {
            // const element = array[indexship];
            totalPackH =
              totalPackH + res.data.Shipments[indexship].TotalPackages;
            // tvcount = tvcount + res.data.Shipments[indexship].TV
            TotalChargableWeightHBL =
              TotalChargableWeightHBL +
              res.data.Shipments[indexship].TotalChargableWeight;
            TotalcftH = TotalcftH + res.data.Shipments[indexship].CFT;

            for (let indexset = 0; indexset < packset.length; indexset++) {
              if (
                packset[indexset].Shippingid ==
                res.data.Shipments[indexship].ShippingID
              ) {
                packset[indexset].cft = res.data.Shipments[indexship].CFT;
                packset[indexset].TotalPackages =
                  res.data.Shipments[indexship].TotalPackages;
                packset[indexset].TotalChargableWeight =
                  res.data.Shipments[indexship].TotalChargableWeight;
              }
            }
          }
          var dataHtml = "";
          var packSeqList = "";
          for (let indexpack = 0; indexpack < packset.length; indexpack++) {
            // const element = array[indexpack];

            // if(packset.length > 1){

            packSeqList = packSeqList + packset[indexpack].packseq + ", ";

            // }

            // dataHtml = dataHtml +  "<tr><td><label>"+ packset[indexpack].packseq +"</label></td> <td><label>"+ packset[indexpack].packLen +"</label></td><td><label>*USED HOUSE HOLD GOODS AND PERSONAL EFFECTS*</label></td><td><label>"+packset[indexpack].TotalChargableWeight+"</label></td><td><label>"+ packset[indexpack].cft +"</label></td></tr>"
          }

          packSeqList = packSeqList.substring(0, packSeqList.length - 2);

          var TotalCBM = (TotalcftH / 36).toFixed(2);
          TotalChargableWeightHBL = TotalcftH * 7;
          TotalChargableWeightHBL = (TotalChargableWeightHBL / 2.2).toFixed(2);

          dataHtml =
            dataHtml +
            " <tr><td>" +
            packSeqList +
            "</td><td>" +
            totalPackH +
            "</td><td>USED HOUSE HOLD GOODS AND PERSONAL EFFECTS</td><td>" +
            TotalChargableWeightHBL +
            " KG.</td><td>" +
            TotalCBM +
            " CBM</td></tr>";

          console.log("packset = ", packset);

          

          var FromAddressView =
            FromAddress +
            " " +
            fromCitys;


          var ToAddressView =
          TOAddress + " " + TOCitys;

          var phoneEmail =
            this.state.NotifyPartyPhone +
            "  Email: " +
            this.state.NotifyPartyEmail +
            " GST: " +
            this.state.GSTNo;

          var ConsigneeDetailsView =
            
            FromAddressNotify +
            " " +
            fromCitysNotify 
          localStorage.setItem(
            "NotifyPartyPhone",
            this.state.NotifyPartyPhone +
              "  Email: " +
              this.state.NotifyPartyEmail +
              " GST: " +
              this.state.GSTNo
          );
          this.setState({
            FcontactName: record.original.ContactName,
            TcontactName: record.original.ToContactName ,
            pPassportNumber: record.original.PassportNumber,
            NotifyNameParty: this.state.NotifyParty,
            PNotifyGst:this.state.GSTNo,
            PNotifyEmail:  this.state.NotifyPartyEmail,
            PnotifyPhone:this.state.NotifyPartyPhone,
            ConsigneeDetails: ConsigneeDetailsView,
            ConsignedTo: ToAddressView,
            ShipperExportor: FromAddressView,
            BookingNumber: this.state.BookingNumber,
            HContainerNumber: this.state.ContainerNumber,
            BLNumber:
              record.original.TrackingNumber + this.state.ContainerShortName,
            pointState: this.state.PointOfOrigin,
            Vessel: this.state.VesselNumber,
            Export: this.state.PortOfLoading,
            Unloading: this.state.PortOfUnloading,
            develiverd: this.state.PlaceOfDeliveryByOnCarrier,
            Sequencelist: packSeqList,
            PackageNumber: totalPackH,
            description: "USED HOUSE HOLD GOODS AND PERSONAL EFFECTS",
            WEIGHT: TotalChargableWeightHBL,
            MEASUREMENT: TotalCBM,
            pTrackingNumber: record.original.TrackingNumber,
          });

          this.setState({
            HBLdocOpen: true,
            // RemoveShipID: "",
          });
        } else {
          cogoToast.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.log("error.....", err);
      });
  };

  generateDO = (record) => {
    localStorage.setItem("shippid", record.original.ShippingID);


    let data = {
      ContainerID: this.props.history.location.state.containerId,
      shipmentID: record.original.ShippingID,
    };

    var TotalcftH = 0;
    var totalPackH = 0;
    var TotalChargableWeightHBL = 0;
    api
      .post("container/getShipmentsByContainerForHBL", data)
      .then((res) => {
        if (res.success) {
          console.log("Res = ", res);

          var packdata = res.data.Packages;
          var packset = [];

          for (let index = 0; index < packdata.length; index++) {
            // const element = array[index];
            if (packdata[index].length > 1) {
              console.log("packdata[index] = ", packdata[index][0]["Sequence"]);
              console.log(
                "packdata[index] = ",
                packdata[index][0]["Sequence"] +
                  " - " +
                  packdata[index][packdata[index].length - 1]["Sequence"]
              );

              var packseq =
                packdata[index][0]["Sequence"] +
                " - " +
                packdata[index][packdata[index].length - 1]["Sequence"];
              var packLen = packdata[index].length;
              var Shippingid = packdata[index][0]["ShippingID"];
              var pushdata = {
                packseq: packseq,
                packLen: packLen,
                Shippingid: Shippingid,
              };

              packset.push(pushdata);
            } else {
              var packseq = packdata[index][0]["Sequence"];
              var packLen = packdata[index].length;
              var Shippingid = packdata[index][0]["ShippingID"];
              var pushdata = {
                packseq: packseq,
                packLen: packLen,
                Shippingid: Shippingid,
              };

              packset.push(pushdata);
            }
          }

          for (
            let indexship = 0;
            indexship < res.data.Shipments.length;
            indexship++
          ) {
            // const element = array[indexship];
            totalPackH =
              totalPackH + res.data.Shipments[indexship].TotalPackages;
            // tvcount = tvcount + res.data.Shipments[indexship].TV
            TotalChargableWeightHBL =
              TotalChargableWeightHBL +
              res.data.Shipments[indexship].TotalChargableWeight;
            TotalcftH = TotalcftH + res.data.Shipments[indexship].CFT;

            for (let indexset = 0; indexset < packset.length; indexset++) {
              if (
                packset[indexset].Shippingid ==
                res.data.Shipments[indexship].ShippingID
              ) {
                packset[indexset].cft = res.data.Shipments[indexship].CFT;
                packset[indexset].TotalPackages =
                  res.data.Shipments[indexship].TotalPackages;
                packset[indexset].TotalChargableWeight =
                  res.data.Shipments[indexship].TotalChargableWeight;
              }
            }
          }
          var dataHtml = "";
          var packSeqList = "";
          for (let indexpack = 0; indexpack < packset.length; indexpack++) {
            // const element = array[indexpack];

            // if(packset.length > 1){

            packSeqList = packSeqList + packset[indexpack].packseq + ", ";

            // }

            // dataHtml = dataHtml +  "<tr><td><label>"+ packset[indexpack].packseq +"</label></td> <td><label>"+ packset[indexpack].packLen +"</label></td><td><label>*USED HOUSE HOLD GOODS AND PERSONAL EFFECTS*</label></td><td><label>"+packset[indexpack].TotalChargableWeight+"</label></td><td><label>"+ packset[indexpack].cft +"</label></td></tr>"
          }

          packSeqList = packSeqList.substring(0, packSeqList.length - 2);

          var TotalCBM = (TotalcftH / 36).toFixed(2);
          TotalChargableWeightHBL = TotalcftH * 7;
          TotalChargableWeightHBL = (TotalChargableWeightHBL / 2.2).toFixed(2);

          

          this.setState({
            DoDeliverTo: this.state.CustomsBroker,
            DOConsignee: record.original.ToContactName ,
            DONotifyParty:this.state.NotifyParty,
            DoMBLNo:this.state.BOLNumber,
            DoVessel:this.state.VesselNumber,
            DoHBLNo: record.original.TrackingNumber + this.state.ContainerShortName,
            DoLoadingPort:this.state.PortOfLoading,
            DoIGMNo:this.state.IGMNumber,
            DoITMSub:"",
            DoContainerNum: this.state.ContainerNumber,
            DoSealNumber:this.state.SealNumber,
            DoDescription:this.state.DoDescription,

            DOSequencelist: packSeqList,
            DoPackageNumber: totalPackH,
            DOWEIGHT: TotalChargableWeightHBL,
            DOMEASUREMENT: TotalCBM,
            
          })

          this.setState({
            DOdocOpen: true,
            // RemoveShipID: "",
          });
        } else {
          cogoToast.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.log("error.....", err);
      });

    
    // this.setState({
    //   DOdocOpen: true,
    //     // RemoveShipID: "",
    //   });


  };
  generatePLPDF = () =>{

    
    localStorage.setItem("TOAddress",document.getElementById("PLToAddress").value)
    // localStorage.setItem("TOCitys",TOCitys)

    // localStorage.setItem("fromCitys",fromCitys)
    localStorage.setItem("FromAddress",document.getElementById("PLFromAddress").value)
    var shipId = localStorage.getItem("shippid");
    this.setState({
      PLdocOpen: false,
      // RemoveShipID: "",
    });



    window.open(
      this.state.Base +
        "auth/PL/" +
        shipId +
        "/" +
        this.props.history.location.state.containerId,

      "_blank"
    );
    

  }
  generatePL = (record) => {
    localStorage.setItem("shippid", record.original.ShippingID);
    console.log("Records = ", record);
    var shipId = record.original.ShippingID;

    var fromadd1 = record.original.FromAdd1;
    var fromadd2 = record.original.FromAdd2;
    var fromadd3 = record.original.FromAdd3;

    var FromAddress = "";
    if (fromadd1 != "") {
      FromAddress = FromAddress + fromadd1;
    }
    if (fromadd2 != "") {
      FromAddress = FromAddress + ", " + fromadd2;
    }
    if (fromadd3 != "") {
      FromAddress = FromAddress + ", " + fromadd3;
    }

    var fromCity = record.original.FromCity;
    var fromState = record.original.FromState;
    var fromZipCo = record.original.fromZip;

    var fromCitys = fromCity + ", " + fromState + " - " + fromZipCo;


    var TOadd1 = record.original.ToAdd1;
    var TOadd2 = record.original.ToAdd2;
    var TOadd3 = record.original.ToAdd3;

    var TOAddress = "";
    if (TOadd1 != "") {
      TOAddress = TOAddress + TOadd1;
    }
    if (TOadd2 != "") {
      TOAddress = TOAddress + ", " + TOadd2;
    }
    if (TOadd3 != "") {
      TOAddress = TOAddress + ", " + TOadd3;
    }

    var TOCity = record.original.ToCity;
    var TOState = record.original.ToState;
    var TOZipCo = record.original.toZip;

    var TOCitys =
      TOCity +
      ", " +
      TOState +
      " - " +
      TOZipCo ;
    let data = {
      ContainerID: this.props.history.location.state.containerId,
      shipmentID: record.original.ShippingID,
    };
    api
      .post("container/getShipmentsByContainerForPackageList", data)
      .then((res) => {
        if (res.success) {
          console.log("Res = ", res);

          var packdata = res.data.Packages;
          var packset = [];
          console.log("Res = ", packdata);

          var srno = 1
          var htmdata = ""

          var seqarr = [];

          for (let index = 0; index < packdata.length; index++) {
            // const element = array[index];

            for (let NextIndex = 0; NextIndex < packdata[index].length; NextIndex++) {
              // const element = array[NextIndex];
              var dataSets = {
                Sequence: packdata[index][NextIndex].Sequence,
                ContentDescription: packdata[index][NextIndex].ContentDescription
              }
              seqarr.push(dataSets)
              console.log(packdata[index][NextIndex].ContentDescription);

              
            }
            
          }
          console.log(seqarr)
          seqarr.sort((a,b) => a.Sequence - b.Sequence);

          for (let indextest = 0; indextest < seqarr.length; indextest++) {

            htmdata = htmdata + "<tr><td> "+ srno +" </td> <td>" +seqarr[indextest].Sequence+ "</td><td class='Pl-td-des' colSpan={2}>" +seqarr[indextest].ContentDescription+ "</td></tr>"
              srno = srno + 1;
            
            // const element = array[indextest];
            
          }

          console.log(seqarr)
          

          localStorage.setItem("TrackingNumber",record.original.TrackingNumber)
          localStorage.setItem("ContactName",record.original.ContactName)

          localStorage.setItem("ContainerName",record.original.ContainerName)
          localStorage.setItem("tableHTML",htmdata);


          console.log(htmdata)

          

          this.setState({
            PLFromAddress: FromAddress + ", " +  fromCitys,
            PLToAddress: TOAddress + ", " +  TOCitys ,
          });

          this.setState({
            PLdocOpen: true,
            // RemoveShipID: "",
          });



          // window.open(
          //   this.state.Base +
          //     "auth/PL/" +
          //     shipId +
          //     "/" +
          //     this.props.history.location.state.containerId,
      
          //   "_blank"
          // );
        } else {
          cogoToast.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.log("error.....", err);
      });
  };

  generateDOPDF = () =>{
    console.log('document.getElementById("DoDeliverTo").value = ',document.getElementById("DoDeliverTo").value);
    debugger
    localStorage.setItem("DoDeliverTo",document.getElementById("DoDeliverTo").value)
    localStorage.setItem("DOConsignee",document.getElementById("DOConsignee").value)
    localStorage.setItem("DONotifyParty",document.getElementById("DONotifyParty").value)
    localStorage.setItem("DoMBLNo",document.getElementById("DoMBLNo").value)
    localStorage.setItem("DoVessel",document.getElementById("DoVessel").value)
    localStorage.setItem("DoHBLNo",document.getElementById("DoHBLNo").value)
    localStorage.setItem("DoLoadingPort",document.getElementById("DoLoadingPort").value)

    
    localStorage.setItem("DoIGMNo",document.getElementById("DoIGMNo").value)
    localStorage.setItem("DoITMSub",document.getElementById("DoITMSub").value)
    localStorage.setItem("DoContainerNum",document.getElementById("DoContainerNum").value)
    localStorage.setItem("DoSealNumber",document.getElementById("DoSealNumber").value)
    localStorage.setItem("DoDescription",document.getElementById("DoDescription").value)
    localStorage.setItem("DOSequencelist",document.getElementById("DOSequencelist").value)

    
    localStorage.setItem("DoPackageNumber",document.getElementById("DoPackageNumber").value)
    localStorage.setItem("DOMEASUREMENT",document.getElementById("DOMEASUREMENT").value)
    localStorage.setItem("DOWEIGHT",document.getElementById("DOWEIGHT").value)

    localStorage.setItem("ContainerName",this.state.ContainerName)
    localStorage.setItem("IGMDate",this.state.IGMDate)
    localStorage.setItem("IGMInwardDate",this.state.IGMInwardDate)
    localStorage.setItem("HBLDate",this.state.HBLDate)
    localStorage.setItem("ETADate",this.state.ArrivalDate)
    
    var shipId = localStorage.getItem("shippid");
    this.setState({
      DOdocOpen: false,
      // RemoveShipID: "",
    });



    window.open(
      this.state.Base +
        "auth/DO/" +
        shipId +
        "/" +
        this.props.history.location.state.containerId,

      "_blank"
    );
    

  }

  generatePDF = () => {
    var shipId = localStorage.getItem("shippid");
    var containerName = document.getElementById("HContainerNumber").value;
    var BookingNumber = document.getElementById("BookingNumber").value;
    var BOLNumber = document.getElementById("BLNumber").value;
    var VesselNumber = document.getElementById("Vessel").value;
    var PlaceOfDeliveryByOnCarrier = document.getElementById("develiverd")
      .value;
    var PortOfUnloading = document.getElementById("Unloading").value;
    var PortOfLoading = document.getElementById("Export").value;
    var PointOfOrigin = document.getElementById("pointState").value;

    var pTracking = document.getElementById("TrackingNumber").value;

    var PNotifyGst = document.getElementById("PNotifyGst").value;
    var PNotifyEmail = document.getElementById("PNotifyEmail").value;
    var PnotifyPhone = document.getElementById("PnotifyPhone").value;

    var pPassportNumber = document.getElementById("pPassportNumber").value; 
    var FcontactName = document.getElementById("FcontactName").value; 
    var TcontactName = document.getElementById("TcontactName").value;    
    var NotifyNameParty = document.getElementById("NotifyNameParty").value;

    
  localStorage.setItem("NotifyNameParty", NotifyNameParty);
    localStorage.setItem("FcontactName", FcontactName);
    localStorage.setItem("TcontactName", TcontactName);

    localStorage.setItem("ContainerNumber", containerName);
    localStorage.setItem("BookingNumber", BookingNumber);
    localStorage.setItem("BOLNumber", BOLNumber);

    localStorage.setItem("PointOfOrigin", PointOfOrigin);
    localStorage.setItem("PortOfLoading", PortOfLoading);
    localStorage.setItem("PortOfUnloading", PortOfUnloading);
    localStorage.setItem(
      "PlaceOfDeliveryByOnCarrier",
      PlaceOfDeliveryByOnCarrier
    );
    localStorage.setItem("VesselNumber", VesselNumber);
    localStorage.setItem("TrackNO", pTracking);

    localStorage.setItem("hblDate", this.state.HBLDate);

    var TOAddress = "";
    var TOCitys = "";
    var TOContact = "";

    var toFullAdd = document.getElementById("ConsignedTo").value;
    toFullAdd = toFullAdd
    
    var passpData = "Passport: " +  pPassportNumber;
    localStorage.setItem("pPassportNumber", passpData);


    localStorage.setItem("TOAddress", toFullAdd);
    var FromFullAdd = document.getElementById("ShipperExportor").value;

    localStorage.setItem("FromAddress", FromFullAdd);

    var NotifyData = document.getElementById("ConsigneeDetails").value;
    NotifyData = NotifyData + " ," + PnotifyPhone +
    ",  Email: " +
    PNotifyEmail

    var GSTINData = "GST: " +
    PNotifyGst;


    localStorage.setItem("GST" , GSTINData)

    // const notifyArray = NotifyData.split(" ~ ");
    var dataHtml = "";

    dataHtml =
      dataHtml +
      " <tr><td>" +
      document.getElementById("Sequencelist").value +
      "</td><td>" +
      document.getElementById("PackageNumber").value +
      "</td><td>USED HOUSE HOLD GOODS AND PERSONAL EFFECTS</td><td>" +
      document.getElementById("WEIGHT").value +
      " KG.</td><td>" +
      document.getElementById("MEASUREMENT").value +
      " CBM</td></tr>";

    localStorage.setItem("dataHtml", dataHtml);
    localStorage.setItem("NotifyParty", NotifyData);
    // localStorage.setItem("NotifyPartyName",this.state.NotifyPartyName)
    // localStorage.setItem("NotifyPartyPhone", notifyArray[3]);
    // localStorage.setItem("NotifyPartyAddr3", notifyArray[1]);
    // localStorage.setItem("NotifyPartyCity", notifyArray[2]);

    if(!this.state.HBLDate){
      cogoToast.error("Please select HBL Date of container");
      return;
    }

    window.open(
      this.state.Base +
        "auth/HBL/" +
        shipId +
        "/" +
        this.props.history.location.state.containerId,

      "_blank"
    );

    this.setState({
      HBLdocOpen: false,
      // RemoveShipID: "",
    });
  };

  getShipmentByContainerMergeHBL = (record) => {
    try {
      let data = {
        ContainerID: this.props.history.location.state.containerId,
        shipmentID: record.original.ShippingID,
      };
      api
        .post("container/getShipmentsByContainerForHBL", data)
        .then((res) => {
          if (res.success) {
            var counts = 0;
            var tvcount = 0;
            var cftCount = 0;

            this.state.PrimaryID = record.original.ShippingID;

            for (let index = 0; index < res.data.Shipments.length; index++) {
              counts = counts + res.data.Shipments[index].TotalPackages;
              tvcount = tvcount + res.data.Shipments[index].TV;
              cftCount = cftCount + res.data.Shipments[index].CFT;
              //const element = array[index];
            }
            this.state.TotalTVCountHBL = tvcount;
            this.state.TotalCFTCountHBL = cftCount;

            this.state.TotalPackagesCountHBL = counts;
            console.log("counts = ", counts);

            this.setState({
              ShipmentListHBL: res.data.Shipments,
              SetShiprecordHBL: true,
              // Sequence: res.data.Packages,
            });
          } else {
            cogoToast.error("Something went wrong");
          }
        })
        .catch((err) => {
          console.log("error.....", err);
        });
    } catch (err) {}
  };

  openDeleteRequestModal(record) {
    console.log(record);
    this.setState({
      DeleteRequest: true,
      ShippingIDDel: record.original.ShippingID,
    });
  }

  confirmShipStatusHBLData = () => {
    var datatosend = {
      shippingID: 0,
      UpdateShipping: this.state.ShippingIDDel,
    };

    api.post("contactus/UpdateHBL", datatosend).then((res) => {
      this.hideLoader();
      if (res.success) {
        this.setState({
          DeleteRequest: false,
          ShippingIDDel: "",
          SetShiprecordHBL: false,
        });
        cogoToast.success("Shipment removed");
        this.reCallApi();
      } else {
        cogoToast.error("Something went wrong");
      }
    });
  };

  handleEditHBL(record) {
    console.log(record);
    var shipID = record.original.ShippingID;
    var YesNO = [];

    for (
      let hblindexauto = 0;
      hblindexauto < this.state.HBLShipmentList.length;
      hblindexauto++
    ) {
      // const element = array[hblindexauto];
      // var dataSets = []
      if (this.state.HBLShipmentList[hblindexauto].ShippingID != shipID) {
        YesNO.push(this.state.HBLShipmentList[hblindexauto]);
      }
    }

    // console.log("yesno = ",YesNO )
    // this.setState({
    //   serviceNameData:YesNO,
    // });

    this.setState({
      SetShiprecord: true,
      RemoveShipID: shipID,
      HBLYesNOREC: YesNO,
    });
  }

  editShipment = (record) => {
    const { history } = this.props;
    history.push({
      pathname: "ShipmentNew",
      state: {
        ShipppingID: record.original.ShippingID,
        filterlist: this.state.filterProps,
        sortlist: this.state.sortProps,
      },
    });
  };

  selectChangeTab2 = (event, type, idx) => {
    // let index = this.state.PackageList.findIndex((x) => x.Index === idx);
    
    
    console.log(event.target.value)
    if(event.target.value == "HBL"){
      this.generateHBL(idx)
    }
    if(event.target.value == "PL"){
      this.generatePL(idx)
    }

    if(event.target.value == "DO"){
      this.generateDO(idx)
      
    }
    
    
  };

  render() {
    // const serviceNameDataHBL = this.state.HBLShipmentList.map((type) => {
    //   return { value: type.ShippingID, label: type.TrackingNumber };
    // });
    const columns = [
      {
        Header: "Document Name",
        accessor: "Name",
        width: 300,
        filterable: false,
        sortable: false,
        maxWidth: 300,
        Cell: this.renderDocumentName,
      },
      {
        Header: "CreatedOn",
        id: "createdon",
        filterable: false,
        sortable: false,
        sortMethod: (a, b) => {
          return CommonConfig.dateSortMethod(a, b);
        },
        accessor: (data) => {
          return moment(data.DocumentCreatedOn).format(
            CommonConfig.dateFormat.dateOnly
          );
        },
        width: 220,
        maxWidth: 220,
      },
      {
        Header: "Attachment",
        accessor: "actions",
        width: 100,
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
                record.original.DocumentType === "Reports" ? (
                  <Button
                    className="normal-btn sm-orange"
                    onClick={() => this.ReportCreate(record.original.FileName)}
                  >
                    Download
                  </Button>
                ) : (
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
                )
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
          return (
            <div className="align-right">
              {(record.index !== 0 || record.original.AttachmentPath) &&
              this.state.Access.DeleteAccess === 1 ? (
                <Button
                  justIcon
                  color="danger"
                  className="Plus-btn"
                  onClick={(e) => this.handleDocumentDelete(e, record.original)}
                >
                  <i className={"fas fa-minus"} />
                </Button>
              ) : null}

              {this.state.Attachments.filter(
                (x) => x.Status === "Active" || x.Status === "Inprocess"
              ).length ===
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

    const HBLColums = [
      {
        Header: "Tracking",
        accessor: "TrackingNumber",
        width: 85,
        style: {
          cursor: "pointer",
          textDecorationLine: "underline",
          fontWeight: "bold",
        },
        Cell: (record) => {
          return (
            <href onClick={() => this.editShipment(record)}>
              {record.original.TrackingNumber}
            </href>
          );
        },
      },
      {
        Header: "Sender",
        accessor: "ContactName",
        width: 85,
      },

      {
        Header: "From State",
        accessor: "FromState",
        width: 70,
      },

      {
        Header: "To State",
        accessor: "ToState",
        width: 75,
      },
      {
        Header: "SC",
        accessor: "setsc",
        width: 70,
      },
      {
        Header: "PC",
        // Footer: (
        //   <span>
        //     {CommonConfig.isEmpty(this.state.TotalPackagesCount)
        //       ? ""
        //       :
        //         parseFloat(this.state.TotalPackagesCount)
        //          }
        //   </span>
        // ),
        accessor: "setPack",
        width: 35,
      },

     
      {
        Header: "Status",
        accessor: "ShipmentStatus",
        width: 65,
      },
      {
        Header: "Managed By",
        accessor: "ManagedBy",
        width: 61,
      },
      {
        Header: "Actions",
        accessor: "Actions",
        width: 40,
        maxWidth: 50,
        filterable: false,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              <Button
                justIcon
                color="facebook"
                onClick={() => this.handleEditHBL(record)}
                className="Plus-btn "
              >
                <i className="fas fa-plus"></i>
              </Button>
            </div>
          );
        },
        sortable: false,
      },

      {
        Header: "View",
        accessor: "View",
        width: 40,
        maxWidth: 50,
        filterable: false,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              {/* <Button
                justIcon
                color="info"
                onClick={() => this.getShipmentByContainerMergeHBL(record)}
              >
                <i className="fas fa-plus"></i>
              </Button> */}

              <Button
                justIcon
                color="info"
                onClick={() => this.getShipmentByContainerMergeHBL(record)}
                className="Plus-btn "
              >
                <i className={"fas fa-eye"} />
              </Button>
            </div>
          );
        },
        sortable: false,
      },

      {
        Header: "Generate",
        accessor: "Generate",
        width: 80,
        maxWidth: 50,
        filterable: false,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              {/* <Button
                justIcon
                color="info"
                onClick={() => this.getShipmentByContainerMergeHBL(record)}
              >
                <i className="fas fa-plus"></i>
              </Button> */}

                    <FormControl  fullWidth>
                      <Select
                        id="package_number"
                        name="package_number"
                        value={this.state.generatedata}
                        className="form-control"
                        onChange={(event) =>
                          this.selectChangeTab2(
                            event,
                            "PackedType",
                            record
                          )
                        }
                        // onBlur={(event, value) =>
                        //   this.state.identical === "Yes"
                        //     ? this.PackTtypeOnBlur(
                        //         event,
                        //         "PackedType",
                        //         packages.Index
                        //       )
                        //     : this.selectChangeTab2(
                        //         event,
                        //         "PackedType",
                        //         packages.Index
                        //       )
                        // }
                      >
                        {this.packedBy()}
                      </Select>
                    </FormControl>

              {/* <Button
                justIcon
                color="success"
                className="Plus-btn"
                onClick={() => this.generateHBL(record)}
              >
                <i className={"fas fa-check"} />
              </Button> */}
            </div>
          );
        },
        sortable: false,
      },

      // {
      //   Header: "HBL",
      //   accessor: "Generate",
      //   width: 40,
      //   maxWidth: 50,
      //   filterable: false,
      //   Cell: (record) => {
      //     return (
      //       <div className="table-common-btn">
      //         {/* <Button
      //           justIcon
      //           color="info"
      //           onClick={() => this.getShipmentByContainerMergeHBL(record)}
      //         >
      //           <i className="fas fa-plus"></i>
      //         </Button> */}

      //         <Button
      //           justIcon
      //           color="success"
      //           className="Plus-btn"
      //           onClick={() => this.generateHBL(record)}
      //         >
      //           <i className={"fas fa-check"} />
      //         </Button>
      //       </div>
      //     );
      //   },
      //   sortable: false,
      // },

      // {
      //   Header: "PL",
      //   accessor: "Generate",
      //   width: 40,
      //   maxWidth: 50,
      //   filterable: false,
      //   Cell: (record) => {
      //     return (
      //       <div className="table-common-btn">
      //         {/* <Button
      //           justIcon
      //           color="info"
      //           onClick={() => this.getShipmentByContainerMergeHBL(record)}
      //         >
      //           <i className="fas fa-plus"></i>
      //         </Button> */}

      //         <Button
      //           justIcon
      //           color="success"
      //           className="Plus-btn"
      //           onClick={() => this.generatePL(record)}
      //         >
      //           <i className={"fas fa-check"} />
      //         </Button>
      //       </div>
      //     );
      //   },
      //   sortable: false,
      // },
    ];

    const shipColums = [
      {
        Header: "Tracking",
        accessor: "TrackingNumber",
        width: 85,
        style: {
          cursor: "pointer",
          textDecorationLine: "underline",
          fontWeight: "bold",
        },
        Cell: (record) => {
          return (
            <href onClick={() => this.editShipment(record)}>
              {record.original.TrackingNumber}
            </href>
          );
        },
      },
      {
        Header: "Sender",
        accessor: "ContactName",
        width: 85,
      },
      {
        Header: "From City",
        accessor: "FromCity",
        width: 60,
      },
      {
        Header: "From State",
        accessor: "FromState",
        width: 70,
      },
      {
        Header: "To City",
        accessor: "ToCity",
        width: 70,
      },
      {
        Header: "To State",
        accessor: "ToState",
        width: 75,
      },
      {
        Header: "PC",
        Footer: (
          <span>
            {CommonConfig.isEmpty(this.state.TotalPackagesCount)
              ? ""
              : parseFloat(this.state.TotalPackagesCount)}
          </span>
        ),
        accessor: "TotalPackages",
        width: 35,
      },
      {
        Header: "MovingBackToIndia",
        id: "TR",
        accessor: (data) => {
          return !CommonConfig.isEmpty(data.MovingBackToIndia)
            ? data.MovingBackToIndia.data[0] === 0
              ? "No"
              : "Yes"
            : "";
        },
        width: 38,
      },
      {
        Header: "Passport?",
        id: "passport",
        accessor: (data) => {
          return !CommonConfig.isEmpty(data.AbleToProvidePassport)
            ? data.AbleToProvidePassport.data[0] === 0
              ? "No"
              : "Yes"
            : "";
        },
        width: 42,
      },
      {
        Header: "TV",
        accessor: "TV",
        Footer: (
          <span>
            {CommonConfig.isEmpty(this.state.TotalTVCount)
              ? ""
              : parseFloat(this.state.TotalTVCount)}
          </span>
        ),
        width: 30,
      },
      {
        Header: "CFT",
        accessor: "CFT",
        Footer: (
          <span>
            {CommonConfig.isEmpty(this.state.TotalCFTCount)
              ? ""
              : parseFloat(this.state.TotalCFTCount)
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        ),
        width: 75,
      },
      {
        Header: "Status",
        accessor: "ShipmentStatus",
        width: 65,
      },
      {
        Header: "Managed By",
        accessor: "ManagedBy",
        width: 61,
      },
      {
        Header: "Is Clear",
        accessor: "AllClear",
        width: 70,
      },
    ];

    const shipColumsHBL = [
      {
        Header: "Tracking",
        accessor: "TrackingNumber",
        width: 85,
        style: {
          cursor: "pointer",
          textDecorationLine: "underline",
          fontWeight: "bold",
        },
        Cell: (record) => {
          return (
            <href onClick={() => this.editShipment(record)}>
              {record.original.TrackingNumber}
            </href>
          );
        },
      },
      {
        Header: "Sender",
        accessor: "ContactName",
        width: 85,
      },
      {
        Header: "From City",
        accessor: "FromCity",
        width: 60,
      },
      {
        Header: "From State",
        accessor: "FromState",
        width: 70,
      },
      {
        Header: "To City",
        accessor: "ToCity",
        width: 70,
      },
      {
        Header: "To State",
        accessor: "ToState",
        width: 75,
      },
      {
        Header: "PC",
        Footer: (
          <span>
            {CommonConfig.isEmpty(this.state.TotalPackagesCountHBL)
              ? ""
              : parseFloat(this.state.TotalPackagesCountHBL)}
          </span>
        ),
        accessor: "TotalPackages",
        width: 35,
      },
      {
        Header: "MovingBackToIndia",
        id: "TR",
        accessor: (data) => {
          return !CommonConfig.isEmpty(data.MovingBackToIndia)
            ? data.MovingBackToIndia.data[0] === 0
              ? "No"
              : "Yes"
            : "";
        },
        width: 38,
      },
      {
        Header: "Passport?",
        id: "passport",
        accessor: (data) => {
          return !CommonConfig.isEmpty(data.AbleToProvidePassport)
            ? data.AbleToProvidePassport.data[0] === 0
              ? "No"
              : "Yes"
            : "";
        },
        width: 42,
      },
      {
        Header: "TV",
        accessor: "TV",
        Footer: (
          <span>
            {CommonConfig.isEmpty(this.state.TotalTVCountHBL)
              ? ""
              : parseFloat(this.state.TotalTVCountHBL)}
          </span>
        ),
        width: 30,
      },
      {
        Header: "CFT",
        accessor: "CFT",
        Footer: (
          <span>
            {CommonConfig.isEmpty(this.state.TotalCFTCountHBL)
              ? ""
              : parseFloat(this.state.TotalCFTCountHBL)
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
        ),
        width: 75,
      },
      {
        Header: "Status",
        accessor: "ShipmentStatus",
        width: 65,
      },
      {
        Header: "Managed By",
        accessor: "ManagedBy",
        width: 61,
      },
      {
        Header: "Is Clear",
        accessor: "AllClear",
        width: 70,
      },
      {
        Header: "Delete",
        accessor: "delete",
        sortable: false,
        width: 50,
        maxWidth: 80,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              {record.original.ShippingID != this.state.PrimaryID ? (
                <Button
                  justIcon
                  onClick={() => this.openDeleteRequestModal(record)}
                  color="danger"
                >
                  <i class="fas fa-trash"></i>
                </Button>
              ) : null}
            </div>
          );
        },
        filterable: false,
      },
    ];

    const shipColumsDataHBL = [
      {
        Header: "Tracking",
        accessor: "TrackingNumber",
        width: 85,
        style: {
          cursor: "pointer",
          textDecorationLine: "underline",
          fontWeight: "bold",
        },
        Cell: (record) => {
          return (
            <href onClick={() => this.editShipment(record)}>
              {record.original.TrackingNumber}
            </href>
          );
        },
      },
      {
        Header: "Sender",
        accessor: "ContactName",
        width: 85,
      },

      {
        Header: "From State",
        accessor: "FromState",
        width: 70,
      },

      {
        Header: "To State",
        accessor: "ToState",
        width: 75,
      },
      {
        Header: "PC",
        accessor: "TotalPackages",
        width: 35,
      },

      {
        Header: "CFT",
        accessor: "CFT",

        width: 75,
      },
      {
        Header: "ADD",
        accessor: "ADD",
        width: 40,
        maxWidth: 50,
        filterable: false,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              {/* <Button
                justIcon
                color="info"
                onClick={() => this.getShipmentByContainerMergeHBL(record)}
              >
                <i className="fas fa-plus"></i>
              </Button> */}

              <Button
                justIcon
                color="facebook"
                onClick={() => this.UpdateHBLShipID(record)}
                className="Plus-btn "
              >
                <i className={"fas fa-plus"} />
              </Button>
            </div>
          );
        },
        sortable: false,
      },
    ];

    const {
      ShipmentStatus,
      ContainerShortName,
      containershortnameHelperText,
      containershortnameErr,
      IGMNumber,
      IGMNumberHelperText,
      IGMNumberErr,
      ContainerName,
      containernameErr,
      containernameHelperText,
      ContainerSize,
      containersizeErr,
      containersizeHelperText,
      CurrentStatus,
      currentstatusErr,
      currentstatusHelperText,
      ContainerStatus,
      containerstatusErr,
      containerstatusHelperText,
      ContainerNumber,
      containernumberErr,
      containernumberHelperText,
      SealNumber,
      sealnumberErr,
      sealnumberHelperText,
      BookingNumber,
      bookingnumberErr,
      bookingnumberHelperText,
      BOLNumber,
      BOLnumberErr,
      BOLnumberHelperText,
      PointOfOrigin,
      pointoforiginErr,
      pointoforiginHelperText,
      PortOfLoading,
      UpdateShipIDHBLSET,
      portofloadingErr,
      portofloadingHelperText,
      PortOfUnloading,
      portofunloadingErr,
      portofunloadingHelperText,
      PlaceOfDeliveryByOnCarrier,
      placeofdeliveryErr,
      placeofdeliveryHelperText,
      VesselNumber,
      vesselnumberErr,
      vesselnumberHelperText,
      HBLDate,
      hbldateErr,
      hbldateHelperText,

      IGMDate,
      IGMDateErr,
      IGMDateHelperText,

      IGMInwardDate,
      IGMInwardDateErr,
      IGMInwardDateHelperText,
      DOConsignee,
      DONotifyParty,
      DoDeliverTo,
      DoMBLNo,
      DoVessel,
      DoHBLNo,
      DoLoadingPort,
      DoIGMNo,
      DoITMSub,
      DoContainerNum,
      DoSealNumber,
      DoDescription,

      DOSequencelist,
      DoPackageNumber,
      DOWEIGHT,
      DOMEASUREMENT,

      CreatedOn,
      LoadDate,
      loaddateErr,
      loaddateHelperText,
      SailingDate,
      sailingdateErr,
      sailingdateHelperText,
      ArrivalDate,
      arrivaldateErr,
      arrivaldateHelperText,
      FreightForwarder,
      freightforwarderErr,
      freightforwarderHelperText,
      Carrier,
      carrierErr,
      carrierHelperText,
      CreatedBy,
      NotifyParty,
      notifypartyErr,
      notifypartyHelperText,
      CustomsBroker,
      customsbrokerErr,
      customsbrokerHelperText,
      Access,
      serviceNameData,

      PackageNumber,
      description,
      WEIGHT,
      MEASUREMENT,
      // BookingNumber,
      HTrackingNumber,
      HContainerNumber,
      PNotifyGst,
      PNotifyEmail,
      pPassportNumber,
      NotifyNameParty,
      PnotifyPhone,
      TcontactName,
      FcontactName,
      PLToAddress,
      PLFromAddress,
      BLNumber,
      pTrackingNumber,
      Vessel,
      Export,
      Unloading,
      develiverd,
      TypeOfMove,
      pointState,
      FMCnumber,
    } = this.state;

    return (
      <GridContainer className="UserList-outer">
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}

        <GridContainer justify="center" className="schedule-pickup-main-outer">
          <GridItem xs={12} sm={12}>
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
          </GridItem>
        </GridContainer>
        <div className="shipment-content">
          <div className="shipment-pane" id="containerdetails">
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className="mb-0" fullWidth>
                        <CustomInput
                          labelText="Container Name"
                          id="containername"
                          formControlProps={{ fullWidth: true }}
                          error={containernameErr}
                          helperText={containernameHelperText}
                          inputProps={{
                            value: ContainerName,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className="requiredicon">
                                  perm_identity
                                </Icon>
                              </InputAdornment>
                            ),
                            onChange: (event) =>
                              this.handleChange(event, "containername"),
                            onBlur: (event) =>
                              this.handleBlur(event, "containername"),
                            onFocus: () =>
                              this.setState({
                                containernameErr: false,
                                containernameHelperText: "",
                              }),
                          }}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className="mb-0" fullWidth>
                        <CustomInput
                          labelText="Container short Name"
                          id="containershortname"
                          formControlProps={{ fullWidth: true }}
                          error={containershortnameErr}
                          helperText={containershortnameHelperText}
                          inputProps={{
                            value: ContainerShortName,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className="requiredicon">
                                  perm_identity
                                </Icon>
                              </InputAdornment>
                            ),
                            onChange: (event) =>
                              this.handleChange(event, "containershortname"),
                            onBlur: (event) =>
                              this.handleBlur(event, "containershortname"),
                            onFocus: () =>
                              this.setState({
                                containershortnameErr: false,
                                containershortnameHelperText: "",
                              }),
                          }}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                      <div className="select-spl">
                        <FormControl error={containersizeErr} fullWidth>
                          <InputLabel>Container Size</InputLabel>
                          <Select
                            value={ContainerSize}
                            onChange={(event) =>
                              this.selectChange(event, "containersize")
                            }
                            onFocus={() =>
                              this.setState({
                                containersizeErr: false,
                                containersizeHelperText: "",
                              })
                            }
                            inputProps={{
                              name: "containersize",
                              id: "containersize",
                            }}
                          >
                            {this.containerSize()}
                          </Select>
                          <FormHelperText>
                            {containersizeHelperText}
                          </FormHelperText>
                        </FormControl>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <div className="select-spl">
                        <FormControl error={currentstatusErr} fullWidth>
                          <InputLabel>Current Status</InputLabel>
                          <Select
                            value={CurrentStatus}
                            onChange={(event) =>
                              this.selectChange(event, "currentstatus")
                            }
                            onFocus={() =>
                              this.setState({
                                currentstatusErr: false,
                                currentstatusHelperText: "",
                              })
                            }
                            inputProps={{
                              name: "currentstatus",
                              id: "currentstatus",
                            }}
                          >
                            {this.containerStatus()}
                          </Select>
                          <FormHelperText>
                            {currentstatusHelperText}
                          </FormHelperText>
                        </FormControl>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className="mb-0" fullWidth>
                        <CustomInput
                          labelText="Container Number"
                          id="containernumber"
                          formControlProps={{ fullWidth: true }}
                          error={containernumberErr}
                          helperText={containernumberHelperText}
                          inputProps={{
                            value: ContainerNumber,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon>perm_identity</Icon>
                              </InputAdornment>
                            ),
                            onChange: (event) =>
                              this.handleChange(event, "containernumber"),
                            onBlur: (event) =>
                              this.handleBlur(event, "containernumber"),
                            onFocus: () =>
                              this.setState({
                                containernumberErr: false,
                                containernumberHelperText: "",
                              }),
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className="mb-0" fullWidth>
                        <CustomInput
                          labelText="Vessel Number"
                          id="vesselnumber"
                          formControlProps={{ fullWidth: true }}
                          error={vesselnumberErr}
                          helperText={vesselnumberHelperText}
                          inputProps={{
                            value: VesselNumber,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon>perm_identity</Icon>
                              </InputAdornment>
                            ),
                            onChange: (event) =>
                              this.handleChange(event, "vesselnumber"),
                            onBlur: (event) =>
                              this.handleBlur(event, "vesselnumber"),
                            onFocus: () =>
                              this.setState({
                                vesselnumberErr: false,
                                vesselnumberHelperText: "",
                              }),
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className="mb-0" fullWidth>
                        <CustomInput
                          labelText="Seal Number"
                          id="containernumber"
                          formControlProps={{ fullWidth: true }}
                          error={sealnumberErr}
                          helperText={sealnumberHelperText}
                          inputProps={{
                            value: SealNumber,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon>perm_identity</Icon>
                              </InputAdornment>
                            ),
                            onChange: (event) =>
                              this.handleChange(event, "sealnumber"),
                            onBlur: (event) =>
                              this.handleBlur(event, "sealnumber"),
                            onFocus: () =>
                              this.setState({
                                sealnumberErr: false,
                                sealnumberHelperText: "",
                              }),
                          }}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className="mb-0" fullWidth>
                        <CustomInput
                          labelText="Booking Number"
                          id="bookingnumber"
                          formControlProps={{ fullWidth: true }}
                          error={bookingnumberErr}
                          helperText={bookingnumberHelperText}
                          inputProps={{
                            value: BookingNumber,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon>perm_identity</Icon>
                              </InputAdornment>
                            ),
                            onChange: (event) =>
                              this.handleChange(event, "bookingnumber"),
                            onBlur: (event) =>
                              this.handleBlur(event, "bookingnumber"),
                            onFocus: () =>
                              this.setState({
                                bookingnumberErr: false,
                                bookingnumberHelperText: "",
                              }),
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className="mb-0" fullWidth>
                        <CustomInput
                          labelText="BOL Number"
                          id="bolnumber"
                          formControlProps={{ fullWidth: true }}
                          error={BOLnumberErr}
                          helperText={BOLnumberHelperText}
                          inputProps={{
                            value: BOLNumber,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon>perm_identity</Icon>
                              </InputAdornment>
                            ),
                            onChange: (event) =>
                              this.handleChange(event, "bolnumber"),
                            onBlur: (event) =>
                              this.handleBlur(event, "bolnumber"),
                            onFocus: () =>
                              this.setState({
                                BOLnumberErr: false,
                                BOLnumberHelperText: "",
                              }),
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    {/* Pendingd */}

                    <GridItem xs={12} sm={12} md={3}>
                      <div className="dt-vs date-spl">
                        <FormControl fullWidth>
                          <Datetime
                            dateFormat={"MM/DD/YYYY"}
                            timeFormat={false}
                            value={HBLDate}
                            inputProps={{ placeholder: "HBL Date" }}
                            onChange={(date) => this.handleDate(date, "hbl")}
                            closeOnSelect={true}
                            renderInput={(params) => (
                              <TextField
                                style={{ marginTop: "-15px" }}
                                error={hbldateErr}
                                helperText={hbldateHelperText}
                                {...params}
                                label="HBL/MBL/BOL Date"
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
                            value={LoadDate}
                            inputProps={{ placeholder: "Load Date" }}
                            onChange={(date) => this.handleDate(date, "load")}
                            closeOnSelect={true}
                            renderInput={(params) => (
                              <TextField
                                style={{ marginTop: "-15px" }}
                                error={loaddateErr}
                                helperText={loaddateHelperText}
                                {...params}
                                label="Load Date"
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
                            value={SailingDate}
                            inputProps={{ placeholder: "Sailing Date" }}
                            onChange={(date) =>
                              this.handleDate(date, "sailing")
                            }
                            closeOnSelect={true}
                            renderInput={(params) => (
                              <TextField
                                style={{ marginTop: "-15px" }}
                                error={sailingdateErr}
                                helperText={sailingdateHelperText}
                                {...params}
                                label="Sailing Date"
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
                      <FormControl className="mb-0" fullWidth>
                        <CustomInput
                          labelText="Place of Delivery by On-Carrier"
                          id="placeofdelivery"
                          formControlProps={{ fullWidth: true }}
                          error={placeofdeliveryErr}
                          helperText={placeofdeliveryHelperText}
                          inputProps={{
                            value: PlaceOfDeliveryByOnCarrier,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon>perm_identity</Icon>
                              </InputAdornment>
                            ),
                            onChange: (event) =>
                              this.handleChange(event, "placeofdelivery"),
                            onBlur: (event) =>
                              this.handleBlur(event, "placeofdelivery"),
                            onFocus: () =>
                              this.setState({
                                placeofdeliveryErr: false,
                                placeofdeliveryHelperText: "",
                              }),
                          }}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        labelText="Point of Origin"
                        id="pointoforigin"
                        formControlProps={{ fullWidth: true }}
                        error={pointoforiginErr}
                        helperText={pointoforiginHelperText}
                        inputProps={{
                          value: PointOfOrigin,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon>perm_identity</Icon>
                            </InputAdornment>
                          ),
                          onChange: (event) =>
                            this.handleChange(event, "pointoforigin"),
                          onBlur: (event) =>
                            this.handleBlur(event, "pointoforigin"),
                          onFocus: () =>
                            this.setState({
                              pointoforiginErr: false,
                              pointoforiginHelperText: "",
                            }),
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className="mb-0" fullWidth>
                        <CustomInput
                          labelText="Port of Loading"
                          id="pointofloading"
                          formControlProps={{ fullWidth: true }}
                          error={portofloadingErr}
                          helperText={portofloadingHelperText}
                          inputProps={{
                            value: PortOfLoading,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon>perm_identity</Icon>
                              </InputAdornment>
                            ),
                            onChange: (event) =>
                              this.handleChange(event, "portofloading"),
                            onBlur: (event) =>
                              this.handleBlur(event, "portofloading"),
                            onFocus: () =>
                              this.setState({
                                portofloadingErr: false,
                                portofloadingHelperText: "",
                              }),
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className="mb-0" fullWidth>
                        <CustomInput
                          labelText="Port of Unloading"
                          id="pointofunloading"
                          formControlProps={{ fullWidth: true }}
                          error={portofunloadingErr}
                          helperText={portofunloadingHelperText}
                          inputProps={{
                            value: PortOfUnloading,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon>perm_identity</Icon>
                              </InputAdornment>
                            ),
                            onChange: (event) =>
                              this.handleChange(event, "portofunloading"),
                            onBlur: (event) =>
                              this.handleBlur(event, "portofunloading"),
                            onFocus: () =>
                              this.setState({
                                portofunloadingErr: false,
                                portofunloadingHelperText: "",
                              }),
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    
                    <GridItem xs={12} sm={12} md={3}>
                      <div className="dt-vs date-spl">
                        <FormControl fullWidth>
                          <Datetime
                            dateFormat={"MM/DD/YYYY"}
                            timeFormat={false}
                            value={ArrivalDate}
                            inputProps={{ placeholder: "Arrival Date" }}
                            onChange={(date) =>
                              this.handleDate(date, "arrival")
                            }
                            closeOnSelect={true}
                            renderInput={(params) => (
                              <TextField
                                style={{ marginTop: "-15px" }}
                                error={arrivaldateErr}
                                helperText={arrivaldateHelperText}
                                {...params}
                                label="Arrival Date"
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
                      <div className="select-spl">
                        <FormControl error={freightforwarderErr} fullWidth>
                          <InputLabel>Freight Forwarder</InputLabel>
                          <Select
                            value={FreightForwarder}
                            onChange={(event) =>
                              this.selectChange(event, "freight")
                            }
                            onFocus={() =>
                              this.setState({
                                freightforwarderErr: false,
                                freightforwarderHelperText: "",
                              })
                            }
                            inputProps={{
                              name: "freight",
                              id: "freight",
                            }}
                          >
                            {this.freightForwarderMap()}
                          </Select>
                          <FormHelperText>
                            {freightforwarderHelperText}
                          </FormHelperText>
                        </FormControl>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <div className="select-spl">
                        <FormControl error={carrierErr} fullWidth>
                          <InputLabel>Carrier</InputLabel>
                          <Select
                            value={Carrier}
                            onChange={(event) =>
                              this.selectChange(event, "carrier")
                            }
                            onFocus={() =>
                              this.setState({
                                carrierErr: false,
                                carrierHelperText: "",
                              })
                            }
                            inputProps={{
                              name: "carrier",
                              id: "carrier",
                            }}
                          >
                            {this.carrierList()}
                          </Select>
                          <FormHelperText>{carrierHelperText}</FormHelperText>
                        </FormControl>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <div className="select-spl">
                        <FormControl error={notifypartyErr} fullWidth>
                          <InputLabel>Notify Party</InputLabel>
                          <Select
                            value={NotifyParty}
                            onChange={(event) =>
                              this.selectChange(event, "notify")
                            }
                            onFocus={() =>
                              this.setState({
                                notifypartyErr: false,
                                notifypartyHelperText: "",
                              })
                            }
                            inputProps={{
                              name: "notify",
                              id: "notify",
                            }}
                          >
                            {this.freightForwarderMap()}
                          </Select>
                          <FormHelperText>
                            {notifypartyHelperText}
                          </FormHelperText>
                        </FormControl>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <div className="select-spl">
                        <FormControl error={customsbrokerErr} fullWidth>
                          <InputLabel>Customs Broker</InputLabel>
                          <Select
                            value={CustomsBroker}
                            onChange={(event) =>
                              this.selectChange(event, "customsbroker")
                            }
                            onFocus={() =>
                              this.setState({
                                customsbrokerErr: false,
                                customsbrokerHelperText: "",
                              })
                            }
                            inputProps={{
                              name: "customsbroker",
                              id: "customsbroker",
                            }}
                          >
                            {this.customsBroker()}
                          </Select>
                          <FormHelperText>
                            {customsbrokerHelperText}
                          </FormHelperText>
                        </FormControl>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className="mb-0" fullWidth>
                        <CustomInput
                          labelText="Created On"
                          id="createdon"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            value: CreatedOn,
                            disabled: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className="requiredicon">
                                  perm_identity
                                </Icon>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className="mb-0" fullWidth>
                        <CustomInput
                          labelText="Created By"
                          id="pointofloading"
                          formControlProps={{ fullWidth: true }}
                          inputProps={{
                            value: CreatedBy,
                            disabled: true,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Icon className="requiredicon">
                                  perm_identity
                                </Icon>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <div className="select-spl">
                        <FormControl error={containerstatusErr} fullWidth>
                          <InputLabel>Active</InputLabel>
                          <Select
                            value={ContainerStatus}
                            onChange={(event) =>
                              this.selectChange(event, "containerstatus")
                            }
                            onFocus={() =>
                              this.setState({
                                containerstatusErr: false,
                                containerstatusHelperText: "",
                              })
                            }
                            inputProps={{
                              name: "containerstatus",
                              id: "containerstatus",
                            }}
                          >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                          </Select>
                          <FormHelperText>
                            {containerstatusHelperText}
                          </FormHelperText>
                        </FormControl>
                      </div>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                      <div className="select-spl">
                        <FormControl fullWidth>
                          <InputLabel
                            htmlFor="packagetype"
                            className={classes.selectLabel}
                          >
                            Shipment Status
                          </InputLabel>
                          <Select
                            disabled={
                              this.state.Access.WriteAccess === 1 ? false : true
                            }
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

                    <GridItem xs={12} sm={12} md={3}>
                      <FormControl className="mb-0" fullWidth>
                        <CustomInput
                          labelText="IGM Number"
                          id="IGMNumber"
                          formControlProps={{ fullWidth: true }}
                          // error={containershortnameErr}
                          // helperText={containershortnameHelperText}
                          inputProps={{
                            value: IGMNumber,
                            // endAdornment: (
                            //   <InputAdornment position="end">
                            //     <Icon className="requiredicon">
                            //       perm_identity
                            //     </Icon>
                            //   </InputAdornment>
                            // ),
                            onChange: (event) =>
                              this.handleChange(event, "IGMNumber"),
                            onBlur: (event) =>
                              this.handleBlur(event, "IGMNumber"),
                            onFocus: () =>
                              this.setState({
                                IGMNumberErr: false,
                                IGMNumberHelperText: "",
                              }),
                          }}
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={3}>
                      <div className="dt-vs date-spl">
                        <FormControl fullWidth>
                          <Datetime
                            dateFormat={"MM/DD/YYYY"}
                            timeFormat={false}
                            value={IGMDate}
                            inputProps={{ placeholder: "IGM Date" }}
                            onChange={(date) => this.handleDate(date, "IGMDate")}
                            closeOnSelect={true}
                            renderInput={(params) => (
                              <TextField
                                style={{ marginTop: "-15px" }}
                                error={IGMDateErr}
                                helperText={IGMDateHelperText}
                                {...params}
                                label="IGM Date"
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
                            value={IGMInwardDate}
                            inputProps={{ placeholder: "IGM Inward Date" }}
                            onChange={(date) => this.handleDate(date, "IGMInwardDate")}
                            closeOnSelect={true}
                            renderInput={(params) => (
                              <TextField
                                style={{ marginTop: "-15px" }}
                                error={IGMInwardDateErr}
                                helperText={IGMInwardDateHelperText}
                                {...params}
                                label="IGM Inward Date"
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
                </CardBody>
              </Card>
            </GridItem>
          </div>
          <div className="shipment-pane" id="shipments">
            <Card>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="select-reacttable">
                      <ReactTable
                        data={this.state.ShipmentList}
                        defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                        sortable={true}
                        filterable={true}
                        resizable={false}
                        minRows={2}
                        columns={shipColums}
                        defaultPageSize={10}
                        align="center"
                        className="-striped -highlight"
                      />
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </div>
          <div className="shipment-pane" id="sequencenumber">
            <Card>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="package-table layout-fixed container-table no-scroll">
                      {/* <table> */}
                      {this.viewSequence()}
                      {/* </table> */}
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </div>
          <div className="shipment-pane" id="hblShipping">
            <Card>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="select-reacttable">
                      <ReactTable
                        data={this.state.HBLShipmentList}
                        defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                        sortable={true}
                        filterable={true}
                        resizable={false}
                        minRows={2}
                        columns={HBLColums}
                        defaultPageSize={10}
                        align="center"
                        className="-striped -highlight"
                      />
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </div>
          <div className="shipment-pane" id="documentations">
            <Card>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <ReactTable
                      data={this.state.Attachments.filter(
                        (x) => x.Status === "Active" || x.Status === "Inprocess"
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
          <div className="shipment-pane" id="tracking">
            <Card>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="package-table no-scroll">
                      <table>
                        <thead>
                          <tr>
                            <th>Actual Date</th>
                            <th>Actual Time</th>
                            <th>Show Date</th>
                            <th>Show Time</th>
                            <th>Updates</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>{this.viewTrackingManual()}</tbody>
                      </table>
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </div>
        </div>
        <div>
          <Dialog
            open={this.state.popupOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Shipment status</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to change shipment status?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  this.setState({
                    popupOpen: false,
                    confirmStatus: false,
                    ShipmentStatus: "",
                  })
                }
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  this.state.confirmStatus = true;
                  this.confirmShipStatus();
                }}
                color="primary"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          <div>
            <Dialog
              open={this.state.HBLdocOpen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="large-Modal"
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
                            <small>
                              FOR PORT-TO-PORT OR COMBINED TRANSPORT
                            </small>
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
                            />
                          </td>
                          <td className="t-25">
                            Contact Name<br></br>
                            <input
                              id="FcontactName"
                              style={{
                                display: "block",
                              }}
                              value={FcontactName}
                              onChange={(e) =>
                                this.HselectChange(e, "FcontactName")
                              }
                            />
                            <div
                              id="FcontactNamediv"
                              dangerouslySetInnerHTML={{
                                __html: FcontactName,
                              }}
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
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
                              onChange={(e) =>
                                this.HselectChange(e, "BLNumber")
                              }
                            />
                            <div
                              id="BLNumberdiv"
                              dangerouslySetInnerHTML={{
                                __html: BLNumber,
                              }}
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
                            />
                          </td>

                          <td className="t-50">
                            EXPORT REFERENCES<br></br>
                            <input
                              id="TrackingNumber"
                              style={{
                                display: "block",
                              }}
                              value={pTrackingNumber}
                              onChange={(e) =>
                                this.HselectChange(e, "TrackingNumber")
                              }
                            />
                            <div
                              id="TrackingNumberdiv"
                              dangerouslySetInnerHTML={{
                                __html: pTrackingNumber,
                              }}
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          
                        </tr>
                      </table>
                      <table className="hbl-table">
                        <tr>
                          <td rowSpan={2} className="t-25">
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
                            />
                          </td>

                          <td className="t-25">
                            Contact Name<br></br>
                            <input
                              id="TcontactName"
                              style={{
                                display: "block",
                              }}
                              value={TcontactName}
                              onChange={(e) =>
                                this.HselectChange(e, "TcontactName")
                              }
                            />
                            
                          </td>

                          <td className="t-25">
                              Passport Number
                          <input
                              id="pPassportNumber"
                              style={{
                                display: "block",
                              }}
                              value={pPassportNumber}
                              onChange={(e) =>
                                this.HselectChange(e, "pPassportNumber")
                              }
                            />

                            

                          </td>

                          
                        </tr>
                        <tr>
                        <td className="t-25">
                            FORWARDING AGENT FMC NO.
                            <input
                              id="FMCnumber"
                              style={{
                                display: "block",
                              }}
                              value={FMCnumber}
                              onChange={(e) =>
                                this.HselectChange(e, "FMCnumber")
                              }
                            />
                            <div
                              id="FMCnumberdiv"
                              dangerouslySetInnerHTML={{
                                __html: FMCnumber,
                              }}
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
                            />
                          </td>
                          <td className="t-50">
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td  className="t-50">
                            NOTIFY PARTY/INTERMEDIATE CONSIGNEE<br></br>
                            <div className="hbl-textarea">
                              <textarea
                                id="ConsigneeDetails"
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
                          <td className="t-25">
                              Notify Party Name
                          {/* <input
                              id="NotifyNameParty"
                              style={{
                                display: "block",
                              }}
                              value={NotifyNameParty}
                              onChange={(e) =>
                                this.HselectChange(e, "NotifyNameParty")
                              }
                            /> */}

                              <textarea
                                id="NotifyNameParty"
                                name="Body"
                                style={{
                                  width: "100%",
                                  height: "100px",
                                  display: "block",
                                }}
                                labelText="Body"
                                value={NotifyNameParty}
                                onChange={(e) =>
                                  this.HselectChange(e, "NotifyNameParty")
                                }
                              ></textarea>

                            

                          </td>

                          <td colSpan={2} className="t-50">
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="t-50">
                              Email (Notify Party)
                          <input
                            id="PNotifyEmail"
                            style={{
                              display: "block",
                            }}
                            value={PNotifyEmail}
                            onChange={(e) =>
                              this.HselectChange(e, "PNotifyEmail")
                            }
                          />
                          <div
                            id="PNotifyEmail"
                            dangerouslySetInnerHTML={{
                              __html: PNotifyEmail,
                            }}
                            style={{
                              display: "none",
                              whiteSpace: "pre-line",
                            }}
                          />
                            

                          </td>
                          <td className="t-50">
                              Phone Number (Notify Party)
                          <input
                              id="PnotifyPhone"
                              style={{
                                display: "block",
                              }}
                              value={PnotifyPhone}
                              onChange={(e) =>
                                this.HselectChange(e, "PnotifyPhone")
                              }
                            />

                          </td>
                          <td className="t-50">
                              GST (Notify Party) 
                          <input
                              id="PNotifyGst"
                              style={{
                                display: "block",
                              }}
                              value={PNotifyGst}
                              onChange={(e) =>
                                this.HselectChange(e, "PNotifyGst")
                              }
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
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
                              onChange={(e) =>
                                this.HselectChange(e, "Unloading")
                              }
                            ></textarea>
                            <div
                              id="Unloadingdiv"
                              dangerouslySetInnerHTML={{
                                __html: Unloading,
                              }}
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
                            />
                          </td>
                          <td className="t-50"></td>
                        </tr>
                        <tr>
                          {/* <td className="t-50" colSpan={2}>
                            CARRIER'S RECEIPT
                          </td> */}
                          <td colSpan={2} className="t-50 textalign-center">
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
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
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
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
                          <td className="fontsize-13" colSpan={2}>
                            DECLARED VALUE (FOR AD VALOREM PURPOSE ONLY). (REFER
                            TO CLAUSE 26 ON REVERSE HEREOFF) IN US$
                          </td>
                        </tr>
                        <tr>
                          <td colSpan= {2} className="t-50 fontsize-13">
                            In accepting this bill of lading, any local customs
                            or privileges to the contrary notwithstanding, the
                            shipper, consignee and owner of the goods and the
                            holder of this bill of lading, agree to be bound by
                            all the stipulations, exceptions and conditions
                            stated herein whether written, printed, stamped or
                            incorporated on the front or reverse side hereof as
                            fully as if they were all signed by such shipper,
                            consignee, owner or holder<br></br>
                            In witness whereof three (3) bills of lading, all of
                            the tenor and date have been signed, one of which
                            being accomplished, the others to stand void.
                          </td>
                          
                        </tr>
                       
                      </table>

                      <table className="hbl-table">
                        <thead>
                          <tr>
                            <th colSpan={2}>FREIGHT AND CHARGES</th>
                            <th>BY: SFL WORLDWIDE LLC, AS A CARRIER</th>
                          </tr>
                        </thead>
                        {/* <tbody id = "dataHtml"> */}
                          <tr>
                            <td className="t-25">
                              FREIGHT (PREPAID)

                            </td>

                            <td className="t-25">
                              NIL
                            </td>

                            
                            <td rowSpan={2} className="t-50">

                            <img src={pshah} width="100" border="0" />  

                            <img src={stamp} width="100" border="0" className="img-spacing" />

                            </td>

                          </tr>
                          <tr>
                            <td className="t-25">Total</td>
                            <td className="t-25">Prepaid</td>
                            {/* <td className="t-50"></td> */}
                          </tr>

                          <tr>
                            <td className="t-25">Total Collect</td>
                            <td className="t-25">NIL</td>
                            <td className="t-50">
                            DATE (MM/DD/YYYY)<br></br>
                            {this.state.HCreatedDate}
                            </td>
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




          <div>
            <Dialog
              open={this.state.PLdocOpen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="large-Modal"
            >
              <DialogTitle id="alert-dialog-title">Genrate PL</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <div className="hbl-outer">
                    <div id="HBL" class="page">
                      
                      <table className="hbl-table">
                        <tr>
                          <td rowSpan={3} className="t-50">
                          Origin Address<br></br>
                            <textarea
                              id="PLFromAddress"
                              name="Body"
                              style={{
                                width: "100%",
                                height: "120px",
                                display: "block",
                              }}
                              labelText="Body"
                              //KRUTIU
                              value={this.state.PLFromAddress}
                              onChange={(e) =>
                                this.HselectChange(e, "PLFromAddress")
                              }
                            ></textarea>
                            <div
                              id="PLFromAddress"
                              dangerouslySetInnerHTML={{
                                __html: this.state.PLFromAddress,
                              }}
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
                            />
                          </td>
                          <td rowSpan={3} className="t-50">
                            Destination Address<br></br>
                            <textarea
                              id="PLToAddress"
                              name="Body"
                              style={{
                                width: "100%",
                                height: "120px",
                                display: "block",
                              }}
                              labelText="Body"
                              //KRUTIU
                              value={this.state.PLToAddress}
                              onChange={(e) =>
                                this.HselectChange(e, "PLToAddress")
                              }
                            ></textarea>
                            <div
                              id="PLToAddress"
                              dangerouslySetInnerHTML={{
                                __html: this.state.PLToAddress,
                              }}
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
                            />
                          </td>
                        

                          
                        </tr>
                        
                      </table>
                      
                    </div>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => this.setState({ PLdocOpen: false })}
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => this.generatePLPDF()}
                  color="primary"
                  autoFocus
                >
                  Genrate
                </Button>
              </DialogActions>
            </Dialog>
          </div>


          <div>
            <Dialog
              open={this.state.DOdocOpen}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="large-Modal"
            >
              <DialogTitle id="alert-dialog-title">Genrate DO</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                <div>
                  <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif'}}>
                    <tbody><tr>
                        <td style={{width: '50%', padding: '5px', verticalAlign: 'top'}}>
                          <b>Attention To :</b><br />
                          The Manager<br />
                          Speedy CFS<br />
                          Uran, Nhava Sheva
                        </td>
                        <td style={{width: '50%', padding: '5px', verticalAlign: 'top', textAlign: 'right'}}>Date : 04/01/2024</td>
                      </tr>
                      <tr>
                        <td colSpan={2} style={{padding: '5px', verticalAlign: 'top'}}>
                          <p style={{margin: '15px 0 0 0'}}>Dear Sir</p>
                        </td>
                      </tr>
                    </tbody></table>
                  <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif'}}>
                    <tbody><tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000'}}>Please Deliver To :</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000'}}>

                        <input
                              id="DoDeliverTo"
                              style={{
                                display: "block",
                              }}
                              value={DoDeliverTo}
                              onChange={(e) =>
                                this.HselectChange(e, "DoDeliverTo")
                              }
                            />
                            <div
                              id="DoDeliverTodiv"
                              dangerouslySetInnerHTML={{
                                __html: DoDeliverTo,
                              }}
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
                            />

                        </td>
                      </tr>
                      <tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000'}}>Consignee :</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000'}}>
                        <input
                              id="DOConsignee"
                              style={{
                                display: "block",
                              }}
                              value={DOConsignee}
                              onChange={(e) =>
                                this.HselectChange(e, "DOConsignee")
                              }
                            />
                            <div
                              id="DOConsigneediv"
                              dangerouslySetInnerHTML={{
                                __html: DOConsignee,
                              }}
                              style={{
                                display: "none",
                                whiteSpace: "pre-line",
                              }}
                            />
                        </td>
                      </tr>
                      <tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000'}}>Notify Party :</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000'}}>
                        

                            <textarea
                              id="DONotifyParty"
                              name="Body"
                              style={{
                                width: "100%",
                                height: "120px",
                                display: "block",
                              }}
                              labelText="Body"
                              //KRUTIU
                              value={this.state.DONotifyParty}
                              onChange={(e) =>
                                this.HselectChange(e, "DONotifyParty")
                              }
                            ></textarea>
                         
                          
                          </td>
                      </tr>
                      <tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000'}}>MBL Number / Date:</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000'}}>
                          <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif'}}>
                            <tbody><tr>
                                <td style={{width: '50%', padding: 0}}>

                                <input
                                  id="DoMBLNo"
                                  style={{
                                    display: "block",
                                  }}
                                  value={DoMBLNo}
                                  onChange={(e) =>
                                    this.HselectChange(e, "DoMBLNo")
                                  }
                                />
                                <div
                                  id="DoMBLNodiv"
                                  dangerouslySetInnerHTML={{
                                    __html: DoMBLNo,
                                  }}
                                  style={{
                                    display: "none",
                                    whiteSpace: "pre-line",
                                  }}
                                />

                                </td>
                                <td style={{width: '50%', padding: 0}}>Date: {this.state.HBLDate}</td>
                              </tr>
                            </tbody></table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000'}}>Vessel / Voyage :</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000'}}>
                        <input
                                  id="DoVessel"
                                  style={{
                                    display: "block",
                                  }}
                                  value={DoVessel}
                                  onChange={(e) =>
                                    this.HselectChange(e, "DoVessel")
                                  }
                                />
                                <div
                                  id="DoVesseldiv"
                                  dangerouslySetInnerHTML={{
                                    __html: DoVessel,
                                  }}
                                  style={{
                                    display: "none",
                                    whiteSpace: "pre-line",
                                  }}
                                />
                        </td>
                      </tr>
                      <tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000'}}>HBL Number / Date :</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000'}}>
                          <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif'}}>
                            <tbody><tr>
                                <td style={{width: '50%', padding: 0}}>
                                <input
                                  id="DoHBLNo"
                                  style={{
                                    display: "block",
                                  }}
                                  value={DoHBLNo}
                                  onChange={(e) =>
                                    this.HselectChange(e, "DoHBLNo")
                                  }
                                />
                                <div
                                  id="DoHBLNodiv"
                                  dangerouslySetInnerHTML={{
                                    __html: DoHBLNo,
                                  }}
                                  style={{
                                    display: "none",
                                    whiteSpace: "pre-line",
                                  }}
                                />
                                </td>
                                <td style={{width: '50%', padding: 0}}>Date: {this.state.HBLDate}</td>
                              </tr>
                            </tbody></table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000'}}>Load Port :</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000'}}>
                        <input
                                  id="DoLoadingPort"
                                  style={{
                                    display: "block",
                                  }}
                                  value={DoLoadingPort}
                                  onChange={(e) =>
                                    this.HselectChange(e, "DoLoadingPort")
                                  }
                                />
                                <div
                                  id="DoLoadingPortdiv"
                                  dangerouslySetInnerHTML={{
                                    __html: DoLoadingPort,
                                  }}
                                  style={{
                                    display: "none",
                                    whiteSpace: "pre-line",
                                  }}
                                />
                        </td>
                      </tr>
                      <tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000'}}>ETA :</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000'}}>{this.state.ArrivalDate}</td>
                      </tr>
                      <tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000'}}>IGM Number - Date :</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000'}}>
                          <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif'}}>
                            <tbody><tr>
                                <td style={{width: '50%', padding: 0}}>
                                  
                                <input
                                  id="DoIGMNo"
                                  style={{
                                    display: "block",
                                  }}
                                  value={DoIGMNo}
                                  onChange={(e) =>
                                    this.HselectChange(e, "DoIGMNo")
                                  }
                                />
                                <div
                                  id="DoIGMNodiv"
                                  dangerouslySetInnerHTML={{
                                    __html: DoIGMNo,
                                  }}
                                  style={{
                                    display: "none",
                                    whiteSpace: "pre-line",
                                  }}
                                />
                                   IGM Date : {this.state.IGMDate}</td>
                                <td style={{width: '50%', padding: 0}}>Inward Date : {this.state.IGMInwardDate}</td>
                              </tr>
                            </tbody></table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000'}}>Item No. / Sub Item No :</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000'}}>
                        <input
                                  id="DoITMSub"
                                  style={{
                                    display: "block",
                                  }}
                                  value={DoITMSub}
                                  onChange={(e) =>
                                    this.HselectChange(e, "DoITMSub")
                                  }
                                />
                                <div
                                  id="DoITMSubdiv"
                                  dangerouslySetInnerHTML={{
                                    __html: DoITMSub,
                                  }}
                                  style={{
                                    display: "none",
                                    whiteSpace: "pre-line",
                                  }}
                                />
                        </td>
                      </tr>
                      <tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000', verticalAlign: 'top'}}>Unstuff Details :</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000', verticalAlign: 'top'}}>
                          <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif'}}>
                            <tbody><tr>
                                <td style={{padding: 0}}>
                                  <u>No. Of Packages</u><br />
                                  
                                  <input
                                  id="DoPackageNumber"
                                  style={{
                                    display: "block",
                                  }}
                                  value={DoPackageNumber}
                                  onChange={(e) =>
                                    this.HselectChange(e, "DoPackageNumber")
                                  }
                                />
                                <div
                                  id="DoPackageNumberdiv"
                                  dangerouslySetInnerHTML={{
                                    __html: DoPackageNumber,
                                  }}
                                  style={{
                                    display: "none",
                                    whiteSpace: "pre-line",
                                  }}
                                />
                                </td>
                                <td style={{padding: 0}}>
                                  <u>Weight in Kgs</u><br />
                                  <input
                                  id="DOWEIGHT"
                                  style={{
                                    display: "block",
                                  }}
                                  value={DOWEIGHT}
                                  onChange={(e) =>
                                    this.HselectChange(e, "DOWEIGHT")
                                  }
                                />
                                <div
                                  id="DOWEIGHTdiv"
                                  dangerouslySetInnerHTML={{
                                    __html: DOWEIGHT,
                                  }}
                                  style={{
                                    display: "none",
                                    whiteSpace: "pre-line",
                                  }}
                                />
                                  
                                </td>
                                <td style={{padding: 0}}>
                                  <u>Volume</u><br />

                                  <input
                                  id="DOMEASUREMENT"
                                  style={{
                                    display: "block",
                                  }}
                                  value={DOMEASUREMENT}
                                  onChange={(e) =>
                                    this.HselectChange(e, "DOMEASUREMENT")
                                  }
                                />
                                <div
                                  id="DOMEASUREMENTdiv"
                                  dangerouslySetInnerHTML={{
                                    __html: DOMEASUREMENT,
                                  }}
                                  style={{
                                    display: "none",
                                    whiteSpace: "pre-line",
                                  }}
                                />
                                </td>
                              </tr>
                            </tbody></table>
                        </td>
                      </tr>
                      <tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000'}}>Marks and Numbers :</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000'}}>

                        <textarea
                              id="DOSequencelist"
                              name="Body"
                              style={{
                                width: "100%",
                                height: "120px",
                                display: "block",
                              }}
                              labelText="Body"
                              //KRUTIU
                              value={this.state.DOSequencelist}
                              onChange={(e) =>
                                this.HselectChange(e, "DOSequencelist")
                              }
                            ></textarea>

                        </td>
                      </tr>
                      <tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000'}}>Description :</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000'}}>
                        

                            <textarea
                              id="DoDescription"
                              name="Body"
                              style={{
                                width: "100%",
                                height: "120px",
                                display: "block",
                              }}
                              labelText="Body"
                              //KRUTIU
                              value={this.state.DoDescription}
                              onChange={(e) =>
                                this.HselectChange(e, "DoDescription")
                              }
                            ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td style={{width: '30%', padding: '5px', border: '1px solid #000'}}>Container No. / Seal No. :</td>
                        <td style={{width: '70%', padding: '5px', border: '1px solid #000'}}>
                          <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif'}}>
                            <tbody><tr>
                                <td style={{width: '50%', padding: 0}}>
                                <input
                                  id="DoContainerNum"
                                  style={{
                                    display: "block",
                                  }}
                                  value={DoContainerNum}
                                  onChange={(e) =>
                                    this.HselectChange(e, "DoContainerNum")
                                  }
                                />
                                <div
                                  id="DoContainerNumdiv"
                                  dangerouslySetInnerHTML={{
                                    __html: DoContainerNum,
                                  }}
                                  style={{
                                    display: "none",
                                    whiteSpace: "pre-line",
                                  }}
                                />
                                </td>
                                <td style={{width: '50%', padding: 0}}>Seal Number : 
                                
                                <input
                                  id="DoSealNumber"
                                  style={{
                                    display: "block",
                                  }}
                                  value={DoSealNumber}
                                  onChange={(e) =>
                                    this.HselectChange(e, "DoSealNumber")
                                  }
                                />
                                <div
                                  id="DoSealNumberdiv"
                                  dangerouslySetInnerHTML={{
                                    __html: DoSealNumber,
                                  }}
                                  style={{
                                    display: "none",
                                    whiteSpace: "pre-line",
                                  }}
                                />

                                </td>
                              </tr>
                            </tbody></table>
                        </td>
                      </tr>
                    </tbody></table>
                  <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'sans-serif', marginTop: '20px'}}>
                    <tbody><tr>
                        <td style={{padding: '5px', verticalAlign: 'top'}}>{this.state.ContainerName}</td>
                        <td rowSpan={4} style={{width: '40%'}}><img src="stamp.png" alt="" /></td>
                      </tr> 
                      <tr>
                        <td style={{padding: '5px', verticalAlign: 'top'}}>STAMP DUTY NOT COLLECTED</td>
                      </tr>
                      <tr>
                        <td style={{padding: '5px', verticalAlign: 'top', color: 'blue'}}>SFL WORLDWIDE LOGISTICS PRIVATE LIMITED</td>
                      </tr>
                      <tr>
                        <td style={{padding: '5px', verticalAlign: 'top'}}><img src="sign.png" alt="" /></td>
                      </tr>
                      <tr>
                        <td style={{padding: '5px', verticalAlign: 'top', color: 'blue'}}>AUTHORISED SIGNATORY</td>
                      </tr>
                    </tbody></table>
                  <table style={{width: '100%', borderCollapse: 'collapse', borderTop: '5px solid #800000', fontFamily: 'sans-serif', marginTop: '20px'}}>
                    <tbody><tr>
                        <td style={{textAlign: 'center', fontSize: '12px', paddingTop: '10px'}}>
                          C-732-733, Siddhi Vinayak Towers, Behind DCP Office, Nr. DAV Internatioal School<br />
                          Off. S. G. Highway, Makarba, Ahmedabad, Gujarat - 380051, India<br />
                          T: +91 98250 40051 | E: contact@sflindia.com | W: www.SFLIndia.com | CIN: U63000GJ2004PTC044321 | GSTN: 24AABCN9389H1Z2
                        </td>
                      </tr>
                    </tbody></table>
                </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => this.setState({ DOdocOpen: false })}
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => this.generateDOPDF()}
                  color="primary"
                  autoFocus
                >
                  Genrate
                </Button>
              </DialogActions>
            </Dialog>
          </div>


          <Dialog
            open={this.state.SetShiprecord}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            // width="lg"
            className="large-Modal"
          >
            <DialogTitle id="alert-dialog-titleHBL">
              Shipment Move to HBL
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-descriptionHBL">
                <div className="package-select">
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="select-reacttable">
                      <ReactTable
                        data={this.state.HBLYesNOREC}
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

          <Dialog
            open={this.state.SetShiprecordHBL}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="large-Modal"
          >
            <DialogTitle id="alert-dialog-titleHBL">
              Shipment for HBL
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-descriptionHBL">
                <GridItem xs={12} sm={12} md={12}>
                  <div className="select-reacttable">
                    <ReactTable
                      data={this.state.ShipmentListHBL}
                      defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                      sortable={true}
                      filterable={true}
                      resizable={false}
                      minRows={2}
                      columns={shipColumsHBL}
                      defaultPageSize={10}
                      align="center"
                      className="-striped -highlight"
                    />
                  </div>
                </GridItem>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.closeDivHBL()} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={this.state.DeleteRequest}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Remove Shipment</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to remove the shipment?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() =>
                  this.setState({
                    DeleteRequest: false,
                    // confirmStatus: false,
                    ShippingIDDel: "",
                  })
                }
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  this.state.confirmStatus = true;
                  this.confirmShipStatusHBLData();
                }}
                color="primary"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <Card>
          <CardHeader className="btn-right-outer" color="primary" icon>
            <CardIcon color="primary">
              <Note />
            </CardIcon>
            <h4 className="margin-right-auto text-color-black">Notes</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
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
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
        <div className="shipment-submit">
          <div className="left">
            {Access.DeleteAccess === 1 ? (
              <Button color="danger" onClick={() => this.handleDelete()}>
                Delete
              </Button>
            ) : null}
          </div>
          <div className="right">
            {Access.WriteAccess === 1 ? (
              <>
                <Button
                  color="rose"
                  onClick={() => {
                    this.state.ShipmentStatus === ""
                      ? this.handleSubmit(false)
                      : this.setState({ popupOpen: true, redirect: false });
                  }}
                >
                  Save
                </Button>

                <Button
                  color="primary"
                  onClick={() => {
                    this.state.ShipmentStatus === ""
                      ? this.handleSubmit(true)
                      : this.setState({ popupOpen: true, redirect: true });
                  }}
                >
                  Save & Exit
                </Button>
              </>
            ) : null}
            <Button color="secondary" onClick={() => this.cancelContainer()}>
              Cancel
            </Button>
          </div>
        </div>
      </GridContainer>
    );
  }
}

export default editContainer;
