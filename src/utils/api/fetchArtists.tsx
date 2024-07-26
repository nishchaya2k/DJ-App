import { pendingPlayistAdded } from "../../store/reducer/bidListReducer";
import { selectToken } from "../../store/reducer/signInReducer";
import { useDispatch, useSelector } from "react-redux";

const dispatch = useDispatch();
const authToken = useSelector(selectToken);
export const fetchArtists = async (pageSize: number, page: number) => {
  try {
    const url = `${
      import.meta.env.VITE_APP_BASE_URL
    }/bidListArtists?pageSize=${pageSize}&page=${page}`;
    console.log("Requesting URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": import.meta.env.VITE_APP_KEY,
        Authorization: authToken,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response data:", errorData);

      throw new Error(`Error ${response.status}: ${errorData.message}`);
    }

    const data = await response.json();
    console.log(data.data);
    dispatch(pendingPlayistAdded(data.data));
  } catch (error) {
    console.error("Error fetching artists:", error);
  }
};
