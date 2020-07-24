import Panel from "./Panel";
import { useState } from "react";
import { initialData } from "./initialData";
import Finder from "./Finder";

const MillerPanel = (props) => {
  const [data, setData] = useState(initialData);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [value, setValue] = useState("");
  const [isEnd, setIsEnd] = useState(true);

  return (
    <Panel
      pinSide="left"
      panelTitle={"Miller Columns"}
      panelType="wide"
      defaultPosition={{ x: 0, y: 60 }}
      {...props}
    >
      <div className="finder-demo">
        <Finder
          value={value}
          data={data}
          onChange={(value, isEnd, selectedIndexes) => {
            setValue(value);
            setIsEnd(isEnd);
            setSelectedIndexes(selectedIndexes);
          }}
        />
      </div>

      <ul className="value-list">
        <li>selectedIndexes: {selectedIndexes.join(",")}</li>
        <li>
          value:
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </li>
        <li>isEndNode: {`${isEnd}`}</li>
      </ul>
    </Panel>
  );
};

export default MillerPanel;
