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
    };
  }

  async componentDidMount() {
    var TrackingNumber = this.props.match.params.id;
    this.GetHBLdetails(TrackingNumber);
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
  }

  GetHBLdetails = (input) => {
    try {
      var data = {
        TrackingNumber: input,
      };

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
            // const myArray = [1, 2, 3, 4, 5];
            // // Convert array to a string without a separator
            // const resultWithoutSeparator = Sequencelist.toString();
            // console.log("resultWithoutSeparator", resultWithoutSeparator); // Output: "1,2,3,4,5"
            this.setState({ Sequencelist: Sequencelist });
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

  generatePDF = () => {
    this.showLoader();
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
    document.getElementById("ContainerNumber").style.display = "none";
    document.getElementById("ContainerNumberdiv").style.display = "block";

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

    // Configuration for html2pdf
    const options = {
      margin: 10,
      filename: "converted-document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Use html2pdf to convert HTML to PDF
    html2pdf(element, options).then((pdf) => {
      // Trigger the download of the PDF
      pdf.save();
    });
    this.hideLoader();

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

  selectChange = (event, value) => {
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
      <div style={{ textAlign: "center" }}>
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}
        {this.state.DocumentData.length > 0 ? (
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
                      onChange={(e) => this.selectChange(e, "ShipperExportor")}
                      //onChange={(event) => this.ChangeMailBody(event, "Body")}
                    ></textarea>
                    <div
                      id="ShipperExportordiv"
                      dangerouslySetInnerHTML={{
                        __html: this.state.ShipperExportor,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    />
                    {/* <input
                      style={{ width: "400px" }}
                      value={fromCustomerName}
                      onChange={(e) => this.selectChange(e, "fromCustomerName")}
                    />
                    <br></br>
                    <input
                      style={{ width: "400px" }}
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
                      style={{ width: "50px" }}
                      value={fromState}
                      onChange={(e) => this.selectChange(e, "fromState")}
                    />{" "}
                    <input
                      style={{ width: "60px" }}
                      value={fromZipCode}
                      onChange={(e) => this.selectChange(e, "fromZipCode")}
                    />{" "}
                    <br></br>
                    <input
                      value={fromCountry}
                      onChange={(e) => this.selectChange(e, "fromCountry")}
                    /> */}
                  </td>
                  <td className="t-25">
                    BOOKING NUMBER<br></br>
                    {/* <textarea
                      id="BookingNumber"
                      name="Body"
                      style={{
                        width: "100%",
                        height: "120px",
                        display: "block",
                      }}
                      labelText="Body"
                      //KRUTIU
                      value={BookingNumber}
                      onChange={(e) => this.selectChange(e, "BookingNumber")}
                      //onChange={(event) => this.ChangeMailBody(event, "Body")}
                    ></textarea>
                    <div
                      id="BookingNumberdiv"
                      dangerouslySetInnerHTML={{
                        __html: BookingNumber,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    /> */}
                    <input
                      id="BookingNumber"
                      name="Body"
                      style={{
                        display: "block",
                      }}
                      value={BookingNumber}
                      onChange={(e) => this.selectChange(e, "BookingNumber")}
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
                      id="ContainerNumber"
                      style={{
                        display: "block",
                      }}
                      value={ContainerNumber}
                      onChange={(e) => this.selectChange(e, "ContainerNumber")}
                    />
                    <div
                      id="ContainerNumberdiv"
                      dangerouslySetInnerHTML={{
                        __html: ContainerNumber,
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
                      onChange={(e) => this.selectChange(e, "BLNumber")}
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
                      onChange={(e) => this.selectChange(e, "TrackingNumber")}
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
                      onChange={(e) => this.selectChange(e, "ConsignedTo")}
                      //onChange={(event) => this.ChangeMailBody(event, "Body")}
                    ></textarea>
                    <div
                      id="ConsignedTodiv"
                      dangerouslySetInnerHTML={{
                        __html: this.state.ConsignedTo,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    />
                    {/* <input
                      style={{ width: "400px" }}
                      value={toCustomerName}
                      onChange={(e) => this.selectChange(e, "toCustomerName")}
                    />
                    <br></br>
                    <input
                      style={{ width: "400px" }}
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
                      style={{ width: "70px" }}
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
                    /> */}
                  </td>
                  <td className="t-50">FORWARDING AGENT FMC NO.</td>
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
                      onChange={(e) => this.selectChange(e, "pointState")}
                    ></textarea>
                    {/* <input
                    id="pointState"
                    style={{display:"block"}}
                      value={pointState}
                      onChange={(e) => this.selectChange(e, "pointState")}
                    /> */}
                    <div
                      id="pointStatediv"
                      dangerouslySetInnerHTML={{
                        __html: pointState,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    />
                    {/* Dallas, Texas */}
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
                        //KRUTIU
                        value={this.state.ConsigneeDetails}
                        onChange={(e) =>
                          this.selectChange(e, "ConsigneeDetails")
                        }
                        //onChange={(event) => this.ChangeMailBody(event, "Body")}
                      ></textarea>
                      <div
                        id="border-hidediv"
                        dangerouslySetInnerHTML={{
                          __html: this.state.ConsigneeDetails,
                        }}
                        style={{ display: "none", whiteSpace: "pre-line" }}
                      />
                    </div>
                    {/* SFL Worldwide Logistics Private Limited  */}
                    {/* <input
                      style={{ width: "240px" }}
                      value={company}
                      onChange={(e) => this.selectChange(e, "company")}
                    /> */}
                    {/* <br></br>
                    <input
                      style={{ width: "210px" }}
                      value={Addressline1}
                      onChange={(e) => this.selectChange(e, "Addressline1")}
                    /> */}
                    {/* C 732 733 Siddhi
                    Vinayak Towers */}
                    {/* <br></br> */}
                    {/* Behind DCP Office, Near DAV Intl. School */}
                    {/* <input
                      style={{ width: "270px" }}
                      value={Addressline2}
                      onChange={(e) => this.selectChange(e, "Addressline2")}
                    /> */}
                    {/* <br></br>
                    <input
                      value={STREET}
                      onChange={(e) => this.selectChange(e, "STREET")}
                    /> */}
                    {/* Off S. G. Highway, Makarba */}
                    {/* ,
                    <input
                      style={{ width: "80px" }}
                      value={CITY}
                      onChange={(e) => this.selectChange(e, "CITY")}
                    /> */}
                    {/* Ahmedabad */}
                    {/* ,
                    <input
                      style={{ width: "100px" }}
                      value={COUNTRY}
                      onChange={(e) => this.selectChange(e, "COUNTRY")}
                    /> */}
                    {/* India */}
                    {/* <br></br>
                    <input
                      style={{ width: "110px" }}
                      value={PHONE}
                      onChange={(e) => this.selectChange(e, "PHONE")}
                    /> */}
                    {/* +91 98250 13411  */}
                    {/* -
                    <input
                      value={EMAIL}
                      onChange={(e) => this.selectChange(e, "EMAIL")}
                    /> */}
                    {/* saumins@sflworldwide.com  */}
                    {/* GST :
                    <input
                      value={GST}
                      onChange={(e) => this.selectChange(e, "GST")}
                    /> */}
                    {/* 24AABCN9389H1Z2 */}
                  </td>
                  <td className="t-50">
                    FOR DELIVERY PLEASE APPLY TO <br />
                    <textarea
                      id="APPLYTO"
                      name="Body"
                      style={{ width: "100%", height: "100px" }}
                      labelText="Body"
                      //KRUTIU
                      value={this.state.APPLYTO}
                      onChange={(e) => this.selectChange(e, "APPLYTO")}
                      //onChange={(event) => this.ChangeMailBody(event, "Body")}
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
                      onChange={(e) => this.selectChange(e, "Vessel")}
                    ></textarea>
                    <div
                      id="Vesseldiv"
                      dangerouslySetInnerHTML={{
                        __html: Vessel,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    />
                    {/* <input
                      value={Vessel}
                      onChange={(e) => this.selectChange(e, "Vessel")}
                    />{" "} */}
                    {/* MAERSK SELETAR 343E */}
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
                      onChange={(e) => this.selectChange(e, "Export")}
                    ></textarea>
                    <div
                      id="Exportdiv"
                      dangerouslySetInnerHTML={{
                        __html: Export,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    />
                    {/* <input
                      value={Export}
                      onChange={(e) => this.selectChange(e, "Export")}
                    />{" "} */}
                    {/* Dallas, Texas */}
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
                      onChange={(e) => this.selectChange(e, "TypeOfMove")}
                    ></textarea>
                    <div
                      id="TypeOfMovediv"
                      dangerouslySetInnerHTML={{
                        __html: TypeOfMove,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    />
                    {/* <input
                      value={TypeOfMove}
                      onChange={(e) => this.selectChange(e, "TypeOfMove")}
                    />{" "} */}
                    {/* Console */}
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
                      onChange={(e) => this.selectChange(e, "Unloading")}
                    ></textarea>
                    <div
                      id="Unloadingdiv"
                      dangerouslySetInnerHTML={{
                        __html: Unloading,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    />
                    {/* <input
                      value={Unloading}
                      onChange={(e) => this.selectChange(e, "Unloading")}
                    />{" "} */}
                    {/* Nhava Sheva, India */}
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
                      onChange={(e) => this.selectChange(e, "develiverd")}
                    ></textarea>
                    <div
                      id="develiverddiv"
                      dangerouslySetInnerHTML={{
                        __html: develiverd,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    />
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
                <tr>
                  <th>MARKS AND NUMBER</th>
                  <th>Total No. of PKGS.</th>
                  <th>DESCRIPTION OF PACKAGES AND GOODS</th>
                  <th>GROSS WEIGHT</th>
                  <th>MEASUREMENT</th>
                </tr>
                <tr>
                  {/* <td>{this.state.Sequencelist}</td> */}
                  <td>
                    <textarea
                      id="Sequencelist"
                      name="Body"
                      style={{
                        width: "100%",
                        height: "50px",
                        display: "block",
                      }}
                      labelText="Body"
                      value={this.state.Sequencelist}
                      onChange={(e) => this.selectChange(e, "Sequencelist")}
                    ></textarea>
                    <div
                      id="Sequencelistdiv"
                      dangerouslySetInnerHTML={{
                        __html: this.state.Sequencelist,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    />
                    {/* USED HOUSE HOLD GOODS AND PERSONAL EFFECTS */}
                  </td>
                  <td>
                    <textarea
                      id="PackageNumber"
                      name="Body"
                      style={{
                        width: "100%",
                        height: "50px",
                        display: "block",
                      }}
                      labelText="Body"
                      value={PackageNumber}
                      onChange={(e) => this.selectChange(e, "PackageNumber")}
                    ></textarea>
                    <div
                      id="PackageNumberdiv"
                      dangerouslySetInnerHTML={{
                        __html: PackageNumber,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    />
                    {/* {this.state.PackageData[0].totalPackage} */}
                  </td>
                  <td>
                    <textarea
                      id="description"
                      name="Body"
                      style={{
                        width: "100%",
                        height: "50px",
                        display: "block",
                      }}
                      labelText="Body"
                      value={description}
                      onChange={(e) => this.selectChange(e, "description")}
                    ></textarea>
                    <div
                      id="descriptiondiv"
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    />
                    {/* USED HOUSE HOLD GOODS AND PERSONAL EFFECTS */}
                  </td>
                  <td>
                    <textarea
                      id="WEIGHT"
                      name="Body"
                      style={{
                        width: "100%",
                        height: "50px",
                        display: "block",
                      }}
                      labelText="Body"
                      value={WEIGHT}
                      onChange={(e) => this.selectChange(e, "WEIGHT")}
                    ></textarea>
                    <div
                      id="WEIGHTdiv"
                      dangerouslySetInnerHTML={{
                        __html: WEIGHT,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    />
                    {/* {this.state.PackageData[0].totalWeight} Kgs */}
                  </td>
                  <td>
                    <textarea
                      id="MEASUREMENT"
                      name="Body"
                      style={{
                        width: "100%",
                        height: "50px",
                        display: "block",
                      }}
                      labelText="Body"
                      value={MEASUREMENT}
                      onChange={(e) => this.selectChange(e, "MEASUREMENT")}
                    ></textarea>
                    <div
                      id="MEASUREMENTdiv"
                      dangerouslySetInnerHTML={{
                        __html: MEASUREMENT,
                      }}
                      style={{ display: "none", whiteSpace: "pre-line" }}
                    />
                    {/* {this.state.PackageData[0].totalCFT} CBM */}
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
        ) : (
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
