let saleData=[];
let pageNumber=1;
const perPage=10;
const saleTableTemplate = _.template(`<% saleData.forEach(function (sale){ %>
    <tr data-id='<%- sale._id %>' >
        <td><%- sale.customer.email %></td>
        <td><%- sale.storeLocation %></td>
        <td><%- sale.items.length %></td>
        <td><%- sale.saleDate %></td>
    </tr>
 <% }); %>`);

 const saleModelBodyTemplate = _.template(`
 <h4>Customer</h4>
 <strong>email:</strong> <%- sale.customer.email %><br>
 <strong>age:</strong> <%- sale.customer.age %><br>
 <strong>satisfaction:</strong> <%- sale.customer.satisfaction %> / 5
<br><br>
<h4> Items: $<%- sale.total.toFixed(2) %> </h4>
<table class="table">
    <thead>
        <tr>
             <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
         </tr>
    </thead>
    <tbody>
    <% sale.items.forEach(function (item){ %>
        <tr >
            <td><%- item.name %></td>
            <td><%- item.quantity %></td>
            <td>$<%- item.price %></td>
        </tr>
     <% }); %>
    </tbody>
</table>`);


 function loadSaleData() {

    fetch(`/api/sales?page=${pageNumber}&perPage=${perPage}`).then(res=>res.json()).then(data=>{
        saleData = data
    $("#sale-table tbody").html(saleTableTemplate());
})

 }

 $(function(){ 
    loadSaleData();

    $(".table tbody").on("click", "tr", function() { 
        const rowId = $(this).attr("data-id"); 
       const sale = saleData.find(e => e._id === rowId);
       const total =  sale.items.reduce(function(prev, cur) {
        return prev + (cur.price * cur.quantity);
      }, 0);

      sale.total = total;

       let template1Result = saleModelBodyTemplate({ 'sale': sale });
       console.log(template1Result);
       $(".modal-body").html(template1Result);
       $('#sale-modal').modal({ // show the modal programmatically
        backdrop: 'static', // disable clicking on the backdrop to close
        keyboard: false // disable using the keyboard to close
    });
    $(".modal-title").html(`Sale: ${rowId}`);

     console.log("table row clicked!");
});


  }); 