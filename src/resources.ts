import http from '@/utils/http-config';
import {AxiosResponse} from 'axios';

class BaseApi {
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
        return http.get(this.url + '/query', {params});
    }

    public queryPager<T = any, R = AxiosResponse<T>>(params: object): Promise<R> {
        return http.get(this.url + '/query/pager', {params});
    }
}

// tslint:disable-next-line:max-classes-per-file
export class ApiFactory extends BaseApi {
    public static getApi<T extends BaseApi>(type: new() => T): T {
        return new type();
    }
}

// tslint:disable-next-line:max-classes-per-file
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

// tslint:disable-next-line:max-classes-per-file
export class UserAccount extends BaseApi {
    public url: string = 'api/user/account';

    public exportUserExcel() {
        return http.get(this.url + '/query/export');
    }
}

// tslint:disable-next-line:max-classes-per-file
export class UserDepartment extends BaseApi {
    public url: string = 'api/department';

    public queryAllUserByDepartment(params: object) {
        return http.get(this.url + '/query/user', {params});
    }

}

// tslint:disable-next-line:max-classes-per-file
export class File extends BaseApi {
    public url: string = 'api/file';

    public queryCurrentUserFiles(params: object) {
        return http.get('/api/file/currentList', {params});
    }

    public download(id: string) {
        return http.get('/api/file/download/' + id);
    }

    public QrDownload(params: object) {
        return http.get('/api/file/qr/download', {params});
    }

    public remove(id: string) {
        return http.delete('/api/file/remove/' + id);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class Note extends BaseApi {
    public url: string = 'api/note';
}

// tslint:disable-next-line:max-classes-per-file
export class Dict extends BaseApi {
    public url: string = 'api/dict';
}

// tslint:disable-next-line:max-classes-per-file
export class DictGroup extends BaseApi {
    public url: string = 'api/dictGroup';
}
