import React from 'react';
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Main from "./components/Main/Main.jsx";
import { HashRouter as Router, Routes, Route} from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<><Sidebar/><Main/></>} />
            </Routes>
        </Router>
    )
}

export default App;