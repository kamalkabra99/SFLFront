import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";
// @material-ui/icons
import PhoneCallback from "@material-ui/icons/PhoneCallback";
// core components
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import { CommonConfig } from "../../utils/constant";
import api from "../../utils/apiClient";
import SimpleBackdrop from "../../utils/general";
import moment from "moment";
import cogoToast from "cogo-toast";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";
import InfoIcon from "@material-ui/icons/PriorityHigh";
import Tooltip from "@material-ui/core/Tooltip";
import { decode as base64_decode, encode as base64_encode } from 'base-64';
// import utf8 from "utf8";
import AttachFileIcon from '@material-ui/icons/AttachFile';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class BookofWorkList extends Component {
  constructor(props) {
    super(props);
    this.state = {

      BookofWorkData: [],
      WorkStatusList: [],
      WorkStatus: [],
      checkdata: "",
      AllAccess: 0,
      Loading: false,
      loggedUser: 0,
      finalLength: 0,
      statusList: [],
      filterProps: [],
      previousFilterList: [],
      sortProps: [],
      previousSortList: [],
      requestStatus: [],
    };
  }
  componentDidMount() {
    this.setState({
      AllAccess: CommonConfig.getUserAccess("Call Back").AllAccess,
    });
    this.setState({ loggedUser: CommonConfig.loggedInUserData().PersonID });
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
      debugger;
      if (this.props.history.location.state.statusList !== undefined) {
        APIcheck = false;
        //  this.filterMethod("", this.props.history.location.state.statusList);
        if (this.props.history.location.state.statusList[0].label === "All") {
          let newfilter = [{ label: "New", value: "New" }, { label: "Open", value: "Open" }];
          this.filterMethod("", newfilter);
        } else {
          this.filterMethod("", this.props.history.location.state.statusList);
        }
      }
    } else {
      var finalStatus = {
        id: "WorkStatus",
        value: "",
      };
      var finalSort = {
        id: "DateCreated",
        desc: true,
      };
      this.setState({
        previousFilterList: [finalStatus],
        previousSortList: [finalSort],
      });
    }
    debugger;
    if (APIcheck) {
      let newFilter = [{ label: "New", value: "New" }, { label: "Open", value: "Open" }];
      this.filterMethod("", newFilter);
    }
    this.getStatus();
  }

  showLoador = () => {
    this.setState({ Loading: true });
  };

  hideLoador = () => {
    this.setState({ Loading: false });
  };
  handleCheckboxChange = (e, record, type) => {
    let checkedArr = this.state.WorkStatus;
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
        WorkStatus: checkedArr,
      });
    }
  };
  searchfilter = () => {
    debugger
    this.setState({ IsDropDownShow: false });
    try {
      let Query = "";
      let inputdata = this.state.checkdata;
      if (inputdata === "All") {
        Query = " And 1 ";
      } else if (inputdata === "") {
        this.setState({ BookofWorkData: [] });
      } else if (inputdata.length === 1) {
        Query = ` AND ( bw.WorkStatus  = "` + inputdata[0].value + `")`;
      } else {
        for (var j = 0; j < inputdata.length; j++) {
          if (j === 0) {
            Query = ` AND ( bw.WorkStatus  = "` + inputdata[j].value + `"`;
          } else {
            Query =
              Query + ` OR bw.WorkStatus  = "` + inputdata[j].value + `"`;
          }
        }


        if (!CommonConfig.isEmpty(Query)) {
          Query = Query + `)`;
        }
      }

      if (CommonConfig.getUserAccess("Book of Work").AllAccess != 1) {

        Query = Query + ` AND (bw.AssignedBy = "` + CommonConfig.loggedInUserData().PersonID + `" OR bw.AssignedTo = "` + CommonConfig.loggedInUserData().PersonID + `")`

      }




      console.log("query: ", Query);
      //  this.getProposalData(Query);
      this.getBookofWorkData(Query);
    } catch (err) {
      cogoToast.error("Something went wrong 3");
    }
  };
  getBookofWorkData(whereClause) {
    debugger
    if (whereClause !== "") {
      console.log("whereclause", whereClause);
      let data = {};
      if (!CommonConfig.isEmpty(whereClause)) {
        data.StatusQuery = whereClause;
      }
      try {
        this.showLoador();
        api
          .post("contactUs/getBookofWorkList", data)
          .then((result) => {
            if (result.success) {
              this.hideLoador();
              if (this.state.AllAccess === 1) {
                this.setState({ BookofWorkData: result.Data });
              } else {
                let finalData = result.Data.filter(
                  (x) => x.AssignedBy === this.state.loggedUser || x.AssignedTo === this.state.loggedUser
                );
                this.setState({ BookofWorkData: finalData });
              }
            } else {
              this.hideLoador();
              cogoToast.error("Something went wrong1");
            }
          })
          .catch((err) => {
            this.hideLoador();
            cogoToast.error("Something went wrong2");
          });
      } catch (err) {
        this.hideLoador();
        cogoToast.error("Something Went Wrong3");
      }
    } else {
      this.setState({ BookofWorkData: [] });
    }
  }

  handleEdit(record) {
    debugger
    let BookofWorkID = record.original.BookofWorkID;
    this.props.history.push({
      pathname: "BookofWork/" + BookofWorkID,
      state: {
        id: BookofWorkID,
        filterlist: this.state.filterProps,
        sortlist: this.state.sortProps,
        WorkStatus: this.state.WorkStatus,
      },
    });
  }



  filterMethod = (event, value) => {
    //let value = this.state.checkdata;
    debugger;
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
                  ` AND ( bw.WorkStatus = "` + value[j].value + `")`;
              } else {
                StatusQuery =
                  ` AND ( bw.WorkStatus = "` + value[j].value + `"`;
              }
            } else if (j + 1 === value.length) {
              StatusQuery = ` OR bw.WorkStatus = "` + value[j].value + `")`;
            } else {
              StatusQuery = ` OR bw.WorkStatus = "` + value[j].value + `"`;
            }
            query = query + StatusQuery;
          }
        } else {
          value = [{ label: "All", value: "All" }];
        }
        debugger
        if (CommonConfig.getUserAccess("Book of Work").AllAccess != 1) {

          query = query + ` AND (bw.AssignedBy = "` + CommonConfig.loggedInUserData().PersonID + `" OR bw.AssignedTo = "` + CommonConfig.loggedInUserData().PersonID + `")`

        }
        this.getBookofWorkData(query);
      } else {
        this.setState({ BookofWorkData: [] });
      }
      this.setState({ statusList: value });
    }
  };

  getStatus() {
    debugger
    try {
      let data = {
        stringMapType: "WORKSTATUS",
      };

      api
        .post("stringMap/getstringMap", data)
        .then((result) => {
          let WorkStatus1 = result.data;
          let resultStatus = [];
          var i = 0;
          resultStatus.push({ value: "All", label: "All", IsSelected: false, Index: i++ });
          WorkStatus1.map((type) => {

            type.Description == "New" || type.Description == "Open" ? resultStatus.push({ value: type.Description, label: type.Description, IsSelected: true, Index: i++ }) : resultStatus.push({ value: type.Description, label: type.Description, IsSelected: false, Index: i++ });
          });

          console.log("resultStatus", resultStatus);
          this.setState({ WorkStatus: resultStatus });

        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  setFilterProps = (filterValue) => {
    this.setState({
      filterProps: filterValue.filtered,
      sortProps: filterValue.sorted,
    });
  };

  filterProps = (e) => {
    console.log("e = ", e)
    console.log("this.state.filterProps = ", this.state.filterProps, this.state.sortProps)
    if (this.state.filterProps !== e.filtered) {
      this.setFilterProps(e);
    }
    if (this.state.sortProps !== e.sorted) {
      this.setFilterProps(e);
    }
    return "";
  };

  BookofWork = () => {
    this.props.history.push("BookofWork/");
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
    const { BookofWorkData } = this.state;
    const column = [

      {
        Header: "Defect ID",
        accessor: "BookofWorkID",
        width: 70,
        filterable: true,
        sortable: true,
        maxWidth: 70,
      },
      {
        Header: "Assigned By",
        accessor: "AssignedByName",
        width: 150,
        filterable: true,
        sortable: true,
        maxWidth: 150,
      },
      {
        Header: "Assigned To",
        accessor: "AssignedToName",
        filterable: true,
        sortable: true,
        width: 100,
        maxWidth: 150,
      },
      {
        Header: "Date Created",
        accessor: "DateCreated",
        filterable: true,
        sortable: true,
        width: 100,
        maxWidth: 250,
      },
      {
        Header: "Work Name",
        id: "WorkName",
        accessor: "WorkName",
        sortable: true,
        filterable: true,
        width: 150,
        maxWidth: 250,
      },
      {
        Header: "Priority",
        accessor: "Priority",
        filterable: true,
        sortable: true,
        width: 100,
        maxWidth: 250,
      },
      {
        Header: "Work Status",
        accessor: "WorkStatus",
        filterable: true,
        sortable: true,
        width: 150,
        maxWidth: 250,
      },
      {
        id: "ETA",
        Header: "ETA",
        filterable: true,
        sortMethod: (a, b) => {
          return CommonConfig.dateSortMethod(a, b);
        },
        sortable: true,
        accessor: (data) => {
          return data.ETA == null ? "" : data.ETA;
        },
        width: 150,
        maxWidth: 200,
      },
      {
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        width: 100,
        maxWidth: 150,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              <Button
                justIcon
                color="info"
                onClick={() => this.handleEdit(record)}
              >
                <i className="fas fa-edit"></i>
              </Button>
              <Tooltip title={(record.original.bwDescription==null ||record.original.bwDescription=="") ?"":base64_decode(record.original.bwDescription)} arrow>
                <Button
                  className="Plus-btn info-icon"
                  justIcon
                  color="twitter"
                >
                  <InfoIcon />
                </Button>
              </Tooltip>
              {record.original.AttachmentID != null ? (
                <Button
                  className="transparent-btn"
                >
                  <AttachFileIcon />
                </Button>)
                : ""}
            </div>
          );
        },
        filterable: false,
      },
    ];
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
                <PhoneCallback />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">Book of Work List</h4>

              {/* <div className="filter-top-right">
                <div className="autocomplete-fs-small">
                  <Autocomplete
                    multiple
                    size="small"
                    id="filtercheckbox"
                    options={this.state.requestStatus}
                    getOptionLabel={(option) => option.label}
                    onChange={(e, value) => this.filterMethod(e, value)}
                    getOptionSelected={(option, value) =>
                      this.optionProps(option, value)
                    }
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

                >
                  <Button className="cm-toggle" color="rose"
                    onMouseLeave={() => this.setState({ IsDropDownShow: false })}
                    onMouseOver={() => this.setState({ IsDropDownShow: true })}>
                    Book of Work Status <ExpandMoreIcon />

                    {this.state.IsDropDownShow === true ? (
                      <div className="cm-dropdown">
                        <div className="overflow-handle">
                          {this.state.WorkStatus.map((step, key) => {
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

                  </Button>
                  <Button
                    color="primary"
                    className="wd-auto"
                    onClick={() => this.BookofWork()}
                  >
                    Add New Work
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={BookofWorkData}
                defaultPageSize={10}
                minRows={2}
                defaultSorted={this.state.previousSortList}
                defaultFiltered={this.state.previousFilterList}
                resizable={false}
                columns={column}
                getTheadFilterProps={(e) => this.filterProps(e)}
                pageText={"Total rows : " + this.state.finalLength}
                getPaginationProps={(e) => this.checkProps(e)}
                defaultFilterMethod={CommonConfig.filterCaseInsensitive}
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
export default BookofWorkList;
