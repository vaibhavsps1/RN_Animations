import React, {useState, useEffect} from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

const radius = 10;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },

  ripple: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    overflow: 'hidden',
    position: 'absolute',
  },
});

const Ripple = ({
  rippleColor = 'rgb(0, 0, 0)',
  rippleOpacity = 0.3,
  rippleDuration = 400,
  rippleSize = 0,
  rippleContainerBorderRadius = 0,
  rippleCentered = false,
  rippleSequential = false,
  rippleFades = true,
  disabled = false,
  displayUntilPressOut = false,
  onRippleAnimation = (animation, callback) => animation.start(callback),
  ...props
}) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [ripples, setRipples] = useState([]);
  const [isPressingIn, setIsPressingIn] = useState(false);
  const [animationWaitingForEnd, setAnimationWaitingForEnd] = useState(false);

  useEffect(() => {
    return () => setRipples([]);
  }, []);

  const onPress = event => {
    if (props.onPress) {
      requestAnimationFrame(() => props.onPress(event));
    }
  };

  const onLongPress = event => {
    if (props.onLongPress) {
      requestAnimationFrame(() => props.onLongPress(event));
    }
    startRipple(event);
  };

  const onPressIn = event => {
    setIsPressingIn(true);
    if (!rippleSequential || !ripples.length) {
      if (props.onPressIn) {
        props.onPressIn(event);
      }
      startRipple(event);
    }
  };

  const onPressOut = event => {
    if (props.onPressOut) {
      props.onPressOut(event);
    }
    signalAnimationEnd();
    setIsPressingIn(false);
  };

  const onAnimationEnd = () => {
    if (displayUntilPressOut && isPressingIn) {
      setAnimationWaitingForEnd(true);
      return;
    }
    forceAnimationEnd();
  };

  const signalAnimationEnd = () => {
    if (animationWaitingForEnd) {
      forceAnimationEnd();
    }
  };

  const forceAnimationEnd = () => {
    setRipples(ripples.slice(1));
    setAnimationWaitingForEnd(false);
  };

  const startRipple = event => {
    let w2 = 0.5 * width;
    let h2 = 0.5 * height;

    let {locationX, locationY} = rippleCentered
      ? {locationX: w2, locationY: h2}
      : event.nativeEvent;

    let offsetX = Math.abs(w2 - locationX);
    let offsetY = Math.abs(h2 - locationY);

    let R =
      rippleSize > 0
        ? 0.5 * rippleSize
        : Math.sqrt(Math.pow(w2 + offsetX, 2) + Math.pow(h2 + offsetY, 2));

    let newRipple = {
      unique: ripples.length,
      progress: new Animated.Value(0),
      locationX,
      locationY,
      R,
    };

    let animation = Animated.timing(newRipple.progress, {
      toValue: 1,
      easing: Easing.out(Easing.ease),
      duration: rippleDuration,
      useNativeDriver: true,
    });

    onRippleAnimation(animation, onAnimationEnd);

    setRipples([...ripples, newRipple]);
  };

  const renderRipple = ({unique, progress, locationX, locationY, R}) => {
    let rippleStyle = {
      top: locationY - radius,
      left: locationX - radius,
      backgroundColor: rippleColor,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5 / radius, R / radius],
          }),
        },
      ],
      opacity: rippleFades
        ? progress.interpolate({
            inputRange: [0, 1],
            outputRange: [rippleOpacity, 0],
          })
        : rippleOpacity,
    };

    return <Animated.View style={[styles.ripple, rippleStyle]} key={unique} />;
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      disabled={disabled}
      {...props}>
      <View {...props} pointerEvents="box-only" style={{overflow: 'hidden'}}>
        {props.children}
        <View
          style={[
            styles.container,
            {borderRadius: rippleContainerBorderRadius},
          ]}
          onLayout={event => {
            setWidth(event.nativeEvent.layout.width);
            setHeight(event.nativeEvent.layout.height);
          }}>
          {ripples.map(renderRipple)}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Ripple;
