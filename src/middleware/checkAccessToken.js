export default (nextState, replace) => {
    const authenticated = localStorage.getItem('accessToken');
    if (authenticated && nextState) {
      replace({
        pathname: '/dashboard',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }