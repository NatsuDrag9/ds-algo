import { InputFormElement, TreeInterface } from "../../interfaces";
import { MAX_HEAP, MIN_HEAP, heapOperations } from "../../dsOperations";
import "./style.scss";
import { useMaxHeapHook, useMinHeapHook } from "../../hooks/heapHook";
import { useState } from "react";
import { AnimatedTree } from "react-tree-graph";

function Heap() {
  const minHeap = useMinHeapHook();
  const maxHeap = useMaxHeapHook();
  const [selectedHeap, setSelectedHeap] = useState<string>(MIN_HEAP);
  const [removeReturnValue, setRemoveReturnValue] = useState<number>();
  const [minHeapTreeData, setMinHeapTreeData] = useState<TreeInterface>({
    name: "",
    children: [],
  });
  const [maxHeapTreeData, setMaxHeapTreeData] = useState<TreeInterface>({
    name: "",
    children: [],
  });
  // const [sortReturnValue, setSortedReturnValue] = useState<number[]>([]);

  const handleRadioSelect = (heap: string) => {
    setSelectedHeap(heap);
  };

  const transformMaxHeapToTreeData = (heapArray: number[], index = 1) => {
    if (index >= heapArray.length) return null;

    const treeNode: TreeInterface = {
      name: heapArray[index].toString(),
      children: [],
    };

    const leftChildIndex = index * 2;
    const rightChildIndex = index * 2 + 1;

    const leftChildTree = transformMaxHeapToTreeData(heapArray, leftChildIndex);
    if (leftChildTree) {
      treeNode.children.push(leftChildTree);
    }

    const rightChildTree = transformMaxHeapToTreeData(
      heapArray,
      rightChildIndex
    );
    if (rightChildTree) {
      treeNode.children.push(rightChildTree);
    }

    return treeNode;
  };

  const transformMinHeapToTreeData = (heapArray: number[], index = 1) => {
    if (index >= heapArray.length) return null;

    const treeNode: TreeInterface = {
      name: heapArray[index].toString(),
      children: [],
    };

    const leftChildIndex = index * 2;
    const rightChildIndex = index * 2 + 1;

    const leftChildTree = transformMinHeapToTreeData(heapArray, leftChildIndex);
    if (leftChildTree) {
      treeNode.children.push(leftChildTree);
    }

    const rightChildTree = transformMinHeapToTreeData(
      heapArray,
      rightChildIndex
    );
    if (rightChildTree) {
      treeNode.children.push(rightChildTree);
    }

    return treeNode;
  };

  const renderOperationInputs = () => {
    const heap = selectedHeap === MAX_HEAP ? maxHeap : minHeap;

    switch (heap.selectedOperation) {
      case heapOperations[1]:
        // Insert element
        return (
          <>
            <div className="input-wrapper">
              <label htmlFor="input">Enter value</label>
              <input
                type="text"
                name="input"
                id="input"
                placeholder="value"
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedHeap === MIN_HEAP) {
      minHeap.setSelectedOperation(e.target.value);
    } else if (selectedHeap === MAX_HEAP) {
      maxHeap.setSelectedOperation(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent<InputFormElement>) => {
    e.preventDefault();

    const heap = selectedHeap === MAX_HEAP ? maxHeap : minHeap;
    if (heap.isEmpty()) {
      heap.createHeap(Number(e.currentTarget.elements.firstInput?.value));
    }

    switch (heap.selectedOperation) {
      case heapOperations[1]:
        // Insert element
        heap.insert(Number(e.currentTarget.elements.input?.value));
        break;
      case heapOperations[2]:
        // Remove element
        setRemoveReturnValue(heap.remove());
        break;
      // case heapOperations[3]:
      //   // Sort the heap
      //   setSortedReturnValue(heap.sort());
      //   break;
      default:
        break;
    }

    if (selectedHeap === MIN_HEAP) {
      // For Min Heap
      const minHeapTreeData = transformMinHeapToTreeData(minHeap.heapArray);
      if (minHeapTreeData) {
        setMinHeapTreeData(minHeapTreeData);
      }
    } else if (selectedHeap === MAX_HEAP) {
      // For Max Heap
      const maxHeapTreeData = transformMaxHeapToTreeData(maxHeap.heapArray);
      if (maxHeapTreeData) {
        setMaxHeapTreeData(maxHeapTreeData);
      }
    }
  };

  const renderOutput = () => {
    const heap = selectedHeap === MAX_HEAP ? maxHeap : minHeap;
    switch (heap.selectedOperation) {
      case heapOperations[2]:
        // Remove
        return heap === maxHeap ? (
          <p> The largest element is: {removeReturnValue}</p>
        ) : (
          <p> The smallest element is: {removeReturnValue}</p>
        );
      // case heapOperations[3]: // Sort
      //   {
      //     sortReturnValue.map((element, index) => {
      //       return <p key={index}>{element} </p>;
      //     });
      //   }
      //   break;
      default:
        return null;
    }
  };

  return (
    <div className="heap">
      <div className="form-wrapper">
        <h2>Visualizing Set</h2>
        <h4>Takes strings and numbers as inputs</h4>
        <form className="input-form" onSubmit={handleSubmit}>
          <div className="radio-group">
            <label>Select heap:</label>
            <label>
              <input
                type="radio"
                name="set"
                value={MIN_HEAP}
                checked={selectedHeap === MIN_HEAP}
                onChange={() => handleRadioSelect(MIN_HEAP)}
              />
              Min heap
            </label>
            <label>
              <input
                type="radio"
                name="set"
                value={MAX_HEAP}
                checked={selectedHeap === MAX_HEAP}
                onChange={() => handleRadioSelect(MAX_HEAP)}
              />
              Max heap
            </label>
          </div>
          {selectedHeap === MIN_HEAP ? (
            minHeap.isEmpty() ? (
              <>
                <h4>Create {selectedHeap}</h4>
                <div className="input-wrapper">
                  <label htmlFor="firstInput">Enter value</label>
                  <input
                    type="text"
                    name="firstInput"
                    id="input"
                    placeholder="node value"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="input-wrapper">
                  <label htmlFor="operations">Select operation</label>
                  <select
                    name="operations"
                    id="operations"
                    onChange={handleSelectChange}
                  >
                    {heapOperations.map((operation, index) => {
                      return (
                        <option value={`${operation}`} key={index}>
                          {operation}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {renderOperationInputs()}
              </>
            )
          ) : maxHeap.isEmpty() ? (
            <>
              <h4>Create {selectedHeap}</h4>
              <div className="input-wrapper">
                <label htmlFor="firstInput">Enter value</label>
                <input
                  type="text"
                  name="firstInput"
                  id="input"
                  placeholder="node value"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="input-wrapper">
                <label htmlFor="operations">Select operation</label>
                <select
                  name="operations"
                  id="operations"
                  onChange={handleSelectChange}
                >
                  {heapOperations.map((operation, index) => {
                    return (
                      <option value={`${operation}`} key={index}>
                        {operation}
                      </option>
                    );
                  })}
                </select>
              </div>
              {renderOperationInputs()}
            </>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="output">
        <div className="tree-wrapper">
          {/* {selectedHeap === MIN_HEAP
            ? !minHeap.isEmpty() &&
              minHeap.heapArray.map((element, index) => {
                return index > 0 ? (
                  <p className="rect" key={index}>
                    {element}
                  </p>
                ) : null;
              })
            : !maxHeap.isEmpty() &&
              maxHeap.heapArray.map((element, index) => {
                return index > 0 ? (
                  <p className="rect" key={index}>
                    {element}
                  </p>
                ) : null;
              })} */}
          {selectedHeap === MAX_HEAP ? (
            <AnimatedTree
            data={maxHeapTreeData}
            height={400}
            width={400}
            nodeProps={{
              r: 20, // Circle radius = 10
              // fill: "grey", // Circle background color
              // stroke: "#FFF", // Circle border color
              strokeWidth: 1.5, // Border width
            }}
            svgProps={{
              transform: "rotate(90)",
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
          ) : (
            <AnimatedTree
            data={minHeapTreeData}
            height={400}
            width={400}
            nodeProps={{
              r: 20, // Circle radius = 10
              // fill: "grey", // Circle background color
              // stroke: "#FFF", // Circle border color
              strokeWidth: 1.5, // Border width
            }}
            svgProps={{
              transform: "rotate(90)",
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
          )}
        </div>
        {renderOutput()}
      </div>
    </div>
  );
}

export default Heap;
