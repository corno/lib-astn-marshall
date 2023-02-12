import * as pt from 'pareto-core-types'


export namespace T {
    
    export namespace MarshallableValue {
        
        export namespace dictionary {
            
            export namespace C {
                
                export type D = T.MarshallableValue
            }
            
            export type C = pt.Dictionary<T.MarshallableValue>
        }
        
        export type dictionary = () => pt.Dictionary<T.MarshallableValue>
        
        export namespace group {
            
            export namespace C {
                
                export namespace A {
                    
                    export type key = string
                    
                    export type value = T.MarshallableValue
                }
                
                export type A = {
                    readonly 'key': string
                    readonly 'value': T.MarshallableValue
                }
            }
            
            export type C = pt.Array<{
                readonly 'key': string
                readonly 'value': T.MarshallableValue
            }>
        }
        
        export type group = () => pt.Array<{
            readonly 'key': string
            readonly 'value': T.MarshallableValue
        }>
        
        export namespace list {
            
            export namespace C {
                
                export type A = T.MarshallableValue
            }
            
            export type C = pt.Array<T.MarshallableValue>
        }
        
        export type list = () => pt.Array<T.MarshallableValue>
        
        export namespace multilineString {
            
            export namespace C {
                
                export type A = string
            }
            
            export type C = pt.Array<string>
        }
        
        export type multilineString = () => pt.Array<string>
        
        export namespace simpleString {
            
            export type C = string
        }
        
        export type simpleString = () => string
        
        export namespace taggedUnion {
            
            export namespace C {
                
                export namespace A {
                    
                    export type option = string
                    
                    export type value = T.MarshallableValue
                }
                
                export type A = {
                    readonly 'option': string
                    readonly 'value': T.MarshallableValue
                }
            }
            
            export type C = pt.Array<{
                readonly 'option': string
                readonly 'value': T.MarshallableValue
            }>
        }
        
        export type taggedUnion = () => pt.Array<{
            readonly 'option': string
            readonly 'value': T.MarshallableValue
        }>
    }
    
    export type MarshallableValue = {
        readonly 'dictionary': () => pt.Dictionary<T.MarshallableValue>
        readonly 'group': () => pt.Array<{
            readonly 'key': string
            readonly 'value': T.MarshallableValue
        }>
        readonly 'list': () => pt.Array<T.MarshallableValue>
        readonly 'multilineString': () => pt.Array<string>
        readonly 'simpleString': () => string
        readonly 'taggedUnion': () => pt.Array<{
            readonly 'option': string
            readonly 'value': T.MarshallableValue
        }>
    }
}