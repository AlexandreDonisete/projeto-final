document.addEventListener('DOMContentLoaded', function () {
   // Carregar produtos ao iniciar a página
   loadProducts();

   // Adicionar evento ao formulário de adição de produto
   document.getElementById('addProductForm').addEventListener('submit', function (event) {
       event.preventDefault();
       addProduct();
   });
});

function loadProducts() {
   // Implemente a lógica para buscar produtos da API e exibi-los na tabela
   fetch('/api/produtos')
       .then(response => response.json())
       .then(data => displayProducts(data))
       .catch(error => console.error('Erro ao carregar produtos:', error));
}

function addProduct() {
   // Obter valores do formulário
   const productName = document.getElementById('productName').value;
   const productPrice = document.getElementById('productPrice').value;

   // Montar os dados a serem enviados para a API
   const data = {
       nome: productName,
       preco: productPrice
   };

   // Configurar a requisição POST
   fetch('/api/produtos', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
   })
       .then(response => response.json())
       .then(data => {
           console.log('Produto adicionado com sucesso:', data);
           // Recarregar a tabela após adicionar o produto
           loadProducts();
           // Fechar o modal de adição de produto
           $('#addProductModal').modal('hide');
       })
       .catch(error => console.error('Erro ao adicionar produto:', error));
}

function displayProducts(products) {
   // Implemente a lógica para exibir produtos na tabela
   // products é um array de objetos representando os produtos
   const tableBody = document.getElementById('productTableBody');
   tableBody.innerHTML = '';

   products.forEach(product => {
       const row = `<tr>
                       <td>${product.id}</td>
                       <td>${product.nome}</td>
                       <td>${product.preco}</td>
                       <td><button onclick="editProduct(${product.id})" type="button" class="btn btn-warning">Editar</button></td>
                       <td><button onclick="deleteProduct(${product.id})" type="button" class="btn btn-danger">Deletar Produto</button></td>
                   </tr>`;
       tableBody.innerHTML += row;
   });
}

function deleteProduct(id) {
    fetch(`/api/produtos/${id}`, {
        method: 'DELETE',
        headers: {
           'Content-Type': 'application/json'
       }
    })
        .then(response => response.json())
        .then(data => {
           console.log(data.message);
           // Recarregar a tabela após adicionar o produto
           loadProducts();
       })
        .catch(error => console.error('Erro ao deletar produto:', error));
}

function editProduct(id) {
    // Buscar os detalhes do produto para edição
    fetch(`/api/produtos/${id}`)
        .then(response => response.json())
        .then(data => {
            // Preencher os campos do formulário de edição
            document.getElementById('editProductName').value = data.nome;
            document.getElementById('editProductPrice').value = data.preco;

            // Abrir o modal de edição
            $('#editProductModal').modal('show');
        })
        .catch(error => console.error('Erro ao obter detalhes do produto:', error));

    document.getElementById('editProductForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obter valores do formulário de edição
    const editedProductName = document.getElementById('editProductName').value;
    const editedProductPrice = document.getElementById('editProductPrice').value;

    // Montar os dados a serem enviados para a API
    const data = {
        nome: editedProductName,
        preco: editedProductPrice
    };
    
    // Configurar a requisição PUT para atualizar o produto
    fetch(`/api/produtos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Produto atualizado com sucesso:', data);
            // Recarregar a tabela após atualizar o produto
            loadProducts();
            // Fechar o modal de edição
            $('#editProductModal').modal('hide');
        })
        .catch(error => console.error('Erro ao atualizar produto:', error));
});

}