import "./DropdownMenu.css";

const DropdownMenu = ({showMenu,children}) => {
    return showMenu && (
        <div className="menu-overlay">
            <div className="dropdownmenu">
                {
                    children
                }
                
            </div>
        </div>
    )


}
export default DropdownMenu;