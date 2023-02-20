export const ACTION_TYPES = {
  deposit: 'deposit',
  withdraw: 'withdraw',
};

export const reducer = (state, action) => {
  console.log('reducer가 호출되었어요', state, action);

  switch (action.type) {
    case ACTION_TYPES.deposit:
      return state + action.payload;
    case ACTION_TYPES.withdraw:
      return state - action.payload;
    default:
      return state;
  }
};
