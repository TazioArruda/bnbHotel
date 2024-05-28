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

// src/repositories/room-repository.ts
var room_repository_exports = {};
__export(room_repository_exports, {
  RoomRepository: () => RoomRepository
});
module.exports = __toCommonJS(room_repository_exports);

// src/entities/room.ts
var import_mongoose = __toESM(require("mongoose"));
var RoomSchema = new import_mongoose.default.Schema(
  {
    number: { type: Number, default: 0, required: true },
    type: { type: String, required: true },
    guest_capacity: { type: Number, required: true },
    daily_rate: { type: Number, required: true },
    photo: { type: String, required: true },
    status: { type: String, required: true }
  },
  { timestamps: true }
);
var RoomModel = import_mongoose.default.model("Rom", RoomSchema);

// src/repositories/room-repository.ts
var RoomRepository = class {
  create(params) {
    return __async(this, null, function* () {
      const room = yield RoomModel.create(params);
      return room;
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      return RoomModel.findById(id);
    });
  }
  updateById(id, status) {
    return __async(this, null, function* () {
      console.log(`repositori ${id}`);
      return RoomModel.findOneAndUpdate(
        { _id: id },
        { status },
        { new: true }
      ).exec();
    });
  }
  findAllAvailable() {
    return __async(this, null, function* () {
      return RoomModel.find({ status: "disponivel" }).exec();
    });
  }
  // ------------------crianção do metodo, para Listar Todos os Quartos disponíveis por data ---------------------------
  getAvailableRoomsByDate(reservedRoomIds) {
    return __async(this, null, function* () {
      return RoomModel.find({
        status: "disponivel",
        _id: { $nin: reservedRoomIds }
      }).exec();
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RoomRepository
});
