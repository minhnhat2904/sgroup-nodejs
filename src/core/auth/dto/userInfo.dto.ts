export interface IUserInfo {
    _id: string;
    fullname: string;
}

export function UserInfo(data: any): IUserInfo {
    return {
        _id: data._id,
        fullname: data.fullname,
    }
}