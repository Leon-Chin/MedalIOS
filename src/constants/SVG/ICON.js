import { Foundation, FontAwesome5, FontAwesome, MaterialCommunityIcons, Entypo, Octicons, Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';
export const ICON = {
    right: (size, color) => <Entypo name="chevron-right" size={size} color={color} />,
    left: (size, color) => <Entypo name='chevron-left' size={size} color={color} />,
    down: (size, color) => <Entypo name='chevron-down' size={size} color={color} />,
    calender: (size, color) => <Foundation name="calendar" size={size} color={color} />,
    weight: (size, color) => <FontAwesome5 name="weight" size={size} color={color} />,
    addToCalender: (size, color) => <FontAwesome name='calendar-plus-o' size={size} color={color} />,
    circle: (size, color) => <Entypo name="circle" size={size} color={color} />,
    doneCircle: (size, color) => <Octicons name="check-circle-fill" size={size} color={color} />,
    agent: (size, color) => <MaterialCommunityIcons name="face-agent" size={size} color={color} />,
    play: (size, color) => <FontAwesome5 name="play" size={size} color={color} />,
    stop: (size, color) => <Ionicons name="stop" size={size} color={color} />,
    pause: (size, color) => <FontAwesome5 name="pause" size={size} color={color} />,
    previous: (size, color) => <Ionicons name='play-skip-back' size={size} color={color} />,
    next: (size, color) => <Ionicons name='play-skip-forward' size={size} color={color} />,
    fire: (size, color) => <FontAwesome5 name="fire" size={size} color={color} />,
    stepIcon: (size, color) => <MaterialCommunityIcons name="shoe-print" size={size} color={color} />,
    distanceIcon: (size, color) => <MaterialCommunityIcons name="map-marker-distance" size={size} color={color} />,
    time: (size, color) => <Ionicons name="timer-outline" size={size} color={color} />,
    more: (size, color) => <MaterialIcons name="more-horiz" size={size} color={color} />,
    delete: (size, color) => <MaterialIcons name="delete" size={size} color={color} />,
    edit: (size, color) => <MaterialCommunityIcons name="file-document-edit-outline" size={size} color={color} />,
    target: (size, color) => <MaterialCommunityIcons name="bullseye-arrow" size={size} color={color} />,
    lightning: (size, color) => <MaterialCommunityIcons name="lightning-bolt" size={size} color={color} />,
    trophy: (size, color) => <FontAwesome5 name="trophy" size={size} color={color} />,
    picture: (size, color) => <AntDesign name="picture" size={size} color={color} />,
    video: (size, color) => <Entypo name="folder-video" size={size} color={color} />,
    plus: (size, color) => <AntDesign name="plus" size={size} color={color} />,
    light: (size, color) => <Entypo name="light-up" size={size} color={color} />,
    dark: (size, color) => <Ionicons name="moon" size={size} color={color} />,
    male: (size, color) => <Foundation name="male-symbol" size={size} color={color} />,
    female: (size, color) => <Foundation name="female-symbol" size={size} color={color} />,
    frowno: (size, color) => <AntDesign name="frowno" size={size} color={color} />,
    personalize: (size, color) => <MaterialIcons name="collections-bookmark" size={size} color={color} />,
    all: (size, color) => <MaterialCommunityIcons name="folder-multiple" size={size} color={color} />
}