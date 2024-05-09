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
import pshah from "../../assets/img/HBL/logo.png";
import SimpleBackdrop from "../../utils/general";
import html2pdf from "html2pdf.js";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class PackageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  async componentDidMount() {

    var shipId = parseInt(this.props.match.params.shipId);
    var contId = parseInt(this.props.match.params.contId);

    document.getElementById("containerName").innerHTML = localStorage.getItem("ContainerName")

    document.getElementById("trackingNumber").innerHTML = localStorage.getItem("TrackingNumber")

    document.getElementById("TOAddress").innerHTML = localStorage.getItem("TOAddress")

    // document.getElementById("TOCity").innerHTML = localStorage.getItem("TOCitys")

    // document.getElementById("fromCity").innerHTML = localStorage.getItem("fromCitys")

    document.getElementById("fromAddress").innerHTML = localStorage.getItem("FromAddress")

    document.getElementById("customerName").innerHTML = localStorage.getItem("ContactName")

    document.getElementById("dataHtml").innerHTML = localStorage.getItem("tableHTML")
    
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
     
    } = this.state;
    return (
      <div className="" style={{ textAlign: "center" }}>


  <table style={{ width: "100%", fontFamily: "sans-serif" }}>
    <tbody>
      <tr>
        <td style={{ textAlign: "right" }}>
          <img style={{ width: 200 }} src={pshah} alt="" />
        </td>
      </tr>
    </tbody>
  </table>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "sans-serif",
      textAlign:"left"
    }}
  >
    <tbody>
      <tr>
        <td
          colSpan={2}
          style={{ width: "20%", padding: 5, border: "1px solid #000" }}
        >
          Container Name
        </td>
        <td style={{ padding: 5, border: "1px solid #000" }}><span id = "containerName" ></span></td>
      </tr>
      <tr>
        <td
          colSpan={2}
          style={{ width: "20%", padding: 5, border: "1px solid #000" }}
        >
          AWB Number
        </td>
        <td style={{ padding: 5, border: "1px solid #000" }}><span id = "trackingNumber" ></span></td>
      </tr>
      <tr>
        <td
          colSpan={2}
          style={{ width: "20%", padding: 5, border: "1px solid #000" }}
        >
          Customer Name
        </td>
        <td style={{ padding: 5, border: "1px solid #000" }}>
          <span id = "customerName" ></span>
        </td>
      </tr>
      <tr>
        <td
          colSpan={2}
          style={{ width: "20%", padding: 5, border: "1px solid #000" }}
        >
          Origin Address
        </td>
        <td style={{ padding: 5, border: "1px solid #000" }}>
                    <span id = "fromAddress"></span>
        </td>
      </tr>
      <tr>
        <td
          colSpan={2}
          style={{ width: "20%", padding: 5, border: "1px solid #000" }}
        >
          Destination Address
        </td>
        <td style={{ padding: 5, border: "1px solid #000" }}>
                    <span id = "TOAddress"></span>
        </td>
      </tr>
    </tbody>
  </table>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      marginTop: 20,
      fontFamily: "sans-serif",
      textAlign:"left"
    }}
  >
    <thead>
      <tr>
        <td style={{ width: "10%", padding: 5, border: "1px solid #000" }}>
          Sr.
        </td>
        <td style={{ width: "10%", padding: 5, border: "1px solid #000" }}>
          Sequence No.
        </td>
        <td style={{ width: "80%", padding: 5, border: "1px solid #000" }}>
          Package Content
        </td>
      </tr>
    </thead>
    <tbody id = "dataHtml" className="Pl-td">
      
    </tbody>
  </table>


        
        
          {/* <div className="hbl-outer">
            <div id="HBL" class="page">
              
              <table className="hbl-table">
                <tr>
                  <td  className="t-50">
                        <b>Container Name	</b>
                  </td>
                  <td colSpan={3} className="t-25">
                        <label id = "containerName"></label>
                  </td>
                  
                </tr>
                <tr>
                  <td  className="t-50">
                  <b>AWB Number	</b>
                  </td>
                  <td colSpan={3} className="t-25">
                    <label id = "trackingNumber"></label>
                  </td>
                  
                </tr>
                <tr>
                  <td  className="t-50">
                       <b> Customer Name</b>
                  </td>
                  <td colSpan={3} className="t-25">
                    <label id = "customerName"></label>
                  </td>
                  
                </tr>
                <tr>
                  <td   className="t-50">
                        <b>Orign Address</b>
                  </td>
                  <td colSpan={3}  className="t-25">
                    <label id = "fromAddress"></label><br></br>
                    <label id = "fromCity"></label><br></br>
                    
                  </td>
                  
                </tr>
                <tr>
                  <td  className="t-50">
                        <b>Destination Address	</b>
                  </td>
                  <td colSpan={3} className="t-25">
                  <label id = "TOAddress"></label><br></br>
                    <label id = "TOCity"></label><br></br>
                    
                  </td>
                  
                </tr>
              </table>
              
              
              <table className="hbl-table">
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Sequence No.</th>
                    <th colSpan={2}>Package Content</th>
                    
                  </tr>
                </thead>
                <tbody id = "dataHtml">

               

                 

                </tbody>
                
              </table>
              

              


            </div>
          </div>
         */}
        
      </div>
    );
  }
}

export default PackageList;
