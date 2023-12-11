import React from 'react'
import { Image, ScrollView, Text, View, Dimensions } from 'react-native'
import { image185 } from '../api'

const { width, height } = Dimensions.get("window")

export default function UpComingMovie({ upComing, title }) {
  return (
    <View className="mb-8 spacey-4">
      <Text className="text-lg text-yellow-500 text-center font-semibold mb-3">{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {upComing.map(item => (
          <View className="space-y-1 mr-4" key={item.id}>
            <Image
              source={{ uri: image185(item.poster_path) }}
              className="rounded-2xl"
              style={{ width: width * 0.3, height: height * 0.2 }}
            />
            <Text className="text-white text-center">{item.title.length > 12 ? item.title.slice(0, 12) + "..." : item.title}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

