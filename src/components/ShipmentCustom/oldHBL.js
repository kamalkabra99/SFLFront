import React from "react";
import moment from "moment";
import { CommonConfig } from "../../utils/constant";
import cogoToast from "cogo-toast";
import api from "../../utils/apiClient";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import { addSyntheticLeadingComment } from "typescript";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import stamp from "../../assets/img/HBL/stamp.png";
import pshah from "../../assets/img/HBL/pshah.png";
// import { createDoc } from "html-docx-js";
//import * as htmlDocx from "html-docx-js";
//import { Document, Packer, Paragraph } from "docx";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class HBL extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    };
  }

  async componentDidMount() {
    var TrackingNumber = this.props.match.params.id;
    this.GetHBLdetails(TrackingNumber);
  }

  GetHBLdetails = (input) => {
    try {
      var data = {
        TrackingNumber: input,
      };
      debugger;
      api
        .post("scheduleshipment/GetHBLdetails", data)
        .then(async (res) => {
          debugger;
          if (res.success) {
            if (res.data) {
              this.setState({
                DocumentData: res.data[0],
                PackageData: res.data[1],
                SequenceData: res.data[2],
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
              TrackingNumber: this.state.DocumentData[0].TrackingNumber,
              ShippingID: this.state.DocumentData[0].ShippingID,
              ContainerNumber: this.state.DocumentData[0].ContainerNumber,
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
            console.log("lead...", this.state.BookingNumber);
            console.log("lead...", this.state.DocumentData);
          } else {
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
  rendertable = () => {
    return this.state.SequenceData.map((service, idx) => {
      const { Range_Data } = service;
      return <tr>{Range_Data}</tr>;
    });
  };
  generatePDF = () => {
    debugger;
    var input = document.getElementById("HBL");
    html2canvas(input).then((canvas) => {
      var options = {
        compressPdf: true,
      };
      var pdf = new jsPDF(options);
      var imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "JPEG", 0, 0);
      var doc = btoa(pdf.output());

      const pdfFile = new File(
        [pdf.output("blob")],
        this.state.BLNumber + ".pdf",
        { type: "application/pdf" }
      );

      let data = {
        dateTime: new Date().getTime(),
        ShippingID: this.state.ShippingID,
        BLNumber: this.state.BLNumber,
        // pdfFile: pdfFile,
      };
      var formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("Attachments", pdfFile);

      api
        .post("scheduleshipment/downloadHBLpdf", formData)
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

      //  pdf.save(this.state.BLNumber + ".pdf");
    });
  };

  selectChange = (event, value) => {
    if (value === "BookingNumber") {
      this.setState({ BookingNumber: event.target.value });
    } else if (value === "ContainerNumber") {
      this.setState({ ContainerNumber: event.target.value });
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
      this.setState({ fromAddress: event.target.value });
    } else if (value === "Export") {
      this.setState({ fromAddress: event.target.value });
    } else if (value === "Unloading") {
      this.setState({ fromAddress: event.target.value });
    } else if (value === "develiverd") {
      this.setState({ fromAddress: event.target.value });
    } else if (value === "TypeOfMove") {
      this.setState({ fromAddress: event.target.value });
    } else if (value === "FMCnumber") {
      this.setState({ fromAddress: event.target.value });
    } else if (value === "pointState") {
      this.setState({ fromAddress: event.target.value });
    } else if (value === "deliveryApply") {
      this.setState({ fromAddress: event.target.value });
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
    }
  };
  render() {
    const {
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
      <div style={{ textAlign: "center" }}>
        {this.state.DocumentData.length > 0 ? (
          <div className="hbl-outer" id="HBL">
            <table className="hbl-table">
              <tr>
                <th className="text-left t-50">
                  SFL WORLDWIDE LLC<br></br>
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
                  <input
                    value={fromCustomerName}
                    onChange={(e) => this.selectChange(e, "fromCustomerName")}
                  />
                  <br></br>
                  <input
                    value={fromAddress}
                    onChange={(e) => this.selectChange(e, "fromAddress")}
                  />
                  <br></br>
                  <input
                    value={fromCity}
                    onChange={(e) => this.selectChange(e, "fromCity")}
                  />
                  , <br></br>
                  <input
                    value={fromState}
                    onChange={(e) => this.selectChange(e, "fromState")}
                  />{" "}
                  <input
                    value={fromZipCode}
                    onChange={(e) => this.selectChange(e, "fromZipCode")}
                  />{" "}
                  <br></br>
                  <input
                    value={fromCountry}
                    onChange={(e) => this.selectChange(e, "fromCountry")}
                  />
                </td>
                <td className="t-25">
                  BOOKING NUMBER<br></br>
                  <input
                    value={BookingNumber}
                    onChange={(e) => this.selectChange(e, "BookingNumber")}
                  />
                </td>
                <td className="t-25">
                  CONTAINER NUMBER<br></br>
                  <input
                    value={ContainerNumber}
                    onChange={(e) => this.selectChange(e, "ContainerNumber")}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="t-50">
                  BILL OF LANDING NUMBER<br></br>
                  <input
                    value={BLNumber}
                    onChange={(e) => this.selectChange(e, "BLNumber")}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="t-50">
                  EXPORT REFERENCES<br></br>
                  <input
                    value={TrackingNumber}
                    onChange={(e) => this.selectChange(e, "TrackingNumber")}
                  />
                </td>
              </tr>
            </table>
            <table className="hbl-table">
              <tr>
                <td rowSpan={2} className="t-50">
                  CONSIGNED TO<br></br>
                  <input
                    value={toCustomerName}
                    onChange={(e) => this.selectChange(e, "toCustomerName")}
                  />
                  <br></br>
                  <input
                    value={toAddress}
                    onChange={(e) => this.selectChange(e, "toAddress")}
                  />{" "}
                  <br></br>
                  <input
                    value={toCity}
                    onChange={(e) => this.selectChange(e, "toCity")}
                  />
                  <br></br>
                  <input
                    value={toState}
                    onChange={(e) => this.selectChange(e, "toState")}
                  />{" "}
                  <input
                    value={toZipCode}
                    onChange={(e) => this.selectChange(e, "toZipCode")}
                  />
                  <br></br>
                  <input
                    value={toCountry}
                    onChange={(e) => this.selectChange(e, "toCountry")}
                  />
                </td>
                <td className="t-50">FORWARDING AGENT FMC NO.</td>
              </tr>
              <tr>
                <td colSpan={2} className="t-50">
                  POINT (STATE) OF ORIGIN OR FTZ NUMBER<br></br>
                  <input
                    value={pointState}
                    onChange={(e) => this.selectChange(e, "pointState")}
                  />
                  {/* Dallas, Texas */}
                </td>
              </tr>
              <tr>
                <td className="t-50">
                  NOTIFY PARTY/INTERMEDIATE CONSIGNEE<br></br>
                  {/* SFL Worldwide Logistics Private Limited  */}
                  <input
                    value={company}
                    onChange={(e) => this.selectChange(e, "company")}
                  />
                  <br></br>
                  <input
                    value={Addressline1}
                    onChange={(e) => this.selectChange(e, "Addressline1")}
                  />
                  {/* C 732 733 Siddhi
                  Vinayak Towers */}
                  <br></br>
                  {/* Behind DCP Office, Near DAV Intl. School */}
                  <input
                    value={Addressline2}
                    onChange={(e) => this.selectChange(e, "Addressline2")}
                  />
                  <br></br>
                  <input
                    value={STREET}
                    onChange={(e) => this.selectChange(e, "STREET")}
                  />
                  {/* Off S. G. Highway, Makarba */}
                  ,
                  <input
                    value={CITY}
                    onChange={(e) => this.selectChange(e, "CITY")}
                  />
                  {/* Ahmedabad */}
                  ,
                  <input
                    value={COUNTRY}
                    onChange={(e) => this.selectChange(e, "COUNTRY")}
                  />
                  {/* India */}
                  <br></br>
                  <input
                    value={PHONE}
                    onChange={(e) => this.selectChange(e, "PHONE")}
                  />
                  {/* +91 98250 13411  */}
                  -
                  <input
                    value={EMAIL}
                    onChange={(e) => this.selectChange(e, "EMAIL")}
                  />
                  {/* saumins@sflworldwide.com  */}
                  GST :
                  <input
                    value={GST}
                    onChange={(e) => this.selectChange(e, "GST")}
                  />
                  {/* 24AABCN9389H1Z2 */}
                </td>
                <td className="t-50">FOR DELIVERY PLEASE APPLY TO</td>
              </tr>
            </table>
            <table className="hbl-table">
              <tr>
                <td className="t-25">
                  VESSEL<br></br>
                  <input
                    value={this.state.Vessel}
                    onChange={(e) => this.selectChange(e, "Vessel")}
                  />{" "}
                  {/* MAERSK SELETAR 343E */}
                </td>
                <td className="t-25">
                  PORT OF LOADING/EXPORT<br></br>
                  <input
                    value={this.state.Export}
                    onChange={(e) => this.selectChange(e, "Export")}
                  />{" "}
                  {/* Dallas, Texas */}
                </td>
                <td className="t-50">
                  TYPE OF MOVE<br></br>
                  <input
                    value={this.state.TypeOfMove}
                    onChange={(e) => this.selectChange(e, "TypeOfMove")}
                  />{" "}
                  {/* Console */}
                </td>
              </tr>
              <tr>
                <td className="t-25">
                  FOREIGN PORT OF UNLOADING<br></br>
                  <input
                    value={this.state.Unloading}
                    onChange={(e) => this.selectChange(e, "Unloading")}
                  />{" "}
                  {/* Nhava Sheva, India */}
                </td>
                <td className="t-25">
                  PLACE OF DELIVERY BY ON-CARRIER<br></br>
                  <input
                    value={this.state.develiverd}
                    onChange={(e) => this.selectChange(e, "develiverd")}
                  />{" "}
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
              <tr>
                <th>MARKS AND NUMBER</th>
                <th>Total No. of PKGS.</th>
                <th>DESCRIPTION OF PACKAGES AND GOODS</th>
                <th>GROSS WEIGHT</th>
                <th>MEASUREMENT</th>
              </tr>
              <tr>
                <td>{this.rendertable()}</td>
                <td>{this.state.PackageData[0].totalPackage}</td>
                <td>USED HOUSE HOLD GOODS AND PERSONAL EFFECTS</td>
                <td>{this.state.PackageData[0].totalWeight} Kgs</td>
                <td>{this.state.PackageData[0].totalCFT} CBM</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Kgs</td>
                <td>CBM</td>
              </tr>
              {/* <tr>
                <td>376 to 398</td>
                <td>97</td>
                <td>USED HOUSE HOLD GOODS AND PERSONAL EFFECTS</td>
                <td>1554.89 Kgs</td>
                <td>15.294CBM</td>
              </tr> */}
            </table>
            <table className="hbl-table">
              <tr>
                <td colSpan={2}>
                  DECLARED VALUE (FOR AD VALOREM PURPOSE ONLY). (REFER TO CLAUSE
                  26 ON REVERSE HEREOFF) IN US$
                </td>
              </tr>
              <tr>
                <td className="t-50">
                  In accepting this bill of lading, any local customs or
                  privileges to the contrary notwithstanding, the shipper,
                  consignee and owner of the goods and the holder of this bill
                  of lading, agree to be bound by all the stipulations,
                  exceptions and conditions stated herein whether written,
                  printed, stamped or incorporated on the front or reverse side
                  hereof as fully as if they were all signed by such shipper,
                  consignee, owner or holder<br></br>
                  In witness whereof three (3) bills of lading, all of the tenor
                  and date have been signed, one of which being accomplished,
                  the others to stand void.
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
        ) : (
          // <div id="invoiceTable">
          //   <h3>
          //     booking number:{" "}
          //     <input
          //       value={BookingNumber}
          //       onChange={(e) => this.selectChange(e, "BookingNumber")}
          //     />
          //   </h3>
          //   <h3>
          //     container number:{" "}
          //     <input
          //       value={ContainerNumber}
          //       onChange={(e) => this.selectChange(e, "ContainerNumber")}
          //     />
          //   </h3>
          //   <h3>
          //     export reference number:{" "}
          //     <input
          //       value={TrackingNumber}
          //       onChange={(e) => this.selectChange(e, "TrackingNumber")}
          //     />
          //   </h3>
          //   <h3>
          //     bill of leading number:{" "}
          //     <input
          //       value={BLNumber}
          //       onChange={(e) => this.selectChange(e, "BLNumber")}
          //     />
          //   </h3>
          //   <h2>
          //     <b> SHIPPER/EXPORTER COMPLETE NAME AND ADDRESS</b>
          //   </h2>
          //   <h3>
          //     customer name:{" "}
          //     <input
          //       value={fromCustomerName}
          //       onChange={(e) => this.selectChange(e, "fromCustomerName")}
          //     />
          //   </h3>
          //   <h3>
          //     Address:
          //     <input
          //       value={fromAddress}
          //       onChange={(e) => this.selectChange(e, "fromAddress")}
          //     />
          //     <input
          //       value={fromCity}
          //       onChange={(e) => this.selectChange(e, "fromCity")}
          //     />
          //     ,{" "}
          //     <input
          //       value={fromState}
          //       onChange={(e) => this.selectChange(e, "fromState")}
          //     />
          //     ,<br />
          //     <input
          //       value={fromZipCode}
          //       onChange={(e) => this.selectChange(e, "fromZipCode")}
          //     />
          //     -{" "}
          //     <input
          //       value={fromCountry}
          //       onChange={(e) => this.selectChange(e, "fromCountry")}
          //     />
          //   </h3>

          //   <h2>
          //     <b> CONSIGNED TO</b>
          //   </h2>
          //   <h3>
          //     {" "}
          //     <input
          //       value={toCustomerName}
          //       onChange={(e) => this.selectChange(e, "toCustomerName")}
          //     />
          //   </h3>
          //   <h3>
          //     Address:
          //     <input
          //       value={toAddress}
          //       onChange={(e) => this.selectChange(e, "toAddress")}
          //     />
          //     <input
          //       value={toCity}
          //       onChange={(e) => this.selectChange(e, "toCity")}
          //     />
          //     ,
          //     <input
          //       value={toState}
          //       onChange={(e) => this.selectChange(e, "toState")}
          //     />
          //     ,<br />
          //     <input
          //       value={toZipCode}
          //       onChange={(e) => this.selectChange(e, "toZipCode")}
          //     />
          //     -
          //     <input
          //       value={toCountry}
          //       onChange={(e) => this.selectChange(e, "toCountry")}
          //     />
          //   </h3>
          //   <div>
          //     <table width="100%" cellpadding="0" cellspacing="0" border="0">
          //       <th>
          //         <tr>MARKS AND NUMBER</tr>
          //         {this.rendertable()}
          //       </th>
          //       <th>
          //         <tr>Total No. of PKGS.</tr>
          //         <tr>{this.state.PackageData[0].totalPackage}</tr>
          //       </th>
          //       <th>
          //         <tr>DESCRIPTION OF PACKAGES AND GOODS</tr>
          //         <tr>USED HOUSE HOLD GOODS AND PERSONAL EFFECTS</tr>
          //       </th>
          //       <th>
          //         <tr>GROSS WEIGHT</tr>
          //         <tr>{this.state.PackageData[0].totalWeight} </tr>
          //         <tr>Kgs</tr>
          //       </th>
          //       <th>
          //         <tr>MEASUREMENT</tr>
          //         <tr>{this.state.PackageData[0].totalCFT} </tr>
          //         <tr>CBM</tr>
          //       </th>
          //     </table>
          //   </div>
          //   <button onClick={() => this.generatePDF()}> Export in PDF</button>
          //   <button onClick={() => this.generateWord()}> Export in Word</button>
          // </div>
          <div>This document is no longer avaliable</div>
        )}
        <div>
          {" "}
          <button onClick={() => this.generatePDF()}> Export in PDF</button>
        </div>
      </div>
    );
  }
}

export default HBL;
