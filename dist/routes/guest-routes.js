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

// src/routes/guest-routes.ts
var guest_routes_exports = {};
__export(guest_routes_exports, {
  guestRoutes: () => guestRoutes
});
module.exports = __toCommonJS(guest_routes_exports);
var import_express = require("express");

// src/controller/guest-controller.ts
var yup = __toESM(require("yup"));

// src/entities/guest.ts
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

// src/repositories/guest-repository.ts
var GuestRepository = class {
  getByEmail(email) {
    return __async(this, null, function* () {
      const guest = yield GuestModel.findOne({ email });
      return guest;
    });
  }
  create(params) {
    return __async(this, null, function* () {
      const guest = yield GuestModel.create(params);
      return guest;
    });
  }
  findById(id) {
    return __async(this, null, function* () {
      const guest = yield GuestModel.findById(id);
      return guest;
    });
  }
};

// src/services/guest-service.ts
var import_bcrypt = __toESM(require("bcrypt"));
var GuestService = class {
  constructor(repository2) {
    this.repository = repository2;
  }
  create(params) {
    return __async(this, null, function* () {
      const thisUserExists = yield this.repository.getByEmail(params.email);
      if (thisUserExists) {
        throw new Error("registered user");
      }
      const payload = __spreadProps(__spreadValues({}, params), {
        password: yield import_bcrypt.default.hash(params.password, 8)
      });
      const guest = yield this.repository.create(payload);
      return guest;
    });
  }
};

// src/controller/guest-controller.ts
var repository = new GuestRepository();
var service = new GuestService(repository);
function createGuestController(req, res) {
  return __async(this, null, function* () {
    try {
      const { body } = req;
      const bodyValidator = yup.object({
        email: yup.string().email().required(),
        name: yup.string().required(),
        cpf: yup.string().required().min(11).max(11),
        phone_number: yup.string().required(),
        password: yup.string().min(6).max(6).required()
      });
      yield bodyValidator.validate(body);
      const result = yield service.create(body);
      return res.status(201 /* CREATED */).json(result);
    } catch (err) {
      if (err.message === "registered user") {
        return res.status(409 /* CONFLICT */).json({ message: err.message });
      }
      return res.status(400 /* BAD_REQUEST */).json({ message: err.message });
    }
  });
}

// src/routes/guest-routes.ts
var guestRoutes = (0, import_express.Router)();
guestRoutes.post("/", createGuestController);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  guestRoutes
});
