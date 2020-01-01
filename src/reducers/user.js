const initState = {
    user: {}
}

export default (state=initState, action) => {
  switch(action.type) {
    case 'USER_READ':
      return {...state, user=state.user.concat(action.payload)}
    default:
      return state
  }
}