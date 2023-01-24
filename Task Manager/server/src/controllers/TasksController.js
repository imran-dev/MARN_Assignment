const TasksModel = require("../models/TasksModel");

exports.createTask = (req, res) => {
    let reqBody   = req.body;
    reqBody.email = req.headers['email'];
    TasksModel.create(reqBody, (error, result) => {
        if (error) {
            res.status(400).json({status: 'fail', data: error});
        } else {
            res.status(200).json({status: 'success', data: result});
        }
    });
}

exports.deleteTask = (req, res) => {
    let id    = req.params.id;
    let Query = {_id: id};
    TasksModel.remove(Query, (error, result) => {
        if (error) {
            res.status(400).json({status: 'fail', data: error});
        } else {
            res.status(200).json({status: 'success', data: result});
        }
    });
}

exports.updateTaskStatus = (req, res) => {
    let id      = req.params.id;
    let reqBody = {status: req.params.status};
    let Query   = {_id: id};
    TasksModel.updateOne(Query, reqBody, (error, result) => {
        if (error) {
            res.status(400).json({status: 'fail', data: error});
        } else {
            res.status(200).json({status: 'success', data: result});
        }
    });
}

exports.listTaskByStatus = (req, res) => {
    let status = req.params.status;
    let email  = req.headers['email'];
    TasksModel.aggregate([
        {
            $match: {status: status, email: email}
        }, {
            $project: {
                _id        : 1,
                title      : 1,
                description: 1,
                status     : 1,
                createdDate: {
                    $dateToString: {
                        date  : '$createdDate',
                        format: '%d-%m-%Y'
                    }
                }
            }
        }
    ], (error, result) => {
        if (error) {
            res.status(400).json({status: 'fail', data: error});
        } else {
            res.status(200).json({status: 'success', data: result});
        }
    });
}

exports.taskStatusCount = (req, res) => {
    let email = req.headers['email'];
    TasksModel.aggregate([
        {$match: {email: email}},
        {$group: {_id: '$status', sum: {$count: {}}}}
    ], (error, result) => {
        if (error) {
            res.status(400).json({status: 'fail', data: error});
        } else {
            res.status(200).json({status: 'success', data: result});
        }
    });
}