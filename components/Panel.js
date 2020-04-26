import Draggable from 'react-draggable';
import Collapsible from 'react-collapsible';
import { useState } from 'react';

const PanelHeader = (props) => (
  // TODO: Factor icon version out into DraggablePanel; turn this one into StaticPanel.
  <div className="panel-header">
    <span>{props.panelTitle}</span>
    <div className="icon icon--collapse">
      <svg className="static" width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 1H11" stroke="black"/>
      </svg>
      <svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg" className={`rotator ${props.isOpen ? 'vertical' : ''}`}>
        <path d="M0 1H11" stroke="black"/>
      </svg>
    </div>
  </div>
)

const Panel = (props) => {
  const [isCollapsibleEnabled, setIsCollapsibleEnabled] = useState(true)
  const [isOpen, setIsOpen] = useState(true)

  const handleDrag = () => {
    setTimeout(function () {
      setIsCollapsibleEnabled(false);
    }, 20);
  }

  const handleDragStop = () => {
    setTimeout(function () {
      setIsCollapsibleEnabled(true);
    }, 100);
  }

  const onOpening = () => {
    setIsOpen(true)
  }

  const onClosing = () => {
    setIsOpen(false)
  }

  return (
    <Draggable
      handle=".panel-header"
      defaultPosition={props.defaultPosition ? {x: props.defaultPosition.x, y: props.defaultPosition.y} : {x: 0, y: 0}}
      onDrag={handleDrag}
      onStop={handleDragStop}
      >
      <div className={`panel ${props.panelType ? 'panel--' + props.panelType : null} panel--pin-${props.pinSide ? props.pinSide : 'center'} ${props.pinBottom ? 'panel--pin-bottom' : ''} ${props.className ? props.className : ''}`}>
        { props.panelTitle ? <Collapsible 
          trigger={<PanelHeader
          panelTitle={props.panelTitle}
          isOpen={isOpen}>
          </PanelHeader>}
          onOpening={onOpening}
          onClosing={onClosing}
          open={isOpen}
          transitionTime={300}
          easing={'ease-in-out'}
          triggerDisabled={!isCollapsibleEnabled}>
          {props.children}
          </Collapsible>
          : props.children
        }
      </div>
    </Draggable>
  )
}

// Page.getInitialProps = async ctx => {
  // const res = await fetch('https://api.github.com/repos/zeit/next.js')
  // const json = await res.json()
  // return { stars: json.stargazers_count }
// }

export default Panel;