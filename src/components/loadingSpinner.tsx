import React from 'react'

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Загрузка данных о пассажирах...</p>
    </div>
  )
}

export default LoadingSpinner