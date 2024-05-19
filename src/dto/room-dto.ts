export interface InputRoomDTO {
  number: number;
  type: string;
  guest_capacity: number;
  daily_rate: number;
  photo: string;
  status: string;
}

export interface OutputRoomDTO {
  id: string;
  number: number;
  type: string;
  guest_capacity: number;
  daily_rate: number;
  photo: string;
  status: string;
}
