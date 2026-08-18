async function hashPassword(password) {
    const data = new TextEncoder().encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}


// REGISTER
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const message =
            document.getElementById("message");


        // Password length validation
        if (password.length < 8) {

            message.textContent =
                "Password must be at least 8 characters.";

            return;
        }


        // Number validation
        if (!/[0-9]/.test(password)) {

            message.textContent =
                "Password must contain at least one number.";

            return;
        }


        // Get existing users
        let users =
            JSON.parse(localStorage.getItem("users")) || [];


        // Check duplicate email
        const existingUser =
            users.find(function (user) {
                return user.email === email;
            });


        if (existingUser) {

            message.textContent =
                "Email already registered.";

            return;
        }


        // Hash password
        const hashedPassword =
            await hashPassword(password);


        // Create new user
        const newUser = {

            username: username,

            email: email,

            password: hashedPassword

        };


        // Add user
        users.push(newUser);


        // Save users
        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        message.textContent =
            "Registration successful!";


        registerForm.reset();

    });
}



// LOGIN
const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const email =
                document.getElementById("loginEmail")
                .value.trim();


            const password =
                document.getElementById("loginPassword")
                .value;


            const loginMessage =
                document.getElementById("loginMessage");


            // Get users
            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];


            // Hash entered password
            const hashedPassword =
                await hashPassword(password);


            // Find user
            const user =
                users.find(function (user) {

                    return (
                        user.email === email &&
                        user.password === hashedPassword
                    );

                });


            if (user) {

                // Save logged-in user
                localStorage.setItem(
                    "loggedInUser",
                    user.username
                );


                // Go to dashboard
                window.location.href =
                    "dashboard.html";

            } else {

                loginMessage.textContent =
                    "Invalid email or password.";

            }

        }
    );
}



// DASHBOARD PROTECTION
if (window.location.pathname.endsWith("dashboard.html")) {

    const loggedInUser =
        localStorage.getItem("loggedInUser");


    if (!loggedInUser) {

        window.location.href = "index.html";

    } else {

        const welcomeMessage =
            document.getElementById("welcomeMessage");


        if (welcomeMessage) {

            welcomeMessage.textContent =
                "Welcome, " + loggedInUser + "!";

        }

    }
}



// LOGOUT
const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "loggedInUser"
            );

            window.location.href =
                "index.html";

        }
    );
}