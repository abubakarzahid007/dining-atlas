/*==============================================
=                MENU TOGGLE LOGIC             =
==============================================*/

const toggleMenu = (toggleSelector, navSelector) => {
    const toggleButton = document.querySelector(`#${toggleSelector}`);
    const navigationMenu = document.querySelector(`#${navSelector}`);

    // Verify that both elements exist before proceeding
    if (toggleButton && navigationMenu) {
        toggleButton.addEventListener('click', () => {
            // Add or remove the 'is-visible' class to control menu visibility
            navigationMenu.classList.toggle('is-visible');
        });
    }
};

// Activate the menu toggle functionality
toggleMenu('nav-toggle', 'nav-menu');

/*=================================================
=             REMOVE MOBILE MENU LOGIC            =
=================================================*/

const navLinks = document.querySelectorAll('.nav__link');

function handleNavLinkClick() {
    const navMenu = document.getElementById('nav-menu');
    // Remove the 'show-menu' class when a navigation link is clicked
    navMenu.classList.remove('is-visible');
}

// Attach the event listener to each navigation link
navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));


/*=================================================
=           SCROLL SECTIONS ACTIVE LINK           =
=================================================*/

const sections = document.querySelectorAll('section[id]');

function setActiveLinkOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50; // Offset for smoother activation
        const sectionId = section.getAttribute('id');

        // Activate or deactivate link based on scroll position
        const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active-link');
        } else {
            navLink?.classList.remove('active-link');
        }
    });
}

// Add scroll event listener to trigger the function
window.addEventListener('scroll', setActiveLinkOnScroll);


/*=================================================
=           CHANGE HEADER BACKGROUND ON SCROLL    =
=================================================*/

function updateHeaderOnScroll() {
    const header = document.getElementById('header');

    // Toggle the 'scroll-header' class based on the scroll position
    if (window.scrollY >= 200) {
        header?.classList.add('scroll-header');
    } else {
        header?.classList.remove('scroll-header');
    }
}

// Attach the scroll event listener to update the header
window.addEventListener('scroll', updateHeaderOnScroll);


/*=================================================
=             DISPLAY SCROLL TO TOP BUTTON        =
=================================================*/

function toggleScrollTopButton() {
    const scrollTopButton = document.getElementById('scroll-top');

    // Add or remove the 'show-scroll' class based on scroll position
    if (window.scrollY >= 560) {
        scrollTopButton?.classList.add('show-scroll');
    } else {
        scrollTopButton?.classList.remove('show-scroll');
    }
}

// Attach event listener to handle scroll event
window.addEventListener('scroll', toggleScrollTopButton);


/*=================================================
=               DARK/LIGHT THEME TOGGLE           =
=================================================*/

// DOM elements and class names
const themeToggleButton = document.getElementById('theme-button');
const darkThemeClass = 'dark-theme';
const lightIconClass = 'bx-sun';
const darkIconClass = 'bx-moon';

// Retrieve previously selected theme and icon from localStorage
const savedTheme = localStorage.getItem('selected-theme');
const savedIcon = localStorage.getItem('selected-icon');

// Utility functions to get the current theme and icon
const getActiveTheme = () =>
    document.body.classList.contains(darkThemeClass) ? 'dark' : 'light';
const getActiveIcon = () =>
    themeToggleButton.classList.contains(darkIconClass) ? 'bx-moon' : 'bx-sun';

// Apply the previously selected theme and icon (if available)
if (savedTheme) {
    document.body.classList.toggle(darkThemeClass, savedTheme === 'dark');
    themeToggleButton.classList.toggle(darkIconClass, savedIcon === 'bx-moon');
    themeToggleButton.classList.toggle(lightIconClass, savedIcon !== 'bx-moon');
}

// Event listener for manual theme toggle
themeToggleButton.addEventListener('click', () => {
    // Toggle theme and icon classes
    document.body.classList.toggle(darkThemeClass);
    themeToggleButton.classList.toggle(darkIconClass);
    themeToggleButton.classList.toggle(lightIconClass);

    // Store the user's preferences in localStorage
    localStorage.setItem('selected-theme', getActiveTheme());
    localStorage.setItem('selected-icon', getActiveIcon());
});

