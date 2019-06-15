import React, { Component } from 'react';
import {
  FlatList,
  Text,
  ScrollView,
  
  TouchableHighlight,
  View,
  StyleSheet,
  ListView
} from 'react-native'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import {bindActionCreators} from 'redux'

import { Row, Column as Col, Grid, ScreenInfo, setBreakPoints} from 'react-native-responsive-grid'

import * as listActions from './FlatListAction'
import * as suggesActions from '../Suggest/SuggestAction'

setBreakPoints({
  SMALL_Width: 414,
  MEDIUM_Width: 600,
  LARGE_Width: 1024
})

class FlatListTab extends Component {
  constructor(props) {
    super(props)
    // props.listFetch()
    this.state = {
      stickyHeaderIndices: []
    }
  }

  static propTypes = {
    listStyle: ListView.propTypes.style
  }

  componentWillMount() {
    var arr = [];
    this.props.data.map(obj => {
      if (obj.header) {
        arr.push(this.props.data.indexOf(obj))
      }
    })
    arr.push(0);
    this.setState({
      stickyHeaderIndices: arr
    })
  }

  onEndReached = () => {
    this.props.listFetchReachedEnd()
  };

  onRefresh = () => {
    this.props.listFetch()
  }

  renderHeader = () => {
    return <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}><Text>Header</Text></View>
  }

  render() {
    const onPress = () => {
      this.props.navigator.push({
        screen: 'example.SubView'
      })
    }

    const {selected, data, listStyle} = this.props

    //   Object.keys(data[0]).map(a => (<Text>{a}</Text>))
        
    const keys = data.length > 0 ? Object.keys(data[0]) : []
    
    return data.length > 0 && (
        <View>
        <View>
        </View>  
        <FlatList
          data={data}
          initialNumToRender={10}
          onEndReachedThreshold={1}
          onEndReached={this.onEndReached}
          refreshing={this.props.refreshing}
          onRefresh={this.onRefresh}
          style={[styles.list, listStyle]}
          // ListHeaderComponent={this.renderHeader}
          stickyHeaderIndices={this.state.stickyHeaderIndices}
          numColumns={keys.length}
          renderItem={
            ({ item }) => {
              
              return (
                <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                  <Text style={{fontSize: 12, color: '#0a0a0a'}}>{item.firstName}</Text>
                  <Text style={{fontSize: 12, color: '#0a0a0a'}}>{item.lastName}</Text>
                </View>

              )
              
            }}
        />
        </View>
    )
  }
}

const border = {
  borderColor: '#b9b9b9',
  borderBottomWidth: 1,
}

const styles = StyleSheet.create({
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    left: 0,
    right: 0,
    height: 300
  }
})

const connectFunc = connect(
  state => ({
    selected: state.suggest.selected,
    refreshing: state.list.refreshing, 
    data: state.list.payload
  }),
  dispatch => bindActionCreators({...listActions, ...suggesActions}, dispatch)
)

export default compose(
  connectFunc
)(FlatListTab)
