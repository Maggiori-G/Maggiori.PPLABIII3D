export const createTable = (data) => {
    if(!Array.isArray(data) || data.length === 0) return null;
    const table = document.createElement('table');
    table.appendChild(createHeader(data[0]));
    table.appendChild(createBody(data));
    return table;
};

const createHeader = (element) => {
    if(!element || element == null) return null;
    const tHead = document.createElement('thead');
    const headRow = document.createElement('tr');
    for (const key in element) {
        if(key === 'id') continue;
        const th = document.createElement('th');
        th.textContent = key;
        headRow.appendChild(th);
    }
    tHead.appendChild(headRow);
    return tHead;
};

const createBody = (data) => {
    if(!Array.isArray(data)) return null;
    const tBody = document.createElement('tbody');
    data.forEach((element) => {
        const tr = document.createElement('tr');
        for (const key in element) {
            if(key === 'id'){
                tr.setAttribute('data-id', element[key])
            }
            else{
                const td = document.createElement('td');
                td.textContent = element[key];
                tr.appendChild(td);
            } 
        }
        tBody.appendChild(tr);
    });
    return tBody;
};

export const updateTable = (container, data) => {
    while(container.hasChildNodes()){
        container.removeChild(container.firstElementChild);
    }
    const table = createTable(data);
    if(table !== null){
        container.appendChild(createTable(data));
    }
};