import axios from 'axios';
import styled from 'styled-components';

const NaverLoginInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20rem auto;
  img {
    width: 60px;
    height: 60px;
    margin: 0.5rem;
    border-radius: 50%;
  }
`;
var check = false;
const NaverPage = () => {
    // const authorizationCode = new URL(window.location.href).searchParams.get(
    //     'code'
    // );
    // if (!check) {
    //     check = true;
    //     axios
    //         .post(
    //             `${process.env.REACT_APP_API_URL}/user/naver`,
    //             {
    //                 authorizationCode,
    //             },
    //             { 'Content-Type': 'application/json', withCredentials: true }
    //         )
    //         .catch((err) => {
    //             return err.response ? err.response : 'network error';
    //         });
    // }

    return (
        <NaverLoginInfo>
            네이버로 로그인 중...
        </NaverLoginInfo>
    );
};

export default NaverPage;