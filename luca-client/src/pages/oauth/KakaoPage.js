import axios from 'axios';
import styled from 'styled-components';

const KakaoLoginInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20rem auto;
  img {
    width: 100px;
    height: 100px;
    margin: 0.5rem;
    border-radius: 50%;
  }
`;
var check = false;
const KakaoPage = () => {
    // 인가코드
    const authorizationCode = new URL(window.location.href).searchParams.get(
        'code'
    );
    if (!check) {
        check = true;
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/user/kakao`,
                {
                    authorizationCode,
                },
                { 'Content-Type': 'application/json', withCredentials: true }
            )
            .catch((err) => {
                return err.response ? err.response : 'network error';
            });
    }

    return (
        <KakaoLoginInfo>
            카카오로 로그인 중...
        </KakaoLoginInfo>
    );
};

export default KakaoPage;