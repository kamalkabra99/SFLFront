import React from "react";
import moment from "moment";
import { CommonConfig } from "../../utils/constant";
import cogoToast from "cogo-toast";
import api from "../../utils/apiClient";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
// import { saveAs } from "file-saver";
import stamp from "../../assets/img/HBL/stamp.png";
import pshah from "../../assets/img/HBL/pshah.png";
import SimpleBackdrop from "../../utils/general";
import html2pdf from "html2pdf.js";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class HBL extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Loading: false,
      TrackingNumber: "",
      DocumentData: [],
      SequenceData: [],
      PackageData: [],
      fromZipCode: "",
      fromState: "",
      fromCity: "",

      fromAddress3: "",
      fromAddress2: "",
      fromAddress1: "",

      fromCustomerName: "",

      TrackingNumber: "",
      ContainerNumber: "",
      BookingNumber: "",
      BLNumber: "",
      ShippingID: "",
      fromAddress: "",
      fromCity: "",
      fromState: "",
      fromZipCode: "",
      fromCountry: "",

      toCountry: "",
      toCity: "",
      toState: "",
      toZipCode: "",
      toCustomerName: "",
      toAddress: "",
      CreatedDate: moment().format(CommonConfig.dateFormat.dateOnly),

      Vessel: "MAERSK SELETAR 343E",
      Export: "Dallas, Texas",
      Unloading: "Nhava Sheva, India",
      develiverd: "Nhava Sheva, India",
      TypeOfMove: "Console",
      FMCnumber: "Dallas, Texas",
      pointState: "Dallas, Texas",
      deliveryApply: "",

      GST: "24AABCN9389H1Z2",
      EMAIL: "saumins@sflworldwide.com",
      PHONE: "+91 98250 13411",
      COUNTRY: "India",
      CITY: "Ahmedabad",
      STREET: "Off S. G. Highway, Makarba",
      Addressline1: "C 732 733 Siddhi Vinayak Towers",
      Addressline2: "Behind DCP Office, Near DAV Intl. School",
      company: "SFL Worldwide Logistics Private Limited",

      ConsigneeDetails: "",
      ConsignedTo: "",
      ShipperExportor: "",
      APPLYTO: "",

      description: " USED HOUSE HOLD GOODS AND PERSONAL EFFECTS ",
      PackageNumber: "",
      WEIGHT: "",
      MEASUREMENT: "",
      Sequencelist: [],
      pBookingNumber: "",
      pContainerNumber : "",
      pVesselNumber: "",
      pPlaceOfDeliveryByOnCarrier: "",
      pPortOfUnloading: "",
      pPortOfLoading : "",
      pPointOfOrigin: "",
      pBOLNumber: "",
      pNotifyParty:"",
      TrackNO:"",
      pFromAdd:"",
      pFromCity:"",
      fromContact:"",
      TOAddress:"",
      TOCitys:"",
      TOContact:"",
      dataHtml:"",
    };
  }

  async componentDidMount() {

    var shipId = parseInt(this.props.match.params.shipId);
    var contId = parseInt(this.props.match.params.contId);

    this.state.pContainerNumber = localStorage.getItem("ContainerNumber")
    this.state.pBookingNumber = localStorage.getItem("BookingNumber")
    document.getElementById("pBookingNumber").innerHTML = this.state.pBookingNumber
    document.getElementById("containerNO").innerHTML = this.state.pContainerNumber
    this.state.pBOLNumber = localStorage.getItem("BOLNumber")
    document.getElementById("pBOLNumber").innerHTML = this.state.pBOLNumber
    this.state.pPointOfOrigin = localStorage.getItem("PointOfOrigin")
    document.getElementById("pPointOfOrigin").innerHTML = this.state.pPointOfOrigin
    this.state.pPortOfLoading = localStorage.getItem("PortOfLoading")
    document.getElementById("pPortOfLoading").innerHTML = this.state.pPortOfLoading
    this.state.pPortOfUnloading = localStorage.getItem("PortOfUnloading")
    document.getElementById("pPortOfUnloading").innerHTML = this.state.pPortOfUnloading
    this.state.pPlaceOfDeliveryByOnCarrier = localStorage.getItem("PlaceOfDeliveryByOnCarrier")
    document.getElementById("pPlaceOfDeliveryByOnCarrier").innerHTML = this.state.pPlaceOfDeliveryByOnCarrier
    this.state.pVesselNumber = localStorage.getItem("VesselNumber")
    document.getElementById("pVesselNumber").innerHTML = this.state.pVesselNumber

    this.state.pNotifyParty = localStorage.getItem("NotifyParty")
    document.getElementById("pNotifyParty").innerHTML = this.state.pNotifyParty

    this.state.TrackNO = localStorage.getItem("TrackNO")
    document.getElementById("TrackNO").innerHTML = this.state.TrackNO

    this.state.pFromAdd = localStorage.getItem("FromAddress")
    document.getElementById("FromAddress").innerHTML = this.state.pFromAdd

    this.state.pFromCity = localStorage.getItem("fromCitys")
    document.getElementById("fromCitys").innerHTML = this.state.pFromCity

    
    this.state.fromContact = localStorage.getItem("fromContact")
    document.getElementById("fromContact").innerHTML = this.state.fromContact


    this.state.TOAddress = localStorage.getItem("TOAddress")
    document.getElementById("TOAddress").innerHTML = this.state.TOAddress

    this.state.TOCitys = localStorage.getItem("TOCitys")
    document.getElementById("TOCitys").innerHTML = this.state.TOCitys

    this.state.TOContact = localStorage.getItem("TOContact")
    document.getElementById("TOContact").innerHTML = this.state.TOContact

    this.state.dataHtml = localStorage.getItem("dataHtml")
    document.getElementById("dataHtml").innerHTML = this.state.dataHtml
    
    // var customerName = this.props.match.params.name;
    console.log("ship = " , this.state.pVesselNumber , " | cony = ", contId)
    // this.getData(shipId,contId)
    
  }

 

 
  showLoader() {
    this.setState({ Loading: true });
  }

  hideLoader() {
    this.setState({ Loading: false });
  }

  rendertable = () => {
    return this.state.SequenceData.map((service, idx) => {
      const { Range_Data } = service;
      return Range_Data;
    });
  };

  render() {
    const {
      PackageNumber,
      description,
      WEIGHT,
      MEASUREMENT,
      BookingNumber,
      fromCustomerName,
      TrackingNumber,
      ContainerNumber,
      BLNumber,
      fromAddress,
      fromCity,
      fromState,
      fromZipCode,
      fromCountry,
      toCountry,
      toCustomerName,
      toCity,
      toState,
      toZipCode,
      toAddress,
      CreatedDate,

      Vessel,
      Export,
      Unloading,
      develiverd,
      TypeOfMove,
      FMCnumber,
      pointState,
      deliveryApply,

      GST,
      EMAIL,
      PHONE,
      COUNTRY,
      CITY,
      STREET,
      Addressline1,
      Addressline2,
      company,
    } = this.state;
    return (
      <div className="" style={{ textAlign: "center" }}>
        
        
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
                      <label id = "fromContact"></label><br></br>
                      <label id = "FromAddress"></label><br></br>
                      <label id = "fromCitys"></label>
                    
                  </td>
                  <td className="t-25">
                    BOOKING NUMBER<br></br>
                    <label id = "pBookingNumber">{this.state.pBookingNumber}</label>
                  </td>
                  <td className="t-25">
                    CONTAINER NUMBER<br></br>
                    <label id = "containerNO">{this.state.pContainerNumber ? this.state.pContainerNumber: "" }</label>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="t-50">
                    BILL OF LANDING NUMBER<br></br>
                    <label id = "pBOLNumber">{this.state.pBOLNumber}</label>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="t-50">
                    EXPORT REFERENCES<br></br>
                    <label id = "TrackNO"></label>
                  </td>
                </tr>
              </table>
              <table className="hbl-table">
                <tr>
                  <td rowSpan={2} className="t-50">
                    CONSIGNED TO<br></br>
                    <label id = "TOContact"></label><br></br>
                      <label id = "TOAddress"></label><br></br>
                      <label id = "TOCitys"></label>
                    
                  </td>
                  <td className="t-50">FORWARDING AGENT FMC NO.</td>
                </tr>
                <tr>
                  <td colSpan={2} className="t-50">
                    POINT (STATE) OF ORIGIN OR FTZ NUMBER<br></br>
                    <label id = "pPointOfOrigin">{this.state.pPointOfOrigin}</label>
                    {/* Dallas, Texas */}
                  </td>
                </tr>
                <tr>
                  <td className="t-50">
                    NOTIFY PARTY/INTERMEDIATE CONSIGNEE<br></br>
                    <div className="hbl-textarea">
                      <label id = "pNotifyParty"></label>
                    </div>
                    
                  </td>
                  <td className="t-50">
                    FOR DELIVERY PLEASE APPLY TO <br />
                    <label></label>
                  </td>
                </tr>
              </table>
              <table className="hbl-table">
                <tr>
                  <td className="t-25">
                    VESSEL<br></br>
                    <label id = "pVesselNumber">{this.state.pVesselNumber}</label>
                    {/* <input
                      value={Vessel}
                      onChange={(e) => this.selectChange(e, "Vessel")}
                    />{" "} */}
                    {/* MAERSK SELETAR 343E */}
                  </td>
                  <td className="t-25">
                    PORT OF LOADING/EXPORT<br></br>
                    <label id = "pPortOfLoading">{this.state.pPortOfLoading}</label>
                  </td>
                  <td className="t-50">
                    TYPE OF MOVE<br></br>
                    <label>Console</label>
                  </td>
                </tr>
                <tr>
                  <td className="t-25">
                    FOREIGN PORT OF UNLOADING<br></br>
                    <label id = "pPortOfUnloading">{this.state.pPortOfUnloading}</label>
                    {/* <input
                      value={Unloading}
                      onChange={(e) => this.selectChange(e, "Unloading")}
                    />{" "} */}
                    {/* Nhava Sheva, India */}
                  </td>
                  <td className="t-25">
                    PLACE OF DELIVERY BY ON-CARRIER<br></br>
                    <label id = "pPlaceOfDeliveryByOnCarrier">{this.state.pPlaceOfDeliveryByOnCarrier}</label>
                    {/* <input
                      value={develiverd}
                      onChange={(e) => this.selectChange(e, "develiverd")}
                    />{" "} */}
                    {/* Nhava Sheva, India */}
                  </td>
                  <td className="t-50"></td>
                </tr>
                <tr>
                  <td className="t-50" colSpan={2}>
                    CARRIER'S RECEIPT
                  </td>
                  <td className="t-50">PARTICULARS FURNISHED BY SHIPPER</td>
                </tr>
              </table>
              <table className="hbl-table">
                <thead>
                  <tr>
                    <th>MARKS AND NUMBER</th>
                    <th>Total No. of PKGS.</th>
                    <th>DESCRIPTION OF PACKAGES AND GOODS</th>
                    <th>GROSS WEIGHT</th>
                    <th>MEASUREMENT</th>
                  </tr>
                </thead>
                <tbody id = "dataHtml">

               

                  {/* <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Kgs</td>
                    <td>CBM</td>
                  </tr> */}

                </tbody>
                
              </table>
              <table className="hbl-table">
                <tr>
                  <td colSpan={2}>
                    DECLARED VALUE (FOR AD VALOREM PURPOSE ONLY). (REFER TO
                    CLAUSE 26 ON REVERSE HEREOFF) IN US$
                  </td>
                </tr>
                <tr>
                  <td className="t-50">
                    In accepting this bill of lading, any local customs or
                    privileges to the contrary notwithstanding, the shipper,
                    consignee and owner of the goods and the holder of this bill
                    of lading, agree to be bound by all the stipulations,
                    exceptions and conditions stated herein whether written,
                    printed, stamped or incorporated on the front or reverse
                    side hereof as fully as if they were all signed by such
                    shipper, consignee, owner or holder<br></br>
                    In witness whereof three (3) bills of lading, all of the
                    tenor and date have been signed, one of which being
                    accomplished, the others to stand void.
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
                    {this.state.CreatedDate}
                  </td>
                  <td className="t-50">TOTAL COLLECT</td>
                </tr>
              </table>
            </div>
          </div>
        
        
      </div>
    );
  }
}

export default HBL;
