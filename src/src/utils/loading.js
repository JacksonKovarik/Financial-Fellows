import { ActivityIndicator, View } from "react-native";
import { COLORS } from "./COLORS";


export default function Loading({color=COLORS.primary}) {
    return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={color} />
        </View>
    )
}