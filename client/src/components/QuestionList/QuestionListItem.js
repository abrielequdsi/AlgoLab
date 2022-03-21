import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function QuestionListItem({ title, category, difficulty, number }) {
  const navigate = useNavigate();
  const handleClick = () => navigate("/questions/" + number);

  return (
    <ListItem button sx={{ padding: 2.5 }}>
      <Grid container>
        <Grid item xs={12} md={9} display="flex" alignItems="center">
          <Box sx={{ width: "100%" }}>
            <ListItemText
              sx={{ padding: 0, margin: 0 }}
              primary={
                <Box sx={{ marginBottom: 0.5 }}>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="h5"
                    color="text.primary"
                  >
                    {title}
                  </Typography>
                </Box>
              }
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2">
                    <strong>Category: </strong>
                    <span>{category}</span>,<span> </span>
                    <strong>Difficulty: </strong>
                    <span color="#1976d2">{difficulty}</span>,
                  </Typography>
                </React.Fragment>
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            onClick={handleClick}
            variant="outlined"
            sx={{ my: 2, mx: 0, width: "100%" }}
          >
            Solve Challenge
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default QuestionListItem;
