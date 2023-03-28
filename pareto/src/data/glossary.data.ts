import * as pd from 'pareto-core-data'

import {
    array, computed, dictionary, group, member, ref, string, type, typeReference
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import * as g_glossary from "lib-pareto-typescript-project/dist/submodules/glossary"

const d = pd.d

export const $: g_glossary.T.Glossary<pd.SourceLocation> = {
    'parameters': d({}),
    'imports': d({}),
    'root': {
        'namespaces': d({}),
        'types': d({
            "MarshallableValue": type(group({
                "dictionary": member(computed(dictionary(ref(typeReference("MarshallableValue"))))),
                "group": member(computed(array(group({
                    "key": member(string()),
                    "value": member(ref(typeReference("MarshallableValue"))),
                })))),
                "list": member(computed(array(ref(typeReference("MarshallableValue"))))),
                "taggedUnion": member(computed(array(group({
                    "option": member(string()),
                    "value": member(ref(typeReference("MarshallableValue"))),
                })))),
                "simpleString": member(computed(string())),
                "multilineString": member(computed(array(string()))),
            })),
        }),
    },
    'asynchronous': {
        'interfaces': d({}),
        'algorithms': d({}),
    },
    'synchronous': {
        'interfaces': d({}),
        'algorithms': d({}),
    },
}