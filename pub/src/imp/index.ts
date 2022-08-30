
// export * from "./esc/marshall"
// export * from "./esc/createMarshallInterface"
// export * from "./esc/createBuilder"
import * as api from "../interface"
import { createBuilder } from "./createBuilder"
import { createMarshallableDataset } from "./createMarshallableDataset"

// type API = {
//     createDatastoreBuilder: api.CreateDatastoreBuilder
//     createMarshallableDataset: api.CreateMarshallableDataset
//     marshallDataset: api.MarshallDataset
// }

export const $: API = {
    createDatastoreBuilder: createBuilder,
    createMarshallableDataset: createMarshallableDataset,
}