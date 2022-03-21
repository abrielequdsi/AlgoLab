import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import QuestionListItem from "../components/QuestionList/QuestionListItem";

function getDirCount(r) {
  const filesCount = r.keys().length;
  const lastItem = r.keys()[filesCount - 1];
  const newLastItem = lastItem.replace("./", "");
  const slashLoc = newLastItem.indexOf("/");
  const questionNumber = newLastItem.slice(0, slashLoc);
  return parseInt(questionNumber);
}

function QuestionList() {
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    const dirCount = getDirCount(require.context("../problem-question"));
    // Get Question Infos
    setInfos([]);
    for (let i = 0; i < dirCount; i++) {
      import(`../problem-question/${i + 1}/info.js`)
        .then((res) =>
          setInfos((prev) => [
            ...prev,
            {
              title: res.title,
              category: res.category,
              difficulty: res.difficulty,
            },
          ])
        )
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <Box sx={{ height: "90.35vh", width: "100%" }}>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <AppBar
          position="absolute"
          elevation={0}
          sx={{
            borderRadius: 1,
            color: "white",
            position: "relative",
          }}
        >
          <Toolbar>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              noWrap
              sx={{ flex: 1 }}
              align="center"
            >
              Algorithm Problems
            </Typography>
          </Toolbar>
        </AppBar>

        <Paper variant="outlined" sx={{ my: { xs: 3, md: 4 } }}>
          <List
            sx={{ width: "100%", padding: 0 }}
            component="nav"
            aria-label="mailbox folders"
          >
            {infos.map((info, i) => (
              <Box key={i + 1}>
                <QuestionListItem
                  title={info.title}
                  category={info.category}
                  difficulty={info.difficulty}
                  number={i + 1}
                />
                <Divider />
              </Box>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}

export default QuestionList;
