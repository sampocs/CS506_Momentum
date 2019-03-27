import moment from "moment"
import "moment-timezone"

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