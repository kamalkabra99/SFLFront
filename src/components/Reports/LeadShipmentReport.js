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
import ReactTable from "react-table";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class LeadShipmentReport extends Component {
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
    this.setState({
      ToDateAllSales: "",
      FromDateAllSales: "",
      SerachList: [],
    });
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
        CountryID: this.state.selectedCountry
          ? this.state.selectedCountry.value
          : "",
      };
      debugger;
      if (data.FromDate === "" || data.ToDate === "" || data.CountryID === "") {
        return cogoToast.error("Please select From Date , To Date and Country");
      } else {
        api
          .post("reports/GetLeadShipmenReport", data)
          .then((res) => {
            debugger;

            if (res.success) {
              const arrayOfObjects = res.data[0].map((obj) => {
                // Find corresponding objects in other arrays based on id
                const objFrom2 = res.data[1].find(
                  (item) => item.CountryID === obj.CountryID
                );

                return {
                  CountryID: obj.CountryID,
                  CountryName: obj.CountryName,
                  SalesLead: obj.SalesLead,
                  Shipments: objFrom2 ? objFrom2.Shipment : 0,
                  Conversion: objFrom2
                    ? parseFloat(
                        (objFrom2.Shipment / obj.SalesLead) * 100
                      ).toFixed(2) + "%"
                    : 0 + "%",
                };
              });

              this.setState({ SerachList: arrayOfObjects });

              // this.hideLoader();
            } else {
              cogoToast.error("Something went wrong");
            }
          })
          .catch((err) => {
            this.hideLoader();
            cogoToast.error("Something went wrong");
            console.log("error...", err);
          });
      }
    } catch (err) {
      this.hideLoader();
      console.log("error....", err);
      cogoToast.error("Something went wrong");
    }
  };

  selectChangeTab1 = (event, value, type) => {
    debugger;
    if (value != null) {
      if (type === "Country") {
        this.setState({ selectedCountry: value });
      }
    }
  };
  render() {
    const { StartDate, EndDate, SerachList, selectedCountry } = this.state;
    const columnsSearch = [
      {
        Header: "CountryName",
        id: "CountryName",
        accessor: "CountryName",
        width: 150,
      },
      {
        Header: "Sales Lead",
        accessor: "SalesLead",

        width: 90,
      },
      {
        Header: "Shipment",
        accessor: "Shipments",

        width: 100,
      },
      {
        Header: "Conversion",
        sortMethod: (a, b) => {
          return CommonConfig.percentageSortMethod(a, b);
        },
        accessor: "Conversion",
        width: 100,
      },
    ];
    const CountryOption = this.state.CountryList.map((Country) => {
      return { value: Country.CountryID, label: Country.CountryName };
    });
    return (
      <GridContainer justify="center" className="schedule-pickup-main-outer">
        <GridItem xs={12} sm={12}>
          <Card className="z-index-9">
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <SalesLeadIcon />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">
                Lead v/s Shipment Report
              </h4>
            </CardHeader>
            <CardBody>
              <div className="shipment-nav">
                <GridContainer>
                  <GridItem xs={12} sm={3} md={4} className="z-index-9">
                    <div className="date-spl">
                      <InputLabel className={classes.label}>
                        Start Date
                      </InputLabel>
                      <FormControl fullWidth>
                        <Datetime
                          dateFormat={"MM/DD/YYYY"}
                          timeFormat={false}
                          value={StartDate}
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
                  <GridItem xs={12} sm={3} md={3} className="z-index-9">
                    <div className="date-spl">
                      <InputLabel className={classes.label}>
                        End Date
                      </InputLabel>
                      <FormControl fullWidth>
                        <Datetime
                          dateFormat={"MM/DD/YYYY"}
                          timeFormat={false}
                          value={EndDate}
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
                  <GridItem xs={12} sm={3} md={3} className="z-index-9">
                    <Autocomplete
                      options={CountryOption}
                      id="ToCountry"
                      getOptionLabel={(option) =>
                        option.label ? option.label : option
                      }
                      value={selectedCountry}
                      autoSelect
                      onChange={(event, value) =>
                        this.selectChangeTab1(event, value, "Country")
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={this.state.countryErr}
                          helperText={this.state.countryHelperText}
                          label="Sender Country"
                          margin="normal"
                          fullWidth
                        />
                      )}
                    />
                  </GridItem>
                  <GridItem>
                    <div className="right mt-20">
                      <Button
                        color="rose"
                        onClick={() => this.searchLeadShipmentReport()}
                      >
                        Search
                      </Button>
                    </div>
                  </GridItem>
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
    );
  }
}
export default LeadShipmentReport;
