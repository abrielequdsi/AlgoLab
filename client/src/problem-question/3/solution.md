** Our Solution **

```
import sys;


def bubbleSort(array):
  n = len(array)

  # Traverse through all array elements
  for i in range(n):

    # Last i elements are already in place
    for j in range(0, n-i-1):
      
      # traverse the array from 0 to n-i-1
      # Swap if the element found is greater
      # than the next element
      if array[j] > array[j+1] :
          array[j], array[j+1] = array[j+1], array[j]

  return array
  

if __name__ == "__main__":
  inputArray = [int(x) for x in sys.argv[1].split(",")]
  output = bubbleSort(inputArray)
  print(output)
```