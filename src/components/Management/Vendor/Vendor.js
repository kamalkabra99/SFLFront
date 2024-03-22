import React, { Component } from "react";
import ReactTable from "react-table";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Store from "@material-ui/icons/Store";
import api from "../../../utils/apiClient";
import { CommonConfig } from "../../../utils/constant";
import cogoToast from "cogo-toast";
import SimpleBackdrop from "../../../utils/general";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { fileBase } from "../../../utils/config";
import * as XLSX from "xlsx";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class Vendor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Loading: false,
      servicelist: [],
      // checkdata:[],
      checkdata: "",
      IsDropDownShow: false,
      serviceValue: [],
      filterProps: [],
      previousFilterList: [],
      sortProps: [],
      previousSortList: [],
      vendorList: [],
      Access: [],
      finalLength: 0,
      checkAllcolumn: false,
      selectedList: [],
      Dialogopen: false,
      VendorDetailList: [],
      ContactDetailList: [],
      DocumentDetailList: [],
      ServiceOfferedList: [],
    };
  }
  serviceOffered = () => {
    let data = {
      stringMapType: "SERVICEOFFERED",
    };

    api.post("stringMap/getstringMap", data).then((result) => {
      if (result.success) {
        const seriveList = result.data.map((type) => {
          return { value: type.Description, label: type.Description };
        });
        var i = 0;
        seriveList.map((OBJ) => {
          OBJ.IsSelected = false;
          OBJ.Index = i;
          i++;
          return OBJ;
        });
        for (let i = 0; i < seriveList.length; i++) {
          seriveList[i].Index = i + 1;
          console.log("Test = ", seriveList[i].Index);
        }
        var data = {
          value: "All",
          label: "All",
          IsSelected: false,
          Index: 0,
        };
        seriveList.push(data);
        seriveList.sort((a, b) => a.Index - b.Index);

        console.log("ServiceList = ", seriveList);
        this.setState({ servicelist: seriveList });
      }
    });
  };

  addVendor = () => {
    this.props.history.push("/admin/AddEditVendors");
  };

  showLoader() {
    this.setState({ Loading: true });
  }

  hideLoader() {
    this.setState({ Loading: false });
  }

  MapVendor = () => {
    this.props.history.push({
      pathname: "/admin/MapVendor",
      state: {
        serviceValue: this.state.serviceValue,
        servicelist: this.state.servicelist,
        vendorList: this.state.vendorList,
        filterlist: this.state.filterProps,
        sortlist: this.state.sortProps,
      },
    });
  };

  componentDidMount() {
    this.setState({ Access: CommonConfig.getUserAccess("Vendor Management") });
    this.serviceOffered();
    this.getVendorList();
    if (
      this.props.history.location.state !== undefined &&
      this.props.history.location.state !== null
    ) {
      this.setState({
        previousFilterList: this.props.history.location.state.filterlist,
        previousSortList: this.props.history.location.state.sortlist,
        serviceValue:
          this.props.history.location.state.serviceValue !== undefined
            ? this.props.history.location.state.serviceValue
            : this.state.serviceValue,
      });
    } else {
      var finalStatus = {
        id: "services",
        value: "Auto Transport",
      };
      this.setState({ previousFilterList: [finalStatus] });
    }
  }
  getVendorList() {
    try {
      this.showLoader();
      api
        .get("vendor/getVendorList")
        .then((res) => {
          debugger;
          if (res.success) {
            if (this.state.Access.AllAccess === 1) {
              var FinalVendorList = [];
              var i = 0;
              res.data.map((OBJ) => {
                OBJ.IsSelected = false;
                OBJ.Index = i;
                i++;
                return OBJ;
              });
              this.setState({ vendorList: res.data, Loading: false });
            } else {
              debugger;
              var FinalVendorList = [];
              FinalVendorList = res.data.filter(
                (x) => x.PersonID === CommonConfig.loggedInUserData().PersonID
              );
              var i = 0;
              FinalVendorList.map((OBJ) => {
                OBJ.IsSelected = false;
                OBJ.Index = i;
                i++;
                return OBJ;
              });
              this.setState({ vendorList: FinalVendorList, Loading: false });
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

  editVendor = (record) => {
    const { history } = this.props;
    let vendorId = record.original.VendorID;
    history.push({
      pathname: "AddEditVendors/",

      state: {
        vendorId: vendorId,
        filterlist: this.state.filterProps,
        sortlist: this.state.sortProps,
        serviceValue: this.state.serviceValue,
      },
    });
  };

  handleCheckboxChange = (e, record, type) => {
    debugger;
    let checkedArr = this.state.servicelist;
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

      this.filterMethod("Hello", previousList);
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
    // console.log("checkedArr = ",checkdata);
  };

  filterMethod = (event, value) => {
    console.log("value= ", value);
    this.setState({ serviceValue: value });
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
    if (params.InputProps.startAdornment) {
      params.InputProps.startAdornment.splice(
        0,
        params.InputProps.startAdornment.length
      );
    }
    return <TextField {...params} variant="outlined" label="Services" />;
  };

  renderOption = (option) => {
    let selectedValue =
      this.state.serviceValue.findIndex((x) => x.value === option.value) !== -1
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
  activeInactiveVendor = (record, Type) => {
    let data = {
      VendorID: record.original.VendorID,
      Status: Type,
      UserID: CommonConfig.loggedInUserData().PersonID,
    };

    try {
      api
        .post("vendor/activeInactiveVendor", data)
        .then((res) => {
          if (res.success) {
            this.getVendorList();
          } else {
            cogoToast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {}
  };
  checkboxHeader = (props) => {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.state.checkAllcolumn}
          onChange={(e) => this.handleCheckboxChangecolumn(e, props, "All")}
        />
      </div>
    );
  };
  handleCheckboxChangecolumn = (e, record, type) => {
    debugger;
    // let Type = this.state.currentTab;
    let checkedArr = this.state.vendorList;
    if (type === "Single") {
      checkedArr[record.original.Index]["IsSelected"] = e.target.checked;
    } else {
      let propsArr = record.data.map((x) => x._original);
      checkedArr.map((OBJ) => {
        OBJ.IsSelected =
          propsArr.findIndex((x) => x.Index === OBJ.Index) !== -1
            ? e.target.checked
            : OBJ.IsSelected;
        return OBJ;
      });

      this.setState({
        checkAllcolumn: e.target.checked,
      });
    }
    let previousList = checkedArr.filter((x) => x.IsSelected === true);
    //let arrType = "previousSelected" + Type;

    this.setState({
      vendorList: checkedArr,
      selectedList: previousList,
    });
  };
  renderCheckbox = (record) => {
    return (
      <div>
        <input
          type="checkbox"
          checked={record.original.IsSelected}
          onChange={(e) => this.handleCheckboxChangecolumn(e, record, "Single")}
        />
      </div>
    );
  };

  DownloadExcel = () => {
    debugger;
    this.showLoader();
    let List = this.state.selectedList;
    if (this.state.selectedList.length === 0) {
      this.hideLoader();
      return cogoToast.error("Please select vendor");
    }
    List = List.filter((x) => x.IsSelected === true).map((obj) => {
      return obj;
    });

    console.log("List", List);
    api
      .post("vendor/getVendorDataForExcel", List)
      .then((result) => {
        if (result.data.success) {
          this.hideLoader();
          this.setState({
            VendorDetailList: result.data.data.VendorMaster, //ServiceOffered
            ContactDetailList: result.data.data.Contacts,
            DocumentDetailList: result.data.data.Documents,
            ServiceOfferedList: result.data.data.ServiceOffered,
            Dialogopen: true,
          });
        } else {
          this.hideLoader();
          cogoToast.error("Something Went Wrong");
        }
      })
      .catch((err) => {
        this.hideLoader();
        cogoToast.error("Something Went Wrong");
      });
  };
  s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };
  doExcel1 = (tableId1, tableId2, tableId3, tableId4) => {
    debugger;
    let targetTableElm1 = document.getElementById(tableId1);
    let targetTableElm2 = document.getElementById(tableId2);
    let targetTableElm3 = document.getElementById(tableId3);
    let targetTableElm4 = document.getElementById(tableId4);

    const wb = { SheetNames: [], Sheets: {} };
    var ws1 = XLSX.utils.table_to_book(targetTableElm1, { raw: true }).Sheets
      .Sheet1;
    wb.SheetNames.push("Vendor Detail");
    wb.Sheets["Vendor Detail"] = ws1;

    var ws2 = XLSX.utils.table_to_book(targetTableElm2, { raw: true }).Sheets
      .Sheet1;
    wb.SheetNames.push("Service Detail");
    wb.Sheets["Service Detail"] = ws2;

    var ws3 = XLSX.utils.table_to_book(targetTableElm3, { raw: true }).Sheets
      .Sheet1;
    wb.SheetNames.push("Contact Detail");
    wb.Sheets["Contact Detail"] = ws3;

    var ws4 = XLSX.utils.table_to_book(targetTableElm4, { raw: true }).Sheets
      .Sheet1;
    wb.SheetNames.push("Document Detail");
    wb.Sheets["Document Detail"] = ws4;

    const blob = new Blob(
      [this.s2ab(XLSX.write(wb, { bookType: "xlsx", type: "binary" }))],
      {
        type: "application/octet-stream",
      }
    );

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "VendorDetailsExcelSheet.xlsx";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.setState({ Dialogopen: false, selectedList: [] });
  };
  renderVendorMasterData = () => {
    return this.state.VendorDetailList.map((service) => {
      const {
        VendorID,
        Name,
        Website,
        GSTNo,
        VendorType,
        EINNumber,
        SSNNumber,
        AddressLine1,
        AddressLine2,
        AddressLine3,
        City,
        State,
        ZipCode,
        Country,
        CreatedBy,
        CreatedOn,
      } = service;
      return (
        <tr>
          <td>{VendorID}</td>
          <td>{Name}</td>
          <td>{Website}</td>
          <td>{GSTNo}</td>
          <td>{VendorType}</td>
          <td>{EINNumber}</td>
          <td>{SSNNumber}</td>
          <td>{AddressLine1}</td>
          <td>{AddressLine2}</td>
          <td>{AddressLine3}</td>
          <td>{City}</td>
          <td>{State}</td>
          <td>{ZipCode}</td>
          <td>{Country}</td>
          <td>{CreatedBy}</td>
          <td>{CreatedOn}</td>
        </tr>
      );
    });
  };

  renderServiceOfferedData = () => {
    return this.state.ServiceOfferedList.map((service) => {
      const { VendorID, Name, ServiceName } = service;
      return (
        <tr>
          <td>{VendorID}</td>
          <td>{Name}</td>
          <td>{ServiceName}</td>
        </tr>
      );
    });
  };

  renderDocumentDetailsData = () => {
    return this.state.DocumentDetailList.map((service) => {
      const { VendorID, Name, Description, AttachmentPath } = service;
      return (
        <tr>
          <td>{VendorID}</td>
          <td>{Name}</td>
          <td>{Description}</td>
          {AttachmentPath !== null ? (
            <td>
              {" "}
              <a href={fileBase + AttachmentPath}>
                {fileBase + AttachmentPath}
              </a>
            </td>
          ) : (
            <td>{AttachmentPath}</td>
          )}
        </tr>
      );
    });
  };

  renderConatctsData = () => {
    return this.state.ContactDetailList.map((service) => {
      const {
        VendorID,
        VendorName,
        Name,
        PhoneNum,
        Email,
        AddressLine1,
        AddressLine2,
        AddressLine3,
        City,
        State,
        ZipCode,
        Country,
      } = service;
      return (
        <tr>
          <td>{VendorID}</td>
          <td>{VendorName}</td>
          <td>{Name}</td>
          <td>{PhoneNum}</td>
          <td>{Email}</td>
          <td>{AddressLine1}</td>
          <td>{AddressLine2}</td>
          <td>{AddressLine3}</td>
          <td>{City}</td>
          <td>{State}</td>
          <td>{ZipCode}</td>
          <td>{Country}</td>
        </tr>
      );
    });
  };

  render() {
    const { vendorList, servicelist } = this.state;

    const columns = [
      {
        Header: (props) => this.checkboxHeader(props),
        Cell: this.renderCheckbox,
        sortable: false,
        filterable: false,
        width: 40,
      },
      {
        Header: "Name",
        accessor: "Name",
        maxWidth: 160,
      },
      {
        Header: "VendorType",
        accessor: "VendorType",
        width: 100,
      },
      {
        Header: "Services",
        accessor: "services",
        width: 250,
        id: "services",
        Cell: (record) => {
          if (Object.values(record.value).length) {
            return record.value.map((content, index) => {
              return record.value[record.value.length - 1]["serviceName"] ===
                content.serviceName ? (
                <span>{content.serviceName}</span>
              ) : (
                <span>{content.serviceName} | </span>
              );
            });
          } else {
            return null;
          }
        },
        Filter: ({ filter, onChange }) => {
          return <input type="text" />;
        },
        filterable: true,
        filterMethod: (filter, row) => {
          if (this.state.serviceValue.length) {
            if (row.services.length) {
              for (var i = 0; i < this.state.serviceValue.length; i++) {
                for (var j = 0; j < row.services.length; j++) {
                  if (
                    row.services[j]["serviceName"] ===
                    this.state.serviceValue[i].value
                  ) {
                    return row;
                  }
                }
              }
            }
          } else {
            return row;
          }
        },
      },
      {
        Header: "Country",
        accessor: "Country",
        width: 100,
      },
      {
        Header: "CreatedBy",
        accessor: "CreatedBy",
        width: 100,
      },

      {
        Header: "Status",
        Cell: (record) => {
          if (record.original.Status === "Active") {
            return (
              <Button
                color="success"
                className="table-btn"
                onClick={() => this.activeInactiveVendor(record, "Inactive")}
              >
                Active
              </Button>
            );
          } else {
            return (
              <Button
                color="danger"
                className="table-btn"
                onClick={() => this.activeInactiveVendor(record, "Active")}
              >
                Inactive
              </Button>
            );
          }
        },
        accessor: "Status",
        id: "status",
        width: 100,
        Footer:
          this.state.vendorList.length === 0 ? null : (
            <Button
              style={{ width: "85px", height: "25px" }}
              color="rose"
              onClick={(e) => this.DownloadExcel()}
            >
              {" "}
              Download
            </Button>
          ),
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
                onClick={() => this.editVendor(record)}
              >
                <i className="fas fa-edit"></i>
              </Button>
            </div>
          );
        },
      },
    ];

    return (
      <div>
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}
        <GridContainer className="UserList-outer">
          <GridItem xs={12}>
            <Card>
              <CardHeader className="btn-right-outer" color="primary" icon>
                <CardIcon color="primary">
                  <Store />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">
                  Vendor List
                </h4>

                <div class="vendor-top-buttons">
                  <div class="add-vendor-btn">
                    {this.state.Access.WriteAccess === 1 ? (
                      <Button
                        color="primary"
                        className=""
                        onClick={() => this.addVendor()}
                      >
                        Add Vendor
                      </Button>
                    ) : null}

                    {
                      <Button
                        color="primary"
                        className=""
                        onClick={() => this.MapVendor()}
                      >
                        Map View
                      </Button>
                    }
                  </div>

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
                      Services <ExpandMoreIcon />
                    </Button>
                    {this.state.IsDropDownShow === true ? (
                      <div className="cm-dropdown" ref={this.state.ref}>
                        <div className="overflow-handle">
                          {this.state.servicelist.map((step, key) => {
                            return (
                              <li>
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={step.IsSelected}
                                    onChange={(e, value) =>
                                      this.handleCheckboxChange(
                                        e,
                                        step,
                                        step.value
                                      )
                                    }
                                    value={this.state.serviceValue}
                                  />{" "}
                                  {step.value}
                                </label>
                              </li>
                            );
                          })}
                        </div>
                        <div className="cms-wrap">
                          {/* <Button
                            className="cm-search-btn"
                            color="rose"
                          // onClick={() => this.showSearchFilter("Shipment")}
                          >
                            Search
                          </Button> */}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={vendorList}
                  minRows={2}
                  pageText={"Total rows : " + this.state.finalLength}
                  defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                  getPaginationProps={(e) => this.checkProps(e)}
                  getTheadFilterProps={(e) => this.filterProps(e)}
                  filterable
                  defaultSorted={this.state.previousSortList}
                  defaultFiltered={this.state.previousFilterList}
                  resizable={false}
                  columns={columns}
                  defaultPageSize={10}
                  showPaginationBottom={true}
                  className="-striped -highlight"
                />
                {/* <div className="shipment-submit">
                  <div className="right">
                    <Button color="rose" onClick={(e) => this.DownloadExcel()}>
                      Download
                    </Button>
                  </div>
                </div> */}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <div>
          <Dialog
            maxWidth={671}
            open={this.state.Dialogopen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <div>Your Excel Sheet is Generated Successfully.</div>
            </DialogContent>
            <DialogActions>
              <Button
                color="rose"
                onClick={() =>
                  this.doExcel1(
                    "table-to-xls1",
                    "table-to-xls2",
                    "table-to-xls3",
                    "table-to-xls4"
                  )
                }
              >
                Download
              </Button>
              <Button
                color="danger"
                onClick={() => this.setState({ Dialogopen: false })}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="d-none">
          <table id="table-to-xls1" cellSpacing="10" cellPadding="10">
            <thead>
              <tr>
                <th>
                  <font size="+0">Vendor ID</font>
                </th>
                <th>
                  <font size="+0">Name</font>
                </th>
                <th>
                  <font size="+0">WebSite</font>
                </th>
                <th>
                  <font size="+0">GSTNo</font>
                </th>
                <th>
                  <font size="+0">Vendor Type</font>
                </th>
                <th>
                  <font size="+0">EINNumber</font>
                </th>
                <th>
                  <font size="+0">SSNNumber</font>
                </th>
                <th>
                  <font size="+0">AddressLine 1</font>
                </th>
                <th>
                  <font size="+0">AddressLine 2</font>
                </th>
                <th>
                  <font size="+0">AddressLine 3</font>
                </th>
                <th>
                  <font size="+0">City</font>
                </th>
                <th>
                  <font size="+0">State</font>
                </th>
                <th>
                  <font size="+0">ZipCode</font>
                </th>
                <th>
                  <font size="+0">Country</font>
                </th>
                <th>
                  <font size="+0">CreatedBy</font>
                </th>
                <th>
                  <font size="+0">CreatedOn</font>
                </th>
              </tr>
            </thead>
            <tbody>{this.renderVendorMasterData()}</tbody>
          </table>
        </div>

        <div className="d-none">
          <table id="table-to-xls2" cellSpacing="10" cellPadding="10">
            <thead>
              <tr>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Vendor ID</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Vendor Name</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Service Name</font>
                </th>
              </tr>
            </thead>
            <tbody>{this.renderServiceOfferedData()}</tbody>
          </table>
        </div>

        <div className="d-none">
          <table id="table-to-xls3" cellSpacing="10" cellPadding="10">
            <thead>
              <tr>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Vendor ID</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Vendor Name</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Contact Name</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Phone</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Email</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">AddressLine 1</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">AddressLine 2</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">AddressLine 3</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">City</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">State</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">ZipCode</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Country</font>
                </th>
              </tr>
            </thead>
            <tbody>{this.renderConatctsData()}</tbody>
          </table>
        </div>

        <div className="d-none">
          <table id="table-to-xls4" cellSpacing="10" cellPadding="10">
            <thead>
              <tr>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Vendor ID</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Vendor Name</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">File Name</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Attachment Path</font>
                </th>
              </tr>
            </thead>
            <tbody>{this.renderDocumentDetailsData()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Vendor;
