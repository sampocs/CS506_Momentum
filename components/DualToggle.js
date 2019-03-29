import React from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import Fonts from '../constants/Fonts';

const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
export default class DayMonthYearToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: LEFT
        }
    }
    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity style={[
                    styles.halfContainer,
                    styles.leftContainer,
                    this.state.currentPosition === LEFT ? styles.toggleOnContainer : styles.toggleOffContainer,
                ]}
                    onPress={() => {
                        this.setState({ currentPosition: LEFT })
                        this.props.setParentState(LEFT)
                    }}
                >
                    <Text style={[
                        styles.text,
                        this.state.currentPosition === LEFT ? styles.toggleOnText : styles.toggleOffText
                    ]}>
                        {this.props.labels[0]}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                    styles.halfContainer,
                    styles.rightContainer,
                    this.state.currentPosition === RIGHT ? styles.toggleOnContainer : styles.toggleOffContainer
                ]}
                    onPress={() => {
                        this.setState({ currentPosition: RIGHT })
                        this.props.setParentState(RIGHT)
                    }}>
                    <Text style={[
                        styles.text,
                        this.state.currentPosition === RIGHT ? styles.toggleOnText : styles.toggleOffText
                    ]}>
                        {this.props.labels[1]}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const barHeight = 50
const borderWidth = 4
const maxWidth = 330

const styles = StyleSheet.create({
    container: {
        height: barHeight,
        flexDirection: 'row',
        width: Layout.window.width - 50,
        backgroundColor: 'white',
        borderWidth: borderWidth,
        borderColor: Colors.aqua,
        borderRadius: 5
    },
    halfContainer: {
        height: barHeight - (2 * borderWidth),
        width: "50%",
        justifyContent: 'center'
    },
    leftContainer: {
        borderRightWidth: borderWidth,
    },
    rightContainer: {
        borderLeftWidth: borderWidth,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Fonts.AvenirNext
    },
    toggleOnContainer: {
        backgroundColor: Colors.aqua,
        borderColor: Colors.aqua
    },
    toggleOffContainer: {
        backgroundColor: 'white',
        borderColor: 'white'
    },
    toggleOnText: {
        color: 'white'
    },
    toggleOffText: {
        color: Colors.aqua
    }

})