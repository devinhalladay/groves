import Draggable from 'react-draggable';
import Collapsible from 'react-collapsible';
import { useState } from 'react';

const DraggableBlock = (props) => {
  const [isDragging, setIsDragging] = useState({status: false, zIndex: 1000})

  return (
    <Draggable
      handle=".draggable-block-container"
      onStart={() => setIsDragging({...isDragging, status: true, zIndex: isDragging.zIndex + 1})}
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