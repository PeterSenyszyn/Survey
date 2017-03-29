import { Component, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { NavController, Slides, ToastController } from 'ionic-angular';

import { Howl } from 'howler';

import { GraphicalTestPage } from '../graphical-test/graphical-test';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  stopClockEnd: any;
  wordInput: any; //Input
  words: Array<any> = []; //Word container

  sound: any;

  noMusicScore: any;
  classicalMusicScore: any;
  popMusicScore: any;
  hiphopMusicScore: any;

  numWordsRemembered: number = 0;
  scoreMultiplier: any = 1;
  inputSecs: any = 0; //Seconds left for the multiplier

  currentMusicType: Array<any> = [
    "None",
    "classical",
    "pop",
    "hiphop"
  ];

  currentMusicIndex: any = 0;

  //The lists to compare words to
  list1 = [
    "Artist", "Acidic", "Group", "Juice",
    "Confident", "Eagle", "Mistake", "Fancy",
    "Chief", "Pleasant", "Lock", "Bet",
    "Dissolve", "Attach", "Crack", "Generate",
    "Shock", "Create", "Octopus", "Seven"
  ];

  list2 = [
    "Crude", "Lemon", "West", "Activate",
    "Babysitter", "Alcohol", "Limit", "Mail",
    "Department", "Human", "Appear", "Help",
    "Ice", "Fight", "Market", "Bounce",
    "Fishing", "Feast", "Comment", "Drops"
  ];

  list3 = [
    "Stone", "Army", "Apple", "Remember",
    "Admiral", "Blueberry", "Mighty", "Push",
    "Arrogant", "Alphabet", "Gorilla", "Wild",
    "Flight", "Thrill", "Market", "Delight",
    "Muscle", "Chair", "Coat", "Leaves"
  ];

  list4 = [
    "Demonstrate", "Rainbow", "Random", "Actor",
    "Work", "Crushed", "Entertainment", "Believe",
    "Link", "Hour", "Build", "Smart",
    "Repeat", "Crispy", "Aeroplane", "Dance",
    "Fibre", "Rewind", "Document", "Enemy"
  ];

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public http: Http) {}

  makeid()
  {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  reset()
  {
    this.words = [];

    this.numWordsRemembered = 0;
    this.scoreMultiplier = 1;
    this.inputSecs = 0;
  }

  test()
  {
    this.slides.lockSwipes(true);
    //this.slides.lockSwipes(false);

    if (this.currentMusicType[this.currentMusicIndex] !== "None")
    {
      this.sound = new Howl({
          src: ['assets/' + this.currentMusicType[this.currentMusicIndex] + '.mp3']
        });

      this.sound.play();
    }

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
        scope.slides.lockSwipes(false);

        clearInterval(checkTimeLeft);

        if (scope.currentMusicType[scope.currentMusicIndex] !== "None")
          scope.sound.unload();

        scope.currentMusicIndex++;

        scope.slides.slideTo(scope.slides.getActiveIndex() + 1);
      }
    }, 1000);
  }

  dataInput()
  {
    this.slides.lockSwipes(true);

    //2 mins from now (FOR MULTIPLIER)
    var countDownDate = new Date();
    countDownDate.setMinutes(countDownDate.getMinutes() + 2);

    var scope = this;

    var checkTimeLeftOneMin = setInterval(function() {
      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate.getTime() - now;

      scope.inputSecs = distance / 1000;

      if (distance < 0)
        clearInterval(checkTimeLeftOneMin);
    }, 1000);
  }

  slideChanged()
  {
    if (this.slides.getActiveIndex() >= 2 && this.slides.getActiveIndex() <= 9)
    {
      if (this.slides.getActiveIndex() % 2 == 0) //Even number - test the user
        this.test();

      else //Odd number - take the input from the user
        this.dataInput();
    }
  }

  submitWord()
  {
    var toast;
    var alreadySubmitted = false;

    for (var i = 0; i < this.words.length; i++)
    {
      if (this.words[i] === this.wordInput)
        alreadySubmitted = true;
    }

    if (alreadySubmitted)
    {
      toast = this.toastCtrl.create({
        message: 'Error: you have already submitted that word!',
        duration: 3000
      });
    }

    else if (this.wordInput === undefined) //input contains only whitespace
    {
      toast = this.toastCtrl.create({
        message: 'Error: please type a valid word!',
        duration: 3000
      });
    }

    else
    {
      this.words.push(this.wordInput);
      this.wordInput = "";

      var wordConcat = "";

      for (var i = 0; i < this.words.length; i++)
        wordConcat += this.words[i] + " ";

      toast = this.toastCtrl.create({
        message: wordConcat,
        duration: 5000
      });
    }

    toast.present();
  }

  finish(numTest)
  {
    this.slides.lockSwipes(false);
    this.slides.slideTo(this.slides.getActiveIndex() + 1);

    if (this.inputSecs < 60 && this.words.length == 20) //Maximum multiplier
      this.scoreMultiplier = 5;

    else if (this.inputSecs >= 60 && this.inputSecs < 120 && this.words.length == 20) //Lowest multiplier
      this.scoreMultiplier = 2;

    else
      this.scoreMultiplier = 1;

    //Now time to check how much the user remembered
    var listToUse;

    switch (numTest)
    {
      case 1: listToUse = this.list1.slice(); break;
      case 2: listToUse = this.list2.slice(); break;
      case 3: listToUse = this.list3.slice(); break;
      case 4: listToUse = this.list4.slice(); break;
    }

    for (var i = 0; i < this.words.length; i++)
    {
      for (var j = 0; j < listToUse.length; j++)
      {
        if (this.words[i].toUpperCase() === listToUse[j].toUpperCase())
          this.numWordsRemembered++;
      }
    }

    switch (numTest)
    {
      case 1: this.noMusicScore = this.numWordsRemembered * this.scoreMultiplier; break;
      case 2: this.classicalMusicScore = this.numWordsRemembered * this.scoreMultiplier; break;
      case 3: this.popMusicScore = this.numWordsRemembered * this.scoreMultiplier; break;
      case 4: this.hiphopMusicScore = this.numWordsRemembered * this.scoreMultiplier; break;
    }

    this.reset();
  }

  moveOn()
  {
    var link = 'http://petersenyszyn.com/survey/php/send-short-term.php';

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var id = this.makeid();

    var data = JSON.stringify({ randomId: id, noMusicScore: this.noMusicScore, classicalMusicScore: this.classicalMusicScore,
                                popMusicScore: this.popMusicScore, hiphopMusicScore: this.hiphopMusicScore });

    this.http.post(link, data, { headers: headers }).subscribe(res => {
      if (res.text() === "0") 
      {
        var toast = this.toastCtrl.create({
          message: 'Successfully pushed survey data to server!',
          duration: 2000
        });

        var scope = this;

        toast.onDidDismiss(() => {
          scope.navCtrl.setRoot(GraphicalTestPage, { randomId: id} );
        });
          
        toast.present();
      }
    });
  }
}
