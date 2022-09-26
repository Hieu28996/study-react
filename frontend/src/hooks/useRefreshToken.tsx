import { AnyAction } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from "axios";
import jwtDecode from "jwt-decode";
import { AppDispatch } from "redux/store";

export const refreshToken = async () => {
	try {
		const res = await axios.post("/api/auth/refresh", {
			withCredentials: true,
		});
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const useRefreshToken = (
	user: any,
	dispatch: AppDispatch,
	stateSuccess: (refreshUser: { accessToken: string }) => AnyAction
) => {
	const axiosJWT = axios.create();

	axiosJWT.interceptors.request.use(
		async (config: AxiosRequestConfig<Headers>) => {
			const date: Date = new Date();
			const decodedToken: { exp: number } = jwtDecode(user?.accessToken);
			if (decodedToken.exp < date.getTime() / 1000) {
				const data: { accessToken: string } = await refreshToken();
				const refreshUser = {
					...user,
					accessToken: data.accessToken,
				};
				dispatch(stateSuccess(refreshUser));
				config.headers!["x-access-token"] = data.accessToken;
			} else {
				config.headers!["x-access-token"] = user?.accessToken;
			}

			return config;
		},
		(err) => {
			return Promise.reject(err);
		}
	);
	return axiosJWT;
};
