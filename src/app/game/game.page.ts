import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';

import { ModalController } from '@ionic/angular';
import { DescriptionComponent } from './modals/description/description.component';
import { MediaComponent } from './modals/media/media.component';
import { TrophiesComponent } from './modals/trophies/trophies.component';
import { ProductsComponent } from './modals/products/products.component';
import * as moment from 'moment';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage {
  gameData;
  seeMore = false;
  genres = [];
  genreText = '';
  releaseDate = '';
  trophyData:any;
  productData:any;
  products = [];
  allProducts = [];
  shortMedia = [];
  preview:any;

  shortenedDesc(description) {
    var substring = description.substring(0, 500);

    if (substring.length < description.length) {
      substring += '...';
      this.seeMore = true;
    } else {
      this.seeMore = false;
    }

    return substring;
  }

  async fullDescription() {
    const modal = await this.modalController.create({
      component: DescriptionComponent,
      cssClass: 'description-modal',
      componentProps: {
        description: this.gameData.game.description
      }
    });
    return await modal.present();
  }

  capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async seeMoreTrophies() {
    return this.gameService.getTrophies(100).subscribe(async (response) => {
      const modal = await this.modalController.create({
        component: TrophiesComponent,
        cssClass: 'trophies-modal',
        componentProps: {
          trophyData: response
        }
      });
      return await modal.present();
    });
  }

  async seeMoreProducts() {
    const modal = await this.modalController.create({
      component: ProductsComponent,
      cssClass: 'products-modal',
      componentProps: {
        products: this.allProducts
      }
    });
    return await modal.present();
  }

  async seeMoreMedia() {
    const modal = await this.modalController.create({
      component: MediaComponent,
      cssClass: 'media-modal',
      componentProps: {
        media: this.gameData.media
      }
    });
    return await modal.present();
  }

  constructor(
    private modalController: ModalController,
    private gameService: GameService
  ) {
    this.gameService.getGame().subscribe((response) => {
      this.gameData = response;
      this.releaseDate = moment(this.gameData.game.release_date).format('ddd, MMM Do, YYYY');

      this.gameData['metadata'].forEach(metadata => {
        if (metadata.meta_type === 'Genre') {
          this.genres.push(this.capitalizeFirstLetter(metadata.value));
        }
      });

      this.genres.forEach((genre, index) => {
        if (index !== 0 && index !== this.genres.length - 1) {
          this.genreText += ', ';
        } else if (index !== 0 && index === this.genres.length - 1) {
          this.genreText += ' and ';
        }

        this.genreText += genre;
      });

      if (this.gameData.trophies && this.gameData.trophies.has_trophies) {
        this.gameService.getTrophies(9).subscribe((response) => {
          this.trophyData = response;

          this.trophyData.showing = parseInt(this.trophyData.pagination['Total-Count'], 10) < 9
            ? this.trophyData.pagination['Total-Count']
            : 9;
        });
      }

      if (this.gameData.products && this.gameData.products.has_products) {
        this.gameService.getProducts(100).subscribe((products) => {
          this.productData = products;

          this.gameService.getAddons(100).subscribe((addons) => {
            var addonIds = [];

            this.productData.total = products['products'].length - addons['addons'].length

            addons['addons'].forEach((addon) => {
              addonIds.push(addon.id);
            });

            products['products'].forEach((product) => {
              if (addonIds.indexOf(product.id) === -1) {
                this.allProducts.push(product);

                if (this.products.length < 9) {
                  this.products.push(product);
                }
              }
            });
          });
        });
      }

      if (this.gameData.media && this.gameData.media.length > 0) {
        this.gameData.media.forEach(item => {
          if (item.remote_type === 'screenshot' && this.shortMedia.length < 6) {
            this.shortMedia.push(item);
          }

          if (item.remote_type === 'preview') {
            this.preview = item;
          }
        });
      }
    });
  }
}
