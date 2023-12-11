import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import MovieCard from "./movie-card"

const { width } = Dimensions.get("window")

export default function TrendingMovie({ trending }) {
  return (
    <View className="mb-5">
      <Carousel
        data={trending}
        renderItem={({ item }) => <MovieCard item={item} />}
        firstItem={1}
        sliderWidth={width}
        itemWidth={width * 0.5}
        slideStyle={{ display: "flex", alignItems: "center" }}
        inactiveSlideOpacity={0.6}
      />
    </View>
  )
}
