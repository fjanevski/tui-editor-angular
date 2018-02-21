import {Component, ViewChild} from '@angular/core';
import {EditorComponent} from './editor/editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public htmlData: string;
  public markdownData: string;

  private shouldAddInlineCode = false;

  @ViewChild(EditorComponent)
  private editorComponent: EditorComponent;

  onSaveHTMLData(htmlData: string) {
    this.htmlData = htmlData;
  }

  onSaveMarkdownData(markdownData: string) {
    this.markdownData = markdownData;
  }

  onShouldRemoveAddInlineCode() {
    if (!this.shouldAddInlineCode) {
      this.editorComponent.removeAddInlineCodeButton();
    } else {
      this.editorComponent.addInlineCodeButton();
    }
    this.shouldAddInlineCode = !this.shouldAddInlineCode;
  }
}
