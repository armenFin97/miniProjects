import { useEffect, useState } from "react";

export default function ColorPicker() {
    const [color, setColor] = useState("#ffffff");
    
    useEffect(() => {
        document.body.style.backgroundColor = color;
    }, [color]);
    
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <input className={"input-color"} type="color" value={color} onChange={(e) => setColor(e.target.value)}  />
        </div>
    );
}
