import "./style.scss";
import { useState } from "react";
import { StackValueInterface, InputFormElement } from "../../interfaces";

interface PropsInterface {
  operations: string[];
  setSize: (newSize: number) => void;
  updateState: (newValue: StackValueInterface) => void;
}

function Layout({
  operations,
  setSize,
  updateState,
}: PropsInterface) {
  const [disableSizeInput, setDisableSizeInput] = useState(false);
  const [disableValueInput, setDisableValueInput] = useState(false);

  const handleSubmit = (e: React.FormEvent<InputFormElement>) => {
    e.preventDefault();
    const newSize = Number(e.currentTarget.elements.size.value);
    setSize(newSize);
    updateState({
      selectedOperation: e.currentTarget.elements.operations.value,
      value: Number(e.currentTarget.elements.input.value),
    });
    if (!isNaN(newSize)) {
      setDisableSizeInput(true);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if(e.target.value.toLowerCase() != "push"){
      setDisableValueInput(true);
    }
    else {
      setDisableValueInput(false);
    }
  }

  return (
    <div className="layout">
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="size">Enter size</label>
          <input
            type="text"
            name="size"
            id="size"
            placeholder="Default size is 5"
            required
            disabled={disableSizeInput}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="input">Enter a value</label>
          <input
            type="text"
            name="input"
            id="input"
            placeholder="stack value"
            required
            disabled={disableValueInput}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="operations">Select operation</label>
          <select
            name="operations"
            id="operations"
            onChange={handleSelectChange}
          >
            {operations.map((operation, index) => {
              return (
                <option value={`${operation}`} key={index}>
                  {operation}
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Layout;
