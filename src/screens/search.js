import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from "react-native-heroicons/outline"
import { useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { fetchSearchMovie, image185 } from "../api/index"
import { debounce } from 'lodash'
import Loader from "../components/Loader"

const {width, height} = Dimensions.get("window")

export default function Search() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])

  const navigation = useNavigation()

  const handleSearch = (searchText) => {
    if (searchText && searchText.length > 3) {
      setIsLoading(true)
      fetchSearchMovie({
        query: searchText,
        page: 1
      }).then(data => {
        setIsLoading(false)
        console.log("API REQUEST", data);
        setResults(data.results)
      })
    } else {
      setResults([])
      setIsLoading(false)
    }
  }

  const handleTextDodobounce = useCallback(debounce(handleSearch, 400), [])

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-400 rounded-full mt-4">
        <TextInput
          onChangeText={handleTextDodobounce}
          placeholder='Search movie...'
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wide"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")} className="rounded-full p-3 m-1 bg-slate-500">
          <XMarkIcon color={"white"} size={25} strokeWidth={3} />
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Loader />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results?.map(item => (
              <TouchableWithoutFeedback key={item.id}>
                <View className="space-y-2 mb-4">
                  <Image 
                  source={{uri: image185(item.poster_path)}} 
                  className="rounded-3xl"
                  style={{width: width * 0.44, height: height * 0.3}} />
                  <Text className="text-gray-300 ml-1">
                    {item.title.length > 22 
                    ? item.title.slice(0, 12) + "..."
                  : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : <Text className="text-center text-white">No result</Text>}
    </SafeAreaView>
  )
}
