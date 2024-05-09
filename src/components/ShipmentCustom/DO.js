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
import vshah from "../../assets/img/HBL/sign2.png";
import pshah from "../../assets/img/HBL/logo.png";
import stamp from "../../assets/img/HBL/dostamp.png";
import SimpleBackdrop from "../../utils/general";
import html2pdf from "html2pdf.js";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class DeliveryOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    document.getElementById("ETADate").innerHTML = localStorage.getItem("ETADate")
    document.getElementById("DoDeliverTo").innerHTML = localStorage.getItem("DoDeliverTo")
    document.getElementById("DOConsignee").innerHTML = localStorage.getItem("DOConsignee")
    document.getElementById("DoMBLNo").innerHTML = localStorage.getItem("DoMBLNo")
    document.getElementById("DoVessel").innerHTML = localStorage.getItem("DoVessel")
    document.getElementById("DONotifyParty").innerHTML = localStorage.getItem("DONotifyParty")

    document.getElementById("DoHBLNo").innerHTML = localStorage.getItem("DoHBLNo")
    document.getElementById("DoLoadingPort").innerHTML = localStorage.getItem("DoLoadingPort")
    document.getElementById("DoIGMNo").innerHTML = localStorage.getItem("DoIGMNo")
    document.getElementById("DoITMSub").innerHTML = localStorage.getItem("DoITMSub")
    document.getElementById("DoContainerNum").innerHTML = localStorage.getItem("DoContainerNum")



    document.getElementById("DoSealNumber").innerHTML = localStorage.getItem("DoSealNumber")
    document.getElementById("DoDescription").innerHTML = localStorage.getItem("DoDescription")
    document.getElementById("DOSequencelist").innerHTML = localStorage.getItem("DOSequencelist")
    document.getElementById("DoPackageNumber").innerHTML = localStorage.getItem("DoPackageNumber")
    document.getElementById("DOMEASUREMENT").innerHTML = localStorage.getItem("DOMEASUREMENT")
    document.getElementById("DOWEIGHT").innerHTML = localStorage.getItem("DOWEIGHT")
    document.getElementById("ContainerName").innerHTML = localStorage.getItem("ContainerName")
    document.getElementById("IGMDate").innerHTML = localStorage.getItem("IGMDate")

    document.getElementById("IGMInwardDate").innerHTML = localStorage.getItem("IGMInwardDate")
    document.getElementById("HBLDate").innerHTML = localStorage.getItem("HBLDate")

    document.getElementById("HBLDate2").innerHTML = localStorage.getItem("HBLDate")
    var dates = moment().tz("America/Chicago").format("MM/DD/YYYY")
    document.getElementById("currdate").innerHTML = dates
    
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
    const {} = this.state;
    return (
      <div>
        <table style={{ width: "100%", fontFamily: "sans-serif" }}>
          <tbody>
            <tr>
              <td style={{ textAlign: "right" }}>
                <img style={{ width: "200px" }} src={pshah} alt="" />
              </td>
            </tr>
          </tbody>
        </table>
        <h1
          style={{
            fontFamily: "sans-serif",
            fontSize: "36px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          DELIVERY ORDER
        </h1>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "sans-serif",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{ width: "50%", padding: "3px", verticalAlign: "top" }}
              >
                <b>Attention To :</b>
                <br />
                The Manager
                <br />
                Speedy CFS
                <br />
                Uran, Nhava Sheva
              </td>
              <td
                style={{
                  width: "50%",
                  padding: "3px",
                  verticalAlign: "top",
                  textAlign: "right",
                }}
              >
                Date : <span id = "currdate"></span>
              </td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding: "3px", verticalAlign: "top" }}>
                <p style={{ margin: "15px 0 0 0" }}>Dear Sir</p>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "sans-serif",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                Please Deliver To :
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                <span id = "DoDeliverTo"></span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                Consignee :
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                <span id = "DOConsignee"></span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                Notify Party :
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                <span id = "DONotifyParty"></span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                MBL Number / Date:
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "sans-serif",
                  }}
                >
                  <tbody>
                    <tr>

                      <td style={{ width: "50%", padding: 0 }}>
                        <span id = "DoMBLNo"></span>
                      </td>
                      <td style={{ width: "50%", padding: 0 }}>
                        Date: <span id = "HBLDate"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                Vessel / Voyage :
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                <span id = "DoVessel"></span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                HBL Number / Date :
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "sans-serif",
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ width: "50%", padding: 0 }}>
                        <span id = "DoHBLNo"></span>
                      </td>
                      <td style={{ width: "50%", padding: 0 }}>
                        Date: <span id = "HBLDate2"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                Load Port :
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                <span id = "DoLoadingPort"></span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                ETA :
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                <span id = "ETADate"></span>
              </td>
            </tr>
            <tr>

              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                IGM Number - Date :
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "sans-serif",
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ width: "50%", padding: 0 }}>
                        <span id = "DoIGMNo"></span> - <span id = "IGMDate"></span>
                      </td>
                      <td style={{ width: "50%", padding: 0 }}>
                        Inward Date : <span id = "IGMInwardDate"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                Item No. / Sub Item No :
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
               <span id = "DoITMSub"></span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                  verticalAlign: "top",
                }}
              >
                Unstuff Details :
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                  verticalAlign: "top",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "sans-serif",
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ padding: 0 }}>
                        <u>No. Of Packages</u>
                        <br />
                        <span id = "DoPackageNumber"></span>
                      </td>
                      <td style={{ padding: 0 }}>
                        <u>Weight in Kgs</u>
                        <br />
                        <span id = "DOWEIGHT"></span> kgs
                      </td>
                      <td style={{ padding: 0 }}>
                        <u>Volume</u>
                        <br />
                        <span id = "DOMEASUREMENT"></span> CBM
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                Marks and Numbers :
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                <span id = "DOSequencelist"></span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                Description :
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                <span id = "DoDescription"></span>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  width: "30%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                Container No. / Seal No. :
              </td>
              <td
                style={{
                  width: "70%",
                  padding: "3px",
                  border: "1px solid #000",
                }}
              >
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "sans-serif",
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ width: "50%", padding: 0 }}><span id = "DoContainerNum"></span></td>
                      <td style={{ width: "50%", padding: 0 }}>
                        Seal Number : <span id = "DoSealNumber"></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "sans-serif",
            marginTop: "20px",
          }}
        >
          <tbody>
            <tr>
              <td style={{ padding: "3px", verticalAlign: "top" }}>
                <span id = "ContainerName"></span>
              </td>
              <td rowSpan={4} style={{ width: "40%" }}>
                <img src={stamp} alt="" />
              </td>
            </tr>
            <tr>
              <td style={{ padding: "3px", verticalAlign: "top" }}>
                STAMP DUTY NOT COLLECTED
              </td>
            </tr>
            <tr>
              <td
                style={{ padding: "3px", verticalAlign: "top", color: "blue" }}
              >
                SFL WORLDWIDE LOGISTICS PRIVATE LIMITED
              </td>
            </tr>
            <tr>
              <td style={{ padding: "3px", verticalAlign: "top" }}>
                <img src={vshah} alt="" />
              </td>
            </tr>
            <tr>
              <td
                style={{ padding: "3px", verticalAlign: "top", color: "blue" }}
              >
                AUTHORISED SIGNATORY
              </td>
            </tr>
          </tbody>
        </table>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            borderTop: "5px solid #800000",
            fontFamily: "sans-serif",
            marginTop: "20px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  textAlign: "center",
                  fontSize: "12px",
                  paddingTop: "10px",
                }}
              >
                C-732-733, Siddhi Vinayak Towers, Behind DCP Office, Nr. DAV
                Internatioal School
                <br />
                Off. S. G. Highway, Makarba, Ahmedabad, Gujarat - 380051, India
                <br />
                T: +91 98250 40051 | E: contact@sflindia.com | W:
                www.SFLIndia.com | CIN: U63000GJ2004PTC044321 | GSTN:
                24AABCN9389H1Z2
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DeliveryOrder;
