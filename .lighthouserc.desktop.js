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
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1366,
          height: 768,
          deviceScaleFactor: 1,
          disabled: false
        },
        throttlingMethod: 'simulate',
        throttling: {
          rttMs: 40,
          throughputKbps: 10000,
          requestLatencyMs: 40,
          downloadThroughputKbps: 10000,
          uploadThroughputKbps: 5000
        }
      }
    },
    assert: {
      assertMatrix: [
        {
          matchingUrlPattern: '/$',
          assertions: {
            interactive: ['error', { maxNumericValue: 3000 }],
            'speed-index': ['error', { maxNumericValue: 3000 }],
            'total-blocking-time': ['error', { maxNumericValue: 200 }]
          }
        },
        {
          matchingUrlPattern: '/product-3d$',
          assertions: {
            interactive: ['error', { maxNumericValue: 5000 }],
            'speed-index': ['error', { maxNumericValue: 5000 }],
            'total-blocking-time': ['error', { maxNumericValue: 400 }]
          }
        },
        {
          matchingUrlPattern: '/configurator$',
          assertions: {
            interactive: ['error', { maxNumericValue: 4500 }],
            'speed-index': ['error', { maxNumericValue: 4500 }],
            'total-blocking-time': ['error', { maxNumericValue: 350 }]
          }
        },
        {
          matchingUrlPattern: '/ar-viewer$',
          assertions: {
            interactive: ['error', { maxNumericValue: 4500 }],
            'speed-index': ['error', { maxNumericValue: 4500 }],
            'total-blocking-time': ['error', { maxNumericValue: 350 }]
          }
        }
      ]
    },
    upload: {
      target: 'filesystem',
      outputDir: './lhci-desktop'
    }
  }
};
