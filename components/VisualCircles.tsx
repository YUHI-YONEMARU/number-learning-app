import React from 'react';
import styles from '../styles/VisualCircles.module.css';

interface VisualCirclesProps {
  count: number;
}

export default function VisualCircles({ count }: VisualCirclesProps) {
  const renderCircles = () => {
    const hundreds = Math.floor(count / 100);
    const tens = Math.floor((count % 100) / 10);
    const ones = count % 10;

    const hundredElements: React.JSX.Element[] = [];
    const tenElements: React.JSX.Element[] = [];
    const oneElements: React.JSX.Element[] = [];

    // 100のグループ（濃いオレンジ）
    for (let i = 0; i < hundreds; i++) {
      hundredElements.push(
        <div key={`hundred-${i}`} className={styles.hundredGroup}>
          <div className={styles.circleHundred}>100</div>
        </div>
      );
    }

    // 10のグループ（中間のオレンジ）
    for (let i = 0; i < tens; i++) {
      tenElements.push(
        <div key={`ten-${i}`} className={styles.tenGroup}>
          <div className={styles.circleTen}>10</div>
        </div>
      );
    }

    // 1の単位（薄いオレンジ）
    for (let i = 0; i < ones; i++) {
      oneElements.push(<div key={`one-${i}`} className={styles.circle} />);
    }

    return (
      <div className={styles.columnsContainer}>
        <div className={styles.column}>{hundredElements}</div>
        <div className={styles.column}>{tenElements}</div>
        <div className={styles.column}>{oneElements}</div>
      </div>
    );
  };

  return <div className={styles.circleContainer}>{renderCircles()}</div>;
}