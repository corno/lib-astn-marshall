import * as pr from 'pareto-core-raw'

import {
    null_,
    array,
    string,
    reference,
    boolean,
    typeReference,
    dictionary, group, member, taggedUnion, types, func, data, interfaceReference, inf, method, computed
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands.p"

import * as mglossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pr.wrapRawDictionary

export const $: mglossary.TGlossary = {
    'imports': d({
    }),
    'parameters': d({}),
    'templates': d({}),
    'types': types({
        "MarschallableValue": group({
            "dictionary": member(computed(dictionary(reference("MarshallableValue")))),
            "group": member(computed(array(group({
                "key": member(string()),
                "value": member(reference("MarshallableValue"))
            })))),
            "list": member(computed(array(reference("MarshallableValue")))),
            "taggedUnion": member(computed(array(group({
                "option": member(string()),
                "value": member(reference("MarshallableValue"))
            })))),
            "simpleString": member(computed(string())),
            "multilineString": member(computed(array(string()))),
        }),
    }),
    'interfaces': d({
    }),
    'functions': d({
    }),
}