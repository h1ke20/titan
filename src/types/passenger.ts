export interface Passenger {
  id: string;
  name: string;
  gender: 'male' | 'female';
  age: number | null;
  survived: boolean;
  pclass: number;
  ticket: string;
  cabin: string | null;
  embarked: string | null;
}

export interface PassengersState {
  passengers: Passenger[];
  filteredPassengers: Passenger[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  hasMore: boolean;
  visibleCount: number;
}