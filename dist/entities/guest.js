"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/entities/guest.ts
var guest_exports = {};
__export(guest_exports, {
  GuestModel: () => GuestModel
});
module.exports = __toCommonJS(guest_exports);
var import_mongoose = __toESM(require("mongoose"));
var GuestSchema = new import_mongoose.default.Schema(
  {
    name: { type: String, min: 2, required: true },
    cpf: { type: String, required: true },
    phone_number: { type: String },
    email: { type: String, unique: true },
    password: { type: String, min: 6, max: 8 },
    bookings: [{ type: import_mongoose.default.Schema.Types.ObjectId, ref: "Booking" }]
  },
  { timestamps: true }
);
var GuestModel = import_mongoose.default.model("Guest", GuestSchema);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GuestModel
});
