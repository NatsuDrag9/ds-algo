import { useCallback, useState } from "react";
import { queueOperations } from "../dsOperations";
import { PriorityQueue } from "../interfaces";

export function usePriorityQueueHook() {
  const [priorityQueue, setPriorityQueue] = useState<PriorityQueue[]>([]);
  const [selectedOperation, setSelectedOperation] = useState(queueOperations[0]);

  const enqueue = useCallback((priority: number , inputValue: number | string) => {
    
    if( isEmpty()) {
        setPriorityQueue([{value: inputValue, priority: priority}]);
    }
    else {
        setPriorityQueue((prevArray) => {
            const tempArr:PriorityQueue[] = [...prevArray];
            let added = false;
            for(let i = 0; i < tempArr.length; i++){
                if(priority > tempArr[i].priority) {                   
                    tempArr.splice(i, 0, {value: inputValue, priority: priority});
                    added = true;
                    break;
                }
            }
            if(!added){
                tempArr.push({value: inputValue, priority: priority});
            }
            return ([...tempArr]);
        })
    }
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
