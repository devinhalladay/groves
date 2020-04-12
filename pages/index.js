import Layout, { Container } from '../components/Layout'

const Home = props => {
  return (
    <Layout {...props}>
      <Container>
        <h1>Welcome to Groves. Please login above.</h1>
      </Container>
    </Layout>
  )
}

export default Home