import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import * as Editor from 'tui-editor';
import {EDITOR_TYPE} from './editor.types';
import {CloakLinkService} from './cloakLink/cloakLink.service';

@Component({
  selector: 'app-editor',
  templateUrl: 'editor.template.html',
  styleUrls: [
    '../../../node_modules/tui-editor/dist/tui-editor-contents.css',
    '../../../node_modules/tui-editor/dist/tui-editor.css',
    '../../../node_modules/codemirror/lib/codemirror.css',
    'editor.style.css'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [CloakLinkService]
})
export class EditorComponent implements OnInit, OnDestroy {

  @ViewChild('editor', {read: ElementRef})
  private child: ElementRef;

  @Output()
  private onSaveHTMLData: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  private onSaveMarkdownData: EventEmitter<string> = new EventEmitter<string>();

  private editor: Editor = null;

  private addInlineCode =  null;

  constructor(private cloakLinkService: CloakLinkService) {
  }

  ngOnInit(): void {
    this.editor = new Editor({
      el: this.child.nativeElement,
      initialEditType: EDITOR_TYPE.WYSIWYG,
      previewStyle: 'vertical',
      height: '300px',
      events: {
        load: this.onLoad.bind(this),
        change: this.onChange.bind(this),
        blur: () => {
          // implementation of actual saving
        },
        paste: this.onPaste.bind(this),
        drop: this.onPreventDrop.bind(this)
      }
    });

    // register Cloak Link functionality
    this.cloakLinkService.registerCloakLink(this.editor);
  }

  ngOnDestroy(): void {
    this.onSaveMarkdownData.unsubscribe();
    this.onSaveHTMLData.unsubscribe();
  }

  removeAddInlineCodeButton() {
    this.editor.getUI().toolbar.$el.find('.tui-code').remove();
  }

  addInlineCodeButton() {
    this.editor.getUI().toolbar.addButton(this.addInlineCode.button, this.addInlineCode.index + 1);
  }

  private onLoad(editor: Editor) {
    // Remove codeblock button
    editor.getUI().toolbar.$el.find('.tui-codeblock').remove();

    // Remove H1 from Headings
    editor.getUI().popupAddHeading.$el.find(`li[data-value=1]`).remove();

    this.addInlineCode = this.getInlineCodeButton(editor);
  }

  private onChange() {
    const markdownData = this.editor.getMarkdown();
    this.onSaveMarkdownData.emit(markdownData);

    const htmlData = this.editor.getHtml();
    this.onSaveHTMLData.emit(htmlData);
  };

  private onPaste(event) {
    event.data.preventDefault();
    const text = event.data.clipboardData.getData('text/plain');

    if (event.source === EDITOR_TYPE.MARKDOWN) {
      const content = this.editor.convertor.toMarkdown(text);
      this.editor.mdEditor.replaceSelection(content);
      this.editor.setMarkdown(this.editor.mdEditor.getValue(), true);
    } else {
      const content = this.editor.convertor.toHTML(text);
      this.editor.wwEditor.replaceSelection(content);
      this.editor.setHtml(this.editor.wwEditor.getValue(), true);
    }
    this.onChange();
  }

  private onPreventDrop(event) {
    const text = event.data.dataTransfer.getData('TEXT');
    event.data.preventDefault();
    if (this.editor.isMarkdownMode()) {
      this.editor.mdEditor.replaceSelection(text);
    } else {
      this.editor.wwEditor.replaceSelection(text);
    }
  }

  private getInlineCodeButton(editor: Editor) {
    const index = editor.getUI().toolbar.buttons.findIndex(({className}) => className.includes('tui-code'));
    return {
      button: editor.getUI().toolbar.buttons[index],
      index
    };
  }
}
