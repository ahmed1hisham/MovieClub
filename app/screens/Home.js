import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MoviesList from '../components/MoviesList';
import ScreenTitle from '../components/shared/ScreenTitle';
import TabBar from '../components/TabBar';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '../services/MoviesService';
import {limeGreen, white} from '../theme/colors';

const statusBarHeight = getStatusBarHeight(true);
const Home = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const listOfTabs = ['Upcoming', 'Popular', 'Top Rated'];
  const [upcomingPageNumber, setUpcomingPageNumber] = useState(1);
  const [popularPageNumber, setPopularPageNumber] = useState(1);
  const [topRatedPageNumber, setTopRatedPageNumber] = useState(1);

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const fetchAllMovies = async () => {
    setIsLoading(true);
    Promise.all([
      await fetchUpcomingMovies(1),
      await fetchPopularMovies(1),
      await fetchTopRatedMovies(1),
    ]);
    setIsLoading(false);
  };

  const fetchUpcomingMovies = async page => {
    await getUpcomingMovies(page).then(res => {
      setUpcomingMovies(upcomingMovies.concat(res.data.results));
    });
  };

  const fetchPopularMovies = async page => {
    await getPopularMovies(page).then(res => {
      setPopularMovies(popularMovies.concat(res.data.results));
    });
  };

  const fetchTopRatedMovies = async page => {
    await getTopRatedMovies(page).then(res => {
      setTopRatedMovies(topRatedMovies.concat(res.data.results));
    });
  };

  const fetchMoreMovies = async () => {
    switch (currIndex) {
      case 0:
        await fetchUpcomingMovies(upcomingPageNumber + 1).then(() => {
          setUpcomingPageNumber(upcomingPageNumber + 1);
        });
        return;
      case 1:
        await fetchPopularMovies(popularPageNumber + 1).then(() => {
          setPopularPageNumber(popularPageNumber + 1);
        });
        return;
      case 2:
        await fetchTopRatedMovies(topRatedPageNumber + 1).then(() => {
          setTopRatedPageNumber(topRatedPageNumber + 1);
        });
        return;
      default:
        return;
    }
  };

  const onListEndReached = async () => {
    await fetchMoreMovies();
  };

  const handleIndexChange = i => {
    setCurrIndex(i);
  };

  const renderMovieList = () => {
    return currIndex === 0 ? (
      <MoviesList
        key={currIndex}
        movies={upcomingMovies}
        onListEndReached={onListEndReached}
      />
    ) : currIndex === 1 ? (
      <MoviesList
        key={currIndex}
        movies={popularMovies}
        onListEndReached={onListEndReached}
      />
    ) : (
      <MoviesList
        key={currIndex}
        movies={topRatedMovies}
        onListEndReached={onListEndReached}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleAndTabBarContainer}>
        <ScreenTitle title="Movies" />
        <TabBar
          tabs={listOfTabs}
          style={styles.tabBarStyle}
          handleIndexChange={handleIndexChange}
        />
      </View>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={limeGreen} />
        </View>
      ) : (
        renderMovieList()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
    backgroundColor: white,
  },
  tabBarStyle: {marginBottom: 30},
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  titleAndTabBarContainer: {paddingHorizontal: 15},
});

export default Home;
