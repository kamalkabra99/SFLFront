import React from "react";
// core components
import moment from "moment";
import { CommonConfig } from "../../utils/constant";
import cogoToast from "cogo-toast";
import api from "../../utils/apiClient";
import SignatureCanvas from "react-signature-canvas";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import bullet from "../../assets/img/Bullet.jpg";
import dimensionimg from "../../assets/img/DWeightFormula.jpg";
import cubicimg from "../../assets/img/CFTFormula.jpg";
import publicIp from "public-ip";
const useStyles = () => makeStyles(styles);
const classes = useStyles();

class Proposal_client extends React.Component {
  constructor(props) {
    super(props);
    this.sigPad = {};
    this.state = {
      salesleadData: [],
      ProposalData: [],
      TermsList: [],
      TermsListInclude: [],
      TermsListExclude: [],
      MinimumPackingCharges: "0. CFT",
      MinimumPickupCharges: "0.00 ",
      AdditionalCFTcharges: 0,
      PackingCharges: "",
      PickupCharges: "",
      Comments: "",
      THCchargesPerCFT: "",
      ProposalCreatedDate: "",
      hideIntital: "",
      sequenceCount: 1,
      message: "",
    };
  }

  async componentDidMount() {
    console.log("testtttt", this.props.match.params.id);

    this.setState({
      hideIntital: this.props.match.params.next,
    });
    debugger;
    console.log("testtttt", this.state.hideIntital);
    if (this.props.match.params.next === "true") {
      await this.checkProposalId();
    }
    await this.getSalesLeadData();
    await this.getPropsalData();
  }

