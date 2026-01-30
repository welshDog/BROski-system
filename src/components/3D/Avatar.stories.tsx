import type { Meta, StoryObj } from '@storybook/react';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from './Avatar';

interface StoryArgs {
  boardPosition: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  ambientIntensity?: number;
  viewportHeight?: number;
}

const meta: Meta<StoryArgs> = {
  title: '3D/Avatar',
  component: Avatar,
  argTypes: {
    boardPosition: { control: { type: 'range', min: 0, max: 49, step: 1 } },
    autoRotate: { control: 'boolean' },
    autoRotateSpeed: { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
    ambientIntensity: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
    viewportHeight: { control: { type: 'number', min: 300, max: 900 } }
  }
};

export default meta;
type Story = StoryObj<StoryArgs>;

function CanvasProvider({ children, args }: any) {
  const { autoRotate = true, autoRotateSpeed = 2, ambientIntensity = 0.8, viewportHeight = 500 } = args;
  return (
    <div style={{ width: '100%', height: viewportHeight }}>
      <Canvas camera={{ position: [0, 20, 20], fov: 45 }}>
        <ambientLight intensity={ambientIntensity} />
        <Suspense fallback={null}>{children}</Suspense>
        <OrbitControls autoRotate={autoRotate} autoRotateSpeed={autoRotateSpeed} enableZoom enablePan />
      </Canvas>
    </div>
  );
}

export const Default: Story = {
  args: { boardPosition: 0, autoRotate: true, autoRotateSpeed: 2, ambientIntensity: 0.8, viewportHeight: 500 },
  render: (args) => (
    <CanvasProvider args={args}>
      <Avatar boardPosition={args.boardPosition} />
    </CanvasProvider>
  )
};

export const Animate: Story = {
  args: { boardPosition: 0, autoRotate: false, ambientIntensity: 1, viewportHeight: 500 },
  render: (args) => (
    <CanvasProvider args={args}>
      <Avatar boardPosition={args.boardPosition} />
    </CanvasProvider>
  )
};

export const ErrorBoundaryCase: Story = {
  args: { boardPosition: 0, autoRotate: false, ambientIntensity: 0.5, viewportHeight: 400 },
  render: (args) => (
    <CanvasProvider args={args}>
      {/* @ts-expect-error */}
      <invalid />
    </CanvasProvider>
  )
};
