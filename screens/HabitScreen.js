import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux';
import Subtask from '../components/Subtask';
import Progress from '../components/Progress';
import Complete from '../components/Complete';
import SwitchType from '../constants/Constants';


const mapStateToProps = (state, ownProps) => {
    return {
          //  habits: state.history,
           // habit: state.history[this.state.habitDate][this.state.habitName],
          //  habitType: state.history[this.state.habitDate][this.state.habitName].habitType
          habit: state.history['2019-03-27'].workout        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}


class HabitScreen extends React.Component {

    state = {
        //remove after redux implementation
        subtaskName: 'Subtask Name',
        completed: 'false',
        number: 30,
        habitName: '',
        habitDate: ''
      }

    componentDidMount() {
        console.log(this.props.habit)
        console.log(this.props.habit.completed)
        // may change based off of passed parameters
        // this.setState({habitName: this.props.navigation.getParam('habitName')})
        // this.setState({habitDate: this.props.navigation.getParam('habitDate')})
    }

    renderType(habit) {
        switch(habit.type) {
            case SwitchType.COMPLETE:
                return <Complete data={habit.completed}/>;
            case SwitchType.PROGRESS:
                return <Progress data={habit}/>;
            case SwitchType.SUBTASK:
                return <Subtask data={Object.keys(habit.habitInfo.subtasks)} subtasks={habit.habitInfo.subtasks} />;
               //return <Subtask data={habit.habitInfor}/>;
    }
}

    render() {
        return (
            
            <View style={styles.container}>
                <Text>Habit Screen</Text>
                <Text>Habit Name - Update</Text>
                <Text>Date - Update</Text>
                <View>
                    {this.renderType(this.props.habit)}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      //  justifyContent: 'center',
        paddingTop: 20,
        marginTop: 20,
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HabitScreen);
