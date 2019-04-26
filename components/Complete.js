
import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import { toggleCompleteCompletion } from '../actions/actions';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors';

var {height} = Dimensions.get('window');

const mapStateToProps = (state, ownProps) => {
    return {
        completed: state.history[ownProps.date][ownProps.habitName].completed
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        toggleCompleteCompletion: (date, habitName) => {
            dispatch(toggleCompleteCompletion(date, habitName))
        }
    }
}

class Complete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: props.completed
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.completed != this.props.completed) {
            this.setState({ completed: this.props.completed })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.toggleCompleteCompletion(this.props.date, this.props.habitName)}>
                    <Ionicons
                        name={'md-checkbox'}
                        size={(height < 600) ? 150: 250}
                        color={this.state.completed ? Colors.aqua : Colors.lightRed}>
                    </Ionicons>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 75,
        width: 350,
        backgroundColor: '#c93108'
    },
    button: {
        alignContent: 'flex-end'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Complete);