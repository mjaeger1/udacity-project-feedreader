/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {  // short for $(document).ready(function() { ... });


    /* This suite is all about the RSS feeds definitions,
     * the allFeeds variable in our application. */

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('have all URLs', function() {
           allFeeds.forEach(function(f){
             expect(f.url).toBeDefined();
             expect(f.url.length).not.toBe(0);
             // note-to-myself: above two lines could be replaced by
             // expect(f.url).toBeTruthy();
           });
         });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have all names', function() {
           allFeeds.forEach(function(f){
             expect(f.name).toBeDefined();
             expect(f.name.length).not.toBe(0);
           });
         });
    });


    /* Test suite covering menu related tests */

    describe('The menu', function() {

          /* Test that ensures the menu element is
          * hidden by default. You'll have to analyze the HTML and
          * the CSS to determine how we're performing the
          * hiding/showing of the menu element.
          */
          it('is hidden by default', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
          });

          /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('shows/hides on-click', function() {
            $('.menu-icon-link').trigger('click'); // equals: $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });


    /* Test suite covering a test to ensure the initial loading
     * is done correctly */

    describe('Initial Entries', function() {

          /* Test that ensures when the loadFeed
          * function is called and completes its work, there is at least
          * a single .entry element within the .feed container.
          * Remember, loadFeed() is asynchronous so this test will require
          * the use of Jasmine's beforeEach and asynchronous done() function.
          */

          beforeEach(function(done) {
            loadFeed(0, function() {
              done();
            });
          });

          it('test', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
          });
    });




    /* Test suite covering a test to ensure new content is loading
     * when selecting a new feed */

    describe('New Feed Selection', function() {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         var initialContent, newContent;
         // var originalTimeout;

         beforeEach(function(done) {
           // originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
           // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
           loadFeed(0, function() {
             initialContent = $('.feed').html();
             loadFeed(1, function() {
               newContent = $('.feed').html();
               done();
             });
           });
         });

         it('actual changes the content', function(done) {
           // console.log(initialContent === newContent);
           expect(newContent).not.toEqual(initialContent);
           done();
         });

         afterEach(function() {
           // jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
           loadFeed(0);
         });
    });

}());
