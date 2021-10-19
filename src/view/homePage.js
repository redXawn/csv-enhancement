import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../components/loading";
import Badge from "../components/badge";

import { getInvoices } from "../redux/action/invoice";
import { rupiah } from "../utils/text";
import Checkbox from "../components/checkbox";

import "./homePage.scss";

const HomePage = () => {
  const dispatch = useDispatch();
  const [openExportMenu, setOpenExportMenu] = useState(false);
  const [date, setDate] = useState({
    startDate: dayjs().subtract(1, "day").toISOString(),
    formatStartDate: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    endDate: dayjs().toISOString(),
    formatEndDate: dayjs().format("YYYY-MM-DD"),
  });
  const [paidDate, setPaidDate] = useState({
    startDate: dayjs().subtract(1, "day").toISOString(),
    formatStartDate: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    endDate: dayjs().toISOString(),
    formatEndDate: dayjs().format("YYYY-MM-DD"),
  });
  const [expiredDate, setExpiredDate] = useState({
    startDate: dayjs().subtract(1, "day").toISOString(),
    formatStartDate: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
    endDate: dayjs().toISOString(),
    formatEndDate: dayjs().format("YYYY-MM-DD"),
  });
  const [showPaidDate, setShowPaidDate] = useState(false);
  const [showExpiredDate, setShowExpiredDate] = useState(false);
  const [statusFilter, setStatusFilter] = useState([]);

  const invoiceReducer = useSelector((state) => state.invoiceReducer);
  const loading = useSelector((state) => state.loadingReducer.loading);
  const { invoiceData, hasMore, lastInvoicePaginationId, successGetInvoice } = invoiceReducer;

  useEffect(() => {
    const query = `?created_after=${date.startDate}&created_before=${date.endDate}`;
    dispatch(getInvoices(query));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (showPaidDate) {
      setStatusFilter(["PAID", "SETTLED"]);
      setShowExpiredDate(false);
    } else {
      setStatusFilter([]);
    }
  }, [showPaidDate]);

  useEffect(() => {
    if (showExpiredDate) {
      setShowPaidDate(false);
    }
  }, [showExpiredDate]);

  function renderDataInvoice() {
    if (successGetInvoice && invoiceData.length > 0) {
      return (
        <table className="margin-auto ">
          <thead>
            <tr>
              <th>No</th>
              <th>Status</th>
              <th>Date Created</th>
              <th>Description</th>
              <th>Merchant name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{renderStatusBadge(item.status)}</td>
                <td>{dayjs(item.created).format("DD MMM YYYY, HH:mm")}</td>
                <td>{item.description}</td>
                <td>{item.merchant_name}</td>
                <td>{rupiah(item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (successGetInvoice && invoiceData.length === 0) {
      return (
        <div className="ta--center">
          <h3 className="error-status-code">404 | No Data Found</h3>
        </div>
      );
    }
  }

  function renderStatusBadge(status) {
    if (status === "PENDING") {
      return <Badge warning={true}>{status.toLowerCase()}</Badge>;
    } else if (status === "SETTLED") {
      return <Badge info={true}>{status.toLowerCase()}</Badge>;
    } else if (status === "PAID") {
      return <Badge success={true}>{status.toLowerCase()}</Badge>;
    } else if (status === "EXPIRED") {
      return <Badge danger={true}>{status.toLowerCase()}</Badge>;
    }
  }

  function changeDate(type, value) {
    if (type === "start") {
      setDate({
        ...date,
        startDate: dayjs(value).toISOString(),
        formatStartDate: dayjs(value).format("YYYY-MM-DD"),
      });
    } else {
      setDate({
        ...date,
        endDate: dayjs(value).toISOString(),
        formatEndDate: dayjs(value).format("YYYY-MM-DD"),
      });
    }
  }

  function changePaidDate(type, value) {
    if (type === "start") {
      setPaidDate({
        ...paidDate,
        startDate: dayjs(value).toISOString(),
        formatStartDate: dayjs(value).format("YYYY-MM-DD"),
      });
    } else {
      setPaidDate({
        ...paidDate,
        endDate: dayjs(value).toISOString(),
        formatEndDate: dayjs(value).format("YYYY-MM-DD"),
      });
    }
  }

  function changeExpiredDate(type, value) {
    if (type === "start") {
      setExpiredDate({
        ...expiredDate,
        startDate: dayjs(value).toISOString(),
        formatStartDate: dayjs(value).format("YYYY-MM-DD"),
      });
    } else {
      setExpiredDate({
        ...expiredDate,
        endDate: dayjs(value).toISOString(),
        formatEndDate: dayjs(value).format("YYYY-MM-DD"),
      });
    }
  }

  function renderPaidDate() {
    if (showPaidDate)
      return (
        <div className="padding-top-10">
          <input
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => changePaidDate("start", e.target.value)}
            value={paidDate.formatStartDate}
            type="date"
          />
          <span>-</span>
          <input
            min={date.formatStartDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => changePaidDate("end", e.target.value)}
            value={paidDate.formatEndDate}
            type="date"
          />
        </div>
      );
  }

  function renderExpiredDate() {
    if (showExpiredDate)
      return (
        <div className="padding-top-10">
          <input
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => changeExpiredDate("start", e.target.value)}
            value={expiredDate.formatStartDate}
            type="date"
          />
          <span>-</span>
          <input
            min={expiredDate.formatStartDate}
            max={new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
            onChange={(e) => changeExpiredDate("end", e.target.value)}
            value={expiredDate.formatEndDate}
            type="date"
          />
        </div>
      );
  }

  function renderStatusFilter() {
    const data = [
      {
        label: "Pending",
        disabled: showPaidDate,
        value: checkStatusChecked("PENDING"),
        onChange: () => setStatus("PENDING"),
      },
      {
        label: "Settled",
        disabled: false,
        value: checkStatusChecked("SETTLED"),
        onChange: () => setStatus("SETTLED"),
      },
      { label: "Paid", disabled: false, value: checkStatusChecked("PAID"), onChange: () => setStatus("PAID") },
      {
        label: "Expired",
        disabled: showPaidDate,
        value: checkStatusChecked("EXPIRED"),
        onChange: () => setStatus("EXPIRED"),
      },
    ];

    return data.map((item, index) => (
      <div className="margin-bottom-10">
        <div className="d--flex a-item--center">
          <Checkbox
            disabled={item.disabled}
            name={`${item.label}-status`}
            value={item.value}
            onChange={item.onChange}
          />
          <label className={`margin-left-5 ${item.disabled ? "text-gray" : ""}`} htmlFor={`${item.label}-status`}>
            {item.label}
          </label>
        </div>
      </div>
    ));
  }

  function checkStatusChecked(status) {
    const find = statusFilter.indexOf(status) > -1;
    if (find) {
      return true;
    } else {
      return false;
    }
  }

  function setStatus(status) {
    const find = statusFilter.indexOf(status) > -1;
    if (find) {
      const filter = statusFilter.filter((data) => data !== status);
      setStatusFilter(filter);
    } else {
      setStatusFilter((oldValue) => [...oldValue, status]);
    }
  }

  function filterNewData(nextPage) {
    const paidDateQuery = showPaidDate ? `&paid_after=${date.startDate}&paid_before=${date.endDate}` : "";
    const expiredDateQuery = showExpiredDate ? `&expired_after=${date.startDate}&expired_before=${date.endDate}` : "";
    const queryDate = `?created_after=${date.startDate}&created_before=${date.endDate}`;
    const queryStatus = statusFilter.length > 0 ? `&statuses=${JSON.stringify(statusFilter)}` : "";
    const nextPagePagination = nextPage ? `&last_invoice_id=${lastInvoicePaginationId}` : "";

    const newQueryFilter = queryDate + paidDateQuery + expiredDateQuery + queryStatus + nextPagePagination;
    dispatch(getInvoices(newQueryFilter, nextPage));
  }

  function renderHasMoreButton() {
    if (hasMore) {
      return (
        <button onClick={() => filterNewData(true)} className="homepage-export-button">
          More
        </button>
      );
    }
  }

  async function exportData(type) {
    const paidDateQuery = showPaidDate ? `&paid_after=${date.startDate}&paid_before=${date.endDate}` : "";
    const expiredDateQuery = showExpiredDate ? `&expired_after=${date.startDate}&expired_before=${date.endDate}` : "";
    const queryDate = `&created_after=${date.startDate}&created_before=${date.endDate}`;
    const queryStatus = statusFilter.length > 0 ? `&statuses=${JSON.stringify(statusFilter)}` : "";
    const formatType = `?format=${type}`;
    const newQueryFilter = formatType + queryDate + paidDateQuery + expiredDateQuery + queryStatus;
    console.log(newQueryFilter);
    if (type === "CSV") {
      let newSetData = [{ title1: "no", title2: "status", title3: "merchant", title4: "amount", title5: "created" }];

      for (let a = 0; a < invoiceData.length; a++) {
        const objData = {
          no: a + 1,
          status: invoiceData[a].status,
          merchant: invoiceData[a].merchant_name,
          amount: invoiceData[a].amount,
          created: invoiceData[a].created,
        };
        newSetData.push(objData);
      }

      const array = typeof newSetData !== "object" ? JSON.parse(newSetData) : newSetData;
      let str = "";
      for (let i = 0; i < array.length; i++) {
        let line = "";
        for (let index in array[i]) {
          if (line !== "") line += ",";
          line += array[i][index];
        }
        str += line + "\r\n";
      }

      const csvContent = "data:text/csv;charset=utf-8," + str;

      const encodedUri = encodeURI(csvContent);
      console.log("ecnode", encodedUri);
      window.location.href = encodedUri;
    }
    setOpenExportMenu(false);
  }

  function renderLoading() {
    if (loading) {
      return <Loading />;
    }
  }

  return (
    <div className="homepage-container">
      <div className="d--flex j-content--space-between padding-20 margin-bottom-20 a-item--start border-bottom-1">
        <div className="d--flex j-content--start">
          <div>
            <div className="d--flex f-direction--column padding-bottom-20">
              <label>Created Date</label>
              <div>
                <input
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => changeDate("start", e.target.value)}
                  value={date.formatStartDate}
                  type="date"
                />
                <span>-</span>
                <input
                  min={date.formatStartDate}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => changeDate("end", e.target.value)}
                  value={date.formatEndDate}
                  type="date"
                />
              </div>
            </div>
            <div className="margin-bottom-10">
              <div className="d--flex a-item--center">
                <Checkbox name="paid-date" value={showPaidDate} onChange={() => setShowPaidDate(!showPaidDate)} />
                <label className="margin-left-5" htmlFor="paid-date">
                  Paid Date
                </label>
              </div>
              {renderPaidDate()}
            </div>
            <div>
              <div className="d--flex a-item--center">
                <Checkbox
                  name="expired-date"
                  value={showExpiredDate}
                  onChange={() => setShowExpiredDate(!showExpiredDate)}
                />
                <label className="margin-left-5" htmlFor="expired-date">
                  Expired Date
                </label>
              </div>
              {renderExpiredDate()}
            </div>
          </div>
          <div className="d--flex f-direction--column margin-left-20">
            <label>Status</label>
            {renderStatusFilter()}
          </div>
          <div className="margin-left-20">
            <button className="homepage-filter-button" onClick={() => filterNewData()}>
              Filter
            </button>
          </div>
        </div>

        <div className="homepage-export-wrapper">
          <button className="homepage-export-button" onClick={() => setOpenExportMenu(!openExportMenu)}>
            Export Data
          </button>
          <ul className={`homepage-export-dropdown-menu ${openExportMenu ? "homepage-export-dropdown-menu-open" : ""}`}>
            <li onClick={() => exportData("PDF")} className="homepage-export-dropdown-item">
              PDF
            </li>
            <li onClick={() => exportData("CSV")} className="homepage-export-dropdown-item">
              CSV
            </li>
          </ul>
        </div>
      </div>
      <div>
        {renderDataInvoice()}
        <div className="padding-top-20 padding-bottom-20 ta--center">{renderHasMoreButton()}</div>
      </div>
      {renderLoading()}
    </div>
  );
};

export default HomePage;
