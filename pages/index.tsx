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
  
    // 例外的な読み方（百、千、万）
    const specialHundreds: { [key: number]: string } = {
      3: 'さんびゃく',
      6: 'ろっぴゃく',
      8: 'はっぴゃく',
    };
    const specialThousands: { [key: number]: string } = {
      1: 'せん',
      3: 'さんぜん',
      8: 'はっせん',
    };
    const specialTenThousands: { [key: number]: string } = {
      1: 'いちまん',
    };

    let result = '';
    let n = num;
    let unitIndex = 0;

    while (n > 0) {
      const digit = n % 10;
      if (digit > 0) {
        // let digitStr = digits[digit];

        // 百の位（unitIndex=2）の例外
        if (unitIndex === 2 && specialHundreds[digit]) {
          result = specialHundreds[digit] + result;
        }
        // 千の位（unitIndex=3）の例外
        else if (unitIndex === 3 && specialThousands[digit]) {
          result = specialThousands[digit] + result;
        }
        // 万の位（unitIndex=4）の例外
        else if (unitIndex === 4 && specialTenThousands[digit]) {
          result = specialTenThousands[digit] + result;
        }
        // 通常の読み
        else {
          const unitStr = digit === 1 && unitIndex > 0 ? units[unitIndex] : digits[digit] + units[unitIndex];
          result = unitStr + result;
        }
      }
      n = Math.floor(n / 10);
      unitIndex++;
    }

    return result || 'ゼロ';
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>かずをたしていくアプリ</title>
        <meta name="description" content="数が増えていく様子を視覚化するアプリ" />
        <title>かずをたしていくアプリ</title>
        <meta name="description" content="かずをたしていくアプリは、子ども向けの数がふえていく様子を視覚的に学べるアプリです。1から9999までカウントでき、音声読み上げやアニメーションで数の変化を見て学べます。" />
        <meta name="keywords" content="かずをたしていく, 子ども, 算数, 学習, 数字, カウント, アプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#5EC06C" />
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon.png" />
        {/* Open Graph */}
        <meta property="og:title" content="かずをたしていくアプリ" />
        <meta property="og:description" content="子ども向けの数がふえていく様子を視覚的に学べるアプリ。音声とアニメーションで数の世界を体験できます。" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://number-learning-app.vercel.app/" />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="かずをたしていくアプリ" />
        <meta name="twitter:description" content="子ども向けの数がふえていく様子を視覚的に学べるアプリ。音声とアニメーションで数の世界を体験できます。" />
        <meta name="twitter:image" content="/og-image.png" />
      </Head>
      <h1 className={styles.title}>かずをたしていくアプリ</h1>
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