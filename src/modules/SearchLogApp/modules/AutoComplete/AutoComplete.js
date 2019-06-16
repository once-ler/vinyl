/* @flow */

import React  from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import AutoComplete from '../../../../components/AutoComplete/Native/AutoComplete'
import Container from '../../../../components/Container/Container';
import Row from '../../../../components/Row/Row';
import Cell from '../../../../components/Cell/Cell';
import * as suggestActions from '../Suggest/SuggestAction'
import * as listActions from '../List/FlatListAction'
import withHandlers from 'recompose/withHandlers'
import defaultProps from 'recompose/defaultProps'
import compose from 'recompose/compose'

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

// User need to override searchUrl and parseForSuggestions and onSelected as needed
const enhanceWithDefaultProps = defaultProps({
  placeholder: 'Enter item to search',
  searchUrl: 'http://mygene.info/v2/query?species=human&q=',
  parseForSuggestions: data => data && data.hits ? data.hits : [],
  keyExtractor: (item, index) => item._id.toString(),
  onTagsChange: tags => tags
})

const connectFunc = connect(
  state => ({
    value: state.suggest.value,
    lastValue: state.suggest.lastValue,
    data: state.suggest.data,
    tagsSelected: state.suggest.tagsSelected
  }),
  dispatch => bindActionCreators({...suggestActions, ...listActions}, dispatch)
)

const enhanceWithHandlers = withHandlers({
  handleOnChange: ({searchUrl, fetchSuggest, updateInputValue}) => text => {
    updateInputValue(text)
    fetchSuggest({ url: `${searchUrl}${text}` })
  },
  handleDelete: ({tagsSelected, onTagsChange, updateTagsSelected}) => index => {
    tagsSelected.splice(index, 1)
    // setTagsSelected(tagsSelected)
    onTagsChange(tagsSelected)
    updateTagsSelected(tagsSelected)
  },
  handleAddition: ({tagsSelected, onTagsChange, updateTagsSelected}) => suggestion => {
    tagsSelected = tagsSelected.concat([suggestion])
    // setTagsSelected(tagsSelected)
    onTagsChange(tagsSelected)
    updateTagsSelected(tagsSelected)
  }
})

const Presentation = ({data, value, lastValue, tagsSelected, handleAddition, handleDelete, handleOnChange, parseForSuggestions,
  renderTags, renderSuggestion, renderSeparator, placeholder, keyExtractor, 
  fetchSuggestSelected, updateInputValue, clearSuggestions, listFetch, listReset, onSelected}) => {
  
  const d = parseForSuggestions(data)

  return (
  <View style={styles.container}>
    <View style={styles.autocompleteContainer}>
      <AutoComplete
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.autocompleteContainer}
        data={d}
        defaultValue={lastValue}
        value={value}
        keyExtractor={keyExtractor}
        itemHeight={20}
        maxItems={10}
        onChangeText={debounce(handleOnChange, 200, true)}
        placeholder={placeholder}
        renderItem={({index, item}) => {
          const {taxid, symbol, name, entrezgene, _id} = item
          
          return (<TouchableOpacity onPress={() => {
            // this.setState({ query: name, genes: [] })
            fetchSuggestSelected({value: name})
            updateInputValue(name)
            clearSuggestions()

            /*
            // Construct url, page
            const url = onSelected(name)
            console.log(url)
            listReset()
            listFetch({url})
            */

            }}>
            <Text style={styles.itemText}>{_id} {taxid} {symbol} {name})</Text>
            </TouchableOpacity>
          )
        }}
        renderSeparator={renderSeparator}
      />
    </View>
    <View style={styles.lastValueContainer}><Text style={[styles.itemText, {width: 250, paddingLeft: 3}]}>{lastValue}</Text></View>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25,
    alignItems: "center", 
    justifyContent: "center"
  },
  autocompleteContainer: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    left: 20,
    position: 'absolute',
    // right: 20,
    top: 0,
    maxWidth: 250,
    zIndex: 1
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  lastValueContainer: {
    flex: 1,
    // right: 20,
    position: 'absolute',
    top: 50,
    left: 40,
    maxWidth: 250,
    alignItems: "flex-end", 
    justifyContent: "flex-end"
  },
  label: {
    color: "#614b63",
    fontWeight: "bold",
    marginBottom: 10
  }
})

export default compose(
  enhanceWithDefaultProps,
  connectFunc,
  // enhanceWithTagsSelectedState,
  enhanceWithHandlers  
)(Presentation)
