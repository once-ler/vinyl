export default theme => {
  
  return {
    container: {
      position: 'relative', width: '100%'
    },
    containerOpen: 'react-autosuggest__container--open',
    input: {
      width: '100%',
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
      minWidth: '320px',
      backgroundColor: '#fff',
      fontWeight: 300,
      fontSize: '14px',
      borderBottomLeftRadius: '2px',
      borderBottomRightRadius: '2px',
      zIndex: '9 !important',
      zoom: 1,
      WebkitTransition: '200ms ease-in',
      msTransition: '200ms ease-in',
      OTransition: '200ms ease-in',
      transition: '200ms ease-in'
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
      zoom: 1,
      cursor: 'pointer',
      padding: '10px 8px',
      maxHeight: '56px',
      borderTop: '1px solid #ddd',
      whiteSpace: 'wrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      WebkitTransition: '200ms ease-in',
      msTransition: '200ms ease-in',
      OTransition: '200ms ease-in',
      transition: '200ms ease-in'
    },
    suggestionFirst: {
      borderTop: '2px solid #ddd'
    },
    suggestionHighlighted: {
      backgroundColor: theme.secondary || 'aliceblue',
      fontWeight: 500,
      color: '#fff'
    },
    sectionContainer: { borderTop: '1px dashed #ccc' },
    sectionContainerFirst: { borderTop: 0 },
    sectionTitle: {
      padding: '10px 0 0 10px',
      fontsize: '12px',
      color: '#777'
    }
  };
};
