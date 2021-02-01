// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { CustomDesign, S3Object, Vertex } = initSchema(schema);

export {
  CustomDesign,
  S3Object,
  Vertex
};