import Quill from 'quill';
import { Constants } from '../../utils';

const blotPath = 'blots/block/embed';
const BlockEmbed = Quill.import(blotPath);

class AttachmentBlot extends BlockEmbed {
  static className: string;
  static blotName: string;
  static tagName: string;
  domNode: any;

  static create(value): HTMLElement {
    let id: string;
    let src: string;

    if (typeof value === 'object' && !value.url) {
      return super.create();
    }
    const arr = value.url
      ? value.url.split(Constants.ID_SPLIT_FLAG)
      : value.split(Constants.ID_SPLIT_FLAG);
    if (arr.length > 1) {
      id = arr[0];
      src = arr[1];
    } else {
      src = value;
    }

    const node = super.create(src);
    if (typeof src === 'string') {
      node.setAttribute('src', src);
    }

    if (typeof src === 'object') {
      node.setAttribute('src', (src as any).url);
    }

    if (id) {
      node.setAttribute('id', id);
    }

    node.setAttribute('controls', true);
    node.setAttribute('controlsList', 'nodownload');
    node.setAttribute('width', '100%');

    return node;
  }

  static formats(node) {
    const format: any = {};
    if (node.hasAttribute('height')) {
      format.height = node.getAttribute('height');
    }
    if (node.hasAttribute('width')) {
      format.width = node.getAttribute('width');
    }
    return format;
  }

  static value(node) {
    return node.getAttribute('src');
  }

  format(name, value) {
    if (name === 'height' || name === 'width') {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name, value);
      }
    } else {
      super.format(name, value);
    }
  }
}

AttachmentBlot.tagName = 'video';
AttachmentBlot.blotName = Constants.blots.attachment;
AttachmentBlot.className = 'quill-upload-attachment';

export default AttachmentBlot;
