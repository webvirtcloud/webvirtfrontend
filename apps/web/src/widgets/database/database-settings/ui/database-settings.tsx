import { DatabaseSettingsDeletion } from './database-settings-deletion';
import { DatabaseSettingsGeneral } from './database-settings-general';
import { DatabaseSettingsResetPassword } from './database-settings-reset-password';

export function DatabaseSettings() {
  return (
    <div className="space-y-8">
      <DatabaseSettingsGeneral />
      <hr />
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">Danger zone</h2>
          <p className="text-muted-foreground">
            Think twice before touching any of below options.
          </p>
        </div>
        <div className="bg-card divide-y rounded-lg border">
          <DatabaseSettingsResetPassword />
          <DatabaseSettingsDeletion />
        </div>
      </div>
    </div>
  );
}
