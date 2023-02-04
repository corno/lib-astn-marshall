import * as pt from 'pareto-core-types'


export namespace GMarshallableValue {
    
    export namespace Pdictionary {
        
        export namespace C {}
        export type C = pt.Dictionary<UMarshallableValue>
    }
    export type Pdictionary = () => Pdictionary.C
    
    export namespace Pgroup {
        
        export namespace C {
            
            export namespace A {}
            export type A = {
                readonly 'key': string
                readonly 'value': UMarshallableValue
            }
        }
        export type C = pt.Array<C.A>
    }
    export type Pgroup = () => Pgroup.C
    
    export namespace Plist {
        
        export namespace C {}
        export type C = pt.Array<UMarshallableValue>
    }
    export type Plist = () => Plist.C
    
    export namespace PmultilineString {
        
        export namespace C {}
        export type C = pt.Array<string>
    }
    export type PmultilineString = () => PmultilineString.C
    
    export namespace PsimpleString {}
    export type PsimpleString = () => string
    
    export namespace PtaggedUnion {
        
        export namespace C {
            
            export namespace A {}
            export type A = {
                readonly 'option': string
                readonly 'value': UMarshallableValue
            }
        }
        export type C = pt.Array<C.A>
    }
    export type PtaggedUnion = () => PtaggedUnion.C
}
export type GMarshallableValue = {
    readonly 'dictionary': GMarshallableValue.Pdictionary
    readonly 'group': GMarshallableValue.Pgroup
    readonly 'list': GMarshallableValue.Plist
    readonly 'multilineString': GMarshallableValue.PmultilineString
    readonly 'simpleString': GMarshallableValue.PsimpleString
    readonly 'taggedUnion': GMarshallableValue.PtaggedUnion
}
export type UMarshallableValue = GMarshallableValue