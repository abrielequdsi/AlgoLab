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

  resetArray = () => {
    const array = [];
    for (let i = 0; i < this.state.bar_numbers; i++) {
      array.push(randomIntFromInterval(2, 100));
    }
    this.setState({ array });
  };

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const isColorChange =
        animations[i][0] === "comparison1" ||
        animations[i][0] === "comparison2";
      const arrayBars = document.getElementsByClassName("ss__bar");
      if (isColorChange === true) {
        const color =
          animations[i][0] === "comparison1" ? SECONDARY_COLOR : PRIMARY_COLOR;
        const [temp, barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = arrayBars[barOneIndex].style;
        const barTwoStyle = arrayBars[barTwoIndex].style;
        await this.sleep(this.state.animation_speed);
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      } else {
        const [temp, barIndex, newHeight] = animations[i];
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
          <strong>Selection Sort</strong>
        </Typography>
        <Box pt={1}> </Box>
        <Box>
          <div className="ss">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <div className="ss__container">
                  {array.map((value, idx) => (
                    <div className="ss__pair">
                      <div
                        className="ss__bar"
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
            Repeatedly find the minimum from unsorted part and put it in the
            front.
          </Typography>
        </Box>

        <Box pt={2} align="left">
          <Typography variant="small">Worst case: O(n²)</Typography>
        </Box>
        <Box pt={0} align="left">
          <Typography variant="small">Average case: O(n²)</Typography>
        </Box>
        <Box pt={0} pb={3} align="left">
          <Typography variant="small">Best case: O(n²)</Typography>
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
              this.selectionSort();
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
function getSelectionSortAnimations(array) {
  let animations = [];
  let auxillaryArray = array.slice();
  selectionSort(auxillaryArray, animations);
  const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  console.log(
    "sort works correctly? ",
    arraysAreEqual(javaScriptSortedArray, auxillaryArray)
  );
  array = auxillaryArray;
  return animations;
}

function selectionSort(auxillaryArray, animations) {
  const N = auxillaryArray.length;
  for (let i = 0; i < N - 1; i++) {
    let minIndex = i; //Finding minimum element in unsorted array
    for (let j = i + 1; j < N; j++) {
      animations.push(["comparison1", j, minIndex]);
      animations.push(["comparison2", j, minIndex]);
      if (auxillaryArray[j] < auxillaryArray[minIndex]) {
        minIndex = j;
      }
    }
    animations.push(["swap", minIndex, auxillaryArray[i]]);
    animations.push(["swap", i, auxillaryArray[minIndex]]);
    // Swap the found minimum element with the first element
    swap(auxillaryArray, minIndex, i);
  }
}

function swap(auxillaryArray, firstIndex, secondIndex) {
  let temp = auxillaryArray[firstIndex];
  auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
  auxillaryArray[secondIndex] = temp;
}
