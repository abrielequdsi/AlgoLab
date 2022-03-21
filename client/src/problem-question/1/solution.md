** Our Solution **

```
import sys


def selectionSort(array):
  for i in range(len(array)):
    smallest = i
    for j in range(i + 1, len(array)):
      if array[j] < array[smallest]:
        smallest = j
    swap(i, smallest, array)
  return array
                
def swap(i, j, array):
  array[i], array[j] = array[j], array[i]
    

if __name__ == "__main__":
  inputArray = [int(x) for x in sys.argv[1].split(",")]
  output = selectionSort(inputArray)
  print(output)
```