  async checkProposalId() {
    this.showLoader();
    try {
      var location_data = {};
      navigator.geolocation.getCurrentPosition(function(position) {
        location_data = position;
      });
      debugger;
      var data = {
        salesleadID: this.props.match.params.id,
        ProposalID: this.props.match.params.uuid,
        publicIpv4: await publicIp.v4(),
        lat: location_data.latitude,
        lng: location_data.longitude,
        Time: "15:38 pm",
      };
      api
        .post("salesLead/CheckProposalLog", data)
        .then(async (res) => {
          console.log("ress", res);
          // if (res.success) {
          //   // this.setState({
          //   //   ManagedByEmail: res.data.Email,
          //   //   SignedOnDate: res.data.SignedOn,
          //   //   ExpiredOnDate: res.data.ExpiredOn,
          //   //   ManagedByName: res.data.ManagedByName,
          //   //   InsuranceWaiver: res.data.InsuranceWaiver,
          //   // });
          // } else {
          this.hideLoader();
          //   this.setState({ ShowContra: false });
          //   cogoToast.error("Expired");
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getSalesLeadData() {
    try {
      var data = {
        SalesLeadManagementID: this.props.match.params.id,
      };
      api
        .post("salesLead/getSalesLeadDetailsById", data)
        .then(async (res) => {
          debugger;
          if (res.data.success) {
            if (res.data) {
              this.setState({ salesleadData: res.data.data });
            }
            console.log("lead...", this.state.salesleadData);
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
  }
  async getPropsalData() {
    try {
      var data = {
        ProposalID: this.props.match.params.uuid,
      };
      api
        .post("salesLead/getProposalDetailsById", data)
        .then(async (res) => {
          if (res.success) {
            debugger;
            if (res.data) {
              this.setState({
                TermsList: res.data[0],
                ProposalData: res.data[1],
              });
              if (res.data[1].length === 0) {
                this.setState({ message: "no longer avalible" });
              }
              this.state.ProposalCreatedDate = moment(
                this.state.ProposalData[0].CreatedOn
              ).format(CommonConfig.dateFormat.dateOnly);
              console.log("propppp", this.state.ProposalData);
              debugger;
              this.state.MinimumPackingCharges = this.state.ProposalData[0].MinimumPackingCharges.slice(
                0,
                1
              );
              this.state.PackingCharges = this.state.ProposalData[0].PackingCharges.slice(
                0,
                1
              );
              this.state.MinimumPickupCharges = this.state.ProposalData[0].MinimumPickupCharges.slice(
                0,
                1
              );
              this.state.PickupCharges = this.state.ProposalData[0].PickupCharges.slice(
                0,
                1
              );
              this.state.THCchargesPerCFT = this.state.ProposalData[0].THCchargesPerCFT.slice(
                0,
                1
              );
              this.state.AdditionalCFTcharges = this.state.ProposalData[0].AdditionalCFTcharges;
              debugger;
              console.log("propppp", this.state.ProposalData[0].Comments);
              debugger;
              this.state.Comments = this.state.ProposalData[0].Comments;

              this.state.TermsListInclude = [];
              this.state.TermsListExclude = [];

              this.state.TermsList.filter((x) => x.Action === "Include").map(
                (packages, idx) => {
                  this.state.TermsListInclude.push(packages);
                }
              );
              this.state.TermsList.filter((x) => x.Action === "Exclude").map(
                (packages, idx) => {
                  this.state.TermsListExclude.push(packages);
                }
              );
              console.log("TermsListExclude...", this.state.TermsListExclude);
              console.log("TermsListInclude...", this.state.TermsListInclude);
            }
          } else {
            cogoToast.error("Somthing went wrong");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }
  Calculate = () => {
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
      this.setState({
        PackageList: PackageList,
        totalChargableWeight: TotalChargable,
        totalCFT: parseFloat(TotalCFT).toFixed(2),
        totalInsuredValue: TotalInsuredvalue,
      });
    }
  };
  viewincludeterms = () => {
    //kruti
    return this.state.TermsListInclude.map((packages, idx) => {
      return (
        <tr>
          <td
            width="5%"
            align="Center"
            valign="top"
            style={{
              lineHeight: "20px",
            }}
            height="20"
          >
            <img src={bullet} />
          </td>
          <td
            width="95%"
            className="info"
            align="Left"
            valign="Middle"
            style={{ lineHeight: "20px" }}
            height="20"
          >
            {packages.Terms}
          </td>
        </tr>
      );
    });
  };
  viewexcludeTerms = () => {
    return this.state.TermsListExclude.map((packages, idx) => {
      return (
        <tr>
          <td
            width="5%"
            align="Center"
            valign="top"
            style={{
              lineHeight: "20px",
            }}
            height="20"
          >
            <img src={bullet} />
          </td>
          <td
            width="95%"
            className="info"
            align="Left"
            valign="Center"
            style={{ lineHeight: "20px" }}
            height="20"
          >
            {packages.Terms}
          </td>
        </tr>
      );
    });
  };
  showLoader() {
    this.setState({ Loading: true });
  }

  hideLoader() {
    this.setState({ Loading: false });
  }
  render() {
    const { ProposalData, Comments } = this.state;
    var number = 1;
    if (this.state.message === "") {
      return (
        <div className="proposal-table-page">
          <div className="contract-table-outer">
            <div className="contaract-table-page">
              <table
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                bgcolor="#FFFFFF"
                align="center"
                valign="top"
              >
                <tbody>
                  <tr>
                    <td width="100%" align="center">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              width="20%"
                              align="left"
                              style={{ paddingLeft: "5px" }}
                              valign="center"
                            >
                              <img
                                border="0"
                                src="https://www.sflworldwide.com/wp-content/uploads/2019/05/logo.png"
                              />
                            </td>
                            <td width="80%" height="100%" align="Right">
                              <table
                                width="100%"
                                cellspacing="2"
                                cellpadding="2"
                                border="0"
                                height="100%"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="100%"
                                      className="info"
                                      align="right"
                                      valign="middle"
                                      style={{ fontsize: " 11px" }}
                                    >
                                      P: 972-255-7447<br></br>
                                      E: contact@SFLWorldwide.com<br></br>
                                      FMC Licence No.: 025184<br></br>
                                      Negotiated Rate Arrangments
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="1"
                        style={{
                          borderCollapse: "seperate",
                          borderColor: "#000033",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              colspan="4"
                              width="100%"
                              align="Center"
                              className="infob"
                              height="30"
                              style={{
                                paddingLeft: "5px",
                                fontSize: "14px",
                                color: "#fff",
                                backgroundColor: "#05365c",
                                fontWeight: "bold",
                              }}
                            >
                              Proposal for Overseas Relocation Services (Ocean -
                              LCL)
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="18%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              <b>Customer</b>
                            </td>
                            <td
                              width="32%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              {this.state.salesleadData.ContactName}
                            </td>
                            <td
                              width="18%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              <b>Quote Ref</b>
                            </td>
                            <td
                              width="32%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              {this.state.salesleadData.SalesLeadManagementID}
                              &nbsp;(Date: {this.state.ProposalCreatedDate})
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="18%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              <b>Origin City</b>
                            </td>
                            <td
                              width="32%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              {this.state.salesleadData.FromCity +
                                "," +
                                this.state.salesleadData.FromState +
                                "-" +
                                this.state.salesleadData.FromZipCode}
                            </td>
                            <td
                              width="18%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              <b>Delivery City</b>
                            </td>
                            <td
                              width="32%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              {this.state.salesleadData.ToCity +
                                "," +
                                this.state.salesleadData.ToState +
                                "-" +
                                this.state.salesleadData.ToZipCode}
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              <b>Phone</b>
                            </td>
                            <td
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              {this.state.salesleadData.PhoneNumber}
                            </td>
                            <td
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              <b>Email</b>
                            </td>
                            <td
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              {this.state.salesleadData.Email}
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="18%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              <b>Est. Volume</b>
                            </td>
                            <td
                              width="32%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              {ProposalData.length > 0
                                ? ProposalData[0].TotalCFT
                                : 0}{" "}
                              CFT
                            </td>
                            <td
                              width="18%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              <b>Container Type</b>
                            </td>
                            <td
                              width="32%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              Ocean - LCL
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              <b>Commodity</b>
                            </td>
                            <td
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              HHG
                            </td>
                            <td
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              <b>Mode</b>
                            </td>
                            <td
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              By Sea
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              <b>Service</b>
                            </td>
                            <td
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              {ProposalData.length > 0
                                ? ProposalData[0].ServiceType
                                : ""}
                            </td>
                            <td
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              <b>Sales Rep.</b>
                            </td>
                            <td
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "20px", paddingLeft: "5px" }}
                              height="25"
                            >
                              {ProposalData.length > 0
                                ? ProposalData[0].NewCreateBy
                                : ""}{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" height="15"></td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="1"
                        style={{
                          borderCollapse: "seperate",
                          borderColor: "#000033",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              width="68%"
                              height="30"
                              colspan="2"
                              className="infob"
                              align="Left"
                              valign="middle"
                              style={{
                                lineHeight: "20px",
                                paddingLeft: "5px",
                                color: "#fff",
                                backgroundColor: "#05365c",
                                fontsize: "14px;",
                              }}
                            >
                              Description of Services
                            </td>
                            <td
                              width="32%"
                              height="30"
                              className="infob"
                              align="Right"
                              valign="middle"
                              style={{
                                lineHeight: "20px",
                                paddingLeft: "5px",
                                color: "#fff",
                                backgroundColor: "#05365c",
                                fontsize: "14px;",
                              }}
                            >
                              Charges (in USD)
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="5%"
                              className="info"
                              align="center"
                              valign="middle"
                              style={{
                                lineHeight: "20px",
                                paddingLeft: "5px",
                                color: "#000",
                              }}
                              height="25"
                            >
                              {number}
                            </td>
                            <td
                              width="63%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{
                                lineHeight: "20px",
                                paddingLeft: "5px",
                                color: "#000",
                              }}
                              height="25"
                            >
                              Estimate cost for{" "}
                              {ProposalData.length > 0
                                ? this.state.ProposalData[0].TotalCFT
                                : ""}{" "}
                              CFT by Sea to {this.state.salesleadData.ToCity}
                            </td>
                            <td
                              width="32%"
                              className="info"
                              align="Right"
                              valign="middle"
                              style={{
                                lineHeight: "20px",
                                paddingLeft: "5px",
                                color: "#000",
                              }}
                              height="25"
                            >
                              {ProposalData.length > 0
                                ? "$ " + ProposalData[0].EstimatedShippingCost
                                : "$" + 0}
                              &nbsp;
                            </td>
                          </tr>
                          {this.state.AdditionalCFTcharges !== 0 ? (
                            <tr>
                              <td
                                width="5%"
                                className="info"
                                align="center"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#000",
                                }}
                                height="25"
                              >
                                {(number = number + 1)}
                              </td>
                              <td
                                width="63%"
                                className="info"
                                align="Left"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#000",
                                }}
                                height="25"
                              >
                                Additional CFT upto &nbsp;
                                {ProposalData.length > 0
                                  ? ProposalData[0].AddtionalCFTupto
                                  : 0}{" "}
                                CFT
                              </td>
                              <td
                                width="32%"
                                className="info"
                                align="Right"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#000",
                                }}
                                height="25"
                              >
                                $ &nbsp;
                                {ProposalData.length > 0
                                  ? ProposalData[0].AdditionalCFTcharges
                                  : 0}{" "}
                                per CFT
                              </td>
                            </tr>
                          ) : null}
                          {this.state.THCchargesPerCFT !== "0" ? (
                            <tr>
                              <td
                                width="5%"
                                className="info"
                                align="center"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#000",
                                }}
                                height="25"
                              >
                                {(number = number + 1)}
                              </td>
                              <td
                                width="63%"
                                className="info"
                                align="Left"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#000",
                                }}
                                height="25"
                              >
                                THC Charges
                              </td>
                              <td
                                width="32%"
                                className="info"
                                align="Right"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#000",
                                }}
                                height="25"
                              >
                                {ProposalData.length > 0
                                  ? "$ " + ProposalData[0].THCchargesPerCFT
                                  : "$ " + 0}{" "}
                              </td>
                            </tr>
                          ) : null}
                          {this.state.MinimumPackingCharges !== "0" ||
                          this.state.PackingCharges !== "0" ? (
                            <tr>
                              <td
                                width="5%"
                                className="info"
                                align="center"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#000",
                                }}
                                height="25"
                              >
                                {(number = number + 1)}
                              </td>
                              <td
                                width="63%"
                                className="info"
                                align="Left"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#000",
                                }}
                                height="25"
                              >
                                Export Packing Charges (Minimum Charges : ${" "}
                                {ProposalData.length > 0
                                  ? ProposalData[0].MinimumPackingCharges
                                  : 0}{" "}
                                ){" "}
                              </td>
                              <td
                                width="32%"
                                className="info"
                                align="Right"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#000",
                                }}
                                height="25"
                              >
                                $ &nbsp;
                                {ProposalData.length > 0
                                  ? ProposalData[0].PackingCharges
                                  : 0}
                              </td>
                            </tr>
                          ) : null}
                          {this.state.MinimumPickupCharges !== "0" ||
                          this.state.PickupCharges !== "0" ? (
                            <tr>
                              <td
                                width="5%"
                                className="info"
                                align="center"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#000",
                                }}
                                height="25"
                              >
                                {(number = number + 1)}
                              </td>
                              <td
                                width="63%"
                                className="info"
                                align="Left"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#000",
                                }}
                                height="25"
                              >
                                Pickup Charges (Minimum Charges : ${" "}
                                {ProposalData.length > 0
                                  ? ProposalData[0].MinimumPickupCharges
                                  : 0}
                                ){" "}
                              </td>
                              <td
                                width="32%"
                                className="info"
                                align="Right"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#000",
                                }}
                                height="25"
                              >
                                $ &nbsp;
                                {ProposalData.length > 0
                                  ? ProposalData[0].PickupCharges
                                  : 0}
                              </td>
                            </tr>
                          ) : null}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  {Comments !== "" ? (
                    <tr>
                      <td width="100%" height="15"></td>
                    </tr>
                  ) : null}
                  {Comments !== "" ? (
                    <tr>
                      <td width="100%" align="center">
                        <table
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="1"
                          style={{
                            borderCollapse: "seperate",
                            borderColor: "#000033",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                width="68%"
                                height="30"
                                colspan="2"
                                className="infob"
                                align="Left"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#fff",
                                  backgroundColor: "#05365c",
                                  fontsize: "14px;",
                                }}
                              >
                                Comments
                              </td>
                            </tr>
                            <tr>
                              <td
                                width="5%"
                                className="info"
                                align="left"
                                valign="middle"
                                style={{
                                  lineHeight: "20px",
                                  paddingLeft: "5px",
                                  color: "#000",
                                }}
                                height="25"
                              >
                                {ProposalData.length > 0
                                  ? ProposalData[0].Comments
                                  : ""}{" "}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ) : null}
                  <tr>
                    <td width="100%" height="15"></td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="1"
                        style={{
                          borderCollapse: "seperate",
                          borderColor: "#000033",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              colspan="3"
                              width="100%"
                              align="Center"
                              className="infob"
                              height="30"
                              style={{
                                paddingLeft: "5px",
                                fontSize: "14px",
                                color: "#fff",
                                backgroundColor: "#05365c",
                                fontWeight: "bold",
                              }}
                            >
                              Best Price Guaranteed. We Will Meet or Beat the
                              Best Door to Door Rates!
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="50%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{
                                fontSize: "12px",
                                color: "#000",
                                backgroundColor: "#ffd355",
                                paddingLeft: "25px",
                              }}
                              height="25"
                            >
                              <b>Inclusions</b>
                            </td>
                            <td
                              width="50%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{
                                fontSize: "12px",
                                color: "#000",
                                backgroundColor: "#ffd355",
                                paddingLeft: "25px",
                              }}
                              height="25"
                            >
                              <b>Exclusions (If Applicable)</b>
                            </td>
                          </tr>
                          <tr style={{ paddingBottom: "5px" }}>
                            <td
                              className="info"
                              align="Left"
                              valign="top"
                              height="25"
                            >
                              <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                              >
                                <tbody>{this.viewincludeterms()}</tbody>
                              </table>
                            </td>
                            <td
                              className="info"
                              align="Left"
                              valign="top"
                              height="25"
                            >
                              <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                              >
                                <tbody>{this.viewexcludeTerms()}</tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="page-break"></div>
            <div className="contaract-table-page">
              <table
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                bgcolor="#FFFFFF"
                align="center"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        width="100%"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        bgcolor="#FFFFFF"
                        align="center"
                      >
                        <tr>
                          <td
                            width="20%"
                            align="left"
                            style={{ paddingLeft: "5px" }}
                            valign="center"
                          >
                            <img
                              border="0"
                              src="https://www.sflworldwide.com/wp-content/uploads/2019/05/logo.png"
                            />
                          </td>
                          <td width="80%" height="100%" align="Right">
                            <table
                              width="100%"
                              cellspacing="2"
                              cellpadding="2"
                              border="0"
                              height="100%"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    width="100%"
                                    className="info"
                                    align="right"
                                    valign="middle"
                                    style={{ fontsize: " 11px" }}
                                  >
                                    P: 972-255-7447<br></br>
                                    E: contact@SFLWorldwide.com<br></br>
                                    FMC Licence No.: 025184<br></br>
                                    Negotiated Rate Arrangments
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="1"
                        style={{
                          borderCollapse: "seperate",
                          borderColor: "#000033",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              colspan="3"
                              width="100%"
                              align="Center"
                              className="infob"
                              height="30"
                              style={{
                                fontsize: "14px",
                                color: "#fff",
                                backgroundColor: "#05365c",
                                fontWeight: "bold",
                              }}
                            >
                              Insurance Options
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="33%"
                              className="info"
                              align="Center"
                              valign="middle"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                fontsize: "12px",
                                color: "#000",
                                backgroundColor: "#ffd355",
                              }}
                              height="25"
                            >
                              <b>Mover’s Liability</b>
                            </td>
                            <td
                              width="34%"
                              className="info"
                              align="Center"
                              valign="middle"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                fontsize: "12px",
                                color: "#000",
                                backgroundColor: "#ffd355",
                              }}
                              height="25"
                            >
                              <b>All Risk Policy</b>
                            </td>
                            <td
                              width="33%"
                              className="info"
                              align="Center"
                              valign="middle"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                fontsize: "12px",
                                color: "#000",
                                backgroundColor: "#ffd355",
                              }}
                              height="25"
                            >
                              <b>All Risk Policy</b>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="info"
                              align="Center"
                              valign="middle"
                              height="25"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                lineHeight: "15px",
                              }}
                            >
                              <b>$0 Deductible</b>
                            </td>
                            <td
                              className="info"
                              align="Center"
                              valign="middle"
                              height="25"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                lineHeight: "15px",
                              }}
                            >
                              <b>$250 Deductible</b>
                            </td>
                            <td
                              className="info"
                              align="Center"
                              valign="middle"
                              height="25"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                lineHeight: "15px",
                              }}
                            >
                              <b>$500 Deductible</b>
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="info"
                              align="Center"
                              valign="middle"
                              height="25"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                lineHeight: "15px",
                              }}
                            >
                              No premium
                            </td>
                            <td
                              className="info"
                              align="Center"
                              valign="middle"
                              height="25"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                lineHeight: "15px",
                              }}
                            >
                              5.00% premium with a $50 minimum
                            </td>
                            <td
                              className="info"
                              align="Center"
                              valign="middle"
                              height="25"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                lineHeight: "15px",
                              }}
                            >
                              3.00% premium with a $250 minimum
                            </td>
                          </tr>
                          <tr>
                            <td
                              className="info"
                              align="Center"
                              valign="middle"
                              height="25"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                lineHeight: "15px",
                              }}
                            >
                              Maximum Mover liability
                              <br />
                              of $0.60 per lbs. / package
                            </td>
                            <td
                              className="info"
                              align="Center"
                              valign="middle"
                              height="25"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                lineHeight: "15px",
                              }}
                            >
                              Detailed breakup of valued
                              <br />
                              goods to be packed by MOVERS
                            </td>
                            <td
                              className="info"
                              align="Center"
                              valign="middle"
                              height="25"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                lineHeight: "15px",
                              }}
                            >
                              Detailed breakup of valued
                              <br />
                              goods to be packed by MOVERS
                            </td>
                          </tr>

                          {/* <tr>
                          <td
                            className="info"
                            align="Center"
                            valign="middle"
                            height="30"
                            style={{ paddingLeft: "5px", paddingRight: "5px" }}
                          >
                            <img src="images/Right.jpg" width="20" border="0" />
                          </td>
                          <td
                            className="info"
                            align="Center"
                            valign="middle"
                            height="30"
                            style={{ paddingLeft: "5px", paddingRight: "5px" }}
                          ></td>
                          <td
                            className="info"
                            align="Center"
                            valign="middle"
                            height="30"
                            style={{ paddingLeft: "5px", paddingRight: "5px" }}
                          ></td>
                        </tr> */}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" height="5" align="center"></td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "15px" }}
                              height="20"
                            >
                              <b
                                style={{
                                  marginBottom: "10px",
                                  display: "inline-block",
                                }}
                              >
                                Mover’s Liability Explained :{" "}
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{
                                lineHeight: "15px",
                                paddingLeft: "15px",
                              }}
                            >
                              <p align="justify">
                                1. Movers Liability provides Loss Only coverage
                                of $0.60 Per LBS per article or package.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="3"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{
                                lineHeight: "15px",
                                paddingLeft: "15px",
                              }}
                              height="25"
                            >
                              <p align="justify">
                                2. Movers Liability does not provide any
                                coverage on missing or damaged content of
                                article or package. This insurance will only
                                provide coverage of $0.60 Per LBS if entire
                                article or package is missing and not content
                                within article or package is missing or damaged.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="3"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{
                                lineHeight: "15px",
                                paddingLeft: "15px",
                              }}
                              height="25"
                            >
                              <p align="justify">
                                3. Movers Insurance is valid while the goods are
                                in our physical possession. If the loss occurs
                                after the goods leave our possession, we are not
                                liable for any loss.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="3"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{
                                lineHeight: "15px",
                              }}
                              height="20"
                            >
                              <b
                                style={{
                                  marginBottom: "10px",
                                  display: "inline-block",
                                }}
                              >
                                All Risk Explained :{" "}
                              </b>
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "15px" }}
                              height="25"
                            >
                              <p
                                align="justify"
                                style={{ paddingLeft: "15px" }}
                              >
                                1. Your shipment is covered against risks such
                                as breakage, damage, theft, fire, earthquake,
                                collision, accidents, etc. Packed by owner items
                                are not covered against damages. Shipment packed
                                by owner is not covered under All Risk
                                Insurance.123
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="3"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "15px", paddingLeft: "20x" }}
                              height="25"
                            >
                              <p
                                align="justify"
                                style={{ paddingLeft: "15px" }}
                              >
                                2. If the shipment is Packed by owner and
                                required repacking at our warehouse; all risk
                                insurance will be activated from SFL Worldwide
                                warehouse once repacked for which additional
                                charges may applicable, all loss or damage will
                                be covered under Movers Liability prior to that.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="3"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "15px", paddingLeft: "20x" }}
                              height="25"
                            >
                              <p
                                align="justify"
                                style={{ paddingLeft: "15px" }}
                              >
                                3. Your shipment will be covered at current
                                value and this insurance does not cover shipping
                                charges, packing charges, customs duty etc.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="3"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "15px", paddingLeft: "20x" }}
                              height="25"
                            >
                              <p
                                align="justify"
                                style={{ paddingLeft: "15px" }}
                              >
                                4. SFL Worldwide will take insurance from 3rd
                                party Insurance Company and will not be
                                responsible or liable for any judgment made by
                                the insurance company. It is shipper
                                responsibility to review and accept terms and
                                condition offered by the insurance company or
                                selects any other insurance provider if needed.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="3"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "15px" }}
                              height="25"
                            >
                              <p align="justify">
                                If the shipment arrives at the warehouse in
                                damaged condition we can either return shipment
                                back to the shipper or dispose shipment at
                                written confirmation from the shipper. Depending
                                upon the option selected to and from shipping
                                charges and disposal fees will be applied. SFL
                                Worldwide is not liable for any damage of loss
                                of the shipment.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="3"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "15px" }}
                              height="25"
                            >
                              <p align="justify">
                                If your shipment does not arrive within 3 weeks
                                from pickup date to our warehouse or we are not
                                able to trace the part or full shipment, SFL
                                Worldwide will compensate under Movers Liability
                                Converge.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" height="5"></td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="1"
                        style={{
                          borderCollapse: "seperate",
                          borderColor: "#000033",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              colspan="2"
                              width="100%"
                              align="Center"
                              className="infob"
                              height="30"
                              style={{
                                paddingLeft: "5px",
                                fontsize: "14px",
                                lineHeight: "22px",
                                color: "#fff",
                                backgroundColor: "#05365c",
                                fontWeight: "bold",
                              }}
                            >
                              Documents Required at Origin
                            </td>
                            <td
                              rowspan="2"
                              width="100%"
                              align="Center"
                              className="infob"
                              height="30"
                              style={{
                                paddingLeft: "5px",
                                fontsize: "14px",
                                lineHeight: "22px",
                                color: "#fff",
                                backgroundColor: "#05365c",
                                fontWeight: "bold",
                              }}
                            >
                              Documents Required at Destination
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="40%"
                              className="info"
                              align="Center"
                              valign="middle"
                              style={{
                                fontsize: "12px",
                                color: "#000",
                                backgroundColor: "#ffd355",
                              }}
                              height="25"
                            >
                              <b>Foreign Passport Holder(s)</b>
                            </td>
                            <td
                              width="30%"
                              className="info"
                              align="Center"
                              valign="middle"
                              style={{
                                fontsize: "12px",
                                color: "#000",
                                backgroundColor: "#ffd355",
                              }}
                              height="25"
                            >
                              <b>Indian Passport Holder(s)</b>
                            </td>
                          </tr>
                          <tr>
                            <td className="info" align="Left" valign="top">
                              <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td colspan="2" height="3"></td>
                                  </tr>
                                  <tr>
                                    <td
                                      width="5%"
                                      className="info"
                                      align="Center"
                                      valign="top"
                                      style={{
                                        lineHeight: "14px",
                                      }}
                                      height="20"
                                    >
                                      <img src={bullet} />
                                    </td>
                                    <td
                                      width="95%"
                                      className="info"
                                      align="Left"
                                      valign="top"
                                      style={{ lineHeight: "14px" }}
                                      height="20"
                                    >
                                      Scanned copy of passport photo page only
                                      (not the entire passport)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2" height="3"></td>
                                  </tr>
                                  <tr>
                                    <td
                                      className="info"
                                      align="Center"
                                      valign="top"
                                      style={{
                                        lineHeight: "14px",
                                      }}
                                    >
                                      <img src={bullet} />
                                    </td>
                                    <td
                                      className="info"
                                      align="Left"
                                      valign="top"
                                      style={{ lineHeight: "14px" }}
                                    >
                                      Copy of Visa / OCI / PIO card
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2" height="3"></td>
                                  </tr>
                                  <tr>
                                    <td
                                      className="info"
                                      align="Center"
                                      valign="top"
                                      style={{
                                        lineHeight: "14px",
                                      }}
                                    >
                                      <img src={bullet} />
                                    </td>
                                    <td
                                      className="info"
                                      align="Left"
                                      valign="top"
                                      style={{ lineHeight: "14px" }}
                                    >
                                      Copy of EIN number / Authorization to us
                                      to apply for and obtain EIN on your behalf
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2" height="3"></td>
                                  </tr>
                                  <tr>
                                    <td
                                      className="info"
                                      align="Center"
                                      valign="top"
                                      style={{
                                        lineHeight: "14px",
                                      }}
                                    >
                                      <img src={bullet} />
                                    </td>
                                    <td
                                      className="info"
                                      align="Left"
                                      valign="top"
                                      style={{ lineHeight: "14px" }}
                                    >
                                      Signatures on export forms that will be
                                      provided by us
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2" height="3"></td>
                                  </tr>
                                  <tr>
                                    <td
                                      className="info"
                                      align="Center"
                                      valign="top"
                                      style={{
                                        lineHeight: "14px",
                                      }}
                                    >
                                      <img src={bullet} />
                                    </td>
                                    <td
                                      className="info"
                                      align="Left"
                                      valign="top"
                                      style={{ lineHeight: "14px" }}
                                    >
                                      Insurance application / valuation form
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2" height="3"></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td
                              className="info"
                              align="Left"
                              valign="top"
                              height="25"
                            >
                              <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td colspan="2" height="3"></td>
                                  </tr>
                                  <tr>
                                    <td
                                      width="5%"
                                      className="info"
                                      align="Center"
                                      valign="top"
                                      style={{
                                        lineHeight: "14px",
                                      }}
                                      height="20"
                                    >
                                      <img src={bullet} />
                                    </td>
                                    <td
                                      width="95%"
                                      className="info"
                                      align="Left"
                                      valign="top"
                                      style={{ lineHeight: "14px" }}
                                      height="20"
                                    >
                                      Scanned copy of passport photo page (not
                                      entire passport)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2" height="3"></td>
                                  </tr>
                                  <tr>
                                    <td
                                      className="info"
                                      align="Center"
                                      valign="top"
                                      style={{
                                        lineHeight: "14px",
                                      }}
                                      height="20"
                                    >
                                      <img src={bullet} />
                                    </td>
                                    <td
                                      className="info"
                                      align="Left"
                                      valign="top"
                                      style={{ lineHeight: "14px" }}
                                      height="20"
                                    >
                                      Signatures on export forms that will be
                                      provided by us
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2" height="3"></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td
                              className="info"
                              align="Left"
                              valign="top"
                              height="25"
                            >
                              <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td colspan="2" height="3"></td>
                                  </tr>
                                  <tr>
                                    <td
                                      width="5%"
                                      className="info"
                                      align="Center"
                                      valign="top"
                                      style={{
                                        lineHeight: "14px",
                                      }}
                                    >
                                      <img src={bullet} />
                                    </td>
                                    <td
                                      width="95%"
                                      className="info"
                                      align="Left"
                                      valign="top"
                                      style={{ lineHeight: "14px" }}
                                    >
                                      Original Passport
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2" height="3"></td>
                                  </tr>
                                  <tr>
                                    <td
                                      className="info"
                                      align="Center"
                                      valign="top"
                                      style={{
                                        lineHeight: "14px",
                                      }}
                                    >
                                      <img src={bullet} />
                                    </td>
                                    <td
                                      className="info"
                                      align="Left"
                                      valign="top"
                                      style={{ lineHeight: "14px" }}
                                    >
                                      OCI / PIO Card, if holding foreign
                                      passport
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colspan="2" height="3"></td>
                                  </tr>
                                  <tr>
                                    <td
                                      className="info"
                                      align="Center"
                                      valign="top"
                                      style={{
                                        lineHeight: "14px",
                                      }}
                                    >
                                      <img src={bullet} />
                                    </td>
                                    <td
                                      className="info"
                                      align="Left"
                                      valign="top"
                                      style={{ lineHeight: "14px" }}
                                    >
                                      Signature on Customs forms that will be
                                      provided by us
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" height="5"></td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "15px" }}
                              height="25"
                            >
                              <p align="justify">
                                <b>
                                  Shipper's presence in India when the shipment
                                  reaches is mandatory. If the shipper has not
                                  arrived into India or has to travel out again
                                  when the shipment reaches, we cannot clear it
                                  and additional charges may incur. We would
                                  need Original Passport along with Customer's
                                  Signatures on Custom Documentation which will
                                  be provided by SFL Worldwide as without this
                                  documents we won't able to clear shipment from
                                  customs and additional charges will incure
                                  which SFL Worldwide will not be liable for.
                                </b>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" height="100%"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="page-break"></div>
            <div className="contaract-table-page">
              <table
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                bgcolor="#FFFFFF"
                align="center"
                valign="top"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        width="100%"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        bgcolor="#FFFFFF"
                        align="center"
                      >
                        <tr>
                          <td
                            width="20%"
                            align="left"
                            style={{ paddingLeft: "5px" }}
                            valign="center"
                          >
                            <img
                              border="0"
                              src="https://www.sflworldwide.com/wp-content/uploads/2019/05/logo.png"
                            />
                          </td>
                          <td width="80%" height="100%" align="Right">
                            <table
                              width="100%"
                              cellspacing="2"
                              cellpadding="2"
                              border="0"
                              height="100%"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    width="100%"
                                    className="info"
                                    align="right"
                                    valign="middle"
                                    style={{ fontsize: " 11px" }}
                                  >
                                    P: 972-255-7447<br></br>
                                    E: contact@SFLWorldwide.com<br></br>
                                    FMC Licence No.: 025184<br></br>
                                    Negotiated Rate Arrangments
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "14px" }}
                              height="25"
                            >
                              <p align="justify" style={{ marginTop: "10px" }}>
                                <b>Transit Times :</b> Standard transit time
                                would be 3 to 4 Months unforeseen any delays
                                outside our control. SFL Worldwide would not be
                                able to control any delays on account of the
                                shipping lines as they do not fully disclose to
                                us the reasons for the delayed arrival. These
                                can typically be attributed to adverse weather
                                conditions, port congestion, and vessel
                                maintenance or in some instances delayed
                                departure at the origin. SFL Worldwide will not
                                be responsible for any delays caused due to
                                customs clearance procedure.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="5"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "14px" }}
                              height="25"
                            >
                              <p align="justify">
                                <b>Our Liability :</b> SFL Worldwide is only
                                liable for loss of entire package or article
                                that is expressly stated in the household goods
                                descriptive inventory and may occur while your
                                shipment is in our physical possession. Our
                                maximum liability for such loss is limited to an
                                amount not exceeding $0.60 per pound package.
                                SFL Worldwide will not be liable for any damage
                                or missing content inside any package or
                                article. Our liability only covers if entire
                                box/package/article is missing. We are not
                                liable for loss or damage that may occur after
                                the shipment leaves our physical possession.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="5"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "14px" }}
                              height="25"
                            >
                              <p align="justify">
                                An optional extended protection plan for your
                                household goods, personal effects and
                                automobiles moving by land, sea and/or air is
                                available subject to your application,
                                acceptance, payment of premiums and compliance
                                with the terms and conditions of our 3rd party
                                insurance underwriter at least 4 days prior to
                                the pickup of your shipment. SFL Worldwide, LLC
                                does recommend that you purchase an extended
                                protection plan for your shipment.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="5"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "14px" }}
                              height="25"
                            >
                              <p align="justify">
                                <b>Environmental Support :</b> SFL Worldwide
                                cares about the environment and endeavors to
                                promote an ongoing awareness, sensitivity and
                                conservation of our environment, internally and
                                with its customers, through use of recycled
                                materials. Accordingly, if the contract includes
                                packing we encourage and request your permission
                                to use a mixture of new and recycled cartons on
                                your move. Recycled cartons may include dish
                                packs, small, medium and large cartons. All
                                recycled cartons will be clean, dry, void of
                                previous Markings, in good condition and will
                                afford the same protection as new material.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="5"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "14px" }}
                              height="25"
                            >
                              <p align="justify">
                                <b>Quote Validity :</b> We appreciate and thank
                                you for the opportunity to submit this proposal
                                for international relocation services. The scope
                                of services to be performed by SFL Worldwide and
                                its agents are limited to the performance of
                                only those services expressly stated in this
                                proposal. Please note, that our services are
                                entirely flexible and can be adapted to your
                                changing requirements. The prices stated herein
                                are valid for a period of Thirty (30) days from
                                the date of this proposal.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="5"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "14px" }}
                              height="25"
                            >
                              <p align="justify">
                                <b>Payment Terms :</b> All charges, as above
                                must be paid by check or wire transfer within
                                seven days from the receipt of our trade invoice
                                after pickup of your shipment. Credit Card will
                                be only accepted for payment under $500.00 and
                                credit card fees will be charged at 3% if
                                payment is being made by Credit Card. If payment
                                is not made by due date late fees of $35.00 and
                                interest of 14.99 % per annum will be applied.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="5"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "14px" }}
                              height="25"
                            >
                              <p align="justify">
                                <b>Weight Limit : </b>You are allowed to keep
                                the weight equal to the dimensional weight of
                                the box. For Example: If you are using a box
                                with dimension 18x18x24 Inches, so the
                                dimensional weight of this box is 56lbs
                                therefore you can fill this box up to 56 lbs.
                                Here if the actual weight exceeds the allowed
                                limit you will be charged as $2/lb for
                                additional Lbs. If any of your box is more than
                                70lbs then there will be additional Charge of
                                $15.00 for that particular box for Over Weight
                                Charges.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="5"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "14px" }}
                              height="25"
                            >
                              <p align="justify">
                                Overseas shipping entails handling of cargo
                                multiple times and therefore standard boxes do
                                not have the quality or cardboard strength to
                                sustain all the handling. You must buy Double
                                Walled or Heavy-Duty boxes to ship your
                                belongings which is easily available from Home
                                Depot or UHaul Stores.
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td width="100%" height="5"></td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              className="info"
                              align="Left"
                              valign="middle"
                              style={{ lineHeight: "14px" }}
                              height="25"
                            >
                              <p align="justify">
                                <b>
                                  Please note that if the box types are not used
                                  as suggested, then repacking charges of $25
                                  per Box may apply once the boxes are received
                                  in our warehouse, as we need to repack them
                                  into double walled boxes to avoid damage
                                  during transit to your final destination in
                                  India.If you have used Double Walled or Heavy
                                  Duty boxes and still we have received your box
                                  in damaged condition then there will be
                                  repacking charges of $15 per Box.
                                </b>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td width="49%" align="left">
                              <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                border="1"
                                style={{
                                  borderCollapse: "seperate",
                                  borderColor: "#000033",
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="48%"
                                      align="Center"
                                      className="infob"
                                      height="30"
                                      style={{
                                        paddingLeft: "5px",
                                        fontSize: "14px",
                                        color: "#fff",
                                        backgroundColor: "#05365c",
                                      }}
                                    >
                                      Dimensional Weight (Lbs)
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="Center"
                                      className="infob"
                                      style={{ paddingLeft: "0px" }}
                                    >
                                      <img src={dimensionimg} border="0" />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                            <td width="2%"></td>
                            <td width="49%" align="right">
                              <table
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                                border="1"
                                style={{
                                  borderCollapse: "seperate",
                                  borderColor: "#000033",
                                }}
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="48%"
                                      align="Center"
                                      className="infob"
                                      height="30"
                                      style={{
                                        paddingLeft: "5px",
                                        fontSize: "14px",
                                        color: "#fff",
                                        backgroundColor: "#05365c",
                                      }}
                                    >
                                      Cubic Ft.
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="Center"
                                      className="infob"
                                      style={{ paddingLeft: "0px" }}
                                    >
                                      <img src={cubicimg} border="0" />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="page-break"></div>
            <div className="contaract-table-page">
              <table
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                bgcolor="#FFFFFF"
                align="center"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        width="100%"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        bgcolor="#FFFFFF"
                        align="center"
                      >
                        <tr>
                          <td
                            width="20%"
                            align="left"
                            style={{ paddingLeft: "5px" }}
                            valign="center"
                          >
                            <img
                              border="0"
                              src="https://www.sflworldwide.com/wp-content/uploads/2019/05/logo.png"
                            />
                          </td>
                          <td width="80%" height="100%" align="Right">
                            <table
                              width="100%"
                              cellspacing="2"
                              cellpadding="2"
                              border="0"
                              height="100%"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    width="100%"
                                    className="info"
                                    align="right"
                                    valign="middle"
                                    style={{ fontsize: " 11px" }}
                                  >
                                    P: 972-255-7447<br></br>
                                    E: contact@SFLWorldwide.com<br></br>
                                    FMC Licence No.: 025184<br></br>
                                    Negotiated Rate Arrangments
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <table
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="1"
                        style={{
                          borderCollapse: "seperate",
                          borderColor: "#000033",
                          marginTop: "20px",
                        }}
                      >
                        <tbody>
                          <tr>
                            <td
                              width="100%"
                              align="Center"
                              className="infob"
                              height="30"
                              style={{
                                paddingLeft: "5px",
                                fontSize: "14px",
                                color: "#fff",
                                backgroundColor: "#05365c",
                              }}
                            >
                              Your rights and responsibilities
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              align="center"
                              style={{ paddingBottom: "3px" }}
                            >
                              <table
                                width="98%"
                                cellspacing="0"
                                cellpadding="0"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td height="5"></td>
                                  </tr>
                                  <tr>
                                    <td width="100%" align="center">
                                      <table
                                        width="98%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              width="3%"
                                              className="Smallinfo"
                                              align="center"
                                              valign="top"
                                              style={{
                                                lineHeight: "16px",
                                              }}
                                            >
                                              <img src={bullet} />
                                            </td>
                                            <td
                                              width="97%"
                                              className="Smallinfo"
                                              align="Left"
                                              valign="top"
                                              style={{ lineHeight: "16px" }}
                                            >
                                              <p align="justify">
                                                Our House Bill of Lading is the
                                                title to your cargo.
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td height="5"></td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="Smallinfo"
                                              align="center"
                                              valign="top"
                                              style={{
                                                lineHeight: "16px",
                                              }}
                                            >
                                              <img src={bullet} />
                                            </td>
                                            <td
                                              className="Smallinfo"
                                              align="Left"
                                              valign="middle"
                                              style={{ lineHeight: "20px" }}
                                            >
                                              <p align="justify">
                                                By signing this contract you
                                                agree that our Household Goods
                                                Descriptive Inventory is the
                                                official document that contains
                                                the pickup date, delivery date,
                                                quantity and description of your
                                                packages shipped and received.
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td height="5"></td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="Smallinfo"
                                              align="center"
                                              valign="top"
                                              style={{
                                                lineHeight: "16px",
                                              }}
                                            >
                                              <img src={bullet} />
                                            </td>
                                            <td
                                              className="Smallinfo"
                                              align="Left"
                                              valign="middle"
                                              style={{ lineHeight: "16px" }}
                                            >
                                              <p align="justify">
                                                You agree to denote damages to
                                                items during packing or loading
                                                at the origin in our Household
                                                Goods Descriptive Inventory
                                                prior to signing and dating at
                                                the origin.
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td height="5"></td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="Smallinfo"
                                              align="center"
                                              valign="top"
                                              style={{
                                                lineHeight: "16px",
                                              }}
                                            >
                                              <img src={bullet} />
                                            </td>
                                            <td
                                              className="Smallinfo"
                                              align="Left"
                                              valign="middle"
                                              style={{ lineHeight: "16px" }}
                                            >
                                              <p align="justify">
                                                You agree to denote any missing
                                                or damaged packages along with
                                                your signature upon delivery of
                                                your shipment in our Household
                                                Goods Descriptive Inventory
                                                prior to signing and dating at
                                                the destination.
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td height="5"></td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="Smallinfo"
                                              align="center"
                                              valign="top"
                                              style={{
                                                lineHeight: "16px",
                                              }}
                                            >
                                              <img src={bullet} />
                                            </td>
                                            <td
                                              className="Smallinfo"
                                              align="Left"
                                              valign="middle"
                                              style={{ lineHeight: "16px" }}
                                            >
                                              <p align="justify">
                                                In the event that your shipment
                                                is not delivered in whole, you
                                                agree to submit your claim in
                                                writing to us within 120 days
                                                after pickup. We will attempt to
                                                locate your shipment within 4
                                                weeks of receiving your written
                                                claim. If we are unable to
                                                locate your shipment in four
                                                weeks and if you have purchased
                                                an extended protection plan with
                                                us, we will file a claim with
                                                the insurance company during the
                                                fifth week. If you have not
                                                purchased an extended protection
                                                plan or if your claim is denied
                                                by the insurance company you
                                                will be compensated per Movers
                                                Liability stated above.
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td height="5"></td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="Smallinfo"
                                              align="center"
                                              valign="top"
                                              style={{
                                                lineHeight: "16px",
                                              }}
                                            >
                                              <img src={bullet} />
                                            </td>
                                            <td
                                              className="Smallinfo"
                                              align="Left"
                                              valign="middle"
                                              style={{ lineHeight: "18px" }}
                                            >
                                              <p align="justify">
                                                In the event that your shipment
                                                is delivered in part or in the
                                                case of any damages, you agree
                                                to submit your claim in writing
                                                to us within 7 days after
                                                delivery. You agree to denote
                                                the missing / damaged packages
                                                in our Household Goods
                                                Descriptive Inventory during
                                                delivery. Upon receipt of your
                                                written claim and if you have
                                                purchased an All Risk insurance
                                                extended protection plan with us
                                                we will file a claim with the
                                                insurance company. If you have
                                                not purchased All Risk Insurance
                                                or if your insurance claim is
                                                denied by the insurance company
                                                you will be compensated per
                                                Movers Liability stated above.
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td height="5"></td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="Smallinfo"
                                              align="center"
                                              valign="top"
                                              style={{
                                                lineHeight: "16px",
                                              }}
                                            >
                                              <img src={bullet} />
                                            </td>
                                            <td
                                              className="Smallinfo"
                                              align="Left"
                                              valign="middle"
                                              style={{ lineHeight: "16px" }}
                                            >
                                              <p align="justify">
                                                You may address your claim to
                                                SFL Worldwide at
                                                contact@sflworldwide.com or By
                                                Faxing at 1-888-609-0778
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td height="5"></td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="Smallinfo"
                                              align="center"
                                              valign="top"
                                              style={{
                                                lineHeight: "16px",
                                              }}
                                            >
                                              <img src={bullet} />
                                            </td>
                                            <td
                                              className="Smallinfo"
                                              align="Left"
                                              valign="middle"
                                              style={{ lineHeight: "16px" }}
                                            >
                                              <p align="justify">
                                                Please confirm acceptance of
                                                this proposal by signing and
                                                returning this proposal along
                                                with booking deposit USD 250.00
                                                so that we can lock the rates
                                                and process your booking.
                                                Balance Payment is due in full
                                                upon receipt of our Invoice
                                                which will be sent after pickup
                                                of your shipment.{" "}
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td height="5"></td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="Smallinfo"
                                              align="center"
                                              valign="top"
                                              style={{
                                                lineHeight: "16px",
                                              }}
                                            >
                                              <img src={bullet} />
                                            </td>
                                            <td
                                              className="Smallinfo"
                                              align="Left"
                                              valign="middle"
                                              style={{ lineHeight: "16px" }}
                                            >
                                              <p align="justify">
                                                Service provided pursuant to
                                                this NVOCC Negotiated Rate
                                                Arrangement (NRA) is subject to
                                                Carrier's governing rules
                                                tariff, which is accessible at
                                                www.dpiusa.com in compliance
                                                with FMC Regulations as provided
                                                in 46 CFR 532.7.”
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td height="5"></td>
                                          </tr>
                                          <tr>
                                            <td
                                              className="Smallinfo"
                                              align="center"
                                              valign="top"
                                              style={{
                                                lineHeight: "16px",
                                              }}
                                            >
                                              <img src={bullet} />
                                            </td>
                                            <td
                                              className="Smallinfo"
                                              align="Left"
                                              valign="middle"
                                              style={{ lineHeight: "16px" }}
                                            >
                                              <p align="justify">
                                                Any legal disputes will be
                                                subject to the jurisdiction of
                                                Texas State Law where SFL
                                                Worldwide LLC is registered.
                                              </p>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td height="5"></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              width="100%"
                              align="Center"
                              className="infob"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                              }}
                            >
                              <table width="100%" cellpadding="0" border="0">
                                <tbody>
                                  <tr>
                                    <td
                                      colspan="3"
                                      width="100%"
                                      align="center"
                                      valign="bottom"
                                      style={{
                                        paddingLeft: "5px",
                                        paddingTop: "5px",
                                        paddingBottom: "5px",
                                      }}
                                    >
                                      SFL Worldwide LLc<br></br>
                                      3364 Garden Brook Drive, Farmers Branch,
                                      TX - 75234<br></br>
                                      Website : www.SFLWorldwide.com | Fax:
                                      888-609-0778
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td width="100%" align="center">
                      <table
                        style={{ marginTop: "20px" }}
                        width="100%"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              width="100%"
                              className="infob"
                              align="center"
                              valign="top"
                            >
                              <a
                                href="https://hub.sflworldwide.com/auth/login-page"
                                style={{
                                  width: "100%",
                                  display: "inline-block",
                                  background: "#ae170f",
                                  color: "#fff",
                                  padding: "20px",
                                  fontsize: "20px",
                                  fontWeight: "bold",
                                }}
                              >
                                CLICK HERE TO SCHEDULE YOUR SHIPMENT
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        // <div className="contract-deleted">
        //   <div className="cd-inner">
        //     <span>
        //       <i className={"fas fa-trash"} />
        //     </span>
        //     <h2>This document is no longer avaliable</h2>
        //   </div>
        // </div>
      );
    } else {
      return (
        <div className="contract-deleted">
          <div className="cd-inner">
            <span>
              <i className={"fas fa-trash"} />
            </span>
            <h2>This document is no longer avaliable</h2>
          </div>
        </div>
      );
    }
  }
}
export default Proposal_client;
