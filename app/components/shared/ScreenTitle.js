import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {black} from '../../theme/colors';

const ScreenTitle = props => {
  return (
    <View style={[styles.container, props.style ? props.style : {}]}>
      <Text style={styles.titleStyle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
  },
  titleStyle: {
    fontSize: 38,
    color: black,
    fontWeight: 'bold',
  },
});
export default ScreenTitle;
