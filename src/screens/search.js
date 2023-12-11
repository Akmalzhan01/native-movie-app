import { TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from "react-native-heroicons/outline"
import { useNavigation } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import {fetchSearchMovie} from "../api/index"
import { debounce } from 'lodash'

export default function Search() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])

  const navigation = useNavigation()

  const handleSearch = (searchText) => {
    if (searchText && searchText.length > 3) {
      setIsLoading(true)
      fetchSearchMovie({
        query: searchText,
        include_adult: false,
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
    </SafeAreaView>
  )
}
