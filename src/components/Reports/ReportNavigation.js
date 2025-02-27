import React, { Component } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import { CommonConfig } from "../../utils/constant";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import CardBody from "components/Card/CardBody.js";
// import withStyles from "@material-ui/core/styles/withStyles";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import Card from "components/Card/Card";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import MenuItem from "@material-ui/core/MenuItem";
import cogoToast from "cogo-toast";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SalesLeadIcon from "@material-ui/icons/Assessment";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { Icon } from "@material-ui/core";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeInactive: [
        { value: "Account", label: "Account Report" },
        { value: "Sales", label: "Sales Report" },
      ],
      AccountSteps: [
        {
          stepName: "Account Payable",
          stepId: "accountpayable",
          classname: "active",
        },
        {
          stepName: "Account Receivable",
          stepId: "accountreceivable",
          classname: "inactive",
        },
        {
          stepName: "Profit and Loss",
          stepId: "profitandloss",
          classname: "inactive",
        },
        {
          stepName: "Payment Received",
          stepId: "paymentreceived",
          classname: "inactive",
        },
      ],
      SalesSteps: [
        {
          stepName: "Sales - All",
          stepId: "allsales",
          classname: "active",
        },
        {
          stepName: "Sales - Clear",
          stepId: "clearsales",
          classname: "inactive",
        },
        {
          stepName: "Sales - Unclear",
          stepId: "unclearsales",
          classname: "inactive",
        },
        {
          stepName: "Sales Commission",
          stepId: "SalesCommissionSlab",
          classname: "inactive",
        },
      ],
      FedExSteps: [
        {
          stepName: "FedEx Invoice Upload",
          stepId: "uploadreport",
          Icon: "fas fa-file",
          classname: "active",
        },
        {
          stepName: "Standard Invoice Upload",
          stepId: "standarduploadreport",
          Icon: "fas fa-file",
          classname: "inactive",
        },
        {
          stepName: "Locked Shipment Report",
          stepId: "lockedshipmentreport",
          Icon: "fas fa-lock",
          classname: "inactive",
        },
        {
          stepName: "Review Report",
          stepId: "ReviewReport",
          Icon: "	fas fa-star",
          classname: "active",
        },
        {
          stepName: "User Login Report",
          stepId: "UserLoginReport",
          Icon: "fas fa-power-off",
          classname: "inactive",
        },
        
        {
          stepName: "Console Split Invoice",
          stepId: "ConsoleSplitInvoice",
          Icon: "fas fa-calculator",
          classname: "inactive",
        },
        {
          stepName: "Vendor Invoice Upload",
          stepId: "InvoiceUpload",
          Icon: "fas fa-upload",
          classname: "inactive",
        },
        {
          stepName: "Label printing",
          stepId: "LabelPrinting",
          Icon: "	fas fa-print",
          classname: "inactive",
        },
        {
          stepName: "Download Forms",
          stepId: "DownloadForms",
          Icon: "		fas fa-download",
          classname: "inactive",
        },
        {
          stepName: "Sales Team Productivity",
          stepId: "SalesTeamProductivity",
          Icon: "fas fa-file",
          classname: "inactive",
        },
        {
          stepName: "Lead v/s Shipment Report",
          stepId: "LeadShipmentReport",
          Icon: "fas fa-file",
          classname: "inactive",
        },
        {
          stepName: "Email Report",
          stepId: "EmailReports",
          Icon: "fas fa-file",
          classname: "inactive",
        },
      ],
      navigate: "",
    };
  }

  componentDidMount() {
    this.SalesshowHide();
    this.AccountshowHide();
    this.FedExshowHide();
    this.StandardshowHide();
    this.lockShowHide();
    this.reviewShowHide();
    this.consolesplitinvoicelist();
    this.InvoiceUploadlist();
    this.LabelPrintingList();
    this.DownloadForms();
    this.SalesTeamProductivity();
    this.LeadShipmentReport();
    this.EmailReports();

  }

  activeInactive = () => {
    return this.state.activeInactive.map((content) => {
      return (
        <MenuItem
          classes={{ root: useStyles.selectMenuItem }}
          value={content.value}
        >
          {" "}
          {content.label}{" "}
        </MenuItem>
      );
    });
  };

  viewReport = (e) => {
    this.setState({ navigate: e.target.value });
  };

  AccountshowHide = () => {
    if (
      CommonConfig.getUserAccess("Account Payable") &&
      CommonConfig.getUserAccess("Account Receivable") &&
      CommonConfig.getUserAccess("Profit and Loss Report")
    ) {
      if (CommonConfig.getUserAccess("Account Payable").ReadAccess === 0) {
        let currentSteps = this.state.AccountSteps;
        let index = this.state.AccountSteps.findIndex(
          (x) => x.stepId === "accountpayable"
        );
        currentSteps.splice(index, 1);
        this.setState({ AccountSteps: currentSteps });
      }
      if (CommonConfig.getUserAccess("Account Receivable").ReadAccess === 0) {
        let currentSteps = this.state.AccountSteps;
        let index = this.state.AccountSteps.findIndex(
          (x) => x.stepId === "accountreceivable"
        );
        currentSteps.splice(index, 1);
        this.setState({ AccountSteps: currentSteps });
      }
      if (
        CommonConfig.getUserAccess("Profit and Loss Report").ReadAccess === 0
      ) {
        let currentSteps = this.state.AccountSteps;
        let index = this.state.AccountSteps.findIndex(
          (x) => x.stepId === "profitandloss"
        );
        currentSteps.splice(index, 1);
        this.setState({ AccountSteps: currentSteps });
      }
      if (CommonConfig.getUserAccess("Payment Received").ReadAccess === 0) {
        let currentSteps = this.state.AccountSteps;
        let index = this.state.AccountSteps.findIndex(
          (x) => x.stepId === "paymentreceived"
        );
        currentSteps.splice(index, 1);
        this.setState({ AccountSteps: currentSteps });
      }
    }
  };

  SalesshowHide = () => {
    if (
      CommonConfig.getUserAccess("All Sales") &&
      CommonConfig.getUserAccess("Sales Commission") &&
      CommonConfig.getUserAccess("Shipment Not Cleared")
    ) {
      if (CommonConfig.getUserAccess("All Sales").ReadAccess === 0) {
        let currentSteps = this.state.SalesSteps;
        let index = this.state.SalesSteps.findIndex(
          (x) => x.stepId === "allsales"
        );
        currentSteps.splice(index, 1);
        this.setState({ SalesSteps: currentSteps });
      }
      if (CommonConfig.getUserAccess("Sales Commission").ReadAccess === 0) {
        let currentSteps = this.state.SalesSteps;
        let index = this.state.SalesSteps.findIndex(
          (x) => x.stepId === "clearsales"
        );
        currentSteps.splice(index, 1);
        this.setState({ SalesSteps: currentSteps });
      }
      if (CommonConfig.getUserAccess("Shipment Not Cleared").ReadAccess === 0) {
        let currentSteps = this.state.SalesSteps;
        let index = this.state.SalesSteps.findIndex(
          (x) => x.stepId === "unclearsales"
        );
        currentSteps.splice(index, 1);
        this.setState({ SalesSteps: currentSteps });
      }
      if (CommonConfig.getUserAccess("Sales Commission Slab").ReadAccess === 0) {
        let currentSteps = this.state.SalesSteps;
        let index = this.state.SalesSteps.findIndex(
          (x) => x.stepId === "SalesCommissionSlab"
        );
        currentSteps.splice(index, 1);
        this.setState({ SalesSteps: currentSteps });
      }
      
    }
  };

  FedExshowHide = () => {
    if (CommonConfig.getUserAccess("FedEx Invoice Upload")) {
      if (CommonConfig.getUserAccess("FedEx Invoice Upload").ReadAccess === 0) {
        let currentSteps = this.state.FedExSteps;
        let index = this.state.FedExSteps.findIndex(
          (x) => x.stepId === "uploadreport"
        );
        currentSteps.splice(index, 1);
        this.setState({ FedExSteps: currentSteps });
      }
    }

    if (CommonConfig.getUserAccess("User Login Report")) {
      if (CommonConfig.getUserAccess("User Login Report").ReadAccess === 0) {
        let currentSteps = this.state.FedExSteps;
        let index = this.state.FedExSteps.findIndex(
          (x) => x.stepId === "UserLoginReport"
        );
        currentSteps.splice(index, 1);
        this.setState({ FedExSteps: currentSteps });
      }
    }
    

    if (CommonConfig.getUserAccess("Standard Invoice Upload")) {
      if (
        CommonConfig.getUserAccess("Standard Invoice Upload").ReadAccess === 0
      ) {
        let currentSteps = this.state.FedExSteps;
        let index = this.state.FedExSteps.findIndex(
          (x) => x.stepId === "standarduploadreport"
        );
        currentSteps.splice(index, 1);
        this.setState({ FedExSteps: currentSteps });
      }
    }
  };

  StandardshowHide = () => {};

  lockShowHide = () => {
    if (CommonConfig.getUserAccess("Locked Shipment Report")) {
      if (
        CommonConfig.getUserAccess("Locked Shipment Report").ReadAccess === 0
      ) {
        let currentSteps = this.state.FedExSteps;
        let index = this.state.FedExSteps.findIndex(
          (x) => x.stepId === "lockedshipmentreport"
        );
        currentSteps.splice(index, 1);
        this.setState({ FedExSteps: currentSteps });
      }
    }
  };

  reviewShowHide = () => {
    if (CommonConfig.getUserAccess("Review Report")) {
      if (CommonConfig.getUserAccess("Review Report").AllAccess === 0) {
        let currentSteps = this.state.FedExSteps;
        let index = this.state.FedExSteps.findIndex(
          (x) => x.stepId === "ReviewReport"
        );
        currentSteps.splice(index, 1);
        this.setState({ FedExSteps: currentSteps });
      }
    }
  };
  consolesplitinvoicelist = () => {
    if (CommonConfig.getUserAccess("Console Split Invoice")) {
      if (CommonConfig.getUserAccess("Console Split Invoice").AllAccess === 0) {
        let currentSteps = this.state.FedExSteps;
        let index = this.state.FedExSteps.findIndex(
          (x) => x.stepId === "ConsoleSplitInvoice"
        );
        currentSteps.splice(index, 1);
        this.setState({ FedExSteps: currentSteps });
      }
    }
  };
  LabelPrintingList = () => {
    if (CommonConfig.getUserAccess("Label printing")) {
      if (CommonConfig.getUserAccess("Label printing").ReadAccess === 0) {
        let currentSteps = this.state.FedExSteps;
        let index = this.state.FedExSteps.findIndex(
          (x) => x.stepId === "LabelPrinting"
        );
        currentSteps.splice(index, 1);
        this.setState({ FedExSteps: currentSteps });
      }
    }
  };
  DownloadForms = () => {
    debugger;
    if (CommonConfig.getUserAccess("Download Forms")) {
      if (CommonConfig.getUserAccess("Download Forms").ReadAccess === 0) {
        let currentSteps = this.state.FedExSteps;
        let index = this.state.FedExSteps.findIndex(
          (x) => x.stepId === "DownloadForms"
        );
        currentSteps.splice(index, 1);
        this.setState({ FedExSteps: currentSteps });
      }
    }
  };
  SalesTeamProductivity = () => {
    debugger;
    if (CommonConfig.getUserAccess("Sales Team Productivity")) {
      if (
        CommonConfig.getUserAccess("Sales Team Productivity").ReadAccess === 0
      ) {
        let currentSteps = this.state.FedExSteps;
        let index = this.state.FedExSteps.findIndex(
          (x) => x.stepId === "SalesTeamProductivity"
        );
        currentSteps.splice(index, 1);
        this.setState({ FedExSteps: currentSteps });
      }
    }
  
  };

  LeadShipmentReport = () =>{

    if (CommonConfig.getUserAccess("Lead v/s Shipment Report")) {
      if (
        CommonConfig.getUserAccess("Lead v/s Shipment Report").ReadAccess === 0
      ) {
        let currentSteps = this.state.FedExSteps;
        let index = this.state.FedExSteps.findIndex(
          (x) => x.stepId === "LeadShipmentReport"
        );
        currentSteps.splice(index, 1);
        this.setState({ FedExSteps: currentSteps });
      }
    }

  }

  EmailReports = () => {
    debugger;
    if (CommonConfig.getUserAccess("Email Report")) {
      if (
        CommonConfig.getUserAccess("Email Report").ReadAccess === 0
      ) {
        let currentSteps = this.state.FedExSteps;
        let index = this.state.FedExSteps.findIndex(
          (x) => x.stepId === "EmailReports"
        );
        currentSteps.splice(index, 1);
        this.setState({ FedExSteps: currentSteps });
      }
    }
  };
  InvoiceUploadlist = () => {
    if (CommonConfig.getUserAccess("Vendor Invoice Upload")) {
      if (
        CommonConfig.getUserAccess("Vendor Invoice Upload").ReadAccess === 0
      ) {
        let currentSteps = this.state.FedExSteps;
        let index = this.state.FedExSteps.findIndex(
          (x) => x.stepId === "InvoiceUpload"
        );
        currentSteps.splice(index, 1);
        this.setState({ FedExSteps: currentSteps });
      }
    }
  };
  bulkShipmentShowHide = () => {
    if (CommonConfig.getUserAccess("Bulk Shipment Import")) {
      if (CommonConfig.getUserAccess("Bulk Shipment Import").AllAccess === 0) {
        let currentSteps = this.state.FedExSteps;
        let index = this.state.FedExSteps.findIndex(
          (x) => x.stepId === "BulkShipmentImport"
        );
        currentSteps.splice(index, 1);
        this.setState({ FedExSteps: currentSteps });
      }
    }
  };

  validate() {
    let IsValid = true;
    if (CommonConfig.isEmpty(this.state.navigate)) {
      IsValid = false;
    }
    return IsValid;
  }

  searchReport = () => {
    if (this.validate()) {
      if (this.state.navigate === "Account") {
        if (
          CommonConfig.getUserAccess("Account Payable").ReadAccess === 1 ||
          CommonConfig.getUserAccess("Account Receivable").ReadAccess === 1 ||
          CommonConfig.getUserAccess("Profit and Loss Report").ReadAccess ===
            1 ||
          CommonConfig.getUserAccess("Payment Received").ReadAccess === 1
        ) {
          this.props.history.push("/admin/AllAccountReports");
        } else {
          cogoToast.error("You are not authorized to access account reports");
        }
      } else {
        if (
          CommonConfig.getUserAccess("All Sales").ReadAccess === 1 ||
          CommonConfig.getUserAccess("Sales Commission").ReadAccess === 1 ||
          CommonConfig.getUserAccess("Shipment Not Cleared").ReadAccess === 1 ||
          CommonConfig.getUserAccess("Sales Commission Slab").ReadAccess === 1
        ) {
          this.props.history.push("/admin/AllSalesReports");
        } else {
          cogoToast.error("You are not authorized to access sales reports");
        }
      }
    } else {
      cogoToast.error("Please select any one");
    }
  };

  reviewReportList = () => {
    return this.state.ReviewSteps.map((step) => {
      return (
        <GridItem xs={12} sm={12} md={4}>
          <div
            className="rp-box"
            onClick={(e) => this.reportNavigate(e, "Review", step)}
          >
            <span className="rp-icon">
              <AssignmentIcon />
            </span>
            <p>{step.stepName}</p>
          </div>
        </GridItem>
      );
    });
  };

  bulkShipmentImportList = () => {
    return this.state.ReviewSteps.map((step) => {
      return (
        <GridItem xs={12} sm={12} md={4}>
          <div
            className="rp-box"
            onClick={(e) => this.reportNavigate(e, "BulkShipmentImport", step)}
          >
            <span className="rp-icon">
              <AssignmentIcon />
            </span>
            <p>{step.stepName}</p>
          </div>
        </GridItem>
      );
    });
  };

  accountReportList = () => {
    return this.state.AccountSteps.map((step) => {
      return (
        <GridItem xs={12} sm={12} md={4}>
          <div
            className="rp-box"
            onClick={(e) => this.reportNavigate(e, "Account", step)}
          >
            <span className="rp-icon">
              <AssignmentIcon />
            </span>
            <p>{step.stepName}</p>
          </div>
        </GridItem>
      );
    });
  };

  salesReportList = () => {
    return this.state.SalesSteps.map((step) => {
      return (
        <GridItem xs={12} sm={12} md={4}>
          <div
            className="rp-box"
            onClick={(e) => this.reportNavigate(e, "Sales", step)}
          >
            <span className="rp-icon">
              <EqualizerIcon />
            </span>
            <p>{step.stepName}</p>
          </div>
          {/* <Button onClick={(e) => this.reportNavigate(e,"Sales",step)}>{step.stepName}</Button>             */}
        </GridItem>
      );
    });
  };

  fedexReportList = () => {
    return this.state.FedExSteps.map((step) => {
      return (
        <GridItem xs={12} sm={12} md={4}>
          <div
            className="rp-box"
            onClick={(e) => this.reportNavigate(e, "FedExReport", step)}
          >
            <span className="rp-icon">
              <i class={step.Icon}></i>
              {/* <Icon>{step.Icon}</Icon> */}
            </span>
            <p>{step.stepName}</p>
          </div>
          {/* <Button onClick={(e) => this.reportNavigate(e,"Sales",step)}>{step.stepName}</Button>             */}
        </GridItem>
      );
    });
  };

  reportNavigate = (e, type, step) => {
    // console.log("step.....",step);
    if (type === "Account") {
      this.props.history.push({
        pathname: "AllAccountReports",
        state: {
          id: step.stepId,
        },
      });
      // this.props.history.push("/admin/AllAccountReports");
    }
    if (type === "Sales") {
      this.props.history.push({
        pathname: "AllSalesReports",
        state: {
          id: step.stepId,
        },
      });
      // this.props.history.push("/admin/AllSalesReports");
    }
    if (type === "FedExReport") {
      if (step.stepId === "standarduploadreport") {
        this.props.history.push({
          pathname: "StandardInvoiceReport",
          state: {
            id: step.stepId,
          },
        });
      } else if (step.stepId === "lockedshipmentreport") {
        this.props.history.push({
          pathname: "LockedReport",
          state: {
            id: step.stepId,
          },
        });
      } else if (step.stepId === "ReviewReport") {
        this.props.history.push({
          pathname: "ReviewReport",
          state: {
            id: step.stepId,
          },
        });
      } else if (step.stepId === "BulkShipmentImport") {
        this.props.history.push({
          pathname: "BulkShipmentImport",
          state: {
            id: step.stepId,
          },
        });
      } else if (step.stepId === "UserLoginReport") {
        this.props.history.push({
          pathname: "UserLoginReport",
          state: {
            id: step.stepId,
          },
        });
      } else if (step.stepId === "TMSReport") {
        this.props.history.push({
          pathname: "TMSReport",
          state: {
            id: step.stepId,
          },
        });
      } else if (step.stepId === "ConsoleSplitInvoice") {
        this.props.history.push({
          pathname: "ConsoleSplitInvoice",
          state: {
            id: step.stepId,
          },
        });
      } else if (step.stepId === "InvoiceUpload") {
        this.props.history.push({
          pathname: "InvoiceUpload",
          state: {
            id: step.stepId,
          },
        });
      } else if (step.stepId === "LabelPrinting") {
        this.props.history.push({
          pathname: "LabelPrinting",
          state: {
            id: step.stepId,
          },
        });
      } else if (step.stepId === "DownloadForms") {
        this.props.history.push({
          pathname: "DownloadForms",
          state: {
            id: step.stepId,
          },
        });
      } else if (step.stepId === "SalesTeamProductivity") {
        this.props.history.push({
          pathname: "SalesTeamProductivity",
          state: {
            id: step.stepId,
          },
        });
      } else if (step.stepId === "LeadShipmentReport") {
        this.props.history.push({
          pathname: "LeadShipmentReport",
          state: {
            id: step.stepId,
          },
        });
      }
      else if (step.stepId === "EmailReports") {
        this.props.history.push({
          pathname: "EmailReports",
          state: {
            id: step.stepId,
          },
        });
      }  
      
      else {
        this.props.history.push({
          pathname: "FedExReport",
          state: {
            id: step.stepId,
          },
        });
      }
      // this.props.history.push("/admin/AllSalesReports");
    }
  };

  render() {
    const { navigate } = this.state;
    return (
      <GridItem>
        <Card>
          <CardHeader className="btn-right-outer" color="primary" icon>
            <CardIcon color="primary">
              <AssignmentIcon />
            </CardIcon>
            <h4 className="margin-right-auto text-color-black">
              Account Reports
            </h4>
          </CardHeader>
          <CardBody>
            <div className="rp-outer">
              <GridContainer>{this.accountReportList()}</GridContainer>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="btn-right-outer" color="primary" icon>
            <CardIcon color="primary">
              <SalesLeadIcon />
            </CardIcon>
            <h4 className="margin-right-auto text-color-black">
              Sales Reports
            </h4>
          </CardHeader>
          <CardBody>
            <div className="rp-outer">
              <GridContainer>{this.salesReportList()}</GridContainer>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="btn-right-outer" color="primary" icon>
            <CardIcon color="primary">
              <AttachFileIcon />
            </CardIcon>
            <h4 className="margin-right-auto text-color-black">
              Utilities and Services
            </h4>
          </CardHeader>
          <CardBody>
            <div className="rp-outer">
              <GridContainer>{this.fedexReportList()}</GridContainer>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

export default Reports;
