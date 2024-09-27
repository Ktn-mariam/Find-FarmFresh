import moment from 'moment'

export function getFormattedDateWithoutYear(date: Date): string {
  const formattedDate = moment(date).format('MMM D')
  return formattedDate
}
