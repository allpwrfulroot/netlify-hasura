This is a [Next.js](https://nextjs.org/) app with a Hasura backend, using Netlify Identity for authentication.

## Getting Started

Do not use `netlify dev`, it does not handle Netlify Functions or Netlify Identity well on localhost.

For local development:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Netlify Identity

The Netlify Identity user object looks like this:

```js
{
  id: 'e5f24adf-4958-472d-b297-c3bff2e91c41',
  aud: '',
  role: 'instructor',
  email: 'someone@example.com',
  confirmation_sent_at: '2021-01-12T13:21:55Z',
  app_metadata: { provider: 'email' },
  user_metadata: { full_name: 'Someone Demo' },
  created_at: '2021-01-12T13:21:55Z',
  updated_at: '2021-01-12T13:21:55Z'
}
```

## Deploy on Netlify

After establishing this project in the git repo service of your choice, follow the instructions from Netlify to connect the project and switch on Identity services.
