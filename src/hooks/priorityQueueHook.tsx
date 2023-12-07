import { useCallback, useState } from "react";
import { queueOperations } from "../dsOperations";
import { PriorityQueue } from "../interfaces";

export function usePriorityQueueHook() {
  const [priorityQueue, setPriorityQueue] = useState<PriorityQueue[]>([]);
  const [selectedOperation, setSelectedOperation] = useState(queueOperations[0]);

  const enqueue = useCallback((inputValue: number | string) => {
    setPriorityQueue((prevArray) => ([...prevArray, inputValue]));
  },[priorityQueue]);

  const dequeue = useCallback(() => {
    setPriorityQueue((prevArray) => {
      const newArray = [...prevArray];
      newArray.shift();
      return newArray;
    });
  }, []);

  const length = useCallback(() => {
    return priorityQueue.length;
  }, [priorityQueue]);

  const front = useCallback(() => {
    return priorityQueue[0];
  }, [priorityQueue]);

  const isEmpty = useCallback(() => {
    return (priorityQueue.length === 0);
  }, [priorityQueue]);

  return {
    priorityQueue,
    isEmpty,
    enqueue,
    dequeue,
    length,
    front,
    selectedOperation,
    setSelectedOperation
  };
}
