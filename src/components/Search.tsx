import { getCollection } from "astro:content";
import { create, insertMultiple, search} from "@orama/orama";
import { useState } from "react";


export default function Search(){

    const [result,setResult] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const handleSearch =  async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setResult([]);

        const searchInput = e.currentTarget.elements.search.value;

        const gdr = await getCollection('gdr');

        const db = await create({
            schema : {
                titolo : 'string',
                autorePrincipale : 'string',
                codiceIdentificativo: 'string',
                ambientazione : 'string',
                slug : 'string'
            }
        });

        const dbEntries = gdr.map(
            (item) => {
                return {
                    titolo :item.data.titolo,
                    autorePrincipale : item.data.autorePrincipale,
                    codiceIdentificativo: item.data.codiceIdentificativo,
                    ambientazione : item.data.ambientazione,
                    slug : item.slug
                }
            }
        )

        await insertMultiple(db, dbEntries);

        const searchResult = await search(db,{
            term : searchInput,
            tolerance: 1,
            threshold: 1
        })

        if(searchResult.count > 0){
            setResult(searchResult.hits);
        }
        setShowResult(true);

        console.log(searchResult);
    }


    return(<>   
        <form onSubmit={handleSearch}>   
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" name="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Cerca un gioco di ruolo!" required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
            </div>
        </form>
        <div>
            { showResult && (<>
                <div className="block w-full p-2">
                    <p className="text-sm text-gray-900">Sono presenti {result.length} risultati.</p>
                </div>
            </>)}            
            { result.length > 0 ?
            (<>
                {result.map(
                    (item,index) => {
                        return (
                            <a className="no-underline text-black" href={`/gdr/${item.document.slug}/`} >
                                <div key={index} className="block w-full text-base font-medium mt-2 p-4 border rounded-lg border-gray-300 hover:bg-blue-700 hover:text-white">
                                    <p><b>Titolo</b>: {item.document.titolo}</p>
                                    <p><b>Autore</b>: {item.document.autorePrincipale}</p>
                                    <p><b>Codice Identificativo</b>: {item.document.codiceIdentificativo}</p>
                                </div>
                            </a>
                        )
                    }
                )}
            </>) : ''
        }
        </div>

    </>)
}