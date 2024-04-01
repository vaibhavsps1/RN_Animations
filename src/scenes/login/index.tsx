import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Animated,
  Dimensions,
  Easing,
  TextInput,
} from 'react-native';
import Ripple from './Ripple';

const {width} = Dimensions.get('window');

const EXPANDED_BUTTON_WIDTH = width - 100;
const COLLAPSED_BUTTON_WIDTH = 40;

const AnimatedRipple = Animated.createAnimatedComponent(Ripple);

const Login = () => {
  const [buttonWidth] = useState(new Animated.Value(EXPANDED_BUTTON_WIDTH));
  const [opacity] = useState(new Animated.Value(1));
  const [loaderOpacity] = useState(new Animated.Value(0));
  const [buttonOpacity] = useState(new Animated.Value(1));
  const [rotation] = useState(new Animated.Value(0));
  const [circleY, setCircleY] = useState(0);
  const [scale] = useState(new Animated.Value(0));
  const [circleOpacity] = useState(new Animated.Value(0));
  const [inputAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);

    buttonWidth.addListener(({value}) => {
      if (value === COLLAPSED_BUTTON_WIDTH) {
        Animated.parallel([
          Animated.timing(buttonOpacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
          }),
          Animated.timing(loaderOpacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false,
          }),
          Animated.loop(
            Animated.timing(rotation, {
              toValue: 1,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ),
        ]).start();

        setTimeout(() => {
          Animated.parallel([
            Animated.timing(circleOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 1100,
              easing: Easing.linear,
              useNativeDriver: false,
            }),
          ]).start();
        }, 1000);
      }
    });

    return () => {
      buttonWidth.removeAllListeners();
    };
  }, []);

  const _onSignInPress = () => {
    console.log('this is triggred');
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(buttonWidth, {
        toValue: COLLAPSED_BUTTON_WIDTH,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(inputAnimation, {
        toValue: 0,
        duration: 300,
        delay: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const borderColor = buttonOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', 'white'],
  });

  const scaleValue = scale.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  const translateY = inputAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-60, 0],
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={{
          uri: 'https://e0.pxfuel.com/wallpapers/427/287/desktop-wallpaper-black-waves-oled-black-phone-dark-phone-black-thumbnail.jpg',
        }}
      />
      <Text style={styles.titleStyle}>AUTH</Text>
      <Animated.View
        style={{
          marginTop: 110,
          marginHorizontal: 50,
          opacity: inputAnimation,
          transform: [{translateY}],
        }}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="rgba(255,255,255,0.6)"
          style={styles.inputStyle}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.6)"
          secureTextEntry={true}
          style={styles.inputStyle}
        />
      </Animated.View>

      <View style={{flex: 1}} />

      <View style={styles.bottomContainer}>
        <AnimatedRipple
          rippleContainerBorderRadius={10}
          rippleOpacity={0.5}
          onPress={_onSignInPress}
          rippleColor={'white'}
            style={{
              alignSelf: 'center',
              width: buttonWidth,
            }}
        >
          <Animated.View
            style={[styles.loginButtonStyle, {borderColor: borderColor}]}>
            <Animated.Text style={[styles.loginTextStyle, {opacity: opacity}]}>
              SIGN IN
            </Animated.Text>
            <Animated.Image
              style={[
                styles.loaderStyle,
                {
                  opacity: loaderOpacity,
                  transform: [{rotate: spin}],
                },
              ]}
              source={require('../../assets/images/spinner.png')}
            />
          </Animated.View>
        </AnimatedRipple>

        <Text style={styles.bottomTextStyle}>
          Don't have account yet?
          <Text style={{fontWeight: 'bold'}}> Sign Up</Text>
        </Text>
      </View>
      <Animated.View
        style={[
          styles.authCircleStyle,
          {
            left: width / 2 - 10,
            top: circleY,
            transform: [{scale: scaleValue}],
            opacity: circleOpacity,
            position: 'absolute',
          },
        ]}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.9,
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 35,
    color: 'white',
    marginTop: 80,
    letterSpacing: 2,
    alignSelf: 'center',
  },
  bottomContainer: {
    paddingHorizontal: 50,
  },
  inputStyle: {
    backgroundColor: 'transparent',
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  loginButtonStyle: {
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    height: 40,
    width: '100%',
  },
  loginTextStyle: {
    color: 'white',
    padding: 10,
  },
  bottomTextStyle: {
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
    marginTop: 80,
    alignSelf: 'center',
    fontSize: 12,
  },
  loaderStyle: {
    position: 'absolute',
    width: 40,
    height: 39,
  },
  authCircleStyle: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    position: 'absolute',
  },
});
