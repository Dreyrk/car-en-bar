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

export type CarpoolInputType = {
  departure: Omit<Position, "id">;
  arrival: Omit<Position, "id">;
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
  postal_code: string | number;
  country: string;
  latitude?: number;
  longitude?: number;
};

export type Address = {
  address: string;
  city: string;
  postalcode: string | number;
  country: string;
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

export type SortCarpool = {
  departure: boolean;
  travelTime: boolean;
  price: boolean;
};

export type SectionItem = {
  text: string;
  icon: boolean;
  link?: string;
};

export type ComboField = { label: string; value: string };
