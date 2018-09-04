import { Component, OnInit, Input } from '@angular/core';
import * as Hls from 'hls.js';
@Component({
  selector: 'ps-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  constructor() {}
  @Input() mediaPath: string;
  ngOnInit() {
    let v=document.querySelector('video');
    if(Hls.isSupported() && this.mediaPath!==null) {
      let hls = new Hls();
      hls.loadSource(this.mediaPath);
      hls.attachMedia(v);
      hls.on(Hls.Events.MANIFEST_PARSED,function() { v.play(); });
    }
  }

}
