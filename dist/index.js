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

// src/index.ts
var import_config = require("dotenv/config");
var import_express6 = __toESM(require("express"));

// src/database/connection.ts
var import_mongoose = __toESM(require("mongoose"));
var Database = class {
  static initialize() {
    return __async(this, null, function* () {
      import_mongoose.default.connection.on("open", () => {
        console.log("Database is runing");
      });
      yield import_mongoose.default.connect(process.env.DATABASE_URL);
    });
  }
};

// src/routes/index.ts
var import_express5 = require("express");

// src/routes/guest-routes.ts
var import_express = require("express");

// src/controller/guest-controller.ts
var yup = __toESM(require("yup"));

// src/entities/guest.ts
var import_mongoose2 = __toESM(require("mongoose"));
var GuestSchema = new import_mongoose2.default.Schema(
  {
    name: { type: String, min: 2, required: true },
    cpf: { type: String, required: true },
    phone_number: { type: String },
    email: { type: String, unique: true },
    password: { type: String, min: 6, max: 8 },
    bookings: [{ type: import_mongoose2.default.Schema.Types.ObjectId, ref: "Booking" }]
  },
  { timestamps: true }
);
var GuestModel = import_mongoose2.default.model("Guest", GuestSchema);

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
  constructor(repository5) {
    this.repository = repository5;
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

// src/routes/auth-routes.ts
var import_express2 = require("express");

// src/controller/auth-controller.ts
var yup2 = __toESM(require("yup"));

// src/services/auth-service.ts
var import_bcrypt2 = __toESM(require("bcrypt"));
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
      const passwordValid = yield import_bcrypt2.default.compare(
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
var repository2 = new GuestRepository();
var service2 = new AuthService(repository2);
function loginController(req, res) {
  return __async(this, null, function* () {
    try {
      const { body } = req;
      const bodyValidator = yup2.object({
        email: yup2.string().email().required(),
        password: yup2.string().min(6).max(8).required()
      });
      yield bodyValidator.validate(body);
      const result = yield service2.login(body);
      return res.status(200 /* OK */).json(result);
    } catch (err) {
      return res.status(400 /* BAD_REQUEST */).json({ message: err.message });
    }
  });
}

// src/routes/auth-routes.ts
var authRoutes = (0, import_express2.Router)();
authRoutes.post("/", loginController);

// src/controller/admin-auth-controller.ts
var yup3 = __toESM(require("yup"));

// src/services/admin-service.ts
var import_bcrypt3 = __toESM(require("bcrypt"));
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var AdminAuthService = class {
  constructor(adminRepository) {
    this.adminRepository = adminRepository;
    this.adminRepository = adminRepository;
  }
  login(params) {
    return __async(this, null, function* () {
      const admin = yield this.adminRepository.getByEmail(params.email);
      if (!admin) {
        throw new Error("E-mail/password invalid");
      }
      const passwordValid = yield import_bcrypt3.default.compare(
        params.password,
        admin.password
      );
      if (!passwordValid) {
        throw new Error("E-mail/password invalid!");
      }
      const token = import_jsonwebtoken2.default.sign(
        { id: admin._id, isAdmin: true },
        process.env.SECRET_KEY,
        { expiresIn: "25min" }
      );
      return { token };
    });
  }
};

// src/entities/admin.ts
var import_mongoose3 = __toESM(require("mongoose"));
var AdminSchema = new import_mongoose3.default.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, min: 6, max: 8 }
  },
  { timestamps: true }
);
var AdminModel = import_mongoose3.default.model("Admin", AdminSchema);

// src/repositories/admin-repository.ts
var AdminRepository = class {
  getByEmail(email) {
    return __async(this, null, function* () {
      const admin = yield AdminModel.findOne({ email });
      return admin;
    });
  }
};

// src/controller/admin-auth-controller.ts
var repository3 = new AdminRepository();
var service3 = new AdminAuthService(repository3);
function adminLogin(req, res) {
  return __async(this, null, function* () {
    try {
      const { body } = req;
      const bodyValidator = yup3.object({
        email: yup3.string().email().required(),
        password: yup3.string().required()
      });
      yield bodyValidator.validate(body);
      const result = yield service3.login(body);
      return res.status(200 /* OK */).json(result);
    } catch (err) {
      return res.status(400 /* BAD_REQUEST */).json({ message: err.message });
    }
  });
}

