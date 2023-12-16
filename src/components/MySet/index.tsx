import { SET1, SET2, mySetOperations } from "../../dsOperations";
import { useMySetHook } from "../../hooks/mySetHook";
import "./style.scss";
import { InputFormElement } from "../../interfaces";
import { useEffect, useState } from "react";

function MySet() {
  const [selectedSet, setSelectedSet] = useState<string>("");
  const [hasElementReturn, setHasElementReturn] = useState<boolean | null>(
    null
  );
  const [isBinaryOperation, setIsBinaryOperation] = useState<boolean>(false);
  const [unionSet, setUnionSet] = useState<(string | number)[]>([]);
  const [intersectionSet, setIntersectionSet] = useState<(string | number)[]>(
    []
  );
  const [differenceSet, setDifferenceSet] = useState<(string | number)[]>([]);
  const mySet = useMySetHook();

  useEffect(() => {
    if (
      mySet.selectedOperation === mySetOperations[5] ||
      mySet.selectedOperation === mySetOperations[6] ||
      mySet.selectedOperation === mySetOperations[7] ||
      mySet.selectedOperation === mySetOperations[8]
    ) {
      setIsBinaryOperation(true);
    } else {
      setIsBinaryOperation(false);
    }
  }, [mySet.selectedOperation]);

  const handleRadioSelect = (set: string) => {
    setSelectedSet(set);
  };

  const renderOperationInputs = () => {
    switch (mySet.selectedOperation) {
      case mySetOperations[1]:
        // Has element
        return (
          <>
            <div className="input-wrapper">
              <label htmlFor="hasElementInput">Enter value</label>
              <input
                type="text"
                name="hasElementInput"
                id="input"
                placeholder="value"
                required
              />
            </div>
            {hasElementReturn === null ? null : hasElementReturn ? (
              <p>{selectedSet} has the element</p>
            ) : (
              <p>{selectedSet} does not have the element</p>
            )}
          </>
        );
      case mySetOperations[2]:
        // Add element
        return (
          <div className="input-wrapper">
            <label htmlFor="addElementInput">Enter value</label>
            <input
              type="text"
              name="addElementInput"
              id="input"
              placeholder="value"
              required
            />
          </div>
        );
      case mySetOperations[3]:
        // Remove element
        return (
          <div className="input-wrapper">
            <label htmlFor="removeElementInput">Enter value</label>
            <input
              type="text"
              name="removeElementInput"
              id="input"
              placeholder="value"
              required
            />
          </div>
        );
      case mySetOperations[4]:
        // Size
        return (
          <p>
            Size of {selectedSet}: {mySet.length(selectedSet)}
          </p>
        );

      case mySetOperations[7]:
        // Difference
        return <p>Difference is computed as Set 1 - Set 2</p>;

      case mySetOperations[8]:
        // isSubset
        return <p>{mySet.subset()}</p>;

      default:
        return null;
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    mySet.setSelectedOperation(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<InputFormElement>) => {
    e.preventDefault();
    if (mySet.isEmpty(selectedSet)) {
      mySet.createSet(
        selectedSet,
        e.currentTarget.elements.firstInput?.value
        // Number(e.currentTarget.elements.firstInput?.value)
      );
    }

    switch (mySet.selectedOperation) {
      case mySetOperations[1]:
        // Has element
        setHasElementReturn(
          mySet.hasElement(
            selectedSet,
            e.currentTarget.elements.hasElementInput?.value
            // Number(e.currentTarget.elements.hasElementInput?.value)
          )
        );
        break;
      case mySetOperations[2]:
        // Add element
        mySet.addElement(
          selectedSet,
          e.currentTarget.elements.addElementInput?.value
          // Number(e.currentTarget.elements.addElementInput?.value)
        );
        break;
      case mySetOperations[3]:
        // Remove element
        mySet.removeElement(
          selectedSet,
          e.currentTarget.elements.removeElementInput?.value
          // Number(e.currentTarget.elements.removeElementInput?.value)
        );
        break;

      case mySetOperations[5]:
        // Union
        setUnionSet(mySet.union());
        break;

      case mySetOperations[6]:
        // Intersection
        setIntersectionSet(mySet.intersection());
        break;

      case mySetOperations[7]:
        // Difference
        setDifferenceSet(mySet.difference());
        break;

      default:
        break;
    }
  };

  const renderOutput = (set: string, arr: (string | number)[]) => {
    if (arr.length === 0) {
      return null;
    } else {
      return (
        // <div className="rect-wrapper">
        //   <p>{set}: [</p>
        //   {arr.map((element, index) => {
        //     return (
        //       <p className="rect" key={index}>
        //         {element}
        //       </p>
        //     );
        //   })}
        //   <p>]</p>
        // </div>
        <div className="rect-wrapper">
          <p className="rect">
            {set}: [ {arr.map((element, index) => `${element}, `)}]
          </p>
        </div>
      );
    }
  };

  const renderBinOpOutput = () => {
    switch (mySet.selectedOperation) {
      case mySetOperations[5]:
        // Union
        return renderOutput("Union set", unionSet);
      case mySetOperations[6]:
        // Intersection
        return intersectionSet.length !== 0 ? (
          renderOutput("Intersection set", intersectionSet)
        ) : (
          <>
            <p className="note">No common element found</p>
          </>
        );
      case mySetOperations[7]:
        // Difference
        return renderOutput("Difference set", differenceSet);
      default:
        return null;
    }
  };

  return (
    <div className="my-set">
      <div className="form-wrapper">
        <h2>Visualizing Set</h2>
        <h4>Takes strings and numbers as inputs</h4>
        <form className="input-form" onSubmit={handleSubmit}>
          <div className="radio-group">
            <label>Select set:</label>
            <label>
              <input
                type="radio"
                name="set"
                value={SET1}
                checked={selectedSet === SET1}
                onChange={() => handleRadioSelect(SET1)}
              />
              Set 1
            </label>
            <label>
              <input
                type="radio"
                name="set"
                value={SET2}
                checked={selectedSet === SET2}
                onChange={() => handleRadioSelect(SET2)}
              />
              Set 2
            </label>
          </div>
          {mySet.isEmpty(selectedSet) ? (
            <>
              <h4>Create {selectedSet}</h4>
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
                  {mySetOperations.map((operation, index) => {
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
        {isBinaryOperation === false ? (
          renderOutput(selectedSet, mySet.values(selectedSet))
        ) : (
          <>
            {renderOutput(SET1, mySet.values(SET1))}
            {renderOutput(SET2, mySet.values(SET2))}
            {renderBinOpOutput()}
          </>
        )}
      </div>
    </div>
  );
}

export default MySet;
