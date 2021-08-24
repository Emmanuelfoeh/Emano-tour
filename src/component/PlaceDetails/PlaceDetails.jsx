import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@material-ui/core";
import { LocationOn, Phone } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import React from "react";

import useStyles from "./style";
const PlaceDetails = ({ place }) => {
  const classes = useStyles();
  return (
    <Card elevation={6}>
      <CardActionArea>
        <CardMedia
          style={{ height: 350 }}
          image={
            place.photo
              ? place.photo.images.large.url
              : "images/default_img.jpg"
          }
          title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {place.name}
            <Rating name="read-only" value={Number(place.rating)} readOnly />
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Price</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.price ? place.price : "$10-$50"}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Ranking</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.ranking}
            </Typography>
          </Box>
          {place?.awards?.map((award) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              my={1}
            >
              <img src={award.images.small} alt={award.display_name} />
              <Typography variant="subtitle2" color="textSecondary">
                {award.display_name}
              </Typography>
            </Box>
          ))}
          {place?.cuisine?.map(({ name }) => (
            <Chip
              key={name}
              size="small"
              label={name}
              className={classes.chip}
            />
          ))}
          {place?.address && (
            <Typography
              gutterBottom
              variant="subtitle2"
              color="textSecondary"
              className={classes.subtitle}
            >
              <LocationOn />
              {place.address}
            </Typography>
          )}
          {place?.phone && (
            <Typography
              gutterBottom
              variant="subtitle2"
              color="textSecondary"
              className={classes.spacing}
            >
              <Phone />
              {place.phone}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.web_url, "_blank")}
        >
          Trip Advisor
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.website, "_blank")}
        >
          Website
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
