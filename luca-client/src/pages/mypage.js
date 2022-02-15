import { useState } from "react";
import { Navigator, Backdrop, Container } from "../components/commons";

function Mypage() {
  const [isClicked, setIsClicked] = useState(true);

  const handleClick = function () {
    setIsClicked(!isClicked);
  };

  return (
    <div onClick={handleClick}>
      <Navigator />
      <Backdrop>
        <Container>
          <div>{/* navbar */}</div>
          <div className="mypage-body">
            <div className="mypage-info">
              <profileimg>
                <img src="https://ww.namu.la/s/08c6a259933bf0159253cd7304180960a776791dcba49dba89d0e28648c20e544d87779113bcd874491d22a67d2cd4b9aab39683c3d27f90929872ef5b5ea10491d45a591ef332cbea92ba5ecd958221" />
              </profileimg>
              <userinfo>
                <userprofile>
                  <username>Ian</username>
                  <ueremail>ian58@gmail.com</ueremail>
                </userprofile>
                {isClicked ? (
                  <userbutton>
                    <button className="modifybutton" onClick={handleClick}>
                      회원정보 수정
                    </button>
                    <button className="pwbutton">비밀번호 변경</button>
                  </userbutton>
                ) : (
                  <decisionbutton>
                    <div>
                      <cancelbuttton>취소</cancelbuttton>
                      <savebutton>저장</savebutton>
                    </div>
                    <withdrawal>회원탈퇴</withdrawal>
                  </decisionbutton>
                )}
              </userinfo>
            </div>
          </div>
        </Container>
      </Backdrop>
      <div>{/* footer */}</div>
    </div>
  );
}

export default Mypage;
