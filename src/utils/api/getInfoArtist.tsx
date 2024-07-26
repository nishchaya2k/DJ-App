export const fetchArtistInfo = async (authToken: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}v1/getArtistInfo`,
      {
        method: "GET",
        headers: {
          "x-api-key": import.meta.env.VITE_X_API_KEY,
          Authorization: authToken,
        },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      return responseData.data;
    }
  } catch (err) {
    console.error(err);
  }
};
