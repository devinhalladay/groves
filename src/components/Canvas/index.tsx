import '@antv/x6-react-shape';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import createBlock from '~/src/components/Block/mutations/createBlock';
import Themes from '~/src/constants/Themes';
import { useSelection } from '~/src/context/selection-context';
import { CHANNEL_SKELETON } from '~/src/graphql/queries';
import withApollo from '~/src/hooks/withApollo';
import { Ervell } from '~/src/types';

import { GridLayout } from '@antv/layout';
import { Addon, Cell, Graph, Model, Node } from '@antv/x6';
import { Toolbar } from '@antv/x6-react-components';
import { HistoryManager } from '@antv/x6/lib/graph/history';
import { useMutation } from '@apollo/client';
import { Button, Colors, Icon, Navbar } from '@blueprintjs/core';

import DraggableBlock from '../Block';
import { useConnectionMutation } from '../SelectionPanel/mutations';

interface ICanvas {
  blocks: Ervell.Blokk_blokk[];
}

export default withApollo(({ blocks }: ICanvas) => {
  const container = useRef<HTMLDivElement>();
  const minimapContainer = useRef<HTMLDivElement>();
  const dndContainer = useRef<HTMLDivElement>();
  const [graph, setGraph] = useState<Graph>(null);
  const [history, setHistory] = useState<HistoryManager>(null);
  const [dnd, setDnd] = useState<Addon.Dnd>(null);

  const { setSelectedConnection, channelID } = useSelection();
  const { removeConnection } = useConnectionMutation();

  const { theme } = useTheme();
  const router = useRouter();

  const handleRemoveConnection = (node, block) => {
    removeConnection({
      variables: {
        connectable_id: block.id,
        connectable_type: 'BLOCK',
        channel_id: channelID,
      },
    }).then(() => {
      node.remove();
    });
  };

  const data = blocks.reduce(
    (acc, block, i) => {
      acc['nodes'][i] = {
        id: block.id,
        width: 250,
        height: 250,
        shape: 'react-shape',
        grid: true,
        component: (
          <DraggableBlock
            type={block.__typename}
            handleRemoveConnection={handleRemoveConnection}
            key={block.id}
            block={block}
            bounds="parent"
            channelId={channelID}
          />
        ),
        label: 'data',
        x: 100,
        y: 100,
        data: block,
      };
      return acc;
    },
    { nodes: [] },
  );

  const [newBlock, { loading: mutationLoading, error: mutationError }] =
    useMutation(createBlock, {
      refetchQueries: [CHANNEL_SKELETON],
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const createTextBlock = (value) => {
    return newBlock({
      variables: {
        id: router.query.grove,
        value: value || 'test text block from new tool palette',
      },
      optimisticResponse: true,
    }).then((res) => {
      return res.data.create_block.blokk;
    });
  };

  useEffect(() => {
    if (
      typeof window !== undefined &&
      container.current &&
      minimapContainer.current &&
      dndContainer.current
    ) {
      const g = new Graph({
        container: container.current,
        autoResize: true,
        scroller: {
          enabled: true,
          pannable: true,
          modifiers: 'meta',
          autoResize: true,
        },
        grid: {
          visible: true,
        },
        selecting: {
          enabled: true,
          rubberband: true,
          className: 'x6-selecting selected',
        },
        history: {
          enabled: true,
        },
        mousewheel: {
          enabled: true,
          modifiers: 'cmd',
        },
        resizing: {
          enabled: true,
        },
        minimap: {
          enabled: true,
          container: minimapContainer.current,
          graphOptions: {
            async: true,
          },
        },
        embedding: {
          enabled: true,
        },
      });

      g.addNode({
        id: Math.random().toString(),
        width: 250,
        height: 250,
        shape: 'react-shape',
        component: (
          <DraggableBlock
            channelId={channelID}
            width={250}
            height={250}
            handleRemoveConnection={handleRemoveConnection}
          />
        ),
        grid: true,
        label: 'data',
        x: 100,
        y: 100,
      });

      g.centerContent();

      const dnd = new Addon.Dnd({
        target: g,
        scaled: false,
        containerParent: dndContainer.current,
        animation: true,
      });

      const gridLayout = new GridLayout({
        type: 'grid',
        height: document.documentElement.clientHeight,
        nodeSize: [250, 250],
        preventOverlap: true,
        preventOverlapPadding: 16,
        cols: 5,
        condense: true,
      });

      const model = gridLayout.layout(data);
      g.fromJSON(model);

      setHistory(g.history);
      g.centerContent();

      dndContainer.current!.appendChild(dnd.container);

      setDnd(dnd);
      setGraph(g);
    }

    return function cleanup() {
      graph?.dispose();
      graph?.minimap.dispose();
    };
  }, []);

  useEffect(() => {
    if (graph) {
      graph.on(
        'node:selected',
        (args: { cell: Cell; node: Node; options: Model.SetOptions }) => {
          setSelectedConnection(args.node.data);
        },
      );
      graph.on('node:added', ({ node }) => {
        setSelectedConnection(node.store.data.data);
      });
    }
  }, [graph]);

  useEffect(() => {
    if (dnd) {
      graph.on(
        'node:selected',
        (args: { cell: Cell; node: Node; options: Model.SetOptions }) => {
          setSelectedConnection(args.node.data);
        },
      );

      graph.on(
        'node:added',
        (args: { cell: Cell; node: Node; options: Model.SetOptions }) => {
          async function fetchBlock() {
            const testBlock = await createTextBlock('a test block!');

            console.log(args.node);

            args.node.replaceData(testBlock);
          }

          fetchBlock();
        },
      );

      // graph.on('cell:dblclick', ({ cell, e }) => {
      //   // node text editor docs: https://x6.antv.vision/en/docs/api/registry/node-tool/#node-editor
      //   const isNode = cell.isNode();
      //   const name = cell.isNode() ? 'node-editor' : 'edge-editor';

      // });
    }
  }, [dnd]);

  const onUndo = () => {
    history.undo();
  };

  const onRedo = () => {
    history.redo();
  };

  const onHandleToolbar = (action: 'in' | 'out' | 'fit' | 'real') => {
    switch (action) {
      case 'in':
        graph.zoom(0.1);
        break;
      case 'out':
        graph.zoom(-0.1);
        break;
      case 'fit':
        graph.zoomToFit();
        break;
      default:
    }
  };

  const startDrag = async (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
  ) => {
    const target = e.currentTarget;
    const type = target.getAttribute('data-type');

    const node =
      type === 'react-shape'
        ? graph.createNode({
            width: 250,
            height: 250,
            shape: 'react-shape',
            component: (
              <DraggableBlock
                handleRemoveConnection={handleRemoveConnection}
                width={250}
                height={250}
              />
            ),
          })
        : null;

    dnd.start(node, e.nativeEvent as any);
  };

  return (
    <div className="flex w-screen h-screen z-0">
      <div id="container" className="flex-1" ref={container}></div>
      <div
        className="absolute bottom-12 left-4 flex-1 mb-4"
        ref={minimapContainer}
      />
      <div
        className="absolute top-96 bottom-12 left-12 w-64"
        ref={dndContainer}
      ></div>

      <Navbar className="w-1/4 p-2 bottom-[15px] flex items-center absolute left-1/2 -translate-x-1/2 rounded-[10px] bg-[#f6f7f9] border border-[#6ab8ff]">
        <Navbar.Group>
          <Button
            minimal={true}
            large={true}
            data-type="react-shape"
            icon="new-text-box"
            onMouseDown={startDrag}
          ></Button>
        </Navbar.Group>
      </Navbar>

      <Toolbar
        size="big"
        className="bp4-navbar absolute bottom-4 left-4 h-6 flex items-center w-fit-content"
      >
        <Toolbar.Group>
          <Toolbar.Item
            name="zoomIn"
            tooltip="Zoom In (Cmd +)"
            icon={
              <Icon
                icon="zoom-in"
                color={theme === Themes.DARK ? Colors.WHITE : Colors.GRAY1}
              />
            }
            onClick={() => onHandleToolbar('in')}
          />
          <Toolbar.Item
            name="zoomOut"
            tooltip="Zoom Out (Cmd -)"
            icon={
              <Icon
                icon="zoom-out"
                color={theme === Themes.DARK ? Colors.WHITE : Colors.GRAY1}
              />
            }
            onClick={() => onHandleToolbar('out')}
          />
          <Toolbar.Item
            name="zoomToFit"
            tooltip="Zoom to Fit (Cmd -)"
            icon={
              <Icon
                icon="zoom-to-fit"
                color={theme === Themes.DARK ? Colors.WHITE : Colors.GRAY1}
              />
            }
            onClick={() => onHandleToolbar('fit')}
          />
        </Toolbar.Group>
        <Navbar.Divider />
        <Toolbar.Group>
          <Toolbar.Item
            name="undo"
            tooltip="Undo (Cmd + Z)"
            onClick={onUndo}
            icon={
              <Icon
                icon="undo"
                color={theme === Themes.DARK ? Colors.WHITE : Colors.GRAY1}
              />
            }
          />
          <Toolbar.Item
            name="redo"
            tooltip="Redo (Cmd + Shift + Z)"
            onClick={onRedo}
            icon={
              <Icon
                icon="redo"
                color={theme === Themes.DARK ? Colors.WHITE : Colors.GRAY1}
              />
            }
          />
        </Toolbar.Group>
        <Navbar.Divider />
        <Toolbar.Group>
          <Toolbar.Item
            name="delete"
            icon={
              <Icon
                icon="graph-remove"
                color={theme === Themes.DARK ? Colors.WHITE : Colors.GRAY1}
              />
            }
            disabled={true}
            tooltip="Delete (Delete)"
          />
        </Toolbar.Group>
      </Toolbar>
    </div>
  );
});
