import { useEffect, useState, useCallback, useRef } from 'react';
import api from '../api/client';

export const useAntiCheat = (sessionId, isEnabled = true) => {
  const [events, setEvents] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const eventsRef = useRef([]);

  const logEvent = useCallback(
    async (eventType, details = '') => {
      const newEvent = {
        type: eventType,
        timestamp: new Date().toISOString(),
        details,
      };

      eventsRef.current = [...eventsRef.current, newEvent];
      setEvents(eventsRef.current);

      if (sessionId) {
        try {
          await api.post(`/sessions/${sessionId}/events`, {
            eventType,
            metadata: { details, clientTime: new Date().toISOString() },
          });
        } catch {
          // If backend endpoint is stubbed (501) or offline, log locally
          console.info(`[AntiCheat Event Captured: ${eventType}]`, details);
        }
      }
    },
    [sessionId]
  );

  const enterFullscreen = useCallback(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
    }
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    // Fullscreen monitor
    const handleFullscreenChange = () => {
      const active = !!document.fullscreenElement;
      setIsFullscreen(active);
      if (!active) {
        logEvent('FULLSCREEN_EXIT', 'User exited fullscreen mode');
      }
    };

    // Tab visibility monitor
    const handleVisibilityChange = () => {
      if (document.hidden) {
        logEvent('TAB_SWITCH', 'User navigated away from test window');
      }
    };

    // Window blur monitor
    const handleBlur = () => {
      logEvent('WINDOW_BLUR', 'Focus lost from assessment screen');
    };

    // Copy / paste monitor
    const handleCopyPaste = (e) => {
      if (e.type === 'paste') {
        logEvent('PASTE_ATTEMPT', 'User attempted to paste external text');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('paste', handleCopyPaste);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('paste', handleCopyPaste);
    };
  }, [isEnabled, logEvent]);

  return {
    events,
    violationsCount: events.length,
    isFullscreen,
    enterFullscreen,
    logEvent,
  };
};
