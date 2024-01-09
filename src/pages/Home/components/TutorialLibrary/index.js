import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Label from '../../../../components/Label'
import TutorialVerticalView from '../../../../components/TutorialVerticalView'
import { getalltutorial } from '../../../../api/user.api'
import { useNavigation } from '@react-navigation/native'
import COLORS from '../../../../constants/COLORS'
import { useIntl } from 'react-intl'
import SIZE from '../../../../constants/SIZE'
import Loading from '../../../../components/Loading'

const TutorialLibrary = () => {
    const { formatMessage } = useIntl()
    const [tutorials, setTutorials] = useState([])
    const { navigate } = useNavigation()

    const getLibs = async (type) => {
        await getalltutorial().then(res => {
            setTutorials(res)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getLibs()
    }, [])
    if (tutorials.length === 0) {
        // loading
        return <View style={{ marginTop: SIZE.NormalMargin, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Loading />
            <Text style={{ color: COLORS.commentText }}>{formatMessage({ id: 'loading' })}</Text>
        </View>
    } else {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <Label>{formatMessage({ id: 'app.tut.selected' })}</Label>
                    <Pressable onPress={() => navigate('AllTutorials')}>
                        <Text style={{ opacity: 0.5, fontSize: 12, color: COLORS.commentText }}>{formatMessage({ id: 'app.viewAll' })}</Text>
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FlatList
                        data={tutorials}
                        renderItem={({ item, index }) => <View style={{ width: 300 }}><TutorialVerticalView key={index} tutorial={item} /></View>}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ columnGap: 10 }}
                    />
                </View>
            </>
        )
    }
}

const data = [
    1, 2, 3, 4, 5
];
export default TutorialLibrary

const styles = StyleSheet.create({})