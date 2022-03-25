import React from "react";
import Grid from "@mui/material/Grid";
// Other
import Prompt from "../components/IDE/Prompt";
import CodeEditor from "../components/IDE/CodeEditor";
// import TestCase from "../components/IDE/TestCase";
import { useParams } from "react-router-dom";

function IDE({ isLight }) {
    const { number } = useParams();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Prompt problemNumber={number} />
            </Grid>
            <Grid item xs={12} md={6}>
                <CodeEditor problemNumber={number} isLight={isLight} />
            </Grid>
        </Grid>
    );
}

export default IDE;
