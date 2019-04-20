import {
    getWeekAgo,
    getMonthAgo,
    getYearAgo,
    getCurrentDate,
    getPreviousDay,
    getDayOfWeek,
    formatDate
} from './dateOperations'
import Constants, { HISTORICAL_DATES } from '../constants/Constants';

const dayOfWeekMapping = {
    "0": "Sun",
    "1": "M",
    "2": "Tu",
    "3": "W",
    "4": "Th",
    "5": "F",
    "6": "Sat"
}

const monthMapping = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
}

const getAverage = (daysCompleted, totalDays) => {
    if (totalDays === 0 || daysCompleted === 0) {
        return '0%';
    }
    let avg = (daysCompleted / totalDays) * 100
    return `${Math.round(avg)}%`
}

const getDataValue = (dataOnDate, type) => {
    if (type === Constants.COMPLETE) {
        return dataOnDate.completed ? 1 : 0
    }
    else if (type === Constants.PROGRESS) {
        return dataOnDate.habitInfo.progress
    }
    else {
        let subtasksCompleted = dataOnDate.habitInfo.subtasks.filter((subtask) => subtask[1]).length
        return (subtasksCompleted / dataOnDate.habitInfo.subtasks.length)
    }
}

const getMonth = (date) => {
    return date.slice(5, 7)
}

const roundYAxis = (maxValue) => {
    if (maxValue === 1) {
        return 1
    }
    if (maxValue <= 10) {
        return maxValue
    }
    if (maxValue <= 20) {
        if (maxValue % 2 === 0) {
            return maxValue
        }
        return maxValue + (2 - (maxValue % 2))
    }
    if (maxValue <= 50) {
        if (maxValue % 5 === 0) {
            return maxValue
        }
        return maxValue + (5 - (maxValue % 5))
    }
    if (maxValue <= 200) {
        if (maxValue % 10 === 0) {
            return maxValue
        }
        return maxValue + (10 - (maxValue % 10))
    }
    if (maxValue <= 400) {
        if (maxValue % 20 === 0) {
            return maxValue
        }
        return maxValue + (20 - (maxValue % 20))
    }
    if (maxValue % 50 === 0) {
        return maxValue
    }
    return maxValue + (50 - (maxValue % 50))
}

export const getPreviewMetrics = (history, habitName) => {

    let currentDate = getCurrentDate()

    let startDate;
    if (history[currentDate].hasOwnProperty(habitName) && history[currentDate][habitName].completed) {
        startDate = currentDate;
    }
    else {
        startDate = getPreviousDay(currentDate)
    }

    let weekAgo = getWeekAgo(startDate)
    let monthAgo = getMonthAgo(startDate)
    let yearAgo = getYearAgo(startDate)

    let weeklyTotalDays = 0
    let monthlyTotalDays = 0
    let yearlyTotalDays = 0

    let weeklyCompletedDays = 0
    let monthlyCompletedDays = 0
    let yearlyCompletedDays = 0

    let allDates = Object.keys(history).filter((date) => ((date > yearAgo) && (date <= startDate)))
    for (d in allDates) {
        let date = allDates[d]
        if (history.hasOwnProperty(date) && history[date].hasOwnProperty(habitName)) {
            let dataOnDate = history[date][habitName]

            if (date > weekAgo) {
                weeklyTotalDays++
                weeklyCompletedDays += (dataOnDate.completed ? 1 : 0)
            }
            if (date > monthAgo) {
                monthlyTotalDays++
                monthlyCompletedDays += (dataOnDate.completed ? 1 : 0)
            }
            yearlyTotalDays++
            yearlyCompletedDays += (dataOnDate.completed ? 1 : 0)
        }
    }

    let weeklyPercentage = getAverage(weeklyCompletedDays, weeklyTotalDays)
    let monthlyPercentage = getAverage(monthlyCompletedDays, monthlyTotalDays)
    let yearlyPercentage = getAverage(yearlyCompletedDays, yearlyTotalDays)

    return {
        weekly: {
            totalDays: weeklyTotalDays,
            daysCompleted: weeklyCompletedDays,
            percentage: weeklyPercentage
        },
        monthly: {
            totalDays: monthlyTotalDays,
            daysCompleted: monthlyCompletedDays,
            percentage: monthlyPercentage
        },
        yearly: {
            totalDays: yearlyTotalDays,
            daysCompleted: yearlyCompletedDays,
            percentage: yearlyPercentage
        }
    }
}

