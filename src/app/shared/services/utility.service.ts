import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

    constructor() {
    }


    downloadFile(binary: any, type: string, fileName: string): void {
        const blob = this.b64toBlob(binary, type);
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const blobUrl = URL.createObjectURL(blob);
            link.setAttribute('href', blobUrl);
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    previewFile(doc: any, contentType: any): void {
        const fileWindow = window.open('');
        const content = doc.replace(/^data:.+;base64,/, '');
        const iframeContent = '<iframe width="100%" height="100%" src="data:' + contentType + ';base64, ' + encodeURI(content) + '"></iframe>';
        fileWindow.document.write(iframeContent);
    }

    b64toBlob(b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

}
