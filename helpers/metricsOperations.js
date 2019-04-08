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
    console.log('here2')
    let currentDate = getCurrentDate()
    let startDate = getPreviousDay(currentDate)

    let weekAgo = getWeekAgo(startDate)
    let monthAgo = getMonthAgo(startDate)
    let yearAgo = getYearAgo(startDate)

    let date = startDate;

    return metrics = {
        weekly: {
            totalDays: 0,
            daysCompleted: 0
        },
        monthly: {
            totalDays: 0,
            daysCompleted: 0
        },
        yearly: {
            totalDays: 0,
            daysCompleted: 0
        }
    }
    while (date >= yearAgo) {
        console.log(date)
        if (history.hasOwnProperty(date)) {
            let dataOnDate = history[date][habitName]

            if (!history[date].hasOwnProperty(habitName)) {
                continue;
            }

            if (date >= weekAgo) {
                metrics.weekly.totalDays++
                metrics.weekly.daysCompleted += (dataOnDate.completed ? 1 : 0)
            }
            if (date >= monthAgo) {
                metrics.monthly.totalDays++
                metrics.monthly.daysCompleted += (dataOnDate.completed ? 1 : 0)
            }
            if (date >= yearAgo) {
                metrics.yearly.totalDays++
                metrics.yearly.daysCompleted += (dataOnDate.completed ? 1 : 0)
            }
        }
        date = getPreviousDay(date)
    }
    metrics.weekly.percentage = getAverage(metrics.weekly.daysCompleted, metrics.weekly.totalDays)
    metrics.monthly.percentage = getAverage(metrics.monthly.daysCompleted, metrics.monthly.totalDays)
    metrics.yearly.percentage = getAverage(metrics.yearly.daysCompleted, metrics.yearly.totalDays)
    return metrics
}