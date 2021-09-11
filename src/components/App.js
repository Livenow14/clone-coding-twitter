import {useEffect, useState} from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                console.log("확인 1" + user.email);
                setIsLoggedIn(user);
            } else {
                console.log("확인 2" + user);
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

return (
    <>
        {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..."}
        <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
);
}

export default App;
