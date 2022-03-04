import axios from "axios";
import styled from "styled-components";
import { setIsLogin, setUserInfo } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../asset/images/login_icon_google.svg";

const GoogleLoginInfo = styled.div`
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


const GooglePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 인가코드
    const authorizationCode = new URL(window.location.href).search
        .split("=")[1]
        .split("&")[0];

    axios
        .post(
            `${process.env.REACT_APP_API_URL}/user/google`,
            {
                authorizationCode,
            }
        )
        .then((res) => {
            dispatch(setIsLogin(true));
            dispatch(setUserInfo(res.data.data));
            navigate("/")
        })
        .catch((err) => {
            console.log(err);
            return err.response ? err.response : "network error";
        });

    return (
        <GoogleLoginInfo>
            <img src={googleIcon} alt="구글 아이콘"></img> 구글로 로그인 중...
        </GoogleLoginInfo>
    );
};

export default GooglePage;