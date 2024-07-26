import { formatTimestamp } from "./formatTimeStamp";

// Function to transform data from PaymentDatatypes to Payment
//getting from api
interface PaymentDatatypes {
  bidAmount: number;
  status: string;
  timestamp: string;
  transactionID: string;
}

//Desired type
interface Payment {
  "transaction ID": string;
  date: string;
  amount: number;
  timing: string;
  status: string;
}

export const transform = (paymentData: PaymentDatatypes[]): Payment[] => {
  return paymentData.map((item) => {
    const { date, time } = formatTimestamp(item.timestamp);
    return {
      "transaction ID": item.transactionID,
      date: date,
      amount: item.bidAmount / 100,
      timing: time,
      status:
        item.status?.charAt(0).toUpperCase() +
        item.status?.slice(1).toLowerCase(),
    };
  });
};
