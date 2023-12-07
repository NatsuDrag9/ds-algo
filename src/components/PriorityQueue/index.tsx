import "./style.scss";
import { InputFormElement } from "../../interfaces";
import {
  maxPriority,
  minPriority,
  priorityQueueOperations,
} from "../../dsOperations";
import { usePriorityQueueHook } from "../../hooks/priorityQueueHook";
import { useState } from "react";

function PriorityQueue() {
  const [priorityCheck, setPriorityCheck] = useState<boolean>(false);
  const priorityQueue = usePriorityQueueHook();

  const renderOperationInputs = () => {
    switch (priorityQueue.selectedOperation) {
      case priorityQueueOperations[1]:
        return (
          <>
            <div className="input-wrapper">
              <label htmlFor="priority">Enter priority</label>
              <input
                type="text"
                name="priority"
                id="priority"
                placeholder="priority"
                required
              />
            </div>
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
      case priorityQueueOperations[3]:
        return (
          <p>
            Front element of the queue with value:{" "}
            {priorityQueue.front().value
              ? `${priorityQueue.front().value} 
              and priority: ${priorityQueue.front().priority}`
              : "No element"}
          </p>
        );
      case priorityQueueOperations[4]:
        return <p>Size of the priority queue: {priorityQueue.length()}</p>;
      case priorityQueueOperations[5]:
        return priorityQueue.isEmpty() ? (
          <p>Priority queue is empty</p>
        ) : (
          <p>Priority queue is not empty</p>
        );
      default:
        return null;
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    priorityQueue.setSelectedOperation(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<InputFormElement>) => {
    e.preventDefault();
    const priority = Number(e.currentTarget.elements.priority?.value);
    const value = e.currentTarget.elements.input?.value;
    if (priority < minPriority || priority > maxPriority) {
      setPriorityCheck(true);
    } else {
      setPriorityCheck(false);
      switch (priorityQueue.selectedOperation) {
        case priorityQueueOperations[1]:
          priorityQueue.enqueue(priority, value);
          break;
        case priorityQueueOperations[2]:
          priorityQueue.dequeue();
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="pqueue">
      <div className="form-wrapper">
        <h2>Visualizing Priority Queue</h2>
        <form className="input-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="operations">Select operation</label>
            <select
              name="operations"
              id="operations"
              onChange={handleSelectChange}
            >
              {priorityQueueOperations.map((operation, index) => {
                return (
                  <option value={`${operation}`} key={index}>
                    {operation}
                  </option>
                );
              })}
            </select>
          </div>
          {renderOperationInputs()}
          <button type="submit">Submit</button>
        </form>
        <div className="note">
          <p>Allowed priorities in increasing order: 1, 2, 3, 4, 5</p>
          {priorityCheck && (
            <p>
              Invalid priority. Priority must lie between 1 and 5 (including
              limits).
            </p>
          )}
        </div>
      </div>
      <div className="rect-wrapper">
        {!priorityCheck &&
          priorityQueue.priorityQueue.map((element, index) => {
            return (
              <div className="rect" key={index}>
                <p className="value">Value: {element.value}</p>
                <p className="priority">Priority: {element.priority}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PriorityQueue;
