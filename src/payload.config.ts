// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Pages from './collections/Pages'
import Posts from './collections/Posts'
import { Competitions } from './collections/Competitions'
import { Teams } from './collections/Teams'
import FAQ from './collections/FAQ'
import { Navigation } from './collections/Navigation'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { uploadthingStorage } from '@payloadcms/storage-uploadthing'

// Email adapter and hooks
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { updateMail } from './app/(frontend)/utils/updateMail'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  globals: [Navigation],
  collections: [Users, Media, Pages, Posts, Competitions, Teams, FAQ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',

  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_FROM || 'no-reply@site.com',
    defaultFromName: 'Ørvur',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 2525,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      logger: true, // ← Enable logging
    debug: true,
    },
  }),

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  sharp,

plugins: [
    payloadCloudPlugin(),

    formBuilderPlugin({
      formSubmissionOverrides: {
        fields: [
          {
            name: 'status',
            type: 'select',
            defaultValue: 'waiting',
            options: [
              { label: 'Main List', value: 'main' },
              { label: 'Waiting List', value: 'waiting' },
            ],
          },
        ],
        hooks: {
          afterDelete: [updateMail],
        },
      },
    } as any),
    uploadthingStorage({
      collections: {
        media: true,
      },
      options: {
        token: process.env.UPLOADTHING_TOKEN,
        acl: 'public-read',
      },
    }),
  ],
})
