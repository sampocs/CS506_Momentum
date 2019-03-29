import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors'

export default class CheckBoxCircle extends React.Component {
    render() {
        return (
            <Ionicons
                name={'ios-checkmark-circle' + (this.props.completed ? '': '-outline')}
                size={45}
                color={this.props.completed ? Colors.darkAqua : Colors.darkRed}
            />
        )
    }
}