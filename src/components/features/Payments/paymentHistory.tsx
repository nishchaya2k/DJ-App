import { useState } from "react";
import PaymentHistoryTable from "./paymentHistoryTable";
interface Props {
  setPage: any;
  setPageSize: any;
  setStatus: any;
}

const PaymentHistory = ({ setPage, setPageSize, setStatus }: Props) => {
  const [selectedHeading, setSelectedHeading] = useState("All");
  const headings = ["All", "Complete", "Pending", "Rejected"];

  const handleHeadingClick = (heading: string) => {
    setSelectedHeading(heading);

    setPage(1); //to show data from starting
    switch (heading) {
      case "Complete":
        setStatus("accepted");
        break;
      case "Pending":
        setStatus("pending");
        break;
      case "Rejected":
        setStatus("rejected");
        break;
      default:
        setStatus("");
        break;
    }
  };

  return (
    <div className="w-full h-full">
      {/* <div className="text-[22px] leading-[26px] text-[#FFFFFF] font-NeueMontreal font-semibold opacity-80 mb-5 tracking-wide">
        Payment History
      </div> */}

      {/* Headings */}
      <div className="flex flex-col gap-6">
        <div className="flex">
          {headings.map((heading, index) => (
            <div
              key={index}
              className={`w-[165px] h-[60px] flex justify-center items-center text-[18px] leading-[26px] rounded-[38px] cursor-pointer opacity-90 font-NeueMontreal font-semibold tracking-wide ${
                selectedHeading === heading
                  ? "bg-[#FFFFFF] text-[#222222]"
                  : "text-[#FFFFFF] opacity-90"
              }`}
              onClick={() => handleHeadingClick(heading)}
            >
              {heading}
            </div>
          ))}
        </div>

        <div className=" rounded-t-lg overflow-hidden mb-6">
          <PaymentHistoryTable setPage={setPage} setPageSize={setPageSize} />
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;

