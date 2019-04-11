import React, { useEffect, useState } from 'react'
import {
  Animated,
  UIManager,
  LayoutAnimation,
  TouchableWithoutFeedback,
  View
} from 'react-native'
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

export const withFade = WrappedComponent => props => {
  const [shouldShow, setShouldShow] = useState(props.show)
  const [driver] = useState(new Animated.Value(0))

  const opacity = driver.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  })

  const springLayout = {
    duration: 400,
    create: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.scaleXY,
      springDamping: 0.7
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 0.7
    }
  }

  useEffect(
    () => {
      if (!props.show) {
        Animated.timing(driver, {
          duration: 500,
          toValue: 0,
          useNativeDriver: true
        }).start(() => {
          LayoutAnimation.configureNext(springLayout)
          if (props.shouldRemoveSelf) {
            props.readyToRemove && props.readyToRemove(props.id)
          } else {
            setShouldShow(false)
          }
        })
      } else {
        LayoutAnimation.configureNext(springLayout)
        setShouldShow(true)
        Animated.timing(driver, {
          duration: 500,
          toValue: 1,
          useNativeDriver: true
        }).start()
      }
    },
    [props.show]
  )

  return shouldShow ? (
    <Animated.View style={[{ opacity }]}>
      <WrappedComponent {...props} />
    </Animated.View>
  ) : null
}
