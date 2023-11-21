import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
export const exerciseLogo = {
    run: (size) => <FontAwesome5 name="running" size={size} color="#fff" />,
    rope: (size) => <MaterialCommunityIcons name="jump-rope" size={size} color="#fff" />,
    walk: (size) => <MaterialIcons name="directions-walk" size={size} color="#fff" />,
    yoga: (size) => <MaterialCommunityIcons name="yoga" size={size} color="#fff" />,
}
const Exercises = [
    {
        name: 'Run',
        icon: exerciseLogo.run(30)
    },
    {
        name: 'Rope',
        icon: exerciseLogo.rope(30)
    },
    {
        name: 'Walk',
        icon: exerciseLogo.walk(30)
    },
    {
        name: 'Yoga',
        icon: exerciseLogo.yoga(30)
    },
]
export default Exercises