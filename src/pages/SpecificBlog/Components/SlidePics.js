import { View, Animated, Image, StyleSheet, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import SlideItem from './SlideItem'
import Pagination from './Pagination'

const SlidePics = ({ imgs }) => {
    const [index, setIndex] = useState(0)
    const scrollX = useRef(new Animated.Value(0)).current

    const handleOnScroll = (event) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX
                        }
                    }
                }
            ],
            { useNativeDriver: false }
        )(event)
    }
    const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
        setIndex(viewableItems[0].index)
    }).current

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current
    return (
        <View style={styles.container}>
            {imgs.length !== 0 && <FlatList
                data={imgs}
                renderItem={({ item, index }) => <SlideItem key={index} img={item} />}
                horizontal
                pagingEnabled
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />}
            {imgs.length !== 1 && <Pagination imgs={imgs} scrollX={scrollX} index={index} />}
        </View>
    )
}

export default SlidePics
const styles = StyleSheet.create({

})