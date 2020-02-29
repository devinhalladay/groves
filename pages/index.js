import Layout, { Container } from '../components/Layout'
import Panel from '../components/Panel'
import BlockRepresentation from '../components/BlockRepresentation'

const Home = props => {
  return (
    <Layout {...props}>
      <Container>
        { props.isReady &&
          <div>
            <Panel pinSide="left" title={"Formations"} {...props}>
              <ul>
                <li>Mind Map</li>
                <li class="active">Rhizome</li>
                <li>Frequency Chart</li>
              </ul>
            </Panel>
            <h1>{props.selectedChannel.title}</h1>
            <small>CONTAINS {props.selectedChannel.length} BLOCKS</small>
            <p>{props.selectedChannel.metadata.description}</p>
            <div className="blockList">
              {props.selectedChannel.contents.map(block =>
                <BlockRepresentation block={block} key={block.id} />)}
            </div>
          </div>
        }
      </Container>
    </Layout>
  )
}

export default Home