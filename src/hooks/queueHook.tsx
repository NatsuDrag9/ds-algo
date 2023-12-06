import { useCallback, useMemo, useState } from "react";
import { queueOperations } from "../dsOperations";

export function useQueueHook() {
  const [queue, setQueue] = useState<(number | string)[]>([]);
  const [selectedOperation, setSelectedOperation] = useState(queueOperations[0]);

  const enqueue = useCallback((inputValue: number | string) => {
    setQueue((prevArray) => ([...prevArray, inputValue]));
  },[queue]);

  const dequeue = useCallback(() => {
    setQueue((prevArray) => {
      const newArray = [...prevArray];
      newArray.shift();
      return newArray;
    });
  }, []);

  const length = useCallback(() => {
    return queue.length;
  }, [queue]);

  const front = useCallback(() => {
    return queue[0];
  }, [queue]);

  const isEmpty = useCallback(() => {
    return (queue.length === 0);
  }, [queue]);

  return {
    queue,
    isEmpty,
    enqueue,
    dequeue,
    length,
    front,
    selectedOperation,
    setSelectedOperation
  };
}
