import EXERCISETYPE from '../EXERCISETYPE';
import { exerciseLogo } from './ExerciseLogo';
const Exercises = [
    {
        name: 'Run',
        value: 'run',
        icon: exerciseLogo.run(30)
    },
    {
        name: 'Walk',
        value: 'walk',
        icon: exerciseLogo.walk(30)
    },
    {
        name: 'Burning',
        value: EXERCISETYPE.burning.value,
        icon: exerciseLogo.lose(30)
    },
    {
        name: 'Yoga',
        value: EXERCISETYPE.yoga.value,
        icon: exerciseLogo.yoga(30)
    },
    {
        name: 'Strength',
        value: EXERCISETYPE.strength.value,
        icon: exerciseLogo.yoga(30)
    },
]
export default Exercises
