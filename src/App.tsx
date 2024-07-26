import AppLogo from "/assets/tipzy.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/artist/register");
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-black text-gray-100">
      <img
        src={AppLogo}
        alt="Tipzy App"
        className="max-w-lg animate-pulse mx-auto"
      />
    </div>
  );
}

export default App;
