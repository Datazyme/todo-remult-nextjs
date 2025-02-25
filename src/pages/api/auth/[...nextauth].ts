import { NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { UserInfo } from "remult"

const validUsers:UserInfo[] = [
    {id: "1", name: "Jane"},
    {id: "2", name: "Fred"}
]

export default NextAuth({
    providers: [
        CredentialsProvider({
            credentials: {
                name: {
                    label: "Username",
                    placeholder: "Try Jane or Fred"
                }
            },
            authorize:
                credentials => 
                    validUsers.find(user => user.name === credentials?.name) || null
        })
    ]
})

//tells remult who the user is
export async function getUserFromNextAuth(req: NextApiRequest) {
    const token = await getToken({ req });
    return validUsers.find(user => user.id === token?.sub)
}