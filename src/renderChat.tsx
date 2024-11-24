import { ThemeProvider } from '@emotion/react';
import { createRoot } from 'react-dom/client';
import Chat from './components/Chat';
import TockContext from './TockContext';
import TockTheme from './styles/theme';
import defaultTheme from './styles/defaultTheme';
import TockOptions from './TockOptions';
import { default as createTheme } from './styles/createTheme';
import { TockOptionalSettings } from './settings/TockSettings';

export const renderChat: (
  container: HTMLElement,
  endpoint: string,
  referralParameter: string,
  theme: TockTheme,
  options: TockOptions,
) => void = (
  container: HTMLElement,
  endpoint: string,
  referralParameter?: string,
  theme: TockTheme = defaultTheme,
  {
    locale,
    localStorage = {},
    renderers,
    network = {},
    ...options
  }: TockOptions = {},
): void => {
  // Fix for invalid localStorage boolean check
  if (typeof localStorage !== 'object' || localStorage === null) {
    throw new Error('localStorage must be an object or valid configuration.');
  }

  // Handle localStorageHistory.enable
  if (options.localStorageHistory?.enable) {
    localStorage.enableMessageHistory = true;
  }

  // Set max message count from localStorageHistory settings
  if (options.localStorageHistory?.maxNumberMessages) {
    localStorage.maxMessageCount = options.localStorageHistory.maxNumberMessages;
  }

  // Handle network settings
  if (options.disableSse) {
    network.disableSse = true;
  }
  if (options.extraHeadersProvider) {
    network.extraHeadersProvider = options.extraHeadersProvider;
  }

  // Prepare settings for TockContext
  const settings: TockOptionalSettings = {
    locale,
    localStorage,
    network,
    renderers,
  };

  // Render the Chat component with the provided settings and theme
  createRoot(container).render(
    <ThemeProvider theme={createTheme(theme)}>
      <TockContext endpoint={endpoint} settings={settings}>
        <Chat referralParameter={referralParameter} {...options} />
      </TockContext>
    </ThemeProvider>,
  );
};
