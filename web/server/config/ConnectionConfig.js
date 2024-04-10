import mysql from 'mysql';

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"#india@me123",
    database: "mydb1"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("----- MYSQL Connected ! ------");
})

try {
    const createQ = "CREATE TABLE IF NOT EXISTS customerlist (id INT AUTO_INCREMENT PRIMARY KEY , name VARCHAR(225) , phone BIGINT , email VARCHAR(225) , address VARCHAR(225) , age INT) "
    connection.query(createQ,(err,result)=>{
        if(err){
            throw err
        }
        // else{
        //     console.log(result,"table created !----")
        // }
    })
} catch (error) {
    console.log(error,"---error on creating table")
}



