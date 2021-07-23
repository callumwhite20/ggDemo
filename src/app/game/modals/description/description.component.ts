import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {

  dismiss() {
    this.modalController.dismiss();
  }

  constructor(private modalController: ModalController) { }

}
