let form = document.getElementById("productsForm");


form.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    let data = new FormData(form);
    let sendObj = {};
    data.forEach((val, key) => sendObj[key] = val);
    console.log(sendObj)
    form.reset()
    Swal.fire({
        icon: "success",
        text: "Nuevo producto agregado.",
        toast: true,
        position: "top-right",
    })
})
