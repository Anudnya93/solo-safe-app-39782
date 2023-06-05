import React, { useEffect } from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { persistor, store } from './store'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AppNavigation } from './navigation'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
