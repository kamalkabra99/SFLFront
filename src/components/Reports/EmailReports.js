import React, { Component } from "react";
import SalesLeadIcon from "@material-ui/icons/Assessment";
import Card from "components/Card/Card";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import cogoToast from "cogo-toast";
import api from "../../utils/apiClient";
import { CommonConfig } from "../../utils/constant";
import moment from "moment";
import zipcelx from "zipcelx";
import ReactTable from "react-table";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SimpleBackdrop from "../../utils/general";

const useStyles = () => makeStyles(styles);
const classes = useStyles();
var fileNameSet = "";

setInterval(() => {
    var currdate = new Date();
    fileNameSet =
      "EmailReport-" +
      currdate.getFullYear() +
      (currdate.getMonth() + 1) +
      currdate.getDate() +
      "-" +
      currdate.getHours() +
      currdate.getMinutes() +
      currdate.getSeconds();
    // console.log("FileName = ",fileNameSet)
  }, 1000);

class EmailReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StartDate: "",
      EndDate: "",
      SerachList: [],
      Loading: false,
      ToDateAllSales: "",
      FromDateAllSales: "",
      CountryList: [],
      selectedCountry: "",
      selectedCountryTo:"",
      LoginTypeValue:"",
      EmailProvidersStatusvalue:"",
      SFLStatusvalue:"",
      ModulesName: [
        { value: "Contact Us", label: "Contact Us" },
        { value: "CallBack", label: "CallBack" },
        { value: "SalesLead", label: "SalesLead" },
        { value: "Shipment", label: "Shipment" },
        { value: "Vendor", label: "Vendor" },
      ],

      EmailProvidersStatus: [
        { value: "bounced", label: "bounced" },
        { value: "clean", label: "clean" },
        { value: "catch-all", label: "catch-all" },
        { value: "role-based", label: "role-based" },
        { value: "bad-mx", label: "bad-mx" },
        { value: "suspicious", label: "suspicious" },
        { value: "timeout", label: "timeout" },
        { value: "unknown", label: "unknown" },
        { value: "invalid", label: "invalid" },
        { value: "spam-trap", label: "spam-trap" },
        { value: "rejected", label: "rejected" },
      ],
      SFLEmailStatus: [
        { value: "Active", label: "Active" },
        { value: "Complaints", label: "Complaints" },
        { value: "Hard Bounce", label: "Hard Bounce" },
        { value: "Unsubscribed", label: "Unsubscribed" },
        
      ],
    };
  }
  componentDidMount() {
    this.getCountry();
  }
  getCountry() {
    this.showLoader();
    try {
      api
        .get("location/getCountryList")
        .then((res) => {
          this.hideLoader();
          if (res.success) {
            var Country = res.data;
            this.setState({ CountryList: Country });
          }
        })
        .catch((err) => {
          console.log("err..", err);
        });
    } catch (error) {}
  }
  hideLoader = () => {
    this.setState({ Loading: false });
  };
  showLoader() {
    this.setState({ Loading: true });
  }
  dateChangeAllSales = (date, type) => {
    if (type === "FromDate") {
      this.setState({ FromDateAllSales: date });
    } else if (type === "ToDate") {
      this.setState({ ToDateAllSales: date });
    }
  };
  reset = () => {
    this.setState({ FromDateAllSales: "" });
    this.setState({ ToDateAllSales: "" });
    this.setState({
      ToDateAllSales: "",
      FromDateAllSales: "",
      SerachList: [],
      LoginTypeValue:"",
      EmailProvidersStatusvalue:"",
      SFLStatusvalue:"",
      selectedCountry: "",
      selectedCountryTo:"",
      // LoginTypeValue:"",
      StartDate: "",
      EndDate: "",
      
    });
    document.getElementById("Country").style.display = "none"
          document.getElementById("Country1").style.display = "none"
  };
  searchLeadShipmentReport = () => {
   
    try {
      let data = {
        FromDate: CommonConfig.isEmpty(this.state.FromDateAllSales)
          ? ""
          : moment(this.state.FromDateAllSales)
              .startOf("day")
              .format(CommonConfig.dateFormat.dbDateTime)
              .toString(),
        ToDate: CommonConfig.isEmpty(this.state.ToDateAllSales)
          ? ""
          : moment(this.state.ToDateAllSales)
              .endOf("day")
              .format(CommonConfig.dateFormat.dbDateTime)
              .toString(),
        ModuleName: this.state.LoginTypeValue.label,
        ProviderStatus: this.state.EmailProvidersStatusvalue.label?this.state.EmailProvidersStatusvalue.label:"",
        FromCountry: this.state.selectedCountry.value,
        ToCountry: this.state.selectedCountryTo.value,
        SFLStatus: this.state.SFLStatusvalue.label?this.state.SFLStatusvalue.label:"",      
      };
      debugger;
      if (data.FromDate === "" || data.ToDate === "") {
        return cogoToast.error("Please select From Date , To Date and Country");
      } 
      if(this.state.LoginTypeValue == ""){
        return cogoToast.error("Please select Module Name");
      }
      

      if(data.ModuleName == "SalesLead"){

        var conditions = ""

        
        if(data.FromCountry == undefined && data.ToCountry != undefined){
          conditions = "cu.`ToCountryID` = " + data.ToCountry
        }
        
        if(data.FromCountry != undefined && data.ToCountry ==undefined){
          conditions = "cu.`FromCountryID` = "+ data.FromCountry
        }

        if(data.FromCountry != undefined && data.ToCountry !=undefined){
          conditions = "cu.`FromCountryID` = "+ data.FromCountry + " AND cu.`ToCountryID` = " + data.ToCountry
        }

        if(data.FromCountry == undefined && data.ToCountry ==undefined){
          return cogoToast.error("Please select Sender or Receiver Country");
        }

        data.Conditions = conditions;



      }

      if(data.ModuleName == "Shipment"){

        var conditions = ""

        
        if(data.FromCountry == undefined && data.ToCountry != undefined){
          conditions = "cu1.`CountryID` = " + data.ToCountry
        }
        
        if(data.FromCountry != undefined && data.ToCountry ==undefined){
          conditions = "cu.`CountryID` = "+ data.FromCountry
        }

        if(data.FromCountry != undefined && data.ToCountry !=undefined){
          conditions = "cu.`CountryID` = "+ data.FromCountry + " AND cu1.`CountryID` = " + data.ToCountry
        }

        if(data.FromCountry == undefined && data.ToCountry ==undefined){
          return cogoToast.error("Please select Sender or Receiver Country");
        }

        data.Conditions = conditions;



      }

      this.showLoader();
      
      // else if(this.state.LoginTypeValue.label == "SalesLead" || this.state.LoginTypeValue.label == "Shipment"){
      //   if(this.state.selectedCountry == "" || this.state.selectedCountryTo){
      //     return cogoToast.error("Please select Sender and Receiver country");
      //   }
      // }
      
      // else {

        api
          .post("reports/GetEmailsReport", data)
          .then((res) => {
            debugger;

            if (res.success) {
                this.setState({ fileSetName: fileNameSet });
              this.setState({ SerachList: res.data[0] });

              this.hideLoader();
            } else {
              cogoToast.error("Something went wrong");
            }
          })
          .catch((err) => {
            this.hideLoader();
            cogoToast.error("Something went wrong");
            console.log("error...", err);
          });
      // }
    } catch (err) {
      this.hideLoader();
      console.log("error....", err);
      cogoToast.error("Something went wrong");
    }
  };

  selectChange = (event, value, type) => {
    debugger;
    if (value != null) {
      if (type === "FromCountry") {
        this.setState({ selectedCountry: value });
      }
      if (type === "ToCountry") {
        this.setState({ selectedCountryTo: value });
      }
      if(type === "ModulesName"){
        if(value.value == "Shipment"){
          document.getElementById("Country").style.display = "block"
          document.getElementById("Country1").style.display = "block"
        }
        else if(value.value == "SalesLead"){
          document.getElementById("Country").style.display = "block"
          document.getElementById("Country1").style.display = "block"
        }else{
          document.getElementById("Country").style.display = "none"
          document.getElementById("Country1").style.display = "none"
        }
        this.setState({ LoginTypeValue: value });

      }
      if(type === "ProviderStatus"){

        this.setState({ EmailProvidersStatusvalue: value });

      }
      if(type === "SFLStatus"){

        this.setState({ SFLStatusvalue: value });

      }
    }
  };
  render() {
    const ModulesName = this.state.ModulesName.map((x) => {
        return { value: x.value, label: x.label };
    });
    const EmailProvidersStatus
        = this.state.EmailProvidersStatus.map((x) => {
        return { value: x.value, label: x.label };
    });

    const SFLEmailStatus
        = this.state.SFLEmailStatus.map((x) => {
        return { value: x.value, label: x.label };
    });

    const { fileSetName,FromDateAllSales, ToDateAllSales, SerachList, selectedCountry,selectedCountryTo,LoginTypeValue,EmailProvidersStatusvalue,SFLStatusvalue } = this.state;
    const columnsSearch = [
      {
        Header: "Enter Date",
        id: "EnterDate",
        accessor: "EnterDate",
        width: 80,
      },
      {
        Header: "Name",
        accessor: "CustomerName",

        width: 220,
      },
      {
        Header: "Email Id",
        accessor: "Email",

        width: 220,
      },
      {
        Header: "Module",
        accessor: "Module",

        width: 80,
      },
      {
        Header: "Provider Status",
        
        accessor: "ProviderStatus",
        width: 100,
      },
      {
        Header: "From Country",
        
        accessor: "FromCountry",
        width: 100,
      },
      {
        Header: "To Country",
        accessor: "ToCountry",
        width: 100,
      },
    ];
    const CountryOption = this.state.CountryList.map((Country) => {
      return { value: Country.CountryID, label: Country.CountryName };
    });

    const handelExportToExcel = (evt) => {
        const headData = Object.keys(SerachList[0]).map((col) => ({
          value: col,
          type: "string",
        }));
        const bodyData = SerachList.map((item) =>
          Object.values(item).map((value) => ({
            value,
            type: typeof value,
          }))
        );
        const config = {
          filename: fileSetName,
          sheet: {
            data: [headData, ...bodyData],
            columns: headData.map((col) => ({ wch: 2000 })),
          },
        };
        console.log("hello = ", config);
        zipcelx(config);
      };
    return (
      <div>
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}
      <GridContainer justify="center" className="schedule-pickup-main-outer">
        <GridItem xs={12} sm={12}>
          <Card className="z-index-9">
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <SalesLeadIcon />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">
                Email Report
              </h4>
            </CardHeader>
            <CardBody>
              <div className="shipment-nav">
                <GridContainer>
                  <GridItem xs={12} sm={3} md={2} className="z-index-9">
                    <div className="date-spl">
                      <InputLabel className={classes.label}>
                        Start Date
                      </InputLabel>
                      <FormControl fullWidth>
                        <Datetime
                          dateFormat={"MM/DD/YYYY"}
                          timeFormat={false}
                          value={FromDateAllSales}
                          onChange={(date) =>
                            this.dateChangeAllSales(date, "FromDate")
                          }
                          closeOnSelect={true}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth />
                          )}
                        />
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={3} md={2} className="z-index-9">
                    <div className="date-spl">
                      <InputLabel className={classes.label}>
                        End Date
                      </InputLabel>
                      <FormControl fullWidth>
                        <Datetime
                          dateFormat={"MM/DD/YYYY"}
                          timeFormat={false}
                          value={ToDateAllSales}
                          onChange={(date) =>
                            this.dateChangeAllSales(date, "ToDate")
                          }
                          closeOnSelect={true}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth />
                          )}
                        />
                      </FormControl>
                    </div>
                  </GridItem>
                  <GridItem xs={12} sm={3} md={2} className="">
                    <Autocomplete
                      id="combo-box-demo"
                      options={ModulesName}
                      value={LoginTypeValue}
                      //   disabled={viewAllClear === false ? false : true}
                      onChange={(event, value) =>
                          this.selectChange(event, value, "ModulesName")
                      }
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                          <TextField {...params} label="Select Module" />
                      )}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={3} md={2} className="">
                    <Autocomplete
                      id="combo-box-demo"
                      options={EmailProvidersStatus}
                      value={EmailProvidersStatusvalue}
                      //   disabled={viewAllClear === false ? false : true}
                      onChange={(event, value) =>
                          this.selectChange(event, value, "ProviderStatus")
                      }
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                          <TextField {...params} label="Provider Status" />
                      )}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={3} md={2} className="">
                    <Autocomplete
                      id="combo-box-demo"
                      options={SFLEmailStatus}
                      value={SFLStatusvalue}
                      //   disabled={viewAllClear === false ? false : true}
                      onChange={(event, value) =>
                          this.selectChange(event, value, "SFLStatus")
                      }
                      getOptionLabel={(option) => option.label}
                      renderInput={(params) => (
                          <TextField {...params} label="SFL Status" />
                      )}
                    />
                  </GridItem>
                  
                  <GridItem>
                    <div className="right mt-20">
                     

                      <Button
                          justIcon
                          color="rose"
                          onClick={() => this.searchLeadShipmentReport()}
                      >
                          <i class="fa fa-search"></i>
                      </Button>

                      
                      <Button
                        justIcon
                        color="danger"
                        onClick={handelExportToExcel}
                        >
                        <i class="fas fa-download"></i>
                        </Button>

                        

                        <Button
                        justIcon
                          color="secondary"
                          onClick={() => this.reset()}
                      >
                          <i class="fa fa-sync"></i>
                      </Button>
                        
                        {/* <Button
                        color="secondary"
                        onClick={() => this.reset()}
                      >
                        Reset
                      </Button> */}
                    </div>
                  </GridItem>
                </GridContainer>
                <GridContainer >
                
                  <GridItem xs={12} sm={3} md={2} className="hide" id = "Country">
                    <Autocomplete
                      options={CountryOption}
                      id="FromCountry"
                      getOptionLabel={(option) =>
                        option.label ? option.label : option
                      }
                      autoComplete='disabled'
                      value={selectedCountry}
                      autoSelect
                      onChange={(event, value) =>
                        this.selectChange(event, value, "FromCountry")
                      }
                      inputProps={{
                        autoComplete: "disabled",
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={this.state.countryErr}
                          autoComplete='disabled'
                          helperText={this.state.countryHelperText}
                          label="Sender Country"
                          margin="normal"
                          fullWidth
                        />
                      )}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={3} md={2} className="hide" id = "Country1">
                    <Autocomplete
                      options={CountryOption}
                      id="ToCountry"
                      getOptionLabel={(option) =>
                        option.label ? option.label : option
                      }
                      autoComplete='disabled'
                      value={selectedCountryTo}
                      autoSelect
                      onChange={(event, value) =>
                        this.selectChange(event, value, "ToCountry")
                      }
                      inputProps={{
                        autoComplete: "disabled",
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          autoComplete='disabled'
                          error={this.state.countryErr}
                          helperText={this.state.countryHelperText}
                          label="Receiver Country"
                          margin="normal"
                          fullWidth
                        />
                      )}
                    />
                  </GridItem>
                  {/* </div> */}
                </GridContainer>
                {SerachList.length > 0 ? (
                  <GridContainer justify="center" className="mt-20">
                    <ReactTable
                      data={SerachList}
                      minRows={4}
                      filterable
                      pageText={
                        "Total rows : " +
                        this.state.SerachList.length +
                        "\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
                      }
                      defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                      resizable={false}
                      columns={columnsSearch}
                      defaultPageSize={10}
                      showPaginationBottom={true}
                      className="-striped -highlight all-account-react"
                    />
                  </GridContainer>
                ) : null}
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
    );
  }
}
export default EmailReports;
