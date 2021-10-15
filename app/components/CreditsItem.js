import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {IMAGE_BASE_URL} from '../env';
import {black} from '../theme/colors';

const imageFetchSize = 'w185';

const CreditsItem = props => {
  const {credit} = props;
  return (
    <View style={styles.container}>
      <Image
        source={
          credit.profile_path
            ? {uri: IMAGE_BASE_URL + imageFetchSize + credit.profile_path}
            : require('../assets/images/default-avatar.png')
        }
        style={styles.imageStyle}
      />
      <Text style={styles.textStyle}>{credit.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 70,
    resizeMode: 'cover',
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '600',
    color: black,
    width: 70,
    flexWrap: 'wrap',
    textAlign: 'center',
    marginTop: 5,
  },
});
export default React.memo(CreditsItem);
