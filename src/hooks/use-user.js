import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
  useLocation,
  withRouter,
  useHistory
} from "react-router-dom";

import useSWR from 'swr'

import fetch from '../libs/fetch'
import { withCookies, Cookies, useCookies } from 'react-cookie';

function useUser(code) {
  const [cookies, setCookie, removeCookie] = useCookies(['auth_token']);

  // await axios.post(``, { code: code }, { headers: { "Access-Control-Allow-Origin": "*", } } ).then((res) => {
  //   setCookie('arena_token', res.data.auth_token, { path: '/' })
  // })

  return useSWR('/api/auth-user', fetch({body: { code: code }, method: 'post'}))
}

export default useUser