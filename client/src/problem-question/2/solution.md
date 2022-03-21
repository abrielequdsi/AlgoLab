** Our Solution **

```
import sys;


def insertionSort(array):
  # Traverse through 1 to len(array)
  for i in range(1, len(array)):

    key = array[i]
    # Move elements of array[0..i-1], that are
    # greater than key, to one position ahead
    # of their current position
    j = i-1
    while j >=0 and key < array[j] :
      array[j+1] = array[j]
      j -= 1
    array[j+1] = key

  return array


if __name__ == "__main__":
  inputArray = [int(x) for x in sys.argv[1].split(",")]
  output = insertionSort(inputArray)
  print(output)
```