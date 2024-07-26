import DataTable, {
  createTheme,
  defaultThemes,
} from "react-data-table-component";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import { TableStyles } from "react-data-table-component";
import {
  selectPaymentData,
  selectTotalCount,
  // selectTotalTransactions,
} from "../../../store/reducer/paymentReducer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { transform } from "../../../utils/functions/paymentHistory/transform";

interface Props {
  setPage: any;
  setPageSize: any;
}

//Desired type
interface Payment {
  "transaction ID": string;
  date: string;
  amount: number;
  timing: string;
  status: string;
}

const columns = [
  {
    name: "Transaction ID",
    selector: (row: Payment) => row["transaction ID"],
  },
  {
    name: "Date",
    selector: (row: Payment) => row.date,
  },
  {
    name: "Amount",
    selector: (row: Payment) => `₹ ${row.amount}`,
  },
  {
    name: "Timing",
    selector: (row: Payment) => row.timing,
  },
  {
    name: "Status",
    cell: (row: Payment) => (
      <span style={{ color: getStatusColor(row.status) }}>{row.status}</span>
    ),
  },
];

createTheme(
  "solarized",
  {
    text: {
      primary: "white",
      secondary: "white",
    },
    background: {
      default: "#131313",
    },
    context: {
      background: "white",
      text: "#FFFFFF",
    },
    divider: {
      default: "#131313",
    },
    button: {
      default: "white",
      hover: "white",
      focus: "white",
      disabled: "rgba(255, 255, 255, .34)",
      cursor: "pointer",
    },
    sortFocus: {
      default: "white",
    },
  },
  "dark"
);

const getStatusColor = (status: string): string => {
  if (status === "Accepted") return "#0EAD69";
  if (status === "Pending") return "#0978F2";
  if (status === "Rejected") return "#FF0000";
  return "#FFFFFF";
};

const customStyles: TableStyles = {
  // table: {
  //   style: {
  //     height: "500px",
  //   },
  // },
  // responsiveWrapper: {
  //   style: {
  //     backgroundColor: "#131313",
  //     height: "500px",
  //   },
  // },

  head: {
    style: {
      minHeight: "56px",
    },
  },
  headRow: {
    style: {
      // borderBottomStyle: solid,
      borderBottomWidth: "1px",
      borderBottomColor: "white",
      fontSize: "16px",
      gap: "20px",
      color: "rgb(204, 204, 204)",
      fontFamily: "NueueMontreal",
    },
  },
  headCells: {
    style: {
      // border: "1px solid black",
      // borderBottomStyle: "solid",
      display: "flex",
      justifyContent: "start",
      fontSize: "16px",
      color: "rgb(204, 204, 204)",
      fontFamily: "NueueMontreal",
    },
  },

  cells: {
    style: {
      // border: "1px solid black",
      // border: "1px solid blue",
      display: "flex",
      justifyContent: "start",
      fontSize: "16px",
      opacity: 0.9,
      letterSpacing: "0.05em",
      fontWeight: "semi-bold",
      fontFamily: "NueueMontreal",
      "&:not(:last-of-type)": {
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
  rows: {
    style: {
      gap: "20px",
    },
  },

  pagination: {
    style: {
      fontFamily: "NueueMontreal",
      fontSize: "16px",

      // border: "1px solid white",
      display: "flex",

      "> :nth-child(3)": {
        display: "none",
      },
    },
  },
  noData: {
    style: {
      height: "500px",
      margin: "auto",
      opacity: "0.8",
      letterSpacing: "1px",
      lineHeight: "4px",
      fontFamily: "NueueMontreal",
    },
  },
};

const paginationComponentOptions = {
  rowsPerPageText: "per page",
};

const PaymentHistoryTable = ({ setPage, setPageSize }: Props) => {
  // const totalTransaction = useSelector(selectTotalTransactions);
  const paymentData = useSelector(selectPaymentData);
  const totalCount = useSelector(selectTotalCount);
  const transformedData = transform(paymentData);

  const [selectedPageSize, setSelectedPageSize] = useState<number>(10);
  const [selectedPage, setSelectedPage] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(1);

  const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setSelectedPageSize(newSize);
  };

  const handleTotalPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPage = parseInt(e.target.value, 10);
    setSelectedPage(newPage);
    setPage(newPage);
  };

  useEffect(() => {
    setSelectedPage(1);
    setSelectedPageSize(10);
    setPage(1);
    setPageSize(10);
  }, [totalCount]);

  useEffect(() => {
    setPage(1); //bcoz pageSize effect pagecount, so to avoid overflow access of pageNo.
    setPageSize(selectedPageSize);
  }, [selectedPageSize]);

  useEffect(() => {
    setTotalPage(Math.ceil(totalCount / selectedPageSize));
  }, [totalCount, selectedPageSize]);

  const handlePage = (dir: string) => {
    dir === "left"
      ? setPage((prev: number) => (prev > 1 ? prev - 1 : prev))
      : setPage((prev: number) => (prev === totalPage ? prev : prev + 1));
  };
  return (
    <DataTable
      //   title="Payment History"
      columns={columns}
      paginationPerPage={selectedPageSize}
      data={transformedData}
      pagination
      paginationServer
      paginationComponent={() => {
        return (
          <div className="w-full flex justify-between py-4 px-2 bg-[#131313]">
            <div className="">
              <select
                value={selectedPageSize}
                onChange={handlePageSize}
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                  padding: "1px",
                  borderRadius: "3px",
                  backgroundColor: "#505050",
                  color: "rgb(229, 229, 229)",
                  fontFamily: "NueueMontreal",
                  cursor: "pointer",
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-white opacity-80 font-NeueMontreal">
                {" "}
                per page
              </span>
            </div>

            <div className="flex justify-center items-center gap-4 pr-10 font-NeueMontreal">
              <div className="">
                <select
                  value={selectedPage}
                  onChange={handleTotalPage}
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                    padding: "1px",
                    borderRadius: "3px",
                    backgroundColor: "#505050",
                    color: "rgb(229, 229, 229)",
                    fontFamily: "NueueMontreal",
                  }}
                >
                  {Array.from({ length: totalPage }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <span className="text-white opacity-80 font-NeueMontreal">
                  {" "}
                  of {totalPage} pages
                </span>
              </div>
              <div className="flex justify-center items-center">
                <button onClick={() => handlePage("left")}>
                  <RiArrowLeftSLine className="text-white  text-xl opacity-80" />{" "}
                </button>
                <button onClick={() => handlePage("right")}>
                  <RiArrowRightSLine
                    className={`text-white  text-xl opacity-80`}
                  />{" "}
                </button>
              </div>
            </div>
          </div>
        );
      }}
      paginationRowsPerPageOptions={[10, 20, 50]}
      paginationIconFirstPage={false}
      paginationIconLastPage={false}
      paginationComponentOptions={paginationComponentOptions}
      theme="solarized"
      fixedHeader={true}
      fixedHeaderScrollHeight="true"
      // fixedHeaderScrollHeight="500px"
      customStyles={customStyles}
    />
  );
};

export default PaymentHistoryTable;
