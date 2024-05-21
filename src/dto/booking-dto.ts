export interface BookingInputDTO {
  checkin_date: Date;
  checkout_date: Date;
  guests: number;
  id_room: string;
  id_guest: string;
  status: string;
}

export interface BookingOutputDTO {
  checkin_date: Date;
  checkout_date: Date;
  guests: number;
  id_room: string;
  id_guest: string;
  status: string;
}
