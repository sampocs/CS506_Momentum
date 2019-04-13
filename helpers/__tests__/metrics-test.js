import {
    getPreviewMetrics
} from '../../helpers/metricsOperations'
import { getYearAgo } from '../../helpers/dateOperations';
import { ALL_DATES_LIST } from '../../constants/Constants'

let completedIndex = [0, 1, 7, 9, 10, 11, 14, 18, 20, 21, 25]

let today = "2019-04-01"
let end = "2019-03-31"
let older = "2019-02-31"
let dateRange = ALL_DATES_LIST.filter((date) => (date >= older && date <= end)).sort().reverse()
let habitName = 'read'
let history = {}
let history2 = {}
let dow = 0
for (i in dateRange) {
    let date = dateRange[i]
    history[date] = {}
    history2[date] = {}
    dow = (dow + 1) % 7
    if (dow != 5 && dow != 6) {
        history[date][habitName] = {}
        i = parseInt(i)
        if (i === 0 || i === 1 || i === 7 || i === 9 ||
            i === 10 || i === 11 || i === 14 || i === 18 ||
            i === 20 || i === 11 || i === 25) {
            history[date][habitName].completed = true
        }
        else {
            history[date][habitName].completed = false
        }
    }
}
console.log(history)

let yearAgo = getYearAgo()
describe('Metrics', () => {
    test('Metrics', () => {
        expect(getPreviewMetrics(history, habitName, date=today)).toEqual({
            weekly: {
                totalDays: 6,
                daysCompleted: 3,
                percentage: '50%'
            },
            monthly: {
                totalDays: 23,
                daysCompleted: 7,
                percentage: '30%'
            },
            yearly: {
                totalDays: 23,
                daysCompleted: 7,
                percentage: '30%'
            }
        })

        expect(getPreviewMetrics(history2, habitName, date=today)).toEqual({
            weekly: {
                totalDays: 0,
                daysCompleted: 0,
                percentage: '0%'
            },
            monthly: {
                totalDays: 0,
                daysCompleted: 0,
                percentage: '0%'
            },
            yearly: {
                totalDays: 0,
                daysCompleted: 0,
                percentage: '0%'
            }
        })
    })
})