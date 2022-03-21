import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabHelper(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        // <Box sx={{ p: 1.5 }}>
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default TabHelper;
