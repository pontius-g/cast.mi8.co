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
    email: string
}