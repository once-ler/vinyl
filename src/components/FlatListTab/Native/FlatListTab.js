/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text, TouchableHighlight, View, StyleSheet, ListView } from 'react-native'
import { ScreenInfo } from 'react-native-responsive-grid'

class FlatListTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stickyHeaderIndices: [],
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
    renderHeader: PropTypes.func,
    keys: PropTypes.array,
    // reducer
    offset: PropTypes.number,
    limit: PropTypes.number,
    listFetchReachedEnd: PropTypes.func,
    listFetch: PropTypes.func,
    listReset: PropTypes.func,
    listCancel: PropTypes.func,
    listUpdateTotal: PropTypes.func,
    listUpdateDownloaded: PropTypes.func,
    parseForSuggestions: PropTypes.func,
    parseForExpectedTotal: PropTypes.func
  }

  static defaultProps = {
    data: [],
    refreshing: false,
    selected: '',
    offset: 0,
    limit: 10,
    keys: ['_score', '_id', 'taxid', 'name', 'symbol', 'type_of_gene', 'refseq'],
    // Function to create next url.
    onSelected: ({filter, offset, limit}) => {
      return `http://mygene.info/v3/query?q=${filter.replace(/\s/g, '%20')}&fields=all&from=${offset}&size=${limit}`
      // return `/api/pubmed/entrez/eutils/esearch.fcgi?db=pubmed&retstart=${offset}&retmax=${limit}&retmode=json&field=title&term=${filter}`
    },

    renderHeader: ({keys}) => (<View style={[styles.listRow]}>
        {
          keys.map(a => {
            return (
              <View style={[styles.listColumn]}>
                <Text style={[styles.listHeaderText]}>{a.toUpperCase()}</Text>
              </View>
            )
          })
        }
      </View>
    ),
    
    renderItem: keys => ({item}) => {
      return (
        <TouchableHighlight>
        <View key={item.key} style={[styles.listRow]}>
          {
            keys.map(k => {
              const a = item[k]
              return (
                <View style={[styles.listColumn]}>
                  <Text style={[styles.listText]}>{typeof a === 'object' ? JSON.stringify(a, null, 2) : a }</Text>
                </View>
              )
            })
          }
        </View>
        </TouchableHighlight>
      )
    }

  }

  componentWillMount() {
    /*
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
    */
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selected !== this.props.selected) {
      this.onReset()
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
    const {selected: filter, offset, limit} = this.props
    return this.props.onSelected({filter, offset, limit})
  }

  onReset = () => {
    this.props.listReset()
  }

  onEndOfData = () => this.props.listCancel()

  render() {
    const {data, listStyle, refreshing, renderItem, renderHeader, keys} = this.props
    
    return data.length > 0 && (
        <View style={[styles.listContainer]}>
        <View>{renderHeader({keys})}</View>  
        <FlatList
          data={data}
          initialNumToRender={10}
          onEndReachedThreshold={1}
          onEndReached={this.onEndReached}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          style={[styles.list, listStyle]}
          // ListHeaderComponent={this.props.renderHeader}
          // stickyHeaderIndices={[0]}
          // stickyHeaderIndices={this.state.stickyHeaderIndices}
          // numColumns={keys.length}
          renderItem={renderItem(keys)}
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
    padding: '2%', 
    backgroundColor: 'white', 
    borderBottomColor: 'lightgray', 
    borderBottomWidth: 2
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
  listHeaderText: {
    color: '#A9A9A9',
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

export default FlatListTab
