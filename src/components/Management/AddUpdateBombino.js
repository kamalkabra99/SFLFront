import React, { Component } from "react";
import Wizard from "components/Wizard/Wizard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import { CommonConfig } from "../../utils/constant";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import Adduser from "@material-ui/icons/AttachMoney";
import Button from "components/CustomButtons/Button.js";

import api from "../../utils/apiClient";
import CardBody from "components/Card/CardBody.js";
import cogoToast from "cogo-toast";
import SimpleBackdrop from "../../utils/general";
class AddupdateBombino extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      GetZoneList:[],
      GetZoneRates:[],
      Loading:false,
      CreatedBy: CommonConfig.loggedInUserData().PersonID,
      Steps: [
        {
          stepName: "Zone List",
          stepId: "ZoneList",
          classname: "active",
        },
        {
          stepName: "Zone Rates",
          stepId: "ZoneRates",
          classname: "inactive",
        },
      ],
    };


  }
  async componentDidMount() {
    await this.showHide();
    this.getZoneList();
    this.getZoneRates();
  }

  


  getZoneList() {
    try {
      this.showLoader();
      api
        .post("userManagement/getZoneList")
        .then((res) => {
          if (res.success) {
            debugger;
            this.setState({
              GetZoneList: res.data,
            });
            this.state.GetZoneList.map((OBJ) => {
              OBJ.ZipstartErrorText = "";
              OBJ.ZipendErrorText = "";
              OBJ.ZoneErrorText = "";
              OBJ.flag = "U";
              return OBJ;
            });
            this.hideLoader();
          } else {
            cogoToast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {}
  }

  getZoneRates() {
    try {
      this.showLoader();
      api
        .post("userManagement/getZoneRates")
        .then((res) => {
          if (res.success) {
            debugger;
            this.setState({
              GetZoneRates: res.data,
            });
            this.state.GetZoneRates.map((OBJ) => {
              OBJ.WeightStartErrorText= "";
              OBJ.WeightEndErrorText= "";
              OBJ.Zone2BuyErrorText= "";
              OBJ.Zone2SellErrorText= "";
              OBJ.Zone3BuyErrorText= "";
              OBJ.Zone3SellErrorText= "";
              OBJ.Zone4BuyErrorText= "";
              OBJ.Zone4SellErrorText= "";
              OBJ.Zone5BuyErrorText= "";
              OBJ.Zone5SellErrorText= "";
              OBJ.Zone6BuyErrorText= "";
              OBJ.Zone6SellErrorText= "";
              OBJ.Zone7BuyErrorText= "";
              OBJ.Zone7SellErrorText= "";
              OBJ.Zone8BuyErrorText= "";
              OBJ.Zone8SellErrorText= "";
              OBJ.flag = "U";
              return OBJ;
            });
            this.hideLoader();
          } else {
            cogoToast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {}
  }
  hideLoader = () => {
    this.setState({ Loading: false });
  };

  showLoader = () => {
    this.setState({ Loading: true });
  };

  handledInput = (e, id, ZoneInput, Type,inputType) => {
    debugger;
    let ZoneData ="";
    if(inputType =="ZoneList")
      ZoneData = this.state.GetZoneList;
    else
      if(inputType ="ZoneRates")
        ZoneData = this.state.GetZoneRates;

    let i = ZoneData.findIndex((x) => x.ID === id);

    let x = document.getElementsByTagName("input");
    let val = 0;
    val = e.target.value === "" ? 0 : e.target.value;
    if (Type === "Zonestart") {
      ZoneData[i].DestiZipStart = val;
    } else if (Type === "Zoneend") {
      ZoneData[i].DestiZipEnd = val;
    } else if (Type === "Zone") {
      ZoneData[i].Zone = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "WeightStart") {
      ZoneData[i].WeightStart = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "WeightEnd") {
      ZoneData[i].WeightEnd = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone2Buy") {
      ZoneData[i].Zone2Buy = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone3Buy") {
      ZoneData[i].Zone3Buy = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone4Buy") {
      ZoneData[i].Zone4Buy = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone5Buy") {
      ZoneData[i].Zone5Buy = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone6Buy") {
      ZoneData[i].Zone6Buy = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone7Buy") {
      ZoneData[i].Zone7Buy = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone8Buy") {
      ZoneData[i].Zone8Buy = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone2Sell") {
      ZoneData[i].Zone2Sell = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone3Sell") {
      ZoneData[i].Zone3Sell = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone4Sell") {
      ZoneData[i].Zone4Sell = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone5Sell") {
      ZoneData[i].Zone5Sell = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone6Sell") {
      ZoneData[i].Zone6Sell = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone7Sell") {
      ZoneData[i].Zone7Sell = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 
    else if (Type === "Zone8Sell") {
      ZoneData[i].Zone8Sell = val;
      // MarkupData[i].Purchase = parseFloat(val).toFixed(2);
    } 

    this.setState({ GetZoneRates: ZoneData });
  };

  
  handleBlur = (e, id, ZoneInput, Type) => {
    let ZoneData = this.state.GetZoneList;
    let i = ZoneData.findIndex((x) => x.ID === id);

    let x = document.getElementsByTagName("input");
    let val = 0;
    val = e.target.value;
    debugger;
    if (Type === "Zonestart") {
      if (val === "0" || val === "") {
        ZoneData[i].ZipstartErrorText = "please fill the details";
      }
      else {
        ZoneData[i].DestiZipStart = val;
        x[i].className = "form-control";
        ZoneData[i].ZipstartErrorText = "";
      }
    } else if (Type === "Zoneend") {
      if (val === "0" || val === "") {
        ZoneData[i].ZipendErrorText = "please fill the details";
      } else {
        ZoneData[i].DestiZipEnd = val;
        x[i].className = "form-control";
        ZoneData[i].ZipendErrorText = "";
      }
    } else if (Type === "Zone") {
      if (val === "0" || val === "") {
        ZoneData[i].ZoneErrorText = "please fill the details";
      } 
    }
      else if (Type === "WeightStart") {
        if (val === "0" || val === "") {
          ZoneData[i].WeightStartErrorText = "please fill the details";
        } 
      }   else if (Type === "WeightEnd") {
          if (val === "0" || val === "") {
            ZoneData[i].WeightEndErrorText = "please fill the details";
          } 
        }   else if (Type === "Zone2Buy") {
      if (val === "0" || val === "") {
        ZoneData[i].Zone2BuyErrorText = "please fill the details";
      } 
    } else if (Type === "Zone3Buy") {
        if (val === "0" || val === "") {
          ZoneData[i].Zone3BuyErrorText = "please fill the details";
        } 
      
      }else if (Type === "Zone4Buy") {
      if (val === "0" || val === "") {
        ZoneData[i].Zone4BuyErrorText = "please fill the details";
      }
    }else if (Type === "Zone5Buy") {
        if (val === "0" || val === "") {
          ZoneData[i].Zone5BuyErrorText = "please fill the details";
        } 
      }   else if (Type === "Zone6Buy") {
          if (val === "0" || val === "") {
            ZoneData[i].Zone6BuyErrorText = "please fill the details";
          } 
        }   else if (Type === "Zone7Buy") {
            if (val === "0" || val === "") {
              ZoneData[i].Zone7BuyErrorText = "please fill the details";
            } 
          }   else if (Type === "Zone8Buy") {
              if (val === "0" || val === "") {
                ZoneData[i].Zone8BuyErrorText = "please fill the details";
              } 
            }
              else {
                    let checkZoneData = this.state.GetZoneRates;
                    console.log("check....", checkZoneData);

                    // var Country = checkMarkupData.filter((x) => {
                    //   console.log("xxxxxx", x);
                    // });                  
    } 
 
    this.setState({ GetZoneList: ZoneData });
  };

  removeZoneRow = (index) => {debugger
    const removeZone= [...this.state.GetZoneList];
    var zoneIndex = this.state.GetZoneList.findIndex((x) => x.ID === index);
    if (zoneIndex !== -1) {
      removeZone[zoneIndex]["Status"] = "Inactive";
      this.setState({ GetZoneList: removeZone });
      if (removeZone.filter((x) => x.Status === "Active").length === 0) {
        this.setState({
          isVisible: false,
        });
      }
    }
  };
  handleAddZoneRow = () => {
    var addZone= this.state.GetZoneList.filter(
      (x) => x.Status === "Active" && (x.DestiZipStart === null || x.DestiZipStart === "") && (x.DestiZipEnd === null || x.DestiZipEnd === "") && (x.Zone === null || x.Zone === "")
    );
    if (addZone.length === 0) {
      const Zone = {
        ID: this.state.GetZoneList.length + 1,
        DestiZipStart: "",
        DestiZipEnd: null,
        Zone: null,
        ZipstartErrorText: "",
        ZipendErrorText: "",
        ZoneErrorText: "",
        flag: "I",
        Status: "Active",
        Index: this.state.GetZoneList.length + 1,
      };
      this.setState({
        // notesDisabled: false,
        GetZoneList: [...this.state.GetZoneList, Zone],
      });
    } else {
      cogoToast.error("Please fill above Blank Zone Row first");
    }
  };
  removeRatesRow = (index) => {
    const removeRates= [...this.state.GetZoneRates];
    var ratesIndex = this.state.GetZoneRates.findIndex((x) => x.ID === index);
    if (ratesIndex !== -1) {
      removeRates[ratesIndex]["Status"] = "Inactive";
      this.setState({ GetZoneRates: removeRates });
      if (removeRates.filter((x) => x.Status === "Active").length === 0) {
        this.setState({
          isVisible: false,
        });
      }
    }
  };
  handleAddRatesRow = () => {
    var addRates = this.state.GetZoneRates.filter(
      (x) => x.Status === "Active" && (x.WeightStart === null || x.WeightEnd === "") && (x.WeightStart === null || x.WeightEnd === "") && (x.Zone2Buy === null || x.Zone2Buy === "") && (x.Zone3Buy === null || x.Zone3Buy === "") && (x.Zone4Buy === null || x.Zone4Buy === "") && (x.Zone5Buy === null || x.Zone5Buy === "") && (x.Zone6Buy === null || x.Zone6Buy === "") && (x.Zone7Buy === null || x.Zone7Buy === "") && (x.Zone8Buy === null || x.Zone8Buy === "") && (x.Zone2Sell === null || x.Zone2Sell === "") && (x.Zone3Sell === null || x.Zone3Sell === "") && (x.Zone4Sell === null || x.Zone4Sell === "") && (x.Zone5Sell === null || x.Zone5Sell === "") && (x.Zone6Sell === null || x.Zone6Sell === "") && (x.Zone7Sell === null || x.Zone7Sell === "") && (x.Zone8Sell === null || x.Zone8Sell === "")
    );
    if (addRates.length === 0) {
      const Zone = {
        ID: this.state.GetZoneRates.length + 1,
        WeightStart:"",
        WeightEnd:"",
        Zone2Buy:"",
        Zone3Buy:"",
        Zone4Buy:"",
        Zone5Buy:"",  
        Zone6Buy:"",  
        Zone7Buy:"",  
        Zone8Buy:"", 
        Zone2Sell:"", 
        Zone3Sell:"", 
        Zone4Sell:"", 
        Zone5Sell:"",
        Zone6Sell:"",
        Zone7Sell:"",
        Zone8Sell:"",
        WeightStartErrorText:"",
        WeightEndErrorText:"",
        Zone2BuyErrorText:"",
        Zone2SellErrorText:"",
        Zone3BuyErrorText:"",
        Zone3SellErrorText:"",
        Zone4BuyErrorText:"",
        Zone4SellErrorText:"",
        Zone5BuyErrorText:"",
        Zone5SellErrorText:"",
        Zone6BuyErrorText:"",
        Zone6SellErrorText:"",
        Zone7BuyErrorText:"",
        Zone7SellErrorText:"",
        Zone8BuyErrorText:"",
        Zone8SellErrorText:"",
        flag: "I",
        Status: "Active",
        Index: this.state.GetZoneRates.length + 1,
      };
      this.setState({
        // notesDisabled: false,
        GetZoneRates: [...this.state.GetZoneRates, Zone],
      });
    } else {
      cogoToast.error("Please fill above Blank Row first");
    }
  };


  cancelUser = () => {
    this.props.history.push({
      pathname: "/admin/ManagementNavigation",
    });
  };

  saveZoneList = () => {
    debugger;
    var ZoneData = this.state.GetZoneList;
    for (var i = 0; i < ZoneData.length; i++) {
      if (
        ZoneData[i].ZipstartErrorText !== "" ||
        ZoneData[i].ZipendErrorText !== "" ||
        ZoneData[i].ZoneErrorText !== "" 
      ) {
        cogoToast.error("Please ensure that no fields are left blank");
        console.log("missing...",i);
        return;
      }
    }
    debugger;
    try {
      this.showLoader();
      var Details = {
        rowData: this.state.GetZoneList,
        userId: this.state.CreatedBy,
      };
      api
        .post("userManagement/addUpdateZoneUStoIN", Details)
        .then((res) => {
          if (res.success) {
            cogoToast.success("Zone List Updated");
           this.getZoneList();
            this.hideLoader();
          } else {
            cogoToast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          this.hideLoader();
          cogoToast.error(err);
        });
    } catch (error) {
      this.hideLoader();
      cogoToast.error("Something Went Wrong");
    }
  };


  saveZoneRateList = () => {
    debugger;
    var ZoneData = this.state.GetZoneRates;
    for (var i = 0; i < ZoneData.length; i++) {
      if (
       
        (ZoneData[i].WeightStartErrorText !== "" && ZoneData[i].WeightStartErrorText !== "undefined") ||
        (ZoneData[i].WeightEndErrorText !== "" && ZoneData[i].WeightEndErrorText !== "undefined") ||
        (ZoneData[i].Zone2BuyErrorText !== "" && ZoneData[i].Zone2BuyErrorText !== "undefined" )||
        (ZoneData[i].Zone2SellErrorText !== "" &&  ZoneData[i].Zone2SellErrorText !== "undefined") ||
        (ZoneData[i].Zone3BuyErrorText !== "" && ZoneData[i].Zone3BuyErrorText !== "undefined") ||
        (ZoneData[i].Zone3SellErrorText !== "" &&  ZoneData[i].Zone3SellErrorText !== "undefined") ||
        (ZoneData[i].Zone4BuyErrorText !== "" && ZoneData[i].Zone4BuyErrorText !== "undefined" )||
        (ZoneData[i].Zone4SellErrorText !== "" &&  ZoneData[i].Zone4SellErrorText !== "undefined") ||
        (ZoneData[i].Zone5BuyErrorText !== "" && ZoneData[i].Zone5BuyErrorText !== "undefined" )||
        (ZoneData[i].Zone5SellErrorText !== "" &&  ZoneData[i].Zone5SellErrorText !== "undefined") ||
        (ZoneData[i].Zone6BuyErrorText !== "" && ZoneData[i].Zone6BuyErrorText !== "undefined") ||
        (ZoneData[i].Zone6SellErrorText !== "" &&  ZoneData[i].Zone6SellErrorText !== "undefined") &&
        (ZoneData[i].Zone7BuyErrorText !== "" && ZoneData[i].Zone7BuyErrorText !== "undefined") ||
        (ZoneData[i].Zone7SellErrorText !== "" &&  ZoneData[i].Zone7SellErrorText !== "undefined") ||
        (ZoneData[i].Zone8BuyErrorText !== "" && ZoneData[i].Zone8BuyErrorText !== "undefined" )||
        (ZoneData[i].Zone8SellErrorText !== "" && ZoneData[i].Zone8SellErrorText !== "undefined") 
      ) {
      
        cogoToast.error("Please ensure that no fields are left blank");
        console.log("missing...",i);
        return;
      }
    }
    debugger;
    try {
      this.showLoader();
      var Details = {
        rowData: this.state.GetZoneRates,
        userId: this.state.CreatedBy,
      };
      api
        .post("userManagement/addUpdateZoneRatesUStoIN", Details)
        .then((res) => {
          if (res.success) {
            cogoToast.success("Zone Rates List Updated");
           this.getZoneRates();
            this.hideLoader();
          } else {
            cogoToast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          this.hideLoader();
          cogoToast.error(err);
        });
    } catch (error) {
      this.hideLoader();
      cogoToast.error("Something Went Wrong");
    }
  };

  renderMarkup = (ListType) => {
    if(ListType == "ZoneList")
    {
      var i= 1;
    return this.state.GetZoneList.filter(
      (service) => service.Status === "Active"
    ).map((service, idx) => {
            const {
        ID,
        DestiZipStart,
        DestiZipEnd,
        Zone,
        ZipstartErrorText,
        ZipendErrorText,
        ZoneErrorText,
      } = service;
      return (
        <tr key={ID}>
          <td>
            <input
              type="text"
              name="Zonestart"
              id="Zonestart"
              className="form-control"
              value={DestiZipStart}
              onChange={(event) =>
                this.handledInput(event, ID, DestiZipStart, "Zonestart")
              }
              onBlur={(e) => this.handleBlur(e, ID, DestiZipStart, "Zonestart")}
            />
            <span id="ZonestartErr" style={{ color: "red", fontSize: "12px" }}>
              {ZipstartErrorText}
            </span>
          </td>
          <td>
            <input
              type="text"
              name="Zoneend"
              id="Zoneend"
              className="form-control"
              value={DestiZipEnd}
              onChange={(event) => this.handledInput(event, ID, DestiZipEnd, "Zoneend")}
              onBlur={(e) => this.handleBlur(e, ID, DestiZipEnd, "Zoneend")}
            />
            <span id="ZoneendErr" style={{ color: "red", fontSize: "12px" }}>
              {ZipendErrorText}
            </span>
          </td>
          <td>
            <input
              type="number"
              name="Zone"
              id="Zone"
              className="form-control"
              value={Zone}
              onChange={(event) =>
                this.handledInput(event, ID, Zone, "Zone")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone, "Zone")}
            />
            <span id="ZoneErr" style={{ color: "red", fontSize: "12px" }}>
              {ZoneErrorText}
            </span>
          </td>
          <td className="wd-100">
            <Button
              justIcon
              color="danger"
              className="Plus-btn "
              onClick={() => this.removeZoneRow(ID)}
            >
              <i className={"fas fa-minus"} />
            </Button>
            {this.state.GetZoneList.filter((x) => x.Status === "Active")
              .length ===
            idx + 1 ? (
              <Button
                justIcon
                color="facebook"
                onClick={() => this.handleAddZoneRow()}
                className="Plus-btn "
              >
                <i className={"fas fa-plus"} />
              </Button>
            ) : null}
          </td>
        </tr>
      );
     
    });
  }
  else  if(ListType == "ZoneRates")
    {
    return this.state.GetZoneRates.filter(
      (service) => service.Status === "Active"
    ).map((service, idx) => {
      const {
        ID,
        WeightStart,
        WeightEnd,
        Zone2Buy,
        Zone2Sell,
        Zone3Buy,
        Zone3Sell,
        Zone4Buy,
        Zone4Sell,
        Zone5Buy,
        Zone5Sell,
        Zone6Buy,
        Zone6Sell,
        Zone7Buy,
        Zone7Sell,
        Zone8Buy,
        Zone8Sell,
        WeightStartErrorText,
        WeightEndErrorText,
        Zone2BuyErrorText,
        Zone2SellErrorText,
        Zone3BuyErrorText,
        Zone3SellErrorText,
        Zone4BuyErrorText,
        Zone4SellErrorText,
        Zone5BuyErrorText,
        Zone5SellErrorText,
        Zone6BuyErrorText,
        Zone6SellErrorText,
        Zone7BuyErrorText,
        Zone7SellErrorText,
        Zone8BuyErrorText,
        Zone8SellErrorText,
       
      } = service;
      return (
        <tr key={ID}>
          <td>
            <input
              type="text"
              name="Zonestart"
              id="WeightStart"
              className="form-control"
              value={WeightStart}
              onChange={(event) =>
                this.handledInput(event, ID, WeightStart, "WeightStart")
              }
              onBlur={(e) => this.handleBlur(e, ID, WeightStart, "WeightStart")}
            />
            <span id="WeightStartErr" style={{ color: "red", fontSize: "12px" }}>
              {WeightStartErrorText}
            </span>
          </td>
          <td>
            <input
              type="text"
              name="WeightEnd"
              id="WeightEnd"
              className="form-control"
              value={WeightEnd}
              onChange={(event) => this.handledInput(event, ID, WeightEnd, "WeightEnd")}
              onBlur={(e) => this.handleBlur(e, ID, WeightEnd, "WeightEnd")}
            />
            <span id="WeightEndErr" style={{ color: "red", fontSize: "12px" }}>
              {WeightEndErrorText}
            </span>
          </td>
          <td>
            <input
              type="number"
              name="Zone2Buy"
              id="Zone2Buy"
              className="form-control"
              value={Zone2Buy}
              onChange={(event) =>
                this.handledInput(event, ID, Zone2Buy, "Zone2Buy")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone2Buy, "Zone2Buy")}
            />
            <span id="Zone2BuyErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone2BuyErrorText}
            </span>
          </td>
          {/* <td>
            <input
              type="number"
              name="Zone2Sell"
              id="Zone2Sell"
              className="form-control"
              value={Zone2Sell}
              onChange={(event) =>
                this.handledInput(event, ID, Zone2Sell, "Zone2Sell")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone2Sell, "Zone2Sell")}
            />
            <span id="Zone2SellErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone2SellErrorText}
            </span>
          </td> */}
          <td>
            <input
              type="number"
              name="Zone3Buy"
              id="Zone3Buy"
              className="form-control"
              value={Zone3Buy}
              onChange={(event) =>
                this.handledInput(event, ID, Zone3Buy, "Zone3Buy")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone3Buy, "Zone3Buy")}
            />
            <span id="Zone3BuyErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone3BuyErrorText}
            </span>
          </td>
          {/* <td>
            <input
              type="number"
              name="Zone3Sell"
              id="Zone3Sell"
              className="form-control"
              value={Zone3Sell}
              onChange={(event) =>
                this.handledInput(event, ID, Zone3Sell, "Zone3Sell")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone3Sell, "Zone3Sell")}
            />
            <span id="Zone3SellErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone3SellErrorText}
            </span>
          </td> */}
          <td>
            <input
              type="number"
              name="Zone4Buy"
              id="Zone4Buy"
              className="form-control"
              value={Zone4Buy}
              onChange={(event) =>
                this.handledInput(event, ID, Zone4Buy, "Zone4Buy")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone2Buy, "Zone4Buy")}
            />
            <span id="Zone4BuyErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone4BuyErrorText}
            </span>
          </td>
          {/* <td>
            <input
              type="number"
              name="Zone4Sell"
              id="Zone4Sell"
              className="form-control"
              value={Zone4Sell}
              onChange={(event) =>
                this.handledInput(event, ID, Zone4Sell, "Zone4Sell")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone4Sell, "Zone4Sell")}
            />
            <span id="Zone4SellErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone4SellErrorText}
            </span>
          </td> */}
          <td>
            <input
              type="number"
              name="Zone5Buy"
              id="Zone5Buy"
              className="form-control"
              value={Zone5Buy}
              onChange={(event) =>
                this.handledInput(event, ID, Zone5Buy, "Zone5Buy")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone5Buy, "Zone5Buy")}
            />
            <span id="Zone5BuyErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone5BuyErrorText}
            </span>
          </td>
          {/* <td>
            <input
              type="number"
              name="Zone5Sell"
              id="Zone5Sell"
              className="form-control"
              value={Zone5Sell}
              onChange={(event) =>
                this.handledInput(event, ID, Zone5Sell, "Zone5Sell")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone5Sell, "Zone5Sell")}
            />
            <span id="Zone5SellErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone5SellErrorText}
            </span>
          </td> */}
          <td>
            <input
              type="number"
              name="Zone6Buy"
              id="Zone6Buy"
              className="form-control"
              value={Zone6Buy}
              onChange={(event) =>
                this.handledInput(event, ID, Zone6Buy, "Zone6Buy")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone6Buy, "Zone6Buy")}
            />
            <span id="Zone6BuyErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone6BuyErrorText}
            </span>
          </td>
          {/* <td>
            <input
              type="number"
              name="Zone6Sell"
              id="Zone6Sell"
              className="form-control"
              value={Zone6Sell}
              onChange={(event) =>
                this.handledInput(event, ID, Zone6Sell, "Zone6Sell")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone6Sell, "Zone6Sell")}
            />
            <span id="Zone6SellErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone6SellErrorText}
            </span>
          </td> */}
          <td>
            <input
              type="number"
              name="Zone7Buy"
              id="Zone7Buy"
              className="form-control"
              value={Zone7Buy}
              onChange={(event) =>
                this.handledInput(event, ID, Zone7Buy, "Zone7Buy")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone7Buy, "Zone7Buy")}
            />
            <span id="Zone7BuyErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone7BuyErrorText}
            </span>
          </td>
          {/* <td>
            <input
              type="number"
              name="Zone7Sell"
              id="Zone7Sell"
              className="form-control"
              value={Zone7Sell}
              onChange={(event) =>
                this.handledInput(event, ID, Zone7Sell, "Zone7Sell")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone7Sell, "Zone7Sell")}
            />
            <span id="Zone7SellErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone7SellErrorText}
            </span>
          </td> */}
          <td>
            <input
              type="number"
              name="Zone8Buy"
              id="Zone8Buy"
              className="form-control"
              value={Zone8Buy}
              onChange={(event) =>
                this.handledInput(event, ID, Zone8Buy, "Zone8Buy")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone8Buy, "Zone8Buy")}
            />
            <span id="Zone8BuyErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone8BuyErrorText}
            </span>
          </td>
          {/* <td>
            <input
              type="number"
              name="Zone8Sell"
              id="Zone8Sell"
              className="form-control"
              value={Zone8Sell}
              onChange={(event) =>
                this.handledInput(event, ID, Zone8Sell, "Zone8Sell")
              }
              onBlur={(e) => this.handleBlur(e, ID, Zone8Sell, "Zone8Sell")}
            />
            <span id="Zone8SellErr" style={{ color: "red", fontSize: "12px" }}>
              {Zone8SellErrorText}
            </span>
          </td> */}
        
          <td className="wd-100 nowrap">
            <Button
              justIcon
              color="danger"
              className="Plus-btn "
              onClick={() => this.removeRatesRow(ID)}
            >
              <i className={"fas fa-minus"} />
            </Button>
            {this.state.GetZoneRates.filter((x) => x.Status === "Active")
              .length ===
            idx + 1 ? (
              <Button
                justIcon
                color="facebook"
                onClick={() => this.handleAddRatesRow()}
                className="Plus-btn "
              >
                <i className={"fas fa-plus"} />
              </Button>
            ) : null}
          </td>
        </tr>
      );
    });
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
    document.getElementById("ZoneList").style.display = "block";
    document.getElementById("ZoneRates").style.display = "none";

  }



  render() {
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
          <div className="shipment-pane" id="ZoneList">
            <Card>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="package-table no-scroll">
                      <table>
                        <thead>
                          <tr>
                            <th>Zone Start</th>
                            <th>Zone End</th>
                            <th>Zone</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderMarkup("ZoneList")}</tbody>
                      </table>
                    </div>
                  </GridItem>
                </GridContainer>
                <div className="right">
              <Button color="rose" onClick={() => this.saveZoneList()}>
                Save
              </Button>
              <Button color="secondary" onClick={() => this.cancelUser()}>
                Cancel
              </Button>
            </div>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="shipment-content">
          <div className="shipment-pane" id="ZoneRates">
            <Card>
              <CardBody>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={12}>
                    <div className="package-table zone-rates-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Weight Start</th>
                            <th>Weight End</th>
                            <th>Zone2 Buy</th>
                            {/* <th>Zone2 Sell</th> */}
                            <th>Zone3 Buy</th>
                            {/* <th>Zone3 Sell</th> */}
                            <th>Zone4 Buy</th>
                            {/* <th>Zone4 Sell</th> */}
                            <th>Zone5 Buy</th>
                            {/* <th>Zone5 Sell</th>  */}
                            <th>Zone6 Buy</th>
                            {/* <th>Zone6 Sell</th>  */}
                            <th>Zone7 Buy</th>
                            {/* <th>Zone7 Sell</th>  */}
                            <th>Zone8 Buy</th>
                            {/* <th>Zone8 Sell</th>                             */}
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>{this.renderMarkup("ZoneRates")}</tbody>
                      </table>
                    </div>
                  </GridItem>
                </GridContainer>
                <div className="right">
              <Button color="rose" onClick={() => this.saveZoneRateList()}>
                Save
              </Button>
              <Button color="secondary" onClick={() => this.cancelUser()}>
                Cancel
              </Button>
            </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </GridContainer>      
//       <GridContainer justify="center" className="schedule-pickup-main-outer">
//         <GridItem xs={12} sm={12}>
//         <Card>
//         <CardHeader className="btn-right-outer" color="primary" icon>
//           <CardIcon color="primary">
//             <Adduser />
//           </CardIcon>
//           <h4 className="margin-right-auto text-color-black">Fetcher Rates</h4>
//         </CardHeader>
//         <CardBody>
//           <div className="shipment-pane mt-20" id="markupdetails">
//             <div className="package-table">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Zone Start</th>
//                     <th>Zone End</th>
//                     <th>Zone</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {this.renderMarkup()}
//                 </tbody>
//               </table>
//             </div>
//             <div className="right">
//               <Button color="rose" onClick={() => this.saveRates()}>
//                 Save
//               </Button>
//               <Button color="secondary" onClick={() => this.cancelUser()}>
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </CardBody>

//       </Card>

// </GridItem>
    







//       </GridContainer>
      
    );
  }
}

export default AddupdateBombino;
