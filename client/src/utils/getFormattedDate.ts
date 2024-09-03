import moment from 'moment'

export function getFormattedDateAndTime(mongoDateString: Date): string {
  const mongoDate: Date = new Date(mongoDateString)

  const formattedTime = moment(mongoDate).format('LTS')
  const formattedDate = moment(mongoDate).format('L')
  return `${formattedTime} ${formattedDate}`
}

export function getFormattedDate(mongoDate: Date): string {
  const formattedDate = moment(mongoDate).format('ll')
  return formattedDate
}

export function getFormattedDateWithoutYear(date: Date): string {
  const formattedDate = moment(date).format('MMM D')
  return formattedDate
}
