import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {

  dismiss() {
    this.modalController.dismiss();
  }

  constructor(private modalController: ModalController) { }

}
