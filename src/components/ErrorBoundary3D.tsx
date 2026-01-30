import React from 'react';

interface State { hasError: boolean }

export default class ErrorBoundary3D extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) {
      return React.createElement('div', { style: { padding: 16 } }, 'Scene failed to load');
    }
    return this.props.children as any;
  }
}
