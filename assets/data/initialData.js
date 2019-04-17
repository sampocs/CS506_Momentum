import moment from "moment"
import "moment-timezone"
import { getEndDate } from "../../helpers/dateOperations";
import { ALL_DATES_LIST } from "../../constants/Constants";

let currentDate = moment(new Date()).format("YYYY-MM-DD")
let initialData = {}

initialData.calendarState = {
    currentSelectedDate: currentDate,
	minimized: false
}

initialData.history = {}

let lastDate = getEndDate(currentDate)
let dateRange = ALL_DATES_LIST.filter((date) => (date >= currentDate && date <= lastDate))
for (i in dateRange) {
    let date = dateRange[i]
    initialData.history[date] = {}
}

initialData.settings = {}
initialData.settings.user = {
    startDate: currentDate,
    lastDate: lastDate
}
initialData.settings.habitOrder = []
initialData.settings.habitSettings = {}

export default initialData;