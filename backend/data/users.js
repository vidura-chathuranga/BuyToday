import bcrypt from 'bcryptjs';

const users = [
    {
        name : "Admin User",
        email: "admin@email.com",
        password : bcrypt.hashSync("12345678",10),
        isAdmin : true
    },
    {
        name : "Vidura Chathuranaga",
        email: "vidura@gmail.com",
        password : bcrypt.hashSync("12345678",10),
        isAdmin : false
    },
    {
        name : "Aditha",
        email: "aditha@gmail.com",
        password : bcrypt.hashSync("12345678",10),
        isAdmin : false
    }
];

export default users;