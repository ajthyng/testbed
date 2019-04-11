import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { findNodeHandle } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Picker from './Picker'

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Button = styled.TouchableOpacity`
  padding: 12px 20px;
  background-color: tomato;
  elevation: 2;
`

const Text = styled.Text`
  color: #363534;
  font-size: 24px;
`

const Image = styled.Image``

const App = () => {
  const [visible, setVisible] = useState(false)
  const toBlur = useRef()
  const img = useRef()
  const picker = useRef()

  useEffect(() => {
    toBlur.current = findNodeHandle(img.current)
  }, [])

  return (
    <>
      <Image
        ref={img}
        source={{
          uri:
            'https://images.unsplash.com/photo-1506506447188-78e2a1051d9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80'
        }}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
      />
      <Container>
        <Button onPress={() => picker.current.togglePicker()}>
          <Text>Test</Text>
        </Button>
        <Picker
          viewRef={toBlur}
          style={{ zIndex: 150 }}
          ref={picker}
          data={['one', 'two', 'three', 'four', 'five', 'six']}
        />
      </Container>
    </>
  )
}

export default App
