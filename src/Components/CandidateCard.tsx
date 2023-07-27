import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  CardActions,
  Box,
//   makeStyles
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface ProfileCardProps {
  profileImage: string;
  name: string;
  phoneNumber: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}

const useStyles = makeStyles((theme: any) => ({
  card: {
    maxWidth: 300,
    // margin: theme?.spacing(2),
    // [theme.breakpoints.down("sm")]: {
    //   maxWidth: "100%",
    // },
  },
  media: {
    height: 200,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

const ProfileCard: React.FC<ProfileCardProps> = ({
  profileImage,
  name,
  phoneNumber,
  description,
  onEdit,
  onDelete,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {/* <CardMedia className={classes.media} image={profileImage} /> */}
      {/* <img src={URL.createObjectURL(profileImage)} alt="" /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phone Number: {phoneNumber}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton aria-label="edit" onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default React.memo(ProfileCard);
