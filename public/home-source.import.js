const styleSheetLink = [
  './portfolio/fonts/icomoon/style.css',
  './portfolio/css/owl.carousel.min.css',
  './portfolio/css/owl.theme.default.min.css',
  './portfolio/css/style.css',
  'https://fonts.googleapis.com/css?family=Piazzolla',
];

const javaScriptLink = [
  './portfolio/js/aos.js',
  './portfolio/js/owl.carousel.min.js',
];

const importStyleSheet = (textLink) => {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = textLink;
  document.head.appendChild(link);
};

const importJavaScriptLink = (textSrc) => {
  let source = document.createElement('script');
  source.src = textSrc;
  source.async = true;
  document.body.appendChild(source);
};

const importMainSource = () => {
  let mainSource = document.createElement('script');
  mainSource.src = './portfolio/js/main.js';
  mainSource.async = true;
  document.body.appendChild(mainSource);
};

async function importModule(pathname, callback) {
  if (window.location.pathname === pathname) {
    await javaScriptLink.map(async (element, index) => {
      await importJavaScriptLink(element);
      if (index === javaScriptLink.length - 1) {
        await setTimeout(() => callback(), 250);
      }
      return null;
    });
  }
}

importModule('/', importMainSource);
styleSheetLink.map(async (element) => {
  importStyleSheet(element);
  return null;
});
