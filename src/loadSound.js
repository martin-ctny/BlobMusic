import Sound from "./sound";
import mp3 from "./mp3/code.mp3";
import App from "./app";

export default class LoadSound {
  constructor() {
    this.sound = new Sound(mp3, 145, 0, () => this.startSound(this));
    this.kick = 0;
    this.kicks = this.sound.createKick({
      frequency: [0, 10],
      threshold: 3,
      decay: 2,
      onKick: (kick) => {
        this.kick = kick;
      },
      OffKick: null,
    });
    this.kicks.on();
    this.initEvent();
  }

  initEvent() {
    const btn = document.querySelector(".play");
    let isPlaying = false;

    btn.addEventListener("click", () => {
      if (isPlaying) {
        this.sound.pause();
        btn.innerHTML = "Play";
        isPlaying = false;
      } else {
        this.sound.play();
        btn.innerHTML = "Pause";
        isPlaying = true;
      }
    });

    const btn2 = document.querySelector(".mute");

    btn2.addEventListener("click", () => {
      let volume = (btn2.value - 1) / 10;
      console.log(volume);
      this.sound.setVolume(volume);
    });
  }
}
