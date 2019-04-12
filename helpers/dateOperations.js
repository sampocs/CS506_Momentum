import moment from "moment"
import "moment-timezone"
import { HISTORY_FUTURE_DAYS } from '../constants/Constants'

export const getCurrentDate = () => {
    return moment(new Date()).format("YYYY-MM-DD")
}
export const getNextDate = (date) => {
    return moment(date).add(1, 'days').format("YYYY-MM-DD")
}
export const getPreviousDay = (date) => {
    return moment(date).subtract(1, 'days').format("YYYY-MM-DD")
}
export const formatDate = (date, format) => {
    return moment(date).format(format)
}
export const getDayOfWeek = (date) => {
    return moment(date).day()
}
export const getWeekAgo = (date) => {
    return moment(date).subtract(7, 'days').format('YYYY-MM-DD')
}
export const getMonthAgo = (date) => {
    return moment(date).subtract(31, 'days').format('YYYY-MM-DD')
}
export const getYearAgo = (date) => {
    return moment(date).subtract(365, 'days').format('YYYY-MM-DD')
}

export const getEndDate = (date) => {
    return moment(date).add(HISTORY_FUTURE_DAYS, 'days').format("YYYY-MM-DD")
}