import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../../constants/COLORS';
import { ICON } from '../../../constants/SVG/ICON';
import useHealthKit from '../../../hooks/useHealthkit';

const DistanceCounter = () => {
    const { navigate } = useNavigation()
    const { distance } = useHealthKit()
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
                    {ICON.distanceIcon(16, COLORS.colorieOrange)}
                    <Text style={{ fontWeight: "bold", color: COLORS.colorieOrange, fontSize: 16 }}>Distance</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigate('Statistics')}
                    style={{ justifyContent: 'center', alignItems: 'center', width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.colorieOrangeBackground }}
                >
                    {ICON.right(18, COLORS.colorieOrange)}
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, width: '100%', paddingHorizontal: '6%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{(distance / 1000).toFixed(2)}</Text>
                    <Text style={{ color: COLORS.commentText, fontSize: 16, fontWeight: 'bold' }}>km</Text>
                </View>
            </View>
        </View>
    );
};
export default DistanceCounter