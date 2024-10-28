import React, { Component } from "react";
import moment from "moment";
import { CommonConfig } from "../../utils/constant";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/PriorityHigh";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import api from "../../utils/apiClient";
import cogoToast from "cogo-toast";
import SimpleBackdrop from "../../utils/general";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";

const useStyles = () => makeStyles(styles);
const classes = useStyles();
class CommercialInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   FromAddress: "",
      //   ContactName: "",
      //   ToAddress: "",
      //   TrackingNumber: "",
      //   htmlData:[],
      //   commercialList: [],
      //   TotalCostCommercial: 0,
      //   isComInvoiceVisible: false,
      //   ShipmentType:"",
      //   PackageList:[],

      useraccess: JSON.parse(localStorage.getItem("loggedInUserData")),
      updatedipAddress: "",
      createDuplicate: "0",
      newbal:0,
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
	  ShippingID:"",
      CreatedBy: "",
      CreatedByName: "",
      CommercialPopup: false,
      ComUpdatedDate: "",
      ComUpdatedName: "",
      newbalarray:[],
      ComCreatedDate: "",
      ComCreatedName: "",
      ipAddress: "",
      ipLocation: "",
      PickupDateChange: 0,
      datasetsOrigin:1,
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
      Loading: false,

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
      deletedocument: false,
      deletedocsdata: [],
      setDupLicate: false,
      dupTracking: "",
      successOpened: false,
      CountryList: [],
      AllClearStatusList: [],
      AllClearYes: false,
      MailOpenPopup: false,
      MailDelivered: false,
      userLockinAllAccess: 0,
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
    };
  }
  async componentDidMount() {
    // 33651
    debugger

    // console.log("this.props.match.params.id = ",this.props.match.params.id)
    console.log("test23 = ",localStorage.getItem("loggedInUserData"))
    if (localStorage.getItem("loggedInUserData")) {
      localStorage.removeItem("CommData")
      var currentUrl = window.location.href;
      var newUrl = currentUrl.split("CommercialInvoice/");
      console.log("newUrlData = ", newUrl[1]);
      let ShippindIDFromURL = window.atob(newUrl[1]);
      

	    this.setState({ShippingID:ShippindIDFromURL})

      await this.getShipmentInfo(ShippindIDFromURL);
      await this.getAddressDetails(ShippindIDFromURL);
      await this.getPackageDetail(ShippindIDFromURL);
      setTimeout(() => {
         this.getCommercialInvoiceDetail(ShippindIDFromURL);
      }, 1000);
      

      // this.ScheduleshipmentRedirect();
    } else {
      var currentUrl = window.location.href;
      localStorage.setItem("CommData",currentUrl)
      this.loginRedirect();
    }
  }

  decrypt(text, key){
    return String.fromCharCode(...text.match(/.{1,2}/g)
    .map((e,i) => 
      parseInt(e, 16) ^ key.charCodeAt(i % key.length) % 255)
    )
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

  getShipmentInfo(ShippingID) {
    try {
      let data = {
        ShippingID: ShippingID,
      };
      this.showLoader();
      api.post("scheduleshipment/getShipmentInfo", data).then((res) => {
        if (res.success) {
          var datatoaccess = 0;
          if (CommonConfig.getUserAccess("Shipment").AllAccess === 1) {
            datatoaccess = 1;
          } else {
            if (
              CommonConfig.loggedInUserData().PersonID == res.data[0].ManagedBy
            ) {
              datatoaccess = 1;
            }
          }

          if (datatoaccess == 1) {
            this.setState({
              TrackingNumber: res.data[0].TrackingNumber,
              CreatedBy: res.data[0].CreatedBy,
              PersonID: res.data[0].PersonID,
              CreatedByName: res.data[0].CreatedByName,
              ShipmentType:res.data[0].ShipmentType,
              ShipmentStatus: res.data[0].ShipmentStatus,
            });

            var datasets = 0
            var shipStatus = this.state.ShipmentStatus
            shipStatus = shipStatus.trim();
            
            if(shipStatus == "Pickup Scheduled"){
              datasets = 1
            }else if(shipStatus == "In Consolidation"){
              datasets = 1
            }else if(shipStatus == "New Request"){
              datasets = 1
            }else{
              datasets = 0
            }

            this.setState({datasetsOrigin:datasets})


            console.log("1",shipStatus)
            // this.getServiceByShipmentType(shipmentType.value);
            // this.getSubserviceName(serviceName.value, shipmentType.value);
            // this.hideLoader();
          } else {
            this.hideLoader();
            cogoToast.error("You dont have access for this shipment");
            setTimeout(() => {
              this.props.history.push("/admin/Scheduleshipment");
            }, 2000);
          }
        }
      });
    } catch (error) {
      this.hideLoader();
      console.log("error...", error);
    }
  }

  showLoader() {
    this.setState({ Loading: true });
  }

  hideLoader() {
    this.setState({ Loading: false });
  }

  showDiv = (type, packageType) => {
    this.setState({
      [type]: true,
    });

    if (
      packageType === "ComInvoiceVisible" &&
      this.state.commercialList.filter((x) => x.Status === "Active").length ===
        0
    ) {
      this.addnewRowCommercial();
    }
  };

  getCommercialInvoiceDetail(ShippingID) {
    this.showLoader();
    try {
      let data = {
        ShippingID:
        ShippingID,
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
           
              var commercialList = res.data
            
                this.CostCalculator("Commercial", false);
                console.log("this.state.TotalPackages = ",this.state.PackageList)
                console.log("this.state.commercialList.length = ",commercialList)
                if(this.state.TotalPackages != commercialList.length){
                    var diff = this.state.TotalPackages - commercialList.length
                    for (let index = 0; index < diff; index++) {
                      this.addnewRowCommercial() 
                    }
                  console.log("this.state.commercialList.length12 = ",commercialList)
                }

              
              if(res.data.length > 0){
                for (let index = 0; index < res.data.length; index++) {
                    for (let indexpack = 0; indexpack < this.state.PackageList.length; indexpack++) {
                      if(res.data[index].PackageNumber == this.state.PackageList[indexpack].PackageNumber){
                        res.data[index].PackageContent = this.state.PackageList[indexpack].PackageContent
                        var data = {
                          value: this.state.PackageList[indexpack].PackedType, label: this.state.PackageList[indexpack].PackedType 
                        }
                        res.data[index].PackedType = data
                      
                      } 
                    }
                }
              }


              this.setState({
                commercialList: res.data,
                CommercialInvoiceList: res.data,
              });
              console.log("this.state.commercialList.length = ",this.state.commercialList)

              
            // if(this.state.commercialList.length == 0){

            //   for (let index = 0; index < this.state.TotalPackages; index++) {
            //     this.addnewRowCommercial()
                
            //   }

            // }
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

  getPackageDetail(ShippingID) {
    // this.hideLoader();
    this.showLoader();
    try {
      let data = {
        ShippingID: ShippingID,
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
          // this.hideLoader();
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

  handleCommercialInvoiceChange = (event, type, index, ComId) => {
    console.log("ComId = ", ComId, this.state.commercialList);
    let idx = this.state.commercialList.findIndex((x) => x.Index === index);
    if (type === "PackageNumber") {
      let commercialList = this.state.commercialList;
      if (ComId != null) {
        commercialList[idx][
          "NewUpdateBy"
        ] = CommonConfig.loggedInUserData().PersonID;
      }
      commercialList[idx][type] = event.target.value;
      this.setState({ commercialList: commercialList });
    } else if (type === "ContentDescription") {
      if (
        (this.state.ShipmentType === "Ocean" &&
          event.target.value.length <= 200) ||
        event.target.value.length <= 60
      ) {
        var datatarget = event.target.value.replace(/[^\w\s]/gi, "");
        let commercialList = this.state.commercialList;
        if (ComId != null) {
          commercialList[idx][
            "NewUpdateBy"
          ] = CommonConfig.loggedInUserData().PersonID;
        }
        commercialList[idx][type] = datatarget;
        this.setState({ commercialList: commercialList });
      }
    } else if (type === "Quantity") {
      let commercialList = this.state.commercialList;
      commercialList[idx][type] = event.target.value.replace(/\D/g, "");
      if (ComId != null) {
        commercialList[idx][
          "NewUpdateBy"
        ] = CommonConfig.loggedInUserData().PersonID;
      }
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
        if (ComId != null) {
          commercialList[idx][
            "NewUpdateBy"
          ] = CommonConfig.loggedInUserData().PersonID;
        }
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
        if (ComId != null) {
          commercialList[idx][
            "NewUpdateBy"
          ] = CommonConfig.loggedInUserData().PersonID;
        }
        commercialList[idx]["TotalValue"] =
          commercialList[idx][type] * commercialList[idx]["Quantity"];
        this.setState({ commercialList: commercialList });
        this.CostCalculator("Commercial", true);
      }
    }
    else if (type === "PackedType") {
      let commercialList = this.state.commercialList;
      commercialList[idx][type] = event.target.value;
      this.setState({ commercialList: commercialList });
    }
  };

  getAddressDetails(ShippingID) {
    this.showLoader();
    try {
      let data = {
        ShippingID: ShippingID,
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

              //   this.setState({
              // 	fromCountryCode: fromCountry[0].CountryCode,
              // 	toCountryCode: toCountry[0].CountryCode,
              //   });

              var FromState = {
                value: fromRes[0].State,
                label: fromRes[0].State,
              };
              var ToState = {
                value: toRes[0].State,
                label: toRes[0].State,
              };

              this.setState({
                FromAddress: fromRes[0],
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
                // FromAddressObj: fromOBJ,

                ToAddress: toRes[0],

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
                // ToAddressObj: toOBJ,
              });

              var TOadd1 = this.state.ToAddressLine1;
              var TOadd2 = this.state.ToAddressLine2;
              var TOadd3 = this.state.ToAddressLine3;

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
              console.log("TOAddress= ", TOAddress);
              TOAddress =
                TOAddress +
                ", " +
                this.state.toCity +
                ", " +
                this.state.toState.label +
                " - " +
                this.state.ToZipCode;
              this.setState({ ToCompanyName: TOAddress });
              console.log("TOAddress= ", TOAddress);

              var fromadd1 = this.state.FromAddressLine1;
              var fromadd2 = this.state.FromAddressLine2;
              var fromadd3 = this.state.FromAddressLine3;

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
              FromAddress =
                FromAddress +
                ", " +
                this.state.fromCity +
                ", " +
                this.state.fromState.label +
                " - " +
                this.state.FromZipCode;
              console.log(FromAddress);
              this.setState({ FromCompanyName: FromAddress });
            }

            // this.hideLoader();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error...", err);
    }
  }

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

  handleSave = (redirect) =>{
    this.showLoader();
	console.log(this.state.commercialList)
	var commercialData = this.state.commercialList
	var com_data = []

	for (var i = 0; i < commercialData.length; i++) {
		let commercail_details = {};

		if(commercialData[i].ShippingCommercialInvoiceID == null){
		  commercail_details = {
			shipments_tracking_number: "",
			package_number: commercialData[i].PackageNumber,
			content_description: commercialData[i].ContentDescription,
			// newipLocation: commercialData[i].ipLocation,
			quantity: commercialData[i].Quantity,
			value_per_qty: commercialData[i].ValuePerQuantity,
			total_value: commercialData[i].TotalValue,
			Status: commercialData[i].Status,
			NewUpdatedBy:null,
			CommercialInvoiceID:
			  commercialData[i].ShippingCommercialInvoiceID,
        PackedBy: commercialData[i].PackedType
		  };
		}	else{
      commercail_details = {
        shipments_tracking_number: "",
        package_number: commercialData[i].PackageNumber,
        content_description: commercialData[i].ContentDescription,
        // newipLocation: commercialData[i].ipLocation,
        quantity: commercialData[i].Quantity,
        value_per_qty: commercialData[i].ValuePerQuantity,
        total_value: commercialData[i].TotalValue,
        Status: commercialData[i].Status,
        NewUpdatedBy:commercialData[i].UpdatedBy,
        CommercialInvoiceID:
          commercialData[i].ShippingCommercialInvoiceID,
          PackedBy: commercialData[i].PackedType
      };
    }	
		com_data.push(commercail_details);
	  }

  console.log("com_data = ",com_data);
  

	var data = {
		ShippingID:this.state.ShippingID,
		commercial: com_data,
		UserID: CommonConfig.loggedInUserData().PersonID
	}

	api
        .post("scheduleshipment/addcommercialByUser", data)
        .then((res) => {
          if (res.success) {

            

            this.hideLoader();
            cogoToast.success("Record added successfully");
            setTimeout(() => {
              this.loginRedirect();
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err);
        });


  }

  addnewRowCommercial = () => {
    console.log("Hello")
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

  loginRedirect = () => {
    // this.setState({ Loading: false });
    this.props.history.push("/auth/login-page");
  };
  viewCommercialInvoice = () => {


    if(this.state.commercialList.length > 0){
      this.state.newbalarray = []

      var datalength = this.state.commercialList.length
      console.log("commercialList = ",this.state.commercialList)
      
      if(datalength > 15){
        this.state.newbal = 0
      }else{
      console.log("datalength = ",datalength)
        this.state.newbal = 15 - datalength
        console.log("this.state.newbal",this.state.newbal)
        for (let index = 1; index <= this.state.newbal; index++) {
  
          var data = datalength+index
          console.log("this.state",data)
          var newarrayobj = {
            indexdata: data
          }
          this.state.newbalarray.push(newarrayobj)
          
        }
      }

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
                        commercial.Index,
                        commercial.ShippingCommercialInvoiceID
                      )
                    }
                  >
                    {this.renderPackageNumber()}
                  </Select>
                </FormControl>
              </div>
            </td>
            <td>{commercial.PackageContent}</td>
            <td className="">
              <div className="width-full">
                <TextField
                  value={commercial.ContentDescription}
                  onChange={(event) =>
                    this.handleCommercialInvoiceChange(
                      event,
                      "ContentDescription",
                      commercial.Index,
                      commercial.ShippingCommercialInvoiceID
                    )
                  }
                  inputProps={{}}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </div>
            </td>
            {this.state.ShipmentType !== "Ocean" ? (
              <>
                <td className="wd-num right">
                  <TextField
                    value={commercial.Quantity}
                    onChange={(event) =>
                      this.handleCommercialInvoiceChange(
                        event,
                        "Quantity",
                        commercial.Index,
                        commercial.ShippingCommercialInvoiceID
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
                        commercial.Index,
                        commercial.ShippingCommercialInvoiceID
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
                  this.state.ShipmentType === "Ocean"
                    ? commercial.TotalValue
                    : parseFloat(commercial.TotalValue).toFixed(2)
                }
                onChange={(event) =>
                  this.handleCommercialInvoiceChange(
                    event,
                    "TotalValue",
                    commercial.Index,
                    commercial.ShippingCommercialInvoiceID
                  )
                }
                disabled={
                  this.state.ShipmentType === "Ocean" ? false : true
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

            <td style={{ width: "104px" }}>
                  <div className="package-select">
                    <FormControl className={classes.formControl} fullWidth>
                      <Select
                        id="package_number"
                        name="package_number"
                        value={commercial.PackedType ? commercial.PackedType.value:""}
                        className="form-control"
                        onChange={(event) =>
                          this.handleCommercialInvoiceChange(
                            event,
                            "PackedType",
                            commercial.Index,
                            commercial.ShippingCommercialInvoiceID
                          )
                        }
                        
                      >
                        {this.packedBy()}
                      </Select>
                    </FormControl>
                  </div>
                </td>
            
          </tr>
        );
      });
    }
  };
  renderCommercialExtra = () =>{
    console.log("Welcome data")

    return this.state.newbalarray.map((commercial, idx) => {
      return (
        <tr>
        <td className="wd-130">
          
        </td>
        <td>{commercial.PackageContent}</td>
        <td className="">
          <div className="width-full">
            <TextField
              value={
                ""
              }
              
              disabled={
                true
              }
              inputProps={{}}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>
        </td>
        {this.state.ShipmentType !== "Ocean" ? (
          <>
            <td className="wd-num right">
              <TextField
                value={
                  ""
                }
                
                disabled={
                  true
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
                
                value={
                  ""
                }
                
                disabled={
                  true
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
              ""
            }
            
            disabled={
              true
            }
            
            inputProps={{}}
            InputProps={{
              disableUnderline: true,
            }}
          />
        </td>

        <td style={{ width: "104px" }}>
              <div className="package-select">
                <FormControl className={classes.formControl} fullWidth>
                  <Select
                    id="package_number"
                    name="package_number"
                    value={commercial.PackedType}
                    className="form-control"
                    onChange={(event) =>
                      this.handleCommercialInvoiceChange(
                        event,
                        "PackedType",
                        commercial.Index,
                        commercial.ShippingCommercialInvoiceID
                      )
                    }
                    
                  >
                    {this.packedBy()}
                  </Select>
                </FormControl>
              </div>
            </td>
        
      </tr>
        
      );
    });
    
  
    }
  

  CostCalculator = (type, IsFalse) => {
    if (type === "Commercial") {
      let commercialList = this.state.commercialList.filter(
        (x) => x.Status === "Active"
      );
      var totalCost = 0;
      for (var i = 0; i < commercialList.length; i++) {
        totalCost = Number(totalCost) + Number(commercialList[i].TotalValue);
      }
      this.setState({ TotalCostCommercial: totalCost });
      //   if (IsFalse) {
      //     this.showAESMessage(totalCost);
      //   }
    }
  };


  render() {
    const {
      FromAddress,
      ToAddress,
      ContactName,
      ToCountryName,
      TotalCost,
      TrackingNumber,
      isComInvoiceVisible,
      TotalCostCommercial,
    } = this.state;
    return (
      <div>
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}

        <div className="hg-table">
          <div className="hg-table-container">
            <table className="head-table">
              <tr>
                <td className="wd-50">
                  <img
                    src="https://www.sflworldwide.com/en-in/wp-content/uploads/2022/06/logo-2.png"
                    alt="Logo"
                  />
                </td>
                <td className="wd-50 align-right-hhg">
                  <p className="align-right-hhg">
                    3364 Garden Brook Drive
                    <br />
                    Farmers Branch, TX – 75234
                    <br />
                    972-255-7447 | contact@sflworldwide.com
                    <br />
                    www.SFLWorldwide.com
                  </p>
                </td>
              </tr>
            </table>

            <table className="common-table">
              <tr>
                <td className="align-center">
                  <h1>Commercial Invoice</h1>
                </td>
              </tr>
            </table>

            <table className="common-table bordered-table mt-20">
              <tr>
                <td className="wd-20 align-right-hhg">Customer Name:</td>
                <td className="wd-30">{this.state.CreatedByName}</td>
                <td className="wd-20 align-right-hhg">Ref No:</td>
                <td className="wd-30">{this.state.TrackingNumber}</td>
              </tr>
              <tr>
                <td className="wd-20 align-right-hhg">Origin Address:</td>
                <td colSpan={3} className="wd-30">
                  {this.state.FromCompanyName}
                </td>
              </tr>
              <tr>
                <td className="wd-20 align-right-hhg">Destination Address:</td>
                <td colSpan={3} className="wd-30">
                  {this.state.ToCompanyName}
                </td>
              </tr>
            </table>
            {/* 
				<table className="common-table bordered-table mt-20 font-12 tl-fixed">
					<tr>
						<td colspan="6" className="align-center">EXECPTION SYMBOLS</td>
						<td colspan="3" className="align-center">LOCATION SYMBOLS</td>
					</tr>
					<tr>
						<td>BE-BENT</td>
						<td>D-DENTED</td>
						<td>L-LOOSE</td>
						<td>CH-CHIPPED</td>
						<td>SC-SCRATCHED</td>
						<td>W-BADLY WORN</td>
						<td>1) AR</td>
						<td>5) LEFT</td>
						<td>9) SIDE</td>
					</tr>
					<tr>
						<td>BR-BROKEN</td>
						<td>F-FADED</td>
						<td>MA-MARRED</td>
						<td>R-RUBBED</td>
						<td>SH-SHORT</td>
						<td>Z-CRACKED</td>
						<td>2) BOTTOM</td>
						<td>6) LEG</td>
						<td>10) TOP</td>
					</tr>
					<tr>
						<td>BU-BURNT</td>
						<td>R-GOUGED</td>
						<td>M-MILDEW</td>
						<td>RU-RUSTED</td>
						<td>SO-SOLED</td>
						<td></td>
						<td>3) CORNER</td>
						<td>7) REAR</td>
						<td>11) VENEER</td>
					</tr>
					<tr>
						<td>MO-MOTH EATEN</td>
						<td>CU-CONTENTS & CONDITION UNKNOWN</td>
						<td>PBM-PACKED BY MOVERS</td>
						<td>PBO-PACKED BY OWNER</td>
						<td>T-TORN</td>
						<td></td>
						<td>4) FRONT</td>
						<td>8) RIGHT</td>
						<td></td>
					</tr>
				</table> */}
            <div style={{ textAlign: "right", marginTop: "12px" }}>
              {this.state.commercialList.filter((x) => x.Status === "Active")
                .length === 0 ? (
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
                    this.showDiv("isComInvoiceVisible", "ComInvoiceVisible")
                  }
                  style={{ width: "70px", height: "20px" }}
                  color="primary"
                >
                  Open
                </Button>
              ) : null}
            </div>
            {isComInvoiceVisible ? (
              <GridContainer className="MuiGrid-justify-xs-center">
                <GridItem xs={12} sm={12} md={12}>
                  <div className="package-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Package Number</th>
                          <th>Package Type</th>
                          <th>Package Content</th>
                          {this.state.ShipmentType !== "Ocean" ? (
                            <>
                              <th className="right">Quantity</th>
                              <th className="right nowrap">Value Per Qty</th>
                            </>
                          ) : null}
                          <th className="right">Value (USD)</th>
                          <th className="right">Packed By</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {
                        this.viewCommercialInvoice()}
                        </tbody>
                        {this.state.newbal >0 ?(
                          <tbody>
                            {this.renderCommercialExtra()}

                          </tbody>

                        ):null}
                        <tbody>
                        <tr>
                          {this.state.ShipmentType !== "Ocean" ? (
                            <td className="text-align-right" colSpan="4">
                              <b>Total Cost:</b>
                            </td>
                          ) : (
                            <td className="text-align-right" colSpan="3">
                              <b>Total Value (USD):</b>
                            </td>
                          )}
                          <td className="right">
                            <CustomInput
                              inputProps={{
                                value: parseFloat(TotalCostCommercial).toFixed(
                                  2
                                ),
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

            <div className="shipment-submit">
              <div className="right">
            { this.state.datasetsOrigin == 1 ? (
              <Button
              justify="center"
              color="primary"
                onClick={() => this.handleSave(true)}
              >
              Save & Exit
              </Button>

            ):null}
                

                <Button
                  justify="center"
                  color="secondary"
                  //   onClick={() => this.handleCancel()}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommercialInvoice;
