//This is the service worker with the Cache-first network

var CACHE = 'pwabuilder-precache';

var precacheFiles = [
    "/about/about.html",
    "/game/game.html",
    "14.mp3",
    "/game/script.js",
    "/game/stylesheet.css",
    "/mystery/mystery.html",
    "/PWA/pwabuilder-sw.js",
    "/PWA/pwabuilder-sw-register.js",
    "/PWA/manifest.json",
    "/stats/script.js",
    "/stats/stats.html",
    "/store/Colors.png",
    "/store/Scissors.png",
    "/store/Scramble.png",
    "/store/script.js",
    "/store/store.html",
    "/store/stylesheet.css",
    "add.mp3",
    "Applead.png",
    "back-only-page.css",
    "back-only-page.js",
    "base.css",
    "click.mp3",
    "dictionary-handler.js",
    "fail.mp3",
    "Grocery King.png",
    "index.html",
    "platform-specific.js",
    "Play.png",
    "pluck.mp3",
    "Preview.png",
    "script.js",
    "slider.css",
    "soundengine.js",
    "stylesheet.css",
    "tick.mp3",
    "words_alpha.txt"
];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
  console.log('[PWA Builder] The service worker is being installed.');
  evt.waitUntil(precache().then(function() {
    console.log('[PWA Builder] Skip waiting on install');
    return self.skipWaiting();
  }));
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
  console.log('[PWA Builder] Claiming clients for current page');
  return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
  console.log('[PWA Builder] The service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}

function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  //this is where we call the server to get the newest version of the 
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request){
  //this is the fallback if it is not in the cache to go to the server and get it
  return fetch(request).then(function(response){ return response});
}
