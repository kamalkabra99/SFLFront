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

      SealNumber: "",
      TotalPackagesCount: 0,
      TotalCFTCount: 0,
      TotalTVCount: 0,
      TotalPackagesCountHBL: 0,
      TotalCFTCountHBL: 0,
      PrimaryID:0,
      TotalTVCountHBL: 0,
      sealnumberErr: false,
      sealnumberHelperText: "",

      BookingNumber: "",
      bookingnumberErr: false,
      bookingnumberHelperText: "",

      BOLNumber: "",
      BOLnumberErr: false,
      BOLnumberHelperText: "",
      ShippingIDDel:"",
      DeleteRequest:false,

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
      HBLYesNOREC:[],
      UpdateShipID:"",
      UpdateShipIDHBLSET:"",
      SetShiprecord:false,
      Base: "",

      NotifyPartyName: "",
      NotifyPartyPhone: "",
      GSTNo:"",
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
      serviceNameData:[],
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
      var dataMer = []
      api.post("container/getMergedShipments", data)
            .then((resultHBL) => {
              console.log("Result = ",resultHBL)
              // this.setState({ managedByList: result.data });
              dataMer = resultHBL.data 

              api
              .post("container/getShipmentsByContainer", data)
              .then((res) => {
                if (res.success) {
      
                  console.log("Packages = " , res.data)
                  res.data.Packages.map((OBJ) => {
                    var i = 1;
                    OBJ.map((obj) => {
                      obj.Index = i;
                      i++;
                      return obj;
                    });
                    return OBJ;
                  });
                 
                  
                  var setHblShipment = []
                  // var YesNO=[]
      
                  var setCountShip = []
      
                  for (let hblindex = 0; hblindex < res.data.Shipments.length; hblindex++) {
                    // const element = array[hblindex];
                    if(res.data.Shipments[hblindex].hblshipment == 0){
                      res.data.Shipments[hblindex].setsc = 1
                      res.data.Shipments[hblindex].setPack = res.data.Shipments[hblindex].TotalPackages
                      setHblShipment.push(res.data.Shipments[hblindex])
                    }else{
                      setCountShip.push(res.data.Shipments[hblindex])
                    }
                    
                  }
      
                  console.log("setCountShip = ",setCountShip)
      
                  for (let setind = 0; setind < setHblShipment.length; setind++) {
                    debugger
                    for (let HBLSETING = 0; HBLSETING < dataMer.length; HBLSETING++) {
                      
                        if(dataMer[HBLSETING].hblshipment == setHblShipment[setind].ShippingID){
                          setHblShipment[setind].setsc = setHblShipment[setind].setsc + dataMer[HBLSETING].totalShipment
                          setHblShipment[setind].setPack = setHblShipment[setind].setPack+  dataMer[HBLSETING].totalPack
                        }
                      
                    }
                    
                  }
      
      
                  console.log("yesno = ",setHblShipment )
                  
      
                  
      
      
      
                  this.setState({
                    ShipmentList: res.data.Shipments,
                    HBLShipmentList: setHblShipment,
                    Sequence: res.data.Packages,
      
                    // serviceNameData:YesNO,
                  });
      
                  var counts = 0
                  var tvcount = 0
                  var cftCount = 0
      
                  for (let index = 0; index < res.data.Shipments.length; index++) {
      
                    counts = counts + res.data.Shipments[index].TotalPackages
                    tvcount = tvcount + res.data.Shipments[index].TV
                    cftCount = cftCount + res.data.Shipments[index].CFT
                    //const element = array[index];
                    
                  }
                  this.state.TotalTVCount = tvcount
                  this.state.TotalCFTCount = cftCount
      
                  this.state.TotalPackagesCount = counts
                  console.log("counts = ", counts)
      
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
              LoadDate: res.data.LoadDate,
              SailingDate: res.data.SailingDate,
              ArrivalDate: res.data.ArrivalDate,
              FreightForwarder: res.data.FreightForwarder,
              Carrier: res.data.Carrier,
              NotifyParty: res.data.NotifyParty,
              NotifyPartyName: res.data.NotifyPartnerName,
              NotifyPartyPhone: res.data.PhoneNum,
              GSTNo:res.data.GSTNo,
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
    }
    else if (type === "containershortname") {
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
    } else if (type === "sailing") {
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

  closeDiv = () =>{
    this.setState({
      SetShiprecord: false,
      RemoveShipID: "",
    })
  }

   closeDivHBL = () =>{
    this.setState({
      SetShiprecordHBL: false,
      // RemoveShipID: "",
    })
  }

  UpdateHBLShipID = (record) =>{

    // if(this.state.UpdateShipID == ""){
    //   cogoToast.error("Please select Tracking Number");
    // }else{
      var datatosend = {
        shippingID : this.state.RemoveShipID,
        UpdateShipping: record.original.ShippingID,
      }

      api.post("contactus/UpdateHBL", datatosend).then((res) => {
        this.hideLoader();
        if (res.success) {
          this.setState({
            SetShiprecord: false,
            RemoveShipID: "",
          })
          cogoToast.success("Shipment merged for HBL");
          this.reCallApi();
        } else {
          cogoToast.error("Something went wrong");
        }
      });
    // }

  }


  handleSelectChange = (datasets) =>{
    console.log(datasets)
    var shipID = datasets.value;
    this.state.UpdateShipIDHBLSET = datasets

    // this.setState({
    //   // SetShiprecord: true,
    //   UpdateShipID: shipID,
    // });

    this.state.UpdateShipID = shipID
    console.log(this.state.UpdateShipID)


  }

  generateHBL = (record) => {
    console.log("Records = ",record);

    localStorage.setItem("ContainerNumber",this.state.ContainerNumber)
    localStorage.setItem("BookingNumber",this.state.BookingNumber)
    localStorage.setItem("BOLNumber",record.original.TrackingNumber + this.state.ContainerShortName)

    localStorage.setItem("PointOfOrigin",this.state.PointOfOrigin)
    localStorage.setItem("PortOfLoading",this.state.PortOfLoading)
    localStorage.setItem("PortOfUnloading",this.state.PortOfUnloading)
    localStorage.setItem("PlaceOfDeliveryByOnCarrier",this.state.PlaceOfDeliveryByOnCarrier)
    localStorage.setItem("VesselNumber",this.state.VesselNumber)
    localStorage.setItem("NotifyParty",this.state.NotifyParty)
    localStorage.setItem("TrackNO", record.original.TrackingNumber)
    localStorage.setItem("NotifyPartyName",this.state.NotifyPartyName)

    localStorage.setItem("hblDate",this.state.HBLDate);

   
    localStorage.setItem("NotifyPartyPhone",this.state.NotifyPartyPhone + "  Email: "+ this.state.NotifyPartyEmail + " GST: " + this.state.GSTNo)
    // localStorage.setItem("NotifyPartyEmail",)
    


    var fromadd1Notify =  this.state.NotifyPartyAddr1
    var fromadd2Notify = this.state.NotifyPartyAddr2
    var fromadd3Notify = this.state.NotifyPartyAddr3

    var FromAddressNotify = ""

    if(fromadd1Notify != ""){
      FromAddressNotify = FromAddressNotify + fromadd1Notify
    }
    if(fromadd2Notify != ""){
      FromAddressNotify = FromAddressNotify + ", " + fromadd2Notify
    }
    if(fromadd3Notify != ""){
      FromAddressNotify = FromAddressNotify + ", " + fromadd3Notify
    }


      localStorage.setItem("NotifyPartyAddr3",FromAddressNotify)
      var fromCitysNotify = this.state.NotifyPartyCity + ", " + this.state.NotifyPartyState + " - " + this.state.NotifyPartyZipCode

      localStorage.setItem("NotifyPartyCity",fromCitysNotify)


 

    var fromadd1 =  record.original.FromAdd1
    var fromadd2 = record.original.FromAdd2
    var fromadd3 = record.original.FromAdd3

    var FromAddress = ""
    if(fromadd1 != ""){
      FromAddress = FromAddress + fromadd1
    }
    if(fromadd2 != ""){
      FromAddress = FromAddress + ", " + fromadd2
    }
    if(fromadd3 != ""){
      FromAddress = FromAddress + ", " + fromadd3
    }

    var fromCity = record.original.FromCity
    var fromState = record.original.FromState
    var fromZipCo = record.original.fromZip

    var fromCitys = fromCity + ", " + fromState + " - " + fromZipCo

    localStorage.setItem("FromAddress", FromAddress)
    localStorage.setItem("fromCitys", fromCitys)
    localStorage.setItem("fromContact", record.original.ContactName)

    //   To Contact Name


    var TOadd1 =  record.original.ToAdd1
    var TOadd2 = record.original.ToAdd2
    var TOadd3 = record.original.ToAdd3

    var TOAddress = ""
    if(TOadd1 != ""){
      TOAddress = TOAddress + TOadd1
    }
    if(TOadd2 != ""){
      TOAddress = TOAddress + ", " + TOadd2
    }
    if(TOadd3 != ""){
      TOAddress = TOAddress + ", " + TOadd3
    }

    var TOCity = record.original.ToCity
    var TOState = record.original.ToState
    var TOZipCo = record.original.toZip

    var TOCitys = TOCity + ", " + TOState + " - " + TOZipCo + "  Passport: " + record.original.PassportNumber

    localStorage.setItem("TOAddress", TOAddress)
    localStorage.setItem("TOCitys", TOCitys)
    localStorage.setItem("TOContact", record.original.ToContactName)
    let data = {
      ContainerID: this.props.history.location.state.containerId,
      shipmentID: record.original.ShippingID,
    };

    var TotalcftH = 0
    var totalPackH = 0
    var TotalChargableWeightHBL = 0
    api
      .post("container/getShipmentsByContainerForHBL", data)
      .then((res) => {
        if (res.success) {

          console.log("Res = ",res);

          var packdata = res.data.Packages
          var packset = []

          for (let index = 0; index < packdata.length; index++) {
            // const element = array[index];
            if(packdata[index].length > 1){
              console.log("packdata[index] = ",packdata[index][0]["Sequence"]);
              console.log("packdata[index] = " ,packdata[index][0]["Sequence"] + " - " + packdata[index][packdata[index].length -1]["Sequence"]  )
              
              var packseq = packdata[index][0]["Sequence"] + " - " + packdata[index][packdata[index].length -1]["Sequence"]
              var packLen = packdata[index].length
              var Shippingid = packdata[index][0]["ShippingID"]
              var pushdata = {
                packseq:packseq,
                packLen:packLen,
                Shippingid:Shippingid
              }

              packset.push(pushdata)


            }else{

              var packseq = packdata[index][0]["Sequence"]
              var packLen = packdata[index].length
              var Shippingid = packdata[index][0]["ShippingID"]
              var pushdata = {
                packseq:packseq,
                packLen:packLen,
                Shippingid:Shippingid
              }

              packset.push(pushdata)



            }
          }

          for (let indexship = 0; indexship < res.data.Shipments.length; indexship++) {
            // const element = array[indexship];
              totalPackH = totalPackH + res.data.Shipments[indexship].TotalPackages
              // tvcount = tvcount + res.data.Shipments[indexship].TV
              TotalChargableWeightHBL = TotalChargableWeightHBL + res.data.Shipments[indexship].TotalChargableWeight
              TotalcftH = TotalcftH + res.data.Shipments[indexship].CFT

              for (let indexset = 0; indexset < packset.length; indexset++) {
                  if(packset[indexset].Shippingid == res.data.Shipments[indexship].ShippingID){
                    packset[indexset].cft = res.data.Shipments[indexship].CFT
                    packset[indexset].TotalPackages = res.data.Shipments[indexship].TotalPackages
                    packset[indexset].TotalChargableWeight = res.data.Shipments[indexship].TotalChargableWeight
                  }
                
              }
            
          }
          var dataHtml = "";
          var packSeqList = "";
          for (let indexpack = 0; indexpack < packset.length; indexpack++) {
            // const element = array[indexpack];

            // if(packset.length > 1){

              packSeqList = packSeqList + packset[indexpack].packseq + ", "


            // }

            // dataHtml = dataHtml +  "<tr><td><label>"+ packset[indexpack].packseq +"</label></td> <td><label>"+ packset[indexpack].packLen +"</label></td><td><label>*USED HOUSE HOLD GOODS AND PERSONAL EFFECTS*</label></td><td><label>"+packset[indexpack].TotalChargableWeight+"</label></td><td><label>"+ packset[indexpack].cft +"</label></td></tr>"

          }

          packSeqList = packSeqList.substring(0, packSeqList.length-2);

          var TotalCBM = (TotalcftH/36).toFixed(4);
          TotalChargableWeightHBL = TotalcftH * 7
          TotalChargableWeightHBL = (TotalChargableWeightHBL/2.2).toFixed(3)
        
          dataHtml = dataHtml + " <tr><td>"+packSeqList+"</td><td>"+totalPackH+"</td><td>USED HOUSE HOLD GOODS AND PERSONAL EFFECTS</td><td>"+TotalChargableWeightHBL+" KG.</td><td>"+TotalCBM+" CBM</td></tr>"
          


          console.log("packset = ",packset)


          localStorage.setItem("dataHtml", dataHtml)

          window.open(
            this.state.Base + "auth/HBL/" + 
             record.original.ShippingID + "/"+this.props.history.location.state.containerId,
              
            "_blank"
          );

          
         
        } else {
          cogoToast.error("Something went wrong");
        }
      })
      .catch((err) => {
        console.log("error.....", err);
      });

  }
  

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

            var counts = 0
            var tvcount = 0
            var cftCount = 0

            this.state.PrimaryID = record.original.ShippingID

            for (let index = 0; index < res.data.Shipments.length; index++) {

              counts = counts + res.data.Shipments[index].TotalPackages
              tvcount = tvcount + res.data.Shipments[index].TV
              cftCount = cftCount + res.data.Shipments[index].CFT
              //const element = array[index];
              
            }
            this.state.TotalTVCountHBL = tvcount
            this.state.TotalCFTCountHBL = cftCount

            this.state.TotalPackagesCountHBL = counts
            console.log("counts = ", counts)

            
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
    this.setState({ DeleteRequest: true, ShippingIDDel: record.original.ShippingID });
  }

  confirmShipStatusHBLData = () =>{

    var datatosend = {
      shippingID : 0,
      UpdateShipping: this.state.ShippingIDDel,
    }

    api.post("contactus/UpdateHBL", datatosend).then((res) => {
      this.hideLoader();
      if (res.success) {
        this.setState({
          DeleteRequest: false,
          ShippingIDDel: "",
          SetShiprecordHBL:false
        })
        cogoToast.success("Shipment removed");
        this.reCallApi();
      } else {
        cogoToast.error("Something went wrong");
      }
    });

  }


  handleEditHBL(record) {
    console.log(record);
    var shipID = record.original.ShippingID
    var YesNO = [];
    
    for (let hblindexauto = 0; hblindexauto < this.state.HBLShipmentList.length; hblindexauto++) {
      // const element = array[hblindexauto];
      // var dataSets = []
        if(this.state.HBLShipmentList[hblindexauto].ShippingID != shipID){
          
          YesNO.push(this.state.HBLShipmentList[hblindexauto])
        }
        
      
      
    }

    // console.log("yesno = ",YesNO )
    // this.setState({
    //   serviceNameData:YesNO,
    // });

    this.setState({
      SetShiprecord: true,
      RemoveShipID: shipID,
      HBLYesNOREC: YesNO
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
        Header: "CFT",
        accessor: "CFT",
        Footer: (
          <span>
            {CommonConfig.isEmpty(this.state.TotalCFTCount)
              ? ""
              : 
                parseFloat(this.state.TotalCFTCount).toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                 }
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
                    color="success"
                    className="Plus-btn"
                    onClick={() =>
                      this.generateHBL(record)
                    }
                  >
                    <i className={"fas fa-check"} />
                  </Button>
            </div>

          );
            
          
        },
        sortable: false,
      },
      
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
              : 
                parseFloat(this.state.TotalPackagesCount)
                 }
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
              : 
                parseFloat(this.state.TotalTVCount)
                 }
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
              : 
                parseFloat(this.state.TotalCFTCount).toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                 }
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
              : 
                parseFloat(this.state.TotalPackagesCountHBL)
                 }
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
              : 
                parseFloat(this.state.TotalTVCountHBL)
                 }
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
              : 
                parseFloat(this.state.TotalCFTCountHBL).toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                 }
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
              {record.original.ShippingID != this.state.PrimaryID ?(
                <Button
                justIcon
                onClick={() => this.openDeleteRequestModal(record)}
                color="danger"
              >
                <i class="fas fa-trash"></i>
              </Button>

              ):null}
              
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
                                label="HBL Date"
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

          <Dialog
            open={this.state.SetShiprecord}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            // width="lg"
            className="large-Modal"
          >
            <DialogTitle id="alert-dialog-titleHBL">Shipment Move to HBL</DialogTitle>
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
              <Button
                onClick={() => this.closeDiv()}
                color="secondary"
              >
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
            <DialogTitle id="alert-dialog-titleHBL">Shipment for HBL</DialogTitle>
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
              <Button
                onClick={() => this.closeDivHBL()}
                color="secondary"
              >
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
