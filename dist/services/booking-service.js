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

// src/services/booking-service.ts
var booking_service_exports = {};
__export(booking_service_exports, {
  BookingService: () => BookingService
});
module.exports = __toCommonJS(booking_service_exports);
var BookingService = class {
  constructor(bookingRepository, roomRepository) {
    this.bookingRepository = bookingRepository;
    this.roomRepository = roomRepository;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BookingService
});
