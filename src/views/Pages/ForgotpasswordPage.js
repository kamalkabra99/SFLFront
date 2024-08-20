import React, { Component } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import cogoToast from "cogo-toast";
import { NavLink } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import SimpleBackdrop from "../../utils/general";
import TextField from "@material-ui/core/TextField";
// import "react-select/dist/react-select.css";
// import LockOutline from "@material-ui/icons/LockOutline";
// @material-ui/core components

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
import Select from "react-select";
import MenuItem from "@material-ui/core/MenuItem";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import api from "../../utils/apiClient";
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import logo from "../../assets/img/SFL_logo.png";
import emailIcon from "assets/img/envelope-icon.svg";
import passwordIcon from "assets/img/password-icon.svg";
import image from "assets/img/left-SIGNUP-image.png";
import envelopeIcon from "assets/img/envelope.svg";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";

const useStyles = makeStyles(styles);

class ForgotpasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailErr: false,
      checkEmail: false,
      emailHelperText: "",
      email: "",
      selectedEmailMy: "",
      Loading: false,
      checklist: [
        { label: "Username", value: 1 },
        { label: "Password", value: 2 },
      ],
    };
  }
  componentDidMount() {
    // var inchecklist = [
    //   { label: "UserName", value: 1 },
    //   { label: "Password", value: 2 },
    // ];

    // this.setState({ checklist: inchecklist });
    console.log("test data vivek", this.state.checklist);
  }
  changeForgotPassWord = (event) => {
    debugger;
    this.setState({ selectedEmailMy: event });
  };

  handleChange = (event, type) => {
    if (type === "email") {
      this.setState({ email: event.target.value });
    }
  };

  sendSubmit = (event) => {
    this.showLoader();
    try {
      let data = {
        email: this.state.email,
        selectedEmailMy: this.state.selectedEmailMy.label,
      };
      debugger;

      api
        .post("authentication/forgotPassword", data)
        .then((res) => {
          if (res.success) {
            debugger;
            this.hideLoader();
            if (res.Data.success) {
              debugger;
              cogoToast.success(res.Data.message);
            } else {
              debugger;
              cogoToast.error(res.Data.message);
            }
          } else {
            debugger;
            cogoToast.error("User Not found with this email. Please create account");
            this.hideLoader();
          }
        })
        .catch((err) => {
          debugger;
          cogoToast.error("Something Went Wrong");
          this.hideLoader();
        });
    } catch (error) {
      debugger;
      cogoToast.error("Something Went Wrong");
      this.hideLoader();
    }
    debugger;
  };

  showLoader = () => {
    this.setState({ Loading: true });
  };

  hideLoader = () => {
    this.setState({ Loading: false });
  };

  render() {
    // const droplist = this.state.checklist.map((op) => {
    //   return { value: op.value, label: op.label };
    // });

    return (
      <div className="new-login-wrap">
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}
        {/* <GridContainer justify="center">
                <GridItem className="signup-page-outer2">
                  <Card className="Signup-main-outer">
                    <CardBody className="Signup-main-inner">
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={6} className="signup-left-section">
                          <div className="signup-left-outer">
                            <div className="signup-left-inner">
                              <div className="signup-left-text">
                                <h2>Introducing Ship Smart with SFL Worldwide</h2>
                                <p>One Stop Hub for all Domestic & International Shipping and Moving Services</p>
                                <img src={image} alt="SFL Worldwide" />
                              </div>
                            </div>
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={8} md={6}>
                          <div className="login-logo"></div>
                          <form className="signup-form-outer signin-form-outer">
                            <CustomInput
                              labelText="Email *"
                              id="email"
                              formControlProps={{ fullWidth: true}}
                              inputProps={{
                                          value:this.state.email,
                                          onChange: event => this.handleChange(event, "email"),
                                          endAdornment: <Icon >email</Icon>
                                          }}
                            />
                            <div className="select-spl">
                                <FormControl fullWidth className={useStyles.selectFormControl}>
                                  <InputLabel htmlFor="simple-select" className={useStyles.selectLabel}>
                                    Please Email My
                                  </InputLabel>
                                  
                                    <Select 
                                      value = {this.state.selectedEmailMy}
                                      onChange={(event) => this.changeForgotPassWord(event)}
                                    >
                                        <MenuItem useStyles={{ root: useStyles.selectMenuItem}} value="Password"> Password </MenuItem>
                                        <MenuItem useStyles={{ root: useStyles.selectMenuItem}} value="UserName"> Username </MenuItem>                      
                                    </Select>
                                </FormControl>
                              </div>

                            <CardFooter className="loginpage-footer">
                              <Button className="signup-btn" onClick={(event) => this.Submit(event)} > Submit </Button>
                              <ListItemText className="loginpage-link-outer">Back to
                                <NavLink className="registerpage-login-link" to={"/auth/loginpage"}>Login</NavLink>
                              </ListItemText>
                            </CardFooter>
                          </form>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </GridItem>
            </GridContainer> */}

        <div className="login-inner">
          <div className="login-box">
            <div className="nl-logo">
              <img src={logo}></img>
            </div>

            <div className="login-form">
              {/* <div className="input-outer input-select col-6">
                <label>Sending to</label>
                <Select
                  //className="from-country-div"
                  //classNamePrefix="frn-select"

                  id="toCountrySelect"
                  options={this.state.checklist}
                  getOptionLabel={(option) => option.label}
                  onChange={(event) => this.changeForgotPassWord(event)}
                  value={this.state.selectedEmailMy}
                  isSearchable="true"
                ></Select>
              </div> */}
              {/* <h3 className="titletype">Forgot Username or Password</h3> */}
              <div className="login-input">
                <label>Email Address</label>
                <div className="login-input-icn">
                  <input
                    // placeholder="Enter Email Address"
                    className="login-ipt"
                    labelText="Email Address"
                    id="Email Address"
                    value={this.state.email}
                    onChange={(event) => this.handleChange(event, "email")}
                  ></input>
                  <img src={emailIcon}></img>
                </div>
              </div>

              <div className="login-input">
                <label>Please Email My</label>
                <div className="login-input-icn">
                  {/* <select
                    className="weightType"
                    //  className="weightType"
                    id="selectType"
                    name="selectType"
                    value={this.state.selectedEmailMy}
                    onChange={(event) => this.changeForgotPassWord(event)}
                  >
                    <option className="background" value="Password">Password</option>
                    <option className="background" value="UserName">UserName</option>
                  </select> */}
                  <img src={envelopeIcon}></img>
                  <Select
                    menuPlacement="bottom"
                    className="emailMy"
                    classNamePrefix="selSlam"
                    options={this.state.checklist}
                    onChange={(event) => this.changeForgotPassWord(event)}
                    value={this.state.selectedEmailMy}
                  ></Select>
                </div>
              </div>
              <div className="login-btn">
                <button
                  type="Submit"
                  onClick={(event) => this.sendSubmit(event)}
                >
                  SUBMIT
                </button>
              </div>
              <div className="login-option">
                {/* <span className="devider"></span> */}
                <div className="login-option-inner">
                  <a href="/auth/loginpage" className="center">
                    Back to Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ForgotpasswordPage;
