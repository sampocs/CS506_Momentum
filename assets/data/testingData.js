import moment from "moment"
import "moment-timezone"
import Constants from '../../constants/Constants'
import { HISTORICAL_DATES } from '../../constants/Constants'
import { getCurrentDate, getYearAgo } from "../../helpers/dateOperations";

const getNextDate = (date) => {
    return moment(date).add(1, 'days').format("YYYY-MM-DD")
}

let testingData = {}

testingData.calendarState = {
    currentSelectedDate: moment(new Date()).format("YYYY-MM-DD"), //Current date
	minimized: false
}

testingData.history = {}
let history = testingData.history

let startDate = getCurrentDate()
let yearAgo = getYearAgo(startDate)
let allDates = HISTORICAL_DATES.filter((date) => (date <= startDate) && (date > yearAgo))
console.log(allDates.length)

for (i = 0; i < 100; i++) {
    history[date] = {}

    let dow = moment(date).day()
    if (dow != 0 && dow != 6) { //M-F
        history[date].workout = {
            completed: false,
            notes: '',
            type: Constants.COMPLETE,
            habitInfo: {}
        }
    }
    if (dow == 1 || dow == 3 || dow == 5) { //M,W,F,Sat
        history[date].read = {
            completed: false,
            notes: '',
            type: Constants.PROGRESS,
            habitInfo: {
                progress: 0,
                goal: 60
            }
        }
    }
    if (dow != 2 && dow != 5 && dow != 6) { //Sun,M,W,Th
        history[date].chores = {
            completed: false,
            notes: '',
            type: Constants.SUBTASK,
            habitInfo: {
                subtasks: [['laundry', false], ['dishes', false]]
            }
        }
    }
    date = getNextDate(date)
}

testingData.settings = {}
testingData.settings.habitSettings = {
    workout: {
        disappearWhenCompleted: true,
        daysOfWeek: [
            false, //Sun
            true,  //M
            true,  //Tu
            true,  //W
            true,  //Th
            true,  //F
            false  //Sat
        ],
        type: Constants.COMPLETE,
        habitInfo: {},
        icon: 'dumbbells'
    },
    read: {
        disappearWhenCompleted: false,
        daysOfWeek: [
            false, //Sun
            true,  //M
            false, //Tu
            true,  //W
            false, //Th
            true,  //F
            true   //Sat
        ],
        type: Constants.PROGRESS,
        habitInfo: {
            unit: "min",
            goal: 60
        },
        icon: 'book'
    },
    chores: {
        disappearWhenCompleted: false,
        daysOfWeek: [
            true,  //Sun
            true,  //M
            false, //Tu
            true,  //W
            true,  //Th
            false, //F
            false  //Sat
        ],
        type: Constants.SUBTASK,
        habitInfo: {
            subtasks: ['laundry', 'dishes']
        },
        icon: 'broom'
    }
}
testingData.settings.habitOrder = ['workout', 'chores', 'read']
testingData.settings.user = {
    startDate: '2019-03-01',
    lastDate: '2021-01-01'
}

export default testingData;