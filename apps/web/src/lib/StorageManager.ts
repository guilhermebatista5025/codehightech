export class StorageManager {
  private static isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  static save(key: string, data: any): void {
    if (!this.isBrowser()) return;
    try {
      const serialized = JSON.stringify(data);
      window.localStorage.setItem(key, serialized);
    } catch (e) {
      console.error(`Error saving to localStorage (key: ${key}):`, e);
    }
  }

  static load(key: string): any | null {
    if (!this.isBrowser()) return null;
    try {
      const serialized = window.localStorage.getItem(key);
      if (!serialized) return null;
      return JSON.parse(serialized);
    } catch (e) {
      console.error(`Error loading from localStorage (key: ${key}):`, e);
      return null;
    }
  }

  static delete(key: string): void {
    if (!this.isBrowser()) return;
    window.localStorage.removeItem(key);
  }

  static clear(): void {
    if (!this.isBrowser()) return;
    window.localStorage.clear();
  }

  /**
   * Future implementation: Sync local changes with the Backend/DB.
   */
  static async sync(): Promise<void> {
    if (!this.isBrowser()) return;
    console.log('Syncing data with backend... (mock)');
  }
}
