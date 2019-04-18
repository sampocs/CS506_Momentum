import {
    getWeekAgo,
    getMonthAgo,
    getYearAgo,
    getCurrentDate,
    getPreviousDay
} from './dateOperations'

const getAverage = (daysCompleted, totalDays) => {
    if (totalDays === 0 || daysCompleted === 0) {
        return '0%';
    }
    let avg = (daysCompleted / totalDays) * 100
    return `${Math.round(avg)}%`
}
export const getPreviewMetrics = (history, habitName) => {

    let currentDate = getCurrentDate()
    let startDate = getPreviousDay(currentDate)

    let weekAgo = getWeekAgo(startDate)
    let monthAgo = getMonthAgo(startDate)
    let yearAgo = getYearAgo(startDate)

    let weeklyTotalDays = 0
    let monthlyTotalDays = 0
    let yearlyTotalDays = 0

    let weeklyCompletedDays = 0
    let monthlyCompletedDays = 0
    let yearlyCompletedDays = 0

    let allDates = Object.keys(history).filter((date) => ((date >= yearAgo) && (date < currentDate)))
    for (d in allDates) {
        let date = allDates[d]
        if (history.hasOwnProperty(date) && history[date].hasOwnProperty(habitName)) {
            let dataOnDate = history[date][habitName]

            if (date >= weekAgo) {
                weeklyTotalDays++
                weeklyCompletedDays += (dataOnDate.completed ? 1 : 0)
            }
            if (date >= monthAgo) {
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

export const getCompletedDates = (history, habitName) => {
    let completedWeekly = []
    let completedMonthly = []
    let completedYearly = []

    let currentDate = getCurrentDate()
    let startDate = getPreviousDay(currentDate)

    let weekAgo = getWeekAgo(startDate)
    let monthAgo = getMonthAgo(startDate)
    let yearAgo = getYearAgo(startDate)

    let allDates = Object.keys(history).filter((date) => ((date >= yearAgo) && (date < currentDate)));
    for (d in allDates) {
        let specDate = allDates[d]
        if (history.hasOwnProperty(specDate) && history[specDate].hasOwnProperty(habitName)) {
            if (history[specDate][habitName].completed) {
                let completedDate = {
                    date: specDate,
                    count: 10
                }
                if (specDate >= monthAgo) {
                    completedMonthly.push(completedDate)
                    if (specDate >= weekAgo) {
                        completedWeekly.push(completedDate)
                    }
                }
                completedYearly.push(completedDate)
            }
        }
    }
    return {
        weekly: completedWeekly,
        monthly: completedMonthly,
        yearly: completedYearly
    }
}