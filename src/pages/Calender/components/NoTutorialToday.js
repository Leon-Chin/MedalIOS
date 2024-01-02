import { Text, View } from "react-native";
import SIZE from "../../../constants/SIZE";
import COLORS from "../../../constants/COLORS";
import useUserTheme from "../../../hooks/useUserTheme";
import APPTHEME from "../../../constants/COLORS/APPTHEME";
import { useIntl } from "react-intl";

const NoTutorialToday = () => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (<View style={{ backgroundColor: currentTheme.contentColor, marginBottom: 10, padding: 30, borderRadius: SIZE.CardBorderRadius }}>
        <Text style={{ fontSize: 16, color: COLORS.gray }}>{formatMessage({ id: 'app.calendar.noCurrentTut' })}</Text>
    </View>)
}

export default NoTutorialToday