import React from 'react';
import styles from '../styles/Counter.module.css';

interface CounterProps {
  onIncrement: (value: number) => void;
  count: number;
}

export default function Counter({ onIncrement, count }: CounterProps) {
  const isPlus1000Disabled = count >= 9000;
  const isPlus100Disabled = count >= 9900;
  const isPlus10Disabled = count >= 9990;
  const isPlus1Disabled = count >= 9999;

  return (
    <div className={styles.buttonContainer}>
      {count >= 1000 && (
        <div className={styles.incrementButton}>
          <button
            className={styles.button}
            onClick={() => onIncrement(1000)}
            disabled={isPlus1000Disabled}
            aria-label="プラス1000"
          >
            +1000
          </button>
        </div>
      )}
      {count >= 100 && (
        <div className={styles.incrementButton}>
          <button
            className={styles.button}
            onClick={() => onIncrement(100)}
            disabled={isPlus100Disabled}
            aria-label="プラス100"
          >
            +100
          </button>
        </div>
      )}
      {count >= 10 && (
        <div className={styles.incrementButton}>
          <button
            className={styles.button}
            onClick={() => onIncrement(10)}
            disabled={isPlus10Disabled}
            aria-label="プラス10"
          >
            +10
          </button>
        </div>
      )}
      <div className={styles.incrementButton}>
        <button
          className={styles.button}
          onClick={() => onIncrement(1)}
          disabled={isPlus1Disabled}
          aria-label="プラス1"
        >
          +1
        </button>
      </div>
     </div>
  );
}