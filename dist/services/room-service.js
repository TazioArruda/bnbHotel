"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/services/room-service.ts
var room_service_exports = {};
__export(room_service_exports, {
  RoomService: () => RoomService
});
module.exports = __toCommonJS(room_service_exports);
var RoomService = class {
  constructor(roomRepository) {
    this.roomRepository = roomRepository;
  }
  create(params) {
    return __async(this, null, function* () {
      const newRoom = __spreadProps(__spreadValues({}, params), {
        status: "disponivel"
      });
      const createdRoom = yield this.roomRepository.create(newRoom);
      return createdRoom;
    });
  }
  update(id, updateStatus) {
    return __async(this, null, function* () {
      if (!["disponivel", "ocupado", "manutencao"].includes(updateStatus)) {
        throw new Error("Invalid status.");
      }
      const room = yield this.roomRepository.updateById(id, updateStatus);
      if (!room) {
        throw new Error("Room not found.");
      }
      return room;
    });
  }
  // Encontrar os disponiveis
  listAvailableRooms() {
    return __async(this, null, function* () {
      const availableRooms = yield this.roomRepository.findAllAvailable();
      return availableRooms;
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RoomService
});
