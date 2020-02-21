import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule, QuillConfigInterface, QUILL_CONFIG } from 'ngx-quill-wrapper';
import { TextEditorComponent } from './components/text-editor/text-editor';

const DEFAULT_QUILL_CONFIG: QuillConfigInterface = {
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuillModule
    ],
  exports: [TextEditorComponent],
  declarations: [TextEditorComponent],
  providers: [
    {
      provide: QUILL_CONFIG,
      useValue: DEFAULT_QUILL_CONFIG
    }
  ]
})

export class UiComponentsTextEditorModule {}
