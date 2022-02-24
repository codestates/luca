import axios from 'axios';
import styled from 'styled-components';
import { setIsLogin, setUserInfo } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import kakaoIcon from '../../asset/images/login_icon_kakao.svg';

const KakaoLoginInfo = styled.div`
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

const KakaoPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 인가코드
    const authorizationCode = new URL(window.location.href).searchParams.get(
        'code'
    );

    axios
        .post(
            `${process.env.REACT_APP_API_URL}/user/kakao`,
            {
                authorizationCode,
            },
            { 'Content-Type': 'application/json', withCredentials: true }
        )
        .then((res) => {
            dispatch(setIsLogin(true));
            dispatch(setUserInfo(res.data.data));
            navigate("/")
        })
        .catch((err) => {
            return err.response ? err.response : 'network error';
        });

    return (
        <KakaoLoginInfo>
            <img src={kakaoIcon} alt='카카오 아이콘'></img> 카카오로 로그인 중...
        </KakaoLoginInfo>
    );
};

export default KakaoPage;