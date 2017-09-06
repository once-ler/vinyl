import React from 'react';
import styled from 'styled-components';
import {TransitionMotion, spring, presets} from 'react-motion';
import withProps from 'recompose/withProps';

export const ListItem = styled.label`
  white-space: pre;
  word-break: break-word;
  padding: 15px 60px 15px 15px;
  margin-left: 45px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
`;

const ListContainer = styled.div`
  display: block;
  position: absolute;
  top: 51px;
  width: 280px;
  /* border: 1px solid #aaa; */
  background-color: #fff;
  font-weight: 300;
  font-size: 16px;
  /* border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px; */
  z-index: 2;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const DestroyButton = styled.button`
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  background: none;
  border: 0;
  padding: 0;
  transition: color 0.2s ease-out;
  cursor: pointer;
  &:hover {
    color: #af5b5e;
  }
  &:after {
    content: '×';
  }  
`;

const ListLine = styled.li`
  position: relative;
  font-size: 24px;
  box-shadow: 0 -1px 0 #ededed;
  overflow: hidden;
  &:last-child {
    box-shadow: 0 2px 4px #aaa;;
  }
  &:hover > ${DestroyButton} {
    display: block;
  }
`;

const enhanceWithProps = withProps(
  ownerProps => ({
    willEnter: () => ({
      height: 0,
      opacity: 1
    }),
    willLeave: () => ({
      height: spring(0),
      opacity: spring(0)
    }),
    getStyles: () => (ownerProps.list.map((item, i) => ({
      ...item,
      style: {
        height: spring(60, presets.gentle),
        opacity: spring(1, presets.gentle)
      }
    }))),
    getDefaultStyles: () => (
      ownerProps.list.map(item => ({ ...item, style: {height: 0, opacity: 1} }))
    )
  })
);

const Presentation = ({ list, handleDestroy, getDefaultStyles, getStyles, willEnter, willLeave }) => (
  <TransitionMotion
    defaultStyles={getDefaultStyles()}
    styles={getStyles()}
    willLeave={willLeave}
    willEnter={willEnter}>
    {styles =>
      {
      return <ListContainer> 
        <List>
          {styles.map(({key, style, data: {text}}) =>   
            <ListLine key={key} style={style}>
              <ListItem>{text}</ListItem>
              { handleDestroy && <DestroyButton onClick={handleDestroy({ text })} />}
            </ListLine>
          )}
        </List>
      </ListContainer>
      }
    }
  </TransitionMotion>
);

export default enhanceWithProps(Presentation);
