import React from 'React'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import Fonts from '../constants/Fonts'
import Layout from '../constants/Layout'

export default class DaysOfWeekToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            daysOfWeek: props.daysOfWeek
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.daysOfWeek != this.props.daysOfWeek) {
            this.setState({ daysOfWeek: this.props.daysOfWeek })
        }
    }

    backgroundLineSection() {
        return (
            <View style={[styles.backgroundLine, { backgroundColor: this.props.color }]} />
        )
    }

    getDayOfWeekAbrv(dow) {
        dow = dow.toString()
        let mapping = {
            "0": "S",
            "1": "M",
            "2": "T",
            "3": "W",
            "4": "Th",
            "5": "F",
            "6": "S"
        }
        return mapping[dow]
    }

    dayToggle(dow) {
        return (
            <TouchableOpacity style={[
                styles.dayContainer,
                { borderColor: this.props.color },
                { backgroundColor: this.state.daysOfWeek[dow] ? this.props.color : 'white'}
            ]}
                onPress={() => {
                    let newDaysOfWeek = [...this.state.daysOfWeek]
                    newDaysOfWeek[dow] = !this.state.daysOfWeek[dow]
                    this.setState({ daysOfWeek: newDaysOfWeek })
                    this.props.setParentState(newDaysOfWeek)
                }}
            >
                <Text style={[
                    styles.text,
                    { color: this.state.daysOfWeek[dow] ? 'white' : this.props.color }
                ]}
                >
                    {this.getDayOfWeekAbrv(dow)}
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.backgroundLineContainer}>
                    {this.backgroundLineSection()}
                    {this.backgroundLineSection()}
                    {this.backgroundLineSection()}
                    {this.backgroundLineSection()}
                    {this.backgroundLineSection()}
                    {this.backgroundLineSection()}
                </View>

                <View style={styles.containerForDays}>
                    {this.dayToggle(0)}
                    {this.dayToggle(1)}
                    {this.dayToggle(2)}
                    {this.dayToggle(3)}
                    {this.dayToggle(4)}
                    {this.dayToggle(5)}
                    {this.dayToggle(6)}
                </View>

            </View>
        )
    }
}

const maxWidth = 330
const styles = StyleSheet.create({
    container: {
        height: 45,
        width: Math.min(Layout.window.width - 50, maxWidth),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerForDays: {
        height: 45,
        width: Math.min(Layout.window.width - 50, maxWidth),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dayContainer: {
        height: 45,
        width: '12%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderRadius: 10
    },
    text: {
        textAlign: 'center',
        fontFamily: Fonts.AvenirNext,
        fontSize: 20
    },
    backgroundLineContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '76%'
    },
    backgroundLine: {
        height: 2,
        width: '4%'
    }
})