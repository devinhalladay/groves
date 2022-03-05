import { useTheme } from 'next-themes';
import React, { useEffect, useRef, useState } from 'react';
import Themes from '~/src/constants/Themes';
import withApollo from '~/src/hooks/withApollo';
import { Ervell } from '~/src/types';

import { GridLayout, RandomLayout } from '@antv/layout';
import { Addon, Cell, Graph, Model, Node } from '@antv/x6';
import '@antv/x6-react-shape';
import { Toolbar } from '@antv/x6-react-components';
import { Colors, Icon, Navbar } from '@blueprintjs/core';
import DraggableBlock from '../Block';
import { useSelection } from '~/src/context/selection-context';
import { DraggableEvent } from 'react-draggable';
import { useMutation } from '@apollo/client';
import createBlock from '~/src/components/Block/mutations/createBlock';
import { CHANNEL_SKELETON } from '~/src/graphql/queries';
import { useRouter } from 'next/router';

interface ICanvas {
  blocks: Ervell.Blokk_blokk[];
}

export default withApollo(({ blocks }: ICanvas) => {
  const container = useRef<HTMLDivElement>();
  const minimapContainer = useRef<HTMLDivElement>();
  const dndContainer = useRef<HTMLDivElement>();
  const [graph, setGraph] = useState<Graph>(null);
  const [history, setHistory] = useState();
  const [dnd, setDnd] = useState<Addon.Dnd>(null);

  const { setSelectedConnection } = useSelection();
  const { theme } = useTheme();
  const router = useRouter();

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
            key={block.id}
            block={block}
            bounds="parent"
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

  // const startDrag = (e: DraggableEvent) => {
  //   console.log('start drag', e);
  //   const target = e.currentTarget as HTMLElement;
  //   const type = target.getAttribute('data-type');
  //   const node = type === 'react-shape';
  // };

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
          modifiers: 'shift',
          className: 'x6-selecting selected',
        },
        history: {
          enabled: true,
        },
        mousewheel: {
          enabled: true,
          modifiers: 'meta',
        },
        resizing: {
          enabled: true,
        },
        minimap: {
          enabled: true,
          container: minimapContainer.current,
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
        component: <DraggableBlock width={250} height={250} />,
        grid: true,
        label: 'data',
        x: 100,
        y: 100,
        data: {},
      });

      g.centerContent();

      const dnd = new Addon.Dnd({
        target: g,
        scaled: false,
        containerParent: dndContainer.current,
        animation: true,
      });

      const gridLayout = new GridLayout({
        // type: 'random',
        type: 'grid',
        height: document.documentElement.clientHeight,
        nodeSize: [250, 250],
        // width: document.documentElement.clientWidth,
        preventOverlap: true,
        preventOverlapPadding: 16,
        cols: 5,
      });

      const model = gridLayout.layout(data);
      g.fromJSON(model);

      setHistory(g.history);
      g.centerContent();

      dndContainer.current!.appendChild(dnd.container);

      setDnd(dnd);
      setGraph(g);
    }

    return () => {
      if (graph) {
        graph.dispose();
        graph.minimap.dispose();
      }
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
        console.log('node:added', node.store.data.data);
      });
    }
  }, [graph]);

  useEffect(() => {
    dnd &&
      graph.on(
        'node:selected',
        (args: { cell: Cell; node: Node; options: Model.SetOptions }) => {
          setSelectedConnection(args.node.data);
        },
      );
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

  const startDrag = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget;
    const type = target.getAttribute('data-type');
    const testBlock = await createTextBlock('a test block!');
    console.log(testBlock);

    const node =
      type === 'react-shape'
        ? graph.createNode({
            id: Math.random().toString(),
            width: 250,
            height: 250,
            shape: 'react-shape',
            component: (
              <DraggableBlock block={testBlock} width={250} height={250} />
            ),
            data: testBlock,
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

      <Toolbar
        size="big"
        className="bp4-navbar absolute bottom-4 left-1/2 h-9 flex items-center w-fit-content px-9"
      >
        <div className="dnd-wrap">
          <div
            data-type="react-shape"
            className="dnd-circle"
            onMouseDown={startDrag}
          >
            Text Block
          </div>
        </div>
      </Toolbar>

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
