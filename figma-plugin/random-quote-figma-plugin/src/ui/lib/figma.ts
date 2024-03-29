import { PluginMessagePayload, Quote } from '../../shared';

export const requestToPlugin = <T>(payload: T) => {
  parent.postMessage({ pluginMessage: payload }, '*');
};

export const requestGenerateRandomQuoteToPlugin = (randomQuote: Quote) => {
  requestToPlugin<PluginMessagePayload>({
    type: 'generateRandomQuote',
    randomQuote,
  });
};
