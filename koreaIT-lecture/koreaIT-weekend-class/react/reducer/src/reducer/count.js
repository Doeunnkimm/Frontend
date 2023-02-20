export const countReducer = (state, action) => {
  // action에는 dispatch로 전달받은 객체가 들어옴
  switch (action.type) {
    case 'INCREMENT':
      return state + action.count;
    case 'DECREMENT':
      return state - action.count;
    default:
      return state;
  }
};
