import Panel from '~/src/components/Panel';
import { useState } from 'react';
import { initialData } from './initialData';
import Finder from '~/src/components/Finder';
import { useSelection } from '~/src/context/selection-context';
import { prototype } from 'aws-sdk/clients/wellarchitected';

const MillerPanel = (props) => {
  const [data, setData] = useState(initialData);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [value, setValue] = useState('');
  const [isEnd, setIsEnd] = useState(true);

  const { blocks } = props;

  const { selectedChannel, initialSelection, setSelectedConnection } = useSelection();

  console.log(blocks);
  function convertData() {
    return blocks.map(function (block) {
      return {
        text: block.title ? block.title : block.description,
        value: block.id,
        child: block.current_user_channels.map(function (item) {
          if (item.title !== block.title) {
            return {
              text: item.title ? item.title : item.description,
              value: item
            };
          }

          return null;
        })
      };
    });
  }

  console.log(convertData());

  return (
    <div
      style={{
        position: 'absolute',
        right: 325,
        left: 0,
        paddingTop: 90
      }}>
      <div className="finder-demo">
        <Finder
          value={value}
          data={convertData(initialSelection && initialSelection.channel.skeleton)}
          onChange={(value, isEnd, selectedIndexes) => {
            setValue(value);
            setIsEnd(isEnd);
            setSelectedIndexes(selectedIndexes);
            // setSelectedConnection(value);
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
