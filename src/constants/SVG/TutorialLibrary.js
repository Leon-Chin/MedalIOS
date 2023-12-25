import EXERCISETYPE from '../EXERCISETYPE';
import { ICON } from './ICON';
import COLORS from '../COLORS';
import { exerciseLogo } from './ExerciseLogo';

const TutorialsInLibrary = (formatMessage) => [
    {
        name: formatMessage({ id: 'app.tut.name.all' }),
        value: "all",
        icon: ICON.all(30, COLORS.white)
    },
    {
        name: formatMessage({ id: 'app.tut.name.star' }),
        value: "recommand",
        icon: ICON.personalize(30, COLORS.white)
    },
    {
        name: 'Rope',
        value: EXERCISETYPE.rope.value,
        icon: exerciseLogo.rope(30)
    },
    {
        name: formatMessage({ id: 'app.tut.name.yoga' }),
        value: EXERCISETYPE.yoga.value,
        icon: exerciseLogo.yoga(30)
    },
    {
        name: formatMessage({ id: 'app.tut.name.cycling' }),
        value: EXERCISETYPE.spinning.value,
        icon: exerciseLogo.cycling(30)
    },
    {
        name: formatMessage({ id: 'app.tut.name.burning' }),
        value: EXERCISETYPE.burning.value,
        icon: exerciseLogo.lose(24)
    },
    {
        name: formatMessage({ id: 'app.tut.name.strength' }),
        value: EXERCISETYPE.strength.value,
        icon: exerciseLogo.strength(30)
    },
    {
        name: formatMessage({ id: 'app.tut.name.strech' }),
        value: EXERCISETYPE.warmup.value,
        icon: exerciseLogo.warmup(24)
    },
    {
        name: formatMessage({ id: 'app.tut.name.relax' }),
        value: EXERCISETYPE.cooldown.value,
        icon: exerciseLogo.cooldown(24)
    },

]
export default TutorialsInLibrary