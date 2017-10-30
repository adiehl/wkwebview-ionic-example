import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public imageUrl: string = 'https://cdnjs.cloudflare.com/ajax/libs/galleriffic/2.0.1/css/loader.gif';

  constructor(public navCtrl: NavController,
              private sanitizer:DomSanitizer,
              public file: File,
              private transfer: FileTransfer) {

    // image url to download from
    let url = 'https://assets-cdn.github.com/images/modules/logos_page/Octocat.png';

    // filetransfer object
    let fileTransfer: FileTransferObject = this.transfer.create();

    // download to application's unsynced data directory
    let dataDirectory = this.file.dataDirectory;

    // internal filename where to put data
    let internalFilename = dataDirectory + 'Octocat.png';

    // download the file
    fileTransfer.download(url, internalFilename).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      console.log('internal url:' + entry.toInternalURL());
      // set the link to internal url
      // if you see the octocat everything works
      this.imageUrl = entry.toInternalURL();
    });
  }

  /**
   * Needed to avoid being prefixed with unsafe://
   * @param url
   * @returns {SafeUrl}
   */
  sanitizeUrl (url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
