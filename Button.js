import React from 'react'
import styled from 'styled-components'

const Container = styled.TouchableOpacity`
  background-color: palegreen;
  align-items: center;
  justify-content: center;
  padding: 12px 25px;
  max-width: 250px;
  border-radius: 3px;
  margin: 4px;
`

const Label = styled.Text`
  color: #008040;
  font-size: 16px;
`

const Button = props => {
  return (
    <Container activeOpacity={0.9} onPress={props.onPress}>
      <Label>{props.label}</Label>
    </Container>
  )
}

export default Button
