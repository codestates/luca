import axios from "axios";

axios.defaults.withCredentials = true;


//카카오 로그인
export const requestKakaoLogin = () => {
    window.location.assign(
        `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
    );
};

//구글 로그인
export const requestGoogleLogin = () => {
    window.location.assign(
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`
    );
};

// 네이버 로그인
export const requestNaverLogin = () => {
    window.location.assign(
        `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state="luca"&response_type=code`
    );
};