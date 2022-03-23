import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function TestCases({ handleChange }) {
    const testCasesNum = 4;
    const grids = [];
    for (let i = 1; i <= testCasesNum; i++) {
        grids.push(
            <Grid item xs={12} md={6} id={i} key={i}>
                <TextField
                    required
                    onChange={handleChange("testCase" + i)}
                    id={"testCase" + i}
                    label={"Test Case " + i}
                    fullWidth
                    autoComplete={"testCase" + i}
                />
            </Grid>
        );
        grids.push(
            <Grid item xs={12} md={6} id={i} key={i + 0.1}>
                <TextField
                    required
                    onChange={handleChange("testCaseAnswer" + i)}
                    id={"testCaseAnswer" + i}
                    label={"Test Case Answer " + i}
                    fullWidth
                    autoComplete={"testCaseAnswer" + i}
                />
            </Grid>
        );
    }
    const testCasesNum2 = 8;
    const grids2 = [];
    for (let i = testCasesNum + 1; i <= testCasesNum2; i++) {
        grids2.push(
            <Grid item xs={12} md={6} id={i} key={i}>
                <TextField
                    onChange={handleChange("testCase" + i)}
                    id={"testCase" + i}
                    label={"Test Case " + i}
                    fullWidth
                    autoComplete={"testCase" + i}
                />
            </Grid>
        );
        grids2.push(
            <Grid item xs={12} md={6} id={i} key={i + 0.1}>
                <TextField
                    onChange={handleChange("testCaseAnswer" + i)}
                    id={"testCaseAnswer" + i}
                    label={"Test Case Answer " + i}
                    fullWidth
                    autoComplete={"testCaseAnswer" + i}
                />
            </Grid>
        );
    }
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Test Cases
            </Typography>
            <Grid container spacing={3}>
                {grids}
                {grids2}
            </Grid>
        </React.Fragment>
    );
}
