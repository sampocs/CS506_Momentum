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
export const ALL_DATES_LIST =  allDatesJSON.dates