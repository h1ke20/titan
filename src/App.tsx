import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/redux.ts'
import { setPassengers, setLoading, setError } from './store/passengersSlice.ts'
import { fetchPassengers } from './services/passengerService.ts'
import SearchBar from './components/searchBar.tsx'
import PassengersTable from './components/passengersTable.tsx'
import LoadingSpinner from './components/loadingSpinner.tsx'
import './App.css'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector(state => state.passengers)

  useEffect(() => {
    const loadPassengers = async () => {
      dispatch(setLoading(true))
      try {
        const passengers = await fetchPassengers()
        dispatch(setPassengers(passengers))
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Unknown error'))
      } finally {
        dispatch(setLoading(false))
      }
    }

    loadPassengers()
  }, [dispatch])

  if (loading && !error) {
    return <LoadingSpinner />
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Пассажиры Титаника</h1>
        <p>Список пассажиров с информацией о выживании</p>
      </header>
      
      <main className="app-main">
        {error ? (
          <div className="error-message">
            <h2>Ошибка загрузки данных</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>
              Попробовать снова
            </button>
          </div>
        ) : (
          <>
            <SearchBar />
            <PassengersTable />
          </>
        )}
      </main>
    </div>
  )
}

export default App