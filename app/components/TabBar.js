import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {black, lightGray, limeGreen, white} from '../theme/colors';

const TabBar = props => {
  const {tabs} = props;

  const [index, setIndex] = useState(0);

  const renderTabs = () => {
    var tabsToRender = [];

    for (let i = 0; i < tabs.length; i++) {
      const element = tabs[i];
      tabsToRender.push(tabItem(element, i));
    }
    return tabsToRender;
  };

  const tabItem = (name, i) => {
    return (
      <Pressable
        onPress={() => {
          setIndex(i);
          props.handleIndexChange(i);
        }}
        style={
          index === i
            ? styles.selectedTabItemContainer
            : styles.notSelectedTabItemContainer
        }
        key={i}>
        <Text
          style={[styles.tabItemText, {color: index === i ? white : black}]}>
          {name}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={[styles.container, props.style ? props.style : {}]}>
      {renderTabs()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  selectedTabItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 35,
    backgroundColor: limeGreen,
    borderRadius: 100,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 10,
  },
  notSelectedTabItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 35,
    backgroundColor: lightGray,
    borderRadius: 100,
  },
  tabItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TabBar;
