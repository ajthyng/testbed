import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'
import { withFade } from './animations'

const Container = styled.View`
  width: ${({ diameter }) => diameter}px;
  height: ${({ diameter }) => diameter}px;
  border-radius: ${({ diameter }) => diameter / 2}px;
  background-color: palevioletred;
  align-self: center;
  align-items: center;
  justify-content: center;
`

const Label = styled.Text`
  font-size: 14px;
  color: white;
`

const Circle = React.memo(
  ({ diameter, onPress, label }) => {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Container diameter={diameter}>
          <Label>{label}</Label>
        </Container>
      </TouchableWithoutFeedback>
    )
  },
  () => true
)

export default withFade(Circle)
