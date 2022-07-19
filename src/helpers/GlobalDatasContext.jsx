import { createContext, useContext, useReducer } from "react";

const datasContext = createContext(null);
const dispatchContext = createContext(null);

export function useDatasContext () {
    return useContext( datasContext );
}

export function useDispatchContext () {
    return useContext( dispatchContext );
}

export default function GlobalDatasContext ( { children } ) {

    const [ datas, dispatch ] = useReducer( datasReducer, [] );

    return (
        <datasContext.Provider value = {datas}  >
        <dispatchContext.Provider value = { dispatch } >
        { children }
        </dispatchContext.Provider>
        </datasContext.Provider>
    );

}

function datasReducer ( datas, option ) {
    switch ( option.type ) {
        case 'delete': {
            
            const findData = option.data.filter( ( d ) => d.id === option.id );
            const findSlock = datas.filter ( (d) => d.id === findData[0].id )
            if ( findSlock[0].slock > 0 ) {
                const prices = [ ...findData ];
                return datas.map( (d) => {
                    if ( d.id === option.id ) {
                        return { ...d, slock: d.slock--, price: d.price - prices[0].price };
                    } else {
                        return d
                    }
                } )
            } else {
                return datas.filter( ( d ) => d.id !== option.id )
            }
            
            
        } 
        case 'add_to_cart': {

            const findData = option.data.filter( ( d ) => d.id === option.id );
            const findRepeat = datas.filter((d) => d.id === findData[0].id );

            if ( datas.length < 1 ) {
                return [ ...datas, { ...findData[0], slock: 1 } ];
            } else {
                if ( findRepeat.length > 0 ) {
                    const prices = [ ...findData ];
                    return datas.map( d => {
                        if ( d.id === option.id ) {
                            
                            return { ...d, slock: d.slock++, price: d.price + prices[0].price   };
                        } else {
                            return d
                        }
                    } )
                } else {
                    
                    return [ ...datas, { ...findData[0], slock: 1 } ]
                }

            }
        }
        default: {
            throw Error('Unknown options: ' + option.type)
        } 
    }

}