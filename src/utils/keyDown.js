export const listenKeyDownEvents = (e) => {
    if (e.defaultPrevented) {
      return;
    }
  
    var handled = false;
    if (e.key !== undefined) {
      if (e.key === 'x' && e.metaKey) {
        if (document.execCommand('cut')) handled = true;
      } else if (e.key === 'c' && e.metaKey) {
        if (document.execCommand('copy')) handled = true;
      } else if (e.key === 'v' && e.metaKey) {
        if (document.execCommand('paste')) handled = true;
      } else if (e.key === 'a' && e.metaKey) {
        if (document.execCommand('selectAll')) handled = true;
      } else if (e.key === 'z' && e.metaKey) {
        if (document.execCommand('undo')) handled = true;
      } else if (e.key === 'y' && e.metaKey) {
        if (document.execCommand('redo')) handled = true;
      }
    } else if (e.keyCode !== undefined) {
      if (e.keyCode === 88 && e.metaKey) {
        if (document.execCommand('cut')) handled = true;
      } else if (e.keyCode === 67 && e.metaKey) {
        if (document.execCommand('copy')) handled = true;
      } else if (e.keyCode === 86 && e.metaKey) {
        if (document.execCommand('paste')) handled = true;
      } else if (e.keyCode === 65 && e.metaKey) {
        if (document.execCommand('selectAll')) handled = true;
      } else if (e.keyCode === 90 && e.metaKey) {
        if (document.execCommand('undo')) handled = true;
      } else if (e.keyCode === 89 && e.metaKey) {
        if (document.execCommand('redo')) handled = true;
      }
    }
  
    if (handled) {
      e.preventDefault();
    }
  };
  