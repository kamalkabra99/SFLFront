import React, { Component } from "react";
import SimpleBackdrop from "../../utils/general";
import ReactTable from "react-table";
import api from "../../utils/apiClient";
import { CommonConfig } from "../../utils/constant";
import moment from "moment";
import cogoToast from "cogo-toast";
import UserList from "@material-ui/icons/People";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import zipcelx from "zipcelx";
import * as XLSX from "xlsx";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Datetime from "react-datetime";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
var fileNameSet = "";

setInterval(() => {
  var currdate = new Date();
  fileNameSet =
    "User-" +
    currdate.getFullYear() +
    (currdate.getMonth() + 1) +
    currdate.getDate() +
    "-" +
    currdate.getHours() +
    currdate.getMinutes() +
    currdate.getSeconds();
  // console.log("FileName = ",fileNameSet)
}, 1000);

class UserLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Loading: false,
      fileSetName: "",
      userList: [],
      userListSal:[],
      filterProps: [],
      sortProps: [],
      previousFilterList: [],
      previousSortList: [],
      Name:"",
      UserName:"",
      UserType:[],
      Email:"",
      CreatedOn:"",
      AccountNumber:"",
      ManagedBy:[],
      Status:[],
      UserStatusList: [
        {
          label: "Enable",
          value: "Enable",
        },
        {
          label: "Disable",
          value: "Disable",
        },
      ],
      UserTypeList: [
        {
          label: "Customer",
          value: "Customer",
        },
        {
          label: "Employee",
          value: "Employee",
        },
        {
          label: "Contractor",
          value: "Contractor",
        },
      ],
      ManagedByList:[],
    };
  }

  componentDidMount() {
  //  this.getUserList();
    if (
      this.props.history.location.state !== undefined &&
      this.props.history.location.state !== null
    ) {
      this.setState({
        previousFilterList: this.props.history.location.state.filterlist,
        previousSortList: this.props.history.location.state.sortlist,
      });
    } else {
      var defaultSort = {
        id: "CreatedOn",
        desc: true,
      };
      this.setState({ previousSortList: [defaultSort] });
    }
    this.getManagedBy();
  }
  doExcel1 = (tableId1, tableId2, tableId3) => {
    debugger;
    let targetTableElm1 = document.getElementById(tableId1);
    let targetTableElm2 = document.getElementById(tableId2);
    // let targetTableElm3 = document.getElementById(tableId3);

    const wb = { SheetNames: [], Sheets: {} };
    var ws1 = XLSX.utils.table_to_book(targetTableElm1, { raw: true }).Sheets
      .Sheet1;
    wb.SheetNames.push("User Detail");
    wb.Sheets["User Detail"] = ws1;

    var ws2 = XLSX.utils.table_to_book(targetTableElm2, { raw: true }).Sheets
      .Sheet1;
    wb.SheetNames.push("Account Details");
    wb.Sheets["Account Details"] = ws2;


    const blob = new Blob(
      [this.s2ab(XLSX.write(wb, { bookType: "xlsx", type: "binary" }))],
      {
        type: "application/octet-stream",
      }
    );

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "UserDetails.xlsx";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.setState({ Dialogopen: false });
  };

  s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };


  renderShipmentData = () => {
    return this.state.userList.map((service) => {
      const {
        PersonID,
        UserType,
        Name,
        LoginID, 
        Email,
        PhoneNum, 
        AccountNumber,
        ManagedByName, 
        Status,
        TimeZone,
        StartTime,
        EndTime,
        Birthdate,
        Joiningdate,
        empAddressLine1,
        empAddressLine2,
        empZipcode,
        empCity,
        empState,
        empPhone,
        empEmail,
        Salary,
        Currency,
        Department,
        EmployeeID,
        AddressLine1,
        AddressLine2,
        AddressLine3,
        City,
        CompanyName,
        State,
        ZipCode

      } = service;
      return (
        <tr>
          <td>{PersonID}</td>
          <td>{UserType}</td>
          <td>{Name}</td>
          <td>{LoginID}</td>
          <td>{CompanyName}</td>
          <td>{Email}</td>
          <td>{PhoneNum}</td>
          <td>{AddressLine1}</td>
          <td>{AddressLine2}</td>
          <td>{AddressLine3}</td>
          <td>{City}</td>
          <td>{State}</td>
          <td>{ZipCode}</td>
          <td>{AccountNumber}</td>
          <td>{ManagedByName}</td>
          <td>{Status}</td>
          <td>{TimeZone}</td>
          <td>{StartTime}</td>
          <td>{EndTime}</td>
          <td>{Birthdate}</td>
          <td>{Joiningdate}</td>
          <td>{empPhone}</td>
          <td>{empEmail}</td>

          <td>{empAddressLine1}</td>
          <td>{empAddressLine2}</td>
          <td>{empCity}</td>
          <td>{empState}</td>
          <td>{empZipcode}</td>
          <td>{Salary}</td>
          <td>{Currency}</td>
          <td>{Department}</td>
          <td>{EmployeeID}</td>
        </tr>
      );
    });
  };
  dateChange = (date, type) => {
    if (type === "CreatedOn") 
      {
        if(date!="")
          this.setState({ CreatedOn: date });    
        else
          this.setState({ CreatedOn: "" });
      }
  };

  renderTrackingData = () => {
    return this.state.userListSal.map((service) => {
      const {
        LoginID,
        Name,
        AccountType,
        AccountName,
        AccountNumber,
        NameOnAccount,
        RoutingCode
      } = service;
      return (
        <tr>
          <td>{LoginID}</td>

          <td>{Name}</td>
          <td>{AccountType}</td>
          <td>{AccountName}</td>
          <td>{AccountNumber}</td>
          <td>{NameOnAccount}</td>
          <td>{RoutingCode}</td>
          
        </tr>
      );
    });
  };
  getUserList(Name,UserName,UserType,Email,CreatedOn,AccountNumber,ManagedBy,Status) {
    debugger
    try {
      if((Name==="" || Name===undefined) &&(UserName==="" || UserName===undefined) &&(AccountNumber==="" || AccountNumber===undefined) &&(Email==="" || Email===undefined) &&( UserType.length ===0 || UserType===undefined) &&(CreatedOn==="" || CreatedOn===undefined) &&(ManagedBy.length ===0 || ManagedBy===undefined) &&(Status.length ===0 || Status===undefined)  )
      {
        cogoToast.error("Please Select Atleast One Criteria");

      }
      else{
      let data = {
        "Name":Name===""|| Name===undefined ?"":Name,
        "UserName":UserName===""|| UserName===undefined ?"":UserName,
        "UserType":UserType.length ===0||UserType===undefined ?"":UserType.value,
        "Email":Email===""||Email===undefined?"":Email,
        "CreatedOn":CreatedOn===""?"":moment(CreatedOn).format(CommonConfig.dateFormat.dbDateOnly),
        "AccountNumber":AccountNumber===""||AccountNumber===undefined?"":AccountNumber,
        "ManagedBy":ManagedBy.length ===0||ManagedBy===undefined?"":ManagedBy.value,
        "Status":Status.length ===0||Status===undefined?"":Status.value,
      };

      api
        .post("userManagement/getUserList", data)
        .then((res) => {

          if (res.success) {

            if(CommonConfig.getUserAccess("User Management").AllAccess === 1){
              this.setState({ fileSetName: fileNameSet });
              this.setState({ userList: res.data, Loading: false });
            }else{
              let proposalData = res.data.filter(
                (x) => x.PersonID === CommonConfig.loggedInUserData().PersonID
              );
              this.setState({ fileSetName: fileNameSet });
              
              this.setState({ userList: proposalData, Loading: false });
             

            }

            api
            .get("userManagement/getUserSalary")
            .then((resSal) => {
              if (resSal.success) {

                if(CommonConfig.getUserAccess("User Management").AllAccess === 1){
                  // this.setState({ fileSetName: fileNameSet });
                  this.setState({ userListSal: resSal.data, Loading: false });
                  console.log("resSal.data = ",resSal.data)
                }else{
                  let proposalDataSal = resSal.data.filter(
                    (x) => x.PersonID === CommonConfig.loggedInUserData().PersonID
                  );
                  // this.setState({ fileSetName: fileNameSet });
                  
                  this.setState({ userListSal: proposalDataSal, Loading: false });

                }

                
              } else {
                cogoToast.error("Something Went Wrong");
              }
            })
            .catch((err) => {
              cogoToast.error("Something Went Wrong");
            });

            
          } else {
            cogoToast.error("Something Went Wrong");
          }

        })
        .catch((err) => {
          console.log(err);
        });
      }

    } catch (err) {
      console.log("error", err);
    }
    
  }
  reset = () => {
    this.setState({
      Name: "",
      ManagedBy: "",
      CreatedOn: "",
      UserName: "",
      UserTpye:[],
      Status:[],
      ManagedBy:[],
      Email:"",
      AccountNumber:"",
      userList:[],
    });
  };

  addUser = () => {
    this.props.history.push("AddUserNew/");
  };

  activeInactiveUser = (record) => {
    let data = {
      personID: record.original.PersonID,
      status: record.original.Status === "Active" ? "Inactive" : "Active",
    };

    try {
      this.setState({ Loading: true });
      api
        .post("userManagement/activeInactiveUser", data)
        .then((res) => {
          if (res.success) {
            this.getUserList();
          } else {
            cogoToast.error("Something Went Wrong");
          }
        })
        .catch((err) => {
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {}
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

  editUser = (record) => {
    const { history } = this.props;
    let UserID = record.original.PersonID;
    history.push({
      pathname: "EditUser",
      state: UserID,
      filterlist: this.state.filterProps,
      sortlist: this.state.sortProps,
    });
  };
  inputChange = (e, type) => {debugger
    this.setState({
      [type]: e.target.value,
    });
  };
  getManagedBy() {debugger
    try {
      api
        .get("contactus/getUsersForTMSList")
        .then((res) => {
          if (res.success) {
            for (var j = 0; j < res.Data.length; j++) {
              this.state.ManagedByList.push(res.Data[j]);
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
  handleChange = (event, value,type) => {
    debugger
    if (type === "ManagedBy") {
    
 
      if (value === "" || value === null) {
      
         this.setState({
          ManagedBy: [],
          
        });
      } else {
        var selectData ={
          label:value.label,
          value:value.value
        }
        this.setState({
          ManagedBy: selectData,
         
        });
      }
    } else
    if (type === "Status") {
    
 
      if (value === "" || value === null) {
      
         this.setState({
          Status: [],
          
        });
      } else {
        var selectData ={
          label:value.label,
          value:value.value
        }
        this.setState({
          Status: selectData,
         
        });
      }
    }
    else
    if (type === "UserType") {
    
 
      if (value === "" || value === null) {
      
         this.setState({
          UserType: [],
          
        });
      } else {
        var selectData ={
          label:value.label,
          value:value.value
        }
        this.setState({
          UserType: selectData,
         
        });
      }
    }
  };
  render() {
    const { userList,fileSetName,userListSal } = this.state;
    const userstatus = this.state.UserStatusList.map((type) => {
      return { value: type.value, label: type.label };
    });
    const userType = this.state.UserTypeList.map((type) => {
      return { value: type.value, label: type.label };
    });
    const managedBy = this.state.ManagedByList.map((type) => {
      return { value: type.PersonId, label: type.ContactName };
    });
    const handelExportToExcel = (evt) => {
      const headData = Object.keys(userList[0]).map((col) => ({
        value: col,
        type: "string",
      }));
      const bodyData = userList.map((item) =>
        Object.values(item).map((value) => ({
          value,
          type: typeof value,
        }))
      );

      console.log("userListSal = ",userListSal)

      const headDataSal = Object.keys(userListSal[0]).map((col) => ({
        value: col,
        type: "string",
      }));
      const bodyDataSal = userListSal.map((item) =>
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
        // sheet: {
        //   data: [headDataSal, ...bodyDataSal],
        //   columns: headDataSal.map((col) => ({ wch: 2000 })),
        // },
      };
      console.log("hello = ", config);
      zipcelx(config);
    };

    const columns = [
      {
        Header: "Name",
        accessor: "Name",
        maxWidth: 100,
      },
      {
        Header: "User Name",
        accessor: "LoginID",
        maxWidth: 110,
      },
      {
        Header: "User Type",
        accessor: "UserType",
        width: 100,
      },
      {
        Header: "Email",
        accessor: "Email",
        width: 200,
      },
      
      {
        id: "CreatedOn",
        Header: "Created On",
        width: 100,
        sortMethod: (a, b) => {
          return CommonConfig.dateSortMethod(a, b);
        },
        accessor: (data) => {
          return moment(data.CreatedOn).format(
            CommonConfig.dateFormat.dateOnly
          );
        },
      },
      {
        Header: "Account No.",
        accessor: "AccountNumber",
        width: 100,
      },
      {
        Header: "Managed By",
        accessor: "ManagedByName",
        width: 100,
      },
      {
        Header: "Status",
        width: 100,
        sortable: true,
        filterable: true,
        accessor: "Status",

        // Cell: (record) => {
        //   if (record.original.Status === "Active") {
        //     return (
        //       <Button
        //         color="success"
        //         className="table-btn"
        //         onClick={() => this.activeInactiveUser(record)}
        //       >
        //         Active
        //       </Button>
        //     );
        //   } else {
        //     return (
        //       <Button
        //         color="danger"
        //         className="table-btn"
        //         onClick={() => this.activeInactiveUser(record)}
        //       >
        //         Inactive
        //       </Button>
        //     );
        //   }
        // },
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
                onClick={() => this.editUser(record)}
              >
                <i className="fas fa-edit"></i>
              </Button>
            </div>
          );
        },
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
                <UserList />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">User List</h4>
              
              <Button
                justIcon
                color="danger"
                // onClick={handelExportToExcel}
                onClick={() =>
                  this.doExcel1(
                    "table-to-xls1",
                    "table-to-xls2",
                  )
                }
              >
                <i class="fas fa-download"></i>
              </Button>
              
              <Button
                color="primary"
                className=""
                onClick={() => this.addUser()}
              >
                Add User
              </Button>
            
            </CardHeader>
            <CardBody>
                
            <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
                      <div className="mt-15">
                          <FormControl fullWidth>
                            <TextField
                              label="Name"
                              value={this.state.Name}
                              onChange={(event) =>
                                this.inputChange(event, "Name")
                              }
                            />
                          </FormControl>
                        </div>
                       
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                      <div className="mt-15">
                          <FormControl fullWidth>
                            <TextField
                              label="User Name"
                              value={this.state.UserName}
                              onChange={(event) =>
                                this.inputChange(event, "UserName")
                              }
                            />
                          </FormControl>
                        </div>
                       
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <FormControl fullWidth>
                          <Autocomplete
                            options={userType}
                            id="UserType"
                            getOptionLabel={(option) => option.label}
                            value={this.state.UserType}
                            autoSelect
                            autoComplete="new-password"
                            onChange={(event, value) =>
                              this.handleChange(event,value,"UserType")
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="User Type"
                                error={this.state.VendorcountryErr}
                                helperText={this.state.VendorcountryHelperText}
                                fullWidth
                              />
                            )}
                          />
                        </FormControl>
                      </GridItem>
                      </GridContainer>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <div className="mt-15">
                          <FormControl fullWidth>
                            <TextField
                              label="Email"
                              value={this.state.Email}
                              onChange={(event) =>
                                this.inputChange(event, "Email")
                              }
                            />
                          </FormControl>
                        </div>
                       
                      </GridItem>
                    
                      <GridItem xs={12} sm={12} md={4} className="z-index-9">
                        <div className="date-spl">
                          <FormControl fullWidth>
                            <Datetime
                              dateFormat={"MM/DD/YYYY"}
                              timeFormat={false}
                              value={this.state.CreatedOn}
                              onChange={(date) =>
                                this.dateChange(date, "CreatedOn")
                              }
                              closeOnSelect={true}
                              renderInput={(params) => (
                                <TextField
                                label="Created On"
                                {...params} fullWidth />
                              )}
                            />
                          </FormControl>
                        </div>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                      <div className="mt-15">
                          <FormControl fullWidth>
                            <TextField
                              label="Account Number"
                              value={this.state.AccountNumber}
                              onChange={(event) =>
                                this.inputChange(event, "AccountNumber")
                              }
                            />
                          </FormControl>
                        </div>
                       
                      </GridItem>
                      
                    </GridContainer>

                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <FormControl fullWidth>
                          <Autocomplete
                            options={managedBy}
                            id="Managed By"
                            getOptionLabel={(option) => option.label}
                            value={this.state.ManagedBy}
                            autoSelect
                            autoComplete="Managed By"
                            onChange={(event, value) =>
                              this.handleChange(event,value,"ManagedBy")
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Managed By"
                                error={this.state.VendorcountryErr}
                                helperText={this.state.VendorcountryHelperText}
                                fullWidth
                              />
                            )}
                          />
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                        <FormControl fullWidth>
                          <Autocomplete
                            options={userstatus}
                            id="Status"
                            getOptionLabel={(option) => option.label}
                            value={this.state.Status}
                            autoSelect
                            autoComplete="Status"
                            onChange={(event, value) =>
                              this.handleChange(event,value,"Status")
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Status"
                                error={this.state.VendorcountryErr}
                                helperText={this.state.VendorcountryHelperText}
                                fullWidth
                              />
                            )}
                          />
                        </FormControl>
                      </GridItem>
                     
                    </GridContainer>

                    <div className="shipment-submit  mt-20">
                      <div className="right">
                        <Button
                          color="rose"
                          onClick={() => this.getUserList(this.state.Name,this.state.UserName,this.state.UserType,this.state.Email,this.state.CreatedOn,this.state.AccountNumber,this.state.ManagedBy,this.state.Status)}
                        >
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
              <ReactTable
                getTheadFilterProps={(e) => this.filterProps(e)}
                defaultFiltered={this.state.previousFilterList}
                data={userList}
                defaultSorted={this.state.previousSortList}
                minRows={0}
                filterable
                defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                resizable={false}
                columns={columns}
                defaultPageSize={10}
                showPaginationBottom={true}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>

          <div className="d-none">
          <table id="table-to-xls1" cellSpacing="10" cellPadding="10">
            <thead>
              <tr>
                <th>
                  <font size="+0">Person Id</font>
                </th>
                <th>
                  <font size="+0">User Type</font>
                </th>

                <th>
                  <font size="+0">Name</font>
                </th>

                <th>
                  <font size="+0">Login Id</font>
                </th>

                <th>
                  <font size="+0">Company Name</font>
                </th>

                <th>
                  <font size="+0">Office Email</font>
                </th>
                
                <th>
                  <font size="+0">Office Phone</font>
                </th>

                <th>
                  <font size="+0">Office AddressLine 1</font>
                </th>

                <th>
                  <font size="+0">Office AddressLine 2</font>
                </th>

                <th>
                  <font size="+0">Office AddressLine 3</font>
                </th>

                <th>
                  <font size="+0">Office City</font>
                </th>

                <th>
                  <font size="+0">Office State</font>
                </th>

                <th>
                  <font size="+0">Office Postal Code</font>
                </th>

                <th>
                  <font size="+0">Account Number</font>
                </th>

                <th>
                  <font size="+0">Managed By</font>
                </th>

                <th>
                  <font size="+0">Status</font>
                </th>

                <th>
                  <font size="+0">Time Zone</font>
                </th>

                <th>
                  <font size="+0">Start Time</font>
                </th>

                <th>
                  <font size="+0">End Time</font>
                </th>
                <th>
                  <font size="+0">Date of Birth</font>
                </th>
                <th>
                  <font size="+0">Date of Joining</font>
                </th>
                
                <th>
                  <font size="+0">Employee Phone</font>
                </th>

                <th>
                  <font size="+0">Employee Email</font>
                </th>

                <th>
                  <font size="+0">Employee AddressLine 1</font>
                </th>

                <th>
                  <font size="+0">Employee AddressLine 2</font>
                </th>

                <th>
                  <font size="+0">Employee City</font>
                </th>

                <th>
                  <font size="+0">Employee State</font>
                </th>

                <th>
                  <font size="+0">Employee Postal Code</font>
                </th>

                <th>
                  <font size="+0">Salary</font>
                </th>

                <th>
                  <font size="+0">Currency</font>
                </th>

                <th>
                  <font size="+0">Department</font>
                </th>

                <th>
                  <font size="+0">Employee ID</font>
                </th>

              </tr>
            </thead>
            <tbody>{this.renderShipmentData()}</tbody>
          </table>
        </div>

        <div className="d-none">
          <table id="table-to-xls2" cellSpacing="10" cellPadding="10">
            <thead>
              <tr>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Login ID</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Name</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Account Type</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Account Name</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Account Number</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Name on Account</font>
                </th>
                <th align="left" bgcolor="#D9D9D9">
                  <font size="+0">Routing Code</font>
                </th>
              </tr>
            </thead>
            <tbody>{this.renderTrackingData()}</tbody>
          </table>
        </div>
        </GridItem>
      </GridContainer>
    );
  }
}

export default UserLists;
