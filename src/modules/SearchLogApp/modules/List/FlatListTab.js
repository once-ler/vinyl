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
  /*
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
  */

  onEndReached = () => {
    this.props.listFetchReachedEnd()
  };

  onRefresh = () => {
    this.props.listFetch()
  }

  renderHeader = () => {
    return <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}><Text>Header</Text></View>
  }

  parseForSuggestions = data => (data && data.hits ? data.hits : [])
  
  render() {
    const onPress = () => {
      this.props.navigator.push({
        screen: 'example.SubView'
      })
    }

    const {selected, data, listStyle} = this.props
    
    const d = this.parseForSuggestions(data)
    
    const keys = (d.length > 0) ? Object.keys(d[0]) : []
    
    console.log(data)

    return d.length > 0 && (
        <View style={[styles.listContainer]}>
        <View>
        </View>  
        <FlatList
          data={data}
          initialNumToRender={10}
          onEndReachedThreshold={2}
          onEndReached={this.onEndReached}
          refreshing={this.props.refreshing}
          onRefresh={this.onRefresh}
          style={[styles.list, listStyle]}
          // ListHeaderComponent={this.renderHeader}
          // stickyHeaderIndices={[0]}
          // stickyHeaderIndices={this.state.stickyHeaderIndices}
          // numColumns={keys.length}
          renderItem={
            ({ item }) => {
              
              // return (
              //   <Grid>{(state, setState) => {
              
              return (<View key={item.key}
                style={{flex: 1, flexDirection: 'row', padding: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 5}}>
                <View style={[{flex: 1, flexDirection: 'column'}]}>
                  <Text style={{fontSize: 12, color: '#0a0a0a', lineHeight: 10}}>{item.key}</Text>
                </View>  
                <View style={[{flex: 1, flexDirection: 'column'}]}>
                  <Text style={{fontSize: 12, color: '#0a0a0a', lineHeight: 10}}>{item.firstName}</Text>
                </View>  
                <View style={[{flex: 1, flexDirection: 'column'}]}>
                  <Text style={{fontSize: 12, color: '#0a0a0a', lineHeight: 10}}>{item.lastName}</Text>
                </View>  
                
                </View>
              )
              
                // }}
                // </Grid>
              // )

              // return (
                // <Grid>{(state, setState) => {
                // console.log(state)  
                return (
                <Row key={item.key}
                  style={{paddingTop: '6%', paddingBottom: '6%', backgroundColor: 'white', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
                  <Col size={90} offset={6} >
                    <Row>
                      <Col size={30} smSize={100}>
                        <Text style={{fontSize: 15, color: '#BD1206', fontWeight:'bold'}}>{String(item.date)}</Text>
                        <Row >
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
                          <View></View>
                        </TouchableHighlight>
                  </Col>
                </Row>
                )
                  // }
                  // }
                // </Grid>
              // )




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
  listContainer: {
    flex: 1
  },
  list: {
    ...border,
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    height: ScreenInfo().height
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
