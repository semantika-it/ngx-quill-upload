import BaseHandler, { Options } from '../BaseHandler';
import { Constants } from '../../utils';
import { AttachmentBlot } from '../../blots';
import Quill from 'quill';

class AttachmentHandler extends BaseHandler {
  constructor(quill, options: Options) {
    super(quill, options);

    this.handler = Constants.blots.attachment;
    this.applyForToolbar();
    Quill.register('formats/attachment', AttachmentBlot);
  }

}

export default AttachmentHandler;
