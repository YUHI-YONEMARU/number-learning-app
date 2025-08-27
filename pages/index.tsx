import React, { useState } from 'react';
import Head from 'next/head';
import VisualCircles from '../components/VisualCircles';
import Counter from '../components/Counter';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [count, setCount] = useState(0);

  const handleIncrement = (value: number) => {
    if (count + value <= 10000) {
      setCount((prev) => prev + value);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    utterance.volume = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const numberToJapanese = (num: number): string => {
    if (num === 0) return 'ゼロ';
    const units = ['', 'じゅう', 'ひゃく', 'せん', 'まん'];
    const digits = ['ゼロ', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
    
    let result = '';
    let n = num;
    let unitIndex = 0;
    let unit = "";

    while (n > 0) {
      const digit = n % 10;
      if (digit > 0) {
        const digitStr = digit === 1 && unitIndex > 0 ? '' : digits[digit];
        // 300台
        if (digit === 3 && unitIndex === 2) {
          unit = 'びゃく';
        // 600,800台
        } else if ( (digit === 6 || digit === 8) && unitIndex === 2) {
          unit = 'ぴゃく';  
        } else {
          unit = units[unitIndex];
        }
        result = digitStr + unit + result;
      }
      n = Math.floor(n / 10);
      unitIndex++;
    }

    return result || 'ゼロ';
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>かずがふえていくアプリ</title>
        <meta name="description" content="数を増やして視覚化するアプリ" />
      </Head>
      <h1 className={styles.title}>かずがふえていくアプリ</h1>
      <div className={styles.wrapper}>
        <VisualCircles count={count} />
      </div>
      <div className={styles.countWrapper}>
        <div className={styles.speakerArea}>
         <button
          className={styles.speakerButton}
          onClick={() => speak(numberToJapanese(count))}
          aria-label="現在の数を読み上げる"
        >
        🔊
        </button>
         </div>
        <div className={styles.countDisplay} aria-live="polite">{count}</div>
        <div className={styles.resetArea}>
         <button
          className={styles.resetButton}
          onClick={handleReset}
          aria-label="現在の数を読み上げる"
        >
        ❌️
        </button>
         </div>
      </div>
      <Counter onIncrement={handleIncrement} count={count} />
    </div>
  );
}