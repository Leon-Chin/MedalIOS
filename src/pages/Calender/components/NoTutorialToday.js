import { Text, View } from "react-native";
import SIZE from "../../../constants/SIZE";
import COLORS from "../../../constants/COLORS";
import useUserTheme from "../../../hooks/useUserTheme";
import APPTHEME from "../../../constants/COLORS/APPTHEME";

const NoTutorialToday = () => {
    const theme = useUserTheme()
    const currentTheme = APPTHEME[theme]
    return (<View style={{ backgroundColor: currentTheme.contentColor, marginBottom: 10, padding: 30, borderRadius: SIZE.CardBorderRadius }}>
        <Text style={{ fontSize: 16, color: COLORS.gray }}>暂无课程, 您可在下方精选中挑选课程, 也可以问助手</Text>
    </View>)
}

export default NoTutorialToday