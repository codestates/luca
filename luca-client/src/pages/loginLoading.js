import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from "react-redux";

const LoadingPage = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginLoading = () => {
	const Social = useSelector((state) => state.user.userInfo.isSocial);
	const navigate = useNavigate();

	if (!Social) {
		setTimeout(() => {
			navigate("main");
		}, 1500);
		return (
			<LoadingPage>
				<img src="loginLoading.gif" />
			</LoadingPage>
		);
	} else {
		setTimeout(() => {
			navigate("main");
		});
		return (
			null
		);
	}
};

export default LoginLoading;