const { Storage } = require('../config');

let upload = (file) => {
    if (Storage.Drive === 'local') {
        var resultArr = []
        fileArr.forEach(element => {

            // 防止文件命名一致，文件名后面加上时间的时分
            // const randomNum =  Math.floor((Math.random() * 9 + 1)*1000);
            const randomNum = new Date().getHours() + "" + new Date().getMinutes();

            // 创建可读流
            const reader = fs.createReadStream(element[1].path);
            let filePath = path.join(__dirname, '/storage/uploads') + `${randomNum}_${element[1].name}`;
            // let filePath = path.join(__dirname, '../public/upload/image/user/') + `/${element[1].name}`; 斜杆问题注意一下
            // 创建可写流
            const upStream = fs.createWriteStream(filePath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream);

            resultArr.push({
                fileName: element[1].name,
                filePath: filePath.replace(new RegExp(/(\\)/, "g"), '\\/'),  // 上传到服务器上的真实路径
                fileUrl: `/node/upload/image/user/${randomNum}_${element[1].name}`,  //给前端显示头像
                randomNum: randomNum
            })
        });

        return resultArr;
    }
}

module.exports = upload