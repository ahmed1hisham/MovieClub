import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {getGenreById} from '../data/genres';
import {IMAGE_BASE_URL} from '../env';
import {darkGray, lightGray, limeGreen, white} from '../theme/colors';

const imageFetchSize = 'w342';

const MovieCard = props => {
  const {movie} = props;
  const imageWidth = 115;
  const [desiredHeight, setDesiredHeight] = useState(0);

  // isMounted reference to avoid state change attempt when unmonuted
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const renderGenreBadges = () => {
    var listOfGenres = [];
    movie.genre_ids.forEach((value, index) => {
      listOfGenres.push(
        <View style={styles.badgeContainerStyle} key={index}>
          <Text style={styles.badgeTextStyle}>{getGenreById(value)}</Text>
        </View>,
      );
    });
    return listOfGenres;
  };

  // Image height calculator to get the correct image aspect ratio for the poster
  const getImageHeight = uri => {
    Image.getSize(uri, (width, height) => {
      setDesiredHeight((imageWidth / width) * height);
    });
    return desiredHeight;
  };

  return (
    <Pressable onPress={props.onPress} style={styles.container}>
      {isMounted ? (
        <Image
          source={
            movie.poster_path
              ? {
                  uri: IMAGE_BASE_URL + imageFetchSize + movie.poster_path,
                }
              : require('../assets/images/default-movie.png')
          }
          style={{
            width: imageWidth,
            height: movie.poster_path
              ? getImageHeight(
                  IMAGE_BASE_URL + imageFetchSize + movie.poster_path,
                )
              : 171,
            resizeMode: 'contain',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        />
      ) : null}
      <View style={styles.rightPartContainer}>
        <View style={styles.rightPartSubContainer}>
          <View>
            <Text style={styles.movieTitleStyle}>{movie.title}</Text>
          </View>
          <View style={styles.lowerRightPartContainer}>
            <View style={styles.releaseAndBadgesContainer}>
              <Text style={styles.releaseDateStyle}>{movie.release_date}</Text>
              <View style={styles.badgesContainer}>{renderGenreBadges()}</View>
            </View>

            <View style={styles.ratingContainer}>
              <Text style={styles.ratingStyle}>
                {Math.trunc(movie.vote_average * 10) + '%'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: white,
    padding: 15,
    marginBottom: 15,
    height: 200,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 5,
  },
  ratingStyle: {
    fontSize: 24,
    color: limeGreen,
    fontWeight: '800',
    marginRight: 10,
  },
  ratingContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  rightPartContainer: {flex: 1},
  rightPartSubContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    marginLeft: 10,
  },
  movieTitleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: darkGray,
    marginBottom: 15,
  },
  releaseDateStyle: {fontSize: 16, color: darkGray, marginBottom: 15},
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badgeContainerStyle: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: lightGray,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  badgeTextStyle: {fontSize: 12, color: darkGray},
  lowerRightPartContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  releaseAndBadgesContainer: {flex: 1},
});

export default React.memo(MovieCard);
