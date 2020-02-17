import Header from './Header';

const Layout = props => (
  <div class="workspace">
    <Header />
    {props.children}
  </div>
);

export default Layout;