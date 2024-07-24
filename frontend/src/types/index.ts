export type CarpoolType = {
  id: number;
  departure: Position;
  arrival: Position;
  departure_time: string;
  arrival_time: string;
  max_passengers: number;
  price: number;
  carpool_type: "offer" | "request";
  car: Car;
  participants: Participant[];
};

export type Position = {
  id: number;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  latitude?: number;
  longitude?: number;
};

export type Car = {
  id: number;
  owner?: UserType;
  brand: string;
  model: string;
  year?: string;
  plate_number?: string;
};

export type Participant = {
  id: number;
  user: UserType;
  carpool: CarpoolType;
  participant_type: "driver" | "passenger";
};

export type UserType = {
  id: number;
  username?: string;
  email: string;
  role: "USER" | "ADMIN";
  created_at?: Date;
  updated_at?: Date;
  cars?: Car[];
  carpools?: Participant[];
  previousCarpools?: PreviousCarpool[];
};

export type PreviousCarpool = {
  id: number;
  user: UserType;
  carpool: CarpoolType;
  rating: number;
  comment: string;
};
