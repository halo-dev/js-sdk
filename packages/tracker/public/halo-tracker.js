(function () {
  'use strict';

  (function (window) {
    var window_screen = window.screen;
    var width = window_screen.width;
    var height = window_screen.height;
    var language = window.navigator.language;
    var location = window.location;
    var localStorage = window.localStorage;
    var document = window.document;
    var history = window.history;
    var hostname = location.hostname;
    var pathname = location.pathname;
    var search = location.search;
    var currentScript = document.currentScript;

    if (!currentScript) { return; }

    var assign = function (a, b) {
      Object.keys(b).forEach(function (key) {
        if (b[key] !== undefined) { a[key] = b[key]; }
      });
      return a;
    };

    var hook = function (_this, method, callback) {
      var orig = _this[method];

      return function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        callback.apply(null, args);

        return orig.apply(_this, args);
      };
    };

    var doNotTrack = function () {
      var doNotTrack = window.doNotTrack;
      var navigator = window.navigator;
      var external = window.external;

      var msTrackProtection = 'msTrackingProtectionEnabled';
      var msTracking = function () {
        return external && msTrackProtection in external && external[msTrackProtection]();
      };

      var dnt = doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || msTracking();

      return dnt == '1' || dnt === 'yes';
    };

    var trackingDisabled = function () { return (localStorage && localStorage.getItem('haloTracker.disabled')) ||
      (dnt && doNotTrack()) ||
      (domain && !domains.includes(hostname)); };

    var _data = 'data-';
    var _false = 'false';
    var attr = currentScript.getAttribute.bind(currentScript);
    var group = attr(_data + 'group') || '';
    var plural = attr(_data + 'plural');
    var name = attr(_data + 'name');

    var hostUrl = attr(_data + 'host-url');
    var autoTrack = attr(_data + 'auto-track') !== _false;
    var dnt = attr(_data + 'do-not-track');
    var domain = attr(_data + 'domains') || '';
    var domains = domain.split(',').map(function (n) { return n.trim(); });
    var root = hostUrl
      ? hostUrl.replace(/\/$/, '')
      : currentScript.src.split('/').slice(0, -1).join('/');
    var endpoint = root + "/apis/api.halo.run/v1alpha1/countertrackers";
    var screen = width + "x" + height;
    var currentUrl = "" + pathname + search;
    var currentRef = document.referrer;

    /* Collect metrics */

    var getPayload = function () { return ({
      group: group,
      plural: plural,
      name: name,
      hostname: hostname,
      screen: screen,
      language: language,
      url: currentUrl,
    }); };

    var collect = function (payload) {
      if (trackingDisabled()) { return; }

      return fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(Object.assign({}, payload)),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(function (res) { return res.text(); })
        .then(function (text) { return (cache = text); });
    };

    var trackView = function (url, referrer) {
        if ( url === void 0 ) url = currentUrl;
        if ( referrer === void 0 ) referrer = currentRef;

        return collect(
        assign(getPayload(), {
          url: url,
          referrer: referrer,
        })
      );
    };

    /* Handle history changes */

    var handlePush = function (state, title, url) {
      if (!url) { return; }

      currentRef = currentUrl;
      var newUrl = url.toString();

      if (newUrl.substring(0, 4) === 'http') {
        currentUrl = '/' + newUrl.split('/').splice(3).join('/');
      } else {
        currentUrl = newUrl;
      }

      if (currentUrl !== currentRef) {
        trackView();
      }
    };

    /* Global */

    if (!window.haloTracker) {
      var haloTracker = function (eventValue) { return trackEvent(eventValue); };
      haloTracker.trackView = trackView;

      window.haloTracker = haloTracker;
    }

    /* Start */

    if (autoTrack && !trackingDisabled()) {
      history.pushState = hook(history, 'pushState', handlePush);
      history.replaceState = hook(history, 'replaceState', handlePush);

      var update = function () {
        if (document.readyState === 'complete') {
          trackView();
        }
      };

      document.addEventListener('readystatechange', update, true);

      update();
    }
  })(window);

})();
