import { StatusBar } from 'expo-status-bar';
import { View, Image, ScrollView, Text, Touchable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { useEffect, useState } from 'react';
import { fetchTrendingMovie, fetchUpComingMovie, fetchTopRatedMovie, fetchPopularMovie } from '../api/index';
import TrendingMovie from "../components/trending-movie"
import UpComingMovie from "../components/up-coming-movie"
import Loader from '../components/Loader';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [trending, setTrending] = useState([])
  const [upComing, setUpComing] = useState([])
  const [topRated, setTopRated] = useState([])
  const [popular, setPopular] = useState([])
  const [isLoading, setIsLoading] = useState(true)

const navigation = useNavigation()

  useEffect(() => {
    getTrendingMovie()
    getUpComingMovie()
    getTopRatedMovie()
    getPopularMovie()
  }, [])

  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovie();
    setTrending(data.results)
    setIsLoading(false)
  }

  const getUpComingMovie = async () => {
    const data = await fetchUpComingMovie();
    setUpComing(data.results)
  }

  const getTopRatedMovie = async () => {
    const data = await fetchTopRatedMovie();
    setTopRated(data.results)
  }

  const getPopularMovie = async () => {
    const data = await fetchPopularMovie();
    setPopular(data.results)
  }


  return (
    <View className="flex-1 bg-slate-900">
      <SafeAreaView className="shadow">
        <StatusBar style='light' />
        <View className="flex-row justify-between items-center mx-4 my-3">
          <Image source={require("../../assets/logoi.png")} className="w-10 h-10" />
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <MagnifyingGlassIcon size={30} strokeWidth={2} color={"white"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <Loader />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 10 }}>
          {trending.length > 0 && <TrendingMovie trending={trending} />}
          {upComing.length > 0 && <UpComingMovie upComing={upComing} title={"Up Coming Movie"} />}
          {topRated.length > 0 && <TrendingMovie trending={topRated} title={"Top Rated Movie"} />}
          {popular.length > 0 && <UpComingMovie upComing={popular} title={"Popular Movie"} />}
        </ScrollView>
      )}

    </View>
  )
}