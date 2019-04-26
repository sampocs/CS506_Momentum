import moment from "moment"
import "moment-timezone"
import Constants from '../../constants/Constants'

const getNextDate = (date) => {
    return moment(date).add(1, 'days').format("YYYY-MM-DD")
}

/*
Dummy data includes 3 habits:
    workout: 
        Complete Habit
        occurs M-F
        Must be done between 8-10am
    read:
        Progress Habit
        Goal 60 min
        occurs M,W,F
        Must be done before 11pm
    chores:
        Subtask Habit (laundry and dishes)
        occurs Sun,M,W,Th
*/


let dummyData = {}

dummyData.calendarState = {
    currentSelectedDate: moment(new Date()).format("YYYY-MM-DD"), //Current date
	minimized: false
}

dummyData.history = {}
let history = dummyData.history
let date = "2019-03-01";
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

dummyData.settings = {}
dummyData.settings.habitSettings = {
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
dummyData.settings.habitOrder = ['workout', 'chores', 'read']
dummyData.settings.user = {
    startDate: '2019-03-01',
    lastDate: '2021-01-01'
}

export default dummyData;