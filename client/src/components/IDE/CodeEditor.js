import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabHelper from "../../utils/TabHelper-CodeEditor";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
// Accordion
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// Codemirror
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

function CodeEditor({ problemNumber, isLight }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [boxColor, setBoxColor] = useState(null);
  // IDE Terminal
  const [code, setCode] = useState("def main():\n  pass");
  const [testCases, setTestCases] = useState({});
  const [codeRunDebug, setCodeRunDebug] = useState([]);
  const [codeRunOutput, setCodeRunOutput] = useState([]);
  const [codePassCount, setCodePassCount] = useState(0);

  const checkCodeRunOutput = (codeRunOutput, testCase) => {
    console.log(codeRunOutput);
      if (codeRunOutput !== "None") {
        if (codeRunOutput[0]==="[") {
          return JSON.stringify(JSON.parse(codeRunOutput)) === JSON.stringify(testCase)
        } else {
          return codeRunOutput === testCase
        }
      } else
        return false
    }

  useEffect(() => {
    // Get Starter Code
    import(`../../problem-question/${problemNumber}/starter.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setCode(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    // Get Test Case
    import(`../../problem-question/${problemNumber}/testCases.js`)
      .then((res) => {
        setTestCases(res.default);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    // Send the code & Test Cases
    // Only Process the Code + Input
    // Bring the results back and test it with the expected output in testCases
    axios
      .post("http://localhost:8000/api/python", { code, testCases })
      .then((res) => {
        setCodeRunDebug(res.data.codeRunDebug);
        setCodeRunOutput(res.data.codeRunOutput);
        // Count Passed Test Case
        let trueCount = 0;
        res.data.codeRunOutput.forEach((output, i) => {
          checkCodeRunOutput(output, testCases[i]["output"]) && trueCount++;
        });
        setCodePassCount(trueCount);
        trueCount !== res.data.codeRunOutput.length
          ? setBoxColor("red")
          : setBoxColor("green");
      });
  };

  const handleTab = (event, newValue) => {
    setTabIndex(newValue);
  };

  

  return (
    <Grid container spacing={2}>
      {/* Upper Part - Code Editor */}
      <Grid item xs={12}>
        <Paper variant="outlined">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={0} aria-label="basic tabs example">
              <Tab label={<strong>Your Solution</strong>} />
            </Tabs>
          </Box>
          <TabHelper>
            {/* Main Code Editor */}
            <Typography variant="body2" height="100%">
              <CodeMirror
                value={code}
                height="50.45vh"
                theme={isLight ? "light" : oneDark}
                extensions={[python()]}
                indentWithTab={true}
                onChange={(value, viewUpdate) => {
                  setCode(value);
                }}
              />
            </Typography>
          </TabHelper>
        </Paper>
      </Grid>
      {/* BOTTOM PART - TEST CASE TERMINAL */}
      <Grid item xs={12}>
        <Paper variant="outlined">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabIndex}
              onChange={handleTab}
              aria-label="basic tabs example"
            >
              <Tab label={<strong>Run Code Result</strong>} />
              <Tab label={<strong>Raw Output</strong>} />
              <Button
                onClick={handleClick}
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: "0 4px 0 0",
                  backgroundColor: "#1ba94c",
                  marginLeft: "auto",
                  fontSize: "13px",
                  fontWeight: "550",
                  color: "white",
                }}
              >
                Run Code
              </Button>
            </Tabs>
          </Box>
          <TabHelper>
            <Box
              border={
                boxColor === null
                  ? isLight
                    ? "2px solid white"
                    : "2px solid #282C34"
                  : boxColor === "green"
                  ? "2px solid #1ba94c"
                  : "2px solid red"
              }
              borderTop="0"
              bgcolor={isLight ? "light" : "#282C34"}
              overflow="auto"
            >
              {/* RUN-CODE-RESULT SECTION */}
              <TabHelper value={tabIndex} index={0}>
                {codeRunOutput.length === 0 ? (
                  <Box
                    sx={{
                      padding: 1.5,
                      height: "24.9vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      align="center"
                      fontWeight="bold"
                      color="#698496"
                      fontSize="19px"
                    >
                      Run the code when you are ready.
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      padding: 1.5,
                      height: "24.9vh",
                    }}
                  >
                    <Typography
                      variant="body1"
                      align="center"
                      fontWeight="bold"
                      fontSize="18px"
                      marginBottom="20px"
                      color={codePassCount !== codeRunOutput.length ? "red" : "#1ba94c"}
                    >
                      {codePassCount !== codeRunOutput.length
                        ? "Your code fail at least one of the test cases!"
                        : "Your code pass all the test cases!"}
                    </Typography>
                    <Typography marginBottom="10px" color="darkgrey">
                      {codePassCount} / {codeRunOutput.length} test cases passed
                    </Typography>
                    {testCases.map((testCase, i) => {
                      return (
                        <Accordion
                          sx={{
                            marginBottom: "1.1rem",
                            border: "0",
                            "&:before": {
                              display: "none",
                            },
                            borderRadius: "4px",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            {checkCodeRunOutput(codeRunOutput[i], testCase["output"])  ? (
                              <TaskAltIcon sx={{ color: "#1ba94c" }} />
                            ) : (
                              <ErrorOutlineIcon sx={{ color: "red" }} />
                            )}
                            <Typography pl={1}>
                              {" "}
                              Test Case {i + 1}{" "}
                              {checkCodeRunOutput(codeRunOutput[i], testCase["output"])
                                ? "passed"
                                : "failed"}
                            </Typography>
                          </AccordionSummary>
                          {/* INPUT, EXPECTED & USER OUTPUT */}
                          <AccordionDetails>
                            {["Input", "Expected Output", "Your Output"].map(
                              (text, j) => {
                                return (
                                  <>
                                    <Typography sx={{ fontSize: "16px" }}>
                                      {text}
                                    </Typography>
                                    <Box
                                      sx={{
                                        padding: "12px",
                                        boxShadow:
                                          "2px 2px 3px 1px rgb(0 0 0 / 40%), 0 0 3px 1px rgb(0 0 0 / 30%)",
                                        borderRadius: "4px",
                                        margin: "3px 0 15px 0",
                                      }}
                                      bgcolor={isLight ? "light" : "#282C34"}
                                    >
                                      {/* ONLY WORKS FOR ARRAY INPUT */}
                                      {j === 0 && testCase["input"].map(input => {
                                        return input.join(', ') 
                                      })}
                                      {console.log()}
                                      {j === 1 && testCase["output"].join(', ')}
                                      {j === 2 && (codeRunOutput[i]==="None" ? "None": ( codeRunOutput[i][0]==="[" ? JSON.parse(codeRunOutput[i]).join(', '):codeRunOutput[i] )) }
                                    </Box>
                                  </>
                                );
                              }
                            )}
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </Box>
                )}
              </TabHelper>
              {/* RAW-OUTPUT SECTION */}
              <TabHelper value={tabIndex} index={1}>
                {codeRunOutput.length === 0 ? (
                  <Box
                    sx={{
                      padding: 1.5,
                      height: "24.9vh",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      align="center"
                      fontWeight="bold"
                      color="#698496"
                      fontSize="19px"
                    >
                      Run the code when you are ready.
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      padding: 1.5,
                      height: "24.9vh",
                    }}
                  >
                     {testCases.map((testCase, i) => {
                      return (
                        <Typography
                          fontFamily="monospace"
                          fontSize="14px"
                          color={checkCodeRunOutput(codeRunOutput[i], testCase["output"])? "#1ba94c" : "red"}
                          key={i}
                          pb={1}
                        >
                          ---------- Test Case {i + 1} ----------
                          {codeRunDebug[i].map(print => {
                            return (
                              <Typography fontFamily="monospace"
                              fontSize="14px">
                                  {print}
                              </Typography>
                            )
                          })}
                        </Typography>
                      );
                    })}
                  </Box>
                )}
              </TabHelper>
            </Box>
          </TabHelper>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CodeEditor;

// {codeRunOutput.map((result, i) => {
//   return (
//     <Accordion
//       sx={{
//         marginBottom: "1.1rem",
//         border: "0",
//         "&:before": {
//           display: "none",
//         },
//         borderRadius: "4px",
//       }}
//     >
//       <AccordionSummary
//         expandIcon={<ExpandMoreIcon />}
//         aria-controls="panel1a-content"
//         id="panel1a-header"
//       >
//         {result === "True" ? (
//           <TaskAltIcon sx={{ color: "#1ba94c" }} />
//         ) : (
//           <ErrorOutlineIcon sx={{ color: "red" }} />
//         )}
//         <Typography pl={1}>
//           {" "}
//           Test Case {i + 1}{" "}
//           {result === "True" ? "passed" : "failed"}
//         </Typography>
//       </AccordionSummary>
//       {/* INPUT, EXPECTED & USER OUTPUT */}
//       <AccordionDetails>
//         {["Input", "Expected Output", "Your Output"].map(
//           (text, j) => {
//             return (
//               <>
//                 <Typography sx={{ fontSize: "16px" }}>
//                   {text}
//                 </Typography>
//                 <Box
//                   sx={{
//                     padding: "12px",
//                     boxShadow:
//                       "2px 2px 3px 1px rgb(0 0 0 / 40%), 0 0 3px 1px rgb(0 0 0 / 30%)",
//                     borderRadius: "4px",
//                     margin: "3px 0 15px 0",
//                   }}
//                   bgcolor={isLight ? "light" : "#282C34"}
//                 >
//                   {j===0 && }
//                   {j===1 && }
//                   {j===2 && }
//                 </Box>
//               </>
//             );
//           }
//         )}
//       </AccordionDetails>
//     </Accordion>
//   );
// })}
