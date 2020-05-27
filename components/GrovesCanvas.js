import Konva from 'konva';
import { Stage, Layer, Text } from 'react-konva';
import { useRef } from "react"
import Panel from './Panel';
import { useSelection } from '../context/selection-context';
import MillerPanel from './MillerPanel';

export default (props) => {
  const canvas = useRef(null)
  const { selectedChannel } = useSelection()

  const handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  };

  const handleDragEnd = e => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  };

  

  // const funcy = () => {
  //   [...data.user.contents].map((conn) => {
  //     console.log(conn.connections.connectable.title);
      
  //   })
  // }
  // funcy()

  // return <canvas ref={canvas} width={640} height={425} />

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {
          [...data.user.contents].map((conn) => {
            [...conn.connections].map((connectables) => {
              const title = 'test'
              return (
                <Text text={title} key={Math.random(1)} />
              )
            })
          })
        }
      </Layer>
    </Stage>

    <div>
      <Panel className="formationNavigator" pinSide="left" panelTitle={"Formations"} defaultPosition={{x: 0, y: 60}} {...props}>
        <ul>
          <li class="active">Miller Columns</li>
          <li>Mind Map</li>
          <li>Rhizome</li>
          <li>Frequency Chart</li>
        </ul>
      </Panel>
      <MillerPanel />
      <div>
          <h1>{selectedChannel.title}</h1>
          <small>{selectedChannel.counts.contents}</small>
        </div>
    </div>
  )
}
