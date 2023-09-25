import DateTime from "../../components/DateTime/DateTime";
import "./index.css";

const Home = ({user}) => {

    let name = user.name.givenName
    name = name.charAt(0).toUpperCase() + name.slice(1)
    return(
        <>
            <div className="pageHome">
                <div className="title">
                    <h1>Welcome to Arcadius Entertainment.</h1>
                    <p>Hello {name}, welcome back</p>
                </div>
                <DateTime/>
            </div>
            
        </>
    )
}
export default Home;