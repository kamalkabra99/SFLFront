import React, { Component } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import { CommonConfig } from "../../utils/constant";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
import Card from "components/Card/Card";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ArchiveIcon from "@material-ui/icons/Archive";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import EditSalesLeadIcon from "@material-ui/icons/Edit";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import WaterIcon from "@material-ui/icons/Waves";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Place from "@material-ui/icons/Place";
import People from "@material-ui/icons/People";
import Task from "@material-ui/icons/Archive";
import AttachMoney from "@material-ui/icons/AttachMoney";
import VendorListIcon from "@material-ui/icons/FormatListBulleted";
import User from "@material-ui/icons/AccountBox";
import ChatIcon from "@material-ui/icons/Chat";
import ReviewsIcon from "@material-ui/icons/RateReview";

const useStyles = () => makeStyles(styles);
const classes = useStyles();

export class ProjectManagementNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AccountSteps: [
        {
          stepName: "Project List",
          stepId: "Project List",
          path: "ProjectList",
          IsAccess: 1,
          Icon: User,
          classname: "inactive",
        },
        {
          stepName: "Service List",
          stepId: "Service List",
          path: "ServiceList",
          IsAccess: 1,
          Icon: User,
          classname: "inactive",
        },
       
        {
          stepName: "Service Allocation List",
          stepId: "Service Allocation List",
          IsAccess: 1,
          path: "ServiceAllocationList",
          Icon: VendorListIcon,
          classname: "inactive",
        },
        {
          stepName: "Resource Allocation List",
          stepId: "Resource Allocation List",
          IsAccess: 1,
          path: "ResourceAllocationList",
          Icon: LocalMoviesIcon,
          classname: "inactive",
        },
        {
          stepName: "Time Allocation",
          stepId: "Time Allocation",
          IsAccess: 1,
          path: "TimeAllocation",
          Icon: ArchiveIcon,
          classname: "inactive",
        },
       
       
        
      ],
      navigate: "",
    };
  }

  componentDidMount() {
    this.showHide();
  }

  showHide() {debugger
    let steps = this.state.AccountSteps;
    steps.map((step) => {
      step.IsAccess = CommonConfig.getUserAccess(step.stepId)
        ? CommonConfig.getUserAccess(step.stepId).ReadAccess
        : 0;
    });
    this.setState({
      AccountSteps: steps,
    });
  }

  accountReportList = () => {debugger
    console.log("ACCOUNTTTT", this.state.AccountSteps);
    return this.state.AccountSteps.map((step) => {
      return step.IsAccess === 1 ? (
        <GridItem xs={12} sm={12} md={4}>
          <div
            className="rp-box"
            onClick={(e) => this.reportNavigate(e, step.path)}
          >
            <span className="rp-icon">
              <step.Icon />
            </span>
            <p>{step.stepName}</p>
          </div>
        </GridItem>
      ) : null;
    });
  };

  reportNavigate = (e, path) => {
    this.props.history.push({
      pathname: path,
    });
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
            <h4 className="margin-right-auto text-color-black">Project Management</h4>
          </CardHeader>
          <CardBody>
            <div className="rp-outer">
              <GridContainer>{this.accountReportList()}</GridContainer>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

export default ProjectManagementNavigation;
