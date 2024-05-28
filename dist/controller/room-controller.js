"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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

// src/controller/room-controller.ts
var room_controller_exports = {};
__export(room_controller_exports, {
  getAvailableRooms: () => getAvailableRooms,
  roomController: () => roomController,
  updateStatus: () => updateStatus
});
module.exports = __toCommonJS(room_controller_exports);
var yup = __toESM(require("yup"));

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

// src/services/room-service.ts
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
  update(id, updateStatus2) {
    return __async(this, null, function* () {
      if (!["disponivel", "ocupado", "manutencao"].includes(updateStatus2)) {
        throw new Error("Invalid status.");
      }
      const room = yield this.roomRepository.updateById(id, updateStatus2);
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

// src/controller/room-controller.ts
var repository = new RoomRepository();
var service = new RoomService(repository);
function roomController(req, res) {
  return __async(this, null, function* () {
    try {
      const { body, file } = req;
      const bodyValidator = yup.object({
        number: yup.number().required().min(0),
        type: yup.string().required(),
        guest_capacity: yup.number().required().min(1),
        daily_rate: yup.number().required().min(0),
        photo: yup.string().required()
      });
      const data = __spreadProps(__spreadValues({}, body), { photo: file == null ? void 0 : file.filename });
      yield bodyValidator.validate(data);
      const result = yield service.create(data);
      return res.status(201 /* CREATED */).json(result);
    } catch (err) {
      if (err.message === "registered room") {
        return res.status(409 /* CONFLICT */).json({ message: err.message });
      }
      return res.status(400 /* BAD_REQUEST */).json({ message: err.message });
    }
  });
}
function getAvailableRooms(req, res) {
  return __async(this, null, function* () {
    try {
      const availableRooms = yield service.listAvailableRooms();
      res.status(200 /* OK */).json(availableRooms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}
function updateStatus(req, res) {
  return __async(this, null, function* () {
    try {
      console.log(req.params);
      console.log(req.body);
      const { id } = req.params;
      const body = req.body;
      const bodyValidator = yup.object({
        status: yup.string().required()
      });
      const paramsValidator = yup.object({
        id: yup.string().required()
      });
      yield bodyValidator.validate(body);
      yield paramsValidator.validate({ id });
      const result = yield service.update(id, body.status);
      return res.status(201 /* CREATED */).json(result);
    } catch (err) {
      if (err.message === "registered status") {
        return res.status(409 /* CONFLICT */).json({ message: err.message });
      }
      return res.status(400 /* BAD_REQUEST */).json({ message: err.message });
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAvailableRooms,
  roomController,
  updateStatus
});
