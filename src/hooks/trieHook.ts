import { useState } from "react";
import { trieOperations } from "../dsOperations";
import { TrieNodeInterface } from "../interfaces";

const Node = function (): TrieNodeInterface {
  const node: TrieNodeInterface = {
    keys: new Map(),
    end: false,
    setEnd: function () {
      node.end = true;
    },
    isEnd: function () {
      return node.end;
    },
  };

  return node;
};

export function useTrieHook() {
  const [trieRoot, setTrieRoot] = useState<TrieNodeInterface>(Node());
  const [selectedOperation, setSelectedOperation] = useState<string>(
    trieOperations[0]
  );

  // Add a new word to the node
  const add = (input: string, currentNode = trieRoot) => {
    const newNode = { ...currentNode };

    if (!newNode || input.length === 0) {
      newNode.setEnd();
    } else if (!newNode.keys.has(input[0])) {
      const newChildNode = Node();
      newNode.keys.set(input[0], newChildNode);
      add(input.substring(1), newChildNode);
    } else {
      const existingChildNode = newNode.keys.get(input[0]);
      const newChildNode = { ...existingChildNode };
      newNode.keys.set(input[0], newChildNode);
      add(input.substring(1), newChildNode);
    }

    setTrieRoot(newNode);
  };

  // Checks whether the received word is in the trie
  const isWord = (word: string) => {
    let tempNode = trieRoot;
    while (word.length > 1) {
      if (!tempNode.keys.has(word[0])) {
        return false;
      } else {
        tempNode = tempNode.keys.get(word[0]) as TrieNodeInterface;
        word = word.substring(1);
      }
    }
    return tempNode.keys.has(word) && tempNode.keys.get(word)?.isEnd();
  };

  // Prints all words in the map
  const print = () => {
    const words: string[] = [];
    const search = (node: TrieNodeInterface, string: string) => {
        if (node.keys.size != 0) {
            for (const letter of node.keys.keys()) {
                search(node.keys.get(letter), string.concat(letter));
            }
            if (node.isEnd()) {
                words.push(string);
            }
        } else {
            string.length > 0 ? words.push(string) : undefined;
            return;
        }
    };
    search(trieRoot, '');
    return words.length > 0 ? words : null;
};

  return {
    trieRoot,
    setTrieRoot,
    selectedOperation,
    setSelectedOperation,
    add,
    isWord,
    print
  };
}
