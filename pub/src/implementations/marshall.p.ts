import * as pl from "pareto-core-lib"

// import * as api from "../interface"

// import * as h from "astn-handlers-api"
// import * as th from "astn-typedhandlers-api"

// import * as tc from "astn-tokenconsumer-api"


// import * as parserLib from "astn-parser-lib"
// import * as generic from "./generic"


// export function marshall(
//     $: {
//         dataset: api.IMarshallableDataset,
//         schema: th.Schema,
//         internalSchemaSpecification: api.InternalSchemaSpecification,
//         style: api.SerializationStyle,
//     },
//     $i: {
//         writer: (str: string) => void,
//     },
//     $d: {
//         annotate: api.CreateAnnotater<null>,
//         createTreeParser: apl.CreateTreeParser<null>,
//         createASTNNormalizer: api.CreateASTNNormalizer<null>,
//         serializeSchema: (schema: th.Schema, sendEvent: (event: tc.Token) => void) => void,
//         createSerializedQuotedString: (value: string) => string,
//         joinLines: (lines: string[]) => string,
//     }
// ): void {
//     const newline = "\r\n"
//     const indentationString = "    "

//     function onValueIsNonDefault(
//         value: api.IMarshallableValue,
//         definition: th.ValueDefinition,
//         callback: () => void,
//         //joinLines: (lines: string[]) => string,
//     ): void {
//         switch (definition.type[0]) {
//             case "type reference": {
//                 const $ = definition.type[1]
//                 onValueIsNonDefault(
//                     value,
//                     $.type.get().value,
//                     callback
//                 )
//                 break
//             }
//             case "dictionary": {
//                 value.toDictionary((dict) => {
//                     if (!dict.entries.isEmpty()) {
//                         callback()

//                     }
//                 })
//                 break
//             }
//             case "list": {
//                 value.toList((list) => {
//                     if (!list.elements.isEmpty()) {
//                         callback()
//                     }
//                 })
//                 break
//             }
//             case "tagged union": {
//                 const $ = definition.type[1]
//                 value.toTaggedUnion((tu) => {
//                     if (tu.option !== $["default option"].name) {
//                         callback()
//                     } else {
//                         onValueIsNonDefault(
//                             tu.value,
//                             generic.getUnsafeEntry($.options, tu.option).value,
//                             callback,
//                         )
//                     }
//                 })
//                 break
//             }
//             case "simple string": {
//                 const $ = definition.type[1]
//                 value.toSimpleString((str) => {
//                     if (str !== $["default value"]) {
//                         callback()
//                     }
//                 })
//                 break
//             }
//             case "multiline string": {
//                 value.toMultilineString((lines) => {
//                     if (lines.length > 1) {
//                         callback()
//                     }
//                     if (lines.length === 1 && lines[0] !== "") {
//                         callback()
//                     }
//                 })
//                 break
//             }
//             case "group": {
//                 const $ = definition.type[1]
//                 value.toGroup((group) => {
//                     let foundNonDefault = false
//                     $.properties.forEach(() => false, (p, key) => {
//                         group.onProperty(key, (value) => {
//                             onValueIsNonDefault(
//                                 value,
//                                 p.value,
//                                 () => {
//                                     foundNonDefault = true
//                                 }
//                             )
//                         })
//                     })
//                     if (foundNonDefault) {
//                         callback()
//                     }
//                 })
//                 break
//             }
//             default:
//                 return pl.au(definition.type[0])
//         }
//     }

//     function marshallDataset(
//         definition: th.TypeDefinition,
//         style: api.SerializationStyle,
//         dataset: api.IMarshallableDataset,
//         out: api.SerializeOut,
//     ): void {
//         marshallValue(
//             dataset.root,
//             definition.value,
//             out,
//             style,
//             false,
//         )
//     }

