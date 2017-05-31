import React from 'react';
import styled from 'styled-components';

const ListItem = styled.label`
  white-space: pre;
  word-break: break-word;
  padding: 15px 60px 15px 15px;
  margin-left: 45px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
`;

const ListContainer = styled.ul`
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
    border-bottom: none;
  }
  &:hover > ${DestroyButton} {
    display: block;
  }
`;

export default ({ list, handleDestroy, ...rest }) => { console.log(handleDestroy); return (
  <ListContainer>
    {list.map((text, i) => <ListLine key={i}><ListItem>{text}</ListItem><DestroyButton onClick={handleDestroy({ text, ...rest })} /></ListLine>)}
  </ListContainer>
)};
