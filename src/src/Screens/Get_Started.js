import React from "react";
import { 
    Image, 
    Pressable, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View 
} from "react-native";

import Top_Circle from "../utils/Top_Circles";
import Bottom_Circle from "../utils/Bottom_Circles";
import {COLORS} from "../utils/COLORS";

export default function Get_Started ({ navigation }) {
    
    // Handles the 'Get Started' button press
    const onPressFunction = () => {
        navigation.navigate('Sign Up');
    }
    
    return(
        <SafeAreaView style = {{flex: 1, backgroundColor: '#ffffff'}}>
            <View style = {styles.body}>
                <Image
                    style = {styles.image}  
                    source={require('../../assets/GetStarted.png')}
                />
                <Text style = {styles.text}>Financial</Text>
                <Text style = {styles.text}>Fellows</Text>
                <Pressable
                    onPress={onPressFunction}
                    style = {( {pressed} ) => [ {backgroundColor: pressed ? COLORS.secondary : COLORS.primary}, styles.button ]}
                    android_ripple={{color: COLORS.primary}}
                >
                    <Text style = {styles.buttonText}>Get Started</Text>
                </Pressable>
            </View>
            <View style = {{position: 'absolute'}}><Top_Circle/></View>
            <View><Bottom_Circle/></View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    body: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
    },
    image: {
        width: '80%',
        height: '21%',
        marginTop: -30,
        marginBottom: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 35,
        color: COLORS.primary,
        fontFamily: 'Judson-Bold',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 26,
        color: COLORS.white,
        fontFamily: 'Judson-Bold',
        alignItems: 'center'
    },
    button: {
        width: '80%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    }
})