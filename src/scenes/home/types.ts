import { StyleProp, ViewStyle } from 'react-native'
import { Routes } from '../../navigation/Routes'

export interface HomeItem {
  title: string
  subtitle: string
  route: Routes
  backgroundStyle: StyleProp<ViewStyle>
}
