import {ThemeProvider,} from '@mui/material/styles';
import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Theme from './components/Theme'


import {createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import Projects from './pages/Projects.jsx';
import Skills from './pages/Skills.jsx';
import NotFound from './pages/NotFound.jsx';


const Layout = () => (
    <>
        <Nav/>
        <Outlet/>
        <Footer/>
    </>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "/contact", element: <Contact/>},
            {path: "/projects", element: <Projects/>},
            {path: "/skills", element: <Skills/>},
            {path: "*", element: <NotFound/>},

        ],
    },
]);

function App() {
    return (
        <ThemeProvider theme={Theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
}

export default App