//     function marshallValue(
//         value: api.IMarshallableValue,
//         definition: th.ValueDefinition,
//         out: api.SerializeOut,
//         style: api.SerializationStyle,
//         inMixinMode: boolean,
//     ): void {
//         switch (definition.type[0]) {
//             case "dictionary": {
//                 const $ = definition.type[1]
//                 value.toDictionary((dict) => {
//                     out.sendBlock(
//                         {
//                             open: ["structural", {
//                                 "type": ["open dictionary", null],
//                             }],
//                             close: ["structural", {
//                                 "type": ["close dictionary", null],
//                             }],
//                         },
//                         (out) => {
//                             dict.entries.forEach((entry, key) => {
//                                 out.sendEvent(["simple string", {
//                                     value: key,
//                                     wrapping: ["quote", null],
//                                 }])
//                                 marshallValue(
//                                     entry,
//                                     $.value,
//                                     out,
//                                     style,
//                                     false,
//                                 )
//                             })
//                         },
//                     )
//                 })
//                 break
//             }
//             case "list": {
//                 const $$ = definition.type[1]
//                 value.toList((list) => {
//                     out.sendBlock(
//                         {
//                             open: ["structural", {
//                                 "type": ["open shorthand group", null],
//                             }],
//                             close:
//                                 ["structural", {
//                                     "type": ["close shorthand group", null],
//                                 }],
//                         },
//                         (out) => {
//                             list.elements.forEach((e) => {
//                                 marshallValue(
//                                     e,
//                                     $$.value,
//                                     out,
//                                     style,
//                                     false,
//                                 )
//                             })
//                         },
//                     )
//                 })
//                 break
//             }
//             case "type reference": {
//                 const $ = definition.type[1]
//                 marshallValue(
//                     value,
//                     $.type.get().value,
//                     out,
//                     style,
//                     inMixinMode,
//                 )
//                 break
//             }
//             case "tagged union": {
//                 const $ = definition.type[1]
//                 value.toTaggedUnion((taggedUnion) => {
//                     if (!inMixinMode) {
//                         out.sendEvent(["structural", {
//                             "type": ["tagged union start", null],
//                         }])
//                     }
//                     if (taggedUnion.option !== null) {
//                         out.sendEvent(["simple string", {
//                             value: taggedUnion.option,
//                             wrapping: ["apostrophe", null],
//                         }])
//                         marshallValue(
//                             taggedUnion.value,
//                             $.options.getLookup().getUnsafe(taggedUnion.option).value,
//                             out,
//                             style,
//                             inMixinMode
//                         )
//                     }
//                 })
//                 break
//             }
//             case "simple string": {
//                 const $ = definition.type[1]
//                 value.toSimpleString((str) => {
//                     out.sendEvent(["simple string", {
//                         value: str,
//                         wrapping: $.quoted
//                             ? ["quote", null]
//                             : ["none", null],
//                     }])
//                 })
//                 break
//             }
//             case "multiline string": {
//                 value.toMultilineString((lines) => {
//                     out.sendEvent(["multiline string", {
//                         lines: lines,
//                     }])
//                 })
//                 break
//             }
//             case "group": {
//                 const $ = definition.type[1]
//                 value.toGroup((group) => {
//                     if (inMixinMode) {
//                         $.properties.forEach(() => false, (propDef, key) => {
//                             group.onProperty(key, (prop) => {
//                                 marshallValue(
//                                     prop,
//                                     propDef.value,
//                                     out,
//                                     style,
//                                     true,
//                                 )

//                             })
//                         })
//                     } else {
//                         switch (style[0]) {
//                             case "expanded": {
//                                 const expandedStyle = style[1]
//                                 out.sendBlock(
//                                     {
//                                         open: ["structural", {
//                                             "type": ["open verbose group", null],
//                                         }],
//                                         close: ["structural", {
//                                             "type": ["close verbose group", null],
//                                         }],
//                                     },
//                                     (out) => {
//                                         $.properties.forEach(() => false, (propDef, key) => {
//                                             group.onProperty(key, (prop) => {
//                                                 function serializeProperty() {
//                                                     out.sendEvent(["simple string", {
//                                                         value: key,
//                                                         wrapping: ["apostrophe", null],
//                                                     }])
//                                                     marshallValue(
//                                                         prop,
//                                                         propDef.value,
//                                                         out,
//                                                         style,
//                                                         false,
//                                                     )

