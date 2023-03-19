import { Axios } from './core';

// apis 폴더에는 axios와 관련된 기능만 가지고 있음
// 관심사 분리를 한 것

const PATH = '/user';

const AuthApi = {
  async login(email, password) {
    // 필요한 데이터만 넘기고 싶어서
    // res를 받아서 여기서 res.data만 넘기고 있는데
    // 지금 res에는 값이 비어 있으니까 여기에서도 async-await를 작성해줘야 함
    const res = await Axios.post(PATH + '/login', { email, password });
    return res.data;
    // 여기랑 login 함수 사용하는 곳 둘다 async-await를 쓰지 않으면 undefined나 이상하게 찍힘
  },

  signup(email, password) {
    // 여기서는 값을 받아서 리턴하는 방식이 아니라
    // signup함수가 실행되면 그때 axios를 실행해서 값(res 전부다)을 리턴하는 것이기 때문에
    // async-await가 필요없음
    return Axios.post(PATH + '/sign', { email, password });
  },

  async logout() {
    // session까지 지워주는 api
    const res = await Axios.post(PATH + '/logout');
    return res.data;
  },
};

/*
    이 페이지를 제작하기 위한 api 정리

    1.  axios.get("/todo") // return 값 ---> todoList
        axios.post("/todo", {content, title}) // return 값 ---> {todo} (내가 추가해서 저장된 todo (확인차))
        axios.put("/todo/$id", {content, state}) // return 값 ---> {update todo} (이것도 확인차)
        axios.delete("/todo/$id") // return 값 ---> id 

    2.  사용자가 todo 페이지에 접속했따
        페이지에서 어떤 것이 렌더링 되어야 하나? --- todoList --- axios.get
        todoList는 state로 관리되어야 할까? ---> state로 관리 ---> useState

        axios를 해야할 순간 --> 페이지가 처음 열렸을 때 ---> useEffect
*/

export default AuthApi;
