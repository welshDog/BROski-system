import React from 'react';
export default class ErrorBoundary3D extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() { return { hasError: true }; }
    componentDidCatch() { }
    render() {
        if (this.state.hasError) {
            return React.createElement('div', { style: { padding: 16 } }, 'Scene failed to load');
        }
        return this.props.children;
    }
}
