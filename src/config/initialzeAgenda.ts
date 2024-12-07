import { AgendaConfig } from "./agenda";


export async function initializeAgenda() {
    const agenda = AgendaConfig.getInstance();
    await AgendaConfig.start(agenda);
}