import { defineConfig } from "@apps-in-toss/web-framework/config";

export default defineConfig({
  // 앱인토스 콘솔에 등록한 앱 이름(appName)과 반드시 같아야 업로드할 수 있어요.
  appName: "another-life",
  webView: {
    // 위로 당겨 새로고침, 스와이프 뒤로가기는 끄고 앱 안의 뒤로가기 흐름만 쓴다.
    pullToRefreshEnabled: false,
    allowsBackForwardNavigationGestures: false,
  },
  permissions: [],
  webBundleDir: "dist",
});
