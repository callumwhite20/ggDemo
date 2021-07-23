import { Component } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data = {};
  searchText = '';
  perPage = 25;

  goTo(page:any) {
    this.getList(parseInt(page, 10));
  }

  goBack() {
    this.getList(parseInt(this.data['pagination']['Current-Page'], 10) - 1);
  }

  goForward() {
    this.getList(parseInt(this.data['pagination']['Current-Page'], 10) + 1);
  }

  goToGame(game:any) {
    this.gameService.selectedGame = game;
    this.router.navigateByUrl('/game');
  }

  stripDescription(description) {
    return description.replace(/<[^>]*>/g, ' ');
  }

  getList(p:number = 1) {
    this.gameService.getGamesList(p, this.perPage, this.searchText).subscribe((response) => {
      this.data = response;
    });
  }

  async showPerPage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Games per page',
      buttons: [
        {
          text: '25',
          handler: () => {
            this.perPage = 25;
            this.getList();
          }
        },
        {
          text: '50',
          handler: () => {
            this.perPage = 50;
            this.getList();
          }
        },
        {
          text: '75',
          handler: () => {
            this.perPage = 75;
            this.getList();
          }
        },
        {
          text: '100',
          handler: () => {
            this.perPage = 100;
            this.getList();
          }
        }
      ]
    });
    await actionSheet.present();
  }

  constructor(
    private gameService: GameService,
    private router: Router,
    public actionSheetController: ActionSheetController
  ) {
    this.getList();
  }

}
