import {Injectable} from '@angular/core';
import * as Editor from 'tui-editor';
import {EDITOR_TYPE} from '../editor.types';

const cloakLinkButtonClickEvent = 'cloakLinkButtonClickEvent';
const saveCloakLinkEvent = 'saveCloakLinkEvent';

const POPUP_CONTENT = `
  <label for="linkText">Link text</label>
    <input type="text" class="te-link-text-input" value="{{editorot}}"/>
  <label for="url">URL</label>
    <input type="text" class="te-url-input" />
  <div class="te-button-section">
    <button type="button" class="te-ok-button">OK</button>
    <button type="button" class="te-close-button">Cancel</button>
  </div>
`;


// [${data.linkText}](${data.linkUrl})

const WW_CLOAK_LINK_TEMPLATE = `<a href="{{cloakLinkUrl}}" rel="nofollow">{{cloakLinkText}}</a>`;
const MD_CLOAK_LINK_TEMPLATE = '[!cloak--{{cloakLinkText}}](cloakLinkUrl)';


const MD_CLOAK_LINK_REGEXP = /\[\!cloak\-\-(.+?)\]\((.+?)\)/;
const WW_CLOAK_LINK_REGEXP = /\<a href="(.+?)" rel="?nofollow"?\>(.+?)\<\/a\>/;

@Injectable()
export class CloakLinkService {

  private cloakLinkButton: Editor.Button;
  private cloakLinkPopup = null;

  registerCloakLink(editor: Editor) {
    this.preparation(editor);

    this.cloakLinkButton = new Editor.Button({
      className: 'cloak-link',
      event: cloakLinkButtonClickEvent,
      tooltip: Editor.i18n.get('cloak_link')
    });

    editor.eventManager.addEventType(cloakLinkButtonClickEvent);

    editor.eventManager.listen(cloakLinkButtonClickEvent, () => {
      this.cloakLinkPopup = editor.getUI().createPopup({
        content: POPUP_CONTENT.replace('{{editorot}}', editor.getSelectedText()),
        className: 'tui-editor-popup',
        $target: editor.getUI().$el,
        header: true,
        title: Editor.i18n.get('add_cloak_link')
      });

      this.cloakLinkPopup.on('click .te-close-button', () => {
        this.cloakLinkPopup.hide();
      });

      this.cloakLinkPopup.on('click .te-ok-button', () => {
        editor.exec(saveCloakLinkEvent, {
          linkText: this.cloakLinkPopup.$el.find('input.te-link-text-input').val(),
          linkUrl: this.cloakLinkPopup.$el.find('input.te-url-input').val()
        });
      });
      this.cloakLinkPopup.show();
    });

    editor.getUI().toolbar.addButton(this.cloakLinkButton);

    editor.addCommand(EDITOR_TYPE.MARKDOWN, {
      name: saveCloakLinkEvent,
      exec: (mdEditor, data) => {
        const cm = mdEditor.getEditor();
        cm.replaceSelection(MD_CLOAK_LINK_TEMPLATE
          .replace('{{cloakLinkUrl}}', data.linkUrl)
          .replace('{{cloakLinkText}}', data.linkText));


        editor.setMarkdown(editor.mdEditor.getValue(), true);
        this.cloakLinkPopup.hide();
      }
    });

    editor.addCommand(EDITOR_TYPE.WYSIWYG, {
      name: saveCloakLinkEvent,
      exec: (wwEditor, data) => {
        console.log(data);
        const cm = wwEditor.getEditor();
        cm.replaceSelection(WW_CLOAK_LINK_TEMPLATE
          .replace('{{cloakLinkUrl}}', data.linkUrl)
          .replace('{{cloakLinkText}}', data.linkText));

        editor.setHtml(editor.wwEditor.getValue(), true);

        this.cloakLinkPopup.hide();
      }
    });


    // editor.eventManager.listen('convertorAfterMarkdownToHtmlConverted', function (html) {
    //
    //   console.log('before ', html);
    //
    //   html.replace(WW_CLOAK_LINK_REGEXP, (found, linkText, linkUrl) => {
    //     console.log(linkText, linkUrl);
    //     return MD_CLOAK_LINK_TEMPLATE
    //       .replace('{{cloakLinkUrl}}', linkUrl)
    //       .replace('{{cloakLinkText}}', linkText);
    //   });
    //
    //   console.log('after ', html);
    //   return html;
    // });

  }

  private preparation(editor: Editor) {
    editor.i18n.setLanguage(['en_US'], {
      'cloak_link': 'Cloak Link',
      'add_cloak_link': 'Add Cloak Link'
    });
  }
}
