import { useState } from "react";
import { BsBell } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import "./NavBar.css";

const NavBar = ({setUser}) => {

    const [showMenu, setShowMenu] = useState(false)

    const handleDropdownMenu = () =>{
        if (showMenu === false){
            setShowMenu(true)
        }else{
            setShowMenu(false)
        }

    }
    
    const logOut = () => {
        setUser(null)

    }

    const userRaw = JSON.parse(sessionStorage.getItem("user"))

    const renderMenu = () => {
        return (<DropdownMenu showMenu={showMenu}>
                <button className="logOut" onClick={logOut}><TbLogout className="icono"/> Log Out</button>
        </DropdownMenu>
        )
    }
    return (
        <>
            {renderMenu()}
            <nav className="navBar">
                <div className='searchBar'>
                    <FaSearch className='icono' />
                    <form>
                        <input className="inputSearch" type='text' placeholder=' Buscar...' />
                    </form>
                </div>
                <div className="conteinerIcono">
                    <div className='conteinerNotification'>
                        <BsBell className='notification'/>
                        <span></span>
                    </div>
                    <div className='conteinerUser'>
                        <button onClick={handleDropdownMenu}>{(userRaw.name.givenName[0]+userRaw.name.familyName[0]).toUpperCase()}</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;