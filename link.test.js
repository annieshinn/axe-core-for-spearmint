// import React from 'react';
// import axe from 'axe-core';
// import { mountToDoc } from './test-helpers';

// import Link from './link';

// test('Link has no axe violations', done => {

//   // expect([1, 2]).not.toHaveLength(2);
//   // done();

//   const linkComponent = mountToDoc(
//     <Link page="http://www.axe-core.org">axe website</Link>
//   );
//   const linkNode = linkComponent.getDOMNode();

//   const config = {
//     // preload: {
//     //   timeout: 60000,
//     // },
//     rules: {
//       'color-contrast': { enabled: false },
//       'link-in-text-block': { enabled: false }
//     }
//   };
//   // jest.setTimeout(50000)

//   axe.run(linkNode, config, (err, { violations }) => {
//     console.log('-----1-----');
//     expect(err).toBe(null);
//     console.log('-----2-----');
//     // expect(violations).toHaveLength(0);
//     console.log('-----3-----');
//     expect([1, 2]).not.toHaveLength(2);
//     console.log('-----4-----');
//     done();
//   });
// });


const regeneratorRuntime = require("regenerator-runtime");

import axe from 'axe-core'

const isA11y = ((html) =>
  new Promise((resolve, reject) => {
    axe.run(html, {}, (err, result={}) => {
      const { violations=[] } = result

      if (err) {
        reject(err)
      } else if (violations.length > 0) {
        reject(violations)
      } else {
        // Uncomment to view incomplete/unavailable tests & why
        //console.log(result.incomplete)
        resolve(true)
      }
    })
  })
)

test('bad form', async () => {
  const wrap = document.createElement('div')
  wrap.innerHTML = `
    <form>
      <div>Enter your name</div>
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
  `
  document.body.appendChild(wrap)

  expect(await isA11y(wrap)).toEqual(true)
})