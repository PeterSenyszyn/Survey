import { Component, ViewChild } from '@angular/core';

import { NavController, Slides, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  stopClockEnd: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {

  }

  slideChanged()
  {
    if (this.slides.getActiveIndex() == 2) //Short-term test with no music
    {
      this.slides.lockSwipes(true);

      //1 min from now
      var countDownDate = new Date();
      countDownDate.setMinutes(countDownDate.getMinutes() + 1);

      var scope = this;

      var checkTimeLeft = setInterval(function() {
        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate.getTime() - now;

        if (distance < 0)
        {
          clearInterval(checkTimeLeft);

          console.log("expired");

          scope.slides.lockSwipes(false);
          scope.slides.slideTo(3);
        }
      }, 1000);
    }

    else if (this.slides.getActiveIndex() == 3)
    {
      console.log("moved!");
    }
  }

  getTimeRemaining(endTime)
  {

  }
}
