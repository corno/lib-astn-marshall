import * as pt from 'pareto-core-types'
// import * as th from "astn-typedhandlers-api"
// import * as tc from "astn-tokenconsumer-api"
// import { IMarshallableDataset } from "./interfaces/IMarshallableDataset"

// import { Datastore } from "./types/Datastore"
// import { SerializationStyle } from "./types/SerializationStyle"

// export type CreateDatastoreBuilder = <PAnnotation>(
//     ds: Datastore,
// ) => th.ITypedValueHandler<PAnnotation>

// export type CreateMarshallableDataset = (
//     ds: Datastore
// ) => IMarshallableDataset


// interface IOut<LeafEvent, BlockEvent> {
//     sendEvent(event: LeafEvent): void
//     sendBlock(
//         event: BlockEvent,
//         callback: (out: IOut<LeafEvent, BlockEvent>) => void,
//     ): void
// }

// export type SerializeOut = IOut<tc.Token, {
//     open: tc.Token
//     close: tc.Token
// }>

// export type MarshallDataset = (
//     definition: th.TypeDefinition,
//     style: SerializationStyle,
//     dataset: IMarshallableDataset,
//     out: SerializeOut,
// ) => void