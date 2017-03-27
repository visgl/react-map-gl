import {window} from './globals';

// Try to get access token from URL, env, local storage or config
export function getAccessToken() {
  let accessToken = null;

  if (window.location) {
    const match = window.location.search.match(/access_token=([^&\/]*)/);
    accessToken = match && match[1];
  }

  if (!accessToken) {
    // Note: This depends on the bundler (e.g. webpack) inmporting environment correctly
    accessToken =
      process.env.MapboxAccessToken || process.env.MAPBOX_ACCESS_TOKEN; // eslint-disable-line
  }

  return accessToken || null;
}
