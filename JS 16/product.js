// load the XML file and parse using DOMParser
fetch('products.xml')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'application/xml');
    const products = xmlDoc.getElementsByTagName('product');

    // get the table body element
    const tableBody = document.getElementById('productBody');

    // loop through the products and display their information in the table
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const id = product.getAttribute('id');
      const name = product.getElementsByTagName('name')[0].textContent;
      const price = product.getElementsByTagName('price')[0].textContent;
      const quantity = product.getElementsByTagName('quantity')[0].textContent;
      const description = product.getElementsByTagName('description')[0].textContent;

      // create a new row and cells for each product
      const newRow = tableBody.insertRow();
      newRow.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${price}</td>
        <td>${quantity}</td>
        <td>${description}</td>
      `;
    }
  });

// function to search for a product by name
function searchProduct() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.querySelectorAll('#productBody tr');

  for (let i = 0; i < rows.length; i++) {
    const name = rows[i].querySelector('td:nth-child(2)').textContent.toLowerCase();

    if (name.includes(input)) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}
