new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Bones",
          artist: "Imagine Dragons",
          cover: "https://iili.io/HQfRcPe.jpg",
          source: "https://audio.jukehost.co.uk/zmhqvfVGI63XH6hyrEWExMBmbwd5KeRz",
          url: "https://youtu.be/TO-_3tck2tg",
          favorited: false
        },
        {
          name: "Miss You",
          artist: "Oliver Tree And Robin Schulz",
          cover: "https://iili.io/HQflRNj.jpg",
          source: "https://audio.jukehost.co.uk/mVuyihHx88XzVfWSgABHpYXJsuLNgMRv",
          url: "https://youtu.be/BX0lKSa_PTk",
          favorited: true
        },

        {
          name: "Gangsta's Paradise",
          artist: "Coolio and Kylian Mash",
          cover: "https://iili.io/HQf1Nat.jpg",
          source: "https://audio.jukehost.co.uk/8gIXxH0EWWJRLEnxVmALlXuCq3biM6hG",
          url: "https://youtu.be/fPO76Jlnz6c",
          favorited: true
        },

        {
          name: "Life Goes On",

          artist: "Oliver Tree",

          cover: "https://iili.io/HQfNEgf.jpg",

          source: "https://audio.jukehost.co.uk/bQCMuy4hbaIpA65w4i9O5w52DyUG1fGQ",

          url: "https://youtu.be/8F2s8ivKXNY",

          favorited: false
        },
        {
          name: "Old Town Road",

          artist: "Lil Nas X",

          cover: "https://iili.io/HQfM2ja.jpg",

          source: "https://audio.jukehost.co.uk/r11E2q3nTFGtj9Rnvepb4dOqK313WsxS",

          url: "https://youtu.be/r7qovpFAGrQ",

          favorited: true
        },
        {
          name: "Mocking Bird",
          artist: "Eminem",
          cover: "https://iili.io/HQfkeqX.jpg",
          source: "https://audio.jukehost.co.uk/uIbNICLoYTkWsilPu6Lzcol33vcie34r",
          url: "https://youtu.be/S9bCLPwzSC0",
          favorited: false
        },
        {
          name: "Return of the tres (Instrumental)",
          artist: "Instrumental",
          cover: "https://iili.io/HQfvSG1.jpg",
          source: "https://audio.jukehost.co.uk/HOSppeMmTsb8mJOeh4RVGhmHniTzyjeu",
          url: "https://youtu.be/sJT1XbwYWfI",
          favorited: true
        },
        {
          name: "Toxic",
          artist: "Boywithuke",
          cover: "https://iili.io/HQfSF5J.png",
          source: "https://audio.jukehost.co.uk/GpAU5ygbUtKmTy6uFiIG0PBGiuotfWoW",
          url: "https://youtu.be/Mvaosumc4hU",
          favorited: false
        },
              ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});