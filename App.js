import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Linking, TouchableOpacity  } from 'react-native';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Card, Button, Icon } from 'react-native-elements';
import Header from './components/header';
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      articles: []
    }
  }

  componentDidMount() {
    this.getNews()
  }

  async getNews() {
    console.log('get news')
    const response = await fetch(
      'http://newsapi.org/v2/everything?q=apple&from=2020-07-30&to=2020-07-30&sortBy=popularity&apiKey=ba40ee3c82dd4050804e850144ef9bd8'
    );
    
    const data = await response.json()
    this.setState({
      articles: data.articles,
      loading: false
    })
  }

  renderArticleItem = ({item}) => {
    return (
      <Card title={item.title} image={{ uri: item.urlToImage }}>
        <View style={styles.row}>
          <Text style={styles.label}>Source</Text>
          <Text style={styles.info}>{item.source.name}</Text>
        </View>
        <Text style={{ marginBottom: 10 }}>{item.content}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Published</Text>
          <Text style={styles.info}>
            {moment(item.publishedAt).format('LLL')}
          </Text>
        </View>
        <TouchableOpacity backgroundColor="#03A9F4" onPress={() => this.onPress(item.url)} style={styles.readMore}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Read More</Text>
        </TouchableOpacity>
      </Card>
    );
  }
  onPress = async (url) => {
    const supported = await Linking.canOpenURL(url)
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
  };
  render() {
    const {articles} = this.state
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' loading={this.state.loading} />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Header/>
        <FlatList
          data={articles}
          renderItem={this.renderArticleItem}
          keyExtractor={item => item.title}
          ListFooterComponent={<ActivityIndicator size="large" loading={this.state.loading}/>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: 'lightblue',
    justifyContent: 'center'
  },
  header: {
    height: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: 'grey'
  },
  readMore: {
    width: 130,
    padding: 8,
    marginTop: 8,
    borderColor: 'deepskyblue',
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center'
  }
});