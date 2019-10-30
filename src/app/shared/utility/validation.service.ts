import { Injectable } from '@angular/core';
import { FILE_TYPES } from '../enums/app.enum';
import {AppConstants} from '../constant/constant.variable';


/**
 *
 * Service for handeling custom validation.
 *
 * @author Davinder Kaur
 *
 */
@Injectable()
export class ValidatorService {

  constructor() {
  }



  validateImageFileFormat(name) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() === 'png' || ext.toLowerCase() === 'jpg' || ext.toLowerCase() === 'jpeg') {
      return true;
    }
    return false;
  }

  validateImportFormat(name) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() === 'csv') {
      return true;
    }
    return false;
  }

  validateImageSize(fileSize) {
    if (fileSize <= AppConstants.ImageSize) {
      return true;
    }
    return false;
  }

  validateUploadedFileFormat(type, name) {
    const ext = name.substring(name.lastIndexOf('.') + 1);
    if (type === FILE_TYPES.PDF && ext.toLowerCase() === 'pdf') {
      return true;
    } else if (type === FILE_TYPES.CSV && ext.toLowerCase() === 'csv') {
      return true;
    } else if (type === FILE_TYPES.IMG && (ext.toLowerCase() === 'png' || ext.toLowerCase() === 'jpg' || ext.toLowerCase() === 'jpeg')) {
      return true;
    }
    return false;
  }
}


