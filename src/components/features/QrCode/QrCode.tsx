import { QRCode } from "react-qrcode-logo";
import logo from "/tipzy.svg";
import { useSelector } from "react-redux";
import { selectFirstName } from "../../../store/reducer/profileReducer";
import { selectArtistId } from "../../../store/reducer/signInReducer";

const QrCode = () => {
  const artistId = useSelector(selectArtistId);
  const artistName = useSelector(selectFirstName);
  return (
    <div className="w-11/12 h-dvh flex flex-col gap-0 justify-center items-center pt-12">
      <div className="p-4 shadow-2xl rounded-3xl flex flex-row gap-8 items-center bg-gray-700">
        <QRCode
          value={`https://dev.tipzyapp.com/client/getStarted?artistId=${artistId}`}
          size={300}
          bgColor={"black"}
          fgColor={"violet"}
          quietZone={15}
          style={{ borderRadius: 24, objectFit: "contain" }}
          ecLevel="L"
          logoImage={logo}
          logoOpacity={0.9}
          logoWidth={120}
          logoHeight={70}
          qrStyle="dots"
          eyeRadius={500}
          eyeColor={"white"}
        />
        <div>
          <p className="text-white text-2xl capitalize font-bold text-center">
            Scan this QR code to get started
          </p>
          <p className="text-white text-2xl capitalize mb-8 font-bold text-center">
            with TipZy
          </p>
          <p className="text-zinc-300 text-lg font-semibold text-center">
            Artist Name: {artistName}
          </p>
          <p className="text-zinc-300 text-lg font-semibold text-center">
            Artist ID: {artistId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QrCode;
