import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import { setSearchTerm } from '../store/passengersSlice.ts'

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector(state => state.passengers.searchTerm)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value))
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Поиск по имени, полу, возрасту или статусу..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
    </div>
  )
}

export default SearchBar