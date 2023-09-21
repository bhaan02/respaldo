import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { DELETE, HIDDEN, RESERVE, SHOW } from "../../constants";
import "./ResourcesTable.css";
const ResourcesTable = ({hours, whichModalOpen, showHiddenResource, resourceFiltred, day}) => {

    
    const [currentPage, setCurrentPage] = useState(1)
    const resourcePerPage = 11
    const totalPages = Math.ceil(resourceFiltred.length/resourcePerPage)

    const startIndex = (currentPage - 1) * resourcePerPage
    const endIndex = startIndex + resourcePerPage
    
    const currentResources = resourceFiltred.slice(startIndex,endIndex)

    const changePage = (page) => {
        setCurrentPage(page);
    };

    return(
        <>      
             {/*
                
                
                
                <div className="scrolll">

                    <table className="table">
                    
                    <thead>
                        {/*<tr>
                            <th colSpan="1"></th>
                            <th colSpan="37">Bloque Horario</th>
                            <th colSpan="4">Hora Extras</th>
                    </tr/}
                        <tr>
                            <div className="divResourceTitle">
                            <th className="resourceTitle">Resources</th>
                            </div>
                            {hours.map((hora, index) => (
                                <th className="hours" key={index}>{hora}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {asdf.map((resource, row) => (
                            
                            showHiddenResource ? (
                                
                                <tr key={row}>
                                    <td className="resourceName">
                                        <div>
                                            {resource.resourceName}
                                            {!resource.isVisible && <button key={row} onClick={() => {whichModalOpen(SHOW,{id:resource.id})}}>✓</button>}
                                        </div>
                                    </td>
                                    
                                    {/*hours.map((h, column) => {
                                        const reservedUser = resource.boxes.find((box) => box.column === column)?.userName
                                        return (<td key={`${row}${column}`} onClick={() => whichModalOpen(RESERVE,{id:resource.id,column:column,resource:resource.resourceName,reservedUser:reservedUser})}>{reservedUser}</td>)
                                    })}
                                </tr>
                            ):(
                                resource.isVisible && (
                                    <tr key={row}>
                                    <td className="resourceName">
                                        <div>
                                            {resource.resourceName}
                                            {/*<button key={row} onClick={() => {whichModalOpen(resource.boxes.length === 0 ? DELETE : HIDDEN,{id:resource.id,resource:resource.resourceName})}}>X</button>}
                                        </div>
                                    </td>
                                    {console.log("hola",resource.dates.find((date) => date.date === dateSelectHour)?.boxes)}
                                    { hours.map((h, column) => {
                                            const reservedUser = resource.dates.find((date) => date.date === dateSelectHour)?.boxes.find((box) => box.column === column)?.userName
                                            console.log(reservedUser)
                                            return (<td key={`${row}${column}`} onClick={() => {whichModalOpen(RESERVE,{id:resource.id,column:column,resource:resource.resourceName,reservedUser:reservedUser})}}>{reservedUser}</td>)
                                        })
                                    
                                    }
                                    
                                </tr>
                                )
                            )
                        ))}
                    </tbody>
                </table>
                </div>*/}
            
            {<div className="tables-paginator">
                <div className="tables">
                    <div>
                        <table className="table_1">
                            <thead>
                                <tr>
                                    <th className="resourceTitle">Resources</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentResources.map((resource, row) => (
                                    
                                    showHiddenResource ? (
                                        
                                        <tr key={row}>
                                            <td className="resourceName">

                                                    {resource.resourceName}
                                                    {!resource.isVisible && <button key={row} onClick={() => {whichModalOpen(SHOW,{id:resource.id})}}>✓</button>}

                                            </td>
                                        </tr>
                                    ):(
                                            resource.isVisible && (
                                            <tr key={row}>
                                                <td className="resourceName">

                                                        {resource.resourceName}
                                                        <button key={row} onClick={() => {whichModalOpen((resource.dates.length === 0 || (resource.dates.length === 1 && resource.dates.find((date) => date.date === "2023-09-13")?.boxes.length === 0)) ? DELETE : HIDDEN,{id:resource.id,resource:resource.resourceName})}}>X</button>

                                                </td>
                                            </tr>
                                            )
                                        )
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="table_2_scroll">
                        <table className="table_2">
                            <thead>
                                    <tr>
                                        {hours.map((hora, index) => (
                                            <th className="hours" key={index}>{hora}</th>
                                        ))}
                                    </tr>
                            </thead>
                            <tbody>
                                    {currentResources.map((resource, row) => (
                                        
                                            
                                        showHiddenResource ? (
                                                resource.dates.length === 0 ? (
                                                    
                                                    <tr key={row}>
                                                        {hours.map((h, column) => {
                                                            
                                                            const reservedUser = ""
                                                            return (<td className="box" key={`${row}${column}`} onClick={() => whichModalOpen(RESERVE,{id:resource.id,column:column,resource:resource.resourceName,reservedUser:reservedUser})}>{reservedUser}</td>)
                                                        })}
                                                    </tr>
                                                ):(
                                                    <tr key={row}>
                                                        {hours.map((h, column) => {
                                                            const idReservedUser = resource.dates.find((date) => date.date === day)?.boxes.find((box) => box.column === column)?.idSchedule
                                                            const reservedUser = resource.dates.find((date) => date.date === day)?.boxes.find((box) => box.column === column)?.userName
                                                            return (<td className="box" key={`${row}${column}`} onClick={() => whichModalOpen(RESERVE,{id:resource.id,column:column,resource:resource.resourceName,reservedUser:reservedUser,idReservedUser:idReservedUser})}>{reservedUser}</td>)
                                                        })}
                                                    </tr>)
                                        ):(
                                            resource.isVisible && (
                                                resource.dates.length === 0 ? (

                                                        <tr key={row}>
                                                            {
                                                                hours.map((h, column) => {
                                                                const reservedUser = ""
                                                                return (<td className="box" key={`${row}${column}`} onClick={() => whichModalOpen(RESERVE,{id:resource.id,column:column,resource:resource.resourceName,reservedUser:reservedUser})}>{reservedUser}</td>)
                                                            })}
                                                        </tr>
                                                    
                                                    
                                                ):(
                                                        <tr key={row}>
                                                            {   
                                                            hours.map((h, column) => {
                                                                const idReservedUser = resource.dates.find((date) => date.date === day)?.boxes.find((box) => box.column === column)?.idSchedule
                                                                const reservedUser = resource.dates.find((date) => date.date === day)?.boxes.find((box) => box.column === column)?.userName
                                                                return (<td className="box" key={`${row}${column}`} onClick={() => whichModalOpen(RESERVE,{id:resource.id,column:column,resource:resource.resourceName,reservedUser:reservedUser,idReservedUser:idReservedUser})}>{reservedUser}</td>)
                                                            })}
                                                        </tr>
                                                )
                                            )
                                        )
                                    ))}
                            </tbody>            
                        </table>                
                    </div>
                </div>
                <div className="paginator">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                        <button className={`buttonPag ${ currentPage === page ? 'is-current' : ''}`}
                            key={uuidv4()}
                            onClick={() => changePage(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                    </div>}
        </>
    )
}

export default ResourcesTable;