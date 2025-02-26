    import User from "../models/UserModel.js";
    import "dotenv/config"

    export const getAllUsers = async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    // export const getUserById = async (req, res) => {
    //     const id = req.params.id;
    //     try {
    //         const user = await User.findByPk(id);
    //         res.json(user || { message: "User not found" });
    //     } catch (error) {
    //         res.status(500).send(error.message);
    //     }
    // };

    export const getUserById = async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id, { attributes: ["id", "name", "saldo"] });
            res.json(user || { message: "User not found" });
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
    export const addUser = async (req, res) => {
        const { name, email, password, saldo } = req.body;
        try {
            const newUser = await User.create({ name, email, password, saldo });
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error inserting user:', error);
            res.status(400).send(error.message);
        }
    };

    export const updateUser = async (req, res) => {
        const id = req.params.id;
        const { nama, email, password, saldo } = req.body;
        try {
            const result = await User.update(
                { nama, email, password, saldo },
                { where: { id } }
            );
            res.json(result[0] ? "User updated" : "User not found");
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    export const deleteUser = async (req, res) => {
        const id = req.params.id;
        try {
            const result = await User.destroy({ where: { id } });
            res.json(result ? "User deleted" : "User not found");
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    export const loginUser = async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    email: req.body.email
                }
            });

            if (user !== null) {
                const match = req.body.password === user.password;

                if (!match) {
                    return res.status(400).json("Password salah");
                } else {
                    res.json({
                        message: "Login berhasil",
                        user: {
                            id: user.id,
                            email: user.email,
                            saldo: user.saldo,
                            name: user.name
                        }
                    });
                }
            } else {
                res.status(400).json("Email belum terdaftar");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    };

    export const registerUser = async (req, res) => {
        const { name, email, password } = req.body;  
        try {
            
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json("Email sudah terdaftar");
            }

            const newUser = await User.create({ 
                name, 
                email, 
                password,
                saldo: 10000000 
            });

            res.status(201).json({ 
                message: "Registrasi berhasil",
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    saldo: newUser.saldo
                }
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    };

    export const getUserProfile = async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findByPk(userId, {
                attributes: ['id', 'name', 'saldo']
            });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
