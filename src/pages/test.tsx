import React, { useEffect, useRef, useState } from 'react';
import { Graph } from '@antv/x6';
import '@antv/x6-react-shape';
// import './app.css';

export default () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const graph = new Graph({
      container: container?.current,
      grid: true,
    });

    const source = graph.addNode({
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      shape: 'html',
      html() {
        const wrap = document.createElement('div');
        wrap.style.width = '100%';
        wrap.style.height = '100%';
        wrap.style.background = '#f0f0f0';
        wrap.style.display = 'flex';
        wrap.style.justifyContent = 'center';
        wrap.style.alignItems = 'center';

        wrap.innerText = 'Hello';

        return wrap;
      },
    });

    const wrap = document.createElement('div');
    wrap.style.width = '100%';
    wrap.style.height = '100%';
    wrap.style.background = '#f0f0f0';
    wrap.style.display = 'flex';
    wrap.style.justifyContent = 'center';
    wrap.style.alignItems = 'center';
    wrap.innerText = 'World';

    const target = graph.addNode({
      x: 180,
      y: 160,
      width: 100,
      height: 40,
      shape: 'html',
      html: wrap,
    });

    graph.addEdge({
      source,
      target,
    });
  }, [container]);

  return (
    <div className="app">
      <div className="app-content" ref={container} />
    </div>
  );
};
