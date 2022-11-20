import * as pt from "pareto-core-types"
// import * as pc from "pareto-core-candidates"

// import { ITypedValueHandler, PropertyDefinition } from "astn-typedhandlers-api"
// import { Datastore, Dictionary, TaggedUnion, Group, Value } from "../interface"

// export function createBuilder<PAnnotation>(
//     ds: Datastore,
// ): ITypedValueHandler<PAnnotation> {
//     function buildValue(
//         value: Value,
//     ): ITypedValueHandler<PAnnotation> {
//         return {
//             onDictionary: () => {
//                 const dictBuilder = pc.createDictionaryBuilder<Value>()
//                 return {
//                     onClose: () => {
//                         value.type = ["dictionary", dictBuilder.toDictionary()]
//                      },
//                     onEntry: ($) => {
//                         const entry: Value = { type: null }
//                         dictBuilder.add($.token.token.value, entry)
//                         return buildValue(
//                             entry,
//                         )
//                     },
//                 }
//             },
//             onList: () => {
//                 const listBuilder = pc.createArrayBuilder<Value>()
//                 return {
//                     onClose: () => { 
//                         value.type = ["list", listBuilder.toArray()]

//                     },
//                     onElement: () => {
//                         const element: Value = { type: null }
//                         listBuilder.push(element)
//                         return buildValue(
//                             element,
//                         )
//                     },
//                 }
//             },
//             onTaggedUnion: ($) => {
//                 const taggedUnion: TaggedUnion = {
//                     option: null,
//                     value: { type: null },
//                 }
//                 value.type = ["tagged union", taggedUnion]
//                 return {
//                     onUnexpectedOption: () => {
//                         taggedUnion.option = $.definition["default option"].name
//                         return buildValue(
//                             taggedUnion.value,
//                         )
//                     },
//                     onOption: ($$) => {
//                         taggedUnion.option = $$.name
//                         return buildValue(
//                             taggedUnion.value,
//                         )
//                     },
//                     onEnd: () => { },
//                 }
//             },
//             onSimpleString: ($) => {
//                 value.type = ["simple string", $.value]
//             },
//             onMultilineString: ($) => {
//                 value.type = ["multiline string", $.token === null ? [] : $.token.token.lines]
//             },
//             onTypeReference: () => {
//                 return buildValue(
//                     value,
//                 )
//             },
//             onGroup: () => {
//                 const groupBuilder = pc.createDictionaryBuilder<Value>()
//                 return {
//                     onUnexpectedProperty: () => { },
//                     onProperty: ($) => {
//                         const property: Value = { type: null }
//                         groupBuilder.add($.key, property)
//                         return buildValue(
//                             property,
//                         )
//                     },
//                     onClose: () => {
//                         value.type = ["group", groupBuilder.toDictionary()]

//                      },
//                 }
//             },
//         }
//     }
//     return buildValue(
//         ds.root,
//     )
// }
