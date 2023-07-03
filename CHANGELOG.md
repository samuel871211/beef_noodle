## todo

- custom classNames 的優先順序 低於 antd 原生的 css classNames（可用 inline style, !important）
- firebase/auth，有權限的人才能新增評論

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