export const getCurrentStreak = (history, habitName) => {
    let currentDate = getCurrentDate()

    let streak = 0
    if (history[currentDate].hasOwnProperty(habitName) && history[currentDate][habitName].completed) {
        streak++
    }

    let allDates = Object.keys(history).filter((date) => (date < currentDate)).sort().reverse()
    for (i in allDates) {
        let date = allDates[i]
        if (!history[date].hasOwnProperty(habitName)) {
            continue;
        }

        let dataOnDate = history[date][habitName]
        if (!dataOnDate.completed) {
            return streak
        }
        streak++
    }
    return streak
}

export const getBarChart = (history, type, habitName) => {
    let currentDate = getCurrentDate()

    let startDate;
    if (history[currentDate].hasOwnProperty(habitName) && history[currentDate][habitName].completed) {
        startDate = currentDate;
    }
    else {
        startDate = getPreviousDay(currentDate)
    }

    let weekAgo = getWeekAgo(startDate)
    let monthAgo = getMonthAgo(startDate)
    let yearAgo = getYearAgo(startDate)

    let weekData = []
    let monthData = []
    let yearData = []

    let xLabelsWeek = []
    let xLabelsMonth = []
    let xLabelsYear = []

    let yMaxWeek = 1
    let yMaxMonth = 1
    let yMaxYear = 1

    let monthlyAverage = []
    let currMonth = null;

    let allDates = HISTORICAL_DATES.filter((date) => ((date > yearAgo) && (date <= startDate))).sort().reverse()

    for (d in allDates) {
        let date = allDates[d]

        let dataPoint = 0
        if (date > weekAgo) {
            xLabelsWeek = [dayOfWeekMapping[getDayOfWeek(date)], ...xLabelsWeek]
            if (history.hasOwnProperty(date) && history[date].hasOwnProperty(habitName)) {
                dataPoint = getDataValue(history[date][habitName], type)
            }
            weekData = [dataPoint, ...weekData]
            if (dataPoint > yMaxWeek) {
                yMaxWeek = dataPoint
            }
        }
        if (date > monthAgo) {
            xLabelsMonth = [formatDate(date, "M/D"), ...xLabelsMonth]
            if (history.hasOwnProperty(date) && history[date].hasOwnProperty(habitName)) {
                dataPoint = getDataValue(history[date][habitName], type)
            }
            monthData = [dataPoint, ...monthData]
            if (dataPoint > yMaxMonth) {
                yMaxMonth = dataPoint
            }
        }
        if (date > yearAgo) {
            let month = getMonth(date)
            if (!history.hasOwnProperty(date)) {
                if (month != currMonth) {
                    currMonth = month
                    monthlyAverage = [[], ...monthlyAverage]
                    xLabelsYear = [monthMapping[month], ...xLabelsYear]
                }
            }
            if (history.hasOwnProperty(date) && history[date].hasOwnProperty(habitName)) {
                dataPoint = getDataValue(history[date][habitName], type)
                if (month === currMonth) {
                    monthlyAverage[0] = [...monthlyAverage[0], dataPoint]
                }
                else {
                    currMonth = month
                    monthlyAverage = [[dataPoint], ...monthlyAverage]
                    xLabelsYear = [monthMapping[month], ...xLabelsYear]
                }
                if (dataPoint > yMaxYear) {
                    yMaxYear = dataPoint
                }
            }
        }
    }

    yearData = monthlyAverage.map((monthPoints) => {
        if (monthPoints.length === 0) {
            return 0
        }
        return (monthPoints.reduce((sum_, i) => sum_ + i, 0) / monthPoints.length)
    })

    return {
        weekly: {
            data: weekData,
            xLabels: xLabelsWeek,
            yMax: roundYAxis(yMaxWeek)
        },
        monthly: {
            data: monthData,
            xLabels: xLabelsMonth,
            yMax: roundYAxis(yMaxMonth)
        },
        yearly: {
            data: yearData,
            xLabels: xLabelsYear,
            yMax: roundYAxis(yMaxYear)
        }
    }
}

export const getHistory = (history, habitName) => {
    let dateLists = {
        weekly: [],
        monthly: [],
        yearly: []
    }
    let currentDate = getCurrentDate()

    let weekAgo = getWeekAgo(currentDate)
    let monthAgo = getMonthAgo(currentDate)
    let yearAgo = getYearAgo(currentDate)

    let allDates = Object.keys(history).filter((date) => ((date > yearAgo) && (date <= currentDate)))
    for (d in allDates) {
        let date = allDates[d]
        if (history.hasOwnProperty(date) && history[date].hasOwnProperty(habitName)) {
            if (date > weekAgo) {
                dateLists.weekly.push(date)
            }
            if (date > monthAgo) {
                dateLists.monthly.push(date)
            }
            dateLists.yearly.push(date)
        }
    }
    return dateLists
}