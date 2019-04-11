import React, { Component } from 'react'
import {
  Platform,
  Dimensions,
  Animated,
  StyleSheet,
  Text,
  StatusBar,
  Easing,
  TouchableOpacity,
  View
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

type Props = {}
export default class App extends Component<Props> {
  state = {
    end: false,
    driver: new Animated.Value(0),
    target: {
      x: 0,
      y: 0
    }
  }
  startAnimation = () => {
    Animated.timing(this.state.driver, {
      duration: 500,
      toValue: this.state.end ? 0 : 1,
      easing: Easing.ease,
      useNativeDriver: true
    }).start(() => this.setState(prev => ({ end: !prev.end })))
  }

  render () {
    const { width: screenWidth, height: screenHeight } = Dimensions.get(
      'window'
    )
    const width = screenWidth * 2
    const height = (screenHeight - StatusBar.currentHeight) * 2
    const radius = 100
    const translateX = this.state.driver.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.state.target.x - screenWidth / 2]
    })
    const translateY = this.state.driver.interpolate({
      inputRange: [0, 1],
      outputRange: [
        0,
        this.state.target.y - (screenHeight - StatusBar.currentHeight) / 2
      ]
    })
    return (
      <View style={styles.container}>
        <Animated.View
          pointerEvents='none'
          style={[
            { position: 'absolute', zIndex: 1 },
            { transform: [{ translateX }, { translateY }] }
          ]}
        >
          <Svg height={height} width={width}>
            <Path
              d={`M0 0 L${width} 0 L${width} ${height} L0 ${height} L0 0 Z M${(width -
                radius) /
                2} ${height /
                2} a1 1 0 1 0 ${radius} 0 a1 1 0 1 0 -${radius} 0`}
              fill='#303030A0'
              stroke='none'
            />
          </Svg>
        </Animated.View>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <TouchableOpacity
          onLayout={({ nativeEvent }) => {
            console.log(nativeEvent.layout)
            this.setState({
              target: {
                x: nativeEvent.layout.x + nativeEvent.layout.width / 2,
                y: nativeEvent.layout.y + nativeEvent.layout.height / 2
              }
            })
          }}
          onPress={this.startAnimation}
          style={{
            width: 110,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 150,
            marginLeft: 200,
            backgroundColor: 'tomato'
          }}
        >
          <Text>Touch Me!</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'blue'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})
