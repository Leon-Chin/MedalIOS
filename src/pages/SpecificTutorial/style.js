import { Dimensions, StyleSheet } from 'react-native'
import COLORS from '../../constants/COLORS'
import SIZE from '../../constants/SIZE'
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    navigationBar: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        position: 'absolute',
        top: 50,
        width: width - 44,
        zIndex: 999
    },
    btn: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        aspectRatio: 1,
        resizeMode: 'cover'
    },
    details: {
        flex: 1,
        marginTop: -50,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        width: width,
        backgroundColor: '#fff',
        paddingHorizontal: 16
    },
    tutorialIntro: {
        paddingVertical: 10,
        backgroundColor: COLORS.backgroundGray,
        paddingHorizontal: SIZE.NormalMargin,
        borderRadius: SIZE.CardBorderRadius,
        marginBottom: SIZE.NormalMargin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tutorialIntroLeft: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    tutorialIntroRight: {
        display: 'flex',
        flexDirection: 'row',
    },
    commentText: {
    },
    tutorialDescription: {
        textAlign: 'justify',
        marginBottom: 10
    },
    estimateColorie: {
        paddingVertical: 10,
        paddingHorizontal: 4,
        backgroundColor: 'rgba(93, 142, 242, 0.1)',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    equipments: {
        flexDirection: 'row',
        marginBottom: 10
    },
    BottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 999,
        height: 70,
        width: '100%',
        alignItems: 'center'
    },
    startBtn: {
        height: 46,
        width: '80%',
        borderRadius: 20,
        marginTop: 6,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    }
})
export default styles