import "./style.scss";
import { llOperations } from "../../dsOperations";
import { useLinkedListHook } from "../../hooks/linkedListHook";
import { InputFormElement } from "../../interfaces";
import { useCallback, useState, useEffect } from "react";

function LinkedList() {
  const linkedList = useLinkedListHook();
  const [visualArray, setVisualArray] = useState<JSX.Element[]>([]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    linkedList.setSelectedOperation(e.target.value);
  };

  const renderOperationInputs = () => {
    switch (linkedList.selectedOperation) {
      case llOperations[1]:
        return (
          <div className="input-wrapper">
            <label htmlFor="input">Enter value</label>
            <input
              type="text"
              name="input"
              id="input"
              placeholder="node value"
              required
            />
          </div>
        );
      case llOperations[2]:
        return (
          <>
            <div className="input-wrapper">
              <label htmlFor="position">Enter position</label>
              <input
                type="text"
                name="position"
                id="position"
                placeholder="node position"
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="input">Enter value</label>
              <input
                type="text"
                name="input"
                id="input"
                placeholder="node value"
                required
              />
            </div>
          </>
        );
      case llOperations[3]:
        return (
          <div className="input-wrapper">
            <label htmlFor="position">Enter position</label>
            <input
              type="text"
              name="position"
              id="position"
              placeholder="node position"
              required
            />
          </div>
        );
      case llOperations[4]:
        return (
          <p>Length of the linked list: {linkedList.getLength()}</p>
        );
      // case llOperations[5]:
      //   return <p>Linked list reversed</p>;
      default:
        return null;
    }
  };

  // Adding linkedlist.head as dependency to callback
  // when head changes
  const renderList = useCallback(() => {
    const elements = [];
    if (linkedList.linkedList.head !== null) {
      let current = linkedList.linkedList.head;
      while (current?.next !== null) {
        const element = (
          <div
            className={`rect ${
              current === linkedList.linkedList.head ? "head" : ""
            }`}
            key={current?.value * Math.random()}
          >
            <p className="value">Current value: {current?.value}</p>
            <p className="next">
              Next value: {current.next !== null ? current.next.value : "Null"}
            </p>
          </div>
        );
        current = current.next;
        elements.push(element);
      }
      // Considering the last node
      const lastElement = (
        <div className="rect last" key={current?.value * Math.random()}>
          <p className="value">Current value: {current?.value}</p>
          <p className="next">
            Next value: {current.next !== null ? current.next.value : "Null"}
          </p>
        </div>
      );
      elements.push(lastElement);
      setVisualArray(elements);
    }
  }, [linkedList.linkedList.head]);

  const handleSubmit = (e: React.FormEvent<InputFormElement>) => {
    e.preventDefault();
    if (linkedList.linkedList.head === null) {
      const value = Number(e.currentTarget.elements.firstInput?.value);
      linkedList.createFirstNode(value);
    }

    const position = Number(e.currentTarget.elements.position?.value);
    const inputValue = Number(e.currentTarget.elements.input?.value);

    switch (linkedList.selectedOperation) {
      case llOperations[1]:
        linkedList.createNextNode(inputValue);
        break;
      case llOperations[2]:
        linkedList.insertNodeAt(position, inputValue);
        break;
      case llOperations[3]:
        linkedList.deleteNodeAt(position);
        break;
      case llOperations[5]:
        linkedList.reverseList();
        break;
      default:
        break;
    }
    renderList();
  };

  useEffect(() => {
    // Initial rendering of the list
    renderList();
  }, [renderList]);

  return (
    <div className="linked-list">
      <div className="form-wrapper">
        <h2>Visualizing Linked List</h2>
        <form className="input-form" onSubmit={handleSubmit}>
          {linkedList.linkedList.head === null ? (
            <>
              <h4>Create first node</h4>
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
                  {llOperations.map((operation, index) => {
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

        <p className="head"><b><i>**</i></b> indicates head</p>
      </div>

      {/* Visualization */}
      <div className="rect-wrapper">{visualArray}</div>
    </div>
  );
}

export default LinkedList;
