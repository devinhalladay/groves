// import React, { useEffect, useRef, useState } from 'react';
// import dynamic from 'next/dynamic';
// import { Graph } from '@antv/x6';
// import '@antv/x6-react-shape';

// const Content = () => {
//   const container = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const graph = new Graph({
//       container: container?.current,
//       grid: true,
//     });

//     const source = graph.addNode({
//       x: 40,
//       y: 40,
//       width: 100,
//       height: 40,
//       shape: 'html',
//       html() {
//         return (
//           <div className="w-full h-full flex justify-center items-center">
//             hi
//           </div>
//         );
//       },
//     });

//     const target = graph.addNode({
//       x: 180,
//       y: 160,
//       width: 100,
//       height: 40,
//       shape: 'html',
//       html() {
//         return (
//           <div className="w-full h-full flex justify-center items-center">
//             World
//           </div>
//         );
//       },
//     });

//     graph.addEdge({
//       source,
//       target,
//     });
//     console.log(container);
//   }, []);

//   console.log(container);

//   return <div className="app-content" ref={container} />;
// };

// export default dynamic(() => Promise.resolve(Content), {
//   ssr: false,
// });

export default () => <div>test</div>;
