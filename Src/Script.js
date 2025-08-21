    const inp = document.querySelector('.todo>input')
    const btn = document.querySelector('.todo>button')
    const list = document.querySelector('#list')
    const deleteList = document.getElementById('garbage')
    let data = []
    // get localStorage //
    let x = JSON.parse(localStorage.getItem('todoNames'))
    if(x != null){
        data = x
        for(let i = 0; i < data.length; i++){
            let li = document.createElement('li')
        li.innerHTML = `
                <span class="line"></span>
                <h3 class="task-text">${data[i]}</h3>
                <input class="edit-input" type="text" value="${data[i]}" />
                <span><input type="checkbox" onchange='fnDel(this)'></span>
                <span onclick="myEdit(this)">✒️</span>
                <span onclick="myDel(this)">❌</span>
            `
        list.appendChild(li)
        }
    }
    // get localStorage //
    btn.addEventListener('click', () => {
        let temp = inp.value
        if (temp === '') {
            alert('Please write content in the box.')
        } else {
            console.log(temp);
            myAdd(temp)
             //////// set to web storage ////////
            data.push(temp)
            localStorage.setItem('todoNames' , JSON.stringify(data))
        }
    })
    function myAdd(temp) {
        let li = document.createElement('li')
        li.innerHTML = `
                <span class="line"></span>
                <h3 class="task-text">${temp}</h3>
                <input class="edit-input" type="text" value="${temp}" />
                <span><input type="checkbox" onchange='fnDel(this)'></span>
                <span onclick="myEdit(this)">✒️</span>
                <span onclick="myDel(this)">❌</span>
            `
        list.appendChild(li)
        // after append to list //
        inp.value = null
        inp.focus()
        // after append to list //

    }

    function fnDel(s) {
        if (s.disabled) {
            return;
        }
        const lineElement = s.parentElement.parentElement.querySelector('.line');
        if (s.checked) {
            lineElement.style.width = '300px'
        } else {
            lineElement.style.width = '0'
        }

    }
    let num = 1
    function myEdit(s) {
        const taskText = s.parentElement.querySelector('.task-text');
        const editInput = s.parentElement.querySelector('.edit-input');
        const checkbox = s.parentElement.querySelector('input[type="checkbox"]');
        if (num % 2) {
            taskText.style.display = 'none';
            editInput.style.display = 'flex';
            editInput.value = taskText.innerText;
            s.innerHTML = '✔️'
            checkbox.disabled = true;
            s.parentElement.querySelector('.line').style.width = '0';
            checkbox.checked = false;
        } else {
            taskText.style.display = 'flex';
            editInput.style.display = 'none';
            taskText.innerText = editInput.value;
            s.innerHTML = '✒️'
            checkbox.disabled = false;
        }
        num++
    }
    function myDel(s) {
        if (confirm('Sure?')) {
            let oldText = s.parentElement.querySelector('.task-text').innerText;
            s.parentElement.classList.add('delete')
            setTimeout(() => {
                s.parentElement.remove()
            }, 500);

            let li = document.createElement('li')
            li.innerHTML = `
            <b>${oldText}</b>
            <span class='basket' onclick='addAgain(this)'>🗑️</span>
            `
            deleteList.appendChild(li)
        }

    }

    function addAgain(s) {
        let temp = s.previousElementSibling.innerText
        s.parentElement.remove()
        myAdd(temp)
    }
