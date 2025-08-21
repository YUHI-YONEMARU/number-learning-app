import React from 'react';
import styles from '../styles/Counter.module.css';

interface CounterProps {
  onIncrement: (value: number) => void;
  onReset: () => void;
  count: number;
}

export default function Counter({ onIncrement, onReset, count }: CounterProps) {
  const isPlus100Disabled = count >= 900;
  const isPlus10Disabled = count >= 990;
  const isPlus1Disabled = count >= 999;

  return (
    <div className={styles.buttonContainer}>
      <div className={styles.incrementButtons}>
        {count >= 100 && (
          <button
            className={styles.button}
            onClick={() => onIncrement(100)}
            disabled={isPlus100Disabled}
            aria-label="プラス100"
          >
            +100
          </button>
        )}
        {count >= 10 && (
          <button
            className={styles.button}
            onClick={() => onIncrement(10)}
            disabled={isPlus10Disabled}
            aria-label="プラス10"
          >
            +10
          </button>
        )}
      </div>
      <div className={styles.oneAndReset}>
        <button
          className={styles.button}
          onClick={() => onIncrement(1)}
          disabled={isPlus1Disabled}
          aria-label="プラス1"
        >
          +1
        </button>
        <button
          className={styles.resetButton}
          onClick={onReset}
          aria-label="リセット"
        >
          リセット
        </button>
      </div>
    </div>
  );
}