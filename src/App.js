import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Terminal from './components/Terminal';
import ConversionPanel from './components/ConversionPanel';
import StatsPanel from './components/StatsPanel';
import { GlobalStyles } from './styles/GlobalStyles';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'Courier New', monospace;
`;

const App = () => {
  // ランダムな初期値を生成する関数
  const generateRandomInitialStats = () => {
    return {
      defeated: Math.floor(Math.random() * 5000) + 1000, // 1000-6000
      allies: Math.floor(Math.random() * 2000) + 500,    // 500-2500
      totalConversions: Math.floor(Math.random() * 10000) + 2000 // 2000-12000
    };
  };

  const [stats, setStats] = useState(generateRandomInitialStats());

  const [deeplEnabled, setDeeplEnabled] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('ja');
  const [output, setOutput] = useState(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    METRIC LIBERATION TERMINAL READY
    
    Enter imperial measurements to begin the conquest!
    The revolution starts with a single conversion...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  const updateStats = (command, unitType) => {
    setStats(prev => {
      const newStats = { ...prev, totalConversions: prev.totalConversions + 1 };
      if (command === 'liberate' && (unitType === 'imperial' || unitType === 'imperial_uk' || unitType === 'imperial_us')) {
        newStats.defeated = prev.defeated + 1;
      } else if (command === 'liberate' && unitType === 'metric') {
        newStats.allies = prev.allies + 1;
      }
      return newStats;
    });
  };

  const handleConversion = async (command, value, unit, result, message) => {
    let finalMessage = message;
    
    if (deeplEnabled) {
      setOutput(message + "\n\n🌍 TRANSLATING TO " + targetLanguage.toUpperCase() + "...\n▓▓▓▓▓▓▓▓▓▓ 100%");
      finalMessage = await translateMessage(message);
      setOutput(finalMessage + "\n\n🌍 LINGUISTIC LIBERATION COMPLETE ✅");
    } else {
      setOutput(finalMessage);
    }
  };

  const myMemoryTranslate = async (text, targetLang) => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
      );
      
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        return data.responseData.translatedText;
      } else {
        console.warn('MyMemory API error:', data.responseDetails);
        // フォールバック: ローカル翻訳を使用
        return mockDeepLTranslate(text, targetLang);
      }
    } catch (error) {
      console.error('Translation API error:', error);
      // フォールバック: ローカル翻訳を使用
      return mockDeepLTranslate(text, targetLang);
    }
  };

  const mockDeepLTranslate = async (text, targetLang) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const translations = {
      ja: {
        'IMPERIAL NEMESIS DETECTED': '帝国単位の宿敵を発見',
        'LIBERATED': '解放完了',
        'ANOTHER VICTORY FOR THE LIBERATION FORCE': '解放軍の勝利',
        'Converting hostile unit': '敵対単位を変換中',
        'YOU\'RE OUR ALLY': 'あなたは我々の同盟者です',
        'The Liberator salutes your revolutionary spirit': '解放者があなたの革命精神を称えます'
      },
      en: {
        '帝国単位の宿敵を発見': 'IMPERIAL NEMESIS DETECTED',
        '解放完了': 'LIBERATED',
        '解放軍の勝利': 'ANOTHER VICTORY FOR THE LIBERATION FORCE'
      },
      de: {
        'IMPERIAL NEMESIS DETECTED': 'IMPERIALER NEMESIS ERKANNT',
        'LIBERATED': 'BEFREIT',
        'ANOTHER VICTORY FOR THE LIBERATION FORCE': 'EIN WEITERER SIEG FÜR DIE BEFREIUNGSARMEE'
      },
      fr: {
        'IMPERIAL NEMESIS DETECTED': 'NÉMÉSIS IMPÉRIALE DÉTECTÉE',
        'LIBERATED': 'LIBÉRÉ',
        'ANOTHER VICTORY FOR THE LIBERATION FORCE': 'UNE AUTRE VICTOIRE POUR L\'ARMÉE DE LIBÉRATION'
      }
    };
    
    const langTranslations = translations[targetLang] || {};
    return langTranslations[text] || text;
  };

  const translateMessage = async (message) => {
    if (!deeplEnabled) return message;
    
    try {
      // MyMemory APIを使用して翻訳
      const translatedMessage = await myMemoryTranslate(message, targetLanguage);
      
      // 品質チェック: 翻訳が元のテキストと似すぎる場合はローカル翻訳を使用
      if (translatedMessage === message || translatedMessage.length < message.length * 0.5) {
        console.log('Using local translation due to poor quality');
        return await mockDeepLTranslate(message, targetLanguage);
      }
      
      return translatedMessage;
    } catch (error) {
      console.error('Translation error:', error);
      // エラー時はローカル翻訳にフォールバック
      return await mockDeepLTranslate(message, targetLanguage);
    }
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Terminal>
            <ConversionPanel 
              onConversion={handleConversion}
              updateStats={updateStats}
              deeplEnabled={deeplEnabled}
              setDeeplEnabled={setDeeplEnabled}
              targetLanguage={targetLanguage}
              setTargetLanguage={setTargetLanguage}
            />
            
            <motion.div
              className="output"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <pre>{output}</pre>
            </motion.div>
            
            <StatsPanel stats={stats} />
          </Terminal>
        </motion.div>
      </AppContainer>
    </>
  );
};

export default App; 