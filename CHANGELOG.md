## todo

- custom classNames 的優先順序 低於 antd 原生的 css classNames（可用 inline style, !important）
- firebase/auth，有權限的人才能新增評論

## 0.7.2 (2023-07-30)

### style

- 100vh 改成根據 `window.innerHeight`
- table layout 固定，每個欄位的寬度都預先定義好

## 0.7.1 (2023-07-30)

### style

- 總分用紅字，區別其他分數

### chore

- 新增 `deploy` 指令

## 0.7.0 (2023-07-30)

### chore

- firebase hosting

## 0.6.0 (2023-07-30)

### added

- 新增評論功能（上傳圖片尚未完成）
- `GlobalContext` 的 `firestore` 改成 `collectionRef`，目前只有一個 collection

### style

- 牛肉麵表格，column 順序調整，牛筋、牛肚放到後面
- 牛肉麵表格，pagination 顯示
- 牛肉麵表格，全屏高度（手機應該會超過，因為是用 100vh）
- 牛肉麵表格，分數的字體會放大

## 0.5.0 (2023-07-03)

### added

- meta

### fixed

- `.env.local` 修正

## 0.4.0 (2023-07-03)

### added

- 牛肉麵圖片存到 fire storage
- 新增 Component `ImageDialogCarousel`，渲染一個開啟按鈕 + 牛肉麵圖片輪播 Dialog
- `GlobalContext` 新增了 `firebaseStorage`

## 0.3.0 (2023-07-02)

### added

- 牛肉麵評論存到 firestore
- 取得所有評論
- 新增單則評論的 UI
- `firebaseOptions` 的機密都寫在 `.env.local`

## 0.2.0 (2023-06-25)

### added

- 牛肉麵表格

### chore

- basePath `/test/beef_noodle`

### chore

- 新增套件 `@ant-design/icons`
- 新增套件 `firebase-tools`

## 0.1.0 (2023-06-22)

### chore

- 專案基本設定（nextjs, typescript, eslint, prettier, husky, lint-staged, antd, firebase）
