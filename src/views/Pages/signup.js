import React, { Component } from "react";
import cogoToast from "cogo-toast";
import api from "../../utils/apiClient";
import SimpleBackdrop from "../../utils/general";
// import moment from "moment";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";

// @material-ui/icons
import { CommonConfig } from "../../utils/constant";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import FormControl from "@material-ui/core/FormControl";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import { TextField } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Typography from "@material-ui/core/Typography";
import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import logo from "assets/img/SFL_logo.png";
import emailIcon from "assets/img/envelope-icon.svg";
import passwordIcon from "assets/img/password-icon.svg";
import callIcon from "assets/img/call.svg";
import envelopeIcon from "assets/img/envelope.svg";

import {
  MDBPopover,
  MDBPopoverBody,
  MDBPopoverHeader,
  MDBContainer,
} from "mdbreact";

import image from "assets/img/left-SIGNUP-image.png";
const moment = require("moment-timezone");
const useStyles = makeStyles(styles);

class RegisterPage extends Component {
  constructor(props) {
    // this.handleBeforeunload = this.handleBeforeunload.bind(this)
    super(props);
    this.state = {
      username1: "",
      fullnameErr: false,
      usernameErr: false,
      emailErr: false,
      passwordErr: false,
      confirmpasswordErr: false,
      mobileErr: false,

      isloggedIn: false,
      Loading: false,

      username: "",
      fullname: "",
      email: "",
      mobile: "",
      password: "",
      confirmpassword: "",

      fullnameHelperText: "",
      usernameHelperText: "",
      emailHelperText: "",
      confirmpasswordHelperText: "",
      passwordHelperText: "",
      mobileHelperText: "",

      checkUserName: false,
      checkFullName: false,
      checkEmail: false,
      checkPassword: false,
      checkConfirmPassword: false,
      checkMobile: false,
      checkLetter: false,
      checkUpperCase: false,
      checkLowerCase: false,
      checkNumber: false,
      checkSpecialCharacter: false,

      userCheckNumber: false,
      userCheckLetter: null,
      userCheckLowerCase: false,
      userCheckSpecialCharacter: false,
      userCheckUpperCase: null,
      userMinCharacter: null,
      userMaxCharacter: null,
      passwordPoup: false,
      userNamePoup: false,
      NofirstInputSpecialCharacter: false,
      SpecialCharactervalid: null,
      specialcharacter: false,
    };
  }

  // async componentDidMount() {
  //   window.onbeforeunload  = function () {
  //     console.log("test data vivek");
  //   }
  // }

  // handleBeforeunload() {
  //  console.log("test data vivek");
  // }

  validate = (event) => {
    debugger;
    let IsFormValid = true;
    if (CommonConfig.isEmpty(this.state.fullname)) {
      IsFormValid = false;
      this.setState({
        fullnameErr: true,
        fullnameHelperText: "Please enter Full name",
      });
    }
    if (CommonConfig.isEmpty(this.state.username)) {
      IsFormValid = false;
      this.setState({
        usernameErr: true,
        usernameHelperText: "Please enter username",
      });
    }

    if (
      this.state.userCheckLetter === false ||
      this.state.specialcharacter === true ||
      // this.state.NofirstInputSpecialCharacter === false ||
      // this.state.userCheckSpecialCharacter === false ||
      this.state.userMinCharacter === false ||
      // ||
      // this.state.userCheckUpperCase === false
      this.state.userMaxCharacter === false
    ) {
      IsFormValid = false;
      this.setState({
        usernameErr: true,
        usernameHelperText: "Please enter valid username",
      });
    }

    // if (this.state.username.length < 9) {
    //   IsFormValid = false;
    //   this.setState({
    //     usernameErr: true,
    //     usernameHelperText: "Please enter atleast 8 characters",
    //   });
    // }
    if (this.state.emailErr) {
      this.hideLoader();
      IsFormValid = false;
      this.setState({
        emailErr: true,
        emailHelperText: "Please enter valid email",
      });
    }
    if (this.state.fullnameErr) {
      IsFormValid = false;
      this.setState({
        fullnameErr: true,
        fullnameHelperText: "Please enter valid full name",
      });
    }
    if (this.state.mobileErr) {
      IsFormValid = false;
      this.setState({
        mobileErr: true,
        mobileHelperText: "Please enter valid mobile",
      });
    }
    if (this.state.passwordErr) {
      IsFormValid = false;
      this.setState({
        passwordErr: true,
        passwordHelperText: "Please enter valid password",
      });
    }
    if (this.state.confirmpasswordErr) {
      IsFormValid = false;
      this.setState({
        confirmpasswordErr: true,
        confirmpasswordHelperText: "Please enter valid confirm password",
      });
    }
    if (this.state.confirmpassword !== this.state.password) {
      IsFormValid = false;
      this.setState({
        confirmpasswordErr: true,
        confirmpasswordHelperText: "Password does not match",
      });
    }
    if (CommonConfig.isEmpty(this.state.mobile)) {
      IsFormValid = false;
      this.setState({
        mobileErr: true,
        mobileHelperText: "Please enter mobile number",
      });
    }
    if (CommonConfig.isEmpty(this.state.password)) {
      IsFormValid = false;
      this.setState({
        passwordErr: true,
        passwordHelperText: "Please enter password",
      });
    }
    if (CommonConfig.isEmpty(this.state.confirmpassword)) {
      IsFormValid = false;
      this.setState({
        confirmpasswordErr: true,
        confirmpasswordHelperText: "Please enter confirmpassword",
      });
    }
    if (CommonConfig.isEmpty(this.state.email)) {
      IsFormValid = false;
      this.setState({ emailErr: true, emailHelperText: "Please enter email " });
    }
    return IsFormValid;
  };

