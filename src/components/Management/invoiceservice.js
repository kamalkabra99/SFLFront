import React, { Component } from "react";
import ReactTable from "react-table";
// import api from "../utils/apiClient";
import api from "../../utils/apiClient";

import { CommonConfig } from "../../utils/constant";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import SimpleBackdrop from "utils/general";
import CKEditor from "ckeditor4-react";
import ReviewsIcon from "@material-ui/icons/People";
import { apiBase } from "../../utils/config";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  TextField,
} from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput";
import Autocomplete from "@material-ui/lab/Autocomplete";
import cogoToast from "cogo-toast";

// const backendurl = "https://hubuatapi.sflworldwide.com/"; //cloud production
const backendurl = apiBase; //Hostgater production
class invoiceservices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Loading: false,
      serviceList: [],
      filterProps: [],
      editedValue:[],
      sortProps: [],
      previousFilterList: [],
      previousSortList: [],
      ValueYesNo:[],
      CommissionType:"",
      showReviewDialog: false,
      YesNo: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }],
      SiteName: "",
      SiteNameEdit: null,
      SiteIdEdit: null,
      reviewSiteData: [],
      ReviewTemplateName: "",
      reviewTemplateNammeList: [],
      Steps: [
        {
          stepName: "Invoice Service List",
          stepId: "reviewWeb",
          classname: "active",
        },
      ],

      siteData: [],
    };
  }

  componentDidMount() {
    // document.getElementById("customizeMSG").style.display = "none";
    // this.getReviewSites();
    // this.getReviewTemplate();
    if(CommonConfig.getUserAccess("Invoices services").ReadAccess === 0){
      CommonConfig.logoutUserdata()
    }
    this.getReferredSite();

  }

  getReviewSites = () => {
    this.showLoador();
    api.post("reviewsitemanage/getReviewSites", {}).then((res) => {
      if (res.success) {
        this.hideLoador();
        this.setState({ reviewSiteData: res.data });
      }
    });
  };

  getReviewTemplate = () => {
    api.post("reviewsitemanage/getReviewTemplate", {}).then((res) => {
      if (res.success) {
        this.setState({ reviewTemplateNammeList: res.data });
      }
    });
  };

  addReferredSite = () => {
    this.showLoador();
    var reviewSiteData = {
      invoiceID: this.state.editedValue.StringMapID,
      CommisiionType: this.state.CommissionType ? this.state.CommissionType.label : this.state.editedValue.CommissionType,
    };

    console.log("reviewSiteData = ",reviewSiteData);
    

    api
      .post(
        "contactus/spUpdateInvoiceService",
        reviewSiteData
      )
      .then((res) => {
        if (res.success) {
          console.log("CheckRessData", res);
          if (res.success === true) {
            this.hideLoador();
            this.CloseDialog();
            this.getReferredSite();

            
              cogoToast.success("Updated Successfully");
            
          } else {
            cogoToast.error("Something went wrong");
          }
        }
      });
  };

  getReferredSite = () => {
    this.showLoador();
    api.get("contactus/spgetServicesInvoices", {}).then((res) => {
      this.hideLoador();
      console.log("getCheckRessData", res.data);
      this.hideLoador();
      
      this.setState({
        siteData: res.data,
      });
    });
  };

  activeInactiveReviewSiteStatus = (reviewId, reviewStatus) => {
    this.showLoador();
    var data = {
      reviewId: this.state.siteData?.SalesLeadReffID,
      reviewStatus: this.state.siteData?.Status,
    };

    api
      .post("reviewsitemanage/activeInactiveReviewSiteStatus", data)
      .then((res) => {
        this.getReviewSites();
      });
  };

  deleteReviewSite = (reviewId) => {
    this.showLoador();
    // var Attachment = logo.

    var data = {
      refference: "Delete",
      refferenceId: reviewId.id,
    };

    api
      .post("contactus/AddSaleLeadReff", data)
      .then((res) => {
        this.getReferredSite();
      });
  };

  navigateChange = (key) => {
    let stepsList = this.state.Steps;
    let activeIndex = stepsList.findIndex((x) => x.classname === "active");

    if (key !== activeIndex) {
      stepsList[key]["classname"] = "active";
      stepsList[activeIndex]["classname"] = "inactive";
      this.setState({ Steps: stepsList });
      let divID = stepsList[key]["stepId"];
      let activeDiv = stepsList[activeIndex]["stepId"];

      console.log("activeDiv", document.getElementById(divID));
      console.log("divID", document.getElementById(activeDiv));

      document.getElementById(divID).style.display = "block";
      document.getElementById(activeDiv).style.display = "none";
    }
  };

  handleEdit = (record) => {
    // console.log("datacheckrowrrr", record.label);
    this.state.editedValue = record
    var yesnodata = {
            value:record.CommissionType,
            label: record.CommissionType
    }
    this.setState({
        showReviewDialog: true,
        editedValue: record,
        ValueYesNo:yesnodata
      });
    
  };

  selectChange = (event, value, type) => {
    if (type === "ReviewTemplateName") {
      this.showLoador();
      this.setState({ ReviewTemplateName: value });
      this.setState({ MsgTempId: value.value });
      var data = {
        msgTmpId: value.value,
      };
      api.post("reviewsitemanage/getAllReviewTemplate", data).then((res) => {
        if (res.success) {
          this.setState({ EmailSubject: res.data[0].TemplateSubject });
          this.setState({ MessageTemplate: res.data[0].TemplateMessage });
          this.hideLoador();
        }
      });
    }else if (type === "AllClear") {
        this.setState({ CommissionType: value });
    }
  };

  showLoador = () => {
    this.setState({ Loading: true });
  };

  hideLoador = () => {
    this.setState({ Loading: false });
  };

  openDialog = () => {
    this.setState({
      showReviewDialog: true,
      SiteName: "",
      SiteIdEdit: "",
    });
  };

  CloseDialog = () => {
    this.setState({ showReviewDialog: false });
  };

  handleChangeFrom = (event, value) => {
    if (value == "SiteName") {
      this.setState({ SiteName: event.target.value });
    }
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
    const { reviewSiteData,YesNo,ValueYesNo } = this.state;
    const reviewTemplateName = this.state.reviewTemplateNammeList.map(
      (review) => {
        return { value: review.MessageTemplateId, label: review.TamplateName };
      }
    );

    const columns = [
      {
        Header: "Service Name",
        maxWidth: 150,
        accessor: "Description",
      },

      {
        Header: "Commission Status",
        maxWidth: 150,
        accessor: "CommissionType",
      },

      {
        Header: "Actions",
        accessor: "actions",
        sortable: false,
        width: 80,
        maxWidth: 80,
        
        Cell: (record) => {
          const rowIdx = record.row._original;
         // console.log("checkeditdatttae", rowIdx);
          return (
            <div className="table-common-btn">
              <Button
                justIcon
                color="info"
                onClick={() => this.handleEdit(rowIdx)}
              >
                <i className="fas fa-edit"></i>
              </Button>
            </div>
          );
        },
        filterable: false,
      },
      
    ];
    console.log("reviewSiteDatavvv", this.state.SiteName);
    return (
      <div>
        <GridContainer justify="center" className="schedule-pickup-main-outer">
          {this.state.Loading === true ? (
            <div className="loading">
              <SimpleBackdrop />
            </div>
          ) : null}
          <GridItem xs={12} sm={12}>
            <Card className="z-index-9">
              <CardHeader className="btn-right-outer" color="primary" icon>
                <CardIcon color="primary">
                  <ReviewsIcon />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">
                  Invoice Service Management
                </h4>
                {/* <Button color="primary" onClick={() => this.openDialog()}>
                  Referred By
                </Button> */}
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
                  <div className="shipment-pane" id="reviewWeb">
                    <CardBody>
                      <ReactTable
                        data={this.state.siteData}
                        minRows={0}
                        filterable
                        defaultFilterMethod={CommonConfig.filterCaseInsensitive}
                        resizable={false}
                        columns={columns}
                        defaultPageSize={10}
                        showPaginationBottom={true}
                        className="-striped -highlight chatMgtList"
                      />
                    </CardBody>
                  </div>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <div>
          <Dialog
            open={this.state.showReviewDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Service Name"
                      id="proposaltype" 
                      readonly
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        value: this.state.editedValue
                          ? this.state.editedValue.Description
                          : "",
                        
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                  <Autocomplete
                        id="combo-box-demo"
                        options={YesNo}
                        value={ValueYesNo}
                        
                        onChange={(event, value) =>
                          this.selectChange(event, value, "AllClear")
                        }
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                          <TextField {...params} label="Commission Available" />
                        )}
                      />
                  </GridItem>
                </GridContainer>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.CloseDialog()} color="secondary">
                Cancel
              </Button>
              <Button onClick={() => this.addReferredSite()} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default invoiceservices;
