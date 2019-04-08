import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Colors from '../constants/Colors'
import Icons from '../constants/Icons'

export default class HabitIcon extends React.Component {
    components = {
        Ionicons: Ionicons,
        FontAwesome: FontAwesome,
        MaterialCommunityIcons: MaterialCommunityIcons,
        Feather: Feather,
        AntDesign: AntDesign,
        EvilIcons: EvilIcons
    }

    render() {
        const icon = Icons[this.props.icon]
        const fullIconName = icon.iconName
        const [family, iconName] = fullIconName.split('/')
        const IconFamilyName = this.components[family]

        return (
            <IconFamilyName
                name={iconName}
                size={icon.size}
                style={icon.style}
                color={this.props.completed ? Colors.darkAqua : Colors.darkRed}
            />
        )
    }
}

