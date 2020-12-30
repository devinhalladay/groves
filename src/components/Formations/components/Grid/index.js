import React from 'react';
import Panel from '~/src/components/Panel';
import BlockRepresentation from '~/src/components/Block/components/BlockRepresentation';

const Grid = (props) => {
  const { blocks } = props;
  console.log(blocks);
  return (
    <div className="workspace">
      <div className="grid">
        {blocks &&
          blocks.map((block) => {
            return (
              <div key={block.id} className={`block block--${block.__typename.toLowerCase()}`}>
                {' '}
                <BlockRepresentation block={block} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Grid;
