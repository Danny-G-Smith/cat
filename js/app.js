/* ======= Model ======= */

let model = {
   currentCat: null,
   showAdmin: false,
   adminButton: null,
   adminForm: null,
   cats: [
      {
         clickCount: 0,
         name: 'Cat1',
         imgSrc: 'img/cat-1652822_640.jpg',
         imgAttribution: 'https://www.flickr.com/photos/bigtallguy/434164568'
      },
      {
         clickCount: 0,
         name: 'Cat2',
         imgSrc: 'img/cat-2197025_640.jpg',
         imgAttribution: 'https://www.flickr.com/photos/xshamx/4154543904'
      },
      {
         clickCount: 0,
         name: 'Cat3',
         imgSrc: 'img/cat-2369169_640.jpg',
         imgAttribution: 'https://www.flickr.com/photos/kpjas/22252709'
      },
      {
         clickCount: 0,
         name: 'Cat4',
         imgSrc: 'img/cat-2882170_640.jpg',
         imgAttribution: 'https://www.flickr.com/photos/malfet/1413379559'
      },
      {
         clickCount: 0,
         name: 'Cat5',
         imgSrc: 'img/cat-3041498_640.jpg',
         imgAttribution: 'https://www.flickr.com/photos/onesharp/9648464288'
      },
      {
         clickCount: 0,
         name: 'Cat6',
         imgSrc: 'img/cat-3279064_640.jpg',
         imgAttribution: 'https://www.flickr.com/photos/onesharp/9648464288'
      }
   ],
   // editCurrentCat: function( name, imgSrc, clickCount ) {
   //    cats[ currentCat ].name = name;
   //    cats[ currentCat ].imgSrc = imgSrc;
   //    cats[ currentCat ].clickCount = clickCount;
   // },

   //alert( cats[ 0 ].name; );
};


/* ======= Octopus ======= */

let octopus = {

   init: function() {
      // set our current cat to the first one in the list
      model.currentCat = model.cats[ 0 ];

      // set admin menu to hidden by default
      model.showAdmin = false;
      model.adminButton = null;
      model.adminForm = null;

      // tell our views to initialize
      catListView.init();
      catView.init();
      adminView.init();
   },

   getCurrentCat: function() {
      return model.currentCat;
   },

   getCats: function() {
      return model.cats;
   },

   // set the currently-selected cat to the object passed in
   setCurrentCat: function( cat ) {
      model.currentCat = cat;
   },

   // increments the counter for the currently-selected cat
   incrementCounter: function() {
      model.currentCat.clickCount++;
      catView.render();
   },
   // editCat: function( name, imgSrc, clickCount ) {
   //    model.editCurrentCat( name, imgSrc, clickCount );
   //    catView.render();
   //    catListView.render();
   // }
};


/* ======= View ======= */

let catView = {

   init: function() {
      // store pointers to our DOM elements for easy access later
      this.catElem = document.getElementById( 'cat' );
      this.catNameElem = document.getElementById( 'cat-name' );
      this.catImageElem = document.getElementById( 'cat-img' );
      this.countElem = document.getElementById( 'cat-count' );

      // on click, increment the current cat's counter
      this.catImageElem.addEventListener( 'click', function() {
         octopus.incrementCounter();
      } );

      // render this view (update the DOM elements with the right values)
      this.render();
   },

   render: function() {
      // update the DOM elements with values from the current cat
      let currentCat = octopus.getCurrentCat();
      this.countElem.textContent = currentCat.clickCount;
      this.catNameElem.textContent = currentCat.name;
      this.catImageElem.src = currentCat.imgSrc;
   }
};

let adminView = {
   init: function() {
      let adminButton = document.getElementById( 'adminButton' );
      this.adminForm = document.getElementById( 'adminForm' );

      // render this view (update the DOM elements with the right values)
      this.render();
   },

   render: function() {
      // on click, toggle stat of showing the admin menu
      let adminButton = document.getElementById( 'adminButton' );
      let adminForm = document.getElementById( 'adminForm' );
      adminButton.addEventListener( 'click', function() {

         if ( octopus.showAdmin === true ) {
            octopus.showAdmin = false;
            adminForm.classList.add( 'hide' );
         } else {
            octopus.showAdmin = true;
            adminForm.classList.remove( 'hide' );
         }
      })
   },
}

let catListView = {

   init: function() {
      // store the DOM element for easy access later
      this.catListElem = document.getElementById( 'cat-list' );

      // render this view (update the DOM elements with the right values)
      this.render();
   },

   render: function() {
      let cat, elem, i;
      // get the cats we'll be rendering from the octopus
      let cats = octopus.getCats();

      // empty the cat list
      this.catListElem.innerHTML = '';

      // loop over the cats
      for ( i = 0; i < cats.length; i++ ) {
         // this is the cat we're currently looping over
         cat = cats[ i ];

         // make a new cat list item and set its text
         elem = document.createElement( 'li' );
         elem.textContent = cat.name;

         // on click, setCurrentCat and render the catView
         // (this uses our closure-in-a-loop trick to connect the value
         //  of the cat letiable to the click event function)
         elem.addEventListener( 'click', ( function( catCopy ) {
            return function() {
               octopus.setCurrentCat( catCopy );
               catView.render();
            };
         } )( cat ) );

         // finally, add the element to the list
         this.catListElem.appendChild( elem );
      }
   }
};

// make it go!
octopus.init();
