import calendarReducer from '../calendarReducer'
import {
    TOGGLE_MINIMIZE_CAL,
    SELECT_DATE,
    SELECT_TODAY
} from '../../actions/actions'
import { getCurrentDate } from '../../helpers/dateOperations';

describe('Calendar Reducer', () => {
    test('TOGGLE_MINIMIZE_CAL', () => {
        expect(calendarReducer({
            currentSelectedDate: "2019-03-01",
            minimized: false
        },{
            type: TOGGLE_MINIMIZE_CAL
        })).toEqual({
            currentSelectedDate: "2019-03-01",
            minimized: true
        })

        expect(calendarReducer({
            currentSelectedDate: "2019-03-01",
            minimized: true
        },{
            type: TOGGLE_MINIMIZE_CAL
        })).toEqual({
            currentSelectedDate: "2019-03-01",
            minimized: false
        })
    })

    test('SELECT_DATE', () => {
        expect(calendarReducer({
            currentSelectedDate: "2019-03-01",
            minimized: false
        },{
            type: SELECT_DATE,
            date: "2019-03-02"
        })).toEqual({
            currentSelectedDate: "2019-03-02",
            minimized: false
        })

        expect(calendarReducer({
            currentSelectedDate: "2019-03-01",
            minimized: true
        },{
            type: SELECT_DATE,
            date: "2019-03-02"
        })).toEqual({
            currentSelectedDate: "2019-03-02",
            minimized: true
        })

        expect(calendarReducer({
            currentSelectedDate: "2019-03-01",
            minimized: true
        },{
            type: SELECT_DATE,
            date: "2019-03-01"
        })).toEqual({
            currentSelectedDate: "2019-03-01",
            minimized: true
        })
    })

    test('SELECT_TODAY', () => {
        expect(calendarReducer({
            currentSelectedDate: "2019-03-01",
            minimized: false
        },{
            type: SELECT_TODAY,
            date: getCurrentDate()
        })).toEqual({
            currentSelectedDate: getCurrentDate(),
            minimized: false
        })

        expect(calendarReducer({
            currentSelectedDate: "2019-03-01",
            minimized: true
        },{
            type: SELECT_TODAY,
            date: getCurrentDate()
        })).toEqual({
            currentSelectedDate: getCurrentDate(),
            minimized: true
        })
    })
})