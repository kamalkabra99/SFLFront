import React, { Component } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import HeadsetMic from "@material-ui/icons/HeadsetMic";
// core components
import InputLabel from "@material-ui/core/InputLabel";
import ReactDropzone from "react-dropzone";
import FormHelperText from "@material-ui/core/FormHelperText";
import GridContainer from "components/Grid/GridContainer.js";
import Icon from "@material-ui/core/Icon";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { CommonConfig } from "../../utils/constant";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import api from "../../utils/apiClient";
import cogoToast from "cogo-toast";
import SimpleBackdrop from "../../utils/general";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};
const axios = require("axios").default;
const useStyles = makeStyles(styles);

class AddaClaim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Loading: false,

      TrackingNumber: "",
      trackingnumberErr: false,
      trackingnumberHelperText: "",
      trackingnumberCheck: false,

      Comments: "",
      commentsErr: false,
      commentsHelperText: "",
      commentsCheck: false,

      Desiredresolution: "",
      desiredresolutionErr: false,
      desiredresolutionHelperText: "",
      desiredresolutionCheck: false,

      PersonType: "",
      personTypeErr: false,
      personTypeCheck: false,
      personTypeHelperText: "",

      ClaimType: "",
      claimTypeErr: false,
      claimTypeCheck: false,
      claimTypeHelperText: "",

      fileArray: [],
      files: [],
      fileObj: [],
      attachmentArray: [],
      personType: [],
      claimType: [],
      Access: [],
    };
  }

  componentDidMount() {
    if(CommonConfig.getUserAccess("File a Claim").WriteAccess === 0){
      CommonConfig.logoutUserdata()
    }
    this.stringMapstatus();

    this.setState({ Access: CommonConfig.getUserAccess("File a Claim") });
    this.stringMapAPI();
  }

  stringMapstatus = () => {
    let data = {
      stringMapType: "CLAIMPERSONTYPE",
    };
    api
      .post("stringMap/getstringMap", data)
      .then((result) => {
        if (result.success) {
          this.setState({ personType: result.data });
        } else {
        }
      })
      .catch((err) => {
        cogoToast.error("Something Went Wrong");
      });
  };

  stringMapAPI = () => {
    let data = { stringMapType: "CLAIMTYPE" };

    api
      .post("stringMap/getstringMap", data)
      .then((result) => {
        if (result.success) {
          this.setState({ claimType: result.data });
        }
      })
      .catch((err) => {
        cogoToast.error("Something Went Wrong");
      });
  };

  validate = (event) => {
    let IsFormValid = true;
    if (CommonConfig.isEmpty(this.state.PersonType)) {
      IsFormValid = false;
      this.setState({
        personTypeErr: true,
        personTypeHelperText: "Please select person type",
      });
    }
    if (CommonConfig.isEmpty(this.state.ClaimType)) {
      IsFormValid = false;
      this.setState({
        claimTypeErr: true,
        claimTypeHelperText: "Please select claim type",
      });
    }
    if (CommonConfig.isEmpty(this.state.Desiredresolution)) {
      IsFormValid = false;
      this.setState({
        desiredresolutionErr: true,
        desiredresolutionHelperText: "Please enter desired resolution",
      });
    }
    if (CommonConfig.isEmpty(this.state.Comments)) {
      IsFormValid = false;
      this.setState({
        commentsErr: true,
        commentsHelperText: "Please enter comment",
      });
    }
    if (CommonConfig.isEmpty(this.state.TrackingNumber)) {
      IsFormValid = false;
      this.setState({
        trackingnumberErr: true,
        trackingnumberHelperText: "Please enter tracking number",
      });
    }
    return IsFormValid;
  };

  handleSubmit = () => {
    if (this.validate()) {

      let checkclaimdata = {
        TrackingNo: this.state.TrackingNumber
      }

      try {
        this.showLoador();
        api
          .post("claim/checkClaim", checkclaimdata)
          .then((res) => {
            if (res.success) {
              this.hideLoador();

              if (res.data[0][0].TotalClaim > 0) {

                cogoToast.error("Claim already open for this tracking number. Please contact your sales Agent for further assistance.");

              } else {


                let data = {
                  userid: CommonConfig.loggedInUserData().PersonID,
                  ClaimID: null,
                  ClaimStatus: "NEW",
                  TrackingNumber: this.state.TrackingNumber,
                  ClaimPerson: this.state.PersonType,
                  TypeofClaim: this.state.ClaimType,
                  Comments: this.state.Comments,
                  DesiredResolution: this.state.Desiredresolution,
                  DocumentList: this.state.files,
                };

                console.log("DocumentList = ", this.state.files)

                var formData = new FormData();
                formData.append("data", JSON.stringify(data));
                if (this.state.attachmentArray.length > 0) {
                  this.state.attachmentArray.forEach((file) => {
                    formData.append("Attachments", file);
                  });
                }

                console.log("formData = ", formData)

                this.showLoador();
                try {
                  api
                    .post("claim/addClaim", formData)
                    .then((res) => {
                      if (res.success) {
                        this.hideLoador();
                        cogoToast.success("Claim request added Sucessfully");
                        if (this.state.Access.WriteAccess === 1) {
                          this.props.history.push("/admin/FileaClaimList");
                        } else {
                          this.props.history.push("/admin/addclaimconformation");
                        }
                      } else {
                        this.hideLoador();
                        cogoToast.error("Something went wrong");
                      }
                    })
                    .catch((error) => {
                      this.hideLoador();
                      cogoToast.error("Something went wrong");
                    });
                } catch (error) {
                  this.hideLoador();
                  cogoToast.error("Something Went Wrong");
                }

              }

              // console.log("Res = ",res.data[0]);
              // cogoToast.success("Claim request added Sucessfully");
              // if (this.state.Access.WriteAccess === 1) {
              //   this.props.history.push("/admin/FileaClaimList");
              // } else {
              //   this.props.history.push("/admin/addclaimconformation");
              // }
            } else {
              this.hideLoador();
              cogoToast.error("Something went wrong");
            }
          })
          .catch((error) => {
            this.hideLoador();
            cogoToast.error("Something went wrong");
          });
      } catch (error) {
        this.hideLoador();
        cogoToast.error("Something Went Wrong");
      }


    } else {
      cogoToast.error(
        "There were found error in form.Please correct and resubmit form."
      );
    }
  };

  handleChange = (event, type) => {
    if (type === "trackingnumber") {
      this.setState({ trackingnumberCheck: true });
      let trackingnumberVal = event.target.value;
      if (CommonConfig.isEmpty(trackingnumberVal)) {
        this.setState({
          TrackingNumber: trackingnumberVal,
          trackingnumberErr: true,
          trackingnumberHelperText: "Please enter Tracking Number",
        });
      } else {
        this.setState({
          TrackingNumber: trackingnumberVal,
          trackingnumberErr: false,
          trackingnumberHelperText: "",
        });
      }
    } else if (type === "comments") {
        if(CommonConfig.RegExp.exceptCirilic.test(event.target.value)){
          this.setState({ commentsCheck: true });

          let commentsVal = event.target.value;

          if (CommonConfig.isEmpty(commentsVal)) {
            this.setState({
              Comments: commentsVal,
              commentsErr: true,
              commentsHelperText: "Please e Commnets",
            });
          } else {
            this.setState({
              Comments: commentsVal,
              commentsErr: false,
              commentsHelperText: "",
            });

          }
        }
    } else if (type === "desiredresolution") {
      if(CommonConfig.RegExp.exceptCirilic.test(event.target.value)){
          this.setState({ desiredresolutionCheck: true });
          let desiredresolutionVal = event.target.value;
          if (CommonConfig.isEmpty(desiredresolutionVal)) {
            this.setState({
              Desiredresolution: desiredresolutionVal,
              desiredresolutionErr: true,
              desiredresolutionHelperText: "Please enter your Desired Resolution",
            });
          } else {
            this.setState({
              Desiredresolution: desiredresolutionVal,
              desiredresolutionErr: false,
              desiredresolutionHelperText: "",
            });
          }
        }
      }
  };

  requestChange = (event) => {
    const { name, value } = event.target;

    if (name === "persontype") {
      this.setState({ personTypeCheck: true });
      if (CommonConfig.isEmpty(value)) {
        this.setState({
          PersonType: value,
          personTypeErr: true,
          personTypeHelperText: "Please Select any one option",
        });
      } else {
        this.setState({
          PersonType: value,
          personTypeErr: false,
          personTypeHelperText: "",
        });
      }
    } else if (name === "claimtype") {
      this.setState({ claimTypeCheck: true });
      if (CommonConfig.isEmpty(value)) {
        this.setState({
          ClaimType: value,
          claimTypeErr: true,
          claimTypeHelperText: "Please Select any one option",
        });
      } else {
        this.setState({
          ClaimType: value,
          claimTypeErr: false,
          claimTypeHelperText: "",
        });
      }
    }
  };

  deleteSelected = (file) => {
    var tempFiles = this.state.fileArray;
    var fileIndex = tempFiles.indexOf(file);
    var fileTemp = this.state.files;
    var attachmentTemp = this.state.attachmentArray;
    fileTemp.splice(fileIndex, 1);
    attachmentTemp.splice(fileIndex, 1);
    tempFiles.splice(fileIndex, 1);
    this.setState({
      fileArray: tempFiles,
      files: fileTemp,
      attachmentArray: attachmentTemp,
    });
  };

  stringTruncate = (filename) => {
    var maxLength = 15;
    if (filename.length > 15) {
      filename = filename.substring(0, maxLength) + "...";
    } else {
      filename = filename;
    }
    return filename;
  };

  preview = () => {

    console.log("this.state.fileArray", this.state.fileArray)

    return this.state.fileArray.map((file) => {
      return (
        <div>
          <span className="img-box-outer">
            {file.url.includes("blob") ? (
              <img alt="Preview" key={file.preview} src={file.url} />
            ) : (
              <Icon>picture_as_pdf</Icon>
            )}
            <button
              className="delete-image"
              onClick={(event) => this.deleteSelected(event, file)}
            >
              <Icon>clear</Icon>
            </button>
          </span>
          <p>{this.stringTruncate(file.fileName)}</p>
        </div>
      );
    });
  };

  showLoador = () => {
    this.setState({ Loading: true });
  };

  hideLoador = () => {
    this.setState({ Loading: false });
  };

  acceptedFiles = (file, event) => {
    console.log("FilesSizes = ", file.length)
    let arrobj = []
    let flag = 0;
    if (file.length > 5) {
      cogoToast.error("Maximum allowed 5 files to upload.");
    } else {

      for (let i = 0; i < file.length; i++) {
        console.log("FilesSizes = ", file[i].size)
        if (file[i].size > 5000000) {
          flag = 1;
          break
        }
        else {
          flag = 0;
        }
      }
      if (flag == 1) {
        cogoToast.error("One of the file uploaded is above 5 MB. Maximum allowed per file is 5 MB.");
      } else {
        //size: 53379;
        let arrobjDummy = {};

        var filearray = [];
        this.setState({ fileObj: filearray });

        for (let j = 0; j < file.length; j++) {
          arrobjDummy = {
            AttachmentName: file[j].name,
            AttachmentType: file[j].type,
            Status: "Active",
            DateTime: new Date().getTime(),
            AttachmentID: null,
            SortOrder: j,
          };
          // arrobj[j] = (arrobjDummy)

          arrobj.push(arrobjDummy)

          // console.log("arrobj",arrobj);


          // console.log("this.state.files = ",this.state.files)
          this.setState({
            attachmentArray: [...this.state.attachmentArray, file[j]],
          });
          var fileType = file[j].type;

          if (fileType.startsWith("image/")) {
            this.state.fileObj.push(file[j]);
            console.log("this.state.fileObj", this.state.fileObj)

            console.log("this.state.fileObj", this.state.fileObj.length)

            // for (let i = 0; i <= this.state.fileObj.length; i++) {
            console.log("this.state.fileObj[i][0] = ", file[j])
            var obj = {
              url: URL.createObjectURL(file[j]),
              fileName: file[j].name,
            };
            // }
            this.setState({ fileArray: [...this.state.fileArray, obj] });
          } else {
            this.state.fileObj.push(file[j]);
            var obj = { url: this.state.fileObj, fileName: file[j].name };
            this.setState({ fileArray: [...this.state.fileArray, obj] });
          }
        }

      }
      var data = []
      for (let index = 0; index < arrobj.length; index++) {
        // data.push()
        this.setState({ files: [...this.state.files, arrobj[index]] });
      }
      console.log("datas = ", data)

      console.log("this.state.files = ", this.state.files)

    }

  };
  claimType = () => {
    return this.state.claimType.map((content) => {
      return (
        <MenuItem value={content.StringMapKey}>
          {" "}
          {content.Description}{" "}
        </MenuItem>
      );
    });
  };

  personType = () => {
    return this.state.personType.map((content) => {
      return (
        <MenuItem value={content.StringMapKey}>
          {" "}
          {content.Description}{" "}
        </MenuItem>
      );
    });
  };

  onPreviewDrop = (e, acceptedFiles) => { };

  redirectList = () => {
    this.props.history.push("/admin/FileaClaimList");
  };

  render() {
    return (
      <GridContainer className="UserList-outer">
        {this.state.Loading === true ? (
          <div className="loading">
            <SimpleBackdrop />
          </div>
        ) : null}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader className="btn-right-outer" color="primary" icon>
              <CardIcon color="primary">
                <HeadsetMic />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">Add Claim</h4>
              {this.state.Access.WriteAccess === 1 ? (
                <Button color="primary" onClick={() => this.redirectList()}>
                  View All
                </Button>
              ) : null}
            </CardHeader>
            <CardBody>
              <GridContainer justify="center">
                <GridItem xs={12} sm={4} md={4}>
                  <FormControl fullWidth>
                    <CustomInput
                      labelText="Tracking Number"
                      id="trackingnumber"
                      error={this.state.trackingnumberErr}
                      helperText={this.state.trackingnumberHelperText}
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        onFocus: () =>
                          this.setState({
                            trackingnumberCheck: false,
                            trackingnumberErr: false,
                            trackingnumberHelperText: "",
                          }),
                        onBlur: (event) =>
                          this.handleChange(event, "trackingnumber"),
                        endAdornment:
                          this.state.trackingnumberCheck !== true ? (
                            <Icon className={styles.User}> local_shipping</Icon>
                          ) : this.state.trackingnumberErr ? (
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
                          ),
                      }}
                    />
                  </FormControl>
                </GridItem>

                <GridItem xs={12} sm={4} md={4}>
                  <div className="select-spl">
                    <FormControl fullWidth error={this.state.personTypeErr}>
                      <InputLabel htmlFor="selectperson">
                        Claim Submitted By
                      </InputLabel>
                      <Select
                        fullWidth={true}
                        id="persontype"
                        name="persontype"
                        value={this.state.PersonType}
                        onChange={(event) => this.requestChange(event)}
                      >
                        {this.personType()}
                      </Select>
                      <FormHelperText>
                        {this.state.personTypeHelperText}
                      </FormHelperText>
                    </FormControl>
                  </div>
                </GridItem>

                <GridItem xs={12} sm={4} md={4}>
                  <div className="select-spl">
                    <FormControl fullWidth error={this.state.claimTypeErr}>
                      <InputLabel htmlFor="selectclaim">
                        Type Of Claim
                      </InputLabel>
                      <Select
                        fullWidth={true}
                        id="claimtype"
                        name="claimtype"
                        value={this.state.ClaimType}
                        onChange={(event) => this.requestChange(event)}
                      >
                        {this.claimType()}
                      </Select>
                      <FormHelperText>
                        {this.state.claimTypeHelperText}
                      </FormHelperText>
                    </FormControl>
                  </div>
                </GridItem>
              </GridContainer>

              <GridContainer justify="center">
                <GridItem xs={12} sm={6} md={6}></GridItem>
                <GridItem xs={12} sm={6} md={6}></GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div className="normal-textarea">
                    <label>Comments</label>
                    <textarea
                      aria-label="minimum height"
                      rowsMin={3}
                      value={this.state.Comments}
                      id="comments"
                      onChange={(event) => this.handleChange(event, "comments")}
                      required
                    />
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <div className="normal-textarea">
                    <label>Desired Resolution</label>
                    <textarea
                      aria-label="minimum height"
                      rowsMin={3}
                      value={this.state.Desiredresolution}
                      id="desiredresolution"
                      onChange={(event) =>
                        this.handleChange(event, "desiredresolution")
                      }
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer justify="center" className="mt-20">
                <GridItem xs={12} sm={12} md={12}>
                  <label className="label-bold">
                    If available please upload any support document(s) or
                    damaged product image(s) to support you’re your claim
                    request. Image size up to 1 MB per image is allowed to be
                    uploaded.
                  </label>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <ReactDropzone
                    onDropAccepted={(file, event) =>
                      this.acceptedFiles(file, event)
                    }
                    accept="image/*,.xls,.xlsx,.doc,.docx,.odt,.pdf,.png,.pptx,.ppt,.rtf"
                    onDrop={(e) => this.onPreviewDrop(e)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section className="dropzone-outer">
                        <div className="img-uploaded">{this.preview()}</div>
                        <div {...getRootProps()} className="dropzone-inner">
                          <input {...getInputProps()} />
                          <p>
                            {" "}
                            <span>Select File(s)...</span>
                          </p>
                          <small>
                            Only this extensions are supported
                            .bmp,.gif,.jpeg,.jpg,.tex,.xls,.xlsx,.doc,.docx,.odt,.pdf,.png,.pptx,.ppt,.rtf
                          </small>
                        </div>
                      </section>
                    )}
                  </ReactDropzone>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
          <div className="shipment-submit">
            <div className="right">
              <Button color="rose" onClick={(event) => this.handleSubmit()}>
                Save
              </Button>
            </div>
          </div>
        </GridItem>
      </GridContainer>
    );
  }
}

export default AddaClaim;
