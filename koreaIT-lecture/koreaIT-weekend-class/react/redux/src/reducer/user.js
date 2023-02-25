const initialState = [
  {
    id: 1,
    name: '김성용',
  },
];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [action.payload, ...state];
    default:
      console.log('지정된 타입이 없습니다');
      return state;
  }
};

export default reducer;
