import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: String;

  @Input()
  public alt: String = '';

  public hasLoaded: Boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('Method not implemented.');
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1000);
  }



}
