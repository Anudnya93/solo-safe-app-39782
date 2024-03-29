import {
  CardStyleInterpolators,
  createStackNavigator
} from '@react-navigation/stack'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Login, Home } from '../screens'
import Landing from '../screens/Auth/_landing'

const Stack = createStackNavigator()

export const AppNavigation = () => {
  const isLoggedIn = useSelector(reducer => {
    const token = reducer.loginReducer?.loginData?.data?.token
    return token
  })

  const renderAuthStack = () => {
    return (
      <>
        <Stack.Screen name="landing" component={Landing} />
      </>
    )
  }
  const renderCommonStack = () => {
    return (
      <>
        <Stack.Screen name="Home" component={Home} />
      </>
    )
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      {!isLoggedIn ? renderAuthStack() : renderCommonStack()}
    </Stack.Navigator>
  )
}
