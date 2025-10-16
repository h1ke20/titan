import { Passenger } from '../store/passengersSlice'

const PASSENGERS_URL = 'https://raw.githubusercontent.com/altkraft/for-applicants/master/frontend/titanic/passengers.json'

export const fetchPassengers = async (): Promise<Passenger[]> => {
  try {
    const response = await fetch(PASSENGERS_URL)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    return data.map((item: any, index: number) => ({
      id: item._id?.$oid || `passenger-${index}`,
      name: item.name || 'Unknown',
      gender: item.sex?.toLowerCase() || 'unknown',
      age: item.age || null,
      survived: item.survived || false,
      pclass: item.pclass || 3,
      ticket: item.ticket || 'Unknown',
      cabin: item.cabin || null,
      embarked: item.embarked || null
    }))
  } catch (error) {
    console.error('Error fetching passengers:', error)
    throw new Error('Failed to fetch passengers data')
  }
}