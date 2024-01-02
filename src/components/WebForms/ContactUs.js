import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
// @material-ui/core components
// @material-ui/icons
import HeadsetMic from "@material-ui/icons/HeadsetMic";
// core components
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import moment from "moment";
import SimpleBackdrop from "../../utils/general";
import api from "../../utils/apiClient";
import { CommonConfig } from "../../utils/constant";
import cogoToast from "cogo-toast";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ContactList: [],
      ContactUsID: "",
      AllAccess: 0,
      Loading: false,
      statusList: [],
      loggedUser: 0,
      filterProps: [],
      previousFilterList: [],
      sortProps: [],
      previousSortList: [],
      finalLength: 0,
      requestStatus: [
        { label: "All", value: "All", IsSelected: false, Index: 0 },
        { label: "New", value: "New", IsSelected: true, Index: 1 },
        { label: "Open", value: "Open", IsSelected: false, Index: 2 },
        { label: "Closed", value: "Closed", IsSelected: false, Index: 3 },
        { label: "Cancelled", value: "Cancelled", IsSelected: false, Index: 4 },
      ],
    };
  }

  componentDidMount() {
    this.setState({
      AllAccess: CommonConfig.getUserAccess("Contact Us").AllAccess,
    });
    this.setState({ loggedUser: CommonConfig.loggedInUserData().PersonID });
    // this.getContact(' AND ( c.RequestStatus = "New")');
    let APIcheck = true;
    if (
      this.props.history.location.state !== undefined &&
      this.props.history.location.state !== null
    ) {
      this.setState({
        previousFilterList: this.props.history.location.state.filterlist,
        previousSortList: this.props.history.location.state.sortlist,
        statusList:
          this.props.history.location.state.statusList !== undefined
            ? this.props.history.location.state.statusList
            : this.state.statusList,
      });
      if (this.props.history.location.state.statusList !== undefined) {
        APIcheck = false;
        if (this.props.history.location.state.statusList[0].label === "All") {
          let newFilter = [{ label: "New", value: "New" }];
          this.filterMethod("", newFilter);
        } else {
          this.filterMethod("", this.props.history.location.state.statusList);
        }
      }
    } else {
      var finalStatus = {
        id: "RequestStatus",
        value: "",
      };
      var finalSort = {
        id: "CreatedOn",
        desc: true,
      };
      this.setState({
        previousFilterList: [finalStatus],
        previousSortList: [finalSort],
      });
    }
    if (APIcheck) {
      let newFilter = [{ label: "New", value: "New" }];
      this.filterMethod("", newFilter);
    }
  }

  showLoador = () => {
    this.setState({ Loading: true });
  };

  hideLoador = () => {
    this.setState({ Loading: false });
  };

  getContact = (whereClause) => {
    debugger;
    console.log("first", whereClause);
    if (whereClause !== "") {
      let data = {};
      if (!CommonConfig.isEmpty(whereClause)) {
        data.StatusQuery = whereClause;
      }
      try {
        this.showLoador();
        api
          .post("contactus/getContactUsListNEW", data)
          .then((result) => {
            if (result.success) {
              this.hideLoador();
              if (this.state.AllAccess === 1) {
                this.setState({ ContactList: result.data });
              } else {
                let finalData = result.data.filter(
                  (x) => Number(x.WorkingOnRequest) === this.state.loggedUser
                );
                this.setState({ ContactList: finalData });
              }
            } else {
              this.hideLoador();
              cogoToast.error("Something went wrong");
            }
          })
          .catch((err) => {
            this.hideLoador();
            cogoToast.error("Something went wrong");
          });
      } catch (err) {
        this.hideLoador();
        cogoToast.error("Something went wrong");
      }
    } else {
      this.setState({ ContactList: [] });
    }
  };

  handleEdit = (record) => {
    let ContactUsID = record.original.ContactUsID;
    this.props.history.push({
      pathname: "EditContactUs/" + ContactUsID,
      state: {
        filterlist: this.state.filterProps,
        statusList: this.state.statusList,
        sortlist: this.state.sortProps,
      },
    });
  };

  filterMethod = (event, value) => {
    if (value !== null) {
      if (value.length !== 0) {
        value = value.filter(
          (v, i, a) => a.findIndex((t) => t.value === v.value) === i
        );
        let query = "";
        let StatusQuery = "";
        let allFilter = value.findIndex((x) => x.value === "All");
        if (allFilter === 0) {
          value.splice(allFilter, 1);
          allFilter = -1;
        }
        if (allFilter === -1) {
          for (var j = 0; j < value.length; j++) {
            if (j === 0) {
              if (value.length === 1) {
                StatusQuery =
                  ` AND ( c.RequestStatus = "` + value[j].value + `")`;
              } else {
                StatusQuery =
                  ` AND ( c.RequestStatus = "` + value[j].value + `"`;
              }
            } else if (j + 1 === value.length) {
              StatusQuery = ` OR c.RequestStatus = "` + value[j].value + `")`;
            } else {
              StatusQuery = ` OR c.RequestStatus = "` + value[j].value + `"`;
            }
            query = query + StatusQuery;
          }
        } else {
          value = [{ label: "All", value: "All" }];
        }
        this.getContact(query);
      } else {
        this.setState({ ContactList: [] });
      }
      this.setState({ statusList: value });
    }
  };

  setFilterProps = (filterValue) => {
    this.setState({
      filterProps: filterValue.filtered,
      sortProps: filterValue.sorted,
    });
  };
  handleCheckboxChange = (e, record, type) => {
    debugger;
    let checkedArr = this.state.requestStatus;
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
      this.setState({ checkdata: previousList });
    } else {
      checkedArr.map((OBJ) => {
        OBJ.IsSelected = e.target.checked;
        return OBJ;
      });

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
        requestStatus: checkedArr,
      });
    }
  };
  searchfilter = () => {
    this.setState({ IsDropDownShow: false });
    try {
      debugger;
      let Query = "";
      let inputdata = this.state.checkdata;
      if (inputdata === "All") {
        Query = inputdata;
      } else if (inputdata === "") {
        this.setState({ ContactList: [] });
      } else if (inputdata.length === 1) {
        Query = ` AND ( c.RequestStatus  = "` + inputdata[0].value + `")`;
      } else {
        for (var j = 0; j < inputdata.length; j++) {
          if (j === 0) {
            Query = ` AND ( c.RequestStatus  = "` + inputdata[j].value + `"`;
          } else {
            Query =
              Query + ` OR c.RequestStatus  = "` + inputdata[j].value + `"`;
          }
        }
        if (!CommonConfig.isEmpty(Query)) {
          Query = Query + `)`;
        }
      }
      console.log("query: ", Query);
      //  this.getProposalData(Query);
      this.getContact(Query);
    } catch (err) {
      cogoToast.error("Something went wrong 3");
    }
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

  renderInputMethod = (params) => {
    // if(params.InputProps.startAdornment)
    // {
    //   params.InputProps.startAdornment.splice(0,params.InputProps.startAdornment.length)
    // }
    return <TextField {...params} variant="outlined" label="Status" />;
  };

  optionProps = (option, value) => {
    if (option.value === value.value) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const column = [
      {
        Header: "Name",
        id: "Name",
        filterable: true,
        sortable: true,
        accessor: "CustomerName",
        align: "left",
        width: 100,
        maxWidth: 100,
      },
      {
        Header: "Phone",
        id: "PhoneNumber",
        filterable: true,
        sortable: true,
        accessor: "PhoneNum",
        align: "left",
        width: 90,
        maxWidth: 90,
      },
      {
        Header: "Tracking",
        id: "TrackingNumber",
        filterable: true,
        sortable: true,
        accessor: "TrackingNumber",
        width: 80,
        maxWidth: 80,
      },
      {
        Header: "Status",
        id: "RequestStatus",
        filterable: true,
        sortable: true,
        accessor: "RequestStatus",
        width: 150,
        maxWidth: 250,
      },
      {
        Header: "Managed By",
        id: "CallFor",
        filterable: true,
        sortable: true,
        accessor: "WorkingOnRequestName",
        width: 120,
        maxWidth: 120,
      },
      {
        accessor: (data) => {
          return moment(data.CreatedOn).format(
            CommonConfig.dateFormat.dateOnly
          );
        },
        Header: "Created On",
        id: "CreatedOn",
        sortMethod: (a, b) => {
          return CommonConfig.dateSortMethod(a, b);
        },
        filterable: true,
        sortable: true,
        width: 100,
        maxWidth: 100,
      },
      {
        Header: "Actions",
        accessor: "Actions",
        align: "left",
        width: 80,
        maxWidth: 100,
        filterable: false,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              <Button
                justIcon
                color="info"
                onClick={() => this.handleEdit(record)}
              >
                <i class="fas fa-edit"></i>
              </Button>
            </div>
          );
        },
        sortable: false,
      },
    ];
    const { ContactList } = this.state;

    return (
      <GridContainer className="UserList-outer">
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}
        <GridItem xs={12}>
          <Card>
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <HeadsetMic />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">Contact Us</h4>
              {/* <div className="filter-top-right">
                <div className="autocomplete-fs-small">
                  <Autocomplete
                    multiple
                    size="small"
                    id="filtercheckbox"
                    options={this.state.requestStatus}
                    getOptionLabel={(option) => option.label}
                    getOptionSelected={(option, value) =>
                      this.optionProps(option, value)
                    }
                    onChange={(e, value) => this.filterMethod(e, value)}
                    style={{ width: "100%" }}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.label}
                      </React.Fragment>
                    )}
                    renderInput={(params) => this.renderInputMethod(params)}
                    value={this.state.statusList}
                  />
                </div>
              </div> */}
              <div className="filter-wrap">
                <div
                  className="filter-top-right"
                  onMouseLeave={() => this.setState({ IsDropDownShow: false })}
                  onMouseOver={() => this.setState({ IsDropDownShow: true })}
                >
                  <Button className="cm-toggle" color="rose">
                    contact us Status <ExpandMoreIcon />
                  </Button>
                  {this.state.IsDropDownShow === true ? (
                    <div className="cm-dropdown">
                      <div className="overflow-handle">
                        {this.state.requestStatus.map((step, key) => {
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
                          onClick={() => this.searchfilter()}
                        >
                          Search
                        </Button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={ContactList}
                resizable={false}
                minRows={2}
                defaultSorted={this.state.previousSortList}
                defaultFiltered={this.state.previousFilterList}
                getTheadFilterProps={(e) => this.filterProps(e)}
                defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                columns={column}
                pageText={"Total rows : " + this.state.finalLength}
                getPaginationProps={(e) => this.checkProps(e)}
                defaultPageSize={10}
                showPaginationBottom={true}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default ContactUs;
