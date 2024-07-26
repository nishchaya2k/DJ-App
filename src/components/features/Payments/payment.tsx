import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TotalEarning from "./totalEarning";
import WithdrawalMethod from "./withdrawalMethod";
import PaymentHistory from "./paymentHistory";
import MobilePaymentHistory from "./mobilePaymentHistory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../../../store/reducer/signInReducer";
import {
  paymentDataAdded,
  earningAdded,
  lossAdded,
  totalCountAdded,
} from "../../../store/reducer/paymentReducer";
import { fetchArtistInfo } from "../../../utils/api/getInfoArtist";
import RejectedPayment from "./rejectedPayment";

TotalEarning;
interface Props {
  isMobile: boolean;
}
const settings = {
  dots: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  prevArrow: <></>, // Hides the left navigation arrow
  nextArrow: <></>, // Hides the right navigation arrow
};

const Payment = ({ isMobile }: Props) => {
  const dispatch = useDispatch();
  const authToken = useSelector(selectToken);
  // const TotalTransactions = useSelector(selectTotalTransactions);
  const [status, setStatus] = useState<string>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const fetchPayments = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BASE_URL
      }v1/paymentsArtists?pageSize=${pageSize}&page=${page}${
        status ? `&status=${status}` : ""
      }`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": import.meta.env.VITE_X_API_KEY,
          Authorization: authToken,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        if (errorData.message === "No payment data found for the artist") {
          dispatch(paymentDataAdded([]));
          dispatch(totalCountAdded(0));
        }
        throw new Error(`Error ${response.status}: ${errorData.message}`);
      }

      const data = await response.json();
      console.log(data.data);
      dispatch(paymentDataAdded(data.data));
      dispatch(totalCountAdded(data.totalCount));
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
    // if (
    //   pageSize <= TotalTransactions &&
    //   page <= Math.ceil(TotalTransactions / pageSize)
    // ) {
    fetchPayments();
    // }
  }, [page, pageSize, status]);

  useEffect(() => {
    const artistDetails = async () => {
      try {
        const data = await fetchArtistInfo(authToken);
        if (data) {
          dispatch(earningAdded(data.TotalEarnings));
          dispatch(lossAdded(data.TotalLoss));
        } else {
          dispatch(earningAdded(0));
          dispatch(lossAdded(0));
        }
      } catch (err) {
        console.log(err);
      }
    };

    artistDetails();
  }, []);

  return (
    <>
      {!isMobile ? (
        <div className="w-full h-dvh overflow-y-scroll scroll-smooth px-6 flex flex-col gap-12 py-[16px] pt-20">
          <div className="w-full flex gap-4">
            <TotalEarning />
            <RejectedPayment />
            <WithdrawalMethod />
          </div>
          <PaymentHistory
            setPage={setPage}
            setPageSize={setPageSize}
            setStatus={setStatus}
          />
        </div>
      ) : (
        <div className="">
          <Slider {...settings}>
            <div className="w-full">
              <TotalEarning />
            </div>
            <div className="w-full">
              <RejectedPayment />
            </div>
            <div className="w-full">
              <WithdrawalMethod />
            </div>
          </Slider>

          <MobilePaymentHistory
            setPage={setPage}
            setPageSize={setPageSize}
            setStatus={setStatus}
          />
        </div>
      )}
    </>
  );
};

export default Payment;
