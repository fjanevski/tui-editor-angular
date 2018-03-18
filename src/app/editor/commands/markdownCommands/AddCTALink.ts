import {CommandManager} from 'tui-editor';

export const MdAddCTALink = CommandManager.command('markdown', {
  name: 'AddCTALink',
  exec: (mde, data) => {
    const cm = mde.getEditor();
    const doc = cm.getDoc();

    const range = mde.getCurrentRange();

    const from = {
      line: range.from.line,
      ch: range.from.ch
    };

    const to = {
      line: range.to.line,
      ch: range.to.ch
    };

    const {linkText, url, attributes} = data;

    const replaceText = `{clickout}[${linkText}](${url}){${attributes}}{clickoutend}`;


    doc.replaceRange(replaceText, from, to);

    cm.focus();
  }
});
