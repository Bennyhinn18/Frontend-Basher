// script.js
export function handleDropdown() {
    const userElement = document.querySelector('.profile_log .user');
    const dropdownMenu = document.querySelector('.profile_log .dropdown-menu.dropdown-menu-end');

    if (!userElement || !dropdownMenu) {
        console.error('User element or dropdown menu not found');
        return;
    }

    const handleClickOutside = (event) => {
        if (!userElement.contains(event.target) && dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
            document.removeEventListener('click', handleClickOutside); // Remove the event listener when the dropdown is closed
        }
    };

    userElement.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
        if (dropdownMenu.classList.contains('show')) {
            document.addEventListener('click', handleClickOutside); // Add the event listener when the dropdown is opened
        }
    });
}