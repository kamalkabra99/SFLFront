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
import CustomInput from "components/CustomInput/CustomInput.js";
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
     
      TotalDay1:0,
      TotalDay2:0,
      TotalDay3:0,
      TotalDay4:0,
      TotalDay5:0,
      TotalDay6:0,
      TotalDay7:0,
      ResourceList: [],
      ResourceID:CommonConfig.loggedInUserData().PersonID,
      ResourceName:{"label":CommonConfig.loggedInUserData().Name,"value":CommonConfig.loggedInUserData().PersonID},
      ResourceNameCheck:"",
      ResourceNameErr: false,
      ResourceNameHelperText: "",
      FinalResourceList:[],
    };
  }
  async componentDidMount() {

console.log("this.state.ResourceName",this.state.ResourceName);
    await this.getResourceList();
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
          e.target.focus();
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
        this.setState({ TimeAllocationList: [] });
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
              cogoToast.error("Something went wrong1 TA");
            }
          })
          .catch((err) => {
            this.hideLoador();
            cogoToast.error("Something went wrong2 TA");
          });
      } catch (err) {
        this.hideLoador();
        cogoToast.error("Something Went Wrong3 TA");
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
    for(let i=0;i<data.length-1;i++)
    {   for(let j=1,x=0;j<=7;j++,x++){
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
            setTimeout(() => {
              this.getTimeAllocationList(this.state.ResourceID,this.state.WeekDate);
            }, 2000);
            
            
          } else {
            this.setState({ loading: false });
            cogoToast.error("Something went wrong");
          }
        });
      } catch (err) {
        console.log("error", err);
      }
    
  };
  handleChangeResource = (event, value, type) => {
    debugger
 if (type === "ResourceName") {
      this.setState({ ResourceNameCheck: true });

      //   let Val = value.label;
      if (value == null || value == "") {
        console.log("value = ", value)
      
          this.setState({
            ResourceName: [],
            ResourceID: "",
            ResourceNameErr: true,
            ResourceNameHelperText: "Please Select Resource Name",
            TimeAllocationList:[],
          });
        } else {
          var selectData = {
            label: value.label,
            value: value.value
          }
          this.setState({
            ResourceName: selectData,
            ResourceID: value.value,
            ResourceNameErr: false,
            ResourceNameHelperText: "",
          });

          console.log("ResourceName = ", this.state.ResourceName);
          //this.getServicesByProject(value.value);
          this.getTimeAllocationList(value.value,moment(this.state.WeekDate)
          .format(CommonConfig.dateFormat.dbDateOnly)
          .toString())
        }
      
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
  getResourceList() {
    debugger
    try {
      this.showLoador();
      api
        .post("projectManagement/getResourceList")
        .then((result) => {
          if (result.success) {
            this.hideLoador();

            this.setState({ ResourceList: result.message, FinalResourceList: result.message });



          } else {
            this.hideLoador();
            cogoToast.error("Something went wrong1 Re");
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
let x,y,WeekDateFirst1,i;
let WeekDateFirst = this.state.WeekDate1;
i = 1;
return this.state.TimeAllocationList.map(
  (Links, idx) => {
    

        y=moment(WeekDateFirst).format("MM/DD/YY");
        let wa =  moment(Links.EndDate).unix();
        let aa = moment(y).unix();
    return (
     <tr>
       <td style={{width:"100px"}}>
          <div className="weblink-select">
            <span>{Links.ProjectName}</span>
          </div>
       </td>
        <td>
        <span>{Links.ServiceName}</span>
        </td>
        
        <td>
            <div className="weblink-select">
            {Links.ProjectName !="Total" && (CommonConfig.getUserAccess("Project Allocation").WriteAccess === 1||CommonConfig.getUserAccess("Project Allocation").AllAccess === 1)?(                  
             Links.ProjectStatus  =="Closed"?
                  (
                    wa>aa?
                    (<CustomInput
                          type="text"
                          className="fullwidth-input"
                          fullWidth
                          name="Day1"
                         
                          id="Day1"
                          inputProps={{
                            value:Links.Day1,
                            onChange:(event, value) =>
                              this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day1"),
                            disabled: true,
                          }}
                        
                      />
                    )
                    :("")
                  )
                  :
                  (
                      <CustomInput
                        type="text"
                        className="fullwidth-input"
                        fullWidth
                        name="Day1"
                      
                        id="Day1"
                        inputProps={{
                          value:Links.Day1,
                          onChange:(event, value) =>
                            this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day1")
                          
                        }}
                    
                      />
                  )
                ):
                  (<p>&nbsp;&nbsp;&nbsp;{Links.Day1}</p>)
                
              }
            </div>
        </td>
        <td>
        
            <div className="weblink-select">
            {Links.ProjectName !="Total" && (CommonConfig.getUserAccess("Project Allocation").WriteAccess === 1||CommonConfig.getUserAccess("Project Allocation").AllAccess === 1)?(                  
             Links.ProjectStatus  =="Closed"?
                  (WeekDateFirst =moment(WeekDateFirst).add(1,"d"),
                  y=moment(WeekDateFirst).format("MM/DD/YY"),
                   wa =  moment(Links.EndDate).unix(),
                   aa = moment(y).unix(),
                    wa>aa?
                    (<CustomInput
                          type="text"
                          className="fullwidth-input"
                          fullWidth
                          name="Day2"
                          
                          id="Day2"
                          inputProps={{
                            value:Links.Day2,
                            disabled: true,
                            onChange:(event, value) =>
                              this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day2")
                            
                          }}
                        
                      />
                    )
                    :("")
                  )
                  :
                  (
                      <CustomInput
                        type="text"
                        className="fullwidth-input"
                        fullWidth
                        name="Day2"
                        
                        id="Day2"
                        inputProps={{
                          value:Links.Day2,
                          onChange:(event, value) =>
                            this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day2")
                          
                        }}
                    
                      />
                  )
                ):
                  (<p>&nbsp;&nbsp;&nbsp;{Links.Day2}</p>)
              }
            </div>
        </td>
        <td>
            <div className="weblink-select">
            {
                Links.ProjectName !="Total" && (CommonConfig.getUserAccess("Project Allocation").WriteAccess === 1||CommonConfig.getUserAccess("Project Allocation").AllAccess === 1)?(                  
                  Links.ProjectStatus  =="Closed"?
                      (WeekDateFirst =moment(WeekDateFirst).add(1,"d"),
                      y=moment(WeekDateFirst).format("MM/DD/YY"),
                       wa =  moment(Links.EndDate).unix(),
                       aa = moment(y).unix(),
                        wa>aa?
                        (<CustomInput
                              type="text"
                              className="fullwidth-input"
                              fullWidth
                              name="Day3"
                              
                              id="Day3"
                              inputProps={{
                                value:Links.Day3,
                                disabled: true,
                                onChange:(event, value) =>
                                  this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day3")
                                
                              }}
                            
                          />
                        )
                        :("")
                      )
                      :
                      (
                          <CustomInput
                            type="text"
                            className="fullwidth-input"
                            fullWidth
                            name="Day3"
                           
                            id="Day3"
                            inputProps={{
                              value:Links.Day3,
                              onChange:(event, value) =>
                                this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day3")
                              
                            }}
                        
                          />
                      )
                    ):
                      (<p>&nbsp;&nbsp;&nbsp;{Links.Day3}</p>)}
            </div>
        </td>
        <td>
            <div className="weblink-select">
            {Links.ProjectName !="Total" && (CommonConfig.getUserAccess("Project Allocation").WriteAccess === 1||CommonConfig.getUserAccess("Project Allocation").AllAccess === 1)?(                  
             Links.ProjectStatus  =="Closed"?
                  (WeekDateFirst =moment(WeekDateFirst).add(1,"d"),
                  y=moment(WeekDateFirst).format("MM/DD/YY"),
                   wa =  moment(Links.EndDate).unix(),
                   aa = moment(y).unix(),
                    wa>aa?
                    (<CustomInput
                          type="text"
                          className="fullwidth-input"
                          fullWidth
                          name="Day4"
                          
                          id="Day4"
                          inputProps={{
                            value:Links.Day4,
                            disabled: true,
                            onChange:(event, value) =>
                              this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day4")
                            
                          }}
                        
                      />
                    )
                    :("")
                  )
                  :
                  (
                      <CustomInput
                        type="text"
                        className="fullwidth-input"
                        fullWidth
                        name="Day4"
                        
                        id="Day4"
                        inputProps={{
                          value:Links.Day4,
                          onChange:(event, value) =>
                            this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day4")
                          
                        }}
                    
                      />
                  )
                ):
                  (<p>&nbsp;&nbsp;&nbsp;{Links.Day4}</p>)}
            </div>
        </td>
        <td>
            <div className="weblink-select">
            {
                  Links.ProjectName !="Total" && (CommonConfig.getUserAccess("Project Allocation").WriteAccess === 1||CommonConfig.getUserAccess("Project Allocation").AllAccess === 1)?(                  
                    Links.ProjectStatus  =="Closed"?
                         (WeekDateFirst =moment(WeekDateFirst).add(1,"d"),
                         y=moment(WeekDateFirst).format("MM/DD/YY"),
                          wa =  moment(Links.EndDate).unix(),
                          aa = moment(y).unix(),
                           wa>aa?
                           (<CustomInput
                                 type="text"
                                 className="fullwidth-input"
                                 fullWidth
                                 name="Day5"
                                
                                 id="Day5"
                                 inputProps={{
                                   value:Links.Day5,
                                   disabled: true,
                                   onChange:(event, value) =>
                                     this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day5")
                                   
                                 }}
                               
                             />
                           )
                           :("")
                         )
                         :
                         (
                             <CustomInput
                               type="text"
                               className="fullwidth-input"
                               fullWidth
                               name="Day5"
                               
                               id="Day5"
                               inputProps={{
                                 value:Links.Day5,
                                 
                                 onChange:(event, value) =>
                                   this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day5")
                                 
                               }}
                           
                             />
                         )
                       ):
                         (<p>&nbsp;&nbsp;&nbsp;{Links.Day5}</p>)
            }
            </div>
        </td>
        <td>
            <div className="weblink-select">
            {
            
            Links.ProjectName !="Total" && (CommonConfig.getUserAccess("Project Allocation").WriteAccess === 1||CommonConfig.getUserAccess("Project Allocation").AllAccess === 1)?(                  
              Links.ProjectStatus  =="Closed"?
                   (WeekDateFirst =moment(WeekDateFirst).add(1,"d"),
                   y=moment(WeekDateFirst).format("MM/DD/YY"),
                    wa =  moment(Links.EndDate).unix(),
                    aa = moment(y).unix(),
                     wa>aa?
                     (<CustomInput
                           type="text"
                           className="fullwidth-input"
                           fullWidth
                           name="Day6"
                          
                           id="Day6"
                           inputProps={{
                             value:Links.Day6,
                             disabled: true,
                             onChange:(event, value) =>
                               this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day6")
                             
                           }}
                         
                       />
                     )
                     :("")
                   )
                   :
                   (
                       <CustomInput
                         type="text"
                         className="fullwidth-input"
                         fullWidth
                         name="Day6"
                         id="Day6"
                     
                         inputProps={{
                           value:Links.Day6,
                           onChange:(event, value) =>
                             this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day6")
                           
                         }}
                     
                       />
                   )
                 ):
                   (<p>&nbsp;&nbsp;&nbsp;{Links.Day6}</p>)}
            </div>
        </td>    
        <td>
            <div className="weblink-select">
            {
                Links.ProjectName !="Total" && (CommonConfig.getUserAccess("Project Allocation").WriteAccess === 1||CommonConfig.getUserAccess("Project Allocation").AllAccess === 1)?(                  
                  Links.ProjectStatus  =="Closed"?
                       (WeekDateFirst =moment(WeekDateFirst).add(1,"d"),
                       y=moment(WeekDateFirst).format("MM/DD/YY"),
                        wa =  moment(Links.EndDate).unix(),
                        aa = moment(y).unix(),
                         wa>aa?
                         (<CustomInput
                               type="text"
                               className="fullwidth-input"
                               fullWidth
                               name="Day7"
                            
                               id="Day7"
                               inputProps={{
                                 value:Links.Day7,
                                 disabled: true,
                                 onChange:(event, value) =>
                                   this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day7")
                                 
                               }}
                             
                           />
                         )
                         :("")
                       )
                       :
                       (
                           <CustomInput
                             type="text"
                             className="fullwidth-input"
                             fullWidth
                             name="Day7"
                          
                             id="Day7"
                             inputProps={{
                               value:Links.Day7,
                               onChange:(event, value) =>
                                 this.handledInput(event, Links.ServiceID, Links.ProjectID, "Day7")
                               
                             }}
                         
                           />
                       )
                     ):
                       (<p>&nbsp;&nbsp;&nbsp;{Links.Day7}</p>)}
            </div>
        </td>
      </tr>
    );
  }
);

  
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
    const resourceList = this.state.FinalResourceList.map((type) => {
      return { value: type.ResourceID, label: type.ResourceName };
    });
    const tableHeader=[];
    for(let WeekDateFirst = this.state.WeekDate1,i=1;i<=7;i++ )
    {
        tableHeader[i] =  moment(WeekDateFirst).format("MM/DD/YY")+" ("+moment(WeekDateFirst).format('ddd')+")";
        WeekDateFirst =moment(WeekDateFirst).add(1,"d");
    }
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
              <div className="filter-datepicker1">
              <GridContainer>
                <GridItem xs={12} md={6}>
                  <div>
                { CommonConfig.getUserAccess("Project Allocation").AllAccess === 1?
                  <Autocomplete
                    id="ResourceName"
                    options={resourceList}
                    getOptionLabel={(option) => option.label}
                    value={this.state.ResourceName}
                    onChange={(event, value) =>
                      this.handleChangeResource(event, value, "ResourceName")
                    }
                    // onFocus={() =>
                    //   this.setState({
                    //     ServiceNameErr: false,
                    //     ServiceNameCheck: "",
                    //   })
                    // }
                    renderInput={(params1) => (
                      <TextField
                        {...params1}
                        label="Resource Name"
                        error={""}
                        helperText={
                          ""
                        }
                        margin="normal"
                        fullWidth
                      />
                    )}
                  />
                    :null
                  }
                  </div>
                </GridItem>
              <GridItem xs={12} md={6}>
              
              <div className="tbl-datepicker date-spl">

                  <Datetime
                    dateFormat={"MM/DD/YYYY"}
                    timeFormat={false}
                    value={this.state.WeekDate}
                    onChange={(date) =>this.handleDateChange(date, "Date")}
                    fullWidth
                    closeOnSelect={true}
                    renderInput={(params) => (
                      <TextField
                        error={this.state.WeekDateErr}
                        helperText={this.state.WeekDateHelperText}
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
              </GridItem>
                </GridContainer>         
                         
              </div>
            </CardHeader>
            <CardBody>
              {/* <ReactTable
                data={TimeAllocationList}
                defaultPageSize={10}
                minRows={0}
                resizable={false}
                columns={column}
             //   pageText={"Total rows : " + this.state.finalLength}
                showPaginationBottom={true}
                className="-striped -highlight"
              /> */}
              <div className="package-table input-full">
                                            <table id="PackageTable">
                                              <thead>
                                                <tr>
                                                  <th style={{width:"180px"}}>Project Name</th>
                                                  
                                                  <th style={{width:"150px"}}>Service Name</th>
                                                  {tableHeader.map((item, index) =>(<th>{item}</th>))};
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {this.getColumns()}

                                            
                                              </tbody>
                                            </table>
                                          </div>
            </CardBody>
            <div className="shipment-submit">
            <div className="right">
            {CommonConfig.getUserAccess("Project Allocation").WriteAccess === 1 ||CommonConfig.getUserAccess("Project Allocation").AllAccess === 1?
                <Button color="rose" onClick={() => this.saveData(false)}>
                  Save
                </Button>
               :null }
              </div>
              </div>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
export default ProjectAllocation;
