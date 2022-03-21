import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
// Markdown
import Markdown from "markdown-to-jsx";

function SolutionPrompt({ solution, solutionVideo }) {
  return (
    <Box>
      {/* <CardMedia component="iframe" src={solutionVideo} allow="autoPlay"/> */}
      <iframe
        width="100%"
        height="486"
        src={solutionVideo}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <Typography variant="body2">
        <Markdown>{solution}</Markdown>
      </Typography>
    </Box>
  );
}

export default SolutionPrompt;
