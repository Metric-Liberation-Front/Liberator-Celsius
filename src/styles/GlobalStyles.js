import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Courier New', monospace;
    background: #0c0c0c;
    color: #00ff00;
    overflow-x: hidden;
  }

  .output {
    background: #0d1117;
    border: 1px solid #333;
    border-radius: 4px;
    padding: 15px;
    margin-top: 20px;
    min-height: 100px;
    width: 100%;
    box-sizing: border-box;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
    font-family: 'Courier New', monospace;
    color: #00ff00;
  }

  .output pre {
    margin: 0;
    font-family: inherit;
    white-space: pre-wrap;
    word-break: break-all;
  }

  input, select, button {
    background: #2a2a2a;
    border: 1px solid #555;
    color: #00ff00;
    padding: 10px;
    font-family: 'Courier New', monospace;
    border-radius: 4px;
    font-size: 14px;
  }

  input:focus, select:focus {
    outline: none;
    border-color: #00ff00;
    box-shadow: 0 0 5px #00ff0050;
  }

  button {
    background: #ff6b6b;
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
    border: none;
  }

  button:hover {
    background: #ff5252;
    box-shadow: 0 0 10px #ff6b6b50;
    transform: translateY(-2px);
  }

  button:active {
    transform: translateY(0);
  }

  select {
    cursor: pointer;
  }

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }

  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #333;
    transition: .4s;
    border-radius: 24px;
    border: 1px solid #555;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 2px;
    bottom: 2px;
    background-color: #666;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #ff6b6b;
    border-color: #ff6b6b;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
    background-color: white;
  }

  .deepl-enabled {
    color: #4ade80 !important;
  }

  .deepl-disabled {
    color: #888 !important;
  }
`; 