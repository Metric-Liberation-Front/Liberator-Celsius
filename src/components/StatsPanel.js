import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-top: 20px;
`;

const StatBox = styled(motion.div)`
  background: #2a2a2a;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #555;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const StatLabel = styled.div`
  color: ${props => props.color || '#ff6b6b'};
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: bold;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #00ff00;
  text-shadow: 0 0 10px #00ff0050;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #333;
  border-radius: 2px;
  margin-top: 10px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #ffd93d);
  border-radius: 2px;
`;

const StatsPanel = ({ stats }) => {
  const progress = Math.round((stats.defeated / (stats.defeated + stats.allies + 1)) * 100);

  return (
    <StatsContainer>
      <StatBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
      >
        <StatLabel color="#ff6b6b">📊 Imperial Units Defeated</StatLabel>
        <StatValue>{stats.defeated.toLocaleString()}</StatValue>
      </StatBox>

      <StatBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        <StatLabel color="#4ade80">🤝 Metric Allies</StatLabel>
        <StatValue>{stats.allies.toLocaleString()}</StatValue>
      </StatBox>

      <StatBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
      >
        <StatLabel color="#fbbf24">⚔️ Liberation Progress</StatLabel>
        <StatValue>{progress}%</StatValue>
        <ProgressBar>
          <ProgressFill
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </ProgressBar>
      </StatBox>

      <StatBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
      >
        <StatLabel color="#a78bfa">🎯 Total Conversions</StatLabel>
        <StatValue>{stats.totalConversions.toLocaleString()}</StatValue>
      </StatBox>
    </StatsContainer>
  );
};

export default StatsPanel; 