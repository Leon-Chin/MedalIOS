import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
export const exerciseLogo = {
    rope: (size) => <MaterialCommunityIcons name="jump-rope" size={size} color="#fff" />,
    yoga: (size) => <MaterialCommunityIcons name="yoga" size={size} color="#fff" />,
    cycling: (size) => <Ionicons name="md-bicycle-sharp" size={size} color="#fff" />,
    lose: (size) => <FontAwesome5 name="weight" size={size} color="#fff" />,
    strength: (size) => <MaterialCommunityIcons name="weight-lifter" size={size} color="#fff" />
}
const TutorialsInLibrary = [
    {
        name: 'Rope',
        icon: exerciseLogo.rope(30)
    },
    {
        name: 'Yoga',
        icon: exerciseLogo.yoga(30)
    },
    {
        name: 'Cycling',
        icon: exerciseLogo.cycling(30)
    },
    {
        name: 'Burning',
        icon: exerciseLogo.lose(24)
    },
    {
        name: 'Strength',
        icon: exerciseLogo.strength(30)
    },

]
export default TutorialsInLibrary