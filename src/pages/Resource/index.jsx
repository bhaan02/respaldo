import { useEffect, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import DateTime from "../../components/DateTime/DateTime";
import Modal from "../../components/Modal/Modal";
import { deleteReserveHour, deleteResource, getSchedule, postCreateResources, postReserveHour, putReserveHour, putResource } from "../../service/service";
import FormAddResource from "./components/FormAddResource/FormAddResource";
import ResourceSearcher from "./components/ResourceSearcher/ResourceSearcher";
import ResourcesTable from "./components/ResourcesTable/ResourcesTable";
import SelecetedExtendHours from "./components/SelectExtendHours/SelectExtendHours";
import VisibilityCheckBox from "./components/VisibilityCheckBox/VisibilityCheckBox";
import "./index.css";




const ResourcesPage = ({user}) =>{

    // STATES
    const [schedule,setSchedule] = useState([]);
    const [resourceFiltred, setResourceFiltred] = useState([])
    const [optionSelected,setOptionSelected] = useState(-1)
    const [resourceSearch, setResourceSearch] = useState("");
    const [newResource, setNewResource] = useState("");
    const [isExtended, setIsextended] = useState(false);
    const [reservedUser, setReservedUser] = useState("")
    const [showHiddenResource, setShowHiddenResource] = useState(false);    
    const [showModal, setShowModal] = useState(false)
    const [typeModal, setTypeModal] = useState("")
    const [selectedCell, setSelectedCell] = useState({ id: -1, column: '' });
    const [selectedResource, setSelectedResource] = useState("");   
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
    const [idReservedUser, setIdReservedUser] = useState(-1)


    // CONSTS
    
    const hours = [
        '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45',
        '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45',
        '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45',
        '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45',
        '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00',
    ];
    
    const userLogend = {
        id: user.id,
        name: user.name.givenName
    }
    
    const isSameUser = reservedUser === userLogend.name
    
    const day=selectedDate
    
    // EFFECTS
    useEffect(() => {
        fetchSchedule();
    }, []);

    useEffect(() => {
       setResourceFiltred(schedule.filter((resource)=> resource.resourceName.includes(resourceSearch.toLocaleLowerCase())))
    },[resourceSearch])

    
    // HANDLE FUNCTIONS
  

    const handleAddResource = (e) => {
        e.preventDefault();

        if (newResource !== "") {
        fetchPostCreateResources({
            resourceName: newResource.toLowerCase(),
            isVisible: true,

        });
        }

        setNewResource("")
        setShowModal(false)
    };

    const handleDeleteResource = (e) => {
        e.preventDefault();

        const {id} = selectedCell
        const box = schedule.find((box) => box.id === id)
        if(box.dates.length === 0){
            fetchDeleteResource(id)
        }else{
            fetchPutResource({
                id,
                isVisible:false
            })
        }
        setShowModal(false)
    }

    const handleReserveHours = (e) => {
        e.preventDefault();
        

        const {id,column} = selectedCell

        fetchPostReserveHour({
            idResource: id,
            date: day,
            column,
            userName: userLogend.name
        })
        setShowModal(false)

    }
    
    const handleDeclineHours = (e) => {
        e.preventDefault()
      
        fetchDeleteReserveHour(idReservedUser)

        setShowModal(false)
    }

    const handleShowResource = (e) => {
        e.preventDefault()

        const {id} = selectedCell
        fetchPutResource({
            id,
            isVisible:true
        })
        
        setShowModal(false)
    }
    const handleExtendHours = (e) => {
        e.preventDefault()

        const {id,column} = selectedCell
        const selectedData = schedule.find((row)=>row.id === id)
        const nameSave = []

        for(let i=1; i<=parseInt(optionSelected);i++){
            if(!selectedData.dates.find((date) => date.date === day)?.boxes.find((col)=>col.column === column + i)){
                fetchPostReserveHour({
                    idResource: id,
                    date: day,
                    column: column + i,
                    userName: userLogend.name
                })
            }else{
                if(!(selectedData.dates.find((date) => date.date === day)?.boxes.find((col)=>col.column === column + i)?.userName === userLogend.name)){
                    nameSave.push(selectedData.dates.find((date) => date.date === day)?.boxes.find((col)=>col.column === column + i).userName)
                    const idSchedule = selectedData.dates.find((date) => date.date === day)?.boxes.find((col)=>col.column === column + i)?.idSchedule
                    fetchPutReserveHour({
                        id: idSchedule,
                        userName: userLogend.name
                    })
                }
            }
        }
        let j = 0
        for(let i=1; i <= nameSave.length;i++){
            if(!(selectedData.dates.find((date) => date.date === day)?.boxes.find((col)=>col.column === column + parseInt(optionSelected) + i))){
                fetchPostReserveHour({
                    idResource: id,
                    date: day,
                    column: column + i + parseInt(optionSelected),
                    userName: nameSave[j]
                })
                j++
            }else{
                nameSave.push(selectedData.dates.find((date) => date.date === day)?.boxes.find((col)=>col.column === column + i + parseInt(optionSelected)).userName)
                const idSchedule = selectedData.dates.find((date) => date.date === day)?.boxes.find((col)=>col.column === column + i + parseInt(optionSelected))?.idSchedule
                    fetchPutReserveHour({
                        id: idSchedule,
                        userName: nameSave[j]
                    })
                    j++
            }
        }
        setShowModal(false)
    }

    // FUNCTIONS
    const whichModalOpen = (type, box) => {
        const {id,column,resource,reservedUser,idReservedUser} = box
        setIdReservedUser(idReservedUser)
        setSelectedCell({id, column})
        setReservedUser(reservedUser)
        setSelectedResource(resource)
        setShowModal(true)
        setTypeModal(type)
    }

    const renderModal = () => {
        switch(typeModal){
            
            case "delete":
            case "hidden":
                return(<Modal showModal={showModal}>
                        <p>Are you sure to {typeModal === "delete" ? "delete" : "hide"} this resource?: <strong>{selectedResource}</strong></p>
                        <button onClick={handleDeleteResource}>{typeModal === "delete" ? "Delete" : "Hide"}</button>
                        <button onClick={() => {setShowModal(false)}}>Cancel</button>
                </Modal>)
            case "show":
                return(<Modal showModal={showModal}>
                        <p>Do you want to show this resource?: <strong>{selectedResource}</strong></p>
                        <button onClick={handleShowResource}>Show</button>
                        <button onClick={() => {setShowModal(false)}}>Cancel</button>                        
                    </Modal>)   

            case "reserve":

                return(<Modal showModal={showModal}>
                        <p>Resoruce Name: <strong>{selectedResource}</strong></p>
                        {!reservedUser && !isSameUser ? <button onClick={handleReserveHours}>Select Hour</button> : null}
                        {reservedUser && <p>Resource taken by: <strong>{reservedUser}</strong></p>}
                        {isSameUser && <button onClick={handleDeclineHours}>Decline Hour</button>}
                        {isSameUser && <button onClick={() => {setIsextended(!isExtended),setOptionSelected(0)}}>{isExtended ? "contraer" : "extender"}</button>}
                        {isExtended && <SelecetedExtendHours {...selecetedExtendHoursProps}/>}
                        <button onClick={() => {setShowModal(false),setIsextended(false),setOptionSelected(0)}}>Cancel</button>
                    </Modal>)
            
            case "add":

                return(<Modal showModal={showModal}>
                        <FormAddResource {...formAddResourceProps}/>
                        <button onClick={() => {setShowModal(false)}}>Cancel</button>
                    </Modal>)
                default:
                break;
        }
    }

    
    
    // FETCHS 
    const fetchSchedule = async () => {
        try {
            const response = await getSchedule();
            setSchedule(response);
            setResourceFiltred(response);
        }   catch (error) {
            console.error("Error al obtener los recursos:", error);
        }
    };

    const fetchPostCreateResources = async (payload) => {
        try {
            const response = await postCreateResources(payload);
            console.log(response)
            setSchedule(response);
            setResourceFiltred(response);
            console.log(schedule)
            console.log(resourceFiltred)
        }   catch (error) {
            console.error("Error al obtener los recursos:", error);
        }
    };

    const fetchPostReserveHour = async (payload) => {
        try {
            const response = await postReserveHour(payload);
        
            setSchedule(response);
            setResourceFiltred(response);
        }   catch (error) {
            console.error("Error al obtener los recursos:", error);
        }
    };

    const fetchDeleteReserveHour = async (id) => {
        try {
            const response = await deleteReserveHour(id);
        
            setSchedule(response);
            setResourceFiltred(response);
        }   catch (error) {
            console.error("Error al obtener los recursos:", error);
        }
    };

    const fetchDeleteResource = async (id) => {
        try {
            const response = await deleteResource(id);

            setSchedule(response);
            setResourceFiltred(response);
        } catch (error) {
            console.error("Error al obtener los recursos:", error);
        }
    }

    const fetchPutResource = async (payload) => {
        try {
            const response = await putResource(payload);
      
            setSchedule(response);
            setResourceFiltred(response);
        }   catch (error) {
            console.error("Error al obtener los recursos:", error);
        }
    };

    const fetchPutReserveHour = async (payload) => {
        try {
            const response = await putReserveHour(payload);
      
            setSchedule(response);
            setResourceFiltred(response);
        }   catch (error) {
            console.error("Error al obtener los recursos:", error);
        }
    };


    

    // COMPONENTS PROPS

    const selecetedExtendHoursProps = {
        hours,
        optionSelected,
        setOptionSelected,
        selectedCell,
        handleExtendHours
    }

    const formAddResourceProps = {
        newResource,
        setNewResource,
        handleAddResource
    }

    const resourcesTableProps = {
        hours,
        schedule,
        whichModalOpen,
        showHiddenResource,
        resourceFiltred,
        setResourceFiltred,
        resourceSearch,
        day,
    }

    const visibilityCheckBoxProps = {
        showHiddenResource,
        setShowHiddenResource
    }

    const resourceSearcherProps = {
        schedule,
        resourceFiltred,
        setResourceFiltred,
        resourceSearch,
        setResourceSearch
    }

    return(
        <>  
            {renderModal()}
            <div className="pageResource">
                <div className="containsResource">
                    <div className="containsDate">
                        <DateTime/>
                    </div>
                    <div className="box1">
                        <h1>Resource Management</h1>
                        <div className="box2">
                            <VisibilityCheckBox {...visibilityCheckBoxProps}/>
                            <button onClick={() => {setShowModal(true), setTypeModal("add")}}><BiAddToQueue/></button>
                            <ResourceSearcher {...resourceSearcherProps}/>
                            <input className="calendar" type="date" value={selectedDate} onChange={(e) => {setSelectedDate(e.target.value)}}/>
                        </div>
                        
                    </div>
                    <ResourcesTable {...resourcesTableProps}/>
                </div>
            </div>
        </>
    )
    
}
export default ResourcesPage;