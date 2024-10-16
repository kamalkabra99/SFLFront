import React, { Component } from "react";
import moment from "moment";
import { CommonConfig } from "../../utils/constant";
class HHNInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FromAddress: "",
      ContactName: "",
      ToAddress: "",
      TrackingNumber: "",
      htmlData:[],
	  newbal:0,
	  newbalarray:[],
	  arrayLength:1
    };
  }
  componentDidMount() {

    
    this.state.FromAddress = localStorage.getItem("FromAddress")
    this.state.ContactName = localStorage.getItem("CustomerName")
    this.state.ToAddress = localStorage.getItem("TOAddress")
    this.state.TrackingNumber = localStorage.getItem("TrackingNumber")

    this.setState({
        FromAddress: localStorage.getItem("FromAddress"),
        ContactName: localStorage.getItem("CustomerName"),
        ToAddress: localStorage.getItem("TOAddress"),
        TrackingNumber: localStorage.getItem("TrackingNumber"),
        htmlData: JSON.parse(localStorage.getItem('TableData'))
      });

	  this.generate()

	  
    //   document.getElementById("commercialData").innerHTML = this.state.htmlData
    // console.log(localStorage.getItem('TableData'))

  }
  generate = () =>{
	var datalen =  this.state.htmlData.length
	var size = 1
	if(datalen > 15){
		size = Math.ceil((datalen /15))
	}else{
		size = 1
	}




	if(size == 1){
		console.log("Less")
	}else{
		console.log("More")
	}

  }

  renderCommercialExtra = () =>{

	return this.state.newbalarray.map((commercial, idx) => {
		return (
		  <tr>
			<td className="item">{commercial.indexdata}</td>
			<td className="box"></td>
			<td className="content"></td>
			<td className="value"></td>
			<td className="symbol"></td>
			<td className="packed-by"></td>
			</tr>
		  
		);
	});
	

  }


  renderCommercial = () => {


	
    if(this.state.htmlData.length > 0){

		var datalength = this.state.htmlData.length
	  console.log("htmlData = ",this.state.htmlData)
	  
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

        return this.state.htmlData.map((commercial, idx) => {
            return (
              <tr>
                <td className="item">{idx+1}</td>
                <td className="box">{commercial.PackageNumber}</td>
                <td className="content">{commercial.ContentDescription}</td>
                <td className="value">{commercial.TotalValue}</td>
                <td className="symbol"></td>
                <td className="packed-by">{commercial.packedType}</td>
                </tr>
              
            );
        });
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
    } = this.state;
    return (
        <div className="hg-table">

			{/* {this.state.arrayLength == 1 ?( */}
				<div className="hg-table-container">

					<table className="head-table">
						<tr>
							<td className="wd-50">
								<img src="https://www.sflworldwide.com/en-in/wp-content/uploads/2022/06/logo-2.png" alt="Logo" />
							</td>
							<td className="wd-50 align-right-hhg">
								<p className="align-right-hhg">
									3364 Garden Brook Drive<br />
									Farmers Branch, TX – 75234<br />
									972-255-7447 | contact@sflworldwide.com<br />
									www.SFLWorldwide.com
								</p>
							</td>
						</tr>
					</table>
				

					<table className="common-table mt-20">
						<tr>
							<td className="align-center">
								<h1>Household Goods Descriptive Inventory</h1>
							</td>
						</tr>
					</table>

					<table className="common-table bordered-table mt-20">
						<tr>
							<td style={{width:"17%"}} className="align-right-hhg">Customer Name:</td>
							<td style={{width:"59%"}}>{ContactName}</td>
							<td style={{width:"12%"}} className="align-right-hhg">Page No:</td>
							<td style={{width:"12%"}}>1</td>
						</tr>
						<tr>
							<td className="align-right-hhg">Origin Address:</td>
							<td>{FromAddress}</td>
							<td className="align-right-hhg">No of Pages:</td>
							<td>1</td>
						</tr>
						<tr>
							<td className="align-right-hhg">Destination Address:</td>
							<td>{ToAddress}</td>
							<td className="align-right-hhg">Ref No:</td>
							<td>{TrackingNumber}</td>
						</tr>
					</table>

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
							
							<td colSpan={2}>PBO-PACKED BY OWNER</td>
							
							<td>3) CORNER</td>
							<td>7) REAR</td>
							<td>11) VENEER</td>
						</tr>
						<tr>
							<td>MO-MOTH EATEN</td>
							<td>T-TORN</td>
							<td>SO-SOLED</td>
							<td>PBM-PACKED BY MOVERS</td>
							
							<td colSpan={2}>CU-CONTENTS & CONDITION UNKNOWN</td>
							
							<td>4) FRONT</td>
							<td>8) RIGHT</td>
							<td></td>
						</tr>
					</table>

					<table className="common-table bordered-table mt-20">
						<thead>
							<tr>
								<td className="bold item">Item No.</td>
								<td className="bold box">Box No.</td>
								<td className="bold content">Contents</td>
								<td className="bold value">Value (USD)</td>
								<td className="bold symbol">Exception Symbols</td>
								<td className="bold packed-by">Packed By</td>
							</tr>
						</thead>
						<tbody>
							{this.renderCommercial()}

						</tbody>
						{this.state.newbal >0 ?(
							<tbody>
								{this.renderCommercialExtra()}

							</tbody>

						):null}
						
						{/* <tr>
							<td className="item">1</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">2</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">3</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">4</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">5</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">6</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">7</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">8</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">9</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">10</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">11</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">12</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">13</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">14</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr>
						<tr>
							<td className="item">15</td>
							<td className="box"></td>
							<td className="content"></td>
							<td className="value"></td>
							<td className="symbol"></td>
							<td className="packed-by"></td>
						</tr> */}
					</table>

					<table className="common-table bordered-table mt-20 font-13 tl-fixed">
						<tr>
							<td colspan="4"><b>REMARKS / EXECPTIONS:</b></td>
						</tr>
						<tr>
							<td>CR REF – CREW REF</td>
							<td>L/C – LARGE CARTON</td>
							<td>M/C – MEDIUM CARTON</td>
							<td>S/C CARTON</td>
						</tr>
						<tr>
							<td>W - WRAPPING</td>
							<td>OC – ORIGINAL CARTON</td>
							<td>C - CASE</td>
							<td>OTH – OTHERS</td>
						</tr>
						<tr>
							<td colspan="4">“We have checked all the items listed and numbered 1 to {this.state.htmlData.length}  inclusive and acknowledge that is a true and complete list of goods tendered and of the state of goods received”</td>
						</tr>
					</table>
					<table className="common-table bordered-table mt-20 font-13">
						<tr>
							<td><b>AT<br /> ORIGIN</b></td>
							<td style={{verticalAlign:"bottom"}}><b>OWNER OF AUTHORIZED AGENT SIGNATURE</b></td>
							<td style={{verticalAlign:"bottom"}}><b>DATE</b></td>
							<td><b>AT<br /> DESTINATION</b></td>
							<td style={{verticalAlign:"bottom"}}><b>OWNER OF AUTHORIZED AGENT SIGNATURE</b></td>
							<td style={{verticalAlign:"bottom"}}><b>DATE</b></td>
						</tr>
					</table>

				</div>
			{/* ):null} */}

		    
		</div>

    );
  }
}

export default HHNInvoice;
