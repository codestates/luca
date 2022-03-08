import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigator, Backdrop } from "../components/commons";
import axios from "axios";
import { color, radius, boxShadow } from "../styles";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60vh;
  width: 70%;
  margin-top: 10vh;

  > div,
  title {
    flex: 1 0 auto;
    margin-bottom: 1em;
    font-size: 2em;
    font-weight: bold;
    padding-top: 32px;
  }
`;
const Registrybox = styled.div`
  width: 80%;
  height: 90%;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  > div {
    width: auto;
    display: flex;
    justify-content: center;
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
    }
  }
  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    > button.confirm {
      margin-right: 20px;
      margin-left: 20px;
      width: 90px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 70px;
      border-radius: ${radius};
      box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.2);
      background-color:${color.primaryLight};
      font-weight: bold;
    }
    > button.cancel {
      margin-right: 20px;
      margin-left: 20px;
      width: 90px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 70px;
      border-radius: ${radius};
      box-shadow: 0vh 0.5vh 1vh 0.1vh rgba(0, 0, 0, 0.2);
      background-color:${color.white};
      font-weight: bold;
    }
    > button:active {
      transform: translateY(2px);
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

export default function ChangePassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidNewPassword, setIsNewValidPassword] = useState(true);
  const [isValidCurPassword, setIsValidCurPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);

  const onCheckPassword = (val) => {
    setPassword(val);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/;
    if (!passwordRegex.test(val)) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  };

  const onChangePassword = (val) => {
    setNewPassword(val);
    const newPasswordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?])[A-Za-z\d!@#$%^&*?]{8,}$/;
    if (!newPasswordRegex.test(val)) {
      setIsNewValidPassword(false);
    } else {
      setIsNewValidPassword(true);
    }
  };

  const onChangePasswordConfirm = (val) => {
    setPasswordConfirm(val);
    if (newPassword !== val) {
      setIsValidPasswordConfirm(false);
    } else {
      setIsValidPasswordConfirm(true);
    }
  };

  const cancleHandler = () => {
    navigate("/mypage");
  };

  const changePasswordHandler = () => {
    if (
      // 입력칸이 하나라도 비어있는 경우
      password === "" ||
      newPassword === "" ||
      passwordConfirm === ""
    ) {
      return;
    }
    if (
      // 입력값이 모두 유효한 경우
      isValidPassword &&
      isValidNewPassword &&
      isValidPasswordConfirm
    ) {
      axios
        .patch(`${process.env.REACT_APP_API_URL}/profile/password`,
          {
            curPassword: password,
            newPassword: newPassword
          }, {
          "Content-Type": "application/json",
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            navigate("/mypage")
          }
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setIsValidCurPassword(false)
            console.log(err)
          }
        });
    }
  };

  return (
    <div>
      <Navigator />
      <Backdrop>
        <Container>
          <div className="title">비밀번호 변경</div>
          <Registrybox>
            <div>
              <div>
                <InputForm
                  value={password}
                  placeholder="현재 비밀번호"
                  handleValue={onCheckPassword}
                  type="password"
                />
              </div>
            </div>

            <div>
              {isValidPassword ? null : (
                <InvalidMessage>
                  비밀번호는 최소 8자리 이상이어야 하며 영문자, 숫자, 특수문자가
                  1개 이상 사용되어야 합니다.
                </InvalidMessage>
              )}
            </div>

            <div>
              <div>
                <InputForm
                  value={newPassword}
                  placeholder="새 비밀번호"
                  handleValue={onChangePassword}
                  type="password"
                />
              </div>
            </div>

            <div>
              {isValidNewPassword ? null : (
                <InvalidMessage>
                  비밀번호는 최소 8자리 이상이어야 하며 영문자, 숫자, 특수문자가
                  1개 이상 사용되어야 합니다.
                </InvalidMessage>
              )}
            </div>

            <div>
              <div>
                <InputForm
                  value={passwordConfirm}
                  placeholder="비밀번호 확인"
                  handleValue={onChangePasswordConfirm}
                  type="password"
                />
              </div>
            </div>

            <div>
              {isValidPasswordConfirm ? null : (
                <InvalidMessage>비밀번호가 일치하지 않습니다.</InvalidMessage>
              )}
            </div>

            <div>
              {isValidCurPassword ? null : (
                <InvalidMessage>
                  이메일과 일치하는 비밀번호가 없습니다.
                </InvalidMessage>
              )}
            </div>

            <div>
              <button className="cancel" onClick={cancleHandler}>취소</button>
              <button className="confirm" onClick={changePasswordHandler}>저장</button>
            </div>
          </Registrybox>
        </Container>
      </Backdrop>
    </div >
  );
}
