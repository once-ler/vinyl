/* @flow */
import React from 'react';
import Container from '../../components/Container/Container';
import FlexGrow from '../../components/FlexGrow/FlexGrow';

export default (...props: any[]) => (
  <FlexGrow><Container><h1>Protected</h1></Container></FlexGrow>
);
