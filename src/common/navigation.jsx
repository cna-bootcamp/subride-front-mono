import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import RecommendIcon from "@mui/icons-material/Recommend";
import { useState } from "react";
import { memo } from "react";

function Navigation() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{
        "& .Mui-selected, .Mui-selected > svg": {
          color: "#F2DC14",
        },
        position: "fixed",
        width: "100%",
        left: "0",
        bottom: "0",
        display: "flex",
      }}
    >
      <BottomNavigationAction
        label="홈"
        component={Link}
        to="/"
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        label="Sub"
        component={Link}
        to="/sub"
        icon={<GroupsIcon />}
      />
      <BottomNavigationAction
        label="구독현황"
        component={Link}
        to="/mysubscription"
        icon={<BookmarksIcon />}
      />
      <BottomNavigationAction
        label="추천"
        component={Link}
        to="/recommend"
        icon={<RecommendIcon />}
      />
    </BottomNavigation>
  );
}

export default memo(Navigation);
