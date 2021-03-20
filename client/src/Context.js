import React, { createContext, useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const UserContext = createContext(undefined);

const socket = io.connect('http://localhost:5000');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');

  const [call, setCall] = useState({});

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const [me, setMe] = useState('');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);

        myVideo.current.srcObject = currentStream;
      });

    socket.on('me', (id) => setMe(id));

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  return (
    <UserContext.Provider value={{
      call,
      setCall,
      socket,
      callAccepted,
      setCallAccepted,
      myVideo,
      userVideo,
      connectionRef,
      stream,
      setStream,
      name,
      setName,
      callEnded,
      setCallEnded,
      me,
    }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { ContextProvider, UserContext };
