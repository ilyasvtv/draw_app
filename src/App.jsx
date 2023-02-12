import { useRef, useState } from 'react'
import './App.sass'

function App() {
    const [mousePressed, setMouseStatus] = useState(false);
    const [sizeOfPen, setSizeOfPen] = useState(10);
    const [colorOfPen, setColorOfPen] = useState("#ffffff");
    const [colorOfBackground, setColorOfBackground] = useState("#000000");
    const [isPen, setIsPen] = useState(true);
    const [pathToCursorImg, setPathToImgCursor] = useState("url(src/assets/pen.png), url(src/assets/pen.png), auto");
    const offsetOfImg = 20;
    const drawAreaWidth = 500;
    const drawAreaHeight = 500;
    const drawAreaRef = useRef(null);

    const click = (e) => {
        const offsetX = drawAreaRef.current.getBoundingClientRect().x;
        const offsetY = drawAreaRef.current.getBoundingClientRect().y;
        const ctx = drawAreaRef.current.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = isPen ? colorOfPen : colorOfBackground;
        ctx.arc(e.clientX - offsetX, e.clientY - offsetY + offsetOfImg, sizeOfPen / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    const mouseUp = () => {
        setMouseStatus(false);
        const ctx = drawAreaRef.current.getContext('2d');
        ctx.stroke();
    }

    const mouseDown = () => {
        setMouseStatus(true);
        const ctx = drawAreaRef.current.getContext('2d');
        ctx.beginPath();
    }

    const mouseLeave = () => {
        setMouseStatus(false);
    }

    const mouseMoving = (e) => {
        if (!mousePressed) return;
        const offsetX = drawAreaRef.current.getBoundingClientRect().x;
        const offsetY = drawAreaRef.current.getBoundingClientRect().y;
        const ctx = drawAreaRef.current.getContext('2d');
        ctx.strokeStyle = isPen ? colorOfPen : colorOfBackground;
        ctx.lineCap = "round";
        ctx.lineWidth = sizeOfPen;
        ctx.lineTo(e.clientX - offsetX, e.clientY - offsetY + offsetOfImg);
        ctx.stroke();
    }

    const changeColorOfBackground = (e) => {
        const ctx = drawAreaRef.current.getContext('2d');
        const color = e.target.value;
        setColorOfBackground(color);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, drawAreaWidth, drawAreaHeight);
    }

    const handleChangePen = (bool) => {
        setIsPen(bool);
        const pathToPen = "url(src/assets/pen.png), url(src/assets/pen.png), auto";
        const pathToEraser = "url(src/assets/eraser.png), url(src/assets/eraser.png), auto";
        const path = bool ? pathToPen : pathToEraser;
        setPathToImgCursor(path);
    }

    return (
        <div className="App">

            {/* pen and eraser */}
            {/* <a style={{display: "none"}} href="https://www.flaticon.com/ru/free-icons/" title="кисть иконки">Кисть иконки от Freepik - Flaticon</a> */}
            {/* <a href="https://www.flaticon.com/ru/free-icons/" title="ластик иконки">Ластик иконки от Freepik - Flaticon</a> */}

            <div className="container">
                <canvas 
                    onMouseMove={(e) => mouseMoving(e)} 
                    onMouseUp={() => mouseUp()} 
                    onMouseDown={() => mouseDown()}
                    onMouseLeave={() => mouseLeave()}
                    onClick={(e) => click(e)} 
                    className="drawArea" 
                    width={drawAreaWidth} height={drawAreaHeight}
                    style={{background: colorOfBackground, cursor: pathToCursorImg}}
                    ref={drawAreaRef}>
                </canvas>
                <div className="settings">
                    <div className="option">
                        <label htmlFor="sizeOption">Set size of pen: </label>
                        <input id="sizeOption" type="range" min={3} max={30} step={3} value={sizeOfPen} onChange={(e) => setSizeOfPen(e.target.value)}/>
                        <label htmlFor="sizeOption">{sizeOfPen}</label>
                    </div>
                    <div className="option">
                        <label htmlFor="penColorOption">Set color of pen: </label>
                        <input id="penColorOption" type="color" value={colorOfPen} onChange={(e) => setColorOfPen(e.target.value)}/>
                    </div>
                    <div className="option">
                        <label htmlFor="backgroundColorOption">Set color of background and clear area: </label>
                        <input id="backgroundColorOption" type="color" value={colorOfBackground} onChange={(e) => changeColorOfBackground(e)}/>
                    </div>
                    <div className="option">
                        <fieldset>
                            <input type="radio" name="stick" id="pen" onChange={() => handleChangePen(true)} checked={isPen ? true : false}/>
                            <label htmlFor="pen">Pen</label>
                            <input type="radio" name="stick" id="eraser" onChange={() => handleChangePen(false)} checked={isPen ? false : true}/>
                            <label htmlFor="eraser">Eraser</label>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
