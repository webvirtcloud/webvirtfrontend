import RFB from '@novnc/novnc';
import useSWR from 'swr';
import { useRef, useState } from 'react';
import { consoleVirtance } from '../api';
import type { Console } from '../types';
import { Button } from 'ui/components/button';
import { StatusDot } from 'ui/components/status-dot';
import Cookies from 'js-cookie';

export function VirtanceConsole({ id }) {
  const ref = useRef(null);
  const connection = useRef<any | null>(null);
  const [status, setStatus] = useState('Connecting...');

  useSWR(['virtance-console', id], () => consoleVirtance(id), {
    onSuccess(response) {
      Cookies.set('uuid', response.console.uuid, {
        secure: true,
        sameSite: 'None',
        domain: '.webvirt.cloud',
      });

      connection.current = new RFB(ref.current, generateURL(response.console), {
        credentials: { password: generatePassword(response.console.websocket.hash) },
      });

      window.console.log({
        password: generatePassword(response.console.websocket.hash),
        url: generateURL(response.console),
      });

      if (connection.current) {
        connection.current.scaleViewport = readQueryVariable('scale', false);
        connection.current.background = 'rgb(0,0,0)';

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
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  function generateURL(console: Console) {
    const { websocket } = console;
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

    return `${protocol}://${websocket.host}:${websocket.port}`;
  }

  function generatePassword(hash: string) {
    const decoded = window.atob(hash);
    return decoded.substring(6, decoded.length - 12);
  }

  function sendCtrlAltDel() {
    connection.current?.sendCtrlAltDel();
    return false;
  }

  function readQueryVariable(name, defaultValue) {
    const re = new RegExp('.*[?&]' + name + '=([^&#]*)'),
      match = ''.concat(document.location.href, window.location.hash).match(re);

    if (match) {
      return decodeURIComponent(match[1]);
    }

    return defaultValue;
  }

  function getStatus(status: string) {
    switch (status) {
      case 'Connecting...':
        return 'pending';
      case 'Connected':
        return 'active';
      case 'Disconnected':
      case 'Something went wrong, connection is closed':
        return 'inactive';
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <div ref={ref} className="flex-1 overflow-hidden"></div>
      <div className="fixed bottom-0 left-0 right-0 flex h-[65px] items-center justify-between border-t border-neutral-800 p-4">
        <div className="flex items-center gap-2">
          <StatusDot status={getStatus(status)} />
          <span className="text-sm font-medium">{status}</span>
        </div>
        {status === 'Connected' && (
          <Button onClick={sendCtrlAltDel}>Send CtrlAltDel</Button>
        )}
      </div>
    </div>
  );
}
