import useApi from "@/compositions/api";
import {IUser, IUserListEntry} from "@/models/user/UserModels";
import {ListRequest} from "@/models/common/ListRequestModels";
import {IPaginatedListResponse} from "@/models/common/ResponseModels";

const api = useApi();

export class UserService {

	public async user(id: string): Promise<IUser> {
		return api.get<IUser>(`users/${id}`);
	}

	public async users(listRequest?: ListRequest): Promise<IPaginatedListResponse<IUserListEntry>> {
		return api.getList<IUserListEntry>(`users`, listRequest ?? new ListRequest());
	}

}

const instance = new UserService();

export default function useUserService(): UserService {
	return instance;
}
