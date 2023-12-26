import { useCallback, useState } from "react";
import { heapOperations } from "../dsOperations";

/* 
Heap is implemented using an array
Left child: i*2
Right child: i*2 + 1
Parent: floor(i/2)
*/

// Min heap
export function useMinHeapHook() {
  // Adding the first element to easily maneuver indices
  // in the loop
  const [heapArray, setHeapArray] = useState<number[]>([0]);
  const [selectedOperation, setSelectedOperation] = useState<string>(
    heapOperations[0]
  );

  // Inserts the first element into the heap
  const createHeap = useCallback((inputValue: number) => {
    setHeapArray((prevArray) => {
      return [...prevArray, inputValue];
    })
  }, [heapArray]);

  // Inserts an element into the heap
  const insert = useCallback(
    (inputValue: number) => {
      setHeapArray((prevArray) => {
        // Create a new array and place the inputValue at the end
        const newArray = [...prevArray, inputValue];

        if (newArray.length > 2) {
          let index = newArray.length - 1;
          while (newArray[index] < newArray[Math.floor(index / 2)]) {
            // Comparing the inputValue with its parent
            if (index >= 1) {
              // Current parent node is not the root node
              // Swap current parrent node with the node at index
              [newArray[Math.floor(index / 2)], newArray[index]] = [
                newArray[index],
                newArray[Math.floor(index / 2)],
              ];

              if (Math.floor(index / 2) > 1) {
                index = Math.floor(index) / 2;
              } else {
                break;
              }
            }
          }
        }

        return newArray;
      });
    },
    [setHeapArray]
  );

  // Removes the smallest element (which is always at the
  // first index of the array) from the heap
  const remove = useCallback(() => {
    const minElement = heapArray[1];

    // Re-arrange the array
    setHeapArray((prevArray) => {
      const newArray = [...prevArray];
      if (newArray.length > 2) {
        // Move the last element to first
        newArray[1] = newArray[newArray.length - 1];
        newArray.splice(newArray.length - 1);

        // When there are two elements in the array,
        // checking with 3 because 0 is the first element which
        // is always untouched
        if (newArray.length === 3) {
          if (newArray[1] > newArray[2]) {
            [newArray[1], newArray[2]] = [newArray[2], newArray[1]];
          }
        }

        // When there are more than two elements in the array
        let i = 1;
        let left = 2 * i;
        let right = 2 * i + 1;
        while (
          newArray[i] >= newArray[left] ||
          newArray[i] >= newArray[right]
        ) {
          if (newArray[left] < newArray[right]) {
            [newArray[i], newArray[left]] = [newArray[left], newArray[i]];
            i = 2 * i;
          } else {
            [newArray[i], newArray[right]] = [newArray[right], newArray[i]];
            i = 2 * i + 1;
          }
          left = 2 * i;
          right = 2 * i + 1;
          if (newArray[left] === undefined || newArray[right] === undefined) {
            break;
          }
        }
      } else if (newArray.length === 2) {
        newArray.splice(1, 1);
      } else {
        // Heap has 0 elements
        return [0];
      }
      return newArray;
    });
    return minElement;
  }, [heapArray, setHeapArray]);

  // Sorting the heap in ascending order
  // Continue removing the elements until the heap is empty
  const sort = useCallback(() => {
    const sortedArray = [];
    while (heapArray.length > 1) {
      const minElement = remove();
      sortedArray.push(minElement);
    }
    return sortedArray;
  }, [heapArray]);

  // Checks whether the heap is empty or not
  const isEmpty = useCallback(() => {
    return heapArray.length <= 1;
  }, [heapArray])

  return {
    heapArray,
    selectedOperation,
    setSelectedOperation,
    setHeapArray,
    createHeap,
    insert,
    remove,
    sort,
    isEmpty
  };
}

// Max heap
export function useMaxHeapHook() {
  // Adding the first element to easily maneuver indices
  // in the loop
  const [heapArray, setHeapArray] = useState<number[]>([0]);
  const [selectedOperation, setSelectedOperation] = useState<string>(
    heapOperations[0]
  );

    // Inserts the first element into the heap
    const createHeap = useCallback((inputValue: number) => {
      setHeapArray((prevArray) => {
        return [...prevArray, inputValue];
      })
    }, [heapArray]);

  // Inserts an element into the heap
  const insert = useCallback(
    (inputValue: number) => {
      setHeapArray((prevArray) => {
        // Create a new array and place the inputValue at the end
        const newArray = [...prevArray, inputValue];

        if (newArray.length > 2) {
          let index = newArray.length - 1;
          while (newArray[index] > newArray[Math.floor(index / 2)]) {
            // Comparing the inputValue with its parent
            if (index >= 1) {
              // Current parent node is not the root node
              // Swap current parrent node with the node at index
              [newArray[Math.floor(index / 2)], newArray[index]] = [
                newArray[index],
                newArray[Math.floor(index / 2)],
              ];

              if (Math.floor(index / 2) > 1) {
                index = Math.floor(index) / 2;
              } else {
                break;
              }
            }
          }
        }

        return newArray;
      });
    },
    [setHeapArray]
  );

  // Removes the largest element (which is always at the
  // first index of the array) from the heap
  const remove = useCallback(() => {
    const maxElement = heapArray[1];

    // Re-arrange the array
    setHeapArray((prevArray) => {
      const newArray = [...prevArray];
      if (newArray.length > 2) {
        // Move the last element to first
        newArray[1] = newArray[newArray.length - 1];
        newArray.splice(newArray.length - 1);

        // When there are two elements in the array,
        // checking with 3 because 0 is the first element which
        // is always untouched
        if (newArray.length === 3) {
          if (newArray[1] < newArray[2]) {
            [newArray[1], newArray[2]] = [newArray[2], newArray[1]];
          }
        }

        // When there are more than two elements in the array
        let i = 1;
        let left = 2 * i;
        let right = 2 * i + 1;
        while (
          newArray[i] <= newArray[left] ||
          newArray[i] <= newArray[right]
        ) {
          if (newArray[left] > newArray[right]) {
            [newArray[i], newArray[left]] = [newArray[left], newArray[i]];
            i = 2 * i;
          } else {
            [newArray[i], newArray[right]] = [newArray[right], newArray[i]];
            i = 2 * i + 1;
          }
          left = 2 * i;
          right = 2 * i + 1;
          if (newArray[left] === undefined || newArray[right] === undefined) {
            break;
          }
        }
      } else if (newArray.length === 2) {
        newArray.splice(1, 1);
      } else {
        // Heap has 0 elements
        return [0];
      }
      return newArray;
    });
    return maxElement;
  }, [heapArray, setHeapArray]);

  // Sorting the heap in ascending order
  // Continue removing the elements until the heap is empty
  const sort = useCallback(() => {
    const sortedArray = [];
    while (heapArray.length > 1) {
      const minElement = remove();
      sortedArray.push(minElement);
    }
    return sortedArray;
  }, [heapArray]);

   // Checks whether the heap is empty or not
   const isEmpty = useCallback(() => {
    return heapArray.length <= 1;
  }, [heapArray])

  return {
    heapArray,
    selectedOperation,
    setSelectedOperation,
    setHeapArray,
    createHeap,
    insert,
    remove,
    sort,
    isEmpty
  };
}
