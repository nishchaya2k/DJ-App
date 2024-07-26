import { useSelector } from "react-redux";
import { selectLossData } from "../../../store/reducer/paymentReducer";

const RejectedPayment = () => {
  const totalLoss = useSelector(selectLossData);

  const today = new Date();
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const formattedDate = today.toLocaleDateString("en-GB", options as any);

  const [day, month, year] = formattedDate.split(" ");
  const formattedToday = `${day}-${month}-${year}`;

  return (
    <div className="w-full h-[130px] bg-[#F5F6F8] overflow-hidden rounded-[7px]">
      <div className="w-full h-full px-[20px] py-[25px] flex flex-col justify-center items-start gap-2">
        <div className="text-[20px] font-NeueMontreal-Med leading-[25px] text-[#222222]">
          Rejected Payments
        </div>
        <div className="text-[28px] font-NeueMontreal-Bold   leading-[33px] text-[#5C42FF]">
          &#8377; {totalLoss / 100}
        </div>
        <div className="text-[12px] font-NeueMontreal leading-[15px] text-[#49454F]">
          as of {formattedToday}
        </div>
      </div>
    </div>
  );
};

export default RejectedPayment;
