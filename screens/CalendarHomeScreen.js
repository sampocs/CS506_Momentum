import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux';
import HabitComponent from '../components/HabitComponent';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

class CalendarHomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <HabitComponent habitName={'read'} date={'2019-03-27'}/>
                <HabitComponent habitName={'workout'} date={'2019-03-27'}/>
                <HabitComponent habitName={'chores'}date={'2019-03-27'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CalendarHomeScreen);
