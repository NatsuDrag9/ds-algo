import { useCallback, useState } from "react";
import { LinkedList } from "../interfaces";
import { llOperations } from "../dsOperations";

export function useLinkedListHook() {
  // Storing nodes for pictorial representation
  const [linkedList, setLinkedList] = useState<LinkedList<number>>({
    head: null,
  });
  const [selectedOperation, setSelectedOperation] = useState(llOperations[0]);

  const createFirstNode = useCallback((inputValue: number) => {
    const newNode = {
      value: inputValue,
      next: null,
    };

    // Set the linkedList head
    setLinkedList({ head: newNode });
  }, []);

  // Adding linkedlist.head as dependency to callback
  // when head changes
  const createNextNode = useCallback(
    (inputValue: number) => {
      const newNode = {
        value: inputValue,
        next: null,
      };

      // Add the new node to the linked list
      if (linkedList.head !== null) {
        let current = linkedList.head;
        while (current.next !== null) {
          current = current.next;
        }
        current.next = newNode;
      }
    },
    [linkedList.head]
  );

  // Adding linkedlist.head as dependency to callback
  // when head changes
  const insertNodeAt = useCallback(
    (position: number, inputValue: number) => {
      if (linkedList.head !== null) {
        // Change the head to new node if position is 0
        if (position === 0) {
          const newNode = {
            value: inputValue,
            next: linkedList.head,
          };

          setLinkedList({ head: newNode });
        } else {
          // Insert at appropriate position
          let pos = 1;
          let current = linkedList.head;
          while (current.next !== null && pos < position - 1) {
            current = current.next;
            pos++;
          }

          const newNode = {
            value: inputValue,
            next: current.next,
          };

          current.next = newNode;
        }
      }
    },
    [linkedList.head]
  );

  // Adding linkedlist.head as dependency to callback
  // when head changes
  const deleteNodeAt = useCallback(
    (position: number) => {
      if (linkedList.head !== null && linkedList.head.next !== null) {
        // Change the head to next node if position is 0
        if (position === 0) {
          setLinkedList({ head: linkedList.head?.next });
        } else {
          // Delete from appropriate position
          let pos = 1;
          let current = linkedList.head;
          while (current.next !== null && pos < position - 1) {
            current = current.next;
            pos++;
          }
          current.next =
            current.next?.next !== null ? current.next?.next : null;
        }
      }
    },
    [linkedList.head]
  );

  // Adding linkedlist.head as dependency to callback
  // when head changes
  const getLength = useCallback(() => {
    let length = 0;
    if (linkedList.head !== null) {
      let current = linkedList.head;
      while (current.next !== null) {
        current = current.next;
        length++;
      }
    }

    // Considering the last node
    length++;
    return length;
  }, [linkedList.head]);

  // Reverse the list
  // Adding linkedlist.head as dependency to callback
  // when head changes
  const reverseList = useCallback(() => {
    if (linkedList.head !== null) {
      let prev = null;
      let current = linkedList.head;
      let nextNode = null;

      while (current !== null) {
        nextNode = current.next;
        current.next = prev;
        prev = current;
        current = nextNode;
      }

      setLinkedList({ head: prev });
    }
  }, [linkedList.head]);

  return {
    linkedList,
    createFirstNode,
    createNextNode,
    insertNodeAt,
    deleteNodeAt,
    selectedOperation,
    setSelectedOperation,
    getLength,
    reverseList,
  };
}
