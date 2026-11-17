import { Toaster } from '@/components/molecules';
import { HeroUIProvider } from '@heroui/system';
import { MotionConfig } from 'motion/react';

import Providers from '@/providers';

function App() {
  return (
    <HeroUIProvider>
      <MotionConfig reducedMotion="user">
        <Providers />
        <Toaster />
      </MotionConfig>
    </HeroUIProvider>
  );
}

export default App;
