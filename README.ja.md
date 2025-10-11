# Roy·Smee パーソナルブログ

<div align="center">

[简体中文](README.md) | [English](README.en.md) | [日本語](README.ja.md)

</div>

> Vue 3 + TypeScript + Vite で構築された現代的なパーソナルブログウェブサイト、フルスタック開発スキルとプロジェクトポートフォリオを展示

[![Vue](https://img.shields.io/badge/Vue-3.5.10-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Anime.js](https://img.shields.io/badge/Anime.js-3.2.2-FF6B6B?style=flat-square)](https://animejs.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## ✨ コア機能

- 🚀 **モダンな技術スタック** - Vue 3 Composition API + TypeScript + Vite で構築
- 📱 **レスポンシブデザイン** - モバイルファースト、すべてのデバイスサイズに完璧に対応
- 🎨 **高度なアニメーションシステム** - Anime.js + CSS3 + Intersection Observer による滑らかなアニメーション
- 🔍 **インテリジェント検索システム** - 通常/ファジー/ピンイン/AI の4つの検索モードをサポート、リアルタイムハイライト
- 🌐 **国際化アーキテクチャ** - 完全な中英バイリンガルサポート、動的言語切り替え
- ⚡ **パフォーマンス最適化** - コード分割、遅延読み込み、リソースプリロード、キャッシング戦略
- 🎬 **スマートビデオプレーヤー** - 自動ルート選択、Vimeo と Bilibili プラットフォームをサポート
- 🛠️ **開発者ツール** - フロントエンド、AI、MCP 開発ツールの厳選
- 📝 **コンテンツ管理** - Markdown レンダリング、動的コンテンツ読み込み
- 🎵 **音楽プレーヤー** - グローバル音楽再生コントロール
- 🎆 **インタラクティブエフェクト** - 花火アニメーション、磁場エフェクト、パーティクルシステム
- 🤖 **AI アシスタント** - DeepSeek AI を統合、インテリジェントな会話と検索提案

## 🏗️ プロジェクト構造

```
vue3-refactor/
├── public/                 # 静的アセット
│   ├── assets/            # 画像リソース
│   ├── audio/             # オーディオファイル
│   ├── css/               # グローバルスタイル
│   ├── images/            # 画像ファイル
│   ├── js/                # 静的スクリプト
│   └── 简历.pdf           # 履歴書ファイル
├── src/
│   ├── components/        # 共有コンポーネント
│   ├── composables/       # コンポジション関数
│   ├── pages/             # ページコンポーネント
│   │   ├── home/          # ホームページ
│   │   ├── work/          # ポートフォリオ
│   │   ├── tool/          # ツール
│   │   ├── blog/          # ブログ
│   │   ├── book/          # 書籍
│   │   └── about/         # 概要
│   ├── router/            # ルーター設定
│   ├── utils/             # ユーティリティ関数
│   ├── main.ts            # アプリケーションエントリー
│   └── Page.vue           # ルートコンポーネント
├── index.html             # HTML テンプレート
├── package.json           # プロジェクト設定
├── tsconfig.json          # TypeScript 設定
└── vite.config.ts         # Vite 設定
```

## 🚀 クイックスタート

### 要件

- Node.js 18.0+
- npm または pnpm

### インストール

```bash
# npm を使用
npm install

# または pnpm を使用
pnpm install
```

### 環境設定

`.env.example` を `.env` にコピーし、必要な環境変数を設定します：

```bash
cp .env.example .env
```

`.env` ファイルを編集して DeepSeek AI API Key を設定します（オプション、AI アシスタント機能用）：

```env
# DeepSeek AI API Key
# 取得先: https://platform.deepseek.com/api_keys
VITE_DEEPSEEK_API_KEY=your_api_key_here
```

### 開発モード

```bash
npm run dev
```

起動後 http://localhost:5173 にアクセス

### ページナビゲーション

- **ホーム**: http://localhost:5173/ - 個人紹介とスキル紹介
- **ポートフォリオ**: http://localhost:5173/work - プロジェクトポートフォリオ
- **ツール**: http://localhost:5173/tool - 開発者ツール推奨
- **ブログ**: http://localhost:5173/blog - 技術記事
- **書籍**: http://localhost:5173/book - 読書ノート
- **概要**: http://localhost:5173/about - 個人詳細

### プロダクションビルド

```bash
npm run build
```

ビルド出力は `dist/` ディレクトリに生成されます。

### ビルドプレビュー

```bash
npm run preview
```

## 🛠️ 技術スタック詳細

### 🏗️ コアアーキテクチャ

#### フロントエンドフレームワーク
- **Vue 3.5.10** - 最新の Composition API でより良いロジック再利用と型推論
  - `<script setup>` 構文糖衣を使用してコンポーネント記述を簡素化
  - Proxy ベースのリアクティブシステムでより良いパフォーマンス
  - Fragment、Teleport、Suspense 機能をサポート
- **TypeScript 5.0+** - プロジェクト全体の型安全性
  - 厳格モード設定でコード品質を確保
  - カスタム型定義で開発体験を向上
  - Vue 3 と完璧に統合、コンポーネント Props の型推論を提供
- **Vue Router 4.5.1** - モダンなルーティング管理
  - HTML5 History モード、SEO フレンドリー
  - ルートガードで動的ページタイトル更新
  - ルート遅延読み込みとコード分割をサポート
- **Arco Design Vue 2.57.0** - エンタープライズレベル UI コンポーネントライブラリ
  - ByteDance 製の高品質コンポーネントライブラリ
  - 豊富なコンポーネントとテーマカスタマイズ機能

#### ビルドツール
- **Vite 5.4.8** - 超高速開発体験
  - ESM ベースの開発サーバーで高速コールドスタート
  - HMR（ホットモジュール置換）サポート
  - プロダクション環境では Rollup でバンドルサイズを最適化
  - TypeScript サポートが組み込まれ、追加設定不要
  - 開発環境プロキシ設定で CORS 処理

### 🎨 アニメーションとインタラクション

#### アニメーションエンジン
- **Anime.js 3.2.2** - 軽量アニメーションライブラリ
  - CSS プロパティ、SVG、DOM 属性アニメーションをサポート
  - タイムライン制御で複雑なアニメーションシーケンスを実現
  - 豊富なイージング関数で自然なアニメーション効果
- **CSS3 Transitions & Animations** - ネイティブアニメーションサポート
  - ハードウェアアクセラレーションで優れたパフォーマンス
  - JavaScript アニメーションと連携
- **Intersection Observer API** - スクロールトリガーアニメーション
  - 高性能スクロール監視
  - 要素がビューポートに入るときにアニメーションをトリガー
  - 遅延読み込みとアニメーショントリガーのコア技術

#### 検索エンジン
- **Fuse.js 7.1.0** - 強力なファジー検索ライブラリ
  - 重み付け設定による複数フィールド検索
  - 関連性スコアリングとマッチハイライト
- **Pinyin 4.0.0** - 中国語ピンイン変換
  - 中国語ピンイン検索をサポート
  - 中国語ユーザーの検索体験を向上

### 🌐 国際化アーキテクチャ

#### 多言語サポート
- **カスタム i18n システム** - 軽量国際化ソリューション
  - Vue 3 Composition API で構築
  - ページリフレッシュなしで動的言語切り替え
  - 型安全な翻訳キーバリューペア
  - 自動ブラウザ言語検出

```typescript
// i18n Composable 実装
export function useI18n() {
  const currentLanguage = ref<Language>('zh')
  const t = computed(() => translations[currentLanguage.value])
  
  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'zh' ? 'en' : 'zh'
    localStorage.setItem('preferred-language', currentLanguage.value)
  }
  
  return { t, currentLanguage, toggleLanguage }
}
```

### 📱 レスポンシブデザイン

#### モバイルファースト戦略
- **フレキシブルグリッドシステム** - 弾性グリッドレイアウト
  - CSS Grid と Flexbox の組み合わせ使用
  - ブレークポイント設計：320px（モバイル）/ 768px（タブレット）/ 1024px（デスクトップ）
- **タッチフレンドリーインタラクション** - タッチ最適化インタラクション
  - 44px 最小タッチターゲット
  - スワイプジェスチャーサポート
  - モバイル最適化アニメーションパフォーマンス

### 🎬 スマートビデオシステム

#### マルチプラットフォームビデオ再生
- **インテリジェントルート選択** - ユーザーの位置に基づいて最適な再生ソースを自動選択
  ```typescript
  // 地理位置検出ロジック
  function guessIsChinaMainland(): boolean {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = navigator.language.toLowerCase();
    return tz.includes('Shanghai') || lang.startsWith('zh');
  }
  ```
- **Vimeo 統合** - 国際ユーザー向けの高品質体験
- **Bilibili 統合** - 国内ユーザー向けのシームレスアクセス
- **自動フォールバック** - ネットワーク問題時にバックアップルートに切り替え

### 🤖 AI アシスタント

#### DeepSeek AI 統合
- **インテリジェント会話** - DeepSeek Chat モデルベースのスマート対話
- **ストリーミングレスポンス** - SSE ストリーミング出力とタイプライター効果
- **コンテキスト管理** - インテリジェントな会話履歴管理、マルチターン対話をサポート
- **履歴書 Q&A** - 履歴書情報を自動読み込み、著者に関する質問に回答
- **検索提案** - 結果が見つからない場合、AI がインテリジェントな検索提案を提供
- **ローカルストレージ** - 会話履歴をローカルに永続化、ページリフレッシュ後も保持

#### 画像処理
- **BlurHash 2.0.5** - 画像ぼかしプレースホルダー
  - エレガントな画像読み込み体験を提供
  - 累積レイアウトシフト（CLS）を削減
- **Sharp 0.34.4** - 高性能画像処理（ビルド時）
  - 画像圧縮とフォーマット変換
  - レスポンシブ画像生成

### ⚡ パフォーマンス最適化戦略

#### コード分割と遅延読み込み
```typescript
// ルートレベルのコード分割
const routes = [
  {
    path: '/work',
    component: () => import('../pages/work/Work.vue')
  }
]

// コンポーネントレベルの遅延読み込み
const SmartVideo = defineAsyncComponent(
  () => import('../../components/SmartVideo.vue')
)
```

#### リソース最適化
- **画像遅延読み込み** - Intersection Observer で実装
- **動的スクリプト読み込み** - サードパーティライブラリをオンデマンド読み込み
- **キャッシング戦略** - ブラウザキャッシングと CDN 最適化

## 📄 ライセンス

このプロジェクトは MIT ライセンスの下でライセンスされています - 詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 👨‍💻 著者

**Roy·Smee**

- 🎓 桂林電子科技大学、デジタルメディア技術専攻、2025年卒業
- 💼 フルスタック開発エンジニア、Java + Vue 技術スタック専門
- 🚀 30+ プロジェクト経験、Web、モバイル、AI アプリケーションをカバー
- 🏆 優秀卒業設計賞受賞者、複数のコンペティション受賞

### 連絡先

- 📧 **GitHub**: [@1812095643](https://github.com/1812095643)
- 🦄 **Gitee**: [@caixukun66666666](https://gitee.com/caixukun66666666)

### 技術専門知識
- **フロントエンド開発**: Vue.js、React、TypeScript、WeChat ミニプログラム
- **バックエンド開発**: Java Spring Boot、Node.js、Python
- **AI アプリケーション**: LangChain、大規模モデル API 統合、Agent 開発
- **データベース**: MySQL 最適化、Redis キャッシングアーキテクチャ
- **エンジニアリング**: Vite、Webpack、CI/CD、パフォーマンス最適化

## 🤝 貢献

Issue と Pull Request を歓迎します！

### 貢献方法
1. このリポジトリをフォーク
2. 機能ブランチを作成（`git checkout -b feature/AmazingFeature`）
3. 変更をコミット（`git commit -m 'Add some AmazingFeature'`）
4. ブランチにプッシュ（`git push origin feature/AmazingFeature`）
5. Pull Request を開く

## 📞 連絡先

質問や提案がある場合は、以下の方法でお問い合わせください：

- 🐛 **Issue フィードバック**: [GitHub Issues](https://github.com/1812095643/vue3-refactor/issues)
- 💬 **技術交流**: GitHub または Gitee のプライベートメッセージ経由
- 📧 **ビジネス協力**: 個人ホームページの連絡先経由

---

⭐ **このプロジェクトが役に立った場合は、Star をください！**

🔥 **Fork とコード貢献を歓迎します。一緒により良い個人ブログシステムを構築しましょう！**

---

*最終更新: 2025年1月*
