import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem("user"));
window.addEventListener('beforeunload', (e) => {
  const { data } = axios.request({
    headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      method: "patch",
      url: "http://localhost:8080/api/user/end_live"
})
})

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function liveSetUp() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  let role_str = getUrlParams(window.location.href).get('role') || 'Host';
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
      : role_str === 'Cohost'
      ? ZegoUIKitPrebuilt.Cohost
      : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  if (role === ZegoUIKitPrebuilt.Host || role === ZegoUIKitPrebuilt.Cohost) {
    sharedLinks.push({
      name: 'Join as co-host',
      url:
        '/live_now'+
        '?roomID=' +
        roomID +
        '&role=Cohost',
    });
  }
  sharedLinks.push({
    name: 'Join as audience',
    url:
     '/live_now'+
      '?roomID=' +
      roomID +
      '&role=Audience',
  });
 // generate Kit Token
  const appID = 1914432654;
  const serverSecret = "47f5a1aecba7b905a825a895b55a4730";
  const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  randomID(5),  randomID(5));


  // start the call
  let myMeeting = async (element) => {
      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        showPreJoinView: false,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        }
        ,
  success: (streamList) => {
    console.warn(`Joined room ${roomID} with stream ID ${streamList[0].stream_id}`);
  },
  error: (err) => {
    console.error(`Error joining room ${roomID}:`, err);
  }
        ,
        sharedLinks,
        onLiveStart: (users) => {
            const { data } = axios.request({
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                  },
                  method: "patch",
                  data: JSON.stringify({sharedLinks}),
                  url: "http://localhost:8080/api/user/start_live"
            })
         },
         onLiveEnd: (users) => {
            const { data } = axios.request({
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                  },
                  method: "patch",
                  url: "http://localhost:8080/api/user/end_live"
            })
         }
      });
  };
  
  
  
  return (
    <div
      className="myCallContainer shadow-none"
      ref={myMeeting}
    ></div>
  );
}