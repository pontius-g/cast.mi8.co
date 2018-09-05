import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import * as Hls from 'hls.js';
@Component({
  selector: 'ps-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  private __video:HTMLVideoElement;
  private __hls:Hls=new Hls();
  private __url:string=null;
  constructor(private __el:ElementRef) {
    this.__hls.on(Hls.Events.MANIFEST_PARSED,_=>{ this.__video.play(); });
  }
  @Input() muted:boolean;
  @Input() set mediaPath(v:string) {
    if (this.__url){
      this.__url=v;
      this.__hls.detachMedia();
      if (v) { this.loadPreview(); }
    } else { this.__url=v; }
  }
  ngOnInit() {
    this.__video=this.__el.nativeElement.querySelector('video');
    this.loadPreview();
  }
  ngOnDestroy() { this.__hls.destroy(); }
  loadPreview() {
    this.__hls.loadSource(this.__url);
    this.__hls.attachMedia(this.__video);
  }
}
