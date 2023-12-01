import Layout from "../Layout";
import "./style.scss";
import { StackValueInterface } from "../../interfaces";
import { useStackOperations } from "../../hooks/stackHook";
import { useState } from "react";

/* Initial and default size is 5
Initial operation is push
Initial index is -1 */
function Stack() {
  const stackOperations = useStackOperations(5);
  const [peekedElement, setPeekedElement] =
    useState<StackValueInterface | null>(null);
  const [showLength, setShowLength] = useState<boolean>(false);

  const updateStackContext = (newState: StackValueInterface) => {
    if (newState.selectedOperation.toLowerCase() === "push") {
      stackOperations.push(newState);
      setPeekedElement(null); // Clear peeked element
      setShowLength(false); // Hide length
    } else if (newState.selectedOperation.toLowerCase() === "pop") {
      stackOperations.pop();
      setPeekedElement(null); // Clear peeked element
      setShowLength(false); // Hide length
    } else if (newState.selectedOperation.toLowerCase() === "peek") {
      setPeekedElement(stackOperations.peek());
      setShowLength(false); // Hide length
    } else if (newState.selectedOperation.toLowerCase() === "length") {
      setShowLength(true);
      setPeekedElement(null); // Clear peeked element
    }
  };

  return (
    <div className="stack">
      <h2>Visualizing Stack </h2>
      <div className="body">
        <Layout
          operations={["Push", "Pop", "Peek", "Length"]}
          setSize={stackOperations.setStackSize}
          updateStackState={updateStackContext}
        />
        <div className="rect-wrapper">
          {stackOperations.stack
            .slice()
            .reverse()
            .map((arrElement, index) => {
              return peekedElement === null ? (
                <>
                  <p className="rect" key={index}>
                    {arrElement.value}
                  </p>
                </>
              ) : (
                <>
                  {index === 0 ? (
                    <p className="rect peek-animation" key={index}>
                      {peekedElement.value}
                      
                    </p>
                  ) : (
                    <p className="rect" key={index}>
                      {arrElement.value}
                    </p>
                  )}
                </>
              );
            })}
          {showLength && (
            <p className="length">
              Current length of the stack: {stackOperations.length()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stack;
