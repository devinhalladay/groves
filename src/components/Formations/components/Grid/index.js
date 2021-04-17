import { Card } from '@blueprintjs/core';
import React from 'react';
import BlockRepresentation from '~/src/components/Block/components/BlockRepresentation';
import BlockContextMenu from '~/src/components/BlockContextMenu';
import SelectionPanel from '~/src/components/SelectionPanel';
import { useSelection } from '~/src/context/selection-context';
import { useWorkspace } from '~/src/context/workspace-context';
import Formations from '~/src/constants/Formations';

const Grid = (props) => {
  const { blocks } = props;
  const { workspaceOptions, setWorkspaceOptions, zoomScale, setZoomScale } = useWorkspace();
  const { formation } = workspaceOptions;

  const {
    setSelectedConnection,
    canvasBlocks,
    setCanvasBlocks
  } = useSelection();

  const handleBlockClick = (event, block) => {
    if (canvasBlocks.some((b) => b.id === block.id)) {
      setCanvasBlocks(canvasBlocks.filter((b) => b.id !== block.id));
    } else {
      setCanvasBlocks(canvasBlocks.concat(block));
    }
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
                <BlockContextMenu
                  key={block.id}
                  block={block}
                  formation={formation}
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
                </BlockContextMenu>
              );
            })
          ) : (
            <div>No blocks in this channel</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Grid;
