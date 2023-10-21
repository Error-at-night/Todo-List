// React Imports
import { useContext } from "react";

// ThemeContext
import { ThemeContext } from "./Layout";

// Heroicon Imports
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

// Sass
import "../Sass/ThemeToggle.scss"

const ThemeToggle = () => {
    // theme
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    return ( 
        <button className="toggle-button" onClick={() => {
            toggleTheme();
        }}>
            {theme === "dark" ? <MoonIcon width={30} height={30}/> : <SunIcon width={30} height={30}/>}
        </button>
    );

}
 
export default ThemeToggle;
