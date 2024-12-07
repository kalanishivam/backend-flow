import Agenda from 'agenda';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// A singleton pattern created so that multiple instances of Agenda cannot be created
export class AgendaConfig {
    private static instance: Agenda;

    public static getInstance(): Agenda {
        if (!this.instance) {
            this.instance = new Agenda({
                db:{address : process.env.MONGO_URI ?? '' , collection : 'agendaJobs'},
            });
        }
        return this.instance;
    }

    public static async start(agenda: Agenda) {
        await agenda.start();
        console.log('Agenda jobs initialized');
    }
}

