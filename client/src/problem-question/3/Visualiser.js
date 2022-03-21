import React from "react";
import "./visualiser.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

const ANIMATION_SPEED_MS = 25;
const NUMBER_OF_ARRAY_BARS = 25;
const PRIMARY_COLOR = "#90caf9";
const SECONDARY_COLOR = "red";

export default class Visualiser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      animation_speed: ANIMATION_SPEED_MS,
      bar_numbers: NUMBER_OF_ARRAY_BARS,
      isRunning: false,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < this.state.bar_numbers; i++) {
      array.push(randomIntFromInterval(2, 100));
    }
    this.setState({ array });
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 4 === 0 || i % 4 === 1;
      const arrayBars = document.getElementsByClassName("bs__bar");
      if (isColorChange === true) {
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        await this.sleep(this.state.animation_speed);
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      } else {
        const [barIndex, newHeight] = animations[i];
        if (barIndex === -1) {
          continue;
        }
        const barStyle = arrayBars[barIndex].style;
        await this.sleep(this.state.animation_speed);
        barStyle.height = `${newHeight}px`;
      }
    }
    this.setState({
      ...this.state,
      isRunning: false,
    });
  }

  render() {
    const { array } = this.state;

    return (
      <Grid>
        <Typography variant="h5" gutterBottom sx={{ marginTop: 0.75 }}>
          <strong>Bubble Sort</strong>
        </Typography>
        <Box pt={1}> </Box>
        <Box>
          <div className="bs">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="bs__container">
                  {array.map((value, idx) => (
                    <div className="bs__pair">
                      <div
                        className="bs__bar"
                        key={idx}
                        style={{
                          backgroundColor: PRIMARY_COLOR,
                          height: `${value}px`,
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </div>
        </Box>
        <Box pt={0.5}>
          <Slider
            size="small"
            min={5}
            max={50}
            defaultValue={25}
            aria-label="Small"
            valueLabelDisplay="auto"
            disabled={this.state.isRunning === true ? true : false}
            onChange={(e) => {
              this.setState({
                ...this.state,
                animation_speed:
                  100 -
                  (e.target.value > 20 ? e.target.value * 2 : e.target.value),
                bar_numbers: e.target.value,
              });
              this.resetArray();
            }}
          />
        </Box>
        <Box pt={2}> </Box>

        <Box align="left">
          <Typography variant="p">Summary: </Typography>
        </Box>
        <Box align="left">
          <Typography variant="p">
            Repeatedly swapping the adjacent elements if they are in wrong
            order.
          </Typography>
        </Box>

        <Box pt={2} align="left">
          <Typography variant="small">Worst case: O(n²)</Typography>
        </Box>
        <Box pt={0} align="left">
          <Typography variant="small">Average case: O(n²)</Typography>
        </Box>
        <Box pt={0} pb={3} align="left">
          <Typography variant="small">Best case: O(n)</Typography>
        </Box>

        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: "20px" }}
            disabled={this.state.isRunning ? true : false}
            onClick={() => {
              this.setState({
                ...this.state,
                isRunning: true,
              });
              this.bubbleSort();
            }}
          >
            Run
          </Button>

          <Button
            variant="contained"
            size="small"
            color="primary"
            disabled={this.state.isRunning ? true : false}
            onClick={() => this.resetArray()}
          >
            Reset Array
          </Button>
        </Box>
      </Grid>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}

//
// Algorithms Logic Section
//
function getBubbleSortAnimations(array) {
  let animations = [];
  let auxillaryArray = array.slice();
  bubbleSort(auxillaryArray, animations);
  const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  console.log(
    "sort works correctly? ",
    arraysAreEqual(javaScriptSortedArray, auxillaryArray)
  );
  array = auxillaryArray;
  return animations;
}

function bubbleSort(auxillaryArray, animations) {
  const N = auxillaryArray.length;
  for (let i = 0; i < N - 1; i++) {
    for (let j = 0; j < N - i - 1; j++) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      if (auxillaryArray[j] > auxillaryArray[j + 1]) {
        animations.push([j, auxillaryArray[j + 1]]);
        animations.push([j + 1, auxillaryArray[j]]);
        swap(auxillaryArray, j, j + 1);
      } else {
        animations.push([-1, -1]);
        animations.push([-1, -1]);
      }
    }
  }
}

function swap(auxillaryArray, firstIndex, secondIndex) {
  let temp = auxillaryArray[firstIndex];
  auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
  auxillaryArray[secondIndex] = temp;
}
