import React, { Component } from "react";
import ReactTable from "react-table";
import api from "../../../utils/apiClient";
import { CommonConfig } from "../../../utils/constant";
import cogoToast from "cogo-toast";
import LocalShipping from "@material-ui/icons/LocalShipping";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { cssNumber } from "jquery";
class Service extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Loading: false,
      serviceList: [],
      filterProps: [],
      sortProps: [],
      countryName:[],
      previousFilterList: [],
      previousSortList: [],
      eValue:[],
      recordValue:[],
      typeValue:[],
      countryWise:[
        {value: "All", label: "All" , Index:0,IsSelected:false},
        { value: "37", label: "Canada" , Index:1,IsSelected:false},
        { value: "89", label: "India", Index:2,IsSelected:true },
        { value: "202", label: "United State", Index:3,IsSelected:false },
        { value: "0", label: "Others", Index:4,IsSelected:false },
      ],
     
    };
  }

 

  activeInactiveUser = (record) => {
    let data = {
      serviceID: record.original.ServiceID,
      status: record.original.Status === "Active" ? "Inactive" : "Active",
    };
    try {
      this.setState({ Loading: true });
      api
        .post("userManagement/activeInactiveService", data)
        .then((res) => {
          if (res.success) {
            this.getServiceList();
          } else {
            cogoToast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {}
  };
  componentDidMount() {
    //this.getServiceList();
    this.getServiceListFiltered(89);
    if (
      this.props.history.location.state !== undefined &&
      this.props.history.location.state !== null
    ) {
      this.setState({
        previousFilterList: this.props.history.location.state.filterlist,
        previousSortList: this.props.history.location.state.sortlist,
      });
    }
  }

  handleStepValue = (e, record, type) => {
    this.setState({eValue :e,recordValue:record,typeValue :type});
    let checkedArr = this.state.countryWise;
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
      this.setState({ serviceValue: previousList });
      let arrType = "previousSelected" + this.state.chatlist;
      let SelectedCountryCode="1";
      this.filterMethod("Hello", previousList);
      checkedArr.filter((x) => x.IsSelected === true)
        .map((OBJ) => {

          SelectedCountryCode = SelectedCountryCode+","+OBJ.value;
          return OBJ;
        });
     
    } else {
      // else {
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
  
      this.filterMethod("Hello", previousList);
      // }
    }
    
  };
  handleServiceCheckboxChange = (e, record, type) => {
    debugger;
    let checkedArr = this.state.countryWise;
    if (type !== "All") {
      checkedArr
        .filter((x) => x.value === "All")
        .map((OBJ) => {
          OBJ.IsSelected = false;
          return OBJ;
        });
      
  
   

      let SelectedCountryCode="1";

      checkedArr.filter((x) => x.IsSelected === true)
        .map((OBJ) => {

          SelectedCountryCode = SelectedCountryCode+","+OBJ.value;
          return OBJ;
        });
      this.getServiceListFiltered(SelectedCountryCode)
    } else {
      // else {
    
  

     
    
      this.getServiceList();

      // }
    }
    // console.log("checkedArr = ",checkdata);
  };

  gotoedit = (record) => {
    let ServiceID = record.original.ServiceID;
    const { history } = this.props;
    history.push({
      pathname: "/admin/EditService",
      state: {
        Id: ServiceID,
        filterlist: this.state.filterProps,
        sortlist: this.state.sortProps,
      },
    });
  };

  addService = () => {
    this.props.history.push("/admin/AddService");
  };

  getServiceList() {debugger
    try {
      this.setState({ Loading: true });
      api
        .get("userManagement/getServiceList")
        .then((res) => {
          if (res.success) {
            var i = 0;
            res.data.map((OBJ) => {
              OBJ.IsSelected = false;
              OBJ.Index = i;
              i++;
              return OBJ;
            });
            this.setState({ serviceList: res.data, Loading: false });
          } else {
            cogoToast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {}
  }

  getServiceListFiltered(CountryParam) {debugger
    try {
      this.setState({ Loading: true });
     const data={
        CountryIds :CountryParam,
      }
      api
        .post("https://hubapi.sflworldwide.com/userManagement/getServiceListFilter",data)
        .then((res) => {
          if (res.success) {
            var i = 0;
            res.data.map((OBJ) => {
              OBJ.IsSelected = false;
              OBJ.Index = i;
              i++;
              return OBJ;
            });
            this.setState({ serviceList: res.data, Loading: false });
          } else {
            cogoToast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {}
  }
  filterMethod = (event, value) => {debugger
    console.log("value= ", value);
    this.setState({ countryName: value });
    console.log("serviceValue = ", this.state.serviceValue);
  };
  setFilterProps = (filterValue) => {
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
  render() {
    const { serviceList } = this.state;
    
    const columns = [
      {
        Header: "Country",
        accessor: "CountryName",
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
      {
        Header: "Shipment Type",
        accessor: "ServiceType",
        width: 65,
        maxWidth: 65,
        minWidth: 65,
      },
      {
        Header: "Service Name",
        accessor: "MainServiceName",
        width: 100,
        maxWidth: 100,
        minWidth: 100,
      },
      {
        Header: "Sub Service Name",
        accessor: "ServiceName",
        width: 155,
        maxWidth: 155,
        minWidth: 155,
      },

      {
        Header: "Display Name",
        accessor: "DisplayName",
        foldable: true,
        width: 155,
      },
      {
        Header: "Pkg Markup",
        accessor: "Markup",
        width: 70,
      },
      {
        Header: "Env Markup",
        accessor: "EnvelopMarkup",
        width: 70,
      },
      {
        Header: "Dflt Markup",
        accessor: "MarkupType",
        width: 105,
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
              <Button justIcon color="info">
                <i
                  className="fas fa-edit"
                  onClick={() => this.gotoedit(record)}
                ></i>
              </Button>
            </div>
          );
        },
      },
      {
        Header: "Status",
        accessor: "Status",
        width: 100,
        Cell: (record) => {
          if (record.original.Status === "Active") {
            return (
              <Button
                color="success"
                className="table-btn"
                onClick={() => this.activeInactiveUser(record)}
              >
                Active
              </Button>
            );
          } else {
            return (
              <Button
                color="danger"
                className="table-btn"
                onClick={() => this.activeInactiveUser(record)}
              >
                Inactive
              </Button>
            );
          }
        },
        sortable: false,
        filterable: false,
      },
    ];
    return (
      <GridContainer className="UserList-outer">
       
        <GridItem xs={12}>
          <Card>
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <LocalShipping />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">
                Service List
              </h4>
              <div className="filter-wrap">
                <div
                      className="filter-top-right"
                      onMouseLeave={() =>
                        this.setState({ IsDropDownShow: false })
                      }
                      onMouseOver={() => this.setState({ IsDropDownShow: true })}
                    >
                      <Button
                        className="cm-toggle"
                        color="rose"
                        // onClick={() =>
                        //   this.setState({
                        //     IsDropDownShow:
                        //       this.state.IsDropDownShow === true ? false : true,
                        //   })
                        // }
                      >
                        Country <ExpandMoreIcon />
                      </Button>
                      {this.state.IsDropDownShow === true ? (
                        <div className="cm-dropdown" ref={this.state.ref}>
                          <div className="overflow-handle">
                            {this.state.countryWise.map((step, key) => {
                              return (
                                <li>
                                  <label>
                                    <input
                                      type="checkbox"
                                      checked={step.IsSelected}
                                      onChange={(e, value) =>
                                        this.handleStepValue(
                                          e,
                                          step,
                                          step.value
                                        )
                                      }
                                      value={this.state.countryWise}
                                    />{" "}
                                    {step.label}
                                  </label>
                                </li>
                              );
                            })}
                          </div>
                          <div className="cms-wrap">
                            <Button
                              className="cm-search-btn"
                              color="rose"
                            onClick={() => this.handleServiceCheckboxChange(
                              this.state.eValue,
                              this.state.recordValue,
                              this.state.typeValue
                            )}
                            >
                              Search
                            </Button>
                          </div>
                        </div>
                      ) : null}
                </div>
              </div>
              <Button
                color="primary"
                className=""
                onClick={() => this.addService()}
              >
                Add Service
              </Button>
              
            
        
            </CardHeader>
            <CardBody>
              <ReactTable
                data={serviceList}
                defaultFiltered={this.state.previousFilterList}
                defaultSorted={this.state.previousSortList}
                minRows={0}
                defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                filterable
                resizable={false}
                getTheadFilterProps={(e) => this.filterProps(e)}
                columns={columns}
                defaultPageSize={10}
                showPaginationBottom={true}
                className="-striped -highlight with-linebreak"
              />
            </CardBody>
            
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default Service;
