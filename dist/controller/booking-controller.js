"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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

// src/controller/booking-controller.ts
var booking_controller_exports = {};
__export(booking_controller_exports, {
  bookingController: () => bookingController,
  cancelBookingController: () => cancelBookingController,
  getAvailableRoomsController: () => getAvailableRoomsController,
  listBookingsForGuestController: () => listBookingsForGuestController
});
module.exports = __toCommonJS(booking_controller_exports);
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

// src/entities/booking.ts
var import_mongoose2 = __toESM(require("mongoose"));
var BookingSchema = new import_mongoose2.default.Schema(
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
var BookingModel = import_mongoose2.default.model("Booking", BookingSchema);

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
      const bodyValidator = yup.object({
        checkin_date: yup.date().required(),
        checkout_date: yup.date().required(),
        guests: yup.number().required().positive().integer(),
        id_room: yup.string().required(),
        id_guest: yup.string().required(),
        status: yup.string().oneOf(["confirmada", "pendente"]).default("confirmada")
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
      const bodyValidator = yup.object({
        checkin_date: yup.date().required(),
        checkout_date: yup.date().required()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bookingController,
  cancelBookingController,
  getAvailableRoomsController,
  listBookingsForGuestController
});
