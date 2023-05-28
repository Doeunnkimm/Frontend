import { userDetail } from 'constants/userDetail';

export default function handler(req, res) {
  // 이름을 handler로 해줘야 합니다.
  res.status(200).json(userDetail);
}
