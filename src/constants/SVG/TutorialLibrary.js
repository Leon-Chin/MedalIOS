import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';
import EXERCISETYPE from '../EXERCISETYPE';
import { ICON } from './ICON';
import COLORS from '../COLORS';
export const exerciseLogo = {
    rope: (size) => <MaterialCommunityIcons name="jump-rope" size={size} color="#fff" />,
    yoga: (size) => <MaterialCommunityIcons name="yoga" size={size} color="#fff" />,
    cycling: (size) => <Ionicons name="md-bicycle-sharp" size={size} color="#fff" />,
    lose: (size) => <FontAwesome5 name="weight" size={size} color="#fff" />,
    strength: (size) => <MaterialCommunityIcons name="weight-lifter" size={size} color="#fff" />,
    cooldown: (size) => <Feather name="battery-charging" size={size} color="#fff" />,
    warmup: (size) => <FontAwesome5 name="hotjar" size={size} color="#fff" />
}
const TutorialsInLibrary = [
    {
        name: 'All',
        value: "all",
        icon: ICON.all(30, COLORS.white)
    },
    {
        name: 'Star',
        value: "recommand",
        icon: ICON.personalize(30, COLORS.white)
    },
    {
        name: 'Rope',
        value: EXERCISETYPE.rope.value,
        icon: exerciseLogo.rope(30)
    },
    {
        name: 'Yoga',
        value: EXERCISETYPE.yoga.value,
        icon: exerciseLogo.yoga(30)
    },
    {
        name: 'Cycling',
        value: EXERCISETYPE.spinning.value,
        icon: exerciseLogo.cycling(30)
    },
    {
        name: 'Burning',
        value: EXERCISETYPE.burning.value,
        icon: exerciseLogo.lose(24)
    },
    {
        name: 'Strength',
        value: EXERCISETYPE.strength.value,
        icon: exerciseLogo.strength(30)
    },
    {
        name: 'Stretch',
        value: EXERCISETYPE.warmup.value,
        icon: exerciseLogo.warmup(24)
    },
    {
        name: 'Relax',
        value: EXERCISETYPE.cooldown.value,
        icon: exerciseLogo.cooldown(24)
    },

]
export default TutorialsInLibrary