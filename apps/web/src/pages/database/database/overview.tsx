import { useCopyToClipboard } from '@uidotdev/usehooks';
import {
  CheckIcon,
  Copy as CopyIcon,
  Globe as PublicIcon,
  Shield as PrivateIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'ui/components/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui/components/select';
import { cx } from 'ui/lib';

import { useDatabase } from '@/entities/database';

export function DatabaseOverview() {
  const { id } = useParams<{ id: string }>();
  const { data: database } = useDatabase(id || '');
  const [connectionType, setConnectionType] = useState<'public' | 'private'>('public');
  const [viewMode, setViewMode] = useState<'string' | 'params' | 'flags'>('params');
  const [_, copyToClipboard] = useCopyToClipboard();
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!database) return null;

  function handleCopy() {
    if (!database) return;

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);

    if (viewMode === 'string') {
      copyToClipboard(database.conection[connectionType].uri);
    } else if (viewMode === 'flags') {
      copyToClipboard(
        `PGPASSWORD=${database.conection.password} psql -U ${
          database.conection.user
        } -h ${database.conection[connectionType].host} -p ${
          database.conection.port
        } -d defaultdb ${database.conection.ssl ? '--set=sslmode=enable' : ''}`,
      );
    } else {
      const params = [
        `username = ${database.conection.user}`,
        `password = ${database.conection.password}`,
        `host = ${database.conection[connectionType].host}`,
        `port = ${database.conection.port}`,
        `database = defaultdb`,
        `sslmode = ${database.conection.ssl ? 'require' : ''}`,
      ].join('\n');
      copyToClipboard(params);
    }
  }

  return (
    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
      <div className="bg-card flex flex-col gap-0.5 rounded-lg border">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-base font-medium">Configuration</h2>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm font-medium">Engine</span>
            <span className="">{database.engine.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm font-medium">Region</span>
            <span className="">{database.region.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm font-medium">Size</span>
            <span className="text-muted-foreground">
              {database.size.vcpu} vCPU • {database.size.memory}GB RAM •{' '}
              {database.size.disk}GB SSD
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm font-medium">Backups</span>
            <span
              className={cx(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium',
                database.backups_enabled
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-muted text-muted-foreground',
              )}
            >
              {database.backups_enabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>

      <div className="">
        <div className="bg-card rounded-lg border">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-base font-medium">Connection Details</h2>
          </div>

          <div className="flex items-center justify-between gap-2 p-4 pb-0">
            <div className="flex">
              <Button
                className={'gap-1.5 rounded-r-none'}
                size="sm"
                variant={connectionType === 'public' ? 'default' : 'outline'}
                onClick={() => setConnectionType('public')}
                type="button"
              >
                <PublicIcon className="size-3.5" /> Public
              </Button>
              <Button
                className={'gap-1.5 rounded-l-none'}
                size="sm"
                variant={connectionType === 'private' ? 'default' : 'outline'}
                onClick={() => setConnectionType('private')}
                type="button"
              >
                <PrivateIcon className="size-3.5" /> Private
              </Button>
            </div>

            <div>
              <Select
                onValueChange={(value) => setViewMode(value as 'string' | 'params')}
                defaultValue={viewMode}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Show as" />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="params">Connection params</SelectItem>
                  <SelectItem value="string">Connection string</SelectItem>
                  <SelectItem value="flags">Flags</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4">
            {viewMode === 'string' && (
              <div className="bg-muted rounded-md p-4 font-mono text-sm">
                <pre className="whitespace-pre-wrap break-words">
                  postgres://admin:
                  <button
                    type="button"
                    className="text-sky-400 hover:underline hover:underline-offset-4 dark:text-sky-500"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? database.conection.password : '********'}
                  </button>
                  @{database.conection[connectionType].host}:{database.conection.port}
                  /defaultdb?sslmode={database.conection.ssl ? 'enable' : 'disable'}
                </pre>
              </div>
            )}
            {viewMode === 'params' && (
              <div className="bg-muted rounded-md p-4 font-mono text-sm">
                <pre className="whitespace-pre-wrap break-words">
                  <div>username = {database.conection.user}</div>
                  <div className="flex items-center gap-2">
                    password =
                    <button
                      type="button"
                      className="text-sky-400 hover:underline hover:underline-offset-4 dark:text-sky-500"
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? database.conection.password : '********'}
                    </button>
                  </div>
                  <div>host = {database.conection[connectionType].host}</div>
                  <div>port = {database.conection.port}</div>
                  <div>database = defaultdb</div>
                  <div>sslmode = {database.conection.ssl ? 'enable' : 'disable'}</div>
                </pre>
              </div>
            )}
            {viewMode === 'flags' && (
              <div className="bg-muted rounded-md p-4 font-mono text-sm">
                <pre className="whitespace-pre-wrap break-words">
                  PGPASSWORD=
                  <button
                    type="button"
                    className="text-sky-400 hover:underline hover:underline-offset-4 dark:text-sky-500"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? database.conection.password : '********'}
                  </button>{' '}
                  psql -U {database.conection.user} -h{' '}
                  {database.conection[connectionType].host} -p {database.conection.port}{' '}
                  -d defaultdb {database.conection.ssl ? '--set=sslmode=enable' : ''}
                </pre>
              </div>
            )}
            <Button
              className="mt-4 flex w-full items-center justify-center gap-2"
              variant="outline"
              size="sm"
              aria-label={copied ? 'Copied' : 'Copy to clipboard'}
              onClick={handleCopy}
              disabled={copied}
              type="button"
            >
              {/* <span>Copy to clipboard</span> */}
              <div
                className={cx(
                  'transition-all',
                  copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
                )}
              >
                <CheckIcon className="stroke-emerald-500" size={16} aria-hidden="true" />
              </div>
              <div
                className={cx(
                  'absolute transition-all',
                  copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
                )}
              >
                <CopyIcon size={16} aria-hidden="true" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
