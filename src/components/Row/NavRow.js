/* @flow */
import Inferno from 'inferno';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Row from './Row';
import NavIcon from '../Icon/NavIcon';
import { media } from '../Setting/Setting';
import { update } from '../../modules/App/Action';

const DefaultRow = styled(Row) `
  ${media.tablet `
    height: ${props => { console.log(props); return props.nav.toggle ? '100%' : '65px';}};
    overflow: hidden;
    justify-content: flex-start;    
  `}
`;

// dispatch() passed from parent App.
const NavRow = props => {
  const { children, dispatch, ...rest } = props;
  return (
    <DefaultRow {...rest}>
    {children}
    <NavIcon onClick={e => dispatch(update())}/>
    </DefaultRow>
  );
};

export default connect(
  state => ({ nav: state.nav })
)(NavRow);
