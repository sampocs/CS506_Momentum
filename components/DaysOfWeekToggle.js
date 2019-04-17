import React from 'React'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'
import Layout from '../constants/Layout'
import Constants from '../constants/Constants'

export default class DaysOfWeekToggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            daysOfWeek: props.daysOfWeek
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.daysOfWeek != this.props.daysOfWeek) {
            this.setState({ daysOfWeek: this.props.daysOfWeek})
        }
    }
    
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.backgroundLineContainer}>
                    <View style={[
                        styles.backgroundLine, {
                            backgroundColor: 
                            this.props.frequencyToggle === Constants.DAILY ? Colors.lightGreyText : this.props.color
                        }
                        ]}>
                    </View>
                    <View style={[
                        styles.backgroundLine, {
                            backgroundColor: 
                            this.props.frequencyToggle === Constants.DAILY ? Colors.lightGreyText : this.props.color
                        }
                        ]}>
                    </View>
                    <View style={[
                        styles.backgroundLine, {
                            backgroundColor: 
                            this.props.frequencyToggle === Constants.DAILY ? Colors.lightGreyText : this.props.color
                        }
                        ]}>
                    </View>
                    <View style={[
                        styles.backgroundLine, {
                            backgroundColor: 
                            this.props.frequencyToggle === Constants.DAILY ? Colors.lightGreyText : this.props.color
                        }
                        ]}>
                    </View>
                    <View style={[
                        styles.backgroundLine, {
                            backgroundColor: 
                            this.props.frequencyToggle === Constants.DAILY ? Colors.lightGreyText : this.props.color
                        }
                        ]}>
                    </View>
                    <View style={[
                        styles.backgroundLine, {
                            backgroundColor: 
                            this.props.frequencyToggle === Constants.DAILY ? Colors.lightGreyText : this.props.color
                        }
                        ]}>
                    </View>
                </View>

                <View style={styles.containerForDays}>

                <TouchableOpacity style={[
                    styles.dayContainer,
                    this.props.frequencyToggle === Constants.DAILY ? styles.disabledContainer :
                    (this.state.daysOfWeek[0] ? {backgroundColor: this.props.color} : styles.toggleOffContainer),
                    this.props.frequencyToggle === Constants.DAILY ? {borderColor: Colors.lightGreyText} : {},
                    {borderColor: this.props.color}
                ]}
                    onPress={() => {
                        let newDaysOfWeek = [...this.state.daysOfWeek]
                        newDaysOfWeek[0] = !this.state.daysOfWeek[0]
                        this.setState({ daysOfWeek: newDaysOfWeek})
                        this.props.setParentState(newDaysOfWeek)
                    }}
                    disabled={!this.props.clickable}
                >
                <Text style={[
                    styles.text,
                    this.state.daysOfWeek[0] ? styles.toggleOnText : {color: this.props.color}
                ]}
                >
                    S
                </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                    styles.dayContainer,
                    this.props.frequencyToggle === Constants.DAILY ? styles.disabledContainer :
                    (this.state.daysOfWeek[1] ? {backgroundColor: this.props.color} : styles.toggleOffContainer),
                    this.props.frequencyToggle === Constants.DAILY ? {borderColor: Colors.lightGreyText} : {},
                    {borderColor: this.props.color}
                ]}
                onPress={() => {
                    let newDaysOfWeek = [...this.state.daysOfWeek]
                    newDaysOfWeek[1] = !this.state.daysOfWeek[1]
                    this.setState({ daysOfWeek: newDaysOfWeek})
                    this.props.setParentState(newDaysOfWeek)
                }}
                disabled={!this.props.clickable}
                >
                <Text style={[
                    styles.text,
                    this.state.daysOfWeek[1] ? styles.toggleOnText : {color: this.props.color}
                ]}>
                    M
                </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                    styles.dayContainer,
                    this.props.frequencyToggle === Constants.DAILY ? styles.disabledContainer :
                    (this.state.daysOfWeek[2] ? {backgroundColor: this.props.color} : styles.toggleOffContainer),
                    this.props.frequencyToggle === Constants.DAILY ? {borderColor: Colors.lightGreyText} : {},
                    {borderColor: this.props.color}
                ]}
                onPress={() => {
                    let newDaysOfWeek = [...this.state.daysOfWeek]
                    newDaysOfWeek[2] = !this.state.daysOfWeek[2]
                    this.setState({ daysOfWeek: newDaysOfWeek})
                    this.props.setParentState(newDaysOfWeek)
                }}
                disabled={!this.props.clickable}

                >
                <Text style={[
                    styles.text,
                    this.state.daysOfWeek[2] ? styles.toggleOnText : {color: this.props.color}
                ]}>
                    T
                </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                    styles.dayContainer,
                    this.props.frequencyToggle === Constants.DAILY ? styles.disabledContainer :
                    (this.state.daysOfWeek[3] ? {backgroundColor: this.props.color} : styles.toggleOffContainer),
                    this.props.frequencyToggle === Constants.DAILY ? {borderColor: Colors.lightGreyText} : {},
                    {borderColor: this.props.color}
                ]}
                onPress={() => {
                    let newDaysOfWeek = [...this.state.daysOfWeek]
                    newDaysOfWeek[3] = !this.state.daysOfWeek[3]
                    this.setState({ daysOfWeek: newDaysOfWeek})
                    this.props.setParentState(newDaysOfWeek)
                }}
                disabled={!this.props.clickable}
                >
                <Text style={[
                    styles.text,
                    this.state.daysOfWeek[3] ? styles.toggleOnText : {color: this.props.color}
                ]}>
                    W
                </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                    styles.dayContainer,
                    this.props.frequencyToggle === Constants.DAILY ? styles.disabledContainer :
                    (this.state.daysOfWeek[4] ? {backgroundColor: this.props.color} : styles.toggleOffContainer),
                    this.props.frequencyToggle === Constants.DAILY ? {borderColor: Colors.lightGreyText} : {},
                    {borderColor: this.props.color}
                ]}
                onPress={() => {
                    let newDaysOfWeek = [...this.state.daysOfWeek]
                    newDaysOfWeek[4] = !this.state.daysOfWeek[4]
                    this.setState({ daysOfWeek: newDaysOfWeek})
                    this.props.setParentState(newDaysOfWeek)
                }}
                disabled={!this.props.clickable}
                >
                <Text style={[
                    styles.text,
                    this.state.daysOfWeek[4] ? styles.toggleOnText : {color: this.props.color}
                ]}>
                    Th
                </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                    styles.dayContainer,
                    this.props.frequencyToggle === Constants.DAILY ? styles.disabledContainer :
                    (this.state.daysOfWeek[5] ? {backgroundColor: this.props.color} : styles.toggleOffContainer),
                    this.props.frequencyToggle === Constants.DAILY ? {borderColor: Colors.lightGreyText} : {},
                    {borderColor: this.props.color}
                ]}
                onPress={() => {
                    let newDaysOfWeek = [...this.state.daysOfWeek]
                    newDaysOfWeek[5] = !this.state.daysOfWeek[5]
                    this.setState({ daysOfWeek: newDaysOfWeek})
                    this.props.setParentState(newDaysOfWeek)
                }}
                disabled={!this.props.clickable}
                >
                <Text style={[
                    styles.text,
                    this.state.daysOfWeek[5] ? styles.toggleOnText : {color: this.props.color}
                ]}>
                    F
                </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[
                    styles.dayContainer,
                    this.props.frequencyToggle === Constants.DAILY ? styles.disabledContainer :
                    (this.state.daysOfWeek[6] ? {backgroundColor: this.props.color} : styles.toggleOffContainer),
                    this.props.frequencyToggle === Constants.DAILY ? {borderColor: Colors.lightGreyText} : {},
                    {borderColor: this.props.color}
                ]}
                onPress={() => {
                    let newDaysOfWeek = [...this.state.daysOfWeek]
                    newDaysOfWeek[6] = !this.state.daysOfWeek[6]
                    this.setState({ daysOfWeek: newDaysOfWeek})
                    this.props.setParentState(newDaysOfWeek)
                }}
                disabled={!this.props.clickable}
                >
                <Text style={[
                    styles.text,
                    this.state.daysOfWeek[6] ? styles.toggleOnText : {color: this.props.color}
                ]}>
                    S
                </Text>
                </TouchableOpacity>

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
    disabledContainer: {
        backgroundColor: Colors.lightGreyText
    },
    toggleOffContainer: {
        backgroundColor: 'white'
    },
    toggleOnText: {
        color: 'white'
    },
    toggleOffText: {
        color: Colors.calendarBlue
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