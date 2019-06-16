import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

/*
setBreakPoints({
  SMALL_Width: 414,
  MEDIUM_Width: 600,
  LARGE_Width: 1024
})
*/

class FlatListTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stickyHeaderIndices: [],
      offset: 0,
      limit: 10,
      total: 0
    }
  }

  static propTypes = {
    data: PropTypes.array,
    refreshing: PropTypes.bool,
    selected: PropTypes.string,
    listStyle: ListView.propTypes.style,
    renderItem: PropTypes.func,
    onSelected: PropTypes.func,
    parseForSuggestions: PropTypes.func
  }

  static defaultProps = {
    data: [],
    refreshing: false,
    selected: '',
    // Function to create next url.
    onSelected: (filter, offset = 0, limit = 10) => {
      return `http://mygene.info/v3/query?q=${filter.replace(/\s/g, '%20')}&fields=all&from=${offset}&size=${limit}`
      // return `/api/pubmed/entrez/eutils/esearch.fcgi?db=pubmed&retstart=${offset}&retmax=${limit}&retmode=json&field=title&term=${filter}`
    },
    // Function to extract the array from the HTTP response
    parseForSuggestions: data => (data && data.hits ? data.hits : []),
    renderItem: ({item}) => {
      console.log(item)
      return (<View key={item.key} style={[styles.listRow]}>
          <View style={[styles.listColumn]}>
            <Text style={[styles.listText]}>{item.name}</Text>
          </View>
        </View>
      )
    }

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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selected !== this.props.selected) {
      this.onEndOfData()
      this.onRefresh()
    }
  }

  onEndReached = () => {
    const url = this.getUrl()
    this.props.listFetchReachedEnd({url})
  }

  onRefresh = () => {
    const url = this.getUrl()
    this.props.listFetch({url})
  }

  getUrl = () => {
    const filter = this.props.selected
    return this.props.onSelected(filter)
  }

  onEndOfData = () => {
    this.props.listReset()
  }

  renderHeader = () => {
    return <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}><Text>Header</Text></View>
  }

  render() {
    /*
    const onPress = () => {
      this.props.navigator.push({
        screen: 'example.SubView'
      })
    }
    */

    const {data, listStyle} = this.props
    
    const d = this.props.parseForSuggestions(data)
    
    const b = data.map(a => this.props.parseForSuggestions(a)).flat()

    // const keys = (d.length > 0) ? Object.keys(d[0]) : []
    
    console.log(b)

    return d.length > 0 && (
        <View style={[styles.listContainer]}>
        <View>
        </View>  
        <FlatList
          data={b}
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
          renderItem={this.props.renderItem}
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
  listRow: {
    flex: 1, 
    flexDirection: 'row', 
    padding: '6%', 
    backgroundColor: 'white', 
    borderBottomColor: 'lightgray', 
    borderBottomWidth: 5
  },
  listColumn: {
    flex: 1, 
    flexDirection: 'column'
  },
  listText: {
    fontSize: 12, 
    color: '#0a0a0a', 
    lineHeight: 10
  },
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
