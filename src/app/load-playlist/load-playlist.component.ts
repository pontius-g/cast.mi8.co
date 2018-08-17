import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'ps-load-playlist',
  templateUrl: './load-playlist.component.html',
  styleUrls: ['./load-playlist.component.css']
})

export class LoadPlaylistComponent implements OnInit {
  playlistInputHint: string = "Waiting for file...";
  constructor() {}
  ngOnInit() {}
  playlistUpld=(ev:DragEvent,name:String)=>{
    ev.stopPropagation();
    ev.preventDefault();
    let file=(ev.type==='drop')? ev.dataTransfer.files[0]:(<HTMLInputElement>ev.target).files[0];
    this.playlistInputHint=file.name;
    let listname=name || file.name;
    console.log(listname);
  }
}
