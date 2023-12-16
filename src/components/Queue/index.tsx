import { queueOperations } from "../../dsOperations";
import { useQueueHook } from "../../hooks/queueHook";
import { InputFormElement } from "../../interfaces";
import "./style.scss";

function Queue() {
  const queue = useQueueHook();

  const renderOperationInputs = () => {
    switch (queue.selectedOperation) {
      case queueOperations[1]:
        return (
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
        );
      case queueOperations[3]:
        return <p>Front element of the queue: {queue.front() ? queue.front() : "No element"}</p>;
      case queueOperations[4]:
        return <p>Size of the queue: {queue.length()}</p>;
      case queueOperations[5]:
        return queue.isEmpty() ? (
          <p>Queue is empty</p>
        ) : (
          <p>Queue is not empty</p>
        );
      default:
        return null;
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    queue.setSelectedOperation(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<InputFormElement>) => {
    e.preventDefault();
    switch (queue.selectedOperation) {
      case queueOperations[1]:
        queue.enqueue(e.currentTarget.elements.input?.value);
        break;
      case queueOperations[2]:
        queue.dequeue();
        break;
      default:
        break;
    }
  };
  return (
    <div className="queue">
      <div className="form-wrapper">
        <h2>Visualizing Queue</h2>
        <h4>Takes numbers as input</h4>
        <form className="input-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="operations">Select operation</label>
            <select
              name="operations"
              id="operations"
              onChange={handleSelectChange}
            >
              {queueOperations.map((operation, index) => {
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
      </div>
      <div className="rect-wrapper">
        {queue.queue.map((element, index) => {
          return (
            <p className="rect" key={index}>{element}</p>
          );
        })}
      </div>
    </div>
  );
}

export default Queue;
