// ============================================
// Telegram WebApp SDK Wrapper
// ============================================

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
    };
  };
  colorScheme: 'light' | 'dark';
  themeParams: Record<string, string>;
  isExpanded: boolean;
  expand: () => void;
  close: () => void;
  ready: () => void;
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
}

class TelegramSDK {
  private get webapp(): TelegramWebApp | null {
    return window.Telegram?.WebApp ?? null;
  }

  get isAvailable(): boolean {
    return !!this.webapp;
  }

  get colorScheme(): 'light' | 'dark' {
    return this.webapp?.colorScheme ?? 'dark';
  }

  get user() {
    return this.webapp?.initDataUnsafe?.user ?? null;
  }

  init() {
    if (this.webapp) {
      this.webapp.ready();
      this.webapp.expand();
    }
  }

  haptic(type: 'light' | 'medium' | 'heavy' = 'light') {
    this.webapp?.HapticFeedback?.impactOccurred(type);
  }

  hapticSuccess() {
    this.webapp?.HapticFeedback?.notificationOccurred('success');
  }

  hapticSelection() {
    this.webapp?.HapticFeedback?.selectionChanged();
  }

  onEvent(eventType: 'themeChanged' | 'viewportChanged' | 'mainButtonClicked' | 'backButtonClicked', cb: () => void) {
    if (this.webapp) {
      (this.webapp as any).onEvent(eventType, cb);
    }
  }

  offEvent(eventType: 'themeChanged' | 'viewportChanged' | 'mainButtonClicked' | 'backButtonClicked', cb: () => void) {
    if (this.webapp) {
      (this.webapp as any).offEvent(eventType, cb);
    }
  }
}

export const telegram = new TelegramSDK();
