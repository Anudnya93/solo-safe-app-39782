import React from 'react'
import { StatusBar, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '../Header'
import styles from './style'
import { useColors } from '../../theme/colors'

const BaseScreen = ({
  bounces = false,
  children,
  onIconPress,
  title,
  header,
  leftIcon,
  containerStyle,
  parentStyle,
  style,
  ...rest
}) => {
  const colors = useColors()
  return (
    <View style={[styles.container, parentStyle]}>
      {header && (
        <Header
          leftHandler={onIconPress ?? null}
          title={title}
          leftIcon={leftIcon}
        />
      )}
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.KeyboardAvoidingViewContainerStyle,
          containerStyle
        ]}
        style={[styles.KeyboardAvoidingView, style]}
        bounces={bounces}
        extraScrollHeight={100}
        {...rest}
      >
        <StatusBar
          barStyle={
            colors.primary === 'white' ? 'dark-content' : 'light-content'
          }
          backgroundColor={colors.primary}
        />
        <View>{children}</View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default BaseScreen
