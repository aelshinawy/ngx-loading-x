import { POSITION } from './utils/enums';
import { Component, OnInit, Input } from '@angular/core';
import { PositionType, SpinnerType } from './utils/types';
import { NgxLoadingXConfig } from './utils/NgxLoadingXConfig.interface';
import { ChangeDetectionStrategy } from '@angular/core';
import { DEFAULT_CONFIG, SPINNER_CONFIG } from './utils/NgxLoadingXConfig.constants';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'ngx-loading-x',
  templateUrl: './ngx-loading-x.component.html',
  styleUrls: ['./ngx-loading-x.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NgxLoadingXComponent implements OnInit {

  @Input() show: boolean;
  @Input() bgBlur: number;
  @Input() bgColor: string;
  @Input() bgOpacity: number;
  @Input() bgLogoUrl: string;
  @Input() bgLogoUrlPosition: PositionType;
  @Input() bgLogoUrlSize: number;
  @Input() spinnerType: SpinnerType;
  @Input() spinnerSize: number;
  @Input() spinnerColor: string;
  @Input() spinnerPosition: PositionType;
  

  defaultConfig: NgxLoadingXConfig;

  spinnerDivs: Number[];
  spinnerClass: string;
  trustedLogoUrl: SafeResourceUrl;

  spinnerTop;
  logoTop;
  
  constructor(private domSanitizer: DomSanitizer,) {
    this.defaultConfig = DEFAULT_CONFIG;
    this.show = DEFAULT_CONFIG.show;
    this.bgBlur = DEFAULT_CONFIG.bgBlur;
    this.bgColor = DEFAULT_CONFIG.bgColor;
    this.bgOpacity = DEFAULT_CONFIG.bgOpacity;
    this.bgLogoUrl = DEFAULT_CONFIG.bgLogoUrl;
    this.bgLogoUrlPosition = DEFAULT_CONFIG.bgLogoUrlPosition;
    this.bgLogoUrlSize = DEFAULT_CONFIG.bgLogoUrlSize;
    this.spinnerType = DEFAULT_CONFIG.spinnerType;
    this.spinnerSize = DEFAULT_CONFIG.spinnerSize;
    this.spinnerColor = DEFAULT_CONFIG.spinnerColor;
    this.spinnerPosition = DEFAULT_CONFIG.spinnerPosition;
   }



  private initializeSpinners(): void {
    this.spinnerDivs = Array(SPINNER_CONFIG[this.spinnerType].divs).fill(1);
    this.spinnerClass = SPINNER_CONFIG[this.spinnerType].class;
  }

  private determineCenterPositions(): void {
    if (this.bgLogoUrlPosition === POSITION.centerCenter && this.spinnerPosition === POSITION.centerCenter) {
      this.spinnerTop = this.domSanitizer.bypassSecurityTrustStyle(`calc(50% + 88px)`);
      this.logoTop = this.domSanitizer.bypassSecurityTrustStyle(`calc(50% - 88px)`);
    }
  }

  ngOnInit(): void {
    this.trustedLogoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.bgLogoUrl);
    this.initializeSpinners();
    this.determineCenterPositions();
  }


}
