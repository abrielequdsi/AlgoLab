import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabHelper from "../../utils/TabHelper-Prompt";
// Prompt Detail
import TextPrompt from "./TextPrompt.js";
import SolutionPrompt from "./SolutionPrompt.js";
import VisualiserPrompt from "./VisualiserPrompt.js";

function Prompt({ problemNumber }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [solution, setSolution] = useState("");
  const [solutionVideo, setSolutionVideo] = useState("");

  useEffect(() => {
    // // TEXT PROMPT
    // Get Prompt Markdown Content
    import(`../../problem-question/${problemNumber}/prompt.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setContent(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    // Get Prompt Title
    import(`../../problem-question/${problemNumber}/info.js`)
      .then((res) => setTitle(res.title))
      .catch((err) => console.log(err));
    // // SOLUTION PROMPT
    // Get Solution
    import(`../../problem-question/${problemNumber}/solution.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setSolution(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    // Get Solution Video
    import(`../../problem-question/${problemNumber}/solutionVideo.js`)
      .then((res) => setSolutionVideo(res.default))
      .catch((err) => console.log(err));
  });

  const handleTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Paper variant="outlined">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
            onChange={handleTab}
            aria-label="basic tabs example"
          >
            <Tab label={<strong>Prompt</strong>} />
            <Tab label={<strong>Visualiser</strong>} />
            <Tab label={<strong>Solution</strong>} />
          </Tabs>
        </Box>
        <Paper
          variant="outlined"
          sx={{
            borderRadius: 0,
            height: "84.9vh",
            border: "0",
            overflow: "auto",
            display: "block",
          }}
        >
          <TabHelper value={tabIndex} index={0}>
            <TextPrompt title={title} content={content} />
          </TabHelper>
          <TabHelper value={tabIndex} index={1}>
            <VisualiserPrompt problemNumber={problemNumber} />
          </TabHelper>
          <TabHelper value={tabIndex} index={2}>
            <SolutionPrompt solution={solution} solutionVideo={solutionVideo} />
          </TabHelper>
        </Paper>
      </Paper>
    </>
  );
}

export default Prompt;
