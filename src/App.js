import { CssBaseline, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { getPlacesData } from "./API";
import Header from "./component/Header/Header";
import List from "./component/List/List";
import Map from "./component/Map/Map";

function App() {
  const [type, setType] = useState("restaurants");
  const [filterplaces, setFilterplaces] = useState([]);
  const [rating, setRating] = useState("");
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState({
    northEast: { lat: 0, lng: 0 },
    southWest: { lat: 0, lng: 0 },
  });

  const [isloading, setisLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filterplaces = places.filter((place) => place.rating > rating);
    setFilterplaces(filterplaces);
  }, [rating]);

  useEffect(() => {
    console.log(coordinates, bounds);
    setisLoading(true);
    getPlacesData(type, bounds.northEast, bounds.southWest).then((data) => {
      console.log(data);
      setPlaces(data);
      setFilterplaces([]);
      setisLoading(false);
    });
    // return () => {
    //   cleanup
    // }
  }, [type, coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spcaing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filterplaces.length ? filterplaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
            isloading={isloading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            coordinates={coordinates}
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            places={filterplaces.length ? filterplaces : places}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
