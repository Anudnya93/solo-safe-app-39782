import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from '../../components/Icon'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Icon name="cross" family="entypo" />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})
