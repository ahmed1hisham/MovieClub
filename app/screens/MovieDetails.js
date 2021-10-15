import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CreditsItem from '../components/CreditsItem';
import {IMAGE_BASE_URL} from '../env';
import {getMovieCredits, getMovieDetails} from '../services/MoviesService';
import {black, lightGray, limeGreen} from '../theme/colors';

const MovieDetails = props => {
  const [movie, setMovie] = useState({});
  const [credits, setCredits] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const imageFetchSize = 'w500';
  const imageWidth = 150;
  const [desiredHeight, setDesiredHeight] = useState(0);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    Promise.all[(getDetails(), getCredits())];
  };

  const getDetails = async () => {
    setIsLoading(true);
    await getMovieDetails(props.route.params.movie.id)
      .then(res => {
        setMovie(res.data);
      })
      .catch(e => {
        console.log(e);
      });
    setIsLoading(false);
  };

  const getCredits = async () => {
    setIsLoading(true);
    await getMovieCredits(props.route.params.movie.id)
      .then(res => {
        setCredits(res.data);
      })
      .catch(e => {
        console.log(e);
      });
    setIsLoading(false);
  };

  const renderGenreBadges = () => {
    var listOfGenres = [];
    if (movie.genres) {
      movie.genres.forEach((value, index) => {
        listOfGenres.push(
          <View style={styles.badgeContainer} key={index}>
            <Text style={styles.badgeTextStyle}>{value.name}</Text>
          </View>,
        );
      });
    }
    return listOfGenres;
  };

  const getImageHeight = uri => {
    Image.getSize(uri, (width, height) => {
      setDesiredHeight((imageWidth / width) * height);
    });
    return desiredHeight;
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator color={limeGreen} size="large" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainerStyle}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.topHalfContainer}>
            <View
              style={{
                width: imageWidth,
                height: movie.poster_path
                  ? getImageHeight(
                      IMAGE_BASE_URL + imageFetchSize + movie.poster_path,
                    )
                  : 225,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <Image
                source={
                  movie.poster_path
                    ? {
                        uri:
                          IMAGE_BASE_URL + imageFetchSize + movie.poster_path,
                      }
                    : require('../assets/images/default-movie.png')
                }
                loadingIndicatorSource={() => {
                  return <ActivityIndicator size="large" color={limeGreen} />;
                }}
                style={styles.imageStyle}
              />
            </View>

            <Text style={styles.movieTitleStyle}>{movie.title}</Text>
            <Text style={styles.ratingTextStyle}>
              {Math.trunc(movie.vote_average * 10) + '%'}
            </Text>
          </View>
          <View style={styles.bottomHalfContainer}>
            <Text style={styles.sectionTitleStyle}>Overview</Text>
            <View style={styles.sectionContainerStyle}>
              <Text style={styles.overviewTextStyle}>{movie.overview}</Text>
            </View>

            <Text style={styles.sectionTitleStyle}>Genres</Text>
            <View style={styles.sectionContainerStyle}>
              <View style={styles.badgesContainer}>
                {movie ? renderGenreBadges() : null}
              </View>
            </View>
            <Text style={styles.sectionTitleStyle}>Credits</Text>
            <View style={styles.sectionContainerStyle}>
              <FlatList
                data={credits.cast}
                renderItem={({item}) => {
                  return <CreditsItem credit={item} />;
                }}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', paddingHorizontal: 15},
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  badgeContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: lightGray,
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 10,
  },
  badgeTextStyle: {fontSize: 14, color: black, fontWeight: '600'},
  scrollViewContentContainerStyle: {paddingBottom: 25},
  topHalfContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  movieTitleStyle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  ratingTextStyle: {
    fontSize: 24,
    color: limeGreen,
    fontWeight: '800',
    marginRight: 10,
  },
  bottomHalfContainer: {marginTop: 20},
  sectionTitleStyle: {fontSize: 18, color: black, fontWeight: 'bold'},
  sectionContainerStyle: {marginTop: 10, marginBottom: 20},
  overviewTextStyle: {
    fontSize: 16,
    color: '#6b6b6b',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default MovieDetails;
