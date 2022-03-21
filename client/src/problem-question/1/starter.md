import sys


def selectionSort(array):
  # Write your code here.
  pass
    

if __name__ == "__main__":
  inputArray = [int(x) for x in sys.argv[1].split(",")]
  output = selectionSort(inputArray)
  print(output)