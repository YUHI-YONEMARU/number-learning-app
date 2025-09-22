import React from 'react';
import styles from '../styles/Counter.module.css';
import classnames from "classnames";

interface CounterProps {
  onIncrement: (value: number) => void;
  count: number;
}

export default function Counter({ onIncrement, count }: CounterProps) {
  const isPlus100000Disabled  = count >= 900000;
  const isPlus10000Disabled   = count >= 990000;
  const isPlus1000Disabled    = count >= 999000;
  const isPlus100Disabled     = count >= 999900;
  const isPlus10Disabled      = count >= 999990;
  const isPlus1Disabled       = count >= 999999;

  return (
    <div className={styles.buttonContainer}>
      {count >= 100000 && (
        <div className={classnames(styles.incrementButton, styles.increment100000Button)}>
          <button
            className={styles.button}
            onClick={() => onIncrement(100000)}
            disabled={isPlus100000Disabled}
            aria-label="プラス100000"
          >
            +100000
          </button>
        </div>
      )}
      {count >= 10000 && (
        <div className={classnames(styles.incrementButton, styles.increment10000Button)}>
          <button
            className={styles.button}
            onClick={() => onIncrement(10000)}
            disabled={isPlus10000Disabled}
            aria-label="プラス10000"
          >
            +10000
          </button>
        </div>
      )}
      {count >= 1000 && (
        <div className={classnames(styles.incrementButton, styles.increment1000Button)}>
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
        <div className={classnames(styles.incrementButton, styles.increment100Button)}>
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
        <div className={classnames(styles.incrementButton, styles.increment10Button)}>
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
      <div className={classnames(styles.incrementButton, styles.increment1Button)}>
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