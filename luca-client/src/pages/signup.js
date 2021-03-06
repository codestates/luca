import styled from "styled-components";
import { Navigator, Backdrop } from "../components/commons";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setIsLogin, setUserInfo } from "../redux/rootSlice";
import { useNavigate } from "react-router-dom";
import googleIcon from "../asset/images/login_icon_google.svg";
import kakaoIcon from "../asset/images/login_icon_kakao.svg";
import naverIcon from "../asset/images/login_icon_naver.svg";
import { color, radius, boxShadow } from "../styles";
import axios from "axios";
import {
  requestKakaoLogin,
  requestNaverLogin,
  requestGoogleLogin,
} from "../api";

const SignupPage = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  width: 100%;
  > div,
  title {
    flex: 1 0 auto;
    margin-bottom: 1em;
    font-size: 2em;
    font-weight: bold;
    padding-top: 1em;
  }
`;
const Registrybox = styled.div`
  width: 80%;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  > div {
    width: auto;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    > div.emailbox {
      margin-left: 100px;
    }
    > div.oauthbox {
      height: 90px;
      display: flex;
      align-items: center;
      > img {
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
      }
    }
    > div {
      display: flex;
      flex-direction: row;
      justify-content: center;
      width: 100%;
      > div {
        margin-right: 20px;
        font-size: 1.2rem;
      }
      > input {
        background-color: ${color.white};
        display: grid;
        grid-template-columns: 2fr 1fr;
        width: 400px;
        height: 40px;
        border-radius: ${radius};
        box-shadow: ${boxShadow};
        overflow: hidden;
      }
      > dummy {
        width: 90px;
      }
      > button {
        width: 90px;
        height: 52px;
        font-weight: bold;
        background-color: ${color.primaryLight};
        border: none;
        border-radius: ${radius};
        cursor: pointer;
        margin-left: 10px;
      }
      > img {
        width: 60px;
        height: 60px;
        margin: 0.5rem;
        border-radius: 50%;
        align-items: center;
        cursor: pointer;
      }
      > img:active {
        border: solid 3px darkorange;
      }
    }
    > button.submit {
      font-weight: bold;
      background-color: ${color.primaryLight};
      color: ${color.white};
      width: 200px;
      height: 40px;
      display: flex;
      justify-content: center;
      border-radius: ${radius};
      cursor: pointer;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid ${color.primaryBorder};
  border-radius: ${radius};
`;

const InputForm = ({ value = "", type = "text", placeholder, handleValue }) => {
  const handleOnChange = (event) => {
    handleValue(event.target.value);
  };
  return (
    <Input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={handleOnChange}
    />
  );
};
const InvalidMessage = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: red;
`;

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailDuplicate, setDuplicateEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [emailCode, setEmailCode] = useState("");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidEmailCheck, setIsValidEmailCheck] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);

  const onChangeEmail = (val) => {
    setEmail(val);
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(val)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  const onChangeEmailConfirm = (val) => {
    setEmailConfirm(val);
    if (emailCode !== val) {
      setIsValidEmailCheck(false);
    } else {
      setIsValidEmailCheck(true);
    }
  };

  const onChangeUsername = (val) => {
    setName(val);
    const usernameRegex = /^[???-???a-zA-Z]{2,15}$/;
    if (!usernameRegex.test(val)) {
      setIsValidUsername(false);
    } else {
      setIsValidUsername(true);
    }
  };

  const onChangePassword = (val) => {
    setPassword(val);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/;
    if (!passwordRegex.test(val)) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  };

  const onChangePasswordConfirm = (val) => {
    setPasswordConfirm(val);
    if (password !== val) {
      setIsValidPasswordConfirm(false);
    } else {
      setIsValidPasswordConfirm(true);
    }
  };

  const SignupHandler = () => {
    if (
      // ???????????? ???????????? ???????????? ??????
      email === "" ||
      emailConfirm === "" ||
      name === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      return;
    }
    if (
      // ???????????? ?????? ????????? ??????
      isValidEmail &&
      emailDuplicate === "??????????????? ??????????????????." &&
      isValidEmailCheck &&
      isValidUsername &&
      isValidPassword &&
      isValidPasswordConfirm
    ) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/user/signup`,
          {
            email,
            name,
            password,
          },
          {
            "Content-Type": "application/json",
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status === 201) {
            dispatch(setIsLogin(true));
            dispatch(setUserInfo(res.data.data));
            navigate("/");
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log(err);
          }
        });
    }
  };

  const sendMail = (email) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/user/checkAndMail`,
        { email: email },
        {
          "Content-Type": "application/json",
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.data === null) {
          setDuplicateEmail("?????? ???????????? ??????????????????.");
        } else {
          setDuplicateEmail("??????????????? ??????????????????.");
          setEmailCode(res.data.data.code);
        }
      });
  };

  return (
    <div>
      <Navigator />
      <Backdrop>
        <SignupPage>
          <div className="title">????????????</div>
          <Registrybox>
            <div>
              <div className="emailbox">
                <InputForm
                  value={email}
                  placeholder="?????????"
                  handleValue={onChangeEmail}
                />
                <button
                  onClick={() => {
                    sendMail(email);
                  }}
                >
                  ??????
                </button>
              </div>
            </div>

            <div>
              {isValidEmail ? null : (
                <InvalidMessage>
                  ????????? ????????? ???????????? ????????????.
                </InvalidMessage>
              )}
              {emailDuplicate !== "?????? ???????????? ??????????????????." ? null : (
                <InvalidMessage>{emailDuplicate}</InvalidMessage>
              )}
            </div>

            <div>
              <div>
                <InputForm
                  value={emailConfirm}
                  placeholder="?????? ??????"
                  handleValue={onChangeEmailConfirm}
                />
              </div>
            </div>

            <div>
              {isValidEmailCheck ? null : (
                <InvalidMessage>????????? ???????????? ????????????.</InvalidMessage>
              )}
            </div>

            <div>
              <div>
                <InputForm
                  value={name}
                  placeholder="?????????"
                  handleValue={onChangeUsername}
                />
              </div>
            </div>

            <div>
              {isValidUsername ? null : (
                <InvalidMessage>
                  ???????????? ?????? ?????? ?????? ???????????? 2~15????????? ?????? ???????????????.
                </InvalidMessage>
              )}
            </div>

            <div>
              <div>
                <InputForm
                  value={password}
                  placeholder="????????????"
                  handleValue={onChangePassword}
                  type="password"
                />
              </div>
            </div>

            <div>
              {isValidPassword ? null : (
                <InvalidMessage>
                  ??????????????? ?????? 8?????? ??????????????? ?????? ?????????, ??????, ???????????????
                  1??? ?????? ??????????????? ?????????.
                </InvalidMessage>
              )}
            </div>

            <div>
              <div>
                <InputForm
                  value={passwordConfirm}
                  placeholder="???????????? ??????"
                  handleValue={onChangePasswordConfirm}
                  type="password"
                />
              </div>
            </div>

            <div>
              {isValidPasswordConfirm ? null : (
                <InvalidMessage>??????????????? ???????????? ????????????.</InvalidMessage>
              )}
            </div>

            <div>
              <div>
                <button className="submit" onClick={SignupHandler}>
                  ????????????
                </button>
              </div>
            </div>

            <div>
              <div className="oauthbox">
                <img
                  src={kakaoIcon}
                  alt="????????? ?????????"
                  onClick={requestKakaoLogin}
                ></img>
                <img
                  src={googleIcon}
                  alt="????????? ?????????"
                  onClick={requestGoogleLogin}
                ></img>
                <img
                  src={naverIcon}
                  alt="????????? ?????????"
                  onClick={requestNaverLogin}
                ></img>
              </div>
            </div>
          </Registrybox>
        </SignupPage>
      </Backdrop>
    </div>
  );
}
