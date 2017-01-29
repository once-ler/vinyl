/* @flow */
import styled from 'styled-components';

const Form = styled.form `
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #fefefe;
  * {
    box-sizing: border-box;
  }
  *::before {
    box-sizing: border-box;
  }
  *::after {
    box-sizing: border-box;
  }
`;

export default Form;
