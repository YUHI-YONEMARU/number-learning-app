/* components/Counter.tsx */
import styles from '../styles/Counter.module.css';

interface CounterProps {
  count: number;
  onIncrement: (value: number) => void;
  onReset: () => void;
}

export default function Counter({ count, onIncrement, onReset }: CounterProps) {
  return (
    <div className={styles.counter}>
      <h2>現在の数: {count}</h2>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => onIncrement(1)}>
          +1
        </button>
        {count >= 10 && (
          <button className={styles.button} onClick={() => onIncrement(10)}>
            +10
          </button>
        )}
        {count >= 100 && (
          <button className={styles.button} onClick={() => onIncrement(100)}>
            +100
          </button>
        )}
        <button className={styles.button} onClick={onReset}>
          リセット
        </button>
      </div>
    </div>
  );
}