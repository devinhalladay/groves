import Draggable from 'react-draggable';
import Collapsible from 'react-collapsible';
import { useState, useEffect } from 'react';

const DraggableBlock = (props) => {
  const [zIndex, setZIndex] = useState(1000)

  let analytics = window.analytics

  let handleDragMetric = () => {
    analytics.track('Dragged Block');
  }

  return (
    <Draggable
      handle=".draggable-block-container"
      onStart={() => {
        props.setDragStates({ ...props.dragStates, maxZIndex: props.dragStates.maxZIndex + 1})
        setZIndex(props.dragStates.maxZIndex)
        handleDragMetric()
      }}
      {...props}
      >
      <div 
        className={`draggable-block-container ${props.type ? props.type : ''}`}
        style={{
          zIndex: zIndex
        }}  
      >
        <div className="block">
        {
          props.type ==='text' ?
            <div className="text">
              {props.title &&
                <p className="title">{props.title}</p>
              }
              { 
                props.children
              }
            </div>
          :
          props.children
        }
        </div>
      </div>
    </Draggable>
  )
}

export default DraggableBlock;