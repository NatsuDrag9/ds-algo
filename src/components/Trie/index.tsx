import "./style.scss";
import { trieOperations } from "../../dsOperations";
import { useTrieHook } from "../../hooks/trieHook";
import { InputFormElement, TrieNodeInterface } from "../../interfaces";
import { useRef, useState } from "react";
import { TreeInterface } from "../../interfaces";
import { AnimatedTree } from "react-tree-graph";

function Trie() {
  const trie = useTrieHook();
  const [isWordReturnValue, setIsWordReturnValue] = useState<
    boolean | undefined
  >();
  const isWordElementInputRef = useRef<HTMLInputElement | null>(null);
  const addElementInputRef = useRef<HTMLInputElement | null>(null);
  const [trieTreeData, setTrieTreeData] = useState<TreeInterface>({
    name: "",
    children: [],
  });

  const transformTrieToTreeData = (node: TrieNodeInterface, word = "") => {
    // Base case: If the node is null, return null
    if (!node) return null;

    // Create the root node for the current level
    const treeNode: TreeInterface = {
      name: word === "" ? "root" : word,
      children: [],
    };

    // Traverse all keys in the current node
    node.keys.forEach((childNode: TrieNodeInterface, char: string) => {
      // Recursively build the tree structure
      const childTree = transformTrieToTreeData(childNode, word + char);
      if (childTree) {
        treeNode.children.push(childTree);
      }
    });

    // Return the constructed tree node
    return treeNode;
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    trie.setSelectedOperation(e.target.value);

    // Reset the input value when the operation changes
    if (isWordElementInputRef.current) {
      isWordElementInputRef.current.value = "";
    }

    // Reset the input value when the operation changes
    if (addElementInputRef.current) {
      addElementInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent<InputFormElement>) => {
    e.preventDefault();

    switch (trie.selectedOperation) {
      case trieOperations[1]:
        // Add
        trie.add(e.currentTarget.elements.input?.value);
        break;
      case trieOperations[2]:
        // isWord
        setIsWordReturnValue(
          trie.isWord(e.currentTarget.elements.isWordElementInput?.value)
        );
        break;
      default:
        break;
    }

    // Update the trie tree data for visualization
    const treeData = transformTrieToTreeData(trie.trieRoot);
    if (treeData) {
      setTrieTreeData(treeData);
    }
  };

  const renderOperationInputs = () => {
    switch (trie.selectedOperation) {
      case trieOperations[1]:
        // Add
        return (
          <div className="input-wrapper">
            <label htmlFor="input">Enter value</label>
            <input
              type="text"
              name="input"
              id="input"
              placeholder="value"
              required
              ref={addElementInputRef}
            />
          </div>
        );
      case trieOperations[2]:
        // isWord
        return (
          <div className="input-wrapper">
            <label htmlFor="isWordElementInput">Enter value</label>
            <input
              type="text"
              name="isWordElementInput"
              id="input"
              placeholder="value"
              required
              ref={isWordElementInputRef}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderOutput = () => {
    switch (trie.selectedOperation) {
      case trieOperations[2]: {
        // isWord
        return isWordReturnValue !== undefined ? (
          isWordReturnValue ? (
            <p>The entered word is in the trie</p>
          ) : (
            <p>The entered word is not in the trie</p>
          )
        ) : null;
      }
      default:
        return null;
    }
  };

  return (
    <div className="trie">
      <div className="form-wrapper">
        <h2>Visualizing Trie</h2>
        <h4>Takes numbers as input</h4>
        <form className="input-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="operations">Select operation</label>
            <select
              name="operations"
              id="operations"
              onChange={handleSelectChange}
            >
              {trieOperations.map((operation, index) => {
                return (
                  <option value={`${operation}`} key={trieOperations[index]}>
                    {operation}
                  </option>
                );
              })}
            </select>
          </div>
          {renderOperationInputs()}
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="output">
        <div className="trie-wrapper">
          <AnimatedTree
            data={trieTreeData}
            height={400}
            width={400}
            nodeProps={{
              r: 20,        // Circle radius = 10
              fill: "#ccc", // Circle background color
              stroke: "#FFF", // Circle border color
              strokeWidth: 1.5, // Border width
            }}
            svgProps={{
              transform: "rotate(90)", //rotates the tree to make it verticle
              viewBox: "-20 -10 400 400",
            }}
            textProps={{
              textAnchor: "middle",
              dominantBaseline: "central",
              x: "-20",
              y: "-5",
              style: {
                fontSize: "12px",
                fontFamily: '"Courier New", monospace',
                fontWeight: "500",
                fill: "#FFF",
              },
            }}
          />
        </div>
        {renderOutput()}
      </div>
    </div>
  );
}

export default Trie;
