import Agenda, { Job } from 'agenda';
import mongoose, { get } from 'mongoose';
import dotenv from 'dotenv';
import { getMessageMetaData, mailerConfig } from './mailerConfig';
import userModel from '../models/userModel';
import WorkflowModel from '../models/workFlowModel';
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

        agenda.define('sendEmail', async (job: Job) => {
            console.log('in here')
            const {emailsToSend , subject , body , workflowId} = job.attrs.data;
            const messageMetadata = await getMessageMetaData(emailsToSend , subject , body);
            
            await mailerConfig.sendMail(messageMetadata , (error, info) => {
                if (error) {
                    console.log(error);
                    console.log(`this was the error`)
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            const workflow = await WorkflowModel.findById(workflowId);
            if(workflow){
            workflow.status = 'completed';
            await workflow.save();
            }
        });

        await agenda.start();
        console.log('Agenda jobs initialized');
    }
}

