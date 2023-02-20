export function createAction(type) {
  return function (payload) {
    return {type, payload};
  };
}

/*
    type이 주어지면 리턴하는 객체의 값으로,
    payload는 createAction으로 만들어진 함수의 또 다른 매개변수인데
    리턴하는 객체의 또다른 값이 됨

    ** createAction 자체가 리턴하는 값은 함수임!!!
*/
