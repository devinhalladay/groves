import { Card, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import classNames from 'classnames';
import { ContextMenu2 } from '@blueprintjs/popover2';
import { useRouter } from 'next/router';
import React from 'react';
import BlockRepresentation from '~/src/components/Block/components/BlockRepresentation';
import Formations from '~/src/constants/Formations';
import { useSelection } from '~/src/context/selection-context';
import { useWorkspace } from '~/src/context/workspace-context';

const Grid = (props) => {
  const { blocks } = props;
  const { workspaceOptions } = useWorkspace();
  const { formation } = workspaceOptions;

  const router = useRouter();

  const {
    setSelectedConnection,
    canvasBlocks,
    setCanvasBlocks,
    selectedConnection
  } = useSelection();

  const removeFromCanvas = () => {
    setCanvasBlocks(canvasBlocks.filter((b) => b.id !== props.block.id));
  };

  let clickTimer;

  const handleBlockClickEvent = (event, block) => {
    clearTimeout(clickTimer);

    if (event.detail === 1) {
      clickTimer = setTimeout(() => console.log(1), 200);
    } else if (event.detail === 2) {
      if (block.__typename == 'Channel') {
        router.push(`/g/[grove]`, `/g/${block.id}`, { shallow: true });
      }
    }
  };

  const handleBlockClick = (block) => {
    if (canvasBlocks.length && canvasBlocks.some((b) => b.id === block.id)) {
      setCanvasBlocks(canvasBlocks.filter((b) => b.id !== block.id));
    } else {
      setCanvasBlocks(canvasBlocks.concat(block));
    }
  };

  return (
    <ContextMenu2
      content={
        selectedConnection && (
          <Menu>
            {router.query.grove &&
              (formation.key === Formations.GRID.key || formation.key == Formations.FOLDERS.key ? (
                <MenuItem
                  icon="send-to-graph"
                  onClick={() => handleBlockClick(selectedConnection)}
                  text="Add to canvas"
                />
              ) : (
                <MenuItem icon="remove" onClick={removeFromCanvas} text="Remove from canvas" />
              ))}
            <MenuDivider style={{ marginBottom: 10 }} />
            <MenuItem
              style={{ backgroundColor: 'rgb(219 55 56 / 18%)' }}
              intent="danger"
              icon="trash"
              onClick={() => handleBlockClick(selectedConnection)}
              text={`Delete ${selectedConnection.__typename}`}
            />
          </Menu>
        )
      }>
      {(ctxMenuProps) => {
        return (
          <div
            style={{
              position: formation.key === Formations.GRID.key && 'absolute',
              right: formation.key === Formations.GRID.key && 325,
              left: 0
            }}
            className={classNames('grid', ctxMenuProps.className)}>
            {ctxMenuProps.popover}
            {blocks.map((block, i) => (
              <Card
                block={block}
                key={block.id}
                interactive={false}
                className="block-card"
                style={{ width: '100%' }}
                onContextMenu={(e) => {
                  setSelectedConnection(block);
                  ctxMenuProps.onContextMenu(e);
                }}
                ref={ctxMenuProps.ref}
                contextMenu={ctxMenuProps.target}
                onClick={(e) => {
                  setSelectedConnection(block);
                  handleBlockClickEvent(e, block);
                }}>
                <div className={`block block--${block.__typename.toLowerCase()}`} block={block}>
                  {' '}
                  <BlockRepresentation block={block} />
                </div>
              </Card>
            ))}
          </div>
        );
      }}
    </ContextMenu2>
  );
};

export default Grid;
