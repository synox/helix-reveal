import { HelixApp, readBlockConfig, toClassName } from 'https://cdn.skypack.dev/@dylandepass/helix-web-library@v1.4.2/dist/helix-web-library.esm.js';
import Reveal from './reveal.esm.js';
import RevealZoom from '../plugin/zoom/zoom.esm.js';
import RevealNotes from '../plugin/notes/notes.esm.js';
import RevealSearch from '../plugin/search/search.esm.js';
import RevealHighlight from '../plugin/highlight/highlight.esm.js';

function replaceTag(element, tag) {
  var newTag = document.createElement(tag);
  while (element.firstChild) {
    newTag.appendChild(element.firstChild);
  }
  element.parentNode.replaceChild(newTag, element);
  [...element.attributes].forEach(attr => { newTag.setAttribute(attr.nodeName, attr.nodeValue) })
}

function decorateReveal() {
  const main = document.body.querySelector('main');
  main.classList.add('reveal');
  const slides = document.createElement('div');
  slides.classList.add('slides');
  slides.innerHTML = main.innerHTML;
  main.replaceChildren();
  main.appendChild(slides);

  // Treat links that contain an href that starts with http://attribute as attributes
  // Decorate the parent element with the attributes and remove the achor tag
  main.querySelectorAll("[href^='http://attribute']").forEach((link) => {
    const parent = link.parentNode;
    const attributes = link.href.replace('http://attribute/?', '').split('&');
    attributes.forEach((attribute) => {
      const [key, value] = attribute.split('=');
      parent.setAttribute(key, decodeURI(value));
    });
    parent.innerHTML = link.innerHTML;
  });

  // Use line numbers on any code blocks.. assume javascript
  main.querySelectorAll('code').forEach((code) => {
    // code.setAttribute('data-line-numbers', '');
    code.classList.add('language-javascript');
  });
}

HelixApp.init({
  blocksSelector: 'section > div',
  lcpBlocks: [],
  makeLinksRelative: false
})
  .withLoadEager(() => {
    decorateReveal();
    Reveal.initialize({
      width: 1600,
      height: 900,
      controls: true,
      progress: true,
      center: true,
      hash: true,
      transition: 'convex',
      // Learn about plugins: https://revealjs.com/plugins/
      plugins: [RevealZoom, RevealNotes, RevealSearch, RevealHighlight]
    });
  })
  .withDecorateSections((main) => {
    main.querySelectorAll(':scope > div').forEach((section) => {
      const sectionMeta = section.querySelector('div.section-metadata');
      if (sectionMeta) {
        const meta = readBlockConfig(sectionMeta);
        const keys = Object.keys(meta);
        keys.forEach((key) => {
          if (key === 'style') section.classList.add(toClassName(meta.style));
          else if (key === 'notes') {
            const notes = document.createElement('aside');
            notes.classList.add('notes');
            notes.innerHTML = meta[key];
            section.appendChild(notes);
          }
          else section.setAttribute(key, meta[key]);
        });
        sectionMeta.remove();
      }

      replaceTag(section, 'section');
    });
  })
  .withLoadHeader(() => {
    // noop
  }).withLoadFooter(() => {
    // noop
  })
  .decorate();
