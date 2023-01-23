
const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");

const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");

let items;

btnNew.onclick = () => {

    descriptionValidate();
    amountValidate();

    if(campos[0].value.length == "" || campos[1].value.length == "") {
        return
    }

    items.push({
        desc: descItem.value,
        amount: Math.abs(amount.value).toFixed(2),
        type: type.value,
    });

    setItensBD();

    loadItens();

    descItem.value = "";
    amount.value = "";
    
};

// Funções 

function deleteItem(index) {
    items.splice(index, 1);
    setItensBD();
    loadItens();
}

function insertItem(item, index) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${item.desc}</td>
        <td>R$ ${item.amount}</td>
        <td class="columnType">${
            item.type === "Entrada"
                ? '<i class="bx bxs-chevron-up-circle"></i>'
                : '<i class="bx bxs-chevron-down-circle"></i>'
        }</td>
        <td class="columnAction">
            <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
        </td>
    `;

    tbody.appendChild(tr);

}

function loadItens() {
    items = getItensBD();
    tbody.innerHTML = "";
    items.forEach((item, index) => {
        insertItem(item, index);
    });

    getTotals();
}

function getTotals() {
    const amountIncomes = items
    .filter((item) => item.type === "Entrada")
    .map((transaction) => Number(transaction.amount));

    const amountExpenses = items
    .filter((item) => item.type === "Saída")
    .map((transaction) => Number(transaction.amount));

    const totalIncomes = amountIncomes
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);

    const totalExpenses = Math.abs(
        amountExpenses.reduce((acc, cur) => acc + cur, 0)
        ).toFixed(2);
    
    const totalItems = (totalIncomes - totalExpenses).toFixed(2);

    incomes.innerHTML = totalIncomes;
    expenses.innerHTML = totalExpenses;
    total.innerHTML = totalItems;
}

const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];

const setItensBD = () => localStorage.setItem("db_items", JSON.stringify(items));

loadItens();



// testes

const campos = document.querySelectorAll(".required");
const spans = document.querySelectorAll(".span-required");

function setError(index){
    campos[index].style.border = "2px solid #e63636";
    spans[index].style.display = "block";
}

function removeError(index){
    campos[index].style.border = "";
    spans[index].style.display = "none";
}

function descriptionValidate() {
    if(campos[0].value.length == "")
    {
        setError(0);
    }
    else
    {
        removeError(0);
    }
}

function amountValidate(){
    if(campos[1].value.length == "")
    {
        setError(1);
   }
    else
    {
        removeError(1);
    }
}
