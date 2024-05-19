export interface BookingInputDTO {
  checkin_date: Date;
  checkout_date: Date;
  guests: number;
  id_room: number;
  id_guest: number;
  status: string;
}

export interface BookingOutputDTO {
  checkin_date: Date;
  checkout_date: Date;
  guests: number;
  id_room: number;
  id_guest: number;
  status: string;
}
