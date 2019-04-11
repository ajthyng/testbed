import React, { useState } from 'react'
import { StyleSheet, YellowBox } from 'react-native'
import styled from 'styled-components'
import Button from './Button'
import Circle from './Circle'
import { withFade } from './animations'

YellowBox.ignoreWarnings(['unknown call'])

const Container = styled.View`
  background-color: #202020;
  flex: 1;
  align-items: center;
  justify-content: space-around;
`

const FlatList = styled.FlatList`
  flex: 1;
  width: 100%;
`

const Buttons = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

let keyCount = 0
const makeItem = () => {
  const key = String(keyCount)
  keyCount++
  return {
    key,
    show: true,
    removeSelf: false
  }
}

const App = props => {
  const [data, setData] = useState(() => [makeItem(), makeItem(), makeItem()])
  const toggleListItem = index => () => {
    data[index].show = !data[index].show
    setData([...data])
  }
  const renderItem = ({ item, index }) => {
    return (
      <Circle
        id={index}
        label={item.key}
        diameter={50}
        show={item.show}
        shouldRemoveSelf={item.removeSelf}
        readyToRemove={id => {
          data.splice(id, 1)
          setData([...data])
        }}
        onPress={toggleListItem(index)}
      />
    )
  }

  const forRealRemove = index => {
    data.splice(index, 1)
    setData([...data])
  }

  return (
    <Container>
      <FlatList
        contentContainerStyle={{
          padding: 10,
          backgroundColor: '#808080'
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={({ key }) => key}
      />
      <Buttons>
        <Button
          label='All Visible'
          onPress={() => setData(data.map(item => ({ ...item, show: true })))}
        />
        <Button
          label='Add Circle'
          onPress={() => setData([...data, makeItem()])}
        />
        <Button
          label='Remove Random'
          onPress={() => {
            let index = Math.floor(Math.random() * data.length)
            while (data.length && !data[index].show) {
              index = Math.floor(Math.random() * data.length)
            }
            data[index].show = false
            data[index].removeSelf = true
            setData([...data])
          }}
        />
      </Buttons>
    </Container>
  )
}

export default App
