import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent {

  dismiss() {
    this.modalController.dismiss();
  }

  constructor(private modalController: ModalController) { }

}
