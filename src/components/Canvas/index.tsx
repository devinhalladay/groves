import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import Themes from '~/src/constants/Themes';
import withApollo from '~/src/hooks/withApollo';
import { Ervell } from '~/src/types';

import { GridLayout, RandomLayout } from '@antv/layout';
import { Graph, Model } from '@antv/x6';
import '@antv/x6-react-shape';
import { Toolbar } from '@antv/x6-react-components';
import { Colors, Icon, Navbar } from '@blueprintjs/core';
import DraggableBlock from '../Block';

interface ICanvas {
  blocks: Ervell.Blokk_blokk[];
}

export default withApollo(({ blocks }: ICanvas) => {
  const container = useRef();
  const minimapContainer = useRef();
  const [graph, setGraph] = useState<Graph>(null);
  const [history, setHistory] = useState();

  const { theme } = useTheme();

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
            title={block.title ? block.title : null}
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

  useEffect(() => {
    if (
      typeof window !== undefined &&
      container.current &&
      minimapContainer.current
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
        selecting: {
          enabled: true,
          rubberband: true,
          modifiers: 'shift',
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
          enabled: false,
          container: minimapContainer.current,
        },
        embedding: {
          enabled: true,
        },
      });

      const gridLayout = new RandomLayout({
        type: 'random',
        height: document.documentElement.clientHeight,
        width: document.documentElement.clientWidth,
      });

      const model = gridLayout.layout(data);

      g.fromJSON(model);

      setHistory(g.history);
      setGraph(g);
    }

    return () => {
      if (graph) {
        graph.dispose();
        graph.minimap.dispose();
      }
    };
  }, []);

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

  return (
    <div className="flex w-screen h-screen z-0">
      <div id="container" className="flex-1" ref={container}></div>
      <div
        className="absolute bottom-12 left-4 flex-1 mb-4"
        ref={minimapContainer}
      />
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
