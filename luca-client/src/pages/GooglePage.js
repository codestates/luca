import axios from 'axios';
import styled from 'styled-components';

const GoogleLoginInfo = styled.div`
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
const GooglePage = () => {
    // 인가코드
    const authorizationCode = new URL(window.location.href).search
        .split('=')[1]
        .split('&')[0];

    if (!check) {
        check = true;
        axios
            .post(
                `http://localhost:80/user/auth/google`,
                {
                    authorizationCode,
                }
            )
            .catch((err) => {
                return err.response ? err.response : 'network error';
            });
    }

    return (
        <GoogleLoginInfo>
            구글로 로그인 중...
        </GoogleLoginInfo>
    );
};

export default GooglePage;