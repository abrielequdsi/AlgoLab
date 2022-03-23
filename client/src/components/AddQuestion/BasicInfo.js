import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function BasicInfo({ handleChange, values }) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Basic Info
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        onChange={handleChange("title")}
                        value={values.title}
                        required
                        id="title"
                        name="title"
                        label="Title"
                        fullWidth
                        autoComplete="title"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={handleChange("difficulty")}
                        value={values.difficulty}
                        required
                        id="difficulty"
                        name="difficulty"
                        label="Difficulty"
                        fullWidth
                        autoComplete="difficulty"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        onChange={handleChange("category")}
                        value={values.category}
                        required
                        id="category"
                        name="category"
                        label="Category"
                        fullWidth
                        autoComplete="Category"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        onChange={handleChange("questionPrompt")}
                        value={values.questionPrompt}
                        multiline
                        rows={4}
                        required
                        id="questionPrompt"
                        name="questionPrompt"
                        label="Question Prompt"
                        fullWidth
                        autoComplete="questionPrompt"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
