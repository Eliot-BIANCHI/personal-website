import LOCAL_STORAGE from "$lib/storages/local.json";

class App {
  assistant: boolean = $state(
    localStorage.getItem(LOCAL_STORAGE.SETTINGS.ASSISTANT) === "true" || false,
  );

  toggleAssistant() {
    this.assistant = !this.assistant;
    localStorage.setItem(
      LOCAL_STORAGE.SETTINGS.ASSISTANT,
      this.assistant.toString(),
    );
  }
}

export const app = new App();
