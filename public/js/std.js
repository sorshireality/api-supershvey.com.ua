function updateCurrentPageIndicator(id) {
    let existing = document.getElementsByClassName('current')
    if (existing.length > 0) {
        existing.classList.remove('current')
    }
    document.getElementById('menu-' + id).classList.add('current')
}

function addNewOrder(value) {
}

async function removeSingleEntity(type, id) {
    let http = new XMLHttpRequest();
    http.open('DELETE', '/v1/public/api/' + type + '/' + id)
    http.setRequestHeader(
        'Content-type', 'application/json');
    http.onreadystatechange = async function () {//Вызывает функцию при смене состояния.
        let response = http.responseText
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            localStorage.setItem('crud-message', JSON.stringify({
                "message": response,
                "code": 200
            }))
            updateCrudMessage()
            window.location = window.location.href
        } else {
            localStorage.setItem('crud-message', JSON.stringify({
                "message": response,
                "code": 500
            }))
            updateCrudMessage()
        }

    }
    http.send();
}

async function updateCrudMessage() {
    let crud_message = JSON.parse(localStorage.getItem('crud-message'))
    if (crud_message) {
        let crud_div = document.getElementById('crud-message')

        if (crud_message.message.length > 100) {
            crud_div.textContent = 'Длинная и страшная ошибка. Код ошибки : ' + crud_message.code
        } else {
            crud_div.textContent = crud_message.message
        }

        crud_div.style.display = 'block'
        crud_div.classList.add('slide')
        if (crud_message.code === 200) {
            crud_div.style.backgroundColor = 'green';
        } else {
            crud_div.style.backgroundColor = 'red';
        }
        localStorage.removeItem('crud-message')
    }
}

document.addEventListener('DOMContentLoaded', function () {
    updateCrudMessage()

    if (document.getElementById('add-product') !== null) {
        addCompositionRowToForm()
    }
});


async function retrieveCompositionList(callback) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', '/v1/public/api/compositions')
    xhr.onload = function () {
        callback(JSON.parse(xhr.response))
    }
    xhr.send()
}

async function addCompositionRowToForm() {
    await retrieveCompositionList(function (results) {
        let composition_table = document.getElementById('add-composition')

        let last_child = document.getElementsByClassName('plus_button')[0]
        let list_counter = 0
        if (last_child !== undefined) {
            list_counter = parseInt(last_child.querySelector('button').value)
            console.dir(list_counter)
            last_child.classList.remove('plus_button')
            last_child.style.display = 'none'
        }
        list_counter += 1
        document.getElementById('composition_number').value = list_counter
        let plus_cell = document.createElement('td')

        plus_cell.classList.add('plus_button')
        let plus = document.createElement('button')
        plus.textContent = '+'
        plus.setAttribute("onclick", "addCompositionRowToForm()")
        plus.value = list_counter

        let row = document.createElement('tr')
        let cell = document.createElement('td')
        let material_list = document.createElement('select')
        material_list.setAttribute('form', 'product_form')
        material_list.name = 'composition_' + list_counter
        material_list.id = 'composition_' + list_counter
        for (let index in results) {
            let single = document.createElement('option')
            single.value = results[index].id
            single.textContent = results[index].material
            material_list.appendChild(single)
        }

        cell.appendChild(material_list)
        row.appendChild(cell)

        let percent_cell = document.createElement('td')
        percent_cell.classList.add('composition_percentage')
        let percent = document.createElement('input')
        percent.type = 'text'
        percent.placeholder = '70'
        percent.name = 'composition_' + list_counter + '_percentage'
        percent.id = 'composition_' + list_counter + '_percentage'
        percent.setAttribute('form', 'product_form')
        percent_cell.appendChild(percent)
        row.appendChild(percent_cell)

        plus_cell.classList.add('plus_cell')
        plus_cell.appendChild(plus)

        row.appendChild(plus_cell)

        let remove_cell = document.createElement('td')
        remove_cell.classList.add("remove-composition")
        let remove = document.createElement('button')
        remove.textContent = 'x'
        remove.setAttribute("onclick", "removeComposition(" + list_counter + ")")
        remove_cell.appendChild(remove)
        row.appendChild(remove_cell)

        composition_table.appendChild(row)
    })
}

async function removeComposition(id) {
    let target = document.getElementById('composition_' + id).parentElement.parentElement
    let is_last_child = target.getElementsByClassName('plus_button')[0]
    document.getElementById('add-composition').removeChild(
        target
    )
    if (is_last_child !== undefined) {
        let last_row = document.getElementById('add-composition').lastChild
        let cell = last_row.childNodes[2]
        console.dir(cell)
        cell.classList.add('plus_button')
    }

    let comp_n = document.getElementById('composition_number')
    comp_n.value = parseInt(comp_n.value) - 1 

}

/**
 * Show sub list in menu, for example if clicked on `products` - show the `category` list.
 * @param list_title
 */
function showSubMenuList(list_title) {
    let sub_menus = document.getElementsByClassName(list_title)
    for (let item in sub_menus) {
        if (parseInt(item) == item) {
            sub_menus[item].style.display = 'block'
        }
    }
}
