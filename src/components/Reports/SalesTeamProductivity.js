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

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class SalesTeamProductivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StartDate: "",
      EndDate: "",
      SerachList: [],
      finalAmount: 0,
      finalLength: 0,
      Loading: false,
    };
  }

  setLength = (len) => {
    this.setState({ finalLength: len });
  };
  finalAmount = (amountData) => {
    let amount = 0;
    for (var j = 0; j < amountData.length; j++) {
      amount = amount + Number(amountData[j].Amount.replace("$", ""));
    }
    this.setState({
      finalAmount: parseFloat(amount).toFixed(2),
    });
  };

  checkProps = (e) => {
    if (this.state.finalLength !== e.sortedData.length) {
      this.setLength(e.sortedData.length);
      this.finalAmount(e.sortedData);
    }
    return "";
  };

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
  searchSalesLeadproductivity = () => {
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
      };
      api
        .post("reports/GetSalesLeadProductivityReport", data)
        .then((res) => {
          debugger;

          if (res.success) {
            const arrayOfObjects = res.data[0].map((obj) => {
              // Find corresponding objects in other arrays based on id
              const objFrom2 = res.data[1].find(
                (item) => item.UserID === obj.UserID
              );
              const objFrom3 = res.data[2].find(
                (item) => item.UserID === obj.UserID
              );
              const objFrom4 = res.data[3].find(
                (item) => item.UserID === obj.UserID
              );
              // Create a new object with combined properties

              return {
                UserID: obj.UserID,
                Name: obj.Name,
                SalesLead: obj.SalesLeads,
                Shipments: objFrom2 ? objFrom2.Shipments : 0,
                PaymentReceived: objFrom3
                  ? "$ " + objFrom3.PaymentRecived == null
                    ? 0
                    : "$ " + objFrom3.PaymentRecived
                  : "$ " + 0,
                AllClear: objFrom4 ? "$ " + objFrom4.AllClear : "$ " + 0,
                Conversion:
                  parseFloat(
                    (objFrom2.Shipments / obj.SalesLeads) * 100
                  ).toFixed(2) + " %",
              };
            });

            // this.state.SerachList.push(arrayOfObjects);
            // this.state.SerachList = arrayOfObjects;
            this.setState({ SerachList: arrayOfObjects });
            console.log("res....", this.state.SerachList);
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
    } catch (err) {
      this.hideLoader();
      console.log("error....", err);
      cogoToast.error("Something went wrong");
    }
  };
  resetCommissionAllSales = () => {
    this.setState({
      StartDate: "",
      EndDate: "",
    });
  };

  render() {
    const {
      StartDate,
      EndDate,
      SerachList,
      finalAmount,
      finalLength,
    } = this.state;
    const columnsSearch = [
      {
        Header: "Name",
        id: "Name",
        accessor: "Name",
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
        accessor: "Conversion",
        width: 100,
      },
      {
        Header: "Payment received",
        accessor: "PaymentReceived",
        width: 80,
      },
      {
        Header: "Sales Clear",
        accessor: "AllClear",
        width: 100,
      },
    ];
    return (
      <GridContainer justify="center" className="schedule-pickup-main-outer">
        <GridItem xs={12} sm={12}>
          <Card className="z-index-9">
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <SalesLeadIcon />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">
                Sales Team Productivity
              </h4>
            </CardHeader>
            <CardBody>
              <div className="shipment-nav">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4} className="z-index-9">
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
                  <GridItem xs={12} sm={12} md={4} className="z-index-9">
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
                  <GridItem>
                    <div className="right">
                      <Button
                        color="secondary"
                        // onClick={() => this.resetCommissionAllSales()}
                      >
                        Reset
                      </Button>
                      <Button
                        color="rose"
                        onClick={() => this.searchSalesLeadproductivity()}
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
                      minRows={2}
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
                      className=" -striped -highlight"
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
export default SalesTeamProductivity;
