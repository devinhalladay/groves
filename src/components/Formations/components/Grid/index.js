import { Card } from '@blueprintjs/core';
import React from 'react';
import BlockRepresentation from '~/src/components/Block/components/BlockRepresentation';
import BlockContextMenu, { handleBlockClick } from '~/src/components/BlockContextMenu';
import SelectionPanel from '~/src/components/SelectionPanel';
import { useSelection } from '~/src/context/selection-context';
import { useWorkspace } from '~/src/context/workspace-context';
import Formations from '~/src/constants/Formations';

const Grid = (props) => {
  const { blocks } = props;
  const { workspaceOptions, setWorkspaceOptions, zoomScale, setZoomScale } = useWorkspace();
  const { formation } = workspaceOptions;

  const { setSelectedConnection, canvasBlocks, setCanvasBlocks } = useSelection();

  return (
    <>
      <div
        className="grid"
        style={{
          position: formation.key === Formations.GRID.key && 'absolute',
          right: formation.key === Formations.GRID.key && 325,
          left: 0
        }}>
        {blocks ? (
          blocks.map((block) => {
            return (
              <BlockContextMenu
                key={block.id}
                block={block}
                formation={formation}
                handleBlockClick={(e) => {
                  handleBlockClick(e, canvasBlocks, block);
                }}>
                <Card
                  interactive={false}
                  className="block-card"
                  style={{ width: '100%' }}
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
    </>
  );
};

export default Grid;
