# nambuproject-frontend

남부여성발전센터 말모이 프로젝트 Frontend

# src>components 폴더 생성

# clone한 경우 npm install 필요

# npm install react-router-dom

# npm install react-hook-form react-datepicker // 20241125 추가

# npm install @mui/material @emotion/react @emotion/styled // 20241126 유미경님 추가

# npm install @mui/icons-material // 20241127 전혜옥님 추가

# npm install webm-to-wav-converter // 20241127 전혜옥님 추가

frontend/
src/
├── components/
│ ├── CategoryBox.jsx # 카테고리박스
│ ├── DictionaryViewer.jsx # 사전암기뷰어
│ ├── Header.jsx # 헤더 - 최상위
│ └── TabMenu.jsx # 로그인이후 메뉴바
├── context/
│ └── AuthContext.js # 인증 상태 관리 컨텍스트
├── pages/
│ ├── Challenge.jsx # 사전암기 화면
│ ├── Dictionary.jsx # 사전조회
│ ├── HomePage.jsx # 메인/로그인이후메인/Home 화면
│ ├── LoginPage.jsx # 로그인 화면
│ ├── LogoutPage.jsx # 로그아웃 기능
│ ├── SignupPage.jsx # 회원가입 화면
│ ├── User.jsx # 사용자 수정 화면
│ └── Word.jsx # 사전입력 화면
├── utils/
│ └── axiosInstance.js # Axios 인스턴스 설정
├── App.js # 앱 루트 컴포넌트
└── index.js # ReactDOM 렌더링 진입점

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
