
import * as pl from "pareto-core-lib"
import * as pt from "pareto-core-types"
import * as pc from "pareto-core-candidates"
import * as api from "../interface"
import * as generic from "./generic"

export function createMarshallableDataset(
    ds: api.Datastore
): api.IMarshallableDataset {
    function createValueSerializeInterface(value: api.Value): api.IMarshallableValue {
        return {
            toDictionary: (callback) => {
                if (value.type === null || value.type[0] !== "dictionary") {
                    throw pc.panic("Unexpected: missing or invalid dictionary")
                }
                const dict = value.type[1]
                callback({
                    entries: {
                        forEach: (callback2) => {
                            dict.forEach(() => false, ($, key) => {
                                callback2(createValueSerializeInterface($), key)
                            })
                        },
                        isEmpty: () => generic.dictionaryIsEmpty(pl.createDictionary(dict)),
                    },
                })
            },
            toGroup: (callback) => {
                if (value.type === null || value.type[0] !== "group") {
                    pc.panic("Unexpected: missing or invalid group")
                }
                const group = value.type[1]
                callback({
                    onProperty: (key, callback2) => {
                        const property = generic.getEntry(group, key)
                        if (property !== null) {
                            callback2(createValueSerializeInterface(property))
                        }

                    },
                })
            },
            toList: (callback) => {
                if (value.type === null || value.type[0] !== "list") {
                    pc.panic("Unexpected: missing or invalid list")
                }
                const list = value.type[1]
                callback({
                    elements: {
                        forEach: (callback2) => {
                            list.forEach((e) => {
                                callback2(createValueSerializeInterface(e))
                            })
                        },
                        isEmpty: () => generic.listIsEmpty(list),

                    },
                })
            },
            toMultilineString: (callback) => {
                if (value.type === null || value.type[0] !== "multiline string") {
                    pc.panic("Unexpected: missing or invalid multiline string")
                }
                callback(value.type[1])
            },
            toSimpleString: (callback) => {
                if (value.type === null || value.type[0] !== "simple string") {
                    pc.panic("Unexpected: missing or invalid simple string")
                }
                callback(value.type[1])
            },
            toTaggedUnion: (callback) => {
                if (value.type === null || value.type[0] !== "tagged union") {
                    pc.panic("Unexpected: missing or invalid tagged union")
                }
                const tu = value.type[1]
                if (tu.option !== null) {
                    callback({
                        option: tu.option,
                        value: createValueSerializeInterface(tu.value),
                    })

                }
            },
        }
    }

    return {
        root: createValueSerializeInterface(ds.root),
    }
}