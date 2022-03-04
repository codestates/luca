import axios from 'axios';
import styled from 'styled-components';
import { setIsLogin, setUserInfo } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import naverIcon from '../../asset/images/login_icon_naver.svg';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // 인가코드
    const authorizationCode = new URL(window.location.href).searchParams.get(
        'code'
    );

    axios
        .post(
            `${process.env.REACT_APP_API_URL}/user/naver`,
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
            console.log(err);
            console.log(err.response);
            return err.response ? err.response : 'network error';
        });

    return (
        <NaverLoginInfo>
            <img src={naverIcon} alt='네이버 아이콘'></img>네이버로 로그인 중...
        </NaverLoginInfo>
    );
};

export default NaverPage;