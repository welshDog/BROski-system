module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:4173/',
        'http://localhost:4173/product-3d',
        'http://localhost:4173/configurator',
        'http://localhost:4173/ar-viewer'
      ],
      numberOfRuns: 1,
      settings: {
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 360,
          height: 640,
          deviceScaleFactor: 2,
          disabled: false
        },
        throttlingMethod: 'simulate',
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          requestLatencyMs: 150,
          downloadThroughputKbps: 1638.4,
          uploadThroughputKbps: 736
        }
      }
    },
    assert: {
      assertMatrix: [
        {
          matchingUrlPattern: '/$',
          assertions: {
            'categories:performance': ['error', { minScore: 0.95 }],
            'total-byte-weight': ['error', { maxNumericValue: 800000 }]
          }
        },
        {
          matchingUrlPattern: '/product-3d$',
          assertions: {
            'categories:performance': ['error', { minScore: 0.9 }],
            'total-byte-weight': ['error', { maxNumericValue: 2000000 }]
          }
        },
        {
          matchingUrlPattern: '/configurator$',
          assertions: {
            'categories:performance': ['error', { minScore: 0.9 }],
            'total-byte-weight': ['error', { maxNumericValue: 1500000 }]
          }
        },
        {
          matchingUrlPattern: '/ar-viewer$',
          assertions: {
            'categories:performance': ['error', { minScore: 0.9 }],
            'total-byte-weight': ['error', { maxNumericValue: 1500000 }]
          }
        }
      ]
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci'
    }
  }
};
