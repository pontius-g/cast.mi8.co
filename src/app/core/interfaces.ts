export interface psStoredPlaylistItem {
    name: string | number,
    link: string,
    infoUrl?: string,
    epgUrl?: string,
    epg?: any
}
export interface psStoredPlaylist {
    listname: string,
    list: Array<psStoredPlaylistItem>
}