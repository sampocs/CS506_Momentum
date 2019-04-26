import React from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native'
import Colors from '../constants/Colors'
import Constants from '../constants/Constants'
import Layout from '../constants/Layout'
import Fonts from '../constants/Fonts';

export default class DayMonthYearToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: Constants.LEFT
        }
    }
    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity style={[
                    styles.thirdContainer,
                    styles.insideBorderLeft,
                    this.state.currentPosition === Constants.RIGHT ? styles.insideBorderOff : styles.insideBorderOn,
                    this.state.currentPosition === Constants.LEFT ? styles.toggleOnContainer : styles.toggleOffContainer,
                ]}
                    onPress={() => {
                        this.setState({ currentPosition: Constants.LEFT })
                        this.props.setParentState(Constants.LEFT)
                    }}
                >
                    <Text style={[
                        styles.text,
                        this.state.currentPosition === Constants.LEFT ? styles.toggleOnText : styles.toggleOffText
                    ]}>
                        {this.props.labels[0]}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                    styles.thirdContainer,
                    this.state.currentPosition === Constants.MIDDLE ? styles.toggleOnContainer : styles.toggleOffContainer
                ]}
                    onPress={() => {
                        this.setState({ currentPosition: Constants.MIDDLE })
                        this.props.setParentState(Constants.MIDDLE)
                    }}>
                    <Text style={[
                        styles.text,
                        this.state.currentPosition === Constants.MIDDLE ? styles.toggleOnText : styles.toggleOffText
                    ]}>
                        {this.props.labels[1]}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                    styles.thirdContainer,
                    styles.insideBorderRight,
                    this.state.currentPosition === Constants.LEFT ? styles.insideBorderOff : styles.insideBorderOn,
                    this.state.currentPosition === Constants.RIGHT ? styles.toggleOnContainer : styles.toggleOffContainer
                ]}
                    onPress={() => {
                        this.setState({ currentPosition: Constants.RIGHT })
                        this.props.setParentState(Constants.RIGHT)
                    }}>
                    <Text style={[
                        styles.text,
                        this.state.currentPosition === Constants.RIGHT ? styles.toggleOnText : styles.toggleOffText
                    ]}>
                        {this.props.labels[2]}
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
    thirdContainer: {
        height: barHeight - (2 * borderWidth),
        width: "33.33333%",
        justifyContent: 'center'
    },
    insideBorderLeft: {
        borderRightWidth: borderWidth
    },
    insideBorderRight: {
        borderLeftWidth: borderWidth,
    },
    insideBorderOn: {
        borderColor: 'white'
    },
    insideBorderOff: {
        borderColor: Colors.aqua
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Fonts.AvenirNext
    },
    toggleOnContainer: {
        backgroundColor: Colors.aqua
    },
    toggleOffContainer: {
        backgroundColor: 'white'
    },
    toggleOnText: {
        color: 'white'
    },
    toggleOffText: {
        color: Colors.aqua
    }

})