import React, {useContext, useEffect, useRef, useState} from 'react';
import './Main.css';
import {assets} from "../../assets/assets.js";
import {Context} from "../../context/Context.jsx";

const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, setInput, input} = useContext(Context);
    const resultRef = useRef(null);
    const [rows, setRows] = useState(1);
    const [recording, setRecording] = useState(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const updateRows = () => {
            if (window.innerWidth <= 600) {
                setRows(2);
            } else {
                setRows(1);
            }
        };

        updateRows();
        window.addEventListener('resize', updateRows);
        return () => window.removeEventListener('resize', updateRows);
    }, []);

    useEffect(() => {
        if (resultRef.current) {
            resultRef.current.scrollTop = resultRef.current.scrollHeight;
        }
    }, [resultData]);

    const startRecording = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.start();
        setRecording(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };

        recognition.onend = () => {
            setRecording(false);
        };
    };

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setInput(`Uploaded file: ${uploadedFile.name}`);
        }
    };

    const handleSubmit = () => {
        if (file) {
            console.log("Analyzing file:", file);
        }
        onSent();
    };

    return (
        <main className="main">
            <nav className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt=""/>
            </nav>
            <div className="main-container">
                {!showResult
                    ? <>
                        <div className="greet">
                            <p><span>Hello !!</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card" onClick={() => setInput("Suggest beautiful places to see on an upcoming road trip")}> 
                                <p>Suggest beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt=""/>
                            </div>
                            <div className="card" onClick={() => setInput("Briefly summarize this concept: urban planning")}> 
                                <p>Briefly summarize this concept: urban planning</p>
                                <img src={assets.bulb_icon} alt=""/>
                            </div>
                            <div className="card" onClick={() => setInput("Brainstorm team bonding activities for our work retreat")}> 
                                <p>Brainstorm team bonding activities for our work retreat</p>
                                <img src={assets.message_icon} alt=""/>
                            </div>
                            <div className="card" onClick={() => setInput("Tell me about React js and React native")}> 
                                <p>Tell me about React js and React native</p>
                                <img src={assets.code_icon} alt=""/>
                            </div>
                        </div>
                    </>
                    :
                    <div className='result' ref={resultRef}>
                        <div className="result-title">
                            <img src={assets.user_icon} alt=""/>
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img className="result-data-icon" src={assets.gemini_icon} alt=""/>
                            {loading ?
                                <div className='loader'>
                                    <hr/>
                                    <hr/>
                                    <hr/>
                                </div>
                                :
                                <p dangerouslySetInnerHTML={{__html: resultData}}></p>
                            }
                        </div>
                    </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <textarea rows={rows} onChange={(e) => setInput(e.target.value)}
                                  onKeyUp={(e) => {
                                      if (e.key === 'Enter') {
                                          handleSubmit();
                                      }
                                  }}
                                  value={input}
                                  type="text"
                                  placeholder="Ask Gemini"
                        />
                        <div className="icon-container">
                            <button>
                                <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} id="file-upload"/>
                                <label htmlFor="file-upload"><img src={assets.gallery_icon} alt=""/></label>
                            </button>
                            <button onClick={startRecording}><img src={assets.mic_icon} alt=""/></button>
                            <button type="submit" onClick={handleSubmit}><img src={assets.send_icon} alt=""/></button>
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini can make mistakes, so double-check it.
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Main;
