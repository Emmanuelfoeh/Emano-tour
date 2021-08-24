import axios from "axios";

// const URL =
// `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;

const options = {
  params: {
    bl_latitude: "11.847676",
    tr_latitude: "12.838442",
    bl_longitude: "109.095887",
    tr_longitude: "109.149359",
  },
  headers: {
    "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    "x-rapidapi-key": "7cdecb7e06mshdff330e61ade8f2p14b6a9jsn4d8624024379",
  },
};

export const getPlacesData = async (type, northEast, southWest) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: southWest.lat,
          tr_latitude: northEast.lat,
          bl_longitude: southWest.lng,
          tr_longitude: northEast.lng,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key":
            "7cdecb7e06mshdff330e61ade8f2p14b6a9jsn4d8624024379",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
