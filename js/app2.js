/* =============================== Model ================================== */
let model = {
   currentSheltie: null,
   showAdmin: false,
   adminForm: null,
   cats: [
      {
         clickCount: 0,
         name: 'Sheltie1',
         imgSrc: 'img/800px-Shetland_Sheepdog_black_agility.jpg'
      },
      {
         clickCount: 0,
         name: 'Sheltie2',
         imgSrc: 'img/Dog-Shetland-Sheepdog-Puppy-Pet-Cute-Doggy-Pup-705810.jpg'
      },
      {
         clickCount: 0,
         name: 'Sheltie3',
         imgSrc: 'img/Shetland_Sheepdog2.jpg'
      },
      {
         clickCount: 0,
         name: 'Sheltie4',
         imgSrc: 'img/dog_sheltie_tree_close-1324372.jpg'
      },
      {
         clickCount: 0,
         name: 'Sheltie5',
         imgSrc: 'img/dog_sheltie_tree_pond_close-846262.jpg'
      },
      {
         clickCount: 0,
         name: 'Sheltie6',
         imgSrc: 'img/dog_sheltiie_close-838986.jpg'
      }
   ],
};


/* =============================== Octopus ================================== */
let octopus = {
   init: function() {
      // set our current cat to the first one in the list
      model.currentSheltie = model.cats[ 0 ];

      // set admin menu to hidden by default
      model.showAdmin = false;
      //model.adminButton = null;
      model.adminForm = null;

      // tell our views to initialize
      catListView.init();
      catView.init();
      adminView.init();
   },

   getShelties: function() {
      return model.cats;
   },

   getCurrentSheltie: function() {
      return model.currentSheltie;
   },

   // set the currently-selected cat to the object passed in
   setCurrentSheltie: function( cat ) {
      model.currentSheltie = cat;
   },

   // set the currently-selected cat to the object passed in
   setCurrentSheltieGivenName: function( dog ) {

      for ( let index = 0; index < model.cats.length; index++ ) {
         if ( model.cats[ index ].name === dog ) {
            console.log( model.cats[ index ].name );

            return ( model.currentSheltie = index );
         }
      }
   },

   // increments the counter for the currently-selected cat
   incrementCounter: function() {
      model.currentSheltie.clickCount++;
      catView.render();
   },

   // increments the counter for the currently-selected cat
   updateCounter: function( count ) {
      model.currentSheltie.clickCount = count;
      catView.render();
   },

   getSheltieName: function() {
      return ( model.currentSheltie.name );
   },

   setSheltieName: function( dog ) {
      model.currentSheltie.catName = dog;
   },

   getImgSrc: function() {
      return ( model.currentSheltie.imgSrc );
   },

   setImgSrc: function( img ) {
      model.currentSheltie.imgSrc = img;
   },

   getClickCount: function() {
      return ( model.currentSheltie.clickCount );
   }
};


/* =============================== View ================================== */
let catView = {
   init: function() {
      // store pointers to our DOM elements for easy access later
      this.catElem = document.getElementById( 'cat' );
      this.catNameElem = document.getElementById( 'cat-name' );
      this.catImageElem = document.getElementById( 'cat-img' );
      this.countElem = document.getElementById( 'cat-count' );

      // on click, increment the current cat's counter
      this.catImageElem.addEventListener( 'click', function() {
         let countElem = document.getElementById( 'cat-count' );
         let clickCount = document.querySelector( 'input#clickCount' );

         // update the DOM elements with values from the current cat
         let currentSheltie = octopus.getCurrentSheltie();
         octopus.incrementCounter();
         countElem.value = octopus.getClickCount();
         document.querySelector( 'input#clickCount' ).value = countElem.value;
      } );

      // render this view (update the DOM elements with the right values)
      this.render();
   },

   render: function() {
      // update the DOM elements with values from the current cat
      let currentSheltie = octopus.getCurrentSheltie();
      this.countElem.textContent = octopus.getClickCount();
      this.catNameElem.textContent = octopus.getSheltieName();
      this.catImageElem.src = currentSheltie.imgSrc;
   }
};


/* =============================== AdminView ================================== */
const adminView = {
   initialized: false,
   visible: false,

   init: function() {
      this.initialized = true;
      this.adminButton = document.getElementById( 'adminButton' );
      this.adminSave = document.getElementById( 'adminSave' );
      this.adminForm = document.getElementById( 'adminForm' );
      this.catName = document.querySelector( 'input#catName' );
      this.imgSrc = document.querySelector( 'input#imgSrc' );
      this.clickCount = document.querySelector( 'input#clickCount' );
      this.clearButton = document.querySelector( 'button#js-admin-reset' );

      this.adminButton.onclick = () => {
         if ( this.isVisible() ) {
            this.hide();
            console.log( 'danny' );
         } else {
            //console.log(this.catName.value);
            this.renderAdminFields();
            this.show();
         }
      };

      // update the DOM elements with values from the current cat
      // let currentSheltie = octopus.getCurrentSheltie();
      // this.countElem.textContent = octopus.getClickCount();
      // this.catNameElem.textContent = currentSheltie.name;
      // this.catImageElem.src = currentSheltie.imgSrc;

      this.adminSave.onclick = ( e ) => {
         e.preventDefault();
         octopus.updateCounter( this.clickCount.value );
         octopus.setCurrentSheltieGivenName( this.catName.value );
         octopus.setSheltieName( this.catName.value );
         octopus.setImgSrc( this.imgSrc.value );
         console.log( this.clickCount.value, this.catName.value, this.imgSrc.value );
         // let data = {
         //    catName: this.catName.value,
         //    imgSrc: this.imgSrc.value,
         //    clickCount: this.clickCount.value
         // }
      };
   },

   renderAdminFields: function() {
      this.catName.value = octopus.getSheltieName();
      this.imgSrc.value = octopus.getImgSrc();
      this.clickCount.value = octopus.getClickCount();
   },

   updateAdminFields: function() {
      // this.catName.value = this.adminForm.catName;
      // this.imgSrc.value = this.adminForm.imgSrc;
      // this.clickCount.value = this.adminForm.clickCount;
      //
      // octopus.updateCounter( this.clickCount.value );
      catView.render();
   },

   isVisible: function() {
      return this.visible;
   },

   hide: function() {
      this.visible = false;
      this.adminForm.classList.add( 'hide' );
   },

   show: function() {
      this.visible = true;
      this.adminForm.classList.remove( 'hide' );
   }
}

/* =============================== catListView ================================== */
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
      let cats = octopus.getShelties();

      // empty the cat list
      this.catListElem.innerHTML = '';

      // loop over the cats
      for ( i = 0; i < cats.length; i++ ) {
         // this is the cat we're currently looping over
         cat = cats[ i ];

         // make a new cat list item and set its text
         elem = document.createElement( 'li' );
         elem.textContent = cat.name;

         // on click, setCurrentSheltie and render the catView
         // (this uses our closure-in-a-loop trick to connect the value
         //  of the cat letiable to the click event function)
         elem.addEventListener( 'click', ( function( catCopy ) {
            return function() {
               octopus.setCurrentSheltie( catCopy );
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

