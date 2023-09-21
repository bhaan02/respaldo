
const SelecetedExtendHours = ({hours,optionSelected,setOptionSelected,selectedCell,handleExtendHours}) => {
    const {column} = selectedCell
    return(
        <>
            <select name="Hours"
            value={optionSelected}
            onChange={(e)=> setOptionSelected(e.target.value)}>
                {hours.slice(column,41).map((hour,index) => <option key={index} value={index}>{hour}</option>)}

            </select>
            <button onClick={handleExtendHours}>Extender Horas</button>
        </>
    )
}

export default SelecetedExtendHours;