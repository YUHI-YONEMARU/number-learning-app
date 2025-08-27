import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/VisualCircles.module.css';

interface VisualCirclesProps {
  count: number;
}

export default function VisualCircles({ count }: VisualCirclesProps) {
  const [ones, setOnes] = useState(0);
  const [tens, setTens] = useState(0);
  const [hundreds, setHundreds] = useState(0);
  const [thousands, setThousands] = useState(0);
  const [animateTrigger, setAnimateTrigger] = useState(0); // アニメーション用トリガー

  // countが変化したときに、ones, tens, hundredsを更新
  useEffect(() => {
    const newThousands = Math.floor(count / 1000);
    const newHundreds = Math.floor((count % 1000) / 100);
    const newTens = Math.floor((count % 100) / 10);
    const newOnes = count % 10;

    if (newOnes < ones && ones >= 10) {
      // 1のオブジェクトが10個からリセットされた場合、アニメーションをトリガー
      setAnimateTrigger((prev) => prev + 1);
    }

    setThousands(newThousands);
    setHundreds(newHundreds);
    setTens(newTens);
    setOnes(newOnes);
  }, [count, ones]);

  const renderCircles = () => {
    const thousandElements: React.JSX.Element[] = [];
    const hundredElements: React.JSX.Element[] = [];
    const tenElements: React.JSX.Element[] = [];
    const oneElements: React.JSX.Element[] = [];

    // 1000のグループ（濃いオレンジ）
    for (let i = 0; i < thousands; i++) {
      thousandElements.push(
        <motion.div
          key={`thousand-${i}`}
          className={styles.thousandGroup}
          initial={{ opacity: 0, y: -20 }} // 上部からフェードイン
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.circleThousand}>1000</div>
        </motion.div>
      );
    }

    // 100のグループ（濃いオレンジ）
    for (let i = 0; i < hundreds; i++) {
      hundredElements.push(
        <motion.div
          key={`hundred-${i}-${animateTrigger}`} // アニメーションごとにキーを更新
          className={styles.hundredGroup}
          initial={{ opacity: 0, y: -20 }} // 上部からフェードイン
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.circleHundred}>100</div>
        </motion.div>
      );
    }

    // 10のグループ（中間のオレンジ）
    for (let i = 0; i < tens; i++) {
      tenElements.push(
        <motion.div
          key={`ten-${i}-${animateTrigger}`} // アニメーションごとにキーを更新
          className={styles.tenGroup}
          initial={{ opacity: 0, y: -20 }} // 上部からフェードイン
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.circleTen}>10</div>
        </motion.div>
      );
    }

    // 1の単位（薄いオレンジ）
    for (let i = 0; i < ones; i++) {
      oneElements.push(
        <AnimatePresence key={`one-wrapper-${i}`}>
          <motion.div
            key={`one-${i}`}
            className={styles.oneGroup}
            initial={{ opacity: 0, y: -20 }} // 上部からフェードイン
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }} // フェードアウトのみ
            transition={{ duration: 0.3 }}
          >
            <div className={styles.circleOne}>1</div>
          </motion.div>  
        </AnimatePresence>
      );
    }

    return (
      <div className={styles.columnsContainer}>
        {count >= 1000 && (
        <div className={styles.column}>
          <div className={styles.objects}>{thousandElements}</div>
          <div className={styles.plateThousand} />
        </div>
        )}
        {count >= 100 && (
        <div className={styles.column}>
          <div className={styles.objects}>{hundredElements}</div>
          <div className={styles.plateHundred} />
        </div>
        )}
        {count >= 10 && (
        <div className={styles.column}>
          <div className={styles.objects}>{tenElements}</div>
          <div className={styles.plateTen} />
        </div>
        )}
        <div className={styles.column}>
          <div className={styles.objects}>{oneElements}</div>
          <div className={styles.plateOne} />
        </div>
      </div>
    );
  };

  return <div className={styles.circleContainer}>{renderCircles()}</div>;
}