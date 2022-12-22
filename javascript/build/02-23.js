"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var obj1 = {
  name: "박문수",
  age: 29
};
var obj2 = obj1; // shallow copy! obj1, obj2는 동일한 객체를 참조
var obj3 = _objectSpread({}, obj1); // 객체 내부의 값은 복사하지만, obj3과 obj1은 다른 객체
var obj4 = _objectSpread(_objectSpread({}, obj1), {}, {
  email: "mspark@test.com"
}); // 새로운 속성 추가

obj2.age = 19;
console.log(obj1); // { name: "박문수", age: 19 }
console.log(obj2); // { name: "박문수", age: 19 }
console.log(obj3); // { name: "박문수", age: 29 } <- age가 바뀌지 않음
console.log(obj1 == obj2); // true
console.log(obj1 == obj3); // false

var arr1 = [100, 200, 300];
var arr2 = ["hello"].concat(arr1, ["world"]);
console.log(arr1); // [100, 200, 300]
console.log(arr2); // ["hello", 100, 200, 300, "world"]