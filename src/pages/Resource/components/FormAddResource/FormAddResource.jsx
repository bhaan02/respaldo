const FormAddResource = ({newResource, setNewResource, handleAddResource}) =>{

    return(
        <>
            <div className="new-resource">
                <h3>Add new Resource:</h3>
                <div>
                    <label>Resource:</label>
                    <input
                        type="text"
                        value={newResource}
                        onChange={(e) => setNewResource(e.target.value)} 
                    />
                </div>
                <button onClick={handleAddResource}>Add Resource</button>
            </div>
        </>
    )
}

export default FormAddResource;