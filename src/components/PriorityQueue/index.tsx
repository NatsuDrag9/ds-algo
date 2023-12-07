import "./style.scss";
import { InputFormElement } from "../../interfaces";
import { pqueueOperations } from "../../dsOperations";


function PriorityQueue() {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        queue.setSelectedOperation(e.target.value);
      };
    
      const handleSubmit = (e: React.FormEvent<InputFormElement>) => {
        e.preventDefault();
        switch (queue.selectedOperation) {
          case pqueueOperations[1]:
            queue.enqueue(e.currentTarget.elements.input?.value);
            break;
          case pqueueOperations[2]:
            queue.dequeue();
            break;
          default:
            break;
        }
      };

  return (
    <div className="pqueue">
      <div className="form-wrapper">
        <h2>Visualizing Queue</h2>
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
            <p className="rect" key={index}>
              {element}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default PriorityQueue;
