import moment from "moment"
import "moment-timezone"
import Constants from '../../constants/Constants'
import { HISTORICAL_DATES } from '../../constants/Constants'
import { getCurrentDate, getYearAgo, getMonthAgo } from "../../helpers/dateOperations";

///////// EXPECTED RESULTS //////////
/*

    Weekly: 
        Workout: 5/7
        Chores: 3/7
        Read: 4/7
    Montly:
        Workout: 22/31
        Chores: 13/31
        Read: 18/31

*/

const getNextDate = (date) => {
    return moment(date).add(1, 'days').format("YYYY-MM-DD")
}

let testingDataWeekMonth = {}

testingDataWeekMonth.calendarState = {
    currentSelectedDate: moment(new Date()).format("YYYY-MM-DD"), //Current date
	minimized: false
}

testingDataWeekMonth.history = {}
let history = testingDataWeekMonth.history

let startDate = getCurrentDate()
let monthAgo = getMonthAgo(startDate)
let allDates = HISTORICAL_DATES.filter((date) => (date <= startDate) && (date > monthAgo)).sort().reverse()

let workoutWeekDates = [0,2,3,4,6]
let readWeekAmounts = [80, 60, 100, 120, 40, 30, 90]
let choresWeekProgress = [
    [['laundry', true], ['dishes', true], ['garbage', true]],
    [['laundry', true], ['dishes', false], ['garbage', true]],
    [['laundry', false], ['dishes', false], ['garbage', false]],
    [['laundry', false], ['dishes', false], ['garbage', true]],
    [['laundry', true], ['dishes', true], ['garbage', true]],
    [['laundry', true], ['dishes', true], ['garbage', true]],
    [['laundry', true], ['dishes', true], ['garbage', false]],
]
for (i in allDates) {
    let date = allDates[i]
    history[date] = {}

    let index = i % 7

    if (workoutWeekDates.includes(index)) {
        history[date].workout = {
            completed: true,
            notes: '',
            type: Constants.COMPLETE,
            habitInfo: {}
        }
    }
    else {
        history[date].workout = {
            completed: false,
            notes: '',
            type: Constants.COMPLETE,
            habitInfo: {}
        }
    }

    history[date].read = {
        completed: (readWeekAmounts[index] >= 80),
        type: Constants.PROGRESS,
        notes: '',
        habitInfo: {
            progress: readWeekAmounts[index],
            goal: 80
        } 
    }

    history[date].chores = {
        completed: choresWeekProgress[index].filter((subtask) => !subtask[1]).length === 0,
        notes: '',
        type: Constants.SUBTASK,
        habitInfo: {
            subtasks: choresWeekProgress[index]
        }
    }

}

testingDataWeekMonth.settings = {}
testingDataWeekMonth.settings.habitSettings = {
    workout: {
        disappearWhenCompleted: false,
        daysOfWeek: [
            true, //Sun
            true,  //M
            true,  //Tu
            true,  //W
            true,  //Th
            true,  //F
            true  //Sat
        ],
        type: Constants.COMPLETE,
        habitInfo: {},
        icon: 'dumbbells'
    },
    read: {
        disappearWhenCompleted: false,
        daysOfWeek: [
            true, //Sun
            true,  //M
            true, //Tu
            true,  //W
            true, //Th
            true,  //F
            true   //Sat
        ],
        type: Constants.PROGRESS,
        habitInfo: {
            unit: "min",
            goal: 80
        },
        icon: 'book'
    },
    chores: {
        disappearWhenCompleted: false,
        daysOfWeek: [
            true,  //Sun
            true,  //M
            true, //Tu
            true,  //W
            true,  //Th
            true, //F
            true  //Sat
        ],
        type: Constants.SUBTASK,
        habitInfo: {
            subtasks: ['laundry', 'dishes', 'garbage']
        },
        icon: 'broom'
    }
}
testingDataWeekMonth.settings.habitOrder = ['workout', 'chores', 'read']
testingDataWeekMonth.settings.user = {
    startDate: '2019-03-01',
    lastDate: '2021-01-01'
}

export default testingDataWeekMonth;