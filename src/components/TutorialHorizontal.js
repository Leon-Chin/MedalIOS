import React from 'react'
import { Alert, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/COLORS';
import { useNavigation } from '@react-navigation/native';
import SIZE from '../constants/SIZE';
import { ICON } from '../constants/SVG/ICON';
import { createsession } from '../api/session.api';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../redux/userSlice';
import { setSessions } from '../redux/SessionSlice';
import useIsTutorialHasAlr from '../hooks/useIsTutorialHasAlr';
import useUserTheme from '../hooks/useUserTheme';
import APPTHEME from '../constants/COLORS/APPTHEME';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { ERROR_Alert, INFO_Alert } from '../constants/ERRORMessage';
import useUserLocale from '../hooks/useUserLocale';
import { useIntl } from 'react-intl';
const TutorialHorizontal = ({ tutorial, withCalender }) => {
    const { formatMessage } = useIntl()
    const { userSelectDay } = useSelector(state => state.calendar)
    const locale = useUserLocale()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const { cover, level, lowerEstimateColorie, higherEstimateColorie, name, zh_name, duration, _id } = tutorial
    const isTodayHasAlr = useIsTutorialHasAlr(_id)

    const handleAddToCalendar = async () => {
        if (isTodayHasAlr) {
            Toast.show(INFO_Alert(formatMessage({ id: 'info.tut.added' })));
        } else {
            const newSession = {
                date: new Date(userSelectDay),
                tutorial: _id,
            }
            await createsession(newSession).then(res => {
                if (res.status === false) {
                    Toast.show(ERROR_Alert(formatMessage({ id: "error.errorMsg" })));
                } else {
                    dispatch(loginSuccess(res.user))
                    dispatch(setSessions(res.updatedSessions))
                }
            })
        }
    }
    return (
        <TouchableOpacity
            onPress={() => navigate('SpecificTutorial', { tutorial })}
            style={{
                borderRadius: SIZE.CardBorderRadius,
                backgroundColor: currentTheme.contentColor,
                overflow: 'hidden',
                marginBottom: SIZE.NormalMargin,
                alignItems: 'center',
                gap: 10,
                padding: 10,
                flexDirection: 'row'
            }}
        >
            <>
                <ImageBackground
                    source={{ uri: cover }}
                    style={{
                        borderRadius: SIZE.CardBorderRadius, overflow: 'hidden',
                        height: 50,
                        width: 50,
                    }}>
                </ImageBackground>
                <View
                    style={{
                        flex: 1,
                        padding: 4,
                    }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 10, color: currentTheme.fontColor }}>
                        {locale === "en" ? name : zh_name}
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 6 }}>
                        <Text style={{ color: COLORS.commentText }}>{level}</Text>
                        <Text style={{ color: COLORS.commentText }}>{duration} {formatMessage({ id: 'app.tut.durationUnit' })}</Text>
                        <Text style={{ color: COLORS.commentText }}>{lowerEstimateColorie}-{higherEstimateColorie} {formatMessage({ id: 'app.tut.calorieUnit' })}</Text>
                    </View>
                </View>
            </>
            {withCalender && <TouchableOpacity
                onPress={handleAddToCalendar}
            >
                {ICON.addToCalender(22, COLORS.commentText)}
            </TouchableOpacity>}
        </TouchableOpacity >
    )
}

export default TutorialHorizontal