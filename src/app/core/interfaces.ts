export interface psStoredPlaylistItem {
    name: string | number,
    link: string,
    fav: boolean,
    infoUrl?: string,
    epgUrl?: string,
    epg?: any
}
export interface psStoredPlaylist {
    listname: string,
    list: Array<psStoredPlaylistItem>
}
export interface psAuthUser {
    uid: string,
    name: string,
    email: string,
    lic: psAuthLicense | null,
    store: psAuthStore | null
}
export interface psAuthLicense {
    id: string,
    v: boolean,
    exp: number
}
export interface psAuthStore {
    la: Array<psStoredPlaylist>,
    epg: Array<psEpgStored> | null
}
export interface psEpgStored {
    id: string,
    v: Array<string>
}