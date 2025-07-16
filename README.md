# イメージスケール座標・色コード管理アプリ

## 起動方法

### 1. ローカルサーバーで起動（推奨）
```bash
# Python 3を使用
python3 -m http.server 8000

# または Node.js npxを使用
npx serve .

# または PHP
php -S localhost:8000
```

### 2. ブラウザでアクセス
```
http://localhost:8000
```

## 使用方法

1. 左ペインのイメージスケール図をクリック
2. 座標に基づいて3色組合せが自動生成
3. 右ペインのテーブルでデータを編集・管理
4. CSVボタンでデータをダウンロード

## ファイル構成

- `index.html` - メインHTML
- `script.js` - JavaScript機能
- `styles.css` - スタイルシート
- `image/imagescale01.jpg` - イメージスケール背景画像

## 機能

- リアルタイム座標表示
- 座標ベースの色生成
- データ永続化（localStorage）
- CSV出力機能
- レスポンシブデザイン