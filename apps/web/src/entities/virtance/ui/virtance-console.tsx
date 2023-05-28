import RFB from '@novnc/novnc';
import useSWR from 'swr';
import { useRef, useState } from 'react';
import { consoleVirtance } from '../api';
import type { Console } from '../types';

export function VirtanceConsole({ id }) {
  const ref = useRef(null);
  const connection = useRef<any | null>(null);
  const [status, setStatus] = useState('Connecting...');

  useSWR(['virtance-console', id], () => consoleVirtance(id), {
    onSuccess({ console }) {
      connection.current = new RFB(ref.current, generateURL(console), {
        credentials: { password: console.websocket.hash },
      });

      if (connection.current) {
        connection.current.addEventListener('credentialsrequired', () => {
          connection.current.sendCredentials({ password: console.websocket.hash });
        });
        connection.current.addEventListener('connect', () => {
          setStatus('Connected');
          connection.current.focus();
        });
        connection.current.addEventListener('disconnect', (e) => {
          if (e.detail.clean) {
            setStatus('Disconnected');
          } else {
            setStatus('Something went wrong, connection is closed');
          }
        });
      }
    },
  });

  function generateURL(console: Console) {
    const { websocket } = console;
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

    return `${protocol}://${websocket.host}:${websocket.port}`;
  }

  function sendCtrlAltDel() {
    connection.current?.sendCtrlAltDel();
    return false;
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div ref={ref} className="flex-1 overflow-hidden"></div>
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between p-4">
        {status}
      </div>
      {status === 'Connected' && (
        <button onClick={sendCtrlAltDel}>Send CtrlAltDel</button>
      )}
    </div>
  );
}
