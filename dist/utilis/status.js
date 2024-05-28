"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utilis/status.ts
var status_exports = {};
__export(status_exports, {
  CodeStatus: () => CodeStatus
});
module.exports = __toCommonJS(status_exports);
var CodeStatus = /* @__PURE__ */ ((CodeStatus2) => {
  CodeStatus2[CodeStatus2["OK"] = 200] = "OK";
  CodeStatus2[CodeStatus2["CREATED"] = 201] = "CREATED";
  CodeStatus2[CodeStatus2["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  CodeStatus2[CodeStatus2["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  CodeStatus2[CodeStatus2["CONFLICT"] = 409] = "CONFLICT";
  return CodeStatus2;
})(CodeStatus || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CodeStatus
});
