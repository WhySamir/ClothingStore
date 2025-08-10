export {};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: any) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            context?: string;
            prompt_parent_id?: string;
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}
