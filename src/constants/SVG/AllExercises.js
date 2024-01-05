import EXERCISETYPE from '../EXERCISETYPE';
import { exerciseLogo } from './ExerciseLogo';
const Exercises = (formatMessage) => [
    {
        name: formatMessage({ id: 'app.dashboard.run' }),
        value: 'run',
        icon: exerciseLogo.run(30)
    },
    {
        name: formatMessage({ id: 'app.dashboard.walk' }),
        value: 'walk',
        icon: exerciseLogo.walk(30)
    },
    {
        name: formatMessage({ id: 'app.dashboard.burn' }),
        value: EXERCISETYPE.burning.value,
        icon: exerciseLogo.lose(30)
    },
    
    {
        name: formatMessage({ id: 'app.dashboard.yoga' }),
        value: EXERCISETYPE.yoga.value,
        icon: exerciseLogo.yoga(30)
    },
    {
        name: formatMessage({ id: 'app.dashboard.strength' }),
        value: EXERCISETYPE.strength.value,
        icon: exerciseLogo.yoga(30)
    },
    ]
    export default Exercises
