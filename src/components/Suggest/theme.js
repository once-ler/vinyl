export default {
  container: {
    position: 'relative', width: '480px'
  },
  containerOpen: 'react-autosuggest__container--open',
  input: {
    width: '240px',
    height: '30px',
    padding: '10px 20px',
    fontWeight: 300,
    fontSize: '16px',
    border: '1px solid #d3d3d3',
    borderRadius: '2px'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  inputFocused: {
    outline: 'none'
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: '51px',
    width: '100%',
    backgroundColor: '#fff',
    fontWeight: 300,
    fontSize: '20px',
    borderBottomLeftRadius: '2px',
    borderBottomRightRadius: '2px',
    zIndex: '2 !important'   
  },
  suggestionsContainer: {
    display: 'none'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'    
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 8px',
    height: '28px',
    borderTop: '1px solid #ddd',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitTransition: '200ms ease-in',
    msTransition: '200ms ease-in',
    OTransition: '200ms ease-in',
    transition: '200ms ease-in'
  },
  suggestionFirst: {
    borderTop: '0'
  },
  suggestionHighlighted: {
    backgroundColor: '#0C7EAF',
    color: '#fff'
  },
  sectionContainer: { borderTop: '1px dashed #ccc' },
  sectionContainerFirst: { borderTop: 0 },
  sectionTitle: {
    padding: '10px 0 0 10px',
    fontsize: '12px',
    color: '#777'
  }
}
