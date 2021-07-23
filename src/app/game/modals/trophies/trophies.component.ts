import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.component.html',
  styleUrls: ['./trophies.component.scss'],
})
export class TrophiesComponent {

  dismiss() {
    this.modalController.dismiss();
  }

  constructor(private modalController: ModalController) { }

}
