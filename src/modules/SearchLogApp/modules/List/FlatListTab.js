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
    props.listFetch()
  }

  static propTypes = {
    listStyle: ListView.propTypes.style
  }

  onEndReached = () => {
    this.props.listFetchReachedEnd()
  };

  onRefresh = () => {
    this.props.listFetch()
  }

  render() {
    const onPress = () => {
      this.props.navigator.push({
        screen: 'example.SubView'
      })
    }

    const {selected, data, listStyle} = this.props

    return (
        <FlatList
          data={data}
          initialNumToRender={10}
          onEndReachedThreshold={1}
          onEndReached={this.onEndReached}
          refreshing={this.props.refreshing}
          onRefresh={this.onRefresh}
          style={[styles.list, listStyle]}
          renderItem={
            ({ item }) => {
              
              return (
                <View><Text style={{fontSize: 12, color: '#0a0a0a'}}>{item.firstName}</Text></View>
              )
              
              return (
              <View>
              <Grid>{(state, setState) => (
                <Row key={item.key} style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
                  <Col size={90} offset={6} >
                    <Row>
                      <Col size={30} smSize={100}>
                        <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>{String(item.date)}</Text>
                        <Row>
                          <Col size={5}>
                            <Text>*</Text>
                          </Col>
                          <Col smSize={60} size={87.5} offset={2.5}>
                            <Text style={{fontSize: 12, color: 'gray', lineHeight: 20}}>{item.job}</Text>
                          </Col>
                        </Row>
                      </Col>                      
                      
                      <Col size={60} smSize={100}>
                      <Row>
                        <Col size={25} smSize={100}>
                          <Text style={{fontSize: 12, color: '#0a0a0a'}}>{item.firstName}</Text>
                        </Col>
                        <Col size={25} smSize={100}>
                          <Text style={{fontSize: 12, color: '#0a0a0a'}}>{item.lastName}</Text>
                        </Col>
                        <Col size={25} smSize={100}>
                          <Text style={{fontSize: 12, color: '#0a0a0a'}}>{item.date}</Text>
                        </Col> 
                      </Row>
                      </Col>
                    </Row>    
                  </Col>
                  <Col size={8} offset={-6} hAlign='right'>
                        <Text>{item.index}</Text>
                        <TouchableHighlight onPress={onPress}>
                          <View>
                          </View>
                        </TouchableHighlight>
                  </Col>
                </Row>
                )}
                </Grid>
                </View>
              )
            }}
        />
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
