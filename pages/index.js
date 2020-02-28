import Layout, { Container } from '../components/Layout'
import Panel from '../components/Panel'

const Home = props => (
  <Layout {...props}>
    <Container>
      { props.selectedChannel.id &&
        <>
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
        </>
      }
      {null}
    </Container>
  </Layout>
);

export default Home