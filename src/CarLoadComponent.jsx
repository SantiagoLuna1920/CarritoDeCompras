import { useDatasContext} from "./helpers/GlobalDatasContext";

export function CarLoadComponent ({deleteArticleCart}) {
    const datas = useDatasContext();
    
    let reduce = datas.reduce((acumulador, actual) => acumulador + actual.price, 0);
   
    return (
        <div>
            <h3>Car load component</h3>
            <ul>
                {
                    datas.map( ( d ) => (
                        <li key={d.id} > <b>Name article: </b> {d.name}, <b>Cantidad: </b> { d.slock }, <b>Total: </b> ${ d.price } <button onClick={ ( ) => {
                            deleteArticleCart( d.id )
                        } }>Delete</button>   </li>
                        
                    ) )
                }
            </ul>
            {
                datas.length > 0 && <h2>Total Articles: ${ reduce } </h2>
            }
        </div>
    );
}

