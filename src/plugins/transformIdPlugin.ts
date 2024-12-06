import { Schema } from 'mongoose';

export const transformIdPlugin = (schema: Schema): void => {
  schema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  });
  
  schema.set('toObject', {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    }
  });
};