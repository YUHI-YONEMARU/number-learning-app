import React, { useState } from 'react';
import Head from 'next/head';
import VisualCircles from '../components/VisualCircles';
import Counter from '../components/Counter';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [count, setCount] = useState(0);

  const handleIncrement = (value: number) => {
    if (count + value <= 1000) { // 最大1000の制限
      setCount((prev) => prev + value);
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  // 音声合成用の関数
  const speak = (text: string) => {
    window.speechSynthesis.cancel(); // 既存の音声をキャンセル
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8; // 子ども向けにゆっくり
    utterance.volume = 1.0; // 音量最大
    utterance.pitch = 1.0; // 標準ピッチ
    window.speechSynthesis.speak(utterance);
  };

  // カウントを日本語の数字に変換
  const numberToJapanese = (num: number): string => {
    if (num === 0) return 'ゼロ';
    const units = ['', 'じゅう', 'ひゃく', 'せん'];
    const digits = ['ゼロ', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう'];
    
    let result = '';
    let n = num;
    let unitIndex = 0;

    while (n > 0) {
      const digit = n % 10;
      if (digit > 0) {
        const digitStr = digit === 1 && unitIndex > 0 ? '' : digits[digit];
        result = digitStr + units[unitIndex] + result;
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
      <div className={styles.countWrapper}>
        <div className={styles.countDisplay} aria-live="polite">{count}</div>
        <button
          className={styles.speakerButton}
          onClick={() => speak(numberToJapanese(count))}
          aria-label="現在の数を読み上げる"
        >
          🔊
        </button>
      </div>
      <VisualCircles count={count} />
      <Counter onIncrement={handleIncrement} onReset={handleReset} count={count} />
    </div>
  );
}