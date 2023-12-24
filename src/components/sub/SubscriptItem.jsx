import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

function SubscriptItem({ item }) {
  return (
    <ListItem sx={{ padding: "10px 0px" }}>
      <ListItemAvatar>
        <Avatar
          src={process.env.PUBLIC_URL + `/service/${item.serviceId}.png`}
          alt={item.serviceName}
        />
      </ListItemAvatar>
      <ListItemText
        primary={item.serviceName}
        secondary={`${item.fee}원`}
        primaryTypographyProps={{ fontSize: "15px" }}
      />
    </ListItem>
  );
}

export default SubscriptItem;
