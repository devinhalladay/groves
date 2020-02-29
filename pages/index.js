import Layout, { Container } from '../components/Layout'
import Panel from '../components/Panel'
import BlockRepresentation from '../components/BlockRepresentation'

const Home = props => {
  return (
    <Layout {...props}>
      <Container>
        { props.isReady &&
          <>
            <Panel className="formationNavigator" pinSide="left" panelTitle={"Formations"} defaultPosition={{x: 0, y: 60}} {...props}>
              <ul>
                <li class="active">Folder Tree</li>
                <li>Mind Map</li>
                <li>Rhizome</li>
                <li>Frequency Chart</li>
              </ul>
            </Panel>
            <Panel className="statusbar" pinSide="right" pinBottom={true} {...props}>
              <ul>
                <li>{props.selectedChannel.length} blocks</li>
              </ul>
            </Panel>
            <div className="blockList">
              {props.selectedChannel.contents.map(block =>
                <BlockRepresentation block={block} key={block.id} />)}
            </div>
          </>
        }
      </Container>
    </Layout>
  )
}

export default Home