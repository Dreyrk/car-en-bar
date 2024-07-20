export type CarpoolType = {
  id: number;
  departure: string;
  arrival: string;
  departure_time: string;
  arrival_time: string;
  max_passengers: number;
  participants: Participant[];
  car: Car;
  price: number;
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
