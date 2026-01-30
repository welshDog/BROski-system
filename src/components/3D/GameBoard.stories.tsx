import type { Meta, StoryObj } from '@storybook/react';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GameBoard from './GameBoard';
import { useGameStore } from '@/stores/gameStore';

const meta: Meta<typeof GameBoard> = {
  title: '3D/GameBoard',
  component: GameBoard,
  argTypes: {
    autoRotate: { control: 'boolean' },
    autoRotateSpeed: { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
    ambientIntensity: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
    pointIntensity: { control: { type: 'range', min: 0, max: 2, step: 0.1 } },
    viewportHeight: { control: { type: 'number', min: 300, max: 900 } },
  }
};

export default meta;
type Story = StoryObj<typeof GameBoard>;

function CanvasProvider({ children, args }: any) {
  const { autoRotate = true, autoRotateSpeed = 2, ambientIntensity = 0.8, pointIntensity = 1, viewportHeight = 500 } = args;
  return (
    <div style={{ width: '100%', height: viewportHeight }}>
      <Canvas camera={{ position: [0, 20, 20], fov: 45 }}>
        <ambientLight intensity={ambientIntensity} />
        <pointLight position={[10, 20, 10]} intensity={pointIntensity} />
        <pointLight position={[-10, 20, -10]} intensity={pointIntensity * 0.5} />
        <Suspense fallback={null}>
          {children}
        </Suspense>
        <OrbitControls autoRotate={autoRotate} autoRotateSpeed={autoRotateSpeed} enableZoom enablePan />
      </Canvas>
    </div>
  );
}

export const Default: Story = {
  args: { autoRotate: true, autoRotateSpeed: 2, ambientIntensity: 0.8, pointIntensity: 1, viewportHeight: 500 },
  render: (args) => (
    <CanvasProvider args={args}>
      <GameBoard />
    </CanvasProvider>
  )
};

export const HoverAndClick: Story = {
  args: { autoRotate: false, autoRotateSpeed: 0, ambientIntensity: 1, pointIntensity: 1.2, viewportHeight: 500 },
  render: (args) => (
    <CanvasProvider args={args}>
      <GameBoard />
    </CanvasProvider>
  )
};

export const MoveAvatar: Story = {
  args: { autoRotate: false, ambientIntensity: 0.7, pointIntensity: 1, viewportHeight: 500 },
  decorators: [
    (Story, ctx) => {
      useGameStore.setState({ position: 0 });
      let step = 0;
      const interval = setInterval(() => {
        step += 1;
        useGameStore.getState().moveAvatar(1);
        if (step > 10) clearInterval(interval);
      }, 800);
      return <Story />;
    }
  ],
  render: (args) => (
    <CanvasProvider args={args}>
      <GameBoard />
    </CanvasProvider>
  )
};

export const ErrorBoundaryCase: Story = {
  args: { autoRotate: false, ambientIntensity: 0.5, pointIntensity: 0.5, viewportHeight: 400 },
  render: (args) => (
    <CanvasProvider args={args}>
      {/* Intentionally render invalid element to simulate error */}
      {/* @ts-expect-error */}
      <nonexistent />
    </CanvasProvider>
  )
};
