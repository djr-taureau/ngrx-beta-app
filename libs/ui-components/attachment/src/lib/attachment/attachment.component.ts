//tslint:disable:use-host-property-decorator
import { 
  Component,
  OnInit,
  Input } from '@angular/core';
import { fileTypesSlug } from '@ngrx-beta-app/common'

import { AttachmentData } from '../models';

@Component({
  selector: 'lw-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss'],
  host: { class: 'lw-attachment' },
})
export class AttachmentComponent implements OnInit {

  fileIcon: string;

  @Input() attachmentData: AttachmentData; // TODO: Need to add Attachement Typings but need straighten out file Typings

  constructor() { }

  ngOnInit() {
    this.fileIcon = `icon icon-${fileTypesSlug(this.attachmentData.relativePath)}`;
  }

}
