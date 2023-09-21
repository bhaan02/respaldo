const ResourceSearcher = ({resourceSearch,setResourceSearch})=> {

    const handleOnChangeSearch = ({target}) => {
        setResourceSearch(target.value)

    }
    return(
        <>
            <input 
            type="search" 
            placeholder="Resource Search"
            value={resourceSearch}
            onChange={handleOnChangeSearch}/>
        </>
    )
}
export default ResourceSearcher;