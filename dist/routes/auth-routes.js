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

// src/routes/auth-routes.ts
var auth_routes_exports = {};
__export(auth_routes_exports, {
  authRoutes: () => authRoutes
});
module.exports = __toCommonJS(auth_routes_exports);
var import_express = require("express");

// src/controller/auth-controller.ts
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

// src/services/auth-service.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var AuthService = class {
  constructor(guestRepository) {
    this.guestRepository = guestRepository;
  }
  login(params) {
    return __async(this, null, function* () {
      const guest = yield this.guestRepository.getByEmail(params.email);
      if (!guest) {
        throw new Error("e-mail/password invalid");
      }
      const passwordValid = yield import_bcrypt.default.compare(
        params.password,
        guest.password
      );
      if (!passwordValid) {
        throw new Error("e-mail/password invalid!");
      }
      const token = import_jsonwebtoken.default.sign({ id: guest.id }, process.env.SECRET_KEY, {
        expiresIn: "25min"
      });
      return { token };
    });
  }
};

// src/controller/auth-controller.ts
var repository = new GuestRepository();
var service = new AuthService(repository);
function loginController(req, res) {
  return __async(this, null, function* () {
    try {
      const { body } = req;
      const bodyValidator = yup.object({
        email: yup.string().email().required(),
        password: yup.string().min(6).max(8).required()
      });
      yield bodyValidator.validate(body);
      const result = yield service.login(body);
      return res.status(200 /* OK */).json(result);
    } catch (err) {
      return res.status(400 /* BAD_REQUEST */).json({ message: err.message });
    }
  });
}

// src/routes/auth-routes.ts
var authRoutes = (0, import_express.Router)();
authRoutes.post("/", loginController);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authRoutes
});
