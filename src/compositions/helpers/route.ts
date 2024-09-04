import {NavigationFailure, RouteParamsRaw, RouteRecordName} from "vue-router";
import router from "@/router";

export enum RouteNames {
	home = 'Home',
	notFound = 'NotFound',
	events = 'events',
	test = 'Test',
	programming = 'Programming',
}

export class RouteHelper {

	public push(name: RouteRecordName, params?: RouteParamsRaw): Promise<NavigationFailure | void | undefined> {
		if (this.isRouteActive(name, params)) return Promise.resolve();
		return router.push({name: name, params: params});
	}

	public replace(name: RouteRecordName, params?: RouteParamsRaw): Promise<NavigationFailure | void | undefined> {
		if (this.isRouteActive(name, params)) return Promise.resolve();
		return router.replace({name: name, params: params});
	}

	public isRouteActive(name: RouteRecordName, params?: RouteParamsRaw): boolean {
		const route = router.currentRoute.value;

		//check if route names are equal
		if (route.name !== name) return false;

		//compare params
		if (route.params !== undefined && params !== undefined) {
			const keysCurrent = Object.keys(route.params);
			const keysNew = Object.keys(params);
			if (keysCurrent.length !== keysNew.length || keysCurrent.some(k => !keysNew.includes(k)) || keysNew.some(k => !keysCurrent.includes(k))) {
				return false;
			}

			for (const key in keysCurrent) {
				const valCurrent = route.params[key];
				const valNew = params[key];
				if (valCurrent !== valNew) return false;
			}
		}

		return route.params === undefined && params === undefined;
	}

}

const instance = new RouteHelper();

export function useRouteHelper(): RouteHelper {
	return instance;
}
