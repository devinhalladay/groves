import { useEffect, useRef, useState } from 'react';
import { Graph, Node } from '@antv/x6';
import withApollo from '~/src/hooks/withApollo';

const data = [
  {
    id: '1',
    width: 100,
    height: 100,
    shape: 'rect',
    label: 'data',
    x: 100,
    y: 100,
  },
];

export default withApollo((props) => {
  const container = useRef();
  const [graph, setGraph] = useState(null);

  // React.useEffect(() => {
  //   if (root.current) {
  //     const g = new Graph({
  //       container: root.current,
  //     });
  //     g.scale(1.5);
  //     g.fromJSON(data);
  //     setGraph(g);
  //   }
  // }, [root]);

  useEffect(() => {
    if (container.current) {
      const graph = new Graph({
        container: container.current,
        width: 800,
        height: 300,
        grid: true,
      });

      graph.fromJSON(data);
      setGraph(graph);
    }
  }, [container]);

  return <div id="container" ref={container}></div>;
});
