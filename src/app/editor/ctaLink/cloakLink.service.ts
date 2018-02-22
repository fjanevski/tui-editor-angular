import {Injectable} from '@angular/core';
import * as Editor from 'tui-editor';

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

@Injectable()
export class CTALinkService {

  private ctaLinkButton: Editor.Button;
  private ctaLinkPopup = null;

  registerCloakLink(editor: Editor) {
    this.preparation(editor);

    this.ctaLinkButton = new Editor.Button({
      className: 'cloak-link',
      event: cloakLinkButtonClickEvent,
      tooltip: Editor.i18n.get('cta_link')
    });

    editor.eventManager.addEventType(cloakLinkButtonClickEvent);

    editor.eventManager.listen(cloakLinkButtonClickEvent, () => {
      this.ctaLinkPopup = editor.getUI().createPopup({
        content: POPUP_CONTENT.replace('{{editorot}}', editor.getSelectedText()),
        className: 'tui-editor-popup',
        $target: editor.getUI().$el,
        header: true,
        title: Editor.i18n.get('add_cta_link')
      });

      this.ctaLinkPopup.on('click .te-close-button', () => {
        this.ctaLinkPopup.hide();
      });

      this.ctaLinkPopup.on('click .te-ok-button', () => {
        editor.exec('AddCTALink', {
          linkText: this.ctaLinkPopup.$el.find('input.te-link-text-input').val(),
          url: this.ctaLinkPopup.$el.find('input.te-url-input').val()
        });
        this.ctaLinkPopup.hide();
      });
      this.ctaLinkPopup.show();
    });

    editor.getUI().toolbar.addButton(this.ctaLinkButton);
  }

  private preparation(editor: Editor) {
    editor.i18n.setLanguage(['en_US'], {
      'cta_link': 'CTA Link',
      'add_cta_link': 'Add CTA Link'
    });
  }
}
