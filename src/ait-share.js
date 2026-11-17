// 토스 앱 안에서 "친구에게 공유하기"를 누르면 실행돼요.
// getTossShareLink: 친구가 누르면 토스 앱의 '타인의 삶'(해당 직업 화면)으로 바로 열리는 링크를 만들어요.
// share: 휴대폰 공유 시트를 열어요. 여기서 카카오톡을 고르면 대화방에 바로 보낼 수 있어요.
import { getTossShareLink, share } from "@apps-in-toss/web-framework";

window.__aitShare = async (path, text) => {
  const link = await getTossShareLink(path);
  await share({ message: `${text}\n${link}` });
};
