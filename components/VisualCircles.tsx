
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

    const elements: React.JSX.Element[] = [];

    // 100のグループ
    for (let i = 0; i < hundreds; i++) {
      elements.push(
        <div key={`hundred-${i}`} className={styles.hundredGroup}>
          <div className={styles.circleHundred}>100</div>
        </div>
      );
    }

    // 10のグループ
    for (let i = 0; i < tens; i++) {
      elements.push(
        <div key={`ten-${i}`} className={styles.tenGroup}>
          {Array(10)
            .fill(0)
            .map((_, j) => (
              <div key={`ten-circle-${i}-${j}`} className={styles.circle} />
            ))}
        </div>
      );
    }

    // 1の単位
    for (let i = 0; i < ones; i++) {
      elements.push(<div key={`one-${i}`} className={styles.circle} />);
    }

    return elements;
  };

  return <div className={styles.circleContainer}>{renderCircles()}</div>;
}