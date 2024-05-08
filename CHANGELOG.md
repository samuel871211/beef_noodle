## todo

- custom classNames 的優先順序 低於 antd 原生的 css classNames（可用 inline style, !important）

## 0.15.0 (2024-05-08)

### feat

- 暫存評論功能優化，新增 `window.onBlur`

## 0.14.0 (2024-04-28)

### chore

- 新增套件 `swr`

### refactor

- 將 `useEffect` call api 的形式改成 `useSWR`

## 0.13.0 (2024-04-27)

### feat

- 點擊 table row 可以 focus 到單間店，但點擊 "看圖片" 並不會 focus 到單間店

### refactor

- 將 firebase 相關的邏輯抽到 utils，並且避免使用 Context 傳遞

### style

- 修正 edge 瀏覽器會有直向卷軸的問題

## 0.12.1 (2024-04-27)

### fixed

- 修正 antd `notification` 的使用方法 => `notificationIns.success`, `notificationIns.error`

### perf

- 牛肉麵評論的 `key` 改用 `document.id`

### style

- "再次造訪"欄位的值，改成用 Icon 呈現
- `showSorterTooltip: false`

## 0.12.0 (2024-04-17)

### style

- fixed table header

## 0.11.0 (2023-03-17)

### feat

- 暫存評論功能

### perf

- 一些 inline style 改成 class
- 固定不變的 object 抽到 component 外部定義

### fix

- `addAuthStateObserver` 加上 clean up function

## 0.10.0 (2024-02-16)

### added

- 添加 `beforeunload event`，避免尚未上傳評論就離開網頁
- 上傳圖片功能，並且改成可上傳多張圖片
- 表單驗證

## 0.9.0 (2023-08-03)

### added

- 登入登出功能（目前只有我本人登入才能撰寫評論）

## 0.8.1 (2023-07-31)

### style

- table 排版在 ios 壞掉的 bug 修正
- 新增 favicon.ico

## 0.8.0 (2023-07-30)

### added

- Global Context 新增 `googleAuthProvider`、`auth`

### style

- 新增評論失敗，會跳出通知

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
