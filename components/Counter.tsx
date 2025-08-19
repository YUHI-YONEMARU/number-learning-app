import React from 'react';
import styles from '../styles/Counter.module.css';

interface CounterProps {
  onIncrement: (value: number) => void;
  onReset: () => void;
  count: number;
}

export default function Counter({ onIncrement, onReset, count }: CounterProps) {
  // カウントが1000未満の場合のみボタンを有効化
  const isPlus100Disabled = count >= 900; // 1000 - 100
  const isPlus10Disabled = count >= 990; // 1000 - 10
  const isPlus1Disabled = count >= 999; // 1000 - 1

  return (
    <div className={styles.buttonContainer}>
      <button
        className={styles.button}
        onClick={() => onIncrement(100)}
        disabled={isPlus100Disabled}
        aria-label="プラス100"
      >
        +100
      </button>
      <button
        className={styles.button}
        onClick={() => onIncrement(10)}
        disabled={isPlus10Disabled}
        aria-label="プラス10"
      >
        +10
      </button>
      <button
        className={styles.button}
        onClick={() => onIncrement(1)}
        disabled={isPlus1Disabled}
        aria-label="プラス1"
      >
        +1
      </button>
      <button
        className={styles.button}
        onClick={onReset}
        aria-label="リセット"
      >
        リセット
      </button>
    </div>
  );
}