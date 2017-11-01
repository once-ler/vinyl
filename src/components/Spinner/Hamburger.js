/* @flow */

/* Should only invoke this component one time, usually in an src/index entry file. */
import React from 'react';
import 'hamburgers/dist/hamburgers.min.css';

export default (props: any) => (
  <div className='hamburger hamburger--arrowturn-r'>
    <div className='hamburger-box'>
      <div className='hamburger-inner'></div>
    </div>
  </div>
);
