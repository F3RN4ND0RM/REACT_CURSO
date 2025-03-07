import { useState } from "react";
import { AddCategory } from "./components/AddCategory"
import { GifGrid } from "./components/GifGrid";

export const SearchApp = () => {
    const [ categories, setCategories ] = useState([ 'star wars' ]);
    const onAddCategory = ( newCategory ) => {
        if ( categories.includes(newCategory) ) return;
        setCategories([ newCategory, ...categories ]);
    }
    return(
        <>
        <div className="w-100 d-flex flex-column justify-content-center mt-5">
            
            <div  className="bg-dark p-4">
                <h1 className="text-white">GifExpertApp</h1>
            </div>            
            <AddCategory onNewCategory={ (value) => onAddCategory(value) }/>
            {
                categories.map( (category) => (
                <GifGrid key={category} category={category}/>
                ))
            }
        </div>
        </>
    )
}