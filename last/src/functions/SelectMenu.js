import { useLocation } from "react-router-dom";

function SelectMenu(path) {
    const location = useLocation();

    return location.pathname === path ? "selected-menu" : "";
}

export default SelectMenu;