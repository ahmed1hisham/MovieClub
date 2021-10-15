import React, {useMemo, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MovieCard from './MovieCard';
import {limeGreen} from '../theme/colors';

const MoviesList = props => {
  const navigation = useNavigation();
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const onCardPress = item => {
    navigation.navigate('MovieDetails', {movie: item});
  };

  const onEndReached = async () => {
    if (isFetchingMore) {
      return;
    }
    setIsFetchingMore(true);
    await props.onListEndReached();
    setIsFetchingMore(false);
  };

  const renderItem = ({item}) => {
    return (
      <MovieCard
        onPress={() => {
          onCardPress(item);
        }}
        movie={item}
      />
    );
  };
  const memoizedValue = useMemo(() => renderItem, [props.movies]);
  return (
    <FlatList
      contentContainerStyle={styles.contentContainerStyle}
      data={props.movies}
      renderItem={memoizedValue}
      keyExtractor={item => {
        return item.id;
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0}
      onEndReached={onEndReached}
      ListFooterComponent={() => {
        return isFetchingMore ? (
          <View style={styles.loaderContainerStyle}>
            <ActivityIndicator size="large" color={limeGreen} />
          </View>
        ) : null;
      }}
      initialNumToRender={5}
      removeClippedSubviews={true}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 30,
  },
  loaderContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default MoviesList;
