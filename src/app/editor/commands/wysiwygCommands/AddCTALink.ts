import {CommandManager} from 'tui-editor';

export const WwAddCTALink = CommandManager.command('wysiwyg', {
  name: 'AddCTALink',
  exec: (wwe, data) => {
    const sq = wwe.getEditor();

    const {url, linkText} = data;

    const link = sq.createElement('a', {href: url, rel: 'nofollow', class: 'clickout', target: '_blank'});
    link.innerHTML = linkText;
    sq.insertElement(link);
    wwe.focus();
  }
});
