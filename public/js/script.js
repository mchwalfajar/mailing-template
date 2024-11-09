// Toggle dropdown menu visibility
function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '' ? 'block' : 'none';
}

// Close the dropdown if clicked outside
document.addEventListener('click', function(event) {
    const userProfile = document.querySelector('.user-profile');
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (!userProfile.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

// Toggle submenu visibility
function toggleSubmenu(event, submenuId) {
    event.preventDefault(); // Prevent link from navigating
    const submenu = document.getElementById(submenuId);
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}