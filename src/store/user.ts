import {defineStore} from "pinia";
import {IUser} from "@/models/user/UserModels";
import useUserService from "@/compositions/services/user";

interface IUserStore {
	id: string | null,
	model: IUser | null,
}

export const useUserStore = defineStore('user', {
	state: (): IUserStore => ({
		id: null as string | null,
		model: null as IUser | null,
	}),
	getters: {},
	actions: {
		async afterLogin(id: string): Promise<IUser> {
			//user data
			this.id = id;
			this.model = await useUserService().user(id);

			if (this.model !== null) {

				return Promise.resolve(this.model);
			} else {
				return Promise.reject();
			}
		},
		async afterLogout(): Promise<void> {

			//user data
			this.id = null;
			this.model = null;

			return Promise.resolve();
		},
	},
});
