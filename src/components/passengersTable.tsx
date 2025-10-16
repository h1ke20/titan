import React, { useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import { loadMorePassengers } from '../store/passengersSlice.ts'

const PassengersTable: React.FC = () => {
  const dispatch = useAppDispatch()
  const { filteredPassengers, loading, hasMore } = useAppSelector(state => state.passengers)
  const observer = useRef<IntersectionObserver | null>(null)

  const lastPassengerElementRef = useCallback((node: HTMLTableRowElement | null) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(loadMorePassengers()) 
      }
    })
    
    if (node) observer.current.observe(node)
  }, [loading, hasMore, dispatch])

  if (filteredPassengers.length === 0) {
    return (
      <div className="no-data">
        <p>Пассажиры не найдены</p>
      </div>
    )
  }

  return (
    <div className="table-container">
      <table className="passengers-table">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Пол</th>
            <th>Возраст</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {filteredPassengers.map((passenger, index) => {
            const isLastElement = index === filteredPassengers.length - 1
            return (
              <tr
                key={passenger.id}
                ref={isLastElement ? lastPassengerElementRef : null}
                className={passenger.survived ? 'survived' : 'not-survived'}
              >
                <td>{passenger.name}</td>
                <td>{passenger.gender === 'male' ? 'Мужской' : 'Женский'}</td>
                <td>{passenger.age ? `${passenger.age} лет` : 'Неизвестно'}</td>
                <td>
                  <span className={`status ${passenger.survived ? 'survived' : 'not-survived'}`}>
                    {passenger.survived ? 'Выжил' : 'Погиб'}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      
      {loading && (
        <div className="loading-indicator">
          Загрузка...
        </div>
      )}
      
      {!hasMore && filteredPassengers.length > 0 && (
        <div className="end-message">
          Все пассажиры загружены
        </div>
      )}
    </div>
  )
}

export default PassengersTable