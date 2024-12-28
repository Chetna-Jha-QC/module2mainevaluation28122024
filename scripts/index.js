document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    
    //    predefining the credentials
    const adminEmail = "admin@empher.com";
    const adminpassword = "empher@123";
    const userEmail = "user@empher.com";
    const userpassword = "user@123";

    // clear any previous message
    errorMsg.textContent = "";

    if (email === adminEmail && password === adminpassword){
        // admin login
        localStorage.setItem('loginData', JSON.stringify({email, role: 'admin'}));
        alert("Logged in as Admin");
        window.location.href = "./admin.html"; //redirect to admin.html
    } else if (email === userEmail && password === userpassword) {
        // user login success
        localStorage.setItem('loginData', JSON.stringify({email, role: 'user'}));
        alert("Logged in as User");
        window.location.href ="./books.html"; //redirect to books.html
    } else {
        // invalid
        errorMsg.textContent = "Invalid Detaild. Try again";
    }
        
});