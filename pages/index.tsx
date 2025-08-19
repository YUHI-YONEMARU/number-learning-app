import { useState } from 'react';
import Counter from '../components/Counter';
import VisualCircles from '../components/VisualCircles';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = (value: number) => {
    setCount((prev) => prev + value);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className={styles.container}>
      <h1>数の学習アプリ</h1>
      <Counter count={count} onIncrement={handleIncrement} onReset={handleReset} />
      <VisualCircles count={count} />
    </div>
  );
}