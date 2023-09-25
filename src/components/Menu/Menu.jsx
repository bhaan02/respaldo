import { AiOutlineHome, AiOutlineSolution } from "react-icons/ai";
import { ImNewspaper } from "react-icons/im";
import { LuFolderCog, LuFolderGit2 } from "react-icons/lu";
import { MdDiversity2, MdFilterDrama, MdGridView, MdOutlineDescription, MdOutlineGroup, MdOutlineNotListedLocation } from "react-icons/md";

import { Link } from 'react-router-dom';
import logo from "../../assest/logo.png";
import "./Menu.css";

const Menu = () => {
    return(
        <>
            <nav className="menu">
                <img className='logo' src={logo} alt="logo"/>
                <ul >
                    <li><Link className='nav-option' to="/"><AiOutlineHome className="icons"/><p>Home</p></Link></li>
                    <li className="subTitle">Community</li>
                    <li><Link className='nav-option' to="/inConstruction"><MdDiversity2 className="icons"/><p>Viva Engage</p></Link></li>
                    <li><Link className='nav-option' to="/inConstruction"><MdOutlineGroup className="icons"/><p>Teams</p></Link></li>
                    <li><Link className='nav-option' to="/inConstruction"><MdFilterDrama className="icons"/><p>OneDrive</p></Link></li>
                    <li className="subTitle">Task</li>
                    <li><Link className='nav-option' to="/Resource"><LuFolderCog className="icons"/><p>Resource Management</p></Link></li>
                    <li><Link className='nav-option' to="/inConstruction"><LuFolderGit2 className="icons"/><p>Task Management</p></Link></li>
                    <li><Link className='nav-option' to="/inConstruction"><MdOutlineDescription className="icons"/><p>Documents</p></Link></li>
                    <li className="subTitle">App</li>
                    <li><Link className='nav-option' to="/inConstruction"><MdGridView className="icons"/><p>Suite Office</p></Link></li>
                    <li className="subTitle">Other</li>
                    <li><Link className='nav-option' to="/inConstruction"><AiOutlineSolution className="icons"/><p>Human Resources</p></Link></li>
                    <li><Link className='nav-option' to="/inConstruction"><ImNewspaper className="icons"/><p>News</p></Link></li>
                    <li><Link className='nav-option' to="/inConstruction"><MdOutlineNotListedLocation className="icons"/><p>Support</p></Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Menu;