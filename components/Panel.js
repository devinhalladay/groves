const PanelHeader = (props) => (
  // TODO: Factor icon version out into DraggablePanel; turn this one into StaticPanel.
  <div className="panel-header">
    <span>{props.title}</span>
    <div className="icon icon--collapse">
      <svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 1H11" stroke="black"/>
      </svg>
    </div>
  </div>
)

const Panel = (props) => (
  <div className={`panel panel--pin-${props.pinSide ? props.pinSide : 'center'}`}>
    { props.title ? <PanelHeader title={props.title}></PanelHeader> : null }
    {props.children}
  </div>
)

// Page.getInitialProps = async ctx => {
  // const res = await fetch('https://api.github.com/repos/zeit/next.js')
  // const json = await res.json()
  // return { stars: json.stargazers_count }
// }

export default Panel;