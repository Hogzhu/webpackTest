let two = () => {
    let div = document.createElement('div');
    div.innerHTML = '我是第二个文件'; 
    return div;
}

document.body.appendChild(two());