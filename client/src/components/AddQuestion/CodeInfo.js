import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CodeInfo({ handleChange, values }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Code Info
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        onChange={handleChange("solutionVideo")}
                        value={values.solutionVideo}
                        required
                        id="solutionVideo"
                        name="solutionVideo"
                        label="Solution Video (Youtube embed link)"
                        fullWidth
                        autoComplete="solution-video"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        onChange={handleChange("starterCode")}
                        value={values.starterCode}
                        multiline
                        rows={4}
                        required
                        id="starterCode"
                        name="starterCode"
                        label="Starter Code"
                        fullWidth
                        autoComplete="starterCode"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onChange={handleChange("solutionCode")}
                        value={values.solutionCode}
                        multiline
                        rows={4}
                        required
                        id="solutionCode"
                        name="solutionCode"
                        label="Solution Code"
                        fullWidth
                        autoComplete="solution-code"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
