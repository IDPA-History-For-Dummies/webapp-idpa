import {IBackendModel} from "@/models/common/BackendModels";

export interface IUserSimple extends IBackendModel {
	id: string;
}

export interface IUserListEntry extends IUserSimple {

}

export interface IUser extends IUserListEntry {

}
