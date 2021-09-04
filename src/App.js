import { CssBaseline, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
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
  // rating useeffect
  useEffect(() => {
    const filterplaces = places.filter((place) => place.rating > rating);
    setFilterplaces(filterplaces);
  }, [rating]);

  // search input function
  function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();

      const searchControl = new GeoSearchControl({
        provider,
        showMarker: true,
        marker: {
          // optional: L.Marker    - default L.Icon.Default
          // icon: new L.Icon.Default(),
          draggable: false,
        },
      });

      map.addControl(searchControl);

      return () => map.removeControl(searchControl);
    }, [map]);

    return null;
  }

  // fetching data useeffect
  useEffect(() => {
    console.log(coordinates, bounds);
    setisLoading(true);
    getPlacesData(type, bounds.northEast, bounds.southWest).then((data) => {
      console.log(data);
      setPlaces(data);
      setFilterplaces([]);
      setisLoading(false);
    });
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
            LeafletgeoSearch={LeafletgeoSearch}
            places={filterplaces.length ? filterplaces : places}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
