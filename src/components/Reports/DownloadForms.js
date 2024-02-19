import React, { Component } from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import { CommonConfig } from "utils/constant.js";
import moment from "moment";
import api from "../../utils/apiClient";
import Button from "components/CustomButtons/Button.js";
import cogoToast from "cogo-toast";
import CardIcon from "components/Card/CardIcon.js";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SimpleBackdrop from "../../utils/general";
import ReactTable from "react-table";
import FormControl from "@material-ui/core/FormControl";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

class DownloadForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FormList: [],
      showAddButton: 0,
      type: "false",
      deletePopUp: false,
      deleteformID: "",
      deleteAttechment: "",
      PersonID: "",
    };
  }

  async componentDidMount() {
    var WriteAccess = CommonConfig.getUserAccess("Download Forms").WriteAccess;

    var AllAccess = CommonConfig.getUserAccess("Download Forms").AllAccess;
    var personid = CommonConfig.loggedInUserData().PersonID;
    this.setState({
      showAddButton: WriteAccess,
      type: AllAccess === 1 ? "true" : "false",
      PersonID: personid,
    });
    this.getDownloadFormList(personid);
  }
  viewFile(record) {
    debugger;
    window.open("https://docs.sflworldwide.com/document/" + record, "_blank");
  }
  getDownloadFormList = (id) => {
    try {
      var data = {
        id: id,
        type: this.state.type,
      };
      api
        .post("reports/getDownloadFormList", data)
        .then((result) => {
          debugger;
          if (result.data[0][0].AttachmentName !== null) {
            this.setState({ FormList: result.data[0] });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error", err);
    }
  };
  MoveAddPage = () => {
    this.props.history.push("/admin/AddDownloadForms");
  };
  Handledelete(record) {
    debugger;
    console.log("innnnnn", record.original.FormId);
    this.setState({
      deletePopUp: true,
      deleteformID: record.original.FormId,
      deleteAttechment: record.original.Attahment_Path,
    });
  }
  showLoader() {
    this.setState({ Loading: true });
  }
  hideLoader() {
    this.setState({ Loading: false });
  }

  canceldelete = () => {
    this.setState({
      deletePopUp: false,
      deleteformID: "",
      deleteAttechment: "",
    });
  };
  deleteForm = () => {
    var data = {
      FormId: this.state.deleteformID,
      Attachment: this.state.deleteAttechment,
    };
    this.hideLoader();
    api
      .post("reports/DeleteForm", data)
      .then((res) => {
        debugger; //lkj
        if (res.success) {
          this.showLoader();
          this.setState({
            deletePopUp: false,
          });
          this.getDownloadFormList(this.state.PersonID);
          this.hideLoader();
          cogoToast.success("Form Delete successfully");
          //}
        }
      })
      .catch((err) => {
        console.log("error....", err);
        this.hideLoader();
        cogoToast.error("Something Went Wrong");
      });
  };
  viewFileimg = (record) => {
    var AttachmentName = record.original.AttachmentName;
    var Attahment_Path = record.original.Attahment_Path;

    const AttachmentNameList = AttachmentName.split(",").map((item) =>
      item.trim()
    );
    const Attahment_PathList = Attahment_Path.split(",").map((item) =>
      item.trim()
    );

    return Attahment_PathList.map((item, idx) => {
      return (
        <div>
          {item.endsWith(".doc") || item.endsWith(".docx") ? (
            <Button
              justIcon
              color="primary"
              onClick={() => this.viewFile(item)}
              className="file-doc"
            >
              <i className="fa fa-file-word"></i>
            </Button>
          ) : item.endsWith(".pdf") ? (
            <Button
              justIcon
              color="danger"
              onClick={() => this.viewFile(item)}
              className="file-pdf"
            >
              <i className="fa fa-file-pdf"></i>
            </Button>
          ) : item.endsWith(".xlsx") || item.endsWith(".xls") ? (
            <Button
              justIcon
              color="success"
              onClick={() => this.viewFile(item)}
              className="file-excel"
            >
              <i className="fa fa-file-excel"></i>
            </Button>
          ) : (
            <Button
              justIcon
              color="primary"
              onClick={() => this.viewFile(item)}
              className="file-xtra"
            >
              <i className="fa fa-file-alt"></i>
            </Button>
          )}
        </div>
      );
    });
  };
  render() {
    const { FormList } = this.state;
    const column = [
      {
        Header: "File Name",
        id: "FileName",
        width: 90,
        maxWidth: 90,
        filterable: true,
        sortable: true,
        accessor: "FileName",
      },
      {
        Header: "File Description",
        id: "FileDescription",
        width: 155,
        maxWidth: 155,
        filterable: true,
        sortable: true,
        accessor: "FileDescription",
      },
      {
        Header: "Uploaded By",
        id: "UploadedBy",
        width: 95,
        maxWidth: 95,
        filterable: true,
        sortable: true,
        accessor: "Name",
      },
      {
        Header: "Uploaded On",
        id: "UploadedOn",
        width: 95,
        maxWidth: 95,
        filterable: true,
        sortable: true,
        accessor: (data) => {
          if (CommonConfig.isEmpty(data.CreatedOn)) {
            //return moment().format("MM/DD/YYYY");
          } else {
            return moment(data.CreatedOn).format(
              CommonConfig.dateFormat.dateOnly
            );
          }
        },
      },

      FormList.length > 0
        ? {
            Header: "Download",
            accessor: "Download",
            width: 150,
            maxWidth: 150,
            filterable: false,
            sortable: false,
            //   AttachmentPath

            Cell: (record) => {
              // return (
              //   <div className="table-common-btn">
              //   {}
              //     <Button
              //       justIcon
              //       color="primary"
              //       onClick={() => this.viewFile(record)}
              //     >
              //       <i className="fa fa-file"></i>
              //     </Button>
              //   </div>
              // );
              // return

              return (
                <div className="table-common-btn flex">
                  {this.viewFileimg(record)}
                </div>
              );
            },
          }
        : {
            Header: "Download",
            accessor: "Download",
            width: 102,
            maxWidth: 102,
            filterable: false,
            sortable: false,
          },
      {
        Header: "Actions",
        accessor: "Actions",
        width: 42,
        maxWidth: 42,
        filterable: false,
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              <Button
                justIcon
                color="danger"
                onClick={() => this.Handledelete(record)}
              >
                <i className="fas fa-trash"></i>
              </Button>
            </div>
          );
        },
        sortable: false,
      },
    ];

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
                  <AssignmentIcon />
                </CardIcon>
                <h4 className="margin-right-auto text-color-black">
                  Download Forms
                </h4>

                <div className="">
                  <FormControl fullWidth>
                    <div className="shipment-submit invoiceUpload">
                      <div className="right">
                        <Button color="rose" onClick={() => this.MoveAddPage()}>
                          Add
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                </div>
              </CardHeader>
              <CardBody>
                {FormList.length > 0 ? (
                  <div className="shipment-content">
                    <GridContainer justify="center">
                      <ReactTable
                        data={FormList}
                        minRows={2}
                        filterable
                        resizable={false}
                        columns={column}
                        defaultPageSize={10}
                        showPaginationBottom={true}
                        className=" -striped -highlight"
                      />
                    </GridContainer>
                  </div>
                ) : null}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <div>
          <Dialog
            open={this.state.deletePopUp}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Delete"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure want to delete?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.canceldelete} color="primary">
                Cancel
              </Button>
              <Button onClick={this.deleteForm} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default DownloadForms;
