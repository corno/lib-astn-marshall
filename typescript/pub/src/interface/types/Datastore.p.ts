import * as pt from 'pareto-core-types'

export type Group = pt.Dictionary<Value>

export type Dictionary = pt.Dictionary<Value>

export type TaggedUnion = {
    option: null | string
    value: Value
}

export type List = pt.Array<Value>

export type Value = {
    type:
    | null
    | ["dictionary", Dictionary]
    | ["list", List]
    | ["tagged union", TaggedUnion]
    | ["simple string", string]
    | ["multiline string", string[]]
    | ["group", Group]
}

export type Datastore = {
    root: Value
}