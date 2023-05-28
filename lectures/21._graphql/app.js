import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import fs from "fs";

const typeDefs = fs.readFileSync('./schema.graphql', 'utf8');

// VÆR OPMÆRKSOM! Ingen subscription server/service er sat op, 
// og er derfor ikke muligt at teste med GraphQL Playground

// Alle værdier er hardcodet, og vil blive slettet ved genstart af serveren
// Alle værdier er som defineret i graphql schema filen

let blogs = [
    {
        id: "1",
        title: "title 1",
        description: "description 1",
        completed: false,
        ownerId: "3",
    },
    {
        id: "2",
        title: "title 2",
        description: "description 2",
        completed: false,
        ownerId: "2",
    },
    {
        id: "3",
        title: "title 3",
        description: "description 3",
        completed: false,
        ownerId: "1",
    },
];
let users = [
    {
        id: 1,
        email: "user1@mail.dk",
        password: "user1",
    },
    {
        id: 2,
        email: "user2@mail.dk",
        password: "user2",
    },
    {
        id: 3,
        email: "user3@mail.dk",
        password: "user3",
    },
];

const resolvers = {
    Query: {
        Blogs: () => ({
            errors: [],
            blogs
        }),
        Blog: (_, args) => {
            console.log(args, args.blogId);
            const result = blogs.find((item) => item.id === args.blogId);
            console.log(result);
            if (result) {
                return {
                    errors: [],
                    blog: result
                };
            } else {
                return {
                    errors: ["Blog not found"],
                    blog: null
                };
            }
        },
    },
    Mutation: {
        Createblog: (_, args) => {
            const newBlog = {
                id: (blogs.length + 1).toString(),
                title: args.title,
                description: args.description,
                completed: false,
                ownerId: "1",
            };
            blogs.push(newBlog);
            console.log(typeof(newBlog.id));
            return {
                errors: [],
                id: newBlog.id
            };
        },
        CreateUser: (_, args) => {
            const newUser = {
                id: (users.length + 1).toString(),
                email: args.email,
                password: args.password,
            };
            users.push(newUser);
            return {
                errors: [],
                id: newUser.id
            };
        },
        CreateToken: (_, args) => {
            const token = {
                id: (users.length + 1).toString(),
                email: args.email,
                password: args.password,
            };
            users.push(token);
            return {
                errors: [],
                token: Date.now()
            };
        }
    },
};




const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const PORT = process.env.PORT || 3000;

const { url } = await startStandaloneServer(server, {listen: { port: PORT },});
    console.log(`🚀  Server ready at: ${url}`);