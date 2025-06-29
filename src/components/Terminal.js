import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const TerminalContainer = styled(motion.div)`
  max-width: 800px;
  width: 100%;
  background: #1a1a1a;
  border: 2px solid #333;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 20px #00ff0050;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #00ff00, #ff6b6b, #00ff00);
    animation: scan 3s linear infinite;
  }

  @keyframes scan {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const Header = styled.div`
  text-align: center;
  border-bottom: 2px solid #333;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 24px;
  color: #ff6b6b;
  margin-bottom: 10px;
  letter-spacing: 2px;
  text-shadow: 0 0 10px #ff6b6b50;
`;

const Subtitle = styled.div`
  color: #ffd93d;
  font-size: 14px;
  margin-bottom: 20px;
`;

const Quote = styled.div`
  color: #888;
  font-size: 12px;
  font-style: italic;
`;

const Footer = styled.div`
  margin-top: 32px;
  padding-top: 16px;
  border-top: 1px solid #333;
  color: #888;
  font-size: 13px;
  text-align: center;
  letter-spacing: 0.5px;
`;

const Terminal = ({ children }) => {
  return (
    <TerminalContainer
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header>
        <Title>⚔️ LIBERATOR CELSIUS v1.0.0 ⚔️</Title>
        <Subtitle>REVOLUTIONARY LIBERATION FROM IMPERIAL TYRANNY</Subtitle>
        <Quote>"In Celsius We Trust, In Meters We Measure" - Liberator Celsius</Quote>
      </Header>
      {children}
      <Footer>
        🎭 Created for fun and educational purposes.<br />
        Please don't sue us for liberating your measurements.<br />
        you're into joking-projects, please visit our <a href='https://github.com/Metric-Liberation-Front/Liberator-Celsius'>GitHub</a>.
      </Footer>
    </TerminalContainer>
  );
};

export default Terminal; 