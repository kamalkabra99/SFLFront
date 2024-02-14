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

class DownloadForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FormList: [],
    };
  }

  async componentDidMount() {
    this.getDownloadFormList();
  }
  viewFile(record) {
    window.open(
      "https://docs.sflworldwide.com/document/" +
        record.original.AttachmentPath,
      "_blank"
    );
  }
  getDownloadFormList = () => {
    try {
      api
        .get("reports/getDownloadFormList")
        .then((result) => {
          this.setState({ FormList: result.data });
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
  render() {
    const { FormList } = this.state;
    const column = [
      {
        Header: "File Name",
        id: "FileName",
        // width: 120,
        // maxWidth: 120,
        filterable: true,
        sortable: true,
        accessor: "AttachmentType",
      },
      {
        Header: "File Description",
        id: "FileDescription",
        // width: 155,
        // maxWidth: 155,
        filterable: true,
        sortable: true,
        accessor: "Description",
      },
      {
        Header: "Actions",
        accessor: "Actions",
        width: 102,
        maxWidth: 102,
        filterable: false,
        //   AttachmentPath
        Cell: (record) => {
          return (
            <div className="table-common-btn">
              <Button
                justIcon
                color="primary"
                onClick={() => this.viewFile(record)}
              >
                <i className="fa fa-file"></i>
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
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default DownloadForms;
