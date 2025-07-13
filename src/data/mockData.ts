import { LearningMemo } from '../types/memo'

export const mockMemos: LearningMemo[] = [
  {
    id: '1',
    title: 'マーケティングの4P理論について',
    content: 'Product（製品）、Price（価格）、Place（流通）、Promotion（販促）の4つの要素から成るマーケティングミックスの基本概念。企業がターゲット市場に対してどのような価値を提供するかを体系的に考えるためのフレームワーク。',
    source: 'マーケティング入門',
    sourceUrl: 'https://example.com/marketing-book',
    topics: ['マーケティング', 'フレームワーク', 'ビジネス戦略'],
    createdAt: '2024-01-15T10:30:00Z',
    summary: 'マーケティングの基本となる4P理論の概要'
  },
  {
    id: '2',
    title: 'React Hooksの使い方',
    content: 'React Hooksは関数コンポーネントでstateやライフサイクルメソッドを使用できる機能。useState、useEffect、useContextなどがよく使われる。クラスコンポーネントを書く必要がなくなり、よりシンプルなコードが書ける。',
    source: 'React公式ドキュメント',
    sourceUrl: 'https://react.dev/learn',
    topics: ['React', 'JavaScript', 'フロントエンド', 'プログラミング'],
    createdAt: '2024-01-20T14:45:00Z',
    summary: 'React Hooksの基本的な使い方と利点'
  },
  {
    id: '3',
    title: 'アジャイル開発のスクラム手法',
    content: 'スクラムは反復的・漸進的なソフトウェア開発手法。スプリント（通常2-4週間）という期間でプロダクトの増分を開発する。デイリースクラム、スプリントプランニング、スプリントレビューなどのイベントが定義されている。',
    source: 'スクラムガイド',
    sourceUrl: 'https://scrumguides.org',
    topics: ['アジャイル', 'スクラム', 'プロジェクト管理', '開発手法'],
    createdAt: '2024-02-05T09:15:00Z',
    summary: 'スクラム手法の基本構造とイベント'
  },
  {
    id: '4',
    title: 'TypeScriptの型システム',
    content: 'TypeScriptは静的型付けによってJavaScriptの開発体験を向上させる。Union型、Intersection型、Generics、Conditional TypesなどのAdvanced Typesを活用することで、より安全で表現力豊かなコードが書ける。',
    source: 'TypeScript Deep Dive',
    sourceUrl: 'https://basarat.gitbook.io/typescript/',
    topics: ['TypeScript', 'プログラミング', '型システム', 'JavaScript'],
    createdAt: '2024-02-12T16:20:00Z',
    summary: 'TypeScriptの高度な型システムの活用方法'
  },
  {
    id: '5',
    title: 'デザインシステムの構築',
    content: 'デザインシステムは一貫したUIを構築するためのガイドラインとコンポーネントライブラリ。色、タイポグラフィ、スペーシング、コンポーネントのルールを定義し、チーム全体で共有することで効率的な開発が可能になる。',
    source: 'Atomic Design',
    sourceUrl: 'https://atomicdesign.bradfrost.com/',
    topics: ['デザインシステム', 'UI/UX', 'フロントエンド', 'デザイン'],
    createdAt: '2024-02-18T11:00:00Z',
    summary: 'デザインシステム構築の基本概念と利点'
  },
  {
    id: '6',
    title: 'マーケティングファネルの最適化',
    content: 'AARRR（Acquisition, Activation, Retention, Revenue, Referral）フレームワークを使ってユーザーの行動を分析。各段階での離脱率を測定し、ボトルネックを特定して改善施策を実行する。',
    source: 'グロースハック完全読本',
    sourceUrl: 'https://example.com/growth-hack',
    topics: ['マーケティング', 'グロースハック', 'データ分析', 'AARRR'],
    createdAt: '2024-03-01T13:30:00Z',
    summary: 'AARRRフレームワークによるマーケティングファネル分析'
  }
]