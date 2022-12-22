"use strict";

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }
var p1 = {
  name: "doeunn",
  age: 22
};
({
  name: "doeunnkimm",
  age: 23
}), _readOnlyError("p1"); // p1이 참조하는 메모리 주소가 바뀌는 것이므로 허용하지 않음

console.log(p1);