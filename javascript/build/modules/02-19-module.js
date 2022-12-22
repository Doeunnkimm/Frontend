"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiply = exports["default"] = exports.add = void 0;
var base = 100;
var add = function add(x) {
  return base + x;
};
exports.add = add;
var multiply = function multiply(x) {
  return base * x;
};
exports.multiply = multiply;
var getBase = function getBase() {
  return base;
};
var _default = getBase;
exports["default"] = _default;