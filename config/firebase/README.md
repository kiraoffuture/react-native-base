## Firebase setup (develop/staging/product)

This project uses **React Native Firebase** (native) with **Expo prebuild**.

Place your Firebase config files here (never commit them):

- **Develop**
  - `config/firebase/develop/google-services.json`
  - `config/firebase/develop/GoogleService-Info.plist`
- **Staging**
  - `config/firebase/staging/google-services.json`
  - `config/firebase/staging/GoogleService-Info.plist`
- **Product**
  - `config/firebase/product/google-services.json`
  - `config/firebase/product/GoogleService-Info.plist`

`app.config.ts` automatically picks the right files based on `APP_ENV`.

