import { Component, OnInit } from '@angular/core';
import { DbService } from '../core/db.service';
import { psStoredPlaylistItem } from '../core/interfaces';
@Component({
  selector: 'ps-load-playlist',
  templateUrl: './load-playlist.component.html',
  styleUrls: ['./load-playlist.component.css']
})

export class LoadPlaylistComponent implements OnInit {
  playlistInputHint: string = "Waiting for file...";
  constructor(public db:DbService) {}
  ngOnInit() {}
  playlistUpld(ev:DragEvent,name:string){
    let file:File;
    if (ev.type==='drop'){ev.stopPropagation();ev.preventDefault();file=ev.dataTransfer.files[0];}else{file=(<HTMLInputElement>ev.target).files[0];}
    this.playlistInputHint=file.name;
    let listname: string = name || file.name;
    let fileReader: FileReader = new FileReader();
    fileReader.onload=(ev:Event)=>{
      let preList:Array<psStoredPlaylistItem>=[];
      (<any>ev.target).result.split(/#EXTINF:.*,/).forEach((d: string, i: number) => {
        if (i) {
          let t:Array<string>=d.split(/\n/);
          preList.push({name: t[0], link: t[1], fav: false});
        }
        // else { STORE PLAYLIST PARAMETER STRING }
      });
      this.db.addPlaylist(preList,listname);
    };
    fileReader.readAsText(file);
  }
}
