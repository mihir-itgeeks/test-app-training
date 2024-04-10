import { connection } from "../../config/ConnectionConfig.js";


export const customerAddController = (req, res) => {
    const DataSchema = ['name', 'phone', 'email', 'address', 'age'];
    const customerData = req.body;

    if (!req.body) {
        return res.status(400).json({ status: false, "message": "Body is Required!" });
    }
    try {
        let error = [];
        Object.values(DataSchema).map((keys, index) => {
            if (customerData[keys] === undefined || customerData[keys] === null) {
                return error.push(`${keys} must be required !`);
            } else if (keys !== "age") {
                if (customerData[keys].trim() === "") {
                    return error.push(`${keys} can't be empty !`)
                }
            } if (keys === 'phone') {
                const checkOnly = customerData.phone.toString()
                if (checkOnly.length !== 10) {
                    return error.push(`${keys} number invalid! `)
                }
            }
            if (keys === 'age') {
                if (customerData[keys] > 90 || customerData[keys] < 2 || typeof (Number(customerData[keys])) === "string") {
                    return error.push(`${keys} must be number !`)
                }
            }
            if (keys === 'email') {
                const Emailpattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                const emailRex = new RegExp(Emailpattern)
                // if(customerData?.email.slice(customerData?.email.length))
                if(!emailRex.test(customerData?.email)){
                    return error.push("Invalid Email Address!")
                }
            }


        });
        if (error.length > 0) {
            res.status(400).json({ status: false, message: error.join(',') })
        } else {
            connection.query(`SELECT * from customerlist WHERE email = '${customerData.email}'`, (err, result) => {
                if (err) throw err;
                if (result.length > 0) {
                    return res.status(400).json({ status: false, message: "Email Already Exist..!" })
                } else {
                    connection.query(`SELECT * from customerlist WHERE phone = '${customerData.phone}'`, (err, result) => {
                        if (err) throw err;
                        if (result.length > 0) {
                            return res.status(400).json({ status: false, message: "Phone Already Exist..!" })
                        } else {
                            const InsertQ = `INSERT INTO customerlist (name,phone,email,address,age) VALUES ('${customerData.name}','${customerData.phone}','${customerData.email}','${customerData.address}','${customerData.age}')`
                            connection.query(InsertQ, (err, result) => {
                                if (err) {
                                    res.status(400).json({ status: false, message: "Failed to add customer" })
                                    console.log(err, "----failed to insert")
                                } else {
                                    console.log(result);
                                    res.status(201).json({ status: true, message: "Successfully Added !" })
                                }
                            })
                        }
                    });

                }
            })


        }
        // connection.query("INSERT INTO ")
    } catch (error) {
        console.log(error, "---error Failed to add customer")
        res.status(400).json({ status: false, message: "Failed to add customer" })

    }

}