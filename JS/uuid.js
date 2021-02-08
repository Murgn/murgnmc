var res;

const makeNewError = (errorlist, errormsg) => {
    let ele = document.createElement("div");
    ele.classList.add("alert", "murgn-alert", "alert-dismissible", "fade", "show");
    ele.setAttribute("role", "alert");
    ele.innerHTML = `<strong>${errormsg}</strong>\n<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    errorlist.appendChild(ele);
};
const timestamp = Date.now();
console.log(timestamp)
document.querySelector("#usernameForm").addEventListener("submit", e => {
    e.preventDefault();
    let uname = e.target.usernameInput.value;
    // you dont need submit button, i just tested it
    fetch(`https://api.mojang.com/users/profiles/minecraft/${uname}?at${timestamp}`)
    .then((res) => {
        if(res.status != 200) {
            return {
                error: true,
                msg: `Username '${uname}' does not exist!`
            };
        }
        let data = res.json();
        data.error = false;
        return data;
    })
    .then((data) => {
        if(data.error) {
            makeNewError(document.querySelector("#errors"), data.msg);
        } else {
            console.log(data)
            document.querySelector("#msguuid").innerHTML = `The UUID for ${data.name} is: <code>${data.id}</code>`
        } // modify if you want it to look different :)
    })
    .catch((err) => {
        makeNewError(document.querySelector("#errors"), "An Error Occured");
      });
});
