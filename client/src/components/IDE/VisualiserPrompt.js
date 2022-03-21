import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function VisualiserPrompt({ problemNumber }) {
  const Visualiser =
    require(`../../problem-question/${problemNumber}/Visualiser.js`).default;
  return (
    <Box>
      <Visualiser />
    </Box>
  );
}

export default VisualiserPrompt;
