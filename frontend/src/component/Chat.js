import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { user } from './Join';
import socketIo from 'socket.io-client';
import './Chat.css';
import Message from './Message';
import sendLogo from '../images/send.png';
import ReactScrollToBottom from 'react-scroll-to-bottom'
import sun from '../images/sun.png';
import moon from '../images/moon.png'
let socket;
const ENDPOINT = "https://chitchat-p7r7.onrender.com";
const Chat = () => {
 
    const [theme, setTheme] = useState("light-theme");
    const [image, setImage] = useState(moon);
    const toggleTheme = () => {
        if (theme === "dark-theme") {
            setImage(moon);
            setTheme("light-theme");
        }
        else {
            setImage(sun);
            setTheme("dark-theme");
        }
    };
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const [id, setid] = useState('');
    const [messages, setMessages] = useState([]);
    const send = () => {
        const message = document.getElementById('chatInput').value;

        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            // alert('Connected');
            setid(socket.id);
        });
        socket.emit('joined', { user });
        
      
        socket.on('userJoined', (data) => {
            
            // setMessages([...messages, data]);
            setMessages((prevMessages) => [...prevMessages, data]);
            console.log(data.user, data.message);
        });
        socket.on('welcome', (data) => {

            // setMessages([...messages, data]);
            setMessages((prevMessages) => [...prevMessages,data]);
            console.log(data.user, data.message);
        });
        socket.on('leave', (data) => {
            // setMessages([...messages, data]);
            setMessages((prevMessages) => [...prevMessages, data]);
            console.log(data.message);
        });

        socket.on('sendMessage', (data) => {
            // setMessages(prevMessages => [...prevMessages, data]);
            setMessages((prevMessages) => [...prevMessages, data]);
            console.log(data.user, data.message, data.id);
          });
        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, []);
    
   


    // useEffect(() => {
    //     socket.on('sendMessage', (data) => {
    //         setMessages([...messages, data]);
    //         console.log(data.user, data.message, data.id);
    //     })

    //     return () => {
    //         socket.off();
    //     }
    // }, [messages])



    return (
        <div className='chatPage'>
            <div className='chatContainer'>
                <div className='chatHeader'>
                 <h2>ChitChat</h2>
                
                    <div className='theme' >
                        <img src={image} alt="image" onClick={() => toggleTheme()} />
                    </div>
                    <a href="/"> 
                    
                    <button type="button" class="btn btn-danger">Leave</button>
                    </a>
                </div>
                <ReactScrollToBottom className='chatBox'>
                    {messages.map((item, i) => <Message user={item.id === id ? '' :item.user }  message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                   
                </ReactScrollToBottom>
                <div className='inputBox'>
                    <input onKeyPress={(e) => e.key === 'Enter' ? send() : null} type='text' id='chatInput' />
                    <button onClick={send} className='sendBtn'><img src={sendLogo} alt="Send" /></button>
                </div>
            </div>

        </div>
    )
}

export default Chat