  handleBlur = (event, type) => {
    debugger;
    // var userNmaeRegex=/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%^&+=._-])[a-zA-Z0-9@#$%^&+=._-]{8,32}$/;
    if (type === "fullname") {
      this.setState({ checkFullName: true });
      let val = event.target.value;
      if (CommonConfig.isEmpty(val)) {
        this.setState({
          fullnameErr: true,
          fullnameHelperText: "Please enter Full Name",
        });
      } else if (val.trim() !== val) {
        this.setState({
          fullnameErr: true,
          fullnameHelperText: "Please enter valid Full Name",
        });
      } else {
        this.setState({
          fullname: val,
          fullnameErr: false,
          fullnameHelperText: "",
        });
      }
    }

    if (type === "username") {
      this.setState({ checkUserName: true });
      let usernameVal = event.target.value;
      // console.log("checkusernameerr", event.target.value.splice(0, 5));
      if (CommonConfig.isEmpty(usernameVal)) {
        this.setState({
          usernameErr: true,
          userCheckNumber: false,
          userCheckLetter: false,
          userCheckUpperCase: false,
          userCheckSpecialCharacter: false,
          userMinCharacter: false,
          userMaxCharacter: false,
          NofirstInputSpecialCharacter: false,
          specialcharacter: false,
          usernameHelperText: "Please enter User Name",
        });
      } else if (usernameVal) {
        if (usernameVal.match(CommonConfig.RegExp.regExpLowerCase)) {
          this.setState({
            username: usernameVal,
            userCheckLetter: true,
            usernameErr: false,
            usernameHelperText: "",
          });
        } else {
          this.setState({
            username: usernameVal,
            userCheckLetter: false,
            usernameErr: false,
            usernameHelperText: "",
          });
        }

        // if (usernameVal.match(CommonConfig.RegExp.regExpUpperCase)) {
        //   this.setState({
        //     username: usernameVal,
        //     userCheckLetter: false,
        //     usernameErr: false,
        //     usernameHelperText: "",
        //   });
        // } else {
        //   this.setState({
        //     username: usernameVal,
        //     // userCheckLetter: true,
        //     usernameErr: false,
        //     usernameHelperText: "",
        //   });
        // }

        if (usernameVal.match(CommonConfig.RegExp.regExpNumber)) {
          this.setState({
            username: usernameVal,
            userCheckNumber: true,
            usernameErr: false,
            usernameHelperText: "",
          });
        } else {
          this.setState({
            username: usernameVal,
            userCheckNumber: false,
            usernameErr: false,
            usernameHelperText: "",
          });
        }

        if (usernameVal.match(CommonConfig.RegExp.regExpUpperCase)) {
          this.setState({
            username: usernameVal,
            userCheckUpperCase: true,

            usernameErr: false,
            usernameHelperText: "",
          });
        } else {
          this.setState({
            username: usernameVal,
            userCheckUpperCase: false,

            usernameErr: false,
            usernameHelperText: "",
          });
        }

        if (usernameVal.length >= 8) {
          this.setState({
            username: usernameVal,
            userMinCharacter: true,
            usernameErr: false,
            usernameHelperText: "",
          });
        } else {
          this.setState({
            username: usernameVal,
            userMinCharacter: false,
            usernameErr: false,
            usernameHelperText: "",
          });
        }

        if (usernameVal.length <= 32) {
          this.setState({
            username: usernameVal,
            userMaxCharacter: true,

            usernameErr: false,
            usernameHelperText: "",
          });
        } else {
          this.setState({
            username: usernameVal,
            userMaxCharacter: false,

            usernameErr: false,
            usernameHelperText: "",
          });
        }

        if (usernameVal.match(CommonConfig.RegExp.userNameSpecialCharacter)) {
          console.log(
            "checkspecial",
            usernameVal.match(CommonConfig.RegExp.userNameSpecialCharacter)
          );
          this.setState({
            username: usernameVal,
            userCheckSpecialCharacter: true,
            SpecialCharactervalid: "",
            usernameErr: false,
            usernameHelperText: "",
          });
        } else {
          this.setState({
            username: usernameVal,
            userCheckSpecialCharacter: false,
            SpecialCharactervalid: "",
            usernameErr: false,
            usernameHelperText: "",
          });
        }

        if (
          (usernameVal.match(CommonConfig.RegExp.NofirstInputSpecialCharacter),
          console.log(
            "checkfirstinput12",
            usernameVal.match(CommonConfig.RegExp.NofirstInputSpecialCharacter)
          ))
        ) {
          this.setState({
            username: usernameVal,
            NofirstInputSpecialCharacter: true,
            usernameErr: false,
            usernameHelperText: "",
          });
        } else {
          this.setState({
            username: usernameVal,
            NofirstInputSpecialCharacter: false,
            usernameErr: false,
            usernameHelperText: "",
          });
        }

        if (usernameVal.match(CommonConfig.RegExp.userErrorSpecial)) {
          this.setState({
            username: usernameVal,
            specialcharacter: true,
            userCheckSpecialCharacter: "",
            usernameErr: false,
            usernameHelperText: "",
          });
        } else {
          this.setState({
            username: usernameVal,
            specialcharacter: false,
            usernameErr: false,
            usernameHelperText: "",
          });
        }
      }
    }

    // userNmaeRegex
    //   else if (usernameVal.length < 8) {
    //     this.setState({
    //       username: usernameVal,
    //       usernameErr: true,
    //       usernameHelperText: "Please enter valid User Name",
    //     });
    //   } else if (
    //     /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%^&+=._-])[a-zA-Z0-9@#$%^&+=._-]{8,32}$/.test(
    //       usernameVal
    //     )
    //   ) {
    //     this.setState({
    //       username: usernameVal,
    //       usernameErr: true,
    //       usernameHelperText:
    //         "Please do not enter space and special character except(@ and .)",
    //     });
    //   } else {
    //     this.setState({
    //       username: usernameVal,
    //       usernameErr: false,
    //       usernameHelperText: "",
    //     });
    //   }
    // }

    if (type === "email") {
      this.setState({ checkEmail: true });
      let emailVal = event.target.value;
      if (CommonConfig.isEmpty(emailVal)) {
        this.setState({
          emailErr: true,
          emailHelperText: "Please enter Email",
        });
      } else if (
        emailVal.trim() !== emailVal ||
        !emailVal.match(CommonConfig.RegExp.email)
      ) {
        this.setState({
          emailErr: true,
          emailHelperText: "Please enter valid Email",
        });
      } else {
        this.setState({
          email: emailVal,
          emailErr: false,
          emailHelperText: "",
        });
      }
    }

    if (type === "mobile") {
      this.setState({ checkMobile: true });
      let mobileVal = event.target.value;
      let regExp = /^[0-9]{10,15}$/;
      if (CommonConfig.isEmpty(mobileVal)) {
        this.setState({
          mobileErr: true,
          mobileHelperText: "Please enter Mobile Number",
        });
      } else if (mobileVal.trim() !== mobileVal || !mobileVal.match(regExp)) {
        this.setState({
          mobileErr: true,
          mobileHelperText: "Please enter valid Mobile Number",
        });
      } else {
        this.setState({
          mobile: mobileVal,
          mobileErr: false,
          mobileHelperText: "",
        });
      }
    }

    if (type === "password") {
      this.setState({ checkPassword: true });
      let passwordVal = event.target.value;
      if (CommonConfig.isEmpty(passwordVal)) {
        this.setState({
          passwordErr: true,
          checkNumber: false,
          checkLetter: false,
          checkLowerCase: false,
          checkSpecialCharacter: false,
          checkUpperCase: false,
          password: passwordVal,
          passwordHelperText: "Please enter Password",
        });
      } else if (passwordVal) {
        if (passwordVal.match(CommonConfig.RegExp.regExpNumber)) {
          this.setState({
            password: passwordVal,
            checkNumber: true,
            passwordErr: false,
            passwordHelperText: "",
          });
        } else {
          this.setState({
            password: passwordVal,
            checkNumber: false,
            passwordErr: false,
            passwordHelperText: "",
          });
        }
        if (passwordVal.match(CommonConfig.RegExp.regExpUpperCase)) {
          this.setState({
            password: passwordVal,
            checkUpperCase: true,
            passwordErr: false,
            passwordHelperText: "",
          });
        } else {
          this.setState({
            password: passwordVal,
            checkUpperCase: false,
            passwordErr: false,
            passwordHelperText: "",
          });
        }
        if (passwordVal.match(CommonConfig.RegExp.regExpLowerCase)) {
          this.setState({
            password: passwordVal,
            checkLowerCase: true,
            passwordErr: false,
            passwordHelperText: "",
          });
        } else {
          this.setState({
            password: passwordVal,
            checkLowerCase: false,
            passwordErr: false,
            passwordHelperText: "",
          });
        }
        if (passwordVal.length >= 8) {
          this.setState({
            password: passwordVal,
            checkLetter: true,
            passwordErr: false,
            passwordHelperText: "",
          });
        } else {
          this.setState({
            password: passwordVal,
            checkLetter: false,
            passwordErr: false,
            passwordHelperText: "",
          });
        }

        if (passwordVal.match(CommonConfig.RegExp.regExpSpecialCharacter)) {
          this.setState({
            password: passwordVal,
            checkSpecialCharacter: true,
            passwordErr: false,
            passwordHelperText: "",
          });
        } else {
          this.setState({
            password: passwordVal,
            checkSpecialCharacter: false,
            passwordErr: false,
            passwordHelperText: "",
          });
        }
        // if (/[^A-Za-z@$.%&*#^()!\d]/.test(passwordVal)) {
        //   this.setState({
        //     password: passwordVal,
        //     passwordErr: true,
        //     passwordHelperText: "Please do not enter space",
        //   });
        // } else {
        //   this.setState({
        //     password: passwordVal,
        //     passwordErr: false,
        //     passwordHelperText: "",
        //   });
        // }

        if (
          /^([A-z0-9!@#$%^&*().,<>{}[\]<>?_=+\-|;:\'\"\/])*[^\s]\1*$/.test(
            passwordVal
          )
        ) {
          this.setState({
            password: passwordVal,
            passwordErr: false,
            passwordHelperText: "",
          });
        } else {
          this.setState({
            password: passwordVal,
            passwordErr: true,
            passwordHelperText: "Please do not enter space",
          });
        }
      } else {
        this.setState({
          passwordErr: false,
          passwordHelperText: "",
          password: passwordVal,
        });
      }
    }

    if (type === "confirmpassword") {
      this.setState({ checkConfirmPassword: true });
      let confirmpasswordVal = event.target.value;
      if (CommonConfig.isEmpty(confirmpasswordVal)) {
        this.setState({
          confirmpasswordErr: true,
          confirmpasswordHelperText: "Please enter Confirm Password",
        });
      } else if (confirmpasswordVal !== this.state.password) {
        this.setState({
          confirmpasswordErr: true,
          confirmpasswordHelperText: "Password does not match",
        });
      } else {
        this.setState({
          confirmpassword: confirmpasswordVal,
          confirmpasswordErr: false,
          confirmpasswordHelperText: "",
        });
      }
    }
  };

  showLoader() {
    this.setState({ Loading: true });
  }

  hideLoader() {
    this.setState({ Loading: false });
  }

  signUP = (event) => {
    if (this.validate(event)) {
      this.showLoader();
      try {
        let UserDetails = {
          AccountNumber: "",
          ManagedBy: "",
          CompanyName: "",
          AddressLine1: "",
          AddressLine2: "",
          AddressLine3: "",
          ZipCode: "",
          City: "",
          State: "",
          ContactName: "",
          CountryID: "",
          UserDetailID: null,
        };
        let data = {
          Name: this.state.fullname,
          UserName: this.state.username,
          Password: this.state.password,
          Phone: this.state.mobile,
          Email: this.state.email,
          Phone2: "",
          UserDetails: UserDetails,
        };

        api
          .post("authentication/userRegister", data)
          .then((res) => {
            // this.hideLoader();
            if (res.success) {
              this.login(data);
            } else {
              cogoToast.error(res.message);
              this.hideLoader();
            }
          })
          .catch((err) => {
            cogoToast.error(err);
            this.hideLoader();
          });
      } catch (error) {
        cogoToast.error("Something Went Wrong");
        this.hideLoader();
      }
    }
    // else {
    //   this.hideLoader();
    // }
  };

  login(data) {
    try {
      api
        .post("authentication/userLoginAuthenticate", data)
        .then((res) => {
          if (res.success) {
            this.setState({ isloggedIn: true });
            let timeZone = moment.tz.guess();

            const time = moment.tz(res.Data.LastLoginTimestamp);

            const date = time.clone().tz(timeZone);
            let formatDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
            formatDate = moment(formatDate).add(30, "minutes");
            res.Data.LastLoginTimestamp = moment(formatDate).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            localStorage.setItem(
              "loggedInUserData",
              JSON.stringify(res.Data, this.state.isloggedIn)
            );

            // sessionStorage.setItem(
            //   "loggedInUserData",
            //   JSON.stringify(res.Data, this.state.isloggedIn)
            // );

            var receiver = document.getElementById("receiver").contentWindow;
            receiver.postMessage(
              JSON.stringify(res.Data),
              "https://www.sflworldwide.com"
            );

            setTimeout(() => {
              this.props.history.push("/admin/Scheduleshipment");
              this.hideLoader();
            }, 4000);
            // this.hideLoader();
          } else {
            this.setState({ Loading: false });
            cogoToast.error(res.message);
          }
        })
        .catch((err) => {
          cogoToast.error(err);
        });
    } catch (error) {
      cogoToast.error("Something Went Wrong");
    }
  }

  render() {
    const {
      usernameErr,
      fullnameErr,
      emailErr,
      mobileErr,
      confirmpasswordErr,
      checkConfirmPassword,
      checkFullName,
      checkMobile,
      checkUserName,
      checkNumber,
      checkUpperCase,
      checkLowerCase,
      checkSpecialCharacter,
      checkLetter,
      userCheckNumber,
      userCheckLetter,
      userCheckSpecialCharacter,
      userMinCharacter,
      userMaxCharacter,
      userCheckUpperCase,
      NofirstInputSpecialCharacter,
      SpecialCharactervalid,
      specialcharacter,
    } = this.state;
    console.log("specialcharacter11", NofirstInputSpecialCharacter);

    return (
      <div className="new-login-wrap">
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}

        <div className="login-inner">
          <div className="login-box signupbox">
            <div className="nl-logo">
              <img src={logo}></img>
            </div>

            <div className="login-form">
              <div className="login-input">
                <label>Full Name</label>
                <div className="login-input-icn">
                  <input
                    helperText={this.state.fullnameHelperText}
                    //  placeholder="Enter Full Name"
                    type="text"
                    className="login-ipt"
                    onBlur={(event) => this.handleBlur(event, "fullname")}
                    onFocus={() =>
                      this.setState({
                        fullnameErr: false,
                        fullnameHelperText: "",
                        checkFullName: false,
                      })
                    }
                    endAdornment={
                      checkFullName !== true ? (
                        <Icon>person</Icon>
                      ) : fullnameErr ? (
                        <InputAdornment position="end">
                          <CloseIcon
                            style={{ color: red[500] }}
                            className={useStyles.danger}
                          />
                        </InputAdornment>
                      ) : (
                        <InputAdornment position="end">
                          {" "}
                          <DoneIcon
                            style={{ color: green[500] }}
                            className={useStyles.success}
                          />
                        </InputAdornment>
                      )
                    }
                    autoComplete="none"
                  ></input>
                  <img src={emailIcon}></img>
                </div>
                <span
                  id="fullname"
                  class="PackageErr"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {this.state.fullnameHelperText}
                </span>
              </div>
              <div className="login-input">
                <label>Username</label>
                <div className="login-input-icn">
                  <input
                    // placeholder="Enter Username"
                    type="text"
                    className="login-ipt"
                    error={this.state.usernameErr}
                    helperText={this.state.usernameHelperText}
                    formControlProps={{ fullWidth: true }}
                    // onChange={(event) => this.handleBlur(event, "username")}
                    onFocus={() =>
                      this.setState({
                        usernameErr: false,
                        usernameHelperText: "",
                        checkUserName: false,
                        userNamePoup: true,
                      })
                    }
                    onBlur={() => {
                      this.setState({
                        userNamePoup: false,
                      });
                    }}
                    endAdornment={
                      checkUserName !== true ? (
                        <Icon>person</Icon>
                      ) : usernameErr ||
                        userCheckLetter === false ||
                        userMinCharacter === false ||
                        userMaxCharacter === false ? (
                        <InputAdornment position="end">
                          <CloseIcon
                            style={{ color: red[500] }}
                            className={useStyles.danger}
                          />
                        </InputAdornment>
                      ) : (
                        <InputAdornment position="end">
                          {" "}
                          <DoneIcon
                            style={{ color: green[500] }}
                            className={useStyles.success}
                          />
                        </InputAdornment>
                      )
                    }
                    onChange={(event) => {
                      this.handleBlur(event, "username");
                      event.target.value.length <= 33 &&
                        this.setState({
                          username1: event.target.value,
                        });
                    }}
                    value={this.state.username1 ? this.state.username1 : ""}
                  ></input>
                  {this.state.userNamePoup === true ? (
                    <div className="ps-popover-inner">
                      <MDBPopoverBody>
                        <MDBPopoverHeader>
                          User name must have:
                        </MDBPopoverHeader>
                        <React.Fragment>
                          {userCheckLetter === true ||
                          userCheckUpperCase === true ? (
                            <Typography style={{ color: "#2E7D32" }}>
                              <i class="far fa-check-circle"></i>Must be between
                              letters from a to z
                            </Typography>
                          ) : (
                            // userCheckLetter === false ||
                            // userCheckUpperCase === false ? (
                            <Typography color="error">
                              <i className="far fa-check-circle"></i>
                              Must be between letters from a to z
                            </Typography>
                          )
                          // )
                          }

                          {userCheckNumber === true ? (
                            <Typography style={{ color: "#2E7D32" }}>
                              <i class="far fa-check-circle"></i>Can contain any
                              numbers from 0 through 9
                            </Typography>
                          ) : (
                            <Typography color="black">
                              <i class="far fa-check-circle"></i>Can contain any
                              numbers from 0 through 9
                            </Typography>
                          )}

                          {userCheckSpecialCharacter === true ? (
                            <Typography style={{ color: "#2E7D32" }}>
                              <i class="far fa-check-circle"></i>Can contain
                              special characters : @ . - _
                            </Typography>
                          ) : userCheckSpecialCharacter === false ? (
                            <Typography color="black">
                              <i class="far fa-check-circle"></i>Can contain
                              special characters : @ . - _
                            </Typography>
                          ) : specialcharacter === true ? (
                            <Typography color="error">
                              <i class="far fa-check-circle"></i>Can contain
                              special characters : @ . - _
                            </Typography>
                          ) : (
                            <Typography style={{ color: "#dab813" }}>
                              <i class="far fa-check-circle"></i>Can contain
                              special characters : @ . - _
                            </Typography>
                          )}

                          {userMinCharacter === true &&
                          userMaxCharacter === true ? (
                            <Typography style={{ color: "#2E7D32" }}>
                              <i class="far fa-check-circle"></i>Must be between
                              8 to 32 characters long
                            </Typography>
                          ) : (
                            // userMinCharacter === false &&
                            //   userMaxCharacter === false ?
                            <Typography color="error">
                              <i class="far fa-check-circle"></i>Must be between
                              8 to 32 characters long
                            </Typography>
                          )
                          // : userMinCharacter === null &&
                          //   userMaxCharacter === null ? (
                          //   <Typography color="black">
                          //     <i class="far fa-check-circle"></i>Must be
                          //     between 8 to 32 characters long
                          //   </Typography>
                          // ) : (
                          //   <Typography color="black">
                          //     <i class="far fa-check-circle"></i>Must be
                          //     between 8 to 32 characters long
                          //   </Typography>
                          // )
                          }
                        </React.Fragment>
                      </MDBPopoverBody>
                    </div>
                  ) : (
                    ""
                  )}
                  <img src={emailIcon}></img>
                </div>
                <span
                  id="username"
                  class="PackageErr"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {this.state.usernameHelperText}
                </span>
              </div>
              <GridContainer>
                <GridItem md="6" xs="12">
                  <div className="login-input">
                    <label>Password</label>
                    <div className="login-input-icn">
                      <input
                        autoComplete="off"
                        // role="presentation"
                        //  placeholder="Enter Password"
                        id="newpassword"
                        type="new-password"
                        className="login-ipt"
                        error={this.state.passwordErr}
                        value={this.state.password}
                        formControlProps={{ fullWidth: true }}
                        aria-describedby="simple-popover"
                        helperText={this.state.passwordHelperText}
                        onChange={(event) => {
                          this.handleBlur(event, "password");
                          event.target.setAttribute("type", "password");
                        }}
                        onBlur={(event) => {
                          this.handleBlur(event, "password");
                          this.setState({
                            passwordPoup: false,
                          });
                        }}
                        onFocus={() =>
                          this.setState({
                            passwordErr: false,
                            passwordHelperText: "",
                            checkPassword: true,
                            passwordPoup: true,
                          })
                        }
                        //autoComplete="new-password"
                      ></input>

                      <img src={passwordIcon}></img>
                    </div>
                    {this.state.passwordPoup === true ? (
                      <div className="ps-popover-inner">
                        <MDBPopoverBody>
                          <MDBPopoverHeader>
                            Your password must have:
                          </MDBPopoverHeader>
                          <React.Fragment>
                            {checkUpperCase ? (
                              <Typography style={{ color: "#2E7D32" }}>
                                <i class="far fa-check-circle"></i>One uppercase
                                letter
                              </Typography>
                            ) : (
                              <Typography color="error">
                                <i className="far fa-check-circle"></i>
                                One uppercase letter
                              </Typography>
                            )}
                            {checkLowerCase ? (
                              <Typography style={{ color: "#2E7D32" }}>
                                <i class="far fa-check-circle"></i>One lowercase
                                letter
                              </Typography>
                            ) : (
                              <Typography color="error">
                                <i class="far fa-check-circle"></i>One lowercase
                                letter
                              </Typography>
                            )}
                            {checkSpecialCharacter ? (
                              <Typography style={{ color: "#2E7D32" }}>
                                <i class="far fa-check-circle"></i>One special
                                character
                              </Typography>
                            ) : (
                              <Typography color="error">
                                <i class="far fa-check-circle"></i>One special
                                character
                              </Typography>
                            )}
                            {checkNumber ? (
                              <Typography style={{ color: "#2E7D32" }}>
                                <i class="far fa-check-circle"></i>One number
                              </Typography>
                            ) : (
                              <Typography color="error">
                                <i class="far fa-check-circle"></i>One number
                              </Typography>
                            )}
                            {checkLetter ? (
                              <Typography style={{ color: "#2E7D32" }}>
                                <i class="far fa-check-circle"></i>
                                Minimum 8 characters
                              </Typography>
                            ) : (
                              <Typography color="error">
                                <i class="far fa-check-circle"></i>
                                Minimum 8 characters
                              </Typography>
                            )}
                          </React.Fragment>
                        </MDBPopoverBody>
                      </div>
                    ) : (
                      ""
                    )}
                    <span
                      id="password"
                      class="PackageErr"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {this.state.passwordHelperText}
                    </span>
                  </div>
                </GridItem>
                <GridItem md="6" xs="12">
                  <div className="login-input">
                    <label>Confirm Password</label>
                    <div className="login-input-icn">
                      <input
                        // readOnly={this.state.password ? false : true}
                        type="confirm-password"
                        className="login-ipt"
                        error={this.state.confirmpasswordErr}
                        helperText={this.state.confirmpasswordHelperText}
                        formControlProps={{ fullWidth: true }}
                        onBlur={(event) =>
                          this.handleBlur(event, "confirmpassword")
                        }
                        onChange={(event) => {
                          this.handleBlur(event, "confirmpassword");
                          event.target.setAttribute("type", "password");
                        }}
                        onFocus={(event) => {
                          //  event.target.setAttribute("type", "password");
                          this.setState({
                            confirmpasswordErr: false,
                            confirmpasswordHelperText: "",
                            checkConfirmPassword: false,
                          });
                        }}
                        endAdornment={
                          checkConfirmPassword !== true ? (
                            <Icon>lock_outline</Icon>
                          ) : confirmpasswordErr ? (
                            <InputAdornment position="end">
                              <CloseIcon
                                style={{ color: red[500] }}
                                className={useStyles.danger}
                              />
                            </InputAdornment>
                          ) : (
                            <InputAdornment position="end">
                              {" "}
                              <DoneIcon
                                style={{ color: green[500] }}
                                className={useStyles.success}
                              />
                            </InputAdornment>
                          )
                        }
                        // autoComplete="new-password"
                      ></input>

                      <img src={passwordIcon}></img>
                    </div>
                    <span
                      id="confirmpassword"
                      class="PackageErr"
                      style={{ color: "red", fontSize: "12px" }}
                    >
                      {this.state.confirmpasswordHelperText}
                    </span>
                  </div>
                </GridItem>
              </GridContainer>
              <div className="login-input">
                <label>Contact Number</label>
                <div className="login-input-icn">
                  <input
                    //   placeholder="Enter Contact Number"
                    type="text"
                    className="login-ipt"
                    error={this.state.mobileErr}
                    helperText={this.state.mobileHelperText}
                    formControlProps={{ fullWidth: true }}
                    onFocus={() =>
                      this.setState({
                        mobileErr: false,
                        mobileHelperText: "",
                        checkMobile: false,
                      })
                    }
                    onBlur={(event) => this.handleBlur(event, "mobile")}
                    endAdornment={
                      checkMobile !== true ? (
                        <Icon>phone</Icon>
                      ) : mobileErr ? (
                        <InputAdornment position="end">
                          <CloseIcon
                            style={{ color: red[500] }}
                            className={useStyles.danger}
                          />
                        </InputAdornment>
                      ) : (
                        <InputAdornment position="end">
                          {" "}
                          <DoneIcon
                            style={{ color: green[500] }}
                            className={useStyles.success}
                          />{" "}
                        </InputAdornment>
                      )
                    }
                    autoComplete="none"
                  ></input>
                  <img src={callIcon}></img>
                </div>
                <span
                  id="contact"
                  class="PackageErr"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {this.state.mobileHelperText}
                </span>
              </div>
              <div className="login-input">
                <label>Email Address</label>
                <div className="login-input-icn">
                  <input
                    //  placeholder="Enter Email Address"
                    type="email"
                    className="login-ipt"
                    error={this.state.emailErr}
                    formControlProps={{ fullWidth: true }}
                    helperText={this.state.emailHelperText}
                    onBlur={(event) => this.handleBlur(event, "email")}
                    onFocus={() =>
                      this.setState({
                        emailErr: false,
                        emailHelperText: "",
                        checkEmail: false,
                      })
                    }
                    endAdornment={
                      this.state.checkEmail !== true ? (
                        <Icon>email</Icon>
                      ) : emailErr ? (
                        <InputAdornment position="end">
                          <CloseIcon
                            style={{ color: red[500] }}
                            className={useStyles.danger}
                          />
                        </InputAdornment>
                      ) : (
                        <InputAdornment position="end">
                          {" "}
                          <DoneIcon
                            style={{ color: green[500] }}
                            className={useStyles.success}
                          />{" "}
                        </InputAdornment>
                      )
                    }
                  ></input>
                  <img src={envelopeIcon}></img>
                </div>
                <span
                  id="email"
                  class="PackageErr"
                  style={{ color: "red", fontSize: "12px" }}
                >
                  {this.state.emailHelperText}
                </span>
              </div>
              <div className="login-btn">
                <button type="submit" onClick={(event) => this.signUP(event)}>
                  SIGN UP
                </button>
              </div>
              <div className="login-option">
                {/* <span className="devider"></span> */}
                <div className="login-option-inner">
                  <a href="/auth/loginpage" className="center">
                    Already have an account?
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
export default RegisterPage;
