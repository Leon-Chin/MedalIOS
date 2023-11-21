import React from 'react'
import {

    StyleSheet,
    Text,
} from 'react-native';
const Label = ({ children }) => <Text style={styles.label}>{children}</Text>;
const styles = StyleSheet.create({
    label: { fontSize: 20, fontWeight: '700', marginVertical: 10 },
});
export default Label