import Inferno from 'inferno';
import styled, { keyframes } from 'styled-components';

const bounceScale = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const Bounce = styled.div`
  width: 20px;
  height: 20px;
  background-color: #333;
  border-radius: 100%;
  display: inline-block;
  animation: ${bounceScale} 1.4s ease-in-out 0s infinite both;
  animation-delay: ${props => props.animationDelay || 0}s;
`;

const BounceWrapper = styled.div`
  margin: 40px auto;
  width: 80px;
  text-align: center;
`;

export default props => (
  <BounceWrapper>
    <Bounce animationDelay={-0.32}></Bounce>
    <Bounce animationDelay={-0.16}></Bounce>
    <Bounce></Bounce>
  </BounceWrapper>
);
