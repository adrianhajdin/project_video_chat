import React, { useContext } from 'react';

import { SocketContext } from '../Context';

const VideoPlayer = () => {
  const { callAccepted, myVideo, userVideo, callEnded, stream } = useContext(SocketContext);

  return (
    <div>
      <div>
        {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: '300px' }} />}
      </div>
      <div>
        {callAccepted && !callEnded && <video playsInline ref={userVideo} autoPlay style={{ width: '300px' }} />}
      </div>
    </div>
  );
};

export default VideoPlayer;
