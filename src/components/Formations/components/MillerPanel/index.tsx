import { useState } from 'react';
import Finder from '~/src/components/Finder';

const MillerPanel = (props) => {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [value, setValue] = useState('');
  const [isEnd, setIsEnd] = useState(true);

  const { blocks } = props;

  function convertData() {
    return blocks.map(function (block) {
      return {
        text: block.title ? block.title : block.description,
        value: block.id,
        child: block.current_user_channels.map(function (item) {
          if (item.title !== block.title) {
            return {
              text: item.title ? item.title : item.description,
              value: item,
            };
          }

          return null;
        }),
      };
    });
  }

  return (
    <div
      style={{
        position: 'absolute',
        right: 325,
        left: 0,
        paddingTop: 90,
      }}
    >
      <div className="finder-demo">
        <Finder
          value={value}
          data={convertData}
          onChange={(value, isEnd, selectedIndexes) => {
            setValue(value);
            setIsEnd(isEnd);
            setSelectedIndexes(selectedIndexes);
          }}
        />
      </div>

      <ul className="value-list">
        <li>selectedIndexes: {selectedIndexes.join(',')}</li>
        <li>
          value:
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </li>
        <li>isEndNode: {`${isEnd}`}</li>
      </ul>
    </div>
  );
};

export default MillerPanel;
