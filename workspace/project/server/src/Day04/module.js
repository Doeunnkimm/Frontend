// const exp = (module.exports = {
//   add: function (a, b) {
//     return a + b;
//   },
//   sub: (a, b) => a - b,
// });

// exp.mul = function (a, b) {
//   return a * b;
// };

// exp.div = (a, b) => a / b;

// exports는 외부로 보내겠다는 의미
module.exports = {
  add: function (a, b) {
    return a + b;
  },
  sub: (a, b) => a - b,
  mul: function (a, b) {
    return a * b;
  },
  div: (a, b) => a / b,
};
