import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from './Navigation/Navigator'

const App = () => {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  )
}

export default App