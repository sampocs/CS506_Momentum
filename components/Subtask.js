
import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import Fonts from '../constants/Fonts'
import { CheckBox } from 'react-native-elements';
import {toggleSubtaskCompletion} from '../actions/actions';
import {connect} from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        subtasks: state.history[ownProps.date][ownProps.habitName].habitInfo.subtasks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSubtaskCompletion: (date, name, subtaskName) => {
            dispatch(toggleSubtaskCompletion(date, name, subtaskName))
        }
    }
}

class Subtask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subtasks: props.subtasks
        }
    }

    render() {
        let range = Array(this.props.subtasks.length).fill().map((x,i)=>i)
    let subtasksList = range.map((index)=>{
            return(
            <CheckBox
                key={index}
                title={this.props.subtasks[index][0]}
                checked={this.props.subtasks[index][1]}
                onPress={() => {
                    let newSubtasks = [this.props.subtasks]
                    newSubtasks[index] = !this.props.subtasks[index]
                    this.setState({ subtasks: newSubtasks})
                    this.props.toggleSubtaskCompletion(this.props.date, this.props.habitName, index);
                }}
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxText}
                uncheckedColor={Colors.aqua}
                checkedColor={Colors.aqua}
            >
            </CheckBox>
            )
        })
        return (
            <View>
                {subtasksList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    checkboxContainer: {
        backgroundColor: 'white',
        borderWidth: 0,
        height: 50,
        padding: 0,
        width: Layout.window.width - 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxText: {
        color: Colors.aqua,
        fontFamily: Fonts.AvenirNext,
        fontSize: 20
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Subtask);