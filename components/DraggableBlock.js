import Draggable from 'react-draggable';
import Collapsible from 'react-collapsible';
import { useState } from 'react';

const DraggableBlock = (props) => {
  const [isDragging, setIsDragging] = useState({status: false, zIndex: 1000})

  return (
    <Draggable
      handle=".draggable-block-container"
      onStart={() => {
        props.setDragStates({ ...props.dragStates, maxZIndex: props.dragStates.maxZIndex + 1})
        setIsDragging({...isDragging, status: true, zIndex: props.dragStates.maxZIndex})
      }}
      onEnd={() => setIsDragging({...isDragging, status: false})}
      {...props}
      >
      <div 
        className={`draggable-block-container ${props.type ? props.type : ''}`}
        style={{
          zIndex: isDragging.zIndex
        }}  
      >
        <div>

          {props.title &&
            <p className="title">{props.title}</p>
          }
          { 
            props.children
          }
        </div>
      </div>
    </Draggable>
  )
}

export default DraggableBlock;