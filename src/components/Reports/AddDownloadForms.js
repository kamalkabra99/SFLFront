import React, { Component } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AssignmentIcon from "@material-ui/icons/Assignment";
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
import FindInPageIcon from "@material-ui/icons/FindInPage";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};
const axios = require("axios").default;
const useStyles = makeStyles(styles);

class AddDownloadForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Loading: false,

      FileDescription: "",
      FileDescriptionErr: false,
      FileDescriptionHelperText: "",

      FileName: "",
      FileNameErr: false,
      FileNameHelperText: "",

      fileArray: [],
      files: [],
      filesHelperText: "",
      fileObj: [],
      attachmentArray: [],
      claimType: [],
      Access: [],
    };
  }

  componentDidMount() {
    if(CommonConfig.getUserAccess("Download Forms").ReadAccess === 0){
              CommonConfig.logoutUserdata()
    }
  }

  validate = (event) => {
    let IsFormValid = true;

    if (CommonConfig.isEmpty(this.state.FileName)) {
      IsFormValid = false;
      this.setState({
        FileNameErr: true,
        FileNameHelperText: "Please enter file name",
      });
    }
    if (CommonConfig.isEmpty(this.state.FileDescription)) {
      IsFormValid = false;
      this.setState({
        FileDescriptionErr: true,
        FileDescriptionHelperText: "Please enter file description",
      });
    }
    if (this.state.files.length === 0) {
      IsFormValid = false;
      this.setState({
        filesErr: true,
        filesHelperText: "Please select file",
      });
    }
    return IsFormValid;
  };

  handleSubmit = () => {
    if (this.validate()) {
      this.showLoador();

      let data = {
        userid: CommonConfig.loggedInUserData().PersonID,
        FileName: this.state.FileName,
        FileDescription: this.state.FileDescription,
        DocumentList: this.state.files,
      };

      console.log("DocumentList = ", this.state.files);

      var formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (this.state.attachmentArray.length > 0) {
        this.state.attachmentArray.forEach((file) => {
          formData.append("Attachments", file);
        });
      }

      console.log("formData = ", formData);

      this.showLoador();
      try {
        api
          .post("reports/AddDownloadForms", formData)
          .then((res) => {
            if (res.success) {
              this.hideLoador();
              cogoToast.success("Form uploaded Sucessfully");

              this.props.history.push("/admin/DownloadForms");
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
    if (type === "FileName") {
      let filename = event.target.value;
      if (CommonConfig.isEmpty(filename)) {
        this.setState({
          FileName: filename,
          FileNameErr: true,
          FileNameHelperText: "Please enter file name",
        });
      } else {
        this.setState({
          FileName: filename,
          FileNameErr: false,
          FileNameHelperText: "",
        });
      }
    } else if (type === "FileDescription") {
      let commentsVal = event.target.value;
      if (CommonConfig.isEmpty(commentsVal)) {
        this.setState({
          FileDescription: commentsVal,
          FileDescriptionErr: true,
          FileDescriptionHelperText: "Please enter file description",
        });
      } else {
        this.setState({
          FileDescription: commentsVal,
          FileDescriptionErr: false,
          FileDescriptionHelperText: "",
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
    console.log("this.state.fileArray", this.state.fileArray);

    return this.state.fileArray.map((file) => {
      debugger;
      return (
        <div>
          <span className="img-box-outer">
            {file.url.includes("blob") ? (
              <img alt="Preview" key={file.preview} src={file.url} />
            ) : file.fileName.endsWith(".doc") ||
              file.fileName.endsWith(".docx") ? (
              <i className="fa fa-file-word iconaddform"></i>
            ) : file.fileName.endsWith(".pdf") ? (
              <i className="fa fa-file-pdf iconaddform"></i>
            ) : file.fileName.endsWith(".xlsx") ||
              file.fileName.endsWith(".xls") ? (
              <i className="fa fa-file-excel iconaddform"></i>
            ) : (
              <i className="fa fa-file-alt iconaddform"></i>
            ) //fileName
            }
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
    console.log("FilesSizes = ", file.length);
    let arrobj = [];
    let flag = 0;
    if (file.length > 5) {
      cogoToast.error("only allowed 5 files to upload.");
    } else {
      for (let i = 0; i < file.length; i++) {
        console.log("FilesSizes = ", file[i].size);
        if (file[i].size > 5000000) {
          flag = 1;
          break;
        } else {
          flag = 0;
        }
      }
      if (flag == 1) {
        cogoToast.error(
          "One of the file uploaded is above 5 MB. Maximum allowed per file is 5 MB."
        );
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

          arrobj.push(arrobjDummy);

          // console.log("arrobj",arrobj);

          // console.log("this.state.files = ",this.state.files)
          this.setState({
            attachmentArray: [...this.state.attachmentArray, file[j]],
          });
          var fileType = file[j].type;

          if (fileType.startsWith("image/")) {
            this.state.fileObj.push(file[j]);
            console.log("this.state.fileObj", this.state.fileObj);

            console.log("this.state.fileObj", this.state.fileObj.length);

            // for (let i = 0; i <= this.state.fileObj.length; i++) {
            console.log("this.state.fileObj[i][0] = ", file[j]);
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
      var data = [];
      for (let index = 0; index < arrobj.length; index++) {
        this.setState({
          files: [...this.state.files, arrobj[index]],
          filesHelperText: "",
        });
      }
    }
  };

  cancel = () => {
    this.props.history.push("/admin/DownloadForms");
  };

  onPreviewDrop = (e, acceptedFiles) => {};

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
                <AssignmentIcon />
              </CardIcon>
              <h4 className="margin-right-auto text-color-black">Add Forms</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <CustomInput
                      labelText="File Name"
                      id="FileName"
                      error={this.state.FileNameErr}
                      helperText={this.state.FileNameHelperText}
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        onFocus: () =>
                          this.setState({
                            FileNameErr: false,
                            FileNameHelperText: "",
                          }),
                        onBlur: (event) => this.handleChange(event, "FileName"),
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FormControl fullWidth>
                    <CustomInput
                      labelText="File Description"
                      id="FileDescription"
                      error={this.state.FileDescriptionErr}
                      helperText={this.state.FileDescriptionHelperText}
                      formControlProps={{ fullWidth: true }}
                      inputProps={{
                        onFocus: () =>
                          this.setState({
                            FileDescriptionErr: false,
                            FileDescriptionHelperText: "",
                          }),
                        onBlur: (event) =>
                          this.handleChange(event, "FileDescription"),
                      }}
                    />
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer justify="center" className="mt-20">
                {/* <GridItem xs={12} sm={12} md={12}>
                  <label className="label-bold">
                    If available please upload any support document(s) or
                    damaged product image(s) to support you’re your claim
                    request. Image size up to 1 MB per image is allowed to be
                    uploaded.
                  </label>
                </GridItem> */}
                <GridItem xs={12} sm={12} md={12}>
                  <ReactDropzone
                    onDropAccepted={(file, event) =>
                      this.acceptedFiles(file, event)
                    }
                    accept="image/*,.xls,.xlsx,.doc,.docx,.odt,.pdf,.png,.pptx,.ppt,.rtf,.txt"
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
                            .bmp,.gif,.jpeg,.jpg,.tex,.xls,.xlsx,.doc,.docx,.odt,.pdf,.png,.pptx,.ppt,.rtf,.txt
                          </small>
                        </div>
                      </section>
                    )}
                  </ReactDropzone>
                  <span
                    id="filesErr"
                    style={{ color: "red", fontSize: "12px" }}
                  >
                    {this.state.filesHelperText}
                  </span>
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {" "}
                  <div className="shipment-submit invoiceUpload">
                    <div className="right">
                      <Button onClick={this.cancel} color="secondary">
                        Cancel
                      </Button>
                      <Button
                        color="rose"
                        onClick={(event) => this.handleSubmit()}
                      >
                        Upload
                      </Button>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default AddDownloadForms;
