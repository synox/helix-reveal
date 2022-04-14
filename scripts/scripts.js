import { HelixApp, readBlockConfig, toClassName } from 'https://cdn.skypack.dev/@dylandepass/helix-web-library@v1.3.13/dist/helix-web-library.esm.min.js';
import Reveal from './reveal.esm.js';
import RevealZoom from '../plugin/zoom/zoom.esm.js';
import RevealNotes from '../plugin/notes/notes.esm.js';
import RevealSearch from '../plugin/search/search.esm.js';
import RevealMarkdown from '../plugin/markdown/markdown.esm.js';
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
}

HelixApp.init({
  rumEnabled: false,
  rumGeneration: '',
  productionDomains: ['helix-reveal'],
  lcpBlocks: ['hero'],
})
  .withLoadEager((document) => {
    decorateReveal();
    Reveal.initialize({
      controls: true,
      progress: true,
      center: true,
      hash: true,
      transition: 'convex',
      // Learn about plugins: https://revealjs.com/plugins/
      plugins: [RevealZoom, RevealNotes, RevealSearch, RevealMarkdown, RevealHighlight]
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

    main.querySelectorAll('code').forEach((code) => {
      code.setAttribute('data-line-numbers', '');
      code.classList.add('language-javascript');
    });
  })
  .withLoadHeader(() => {
    // noop
  }).withLoadFooter(() => {
    // noop
  })
  .decorate();