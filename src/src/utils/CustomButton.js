import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
  } from 'react-native';
  import {COLORS} from "../utils/COLORS";


  export default function CustomButton ({value, onPress, type}) {
    return (
        <Pressable
          onPress={onPress}
          style = {( {pressed} ) => [ {opacity: pressed ? .3 : 1}, styles.button, styles[`${type}Button`] ]}          
        >
          <Text style = {[styles.text, styles[`${type}Text`]]}>{value}</Text>
        </Pressable>
    )
  }

  const styles = StyleSheet.create ({
    button: {
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    PRIMARYButton: {
        backgroundColor: COLORS.primary,
    },
    SECONDARYButton: {
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    TERTIARYButton: {

    },

    text: {
        fontSize: 25,
        fontFamily: 'Judson-Bold',
        alignItems: 'center',
    },
    PRIMARYText: {
        color: COLORS.white,
    },
    SECONDARYText: {
        color: COLORS.primary,
    },
    TERTIARYText:  {
        color: COLORS.primary,
        fontSize: 20
    },
  })