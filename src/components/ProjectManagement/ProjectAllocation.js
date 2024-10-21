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
//import DatePicker from "react-datepicker";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

class ProjectAllocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TimeAllocationList:[],
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
      StartDate:moment().format("YYYY/MM/DD"),
      projectServiceList:[],
      WeekDate:moment().format(CommonConfig.dateFormat.dateOnly).toString(),
      WeekDate1:moment(moment().format(CommonConfig.dateFormat.dateOnly).toString()).startOf('Week').toDate(),
      WeekDateErr:"",
      WeekDateHelperText:"",
      WeekDayFirst:"1",
      WeekDayLast:"7",
      WeekDateFirst:"",
      ResourceID:CommonConfig.loggedInUserData().PersonID,
      TotalDay1:0,
      TotalDay2:0,
      TotalDay3:0,
      TotalDay4:0,
      TotalDay5:0,
      TotalDay6:0,
      TotalDay7:0,
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
        WorkStatus:
          this.props.history.location.state.WorkStatus !== undefined
            ? this.props.history.location.state.WorkStatus
            : this.state.WorkStatus,
      });
    debugger
     
      if (this.props.history.location.state.WorkStatus !== undefined) {
        APIcheck = false;
       
     //    this.filterMethod("", this.props.history.location.state.WorkStatus);
         
          
          
          this.state.WorkStatus =this.props.history.location.state.WorkStatus;
  

          this.setState({WorkStatus:this.props.history.location.state.WorkStatus});
       
        // this.props.history.location.state.WorkStatus.map((step, key) => { console.log("Status+Key","Status"+key);
        //   console.log("document.getElementById(Status+key):-",document.getElementById("Status"+key));//.checked=step.IsSelected;
        // });
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

    if (APIcheck) {
      let newFilter = [{ label: "New", value: "New" , IsSelected: true}, { label: "Open", value: "Open" , IsSelected: true }];
      this.state.checkdata = newFilter;
     // this.filterMethod("", newFilter);
      //this.getStatus();

    }
    this.setState({WeekDayFirst:1,WeekDayLast:7,WeekDateFirst:"2024/10/10"})
  this.getProjectServiceByResourceID();
  this.getTimeAllocationList(this.state.ResourceID,this.state.WeekDate);
  }

  handledInput= (e, ServiceID, ProjectID, type)=>{debugger
          let value = e.target.value;
          console.log(this.state.TimeAllocationList);
          var data= this.state.TimeAllocationList;
          let index = data.findIndex(function(c) { 
            return c.ProjectID === ProjectID && c.ServiceID === ServiceID ; 
        });
        data[index][type] = value;

          this.setState({
            TimeAllocationList: data
          });
          
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
  getTimeAllocationList(rec,Date) {
    debugger
   
      let data = {"ResourceID" :rec,
        "Date":moment(Date).format(CommonConfig.dateFormat.dbDateOnly).toString(),
      };

        //data.StatusQuery = whereClause;

      try {
        this.showLoador();
        api
          .post("projectManagement/getTimeAllocationList", data)
          .then((result) => {
            if (result.success) {
              this.hideLoador();
             
                this.setState({ TimeAllocationList: result.message[0] });
              
              
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
   
  }

  handleEdit(record) {
    debugger
    let TimeAllocationID = record.original.TimeAllocationID;
    this.props.history.push({
      pathname: "AddTimeAllocation/"+TimeAllocationID,
    
    state: {
      id: TimeAllocationID,
      // filterlist: this.state.filterProps,
      // sortlist: this.state.sortProps,
      // WorkStatus: this.state.WorkStatus,
    },
    });
  }
  saveData =  (redirect) => {debugger
    var newData=[];
    var finalAllocationlist = {};
    var data= this.state.TimeAllocationList;
    for(let i=0;i<data.length;i++)
    {   for(let j=1,x=0;j<7;j++,x++){
    //  if(data[i]["Day"+j] !=0){
          finalAllocationlist={
            "ServiceResourceID":data[i]["ServiceResourceID"],
            "ProjectID":data[i]["ProjectID"],
            "ServiceID":data[i]["ServiceID"],
            "Date":moment(moment(this.state.WeekDate1).add(x,"d"))
            .format(CommonConfig.dateFormat.dbDateOnly)
            .toString(),
            "Hours":data[i]["Day"+j],
            "ServiceResourceID":data[i]["ServiceResourceID"],
            Status:"Actual",
            UserId:this.state.ResourceID,
          }
          newData.push(finalAllocationlist);
      //  }
        
        }
         
    }
    console.log(newData);


      // let data = {"TimeAllocationList":this.state.TimeAllocationList,
      //             "ResourceID":this.state.ResourceID,
      //             "WeekDate":this.state.WeekDate
      //           };


      try {
               
      api.post("scheduleshipment/addUpdateProjectAllocation", newData).then( (result) => {
          if (result.success) {
            this.setState({ loading: true });
            cogoToast.success("Save Sucessfully");
          
            this.getTimeAllocationList(this.state.ResourceID,this.state.WeekDate);
            
          } else {
            this.setState({ loading: false });
            cogoToast.error("Something went wrong");
          }
        });
      } catch (err) {
        console.log("error", err);
      }
    
  };


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
        let q=0;
        let allFilter = value.findIndex((x) => x.value === "All");
        if (allFilter === 0) {
          value.splice(allFilter, 1);
          allFilter = -1;
        }
        if (allFilter === -1) {
          for (var j = 0; j < value.length; j++) {
            if(value[j].IsSelected === true){
            if (q === 0) {
              if (value.length === 1) {
               
                StatusQuery =
                  ` AND ( bw.WorkStatus = "` + value[j].value + `")`;
              } else {
                q++;
                StatusQuery =
                  ` AND ( bw.WorkStatus = "` + value[j].value + `"`;
              }
            } else if (j + 1 === value.length) 
              {q--;
              StatusQuery = ` OR bw.WorkStatus = "` + value[j].value + `")`;
            } else {
              
              StatusQuery = ` OR bw.WorkStatus = "` + value[j].value + `"`;
            }
          }
           

            query = query + StatusQuery;
            StatusQuery = "";
          }
        } else {
          value = [{ label: "All", value: "All" }];
        }
        debugger
        if(q != 0)
          query = query+")";
        if (CommonConfig.getUserAccess("Book of Work").AllAccess != 1) {

          query = query + ` AND (bw.AssignedBy = "` + CommonConfig.loggedInUserData().PersonID + `" OR bw.AssignedTo = "` + CommonConfig.loggedInUserData().PersonID + `")`

        }
        console.log("query",query);
        this.getBookofWorkData(query);
      } else {
        this.setState({ BookofWorkData: [] });
      }
   //   this.setState({ statusList: value });
    }
  };

  getProjectServiceByResourceID() {
    debugger
    try {
      let data = {
        ResourceID: CommonConfig.loggedInUserData().PersonID,
      };

      api
        .post("ProjectManagement/getProjectServiceByResourceID", data)
        .then((result) => {
          //console.log("xyzxyzxyzxyz",result.data[0]);
          this.setState({projectServiceList:result.data[0]})
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  }

  getProjectAllocationByResourceID() {
    debugger
    try {
      let data = {
        ResourceID: CommonConfig.loggedInUserData().PersonID,
      };

      api
        .post("ProjectManagement/getProjectServiceByResourceID", data)
        .then((result) => {
          //console.log("xyzxyzxyzxyz",result.data[0]);
          this.setState({projectServiceList:result.data[0]})
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

  AddTimeAllocation = () => {
    this.props.history.push({
      pathname: "AddTimeAllocation/",
      state: {
        filterlist: this.state.filterProps,
        sortlist: this.state.sortProps,
        WorkStatus: this.state.WorkStatus,
      },
    });
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
getColumns= () => {debugger
  var column =[];
let x;

let WeekDateFirst = this.state.WeekDate1;
//const dateTo = moment(WeekDateFirst).endOf('isoWeek').toDate();  


//console.log("dateFromdateFromdateFromdateFrom",dateFrom);
//console.log("dateTodateTodateTodateTodateTodateTo",dateTo);
  for(let i= -1;i<=7;i++)
  {
    if(i == -1){
      column.push({
        Header: "Project Name",
        accessor: "ProjectName",
        width: 150,
        filterable: true,
        sortable: true,
        maxWidth: 150,
      }) ;
      x=moment(WeekDateFirst).format("MM/DD/YY")+" ("+moment(WeekDateFirst).format('ddd')+")";}
    else
    if(i == 0)
      column.push({
        Header: "Service Name",
        accessor: "ServiceName",
        filterable: true,
        sortable: true,
        width: 100,
        maxWidth: 150,
      }) ;
    else{
  
    column.push({
      Header: x,
      accessor: "Day"+i,
      filterable: true,
      sortable: true,
      width: 100,
      maxWidth: 150,
      Cell: (record) => {
        return (
          <div className="default-input">
            {record.original.ProjectName !="Total"?
            <input
              type="text"
              name={"Day"+record.original.ProjectID+record.original.ServiceID+i}
              value={record.original.Day1!="" && i==1?record.original.Day1:record.original.Day2!="" && i==2?record.original.Day2:record.original.Day3!="" && i==3?record.original.Day3:record.original.Day4!="" && i==4?record.original.Day4:record.original.Day5!="" && i==5?record.original.Day5:record.original.Day6!="" && i==6?record.original.Day6:record.original.Day7!="" && i==7?record.original.Day7:0}
              onChange={(event) =>
                this.handledInput(event, record.original.ServiceID, record.original.ProjectID, "Day"+i)
              }
              // onBlur={(e) =>
              //   this.handleBlur(e, record.original.ServiceID, record.original.MarkupType, "Markup")
              // }
            />:<p class="total-hours">{record.original.Day1!="" && i==1?record.original.Day1:record.original.Day2!="" && i==2?record.original.Day2:record.original.Day3!="" && i==3?record.original.Day3:record.original.Day4!="" && i==4?record.original.Day4:record.original.Day5!="" && i==5?record.original.Day5:record.original.Day6!="" && i==6?record.original.Day6:record.original.Day7!="" && i==7?record.original.Day7:0}</p>}
          </div>
        );
      },
    }) ;

    WeekDateFirst =moment(WeekDateFirst).add(1,"d");
    x=moment(WeekDateFirst).format("MM/DD/YY")+" ("+moment(WeekDateFirst).format('ddd')+")";
  }
  }

   console.log(column);
    return(column);
  
}
handleDateChange = (date, type) => {
  debugger;

  if (type === "Date") {
    this.setState({
      WeekDate: date,
      WeekDateErr: false,
      WeekDateHelperText: "",
      WeekDate1:moment(date).startOf('Week').toDate()
    });
    this.getTimeAllocationList(this.state.ResourceID,moment(date)
    .format(CommonConfig.dateFormat.dbDateOnly)
    .toString());
  }
};
  render() {
    const { TimeAllocationList } = this.state;
    const column =  this.getColumns();
    
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
              <h4 className="margin-right-auto text-color-black">Project Allocation </h4>

              
              <div className="filter-datepicker">
              
              <div className="tbl-datepicker1">

                <Datetime
                  dateFormat={"MM/DD/YYYY"}
                  timeFormat={false}
                  value={this.state.WeekDate}
                  onChange={(date) =>this.handleDateChange(date, "Date")}
                  fullWidth
                  closeOnSelect={true}
                  renderInput={(params) => (
                    <TextField
                      error={this.state.EndDateErr}
                      helperText={this.state.EndDateHelperText}
                      inputProps={{
                        min: moment().format("YYYY-MM-DD"),
                      }}
                      {...params}
                      label="Date*"
                      margin="normal"
                    
                    />
                  )}
                />
              </div>             
              </div>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={TimeAllocationList}
                defaultPageSize={10}
                minRows={0}
                resizable={false}
                columns={column}
             //   pageText={"Total rows : " + this.state.finalLength}
                showPaginationBottom={true}
                className="-striped -highlight"
              />
            </CardBody>
            <div className="shipment-submit">
            <div className="right">
              
                <Button color="rose" onClick={() => this.saveData(false)}>
                  Save
                </Button>
              </div>
              </div>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
export default ProjectAllocation;
