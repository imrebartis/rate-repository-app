import 'dotenv/config';

export default {
  "name": "rate-repository-app",
  "slug": "rate-repository-app",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "userInterfaceStyle": "light",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "ios": {
    "supportsTablet": true
  },
  "android": {
    "permissions": [
      "CAMERA",
      "RECORD_AUDIO",
      "WRITE_EXTERNAL_STORAGE",
      "READ_EXTERNAL_STORAGE",
      "android.permission.DETECT_SCREEN_CAPTURE"
    ],
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#ffffff"
    }
  },
  "web": {
    "favicon": "./assets/favicon.png"
  },
  "extra": {
    env: process.env.ENV,
    APOLLO_URI: process.env.APOLLO_URI
  }
}
