export default {
  namespace: 'myPa',
  state: {
    timew: 72,
  },
  reducers: {
    add(state, { data }) {
      let time = ++state.time;
      return { ...state, time };
    },
  },
  effects: {
    *adds(_, { call, put }) {
      // const { data } = yield call(consoleService.fetchUserList, payload)
      // yield put({
      //     type: "contactsFilter",
      //     payload: {data},
      // })
    },
  },
  subscriptions: {
    // setup ({ dispatch, history}) {
    //     return history.listen(({ pathname}) => {
    //         if (pathname === "/console/devices") {
    //             dispatch({ type: "fetchFans" })
    //         }
    //     })
    // },
  },
};
