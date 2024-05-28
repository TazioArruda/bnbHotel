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

// src/repositories/booking-repository.ts
var booking_repository_exports = {};
__export(booking_repository_exports, {
  BookingRepository: () => BookingRepository
});
module.exports = __toCommonJS(booking_repository_exports);

// src/entities/booking.ts
var import_mongoose = __toESM(require("mongoose"));
var BookingSchema = new import_mongoose.default.Schema(
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
var BookingModel = import_mongoose.default.model("Booking", BookingSchema);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BookingRepository
});
