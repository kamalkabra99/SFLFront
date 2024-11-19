import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import moment from "moment";
import GridItem from "components/Grid/GridItem.js";
import api from "../../utils/apiClient";
import { CommonConfig } from "../../utils/constant";
import cogoToast from "cogo-toast";
import SimpleBackdrop from "../../utils/general";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CustomInput from "components/CustomInput/CustomInput.js";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Icon from "@material-ui/core/Icon";
import { FormHelperText } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import zipcelx from "zipcelx";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class ShipmentNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Navigation
      Steps: [
        {
          stepName: "Shipment",
          stepId: "shipment",
          classname: "active",
        },
        {
          stepName: "My Shipment",
          stepId: "myshipment",
          classname: "inactive",
        },
        {
          stepName: "Search",
          stepId: "search",
          classname: "inactive",
        },
      ],

      //Shipment List
      Loading: false,
      serviceValue: [],
      filterProps: [],
      previousFilterList: [],
      sortProps: [],
      previousSortList: [],
      shipmentList: [],
      Access: [],
      loggedUser: 0,
      finalLength: 0,
      shipmentstatusList: [],
      mainselectdropdown: [],
      searchType: "",
      LoginpersonId: "",
      checkServiceName: false,
      checksubServiceName: false,
      checkfromstate: false,
      checkfromcity: false,
      checktostate: false,
      checktocity: false,
      fileSetName:
        "Shipment Report" + moment().format(CommonConfig.dateFormat.filename),
      shiptype: "",
      sendstate: "",
      SenderCityList: [],
      SenderStateList: [],
      ReceiverStateList: [],
      ReceiverCityList: [],
      Receiverstate: "",
      //Search Shipment
      shipmentType: [
        { label: "Air", value: "Air" },
        { label: "Ocean", value: "Ocean" },
        { label: "Ground", value: "Ground" },
      ],
      allClearlist: [
        { label: "No", value: 0 },
        { label: "Not Ready", value: "IS NULL" },
        { label: "Ready for Yes", value: 3 },
        { label: "Collection", value: 4 },
        { label: "Yes", value: 1 },
      ],
      managedby: [],
      CountryList: [],
      selectField: [],
      searchField: [],
      selectFilter: [],
      filter: {
        field: "",
        error: false,
        fielderror: false,
        filtererror: false,
        fieldhelperText: "",
        filterhelperText: "",
        helperText: "",
        filter: "",
        condition: "",
        filterValue: "",
        Index: 1,
      },
      filtered: [],
      checkdata: "",
      checkAll: false,
      serachshowhide: false,
      UserName: "",
      currentLogin: {},
      checkUserName: false,
      ManagedByList: [],
      ManagedBy: "",
      ShipmentTypeList: [],
      ShipmentType: "",
      ServiceNameList: [],
      ServiceName: "",
      SubServiceNameList: [],
      SubServiceName: "",
      StatusList: [],
      ShipmentStatus: [],
      AllClearStatusList: [],
      AllClear: "",
      expand: false,
      StatusQuery: "",
      SearchAccess: [],
      SearchList: [],
      SearchClicked: false,
      searchfinalLength: 0,

      // My Shipment
      IsDropDownShow: false,
      myshipmentserviceValue: [],
      myshipmentfilterProps: [],
      myshipmentpreviousFilterList: [],
      myshipment: [],
      myshipmentpreviousSortList: [],
      myshipmentshipmentList: [],
      myshipmentAccess: [],
      myshipmentfinalLength: 0,
      myshipmentstatusList: [],
      shipmentquery: "",
    };
  }

  async componentDidMount() {
    this.setState({
      Access: CommonConfig.getUserAccess("Shipment"),
      loggedUser: CommonConfig.loggedInUserData().PersonID,
      myshipmentAccess: CommonConfig.getUserAccess("Shipment"),
      SearchAccess: CommonConfig.getUserAccess("Search Shipment"),
      checkUserName:
        CommonConfig.getUserAccess("Search Shipment").AllAccess === 1
          ? false
          : true,
      currentLogin: {
        value: CommonConfig.loggedInUserData().PersonID,
        label: CommonConfig.loggedInUserData().Name,
      },
      LoginpersonId: CommonConfig.loggedInUserData().PersonID,
    });
    let APIcheck = true;
    if (
      this.props.history.location.state !== undefined &&
      this.props.history.location.state !== null
    ) {
      if (this.props.history.location.state.type === "MyShipment") {
        this.showHide("myshipment");
      } else {
        this.showHide();
      }
    } else {
      this.showHide();
    }
    await this.getManagedBy();
    await this.getShipmentType();
    await this.getStatusList();
    await this.getAllClearStatus();
    if (
      this.props.history.location.state !== undefined &&
      this.props.history.location.state !== null
    ) {
      if (this.props.history.location.state.type === "Shipment") {
        this.setState({
          previousFilterList: this.props.history.location.state.filterlist,
          shipmentstatusList: this.props.history.location.state
            .shipmentstatusList,
          previousSortList: this.props.history.location.state.sortlist,
        });
        this.shipmentStatusChange(
          "",
          this.props.history.location.state.shipmentstatusList,
          "Shipment"
        );
        APIcheck = false;
      }
    } else {
      var finalSort = {
        id: "ShipmentDate",
        desc: true,
      };

      this.setState({ previousSortList: [finalSort] });
    }
    let myAPIcheck = true;
    this.setState({
      checkdata: [
        {
          value: "New Request",
          label: "New Request",
          IsSelected: true,
          Index: 1,
        },
      ],
    });
    this.getShipmentListByStatus("Shipment");
    if (APIcheck) {
      let newFilter = [{ label: "New Request", value: "New Request" }];
      this.shipmentStatusChange("", newFilter, "Shipment");
      this.getShipmentListByStatus("Shipment");
    }
    if (
      this.props.history.location.state !== undefined &&
      this.props.history.location.state !== null
    ) {
      if (this.props.history.location.state.type === "MyShipment") {
        this.setState({
          myshipmentpreviousFilterList: this.props.history.location.state
            .myfilterlist,
          myshipmentstatusList: this.props.history.location.state
            .myshipmentstatusList,
          myshipmentpreviousSortList: this.props.history.location.state
            .mysortlist,
        });
        this.shipmentStatusChange(
          "",
          this.props.history.location.state.myshipmentstatusList,
          "Myshipment"
        );
        myAPIcheck = false;
      }
    } else {
      var finalSort = {
        id: "ShipmentDate",
        desc: true,
      };

      this.setState({ myshipmentpreviousSortList: [finalSort] });
    }
    if (myAPIcheck) {
      this.setState({
        checkdata: `All`,
      });
      let allFilter = [{ label: "New Request", value: "New Request" }];
      this.shipmentStatusChange("", allFilter, "Myshipment");
      this.getShipmentListByStatus("Myshipment");
    }
    await this.getStringMap();
    await this.getCountry();
    await this.managedby();
    await this.getFilterlist();
    //this.showHide();
    this.setState({ filtered: [this.state.filter] });
  }
  // Shipment Methods
  getShipmentList() {
    this.showLoader();
    try {
      api
        .get("scheduleshipment/getShipmentList")
        .then((res) => {
          this.setState({ Loading: false });
          if (res.success) {
            if (this.state.Access.AllAccess === 1) {
              this.setState({ shipmentList: res.data });
            } else {
              let shipmentList = res.data.filter(
                (x) => x.ManagedBy === this.state.loggedUser
              );
              this.setState({ shipmentList: shipmentList });
            }
          } else {
            cogoToast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {}
  }

  editShipment = (record) => {
    const { history } = this.props;
    debugger;
    console.log("this.state.filterProps = ", this.state.filterProps);
    console.log(
      "this.state.shipmentstatusList = ",
      this.state.shipmentstatusList
    );

    console.log("this.state.sortProps = ", this.state.sortProps);
    if (
      CommonConfig.getUserAccess("Shipment").AllAccess ||
      Number(record.original.ManagedBy) ===
        Number(CommonConfig.loggedInUserData().PersonID)
    ) {
    debugger;
        history.push({
          pathname: "ShipmentNew",
          state: {
            ShipppingID: record.original.ShippingID,
            filterlist: this.state.filterProps,
            type: "Shipment",
            shipmentstatusList: this.state.shipmentstatusList,
            sortlist: this.state.sortProps,
          },
        });
    } else {
        cogoToast.error("You don't have access to this record.");
      }
  };

  filterMethod = (event, value) => {
    this.setState({ serviceValue: value });
  };

  setFilterProps = (filterValue) => {
    console.log("filterValue = ", filterValue);
    this.setState({
      filterProps: filterValue.filtered,
      sortProps: filterValue.sorted,
    });
  };

  filterProps = (e) => {
    if (this.state.filterProps !== e.filtered) {
      this.setFilterProps(e);
    }
    if (this.state.sortProps !== e.sorted) {
      this.setFilterProps(e);
    }
    return "";
  };

  setLength = (len) => {
    this.setState({ finalLength: len });
  };

  checkProps = (e) => {
    if (this.state.finalLength !== e.sortedData.length) {
      this.setLength(e.sortedData.length);
    }
    return "";
  };

  shipmentStatusChange = (e, value, type) => {
    if (value !== null) {
      if (type === "Shipment") {
        if (value.length !== 0) {
          let query = "";
          this.state.shipmentquery = "";
          let StatusQuery = "";
          let allValue = value.filter((x) => x.value === "All");
          if (allValue.length !== 0) {
            StatusQuery = `All`;
            query = query + StatusQuery;
            this.state.shipmentquery = this.state.shipmentquery + StatusQuery;
          } else {
            for (var j = 0; j < value.length; j++) {
              if (j === 0) {
                if (value.length === 1) {
                  StatusQuery =
                    ` AND ( sm.ShipmentStatus = "` + value[j].value + `")`;
                } else {
                  StatusQuery =
                    ` AND ( sm.ShipmentStatus = "` + value[j].value + `"`;
                }
              } else if (j + 1 === value.length) {
                StatusQuery =
                  ` OR sm.ShipmentStatus = "` + value[j].value + `")`;
              } else {
                StatusQuery =
                  ` OR sm.ShipmentStatus = "` + value[j].value + `"`;
              }
              query = query + StatusQuery;
              this.state.shipmentquery = this.state.shipmentquery + StatusQuery;
            }
          }
        }
        if (value.length !== 0) {
          let allValue = value.filter((x) => x.value === "All");
          if (allValue.length !== 0) {
            var dataset = this.state.StatusList.filter(
              (x) => x.value !== "All"
            );
            this.setState({ shipmentstatusList: dataset });
          } else {
            this.setState({ shipmentstatusList: value });
          }
        } else {
          this.setState({ shipmentstatusList: value, shipmentquery: "" });
        }
      } else if (type === "Myshipment") {
        if (value.length !== 0) {
          let query = "";
          this.state.shipmentquery = "";
          let StatusQuery = "";
          var dataset = "";
          let allValue = value.filter((x) => x.value === "All");
          if (allValue.length !== 0) {
            StatusQuery = `All`;
            query = query + StatusQuery;
            this.state.shipmentquery = this.state.shipmentquery + StatusQuery;
          } else {
            for (var j = 0; j < value.length; j++) {
              if (j === 0) {
                if (value.length === 1) {
                  StatusQuery =
                    ` AND ( sm.ShipmentStatus = "` + value[j].value + `")`;
                } else {
                  StatusQuery =
                    ` AND ( sm.ShipmentStatus = "` + value[j].value + `"`;
                }
              } else if (j + 1 === value.length) {
                StatusQuery =
                  ` OR sm.ShipmentStatus = "` + value[j].value + `")`;
              } else {
                StatusQuery =
                  ` OR sm.ShipmentStatus = "` + value[j].value + `"`;
              }
              query = query + StatusQuery;
              this.state.shipmentquery = this.state.shipmentquery + StatusQuery;
            }
          }
        }
        if (value.length !== 0) {
          let allValue = value.filter((x) => x.value === "All");
          if (allValue.length !== 0) {
            var dataset = this.state.StatusList.filter(
              (x) => x.value !== "All"
            );
            this.setState({ myshipmentstatusList: dataset });
          } else {
            this.setState({ myshipmentstatusList: value });
          }
        } else {
          this.setState({ myshipmentstatusList: value, shipmentquery: "" });
        }
      }
    }
  };

  getShipmentListByStatus = (type) => {
    debugger;
    try {
      let Query = "";
      let inputdata = this.state.checkdata;
      if (inputdata === "All") {
        Query = inputdata;
      } else if (inputdata.length === 1) {
        Query = ` AND ( sm.ShipmentStatus = "` + inputdata[0].value + `")`;
      } else {
        for (var j = 0; j < inputdata.length; j++) {
          if (j === 0) {
            Query = ` AND ( sm.ShipmentStatus = "` + inputdata[j].value + `"`;
          } else {
            Query =
              Query + ` OR  sm.ShipmentStatus = "` + inputdata[j].value + `"`;
          }
        }
        if (!CommonConfig.isEmpty(Query)) {
          Query = Query + `)`;
        }
      }
      let data = {
        ContactName: "",
        ContactNumber: "",
        Email: "",
        TrackingNumber: "",
        CardNumber: "",
        AccountNumber: "",
        ConfirmationNumber: "",
        Amount: "",
        LoginID:
          type === "Myshipment" ? CommonConfig.loggedInUserData().LoginID : "",
        IsLike: 0,
        AllClear: "",
        ManagedBy: "",
        ShipmentType: "",
        ServiceName: "",
        SubServiceName: "",
        ShipmentDate: "",
        ShipmentStatus: CommonConfig.isEmpty(Query) ? "" : Query,
      };
      this.showLoader();
      api
        .post("reports/getShipmentReport", data)
        .then((res) => {
          this.hideLoader();
          if (res.success === true) {
            debugger;
            if (type === "Shipment") {
              if (this.state.Access.AllAccess === 1) {
                this.setState({ shipmentList: res.data[0] });
              } else {
                let shipmentList = res.data[0].filter(
                  (x) => x.ManagedBy === this.state.loggedUser
                );
                this.setState({ shipmentList: shipmentList });
              }
            } else {
              this.setState({ myshipmentshipmentList: res.data[0] });
            }
          } else {
            cogoToast.error("Something went wrong");
          }
        })
        .catch((err) => {
          this.hideLoader();
          cogoToast.error("Something went wrong 2");
        });
    } catch (err) {
      cogoToast.error("Something went wrong 3");
    }
    //}
  };

  // Search Shipment

  toggle = (e) => {
    this.setState({
      expand: !this.state.expand,
    });
  };

  showLoader() {
    this.setState({ Loading: true });
  }

  getAllClearStatus() {
    try {
      let data = {
        stringMapType: "ALLCLEARSTATUS",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          this.setState({ AllClearStatusList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }
  hideLoader() {
    this.setState({ Loading: false });
  }
  getManagedBy() {
    try {
      api
        .get("scheduleshipment/getShipmentManagedBy")
        .then((res) => {
          if (res.success) {
            for (var j = 0; j < res.data.length; j++) {
              this.state.ManagedByList.push(res.data[j]);
            }
          }
        })
        .catch((err) => {
          cogoToast.error("Something went wrong");
          console.log(err);
        });
    } catch (err) {
      cogoToast.error("Something went wrong");
      console.log(err);
    }
  }

  getShipmentType() {
    try {
      let data = {
        stringMapType: "SHIPMENTTYPE",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          this.setState({ ShipmentTypeList: result.data });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      cogoToast.error("Something went wrong");
      console.log(err);
    }
  }

  getServiceByShipmentType(serviceType) {
    try {
      let data = {
        ServiceType: serviceType,
      };
      api
        .post("userManagement/getServiceByShipmentType", data)
        .then((result) => {
          if (result.success) {
            this.setState({
              ServiceNameList: result.data,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getSubserviceName(ServiceName, ShipmentType) {
    try {
      let data = {
        ServiceName: ServiceName,
        ServiceType: ShipmentType,
      };
      api
        .post("userManagement/getSubserviceName", data)
        .then((result) => {
          if (result.success) {
            this.setState({
              SubServiceNameList: result.data,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getStatusList = () => {
    try {
      let data = {
        stringMapType: "SHIPMENTSTATUS",
      };
      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          const statusList = result.data.map((type) => {
            return { value: type.Description, label: type.Description };
          });
          var i = 0;
          statusList.map((OBJ) => {
            OBJ.IsSelected = false;
            OBJ.Index = i;
            i++;
            return OBJ;
          });
          statusList
            .filter((x) => x.value === "New Request")
            .map((OBJ) => {
              OBJ.IsSelected = true;
              return OBJ;
            });
          this.setState({ StatusList: statusList });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };

  selectChange = (event, value, type) => {
    if (value !== null) {
      if (type === "ManagedBy") {
        this.setState({ ManagedBy: value });
      } else if (type === "ShipmentType") {
        this.setState({
          ShipmentType: value,
          ServiceName: "",
          SubServiceName: "",
          ServiceNameList: [],
          SubServiceNameList: [],
        });
        this.getServiceByShipmentType(value.value);
      } else if (type === "ServiceName") {
        this.setState({
          ServiceName: value,
          SubServiceName: "",
          SubServiceNameList: [],
        });
        this.getSubserviceName(value.value, this.state.ShipmentType.value);
      } else if (type === "SubServiceName") {
        this.setState({ SubServiceName: value });
      } else if (type === "ShipmentStatus") {
        let allValue = value.filter((x) => x.value === "All");
        var dataset;
        if (value.length !== 0) {
          let query = "";
          this.state.shipmentquery = "";
          let StatusQuery = "";
          let allValue = value.filter((x) => x.value === "All");
          if (allValue.length !== 0) {
            StatusQuery = `All`;
            query = query + StatusQuery;
            this.state.shipmentquery = this.state.shipmentquery + StatusQuery;
          } else {
            for (var j = 0; j < value.length; j++) {
              if (j === 0) {
                if (value.length === 1) {
                  StatusQuery =
                    ` AND ( sm.ShipmentStatus = "` + value[j].value + `")`;
                } else {
                  StatusQuery =
                    ` AND ( sm.ShipmentStatus = "` + value[j].value + `"`;
                }
              } else if (j + 1 === value.length) {
                StatusQuery =
                  ` OR sm.ShipmentStatus = "` + value[j].value + `")`;
              } else {
                StatusQuery =
                  ` OR sm.ShipmentStatus = "` + value[j].value + `"`;
              }
              query = query + StatusQuery;
              this.state.shipmentquery = this.state.shipmentquery + StatusQuery;
            }
          }
          // this.setState({ StatusQuery: query });
          this.setState({ StatusQuery: this.state.shipmentquery });
          if (value.length !== 0) {
            let allValue = value.filter((x) => x.value === "All");
            if (allValue.length !== 0) {
              dataset = this.state.StatusList.filter((x) => x.value !== "All");
            }
          }
        } else {
          this.setState({ ShipmentStatus: [], shipmentquery: "" });
        }
        if (allValue.length !== 0) {
          this.setState({ ShipmentStatus: dataset });
        } else {
          this.setState({ ShipmentStatus: value, shipmentquery: "" });
        }
      }
    }
  };

  samefilter = () => {
    let IsValid = true;
    let filterLength;
    var sameFilter = this.state.filtered;

    for (var i = 0; i < sameFilter.length; i++) {
      if (
        sameFilter[i].field !== "ManagedBy" &&
        sameFilter[i].field !== "FromCountryID" &&
        sameFilter[i].field !== "ToCountryID"
      ) {
        filterLength = this.state.filtered.filter(
          (x) =>
            x.filterValue === sameFilter[i].filterValue &&
            x.filter === sameFilter[i].filter &&
            x.field === sameFilter[i].field
        ).length;
      } else {
        filterLength = this.state.filtered.filter(
          (x) =>
            x.filterValue.value === sameFilter[i].filterValue.value &&
            x.filter === sameFilter[i].filter &&
            x.field === sameFilter[i].field
        ).length;
      }
    }

    if (filterLength >= 2) {
      IsValid = false;
    } else {
      IsValid = true;
    }
    return IsValid;
  };

  validatenewSearcch = () => {
    var finalFilterList = this.state.filtered;
    let IsValid = true;
    if (this.state.checkdata.length === 0) {
      IsValid = false;
    } else {
      for (var i = 0; i < finalFilterList.length; i++) {
        if (
          !CommonConfig.isEmpty(finalFilterList[i]["field"]) &&
          !CommonConfig.isEmpty(finalFilterList[i]["filter"])
        ) {
          if (finalFilterList[i]["field"] === "sm.ShipmentDate") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please select Lead Date";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }

          if (finalFilterList[i]["field"] === "ContactName") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please enter Name";
            } else if (finalFilterList[i]["filterValue"].length < 4) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] =
                "Please enter atleast 4 character";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }

          if (finalFilterList[i]["field"] === "PhoneNumber") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please enter Phone Number";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }

          if (finalFilterList[i]["field"] === "Email") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please enter Email ID";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }

          if (finalFilterList[i]["field"] === "ManagedBy") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please select managed by";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }

          if (finalFilterList[i]["field"] === "FromState") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please enter From State";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }

          if (finalFilterList[i]["field"] === "ToState") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please enter To State";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }

          if (finalFilterList[i]["field"] === "FromZipCode") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please enter From Zip";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }

          if (finalFilterList[i]["field"] === "ToCity") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please enter To City";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }

          if (finalFilterList[i]["field"] === "ToZipCode") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please enter To Zip";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }

          if (finalFilterList[i]["field"] === "ToCountryID") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please select Country";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }

          if (finalFilterList[i]["field"] === "FromCountryID") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please select Country";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }

          if (finalFilterList[i]["field"] === "PackageType") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please enter Content Type";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }

          if (finalFilterList[i]["field"] === "FromCity") {
            if (CommonConfig.isEmpty(finalFilterList[i]["filterValue"])) {
              IsValid = false;
              finalFilterList[i]["error"] = true;
              finalFilterList[i]["helperText"] = "Please enter From City";
            } else {
              IsValid = true;
              finalFilterList[i]["error"] = false;
              finalFilterList[i]["helperText"] = "";
            }
          }
        } else {
          if (CommonConfig.isEmpty(finalFilterList[i]["field"])) {
            IsValid = false;
            finalFilterList[i]["fielderror"] = true;
            finalFilterList[i]["fieldhelperText"] = "Please select one field";
          }
          if (CommonConfig.isEmpty(finalFilterList[i]["filter"])) {
            IsValid = false;
            finalFilterList[i]["filtererror"] = true;
            finalFilterList[i]["filterhelperText"] = "Please select one filter";
          }
        }
      }
    }
    this.setState({ fitered: finalFilterList });
    return IsValid;
  };
  getSearchResults = (params) => {
    let Query = "";
    let inputdata = this.state.checkdata;
    if (inputdata === "All") {
      Query = inputdata;
    } else if (inputdata.length === 1) {
      Query = ` AND ( sm.ShipmentStatus = "` + inputdata[0].value + `")`;
    } else {
      for (var j = 0; j < inputdata.length; j++) {
        if (j === 0) {
          Query = ` AND (sm.ShipmentStatus = "` + inputdata[j].value + `"`;
        } else {
          Query =
            Query + ` OR  sm.ShipmentStatus = "` + inputdata[j].value + `"`;
        }
      }
      if (!CommonConfig.isEmpty(Query)) {
        Query = Query + `)`;
      }
    }

    let data = {
      whereClause: params,
      ptype: this.state.searchType,
      ShipmentStatus: CommonConfig.isEmpty(Query) ? "" : Query,
    };
    console.log("lokeeeeeeeeee",data);
    this.setState({ Loading: true });
    api
      .post("reports/getSearchShipment", data)
      .then((result) => {
        if (result.success) {
          this.setState({ Loading: false });
          this.setState({ SearchList: result.data });
        } else {
          this.setState({ Loading: false });
          cogoToast.error("Something went wrong");
        }
      })
      .catch((err) => {
        cogoToast.error("Something Went Wrong");
      });
  };

  handelExportToExcel = (evt) => {
    const newlist = this.state.SearchList.map(({ ManagedBy, ...rest }) => rest);
    if (newlist.length > 0) {
      const headData = Object.keys(newlist[0]).map((col) => ({
        value: col,
        type: "string",
      }));

      const bodyData = newlist.map((item) =>
        Object.values(item).map((value) => ({
          value,
          type: typeof value,
        }))
      );
      const config = {
        filename: this.state.fileSetName,
        sheet: {
          data: [headData, ...bodyData],
          columns: headData.map((col) => ({ wch: 2000 })),
        },
      };
      zipcelx(config);
    } else {
      cogoToast.error("Search Shipment to be downloaded");
    }
  };

  search = () => {
    if (this.validatenewSearcch()) {
      debugger
      if (this.samefilter()) {
        var filterList = this.state.filtered.map((filter) => {
          var obj = {};
          if( filter.field.value == "sm.AllClear"){
            if(filter.filterValue.value !="IS NULL"){
              obj.columnname = 'IFNULL('+filter.field.value+',"")';
            }
          }
          
          
        else
        obj.columnname = filter.field.value;
          obj.condition = filter.filter.label;
          obj.conditionoperator = filter.filter.value;
          debugger;
          if (filter.filterValue.value || filter.filterValue.value === 0) {
            obj.value = filter.filterValue.value;
          } else {
            obj.value = filter.filterValue;
          }

          return obj;
        });

        this.setState({ SearchFinalFilter: filterList });
        console.log("filterList= ",filterList)
        var FinalStr = "";
        var operator = "AND";
        for (var i = 0; i < filterList.length; i++) {
          if (
            !(
              filterList[i]["columnname"] === "sm.ShipmentDate" &&
              (filterList[i]["condition"] === "Start With" ||
                filterList[i]["condition"] === "Ends With")
            )
          ) {
            debugger
            if (filterList[i]["condition"] === "Start With") {
              if (i === 0) {
                if (filterList[i]["columnname"] === "sm.ShipmentDate") {
                  FinalStr =
                    FinalStr +
                    "date(" +
                    filterList[i]["columnname"] +
                    ") " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "%'";
                } else if (
                  filterList[i]["columnname"] === "spr.ConfirmationNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    "(" +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "%'" +
                    " OR " +
                    " " +
                    "spi.ConfirmationNumber" +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "%')";
                } else if (
                  filterList[i]["columnname"] === "std.TrackingNumber"
                ) {
                  debugger
                  FinalStr =
                    FinalStr +
                    "(" +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "%'" +
                    " OR " +
                    " " +
                    "stm.TrackingID" +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "%')";
                } else {
                  FinalStr =
                    FinalStr +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "%'";
                }
              } else {
                if (filterList[i]["columnname"] === "sm.ShipmentDate") {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    " " +
                    "date(" +
                    filterList[i]["columnname"] +
                    ") " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "%" +
                    "'";
                } else if (
                  filterList[i]["columnname"] === "spr.ConfirmationNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    "(" +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "%'" +
                    " OR " +
                    " " +
                    "spi.ConfirmationNumber" +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "%')";
                } else if (
                  filterList[i]["columnname"] === "std.TrackingNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    "(" +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "%'" +
                    " OR " +
                    " " +
                    "stm.TrackingID" +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "%')";
                } else {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    " " +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "%" +
                    "'";
                }
              }
            } else if (filterList[i]["condition"] === "Ends With") {
              if (i === 0) {
                if (filterList[i]["columnname"] === "sm.ShipmentDate") {
                  FinalStr =
                    FinalStr +
                    "date(" +
                    filterList[i]["columnname"] +
                    ") " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    "%" +
                    filterList[i]["value"] +
                    "'";
                } else if (
                  filterList[i]["columnname"] === "spr.ConfirmationNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    "(" +
                    filterList[i]["columnname"] +
                    " '" +
                    filterList[i]["conditionoperator"] +
                    "%" +
                    filterList[i]["value"] +
                    "'" +
                    " OR " +
                    " " +
                    "spi.ConfirmationNumber" +
                    " '" +
                    filterList[i]["conditionoperator"] +
                    "%" +
                    filterList[i]["value"] +
                    "')";
                } else if (
                  filterList[i]["columnname"] === "std.TrackingNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    "(" +
                    filterList[i]["columnname"] +
                    " '" +
                    filterList[i]["conditionoperator"] +
                    "%" +
                    filterList[i]["value"] +
                    "'" +
                    " OR " +
                    " " +
                    "stm.TrackingID" +
                    " '" +
                    filterList[i]["conditionoperator"] +
                    "%" +
                    filterList[i]["value"] +
                    "')";
                } else {
                  FinalStr =
                    FinalStr +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    "%" +
                    filterList[i]["value"] +
                    "'";
                }
              } else {
                if (filterList[i]["columnname"] === "sm.ShipmentDate") {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    " " +
                    "date(" +
                    filterList[i]["columnname"] +
                    ") " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    "%" +
                    filterList[i]["value"] +
                    "'";
                } else if (
                  filterList[i]["columnname"] === "spr.ConfirmationNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    "('" +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    "%" +
                    filterList[i]["value"] +
                    "'" +
                    " OR " +
                    " " +
                    "spi.ConfirmationNumber" +
                    " '" +
                    filterList[i]["conditionoperator"] +
                    "%" +
                    filterList[i]["value"] +
                    "')";
                } else if (
                  filterList[i]["columnname"] === "std.TrackingNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    "('" +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    "%" +
                    filterList[i]["value"] +
                    "'" +
                    " OR " +
                    " " +
                    "stm.TrackingID" +
                    " '" +
                    filterList[i]["conditionoperator"] +
                    "%" +
                    filterList[i]["value"] +
                    "')";
                } else {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    " " +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    "%" +
                    filterList[i]["value"] +
                    "'";
                }
              }
            } else if (filterList[i]["condition"] === "Contains") {
              if (i === 0) {
                if (filterList[i]["columnname"] === "sm.ShipmentDate") {
                  FinalStr =
                    FinalStr +
                    "date(" +
                    filterList[i]["columnname"] +
                    ") " +
                    filterList[i]["conditionoperator"] +
                    " '%" +
                    filterList[i]["value"] +
                    "%'";
                } else if (
                  filterList[i]["columnname"] === "spr.ConfirmationNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    " " +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '%" +
                    filterList[i]["value"] +
                    "%'" +
                    " OR " +
                    " " +
                    "spi.ConfirmationNumber" +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '%" +
                    filterList[i]["value"] +
                    "%'";
                } else if (
                  filterList[i]["columnname"] === "std.TrackingNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    "(" +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '%" +
                    filterList[i]["value"] +
                    "%'" +
                    " OR " +
                    " " +
                    "stm.TrackingID" +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '%" +
                    filterList[i]["value"] +
                    "%')";
                } else {
                  FinalStr =
                    FinalStr +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '%" +
                    filterList[i]["value"] +
                    "%'";
                }
              } else {
                if (filterList[i]["columnname"] === "sm.ShipmentDate") {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    " " +
                    "date(" +
                    filterList[i]["columnname"] +
                    ") " +
                    filterList[i]["conditionoperator"] +
                    " '%" +
                    filterList[i]["value"] +
                    "%'";
                } else if (
                  filterList[i]["columnname"] === "spr.ConfirmationNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    " " +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '%" +
                    filterList[i]["value"] +
                    "%'" +
                    " OR " +
                    " " +
                    "spi.ConfirmationNumber" +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '%" +
                    filterList[i]["value"] +
                    "%'";
                } else if (
                  filterList[i]["columnname"] === "std.TrackingNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    "(" +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '%" +
                    filterList[i]["value"] +
                    "%'" +
                    " OR " +
                    " " +
                    "stm.TrackingID" +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '%" +
                    filterList[i]["value"] +
                    "%')";
                } else {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    " " +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '%" +
                    filterList[i]["value"] +
                    "%'";
                }
              }
            } else {
              debugger;
              console.log("is equallllll 111");
              if (i === 0) {
                console.log("is equallllll");
                if (filterList[i]["columnname"] === "sm.ShipmentDate") {
                  FinalStr =
                    FinalStr +
                    "date(" +
                    filterList[i]["columnname"] +
                    ") " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "'";
                } else if (
                  filterList[i]["columnname"] === "spr.ConfirmationNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    "(" +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "'" +
                    " OR " +
                    " " +
                    "spi.ConfirmationNumber" +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "')";
                } else if (
                  filterList[i]["columnname"] === "std.TrackingNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    "(" +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "'" +
                    " OR " +
                    " " +
                    "stm.TrackingID" +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "')";
                } else if (
                  filterList[i]["columnname"] === "sm.AllClear" &&
                  filterList[i]["value"] === "IS NULL"
                ) {
                  debugger;
                  FinalStr = FinalStr + "sm.AllClear IS NULL";
                } else {
                  debugger;
                  FinalStr =
                    FinalStr +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "'";
                }
              } else {
                debugger; //kruti
                if (filterList[i]["columnname"] === "sm.ShipmentDate") {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    " " +
                    "date(" +
                    filterList[i]["columnname"] +
                    ") " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "'";
                } else if (
                  filterList[i]["columnname"] === "sm.AllClear" &&
                  filterList[i]["value"] === "IS NULL"
                ) {
                  debugger;
                  FinalStr =
                    FinalStr + " " + operator + " " + "sm.AllClear IS NULL";
                } else if (
                  filterList[i]["columnname"] === "spr.ConfirmationNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    "(" +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " " +
                    filterList[i]["value"] +
                    " " +
                    " OR " +
                    " " +
                    "spi.ConfirmationNumber" +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " " +
                    filterList[i]["value"] +
                    ")";
                } else if (
                  filterList[i]["columnname"] === "std.TrackingNumber"
                ) {
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    "(" +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "' " +
                    " OR " +
                    " " +
                    "stm.TrackingID" +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "')";
                } else {
                  debugger;
                  FinalStr =
                    FinalStr +
                    " " +
                    operator +
                    " " +
                    filterList[i]["columnname"] +
                    " " +
                    filterList[i]["conditionoperator"] +
                    " '" +
                    filterList[i]["value"] +
                    "'";
                }
              }
            }
          } else {
            debugger;
            if (filterList[i]["condition"] === "Start With") {
              filterList[i]["conditionoperator"] = ">=";
            }

            if (filterList[i]["condition"] === "Ends With") {
              filterList[i]["conditionoperator"] = "<=";
            }

            if (i === 0) {
              debugger;
              if (filterList[i]["columnname"] === "sm.ShipmentDate") {
                FinalStr =
                  FinalStr +
                  "date(" +
                  filterList[i]["columnname"] +
                  ") " +
                  filterList[i]["conditionoperator"] +
                  " '" +
                  filterList[i]["value"] +
                  "'";
              } else if (
                filterList[i]["columnname"] === "spr.ConfirmationNumber"
              ) {
                FinalStr =
                  FinalStr +
                  "(" +
                  filterList[i]["columnname"] +
                  " " +
                  filterList[i]["conditionoperator"] +
                  " '" +
                  filterList[i]["value"] +
                  "'" +
                  " OR " +
                  " " +
                  "spi.ConfirmationNumber" +
                  " " +
                  filterList[i]["conditionoperator"] +
                  " '" +
                  filterList[i]["value"] +
                  "')";
              } else if (filterList[i]["columnname"] === "std.TrackingNumber") {
                FinalStr =
                  FinalStr +
                  "(" +
                  filterList[i]["columnname"] +
                  " " +
                  filterList[i]["conditionoperator"] +
                  " '" +
                  filterList[i]["value"] +
                  "'" +
                  " OR " +
                  " " +
                  "stm.TrackingID" +
                  " " +
                  filterList[i]["conditionoperator"] +
                  " '" +
                  filterList[i]["value"] +
                  "')";
                debugger;
              } else {
                FinalStr =
                  FinalStr +
                  filterList[i]["columnname"] +
                  " " +
                  filterList[i]["conditionoperator"] +
                  " '" +
                  filterList[i]["value"] +
                  "'";
              }
            } else {
              debugger;
              if (filterList[i]["columnname"] === "sm.ShipmentDate") {
                FinalStr =
                  FinalStr +
                  " " +
                  operator +
                  " " +
                  "date(" +
                  filterList[i]["columnname"] +
                  ") " +
                  filterList[i]["conditionoperator"] +
                  " '" +
                  filterList[i]["value"] +
                  "'";
              } else if (
                filterList[i]["columnname"] === "spr.ConfirmationNumber"
              ) {
                FinalStr =
                  FinalStr +
                  "(" +
                  operator +
                  " " +
                  filterList[i]["columnname"] +
                  " " +
                  filterList[i]["conditionoperator"] +
                  " '" +
                  filterList[i]["value"] +
                  "'" +
                  " OR " +
                  " " +
                  "spi.ConfirmationNumber" +
                  " " +
                  filterList[i]["conditionoperator"] +
                  " '" +
                  filterList[i]["value"] +
                  "')";
              } else if (filterList[i]["columnname"] === "std.TrackingNumber") {
                FinalStr =
                  FinalStr +
                  " " +
                  operator +
                  "(" +
                  filterList[i]["columnname"] +
                  " " +
                  filterList[i]["conditionoperator"] +
                  " '" +
                  filterList[i]["value"] +
                  "'" +
                  " OR " +
                  " " +
                  "stm.TrackingID" +
                  " " +
                  filterList[i]["conditionoperator"] +
                  " '" +
                  filterList[i]["value"] +
                  "')";
              } else {
                FinalStr =
                  FinalStr +
                  " " +
                  operator +
                  " " +
                  filterList[i]["columnname"] +
                  " " +
                  filterList[i]["conditionoperator"] +
                  " '" +
                  filterList[i]["value"] +
                  "'";
              }
            }
          }
        }

        this.setState({
          searchFilterValue: "All",
          isEdit: false,
          SearchClicked: true,
        });
        this.getSearchResults(FinalStr);
      } else {
        cogoToast.error(
          "There were found same filters.Please check and modify"
        );
      }
    } else {
      if (this.state.checkdata.length === 0) {
        cogoToast.error("Please select shipment status");
      } else {
        cogoToast.error("Please correct error and resubmit form");
      }
    }
  };
  viewShipment = (ShippingID) => {
    const { history } = this.props;
    history.push({
      pathname: "ShipmentNew",
      state: {
        ShipppingID: ShippingID,
        filterlist: [],
        sortlist: [],
      },
    });
  };
  reset = () => {
    const filterlist = this.state.filtered;
    filterlist[0]["field"] = "";
    filterlist[0]["filter"] = "";
    filterlist[0]["error"] = false;
    filterlist[0]["fieldhelperText"] = "";
    filterlist[0]["filterhelperText"] = "";
    filterlist[0]["helperText"] = "";
    filterlist[0]["fielderror"] = false;
    filterlist[0]["filtererror"] = false;
    filterlist[0]["filterValue"] = "";
    filterlist.splice(1, filterlist.length);
    this.setState({
      filtered: filterlist,
      searchFilterValue: "New",
      isEdit: true,
      SearchClicked: false,
      SearchSalesLeadList: [],
    });
    localStorage.removeItem("SearchCount");
    if (CommonConfig.getUserAccess("Search Shipment") === 0) {
      this.setState({ AllAccess: 0 });
    }
  };
  searchShipmentlen = (len) => {
    this.setState({ searchfinalLength: len });
  };

  searchCheckProps = (e) => {
    if (this.state.searchfinalLength !== e.sortedData.length) {
      this.searchShipmentlen(e.sortedData.length);
    }
    return "";
  };
  // My Shipment Methods
  myshipmentgetShipmentList() {
    try {
      let data = {
        LoginID: CommonConfig.loggedInUserData().PersonID,
      };
      api
        .post("scheduleshipment/getMyShipmentList", data)
        .then((res) => {
          this.setState({ Loading: false });
          if (res.success) {
            this.setState({ myshipmentshipmentList: res.data });
          } else {
            cogoToast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {}
  }
  editMyShipment = (record) => {
    const { history } = this.props;
    history.push({
      pathname: "MyShipmentNew",
      state: {
        ShipppingID: record.original.ShippingID,
        myfilterlist: this.state.myshipmentfilterProps,
        type: "MyShipment",
        myshipmentstatusList: this.state.myshipmentstatusList,
        mysortlist: this.state.myshipment,
      },
    });
  };

  myshipmentfilterMethod = (event, value) => {
    this.setState({ myshipmentserviceValue: value });
  };

  myshipmentsetFilterProps = (filterValue) => {
    this.setState({
      myshipmentfilterProps: filterValue.filtered,
      myshipment: filterValue.sorted,
    });
  };

  myshipmentfilterProps = (e) => {
    if (this.state.myshipmentfilterProps !== e.filtered) {
      this.myshipmentsetFilterProps(e);
    }
    if (this.state.myshipment !== e.sorted) {
      this.myshipmentsetFilterProps(e);
    }
    return "";
  };

  myshipmentsetLength = (len) => {
    this.setState({ myshipmentfinalLength: len });
  };

  myshipmentcheckProps = (e) => {
    if (this.state.myshipmentfinalLength !== e.sortedData.length) {
      this.myshipmentsetLength(e.sortedData.length);
    }
    return "";
  };

  // Navigation Methods
  navigateChange = (key) => {
    let stepsList = this.state.Steps;
    let activeIndex = stepsList.findIndex((x) => x.classname === "active");
    if (key !== activeIndex) {
      stepsList[key]["classname"] = "active";
      stepsList[activeIndex]["classname"] = "inactive";

      this.setState({
        Steps: stepsList,
        checkdata: [],
        checkAll: false,
      });
      let divID = stepsList[key]["stepId"];
      if (divID === "myshipment") {
        this.state.StatusList.map((OBJ) => {
          OBJ.IsSelected = true;
          return OBJ;
        });
      } else if (divID === "shipment") {
        this.state.StatusList.filter((x) => x.value !== "New Request").map(
          (OBJ) => {
            OBJ.IsSelected = false;
            return OBJ;
          }
        );
        this.state.StatusList.filter((x) => x.value === "New Request").map(
          (OBJ) => {
            OBJ.IsSelected = true;
            return OBJ;
          }
        );
      } else {
        this.state.StatusList.map((OBJ) => {
          OBJ.IsSelected = false;
          return OBJ;
        });
      }
      let activeDiv = stepsList[activeIndex]["stepId"];
      document.getElementById(divID).style.display = "block";
      document.getElementById(activeDiv).style.display = "none";
    }
  };

  showHide = (type) => {
    if (
      CommonConfig.getUserAccess("Search Shipment") &&
      CommonConfig.getUserAccess("Shipment") &&
      CommonConfig.getUserAccess("My Shipment")
    ) {
      if (
        CommonConfig.getUserAccess("Search Shipment").ReadAccess === 1 &&
        CommonConfig.getUserAccess("Shipment").ReadAccess === 1 &&
        CommonConfig.getUserAccess("My Shipment").ReadAccess === 1
      ) {
        if (CommonConfig.isEmpty(type)) {
          document.getElementById("shipment").style.display = "block";
          document.getElementById("search").style.display = "none";
          document.getElementById("myshipment").style.display = "none";
        } else {
          let stepsList = this.state.Steps;
          let index = stepsList.findIndex((x) => x.stepId === type);
          let activeIndex = stepsList.findIndex(
            (x) => x.classname === "active"
          );
          stepsList[activeIndex]["classname"] = "inactive";
          stepsList[index]["classname"] = "active";
          for (var j = 0; j < stepsList.length; j++) {
            if (j !== index) {
              document.getElementById(stepsList[j]["stepId"]).style.display =
                "none";
            }
            if (j === index) {
              document.getElementById(stepsList[j]["stepId"]).style.display =
                "block";
            }
          }
        }
      }
      if (CommonConfig.getUserAccess("Search Shipment").ReadAccess === 0) {
        let currentSteps = this.state.Steps;
        let index = this.state.Steps.findIndex((x) => x.stepId === "search");
        currentSteps.splice(index, 1);
        currentSteps[0]["classname"] = "active";
        document.getElementById(currentSteps[0]["stepId"]).style.display =
          "block";
        for (var j = 1; j < currentSteps.length; j++) {
          document.getElementById(currentSteps[j]["stepId"]).style.display =
            "none";
        }
        this.setState({ Steps: currentSteps });
        document.getElementById("search").style.display = "none";
      }
      if (CommonConfig.getUserAccess("Shipment").ReadAccess === 0) {
        let currentSteps = this.state.Steps;
        let index = this.state.Steps.findIndex((x) => x.stepId === "shipment");
        currentSteps.splice(index, 1);
        currentSteps[0]["classname"] = "active";
        document.getElementById(currentSteps[0]["stepId"]).style.display =
          "block";
        for (var j = 1; j < currentSteps.length; j++) {
          document.getElementById(currentSteps[j]["stepId"]).style.display =
            "none";
        }
        this.setState({ Steps: currentSteps });
        document.getElementById("shipment").style.display = "none";
      }
      if (CommonConfig.getUserAccess("My Shipment").ReadAccess === 0) {
        let currentSteps = this.state.Steps;
        let index = this.state.Steps.findIndex(
          (x) => x.stepId === "myshipment"
        );
        currentSteps.splice(index, 1);
        currentSteps[0]["classname"] = "active";
        document.getElementById(currentSteps[0]["stepId"]).style.display =
          "block";
        for (var j = 1; j < currentSteps.length; j++) {
          document.getElementById(currentSteps[j]["stepId"]).style.display =
            "none";
        }
        this.setState({ Steps: currentSteps });
        document.getElementById("myshipment").style.display = "none";
      }
    }
  };

  searchrenderInputMethod = (params) => {
    return <TextField {...params} label="Shipment Status" variant="outlined" />;
  };

  renderOption = (option) => {
    let selectedValue =
      this.state.ShipmentStatus.findIndex((x) => x.value === option.value) !==
      -1
        ? true
        : false;
    return (
      <React.Fragment>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selectedValue}
        />
        {option.label}
      </React.Fragment>
    );
  };

  shipmentrenderOption = (option) => {
    let selectedValue =
      this.state.shipmentstatusList.findIndex(
        (x) => x.value === option.value
      ) !== -1
        ? true
        : false;
    return (
      <React.Fragment>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selectedValue}
        />
        {option.label}
      </React.Fragment>
    );
  };

  myshipmentrenderOption = (option) => {
    let selectedValue =
      this.state.myshipmentstatusList.findIndex(
        (x) => x.value === option.value
      ) !== -1
        ? true
        : false;
    return (
      <React.Fragment>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selectedValue}
        />
        {option.label}
      </React.Fragment>
    );
  };

  optionProps = (option, value) => {
    if (option.value === value.value) {
      return true;
    } else {
      return false;
    }
  };

  shipmentrenderInputMethod = (params) => {
    return <TextField {...params} label="Shipment Status" variant="outlined" />;
  };

  myshipmentrenderInputMethod = (params) => {
    return <TextField {...params} label="Shipment Status" variant="outlined" />;
  };

  showSearchFilter = (type) => {
    this.setState({ IsDropDownShow: false });
    this.getShipmentListByStatus(type); // "Shipment"
  };

  closedropdown = (e) => {
    this.setState({ IsDropDownShow: false });
  };

  handleCheckboxChange = (e, record, type) => {
    let checkedArr = this.state.StatusList;
    if (type !== "All") {
      checkedArr
        .filter((x) => x.value === "All")
        .map((OBJ) => {
          OBJ.IsSelected = false;
          return OBJ;
        });
      checkedArr[record.Index]["IsSelected"] = e.target.checked;
      this.setState({
        checkAll: e.target.checked,
        //StatusList[0].IsSelected:true
      });
      let previousList = checkedArr.filter((x) => x.IsSelected === true);
      let arrType = "previousSelected" + this.state.chatlist;
      this.setState({ checkdata: previousList });
      this.state.shipmentquery = this.state.checkdata;
      this.state.StatusQuery = this.state.checkdata;
      this.setState({
        Type: checkedArr,
        [arrType]: previousList,
      });
    } else {
      this.setState({ shipmentquery: "" });
      checkedArr.map((OBJ) => {
        OBJ.IsSelected = e.target.checked;
        return OBJ;
      });
      this.state.shipmentquery = this.state.StatusQuery;
      this.setState({
        checkAll: e.target.checked,
      });
      let previousList = checkedArr.filter((x) => x.IsSelected === true);
      let arrType = "previousSelectedStatusList";
      if (previousList.length === 0) {
        this.state.checkdata = "";
      } else {
        this.state.checkdata = `All`;
      }
      this.setState({
        StatusList: checkedArr,
        [arrType]: previousList,
        StatusQuery: this.state.shipmentquery,
      });
    }
  };
  //New search by kruti
  getFilterlist = () => {
    let data = { stringMapType: "SEARCHSALESLEADFILTER" };
    api
      .post("stringMap/getstringMap", data)
      .then((result) => {
        if (result.success) {
          const filterObj = result.data.map((filter) => {
            return { label: filter.Description, value: filter.StringMapName };
          });
          this.setState({ selectFilter: filterObj });
        } else {
          cogoToast.error("Something Went Wrong");
        }
      })
      .catch((err) => {
        cogoToast.error("Something Went Wrong");
      });
  };
  //jsk

  getStringMap = () => {
    let data = { stringMapType: "SEARCHSHIPMENTFIELD" };
    api
      .post("stringMap/getstringMap", data)
      .then((result) => {
        if (result.success) {
          const mainfieldObj = result.data.map((field) => {
            return { label: field.Description, value: field.StringMapName };
          });
          this.setState({ mainselectdropdown: mainfieldObj });

          const fieldObj = result.data
            .filter(
              (field) =>
                field.StringMapName !== "sm.ServiceName" &&
                field.StringMapName !== "sm.SubServiceName"
            )
            .map((field) => {
              return { label: field.Description, value: field.StringMapName };
            });
          this.setState({ selectField: fieldObj, searchField: fieldObj });
        } else {
          cogoToast.error("Something Went Wrong");
        }
      })
      .catch((err) => {
        cogoToast.error("Something Went Wrong");
      });
  };
  getCountry = () => {
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
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {
      cogoToast.error("Something Went Wrong");
    }
  };
  managedby = () => {
    try {
      api
        .get("salesLead/getManageSalesLeadUser")
        .then((result) => {
          if (result.success) {
            this.setState({ managedby: result.Data });
          } else {
            cogoToast.error("Something went wrong");
          }
        })
        .catch((err) => {
          cogoToast.error("Something Went Wrong");
        });
    } catch (err) {
      cogoToast.error("Something Went Wrong");
    }
  };

  requestChange = (event, idx) => {
    if (
      event.target.value === "pay.AccountNumber" ||
      event.target.value === "pay.CardNumber"
    ) {
      this.setState({ searchType: "payment" });
    }
    const { name, value } = event.target;
    const filterlist = this.state.filtered;
    for (var i = 0; i < filterlist.length; i++) {
      filterlist[i]["error"] = false;
      filterlist[i]["helperText"] = "";
      filterlist[i]["fielderror"] = false;
      filterlist[i]["fieldhelperText"] = "";
      filterlist[i]["filtererror"] = false;
      filterlist[i]["filterhelperText"] = "";
    }
    if (name === "field") {
      filterlist[idx][name] = value;
      filterlist[idx]["filterValue"] = "";
      filterlist[idx]["filter"] = "";
      filterlist[idx]["error"] = false;
      filterlist[idx]["helperText"] = "";
    } else {
      filterlist[idx][name] = value;
    }
    this.setState({ filtered: filterlist });
  };
  onchnageselectfield = (event, type, val, idx) => {
    debugger;
    if (
      event.target.value === "pay.AccountNumber" ||
      val.value === "pay.CardNumber"
    ) {
      this.setState({ searchType: "payment" });
    }
    const filterlist = this.state.filtered;
    for (var i = 0; i < filterlist.length; i++) {
      filterlist[i]["error"] = false;
      filterlist[i]["helperText"] = "";
      filterlist[i]["fielderror"] = false;
      filterlist[i]["fieldhelperText"] = "";
      filterlist[i]["filtererror"] = false;
      filterlist[i]["filterhelperText"] = "";
    }
    if (type === "field") {
      filterlist[idx][type] = val;
      filterlist[idx]["error"] = false;
      filterlist[idx]["helperText"] = "";
    } else {
      filterlist[idx][type] = val;
    }
    this.setState({ filtered: filterlist });
  };

  addnewFilter = () => {
    var filterList = this.state.filtered;
    var k = 0;
    for (var i = 0; i < filterList.length; i++) {
      if (CommonConfig.isEmpty(filterList[i]["field"])) {
        filterList[i]["fielderror"] = true;
        filterList[i]["fieldhelperText"] = "Please select one field";
        k++;
      }
      if (CommonConfig.isEmpty(filterList[i]["filter"])) {
        filterList[i]["filtererror"] = true;
        filterList[i]["filterhelperText"] = "Please select one filter";
        k++;
      }
      if (CommonConfig.isEmpty(filterList[i]["filterValue"])) {
        filterList[i]["error"] = true;
        filterList[i]["helperText"] = "Please enter value";
        k++;
      }
    }

    if (k === 0) {
      const filterNew = {
        field: "",
        filter: "",
        error: false,
        helperText: "",
        filterValue: "",
        Index: this.state.filtered.length + 1,
      };
      this.setState({ filtered: [...this.state.filtered, filterNew] });
    } else {
      this.setState({ filtered: filterList });
      cogoToast.error("Please fill above filter first.");
    }

    debugger;
    const obj = this.state.filtered;
    console.log("filterdddd", obj);
    for (var i = 0; i < obj.length; i++) {
      if (
        obj[i].field.value === "saf.CountryID" &&
        this.state.checkfromstate === false
      ) {
        const fieldObj = [...this.state.selectField];
        fieldObj.push({ label: "Sender State", value: "saf.State" });
        fieldObj.push({ label: "Sender City", value: "saf.City" });
        fieldObj.sort(function(a, b) {
          var labelA = a.label.toLowerCase();
          var labelB = b.label.toLowerCase();

          if (labelA < labelB) {
            return -1;
          }
          if (labelA > labelB) {
            return 1;
          }
          return 0;
        });
        this.setState({
          selectField: fieldObj,
          searchField: fieldObj,
          checkfromstate: true,
        });
      }
      //  else if (
      //   obj[i].field.value === "saf.CountryID" &&
      //   this.state.checkfromcity === false
      // ) {
      //   const fieldObj = [...this.state.selectField];
      //   fieldObj.push({ label: "Sender City", value: "saf.City" });
      //   fieldObj.sort(function(a, b) {
      //     var labelA = a.label.toLowerCase();
      //     var labelB = b.label.toLowerCase();

      //     if (labelA < labelB) {
      //       return -1;
      //     }
      //     if (labelA > labelB) {
      //       return 1;
      //     }
      //     return 0;
      //   });
      //   this.setState({
      //     selectField: fieldObj,
      //     searchField: fieldObj,
      //     checkfromcity: true,
      //   });
      // }

      if (
        obj[i].field.value === "sat.CountryID" &&
        this.state.checktostate === false
      ) {
        const fieldObj = [...this.state.selectField];
        fieldObj.push({ label: "Receiver State", value: "sat.State" });
        fieldObj.push({ label: "Receiver City", value: "sat.City" });
        fieldObj.sort(function(a, b) {
          var labelA = a.label.toLowerCase();
          var labelB = b.label.toLowerCase();

          if (labelA < labelB) {
            return -1;
          }
          if (labelA > labelB) {
            return 1;
          }
          return 0;
        });
        this.setState({
          selectField: fieldObj,
          searchField: fieldObj,
          checktostate: true,
        });
      }
      // else if (
      //   obj[i].field.value === "sat.CountryID" &&
      //   this.state.checktocity === false
      // ) {
      //   const fieldObj = [...this.state.selectField];
      //   fieldObj.push({ label: "Receiver City", value: "sat.City" });
      //   fieldObj.sort(function(a, b) {
      //     var labelA = a.label.toLowerCase();
      //     var labelB = b.label.toLowerCase();

      //     if (labelA < labelB) {
      //       return -1;
      //     }
      //     if (labelA > labelB) {
      //       return 1;
      //     }
      //     return 0;
      //   });
      //   this.setState({
      //     selectField: fieldObj,
      //     searchField: fieldObj,
      //     checktocity: true,
      //   });
      // }
      if (
        obj[i].field.value === "sm.AllClear" &&
        this.state.checkServiceName === false
      ) {
        const fieldObj = [...this.state.selectField];
        console.log("field/////", fieldObj);
        let shipmentList = fieldObj.filter((x) => x.value !== "sm.AllClear");
        this.setState({ selectField: shipmentList, searchField: shipmentList });
      }
      if (
        obj[i].field.value === "sm.ShipmentType" &&
        this.state.checkServiceName === false
      ) {
        const fieldObj = [...this.state.selectField];
        fieldObj.push({ label: "Service Type", value: "sm.ServiceName" });
        fieldObj.sort(function(a, b) {
          var labelA = a.label.toLowerCase();
          var labelB = b.label.toLowerCase();

          if (labelA < labelB) {
            return -1;
          }
          if (labelA > labelB) {
            return 1;
          }
          return 0;
        });
        this.setState({
          selectField: fieldObj,
          searchField: fieldObj,
          checkServiceName: true,
        });
      } else if (
        obj[i].field.value === "sm.ShipmentType" &&
        this.state.checkServiceName === true &&
        this.state.checksubServiceName === false
      ) {
        const fieldObj = [...this.state.selectField];
        fieldObj.push({
          label: "Sub Service Type",
          value: "sm.SubServiceName",
        });
        fieldObj.sort(function(a, b) {
          var labelA = a.label.toLowerCase();
          var labelB = b.label.toLowerCase();

          if (labelA < labelB) {
            return -1;
          }
          if (labelA > labelB) {
            return 1;
          }
          return 0;
        });
        this.setState({
          selectField: fieldObj,
          searchField: fieldObj,
          checksubServiceName: true,
        });
      }
    }
  };
  filterDelete = (Index) => {
    const filterList = this.state.filtered;
    filterList.splice(Index, 1);
    this.setState({ filtered: filterList });
  };

  managedBY = (event, type, idx, value) => {
    const filterlist = this.state.filtered;
    filterlist[idx][type] = value;
    filterlist[idx]["error"] = false;
    filterlist[idx]["helperText"] = "";
    this.setState({ filtered: filterlist });
  };
  shipmentType = (event, type, idx, value) => {
    const filterList = this.state.filtered;
    filterList[idx][type] = value;
    filterList[idx]["error"] = false;
    filterList[idx]["helperText"] = "";
    this.setState({ filtered: filterList });
    for (var i = 0; i < this.state.filtered.length; i++) {
      if (
        this.state.filtered[i].field.value === "sm.ServiceName" ||
        this.state.filtered[i].field.value === "sm.SubServiceName"
      ) {
        this.state.filtered[i].filterValue = "";
      }
    }
    this.setState({
      ServiceNameList: [],
      SubServiceNameList: [],
      shiptype: value.value,
    });

    this.getServiceByShipmentType(value.value);
  };
  ServiceName = (event, type, idx, value) => {
    const filterList = this.state.filtered;
    filterList[idx][type] = value;
    filterList[idx]["error"] = false;
    filterList[idx]["helperText"] = "";
    this.setState({ filtered: filterList });
    for (var i = 0; i < this.state.filtered.length; i++) {
      if (this.state.filtered[i].field.value === "sm.SubServiceName") {
        this.state.filtered[i].filterValue = "";
      }
    }
    this.setState({ SubServiceNameList: [] });
    this.getSubserviceName(value.value, this.state.shiptype);
  };
  SubServiceName = (event, type, idx, value) => {
    const filterList = this.state.filtered;
    filterList[idx][type] = value;
    filterList[idx]["error"] = false;
    filterList[idx]["helperText"] = "";
    this.setState({ filtered: filterList });
  };
  ReceiverCountry = (event, type, idx, value) => {
    const filterList = this.state.filtered;
    filterList[idx][type] = value;
    filterList[idx]["error"] = false;
    filterList[idx]["helperText"] = "";
    this.setState({ filtered: filterList });
    debugger;
    this.setState({
      ReceiverStateList: [],
      ReceiverCityList: [],
      Receiverstate: value.value,
    });

    this.getStates(value.value, "receiver");
  };
  getStates(countryData, type) {
    try {
      let data = {
        countryId: countryData,
      };
      debugger;
      api
        .post("location/getStateList", data)
        .then((res) => {
          if (res.success) {
            this.showLoader();
            if (type === "sender") {
              this.setState({
                SenderStateList: res.data,
              });
            } else {
              this.setState({
                ReceiverStateList: res.data,
              });
              console.log("recceeee", this.state.ReceiverStateList);
            }
            this.hideLoader();
          }
        })
        .catch((err) => {
          this.hideLoader();
          console.log("err...", err);
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {
      this.hideLoader();
    }
  }

  SenderCountry = (event, type, idx, value) => {
    const filterList = this.state.filtered;
    filterList[idx][type] = value;
    filterList[idx]["error"] = false;
    filterList[idx]["helperText"] = "";
    this.setState({ filtered: filterList });
    debugger;
    this.setState({
      SenderStateList: [],
      SenderCityList: [],
      sendstate: value.value,
    });

    this.getStates(value.value, "sender");
  };
  SenderState = (event, type, idx, value) => {
    const filterList = this.state.filtered;
    filterList[idx][type] = value;
    filterList[idx]["error"] = false;
    filterList[idx]["helperText"] = "";
    this.setState({ filtered: filterList });
  };
  ReceiverState = (event, type, idx, value) => {
    const filterList = this.state.filtered;
    filterList[idx][type] = value;
    filterList[idx]["error"] = false;
    filterList[idx]["helperText"] = "";
    this.setState({ filtered: filterList });
  };
  allClearchange = (event, type, idx, value) => {
    const filterList = this.state.filtered;
    filterList[idx][type] = value;
    filterList[idx]["error"] = false;
    filterList[idx]["helperText"] = "";
    this.setState({ filtered: filterList });
  };
  handleLeadDate = (date, idx, type) => {
    const filterlist = this.state.filtered;
    filterlist[idx]["error"] = false;
    filterlist[idx]["helperText"] = "";
    filterlist[idx][type] = moment(date).format(
      CommonConfig.dateFormat.dbDateTime
    );
    this.setState({ filtered: filterlist });
  };
  
  filterRow = () => {
    return this.state.filtered.map((selectfield, idx) => {
      const allClear = this.state.allClearlist.map((check) => {
        return { value: check.value, label: check.label };
      });
      const managedby = this.state.ManagedByList.map((managedby) => {
        return { value: managedby.UserID, label: managedby.Name };
      });
      const shipmentType = this.state.shipmentType.map((content) => {
        return { value: content.value, label: content.label };
      });
      const ServiceName = this.state.ServiceNameList.map((content) => {
        return {
          value: content.MainServiceName,
          label: content.MainServiceName,
        };
      });
      const SubServiceName = this.state.SubServiceNameList.map((type) => {
        return { value: type.ServiceName, label: type.ServiceName };
      });
      const countrylist = this.state.CountryList.map((type) => {
        return { value: type.CountryID, label: type.CountryName };
      });
      const senderstate = this.state.SenderStateList.map((type) => {
        return { value: type.StateName, label: type.StateName };
      });
      const receiverstate = this.state.ReceiverStateList.map((type) => {
        debugger;
        return { value: type.StateName, label: type.StateName };
      });
      const searchfield = this.state.searchField.map((content) => {
        return { value: content.value, label: content.label };
      });
      const newselectfilter = this.state.selectFilter.map((content) => {
        return { value: content.value, label: content.label };
      });
      const neweditedfilter = this.state.selectFilter
        .filter(
          (x) =>
            x.label !== "Start With" &&
            x.label !== "Contains" &&
            x.label !== "Ends With"
        )
        .map((x) => {
          return { value: x.value, label: x.label };
        });
      return (
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <FormControl fullWidth error={selectfield.fielderror}>
              <Autocomplete
                options={searchfield}
                fullWidth={true}
                id="field"
                name="field"
                getOptionLabel={(option) =>
                  option.label ? option.label : option
                }
                value={selectfield.field}
                onChange={(event, val) =>
                  this.onchnageselectfield(event, "field", val, idx)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={selectfield.error}
                    helperText={selectfield.helperText}
                    label="Select Field"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
              <FormHelperText>{selectfield.fieldhelperText}</FormHelperText>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <FormControl fullWidth error={selectfield.filtererror}>
              <Autocomplete
                options={
                  selectfield.field?.value === "sm.ManagedBy" ||
                  selectfield.field?.value === "sm.SubServiceName" ||
                  selectfield.field?.value === "sm.AllClear" ||
                  selectfield.field?.value === "sm.ShipmentType" ||
                  (selectfield.field?.value === "sat.State" &&
                    this.state.ReceiverStateList.length != 0) ||
                  (selectfield.field?.value === "saf.State" &&
                    this.state.SenderStateList.length) ||
                  selectfield.field?.value === "saf.CountryID" ||
                  selectfield.field?.value === "sat.CountryID" ||
                  selectfield.field?.value === "sm.ServiceName" ||
                  selectfield.field?.value === "sm.AllClear"
                    ? neweditedfilter
                    : newselectfilter
                }
                fullWidth={true}
                id="filter"
                name="filter"
                getOptionLabel={(option) =>
                  option.label ? option.label : option
                }
                value={selectfield.filter}
                onChange={(event, val) =>
                  this.onchnageselectfield(event, "filter", val, idx)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={selectfield.error}
                    helperText={selectfield.helperText}
                    label="Select Filter"
                    margin="normal"
                    fullWidth
                  />
                )}
              />
              <FormHelperText>{selectfield.filterhelperText}</FormHelperText>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <div className="with-btn-box">
              {selectfield.field?.value === "sm.ManagedBy" ? (
                <Autocomplete
                  options={managedby}
                  id="managedby"
                  name="filterValue"
                  getOptionLabel={(option) =>
                    option.label ? option.label : option
                  }
                  value={selectfield.filterValue}
                  onChange={(event, value) =>
                    this.managedBY(event, "filterValue", idx, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={selectfield.error}
                      helperText={selectfield.helperText}
                      label="Managed By"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              ) : selectfield.field?.value === "sm.ShipmentType" ? (
                <Autocomplete
                  options={shipmentType}
                  id="shipmenttype"
                  name="filterValue"
                  getOptionLabel={(option) =>
                    option.label ? option.label : option
                  }
                  value={selectfield.filterValue}
                  onChange={(event, value) =>
                    this.shipmentType(event, "filterValue", idx, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={selectfield.error}
                      helperText={selectfield.helperText}
                      label="Shipment Type"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              ) : selectfield.field?.value === "sm.ServiceName" ? (
                <Autocomplete
                  options={ServiceName}
                  id="ServiceName"
                  name="filterValue"
                  getOptionLabel={(option) =>
                    option.label ? option.label : option
                  }
                  value={selectfield.filterValue}
                  onChange={(event, value) =>
                    this.ServiceName(event, "filterValue", idx, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={selectfield.error}
                      helperText={selectfield.helperText}
                      label="Service Name"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              ) : selectfield.field?.value === "sat.CountryID" ? (
                <Autocomplete
                  options={countrylist}
                  id="ReceiverCountry"
                  name="filterValue"
                  getOptionLabel={(option) =>
                    option.label ? option.label : option
                  }
                  value={selectfield.filterValue}
                  onChange={(event, value) =>
                    this.ReceiverCountry(event, "filterValue", idx, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={selectfield.error}
                      helperText={selectfield.helperText}
                      label="Receiver Country"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              ) : selectfield.field?.value === "saf.CountryID" ? (
                <Autocomplete
                  options={countrylist}
                  id="SenderCountry"
                  name="filterValue"
                  getOptionLabel={(option) =>
                    option.label ? option.label : option
                  }
                  value={selectfield.filterValue}
                  onChange={(event, value) =>
                    this.SenderCountry(event, "filterValue", idx, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={selectfield.error}
                      helperText={selectfield.helperText}
                      label="Sender Country"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              ) : selectfield.field?.value === "saf.State" &&
                this.state.SenderStateList.length != 0 ? (
                <Autocomplete
                  options={senderstate}
                  id="SenderState"
                  name="filterValue"
                  getOptionLabel={(option) =>
                    option.label ? option.label : option
                  }
                  value={selectfield.filterValue}
                  onChange={(event, value) =>
                    this.SenderState(event, "filterValue", idx, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={selectfield.error}
                      helperText={selectfield.helperText}
                      label="Sender State"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              ) : selectfield.field?.value === "sat.State" &&
                this.state.ReceiverStateList.length != 0 ? (
                <Autocomplete
                  options={receiverstate}
                  id="ReceiverState"
                  name="filterValue"
                  getOptionLabel={(option) =>
                    option.label ? option.label : option
                  }
                  value={selectfield.filterValue}
                  onChange={(event, value) =>
                    this.ReceiverState(event, "filterValue", idx, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={selectfield.error}
                      helperText={selectfield.helperText}
                      label="Receiver State"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              ) : selectfield.field?.value === "sm.SubServiceName" ? (
                <Autocomplete
                  options={SubServiceName}
                  id="SubServiceName"
                  name="filterValue"
                  getOptionLabel={(option) =>
                    option.label ? option.label : option
                  }
                  value={selectfield.filterValue}
                  onChange={(event, value) =>
                    this.SubServiceName(event, "filterValue", idx, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={selectfield.error}
                      helperText={selectfield.helperText}
                      label="Sub Service Name"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              ) : selectfield.field?.value === "sm.AllClear" ? (
                <Autocomplete
                  options={allClear}
                  id="allClear"
                  name="filterValue"
                  getOptionLabel={(option) =>
                    option.label ? option.label : option
                  }
                  value={selectfield.filterValue}
                  onChange={(event, value) =>
                    this.allClearchange(event, "filterValue", idx, value)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={selectfield.error}
                      helperText={selectfield.helperText}
                      label="All Clear"
                      margin="normal"
                      fullWidth
                    />
                  )}
                />
              ) : selectfield.field?.value === "sm.ShipmentDate" ? (
                <div className="date-spl">
                  <FormControl fullWidth>
                    <Datetime
                      dateFormat={"MM/DD/YYYY"}
                      timeFormat={false}
                      selected={moment(selectfield.filterValue)}
                      inputProps={{ placeholder: "Shipment Date" }}
                      onChange={(date) =>
                        this.handleLeadDate(date, idx, "filterValue")
                      }
                      closeOnSelect={true}
                      renderInput={(params) => (
                        <TextField
                          style={{ marginTop: "-15px" }}
                          error={selectfield.error}
                          helperText={selectfield.helperText}
                          {...params}
                          label="Select Date"
                          margin="normal"
                          fullWidth
                        />
                      )}
                    />
                    <Icon className="date-icon tp-slam">date_range</Icon>
                  </FormControl>
                </div>
              ) : (
                <CustomInput
                  labelText="Enter Value"
                  id="filterValue"
                  error={selectfield.error}
                  helperText={selectfield.helperText}
                  formControlProps={{ fullWidth: true }}
                  inputProps={{
                    value: selectfield.filterValue,
                    name: "filterValue",
                    onChange: (event) => this.requestChange(event, idx),
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        <Icon className={classes.User}>chrome_reader_mode</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <div className="plus-minus-btn">
                {idx !== 0 ? (
                  <Button
                    justIcon
                    color="danger"
                    className="Plus-btn mt-33"
                    onClick={() => this.filterDelete(idx)}
                  >
                    <i className={"fas fa-minus"} />
                  </Button>
                ) : null}

                {this.state.filtered.length - 1 === idx ? (
                  <Button
                    justIcon
                    color="facebook"
                    onClick={this.addnewFilter}
                    className="Plus-btn mt-33"
                  >
                    <i className={"fas fa-plus"} />
                  </Button>
                ) : null}
              </div>
            </div>
          </GridItem>
        </GridContainer>
      );
    });
  };

  render() {
    const {
      shipmentList,
      SearchAccess,
      SearchList,
      SearchClicked,
    } = this.state;

    const Columns = [
      {
        Header: "Date",
        id: "ShipmentDate",
        sortMethod: (a, b) => {
          debugger;
          return CommonConfig.dateSortMethod(a, b);
        },
        accessor: (data) => {
          return moment(data.formatted_date).format(
            CommonConfig.dateFormat.dateOnly
          );
        },
        maxWidth: 100,
      },
      {
        Header: "Tracking",
        accessor: "TrackingNumber",
        width: 85,
      },
      {
        Header: "Sender",
        accessor: "FromContactName",
        width: 95,
      },
      {
        Header: "City",
        accessor: "FromCity",
        width: 80,
      },
      {
        Header: "State",
        accessor: "FromState",
        width: 80,
      },
      {
        Header: "Receiver",
        accessor: "ToContactName",
        width: 95,
      },
      {
        Header: "City",
        accessor: "ToCity",
        width: 85,
      },
      {
        Header: "State",
        accessor: "ToState",
        width: 85,
      },
      {
        Header: "Type",
        accessor: "ShipmentType",
        width: 73,
      },
      {
        Header: "Status",
        accessor: "ShipmentStatus",
        width: 100,
      },
      {
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        filterable: false,
        width: 70,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              <Button
                justIcon
                color="info"
                onClick={() => this.editShipment(record)}
              >
                <i className="fas fa-edit"></i>
              </Button>
            </div>
          );
        },
      },
    ];

    const viewAllcolumns = [
      {
        Header: "Date", //1
        id: "ShipmentDate",
        sortMethod: (a, b) => {
          return CommonConfig.dateSortMethod(a, b);
        },
        accessor: (data) => {
          //  return moment(data.ShipmentDate).format(
          return moment(data.formatted_date).format(
            CommonConfig.dateFormat.dateOnly
          );
        },
        maxWidth: 85,
      },
      {
        Header: "Tracking",
        sortMethod: (a, b) => {},
        accessor: "TrackingNumber",
        width: 83,
      },
      {
        Header: "Managed By",
        accessor: "ManagedByName",
        width: 87,
      },
      {
        Header: "Sender",
        accessor: "FromContactName",
        width: 90,
      },
      {
        Header: "State",
        accessor: "FromState",
        width: 80,
      },
      {
        Header: "Country",
        accessor: "FromCountry",
        width: 80,
      },
      {
        Header: "Receiver",
        accessor: "ToContactName",
        width: 95,
      },
      {
        Header: "State",
        accessor: "ToState",
        width: 85,
      },
      {
        Header: "Country",
        accessor: "ToCountry",
        width: 85,
      },
      {
        Header: "Type",
        accessor: "ShipmentType",
        width: 73,
      },
      {
        Header: "Status",
        accessor: "ShipmentStatus",
        width: 100,
      },
      {
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        filterable: false,
        width: 65,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              <Button
                justIcon
                color="info"
                onClick={() => this.editShipment(record)}
              >
                <i className="fas fa-edit"></i>
              </Button>
            </div>
          );
        },
      },
    ];

    const { myshipmentshipmentList } = this.state;

    const myshipmentColumns = [
      {
        Header: "Date",
        id: "ShipmentDate",
        sortMethod: (a, b) => {
          return CommonConfig.dateSortMethod(a, b);
        },
        accessor: (data) => {
          return moment(data.formatted_date).format(
            CommonConfig.dateFormat.dateOnly
          );
        },
        maxWidth: 100,
      },
      {
        Header: "Tracking",
        accessor: "TrackingNumber",
        width: 85,
      },
      {
        Header: "Sender",
        accessor: "FromContactName",
        width: 95,
      },
      {
        Header: "City",
        accessor: "FromCity",
        width: 80,
      },
      {
        Header: "State",
        accessor: "FromState",
        width: 80,
      },
      {
        Header: "Receiver",
        accessor: "ToContactName",
        width: 95,
      },
      {
        Header: "City",
        accessor: "ToCity",
        width: 85,
      },
      {
        Header: "State",
        accessor: "ToState",
        width: 85,
      },
      {
        Header: "Type",
        accessor: "ShipmentType",
        width: 73,
      },
      {
        Header: "Status",
        accessor: "ShipmentStatus",
        width: 100,
      },
      {
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        filterable: false,
        width: 70,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              <Button
                justIcon
                color="info"
                onClick={() => this.editMyShipment(record)}
              >
                <i className="fas fa-edit"></i>
              </Button>
            </div>
          );
        },
      },
    ];

    const myShipmentviewAllcolumns = [
      {
        Header: "Date",
        id: "ShipmentDate",
        sortMethod: (a, b) => {
          return CommonConfig.dateSortMethod(a, b);
        },
        accessor: (data) => {
          return moment(data.formatted_date).format(
            CommonConfig.dateFormat.dateOnly
          );
        },
        maxWidth: 85,
      },
      {
        Header: "Tracking",
        accessor: "TrackingNumber",
        width: 83,
      },
      {
        Header: "Managed By",
        accessor: "ManagedByName",
        width: 87,
      },
      {
        Header: "Sender",
        accessor: "FromContactName",
        width: 90,
      },
      {
        Header: "City",
        accessor: "FromCity",
        width: 80,
      },
      {
        Header: "State",
        accessor: "FromState",
        width: 80,
      },
      {
        Header: "Receiver",
        accessor: "ToContactName",
        width: 95,
      },
      {
        Header: "City",
        accessor: "ToCity",
        width: 85,
      },
      {
        Header: "State",
        accessor: "ToState",
        width: 85,
      },
      {
        Header: "Type",
        accessor: "ShipmentType",
        width: 73,
      },
      {
        Header: "Status",
        accessor: "ShipmentStatus",
        width: 100,
      },
      {
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        filterable: false,
        width: 65,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              <Button
                justIcon
                color="info"
                onClick={() => this.editMyShipment(record)}
              >
                <i className="fas fa-edit"></i>
              </Button>
            </div>
          );
        },
      },
    ];

    return (
      <GridContainer
        justifyContent="center"
        className="schedule-pickup-main-outer"
      >
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}

        <Card>
          <CardHeader className="btn-right-outer" color="primary" icon>
            <CardIcon color="primary">
              <DirectionsBoatIcon />
            </CardIcon>

            <h4 className="margin-right-auto text-color-black">Shipment</h4>
            {this.state.Steps.findIndex((x) => x.classname === "active") !==
            -1 ? (
              this.state.Steps[
                this.state.Steps.findIndex((x) => x.classname === "active")
              ]["stepId"] === "shipment" ? (
                <div className="filter-wrap">
                  <div
                    className="filter-top-right"
                    onMouseLeave={() =>
                      this.setState({ IsDropDownShow: false })
                    }
                    onMouseOver={() => this.setState({ IsDropDownShow: true })}
                  >
                    <Button className="cm-toggle" color="rose">
                      Search Shipment Status <ExpandMoreIcon />
                    </Button>
                    {this.state.IsDropDownShow === true ? (
                      <div className="cm-dropdown" ref={this.state.ref}>
                        <div className="overflow-handle">
                          {this.state.StatusList.map((step, key) => {
                            return (
                              <li>
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={step.IsSelected}
                                    onChange={(e) =>
                                      this.handleCheckboxChange(
                                        e,
                                        step,
                                        step.value
                                      )
                                    }
                                  />{" "}
                                  {step.value}
                                </label>
                              </li>
                            );
                          })}
                        </div>
                        <div className="cms-wrap">
                          <Button
                            className="cm-search-btn"
                            color="rose"
                            onClick={() => this.showSearchFilter("Shipment")}
                          >
                            Search
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : this.state.Steps[
                  this.state.Steps.findIndex((x) => x.classname === "active")
                ]["stepId"] === "myshipment" ? (
                <div className="filter-wrap">
                  <div
                    className="filter-top-right"
                    onMouseLeave={() =>
                      this.setState({ IsDropDownShow: false })
                    }
                    onMouseOver={() => this.setState({ IsDropDownShow: true })}
                  >
                    <Button className="cm-toggle" color="rose">
                      Search Shipment Status
                      <ExpandMoreIcon />
                    </Button>
                    {this.state.IsDropDownShow === true ? (
                      <div className="cm-dropdown">
                        <div className="overflow-handle">
                          {this.state.StatusList.map((step, key) => {
                            return (
                              <li>
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={step.IsSelected}
                                    onChange={(e) =>
                                      this.handleCheckboxChange(
                                        e,
                                        step,
                                        step.value
                                      )
                                    }
                                  />{" "}
                                  {step.value}
                                </label>
                              </li>
                            );
                          })}
                        </div>
                        <div className="cms-wrap">
                          <Button
                            className="cm-search-btn"
                            color="rose"
                            onClick={() => this.showSearchFilter("Myshipment")}
                          >
                            Search
                          </Button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : this.state.Steps[
                  this.state.Steps.findIndex((x) => x.classname === "active")
                ]["stepId"] === "search" ? (
                <div className="filter-wrap">
                  <div
                    className="filter-top-right"
                    onMouseLeave={() =>
                      this.setState({ IsDropDownShow: false })
                    }
                    onMouseOver={() => this.setState({ IsDropDownShow: true })}
                  >
                    <Button className="cm-toggle" color="rose">
                      Search Shipment Status
                      <ExpandMoreIcon />
                    </Button>
                    {this.state.IsDropDownShow === true ? (
                      <div className="cm-dropdown">
                        <div className="overflow-handle">
                          {this.state.StatusList.map((step, key) => {
                            return (
                              <li>
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={step.IsSelected}
                                    onChange={(e) =>
                                      this.handleCheckboxChange(
                                        e,
                                        step,
                                        step.value
                                      )
                                    }
                                  />{" "}
                                  {step.value}
                                </label>
                              </li>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null
            ) : null}
          </CardHeader>
          <CardBody>
            <div className="shipment-nav">
              <ul>
                {this.state.Steps.map((step, key) => {
                  return (
                    <li>
                      <a
                        className={step.classname}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          this.navigateChange(key);
                        }}
                      >
                        <span>{step.stepName}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="shipment-content mt-20">
              <div className="shipment-pane" id="shipment">
                <ReactTable
                  data={shipmentList}
                  minRows={2}
                  pageText={"Total rows : " + this.state.finalLength}
                  defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                  getPaginationProps={(e) => this.checkProps(e)}
                  getTheadFilterProps={(e) => this.filterProps(e)}
                  filterable
                  defaultSorted={this.state.previousSortList}
                  defaultFiltered={this.state.previousFilterList}
                  resizable={false}
                  columns={
                    this.state.Access.AllAccess === 1 ? viewAllcolumns : Columns
                  }
                  defaultPageSize={10}
                  showPaginationBottom={true}
                  className="-striped -highlight"
                />
              </div>
              <div className="shipment-pane" id="myshipment">
                <ReactTable
                  data={myshipmentshipmentList}
                  minRows={2}
                  pageText={"Total rows : " + this.state.myshipmentfinalLength}
                  defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                  getPaginationProps={(e) => this.myshipmentcheckProps(e)}
                  getTheadFilterProps={(e) => this.myshipmentfilterProps(e)}
                  filterable
                  defaultSorted={this.state.myshipmentpreviousSortList}
                  defaultFiltered={this.state.myshipmentpreviousFilterList}
                  resizable={false}
                  columns={
                    this.state.myshipmentAccess.AllAccess === 1
                      ? myShipmentviewAllcolumns
                      : myshipmentColumns
                  }
                  defaultPageSize={10}
                  showPaginationBottom={true}
                  className="-striped -highlight"
                />
              </div>
              <div className="shipment-pane" id="search">
                {SearchAccess.ReadAccess === 1 ? (
                  <>
                    {/* kruti... */}
                    {/* {this.state.LoginpersonId === 1 ||
                    this.state.LoginpersonId === 18 ? ( */}
                    <GridItem>
                      <GridContainer>
                        <div className="expand-panel-outer">
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <div className="shipmentSearch">
                                {SearchAccess.ReadAccess === 1
                                  ? this.filterRow()
                                  : this.basicFilter()}
                              </div>
                            </GridItem>
                          </GridContainer>
                        </div>
                        <div className="shipment-submit mt-20">
                          <div className="right">
                            <Button
                              justIcon
                              color="danger"
                              onClick={(evt) => this.handelExportToExcel(evt)}
                            >
                              <i class="fas fa-download"></i>
                            </Button>
                            <Button color="rose" onClick={() => this.search()}>
                              Search
                            </Button>
                            <Button
                              color="secondary"
                              onClick={() => this.reset()}
                            >
                              Reset
                            </Button>
                          </div>
                        </div>
                      </GridContainer>
                    </GridItem>
                    {/* // ) : null} */}
                  </>
                ) : null}
                {SearchClicked ? (
                  <ReactTable
                    data={SearchList}
                    minRows={2}
                    pageText={"Total rows : " + this.state.searchfinalLength}
                    defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                    getPaginationProps={(e) => this.searchCheckProps(e)}
                    // getTheadFilterProps={(e) => this.searchShipmentlen(e)}
                    filterable
                    defaultSorted={this.state.previousSortList}
                    defaultFiltered={this.state.previousFilterList}
                    resizable={false}
                    columns={
                      this.state.Access.AllAccess === 1
                        ? viewAllcolumns
                        : Columns
                    }
                    defaultPageSize={10}
                    showPaginationBottom={true}
                    className="-striped -highlight"
                  />
                ) : null}
              </div>
            </div>
          </CardBody>
        </Card>
      </GridContainer>
    );
  }
}

export default ShipmentNavigation;
