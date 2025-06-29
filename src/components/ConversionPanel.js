import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const InputSection = styled.div`
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Label = styled.label`
  color: ${props => props.color || '#ffd93d'};
  min-width: 80px;
  font-weight: bold;
`;

const DeepLSection = styled.div`
  border-top: 1px solid #555;
  padding-top: 15px;
  margin-top: 15px;
`;

const DeepLStatus = styled.span`
  color: ${props => props.enabled ? '#4ade80' : '#888'};
  margin-left: 10px;
  font-weight: ${props => props.enabled ? 'bold' : 'normal'};
`;

const Examples = styled.div`
  margin-top: 20px;
  font-size: 12px;
  color: #888;
  line-height: 1.5;
`;

const ConversionPanel = ({ 
  onConversion, 
  updateStats, 
  deeplEnabled, 
  setDeeplEnabled, 
  targetLanguage, 
  setTargetLanguage 
}) => {
  const [command, setCommand] = useState('liberate');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('fahrenheit');

  // Unit data from original HTML
  const unitData = {
    liberate: {
      fahrenheit: { to: 'celsius', formula: (f) => (f - 32) * 5/9, unit: '°C', type: 'imperial' },
      inch: { to: 'centimeter', formula: (i) => i * 2.54, unit: 'cm', type: 'imperial' },
      foot: { to: 'meter', formula: (f) => f * 0.3048, unit: 'm', type: 'imperial' },
      yard: { to: 'meter', formula: (y) => y * 0.9144, unit: 'm', type: 'imperial' },
      mile: { to: 'kilometer', formula: (m) => m * 1.609344, unit: 'km', type: 'imperial' },
      mph: { to: 'km/h', formula: (v) => v * 1.60934, unit: 'km/h', type: 'imperial' },
      pound: { to: 'kilogram', formula: (p) => p * 0.453592, unit: 'kg', type: 'imperial' },
      ounce: { to: 'gram', formula: (o) => o * 28.3495, unit: 'g', type: 'imperial' },
      stone: { to: 'kilogram', formula: (s) => s * 6.35029, unit: 'kg', type: 'imperial_uk' },
      imperial_gallon: { to: 'liter', formula: (g) => g * 4.54609, unit: 'L', type: 'imperial_uk' },
      us_gallon: { to: 'liter', formula: (g) => g * 3.78541, unit: 'L', type: 'imperial_us' },
      imperial_pint: { to: 'milliliter', formula: (p) => p * 568.261, unit: 'ml', type: 'imperial_uk' },
      us_pint: { to: 'milliliter', formula: (p) => p * 473.176, unit: 'ml', type: 'imperial_us' }
    },
    cook: {
      tablespoon: { to: 'milliliter', formula: (t) => t * 15, unit: 'ml', type: 'cooking' },
      teaspoon: { to: 'milliliter', formula: (t) => t * 5, unit: 'ml', type: 'cooking' },
      cup: { to: 'milliliter', formula: (c) => c * 240, unit: 'ml', type: 'cooking' },
      fahrenheit: { to: 'celsius', formula: (f) => (f - 32) * 5/9, unit: '°C', type: 'cooking' },
      uk_tablespoon: { to: 'milliliter', formula: (t) => t * 17.758, unit: 'ml', type: 'cooking_uk' },
      uk_teaspoon: { to: 'milliliter', formula: (t) => t * 5.919, unit: 'ml', type: 'cooking_uk' },
      uk_cup: { to: 'milliliter', formula: (c) => c * 284.131, unit: 'ml', type: 'cooking_uk' }
    },
    imperial: {
      celsius: { to: 'fahrenheit', formula: (c) => c * 9/5 + 32, unit: '°F', type: 'metric' },
      meter: { to: 'foot', formula: (m) => m * 3.28084, unit: 'ft', type: 'metric' },
      kilogram: { to: 'pound', formula: (k) => k * 2.20462, unit: 'lbs', type: 'metric' },
      gram: { to: 'ounce', formula: (g) => g * 0.035274, unit: 'oz', type: 'metric' }
    }
  };

  const unitOptions = {
    liberate: [
      { value: 'fahrenheit', label: '°F (Fahrenheit) 🔥' },
      { value: 'inch', label: 'inch (インチ) 📏' },
      { value: 'foot', label: 'foot (フィート) 🦶' },
      { value: 'yard', label: 'yard (ヤード) 🏈' },
      { value: 'mile', label: 'mile (マイル) 🛣️' },
      { value: 'mph', label: 'mph (マイル毎時) 🚗' },
      { value: 'pound', label: 'pound (ポンド) ⚖️' },
      { value: 'ounce', label: 'ounce (オンス) 🪶' },
      { value: 'stone', label: 'stone (ストーン) 🇬🇧' },
      { value: 'imperial_gallon', label: 'imperial gallon (英ガロン) 🇬🇧' },
      { value: 'us_gallon', label: 'US gallon (米ガロン) 🇺🇸' },
      { value: 'imperial_pint', label: 'imperial pint (英パイント) 🇬🇧' },
      { value: 'us_pint', label: 'US pint (米パイント) 🇺🇸' }
    ],
    cook: [
      { value: 'tablespoon', label: 'tablespoon (大さじ) 🥄' },
      { value: 'teaspoon', label: 'teaspoon (小さじ) 🥄' },
      { value: 'cup', label: 'cup (カップ) ☕' },
      { value: 'fahrenheit', label: '°F (オーブン温度) 🔥' },
      { value: 'uk_tablespoon', label: 'UK tablespoon (英大さじ) 🇬🇧' },
      { value: 'uk_teaspoon', label: 'UK teaspoon (英小さじ) 🇬🇧' },
      { value: 'uk_cup', label: 'UK cup (英カップ) 🇬🇧' }
    ],
    imperial: [
      { value: 'celsius', label: '°C (Celsius) ❄️' },
      { value: 'meter', label: 'meter (メートル) 📏' },
      { value: 'kilogram', label: 'kilogram (キログラム) ⚖️' },
      { value: 'gram', label: 'gram (グラム) ⚖️' }
    ]
  };

  // 値＋単位のイースターエッグ対応
  const specialMessages = {
    '451_fahrenheit': "📚 BRADBURY READER DETECTED!\nIt was a pleasure to burn... in Celsius.",
    '88_mph': "🚗 TIME TRAVELER SPOTTED!\nGreat Scott! That's fast enough for time travel!",
    '42_inch': "🤖 HITCHHIKER'S GUIDE ENTHUSIAST!\nThe meaning of life, converted to metric perfection.",
    '69_celsius': "😏 NICE TEMPERATURE BRO\nNice and room temperature.",
    '420_fahrenheit': "🌿 CHEF DETECTED (totally innocent baking temp)\nPerfect for... cookies.",
    '666_pound': "😈 CURSED WEIGHT DETECTED\nConverting demonic units to holy metric...\n✝️ PURIFICATION COMPLETE ✝️",
    '0_celsius': "🥶 ABSOLUTE MADNESS!\nWhy would anyone choose this as zero?!",
    '32_fahrenheit': "🌡️ FREEZING POINT ANOMALY DETECTED\nMr. Fahrenheit chose 32° for water freezing.\nThis makes no sense. Zero is clearly better."
  };

  // ヤードポンド法に苦しむ者たちの声（レア演出）
  const imperialSufferVoices = [
    "Why is a mile 5280 feet...?",
    "I just want to bake, but what is a 'cup' in grams?",
    "Why is water freezing at 32°F? Help!",
    "How many ounces in a pound again?",
    "I measured in inches, but the manual says centimeters...",
    "Why is there a US and UK gallon?!",
    "Please, liberate me from fractions!"
  ];

  useEffect(() => {
    // Reset unit when command changes
    const options = unitOptions[command];
    if (options && options.length > 0) {
      setUnit(options[0].value);
    }
  }, [command]);

  const generateMessage = (command, value, unit, conversion, result) => {
    let message = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    
    // 値＋単位のイースターエッグ判定
    const key = `${value}_${unit}`;
    const hasEasterEgg = specialMessages[key];
    
    if (hasEasterEgg) {
      message += specialMessages[key] + "\n\n";
    }
    
    if (command === 'liberate') {
      if (conversion.type === 'metric') {
        message += "🤝 YOU'RE OUR ALLY!\n\n";
        message += `${value} ${unit} is already perfection.\n`;
        message += "The Liberator salutes your revolutionary spirit.\n\n";
        message += `For reference: ${result} ${conversion.unit} (in enemy units)`;
      } else {
        // イースターエッグが発動した場合は通常メッセージをスキップ
        if (!hasEasterEgg) {
          message += "⚔️ IMPERIAL NEMESIS DETECTED ⚔️\n";
          
          // 英米の違いを表示
          if (conversion.type === 'imperial_uk') {
            message += "🇬🇧 BRITISH IMPERIAL UNIT DETECTED\n";
          } else if (conversion.type === 'imperial_us') {
            message += "🇺🇸 AMERICAN IMPERIAL UNIT DETECTED\n";
          } else {
            message += "Converting hostile unit...\n";
          }
          
          message += "Converting hostile unit...\n\n";
        }
        
        message += `${value} ${unit} → ${result} ${conversion.unit} ✅ LIBERATED!\n\n`;
        message += "ANOTHER VICTORY FOR THE LIBERATION FORCE!";
      }
    } else if (command === 'cook') {
      // イースターエッグが発動した場合は通常メッセージをスキップ
      if (!hasEasterEgg) {
        message += "👨‍🍳 CULINARY REVOLUTION INITIATED\n";
        
        // 英米の違いを表示
        if (conversion.type === 'cooking_uk') {
          message += "🇬🇧 BRITISH KITCHEN MEASUREMENT DETECTED\n";
        } else {
          message += "🥄 KITCHEN MEASUREMENT DETECTED\n";
        }
        
        message += "\n";
        message += "Analyzing culinary unit...\n";
        message += "▓▓▓▓▓▓▓▓▓▓ 100%\n\n";
      }
      
      message += `${value} ${unit} → ${result} ${conversion.unit}\n\n`;
      message += "📊 LIBERATION STATISTICS:\n";
      message += "• Recipes freed: 1,337,420\n";
      message += "• Bakers converted: 42,069\n";
      message += "• Precision improved: 847.3%\n\n";
      message += "THE SPOON RESISTANCE GROWS STRONGER";
    } else if (command === 'imperial') {
      message += "😈 TEMPORARY DARK SIDE ALLIANCE\n";
      message += "🔄 REVERSE CONVERSION ENGAGED\n\n";
      message += `${value} ${unit} → ${result} ${conversion.unit}\n\n`;
      message += "⚠️ WARNING: You are now speaking the enemy tongue.\n";
      message += "Return to metric supremacy immediately!";
    }

    // 5%の確率で苦しむ声を追加
    if (Math.random() < 0.05) {
      const randomVoice = imperialSufferVoices[Math.floor(Math.random() * imperialSufferVoices.length)];
      message += `\n\n🆘 VOICE FROM THE IMPERIAL DARKNESS:\n"${randomVoice}"\n`;
    }
    
    message += "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
    return message;
  };

  const executeConversion = () => {
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
      onConversion(null, null, null, null, "⚠️ ERROR: INVALID INPUT\nThe Liberator requires numerical values for liberation!");
      return;
    }
    
    const conversion = unitData[command][unit];
    if (!conversion) {
      onConversion(null, null, null, null, "⚠️ UNKNOWN UNIT DETECTED\nThis unit is not yet in our liberation database!");
      return;
    }
    
    const result = conversion.formula(numValue);
    const roundedResult = Math.round(result * 100) / 100;
    
    const message = generateMessage(command, numValue, unit, conversion, roundedResult);
    
    onConversion(command, numValue, unit, roundedResult, message);
    updateStats(command, conversion.type);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeConversion();
    }
  };

  return (
    <InputSection>
      <InputGroup>
        <Label>Command:</Label>
        <select 
          value={command} 
          onChange={(e) => setCommand(e.target.value)}
          style={{ flex: 1 }}
        >
          <option value="liberate">🗡️ LIBERATE (Imperial → Metric)</option>
          <option value="cook">👨‍🍳 COOK (Kitchen Units)</option>
          <option value="imperial">😈 IMPERIAL (Metric → Imperial)</option>
        </select>
      </InputGroup>
      
      <InputGroup>
        <Label>Value:</Label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="数値を入力"
          step="any"
          onKeyPress={handleKeyPress}
          style={{ flex: 1 }}
        />
        
        <select 
          value={unit} 
          onChange={(e) => setUnit(e.target.value)}
          style={{ flex: 1 }}
        >
          {unitOptions[command]?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <motion.button
          onClick={executeConversion}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ minWidth: '200px' }}
        >
          EXECUTE LIBERATION
        </motion.button>
      </InputGroup>
      
      <DeepLSection>
        <InputGroup>
          <Label color="#ff6b6b">🌍 Linguistic Liberation:</Label>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={deeplEnabled}
              onChange={(e) => setDeeplEnabled(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
          <DeepLStatus enabled={deeplEnabled}>
            {deeplEnabled ? ' ACTIVE ⚔️' : ' OFFLINE'}
          </DeepLStatus>
          
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            style={{ 
              marginLeft: '10px', 
              opacity: deeplEnabled ? 1 : 0.5 
            }}
            disabled={!deeplEnabled}
          >
            <option value="ja">🇯🇵 Japanese</option>
            <option value="en">🇺🇸 English</option>
            <option value="de">🇩🇪 German</option>
            <option value="fr">🇫🇷 French</option>
            <option value="es">🇪🇸 Spanish</option>
            <option value="it">🇮🇹 Italian</option>
            <option value="ko">🇰🇷 Korean</option>
            <option value="zh">🇨🇳 Chinese</option>
          </select>
        </InputGroup>
      </DeepLSection>

      <Examples>
        <strong>🎯 EXAMPLE MISSIONS:</strong><br />
        • 80°F → 26.67 °C<br />
        • 30inch → 76.2 cm<br />
        • 88mph → 141.62 km/h<br />

      </Examples>
    </InputSection>
  );
};

export default ConversionPanel; 