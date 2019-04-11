import React, { useState, useImperativeHandle, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Animated, Easing, TouchableWithoutFeedback } from 'react-native'
import { BlurView } from '@react-native-community/blur'

const Container = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`

const ListContainer = styled(Animated.View)`
  height: 450px;
  position: absolute;
  bottom: -292px;
  width: 100%;
  padding: 4px;
  background-color: white;
  box-shadow: 2px 2px 2px #80808080;
`

const List = styled.ScrollView`
  flex: 1;
`

const ScrollContainer = styled.View`
  height: 150px;
`

const ItemContainer = styled.View`
  background-color: #dadada;
  margin: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`

const ItemText = styled.Text`
  color: #363534;
  font-size: 24px;
`

const DismissTouchable = styled(Animated.createAnimatedComponent(BlurView))`
  flex: 1;
  background-color: #00000080;
`

const Item = props => (
  <ItemContainer>
    <ItemText>{props.children}</ItemText>
  </ItemContainer>
)

const usePrevious = value => {
  const previous = useRef()
  useEffect(
    () => {
      previous.current = value
    },
    [value]
  )
  return value
}

const Picker = (props, ref) => {
  const [driver, setDriver] = useState(() => new Animated.Value(0))
  const [animating, setAnimating] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pointerEvents, setPointerEvents] = useState('none')
  const prev = usePrevious({ visible: props.visible })

  const togglePicker = () => {
    if (animating) return
    setAnimating(true)
    Animated.timing(driver, {
      duration: 600,
      toValue: visible ? 0 : 1,
      easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
      useNativeDriver: true
    }).start(() => {
      setAnimating(false)
      setVisible(prev => !prev)
    })
  }

  useEffect(
    () => {
      if (visible && pointerEvents !== 'auto') {
        setPointerEvents('auto')
      } else if (pointerEvents !== 'none') {
        setPointerEvents('none')
      }

      if (prev.visible !== props.visible) {
        togglePicker()
      }
    },
    [visible, props.visible]
  )

  useImperativeHandle(ref, () => ({ togglePicker }))

  const translateY = driver.interpolate({
    inputRange: [0, 1],
    outputRange: [450, 0]
  })

  const opacity = driver.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })

  return (
    <>
      <ListContainer
        style={[{ transform: [{ translateY }] }, { opacity }, { elevation: 4 }]}
      >
        <ScrollContainer>
          <List showsVerticalScrollIndicator={false} bounces={false}>
            {props.data.map(item => (
              <Item key={item}>{item}</Item>
            ))}
          </List>
        </ScrollContainer>
      </ListContainer>
      <TouchableWithoutFeedback enabled={visible} onPress={togglePicker}>
        <Container
          pointerEvents={pointerEvents}
          style={[{ opacity }, { elevation: 3 }]}
        >
          <DismissTouchable
            viewRef={props.viewRef.current}
            blurType='light'
            blurAmount={16}
            style={[{ opacity }]}
          />
        </Container>
      </TouchableWithoutFeedback>
    </>
  )
}

export default React.forwardRef(Picker)