// src/routes/room-routes.ts
var import_express3 = require("express");

// src/controller/room-controller.ts
var yup4 = __toESM(require("yup"));

// src/entities/room.ts
var import_mongoose4 = __toESM(require("mongoose"));
var RoomSchema = new import_mongoose4.default.Schema(
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
var RoomModel = import_mongoose4.default.model("Rom", RoomSchema);

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
  constructor(roomRepository2) {
    this.roomRepository = roomRepository2;
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
var repository4 = new RoomRepository();
var service4 = new RoomService(repository4);
function roomController(req, res) {
  return __async(this, null, function* () {
    try {
      const { body, file } = req;
      const bodyValidator = yup4.object({
        number: yup4.number().required().min(0),
        type: yup4.string().required(),
        guest_capacity: yup4.number().required().min(1),
        daily_rate: yup4.number().required().min(0),
        photo: yup4.string().required()
      });
      const data = __spreadProps(__spreadValues({}, body), { photo: file == null ? void 0 : file.filename });
      yield bodyValidator.validate(data);
      const result = yield service4.create(data);
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
      const availableRooms = yield service4.listAvailableRooms();
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
      const bodyValidator = yup4.object({
        status: yup4.string().required()
      });
      const paramsValidator = yup4.object({
        id: yup4.string().required()
      });
      yield bodyValidator.validate(body);
      yield paramsValidator.validate({ id });
      const result = yield service4.update(id, body.status);
      return res.status(201 /* CREATED */).json(result);
    } catch (err) {
      if (err.message === "registered status") {
        return res.status(409 /* CONFLICT */).json({ message: err.message });
      }
      return res.status(400 /* BAD_REQUEST */).json({ message: err.message });
    }
  });
}

// src/middleware/authorization-middleware.ts
var import_jsonwebtoken3 = __toESM(require("jsonwebtoken"));
function authenticateAdmin(req, res, next) {
  var _a;
  const token = (_a = req.header("Authorization")) == null ? void 0 : _a.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }
  try {
    const decodedToken = import_jsonwebtoken3.default.verify(
      token,
      process.env.SECRET_KEY
    );
    if (!decodedToken.isAdmin) {
      return res.status(403).json({ error: "Access denied. You are not an administrator." });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// src/middleware/storage-middleware.ts
var import_multer = __toESM(require("multer"));
var storage = import_multer.default.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    const now = (/* @__PURE__ */ new Date()).getTime();
    const [, extension] = file.mimetype.split("/");
    const filename = `${now}.${extension}`;
    cb(null, filename);
  }
});
var storageMiddleware = (0, import_multer.default)({ storage });

// src/controller/booking-controller.ts
var yup5 = __toESM(require("yup"));

// src/entities/booking.ts
var import_mongoose5 = __toESM(require("mongoose"));
var BookingSchema = new import_mongoose5.default.Schema(
  {
    checkin_date: { type: Date, required: true },
    checkout_date: { type: Date, required: true },
    guests: { type: Number, required: true },
    id_room: { type: String, required: true },
    id_guest: { type: String, required: true },
    status: { type: String, default: "pending", required: true }
  },
  { timestamps: true }
);
var BookingModel = import_mongoose5.default.model("Booking", BookingSchema);

// src/repositories/booking-repository.ts
var BookingRepository = class {
  create(params) {
    return __async(this, null, function* () {
      const booking = yield BookingModel.create(params);
      return booking;
    });
  }
  findOverlappingBookings(id_room, checkin_date, checkout_date) {
    return __async(this, null, function* () {
      return BookingModel.find({
        id_room,
        $or: [
          { checkin_date: { $lt: checkout_date, $gte: checkin_date } },
          { checkout_date: { $gt: checkin_date, $lte: checkout_date } },
          { checkin_date: { $lte: checkin_date }, checkout_date: { $gte: checkout_date } }
        ]
      }).exec();
    });
  }
  delete(id) {
    return __async(this, null, function* () {
      yield BookingModel.findByIdAndDelete(id);
    });
  }
  getById(id) {
    return __async(this, null, function* () {
      return BookingModel.findById(id);
    });
  }
  getAllBookingsForGuest(guestId) {
    return __async(this, null, function* () {
      return BookingModel.find({ id_guest: guestId }).exec();
    });
  }
  getReserve(checkout_date, checkin_date) {
    return __async(this, null, function* () {
      const reservedRoomIds = yield BookingModel.find({
        $or: [
          { checkin_date: { $lt: checkout_date, $gte: checkin_date } },
          { checkout_date: { $gt: checkin_date, $lte: checkout_date } },
          { checkin_date: { $lte: checkin_date }, checkout_date: { $gte: checkout_date } }
        ],
        status: { $in: ["confirmada", "em andamento"] }
      }).distinct("id_room");
      return reservedRoomIds;
    });
  }
};

// src/services/booking-service.ts
var BookingService = class {
  constructor(bookingRepository2, roomRepository2) {
    this.bookingRepository = bookingRepository2;
    this.roomRepository = roomRepository2;
  }
  create(data, guestId) {
    return __async(this, null, function* () {
      const { id_room, guests, checkin_date, checkout_date, id_guest } = data;
      const room = yield this.roomRepository.getById(id_room);
      if (!room) {
        throw new Error("Room not found.");
      }
      if (guestId !== id_guest) {
        throw new Error("you are registering a reservation with a user that is not yours.");
      }
      if (guests > room.guest_capacity) {
        throw new Error("Number of guests exceeds room capacity.");
      }
      const overlappingBookings = yield this.bookingRepository.findOverlappingBookings(
        id_room,
        checkin_date,
        checkout_date
      );
      if (overlappingBookings.length > 0) {
        throw new Error("Room is not available in the selected date range.");
      }
      if (room.status !== "disponivel") {
        throw new Error("Room is not available");
      }
      const booking = yield this.bookingRepository.create({
        checkin_date,
        checkout_date,
        guests,
        id_room,
        id_guest: guestId,
        status: "confirmada"
      });
      return booking;
    });
  }
  // ------------------METODO DE CANCELAR RESERVA ----------------------------------
  cancelBooking(bookingId, guestId) {
    return __async(this, null, function* () {
      const booking = yield this.bookingRepository.getById(bookingId);
      if (!booking) {
        throw new Error("Booking not found.");
      }
      if (booking.id_guest !== guestId) {
        throw new Error("You can only cancel your own bookings.");
      }
      if (booking.status === "em andamento") {
        throw new Error("Cannot cancel booking in progress.");
      }
      yield this.bookingRepository.delete(bookingId);
    });
  }
  //---------------- METODO DE BUSCAR RESERVAS FEITAS PELO HOSPEDE LOGADO --------------------------
  getAllBookingsForGuest(guestId) {
    return __async(this, null, function* () {
      return this.bookingRepository.getAllBookingsForGuest(guestId);
    });
  }
  //---------------- METODO  DE LISTAR TODOS OS QUARTOS DISPONÍVEIS POR DATA -----------------------
  getAvailableRoomsByDate(checkin_date, checkout_date) {
    return __async(this, null, function* () {
      const ids = yield this.bookingRepository.getReserve(checkin_date, checkout_date);
      console.log("ids reservado", ids);
      return this.roomRepository.getAvailableRoomsByDate(ids);
    });
  }
};

// src/controller/booking-controller.ts
var roomRepository = new RoomRepository();
var bookingRepository = new BookingRepository();
var bookingService = new BookingService(bookingRepository, roomRepository);
function bookingController(req, res) {
  return __async(this, null, function* () {
    var _a;
    try {
      const { body } = req;
      const guestId = (_a = req.user) == null ? void 0 : _a.id;
      if (!guestId) {
        return res.status(401 /* UNAUTHORIZED */).json({ message: "Unauthorized" });
      }
      const bodyValidator = yup5.object({
        checkin_date: yup5.date().required(),
        checkout_date: yup5.date().required(),
        guests: yup5.number().required().positive().integer(),
        id_room: yup5.string().required(),
        id_guest: yup5.string().required(),
        status: yup5.string().oneOf(["confirmada", "pendente"]).default("confirmada")
      });
      yield bodyValidator.validate(body);
      const result = yield bookingService.create(__spreadValues({}, body), guestId);
      return res.status(201 /* CREATED */).json(result);
    } catch (err) {
      if (err.message === "registered booking") {
        return res.status(400 /* BAD_REQUEST */).json({});
      }
      return res.status(400 /* BAD_REQUEST */).json({ message: err.message });
    }
  });
}
function cancelBookingController(req, res) {
  return __async(this, null, function* () {
    var _a;
    try {
      const { id } = req.params;
      const guestId = (_a = req.user) == null ? void 0 : _a.id;
      if (!guestId) {
        return res.status(401 /* UNAUTHORIZED */).json({ message: "Unauthorized" });
      }
      yield bookingService.cancelBooking(id, guestId);
      return res.sendStatus(200 /* OK */);
    } catch (err) {
      return res.status(400 /* BAD_REQUEST */).json({ message: err.message });
    }
  });
}
function listBookingsForGuestController(req, res) {
  return __async(this, null, function* () {
    var _a;
    try {
      const guestId = (_a = req.user) == null ? void 0 : _a.id;
      if (!guestId) {
        return res.status(401 /* UNAUTHORIZED */).json({ message: "Unauthorized" });
      }
      const bookings = yield bookingService.getAllBookingsForGuest(guestId);
      return res.status(200 /* OK */).json(bookings);
    } catch (err) {
      return res.status(400 /* BAD_REQUEST */).json({ message: err.message });
    }
  });
}
function getAvailableRoomsController(req, res) {
  return __async(this, null, function* () {
    try {
      const { body } = req;
      const bodyValidator = yup5.object({
        checkin_date: yup5.date().required(),
        checkout_date: yup5.date().required()
      });
      yield bodyValidator.validate(body);
      console.log(body);
      const result = yield bookingService.getAvailableRoomsByDate(body.checkin_date, body.checkout_date);
      return res.status(200 /* OK */).json(result);
    } catch (err) {
      return res.status(400 /* BAD_REQUEST */).json({ message: err.message });
    }
  });
}

// src/routes/room-routes.ts
var roomRoutes = (0, import_express3.Router)();
roomRoutes.post(
  "/",
  authenticateAdmin,
  storageMiddleware.single("photo"),
  roomController
);
roomRoutes.put("/:id", authenticateAdmin, updateStatus);
roomRoutes.get("/available", getAvailableRooms);
roomRoutes.post("/availableRooms", getAvailableRoomsController);

// src/routes/booking-routes.ts
var import_express4 = require("express");

// src/middleware/auth-guest-middleware.ts
var import_jsonwebtoken4 = __toESM(require("jsonwebtoken"));
function authenticateGuest(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401 /* UNAUTHORIZED */).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401 /* UNAUTHORIZED */).json({ message: "no Token" });
  }
  try {
    const decoded = import_jsonwebtoken4.default.verify(token, process.env.SECRET_KEY);
    req.user = { id: decoded.id };
    return next();
  } catch (err) {
    return res.status(401 /* UNAUTHORIZED */).json({ message: "Token expired " });
  }
}

// src/routes/booking-routes.ts
var bookingRoutes = (0, import_express4.Router)();
bookingRoutes.post("/", authenticateGuest, bookingController);
bookingRoutes.delete("/:id", authenticateGuest, cancelBookingController);
bookingRoutes.get("/listBooking", authenticateGuest, listBookingsForGuestController);

// src/routes/index.ts
var routes = (0, import_express5.Router)();
routes.use("/admin", adminLogin);
routes.use("/room", roomRoutes);
routes.use("/guest", guestRoutes);
routes.use("/auth", authRoutes);
routes.use("/booking", bookingRoutes);

// src/index.ts
Database.initialize();
var port = process.env.PORT;
var server = (0, import_express6.default)();
server.use(import_express6.default.json());
server.use(import_express6.default.static("uploads/"));
server.use(routes);
server.listen(port, () => {
  console.log(" server " + port);
});
