import { HelixApp } from 'https://cdn.skypack.dev/@dylandepass/helix-web-library@v1.3.13/dist/helix-web-library.esm.min.js';

HelixApp.init({
  rumEnabled: false,
  rumGeneration: '',
  productionDomains: ['helix-reveal'],
  lcpBlocks: ['hero'],
}).decorate();