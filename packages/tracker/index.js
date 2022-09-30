(window => {
  const {
    screen: { width, height },
    navigator: { language },
    location,
    localStorage,
    document,
    history,
  } = window;
  const { hostname, pathname, search } = location;
  const { currentScript } = document;

  if (!currentScript) return;

  const assign = (a, b) => {
    Object.keys(b).forEach(key => {
      if (b[key] !== undefined) a[key] = b[key];
    });
    return a;
  };

  const hook = (_this, method, callback) => {
    const orig = _this[method];

    return (...args) => {
      callback.apply(null, args);

      return orig.apply(_this, args);
    };
  };

  const doNotTrack = () => {
    const { doNotTrack, navigator, external } = window;

    const msTrackProtection = 'msTrackingProtectionEnabled';
    const msTracking = () => {
      return external && msTrackProtection in external && external[msTrackProtection]();
    };

    const dnt = doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || msTracking();

    return dnt == '1' || dnt === 'yes';
  };

  const trackingDisabled = () =>
    (localStorage && localStorage.getItem('haloTracker.disabled')) ||
    (dnt && doNotTrack()) ||
    (domain && !domains.includes(hostname));

  const _data = 'data-';
  const _false = 'false';
  const attr = currentScript.getAttribute.bind(currentScript);
  const group = attr(_data + 'group') || '';
  const plural = attr(_data + 'plural');
  const name = attr(_data + 'name');

  const hostUrl = attr(_data + 'host-url');
  const autoTrack = attr(_data + 'auto-track') !== _false;
  const dnt = attr(_data + 'do-not-track');
  const domain = attr(_data + 'domains') || '';
  const domains = domain.split(',').map(n => n.trim());
  const root = hostUrl
    ? hostUrl.replace(/\/$/, '')
    : currentScript.src.split('/').slice(0, -1).join('/');
  // '/api/tracker' is endpoint placeholder, will replace when build
  const endpoint = `${root}/api/tracker`;
  const screen = `${width}x${height}`;
  let currentUrl = `${pathname}${search}`;
  let currentRef = document.referrer;

  /* Collect metrics */

  const getPayload = () => ({
    group,
    plural,
    name,
    hostname,
    screen,
    language,
    url: currentUrl,
  });

  const collect = (payload) => {
    if (trackingDisabled()) return;

    return fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ ...payload }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.text())
      .then(text => {
        console.debug('Visit count:', text)
      });
  };

  const trackView = (url = currentUrl, referrer = currentRef) =>
    collect(
      assign(getPayload(), {
        url,
        referrer,
      }),
    );

  /* Handle history changes */

  const handlePush = (state, title, url) => {
    if (!url) return;

    currentRef = currentUrl;
    const newUrl = url.toString();

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
    const haloTracker = eventValue => trackEvent(eventValue);
    haloTracker.trackView = trackView;

    window.haloTracker = haloTracker;
  }

  /* Start */

  if (autoTrack && !trackingDisabled()) {
    history.pushState = hook(history, 'pushState', handlePush);
    history.replaceState = hook(history, 'replaceState', handlePush);

    const update = () => {
      if (document.readyState === 'complete') {
        trackView();
      }
    };

    document.addEventListener('readystatechange', update, true);

    update();
  }
})(window);
