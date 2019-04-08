import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import { connect } from 'react-redux';
import { getPreviewMetrics } from '../helpers/metricsOperations'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { withNavigation } from 'react-navigation'

const mapStateToProps = (state) => {
    return {
        history: state.history
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const WEEKLY = 'WEEKLY'
const MONTHLY = 'MONTHLY'
const YEARLY = 'YEARLY'

class MetricsHabitPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            metrics: {},
            metricsLoaded: false
        }
    }

    componentDidMount() {
        this.setState({
            metrics: getPreviewMetrics(this.props.history, this.props.habitName),
            metricsLoaded: true
        })
    }

//     componentDidUpdate(prevProps, prevState) {
//         if (prevProps.history != this.props.history) {
//             this.setState({
//               //metrics: getPreviewMetrics(this.props.history, this.props.habitName),
// //                metricsLoaded: true
//             })
//         }
//     }

    render() {
        let metrics = {}
        if (this.state.metricsLoaded) {
            if (this.props.currentToggleSection === WEEKLY) {
                metrics = this.state.metrics.weekly
            }
            else if (this.props.currentToggleSection === MONTHLY) {
                metrics = this.state.metrics.monthly
            }
            else {
                metrics = this.state.metrics.yearly
            }
        }

        return (
            <TouchableOpacity 
            style={styles.container}
            onPress={() => this.props.navigation.push('MetricsSpecificHabit')}
            >
                <View style={styles.habitTextContainer}>
                    <Text style={styles.habitText}>{this.props.habitName}</Text>
                </View>
                {this.state.metricsLoaded ?
                    <View style={styles.metricContainer}>
                        <Text style={styles.metricTopText}>{metrics.percentage}</Text>
                        <Text style={styles.metricBottomText}>
                        {`(${metrics.daysCompleted}/${metrics.totalDays})`}
                        </Text>
                    </View>
                    :
                    <View style={styles.metricContainer}>
                        <EvilIcons name={'spinner'} color={Colors.aqua} size={60} />
                    </View>
                }

            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 90,
        flexDirection: 'row',
        marginHorizontal: 10,
        borderColor: Colors.aqua,
        borderWidth: 5,
        borderRadius: 10,
        marginVertical: 4
    },
    habitTextContainer: {
        width: '70%',
        backgroundColor: Colors.aqua,
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderColor: 'white',
        borderWidth: 0,
        borderRadius: 0
    },
    metricContainer: {
        width: '30%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    habitText: {
        fontFamily: Fonts.AvenirNext,
        fontSize: 30,
        color: 'white'
    },
    metricTopText: {
        fontFamily: Fonts.AvenirNext,
        fontSize: 35,
        color: Colors.aqua
    },
    metricBottomText: {
        fontFamily: Fonts.AvenirNext,
        fontSize: 15,
        color: Colors.aqua
    }
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(MetricsHabitPreview))