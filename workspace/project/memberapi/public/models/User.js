// const UserStorage = require("./UserStorage");

// class User {
//     constructor(body) {
//         this.body = body;
//     }

//     async login() {
//         const client = this.body;
//         const { id, password } = await UserStorage.getUsersInfo(client.id);

//         if (id) {
//             if (id === client.id && password === client.password) {
//                 return { success: true };
//             }
//             return { success: false, message: "비밀번호가 틀렸습니다!" };
//         }
//         return { success: false, message: "등록되지 않은 아이디예요!" };
//     }

//     async signup() {
//         const client = this.body;
//         try {
//             const response = await UserStorage.save(client);
//             return response;
//         } catch (error) {
//             return { success: false, message: error };
//         }
//     }
// }

// module.exports = User;