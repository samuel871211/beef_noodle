declare global {
  namespace NodeJS {
    interface ProcessEnv {
      apiKey: string;
      authDomain: string;
      databaseURL: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
      measurementId: string;
    }
  }
}

export {};
