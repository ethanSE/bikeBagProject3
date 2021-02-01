import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class S3Object {
  readonly bucket: string;
  readonly region: string;
  readonly key: string;
  constructor(init: ModelInit<S3Object>);
}

export declare class Vertex {
  readonly x: number;
  readonly y: number;
  constructor(init: ModelInit<Vertex>);
}

export declare class CustomDesign {
  readonly id: string;
  readonly owner: string;
  readonly image: S3Object;
  readonly scale: number;
  readonly points?: (Vertex | null)[];
  readonly createdAt?: string;
  readonly isOrdered: boolean;
  constructor(init: ModelInit<CustomDesign>);
  static copyOf(source: CustomDesign, mutator: (draft: MutableModel<CustomDesign>) => MutableModel<CustomDesign> | void): CustomDesign;
}