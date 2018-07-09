import { IEvents } from './interface'
import { humanizeTimestamp } from './date-helper'

const REGEX = /remote|cuti|rem|sl|gh|sick leave|-|\[|\]/gi

/**
 * remove whitespace in a string
 *
 * @example
 * customTrim('  lorem ipsum   dolor sit amit  ')
 * // -> "lorem ipsum dolor sit amit"
 *
 * @param str {String} dirty string
 * @return {String} clean string without padding
 */
export function customTrim(str: string): string {
  if (typeof arguments[0] === 'undefined') {
    throw new Error('string is required')
  }

  if (typeof str !== 'string') {
    throw new Error('parameter must be a string')
  }

  return str.replace(/\s+/g, ' ').trim()
}

export const is = (event: IEvents, type: string): boolean => (event.title.toLowerCase()).indexOf(type) >= 0 || (event.title.toLowerCase()).indexOf(type) >= 0
export const isRemote = (event: IEvents): boolean => is(event, 'remote') || is(event, 'rem')
export const isLeave = (event: IEvents): boolean => is(event, 'cuti')
export const isGH = (event: IEvents): boolean => is(event, 'gh')
export const isSickLeave = (event: IEvents): boolean => is(event, 'sick leave') || is(event, 'sl')
export const getWhoIs = (title: string): string => customTrim(title.replace(REGEX, ''))
export const who = (event: IEvents): string => event.who ? event.who : getWhoIs(event.title)

export const generateTextEventObject = (event: IEvents) => {
  const whoIs = who(event)
  if (isRemote(event)) {
    return {
      who: whoIs,
      type: 'Remote'
    }
  } else if (isLeave(event)) {
    return {
      who: whoIs,
      type: 'Cuti'
    }
  } else if (isGH(event)) {
    return {
      who: whoIs,
      type: 'GH'
    }
  } else if (isSickLeave(event)) {
    return {
      who: whoIs,
      type: 'Sick Leave'
    }
  }

  return {
    who: whoIs,
    type: '-'
  }
}

export const convertEventDate = (event: IEvents): string => {
  const startDate = humanizeTimestamp(event.start_dt, '%day%, %dd%-%mmm%-%yyyy%')
  const endDate = humanizeTimestamp(event.end_dt, '%day%, %dd%-%mmm%-%yyyy%')
  return startDate !== endDate ? `${startDate} - ${endDate}` : startDate
}

export const generateListType = (lists, type: string) => lists
  .filter(list => list.type === type)
  .map(list => list.who)

export const humanizeTodayDate = (): string => humanizeTimestamp(new Date(), '%day%, %dd%-%mmm%-%yyyy%')

export const convertListEvents = (events: IEvents[]) => {
  if (events.length === 0) {
    return `
      Tidak ada yang remote atau cuti hari ini
    `
  }

  const listEvents = events.map(event => {
    // const date = humanizeTodayDate()
    return generateTextEventObject(event)
  })

  const listRemote = generateListType(listEvents, 'Remote')
  const listLeave = generateListType(listEvents, 'Cuti')
  const listSickLeave = generateListType(listEvents, 'Sick Leave')
  const listGH = generateListType(listEvents, 'GH')
  const hasRemote = listRemote.length > 0
  const hasLeave = listLeave.length > 0
  const hasSickLeave = listSickLeave.length > 0
  const hasGH = listGH.length > 0

  const textRemote = hasRemote ?
    `REMOTE\n - ${listRemote.join('\n - ')}`
    : ''
  const textLeave = hasLeave ?
    `CUTI\n - ${listLeave.join('\n - ')}`
    : ''
  const textSickLeave = hasSickLeave ?
    `SICK LEAVE\n - ${listSickLeave.join('\n - ')}`
    : ''
  const textGH = hasGH ?
    `GH\n - ${listGH.join('\n - ')}`
    : ''

  return `
# ${humanizeTodayDate()}

${textRemote}

${textLeave}

${textSickLeave}

${textGH}
  `
}
