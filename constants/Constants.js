export default {
    COMPLETE: 'COMPLETE',
    PROGRESS: 'PROGRESS',
    SUBTASK: 'SUBTASK',
    DAILY: 'DAILY',
    WEEKLY: 'WEEKLY',
    MONTHLY: 'MONTLY',
    YEARLY: 'YEARLY'
}
export const HISTORY_FUTURE_DAYS = 400;
let allDatesJSON = require('../assets/data/dates.json')
let historicalDatesJSON = require('../assets/data/dates_w_historical.json')
export const ALL_DATES_LIST =  allDatesJSON.dates
export const HISTORICAL_DATES = historicalDatesJSON.dates