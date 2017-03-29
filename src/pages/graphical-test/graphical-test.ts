import { Component, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { NavController, NavParams, ToastController, Slides } from 'ionic-angular';

import { Howl } from 'howler';

@Component({
  selector: 'page-graphical-test',
  templateUrl: 'graphical-test.html'
})

export class GraphicalTestPage 
{
  @ViewChild(Slides) slides: Slides;

  randomId: string;

  memoryScoreInput: any;
  avgResponseTimeInput: any;

  memoryScore: any;
  avgResponseTime: any;

  memoryScoreClassical: any;
  avgResponseTimeClassical: any;

  memoryScorePop: any;
  avgResponseTimePop: any;

  memoryScoreHiphop: any;
  avgResponseTimeHiphop: any;

  currentMusicType: Array<any> = [
    "None",
    "classical",
    "pop",
    "hiphop"
  ];

  currentMusicIndex: any = 0;

  sound: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public http: Http) 
  {
    this.randomId = navParams.get('randomId');
  }

  ionViewDidLoad()
  {
    this.slides.lockSwipes(true);
  }

  slideChanged()
  {
    if (this.slides.getActiveIndex() < 4)
    {
      this.slides.lockSwipes(true);

      this.memoryScoreInput = "";
      this.avgResponseTimeInput = "";

      if (this.currentMusicType[this.currentMusicIndex] !== "None")
      {
        if (this.currentMusicIndex > 1)
          this.sound.unload();

        this.sound = new Howl({
          src: ['assets/' + this.currentMusicType[this.currentMusicIndex] + '.mp3'],
          loop: true
        });

        this.sound.play();
      }
    }

    else if (this.slides.getActiveIndex() >= 4)
      this.sound.unload();
  }

  save(testNum)
  {
    switch (testNum)
    {
      case 0: //No music
        this.memoryScore = this.memoryScoreInput;
        this.avgResponseTime = this.avgResponseTimeInput;

        break;

      case 1: //Classical music
        this.memoryScoreClassical = this.memoryScoreInput;
        this.avgResponseTimeClassical = this.avgResponseTimeInput;

        break;

      case 2: //Pop music
        this.memoryScorePop = this.memoryScoreInput;
        this.avgResponseTimePop = this.avgResponseTimeInput;

        break;

      case 3: //Hiphop music
        this.memoryScoreHiphop = this.memoryScoreInput;
        this.avgResponseTimeHiphop = this.avgResponseTimeInput;

        this.pushData();

        break;
    }

    this.currentMusicIndex++;

    this.slides.lockSwipes(false);

    this.slides.slideNext();
  }

  pushData()
  {
    var link = 'http://petersenyszyn.com/survey/php/send-graphical-short-term.php';

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var data = JSON.stringify({ randomId: this.randomId, 
                                memoryScore: this.memoryScore, avgResponseTime: this.avgResponseTime,
                                memoryScoreClassical: this.memoryScoreClassical, avgResponseTimeClassical: this.avgResponseTimeClassical,
                                memoryScorePop: this.memoryScorePop, avgResponseTimePop: this.avgResponseTimePop,
                                memoryScoreHiphop: this.memoryScoreHiphop, avgResponseTimeHiphop: this.avgResponseTimeHiphop });

    this.http.post(link, data, { headers: headers }).subscribe(res => {
      if (res.text() === "0") 
      {
        var toast = this.toastCtrl.create({
          message: 'Successfully pushed survey data to server!',
          duration: 2000
        });

        var scope = this;

        toast.onDidDismiss(() => {
          scope.slides.slideNext();
        });
          
        toast.present();
      }
    });
  }
}
