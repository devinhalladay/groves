import Layout from '../components/Layout'
import Panel from '../components/Panel'

const Home = () => (
  <Layout>
    <Panel pinSide="left" title={"Formations"}>
      <ul>
        <li>Test</li>
        <li class="active">Test 2</li>
        <li>Test 3</li>
      </ul>
    </Panel>
    <h1>welcome to groves</h1>
  </Layout>
);

export default Home