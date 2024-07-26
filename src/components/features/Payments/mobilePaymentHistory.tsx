import { Suspense, useEffect, useState } from "react";
import MobilePaymentHistoryCard from "./mobilePaymentHistoryCard";
import {
  selectPaymentData,
  selectTotalCount,
} from "../../../store/reducer/paymentReducer";
import { useSelector } from "react-redux";
import DropdownSorting from "../dropdownSorting/dropdownSorting";
import { transform } from "../../../utils/functions/paymentHistory/transform";
// import Select, { StylesConfig } from "react-select";
//getting from api

interface OptionType {
  value: string;
  label: string;
}

const sortbyStatus = [
  { value: "", label: "All" }, //after clicking on the label we send value on the endpoint
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Completed" },
  { value: "rejected", label: "Rejected" },
];
interface Props {
  setPage: any;
  setPageSize: any;
  setStatus: any;
}

const MobilePaymentHistory = ({ setPage, setPageSize, setStatus }: Props) => {
  const paymentData = useSelector(selectPaymentData);
  const totalCount = useSelector(selectTotalCount);
  const [defaultOption] = sortbyStatus;
  const [sortby, setSortby] = useState<OptionType>(defaultOption);
  const [throttleTimeout, setThrottleTimeout] = useState<any | null>(null);

  const handleInfiniteScroll = async () => {
    try {
      if (
        document.documentElement.scrollTop + window.innerHeight + 10 >=
        document.documentElement.scrollHeight
      ) {
        if (!throttleTimeout) {
          setPageSize((prev: any) => {
            if (prev >= totalCount) return prev;
            else {
              const remainingTransaction = totalCount - prev;
              const increment = Math.min(remainingTransaction, 5);
              return prev + increment;
            }
          });

          setThrottleTimeout(
            setTimeout(() => {
              setThrottleTimeout(null);
            }, 500)
          );
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleScroll = () => handleInfiniteScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    setPage(1);
    setPageSize(10);
  }, [sortby]);

  const handleChange = (selectedOption: any) => {
    setSortby(selectedOption);
    setStatus(selectedOption.value);
  };

  const transformedData = transform(paymentData);

  return (
    <div className="w-full flex flex-col mt-4">
      <div className="w-full h-[42px] flex justify-between items-center">
        <div className="w-max h-max text-[18px] leading-[20px] text-[#FFFFFF] text-center font-NeueMontreal-Med tracking-wide">
          Transaction History
        </div>
        <div className="w-max h-max">
          {" "}
          <DropdownSorting
            sortbyStatus={sortbyStatus}
            sortby={sortby}
            handleChange={handleChange}
          />
        </div>
      </div>

      <Suspense>
        <div className="">
          {transformedData.length === 0 ? (
            <div className="w-full mt-40 text-center text-[18px] font-NeueMontreal tracking-wide text-white opacity-80">
              no records to display . . .
            </div>
          ) : (
            transformedData.map((data) => (
              <MobilePaymentHistoryCard
                key={data["transaction ID"]}
                amount={data.amount}
                date={data.date}
                status={data.status}
                timing={data.timing}
                transactionId={data["transaction ID"]}
              />
            ))
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default MobilePaymentHistory;
