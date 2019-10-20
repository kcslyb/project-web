import http from '@/utils/request';
import {AxiosResponse} from 'axios';
import {RouterOptions} from 'vue-router';

interface API {
    url: string;

    get<T = any, R = AxiosResponse<T>>(id: string): Promise<R>;

    post<T = any, R = AxiosResponse<T>>(params: object): Promise<R>;

    put<T = any, R = AxiosResponse<T>>(params: object): Promise<R>;

    delete<T = any, R = AxiosResponse<T>>(id: string): Promise<R>;

    query<T = any, R = AxiosResponse<T>>(params: object): Promise<R>;
}

class BaseApi implements API {
    public url: string = '';

    public get<T = any, R = AxiosResponse<T>>(id: string): Promise<R> {
        return http.get(this.url + '/' + id);
    }

    public post<T = any, R = AxiosResponse<T>>(params: object): Promise<R> {
        return http.post(this.url, params);
    }

    public put<T = any, R = AxiosResponse<T>>(params: object): Promise<R> {
        return http.put(this.url, params);
    }

    public delete<T = any, R = AxiosResponse<T>>(id: string): Promise<R> {
        return http.delete(this.url + '/' + id);
    }

    public query<T = any, R = AxiosResponse<T>>(params: object): Promise<R> {
        return http.get(this.url, {params});
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ApiFactory extends BaseApi {
    public static getApi<T extends BaseApi>(type: new() => T): T {
        return new type();
    }
}

export class User extends BaseApi {
    public url: string = 'api/user';
}

// tslint:disable-next-line:max-classes-per-file
export class Role extends BaseApi {
    public url: string = 'api/role';

    public queryAllPermissionByRole(params: object) {
        return http.get('/api/role/query', {params});
    }

    public queryRolePermissionByRoleId(id: string) {
        return http.get('/api/role?id=' + id);
    }

    public updateRolePermission(param: object) {
        return http.put('/api/role/update/permission', param);
    }
}

