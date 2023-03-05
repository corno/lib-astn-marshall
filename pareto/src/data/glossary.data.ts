import * as pd from 'pareto-core-data'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data, interfaceReference, inf, computed, type
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as mglossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: mglossary.T.Glossary<string> = {
    'parameters': d({}),
    'types': d({
        "MarshallableValue": type( group({
            "dictionary": member(computed(dictionary(reference("MarshallableValue")))),
            "group": member(computed(array(group({
                "key": member(string()),
                "value": member(reference("MarshallableValue")),
            })))),
            "list": member(computed(array(reference("MarshallableValue")))),
            "taggedUnion": member(computed(array(group({
                "option": member(string()),
                "value": member(reference("MarshallableValue")),
            })))),
            "simpleString": member(computed(string())),
            "multilineString": member(computed(array(string()))),
        })),
    }),
    'builders': d({}),
    'interfaces': d({
    }),
    'functions': d({
    }),
}