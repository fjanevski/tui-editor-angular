import {CommandManager} from 'tui-editor';

export const WwAddCTALink = CommandManager.command('wysiwyg', {
  name: 'AddCTALink',
  exec: (wwe, data) => {
    const sq = wwe.getEditor();

    const {url, linkText} = data;

    wwe.focus();
    const link = sq.createElement('a', {href: url, rel: 'nofollow'});
    link.innerHTML = linkText;
    sq.insertElement(link);
  }
});
