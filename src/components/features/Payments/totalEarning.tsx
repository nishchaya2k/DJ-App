import { useSelector } from "react-redux";
import { selectEarningData } from "../../../store/reducer/paymentReducer";
const TotalEarning = () => {
  const totalEarning = useSelector(selectEarningData);

  const today = new Date();
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const formattedDate = today.toLocaleDateString("en-GB", options as any);

  const [day, month, year] = formattedDate.split(" ");
  const formattedToday = `${day}-${month}-${year}`;

  return (
    <div className="w-full h-[130px] bg-[#DCFAED] overflow-hidden rounded-[7px]">
      <div className="w-full h-full px-[20px] py-[25px] flex flex-col justify-center items-start gap-2">
        <div className="text-[20px] font-NeueMontreal-Med leading-[25px] text-[#222222]">
          Total Earnings
        </div>
        <div className="text-[28px] font-NeueMontreal-Bold leading-[33px] text-[#0EAD69]">
          &#8377; {totalEarning / 100}
        </div>
        <div className="text-[12px] font-NeueMontreal leading-[15px] text-[#49454F]">
          as of {formattedToday}
        </div>
      </div>
    </div>
  );
};

export default TotalEarning;
