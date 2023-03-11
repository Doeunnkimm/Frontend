import * as TodoApi from './todo/todo.api'; // export되어있는 모든 걸 다 가져온다

export const handler = [...Object.values(TodoApi)]; // 키값 신경 안 쓰고 값만 가지고 온 것

// 이제 handler를 browser에 등록해주면 됨
