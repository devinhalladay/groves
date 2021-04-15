import React from 'react';
import Panel from '~/src/components/Panel';
import BlockRepresentation from '~/src/components/Block/components/BlockRepresentation';
import { useSelection } from '~/src/context/selection-context';
import ContextMenu from '~/src/components/ContextMenu';
import { Card } from '@blueprintjs/core';
import SelectionPanel from '~/src/components/SelectionPanel';

const Grid = (props) => {
  console.log('blocks');
  const { blocks } = props;

  console.log(blocks);

  const {
    selectedConnection,
    setSelectedConnection,
    canvasBlocks,
    setCanvasBlocks
  } = useSelection();

  const handleBlockClick = (event, block) => {
    if (canvasBlocks.some((b) => b.id === block.id)) {
      // let filteredBlocks = canvasBlocks.filter((b) => b.id !== block.id);
      // let index = canvasBlocks.indexOf(block)
      setCanvasBlocks(canvasBlocks.filter((b) => b.id !== block.id));
    } else {
      setCanvasBlocks(canvasBlocks.concat(block));
    }

    // console.log(canvasBlocks);
  };

  return (
    <>
      <div className="workspace">
        <SelectionPanel />
        <div
          className="grid"
          style={{
            position: 'absolute',
            right: 325
          }}>
          {blocks ? (
            blocks.map((block) => {
              return (
                <ContextMenu
                  key={block.id}
                  handleBlockClick={(e) => {
                    handleBlockClick(e, block);
                  }}>
                  <Card
                    interactive={false}
                    className="block-card"
                    onClick={(e) => setSelectedConnection(block)}>
                    <div className={`block block--${block.__typename.toLowerCase()}`}>
                      {' '}
                      <BlockRepresentation block={block} />
                    </div>
                  </Card>
                </ContextMenu>
              );
            })
          ) : (
            <div>not found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Grid;
