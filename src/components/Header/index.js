import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import HeaderText from '../HeaderText'

const Header = ({ title, leftIcon, leftHandler }) => {
  return (
    <>
      <View style={[styles.container, leftIcon ? styles.spaceBetween : null]}>
        {leftIcon && (
          <TouchableOpacity onPress={leftHandler} style={styles.iconContainer}>
            {leftIcon}
          </TouchableOpacity>
        )}
        <HeaderText style={styles.textStyle}>{title}</HeaderText>
        {leftIcon && <View style={styles.dummy} />}
      </View>
    </>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  spaceBetween: { justifyContent: 'space-between' },
  textStyle: {
    alignSelf: 'center',
    marginVertical: 20
  },
  dummy: {
    width: 24
  },
  iconContainer: {
    position: 'relative',
    top: 19
  },
  logoStyle: {
    position: 'absolute',
    top: 5,
    right: 0
  }
})
