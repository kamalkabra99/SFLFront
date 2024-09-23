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
    };
  }

  componentDidMount() {
    this.getUserList();
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


  getUserList() {
    try {
      this.setState({ Loading: true });
      api
        .get("userManagement/getUserList")
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
          cogoToast.error("Something Went Wrong");
        });
    } catch (error) {}
  }

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

  render() {
    const { userList,fileSetName,userListSal } = this.state;
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
