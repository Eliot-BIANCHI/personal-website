import { ROUTES } from "../navigation/routes.js";

//@ts-ignore
const recognition = new SpeechRecognition();
recognition.lang = "fr";
recognition.continuous = true;
recognition.interimResults = true;

let listening = false;

recognition.onresult = (event: any) => {
  let interim = "";
  let final = "";

  for (let i = event.resultIndex; i < event.results.length; i++) {
    const result = event.results[i];
    if (result.isFinal) {
      final += result[0].transcript;
    } else {
      interim += result[0].transcript;
    }
  }

  if (final) {
    handleCommand(final.toLowerCase());
  }
};

recognition.onend = () => {
  if (listening) recognition.start();
};

function handleCommand(command: string) {
  if (command.includes("page")) goTo(command);

  const app = document.querySelector("my-app");
  if (app === null) return;

  if (command.includes("jour")) app.changeTheme(false);
  if (command.includes("nuit")) app.changeTheme(true);
}

function goTo(page: string) {
  const route = ROUTES.find((route) => page.includes(route.hiddenName));
  if (route === undefined) return;

  const newHash = "#" + route.path;

  if (location.hash !== newHash) location.hash = newHash;
}

export function startAssistant() {
  listening = true;
  recognition.start();
}

export function stopAssistant() {
  listening = false;
  recognition.stop();
}
