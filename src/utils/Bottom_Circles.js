import React from 'react';
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from 'react-native';
import { COLORS } from './COLORS';

const Bottom_Circle = () => {
    return (
        <SafeAreaView style = {{flex: 1,}}>
            <View style = {styles.container}>
                
                <View style = {styles.circle3} opacity = {.30}/>
                <View style = {styles.circle2} opacity = {.30}/> 
                <View style = {styles.circle1} opacity = {.30}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle1: {
        width: 180,
        height: 180,
        borderRadius: 180/2,
        backgroundColor: COLORS.primary,
        position: 'absolute',
        right: 40,
        bottom: -90,
    },
    circle2: {
        width: 190,
        height: 190,
        borderRadius: 190/2,
        backgroundColor: COLORS.secondary,
        position: 'absolute',
        right: -95,
        bottom: -20,
    },
    circle3: {
        width: 160,
        height: 160,
        borderRadius: 160/2,
        backgroundColor: COLORS.primary,
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    
    
    
})

export default Bottom_Circle;