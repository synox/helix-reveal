/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function gptImage() {
    const d = document.createElement('img');
    d.classList.add('gpt-image');
    d.src = "/blocks/gpt/gpt.png";
    return d;
}

function userImage() {
    const d = document.createElement('img');
    d.classList.add('gpt-image');
    d.src = "/blocks/gpt/user.png";
    return d;
}

/**
 * decorates the r-hstack block
 * @param {Element} block The experience block element
 */
export default async function decorate(block) {
    const rows = [...block.children];
    rows.forEach((row) => {
        row.children[0].classList.add('query');
        // row.children[0].prepend(userImage());
        row.children[1].classList.add('response');
        row.children[1].classList.add('fragment');
        row.children[1].prepend(gptImage());
    });
}
