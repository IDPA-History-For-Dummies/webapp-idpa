import {defineStore} from "pinia";
import {AxiosError, AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import useUserService from "@/compositions/services/user";
import {useUserStore} from "@/store/user";

interface IAuthStore {
	accessToken: string | null;
	userId: string | null;
}

export const useAuthStore = defineStore('auth', {
	persist: {
		paths: ['accessToken', 'userId'],
	},
	state: (): IAuthStore => ({
		accessToken: null as string | null,
		userId: null as string | null,
	}),
	getters: {
		isLoggedIn: (state): boolean => state.accessToken !== null,
	},
	actions: {
		async clearAccessToken(): Promise<void> {
			this.accessToken = null;
			await useUserStore().afterLogout();
			return Promise.resolve();
		},
		async setAccessToken(accessToken: string, userId: string): Promise<void> {
			this.accessToken = accessToken;
			await useUserStore().afterLogin(userId);
			return Promise.resolve();
		},
		async login(accessToken: string): Promise<void> {
			if (this.isLoggedIn) {
				return Promise.reject('Auth: trying to login when already logged in');
			}

			try {
				this.accessToken = accessToken;
				const user = await useUserService().userFromAccessToken(accessToken);
				this.userId = user.id;
				this.accessToken = null;
				await this.setAccessToken(accessToken, user.id);
			} catch (err) {
				this.accessToken = null;
				console.error('error while fetching user with access token');
				return Promise.reject();
			}
			return Promise.resolve();
		},
		async logout(): Promise<void> {
			return this.clearAccessToken();
		},
		interceptRequestFulfilled(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
			//prepare headers if necessary
			if (config.headers === undefined) {
				config.headers = new AxiosHeaders();
			}

			//add api token header
			if (this.accessToken !== null && !config.headers.has('Api-Token')) {
				config.headers.set('Api-Token', this.accessToken);
			}

			return config;
		},
		interceptResponseRejected(error: AxiosError<AxiosResponse, any>): any {
			//check if relevant objects are present (should always be the case)
			const config = error.config ?? null;
			const response = error.response ?? null;
			if (config === null || response === null) {
				return new Promise((resolve, reject) => reject(error));
			}

			//extract relevant vars from error
			const httpStatusCode = response.status ?? null;

			if (httpStatusCode === 401) {
				this.clearAccessToken().then();
			}
		},
	},
});
