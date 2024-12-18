const fs = require('fs');
 
try {
    const data = fs.readFileSync('aaa.txt', 'utf-8');
    const lines = data.split(/\r?\n/);
    let list = []
    lines.forEach((line, index) => {
        if(!list.includes(line)) {
            list.push(`${line}`)
        }
    });
    console.log(list.length)
    fs.writeFile('bbb.txt', JSON.stringify(list), function(err) {
        if (err) throw err;
        console.log('文件写入成功！');
    });
} catch (err) {
    console.error('Error reading the file:', err);
}