
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Tournament: a.model({
    name: a.string().required(),
    startDate: a.date().required(),
    endDate: a.date().required(),
    deadline: a.datetime().required(),
    location: a.string(),
    targetFish: a.string().array(),
    topCount: a.integer().default(3),
    minSize: a.float().default(25),
    status: a.string(),
  }).authorization((allow) => [
    allow.group('admin'),
    allow.authenticated().to(['read']),
  ]),

  Entry: a.model({
    oddsId: a.string().required(),
    oddsNickname: a.string().required(),
    tournamentId: a.string().required(),
    fishType: a.string().required(),
    selfLength: a.float().required(),
    approvedLength: a.float(),
    photoKey: a.string(),
    memo: a.string(),
    gpsLat: a.float(),
    gpsLng: a.float(),
    status: a.string().default('pending'),
    rejectReason: a.string(),
  }).authorization((allow) => [
    allow.owner(),
    allow.group('admin'),
    allow.authenticated().to(['read']),
  ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});

