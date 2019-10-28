var UserSQL = {
    insert: 'INSERT INTO User(userName,password) VALUES(?,?)', // 插入数据
    insertlist: 'INSERT INTO buyland(list) VALUES(?)', // 土地报价表插入数据
    insertProblem: 'INSERT INTO problem(list) VALUES(?)', // 问题反馈插入数据
    drop: 'DROP TABLE User', // 删除表中所有的数据
    queryAll: 'SELECT * FROM User', // 查找表中所有数据
    listqueryAll: 'SELECT * FROM buyland', // 查找buglist表中所有数据
    problemqueryAll: 'SELECT * FROM problem', // 查找problem表中所有数据
    queryAllabout: 'SELECT * FROM about', // 查找about表中所有数据
    addAllabout: 'update about set text=?', // 修改about表中所有数据
    getUserById: 'SELECT * FROM User WHERE uid =?', // 查找符合条件的数据
};
module.exports = UserSQL;