//                                                 }
//                                                 if (expandedStyle.omitPropertiesWithDefaultValues) {
//                                                     onValueIsNonDefault(
//                                                         prop,
//                                                         propDef.value,
//                                                         () => {
//                                                             serializeProperty()
//                                                         }
//                                                     )
//                                                 } else {
//                                                     serializeProperty()
//                                                 }

//                                             })
//                                         })
//                                     },
//                                 )
//                                 break
//                             }
//                             case "compact": {
//                                 out.sendBlock(
//                                     {
//                                         open: ["structural", {
//                                             "type": ["open shorthand group", null],
//                                         }],
//                                         close: ["structural", {
//                                             "type": ["close shorthand group", null],
//                                         }],
//                                     },
//                                     (out) => {
//                                         $.properties.forEach(() => false, (propDef, key) => {
//                                             group.onProperty(key, (prop) => {
//                                                 marshallValue(
//                                                     prop,
//                                                     propDef.value,
//                                                     out,
//                                                     style,
//                                                     true,
//                                                 )
//                                             })
//                                         })
//                                     },
//                                 )
//                                 break
//                             }
//                             default:
//                                 pl.au(style[0])
//                         }
//                     }

//                 })
//                 break
//             }
//             default:
//                 pl.au(definition.type[0])
//         }
//     }


//     const writer2: asa.IFormatInstructionWriter<null> = {
//         token: (instruction) => {
//             writer(instruction.stringBefore)
//             writer(instruction.token)
//             writer(instruction.stringAfter)

//         },
//         nonToken: (instruction) => {
//             writer(instruction.string)
//         },
//     }

//     function handleEvent<PAnnotation>(
//         event: tc.Token,
//         annotation: Annotation,
//         parser: tc.ITokenConsumer<PAnnotation>,
//     ): void {
//         parser.onToken({
//             annotation: annotation,
//             token: event,
//         })
//     }

//     switch (internalSchemaSpecification[0]) {
//         case "embedded": {
//             writer(`! ! "astn/schema@0.1" `)
//             const embeddedSchemaParser = createTreeParser({
//                 handler: {
//                     root: annotate(
//                         createASTNNormalizer(
//                             {
//                                 indentationString: indentationString,
//                                 newline: newline,
//                             },
//                             {
//                                 writer: writer2,
//                             },
//                         )
//                     ),
//                     onEnd: () => {

//                     }
//                 },
//             })
//             serializeSchema(
//                 schema,
//                 (event) => {
//                     handleEvent(event, null, embeddedSchemaParser)
//                 },
//             )
//             break
//         }
//         case "none": {
//             break
//         }
//         case "reference": {
//             const $ = internalSchemaSpecification[1]
//             writer(`! ${createSerializedQuotedString($.name)}${newline}`)
//             break
//         }
//         default:
//             pl.au(internalSchemaSpecification[0])
//     }

//     const bodyParser = parserLib.createTreeParser({
//         handler: {
//             root: annotate(
//                 createASTNNormalizer(
//                     {
//                         indentationString: indentationString,
//                         newline: newline,
//                     },
//                     {
//                         writer: writer2,
//                     },
//                 )
//             ),
//             onEnd: () => { }
//         },
//     })

//     function createOut(): api.SerializeOut {
//         function he(event: tc.Token) {
//             handleEvent(event, null, bodyParser)
//         }
//         return {
//             sendBlock: (eventpair, callback) => {
//                 he(eventpair.open)
//                 callback(createOut())
//                 he(eventpair.close)
//             },
//             sendEvent: (event) => {
//                 he(event)
//             },
//         }
//     }
//     marshallDataset(
//         schema["root type"].get(),
//         style,
//         dataset,
//         createOut(),
//     )
// }
