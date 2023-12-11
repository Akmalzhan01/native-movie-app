import React from 'react'
import { Image, Dimensions } from 'react-native'
import { image500 } from '../api'
import { TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const {width, height} = Dimensions.get("window")

export default function MovieCard({item}) {
  const navigation = useNavigation()

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Movie", item)}>
      <Image source={{uri: image500(item.poster_path)}} style={{width: width * 0.5, height: height * 0.4}}
      className="rounded-3xl" />
    </TouchableWithoutFeedback>
  )
}
