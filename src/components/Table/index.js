import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import * as _ from "lodash";

import * as s from "./table.module.scss";

import BackIcon from "../../assets/svgs/back.svg";
import ForwardIcon from "../../assets/svgs/forward.svg";

import ToggleText from "../ToggleText";
import IconList from "../IconList";
import tableViewConfig from "../../utils/tableViewConfig";

// import Date from "../Date";

class Table extends React.Component {
  constructor(props) {
    super(props);
    const { recordsPerPage = 10, data = [] } = this.props;
    this.state = {
      tableHead: [],
      page: 1,
      recordsPerPage,
      maxPages: Math.ceil(data.length / recordsPerPage),
    };

    this.showNextSet = this.showNextSet.bind(this);
    this.showPreviousSet = this.showPreviousSet.bind(this);
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    const { data, head, initOnDataChange = false } = nextProps;
    const { recordsPerPage, maxPages, tableHead } = this.state;
    if (!_.isEqual(head, tableHead)) {
      await this.setState({
        page: 1,
        tableHead: head,
      });
    }
    if (data && maxPages !== Math.ceil(data.length / recordsPerPage)) {
      this.setState({
        maxPages: Math.ceil(data.length / recordsPerPage),
      });
    }
    if (
      initOnDataChange &&
      maxPages !== Math.ceil(data.length / recordsPerPage)
    ) {
      this.setState({ page: 1 });
    }
  }

  showNextSet() {
    const { page = 1, maxPages = 1 } = this.state;
    if (page < maxPages) {
      this.setState({
        page: page + 1,
      });
    }
  }

  showPreviousSet() {
    const { page = 1 } = this.state;
    if (page > 1) {
      this.setState({
        page: page - 1,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data && this.props.data) {
      if (prevProps.data.length !== this.props.data.length) {
        this.setState({ page: 1 });
      }
    }
  }

  render() {
    const {
      head = [],
      data = [],
      rowbreak,
      selected = false,
      connected,
      connectedIndex,
      noFooter = false,
      rowClickHandler = false,
      allowRowClick = false,
      headerCheckFunction,
      headerAllChecked,
    } = this.props;
    const { page, recordsPerPage, maxPages } = this.state;
    const pageRecords = data.slice(
      recordsPerPage * (page - 1),
      recordsPerPage * page
    );

    const tableHeader = () => {
      const headCols = head.map((head, i) => (
        <th key={i}>
          <div>{head.title}</div>
        </th>
      ));
      if (selected) {
        headCols.shift();
        headCols.unshift(
          <th key={0}>
            <div
              onClick={() => {
                headerCheckFunction();
              }}
            >
              <input
                type="checkbox"
                checked={headerAllChecked}
                readOnly="readOnly"
              />
            </div>
          </th>
        );
      }
      return <tr key="tableHeadRow">{headCols}</tr>;
    };

    const tableRows = pageRecords.map((eachRowData, j) => {
      const rowStyle = cx(s.tr, {
        [s.hr]: rowbreak,
        [s.pointer]: rowClickHandler,
        [s.connected]:
          connected && connectedIndex === recordsPerPage * (page - 1) + j,
        // [s.stopped]: connected && connectedIndex === recordsPerPage * (page - 1) + j,
      });
      //let showtableBelow = false;
      const { setTableRowClicked } = this.props;
      const eachRow = head.map((headData, i) => {
        const { type, key } = headData;
        switch (type) {
          case "date":
            const { date = "NA", format = "time-from-now" } = eachRowData[key];
            return (
              <td key={i}>{/* <Date value={date} format={format} /> */}</td>
            );

          case "iconList":
            const iconList = eachRowData[key];
            return (
              <td key={i} id="actionbuttons">
                <IconList iconList={iconList} data={eachRowData} />
              </td>
            );

          case "toggleText":
            return (
              <td key={i}>
                <ToggleText data={eachRowData} stringKey={key} />
              </td>
            );

          default:
            return <td key={i}>{eachRowData[key] || "-"}</td>;
        }
      });

      const tableComponent = allowRowClick ? (
        <>
          <tr key={j} className={rowStyle}>
            {eachRow}
          </tr>
          {eachRowData.showContainerTable && (
            <tr className={rowStyle}>
              <td colspan="6">
                <Table
                  data={this.props.nestedTableData}
                  head={tableViewConfig["nestedcontainers"]}
                  recordsPerPage={3}
                />
              </td>
            </tr>
          )}
        </>
      ) : (
        <>
          <tr
            key={j}
            className={rowStyle}
            onClick={
              rowClickHandler
                ? (event) => {
                    rowClickHandler(event, eachRowData.clusterName.name);
                  }
                : () => {}
            }
          >
            {eachRow}
          </tr>
        </>
      );
      return tableComponent;
    });

    const tableStyles = cx(s.tableContainer, {});
    // console.log('Table Data', data);
    return (
      <div className={tableStyles}>
        <table className={s.table}>
          <thead>{tableHeader()}</thead>
          <tbody>{tableRows}</tbody>
        </table>
        {noFooter === false && pageRecords.length > 0 && (
          <div className={s.tableFooter}>
            {/* {data.length > recordsPerPage && ( */}
            <>
              <div className={s.currentPage}>
                Page {page} of {maxPages}
              </div>
              <div className={s.pageRange}>
                Record {recordsPerPage * (page - 1) + 1}-
                {recordsPerPage * page > data.length
                  ? data.length
                  : recordsPerPage * page}{" "}
                of {data.length}
              </div>
              <div className={s.paginationButton}>
                {page > 1 && (
                  <img src={BackIcon} alt="" onClick={this.showPreviousSet} />
                )}
                {page < maxPages && (
                  <img src={ForwardIcon} alt="" onClick={this.showNextSet} />
                )}
              </div>
            </>
            {/* )} */}
          </div>
        )}
        {pageRecords.length === 0 && (
          <div className={s.noRecords}>No records</div>
        )}
      </div>
    );
  }
}

const mapActionToProps = {};

export default connect((state) => state, mapActionToProps)(Table);
