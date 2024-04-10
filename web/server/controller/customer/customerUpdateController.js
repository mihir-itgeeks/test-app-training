import { connection } from "../../config/ConnectionConfig.js";

export const customerUpdateController = async (req, res) => {
    const updateData = req.body;
    const schema = {
        name: '',
        email: '',
        phone: "",
        age:"",
        address:""
    }
    var error = ""
console.log(updateData,"-----up")

try {
    Object.keys(schema).map((kyes, index) => {
        if (updateData[kyes] === "" || updateData[kyes] === undefined || updateData[kyes] === null) {
            return error = { status: false, message: `${kyes} can't empty` }
        }
        if (kyes === 'phone') {
            const checkOnly = updateData.phone.toString()
            if (checkOnly.length !== 10) {
                return error = { status: false, message: `${kyes} number invalid! ` }
            }
        }
    })

    if (error !== "") {
        return res.send(error)
    }
    connection.query(`SELECT * from customerlist WHERE email = '${updateData.email}'`, (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(401).json({ status: false, message: "No user found on this Email..!" })
        } else {
            connection.query(`UPDATE customerlist SET name = '${updateData.name}' , phone = '${updateData.phone}' ,age = '${updateData.age}',address = '${updateData.address}'  WHERE email = '${updateData.email}'`,
                (err, result) => {
                    if (err) throw err;
                    console.log(result);
                    res.send({ status: true, message: "Update Successfully..!" })

                })
        }

    })
} catch (error) {
    
}
}