import { useState } from "react";
import { CarLoadComponent } from "./CarLoadComponent";
import { useDispatchContext } from "./helpers/GlobalDatasContext";

let nextId = 0;

export function AddComponent () {
    
    const [ addData, useAddData ] = useState({  });
    const [ dataAlm, useDataAlm ] = useState([]);
    const dispatch = useDispatchContext();

    function addArticle ( e ) {
        e.preventDefault();
        useDataAlm( [ ...dataAlm,{...addData, id: nextId++, slock: 1}] );
        useAddData({name: "", price: ""});
    }

    function addToCart ( id ) {
        dispatch({
            type: 'add_to_cart',
            data: dataAlm,
            id: id,
            
        })
    }

    function deleteArticleCart ( id ) {
        dispatch({
            type: 'delete', 
            id: id,
            data: dataAlm,
        })
    }

    return (
        <>
        <div>
            <form onSubmit={addArticle}>
                <input type="text" value={addData.name}  placeholder="Add article" onChange={ ( e ) => {
                    useAddData( { ...addData, name: e.target.value } );
                }} required/>
                <input value={ addData.price } placeholder="Price" required type="number" onChange={ ( e ) => {
                    useAddData( { ...addData, price: Number(e.target.value) } );
                }} />
                <button>
                    send article
                </button>
            </form>
        </div>
        <div>
        <h2>Article component</h2>
        <ul>
            {
                dataAlm.map( (d) => (
                    <li key={d.id}>{d.name} ${d.price} <button onClick={()=> addToCart(d.id)} >Add to cart</button></li>
                ) )
            }
            </ul>
        </div>
        <CarLoadComponent deleteArticleCart={deleteArticleCart} />
        </>
    )
};