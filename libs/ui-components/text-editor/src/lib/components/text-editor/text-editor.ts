
import { Component, AfterViewInit, ViewChild, OnInit, ComponentRef } from '@angular/core';
import {
  QuillComponent,
  QuillDirective,
  QuillConfigInterface,
  QuillModulesInterface
} from 'ngx-quill-wrapper';


@Component({
  selector: 'ngrx-beta-app-text-editor',
  templateUrl: './text-editor.html',
  styleUrls: ['./text-editor.scss']
})
export class TextEditorComponent implements OnInit, AfterViewInit {
  public htmlText: "test";
  public hasFocus: false;
  public show: true;
  public type:'directive';
  public disabled: false;

  public config: QuillConfigInterface = {
    theme: 'snow',
    readOnly: false,
  };

  public modules: QuillModulesInterface = {};

   private toolbar: {
    container: [
      ['redo', 'undo'],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link']
    ],
  };

  @ViewChild(QuillDirective) directiveRef?: QuillDirective;
  @ViewChild(QuillComponent) componentRef?: QuillComponent;

  constructor() {
    this.config.modules = { toolbar: this.toolbar };
   }

  ngOnInit() {
    console.log('ready');
  }

  ngAfterViewInit(): void {
    // this.directiveRef.quill();
    // this.componentRef.directiveRef.quill();
  }

  event($event) {
    console.log($event);
  }

  public clearEditorContent(): void {
    this.componentRef.directiveRef.clear();
  }

  public onEditorBlur(event: any): void {
    console.log('Editor blur:', event);
  }

  public onEditorFocus(event: any): void {
    console.log('Editor focus:', event);
  }

  public onEditorCreate(event: any): void {
    console.log('Editor create:', event);
  }

  public onValueChange(value: string): void {
    console.log('Value change:', value);
  }

  public onContentChange(event: any): void {
    console.log('Content change:', event);
  }

  public onSelectionChange(event: any): void {
    console.log('Selection change:', event);
  }

}
