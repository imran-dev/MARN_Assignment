const MongoClient = require('mongodb').MongoClient;
const URL = "mongodb://127.0.0.1:27017";
// const URL = "mongodb+srv://imrancse019:DhBrSDfk7jmSpAZl@cluster0.wb4xo7w.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(URL, function (error, MyMongoClient) {
    if (error) {
        console.log('Database Connection Fail');
    } else {
        console.log('Database Connection Success');

        const DB_SCHOOL = MyMongoClient.db('school');

        // InsertData(DB_SCHOOL);
        InsertDataMany(DB_SCHOOL);

        // FindAllData(DB_SCHOOL);
        // FindAllByProjection(DB_SCHOOL);
        // FindOneWithoutCondition(DB_SCHOOL);
        // FindOneWithCondition(DB_SCHOOL);
        // FindAllByQuery(DB_SCHOOL);
        // FindAllByLimit(DB_SCHOOL);
        // FindAllBySort(DB_SCHOOL);

        // UpdateMyData(DB_SCHOOL);

        // DeleteOneData(DB_SCHOOL);
        // DeleteAllData(DB_SCHOOL);

        // CreateMyCollection(DB_SCHOOL);
        // DropMyCollection(DB_SCHOOL);
    }
});

function DropMyCollection(DB) {
    DB.dropCollection("teachers", function (error, result) {
        console.log(result);
    });
}

function CreateMyCollection(DB) {
    DB.createCollection("teachers", function (error, result) {
        console.log(result);
    });
}

function UpdateMyData(DB) {
    let MyQuery = {Roll: "02"};
    let MyNewValues = {$set: {name: "Tasnim Zarin", City: "Dhaka"}};

    DB.collection('students').updateOne(MyQuery, MyNewValues, function (error, result) {
        console.log(result);
    });
}

function FindAllBySort(DB) {
    DB.collection("students").find().sort({Roll: -1}).toArray(
        function (err, result) {
            if (err) throw err;
            console.log(result);
        });
}

function FindAllByLimit(DB) {
    DB.collection("students").find().limit(3).toArray(
        function (err, result) {
            if (err) throw err;
            console.log(result);
        });
}

function FindAllByQuery(DB) {
    DB.collection("students").find({
        City: "Khulna"
    }).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}

function FindAllByProjection(DB) {
    DB.collection("students").find({}, {
        projection: {Roll: 1, name: 2}
    }).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
    });
}

function FindAllData(DB) {
    DB.collection('students').find().toArray(function (error, result) {
        if (error) {
            console.log('Data Not Found');
        } else {
            console.log(result);
        }
    });
}

function FindOneWithCondition(DB) {
    let students = DB.collection('students');
    let FindObj = {Roll: "02"};

    students.findOne(FindObj, function (error, result) {
        if (error) {
            console.log('Data Not Found');
        } else {
            console.log(result);
        }
    });
}

function FindOneWithoutCondition(DB) {
    let students = DB.collection('students');
    let FindObj = {};
    students.findOne(FindObj, function (error, result) {
        if (error) {
            console.log('Data Not Found');
        } else {
            console.log(result);
        }
    });
}

function DeleteAllData(DB) {
    const students = DB.collection('students');
    students.deleteMany(function (error, result) {
        if (error) {
            console.log('All Data Delete Fail');
        } else {
            console.log("Item Deleted: " + result.deletedCount);
        }
    });
}

function DeleteOneData(DB) {
    const students = DB.collection('students');
    const DeleteItem = {Roll: "01"};
    students.deleteOne(DeleteItem, function (error) {
        if (error) {
            console.log('Data Delete Fail');
        } else {
            console.log('Data Delete Success');
        }
    });
}

function InsertDataMany(DB) {
    const students = DB.collection('students');
    const options = {ordered: true};
    const data = [
        {name: "Imran Hossain", Roll: "01", Class: "Ten", City: "Khulna"},
        {name: "Tasnim Zarin", Roll: "02", Class: "Three", City: "Dhaka"},
        {name: "Masudur Rahaman", Roll: "03", Class: "Ten", City: "Khulna"},
        {name: "Sabbir Rahaman", Roll: "04", Class: "Seven", City: "Dhaka"},
        {name: "Alif", Roll: "06", Class: "Eight", City: "Khulna"}
    ];

    students.insertMany(data, options, function (error, result) {
        if (error) {
            console.log('Data Insert Fail');
        } else {
            console.log(`${result.insertedCount} documents were inserted`);
        }
    });
}

function InsertData(DB) {
    let MyCollection = DB.collection('students');
    let MyData = {name: "Imran Hossain", Roll: "01", Class: "Ten", City: "Khulna"};

    MyCollection.insertOne(MyData, function (error) {
        if (error) {
            console.log('Data Insert Fail');
        } else {
            console.log('Data Insert Success');
        }
    });
}