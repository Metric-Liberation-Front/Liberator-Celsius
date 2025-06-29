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
  const [displayStats, setDisplayStats] = useState({
    defeated: 0,
    allies: 0,
    totalConversions: 0
  });

  // ランダムな初期値を生成する関数
  const generateRandomInitialStats = () => {
    return {
      defeated: Math.floor(Math.random() * 5000) + 1000, // 1000-6000
      allies: Math.floor(Math.random() * 2000) + 500,    // 500-2500
      totalConversions: Math.floor(Math.random() * 10000) + 2000 // 2000-12000
    };
  };

  useEffect(() => {
    // コンポーネントマウント時にランダムな初期値を設定
    const initialStats = generateRandomInitialStats();
    setDisplayStats(initialStats);
  }, []);

  useEffect(() => {
    // statsが更新されたら、displayStatsに反映
    setDisplayStats(prev => ({
      defeated: prev.defeated + stats.defeated,
      allies: prev.allies + stats.allies,
      totalConversions: prev.totalConversions + stats.totalConversions
    }));
  }, [stats.defeated, stats.allies, stats.totalConversions]);

  const progress = Math.round((displayStats.defeated / (displayStats.defeated + displayStats.allies + 1)) * 100);

  return (
    <StatsContainer>
      <StatBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
      >
        <StatLabel color="#ff6b6b">📊 Imperial Units Defeated</StatLabel>
        <StatValue>{displayStats.defeated.toLocaleString()}</StatValue>
      </StatBox>

      <StatBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        <StatLabel color="#4ade80">🤝 Metric Allies</StatLabel>
        <StatValue>{displayStats.allies.toLocaleString()}</StatValue>
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
        <StatValue>{displayStats.totalConversions.toLocaleString()}</StatValue>
      </StatBox>
    </StatsContainer>
  );
};

export default StatsPanel; 