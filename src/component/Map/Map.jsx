import React, { useState } from "react";
// import googleMapReact from 'google-map-react'
// import GoogleMapReact from 'google-map-react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./style";

const Map = ({ coordinates, setCoordinates, setBounds, places }) => {
  const classes = useStyles();
  const isMoble = useMediaQuery("(min-width:600px)");
  // Location function
  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        console.log(e);
        setCoordinates({
          lat: e.target.options.center.lat,
          lng: e.target.options.center.lng,
        });
        setBounds({
          northEast: e.bounds._northEast,
          southWest: e.bounds._southWest,
        });
        // setCoordinates(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return null;
  }

  return (
    <div className={classes.mapContainer}>
      {console.log("Hello map")}
      <MapContainer
        className={classes.leafContainer}
        center={coordinates}
        zoom={13}
        // onChange={MyComponent}
        scrollWheelZoom={true}
        onChildClick={""}
        option={""}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* {places?.map((place, i) => {
          const lat = Number(place.latitude);
          const lng = Number(place.longitude);
          return (
            <Marker position={{ lat:lat, lng:lng }} key={i}>
              <Popup>You are here</Popup>
            </Marker>
          );
        })} */}

        <LocationMarker />
      </MapContainer>
      {/* <GoogleMapReact bootstrapURLKeys={{key:'AIzaSyAPwwjQyi3mxNlYC1mca_l4vH5Nlj9sZIw'}} center={coodinates} defaultCenter={coodinates} defaultZoom={14} >
              
          </GoogleMapReact> */}
    </div>
  );
};

export default Map;
