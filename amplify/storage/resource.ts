
import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'fishingPhotos',
  access: (allow) => ({
    'photos/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
      allow.groups(['admin']).to(['read', 'write', 'delete']),
    ],
  }),
});

