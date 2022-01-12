function updateCurrentPageIndicator(id) {
    let existing = document.getElementsByClassName('current')
    if (existing.length > 0) {
        existing.classList.remove('current')
    }
    document.getElementById('menu-' + id).classList.add('current')
}

function addNewOrder(value) {
}

async function handleAddNewOrdersCustomerChanging(event) {

    switch (event.target.selectedOptions[0].id) {
        case 'add_new_customer' :
            displayAddNewCustomerForOrder()
            break
        default :
            document.getElementById('customer_embedded_to_order').style.visibility = 'hidden'
    }

}

async function handleAddNewOrdersDeliveryAddressChanging(event) {
    switch (event.target.selectedOptions[0].id) {
        case 'add_new_delivery_address' :
            await displayAddNewAddressForOrder()
            break
        default :
            document.getElementById('address_embedded_to_order').style.visibility = 'hidden'
    }
}

function createDefaultInput(obj) {
    let inputElement = document.createElement('input')
    inputElement.placeholder = obj.placeholder
    inputElement.name = obj.name
    inputElement.id = obj.name
    return inputElement
}

async function displayAddNewAddressForOrder() {
    let parent_div = document.getElementById('address_embedded_to_order')
    parent_div.style.visibility = 'visible'
    parent_div.innerHTML = ''

    let whole_div = document.createElement('div')

    let inputs = [
        {
            placeholder: 'Город',
            name: 'city'
        },
        {
            placeholder: 'Супруновка',
            name: 'district'
        },
        {
            placeholder: 'Соборная',
            name: 'street'
        },
        {
            placeholder: '30',
            name: 'house_number',
        },
        {
            placeholder: '29',
            name: 'apartment_number'
        },
        {
            placeholder: '1100',
            name: 'postcode'
        },
        {
            placeholder: '15',
            name: 'np_department'
        },
        {
            placeholder: '73',
            name: 'ukrp_department'
        }
    ]

    inputs.forEach(function (item) {
        whole_div.appendChild(
            createDefaultInput(item)
        )
    })

    console.dir(whole_div)

    parent_div.appendChild(whole_div)
}

async function displayAddNewCustomerForOrder() {
    let parent_div = document.getElementById('customer_embedded_to_order')
    parent_div.style.visibility = 'visible'
    parent_div.innerHTML = ''

    let whole_div = document.createElement('div')
    let name = document.createElement('input')
    name.placeholder = 'Полина'
    name.name = 'name'
    name.id = 'name'

    whole_div.appendChild(name)

    let surname = document.createElement('input')
    surname.placeholder = 'Тютюнник'
    surname.name = 'lastname'
    surname.id = 'lastname'

    whole_div.appendChild(surname)

    let phone = document.createElement('input')
    phone.placeholder = '666-666-666'
    phone.name = 'phone'
    phone.id = 'phone'

    whole_div.appendChild(phone)

    let mail = document.createElement('input')
    mail.placeholder = 'sexuality@world.wide'
    mail.name = 'email'
    mail.id = 'email'

    whole_div.appendChild(mail)

    let billing_address = document.createElement('select')
    billing_address.name = "billing_address_id"
    billing_address.id = "billing_address_id"

    let option = document.createElement('option')
    option.value = 'equal'
    option.textContent = 'Совпадает с доставкой'

    billing_address.appendChild(option)

    billing_address.setAttribute('form', "order_form")

    whole_div.appendChild(billing_address)
    parent_div.appendChild(whole_div)
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
        callback(JSON.parse(xhr.response).data)
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
        let plus_cell = document.createElement('span')

        plus_cell.classList.add('plus_button')
        let plus = document.createElement('button')
        plus.textContent = '+'
        plus.setAttribute("onclick", "addCompositionRowToForm()")
        plus.value = list_counter

        let row = document.createElement('div')
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

        row.appendChild(material_list)


        let percent = document.createElement('input')
        percent.type = 'text'
        percent.placeholder = '70'
        percent.name = 'composition_' + list_counter + '_percentage'
        percent.id = 'composition_' + list_counter + '_percentage'
        percent.setAttribute('form', 'product_form')

        row.appendChild(percent)

        plus_cell.classList.add('plus_cell')
        plus_cell.appendChild(plus)

        row.appendChild(plus_cell)

        let remove_cell = document.createElement('span')
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
