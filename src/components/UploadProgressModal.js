import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import PurePercentageLine from "./PurePercentageLine";
import COLORS from "../constants/COLORS";

const UploadProgressModal = ({ visible, progress }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {progress < 1 ? <ActivityIndicator size="large" color={COLORS.primary} /> :
                        <PurePercentageLine currentValue={progress} />}
                    <Text style={styles.modalText}>上传中... {progress}%</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginTop: 15,
        textAlign: "center"
    }
});

export default UploadProgressModal