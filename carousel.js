class Carousel {
  constructor(element) {
    this.board = element;

    // handle getures
    this.handle();
  }

  handle() {
    // list all cards
    this.cards = this.board.querySelectorAll('.card');

    // get top card
    this.topCard = this.cards[this.cards.length - 1];
    
    if (this.cards.length > 0) {
      // listen for pan gesture on top card
      this.hammer = new Hammer(this.topCard);
      this.hammer.add(
        new Hammer.Pan({
          position: Hammer.position_ALL,
          threshold: 0
        })
        );
        
        // pass event data to custom callback
        this.hammer.on("pan", this.onPan.bind(this));
      }
    }
    
    onPan(e) {
      if (!this.isPanning) {
        this.isPanning = true;
        
      // remove transition property
      this.topCard.style.transition = null;

      // get starting coordinates
      let style = window.getComputedStyle(this.topCard);
      let mx = style.transform.match(/^matrix\((.+)\)$/);
      this.startPosX = mx ? parseFloat(mx[1].split(', ')[4]) : 0;
      this.startPosY = mx ? parseFloat(mx[1].split(', ')[5]) : 0;
    }

    // calculate new coordinates
    let posX = e.deltaX + this.startPosX;
    let posY = e.deltaY + this.startPosX;

    // move card
    this.topCard.style.transform = 'translateX(' + posX + 'px) translateY(' + posY + 'px)';

    if (e.isFinal) {
      this.isPanning = false;

      // set back transition property
      this.topCard.style.transition = 'transform 200ms ease-out';

      // reset card position
      this.topCard.style.transform = 'translateX(-50%) translateY(-50%)';
    }
  }
}

var board = document.querySelector('#board');

var carousel = new Carousel(board);