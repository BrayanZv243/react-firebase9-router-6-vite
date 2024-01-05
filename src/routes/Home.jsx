import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const Home = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            <h1>Home</h1>
            {user && <h2>En línea</h2>}
        </>
    );
};

export default Home;
