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

  async mergeSort() {
    console.log("merge sort");
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("ms__bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        await this.sleep(this.state.animation_speed);
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      } else {
        await this.sleep(this.state.animation_speed);
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${newHeight}px`;
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
          <strong>Merge Sort</strong>
        </Typography>
        <Box pt={1}> </Box>
        <Box>
          <div className="ms">
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <div className="ms__container">
                  {array.map((value, idx) => (
                    <div className="ms__pair">
                      <div
                        className="ms__bar"
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
            Divides input array in two halves, calls itself for the two halves
            and then merges the two sorted halves
          </Typography>
        </Box>

        <Box pt={2} align="left">
          <Typography variant="small">Worst case: O(nlogn)</Typography>
        </Box>
        <Box pt={0} align="left">
          <Typography variant="small">Average case: O(nlogn)</Typography>
        </Box>
        <Box pt={0} pb={3} align="left">
          <Typography variant="small">Best case: O(nlogn)</Typography>
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
              this.mergeSort();
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

//
// Algorithms Logic Section
//
function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
