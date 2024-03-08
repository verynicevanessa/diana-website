<template>
    <div class="shuffle-container">
    <div class="text"></div>
    </div>
  </template>
  
  
  <script>
export default {
  mounted() {
    // Hide the logo when the component mounts
    const menu = document.querySelector('.menu-wrapper');
    if (menu) {
      menu.style.display = 'none'; // Hide the logo
    }

    class TextScramble {
      constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=+*^?#________'
        this.update = this.update.bind(this)
      }

      setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || ''
          const to = newText[i] || ''
          const start = Math.floor(Math.random() * 40)
          const end = start + Math.floor(Math.random() * 40)
          this.queue.push({ from, to, start, end })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
      }

      update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i]
          if (this.frame >= end) {
            complete++
            output += to
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.randomChar()
              this.queue[i].char = char
            }
            output += `<span class="dud">${char}</span>`
          } else {
            output += from
          }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
          this.resolve()
        } else {
          this.frameRequest = requestAnimationFrame(this.update)
          this.frame++
        }
      }

      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
      }
    }

    const phrases = ['DIANA WEISMAN'];
    const el = document.querySelector('.text');
    const fx = new TextScramble(el);

    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(() => {
          this.$router.push('/Decision');
        }, 1000);
      });
      counter = (counter + 1) % phrases.length;
    };

    next();
  },
};
</script>

  
  
  <style scoped>
  /* Add your styling here */
  .shuffle-container {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    height: 100vh;
    padding: 10px;
  }

  .text {
    font-size:4em;
  }
  </style>
  