/*=================================================
=             SCROLL REVEAL ANIMATIONS            =
=================================================*/

// Initialize ScrollReveal with default settings
const scrollRevealConfig = {
    origin: 'top', // Starting point of the animation
    distance: '30px', // Distance the elements travel during animation
    duration: 2000, // Duration of the animation (ms)
    reset: true, // Resets animation on scroll back
};

// Create a ScrollReveal instance with the configuration
const sr = ScrollReveal(scrollRevealConfig);

// Define elements to reveal and set an animation interval
sr.reveal(
    `
    .home__data, .home__img, 
    .about__data, .about__img,
    .services__content, .menu__content, .box-container,
    .app__data, .app__img, .service-card,
    .contact__data, .contact__button,
    .footer__content
    `,
    {
        interval: 200, // Delay between revealing each element
    }
);

/*=================================================
=             SHOW SCROLL TOP BUTTON                =
=================================================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')
/*=================================================
=             Login Form                           =
=================================================*/

const overlay = document.getElementById('overlay');
const signupPage = document.getElementById('signup');
const loginPage = document.getElementById('login');

document.getElementById('nav-signup').addEventListener('click', () => {
    signupPage.classList.remove('hidden');
    overlay.classList.add('active');
});

document.getElementById('nav-login').addEventListener('click', () => {
    loginPage.classList.remove('hidden');
    overlay.classList.add('active');
});

overlay.addEventListener('click', () => {
    signupPage.classList.add('hidden');
    loginPage.classList.add('hidden');
    overlay.classList.remove('active');
});

// Signup Functionality
document.getElementById('signup-btn').addEventListener('click', async () => {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const error = document.getElementById('signup-error');

    if (name && email && password) {
        try {
            const response = await fetch('http://localhost:4001/api/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration Complete! Redirecting to the Login page...');
                error.style.display = 'none';
                signupPage.classList.add('hidden');
                loginPage.classList.remove('hidden');
            } else {
                error.textContent = data.message || 'Sign Up Failed!';
                error.style.display = 'block';
            }
        } catch (err) {
            error.textContent = 'An error occurred. Please try again later.';
            error.style.display = 'block';
        }
    } else {
        error.textContent = 'All fields are required!';
        error.style.display = 'block';
    }
});

// Login Functionality
document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const error = document.getElementById('login-error');

    if (email && password) {
        try {
            const response = await fetch('http://localhost:4001/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Good to see you again, ${data.user.name}!`);
                error.style.display = 'none';
                localStorage.setItem('user', JSON.stringify(data));

                // Redirect to the home page
                document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
                document.getElementById('home').classList.remove('hidden');
            } else {
                error.textContent = data.message || 'Invalid email or password.';
                error.style.display = 'block';
            }
        } catch (err) {
            error.textContent = 'An error occurred. Please try again later.';
            error.style.display = 'block';
        }
    } else {
        error.textContent = 'All fields are required!';
        error.style.display = 'block';
    }
});



// Function to dynamically add icons to input fields
function addIcons() {
    const iconMappings = {
      'signup-name': 'bx bx-user',
      'signup-email': 'bx bx-envelope',
      'signup-password': 'bx bx-lock',
      'login-email': 'bx bx-envelope',
      'login-password': 'bx bx-lock'
    };
  
    for (const [inputId, iconClass] of Object.entries(iconMappings)) {
      const inputElement = document.getElementById(inputId);
      if (inputElement) {
        // Create a container for the input and icon
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('input-icon');
        
        // Create the icon element
        const iconElement = document.createElement('i');
        iconElement.className = iconClass; // Use Boxicons classes
  
        // Insert icon and input into the container
        inputElement.parentNode.insertBefore(iconContainer, inputElement);
        iconContainer.appendChild(iconElement);
        iconContainer.appendChild(inputElement);
      }
    }
  }
  
  // Call the function after DOM is loaded
  document.addEventListener('DOMContentLoaded', addIcons);
  

  