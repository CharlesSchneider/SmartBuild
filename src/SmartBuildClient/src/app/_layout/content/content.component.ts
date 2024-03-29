import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ContentService } from 'src/app/shared/content.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sb-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @ViewChild(HeaderComponent) header: HeaderComponent;

  constructor(
    private contentService: ContentService,
    private toastrService: ToastrService) {

    this.contentService.menusLocked$
      .subscribe(lock => {
        this.header.lockMenus = lock;
      });

    this.contentService.toastrShow$.subscribe(message => {
      this.toastrService.error(message, 'Erro', {
        disableTimeOut: true,
        enableHtml: true,
        toastClass: 'ngx-toastr sb-ngx-toastr-error  shadow-sm',
        positionClass: 'toast-top-center'
      });
    });
  }

  ngOnInit(): void {
  }

  get collapsed(): boolean {
    const isMenuCollapsed = localStorage.getItem('isMenuCollapsed');
    return isMenuCollapsed === 'true';
  }

  set collapsed(value: boolean) {
    localStorage.setItem('isMenuCollapsed', value.toString());
    this.collapsed = value;
  }
}
