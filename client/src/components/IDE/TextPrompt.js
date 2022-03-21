import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// Markdown
import Markdown from "markdown-to-jsx";

function TextPrompt({ title, content }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ marginTop: 0.75 }}>
        <strong>{title}</strong>
      </Typography>
      <Typography variant="body2">
        <Markdown>{content}</Markdown>
      </Typography>
    </Box>
  );
}

export default TextPrompt;
