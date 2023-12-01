import { useState } from "react";
import { StackValueInterface } from "../interfaces";

export function useStackOperations(initialSize:number) {
  const [stack, setStack] = useState<StackValueInterface[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  
  // Set size
  let stackSize = initialSize;
  const setStackSize = (newSize:number) => {
    if (isNaN(newSize) || newSize <= 0){
        stackSize = initialSize;
        return;
    }
    stackSize = newSize;
  };

  // Push an item onto the stack
  const push = (newValue: StackValueInterface) => {
    if(currentIndex < stackSize-1 ){
        setStack((prevStack) => {
            return  [...prevStack, newValue];
        });
        setCurrentIndex(currentIndex + 1);
    }
  };

  // Pop an item from the stack
  const pop = () => {
    if (currentIndex >= 0) {
      setStack((prevStack) => prevStack.slice(0, currentIndex));
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Peek at the top item without removing it
  const peek = () => {
    return currentIndex >= 0 ? stack[currentIndex] : null;
  };

  // Compute the length of the stack
  const length = () => {
    return currentIndex + 1;
  };

  return {
    stack,
    currentIndex,
    push,
    pop,
    peek,
    length,
    stackSize,
    setStackSize,
  };
}
