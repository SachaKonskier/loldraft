import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        username: {
          label: 'username',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const credentialDetails = {
          username: credentials.username,
          password: credentials.password,
        };

        if (
          credentialDetails.username === 'garengarengaren' &&
          credentialDetails.password === 'bestchampionever'
        ) {
          const user = {
            id: 1,
            username: 'garen',
            data: {
              auth: {
                username: 'garen',
                userType: 'admin',
                token: 'garenToken',
              },
            },
          };
          return user;
        } else {
          console.log('check your credentials');
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.data.auth.username;
        token.user_type = user.data.auth.userType;
        token.accessToken = user.data.auth.token;
      }

      return token;
    },
    // session: ({ session, token, user }) => {
    //   if (token) {
    //     session.user.username = token.username;
    //     session.user.accessToken = token.accessToken;
    //   }
    //   return session;
    // },
  },
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);
