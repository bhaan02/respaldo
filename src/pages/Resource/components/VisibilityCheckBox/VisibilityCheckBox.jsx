const VisibilityCheckBox = ({showHiddenResource,setShowHiddenResource}) => {
    return(
        <label>
            <input 
                type="checkbox" 
                value={showHiddenResource}
                onChange={() => setShowHiddenResource(!showHiddenResource)}
                />Show hidden resources</label>
    )

}

export default VisibilityCheckBox;