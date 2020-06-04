const assert = require('assert');

module.exports = eva => {
  // Blocks: groups of expressions:


  assert.strictEqual(eva.eval(
    ['begin',
      ['var', 'x', 10],
      ['var', 'y', 20],
      ['+', ['*', 'x', 'y'], 30],
    ]
  ), 230);
  // Nested environments:
  assert.strictEqual(eva.eval(
    ['begin',
      ['var', 'x', 10],
      ['begin',
        ['var', 'x', 20],
        'x'
      ],
      'x'
    ]
  ), 10);
  // assess parent variables:
  // Identifier Resolution
  assert.strictEqual(eva.eval(
    ['begin',
      ['var', 'value', 10],
      ['var', 'result', ['begin',
        ['var', 'x', ['+', 'value', 10]],
        'x'
      ]],
      'result'
    ]
  ), 20);
  // Update parent variables:
  assert.strictEqual(eva.eval(
    ['begin',
      ['var', 'data', 10],
      ['begin',
        ['set', 'data', 100],
      ],
      'data'
    ]
  ), 100);
};
