import { useCallback, useState } from "react";
import { SET1, SET2, mySetOperations } from "../dsOperations";

export function useMySetHook() {
  const [selectedOperation, setSelectedOperation] = useState(
    mySetOperations[0]
  );
  const [set1, setSet1] = useState<(number | string)[]>([]); // primary set
  const [set2, setSet2] = useState<(number | string)[]>([]); // secondary set used for binary operations

  // Checks whether the selected set is empty
  const isEmpty = useCallback(
    (selectedSet: string) => {
      if (selectedSet === SET1) {
        return set1.length === 0;
      } else if (selectedSet === SET2) {
        return set2.length === 0;
      }
    },
    [set1, set2]
  );

  const createSet = useCallback(
    (selectedSet: string, value: number | string) => {
      if (selectedSet === SET1 && isEmpty(selectedSet)) {
        setSet1((prev) => {
          return [...prev, value];
        });
      } else if (selectedSet === SET2 && isEmpty(selectedSet)) {
        setSet2((prev) => {
          return [...prev, value];
        });
      }
    },
    []
  );

  // Checks whether the element exists in the selected set
  const hasElement = useCallback(
    (selectedSet: string, value: number | string) => {
      if (selectedSet === SET1) {
        return set1.indexOf(value) !== -1;
      } else if (selectedSet === SET2) {
        return set2.indexOf(value) !== -1;
      }
      else{
        return null;
      }
    },
    [set1, set2]
  );

  // Adds the element to the selected set if it doesn't exist
  const addElement = useCallback(
    (selectedSet: string, value: number | string) => {
      if (selectedSet === SET1 && !hasElement(selectedSet, value)) {
        setSet1((prev) => {
          return [...prev, value];
        });
      } else if (selectedSet === SET2 && !hasElement(selectedSet, value)) {
        setSet2((prev) => {
          return [...prev, value];
        });
      }
    },
    [hasElement]
  );

  // Removes the element from the selected set
  const removeElement = useCallback(
    (selectedSet: string, value: number | string) => {
      if (selectedSet === SET1) {
        setSet1((prev) => prev.filter((element) => element !== value));
      } else if (selectedSet === SET2) {
        setSet2((prev) => prev.filter((element) => element !== value));
      }
    },
    [set1, set2]
  );

  // Returns the selected set
  const values = useCallback(
    (selectedSet: string) => {
      if (selectedSet === SET1) {
        return set1;
      } else if (selectedSet === SET2) {
        return set2;
      }
      else {
        return []
      }
    },
    [set1, set2]
  );

  // Returns the length of the selected set
  const length = useCallback(
    (selectedSet: string) => {
      if (selectedSet === SET1) {
        return set1.length;
      } else if (selectedSet === SET2) {
        return set2.length;
      }
    },
    [set1, set2]
  );

  /* Binary operations */
  // Returns the union of the two sets
  const union = useCallback(() => {
    const unionSet = new Array<string | number>();

    set1.forEach((val) => {
      unionSet.push(val);
    });

    set2.forEach((val) => {
      unionSet.push(val);
    });

    return unionSet;
  }, [set1, set2]);

  // Returns the intersection of the two sets
  const intersection = useCallback(() => {
    const intersectionSet = new Array<string | number>();
    set1.forEach((val) => {
      if (hasElement(SET2, val)) {
        intersectionSet.push(val);
      }
    });
    return intersectionSet;
  }, [set1, set2]);

  // Returns the difference between the two sets
  const difference = useCallback(() => {
    const differenceSet = new Array<string | number>();
    set1.forEach((val) => {
      if (!hasElement(SET2, val)) {
        differenceSet.push(val);
      }
    });
    return differenceSet;
  }, [set1, set2]);

  // Checks whether one set is a subset of another
  const subset = useCallback(() => {
    const isSet1Subset = set1.every((val) => hasElement(SET2, val));
    const isSet2Subset = set2.every((val) => hasElement(SET1, val));
    if(isSet1Subset){
      return SET1;
    }
    else if (isSet2Subset){
      return SET2;
    }
    else {
      return "Neither sets are subset of each other";
    }
  }, [set1, set2]);

  return {
    isEmpty,
    createSet,
    hasElement,
    addElement,
    removeElement,
    values,
    length,
    union,
    intersection,
    difference,
    subset,
    selectedOperation,
    setSelectedOperation,
  };
}
