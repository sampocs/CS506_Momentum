import {
    getPreviewMetrics,
    getCurrentStreak
} from '../../helpers/metricsOperations'
import { getCurrentDate, getWeekAgo } from '../../helpers/dateOperations';
import { ALL_DATES_LIST } from '../../constants/Constants'
import testingDataWeekMonth from '../../assets/data/testingDataWeekMonth';

let previewHistory = testingDataWeekMonth.history

let streak1 = {}
let streak2 = {}
let streak3 = {}
let streak4 = {}
let streakDates = ALL_DATES_LIST.filter((date) => (date > getWeekAgo(getCurrentDate())) && (date <= getCurrentDate())).sort().reverse()
for (i in streakDates) {
    let date = streakDates[i]
    if (i === "0") {
        streak1[date] = {workout: {completed: true}}
        streak2[date] = {workout: {completed: true}}
        streak3[date] = {workout: {completed: false}} 
        streak4[date] = {workout: {completed: false}} 
    }
    else if (i === "1") {
        streak1[date] = {workout: {completed: false}} 
        streak2[date] = {workout: {completed: true}}
        streak3[date] = {workout: {completed: true}}
        streak4[date] = {workout: {completed: false}} 
    }
    else if (i === "2") {
        streak1[date] = {workout: {completed: false}} 
        streak2[date] = {workout: {completed: false}} 
        streak3[date] = {workout: {completed: true}}
        streak4[date] = {workout: {completed: true}} 
    }
    else {
        streak1[date] = {workout: {completed: false}} 
        streak2[date] = {workout: {completed: false}} 
        streak3[date] = {workout: {completed: false}} 
        streak4[date] = {workout: {completed: false}} 
    }
}

describe('Metrics', () => {
    test('PreviewMetrics', () => {
        expect(getPreviewMetrics(previewHistory, 'workout')).toEqual({
            weekly: {
                totalDays: 7,
                daysCompleted: 5,
                percentage: '71%'
            },
            monthly: {
                totalDays: 31,
                daysCompleted: 22,
                percentage: '71%'
            },
            yearly: {
                totalDays: 31,
                daysCompleted: 22,
                percentage: '71%'
            }
        })
    })

    test('CurrentStreak', () => {

        expect(getCurrentStreak(streak1, 'workout')).toEqual(1)

        expect(getCurrentStreak(streak2, 'workout')).toEqual(2)

        expect(getCurrentStreak(streak3, 'workout')).toEqual(2)

        expect(getCurrentStreak(streak4, 'workout')).toEqual(0)

    })
})