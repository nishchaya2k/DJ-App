interface Props {
  amount: number;
  date: string;
  status: string;
  timing: string;
  transactionId: string;
}

const MobilePaymentHistoryCard = ({
  amount,
  date,
  status,
  timing,
  transactionId,
}: Props) => {
  return (
    <div>
      <div className="w-full h-24 px-[18px] py-[15px] flex  mt-4 border-[0.5px] border-[#4C4C4C] shadow-2x rounded-xl cursor-pointer box-border">
        <div className="w-full h-full flex flex-col justify-between">
          <div className="text-[12px] font-NeueMontreal-Med leading-[14px] text-[#828282]">
            Transaction Id
          </div>
          <div className="w-11/12 py-1 text-[16px] leading-[18px] text-[#FFFFFF] font-NeueMontreal-Med truncate">
            {transactionId}
          </div>
          <div className="text-[8px] leading-[10px] text-[#A2A3A4] font-NeueMontreal-Med">
            {date}
          </div>
          <div className="text-[8px] font-NeueMontreal-Med leading-[10px] text-[#A2A3A4]">
            {timing}
          </div>
        </div>
        <div className="w-full h-full flex flex-col justify-between items-end ">
          <div className="text-transparent bg-gradient-to-r from-[#907EFB] to-[#6E57FF] bg-clip-text text-[30px] leading-[36px] font-NeueMontreal-Bold tracking-wide">
            &#x20B9;{amount}
          </div>
          <button
            className={`w-[61px] h-[19px] flex justify-center items-center text-[9px] text-white font-medium rounded-3xl leading-[11px] font-NeueMontreal-Med ${
              status === "Accepted"
                ? "bg-[#019107]"
                : status === "Pending"
                ? "bg-[#000088]"
                : status === "Rejected"
                ? "bg-[#FF0000]"
                : ""
            }`}
          >
            {status}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePaymentHistoryCard;
