import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

const initialState: PassengersState = {
  passengers: [],
  filteredPassengers: [],
  loading: false,
  error: null,
  searchTerm: '',
  hasMore: true,
  visibleCount: 50
}

const passengersSlice = createSlice({
  name: 'passengers',
  initialState,
  reducers: {
    setPassengers: (state, action: PayloadAction<Passenger[]>) => {
      state.passengers = action.payload
      state.filteredPassengers = action.payload.slice(0, state.visibleCount)
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      
      const filtered = state.passengers.filter(passenger =>
        passenger.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        passenger.gender.toLowerCase().includes(action.payload.toLowerCase()) ||
        (passenger.age && passenger.age.toString().includes(action.payload)) ||
        (passenger.survived ? 'выжил' : 'погиб').includes(action.payload.toLowerCase())
      )
      
      state.filteredPassengers = filtered.slice(0, state.visibleCount)
      state.hasMore = filtered.length > state.visibleCount
    },
    loadMorePassengers: (state) => {
      const currentCountss = state.visibleCount
      const filtered = state.passengers.filter(passenger =>
        passenger.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        passenger.gender.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        (passenger.age && passenger.age.toString().includes(state.searchTerm)) ||
        (passenger.survived ? 'выжил' : 'погиб').includes(state.searchTerm.toLowerCase())
      )
      
      state.visibleCount += 50
      state.filteredPassengers = filtered.slice(0, state.visibleCount)
      state.hasMore = filtered.length > state.visibleCount
    }
  }
})

export const {
  setPassengers,
  setLoading,
  setError,
  setSearchTerm,
  loadMorePassengers
} = passengersSlice.actions

export default passengersSlice.reducer