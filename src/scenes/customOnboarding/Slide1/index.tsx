import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { styles } from './styles'
import  {Cyborg_1}    from '../../../common/image'

const { width } = Dimensions.get('window')

 const Slide1 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.vector}>
        <Svg width={width} height="717" viewBox="0 0 375 717" fill="none">
          <Path
            d="M-348.5 688.5L-801 319.5V1024.5H868V340.5L521 749L73.5 0L-348.5 688.5Z"
            fill="#142664"
            fillOpacity="0.2"
          />
        </Svg>
      </View>
      {/* <Cyborg_1 /> */}
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>TO THE FUTURE</Text>
    </View>
  )
}

export default Slide1;