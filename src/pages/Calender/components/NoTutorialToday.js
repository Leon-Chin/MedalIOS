import { Text, View } from "react-native";
import SIZE from "../../../constants/SIZE";
import COLORS from "../../../constants/COLORS";
import useUserTheme from "../../../hooks/useUserTheme";
import APPTHEME from "../../../constants/COLORS/APPTHEME";
import { useIntl } from "react-intl";
import NoArrangement from "../../../components/NoArrangement";

const NoTutorialToday = () => {
    const { formatMessage } = useIntl()
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (<View style={{ backgroundColor: currentTheme.contentColor, marginBottom: 10, borderRadius: SIZE.CardBorderRadius }}>
        <NoArrangement />
        <View style={{ paddingHorizontal: 30, paddingBottom: SIZE.NormalMargin }}>
            <Text style={{ fontSize: 16, color: COLORS.gray }}>{formatMessage({ id: 'app.calendar.noCurrentTut' })}</Text>
        </View>
    </View>)
}

export default NoTutorialToday