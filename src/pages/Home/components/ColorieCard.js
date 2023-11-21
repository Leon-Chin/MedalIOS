import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../../constants/COLORS';
import { ICON } from '../../../constants/SVG/ICON';
import useHealthKit from '../../../hooks/useHealthkit';

const ColorieCard = () => {
    const { navigate } = useNavigation()
    const { calorie } = useHealthKit()
    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'coloumn',
                height: 80,
                paddingVertical: 6,
                paddingHorizontal: 10,
                backgroundColor: '#fff',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: 10,
            }}>
            <View style={{ height: 30, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    {ICON.fire(16, COLORS.colorieOrange)}
                    <Text style={{ fontWeight: "bold", color: COLORS.colorieOrange, fontSize: 16 }}>Calorie</Text>
                </View>
                <TouchableOpacity
                    style={{ justifyContent: 'center', alignItems: 'center', width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.colorieOrangeBackground }}
                    onPress={() => navigate('Statistics')}
                >
                    {ICON.right(18, COLORS.colorieOrange)}
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, width: '100%', paddingHorizontal: '6%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{calorie}</Text>
                    <Text style={{ color: COLORS.commentText, fontSize: 16, fontWeight: 'bold' }}>kcal</Text>
                </View>
            </View>
        </View>
    );
};
export default ColorieCard