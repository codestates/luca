import styled from "styled-components";
import { Navigator, Backdrop } from "../components/commons";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setIsLogin, setUserInfo } from "../redux/rootSlice";
import { useNavigate } from 'react-router-dom';
import googleIcon from '../asset/images/login_icon_google.svg';
import kakaoIcon from '../asset/images/login_icon_kakao.svg';
import naverIcon from '../asset/images/login_icon_naver.svg';
import { color, device, radius, boxShadow } from '../styles';
import axios from "axios";
import {
  requestKakaoLogin,
  requestNaverLogin,
  requestGoogleLogin,
} from "../api";

const SignupPage = styled.div`
  /* border: solid; */
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-between; */
  height: 60vh;
  /* background-color: seashell; */
  > div,title {
    flex: 1 0 auto;
    margin-bottom: 1em;
    font-size: 2em;
    font-weight: bold;
    padding-top: 1em;
  }
`;
const Registrybox = styled.div`
  width: 1080px;
  /* width: 80%; */
  height: 90%;
  border: solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  > div {
    width: auto;
    margin-right: 220px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    > div {
      display: flex;
      flex-direction: row;
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
        border-radius: ${radius};
        cursor: pointer;
      }
      > img {
        width: 60px;
        height: 60px;
        margin: 0.5rem;
        border-radius: 50%;
        align-items: center;
        cursor: pointer;
      }
    }
    > button.submit {
        font-weight: bold;
        background-color: ${color.primaryLight};
        color: ${color.white};
        margin-right: 240px;
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

const InputForm = ({
  value = '',
  type = 'text',
  placeholder,
  handleValue,
}) => {
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
}
const InvalidMessage = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: red;
`;

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailDuplicate, setDuplicateEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [emailCode, setEmailCode] = useState('');

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

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
  }

  const onChangeUsername = (val) => {
    setName(val);
    const usernameRegex = /^[가-힣a-zA-Z]{2,15}$/;
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
  }

  const SignupHandler = () => {
    if (
      // 입력칸이 하나라도 비어있는 경우
      email === '' ||
      emailConfirm === '' ||
      name === '' ||
      password === '' ||
      passwordConfirm === ''
    ) {
      return;
    }
    if (
      // 입력값이 모두 유효한 경우
      isValidEmail &&
      emailDuplicate === "사용가능한 이메일입니다." &&
      isValidEmailCheck &&
      isValidUsername &&
      isValidPassword &&
      isValidPasswordConfirm
    ) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/signup`,
          {
            email,
            name,
            password
          }, {
          "Content-Type": "application/json",
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(setIsLogin(true));
            dispatch(setUserInfo(res.data.data));
            navigate("/")
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log(err)
          }
        });
    }
  };

  const sendMail = (email) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/checkAndMail`, { email: email }, {
        "Content-Type": "application/json",
        withCredentials: true,
      }).then((res => {
        if (res.data.data === null) {
          setDuplicateEmail("이미 존재하는 이메일입니다.")
        } else {
          setDuplicateEmail("사용가능한 이메일입니다.")
          setEmailCode(res.data.data.code)

          console.log(emailConfirm)
          console.log(res.data.data.code)
        }
      }))
  }

  return (
    <div>
      <Navigator />
      <Backdrop>
        <SignupPage>
          <div className='title'>회원가입</div>
          <Registrybox>
            <div>
              <div>
                <InputForm
                  value={email}
                  placeholder='이메일'
                  handleValue={onChangeEmail}
                />
                <button onClick={() => {
                  sendMail(email)
                }}>인증</button>
              </div>
            </div>

            <div>
              {isValidEmail ? null : (
                <InvalidMessage>이메일 형식이 유효하지 않습니다.</InvalidMessage>
              )}
              {emailDuplicate !== "이미 존재하는 이메일입니다." ? null : (
                <InvalidMessage>{emailDuplicate}</InvalidMessage>
              )}
            </div>

            <div>
              <div>
                {emailCode === '' ? null : (
                  <InputForm
                    value={emailConfirm}
                    placeholder='코드'
                    handleValue={onChangeEmailConfirm}
                  />
                )}
              </div>
            </div>

            <div>
              {isValidEmailCheck ? null : (
                <InvalidMessage>코드가 일치하지 않습니다.</InvalidMessage>
              )}
            </div>

            <div>
              <div>
                <InputForm
                  value={name}
                  placeholder='닉네임'
                  handleValue={onChangeUsername}
                />
              </div>
            </div>

            <div>
              {isValidUsername ? null : (
                <InvalidMessage>
                  닉네임은 한글 또는 영문 대소문자 2~15자리만 사용 가능합니다.
                </InvalidMessage>
              )}
            </div>

            <div>
              <div>
                <InputForm
                  value={password}
                  placeholder='비밀번호'
                  handleValue={onChangePassword}
                  type='password'
                />
              </div>
            </div>

            <div>
              {isValidPassword ? null : (
                <InvalidMessage>
                  비밀번호는 최소 8자리 이상이어야 하며 영문자, 숫자,
                  특수문자가 1개 이상 사용되어야 합니다.
                </InvalidMessage>
              )}
            </div>

            <div>
              <div>
                <InputForm
                  value={passwordConfirm}
                  placeholder='비밀번호 확인'
                  handleValue={onChangePasswordConfirm}
                  type='password'
                />
              </div>
            </div>

            <div>
              {isValidPasswordConfirm ? null : (
                <InvalidMessage>비밀번호가 일치하지 않습니다.</InvalidMessage>
              )}
            </div>

            <div>
              <button className='submit' onClick={SignupHandler}>회원가입</button>
            </div>

            <div>
              <div>
                <img src={kakaoIcon} alt='카카오 아이콘' onClick={requestKakaoLogin}></img>
                <img src={googleIcon} alt='카카오 아이콘' onClick={requestGoogleLogin}></img>
                <img src={naverIcon} alt='카카오 아이콘' onClick={requestNaverLogin}></img>
              </div>
            </div>
          </Registrybox>
        </SignupPage>
      </Backdrop>
    </div >
  );
}
